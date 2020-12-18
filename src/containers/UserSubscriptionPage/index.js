import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Button } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import * as actions from '../../redux/actions/index';
import { connect } from 'react-redux';
import BasicNavigator from '../components/BottomNavigator';
import Header from '../components/Header/customHeader';
import SubscriptionCard from './SubscriptionCard';

const UserSubscriptionPage = props => {
  const { subscriptions } = props;
  React.useEffect(() => {
    props.getSubscriptions();
  }, []);

  console.log(subscriptions);
  return (
    <>
      <Header title='My Subscriptions List' />
      <br></br>
      {subscriptions && subscriptions.map(subscription => <SubscriptionCard data={subscription} />)}

      <div style={{ height: '50px' }}></div>

      <BasicNavigator />
    </>
  );
};

const mapStateToProps = state => ({
  message: state.auth.message,
  signinData: state.auth.signinData,
  subscriptions: state.user.subscriptions
});

const mapDispatchToProps = dispatch => ({
  setMessage: message => dispatch(actions.setMessage(message)),
  getSubscriptions: () => dispatch(actions.getSubscriptions())
});

export default connect(mapStateToProps, mapDispatchToProps)(UserSubscriptionPage);
