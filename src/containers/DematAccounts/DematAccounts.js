import React, { Component } from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions';
import { Snackbar } from '@material-ui/core';
import ClearRoundedIcon from '@material-ui/icons/ClearRounded';

import { Mixpanel } from '../../shared/mixPanel'

class DematAccounts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected:
        this.props.signinData &&
        this.props.signinData.user.UserAttributes.filter(item => item.Name === 'custom:default_broker')[0]
          ? JSON.parse(
              this.props.signinData.user.UserAttributes.filter(item => item.Name === 'custom:default_broker')[0].Value
            )
          : [],
      openSnackbar: false
      // selected: []
    };
    this.checkZerodha = this.checkZerodha.bind(this);
    this.checkUpstox = this.checkUpstox.bind(this);
    this.sendData = this.sendData.bind(this);
  }
  checkZerodha() {
    Mixpanel.track('Zerodha Button Clicked - Investor');
    let ind = this.state.selected.indexOf('Zerodha');
    if (ind === -1) {
      this.setState(prevState => ({
        selected: [...prevState.selected, 'Zerodha']
      }));
    } else {
      let newSelected = this.state.selected;
      newSelected.splice(ind, 1);
      this.setState({
        selected: newSelected
      });
    }
  }
  checkUpstox() {
    Mixpanel.track('Upstock Button Clicked - Investor');
    let ind = this.state.selected.indexOf('Upstox');
    if (ind === -1) {
      this.setState(prevState => ({
        selected: [...prevState.selected, 'Upstox']
      }));
    } else {
      let newSelected = this.state.selected;
      newSelected.splice(ind, 1);
      this.setState({
        selected: newSelected
      });
    }
  }
  sendData() {
    Mixpanel.track('Updated Demat Account - Investor');
    let str = JSON.stringify(this.state.selected);
    let payload = {
      UserAttributes: [
        {
          Name: 'custom:default_broker',
          Value: str
        }
      ]
    };
    this.props.updateDematAccounts(payload);
    this.props.closeLowerScreen();
  }
  render() {
    let indZerodha = this.state.selected.indexOf('Zerodha');
    let indUpstox = this.state.selected.indexOf('Upstox');
    console.log(
      this.props.signinData.user.UserAttributes.filter(item => item.Name === 'custom:default_broker')[0],
      this.state.selected
    );
    return (
      <div className='lower-screen'>
        <div className='small lower-screen-header'>My Demat Accounts</div>
        <Row className='lower-screen-content'>
          <Col>
            <Row>
              <Col>
                <div className='lower-screen-sub-heading'>
                  <p style={{ width: '24px' }}></p>
                  <p>Select Your Preferred Brokers</p>
                  <Image
                    onClick={this.props.closeLowerScreen}
                    src={require('../../assets/images/svg/close-icon.svg')}
                    className='close'
                  />
                </div>
              </Col>
            </Row>
            <Row>
              <Col className='center-col' style={{ borderRight: '1px solid grey' }}>
                <Image
                  style={{ width: '30px', height: '30px' }}
                  className='mx-2'
                  onClick={this.checkZerodha}
                  src={
                    indZerodha !== -1
                      ? require('../../assets/images/svg/tick.svg')
                      : require('../../assets/images/svg/Add_icon.svg')
                  }
                />
                <Image
                  className='mt-3'
                  style={{ height: '30px' }}
                  src={require('../../assets/images/Zerodha-logo.png')}
                />
              </Col>
              <Col className='center-col'>
                <Image
                  style={{ width: '30px', height: '30px' }}
                  className='mx-2'
                  onClick={this.checkUpstox}
                  src={
                    indUpstox !== -1
                      ? require('../../assets/images/svg/tick.svg')
                      : require('../../assets/images/svg/Add_icon.svg')
                  }
                />
                <Image
                  className='mt-3'
                  style={{ height: '30px' }}
                  src={require('../../assets/images/UPSTOX-LOGO.png')}
                />
              </Col>
            </Row>
            <Row>
              <div className='lower-screen-action small center-row mt-3'>
                <button
                  className='cancel'
                  onClick={this.props.closeLowerScreen}
                  disabled={this.state.selected.length > 0 ? false : true}
                  style={{ opacity: this.state.selected.length ? 1 : 0.6 }}
                >
                  Cancel
                </button>
                <button
                  className='ml-2 save'
                  onClick={this.sendData}
                  disabled={this.state.selected.length ? false : true}
                  style={{ opacity: this.state.selected.length ? 1 : 0.6 }}
                >
                  Save
                </button>
              </div>
            </Row>
            <div>
              <div className='check-parent'>
                <div
                  className='chat-bubble smaller p-2 pb-4'
                  style={{
                    display: this.state.openSnackbar ? 'flex' : 'none',
                    opacity: this.state.openSnackbar ? '1' : '0'
                  }}
                >
                  <Image
                    src={require('../../assets/images/svg/monitor.svg')}
                    style={{ width: '48px', marginRight: '4%' }}
                  />
                  <span>
                    Pvot enables one-click order fill and placement through the app if you have a demat account With the
                    company listed on the app. This will reduce the time taken to place the order. We are constantly
                    updating the list. In case, you are facing any issue please write to us at <a href='mailto:hello@pvot.in' className='color-blue'>hello@pvot.in</a>.
                  </span>
                  <Image
                    onClick={() => this.setState({ openSnackbar: false })}
                    src={require('../../assets/images/svg/close-icon.svg')}
                    className='close'
                    style={{ marginLeft: '4%' }}
                  />
                </div>
              </div>
              <Row className='mt-3 center-row' onClick={() => this.setState({ openSnackbar: true })}>
                <Image src={require('../../assets/icons/svg/info-icon.svg')} width='14px' />
                Why does Pvot need this info?
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  signinData: state.auth.signinData
});
const mapDispatchToProps = dispatch => ({
  updateDematAccounts: payload => dispatch(actions.updateDematAccounts(payload))
});
export default connect(mapStateToProps, mapDispatchToProps)(DematAccounts);
