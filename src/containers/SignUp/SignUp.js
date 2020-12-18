/* eslint-disable react/sort-comp */
/* eslint-disable global-require */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';
import './SignUp.scss';
import { Form, Row, Col, Image } from 'react-bootstrap';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
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
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import PhoneAndroidOutlinedIcon from '@material-ui/icons/PhoneAndroidOutlined';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import * as actions from '../../redux/actions/index';

let eye;

let variableEmail;
let variableEmailColor;
let variableEmailText;
let variableEmailTextColor;
const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const remobile = /^[36789]\d{9}$/;
let variableMobile;
let variableMobileColor;
let variableMobileText;
let variableMobileTextColor;

const repassword = /^.{8,}$/;
let variablePassword;
let variablePasswordColor;
let variablePasswordText;
let variablePasswordTextColor;

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 0,
      height: 0,
      emailValue: '',
      mobileValue: '',
      passwordValue: '',
      showPassword: false,
      emailActive: false,
      mobileActive: false,
      passwordActive: false,
      emailSuccess: null,
      mobileSuccess: null,
      passwordSuccess: null,
      emailFinal: false,
      mobileFinal: false,
      passwordFinal: false,
      finalized: false
    };
    this.inputEmail = React.createRef();
    this.inputMobile = React.createRef();
    this.inputPassword = React.createRef();
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
          emailValue: '',
          mobileValue: '',
          passwordValue: '',
          showPassword: false,
          emailActive: false,
          mobileActive: false,
          passwordActive: false,
          emailSuccess: null,
          mobileSuccess: null,
          passwordSuccess: null,
          emailFinal: false,
          mobileFinal: false,
          passwordFinal: false,
          finalized: false
        });
        this.props.signupalertshowhidedangerdismiss();
        //   alert( "This page is reloaded" );
      } else {
        //   alert( "This page is not reloaded");
      }
    }
  }

  componentWillReceiveProps() {
    if (this.props.signupShow && !this.props.signupLoading) {
      // this.handleResetCick();
    }
  }

  componentWillUnmount() {
    this.handleResetCick();
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  validateEmail = () => {
    const { emailValue } = this.state;
    if (re.test(emailValue)) {
      this.setState({
        emailSuccess: true,
        emailFinal: true
      });
    } else {
      this.setState({
        emailSuccess: false,
        emailFinal: false
      });
    }
  };

  validateMobile = () => {
    const { mobileValue } = this.state;
    if (remobile.test(mobileValue)) {
      this.setState({
        mobileSuccess: true,
        mobileFinal: true
      });
    } else {
      this.setState({
        mobileSuccess: false,
        mobileFinal: false
      });
    }
  };

  validatePassword = () => {
    const { passwordValue } = this.state;
    if (repassword.test(passwordValue)) {
      this.setState({
        passwordSuccess: true,
        passwordFinal: true
      });
    } else {
      this.setState({
        passwordSuccess: false,
        passwordFinal: false
      });
    }
  };

  onEmailChange(event) {
    const { emailValue } = this.state;
    this.setState(
      {
        emailValue: event.target.value
      },
      function() {
        this.validateEmail();
      }
    );
  }

  onMobileChange(event) {
    this.setState(
      {
        mobileValue: event.target.value
      },
      function() {
        this.validateMobile();
      }
    );
  }

  onPasswordChange(event) {
    const { passwordValue } = this.state;
    this.setState(
      {
        passwordValue: event.target.value
      },
      function() {
        this.validatePassword();
      }
    );
    if (passwordValue.length === 1) {
      eye = <div />;
    }
  }

  handleSignUpSubmit = event => {
    event.preventDefault();
    const { emailValue, mobileValue, passwordValue, emailFinal, mobileFinal, passwordFinal } = this.state;
    localStorage.setItem('signupMainEmail', emailValue);
    if (emailFinal === null && mobileFinal === null && passwordFinal === null) {
      this.handleEmailClick();
      this.handleMobileClick();
      this.handlePasswordClick();
    }
    if (emailFinal === false && mobileFinal === false && passwordFinal === false) {
      this.handleEmailClick();
      this.handleMobileClick();
      this.handlePasswordClick();
    }
    if (emailFinal === true && mobileFinal === true && passwordFinal === false) {
      this.handlePasswordClick();
    }
    if (emailFinal === true && mobileFinal === false && passwordFinal === true) {
      this.handleMobileClick();
    }
    if (emailFinal === false && mobileFinal === true && passwordFinal === true) {
      this.handleEmailClick();
    }
    if (emailFinal === true && mobileFinal === false && passwordFinal === false) {
      this.handleMobileClick();
      this.handlePasswordClick();
    }
    if (emailFinal === false && mobileFinal === true && passwordFinal === false) {
      this.handleEmailClick();
      this.handlePasswordClick();
    }
    if (emailFinal === false && mobileFinal === false && passwordFinal === true) {
      this.handleEmailClick();
      this.handleMobileClick();
    }
    if (emailFinal === true && mobileFinal === true && passwordFinal === true) {
      const str1 = mobileValue[0] === '3' ? '+92' : '+91';
      const str2 = mobileValue;
      const mobileNumber = str1.concat(str2);
      const payloads = {
        password: passwordValue,
        email: emailValue,
        group: this.props.userGroup,
        UserAttributes: [
          {
            Name: 'phone_number',
            Value: mobileNumber
          },
          {
            Name: 'name',
            Value: ''
          }
        ]
      };
      this.props.signup(payloads, '/verify-otp');
    }
  };

  handleResetCick = () => {
    this.setState({
      emailValue: '',
      mobileValue: '',
      passwordValue: '',
      showPassword: false,
      emailActive: false,
      mobileActive: false,
      passwordActive: false,
      emailSuccess: null,
      mobileSuccess: null,
      passwordSuccess: null,
      emailFinal: false,
      mobileFinal: false,
      passwordFinal: false,
      finalized: false
    });
  };

  handleClickShowPassword = () => {
    const { showPassword } = this.state;
    this.setState({
      showPassword: !showPassword
    });
  };

  handleMouseDownPassword = event => {
    event.preventDefault();
  };

  handleEmailClick = () => {
    const { emailValue } = this.state;
    this.setState(
      {
        emailActive: true
      },
      function() {
        this.validateEmail();
      }
    );
  };

  handleMobileClick = () => {
    const { mobileValue } = this.state;
    this.setState(
      {
        mobileActive: true
      },
      function() {
        this.validateMobile();
      }
    );
  };

  handlePasswordClick = () => {
    const { passwordValue } = this.state;
    this.setState(
      {
        passwordActive: true,
        finalized: true
      },
      function() {
        this.validatePassword();
      }
    );
  };

  handleEmailClickAway = () => {
    const { emailFinal, passwordFinal } = this.state;
    if (emailFinal === true) {
      this.setState({
        emailActive: false,
        emailSuccess: null
      });
    }
  };

  handleMobileClickAway = () => {
    const { mobileFinal } = this.state;
    if (mobileFinal === true) {
      this.setState({
        mobileActive: false,
        mobileSuccess: null
      });
    }
  };

  handlePasswordClickAway = () => {
    const { emailFinal, passwordFinal } = this.state;
    if (passwordFinal === true) {
      this.setState({
        passwordActive: false,
        passwordSuccess: null,
        finalized: false
      });
    }
  };

  handleSignUpBack = () => {
    this.props.history.push('/signin');
  };

  render() {
    const {
      width,
      height,
      finalized,
      emailFinal,
      mobileFinal,
      passwordFinal,
      emailSuccess,
      mobileSuccess,
      passwordSuccess,
      emailActive,
      mobileActive,
      passwordActive,
      emailValue,
      mobileValue,
      passwordValue,
      showPassword
    } = this.state;
    console.log(`${width}---------------${height}------------------`);

    let signupModalView;

    if (this.props.signupShow && !this.props.signupLoading) {
      signupModalView = (
        <Dialog
          onClose={() => this.props.signupalertshowhidedanger()}
          aria-labelledby='customized-dialog-title'
          open={this.props.signupShow}
        >
          <DialogTitle id='customized-dialog-title'>Error</DialogTitle>
          <DialogContent dividers>
            <Typography gutterBottom>{this.props.signupError.Error.Message}</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.props.signupalertshowhidedangerdismiss()} color='primary'>
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      );
    }

    if (passwordValue.length > 1) {
      eye = (
        <InputAdornment position='end'>
          <IconButton
            aria-label='toggle password visibility'
            onClick={this.handleClickShowPassword}
            onMouseDown={this.handleMouseDownPassword}
          >
            {finalized ? (
              showPassword ? (
                <div className='signin-forgot-password'>
                  <u>Hide</u>
                </div>
              ) : (
                <div className='signin-forgot-password'>
                  <u>Show</u>
                </div>
              )
            ) : (
              ''
            )}
          </IconButton>
        </InputAdornment>
      );
    }

    if (emailActive === false && emailSuccess === null) {
      variableEmailText = '';
      variableEmailTextColor = '';
      variableEmailColor = 'icon-gray';
      variableEmail = <Image src={require('../../assets/icons/svg/email-inactive.svg')} className='email' />;
    }
    if (emailActive === true && emailSuccess === false) {
      variableEmailText = '* Must be a valid email';
      variableEmailColor = 'icon-danger';
      variableEmailTextColor = 'danger-text';
      variableEmail = <Image src={require('../../assets/icons/svg/email-danger.svg')} className='email' />;
    }
    if (emailActive === true && emailSuccess === true) {
      variableEmailText = '';
      variableEmailColor = 'icon-blue';
      variableEmailTextColor = '';
      variableEmail = <Image src={require('../../assets/icons/svg/email-active.svg')} className='email' />;
    }
    if (emailActive === true && emailSuccess === null) {
      variableEmailText = '';
      variableEmailColor = 'icon-blue';
      variableEmailTextColor = '';
      variableEmail = <Image src={require('../../assets/icons/svg/email-active.svg')} className='email' />;
    }

    if (mobileActive === false && mobileSuccess === null) {
      variableMobileText = '';
      variableMobileTextColor = '';
      variableMobileColor = 'icon-gray';
      variableMobile = <Image src={require('../../assets/icons/svg/smartphone-inactive.svg')} className='email' />;
    }
    if (mobileActive === true && mobileSuccess === false) {
      variableMobileText = '* Must be a valid phone no';
      variableMobileColor = 'icon-danger';
      variableMobileTextColor = 'danger-text';
      variableMobile = <Image src={require('../../assets/icons/svg/smartphone-danger.svg')} className='email' />;
    }
    if (mobileActive === true && mobileSuccess === true) {
      variableMobileText = '';
      variableMobileColor = 'icon-blue';
      variableMobileTextColor = '';
      variableMobile = <Image src={require('../../assets/icons/svg/smartphone-active.svg')} className='email' />;
    }
    if (mobileActive === true && mobileSuccess === null) {
      variableMobileText = '';
      variableMobileColor = 'icon-blue';
      variableMobileTextColor = '';
      variableMobile = <Image src={require('../../assets/icons/svg/smartphone-active.svg')} className='email' />;
    }

    if (passwordActive === false && passwordSuccess === null) {
      variablePasswordText = '';
      variablePasswordTextColor = '';
      variablePasswordColor = 'icon-gray';
      variablePassword = <Image src={require('../../assets/icons/svg/lock-inactive.svg')} className='email' />;
    }
    if (passwordActive === true && passwordSuccess === false) {
      variablePasswordText = '* Must contain at least 8 characters';
      variablePasswordColor = 'icon-danger';
      variablePasswordTextColor = 'danger-text';
      variablePassword = <Image src={require('../../assets/icons/svg/lock-danger.svg')} className='email' />;
    }
    if (passwordActive === true && passwordSuccess === true) {
      variablePasswordText = '';
      variablePasswordColor = 'icon-blue';
      variablePasswordTextColor = '';
      variablePassword = <Image src={require('../../assets/icons/svg/lock-active.svg')} className='email' />;
    }
    if (passwordActive === true && passwordSuccess === null) {
      variablePasswordText = '';
      variablePasswordColor = 'icon-blue';
      variablePasswordTextColor = '';
      variablePassword = <Image src={require('../../assets/icons/svg/lock-active.svg')} className='email' />;
    }

    return (
      <Row className='parent'>
        <Col className='center-col-around'>
          <Row className='variable-margin-top-minor'>
            <Col>
              <Image
                onClick={this.handleSignUpBack}
                src={require('../../assets/icons/svg/left-arrow.svg')}
                className='email'
              />
            </Col>
            <Col className='right-col'>
              <Image src={require('../../assets/images/svg/grid_pvot.svg')} />
            </Col>
          </Row>
          <Row className='variable-margin-top-minor p-2'>
            <Col>
              <Form noValidate onSubmit={event => this.handleSignUpSubmit(event)}>
                <Row>
                  <Col>
                    <div className='signin-sub-heading'>Sign Up</div>
                  </Col>
                </Row>
                <Row className='variable-margin-top'>
                  <Col className={variableEmailColor}>
                    <ClickAwayListener onClickAway={this.handleEmailClickAway}>
                      <FormControl>
                        <InputAdornment position='start'>{variableEmail}</InputAdornment>
                        <InputLabel style={{ marginLeft: '50px' }} htmlFor='standard-name'>
                          Email ID
                        </InputLabel>
                        <Input
                          id='standard-name'
                          label='Email ID'
                          value={emailValue}
                          autoComplete='off'
                          onChange={event => this.onEmailChange(event)}
                          fullWidth
                          onClick={this.handleEmailClick}
                          inputRef={this.inputEmail}
                          error={!emailSuccess}
                          className='sigin-input'
                        />
                      </FormControl>
                    </ClickAwayListener>
                  </Col>
                </Row>
                <Row className='mt-1'>
                  <Col className='left-all-no-justify'>
                    <div className='min-8-characters'>
                      <div className={variableEmailTextColor}>{variableEmailText}</div>
                    </div>
                  </Col>
                </Row>
                <Row className='variable-margin-top'>
                  <Col className={variableMobileColor}>
                    <ClickAwayListener onClickAway={this.handleMobileClickAway}>
                      <FormControl>
                        <InputAdornment position='start'>{variableMobile}</InputAdornment>
                        <InputLabel style={{ marginLeft: '50px' }} htmlFor='standard-name'>
                          Phone No
                        </InputLabel>
                        <Input
                          id='standard-mobile'
                          className='sigin-input'
                          value={mobileValue}
                          onChange={event => this.onMobileChange(event)}
                          fullWidth
                          autoComplete='off'
                          onClick={this.handleMobileClick}
                          inputRef={this.inputMobile}
                          error={!mobileSuccess}
                        />
                      </FormControl>
                    </ClickAwayListener>
                  </Col>
                </Row>
                <Row className='mt-1'>
                  <Col className='left-all-no-justify'>
                    <div className='min-8-characters'>
                      <div className={variableMobileTextColor}>{variableMobileText}</div>
                    </div>
                  </Col>
                </Row>
                <Row className='variable-margin-top'>
                  <Col className={variablePasswordColor}>
                    <ClickAwayListener onClickAway={this.handlePasswordClickAway}>
                      <FormControl>
                        <InputAdornment position='start'>{variablePassword}</InputAdornment>
                        <InputLabel style={{ marginLeft: '50px' }} htmlFor='adornment-password'>
                          Password
                        </InputLabel>
                        <Input
                          id='adornment-password'
                          type={showPassword ? 'text' : 'password'}
                          className='sigin-input'
                          value={passwordValue}
                          autoComplete='off'
                          onChange={event => this.onPasswordChange(event)}
                          fullWidth
                          endAdornment={eye}
                          onClick={this.handlePasswordClick}
                          inputRef={this.inputPassword}
                          error={!passwordSuccess}
                        />
                      </FormControl>
                    </ClickAwayListener>
                  </Col>
                </Row>
                <Row className='mt-1'>
                  <Col className='right-all-no-justify mb-0'>
                    <div className=''>
                      <p className='signup-text mb-0'>should contain min 8 characters</p>
                    </div>
                  </Col>
                </Row>
                <Row className='left-all-no-justify'>
                  <div className='min-8-characters'>
                    <div className={variablePasswordTextColor}>{variablePasswordText}</div>
                  </div>
                </Row>
                <Row className='variable-margin-top'>
                  <Col className='center-col'>
                    <div>
                      <span className='signin-forgot-password signup-terms-condition-fontsize'>
                        By signing up I agree to the{' '}
                      </span>
                      <span className='signin-forgot-password-prime-color signup-terms-condition-fontsize'>
                        <u>terms and conditions</u>
                      </span>
                    </div>
                  </Col>
                </Row>
                <Row className='variable-margin-top'>
                  <Col className='center-col'>
                    {this.props.signupLoading ? (
                      <CircularProgress name='circle' color='primary' />
                    ) : (
                      <Button
                        className='pointer'
                        variant='contained'
                        color='primary'
                        type='submit'
                        fullWidth
                        style={{ textTransform: 'none' }}
                      >
                        Sign Up
                      </Button>
                    )}
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
          {signupModalView}
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => ({
  signupLoading: state.auth.signupLoading,
  signupError: state.auth.signupError,
  signupData: state.auth.signupData,
  signupMessage: state.auth.signupMessage,
  signupShow: state.auth.signupShow,
  userGroup: state.auth.userGroup
});

const mapDispatchToProps = dispatch => ({
  signup: (params, path) => dispatch(actions.signup(params, path)),
  signupalertshowhidedanger: () => dispatch(actions.signupalertshowhidedanger()),
  signupalertshowhidedangerdismiss: () => dispatch(actions.signupalertshowhidedangerdismiss())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SignUp));
