import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import './AnalystHome.scss';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined';
import DehazeIcon from '@material-ui/icons/Dehaze';
import { connect } from 'react-redux';
import AssessmentOutlinedIcon from '@material-ui/icons/AssessmentOutlined';
import AnalystHomeSection from '../AnalystHomeSection';
import AnalystDashboard from '../AnalystDashboard/AnalystDashboard';
import AnalystProfile from '../AnalystProfile/AnalystProfile';
import Notifications from '../Notifications';
import * as actions from '../../redux/actions/index';
import AnalystVirtualTrade from '../AnalystVirtualTradeList';
import blue from '@material-ui/core/colors/blue';
import grey from '@material-ui/core/colors/grey';
import ShowChartIcon from '@material-ui/icons/ShowChart';

import InfoModal from '../InfoModal/InfoModal';

import { Mixpanel } from '../../shared/mixPanel'

let analystVariable;

class AnalystHome extends Component {
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
    Mixpanel.track('Successful login - Expert');
    Mixpanel.people.set({
      $user: phone_number
    });
   
    console.log('Name: =======',name.length)
    if (this.props.userAuthData.signup === true && name === ' '){
      this.props.history.push('/user-name')
    }
    this.props.deviceToken();

    if (this.props.signinData && this.props.userGroup === 'ANALYST') {
      this.props.getAnalystDetails(this.props.signinData && this.props.signinData.token && this.props.signinData.token.AuthenticationResult.AccessToken);
      !this.props.subscriptionPlan &&
        this.props.getSubscriptionPlanList(this.props.signinData && this.props.signinData.token && this.props.signinData.token.AuthenticationResult.AccessToken);
    }
    window.localStorage.removeItem('referralCode')
  }

  handleChange = (event, value) => {
    this.props.changeHomeState(value);
  };

  render() {
    const value = this.props.homeState;

    if (value === 0) {
      
      Mixpanel.track('Dashboard Clicked - Expert');
      analystVariable = <AnalystVirtualTrade history={this.props.history} />;
    }
    
    if (value === 1) {
      Mixpanel.track('Trades Clicked - Expert');
      analystVariable = <AnalystHomeSection history={this.props.history} />;
    }


    if (value === 2) {
      Mixpanel.track('Notifications Clicked - Expert');
      analystVariable = <Notifications  history={this.props.history} />;
    }

    if (value === 3) {
      Mixpanel.track('More panel Clicked - Expert');
      analystVariable = <AnalystProfile  history={this.props.history} />;
    }

    return (
      <div>
        {analystVariable}
        <BottomNavigation value={value} onChange={this.handleChange} showLabels>
          <BottomNavigationAction
            value={0}
            label='Dashboard'
            disableTouchRipple={true}
            icon={<AssessmentOutlinedIcon style={{ color: value === 0 ? blue[500] : grey[500] }} fontSize='medium' />}
          />
          <BottomNavigationAction
            value={1}
            label='Trades'
            disableTouchRipple={true}
            icon={<ShowChartIcon style={{ color: value === 1 ? blue[500] : grey[500] }} fontSize='medium' />}
          />
          <BottomNavigationAction
            value={2}
            label='Notifications'
            disableTouchRipple={true}
            icon={
              <NotificationsNoneOutlinedIcon style={{ color: value === 2 ? blue[500] : grey[500] }} fontSize='medium' />
            }
          />
          <BottomNavigationAction
            value={3}
            label='More'
            disableTouchRipple={true}
            icon={<DehazeIcon style={{ color: value === 3 ? blue[500] : grey[500] }} fontSize='medium' />}
          />
        </BottomNavigation>
        {/* <InfoModal /> */}
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
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userGroup: state.auth.userGroup,
  signinData: state.auth.signinData,
  homeState: state.auth.homeState,
  subscriptionPlan: state.analyst.subscriptionPlan,
  analystDetails: state.analyst.analystDetails,
  userAuthData: state.auth.userAuthData
});

const mapDispatchToProps = dispatch => ({
  getSubscriptionPlanList: token => dispatch(actions.getSubscriptionPlanList(token)),
  getAnalystDetails: token => dispatch({ type: 'GET_ANALYST_DETAILS', payload: token }),
  changeHomeState: params => dispatch(actions.changeHomeState(params)),
  deviceToken: params => dispatch(actions.deviceToken(params))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AnalystHome));
