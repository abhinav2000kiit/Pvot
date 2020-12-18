import React from 'react';
import Header from '../components/Header/customHeader';
import { Row, Col, Image } from 'react-bootstrap';
import CustomBox from '../components/Box';
import Slider from '@material-ui/core/Slider';
import Drawer from '@material-ui/core/Drawer';
import { makeStyles, withStyles, useTheme } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import TimelineIcon from '@material-ui/icons/Timeline';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import * as actions from '../../redux/actions/index';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AnalystCard from '../components/AnalystBrowseCard';
import Tooltip from '@material-ui/core/Tooltip';
import SwipeableViews from 'react-swipeable-views';
import Slide from '@material-ui/core/Slide';
import Loading from '../Loading/Loading';

import { Mixpanel } from '../../shared/mixPanel'

const StyledTabs = withStyles({
  indicator: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    '& > span': {
      maxWidth: 40,
      width: '100%',
      backgroundColor: '#635ee7'
    }
  }
})(props => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

const StyledTab = withStyles(theme => ({
  root: {
    textTransform: 'none',
    color: '#fff',
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),
    '&:focus': {
      opacity: 1
    }
  }
}))(props => <Tab disableRipple {...props} />);

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component='div'
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

function ValueLabelComponent(props) {
  const { children, open, value } = props;
  let abbrNum = (number, decPlaces) => {
    decPlaces = Math.pow(10, decPlaces);

    var abbrev = ['k', 'm', 'b', 't'];

    for (var i = abbrev.length - 1; i >= 0; i--) {
      var size = Math.pow(10, (i + 1) * 3);
      if (size <= number) {
        number = Math.round((number * decPlaces) / size) / decPlaces;
        if (number == 1000 && i < abbrev.length - 1) {
          number = 1;
          i++;
        }
        number += abbrev[i];
        break;
      }
    }

    return number;
  };
  return (
    <Tooltip open={open} enterTouchDelay={0} placement='top' title={abbrNum(value, 2)}>
      {children}
    </Tooltip>
  );
}

ValueLabelComponent.propTypes = {
  children: PropTypes.element.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.number.isRequired
};

const useStyles = makeStyles(theme => ({
  drawerPaper: {
    height: '100%'
  },
  typography: {
    padding: theme.spacing(2)
  },
  root: {
    flexGrow: 1
  },
  padding: {
    padding: theme.spacing(3)
  },
  demo1: {
    backgroundColor: theme.palette.background.paper
  },
  demo2: {
    backgroundColor: '#2e1534'
  }
}));

function valuetext(value) {
  return ``;
}

