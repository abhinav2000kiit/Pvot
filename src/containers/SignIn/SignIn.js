import React from 'react';
import './SignIn.scss';
import { Form, Row, Col, Image } from 'react-bootstrap';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import { withRouter, Redirect } from 'react-router-dom';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Button, FormControl } from '@material-ui/core';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { connect } from 'react-redux';
import Spinner from 'react-spinkit';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import * as actions from '../../redux/actions/index';

let eye;

let variableEmail;
let variableEmailColor;
let variableEmailText;
let variableEmailTextColor;
const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const repassword = /^.{8,}$/;
let variablePassword;
let variablePasswordColor;
let variablePasswordText;
let variablePasswordTextColor;

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 0,
      height: 0,
      emailValue: '',
      passwordValue: '',
      showPassword: false,
      emailActive: false,
      passwordActive: false,
      emailSuccess: null,
      passwordSuccess: null,
      emailFinal: false,
      passwordFinal: false,
      finalized: false
    };
    this.inputEmail = React.createRef();
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
          passwordValue: '',
          showPassword: false,
          emailActive: false,
          passwordActive: false,
          emailSuccess: null,
          passwordSuccess: null,
          emailFinal: false,
          passwordFinal: false,
          finalized: false
        });
        this.props.signinalertshowhidedangerdismiss();
        //   alert( "This page is reloaded" );
      } else {
        //   alert( "This page is not reloaded");
      }
    }
  }

  componentWillReceiveProps() {
    if (this.props.signinShow && !this.props.signinLoading) {
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

  onEmailChange(event) {
    this.setState(
      {
        emailValue: event.target.value
      },
      function() {
        this.validateEmail();
      }
    );
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

  handleLoginSubmit = event => {
    event.preventDefault();
    const { emailValue, passwordValue, emailFinal, passwordFinal } = this.state;
    if (emailFinal === null && passwordFinal === null) {
      this.handleEmailClick();
      this.handlePasswordClick();
    }
    if (emailFinal === false && passwordFinal === false) {
      this.handleEmailClick();
      this.handlePasswordClick();
    }
    if (emailFinal === true && passwordFinal === false) {
      this.handlePasswordClick();
    }
    if (emailFinal === false && passwordFinal === true) {
      this.handleEmailClick();
    }
    if (emailFinal === true && passwordFinal === true) {
      const payloads = {
        email: emailValue,
        password: passwordValue,
        grant_type: 'PASSWORD',
        group: this.props.userGroup
      };
      if (this.props.userGroup === 'ANALYST') this.props.signin(payloads, '/analyst-home');
      else this.props.signin(payloads, '/user/user-home');
    }
  };

  handleResetCick = () => {
    this.setState({
      emailValue: '',
      passwordValue: '',
      showPassword: false,
      emailActive: false,
      passwordActive: false,
      emailSuccess: null,
      passwordSuccess: null,
      emailFinal: false,
      passwordFinal: false
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
    this.setState(
      {
        emailActive: true
      },
      function() {
        this.validateEmail();
      }
    );
  };

  handlePasswordClick = () => {
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
    const { emailFinal } = this.state;
    if (emailFinal === true) {
      this.setState({
        emailActive: false,
        emailSuccess: null
      });
    }
  };

  handlePasswordClickAway = () => {
    const { passwordFinal } = this.state;
    if (passwordFinal === true) {
      this.setState({
        passwordActive: false,
        passwordSuccess: null,
        finalized: false
      });
    }
  };

  handleSignInSignUp = () => {
    this.props.history.push('/signup');
  };

  handleSignInForgotPassword = () => {
    this.props.history.push('/forgot-password');
  };

  render() {
    if (this.props.signinData && this.props.userGroup) {
      console.log(this.props.signinData);
      // if (this.props.userGroup === 'ANALYST') this.props.history.push('/analyst-home');
      // else this.props.history.push('/user-home');
    }
    const {
      width,
      height,
      finalized,
      emailFinal,
      passwordFinal,
      emailSuccess,
      passwordSuccess,
      emailActive,
      passwordActive,
      emailValue,
      passwordValue,
      showPassword
    } = this.state;
    console.log(`${width}---------------${height}------------------`);
    let loginModalView;

    if (this.props.signinShow && !this.props.signinLoading) {
      loginModalView = (
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
            <Button onClick={() => this.props.signinalertshowhidedangerdismiss()} color='primary'>
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
      variableEmail = <Image src={require('../../assets/icons/svg/user-inactive.svg')} className='email' />;
    }
    if (emailActive === true && emailSuccess === false) {
      variableEmailText = '* Must be a valid email';
      variableEmailColor = 'icon-danger';
      variableEmailTextColor = 'danger-text';
      variableEmail = <Image src={require('../../assets/icons/svg/user-danger.svg')} className='email' />;
    }
    if (emailActive === true && emailSuccess === true) {
      variableEmailText = '';
      variableEmailColor = 'icon-blue';
      variableEmailTextColor = '';
      variableEmail = <Image src={require('../../assets/icons/svg/user-active.svg')} className='email' />;
    }
    if (emailActive === true && emailSuccess === null) {
      variableEmailText = '';
      variableEmailColor = 'icon-blue';
      variableEmailTextColor = '';
      variableEmail = <Image src={require('../../assets/icons/svg/user-active.svg')} className='email' />;
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
        <Col className='center-col-space-evenly'>
          <Row className='variable-margin-top-minor'>
            <Col>
              <Form noValidate onSubmit={event => this.handleLoginSubmit(event)}>
                <Row>
                  <Col xs={10} sm={10} md={10} lg={12} xl={12}>
                    <div>
                      <span className='signin-header'>Login </span>
                      <span className='signin-sub-heading'>to know more about us</span>
                    </div>
                  </Col>
                </Row>
                <Row className='mt-5'>
                  <Col className={variableEmailColor}>
                    <ClickAwayListener onClickAway={this.handleEmailClickAway}>
                      <FormControl>
                        <InputAdornment position='start'>{variableEmail}</InputAdornment>
                        <InputLabel htmlFor='standard-name' style={{ marginLeft: '50px' }}>
                          Email ID
                        </InputLabel>
                        <Input
                          placeholder='Email ID'
                          name='email'
                          id='standard-name'
                          label='Email ID'
                          value={emailValue}
                          autoComplete='off'
                          onChange={event => this.onEmailChange(event)}
                          fullWidth
                          className='sigin-input'
                          error={!emailSuccess}
                          onClick={this.handleEmailClick}
                          inputRef={this.inputEmail}
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
                <Row className='mt-5'>
                  <Col className={variablePasswordColor}>
                    <ClickAwayListener onClickAway={this.handlePasswordClickAway}>
                      <FormControl>
                        <InputAdornment position='start'>{variablePassword}</InputAdornment>
                        <InputLabel htmlFor='adornment-password' style={{ marginLeft: '50px' }}>
                          Password
                        </InputLabel>
                        <Input
                          placeholder='Password'
                          label='Password'
                          name='password'
                          id='adornment-password'
                          type={showPassword ? 'text' : 'password'}
                          className='sigin-input'
                          value={passwordValue}
                          autoComplete='off'
                          onChange={event => this.onPasswordChange(event)}
                          fullWidth
                          endAdornment={eye}
                          error={!passwordSuccess}
                          onClick={this.handlePasswordClick}
                          inputRef={this.inputPassword}
                        />
                      </FormControl>
                    </ClickAwayListener>
                  </Col>
                </Row>
                <Row className='mt-1'>
                  <Col className='left-all-no-justify'>
                    <div className='min-8-characters'>
                      <div className={variablePasswordTextColor}>{variablePasswordText}</div>
                    </div>
                  </Col>
                </Row>
                <Row className='mt-3'>
                  <Col className='right-all-no-justify'>
                    <div className='signin-forgot-password' onClick={this.handleSignInForgotPassword}>
                      <u>Forgot Password</u>
                    </div>
                  </Col>
                </Row>
                <Row className='mt-5'>
                  <Col className='center-col'>
                    {this.props.signinLoading ? (
                      <CircularProgress name='circle' color='primary' />
                    ) : (
                      <Button className='pointer' variant='contained' color='primary' type='submit' fullWidth>
                        Login
                      </Button>
                    )}
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
          <Row className='variable-margin-top-minor'>
            <Col>
              <Row>
                <Col xs={5} sm={5} md={5} lg={5} xl={5} className='center-col'>
                  <div className='line' />
                </Col>
                <Col xs={2} sm={2} md={2} lg={2} xl={2} className='center-col'>
                  <div className='signin-or'>Or</div>
                </Col>
                <Col xs={5} sm={5} md={5} lg={5} xl={5} className='center-col'>
                  <div className='line' />
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className='variable-margin-top-minor'>
            <Col>
              <Row>
                <Col className='center-col'>
                  <Image src={require('../../assets/icons/svg/google-icon.svg')} />
                </Col>
              </Row>
              <Row className='mt-2'>
                <Col className='center-col'>
                  <div className='signin-google'>Google</div>
                </Col>
              </Row>
            </Col>
            <Col>
              <Row>
                <Col className='center-col'>
                  <Image src={require('../../assets/icons/svg/facebook-icon.svg')} />
                </Col>
              </Row>
              <Row className='mt-2'>
                <Col className='center-col'>
                  <div className='signin-facebook'>Facebook</div>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className='variable-margin-top-minor variable-margin-bottom-minor'>
            <Col>
              <div className='text-center'>
                <span className='signin-span-not-a-member'>Still not a member?</span>
                <span onClick={this.handleSignInSignUp} className='signin-span-sign-up'>
                  <u>Sign Up</u>
                </span>
              </div>
            </Col>
          </Row>
          {loginModalView}
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => ({
  signinLoading: state.auth.signinLoading,
  signinError: state.auth.signinError,
  signinData: state.auth.signinData,
  signinMessage: state.auth.signinMessage,
  signinShow: state.auth.signinShow,
  userGroup: state.auth.userGroup
});

const mapDispatchToProps = dispatch => ({
  signin: (params, path) => dispatch(actions.signin(params, path)),
  signinalertshowhidedanger: () => dispatch(actions.signinalertshowhidedanger()),
  signinalertshowhidedangerdismiss: () => dispatch(actions.signinalertshowhidedangerdismiss())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SignIn));
