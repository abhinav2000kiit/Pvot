import React from 'react';
import './Payment.scss';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import KeyboardBack from '@material-ui/icons/KeyboardBackspaceSharp';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Row, Col, Image } from 'react-bootstrap';
import { Button } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import Header from '../components/Header/customHeader';
import moment from 'moment';
var qs = require('qs');

function ElevationScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func
};

class PaymentSuccess extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: JSON.parse(qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).data)
    };
  }
  render() {
    console.log(this.state.data);
    return (
      <>
        <>
          <CssBaseline />
          <ElevationScroll>
            <AppBar style={{ backgroundColor: '#fff', color: '#2962ff' }}>
              <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
                <IconButton
                  color='black'
                  onClick={() => {
                    this.props.history.push('/user/user-home');
                  }}
                >
                  <KeyboardBack />
                </IconButton>
                <Typography variant='h6' style={{ fontSize: '16px' }}>
                  Payment Confirmed
                </Typography>
                <div></div>
              </Toolbar>
            </AppBar>
          </ElevationScroll>
          <Toolbar />
        </>
        <Row className='parent'>
          <Col className='center-col-around'>
            <Row className='variable-margin-top-minor'>
              <Col className='right-col'>
                <Image src={require('../../assets/images/svg/grid_pvot.svg')} />
              </Col>
            </Row>
            <Row className='variable-margin-top-minor'>
              <Col className='center-col'>
                <Image src={require('../../assets/icons/svg/success.svg')} className='green-tick' />
              </Col>
            </Row>
            <Row className='variable-margin-top-minor'>
              <Col className='center-col'>
                <div className='signin-sub-heading'>
                Transaction success! Your payment of Rs.{this.state.data && this.state.data.amount} was successful. You can view {this.state.data && this.state.data.analyst && this.state.data.analyst.name}’s trades till {this.state.data && moment(this.state.data.subscription_end_date.split(" ")[0]).format('DD/MM/YYYY')}.
                </div>
              </Col>
            </Row>
            <Row className='variable-margin-top-minor variable-margin-bottom-minor'>
              <Col className='left-col'>
                <Image src={require('../../assets/images/svg/grid_pvot.svg')} />
              </Col>
            </Row>
          </Col>
        </Row>
      </>
    );
  }
}

export default withRouter(PaymentSuccess);
