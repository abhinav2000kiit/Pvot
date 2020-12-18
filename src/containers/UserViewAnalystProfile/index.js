import React from 'react';
import { Image, Row, Col } from 'react-bootstrap';
import {
  Button,
  Typography,
  TextField,
  RadioGroup,
  Radio,
  FormControlLabel,
  CircularProgress,
  Dialog,
  DialogContent
} from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { connect } from 'react-redux';
import Header from '../components/Header/customHeader';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ErrorOutlineOutlinedIcon from '@material-ui/icons/ErrorOutlineOutlined';
import * as actions from '../../redux/actions/index';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import TradeItem from '../components/VirtualTradeItem';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles, useTheme } from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';
import SwipeableViews from 'react-swipeable-views';
import ShareIcon from '@material-ui/icons/Share';
import KeyboardBack from '@material-ui/icons/KeyboardBackspaceSharp';
import ColumnCharts from '../Graphs/ColumnCharts';
import qs, { parse } from 'qs';
import moment from 'moment';
import ApexColumn from '../Graphs/ApexColumn';
import './UserViewAnalystProfile.scss';
import Grow from '@material-ui/core/Grow';
import waiting from '../../assets/gifs/waiting.gif';
import Loading from '../Loading/Loading';

import { Mixpanel } from '../../shared/mixPanel'

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
        color: '#212121'
      }
    }
  }
}))(props => <MenuItem {...props} />);

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      component='div'
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {children}
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

