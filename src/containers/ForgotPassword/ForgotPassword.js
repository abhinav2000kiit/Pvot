import React from 'react';
import './ForgotPassword.scss';
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

let variableEmailPhone;
let variableEmailPhoneColor;
let variableEmailPhoneText;
let variableEmailPhoneTextColor;
const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//const remobile = /^[0-9]{9}$/;

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 0,
      height: 0,
      emailPhoneValue: '',
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
    if (this.props.forgotPasswordShow && !this.props.forgotPasswordLoading) {
      this.handleResetCick();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  validateEmailPhone = () => {
    const { emailPhoneValue } = this.state;
    if (re.test(emailPhoneValue)) {
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
        email: emailPhoneValue
      };
      this.props.forgotPassword(payloads, '/verify-otp');
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

  handleForgotPasswordBack = () => {
    this.props.history.push('/signin');
  };

  render() {
    const { width, height, emailPhoneSuccess, emailPhoneActive, emailPhoneValue } = this.state;
    console.log(`${width}---------------${height}------------------`);
    let forgotPasswordModalView;

    if (this.props.forgotPasswordShow && !this.props.forgotPasswordLoading) {
      forgotPasswordModalView = (
        <Dialog
          onClose={() => this.props.forgotpasswordalertshowhidedanger()}
          aria-labelledby='customized-dialog-title'
          open={this.props.forgotPasswordShow}
        >
          <DialogTitle id='customized-dialog-title'>Error</DialogTitle>
          <DialogContent dividers>
            <Typography gutterBottom>{this.props.forgotPasswordError.Error.Message}</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.props.forgotpasswordalertshowhidedangerdismiss('/signin')} color='primary'>
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
      variableEmailPhoneText = '* Must be a valid and registered email id';
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
      <Row className='parent p-2'>
        <Col className='center-col-around'>
          <Row className='variable-margin-top-minor'>
            <Col>
              <Image
                onClick={this.handleForgotPasswordBack}
                src={require('../../assets/icons/svg/left-arrow.svg')}
                className='email'
              />
            </Col>
            <Col className='right-col'>
              <Image src={require('../../assets/images/svg/grid_pvot.svg')} />
            </Col>
          </Row>
          <Row className='variable-margin-top-minor'>
            <Col>
              <Form noValidate onSubmit={event => this.handleForgotPasswordSubmit(event)}>
                <Row>
                  <Col>
                    <div className='forgot-sub-heading'>Send OTP to</div>
                  </Col>
                </Row>
                <Row className='mt-5'>
                  <Col className={variableEmailPhoneColor}>
                    <ClickAwayListener onClickAway={this.handleEmailPhoneClickAway}>
                      <FormControl>
                        {variableEmailPhone}
                        <InputLabel style={{ marginLeft: '50px' }} htmlFor='standard-name'>
                          Email ID
                        </InputLabel>
                        <Input
                          id='standard-name'
                          className='sigin-input'
                          value={emailPhoneValue}
                          autoComplete='off'
                          onChange={event => this.onEmailPhoneChange(event)}
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
                <Row className='fixed-margin-top'>
                  <Col className='center-col'>
                    {this.props.forgotPasswordLoading ? (
                      <CircularProgress name='circle' color='primary' />
                    ) : (
                      <Button className='pointer' variant='contained' color='primary' type='submit' fullWidth>
                        Verify
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
    );
  }
}

const mapStateToProps = state => ({
  forgotPasswordLoading: state.auth.forgotPasswordLoading,
  forgotPasswordError: state.auth.forgotPasswordError,
  forgotPasswordData: state.auth.forgotPasswordData,
  forgotPasswordMessage: state.auth.forgotPasswordMessage,
  forgotPasswordShow: state.auth.forgotPasswordShow
});

const mapDispatchToProps = dispatch => ({
  forgotPassword: (params, path) => dispatch(actions.forgotPassword(params, path)),
  forgotpasswordalertshowhidedanger: () => dispatch(actions.forgotpasswordalertshowhidedanger()),
  forgotpasswordalertshowhidedangerdismiss: path => dispatch(actions.forgotpasswordalertshowhidedangerdismiss(path))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ForgotPassword));
