import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined';
import DehazeIcon from '@material-ui/icons/Dehaze';
import PeopleOutlinedIcon from '@material-ui/icons/PeopleOutlined';
import DynamicFeedIcon from '@material-ui/icons/DynamicFeed';
import { connect } from 'react-redux';
import blue from '@material-ui/core/colors/blue';
import grey from '@material-ui/core/colors/grey';
import UserHomeSection from '../UserHomeSection';
import UserProfile from '../UserProfile';
import Notifications from '../Notifications';
import * as actions from '../../redux/actions/index';
import UserBrowseAnalysts from '../UserBrowseAnalysts';
import SubscriptionFeed from '../Feed/SubscriptionFeed';

import { Mixpanel } from '../../shared/mixPanel'

let analystVariable;

class UserHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.homeState
    };
  }

  componentDidMount() {
    const name = this.props.signinData && this.props.signinData.user.UserAttributes.filter(item => item.Name === 'name')[0].Value
    const phone_number = this.props.signinData && this.props.signinData.user.UserAttributes.filter(item => item.Name === 'phone_number')[0].Value

    Mixpanel.identify(phone_number);
    Mixpanel.track('Successful login - Investor');
    Mixpanel.people.set({
      $user: phone_number
    });

    if (this.props.userAuthData.signup === true && name === ' '){
      this.props.history.push('/user-name')
    }
    this.props.deviceToken();
    window.localStorage.removeItem('referralCode')
  }

  handleChange = (event, value) => {
    this.props.changeHomeState(value);
  };

  render() {
    const value = this.props.homeState;
    console.log('----------', this.props);

    if (value === 0) {
      Mixpanel.track('Feed Clicked - Investor');
      analystVariable = <UserHomeSection />;
    }

    if (value === 1) {
      Mixpanel.track('Marketplace Clicked - Investor');
      analystVariable = <UserBrowseAnalysts />;
    }

    if (value === 2) {
      Mixpanel.track('Subscription Feed Clicked - Investor');
      analystVariable = <SubscriptionFeed />;
    }

    if (value === 3) {
      Mixpanel.track('Notifications Clicked - Investor');
      analystVariable = <Notifications />;
    }

    if (value === 4) {
      Mixpanel.track('More Page Clicked - Investor');
      analystVariable = <UserProfile />;
    }

    console.log('Starting from this file');

    const actionClasses = this.props.classes;
    return (
      <div>
        {analystVariable}
        <BottomNavigation value={value} onChange={this.handleChange} showLabels>
          <BottomNavigationAction
            classes={actionClasses}
            value={0}
            label='Home'
            disableTouchRipple={true}
            icon={<HomeOutlinedIcon style={{ color: value === 0 ? blue[500] : grey[500] }} fontSize='medium' />}
          />
          <BottomNavigationAction
            value={1}
            label='Experts'
            disableTouchRipple={true}
            icon={<PeopleOutlinedIcon style={{ color: value === 1 ? blue[500] : grey[500] }} fontSize='medium' />}
          />
          <BottomNavigationAction
            value={2}
            label='Subscriptions'
            disableTouchRipple={true}
            icon={<DynamicFeedIcon style={{ color: value === 2 ? blue[500] : grey[500] }} fontSize='medium' />}
          />
          <BottomNavigationAction
            value={3}
            label='Notifications'
            disableTouchRipple={true}
            icon={<NotificationsNoneOutlinedIcon style={{ color: value === 3 ? blue[500] : grey[500] }} />}
          />
          <BottomNavigationAction
            value={4}
            label='More'
            disableTouchRipple={true}
            icon={<DehazeIcon style={{ color: value === 4 ? blue[500] : grey[500] }} fontSize='medium' />}
          />
        </BottomNavigation>
        {!navigator.onLine && 
        <div className="ticker-wrap">
        <div className="ticker">
          <div className="ticker__item">  </div>
          <div className="ticker__item"> ❖ NOTE : App is running in offline mode ❖ </div>
          <div className="ticker__item"> ❖ If you like Pvot, we greatly appreciate it if you could rate the app on playstore. Thanks! ❖</div>
          <div className="ticker__item"> ❖ NOTE : App is running in offline mode ❖ </div>
          </div>
        </div>
        }
        
        {/* <InfoModal /> */}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  homeState: state.auth.homeState,
  userAuthData: state.auth.userAuthData,
  signinData: state.auth.signinData
});

const mapDispatchToProps = dispatch => ({
  changeHomeState: params => dispatch(actions.changeHomeState(params)),
  deviceToken: params => dispatch(actions.deviceToken(params))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserHome));
