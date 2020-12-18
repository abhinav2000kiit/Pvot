import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import BrowserDashboard from '../BrowserDashboard/BrowserDashboard';
import BrowserTrade from '../BrowserTrade';

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

export default function SimpleTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar
        position='static'
        style={{
          backgroundColor: 'transparent',
          boxShadow: '0px 0px 0px #A9A9A8',
          marginTop: '1rem',
          marginBottom: '1rem'
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label='simple tabs example'
          centered
          style={{ backgroundColor: 'transparent', color: 'black' }}
        >
          <Tab label='Dashboard' {...a11yProps(0)} style={{ fontSize: '18px', borderBottom: '1px solid gray' }} />
          <Tab label='Trades' {...a11yProps(1)} style={{ fontSize: '18px', borderBottom: '1px solid gray' }} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <BrowserDashboard />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <BrowserTrade />
      </TabPanel>
    </div>
  );
}
