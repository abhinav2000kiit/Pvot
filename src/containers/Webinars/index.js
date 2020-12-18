import React from 'react';
import Header from '../components/Header/customHeader';
import BottomNavigation from '../components/BottomNavigator';
import { makeStyles } from '@material-ui/core/styles';
// import Input from '@material-ui/core/Input';
// import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
//import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
//import Grid from '@material-ui/core/Grid';
import SearchIcon from '@material-ui/icons/Search';
import { Row, Image } from 'react-bootstrap';
import { Typography, CircularProgress } from '@material-ui/core';
import WebinarItem from '../components/WebinarItem';
//import AccountCircle from '@material-ui/icons/AccountCircle'
import { connect } from 'react-redux';
import moment from 'moment';
import * as actions from '../../redux/actions/index';

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1)
  }
}));

const Webinars = props => {
  const classes = useStyles();

  console.log('props.webinarList', props.webinarList);
  let { webinarList } = props;
  let previousWebinars = [];
  let upcomingWebinars = [];
  webinarList &&
    webinarList.map(l => {
      if (moment(l.webinar_time).isBefore()) {
        previousWebinars.push(l);
      } else {
        upcomingWebinars.push(l);
      }
    });
  React.useEffect(() => {
    if (props.signinData) {
      props.getWebinarList({ token: props.signinData.token.AuthenticationResult.AccessToken });
    }
  }, []);

  return (
    <>
      <div style={{ backgroundColor: '#fff', padding: '0px 15px 60px' }}>
        <Header title='Webinars' />
        <div style={{ padding: '20px' }}>
          <TextField
            className={classes.margin}
            id='input-with-icon-textfield'
            label='Search'
            //placeholder="Search"
            style={{ marginTop: '25px' }}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <SearchIcon style={{ marginBottom: '12px' }} />
                </InputAdornment>
              )
            }}
          />
        </div>
        {props.webinarList === null ? (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <CircularProgress />
          </div>
        ) : (
          <div>
            <div>
              <Typography variant='caption' style={{ fontSize: '14px', marginBottom: '10px' }}>
                Upcoming Webinars
              </Typography>
              {upcomingWebinars.length > 0 ? (
                upcomingWebinars.map(w => <WebinarItem data={w} />)
              ) : (
                <div style={{ justifyContent: 'center', color: '#616161', padding: '15px', display: 'flex' }}>
                  No Upcoming Webinars
                </div>
              )}
            </div>
            <div>
              <Typography variant='caption' style={{ fontSize: '14px', marginBottom: '10px' }}>
                Previous Webinars
              </Typography>
              {previousWebinars.length > 0 ? (
                previousWebinars.map(w => <WebinarItem data={w} />)
              ) : (
                <div style={{ justifyContent: 'center', color: '#616161', padding: '15px', display: 'flex' }}>
                  No Previous Webinars
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <BottomNavigation />
    </>
  );
};

const mapStateToProps = state => ({
  signinData: state.auth.signinData,
  webinarList: state.auth.webinarList
  // errorSubscription: state.auth.errorSubscription,
  // isErrorSubscriptionPlan: state.auth.isErrorSubscriptionPlan,
  // loader: state.auth.loader,
  // message: state.auth.message
});

const mapDispatchToProps = dispatch => ({
  getWebinarList: params => dispatch(actions.getWebinarList(params))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Webinars);
