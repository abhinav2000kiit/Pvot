import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import * as actions from '../../redux/actions/index';
import PropTypes from 'prop-types';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import qs from 'qs';
import './UserViewAnalystProfile.css';
import { withRouter } from 'react-router-dom';
import RecentTrades from './RecentTrades';
import Returns from './Returns';
import Bio from './Bio';
import Performance from './Performance';

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
    color: '#2B2B2B',
    textAlign: 'right',
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),
    '&:focus': {
      opacity: 1
    },
    wrapper: {
      alignItems: "flex-start"
  }
  }
}))(props => <Tab disableRipple {...props} />);

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
    borderRadius: 0,
    width: '100%'
  }
})(props => (
  <Menu
    fullWidth
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'start'
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'start'
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles(theme => ({
  root: {
    '&:focus': {
      backgroundColor: '#ffffff',
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: '#2B2B2B'
      }
    }
  }
}))(props => <MenuItem {...props} />);

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex'
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`
  },
  tabpanel: {
    width: '100%'
  }
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      component='div'
      role='tabpanel'
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
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
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`
  };
}

const ViewAnalyst = props => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const public_page = props.history && props.history.location.pathname === '/analyst-public-profile-view';

  let analyst_id = public_page
    ? qs.parse(props.history.location.search, { ignoreQueryPrefix: true }).analyst_id
    : props.history.location && props.history.location.state
    ? props.history.location.state.user_id
    : props.user
    ? props.user
    : null;

  React.useEffect(() => {
    if (analyst_id) {
      props.fetchPerformanceAndTransactionsData({ analyst_id });
      props.fetchRecentlyClosedTrades({ analyst_id });
    }
    return () => {
      // props.setMessage(null);
      props.savePerformanceAndTransactionsData();
      props.saveRecentlyClosedTrades();
    };
  }, []);

  const data = props.analystsForSubscriptionDetails ? props.analystsForSubscriptionDetails : null;

  const [followed, setFollowed] = React.useState(
    props.analystsForSubscriptionDetails ? props.analystsForSubscriptionDetails.followed : false
  );

  React.useEffect(() => {
    setFollowed(
      !followed
        ? props.analystsForSubscriptionDetails
          ? props.analystsForSubscriptionDetails.followed
          : false
        : followed
    );
  });

  console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@', props);

  return (
    <div>
      <div className={classes.root}>
        <StyledTabs
          orientation='vertical'
          variant='scrollable'
          value={value}
          onChange={handleChange}
          aria-label='Vertical tabs example'
          className={classes.tabs}
        >
          <StyledTab
            disableTouchRipple={true}
            aria-label='simple tabs example'
            style={{
              color: value === 0 ? '#565EBF' : '#2B2B2B',
              textTransform: 'none', wrapper: {textAlign: "right"},
            }}
            label='PROFILE'
            {...a11yProps(0)} classes={{labelContainer: {textAlign: "right"}}}
          />
          <StyledTab
            disableTouchRipple={true}
            aria-label='simple tabs example'
            style={{
              color: value === 1 ? '#565EBF' : '#2B2B2B',
              textTransform: 'none'
            }}
            label='PERFORMANCE'
            {...a11yProps(1)}
          />
          <StyledTab
            disableTouchRipple={true}
            aria-label='simple tabs example'
            style={{
              color: value === 2 ? '#565EBF' : '#2B2B2B',
              textTransform: 'none'
            }}
            label='RECENT TRADES'
            {...a11yProps(2)}
          />
          <StyledTab
            disableTouchRipple={true}
            aria-label='simple tabs example'
            style={{
              color: value === 3 ? '#565EBF' : '#2B2B2B',
              textTransform: 'none'
            }}
            label='RETURNS'
            {...a11yProps(3)}
          />
        </StyledTabs>
        <TabPanel style={{ width: '89%' }} value={value} index={0} className={classes.tabpanel}>
          <Bio
            history={props.history}
            number={props.tradecount.total_trades}
            analystsForSubscriptionDetails={props.analystsForSubscriptionDetails}
          />
        </TabPanel>
        <TabPanel style={{ width: '89%' }} value={value} index={1} className={classes.tabpanel}>
          <Performance analystsForSubscriptionDetails={props.analystsForSubscriptionDetails} />
        </TabPanel>
        <TabPanel style={{ width: '89%' }} value={value} index={2} className={classes.tabpanel}>
          <RecentTrades recentlyClosedTradeList={props.recentlyClosedTradeList} data={data} />
        </TabPanel>
        <TabPanel style={{ width: '89%' }} value={value} index={3} className={classes.tabpanel}>
          <Returns analystsForSubscriptionDetails={props.analystsForSubscriptionDetails} />
        </TabPanel>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  message: state.auth.message,
  signinData: state.auth.signinData,
  analystsForSubscription: state.user.analystsForSubscription,
  analystsForSubscriptionDetails: state.user.analystsForSubscriptionDetails,
  filters: state.user.filters,
  recentlyClosedTradeList: state.user.recentlyClosedTradeList,
  analystSubscriptionPlanList: state.user.analystSubscriptionPlanList,
  paymentLinkForSubscription: state.user.paymentLinkForSubscription,
  analystMessage: state.user.analystMessage,
  tradecount: state.analyst.tradeCounts
});

const mapDispatchToProps = dispatch => ({
  setMessage: message => dispatch(actions.setMessage(message)),
  fetchAnalystsForSubscriptions: params => dispatch(actions.fetchAnalystsForSubscriptions(params)),
  fetchPerformanceAndTransactionsData: params => dispatch(actions.fetchPerformanceAndTransactionsData(params)),
  savePerformanceAndTransactionsData: () => dispatch(actions.savePerformanceAndTransactionsData(null)),
  fetchRecentlyClosedTrades: params => dispatch(actions.fetchRecentlyClosedTrades(params)),
  saveRecentlyClosedTrades: () => dispatch(actions.saveRecentlyClosedTrades(null))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ViewAnalyst));