const UserBrowseAnalysts = props => {
  console.log('props from reducer', props);
  // Popover Management ---------------------------------------
  const classes = useStyles();
  const theme = useTheme();

  console.log('props from reducer', props);
  // let { filters } = props;
  // console.log(`filtttersss => `,filters)
  // React.useEffect(()=>{
  //     setSortBy(filters.sortBy)
  //     setTradingSegment(filters.tradingSegment)
  //     setTradingType(filters.tradingType)
  // },[filters])

  const [openFilter, setOpenFilter] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [openDialogMessag, setOpenDialogMessage] = React.useState(false);
  const [openGuide, setOpenGuide] = React.useState(false);
  const [searchStr, setSearchStr] = React.useState('')
  const [annualisedReturn, setAnnualisedReturn] = React.useState([-100, 500]);
  const [maxDrawdown, setMaxDrawdown] = React.useState([-100, 0]);
  const [openInfo, setOpenInfo] = React.useState(false);

  const [expanded, setExpanded] = React.useState(false);

  const handleCloseGuide = () => {
    setOpenGuide(false);
  };
  React.useEffect(() => {
    if (props.message !== null) {
      setOpenDialogMessage(true);
    }
  }, [props.message]);
  React.useEffect(() => {
    setOpenDialog(true);
    props.setMessage(null);
    setDefaultFilters();
    // props.fetchAnalystsForSubscriptions('somerandomtextfortesting');
  }, []);
  // Tabs Value ----------------------------------------
  const [value, setValue] = React.useState(0);
  const handleChangeIndex = index => {
    setValue(index);
  };
  const handleTabStateChange = (event, newValue) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    setExpanded(false);
  }, [value]);

  // Capital Available ----------------------------------
  const [capitalAvailable, setCapitalAvailable] = React.useState([10, 20000000]);
  const handleCapitalAvailableChange = (event, newValue) => {
    Mixpanel.track('Capital Available slider changed - Investor');
    setCapitalAvailable(newValue);
  };
  const handleFilterApplied = () => {
    props.fetchAnalystsForSubscriptions({});
  };
  const handleChangeSetSortBy = text => {
    
    Mixpanel.track('Sort Button Clicked - Investor');

    let newArr = sortBy;
    newArr = newArr.map(item => {
      if (item.text === text) {
        return { ...item, isSelected: !item.isSelected };
      } else {
        return { ...item, isSelected: false };
      }
    });
    setSortBy(newArr);
  };
  const handleChangeTradingSegment = text => {
    let newArr = tradingSegment;
    newArr = newArr.map(item => {
      if (item.text === text) {
        return { ...item, isSelected: !item.isSelected };
      } else {
        return item;
      }
    });
    setTradingSegment(newArr);
  };
  // Capital Available ----------------------------------
  // Boxes -----------------------------------------------
  const [sortBy, setSortBy] = React.useState([
    { id: 0, text: 'High -Low', isSelected: false },
    { id: 1, text: 'Low -High', isSelected: false },
    { id: 2, text: 'High - Low', isSelected: false },
    { id: 3, text: 'Low - High', isSelected: false }
  ]);
  const [tradingSegment, setTradingSegment] = React.useState([
    { id: 0, text: 'Cash', isSelected: false, value: 'EQUITY' },
    { id: 1, text: 'Options', isSelected: false, value: 'OPTIONS' },
    { id: 2, text: 'Future', isSelected: false, value: 'FUTURES' },
    { id: 3, text: 'Investment', isSelected: false, value: 'INVESTMENT' }
  ]);
  const [tradingType, setTradingType] = React.useState([
    { text: 'Intraday', isSelected: false },
    { text: 'Positional', isSelected: false }
  ]);
  React.useEffect(() => {
    if (props.filters) {
      setSortBy(props.filters.sortBy);
      setTradingSegment(props.filters.tradingSegment);
      setTradingType(props.filters.tradingType);
      setCapitalAvailable(props.filters.capitalAvailable);
      setAnnualisedReturn(props.filters.annualisedReturn);
      setMaxDrawdown(props.filters.maxDrawdown);
    }
  }, [props.filters]);

  const setDefaultFilters = () => {
    setOpenDialog(false);
    let tradingSegments = tradingSegment.map(item => {
      console.log(item);
      return item.value;
    });

    tradingSegments = tradingSegments.filter(item => item !== '');
    let tradingTypes = tradingType.map(item => {
      return item.text;
    });
    console.log(tradingSegments);
    tradingTypes = tradingTypes.filter(item => item !== '');
    const searchParams = {
      tradingSegment: '',
      tradingSegment: '',
      sortBy: '',
      minCapitalAvailable: '',
      maxCapitalAvailable: '',
      maxDrawdown: '',
      minDrawdown: '',
      minAnnualisedReturn: '',
      maxAnnualisedReturn: '',
      tradingTypes: ''
    };
    props.fetchAnalystsForSubscriptions({
      tradingSegment,
      sortBy,
      capitalAvailable,
      maxDrawdown,
      tradingType,
      annualisedReturn,
      searchParams
    });
  };
  return (
    <Slide direction='left' in={true} timeout={300} mountOnEnter unmountOnExit>
      <div>
        <Drawer
          anchor='bottom'
          open={openInfo}
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div
            className='py-3 pl-3'
            style={{
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
              boxShadow: '0 4px 8px #00000020',
              backgroundColor: '#2962ff'
            }}
          >
            <CloseIcon style={{ cursor: 'pointer', color: 'white' }} onClick={() => setOpenInfo(false)} />
          </div>
          <Row className='parent p-2'>
            <Col>
              <Row className='py-3 mt-2' style={{ boxShadow: '0 0 8px #00000020', borderRadius: '14px' }}>
                <div className='px-3 pt-1' style={{ width: '24%', boxSizing: 'border-box' }}>
                  <Image src={require('../../assets/images/svg/capital.svg')} style={{ width: '100%' }} />
                </div>
                <div className='pr-2' style={{ width: '76%' }}>
                  <h6 style={{ margin: '0' }}>Min. Capital</h6>
                  <p className='smaller' style={{ textAlign: 'justify', margin: '0' }}>
                    The minimum capital that the expert believes is required to be able to replicate their trades into
                    your demat account.
                  </p>
                </div>
              </Row>
              <Row className='py-3 mt-3' style={{ boxShadow: '0 0 8px #00000020', borderRadius: '14px' }}>
                <div className='px-3 pt-1' style={{ width: '24%', boxSizing: 'border-box' }}>
                  <Image src={require('../../assets/images/svg/MDD.svg')} style={{ width: '100%' }} />
                </div>
                <div className='pr-2' style={{ width: '76%' }}>
                  <h6 style={{ margin: '0' }}>Max. Drawdown</h6>
                  <p className='smaller' style={{ textAlign: 'justify', margin: '0' }}>
                    The maximum observed loss in percentage points from a peak value of the portfolio to its lowest
                    value, before a new peak is attained. It is an indicator of downside risk over a specified time
                    period.
                  </p>
                </div>
              </Row>
              <Row className='py-3 mt-3' style={{ boxShadow: '0 0 8px #00000020', borderRadius: '14px' }}>
                <div className='px-3 pt-1' style={{ width: '24%', boxSizing: 'border-box' }}>
                  <Image src={require('../../assets/images/svg/trade.svg')} style={{ width: '100%' }} />
                </div>
                <div className='pr-2' style={{ width: '76%' }}>
                  <h6 style={{ margin: '0' }}>Capital/Trade</h6>
                  <p className='smaller' style={{ textAlign: 'justify', margin: '0' }}>
                    The average of capital deployed across all previously taken trades by the expert. It serves to know
                    how the expert sizes part of the portfolio on any single trade. Higher the capital/trade on a given
                    portfolio size, higher the risk appetite.
                  </p>
                </div>
              </Row>
              <Row className='py-3 mt-3' style={{ boxShadow: '0 0 8px #00000020', borderRadius: '14px' }}>
                <div className='px-3 pt-1' style={{ width: '24%', boxSizing: 'border-box' }}>
                  <Image src={require('../../assets/images/svg/returns.svg')} style={{ width: '100%' }} />
                </div>
                <div className='pr-2' style={{ width: '76%' }}>
                  <h6 style={{ margin: '0' }}>Absolute Returns</h6>
                  <p className='smaller' style={{ textAlign: 'justify', margin: '0' }}>
                    The returns that the expert has generated after trading on Pvot. These are net absolute returns
                    calculated after deducting brokerage, STT, etc. that would typically be charged on the trades.
                  </p>
                </div>
              </Row>
            </Col>
          </Row>
        </Drawer>
        <Drawer
          anchor='bottom'
          open={openFilter}
          classes={{
            paper: classes.drawerPaper
          }}
          // onClose={}
          // onOpen={}
        >
          <div style={{ height: '100%' }}>
            <div style={{ backgroundColor: '#fafafa', padding: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <CloseIcon style={{ cursor: 'pointer' }} onClick={() => setOpenFilter(false)} />
              </div>
              <p style={{ color: '#bdbdbd', marginBottom: '2px' }}>Let's make it easy for you!</p>
              <p style={{ color: '#212121', marginBottom: '2px' }}>Sort By</p>
              <div style={{ backgroundColor: '#fff', padding: '10px' }}>
                <p style={{ marginBottom: '2px', color: '#616161' }}>
                  <AttachMoneyIcon />
                  &nbsp; Minimum Capital Required
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', padding: '0px 20px' }}>
                  <CustomBox
                    isSelected={sortBy[0].isSelected}
                    text={sortBy[0].text}
                    allowed={true}
                    handleChange={handleChangeSetSortBy}
                    height={'35px'}
                  />
                  <CustomBox
                    isSelected={sortBy[1].isSelected}
                    text={sortBy[1].text}
                    allowed={true}
                    handleChange={handleChangeSetSortBy}
                    height={'35px'}
                  />
                </div>
                <p style={{ marginTop: '4px', marginBottom: '2px', color: '#616161' }}>
                  <TimelineIcon /> &nbsp; Absolute Returns
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', padding: '0px 20px' }}>
                  <CustomBox
                    isSelected={sortBy[2].isSelected}
                    text={sortBy[2].text}
                    allowed={true}
                    handleChange={handleChangeSetSortBy}
                    height={'35px'}
                  />
                  <CustomBox
                    isSelected={sortBy[3].isSelected}
                    text={sortBy[3].text}
                    allowed={true}
                    handleChange={handleChangeSetSortBy}
                    height={'35px'}
                  />
                </div>
              </div>
              <p style={{ color: '#212121', marginBottom: '2px' }}>Filter By</p>
              <div style={{ backgroundColor: '#fff', padding: '10px', marginBottom: '40px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <p style={{ marginBottom: '3px', color: '#616161', fontSize: '13px', marginTop: '6px' }}>
                    Capital Available
                  </p>
                  <p style={{ marginBottom: '3px', color: '#616161', fontSize: '10px', marginTop: '6px' }}>
                    ₹{capitalAvailable[0].toLocaleString()} - ₹{capitalAvailable[1].toLocaleString()}
                  </p>
                </div>
                <Slider
                  value={capitalAvailable}
                  onChange={handleCapitalAvailableChange}
                  ValueLabelComponent={ValueLabelComponent}
                  valueLabelDisplay='auto'
                  aria-labelledby='range-slider'
                  min={0}
                  max={2000000}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <p style={{ marginBottom: '3px', color: '#616161', fontSize: '13px', marginTop: '6px' }}>
                    Absolute Return
                  </p>
                  <p style={{ marginBottom: '3px', color: '#616161', fontSize: '10px', marginTop: '6px' }}>
                    {annualisedReturn[0]}% - {annualisedReturn[1]}%+
                  </p>
                </div>
                <Slider
                  value={annualisedReturn}
                  onChange={(event, newRange) =>{
                    Mixpanel.track('Annualised returns slider changed - Investor');
                    setAnnualisedReturn(newRange)}}
                  valueLabelDisplay='auto'
                  ValueLabelComponent={ValueLabelComponent}
                  aria-labelledby='range-slider'
                  min={-100}
                  max={500}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <p style={{ marginBottom: '3px', color: '#616161', fontSize: '13px', marginTop: '6px' }}>
                    Max Drawdown
                  </p>
                  <p style={{ marginBottom: '3px', color: '#616161', fontSize: '10px', marginTop: '6px' }}>
                    {maxDrawdown[0]}% - {maxDrawdown[1]}%
                  </p>
                </div>
                <Slider
                  value={maxDrawdown}
                  onChange={(event, newRange) => {
                    Mixpanel.track('Max Drawdown slider changed - Investor');
                    setMaxDrawdown(newRange)}}
                  valueLabelDisplay='auto'
                  ValueLabelComponent={ValueLabelComponent}
                  aria-labelledby='range-slider'
                  min={-100}
                  max={0}
                />
              </div>
            </div>
            <div
              style={{
                position: 'fixed',
                bottom: '0px',
                width: '100%',
                backgroundColor: 'rgb(41, 98, 255)',
                color: '#fff',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '40px',
                zIndex: '999'
              }}
              onClick={() => {
                setOpenFilter(false);
                Mixpanel.track('Apply Filter Clicked - Investor');
                let tradingSegments = tradingSegment.map(item => {
                  if (item.isSelected) {
                    return item.value;
                  } else return '';
                });

                tradingSegments = tradingSegments.filter(item => item !== '');
                let tradingTypes = tradingType.map(item => {
                  if (item.isSelected) {
                    return item.text;
                  } else return '';
                });

                tradingTypes = tradingTypes.filter(item => item !== '');
                const searchParams = {
                  tradingSegment: tradingSegments.length > 0 ? tradingSegments.join() : '',
                  sortBy:
                    sortBy.filter(item => item.isSelected).length > 0
                      ? sortBy.filter(item => item.isSelected)[0].text
                      : '',
                  minCapitalAvailable: capitalAvailable[0],
                  maxCapitalAvailable: capitalAvailable[1],
                  maxDrawdown: maxDrawdown[1],
                  minDrawdown: maxDrawdown[0],
                  minAnnualisedReturn: annualisedReturn[0],
                  maxAnnualisedReturn: annualisedReturn[1],
                  tradingTypes: tradingTypes.length > 0 ? tradingTypes.join() : ''
                };
                props.fetchAnalystsForSubscriptions({
                  tradingSegment,
                  sortBy,
                  capitalAvailable,
                  maxDrawdown,
                  tradingType,
                  annualisedReturn,
                  searchParams
                });
              }}
            >
              Apply Filters
            </div>
          </div>
        </Drawer>
        <Header title={'Experts'} filter={true} setOpen={setOpenFilter} infoDrawer={true} setOpenInfo={setOpenInfo} searchIcon={true} onSearchClose={() => setSearchStr('')} searchValue={searchStr} onSearchChange={(e) => {setSearchStr(e.target.value)}} />
        <AppBar position='static' style={{ backgroundColor: '#fff', boxShadow: '0px 5px 4px #A9A9A8' }}>
          <StyledTabs
            value={value}
            disableTouchRipple={true}
            variant='fullWidth'
            indicatorColor='none'
            onChange={handleTabStateChange}
            aria-label='simple tabs example'
          >
            <StyledTab
              label='Invest'
              disableTouchRipple={true}
              {...a11yProps(0)}
              style={{
                color: value === 0 ? '#2962ff' : 'black',
                textTransform: 'none'
              }}
            />
            <StyledTab
              label='Trade'
              disableTouchRipple={true}
              {...a11yProps(1)}
              style={{
                color: value === 1 ? '#2962ff' : 'black',
                textTransform: 'none'
              }}
            />
          </StyledTabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={value}
          style={{
            width: '100%',
            marginTop: '5px'
          }}
          containerStyle={{
            width: '100%',
            height: '78vh'
            // overflowY: 'auto'
          }}
          onChangeIndex={handleChangeIndex}
        >
          {/******************** Investment Tabpanel *********************************/}
          <div style={{ padding: '0 0.2rem' }}>
            {props.analystsForSubscription !== null ? (
              props.analystsForSubscription.filter(item => item.segment.name === 'INVESTMENT').length > 0 ? (
                props.analystsForSubscription
                  .filter(item => item.segment.name === 'INVESTMENT')
                  .filter(item => item.analyst_info.user.name.toLowerCase().search(searchStr.toLowerCase()) !== -1)
                  .sort((a, b) => {
                    if (sortBy[0].isSelected) {
                      return -(a.capital_required - b.capital_required);
                    } else if (sortBy[1].isSelected) {
                      return a.capital_required - b.capital_required;
                    } else if (sortBy[2].isSelected) {
                      return -(a.percentage_returns.toFixed(1) - b.percentage_returns.toFixed(1));
                    } else if (sortBy[3].isSelected) {
                      return a.percentage_returns.toFixed(1) - b.percentage_returns.toFixed(1);
                    }
                  })
                  .map((d, idx) => {
                    if (
                      d.capital_required >= capitalAvailable[0] &&
                      d.capital_required <= capitalAvailable[1] &&
                      d.percentage_returns.toFixed(1) >= annualisedReturn[0] &&
                      d.percentage_returns.toFixed(1) <= annualisedReturn[1] &&
                      d.max_draw_down.toFixed(1) >= maxDrawdown[0] &&
                      d.max_draw_down.toFixed(1) <= maxDrawdown[1]
                    ) {
                      return (
                        <AnalystCard
                          data={d}
                          idx={idx}
                          expanded={expanded}
                          setExpanded={setExpanded}
                          tabValue={value}
                        />
                      );
                    }
                  })
              ) : (
                <Row>
                  <Col>
                    <Image
                      src={require('../../assets/images/svg/Investor_No_Activity.svg')}
                      className='user-on-board-image'
                    />
                  </Col>
                </Row>
              )
            ) : (
              <Loading />
            )}
          </div>

          {/******************** Trade Tabpanel *********************************/}

          <div style={{ padding: '0 0.2rem' }}>
            {props.analystsForSubscription !== null ? (
              props.analystsForSubscription.filter(item => item.segment.name !== 'INVESTMENT').length > 0 ? (
                props.analystsForSubscription
                  .filter(item => item.segment.name !== 'INVESTMENT')
                  .filter(item => item.analyst_info.user.name.toLowerCase().search(searchStr.toLowerCase()) !== -1)
                  .sort((a, b) => {
                    if (sortBy[0].isSelected) {
                      return -(a.capital_required - b.capital_required);
                    } else if (sortBy[1].isSelected) {
                      return a.capital_required - b.capital_required;
                    }
                  })
                  .sort((a, b) => {
                    if (sortBy[2].isSelected) {
                      return -(a.percentage_returns.toFixed(1) - b.percentage_returns.toFixed(1));
                    } else if (sortBy[3].isSelected) {
                      return a.percentage_returns.toFixed(1) - b.percentage_returns.toFixed(1);
                    }
                  })
                  .map((d, idx) => {
                    if (
                      d.capital_required >= capitalAvailable[0] &&
                      d.capital_required <= capitalAvailable[1] &&
                      d.percentage_returns.toFixed(1) >= annualisedReturn[0] &&
                      d.percentage_returns.toFixed(1) <= annualisedReturn[1] &&
                      d.max_draw_down.toFixed(1) >= maxDrawdown[0] &&
                      d.max_draw_down.toFixed(1) <= maxDrawdown[1]
                    ) {
                      return (
                        <AnalystCard
                          data={d}
                          idx={idx}
                          expanded={expanded}
                          setExpanded={setExpanded}
                          tabValue={value}
                        />
                      );
                    }
                  })
              ) : (
                <Row>
                  <Col>
                    <Image
                      src={require('../../assets/images/svg/Investor_No_Activity.svg')}
                      className='user-on-board-image'
                    />
                  </Col>
                </Row>
              )
            ) : (
              <Loading />
            )}
          </div>
          {/* </TabPanel> */}
        </SwipeableViews>
      </div>
    </Slide>
  );
};

const mapStateToProps = state => ({
  message: state.auth.message,
  signinData: state.auth.signinData,
  analystsForSubscription: state.user.analystsForSubscription,
  filters: state.user.filters
});

const mapDispatchToProps = dispatch => ({
  setMessage: message => dispatch(actions.setMessage(message)),
  fetchAnalystsForSubscriptions: params => dispatch(actions.fetchAnalystsForSubscriptions(params)),
  changeHomeState: params => dispatch(actions.changeHomeState(params))
});

export default connect(mapStateToProps, mapDispatchToProps)(UserBrowseAnalysts);
