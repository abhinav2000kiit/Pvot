import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Dashboard from './index';
import Leaderboard from '../AnalystLeaderboardBrowser';
import * as actions from '../../redux/actions/index';
import { connect } from 'react-redux';

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
      {value === index && (
        <Box p={3}>
          <>{children}</>
        </Box>
      )}
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

const BrowserDashboard = props => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    props.getAnalystLeaderboard();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root} style={{ paddingLeft: '5rem', paddingRight: '5rem' }}>
      <AppBar style={{ backgroundColor: 'transparent', boxShadow: '0px 0px 0px #A9A9A8' }} position='static'>
        <StyledTabs
          style={{ backgroundColor: 'transparent', color: '#2B2B2B', borderBottom: '0.5px solid #B1AEC1' }}
          value={value}
          onChange={handleChange}
          aria-label='simple tabs example'
        >
          <StyledTab
            disableTouchRipple={true}
            aria-label='simple tabs example'
            style={{
              color: value === 0 ? '#565EBF' : '#2B2B2B',
              textTransform: 'none'
            }}
            label='Summary'
            {...a11yProps(0)}
          />
          <StyledTab
            disableTouchRipple={true}
            aria-label='simple tabs example'
            style={{
              color: value === 1 ? '#565EBF' : '#2B2B2B',
              textTransform: 'none'
            }}
            label='Leaderboard'
            {...a11yProps(1)}
          />
        </StyledTabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Dashboard />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Leaderboard analyst_leaderboard={props.analyst_leaderboard} />
      </TabPanel>
    </div>
  );
};

const mapStateToProps = state => ({
  message: state.auth.message,
  analyst_leaderboard: state.analyst.analyst_leaderboard
});

const mapDispatchToProps = dispatch => ({
  setMessage: message => dispatch(actions.setMessage(message)),
  getAnalystLeaderboard: () => dispatch(actions.getAnalystLeaderboard())
});

export default connect(mapStateToProps, mapDispatchToProps)(BrowserDashboard);
