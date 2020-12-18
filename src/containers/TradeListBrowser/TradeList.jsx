import React from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import Chart from 'react-google-charts';
import PropTypes from 'prop-types';
import { makeStyles, withStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import Tab from '@material-ui/core/Tab';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import FilterListIcon from '@material-ui/icons/FilterList';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import VirtualTradeItemBrowser from '../components/VirtualTradeItemBrowser';
import BottomNavigation from '../components/BottomNavigator';
import * as actions from '../../redux/actions/index';
import SwipeableViews from 'react-swipeable-views';
import Slide from '@material-ui/core/Slide';
import Loading from '../Loading/Loading';
import './VirtualTradeItemBrowser.css';

const StyledTabs = withStyles({
  indicator: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    '& > span': {
      width: '100%',
      backgroundColor: '#565EBF'
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
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <>{children}</>}
    </div>
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

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
}));

const TradeList = props => {
  const [value, setValue] = React.useState(0);
  const classes = useStyles();
  const [openDialog, setOpenDialog] = React.useState(false);

  const getData = () => {
    // props.setTradeItem();
  };

  React.useEffect(() => {
    getData();
  }, []);

  React.useEffect(() => {
    if (props.refreshData) {
      getData();
      props.isRefreshData(false);
    }
  }, [props.refreshData]);

  const handleTabStateChange = (event, newValue) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    if (props.message) {
      props.setMessage(props.message);
    }
    if (props.message) {
      setOpenDialog(true);
    }
  }, [props.message]);
  // console.log('@@@@@@@@@@@@@@@@@@@@@@', tradeList);

  return (
    <>
      <div className={classes.root} style={{ paddingLeft: '5rem', paddingRight: '5rem' }}>
        <AppBar
          position='static'
          style={{ backgroundColor: 'transparent', marginTop: '3rem', boxShadow: '0px 0px 0px #A9A9A8' }}
        >
          <StyledTabs
            value={value}
            onChange={handleTabStateChange}
            aria-label='simple tabs example'
            style={{ backgroundColor: 'transparent', color: '#212121', borderBottom: '0.5px solid #B1AEC1' }}
          >
            <StyledTab
              label='Technical'
              disableTouchRipple={true}
              {...a11yProps(0)}
              aria-label='simple tabs example'
              style={{
                color: value === 0 ? '#565EBF' : '#212121',
                textTransform: 'none'
              }}
            />
            <StyledTab
              label='Fundamental'
              disableTouchRipple={true}
              {...a11yProps(1)}
              aria-label='simple tabs example'
              style={{
                color: value === 1 ? '#565EBF' : '#212121',
                textTransform: 'none'
              }}
            />
            <StyledTab
              label='Inactive'
              disableTouchRipple={true}
              {...a11yProps(2)}
              aria-label='simple tabs example'
              style={{
                color: value === 2 ? '#565EBF' : '#212121',
                textTransform: 'none'
              }}
            />
            <div
              onClick={() => props.setCheck(true)}
              className='ml-auto'
              // style={{ float: 'right', cursor: 'pointer', position: 'relative', right: '8rem', paddingTop: '0.5rem' }}
            >
              <div
                style={{
                  border: '1px solid #565EBF',
                  color: '#565EBF',
                  borderRadius: '3rem',
                  padding: '0.5rem 1rem 0.5rem 1rem',
                  cursor: 'pointer'
                }}
              >
                POST NEW TRADE
              </div>
            </div>
          </StyledTabs>
        </AppBar>

        <TabPanel style={{ paddingTop: '2rem' }} value={value} index={0}>
          {/******************** Technical Trades Tabpanel *********************************/}
          {!props.loader || props.tradeList ? (
            <div>
              {props.tradeList &&
              props.tradeList.filter(
                item => item.segment.name !== 'INVESTMENT' && (item.status === 'OPEN' || item.status === 'EXECUTED')
              ).length > 0 ? (
                <div className='row row-cols-3'>
                  {props.tradeList
                    .filter(
                      item =>
                        item.segment.name !== 'INVESTMENT' && (item.status === 'OPEN' || item.status === 'EXECUTED')
                    )
                    .sort((a, b) => {
                      if (a.updated_date < b.updated_date) return 1;
                      return -1;
                    })
                    .map((v, i) => (
                      <div className='col mb-4' key={i}>
                        <VirtualTradeItemBrowser
                          setCheck={props.setCheck}
                          data={v}
                          id={`trade${i}`}
                          user={props.analystDetails.user}
                        />
                      </div>
                    ))}
                </div>
              ) : (
                // <Typography className='text-secondary' align='center'>
                //   No Trade Found
                // </Typography>
                <Row>
                  <Col style={{ display: 'flex', justifyContent: 'center' }}>
                    <Image
                      style={{ display: 'flex', justifyContent: 'center' }}
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
          {/* </TabPanel>
              <TabPanel style={{paddingTop: '1.5rem'}} className='tabs' value={value} index={1}> */}
        </TabPanel>
        <TabPanel style={{ paddingTop: '2rem' }} className='tabs' value={value} index={1}>
          {/******************** Fundamental Trades Tabpanel *********************************/}
          {!props.loader || props.tradeList ? (
            <div>
              {props.tradeList &&
              props.tradeList.filter(
                item => item.segment.name === 'INVESTMENT' && (item.status === 'OPEN' || item.status === 'EXECUTED')
              ).length > 0 ? (
                <div className='row row-cols-3'>
                  {' '}
                  {props.tradeList
                    .filter(
                      item =>
                        item.segment.name === 'INVESTMENT' && (item.status === 'OPEN' || item.status === 'EXECUTED')
                    )
                    .sort((a, b) => {
                      if (a.updated_date < b.updated_date) return 1;
                      return -1;
                    })
                    .map((v, i) => (
                      <div className='col mb-4' key={i}>
                        <VirtualTradeItemBrowser
                          setCheck={props.setCheck}
                          data={v}
                          id={`trade${i}`}
                          user={props.analystDetails.user}
                        />
                      </div>
                    ))}{' '}
                </div>
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
          {/* </TabPanel>
              <TabPanel style={{paddingTop: '1.5rem'}} className='tabs' value={value} index={2}> */}
        </TabPanel>
        <TabPanel style={{ paddingTop: '2rem' }} className='tabs' value={value} index={2}>
          {/******************** Inactive Trades Tabpanel *********************************/}
          {!props.loader || props.tradeList ? (
            <div>
              {props.tradeList &&
              props.tradeList.filter(
                item => item.status === 'CLOSED' || item.status === 'EXPIRED' || item.status === 'CANCELLED'
              ).length > 0 ? (
                <div className='row row-cols-3'>
                  {' '}
                  {props.tradeList
                    .filter(
                      item => item.status === 'CLOSED' || item.status === 'EXPIRED' || item.status === 'CANCELLED'
                    )
                    .sort((a, b) => {
                      if (a.updated_date < b.updated_date) return 1;
                      return -1;
                    })
                    .map((v, i) => (
                      <div className='col mb-4' key={i}>
                        <VirtualTradeItemBrowser
                          setCheck={props.setCheck}
                          data={v}
                          id={`trade${i}`}
                          user={props.analystDetails.user}
                        />
                      </div>
                    ))}{' '}
                </div>
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
          {/* </TabPanel> */}
        </TabPanel>
      </div>

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
              setOpenDialog(false);
            }}
            color='primary'
            autoFocus
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>

      <Loading open={props.loading} popover />
    </>
  );
};

const mapStateToProps = state => ({
  analystDetails: state.analyst.analystDetails,
  signinData: state.auth.signinData,
  loader: state.auth.loader,
  message: state.auth.message,
  profileImage: state.auth.profileImage,
  loading: state.analyst.loading
});

const mapDispatchToProps = dispatch => ({
  setMessage: message => dispatch(actions.setMessage(message)),
  setTradeItem: () => dispatch(actions.setTradeItem(null))
});

export default connect(mapStateToProps, mapDispatchToProps)(TradeList);
