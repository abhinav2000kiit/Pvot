import React from 'react';
import { Form, Row, Col, Image } from 'react-bootstrap';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import { FormControl } from '@material-ui/core';
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
import OtpInput from '../../containers/OTPForm/OtpFormBrowser';
import Grow from '@material-ui/core/Grow';

class OTP extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 0,
      height: 0,
      otp: '',
      otpvalidated: false,
      params: this.props && this.props.userAuthData && this.props.userAuthData.token && this.props.userAuthData.token,
      prevPath: this.props && this.props.detail && this.props.detail,
      mobilenumber:
        this.props && this.props.userAuthData && this.props.userAuthData.token.ChallengeParameters.phone.split('', 13)
    };

    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
    if (window.performance) {
      if (performance.navigation.type == 1) {
        this.setState({
          width: 0,
          height: 0,
          otp: '',
          otpvalidated: false,
          params:
            this.props && this.props.userAuthData && this.props.userAuthData.token && this.props.userAuthData.token,
          prevPath: this.props && this.props.detail && this.props.detail,
          prevStateData: this.props && this.props.userAuthData && this.props.userAuthData
        });
      } else {
        //   alert( "This page is not reloaded");
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  handleOtpSubmit = event => {
    event.preventDefault();
    // let params = this.props.userAuthData.token;
    let params = this.props.userAuthData.token;

    console.log('handle submit entered' + JSON.stringify(this.props.userAuthData.token));
    const { otp } = this.state;
    // const otpMainValue = oneValue.concat(twoValue, threeValue, fourValue, fiveValue, sixValue);
    const otpMainValue = otp;
    localStorage.setItem('mainOtp', otpMainValue);

    const payloads = {
      ChallengeResponses: {
        USERNAME: params.ChallengeParameters.USERNAME,
        phone: params.ChallengeParameters.phone,
        ANSWER: otpMainValue.toString()
      },
      Session: params.Session,
      group: 'ANALYST',
      grant_type: 'VERIFY_OTP'
    };
    this.props.signin(payloads, '/dashboard');
  };

  handleResendOtpSubmit = event => {
    event.preventDefault();
    const { params } = this.state;

    const payloads = {
      phone_number: params.ChallengeParameters.phone,
      grant_type: 'OTP',
      //   group: this.props.userGroup
      group: 'ANALYST'
    };
    console.log(payloads);
    this.props.userAuth(payloads);
  };

  handleResetCick = () => {
    this.setState({
      width: 0,
      height: 0,
      otp: '',
      otpvalidated: false,
      params: this.props && this.props.userAuthData && this.props.userAuthData.token && this.props.userAuthData.token,
      prevPath: this.props && this.props.detail && this.props.detail,
      prevStateData: this.props && this.props.userAuthData && this.props.userAuthData
    });
  };

  handleOtpChange = otp => {
    this.setState({ otp });
  };

  handleOtpBack = () => {
    const { prevPath } = this.state;
    if (prevPath === 'userAuth') {
      this.props.history.goBack();
    } else {
      this.props.history.push('/');
    }
  };

  render() {
    console.log('@@@@@@@@@@@@@@@', this.props);
    const { width, height, otp, otpvalidated } = this.state;
    console.log(`${width}---------------${height}------------------`);

    let verifyOtpModalView;
    let resendOtpModalView;

    if (this.props.signinShow && !this.props.signinLoading) {
      verifyOtpModalView = (
        <Dialog
          onClose={() => this.props.signinalertshowhidedanger()}
          aria-labelledby='customized-dialog-title'
          open={this.props.signinShow}
        >
          <DialogTitle id='customized-dialog-title'>Error</DialogTitle>
          <DialogContent dividers>
            <p style={{ padding: '0.5rem 1rem' }}>
              {this.props.signinError && this.props.signinError.Error
                ? this.props.signinError.Error.Message
                : this.props.signinError}
            </p>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                console.log('::::::::::::::::');
                console.log(this.props.signinError);
                console.log('::::::::::::::::');
                this.props.signinalertshowhidedangerdismiss();
                if (
                  this.props.signinError && this.props.signinError.Error
                    ? this.props.signinError.Error.Message
                    : this.props.signinError === 'Invalid session for the user.'
                ) {
                  this.props.history.push('/welcome');
                }
                // this.props.history.push('/welcome');
              }}
              color='primary'
            >
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      );
    }

    if (this.props.userAuthShow && !this.props.userAuthLoading) {
      resendOtpModalView = (
        <Dialog
          onClose={() => this.props.userauthalertshowhidedanger()}
          aria-labelledby='customized-dialog-title'
          open={this.props.userAuthShow}
        >
          <DialogTitle id='customized-dialog-title'>Error</DialogTitle>
          <DialogContent dividers>
            <p style={{ padding: '0.5rem 1rem' }}>{this.props.userAuthError.Error.Message}</p>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                this.props.userauthalertshowhidedangerdismiss('/welcome');
                this.props.updateSwitchToOtp(false);
              }}
              color='primary'
            >
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      );
    }

    return (
      <Grow in={true} timeout={500}>
        <>
          <Row className='variable-margin-top-minor'>
            <Col>
              <Form noValidate validated={otpvalidated} onSubmit={event => this.handleOtpSubmit(event)}>
                <Row>
                  <Col>
                    <div>
                      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.5rem', fontWeight: '600' }}>
                        Enter verification Code
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
                        <span>Sent to </span>
                        <span>
                          {this.state.mobilenumber &&
                            this.state.mobilenumber.map((char, index) => {
                              if (index === 3) return ` ${char}`;
                              else if (index > 4 && index < 11) return 'X';
                              return char;
                            })}
                        </span>
                        <span> (</span>
                        <span
                          style={{ color: '#565EBF', cursor: 'pointer' }}
                          onClick={() => this.props.updateSwitchToOtp(false)}
                        >
                          Change
                        </span>
                        <span>)</span>
                      </div>
                    </div>
                  </Col>
                </Row>
                <Row style={{ marginTop: '2em' }}>
                  <Col>
                    <OtpInput
                      inputStyle='inputStyle'
                      numInputs={6}
                      isDisabled={false}
                      hasErrored={false}
                      errorStyle='error'
                      onChange={this.handleOtpChange}
                      isInputNum={true}
                      shouldAutoFocus
                      value={otp}
                      boxwidth={this.props.boxwidth}
                    />
                  </Col>
                </Row>
                <Row style={{ margin: '1.5rem 0' }}>
                  <Col>
                    <div style={{ fontFamily: "'Open Sans', Sans" }}>
                      <span>Did not receive the code ? </span>
                      <span style={{ color: '#565EBF', cursor: 'pointer' }}>
                        {this.props.userAuthLoading ? (
                          <CircularProgress name='circle' size={20} color='primary' />
                        ) : (
                          <span onClick={this.handleResendOtpSubmit}>
                            <>Resend</>
                          </span>
                        )}
                      </span>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col className='otpSubmit'>
                    {this.props.signinLoading ? (
                      <CircularProgress name='circle' size={30} color='primary' />
                    ) : (
                      // <Button disabled={this.state.otp.length < 6} onClick={this.handleOtpSubmit}>
                      <Button
                        disabled={this.state.otp.length < 6}
                        onClick={this.handleOtpSubmit}
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
                        Submit
                      </Button>
                    )}
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
          {verifyOtpModalView}
          {resendOtpModalView}
        </>
      </Grow>
    );
  }
}

const mapStateToProps = state => ({
  signinLoading: state.auth.signinLoading,
  signinError: state.auth.signinError,
  signinData: state.auth.signinData,
  signinMessage: state.auth.signinMessage,
  signinShow: state.auth.signinShow,
  userAuthLoading: state.auth.userAuthLoading,
  userAuthError: state.auth.userAuthError,
  //   userAuthData: state.auth.userAuthData,
  userAuthMessage: state.auth.userAuthMessage,
  userAuthShow: state.auth.userAuthShow,
  userGroup: state.auth.userGroup,
  switchToOtp: state.auth.switchToOtp
});

const mapDispatchToProps = dispatch => ({
  signin: (params, path) => dispatch(actions.signin(params, path)),
  signinalertshowhidedanger: () => dispatch(actions.signinalertshowhidedanger()),
  signinalertshowhidedangerdismiss: () => dispatch(actions.signinalertshowhidedangerdismiss()),
  userAuth: (params, path) => dispatch(actions.userAuth(params, path)),
  updateSwitchToOtp: payload => dispatch(actions.updateSwitchToOtp(payload)),
  userauthalertshowhidedangerdismiss: path => dispatch(actions.userauthalertshowhidedangerdismiss(path))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(OTP));
