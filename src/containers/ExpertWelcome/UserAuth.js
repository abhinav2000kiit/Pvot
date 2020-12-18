import React, { Component } from 'react';

// import './ForgotPassword.scss';
import { Form, Row, Col, Image } from 'react-bootstrap';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import { Button, FormControl } from '@material-ui/core';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from 'react-spinkit';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import * as actions from '../../redux/actions/index';
import KeyboardBackspaceOutlinedIcon from '@material-ui/icons/KeyboardBackspaceOutlined';
import Grow from '@material-ui/core/Grow';

import './Welcome.scss';

let variableEmailPhone;
let variableEmailPhoneColor;
let variableEmailPhoneText;
let variableEmailPhoneTextColor;
// const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const remobile = /^[0-9]{10}$/;

class UserAuth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 0,
      height: 0,
      emailPhoneValue: '',
      loading: false,
      emailPhoneActive: false,
      emailPhoneSuccess: null,
      emailPhoneFinal: false
    };
    this.inputEmailPhone = React.createRef();
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
    if (window.performance) {
      if (performance.navigation.type === 1) {
        this.setState({
          width: 0,
          height: 0,
          emailPhoneValue: '',
          emailPhoneActive: false,
          emailPhoneSuccess: null,
          emailPhoneFinal: false
        });
        // this.props.forgotpasswordalertshowhidedangerdismiss('/signin');
        //   alert( "This page is reloaded" );
      } else {
        //   alert( "This page is not reloaded");
      }
    }
  }

  componentWillReceiveProps() {
    if (this.props.userAuthShow && !this.props.userAuthLoading) {
      this.handleResetCick();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  gotoTerms() {
    this.props.history.push('/terms');
  }

  validateEmailPhone = () => {
    const { emailPhoneValue } = this.state;
    if (remobile.test(emailPhoneValue)) {
      this.setState({
        emailPhoneSuccess: true,
        emailPhoneFinal: true
      });
    } else {
      this.setState({
        emailPhoneSuccess: false,
        emailPhoneFinal: false
      });
    }
  };

  onEmailPhoneChange(event) {
    const { emailPhoneValue } = this.state;
    this.setState(
      {
        emailPhoneValue: event.target.value
      },
      function() {
        this.validateEmailPhone();
      }
    );
  }

  handleLoginSubmit = event => {
    event.preventDefault();
    const { emailPhoneValue, emailPhoneFinal } = this.state;
    localStorage.setItem('forgotPasswordMainEmail', emailPhoneValue);
    if (emailPhoneFinal === null) {
      this.handleEmailPhoneClick();
    }
    if (emailPhoneFinal === false) {
      this.handleEmailPhoneClick();
    }
    if (emailPhoneFinal === true) {
      const payloads = {
        phone_number: '+91' + emailPhoneValue,
        grant_type: 'OTP',
        // group: this.props.userGroup
        group: 'ANALYST'
      };
      console.log(payloads);
      this.props.userAuth(payloads);
    }
  };

  handleResetCick = () => {
    this.setState({
      emailPhoneValue: '',
      emailPhoneActive: false,
      emailPhoneSuccess: null,
      emailPhoneFinal: false
    });
  };

  handleEmailPhoneClick = () => {
    //const { emailPhoneValue } = this.state;
    this.setState(
      {
        emailPhoneActive: true
      },
      function() {
        this.validateEmailPhone();
      }
    );
  };

  handleEmailPhoneClickAway = () => {
    const { emailPhoneFinal } = this.state;
    if (emailPhoneFinal === true) {
      this.setState({
        emailPhoneActive: false,
        emailPhoneSuccess: null
      });
    }
  };

  handleBack = () => {
    this.props.updateGroup('');
    this.props.history.push('/user-analyst');
  };

  render() {
    console.log('@@@@@@@@@@@@@@@', this.props);

    const { width, height, emailPhoneSuccess, emailPhoneActive, emailPhoneValue } = this.state;
    console.log(`${width}---------------${height}------------------`);
    let forgotPasswordModalView;

    if (this.props.userAuthShow && !this.props.userAuthLoading) {
      forgotPasswordModalView = (
        <Dialog
          onClose={() => this.props.userauthalertshowhidedanger()}
          aria-labelledby='customized-dialog-title'
          open={this.props.userAuthShow}
        >
          <DialogTitle id='customized-dialog-title'>Error</DialogTitle>
          <DialogContent dividers>
            <p style={{ padding: '0.5rem 1rem' }}>{this.props.userAuthError.Error ? this.props.userAuthError.Error.Message : ""}</p>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                this.props.userauthalertshowhidedangerdismiss('/welcome');
                this.props.updateSwitchToOtp(false);
                // this.props.history.push('/userauth');
              }}
              color='primary'
            >
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      );
    }

    if (emailPhoneActive === false && emailPhoneSuccess === null) {
      variableEmailPhoneText = '';
      variableEmailPhoneTextColor = '';
      variableEmailPhoneColor = 'icon-gray';
      variableEmailPhone = <Image src={require('../../assets/icons/svg/user-inactive.svg')} className='email' />;
    }
    if (emailPhoneActive === true && emailPhoneSuccess === false) {
      // variableEmailPhoneText = '* Must be a valid and registered email id';
      variableEmailPhoneText = '* Must be a valid phone number';
      variableEmailPhoneColor = 'icon-danger';
      variableEmailPhoneTextColor = 'danger-text';
      variableEmailPhone = <Image src={require('../../assets/icons/svg/user-danger.svg')} className='email' />;
    }
    if (emailPhoneActive === true && emailPhoneSuccess === true) {
      variableEmailPhoneText = '';
      variableEmailPhoneColor = 'icon-blue';
      variableEmailPhoneTextColor = '';
      variableEmailPhone = <Image src={require('../../assets/icons/svg/user-active.svg')} className='email' />;
    }
    if (emailPhoneActive === true && emailPhoneSuccess === null) {
      variableEmailPhoneText = '';
      variableEmailPhoneColor = 'icon-blue';
      variableEmailPhoneTextColor = '';
      variableEmailPhone = <Image src={require('../../assets/icons/svg/user-active.svg')} className='email' />;
    }

    return (
      <Grow in={true} timeout={500}>
        <>
          <Row className='variable-margin-top-minor'>
            <Col>
              <Form noValidate onSubmit={event => this.handleLoginSubmit(event)}>
                <Row>
                  <Col>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.5rem', fontWeight: '600' }}>
                      Login to start
                    </div>
                    <div
                      style={{
                        fontFamily: "'Open Sans', Sans",
                        fontSize: '1.5rem',
                        fontWeight: '400',
                        width: 'fit-content',
                        margin: '0'
                      }}
                    >
                      Or create a free account
                    </div>
                  </Col>
                </Row>
                <Row className='mt-2'>
                  <Col className={variableEmailPhoneColor}>
                    <div className='input-group' style={{}}>
                      <div className='input-group-prepend'>
                        <span
                          className='input-group-text'
                          style={{
                            fontFamily: "'Open Sans', Sans",
                            fontSize: '1.5rem',
                            backgroundColor: 'transparent',
                            borderTopLeftRadius: '2rem',
                            borderBottomLeftRadius: '2rem',
                            borderTopRightRadius: '0',
                            borderBottomRightRadius: '0',
                            height: '3rem'
                          }}
                          id='inputGroup-sizing-default'
                        >
                          +91
                        </span>
                      </div>
                      <input
                        type='number'
                        id='standard-name'
                        pattern='[0-9]*'
                        value={emailPhoneValue}
                        onChange={event => this.onEmailPhoneChange(event)}
                        onClick={this.handleEmailPhoneClick}
                        // inputRef={this.inputEmailPhone}
                        error={(!emailPhoneSuccess).toString()}
                        className='form-control'
                        aria-label='Sizing example input'
                        aria-describedby='inputGroup-sizing-default'
                        placeholder='Your mobile number'
                        maxLength='10'
                        style={{
                          fontFamily: "'Open Sans', Sans",
                          fontSize: '1.5rem',
                          borderTopLeftRadius: '0',
                          borderBottomLeftRadius: '0',
                          borderTopRightRadius: '2rem',
                          borderBottomRightRadius: '2rem',
                          height: '3rem'
                        }}
                      />
                    </div>
                  </Col>
                </Row>
                <Row className='mt-1' style={{ height: '24px' }}>
                  <Col className='left-all-no-justify'>
                    <div className={variableEmailPhoneTextColor} style={{ fontFamily: "'Open Sans', Sans" }}>
                      {variableEmailPhoneText}
                    </div>
                  </Col>
                </Row>
                <small
                  className='text-muted mt-2 text-left'
                  style={{ fontFamily: "'Open Sans', Sans", paddingLeft: '0.5rem' }}
                >
                  By clicking on Login you agree to{' '}
                  <a style={{ color: '#565EBF', cursor: 'pointer' }} onClick={() => this.gotoTerms()}>
                    Terms of Service
                  </a>{' '}
                  of using Pvot
                </small>
                <Row className='mt-3'>
                  <Col className=''>
                    {this.props.userAuthLoading ? (
                      <CircularProgress name='circle' color='primary' />
                    ) : (
                      <button
                        className='pointer'
                        type='submit'
                        style={{
                          backgroundColor: '#565EBF',
                          color: '#fff',
                          fontSize: '1rem',
                          padding: '0.75rem 2.5rem',
                          borderRadius: '2rem',
                          textTransform: 'uppercase',
                          border: 'none',
                          fontFamily: "'Open Sans', Sans",
                          fontWeight: '600'
                        }}
                      >
                        Login
                      </button>
                    )}
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
          {forgotPasswordModalView}
        </>
      </Grow>
    );
  }
}

const mapStateToProps = state => ({
  userAuthLoading: state.auth.userAuthLoading,
  userAuthError: state.auth.userAuthError,
  userAuthData: state.auth.userAuthData,
  userAuthMessage: state.auth.userAuthMessage,
  userAuthShow: state.auth.userAuthShow,
  userGroup: state.auth.userGroup,
  switchToOtp: state.auth.switchToOtp
});

const mapDispatchToProps = dispatch => ({
  userAuth: (params, path) => dispatch(actions.userAuth(params, path)),
  updateGroup: group => dispatch({ type: 'SET_GROUP', payload: group }),
  userauthalertshowhidedanger: () => dispatch(actions.userauthalertshowhidedanger()),
  userauthalertshowhidedangerdismiss: path => dispatch(actions.userauthalertshowhidedangerdismiss(path)),
  updateSwitchToOtp: payload => dispatch(actions.updateSwitchToOtp(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserAuth));
