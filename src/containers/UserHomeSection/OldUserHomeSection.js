import React from 'react';
import { Row, Col } from 'react-bootstrap';
import FilterListIcon from '@material-ui/icons/FilterList';
//import Divider from '@material-ui/core/Divider';
import TimelineIcon from '@material-ui/icons/Timeline';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import VirtualTradeItem from '../components/VirtualTradeItem/User';
import PropTypes from 'prop-types';
import BottomNavigation from '../components/BottomNavigator';

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

const technicalVirtualTradeList = [
  {
    scrip_name: 'SBIN FO',
    type: 'OPTIONS',
    status: 'profit',
    post_date: '12 Nov 2019',
    lock: true,
    order_price: 4.2,
    target_price: 4.2,
    value: -9.25,
    quantity: 1200,
    stop_loss: 1200,
    gain: 2000,
    analyst: 'Vignesh Shivan'
  },
  {
    scrip_name: 'SBIN FO',
    type: 'CASH',
    status: 'loss',
    post_date: '12 Nov 2019',
    lock: true,
    order_price: 4.2,
    target_price: 4.2,
    value: -9.25,
    quantity: 1200,
    stop_loss: 1200,
    gain: 2000,
    analyst: 'Anna Jonnes'
  },
  {
    scrip_name: 'SBIN FO',
    type: 'FUTURE',
    status: 'profit',
    post_date: '12 Nov 2019',
    lock: false,
    order_price: 4.2,
    target_price: 4.2,
    value: -9.25,
    quantity: 1200,
    stop_loss: 1200,
    gain: 2000,
    analyst: 'Vignesh Shivan'
  },
  {
    scrip_name: 'SBIN FO',
    type: 'INVESTMENT',
    status: 'loss',
    post_date: '12 Nov 2019',
    lock: true,
    order_price: 4.2,
    target_price: 4.2,
    value: -9.25,
    quantity: 1200,
    stop_loss: 1200,
    gain: 2000,
    analyst: 'Anna Jonnes'
  }
];
const fundamentalVirtualTradeList = [
  {
    scrip_name: 'SBIN FO',
    type: 'CASH',
    status: 'loss',
    post_date: '12 Nov 2019',
    lock: false,
    order_price: 4.2,
    target_price: 4.2,
    value: -9.25,
    quantity: 1200,
    stop_loss: 1200,
    gain: 2000,
    analyst: 'Anna Jonnes'
  },
  {
    scrip_name: 'SBIN FO',
    type: 'FUTURE',
    status: 'profit',
    post_date: '12 Nov 2019',
    lock: false,
    order_price: 4.2,
    target_price: 4.2,
    value: -9.25,
    quantity: 1200,
    stop_loss: 1200,
    gain: 2000,
    analyst: 'Vignesh Shivan'
  },
  {
    scrip_name: 'SBIN FO',
    type: 'INVESTMENT',
    status: 'loss',
    post_date: '12 Nov 2019',
    lock: false,
    order_price: 4.2,
    target_price: 4.2,
    value: -9.25,
    quantity: 1200,
    stop_loss: 1200,
    gain: 2000,
    analyst: 'Vignesh Shivan'
  }
];

