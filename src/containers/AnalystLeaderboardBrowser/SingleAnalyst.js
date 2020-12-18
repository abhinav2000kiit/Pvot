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
        borderRadius: '3rem',
        border: '1px solid rgba(0, 0, 0, 0.1)',
        boxShadow: '0.5rem 0.5rem 0.5rem rgba(0, 0, 0, 0.15)'
      }}
    >
      <Row style={{ alignItems: 'center' }}>
        <div className='col-1' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px', marginBottom: '20px', paddingLeft: '2.5rem' }}>
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
        <div className='col-3' style={{ marginTop: '20px', marginBottom: '20px' }}>
          <div>
            <Typography
              variant='button'
              style={{ fontSize: '1.2rem' }}
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
        <div className='col-2' style={{ borderLeft: '0.6px solid #565EBF', borderRight: '0.6px solid #565EBF', marginTop: '20px', marginBottom: '20px', textAlign: 'center' }}>
          <div
            style={{
              fontSize: '16px',
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
          <div style={{ fontSize: '12px', color: '#2B2B2B' }}>Absolute Returns</div>
        </div>
      
        <div className= "col-6" style={{paddingLeft:'0px'}}>
          <Row>
            <div className='col-7' style={{borderRight: '0.6px solid #565EBF', padding:'0px'}}>
              <Row>
                <div className='col' style={{ textAlign: 'center', padding: '0px' }}>
                  <div style={{ color: '#2B2B2B', fontSize: '14px', marginBottom: '3px', fontWeight: '600' }}>
                    {/* ₹{data.capital_required.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')} */}₹
                    {data.capital_required.toLocaleString()}
                  </div>
                  <div style={{ color: '#2B2B2B', fontSize: '12px', marginBottom: '3px' }}>Min. Capital</div>

                  {/* <p>asdas</div> */}
                </div>
                <div className='col'
                  style={{
                    textAlign: 'center',
                    padding: '0px',
                  }}
                >
                  <div style={{ color: '#2B2B2B', fontSize: '14px', marginBottom: '3px', fontWeight: '600' }}>
                    {data.max_draw_down.toFixed(1)}%
                  </div>
                  <div style={{ color: '#2B2B2B', fontSize: '12px', marginBottom: '3px' }}>Max Drawdown</div>
                </div>
                <div className='col'
                  style={{
                    textAlign: 'center',
                    padding: '0px',
                  }}
                >
                  <div style={{ color: '#2B2B2B', fontSize: '14px', marginBottom: '3px', fontWeight: '600' }}>
                    {/* ₹ {(~~data.capital_trade).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')} */}₹{' '}
                    {data.capital_trade.toLocaleString()}
                  </div>
                  <div style={{ color: '#2B2B2B', fontSize: '12px', marginBottom: '3px' }}>Capital/Trade</div>
                </div>
              </Row>
            </div>
            <div className='col-5' style={{padding: '0px'}}>
              <Row>
                <div className='col-6' style={{fontSize: '14px', fontWeight: '500'}}>{data.total_trade}{" "}Trades</div>
                <div className='col-6' style={{fontSize: '12px', textAlign: 'right'}}><i>Since{" "}{moment(data.analyst_info.created_date).format('MM/YYYY')}</i></div>
              </Row>
              <Row style={{paddingTop: '0.4rem'}}>
                <div className='col-6' style={{fontSize: '14px', fontWeight: '500', paddingRight: '0px'}}>{data.followers_count}{" "}Followers</div>
                <div className='col-6' style={{fontSize: '14px', fontWeight: '500', paddingRight: '0px'}}>{data.subscriber_count}{" "}Subscribers</div>
              </Row>
            </div>
          </Row>
        </div>
      </Row>
    </div>
  );
};

const mapStateToProps = state => ({
  signinData: state.auth.signinData,
  tradecount: state.analyst.tradeCounts.total_trades
});

export default connect(mapStateToProps)(withRouter(SingleAnalyst));
