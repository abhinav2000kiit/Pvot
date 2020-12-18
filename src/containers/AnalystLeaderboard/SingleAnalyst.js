import React from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import { Typography, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/index';
import { withRouter, Redirect } from 'react-router-dom';
import moment from 'moment-timezone';

const SingleAnalyst = props => {
  //   console.log(`props in Analyst Cards: `, props);

  const { data, tabValue } = props;

  return (
    // <div style={{ marginBottom: '1rem', borderBottom: '1px solid #ccc', borderRadius: '1rem' }}>
    <div
      style={{
        backgroundColor: '#fff',
        marginTop: '1rem',
        borderRadius: '1rem',
        border: '3px solid rgba(0, 0, 0, 0.1)',
        boxShadow: '0.5rem 0.5rem 0.5rem rgba(0, 0, 0, 0.15)',
        ...props.style
      }}
    >
      <Row style={{ display: 'grid', gridTemplateColumns: '25% 45% 30%', alignItems: 'center', paddingTop: '5px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Image
            src={
              data.analyst_info && data.analyst_info.profile_picture
                ? data.analyst_info.profile_picture
                : require('../../assets/images/jpeg/placeholder.jpg')
            }
            roundedCircle
            style={{ height: '50px', width: '50px' }}
            // onClick={event => {
            //   event.stopPropagation();
            //   props.history.push({
            //     pathname: '/user/view-analyst-profile',
            //     state: {
            //       data,
            //       segment: 'EQUITY'
            //     }
            //   });
            // }}
          />
        </div>
        <div>
          <div>
            <Typography
              variant='button'
              style={{ fontSize: '0.875rem' }}
              // onClick={event => {
              //   event.stopPropagation();
              //   props.history.push({
              //     pathname: '/user/view-analyst-profile',
              //     state: {
              //       data,
              //       segment: 'EQUITY'
              //     }
              //   });
              // }}
            >
              {data.analyst_info.user.name}
            </Typography>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {data.analyst_info.sebi_registered === true ? (
              <span style={{ color: '#bdbdbd', fontSize: '12px' }}>
                <Image
                  src={require('../../assets/images/SEBI_logo.png')}
                  style={{ height: '15px', borderRadius: '50%' }}
                />
                &nbsp;| &nbsp;
              </span>
            ) : data.analyst_info.nism_registered ? (
              <span style={{ color: '#bdbdbd', fontSize: '12px' }}>
                <Image
                  src={require('../../assets/images/NISM-logo.png')}
                  style={{ height: '15px', borderRadius: '50%' }}
                />
                &nbsp;| &nbsp;
              </span>
            ) : null}
            <Typography variant='body2' display='block' style={{ fontSize: '0.6rem', textTransform: 'none' }}>
              {data.segment.name}
            </Typography>
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              fontSize: '18px',
              fontWeight: '600',
              color: data.percentage_returns > 0 ? '#00e676' : '#ff1744',
              display: 'flex',
              margin: '0px auto',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            {data.percentage_returns.toFixed(1)}%
          </div>
          <div style={{ fontSize: '12px', color: '#616161' }}>Absolute Returns</div>
        </div>
      </Row>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '95%', borderBottom: '1px solid #eeeeee', marginTop: '5px', marginBottom: '5px' }} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '34% 33% 33%', borderRadius: '1rem' }}>
        <div style={{ textAlign: 'center', padding: '5px', borderRight: '1px solid rgb(238, 238, 238)' }}>
          <p style={{ color: '#616161', fontSize: '12px', marginBottom: '3px' }}>Min. Capital</p>
          <p style={{ color: '#212121', fontSize: '14px', marginBottom: '3px', fontWeight: '600' }}>
            {/* ₹{data.capital_required.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')} */}₹
            {data.capital_required.toLocaleString()}
          </p>
          {/* <p>asdas</p> */}
        </div>
        <div
          style={{
            textAlign: 'center',
            padding: '5px',
            borderRight: '1px solid rgb(238, 238, 238)',
            paddingRight: '5px'
          }}
        >
          <p style={{ color: '#616161', fontSize: '12px', marginBottom: '3px' }}>Max Drawdown</p>
          <p style={{ color: '#ff1744', fontSize: '14px', marginBottom: '3px', fontWeight: '600' }}>
            {data.max_draw_down.toFixed(1)}%
          </p>
        </div>
        <div
          style={{
            textAlign: 'center',
            padding: '5px',
            paddingRight: '5px'
          }}
        >
          <p style={{ color: '#616161', fontSize: '12px', marginBottom: '3px' }}>Capital/Trade</p>
          <p style={{ color: '#212121', fontSize: '14px', marginBottom: '3px', fontWeight: '600' }}>
            {/* ₹ {(~~data.capital_trade).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')} */}₹{' '}
            {data.capital_trade.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  signinData: state.auth.signinData
});

export default connect(mapStateToProps)(withRouter(SingleAnalyst));