const Home = props => {
  const [value, setValue] = React.useState(0);

  const handleTabStateChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Row style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', marginBottom: '0px' }}>
        <p className='text-center pvot-header' style={{ fontSize: '22px' }}>
          Pvot
        </p>
      </Row>
      <Row>
        <Col lg={6} md={6} sm={6} xs={6} style={{ padding: '0px' }}>
          <div style={{ margin: '10px 5px 10px 10px', padding: '10px', backgroundColor: '#e9eefe', height: '180px' }}>
            <p style={{ marginBottom: '3px' }}>
              <TimelineIcon />
            </p>
            <p style={{ fontSize: 'inherit', fontWeight: '500', height: '35px' }}>Subscription Performance</p>
            <Row style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <p style={{ marginBottom: '3px', fontSize: 'inherit' }}>Profit</p>
                {/* <p style={{marginBottom:'3px',fontSize:'10px'}}>
                                    ₹20000
                                </p> */}
                <p style={{ marginBottom: '3px' }}>
                  <span
                    style={{
                      backgroundColor: '#69e182',
                      color: 'white',
                      borderRadius: '3px',
                      fontSize: 'inherit',
                      padding: '4px'
                    }}
                  >
                    21.2%
                  </span>
                </p>
              </div>
              <div style={{ width: '2px', borderRight: '1px solid #cbccd0' }} />
              <div>
                <p style={{ marginBottom: '3px', fontSize: 'inherit' }}>Capital</p>
                <p style={{ marginBottom: '3px', fontSize: 'inherit' }}>₹20000</p>
                {/* <p style={{marginBottom:'3px'}}>
                                    <span style={{backgroundColor:'#69e182',color:'white',borderRadius:'3px',fontSize:'12px',padding:'4px'}}>21.2%</span>
                                </p> */}
              </div>
            </Row>
          </div>
        </Col>
        <Col lg={6} md={6} sm={6} xs={6} style={{ padding: '0px' }}>
          <div style={{ margin: '10px 10px 10px 5px', padding: '10px', backgroundColor: '#e9eefe', height: '180px' }}>
            <p style={{ marginBottom: '3px' }}>
              <AttachMoneyIcon />
            </p>
            <p style={{ fontSize: 'inherit', fontWeight: '500', height: '35px' }}>My Transactions</p>
            <Row style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <p style={{ marginBottom: '3px', fontSize: 'inherit' }}>Open</p>
                <p style={{ marginBottom: '3px' }}>
                  <span
                    style={{
                      backgroundColor: '#3367f6',
                      color: 'white',
                      borderRadius: '3px',
                      fontSize: 'inherit',
                      padding: '4px'
                    }}
                  >
                    ₹20000
                  </span>
                </p>
              </div>
              <div style={{ width: '2px', borderRight: '1px solid #cbccd0' }} />
              <div>
                <p style={{ marginBottom: '3px', fontSize: 'inherit' }}>Total</p>
                <p style={{ marginBottom: '3px', fontSize: 'inherit' }}>₹200000</p>
                {/* <p style={{marginBottom:'3px'}}>
                                    <span style={{backgroundColor:'#69e182',color:'white',borderRadius:'3px',fontSize:'12px',padding:'4px'}}>21.2%</span>
                                </p> */}
              </div>
            </Row>
          </div>
        </Col>
      </Row>
      <div style={{ marginBottom: '40px' }}>
        <AppBar position='static' style={{ backgroundColor: '#fff', boxShadow: '0px 5px 4px #A9A9A8' }}>
          <Tabs
            value={value}
            variant='fullWidth'
            indicatorColor='none'
            onChange={handleTabStateChange}
            aria-label='simple tabs example'
          >
            <Tab
              label='Technical'
              {...a11yProps(0)}
              style={{
                borderBottom: value === 0 ? '2px solid #2962ff' : '',
                color: value === 0 ? '#2962ff' : 'black',
                textTransform: 'none'
              }}
            />
            <Tab
              label='Fundamental'
              {...a11yProps(1)}
              style={{
                borderBottom: value === 1 ? '2px solid #2962ff' : '',
                color: value === 1 ? '#2962ff' : 'black',
                textTransform: 'none'
              }}
            />
          </Tabs>
        </AppBar>
        <TabPanel className='tabs' value={value} index={0} style={{ padding: '0px' }}>
          <div style={{ padding: '5px', width: '100%', marginTop: '15px' }}>
            {technicalVirtualTradeList.map(v => (
              <VirtualTradeItem profile='user' data={v} />
            ))}
            {/* <VirtualTradeItem />
                            <VirtualTradeItem />
                            <VirtualTradeItem />
                            <VirtualTradeItem /> */}
          </div>
        </TabPanel>
        <TabPanel className='tabs' value={value} index={1}>
          <div style={{ padding: '5px', width: '100%', marginTop: '15px' }}>
            {fundamentalVirtualTradeList.map(v => (
              <VirtualTradeItem profile='user' data={v} />
            ))}
            {/* <VirtualTradeItem />
                            <VirtualTradeItem />
                            <VirtualTradeItem />
                            <VirtualTradeItem /> */}
          </div>
        </TabPanel>
      </div>
      <BottomNavigation />
    </>
  );
};

export default Home;
