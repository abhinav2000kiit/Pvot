import React from 'react';
import './ResetPassword.scss';
import { Form, Row, Col, Image } from 'react-bootstrap';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import { withRouter } from 'react-router-dom';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
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

let eyeNew;
let eyeConfirm;

const renewpassword = /^.{7,}$/;
let variableNewPassword;
let variableNewPasswordColor;
let variableNewPasswordText;
let variableNewPasswordTextColor;

const reconfirmpassword = /^.{7,}$/;
let variableConfirmPassword;
let variableConfirmPasswordColor;
let variableConfirmPasswordText;
let variableConfirmPasswordTextColor;

class ResetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 0,
      height: 0,
      newPasswordValue: '',
      confirmPasswordValue: '',
      resetpasswordvalidated: false,
      showNewPassword: false,
      showConfirmPassword: false,
      newPasswordActive: false,
      confirmPasswordActive: false,
      newPasswordSuccess: null,
      confirmPasswordSuccess: null,
      newPasswordFinal: false,
      confirmPasswordFinal: false,
      finalizedOne: false,
      finalizedTwo: false
    };
    this.inputNewPassword = React.createRef();
    this.inputConfirmPassword = React.createRef();
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
          newPasswordValue: '',
          confirmPasswordValue: '',
          resetpasswordvalidated: false,
          showNewPassword: false,
          showConfirmPassword: false,
          newPasswordActive: false,
          confirmPasswordActive: false,
          newPasswordSuccess: null,
          confirmPasswordSuccess: null,
          newPasswordFinal: false,
          confirmPasswordFinal: false,
          finalizedOne: false,
          finalizedTwo: false
        });
        // this.props.resetpasswordalertshowhidedangerdismiss('/signin');
        //   alert( "This page is reloaded" );
      } else {
        //   alert( "This page is not reloaded");
      }
    }
  }

  componentWillReceiveProps() {
    if (this.props.resetPasswordShow && !this.props.resetPasswordLoading) {
      this.handleResetCick();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  validateNewPassword = () => {
    const { newPasswordValue } = this.state;
    if (renewpassword.test(newPasswordValue)) {
      this.setState({
        newPasswordSuccess: true,
        newPasswordFinal: true
      });
    } else {
      this.setState({
        newPasswordSuccess: false,
        newPasswordFinal: false
      });
    }
  };

  validateConfirmPassword = () => {
    const { confirmPasswordValue } = this.state;
    if (reconfirmpassword.test(confirmPasswordValue)) {
      this.setState({
        confirmPasswordSuccess: true,
        confirmPasswordFinal: true
      });
    } else {
      this.setState({
        confirmPasswordSuccess: false,
        confirmPasswordFinal: false
      });
    }
  };

  onNewPasswordChange(event) {
    const { newPasswordValue } = this.state;
    this.setState(
      {
        newPasswordValue: event.target.value
      },
      function() {
        this.validateNewPassword();
      }
    );
    if (newPasswordValue.length === 1) {
      eyeNew = <div />;
    }
  }

  onConfirmPasswordChange(event) {
    const { confirmPasswordValue, newPasswordValue } = this.state;
    this.setState(
      {
        confirmPasswordValue: event.target.value
      },
      function() {
        this.validateConfirmPassword();
      }
    );
    if (confirmPasswordValue.length === 1) {
      eyeConfirm = <div />;
    }
  }

  handleResetPasswordSubmit = event => {
    event.preventDefault();
    const { newPasswordValue, confirmPasswordValue, newPasswordFinal, confirmPasswordFinal } = this.state;
    if (newPasswordFinal === null && confirmPasswordFinal === null) {
      this.handleNewPasswordClick();
      this.handleConfirmPasswordClick();
    }
    if (newPasswordFinal === false && confirmPasswordFinal === false) {
      this.handleNewPasswordClick();
      this.handleConfirmPasswordClick();
    }
    if (newPasswordFinal === true && confirmPasswordFinal === false) {
      this.handleConfirmPasswordClick();
    }
    if (newPasswordFinal === false && confirmPasswordFinal === true) {
      this.handleNewPasswordClick();
    }
    if (newPasswordFinal === true && confirmPasswordFinal === true) {
      const payloads = {
        email: localStorage.getItem('forgotPasswordMainEmail'),
        ConfirmationCode: localStorage.getItem('mainOtp'),
        password: newPasswordValue
      };
      this.props.resetPassword(payloads, '/reset-password-success');
    }
  };

  handleResetCick = () => {
    this.setState({
      newPasswordValue: '',
      confirmPasswordValue: '',
      resetpasswordvalidated: false,
      showNewPassword: false,
      showConfirmPassword: false,
      newPasswordActive: false,
      confirmPasswordActive: false,
      newPasswordSuccess: null,
      confirmPasswordSuccess: null,
      newPasswordFinal: false,
      confirmPasswordFinal: false,
      finalizedOne: false,
      finalizedTwo: false
    });
  };

  handleClickShowNewPassword = () => {
    const { showNewPassword } = this.state;
    this.setState({
      showNewPassword: !showNewPassword
    });
  };

  handleClickShowConfirmPassword = () => {
    const { showConfirmPassword } = this.state;
    this.setState({
      showConfirmPassword: !showConfirmPassword
    });
  };

  handleMouseDownPassword = event => {
    event.preventDefault();
  };

  handleNewPasswordClick = () => {
    const { newPasswordValue } = this.state;
    this.setState(
      {
        newPasswordActive: true,
        finalizedOne: true
      },
      function() {
        this.validateNewPassword();
      }
    );
    eyeConfirm = <div />;
  };

  handleConfirmPasswordClick = () => {
    const { confirmPasswordValue, newPasswordValue } = this.state;
    this.setState(
      {
        confirmPasswordActive: true,
        finalizedTwo: true
      },
      function() {
        this.validateConfirmPassword();
      }
    );
    eyeNew = <div />;
  };

  handleNewPasswordClickAway = () => {
    const { newPasswordFinal } = this.state;
    if (newPasswordFinal === true) {
      this.setState({
        newPasswordActive: false,
        newPasswordSuccess: null,
        finalizedOne: false
      });
    }
  };

  handleConfirmPasswordClickAway = () => {
    const { confirmPasswordFinal } = this.state;
    if (confirmPasswordFinal === true) {
      this.setState({
        confirmPasswordActive: false,
        confirmPasswordSuccess: null,
        finalizedTwo: false
      });
    }
  };

  render() {
    const {
      width,
      height,
      newPasswordSuccess,
      confirmPasswordSuccess,
      newPasswordFinal,
      confirmPasswordFinal,
      finalizedOne,
      finalizedTwo,
      newPasswordValue,
      confirmPasswordValue,
      showNewPassword,
      showConfirmPassword,
      newPasswordActive,
      confirmPasswordActive
    } = this.state;
    console.log(`${width}---------------${height}------------------`);

    let resetPasswordModalView;

    if (this.props.resetPasswordShow && !this.props.resetPasswordLoading) {
      resetPasswordModalView = (
        <Dialog
          onClose={() => this.props.resetpasswordalertshowhidedanger()}
          aria-labelledby='customized-dialog-title'
          open={this.props.resetPasswordShow}
        >
          <DialogTitle id='customized-dialog-title'>Error</DialogTitle>
          <DialogContent dividers>
            <Typography gutterBottom>{this.props.resetPasswordError.Error.Message}</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.props.resetpasswordalertshowhidedangerdismiss('/signin')} color='primary'>
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      );
    }

    if (newPasswordValue.length > 1) {
      eyeNew = (
        <InputAdornment position='end'>
          <IconButton
            aria-label='toggle password visibility'
            onClick={this.handleClickShowNewPassword}
            onMouseDown={this.handleMouseDownPassword}
          >
            {finalizedOne ? (
              showNewPassword ? (
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

    if (confirmPasswordValue.length > 1) {
      eyeConfirm = (
        <InputAdornment position='end'>
          <IconButton
            aria-label='toggle password visibility'
            onClick={this.handleClickShowConfirmPassword}
            onMouseDown={this.handleMouseDownPassword}
          >
            {finalizedTwo ? (
              showConfirmPassword ? (
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

    if (newPasswordActive === false && newPasswordSuccess === null) {
      variableNewPasswordText = '';
      variableNewPasswordTextColor = '';
      variableNewPasswordColor = 'icon-gray';
      variableNewPassword = <Image src={require('../../assets/icons/svg/lock-inactive.svg')} className='email' />;
    }
    if (newPasswordActive === true && newPasswordSuccess === false) {
      variableNewPasswordText = '';
      variableNewPasswordColor = 'icon-danger';
      variableNewPasswordTextColor = 'danger-text';
      variableNewPassword = <Image src={require('../../assets/icons/svg/lock-danger.svg')} className='email' />;
    }
    if (newPasswordActive === true && newPasswordSuccess === true) {
      variableNewPasswordText = '';
      variableNewPasswordColor = 'icon-blue';
      variableNewPasswordTextColor = '';
      variableNewPassword = <Image src={require('../../assets/icons/svg/lock-active.svg')} className='email' />;
    }
    if (newPasswordActive === true && newPasswordSuccess === null) {
      variableNewPasswordText = '';
      variableNewPasswordColor = 'icon-blue';
      variableNewPasswordTextColor = '';
      variableNewPassword = <Image src={require('../../assets/icons/svg/lock-active.svg')} className='email' />;
    }

    if (confirmPasswordActive === false && confirmPasswordSuccess === null) {
      variableConfirmPasswordText = '';
      variableConfirmPasswordTextColor = '';
      variableConfirmPasswordColor = 'icon-gray';
      variableConfirmPassword = <Image src={require('../../assets/icons/svg/lock-inactive.svg')} className='email' />;
    }
    if (confirmPasswordActive === true && confirmPasswordSuccess === false) {
      variableConfirmPasswordText = '';
      variableConfirmPasswordColor = 'icon-danger';
      variableConfirmPasswordTextColor = 'danger-text';
      variableConfirmPassword = <Image src={require('../../assets/icons/svg/lock-danger.svg')} className='email' />;
    }
    if (confirmPasswordActive === true && confirmPasswordSuccess === true) {
      variableConfirmPasswordText = '';
      variableConfirmPasswordColor = 'icon-blue';
      variableConfirmPasswordTextColor = '';
      variableConfirmPassword = <Image src={require('../../assets/icons/svg/lock-active.svg')} className='email' />;
    }
    if (confirmPasswordActive === true && confirmPasswordSuccess === null) {
      variableConfirmPasswordText = '';
      variableConfirmPasswordColor = 'icon-blue';
      variableConfirmPasswordTextColor = '';
      variableConfirmPassword = <Image src={require('../../assets/icons/svg/lock-active.svg')} className='email' />;
    }

    return (
      <Row className='parent'>
        <Col className='center-col-around'>
          <Row className='variable-margin-top-minor'>
            <Col>
              {/* <Image
                onClick={this.handleResetPasswordBack}
                src={require("../../assets/icons/svg/left-arrow.svg")} className="email"
              /> */}
            </Col>
            <Col className='right-col'>
              <Image src={require('../../assets/images/svg/grid_pvot.svg')} />
            </Col>
          </Row>
          <Row className='variable-margin-top-minor'>
            <Col>
              <Form noValidate onSubmit={event => this.handleResetPasswordSubmit(event)}>
                <Row>
                  <Col>
                    <div className='signin-sub-heading'>Reset Password</div>
                  </Col>
                </Row>
                <Row className='mt-5'>
                  <Col className={variableNewPasswordColor}>
                    <ClickAwayListener onClickAway={this.handleNewPasswordClickAway}>
                      <FormControl>
                        {variableNewPassword}
                        <InputLabel style={{ marginLeft: '50px' }} htmlFor='adornment-password'>New Password</InputLabel>
                        <Input
                          id='adornment-password'
                          type={showNewPassword ? 'text' : 'password'}
                          className='sigin-input'
                          value={newPasswordValue}
                          autoComplete='off'
                          onChange={event => this.onNewPasswordChange(event)}
                          fullWidth
                          endAdornment={eyeNew}
                          onClick={this.handleNewPasswordClick}
                          inputRef={this.inputNewPassword}
                          error={!newPasswordSuccess}
                        />
                      </FormControl>
                    </ClickAwayListener>
                  </Col>
                </Row>
                <Row className='mt-1'>
                  <Col className='left-all-no-justify'>
                    <div className='min-8-characters'>
                      <div className={variableNewPasswordTextColor}>{variableNewPasswordText}</div>
                    </div>
                  </Col>
                </Row>
                <Row className='mt-5'>
                  <Col className={variableConfirmPasswordColor}>
                    <ClickAwayListener onClickAway={this.handleConfirmPasswordClickAway}>
                      <FormControl>
                        {variableConfirmPassword}
                        <InputLabel style={{ marginLeft: '50px' }} htmlFor='adornment-password'>
                          Confirm New Password
                        </InputLabel>
                        <Input
                          id='adornment-password'
                          type={showConfirmPassword ? 'text' : 'password'}
                          className='sigin-input'
                          value={confirmPasswordValue}
                          autoComplete='off'
                          onChange={event => this.onConfirmPasswordChange(event)}
                          fullWidth
                          endAdornment={eyeConfirm}
                          onClick={this.handleConfirmPasswordClick}
                          inputRef={this.inputConfirmPassword}
                          error={!confirmPasswordSuccess}
                        />
                      </FormControl>
                    </ClickAwayListener>
                  </Col>
                </Row>
                <Row className='mt-1'>
                  <Col className='left-all-no-justify'>
                    <div className='min-8-characters'>
                      <div className={variableConfirmPasswordTextColor}>{variableConfirmPasswordText}</div>
                    </div>
                  </Col>
                </Row>
                <Row className='fixed-margin-top'>
                  <Col className='center-col'>
                    {this.props.resetPasswordLoading ? (
                      <CircularProgress name='circle' color='primary' />
                    ) : (
                      <Button className='pointer' variant='contained' color='primary' type='submit' fullWidth>
                        Done
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
          {resetPasswordModalView}
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => ({
  resetPasswordLoading: state.auth.resetPasswordLoading,
  resetPasswordError: state.auth.resetPasswordError,
  resetPasswordData: state.auth.resetPasswordData,
  resetPasswordMessage: state.auth.resetPasswordMessage,
  resetPasswordShow: state.auth.resetPasswordShow
});

const mapDispatchToProps = dispatch => ({
  resetPassword: (params, path) => dispatch(actions.resetPassword(params, path)),
  resetpasswordalertshowhidedanger: () => dispatch(actions.resetpasswordalertshowhidedanger()),
  resetpasswordalertshowhidedangerdismiss: path => dispatch(actions.resetpasswordalertshowhidedangerdismiss(path))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ResetPassword));
