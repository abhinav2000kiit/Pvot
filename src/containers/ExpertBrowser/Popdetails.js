import React from 'react';
import { Image, Row, Col } from 'react-bootstrap';
import { Button, Typography } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

import Followers from '../AnalystFollowersSubscribersList';

const Popdetails = props => {
  const handleLogoutSubmit = event => {
    event.preventDefault();
    props.logout('/welcome');
    // props.history.push('/signin');
  };

  console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@', props);

  return (
    <div style={{ borderRadius: '3rem' }}>
      <div>
        <div
          style={{
            backgroundColor: '#fff'
          }}
        >
          <Col>
            <Row style={{ padding: '1rem 1rem 0px 1rem' }}>
              <Typography variant='h6' style={{ display: 'block' }}>
                {props && props.analystDetails ? (
                  props.analystDetails.user.name
                ) : (
                  <span style={{ color: '#999' }}>Firstname LastName</span>
                )}
              </Typography>
            </Row>
            <Row style={{ borderBottom: '0.6px solid #B1AEC1', padding: '1rem', paddingTop: '0px' }}>
              <Typography>{props.signinData && props.signinData.user.UserAttributes[4].Value}</Typography>
            </Row>
            <Row
              style={{
                padding: '1rem 0rem 1rem 0rem'
              }}
            >
              <div
                className='col-6'
                onClick={
                  props.userGroup === 'ANALYST' ? () => props.history.push('/followers', { list: 'Followers' }) : null
                }
                style={{ textAlign: 'center', borderRight: '0.6px solid #B1AEC1' }}
              >
                <div style={{ color: '#565EBF', fontWeight: '900' }}>
                  {props.analystDetails ? props.analystDetails.followers_count : 0}
                </div>
                <div style={{ fontWeight: '500' }}>Followers</div>
              </div>
              <div
                className='col-6'
                onClick={
                  props.userGroup === 'ANALYST'
                    ? () => props.history.push('/subscribers', { list: 'Subscribers' })
                    : null
                }
                style={{ textAlign: 'center' }}
              >
                <div style={{ color: '#565EBF', fontWeight: '900' }}>
                  {props.analystDetails ? props.analystDetails.subscriber_count : 0}
                </div>
                <div style={{ fontWeight: '500' }}>Subscribers</div>
              </div>
            </Row>

            <Row style={{ padding: '1rem 1rem 0px 1rem', borderTop: '0.6px solid #B1AEC1' }}>
              <Link
                style={{ color: 'black', textDecoration: 'none', fontWeight: '500' }}
                to={{ pathname: '/profile', param: '1' }}
                onClick={props.handleClose}
              >
                My Profile
              </Link>
            </Row>
            <Row style={{ padding: '0.5rem 1rem 0px 1rem' }}>
              <Link
                style={{ color: 'black', textDecoration: 'none', fontWeight: '500' }}
                to={{ pathname: '/profile', param: '2' }}
                onClick={props.handleClose}
              >
                My Portfolio Allocation
              </Link>
            </Row>
            <Row style={{ padding: '0.5rem 1rem 0px 1rem' }}>
              <Link
                style={{ color: 'black', textDecoration: 'none', fontWeight: '500' }}
                to={{ pathname: '/profile', param: '3' }}
                onClick={props.handleClose}
              >
                My Plans
              </Link>
            </Row>
            <Row style={{ padding: '0.5rem 1rem 0px 1rem', color: 'black', textDecoration: 'none', fontWeight: '500' }}>
              <Link
                style={{ color: 'black', textDecoration: 'none', fontWeight: '500' }}
                to={{ pathname: '/expert-faqs' }}
                onClick={props.handleClose}
              >
                FAQs
              </Link>
            </Row>
            <Row style={{ padding: '0.5rem 1rem 0px 1rem', color: 'black', textDecoration: 'none', fontWeight: '500' }}>
              <Link
                style={{ color: 'black', textDecoration: 'none', fontWeight: '500' }}
                to={{ pathname: '/privacy-policy' }}
                onClick={props.handleClose}
              >
                Privacy Policy
              </Link>
            </Row>
            <Row style={{ padding: '0.5rem 1rem 0px 1rem', color: 'black', textDecoration: 'none', fontWeight: '500' }}>
              <Link
                style={{ color: 'black', textDecoration: 'none', fontWeight: '500' }}
                to={{ pathname: '/terms-of-use' }}
                onClick={props.handleClose}
              >
                Terms of Use
              </Link>
            </Row>
            <Row style={{ padding: '0.5rem 1rem 1rem 1rem' }}>
              <span
                style={{
                  color: 'black',
                  textDecoration: 'none',
                  fontWeight: '500',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}
                onClick={handleLogoutSubmit}
              >
                Logout
              </span>
            </Row>
          </Col>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Popdetails);