const ViewAnalyst = props => {
  const theme = useTheme();
  const public_page = props.history.location.pathname === '/analyst-public-profile-view';
  if (!public_page && props.history.location.state === undefined) {
    return <div></div>;
  }
  let analyst_id = public_page
    ? qs.parse(props.history.location.search, { ignoreQueryPrefix: true }).analyst_id
    : props.history.location.state
    ? props.history.location.state.user_id
    : null;
  const segment = props.history.location.state ? props.history.location.state.segment : null;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [tabValue, setTabValue] = React.useState('EQUITY');

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = e => {
    setAnchorEl(null);
  };

  const handleChange = e => {
    if (e !== tabValue) {
      setTabValue(e);
    }
    setAnchorEl(null);
  };

  React.useEffect(() => {
    if (analyst_id) {
      props.fetchPerformanceAndTransactionsData({ analyst_id });
      props.fetchRecentlyClosedTrades({ analyst_id });
    }
    return () => {
      props.setMessage(null);
      props.savePerformanceAndTransactionsData();
      props.saveRecentlyClosedTrades();
    };
  }, []);
  const data = props.analystsForSubscriptionDetails ? props.analystsForSubscriptionDetails : null;

  const [value, setValue] = React.useState(0);
  const [followed, setFollowed] = React.useState(
    props.analystsForSubscriptionDetails ? props.analystsForSubscriptionDetails.followed : false
  );
  const toggleFollowed = () => {
    setFollowed(!followed);
  };
  const handleTabStateChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = index => {
    Mixpanel.track('Swipe pages tracked - profile page');
    setValue(index);
  };

  React.useEffect(() => {
    setFollowed(
      !followed
        ? props.analystsForSubscriptionDetails
          ? props.analystsForSubscriptionDetails.followed
          : false
        : followed
    );
  });

  const follow = id => {
    if (followed) {
      Mixpanel.track('Unfollow Clicked - profile page');
      props.unFollowAnalyst(id);
      toggleFollowed();
    } else {
      Mixpanel.track('Follow Clicked - profile page');
      props.followAnalyst(id);
      toggleFollowed();
    }
  };

  const [charts, setCharts] = React.useState([]);

  React.useEffect(() => {
    props.analystsForSubscriptionDetails &&
      Object.entries(props.analystsForSubscriptionDetails.monthly_returns).map(key => {
        charts.push({ key: key[0], value: <ColumnCharts data={key[1]} /> });
      });
  }, []);

  const sectorAllocations = props.analystsForSubscriptionDetails
    ? props.analystsForSubscriptionDetails.analyst_info
      ? props.analystsForSubscriptionDetails.analyst_info.segment_list
        ? props.analystsForSubscriptionDetails.analyst_info.segment_list.map(allocation => {
            return {
              name: allocation.segment.name,
              allocation: allocation.initial_allocation
            };
          })
        : null
      : { allocation: 0 }
    : '';

  const findSum = arr => {
    let sum = 0;
    arr.map(item => {
      sum = sum + item.allocation;
    });
    return sum;
  };
  const [subscription, setSubscription] = React.useState(null);
  const [lowerScreen, setLowerScreen] = React.useState(false);
  const [shouldGo, setShouldGo] = React.useState(false);

  const handleRadioChange = e => {
    Mixpanel.track('Plan selection radio Clicked - profile page');
    setSubscription(e.target.value);
  };
  const openLowerScreen = e => {
    setLowerScreen(true);
  };
  const closeLowerScreen = e => {
    setLowerScreen(false);
  };
  if (props.paymentLinkForSubscription && shouldGo) {
    window.location.href = props.paymentLinkForSubscription.payment_link;
  }
  // console.log('==============data', data)
  const handleShare = e => {
    Mixpanel.track('Share page Clicked - profile page');
    const baseUrl = 'https://m.pvot.in/analyst-public-profile-view?analyst_id=';
    let text;
    var profilePhoneNumber;
    if (
      props.signinData &&
      profilePhoneNumber === props.signinData.user.UserAttributes.filter(item => item.Name === 'phone_number')[0].Value
    ) {
      text = `Check my trading performance on Pvot by clicking the link. Download pvot to copy my trades and make profits.\n\n`;
    } else {
      text = `${data.analyst_info.user.name} is trading on Pvot. Click the link to see their performance. Download Pvot to copy trades from top experts.\n\n`;
    }
    if (navigator.share) {
      navigator.share({
        text,
        url: `${baseUrl}${analyst_id}`
      });
    }
    console.log(e);
  };

  console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@', props);

  return (
    <Grow in={true} timeout={500}>
      <div>
        {lowerScreen ? <div onClick={closeLowerScreen} className='black-screen'></div> : null}
        <Header
          title={'Profile'}
          backButton
          backTo={() => props.history.push('/')}
          shareButton
          shareClick={handleShare}
        />

        {/* <Row className='mt-4'>
        <Col className='center-col'>
          <div
            style={{ position: 'absolute', left: '12px' }}
            onClick={() => {
              props.history.push('/user/user-home');
              // props.changeHomeState(1);
            }}
          >
            <KeyboardBack style={{ color: '#2962ff' }} />
          </div>
          <div
            className='analyst-profile-header signin-span-not-a-member-blue mr-5'
            style={{ fontWeight: '600', fontSize: '1rem' }}
          >
            Profile
          </div>
          {data ? (
            <div onClick={handleShare} style={{ position: 'absolute', right: '12px' }}>
              <ShareIcon style={{ color: '#2962ff', fontSize: '1.3rem' }} />
            </div>
          ) : null}
        </Col>
      </Row> */}
        {data && (
          <div style={{ maxWidth: '100%' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '45% 55%',
                backgroundColor: '#fff',
                padding: '20px 20px 0px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'center', alignSelf: 'center', position: 'relative' }}>
                {data ? (
                  <Image
                    src={
                      data.analyst_info && data.analyst_info.profile_picture
                        ? data.analyst_info.profile_picture
                        : require('../../assets/images/jpeg/placeholder.jpg')
                    }
                    roundedCircle
                    style={{ height: '100px', width: '100px', zIndex: '999' }}
                  />
                ) : (
                  <Image
                    src={props.profileImage ? props.profileImage : require('../../assets/images/jpeg/placeholder.jpg')}
                    roundedCircle
                    style={{ height: '100px', width: '100px', zIndex: '999' }}
                  />
                )}
                <Image
                  src={require('../../assets/images/DotsGrid.png')}
                  style={{ height: '130px', width: '130px', position: 'absolute', top: '-15px' }}
                />
              </div>
              <div>
                <div>
                  <Typography variant='h6'>
                    <center>{data ? <>{data.analyst_info && data.analyst_info.user.name}</> : ''}</center>
                  </Typography>
                </div>
                <div style={{ margin: '0.5rem 0.5rem 0.5rem 0px' }}>
                  {props.signinData ? (
                    props.analystDetails && props.analystDetails.user.user_id === analyst_id ? null : (
                      <Button
                        variant='outlined'
                        fullWidth
                        style={{
                          height: '30px',
                          textTransform: 'none',
                          padding: '2px',
                          color: '#2962ff',
                          borderColor: '#2962ff'
                        }}
                        onClick={() => {
                          follow(data.analyst_info.user.user_id);
                        }}
                      >
                        {followed === true ? 'Unfollow' : 'Follow'}
                      </Button>
                    )
                  ) : null}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '50% 50%', padding: '0.5rem 0.5rem 0px' }}>
                  <div
                    onClick={
                      props.userGroup === 'ANALYST'
                        ? () => {
                          Mixpanel.track('Followers Clicked - profile page');
                          props.history.push('/followers', { list: 'Followers' })}
                        : null
                    }
                    style={{ textAlign: 'center' }}
                  >
                    <p style={{ color: '#23374d', fontWeight: '600', marginBottom: '5px' }}>
                      {props.analystsForSubscriptionDetails ? props.analystsForSubscriptionDetails.followers_count : 0}
                    </p>
                    <p style={{ color: '#bdbdbd', fontWeight: '500' }}>Followers</p>
                  </div>
                  <div
                    onClick={
                      props.userGroup === 'ANALYST'
                        ? () => {
                          Mixpanel.track('Subscribers Clicked - profile page');
                          props.history.push('/subscribers', { list: 'Subscribers' })}
                        : null
                    }
                    style={{ textAlign: 'center' }}
                  >
                    {/* <p style={{ color: '#23374d', fontWeight: '600', marginBottom: '5px' }}>{count}</p> */}
                    <p style={{ color: '#23374d', fontWeight: '600', marginBottom: '5px' }}>
                      {props.analystsForSubscriptionDetails ? props.analystsForSubscriptionDetails.subscriber_count : 0}
                    </p>
                    <p style={{ color: '#bdbdbd', fontWeight: '500' }}>Subscribers</p>
                  </div>
                </div>
              </div>
            </div>
            <div className='w-100 pl-3 pr-3'>
              <Button
                aria-controls='customized-menu'
                aria-haspopup='true'
                variant='contained'
                onClick={handleClick}
                className='w-100 rounded-0 text-white'
                style={{ backgroundColor: '#2962ff' }}
              >
                {tabValue} <ExpandMoreIcon />
              </Button>
              <StyledMenu
                id='customized-menu'
                anchorEl={anchorEl}
                keepMounted
                selected={tabValue}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                style={{ width: '100%' }}
              >
                <StyledMenuItem value='EQUITY' onClick={() => { 
                  Mixpanel.track('Equity Clicked - profile page');
                  handleChange('EQUITY')}}>
                  <ListItemText primary='EQUITY' />
                </StyledMenuItem>
                <StyledMenuItem value='OPTIONS' onClick={() => {
                  Mixpanel.track('Options Clicked - profile page');
                  handleChange('OPTIONS')}}>
                  <ListItemText primary='OPTIONS' />
                </StyledMenuItem>
                <StyledMenuItem value='FUTURES' onClick={() => {
                  Mixpanel.track('Futures Clicked - profile page');
                  handleChange('FUTURES')}}>
                  <ListItemText primary='FUTURES' />
                </StyledMenuItem>
                <StyledMenuItem value='INVESTMENT' onClick={() => {
                  Mixpanel.track('Investment Clicked - profile page');
                  handleChange('INVESTMENT')}}>
                  <ListItemText primary='INVESTMENT' />
                </StyledMenuItem>
              </StyledMenu>
            </div>
            <AppBar position='static' style={{ backgroundColor: '#fff', boxShadow: '0px 5px 4px #A9A9A8' }}>
              <Tabs
                value={value}
                indicatorColor='none'
                variant='scrollable'
                scrollButtons='auto'
                onChange={handleTabStateChange}
                aria-label='simple tabs example'
              >
                <Tab
                  label='Bio'
                  {...a11yProps(0)}
                  style={{
                    borderBottom: value === 0 ? '2px solid #2962ff' : '',
                    color: value === 0 ? '#2962ff' : 'black',
                    textTransform: 'none'
                  }}
                />
                <Tab
                  label='Recent Trades'
                  {...a11yProps(1)}
                  style={{
                    borderBottom: value === 1 ? '2px solid #2962ff' : '',
                    color: value === 1 ? '#2962ff' : 'black',
                    textTransform: 'none'
                  }}
                />
                <Tab
                  label='Monthly Returns'
                  {...a11yProps(2)}
                  style={{
                    borderBottom: value === 2 ? '2px solid #2962ff' : '',
                    color: value === 2 ? '#2962ff' : 'black',
                    textTransform: 'none'
                  }}
                />
                <Tab
                  label='Performance'
                  {...a11yProps(3)}
                  style={{
                    borderBottom: value === 3 ? '2px solid #2962ff' : '',
                    color: value === 3 ? '#2962ff' : 'black',
                    textTransform: 'none'
                  }}
                />
              </Tabs>
            </AppBar>
            <SwipeableViews
              axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
              index={value}
              onChangeIndex={handleChangeIndex}
              style={{
                width: '100%',
                marginTop: '15px'
              }}
              containerStyle={{
                width: '100%',
                height: '60vh'
              }}
            >
              {/******************** Bio Tabpanel *********************************/}
              <div style={{ padding: '0 10px', marginBottom: '40px' }}>
                <div className='card'>
                  <div style={{ marginBottom: '2rem' }}>
                    <div style={{ fontSize: '1.1rem', fontWeight: '500', marginBottom: '0.7rem' }}>
                      About{' '}
                      {props.analystsForSubscriptionDetails
                        ? props.analystsForSubscriptionDetails.analyst_info
                          ? props.analystsForSubscriptionDetails.analyst_info.user.name
                            ? props.analystsForSubscriptionDetails.analyst_info.user.name.substr(
                                0,
                                props.analystsForSubscriptionDetails.analyst_info.user.name.indexOf(' ')
                              )
                            : ''
                          : ''
                        : ''}
                    </div>
                    <div style={{ fontSize: '1rem', opacity: '0.8', lineHeight: '1.5' }}>
                      {/* {props.analystsForSubscriptionDetails
                      ? props.analystsForSubscriptionDetails.analyst_info
                        ? props.analystsForSubscriptionDetails.analyst_info.about
                          ? props.analystsForSubscriptionDetails.analyst_info.about
                          : ''
                        : ''
                      : ''} */}
                      <div
                        dangerouslySetInnerHTML={{
                          __html: props.analystsForSubscriptionDetails
                            ? props.analystsForSubscriptionDetails.analyst_info
                              ? props.analystsForSubscriptionDetails.analyst_info.about
                                ? props.analystsForSubscriptionDetails.analyst_info.about
                                : ''
                              : ''
                            : ''
                        }}
                      />
                    </div>
                  </div>

                  {props.analystsForSubscriptionDetails ? (
                    props.analystsForSubscriptionDetails.analyst_info ? (
                      props.analystsForSubscriptionDetails.analyst_info.work_experience ? (
                        props.analystsForSubscriptionDetails.analyst_info.work_experience.length > 0 ? (
                          <div style={{ marginBottom: '2rem' }}>
                            <div style={{ fontSize: '1.1rem', fontWeight: '500', marginBottom: '0.7rem' }}>
                              Work Experience
                            </div>
                            <div className='m-0 p-0'>
                              {props.analystsForSubscriptionDetails.analyst_info.work_experience.map(exp => {
                                return (
                                  <div style={{ fontSize: '1rem', opacity: '0.8', marginBottom: '0.3rem' }}>
                                    {`${exp.position} at ${exp.position}`}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        ) : null
                      ) : null
                    ) : null
                  ) : (
                    ''
                  )}

                  {props.analystsForSubscriptionDetails ? (
                    props.analystsForSubscriptionDetails.analyst_info ? (
                      props.analystsForSubscriptionDetails.analyst_info.education ? (
                        <div style={{ marginBottom: '2rem' }}>
                          <div style={{ fontSize: '1.1rem', fontWeight: '500', marginBottom: '0.7rem' }}>
                            Educational Qualification
                          </div>
                          <div style={{ fontSize: '1rem', opacity: '0.8' }}>
                            {props.analystsForSubscriptionDetails.analyst_info.education}
                          </div>
                          {props.analystsForSubscriptionDetails.analyst_info.sebi_registered ? (
                            props.analystsForSubscriptionDetails.analyst_info.sebi_registered === true ? (
                              <div style={{ fontSize: '1rem', opacity: '0.8' }}>
                                {`Reg No: ${props.analystsForSubscriptionDetails.analyst_info.sebi_registration_number}`}
                              </div>
                            ) : null
                          ) : null}
                        </div>
                      ) : null
                    ) : null
                  ) : (
                    ''
                  )}

                  {props.analystsForSubscriptionDetails ? (
                    props.analystsForSubscriptionDetails.analyst_info ? (
                      props.analystsForSubscriptionDetails.analyst_info.trading_experience ? (
                        <div style={{ marginBottom: '2rem' }}>
                          <div style={{ fontSize: '1.1rem', fontWeight: '500', marginBottom: '0.7rem' }}>
                            Trading Experience
                          </div>
                          <div style={{ fontSize: '1rem', opacity: '0.8' }}>
                            {`${props.analystsForSubscriptionDetails.analyst_info.trading_experience} years`}
                          </div>
                        </div>
                      ) : null
                    ) : null
                  ) : (
                    ''
                  )}

                  {props.analystsForSubscriptionDetails ? (
                    props.analystsForSubscriptionDetails.analyst_info ? (
                      props.analystsForSubscriptionDetails.analyst_info.success_stories ? (
                        <div style={{ marginBottom: '1.5rem' }}>
                          <div style={{ fontSize: '1.1rem', fontWeight: '500', marginBottom: '1.3rem' }}>
                            Success Stories
                          </div>
                          <div style={{ marginBottom: '0.4rem', marginTop: '0.4rem', padding: '0 0.5rem' }}>
                            <div style={{ fontSize: '0.8rem', opacity: '0.8', margin: '0.5rem 0' }}>21 July 2019</div>
                            <div style={{ fontSize: '1.2rem', marginBottom: '1rem', fontWeight: '500' }}>
                              Safari industries
                            </div>
                            <div className='row text-center'>
                              <div className='col p-0 m-0'>
                                <div style={{ fontSize: '1.2rem', fontWeight: '600' }}>₹7500</div>
                                <div style={{ fontSize: '0.8rem', opacity: '0.8' }}>Price of safari industries</div>
                              </div>
                              <div className='col p-0 m-0'>
                                <div style={{ fontSize: '1.2rem', fontWeight: '600' }}>₹12,010</div>
                                <div style={{ fontSize: '0.8rem', opacity: '0.8' }}>Price of BSE SmallCap Index</div>
                              </div>
                            </div>
                          </div>
                          <hr />
                        </div>
                      ) : null
                    ) : null
                  ) : (
                    ''
                  )}

                  {sectorAllocations ? (
                    <div style={{ marginBottom: '2rem' }}>
                      <div style={{ fontSize: '1.1rem', fontWeight: '500', marginBottom: '0.7rem' }}>
                        Total Allocation
                      </div>
                      <div style={{ fontSize: '1rem', opacity: '0.8' }}>{`₹ ${findSum(sectorAllocations)}`}</div>
                    </div>
                  ) : null}

                  {sectorAllocations ? (
                    <div style={{ marginBottom: '2rem' }}>
                      <div style={{ fontSize: '1.1rem', fontWeight: '500', marginBottom: '0.7rem' }}>
                        Portfolio Allocation
                      </div>
                      <div className='row' style={{ margin: '0' }}>
                        {sectorAllocations.map(allocation => {
                          return (
                            <div className='col p-0 m-0 text-center'>
                              <div style={{ fontSize: '1.2rem', fontWeight: '600' }}>
                                {findSum(sectorAllocations) === 0
                                  ? 0
                                  : `${((allocation.allocation * 100) / findSum(sectorAllocations)).toFixed(1)}%`}
                              </div>
                              <div style={{ fontSize: '0.8rem', opacity: '0.8' }}>{allocation.name}</div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>

              {/******************** Recent Trades Tabpanel *********************************/}
              <div style={{ padding: '0 10px', marginBottom: '40px' }}>
                {props.recentlyClosedTradeList ? (
                  props.recentlyClosedTradeList.length > 0 ? (
                    props.recentlyClosedTradeList.filter(item => item.segment.name === tabValue).length > 0 ? (
                      props.recentlyClosedTradeList
                        .filter(item => item.segment.name === tabValue)
                        .map((v, idx) => (
                          <TradeItem profile='user' user={data.analyst_info.user} id={`trade${idx}`} data={v} />
                        ))
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
                  <Loading height='40vh' />
                )}
              </div>

              {/******************** Monthly Returns Tabpanel *********************************/}
              <div style={{ padding: '0 10px', marginBottom: '40px' }}>
                {props && tabValue && props.analystsForSubscriptionDetails ? (
                  props.analystsForSubscriptionDetails.monthly_returns[tabValue] ? (
                    <ApexColumn data={props.analystsForSubscriptionDetails.monthly_returns[tabValue]} />
                  ) : null
                ) : null}
              </div>

              {/******************** Performance Tabpanel *********************************/}
              <div style={{ padding: '0 10px', marginBottom: '40px' }}>
                <div className='card'>
                  <div style={{ borderBottom: '1px dashed #212121', marginLeft: '10px' }}>
                    <span
                      style={{
                        fontSize: '1.2rem',
                        color: '#000000',
                        lineHeight: '2.4rem'
                      }}
                    >
                      Additional Stats
                    </span>
                  </div>

                  <div style={{ margin: '15px 5px', backgroundColor: '#fff', padding: '5px' }}>
                    <div style={{ marginBottom: '0.5rem' }}>
                      <Typography variant='subtitle1' style={{ color: '#212121' }}>
                        {'Trade Success'}
                      </Typography>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '50% 50%' }}>
                      <div>
                        <Typography variant='subtitle2' style={{ color: '#212121', marginBottom: '0.5rem' }}>
                          {'Profitable Trades'}
                        </Typography>
                        <Typography variant='subtitle2' style={{ color: '#2962ff' }}>
                          {tabValue &&
                          props.analystsForSubscriptionDetails &&
                          props.analystsForSubscriptionDetails.performance[tabValue] &&
                          Object.values(props.analystsForSubscriptionDetails.performance[tabValue]).length > 0
                            ? props.analystsForSubscriptionDetails.performance[tabValue].PROFITABLE_TRADES
                            : 0}
                        </Typography>
                      </div>
                      <div>
                        <Typography variant='subtitle2' style={{ color: '#212121', marginBottom: '0.5rem' }}>
                          {'Loss Making Trades'}
                        </Typography>
                        <Typography variant='subtitle2' style={{ color: '#2962ff' }}>
                          {tabValue &&
                          props.analystsForSubscriptionDetails &&
                          props.analystsForSubscriptionDetails.performance[tabValue] &&
                          Object.values(props.analystsForSubscriptionDetails.performance[tabValue]).length > 0
                            ? props.analystsForSubscriptionDetails.performance[tabValue].LOSS_MAKING_TRADES
                            : 0}
                        </Typography>
                      </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '50% 50%' }} className='mt-2'></div>
                  </div>

                  <div style={{ margin: '15px 5px', backgroundColor: '#fff', padding: '5px' }}>
                    <div style={{ marginBottom: '0.5rem' }}>
                      <Typography variant='subtitle1' style={{ color: '#212121' }}>
                        {'Trade Analytics'}
                      </Typography>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '50% 25% 25%' }}>
                      <div>
                        <div style={{ fontSize: '14px', marginBottom: '8px' }}>
                          <br />{' '}
                        </div>
                        <Typography variant='subtitle2' color='textSecondary'>
                          {'Capital Per Trade'}
                        </Typography>
                        <Typography variant='subtitle2' color='textSecondary'>
                          {'Risk : Reward'}
                        </Typography>
                        <Typography variant='subtitle2' color='textSecondary'>
                          {'Trade Duration (Days)'}
                        </Typography>
                      </div>

                      <div>
                        <Typography variant='subtitle2' style={{ color: '#212121', marginBottom: '0.5rem' }}>
                          {'Average'}
                        </Typography>
                        <Typography variant='subtitle2' style={{ color: '#2962ff' }}>
                          {tabValue &&
                          props.analystsForSubscriptionDetails &&
                          props.analystsForSubscriptionDetails.performance[tabValue] &&
                          Object.values(props.analystsForSubscriptionDetails.performance[tabValue]).length > 0
                            ? props.analystsForSubscriptionDetails.performance[tabValue].CAPITAL_PER_TRADE_AVERAGE
                            : 0}
                        </Typography>
                        <Typography variant='subtitle2' style={{ color: '#2962ff' }}>
                          {tabValue &&
                          props.analystsForSubscriptionDetails &&
                          props.analystsForSubscriptionDetails.performance[tabValue] &&
                          Object.values(props.analystsForSubscriptionDetails.performance[tabValue]).length > 0
                            ? props.analystsForSubscriptionDetails.performance[tabValue].RISK_REWARD_AVERAGE
                            : 0}
                        </Typography>
                        <Typography variant='subtitle2' style={{ color: '#2962ff' }}>
                          {tabValue &&
                          props.analystsForSubscriptionDetails &&
                          props.analystsForSubscriptionDetails.performance[tabValue] &&
                          Object.values(props.analystsForSubscriptionDetails.performance[tabValue]).length > 0
                            ? props.analystsForSubscriptionDetails.performance[tabValue].TRADE_DURATION_AVERAGE
                            : 0}
                        </Typography>
                      </div>
                      <div>
                        <Typography variant='subtitle2' style={{ color: '#212121', marginBottom: '0.5rem' }}>
                          {'Median'}
                        </Typography>
                        <Typography variant='subtitle2' style={{ color: '#2962ff' }}>
                          {tabValue &&
                          props.analystsForSubscriptionDetails &&
                          props.analystsForSubscriptionDetails.performance[tabValue] &&
                          Object.values(props.analystsForSubscriptionDetails.performance[tabValue]).length > 0
                            ? props.analystsForSubscriptionDetails.performance[tabValue].CAPITAL_PER_TRADE_MEDIAN
                            : 0}
                        </Typography>
                        <Typography variant='subtitle2' style={{ color: '#2962ff' }}>
                          {tabValue &&
                          props.analystsForSubscriptionDetails &&
                          props.analystsForSubscriptionDetails.performance[tabValue] &&
                          Object.values(props.analystsForSubscriptionDetails.performance[tabValue]).length > 0
                            ? props.analystsForSubscriptionDetails.performance[tabValue].RISK_REWARD_MEDIAN
                            : 0}
                        </Typography>
                        <Typography variant='subtitle2' style={{ color: '#2962ff' }}>
                          {tabValue &&
                          props.analystsForSubscriptionDetails &&
                          props.analystsForSubscriptionDetails.performance[tabValue] &&
                          Object.values(props.analystsForSubscriptionDetails.performance[tabValue]).length > 0
                            ? props.analystsForSubscriptionDetails.performance[tabValue].TRADE_DURATION_MEDIAN
                            : 0}
                        </Typography>
                      </div>
                    </div>
                  </div>

                  <div style={{ margin: '15px 5px', backgroundColor: '#fff', padding: '5px' }}>
                    <div style={{ marginBottom: '0.5rem' }}>
                      <Typography variant='subtitle1' style={{ color: '#212121' }}>
                        {'Portfolio Analytics'}
                      </Typography>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '24% 38% 38%' }}>
                      <div>
                        <div style={{ fontSize: '14px', marginBottom: '8px' }}>
                          <br />{' '}
                        </div>
                        <Typography variant='subtitle2' color='textSecondary'>
                          {'30 Days'}
                        </Typography>
                        <Typography variant='subtitle2' color='textSecondary'>
                          {'Life Time'}
                        </Typography>
                      </div>
                      <div>
                        <Typography variant='subtitle2' style={{ color: '#212121', marginBottom: '0.5rem' }}>
                          {'Max Drawdown'}
                        </Typography>
                        <Typography variant='subtitle2' style={{ color: '#2962ff', marginLeft: '0.5rem' }}>
                          {tabValue &&
                          props.analystsForSubscriptionDetails &&
                          props.analystsForSubscriptionDetails.performance[tabValue] &&
                          Object.values(props.analystsForSubscriptionDetails.performance[tabValue]).length > 0
                            ? props.analystsForSubscriptionDetails.performance[tabValue].MAX_DRAWDOWN_LAST_MONTH
                            : 0}
                        </Typography>
                        <Typography variant='subtitle2' style={{ color: '#2962ff', marginLeft: '0.5rem' }}>
                          {tabValue &&
                          props.analystsForSubscriptionDetails &&
                          props.analystsForSubscriptionDetails.performance[tabValue] &&
                          Object.values(props.analystsForSubscriptionDetails.performance[tabValue]).length > 0
                            ? props.analystsForSubscriptionDetails.performance[tabValue].MAX_DRAWDOWN_LIFE_TIME
                            : 0}
                        </Typography>
                      </div>
                      <div>
                        <Typography variant='subtitle2' style={{ color: '#212121', marginBottom: '0.5rem' }}>
                          {'Days to Recovery'}
                        </Typography>
                        <Typography variant='subtitle2' style={{ color: '#2962ff', marginLeft: '0.5rem' }}>
                          {tabValue &&
                          props.analystsForSubscriptionDetails &&
                          props.analystsForSubscriptionDetails.performance[tabValue] &&
                          Object.values(props.analystsForSubscriptionDetails.performance[tabValue]).length > 0
                            ? props.analystsForSubscriptionDetails.performance[tabValue].DAYS_TO_RECOVERY_LAST_MONTH
                            : 0}
                        </Typography>
                        <Typography variant='subtitle2' style={{ color: '#2962ff', marginLeft: '0.5rem' }}>
                          {tabValue &&
                          props.analystsForSubscriptionDetails &&
                          props.analystsForSubscriptionDetails.performance[tabValue] &&
                          Object.values(props.analystsForSubscriptionDetails.performance[tabValue]).length > 0
                            ? props.analystsForSubscriptionDetails.performance[tabValue].DAYS_TO_RECOVERY_LIFE_TIME
                            : 0}
                        </Typography>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwipeableViews>
            {!props.signinData ? (
              <Row className='subscribe-button center-row pointer' onClick={() => props.history.push('/')}>
                <Col className='text-center'>
                  <span>Sign up</span>
                </Col>
              </Row>
            ) : null}
            {props.userGroup === 'USER' ? (
              <Row className='subscribe-button center-row pointer' onClick={openLowerScreen}>
                <Col
                  onClick={() => {
                    Mixpanel.track('Subscribe Clicked - profile page');
                    props.getAnalystSubscriptionPlan({
                      analyst_id: data.analyst_info.user.user_id,
                      segment: 'OPTIONS,EQUITY,INVESTMENT,FUTURES'
                    });
                  }}
                  className='text-center'
                >
                  <span>Subscribe</span>
                </Col>
              </Row>
            ) : null}
            {lowerScreen ? (
              <Row className='lower-screen'>
                <Col className='lower-screen-content'>
                  <Row>
                    <Col>
                      <div className='lower-screen-sub-heading'>
                        <span style={{ width: '24px' }}></span>
                        <span>
                          <b>Confirm your plan selection</b>
                        </span>
                        <Image
                          onClick={closeLowerScreen}
                          src={require('../../assets/images/svg/close-icon.svg')}
                          className='close'
                        />
                      </div>
                    </Col>
                  </Row>
                  <Row className='mt-2' style={{ marginBottom: '50px' }}>
                    <Col>
                      <RadioGroup value={subscription} onChange={handleRadioChange}>
                        <Row>
                          <Col>
                            <FormControlLabel
                              label={
                                <Row>
                                  <Col className='col-5 center-col small'>
                                    <b>Trade Type</b>
                                  </Col>
                                  <Col className='col-4 center-col small'>
                                    <b>Duration</b>
                                  </Col>
                                  <Col className='col-3 center-col small'>
                                    <b>Amount</b>
                                  </Col>
                                </Row>
                              }
                              control={<Radio color='primary' classes={{ root: 'hidden' }} />}
                            />
                          </Col>
                        </Row>
                        {props.analystSubscriptionPlanList ? (
                          props.analystSubscriptionPlanList.length > 0 ? (
                            props.analystSubscriptionPlanList
                              .sort((a, b) => {
                                if (a.segment.name > b.segment.name) return 1;
                                else if (a.segment.name === b.segment.name) {
                                  if (a.amount > b.amount) return 1;
                                  return -1;
                                } else return -1;
                              })
                              .map((item, idx) => {
                                return (
                                  <Row style={{ width: '100%' }}>
                                    <Col>
                                      <FormControlLabel
                                        label={
                                          <Row>
                                            <Col className='col-5 center-col small'>
                                              <span>{item.segment.name}</span>
                                            </Col>
                                            <Col className='col-4 center-col small'>
                                              {(moment(item.to_date) - moment(item.from_date)) / (1000 * 3600 * 24) >=
                                              365
                                                ? (moment(item.to_date) - moment(item.from_date)) /
                                                    (1000 * 3600 * 24 * 365) +
                                                  ' Year'
                                                : (moment(item.to_date) - moment(item.from_date)) /
                                                    (1000 * 3600 * 24) >=
                                                  30
                                                ? (moment(item.to_date) - moment(item.from_date)) /
                                                    (1000 * 3600 * 24 * 30) +
                                                  ' Months'
                                                : (moment(item.to_date) - moment(item.from_date)) / (1000 * 3600 * 24) +
                                                  ' Days'}
                                            </Col>
                                            <Col className='col-3 center-col small'>₹{item.amount}</Col>
                                          </Row>
                                        }
                                        value={item.plan_id}
                                        control={<Radio color='primary' />}
                                      />
                                    </Col>
                                  </Row>
                                );
                              })
                          ) : (
                            <center className='mt-4 mb-2'>No Subscriptions Found</center>
                          )
                        ) : (
                          <center className='my-2'>
                            <CircularProgress color='primary' />
                          </center>
                        )}
                      </RadioGroup>
                    </Col>
                  </Row>
                  {!shouldGo ? (
                    <Row
                      onClick={
                        subscription
                          ? () => {
                              setShouldGo(true);
                              var formData = new FormData();
                              formData.append('plan_id', subscription);
                              formData.append(
                                'start_date',
                                moment(
                                  props.analystSubscriptionPlanList.find(item => item.plan_id === subscription)
                                    .from_date
                                )
                                  .add(5, 'Hours')
                                  .add(30, 'Minutes')
                                  .format('DD/MM/YYYY')
                              );
                              formData.append(
                                'end_date',
                                moment(
                                  props.analystSubscriptionPlanList.find(item => item.plan_id === subscription).to_date
                                )
                                  .add(5, 'Hours')
                                  .add(30, 'Minutes')
                                  .format('DD/MM/YYYY')
                              );
                              props.getPaymentSubscriptionLink({ data: formData });
                            }
                          : null
                      }
                      className='pay-button center-row pointer'
                    >
                      <Col className='text-center'>
                        <span style={{ opacity: subscription ? '1' : '0.6' }}>Proceed to Pay</span>
                      </Col>
                    </Row>
                  ) : (
                    <Row
                      style={{
                        position: 'fixed',
                        bottom: '0',
                        left: 0,
                        right: 0,
                        height: '50px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}
                    >
                      <center>
                        <CircularProgress color='primary' />
                      </center>
                    </Row>
                  )}
                </Col>
              </Row>
            ) : null}
          </div>
        )}
        {props.message === 'You are already subscribed for this period' ? (
          <Dialog open={shouldGo} onClose={() => setShouldGo(false)}>
            <div className='p-3'>
              <ErrorOutlineOutlinedIcon color='primary' className='mr-2' />
              {props.message}
            </div>
          </Dialog>
        ) : null}
        {props.analystMessage === 'Invalid analyst Id' ? (
          <Dialog open={true}>
            <div className='p-3'>
              <ErrorOutlineOutlinedIcon color='primary' className='mr-2' />
              Invalid URL!
            </div>
          </Dialog>
        ) : null}
        {props.analystMessage === 'Something Went Wrong' ? (
          <Dialog open={true}>
            <div className='p-3'>
              <ErrorOutlineOutlinedIcon color='primary' className='mr-2' />
              Something went wrong!
            </div>
          </Dialog>
        ) : null}
      </div>
    </Grow>
  );
};

const mapStateToProps = state => ({
  userGroup: state.auth.userGroup,
  profileImage: state.auth.profileImage,
  message: state.auth.message,
  signinData: state.auth.signinData,
  analystsForSubscription: state.user.analystsForSubscription,
  analystsForSubscriptionDetails: state.user.analystsForSubscriptionDetails,
  filters: state.user.filters,
  analystDetails: state.analyst.analystDetails,
  recentlyClosedTradeList: state.user.recentlyClosedTradeList,
  analystSubscriptionPlanList: state.user.analystSubscriptionPlanList,
  paymentLinkForSubscription: state.user.paymentLinkForSubscription,
  analystMessage: state.user.analystMessage
});

const mapDispatchToProps = dispatch => ({
  setMessage: message => dispatch(actions.setMessage(message)),
  fetchAnalystsForSubscriptions: params => dispatch(actions.fetchAnalystsForSubscriptions(params)),
  fetchPerformanceAndTransactionsData: params => dispatch(actions.fetchPerformanceAndTransactionsData(params)),
  savePerformanceAndTransactionsData: () => dispatch(actions.savePerformanceAndTransactionsData(null)),
  fetchRecentlyClosedTrades: params => dispatch(actions.fetchRecentlyClosedTrades(params)),
  saveRecentlyClosedTrades: () => dispatch(actions.saveRecentlyClosedTrades(null)),
  followAnalyst: payload => dispatch(actions.submitUserFollow(payload)),
  unFollowAnalyst: payload => dispatch(actions.submitUserUnFollow(payload)),
  getAnalystSubscriptionPlan: payload => dispatch(actions.getAnalystSubscriptionPlan(payload)),
  getPaymentSubscriptionLink: payload => dispatch(actions.getPaymentSubscriptionLink(payload))
  // setPaymentSubscriptionLink: payload => dispatch(actions.setPaymentSubscriptionLink(payload))
  // changeHomeState: params => dispatch(actions.changeHomeState(params))
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewAnalyst);
