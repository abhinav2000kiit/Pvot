import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import * as actions from '../../redux/actions';
import { connect } from 'react-redux';

import PublicProfileBrowser from '../UserViewAnalystProfileBrowser';
import AnalystBasicDetailBrowser from '../AnalystBasicDetailBrowser';
import PortfolioAllocation from '../AnalystTradeAllocationBrowser/AnanlystPortfolioAllocationBrowser';
import SubscriptionPlan from '../AnalystCreateSubscriptionPlanBrowser/SubscriptionBrowserDisplay';

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
    <>
      <div
        role='tabpanel'
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <>{children}</>
          </Box>
        )}
      </div>
    </>
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
    flexGrow: 1
  }
}));

function AnalystProfileBrowser(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(
    props && props.location ? (props.location.param ? parseInt(props.location.param) : 0) : 0
  );

  React.useEffect(() => {
    props.getAnalystDetails();
    setValue(props && props.location ? (props.location.param ? parseInt(props.location.param) : 0) : 0);
  }, [props.location.param]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@', props);

  return (
    <div className={classes.root} style={{ paddingLeft: '5rem', paddingRight: '5rem' }}>
      <AppBar
        position='static'
        style={{ backgroundColor: 'transparent', marginTop: '3rem', boxShadow: '0px 0px 0px #A9A9A8' }}
      >
        <StyledTabs
          value={value}
          onChange={handleChange}
          aria-label='simple tabs example'
          style={{ backgroundColor: 'transparent', color: '#212121', borderBottom: '0.5px solid #B1AEC1' }}
        >
          <StyledTab
            disableTouchRipple={true}
            aria-label='simple tabs example'
            style={{
              color: value === 0 ? '#565EBF' : '#212121',
              textTransform: 'none'
            }}
            label='Public Profile'
            {...a11yProps(0)}
          />
          <StyledTab
            disableTouchRipple={true}
            aria-label='simple tabs example'
            style={{
              color: value === 1 ? '#565EBF' : '#212121',
              textTransform: 'none'
            }}
            label='Profile Details'
            {...a11yProps(1)}
          />
          <StyledTab
            disableTouchRipple={true}
            aria-label='simple tabs example'
            style={{
              color: value === 2 ? '#565EBF' : '#212121',
              textTransform: 'none'
            }}
            label='Portfolio Allocation'
            {...a11yProps(2)}
          />
          <StyledTab
            disableTouchRipple={true}
            aria-label='simple tabs example'
            style={{
              color: value === 3 ? '#565EBF' : '#212121',
              textTransform: 'none'
            }}
            label='Subscription Plans'
            {...a11yProps(3)}
          />
        </StyledTabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <PublicProfileBrowser
          user={props && props.analystDetails && props.analystDetails.user ? props.analystDetails.user.user_id : null}
          analystDetails={props.analystDetails}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <AnalystBasicDetailBrowser />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <PortfolioAllocation />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <SubscriptionPlan />
      </TabPanel>
    </div>
  );
}

const mapStateToProps = state => ({
  analystDetails: state.analyst.analystDetails,
  subscriptionPlan: state.analyst.subscriptionPlan,
  userGroup: state.auth.userGroup,
  analystsForSubscriptionDetails: state.user.analystsForSubscriptionDetails,
  loading: state.analyst.loading
});

const mapDispatchToProps = dispatch => ({
  getAnalystDetails: () => dispatch({ type: 'GET_ANALYST_DETAILS' })
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AnalystProfileBrowser));
