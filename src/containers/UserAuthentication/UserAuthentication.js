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
import KeyboardBack from '@material-ui/icons/KeyboardBackspaceSharp';
import IconButton from '@material-ui/core/IconButton';

let variableEmailPhone;
let variableEmailPhoneColor;
let variableEmailPhoneText;
let variableEmailPhoneTextColor;
// const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const remobile = /^[0-9]{10}$/;

class UserAuthentication extends Component {
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

  handleForgotPasswordSubmit = event => {
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
        group: this.props.userGroup
      };
      console.log(payloads);
      this.props.userAuth(payloads, '/verify-otp');
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
            <Typography gutterBottom>{this.props.userAuthError.Error ? this.props.userAuthError.Error.Message : null}</Typography>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                this.props.userauthalertshowhidedangerdismiss('/userauth');
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
        <Row className='parent p-2'>

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
            </Row>
            <Row className='variable-margin-top-minor'>
              
              <Col className='right-col'>
                <Image src={require('../../assets/images/svg/grid_pvot.svg')} />
              </Col>
            </Row>
            <Row className='variable-margin-top-minor'>
              <Col>
                {/* <Row className='mb-5'>
                  <Col>
                    <KeyboardBackspaceOutlinedIcon onClick={() => this.props.history.goBack()} />
                  </Col>
                </Row> */}
                <Form noValidate onSubmit={event => this.handleForgotPasswordSubmit(event)}>
                  <Row>
                    <Col>
                      <div className='forgot-sub-heading'>
                        Please enter phone number to Signup / Login as{' '}
                        <span style={{ color: 'blue' }}>{this.props.userGroup === 'USER' ? 'Investor' : 'Expert'}</span>{' '}
                      </div>
                    </Col>
                  </Row>
                  <Row className='mt-5'>
                    <Col className={variableEmailPhoneColor}>
                      <ClickAwayListener onClickAway={this.handleEmailPhoneClickAway}>
                        <FormControl>
                          {variableEmailPhone}
                          <InputLabel style={{ marginLeft: '50px' }} htmlFor='standard-name'>
                            Phone Number
                          </InputLabel>
                          <Input
                            id='standard-name'
                            type='number'
                            pattern='[0-9]*'
                            className='sigin-input'
                            value={emailPhoneValue}
                            autoComplete='off'
                            onChange={event => this.onEmailPhoneChange(event)}
                            placeholder="9999999999"
                            fullWidth
                            onClick={this.handleEmailPhoneClick}
                            inputRef={this.inputEmailPhone}
                            error={!emailPhoneSuccess}
                          />
                        </FormControl>
                      </ClickAwayListener>
                    </Col>
                  </Row>
                  <Row className='mt-1'>
                    <Col className='left-all-no-justify'>
                      <div className='min-8-characters'>
                        <div className={variableEmailPhoneTextColor}>{variableEmailPhoneText}</div>
                      </div>
                    </Col>
                  </Row>
                  <small className='form-text text-muted mt-2 text-left'>
                    By clicking on Login you agree to{' '}
                    <a style={{ color: 'blue', cursor: 'pointer' }} onClick={() => this.gotoTerms()}>
                      Terms of Service
                    </a>{' '}
                    of using Pvot
                  </small>
                  <Row className='fixed-margin-top'>
                    <Col className='center-col'>
                      {this.props.userAuthLoading ? (
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
            <Row className='variable-margin-top-minor variable-margin-bottom-minor'>
              <Col className='left-col'>
                <Image src={require('../../assets/images/svg/grid_pvot.svg')} />
              </Col>
            </Row>
            {forgotPasswordModalView}
          </Col>
        </Row>
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
  userGroup: state.auth.userGroup
});

const mapDispatchToProps = dispatch => ({
  userAuth: (params, path) => dispatch(actions.userAuth(params, path)),
  updateGroup: group => dispatch({ type: 'SET_GROUP', payload: group }),
  userauthalertshowhidedanger: () => dispatch(actions.userauthalertshowhidedanger()),
  userauthalertshowhidedangerdismiss: path => dispatch(actions.userauthalertshowhidedangerdismiss(path))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserAuthentication));
