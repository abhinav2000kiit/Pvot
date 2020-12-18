import React from 'react';
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom';
import OTP from './OTP';
import UserAuth from './UserAuth';
import moduleName from '../UserAnalyst/UserAnalyst';
import UserAnalyst from '../UserAnalyst/UserAnalyst';
import { Row, Col, Carousel, Image, Button, Card } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { TiArrowRight } from 'react-icons/ti';
import Grow from '@material-ui/core/Grow';
import Slide from '@material-ui/core/Slide';

const Welcome = props => {
  //   const handleAnalystLogin = () => {
  //     props.updateGroup('ANALYST');
  //     props.history.push('/board-analyst-one');
  //   };

  React.useEffect(() => {
    props.updateGroup('ANALYST');
  }, []);
  console.log('@@@@@@@@@@@@@@@@@@@@@', props);

  return (
    <div className='mx-auto' style={{ width: '72rem' }}>
      <div className='mx-auto' style={{ width: 'fit-content' }}>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.5rem', fontWeight: '600' }}>
          Join the league of trusted and skilled stock experts
        </div>
        <div
          style={{
            fontFamily: "'Open Sans', Sans",
            fontSize: '1.5rem',
            fontWeight: '400',
            width: 'fit-content',
            margin: '0 auto'
          }}
        >
          Start trading and investing on our platform to grow your business for free
        </div>
      </div>
      <div style={{ width: '62rem', margin: '0 auto' }}>
        <div className='row'>
          <div className='col-6'>
            <div className='justify-content-center' style={{ padding: '2rem' }}>
              <div className='' style={{ width: '100%' }}>
                <img src={require('../../assets/images/svg/investor-marketplace-ss.svg')} />
              </div>
            </div>
          </div>
          <div className='col-6'>
            <div style={{ paddingTop: '3rem' }}>
              {props.switchToOtp ? <OTP boxwidth={'4rem'} userAuthData={props.userAuthData} /> : <UserAuth />}
              {/* <OTP boxwidth={'4rem'} userAuthData={props.userAuthData} /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  userAuthData: state.auth.userAuthData,
  userGroup: state.auth.userGroup,
  switchToOtp: state.auth.switchToOtp
});

const mapDispatchToProps = dispatch => ({
  updateGroup: group => dispatch({ type: 'SET_GROUP', payload: group })
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Welcome));
