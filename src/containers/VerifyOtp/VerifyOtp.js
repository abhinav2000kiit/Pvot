import React from 'react';
import './VerifyOtp.scss';
import { Form, Row, Col, Image, Button } from 'react-bootstrap';
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
import OtpInput from '../../containers/OTPForm/OtpForm';
import Grow from '@material-ui/core/Grow';
import KeyboardBack from '@material-ui/icons/KeyboardBackspaceSharp';
import IconButton from '@material-ui/core/IconButton';

class VerifyOtp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 0,
      height: 0,
      otp: '',
      otpvalidated: false,
      params:
        this.props.location.state &&
        this.props.location.state.userAuthData &&
        this.props.location.state.userAuthData.token &&
        this.props.location.state.userAuthData.token,
      prevPath: this.props.location.state && this.props.location.state.detail && this.props.location.state.detail,
      mobilenumber:
        this.props.location.state &&
        this.props.location.state.userAuthData &&
        this.props.location.state.userAuthData.token.ChallengeParameters.phone.split('', 13),
        whatsapp: false
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
            this.props.location.state &&
            this.props.location.state.userAuthData &&
            this.props.location.state.userAuthData.token &&
            this.props.location.state.userAuthData.token,
          prevPath: this.props.location.state && this.props.location.state.detail && this.props.location.state.detail,
          prevStateData:
            this.props.location.state &&
            this.props.location.state.userAuthData &&
            this.props.location.state.userAuthData
        });

        // this.props.verifyotpalertshowhidedangerdismiss('/signin');
        // this.props.resendotpalertshowhidedangerdismiss('/signin');
        //   alert( "This page is reloaded" );
      } else {
        //   alert( "This page is not reloaded");
      }
    }
  }

  componentDidMount() {
    const prevPath = this.props.location.state && this.props.location.state.detail && this.props.location.state.detail;
    if (prevPath === 'userAuth') {
      // do nothing let it render

      console.log('::::::::::::::::');
      console.log(this.props.location.state);
      console.log('::::::::::::::::');

      console.log('::::::::::::::::');
      console.log(this.state.mobilenumber);
      console.log(this.state.params);
      console.log('::::::::::::::::');
    } else {
      // back off
      this.props.history.push('/');
    }
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log(nextProps);

    if (prevState.prevStateData === nextProps.location.state.userAuthData) {
      console.log('same params ? how come?');
      return false;
    } else {
      console.log('diff params ! good');
      return true;
    }
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  handleOtpSubmit = event => {
    event.preventDefault();
    let params = this.props.location.state.userAuthData.token;
    console.log('handle submit entered' + JSON.stringify(this.props.location.state.userAuthData.token));
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
      group: this.props.userGroup,
      grant_type: 'VERIFY_OTP'
    };
    if (this.props.userGroup === 'ANALYST') this.props.signin(payloads, '/analyst-home');
    else if (this.props.userAuthData.signup === true) {
      this.props.signin(payloads, '/user-name');
    } else this.props.signin(payloads, '/user/user-home');
  };

  handleResendOtpSubmit = event => {
    event.preventDefault();
    const { params } = this.state;

    const payloads = {
      phone_number: params.ChallengeParameters.phone,
      grant_type: 'OTP',
      group: this.props.userGroup
    };
    console.log(payloads);
    this.props.userAuth(payloads, '/verify-otp');
    this.setState({
      whatsapp: true
    })
  };

  handleResendOtpWhatsappSubmit(event){
    event.preventDefault()
    event.preventDefault();
    const { params } = this.state;

    const payloads = {
      phone_number: params.ChallengeParameters.phone,
      grant_type: 'OTP',
      group: this.props.userGroup,
      whatsapp: true
    };
    console.log(payloads);
    this.props.userAuth(payloads, '/verify-otp');
  }
  handleResetCick = () => {
    this.setState({
      width: 0,
      height: 0,
      otp: '',
      otpvalidated: false,
      params:
        this.props.location.state &&
        this.props.location.state.userAuthData &&
        this.props.location.state.userAuthData.token &&
        this.props.location.state.userAuthData.token,
      prevPath: this.props.location.state && this.props.location.state.detail && this.props.location.state.detail,
      prevStateData:
        this.props.location.state && this.props.location.state.userAuthData && this.props.location.state.userAuthData
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
            <Typography gutterBottom>
              {this.props.signinError && this.props.signinError.Error
                ? this.props.signinError.Error.Message
                : this.props.signinError}
            </Typography>
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
                  this.props.history.push('/userauth');
                }
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

    if (this.props.userAuthShow && !this.props.userAuthLoading) {
      resendOtpModalView = (
        <Dialog
          onClose={() => this.props.userauthalertshowhidedanger()}
          aria-labelledby='customized-dialog-title'
          open={this.props.userAuthShow}
        >
          <DialogTitle id='customized-dialog-title'>Error</DialogTitle>
          <DialogContent dividers>
            <Typography gutterBottom>{this.props.userAuthError.Error.Message}</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.props.userauthalertshowhidedangerdismiss('/userauth')} color='primary'>
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      );
    }

    return (
      <Grow in={true} timeout={500}>
        <Row className='parent'>
          <Col className='center-col-around'>
            <Row>
                <Col className='p-0'>
                  <IconButton color='primary' onClick={() => this.props.history.push('/user-analyst')}>
                    <KeyboardBack />
                  </IconButton>
                </Col>
                <Col className='center-col-special'>                                                                
                  <Image src={require('../../assets/images/svg/Logo.svg')} style={{height:'30px'}} />
                </Col>
                <Col></Col>
            </                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        Row>
            <Row className='variable-margin-top-minor'>
              <Col className='right-col'>
                <Image src={require('../../assets/images/svg/grid_pvot.svg')} />                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
              </Col>
            </Row>
            <Row className='variable-margin-top-minor'>
              <Col>
                <Form noValidate validated={otpvalidated} onSubmit={event => this.handleOtpSubmit(event)}>
                  <Row>
                    <Col>
                      <div>
                        <div className='signin-sub-heading'>Verification Code</div>
                        <div className='variable-margin-top'>
                          <div className='min-8-characters'>Please type the verification code sent to</div>
                          <div className='min-8-characters-black mt-2'>
                            {this.state.mobilenumber &&
                              this.state.mobilenumber.map((char, index) => {
                                if (index === 3) return ` ${char}`;
                                else if (index > 4 && index < 11) return 'X';
                                return char;
                              })}
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <Row className='variable-margin-top'>
                    <Col className='center-col'>
                      <OtpInput
                        inputStyle='inputStyle'
                        numInputs={6}
                        isDisabled={false}
                        hasErrored={false}
                        errorStyle='error'
                        onChange={this.handleOtpChange}
                        separator={<span>-</span>}
                        isInputNum={true}
                        shouldAutoFocus
                        value={otp}
                      />
                    </Col>
                  </Row>
                  <Row className='variable-margin-top'>
                    <Col className='center-col'>
                      {this.props.signinLoading ? (
                        <CircularProgress name='circle' size={30} color='primary' />
                      ) : (
                        <Button disabled={this.state.otp.length < 6} onClick={this.handleOtpSubmit}>
                          Submit
                        </Button>
                      )}
                    </Col>
                  </Row>
                  <Row className='variable-margin-top'>
                    <Col className='center-col'>
                      <div className='min-8-characters'>Did not receive the code ?</div>
                    </Col>
                  </Row>
                  <Row className='variable-margin-top'>
                    <Col className='center-col'>
                      {this.props.userAuthLoading ? (
                        <CircularProgress name='circle' size={20} color='primary' />
                      ) : (
                        <div className='signin-forgot-password-prime-color' onClick={this.handleResendOtpSubmit}>
                          Resend OTP
                        </div>
                      )}
                      {/* {this.props.userAuthLoading ? (
                        <CircularProgress name='circle' size={20} color='primary' />
                      ) : (
                        this.state.whatsapp ? <div className='signin-forgot-password-prime-color mt-3' onClick={this.handleResendOtpWhatsappSubmit}>
                          Send OTP on Whatsapp
                        </div> : null
                      )} */}
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
            <Row className='variable-margin-top-minor variable-margin-bottom-minor'>
              <Col className='left-col'>
                <Image src={require('../../assets/images/svg/grid_pvot.svg')} />
              </Col>
            </Row>
            {verifyOtpModalView}
            {resendOtpModalView}
          </Col>
        </Row>
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
  userAuthData: state.auth.userAuthData,
  userAuthMessage: state.auth.userAuthMessage,
  userAuthShow: state.auth.userAuthShow,

  userGroup: state.auth.userGroup
});

const mapDispatchToProps = dispatch => ({
  signin: (params, path) => dispatch(actions.signin(params, path)),
  signinalertshowhidedanger: () => dispatch(actions.signinalertshowhidedanger()),
  signinalertshowhidedangerdismiss: () => dispatch(actions.signinalertshowhidedangerdismiss()),

  userAuth: (params, path) => dispatch(actions.userAuth(params, path))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(VerifyOtp));
