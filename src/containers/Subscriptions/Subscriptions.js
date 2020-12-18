import React, { Component } from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import Subscription from './Subscription';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions';
import { CircularProgress } from '@material-ui/core';

import { Mixpanel } from '../../shared/mixPanel'

export class Subscriptions extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    Mixpanel.track('Subscriptions Page visited - Investor');
    if (!this.props.subscriptions) {
      this.props.getSubscriptions();
    }
  }
  render() {
    const subscriptionsList = this.props.subscriptions
      ? this.props.subscriptions.map(subscription => <Subscription data={subscription} />)
      : null;
    console.log('============', subscriptionsList.length);
    return (
      <div className='lower-screen'>
        <Row className='lower-screen-header'>
          <Col>Subscriptions</Col>
        </Row>
        <div className='lower-screen-content'>
          <Row>
            <Col>
              <div className='lower-screen-sub-heading'>
                <p style={{ width: '24px' }}></p>
                <Image
                  onClick={this.props.closeLowerScreen}
                  src={require('../../assets/images/svg/close-icon.svg')}
                  className='close'
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              {subscriptionsList ? (
                subscriptionsList.length > 0 ? (
                  subscriptionsList
                ) : (
                  <center>You have not subscribed to any plans yet.</center>
                )
              ) : (
                <center>
                  <CircularProgress color='primary' />
                </center>
              )}
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    subscriptions: state.user.subscriptions,
    signinData: state.auth.signinData
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getSubscriptions: token => dispatch(actions.getSubscriptions(token))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Subscriptions);
