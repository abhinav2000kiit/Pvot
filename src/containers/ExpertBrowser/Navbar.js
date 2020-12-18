import React from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/index';
import { withRouter } from 'react-router-dom';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Popover from '@material-ui/core/Popover';
import Popdetails from './Popdetails';
import { Link } from 'react-router-dom';

import './navstyle.css';
import Logo from '../../assets/logo/logo.png';

const useStyles = makeStyles(theme => ({
  typography: {
    padding: theme.spacing(2)
  },
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2),
    padding: 0
  },
  title: {
    flexGrow: 1
  }
}));

const Navbar = props => {
  const classes = useStyles();

  React.useEffect(() => {
    if (props.signinData) {
      props.getProfileImage();
      props.getAnalystDetails();
    }
  }, [props.signinData]);

  const image = props.profileImage ? props.profileImage : require('../../assets/images/jpeg/placeholder.jpg');

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    console.log('Mouse Enter');
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    console.log('Mouse Leave');
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@', props);

  return (
    <>
      {props.signinData ? (
        <div className={classes.root} style={{ marginBottom: '6rem' }}>
          <AppBar style={{ backgroundColor: '#fff', paddingLeft: '4rem', paddingRight: '4rem' }} position='fixed'>
            <Toolbar>
              <IconButton edge='start' className={classes.menuButton} color='inherit' aria-label='menu'>
                <Link to='/'>
                  <Image src={Logo} style={{ height: '40px', width: '50px' }} />
                </Link>
              </IconButton>

              <div className={classes.title}>
                {/* <Button onClick={props.history.push({ pathname: '/dashboard' })} style={{ fontSize: '16px' }}> */}
                <Link
                  style={{
                    fontFamily: 'Roboto',
                    backgroundColor: 'transparent',
                    border: '0px solid black',
                    margin: '0 10px',
                    fontSize: '1.2rem',
                    color: `${props.location.pathname === '/dashboard' ? '#565EBF' : '#2B2B2B'}`
                  }}
                  className='navs'
                  to='/dashboard'
                >
                  Dashboard
                </Link>
                <Link
                  style={{
                    fontFamily: 'Roboto',
                    backgroundColor: 'transparent',
                    border: '0px solid black',
                    margin: '0 10px',
                    fontSize: '1.2rem',
                    color: `${props.location.pathname === '/trades' ? '#565EBF' : '#2B2B2B'}`
                  }}
                  className='navs'
                  to='/trades'
                >
                  Trades
                </Link>
                <Link
                  style={{
                    fontFamily: 'Roboto',
                    backgroundColor: 'transparent',
                    border: '0px solid black',
                    margin: '0 10px',
                    fontSize: '1.2rem',
                    color: `${props.location.pathname === '/profile' ? '#565EBF' : '#2B2B2B'}`
                  }}
                  className='navs'
                  to='/profile'
                >
                  Profile
                </Link>
                <Link
                  style={{
                    fontFamily: 'Roboto',
                    backgroundColor: 'transparent',
                    border: '0px solid black',
                    margin: '0 10px',
                    fontSize: '1.2rem',
                    color: `${props.location.pathname === '/blogs' ? '#565EBF' : '#2B2B2B'}`
                  }}
                  className='navs'
                  to='/blogs'
                >
                  Blog
                </Link>
              </div>
              <div>
                <NotificationsIcon style={{ fontSize: '22px', color: '#2B2B2B' }} />
                <IconButton
                  aria-label='account of current user'
                  aria-controls='menu-appbar'
                  aria-haspopup='true'
                  color='inherit'
                  // onClick={handleClick}
                  // onClose={handleClose}
                >
                  <Image
                    aria-describedby={id}
                    variant='contained'
                    color='primary'
                    onClick={handleClick}
                    // onMouseEnter={handleClick}
                    // onMouseLeave={handleClose}
                    src={image}
                    roundedCircle
                    style={{ height: '47px', width: '47px' }}
                    onClose={handleClose}
                  />

                  <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    // onMouseOut={handleClose}
                    // onMouseLeave={handleClose}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left'
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right'
                    }}
                    // style={{
                    //   height: '490px',
                    //   width: '300px',
                    //   // backgroundColor: '#999',
                    //   overflow: 'visible',
                    //   position: 'absolute',
                    //   top: '0',
                    //   right: '0',
                    //   left: 'auto',
                    //   bottom: 'auto'
                    // }}
                  >
                    <Popdetails
                      analystDetails={props.analystDetails}
                      signinData={props.signinData}
                      history={props.history}
                      handleClose={handleClose}
                      // onMouseOut={handleClose}
                      // onMouseLeave={handleClose}
                      logout={props.logout}
                    />
                  </Popover>
                </IconButton>
              </div>
            </Toolbar>
          </AppBar>
        </div>
      ) : (
        <div className='row'>
          <Image src={Logo} style={{ margin: '0 auto', padding: '2rem' }} />
        </div>
      )}
    </>
  );
};

const mapStateToProps = state => ({
  logoutLoading: state.auth.logoutLoading,
  logoutError: state.auth.logoutError,
  logoutData: state.auth.logoutData,
  logoutMessage: state.auth.logoutMessage,
  logoutShow: state.auth.logoutShow,
  analystDetails: state.analyst.analystDetails,
  signinData: state.auth.signinData,
  message: state.auth.message,
  profileImage: state.auth.profileImage,
  availableTradeBalance: state.auth.availableTradeBalance,
  tradeCounts: state.analyst.tradeCounts
});

const mapDispatchToProps = dispatch => ({
  getAnalystDetails: () => dispatch({ type: 'GET_ANALYST_DETAILS' }),
  logout: path => dispatch(actions.logout(path)),
  setMessage: message => dispatch(actions.setMessage(message)),
  getProfileImage: token => dispatch(actions.getProfileImage(token))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Navbar));
