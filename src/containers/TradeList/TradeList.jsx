import React from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import Chart from 'react-google-charts';
import PropTypes from 'prop-types';
import { makeStyles, withStyles, useTheme } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import FilterListIcon from '@material-ui/icons/FilterList';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import VirtualTradeItem from '../components/VirtualTradeItem';
import BottomNavigation from '../components/BottomNavigator';
import * as actions from '../../redux/actions/index';
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
  const { children, value, index, tradeList, ...other } = props;

  return (
    <Typography
      component='div'
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <>{children}</>
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

const TradeList = props => {
  const theme = useTheme();

  const [value, setValue] = React.useState(0);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const { tradeList } = props;

  const getData = () => {
    props.getTradeList();
    props.setTradeItem();
  };

  React.useEffect(() => {
    if (props.message !== null) {
      setOpenDialog(true);
    }

    setLoading(props.loading);

    getData();
  }, [props.message, props.loading]);

  React.useEffect(() => {
    if (props.refreshData) {
      Mixpanel.track('Refresh Data in TradesList(JSX) - Expert');
      getData();
      props.isRefreshData(false);
    }
  }, [props.refreshData]);

  const handleTabStateChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = index => {
    setValue(index);
  };

  // React.useEffect(() => {
  //   if (props.message) {
  //     props.setMessage(null);
  //   }
  // }, [props.message]);

  console.log('@@@@@@@@@@@@@@@@@@@@@@', props);

  return (
    <div>
      <Slide direction='left' in={true} mountOnEnter unmountOnExit>
        {/* <Row style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px', marginBottom: '20px' }}>
        <div></div>
        <p className='text-center pvot-header' style={{ fontSize: '22px' }}>
          Pvot
        </p>
        <div></div> */}
        {/* <FilterListIcon style={{ marginRight: '10px', cursor: 'pointer' }} /> */}
        {/* </Row> */}

        <div>
          <div style={{ marginBottom: '40px' }}>
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
                  label='Technical'
                  disableTouchRipple={true}
                  {...a11yProps(0)}
                  // style={{
                  //   borderBottom: value === 0 ? '2px solid #2962ff' : '',
                  //   color: 'black',
                  //   textTransform: 'none'
                  // }}
                  style={{
                    color: value === 0 ? '#2962ff' : 'black',
                    textTransform: 'none'
                  }}
                />
                <StyledTab
                  label='Fundamental'
                  disableTouchRipple={true}
                  {...a11yProps(1)}
                  // style={{
                  //   borderBottom: value === 1 ? '2px solid #2962ff' : '',
                  //   color: 'black',
                  //   textTransform: 'none'
                  // }}
                  style={{
                    color: value === 1 ? '#2962ff' : 'black',
                    textTransform: 'none'
                  }}
                />
                <StyledTab
                  label='Inactive'
                  disableTouchRipple={true}
                  {...a11yProps(2)}
                  // style={{
                  //   borderBottom: value === 2 ? '2px solid #2962ff' : '',
                  //   color: 'black',
                  //   textTransform: 'none'
                  // }}
                  style={{
                    color: value === 2 ? '#2962ff' : 'black',
                    textTransform: 'none'
                  }}
                />
              </StyledTabs>
            </AppBar>
            <SwipeableViews
              axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
              index={value}
              // animateHeight
              style={{
                width: '100%',
                marginTop: '15px'
              }}
              containerStyle={{
                width: '100%',
                height: '78vh'
                // overflowY: 'auto'
              }}
              onChangeIndex={handleChangeIndex}
            >
              {/* <TabPanel className='tabs' value={value} index={0} style={{ padding: '0px' }}> */}
              {/******************** Technical Trades Tabpanel *********************************/}
              <div style={{ padding: '0 10px' }}>
                {!props.loader || props.tradeList ? (
                  <div>
                    {tradeList &&
                    tradeList.filter(
                      item =>
                        item.segment.name !== 'INVESTMENT' && (item.status === 'OPEN' || item.status === 'EXECUTED')
                    ).length > 0 ? (
                      tradeList
                        .filter(
                          item =>
                            item.segment.name !== 'INVESTMENT' && (item.status === 'OPEN' || item.status === 'EXECUTED')
                        )
                        .sort((a, b) => {
                          if (a.updated_date < b.updated_date) return 1;
                          return -1;
                        })
                        .map((v, i) => (
                          <VirtualTradeItem data={v} id={`trade${i}`} user={props.analystDetails.user} key={i} />
                        ))
                    ) : (
                      // <Typography className='text-secondary' align='center'>
                      //   No Trade Found
                      // </Typography>
                      <Row>
                        <Col>
                          <Image
                            src={require('../../assets/images/svg/Investor_No_Activity.svg')}
                            className='user-on-board-image'
                          />
                        </Col>
                      </Row>
                    )}
                  </div>
                ) : (
                  <Loading height='68vh' />
                )}
              </div>
              {/* </TabPanel>
              <TabPanel className='tabs' value={value} index={1}> */}
              {/******************** Fundamental Trades Tabpanel *********************************/}
              <div style={{ padding: '0 10px' }}>
                {!props.loader || props.tradeList ? (
                  <div>
                    {tradeList &&
                    tradeList.filter(
                      item =>
                        item.segment.name === 'INVESTMENT' && (item.status === 'OPEN' || item.status === 'EXECUTED')
                    ).length > 0 ? (
                      tradeList
                        .filter(
                          item =>
                            item.segment.name === 'INVESTMENT' && (item.status === 'OPEN' || item.status === 'EXECUTED')
                        )
                        .sort((a, b) => {
                          if (a.updated_date < b.updated_date) return 1;
                          return -1;
                        })
                        .map((v, i) => (
                          <VirtualTradeItem data={v} id={`trade${i}`} user={props.analystDetails.user} key={i} />
                        ))
                    ) : (
                      // <Typography className='text-secondary' align='center'>
                      //   No Trade Found
                      // </Typography>
                      <Row>
                        <Col>
                          <Image
                            src={require('../../assets/images/svg/Investor_No_Activity.svg')}
                            className='user-on-board-image'
                          />
                        </Col>
                      </Row>
                    )}
                  </div>
                ) : (
                  <Loading height='68vh' />
                )}
              </div>
              {/* </TabPanel>
              <TabPanel className='tabs' value={value} index={2}> */}
              {/******************** Inactive Trades Tabpanel *********************************/}
              <div style={{ padding: '0 10px' }}>
                {!props.loader || props.tradeList ? (
                  <div>
                    {tradeList &&
                    tradeList.filter(
                      item => item.status === 'CLOSED' || item.status === 'EXPIRED' || item.status === 'CANCELLED'
                    ).length > 0 ? (
                      tradeList
                        .filter(
                          item => item.status === 'CLOSED' || item.status === 'EXPIRED' || item.status === 'CANCELLED'
                        )
                        .sort((a, b) => {
                          if (a.updated_date < b.updated_date) return 1;
                          return -1;
                        })
                        .map((v, i) => (
                          <VirtualTradeItem data={v} id={`trade${i}`} user={props.analystDetails.user} key={i} />
                        ))
                    ) : (
                      // <Typography className='text-secondary' align='center'>
                      //   No Trade Found
                      // </Typography>
                      <Row>
                        <Col>
                          <Image
                            src={require('../../assets/images/svg/Investor_No_Activity.svg')}
                            className='user-on-board-image'
                          />
                        </Col>
                      </Row>
                    )}
                  </div>
                ) : (
                  <Loading height='68vh' />
                )}
              </div>
              {/* </TabPanel> */}
            </SwipeableViews>
          </div>
        </div>
      </Slide>
      {/* <BottomNavigation /> */}
      <Dialog
        open={openDialog}
        // onClose={() => setOpenDialog(false)}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{props.message}</DialogTitle>
        <DialogActions>
          <Button
            onClick={() => {
              props.setMessage(null);
              // props.handleCloseFilter();

              //setSomeValueChanged(false)
              setOpenDialog(false);
            }}
            color='primary'
            autoFocus
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>

      <Loading open={loading} popover />
    </div>
  );
};

const mapStateToProps = state => ({
  analystDetails: state.analyst.analystDetails,
  signinData: state.auth.signinData,
  loader: state.auth.loader,
  tradeList: state.analyst.tradeList,
  message: state.auth.message,
  profileImage: state.auth.profileImage,
  loading: state.analyst.loading
});

const mapDispatchToProps = dispatch => ({
  getTradeList: token => dispatch(actions.getTradeList(token)),
  setMessage: message => dispatch(actions.setMessage(message)),
  setTradeItem: () => dispatch(actions.setTradeItem(null))
});

export default connect(mapStateToProps, mapDispatchToProps)(TradeList);
