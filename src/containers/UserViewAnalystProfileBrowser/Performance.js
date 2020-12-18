import React from 'react';
import { Image, Row, Col } from 'react-bootstrap';
import { Typography, Button } from '@material-ui/core';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

const Performance = props => {
  const [tabValue, setTabvalue] = React.useState('EQUITY');

  return (
    <>
      <Row
        style={{
          paddingBottom: '1rem',
          paddingLeft: '1rem'
        }}
      >
        <Button
          variant={tabValue === 'EQUITY' ? 'contained' : 'outlined'}
          color='primary'
          style={{ margin: '0.6rem', borderRadius: '2rem' }}
          onClick={() => setTabvalue('EQUITY')}
        >
          EQUITY
        </Button>
        <Button
          variant={tabValue === 'OPTIONS' ? 'contained' : 'outlined'}
          color='primary'
          style={{ margin: '0.6rem', borderRadius: '2rem' }}
          onClick={() => setTabvalue('OPTIONS')}
        >
          OPTIONS
        </Button>
        <Button
          variant={tabValue === 'FUTURES' ? 'contained' : 'outlined'}
          color='primary'
          style={{ margin: '0.6rem', borderRadius: '2rem' }}
          onClick={() => setTabvalue('FUTURES')}
        >
          FUTURES
        </Button>
        <Button
          variant={tabValue === 'INVESTMENT' ? 'contained' : 'outlined'}
          color='primary'
          style={{ margin: '0.6rem', borderRadius: '2rem' }}
          onClick={() => setTabvalue('INVESTMENT')}
        >
          INVESTMENT
        </Button>
      </Row>
      <div style={{ padding: '0 10px' }}>
        <div>
          <div style={{ borderBottom: '1px solid #707070', marginLeft: '10px' }}>
            <span
              style={{
                fontSize: '14px',
                color: '#000000',
                lineHeight: '2.4rem'
              }}
            >
              Last 30 days Stats
            </span>
          </div>

          <div style={{ margin: '15px 5px', backgroundColor: '#fff', padding: '5px' }}>
            <Row style={{ marginBottom: '0.5rem' }}>
              <FiberManualRecordIcon style={{ color: '#B1AEC1', marginRight: '1rem' }} />
              <Typography variant='subtitle1' style={{ color: '#212121', fontSize: '16px', paddingLeft: '1rem' }}>
                {'Trade Success'}
              </Typography>
            </Row>

            <Row>
              <FiberManualRecordIcon style={{ color: 'white', fontSize: '2rem' }} />
              <Row
                style={{
                  border: '1px solid #707070',
                  borderRadius: '3rem',
                  marginLeft: '1.5rem',
                  width: '50%',
                  padding: '1rem'
                }}
              >
                <div className='col-6' style={{ borderRight: '0.5px solid #707070' }}>
                  <Typography variant='subtitle2' style={{ fontWeight: '500', color: '#212121', fontSize: '16px', marginBottom: '0.5rem' }}>
                    {'PROFITABLE TRADES'}
                  </Typography>
                  <Typography variant='subtitle2' style={{ fontWeight: '500', fontSize: '20px' }}>
                    {tabValue &&
                    props.analystsForSubscriptionDetails &&
                    props.analystsForSubscriptionDetails.performance[tabValue] &&
                    Object.values(props.analystsForSubscriptionDetails.performance[tabValue]).length > 0
                      ? props.analystsForSubscriptionDetails.performance[tabValue].PROFITABLE_TRADES
                      : 0}
                  </Typography>
                </div>
                <div className='col-6' style={{ borderLeft: '0.5px solid #707070', paddingRight: '0px' }}>
                  <Typography variant='subtitle2' style={{ fontWeight: '500', color: '#212121', fontSize: '16px', marginBottom: '0.5rem' }}>
                    {'LOSS-MAKING TRADES'}
                  </Typography>
                  <Typography variant='subtitle2' style={{ fontWeight: '500', fontSize: '20px' }}>
                    {tabValue &&
                    props.analystsForSubscriptionDetails &&
                    props.analystsForSubscriptionDetails.performance[tabValue] &&
                    Object.values(props.analystsForSubscriptionDetails.performance[tabValue]).length > 0
                      ? props.analystsForSubscriptionDetails.performance[tabValue].LOSS_MAKING_TRADES
                      : 0}
                  </Typography>
                </div>
              </Row>
            </Row>
            <div style={{ display: 'grid', gridTemplateColumns: '50% 50%' }} className='mt-2'></div>
          </div>

          <div style={{ margin: '15px 5px', backgroundColor: '#fff', padding: '5px' }}>
            <Row style={{ marginBottom: '0.5rem' }}>
              <FiberManualRecordIcon style={{ color: '#B1AEC1', marginRight: '1rem' }} />
              <Typography variant='subtitle1' style={{ fontSize: '16px', color: '#212121' }}>
                {'Trade Analytics'}
              </Typography>
            </Row>

            <Row style={{}}>
              <div className='col-4' style={{ textAlign: 'right' }}>
                <div style={{ textSize: '16px', marginBottom: '8px' }}>
                  <br />{' '}
                </div>
                <Typography style={{ fontSize: '16px', padding: '0.7rem' }} variant='subtitle2' color='textSecondary'>
                  {'CAPITAL PER TRADE'}
                </Typography>
                <Typography style={{ fontSize: '16px', padding: '0.7rem' }} variant='subtitle2' color='textSecondary'>
                  {'RISK : REWARD'}
                </Typography>
                <Typography style={{ fontSize: '16px', padding: '0.7rem' }} variant='subtitle2' color='textSecondary'>
                  {'TRADE DURATION (DAYS)'}
                </Typography>
              </div>

              <div className='col-2' style={{ textAlign: 'center', padding: '0px' }}>
                <Typography variant='subtitle2' style={{ color: '#212121', marginBottom: '0.5rem' }}>
                  {'AVERAGE'}
                </Typography>
                <Typography
                  variant='subtitle2'
                  style={{  border: '1px solid #707070',
                  padding: '0.5rem', fontSize: '20px', borderRight: '0px' }}
                >
                  {tabValue &&
                  props.analystsForSubscriptionDetails &&
                  props.analystsForSubscriptionDetails.performance[tabValue] &&
                  Object.values(props.analystsForSubscriptionDetails.performance[tabValue]).length > 0
                    ? props.analystsForSubscriptionDetails.performance[tabValue].CAPITAL_PER_TRADE_AVERAGE
                    : 0}
                </Typography>
                <Typography
                  variant='subtitle2'
                  style={{
                    
                    border: '1px solid #707070',
                    padding: '0.5rem',
                    borderRight: '0px',
                    fontSize: '20px',
                    borderTop: '0px'
                  }}
                >
                  {tabValue &&
                  props.analystsForSubscriptionDetails &&
                  props.analystsForSubscriptionDetails.performance[tabValue] &&
                  Object.values(props.analystsForSubscriptionDetails.performance[tabValue]).length > 0
                    ? props.analystsForSubscriptionDetails.performance[tabValue].RISK_REWARD_AVERAGE
                    : 0}
                </Typography>
                <Typography
                  variant='subtitle2'
                  style={{
                    
                    border: '1px solid #707070',
                    padding: '0.5rem',
                    borderRight: '0px',
                    fontSize: '20px',
                    borderTop: '0px'
                  }}
                >
                  {tabValue &&
                  props.analystsForSubscriptionDetails &&
                  props.analystsForSubscriptionDetails.performance[tabValue] &&
                  Object.values(props.analystsForSubscriptionDetails.performance[tabValue]).length > 0
                    ? props.analystsForSubscriptionDetails.performance[tabValue].TRADE_DURATION_AVERAGE
                    : 0}
                </Typography>
              </div>

              <div className='col-2' style={{ textAlign: 'center', padding: '0px' }}>
                <Typography variant='subtitle2' style={{ color: '#212121', marginBottom: '0.5rem' }}>
                  {'MEDIAN'}
                </Typography>
                <Typography variant='subtitle2' style={{ fontSize: '20px',  border: '1px solid #707070', padding: '0.5rem' }}>
                  {tabValue &&
                  props.analystsForSubscriptionDetails &&
                  props.analystsForSubscriptionDetails.performance[tabValue] &&
                  Object.values(props.analystsForSubscriptionDetails.performance[tabValue]).length > 0
                    ? props.analystsForSubscriptionDetails.performance[tabValue].CAPITAL_PER_TRADE_MEDIAN
                    : 0}
                </Typography>
                <Typography
                  variant='subtitle2'
                  style={{ fontSize: '20px',  border: '1px solid #707070',
                  padding: '0.5rem', borderTop: '0px' }}
                >
                  {tabValue &&
                  props.analystsForSubscriptionDetails &&
                  props.analystsForSubscriptionDetails.performance[tabValue] &&
                  Object.values(props.analystsForSubscriptionDetails.performance[tabValue]).length > 0
                    ? props.analystsForSubscriptionDetails.performance[tabValue].RISK_REWARD_MEDIAN
                    : 0}
                </Typography>
                <Typography
                  variant='subtitle2'
                  style={{ fontSize: '20px',  border: '1px solid #707070',
                  padding: '0.5rem', borderTop: '0px' }}
                >
                  {tabValue &&
                  props.analystsForSubscriptionDetails &&
                  props.analystsForSubscriptionDetails.performance[tabValue] &&
                  Object.values(props.analystsForSubscriptionDetails.performance[tabValue]).length > 0
                    ? props.analystsForSubscriptionDetails.performance[tabValue].TRADE_DURATION_MEDIAN
                    : 0}
                </Typography>
              </div>
            </Row>
          </div>

          <div style={{ margin: '15px 5px', backgroundColor: '#fff', padding: '5px' }}>
            <Row style={{ marginBottom: '0.5rem' }}>
              <FiberManualRecordIcon style={{ color: '#B1AEC1', marginRight: '1rem' }} />
              <Typography variant='subtitle1' style={{ color: '#212121' }}>
                {'Portfolio Analytics'}
              </Typography>
            </Row>

            <Row>
              <div className='col-4' style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '14px', marginBottom: '8px' }}>
                  <br />{' '}
                </div>
                <Typography style={{ fontSize: '16px', padding: '0.7rem'  }} variant='subtitle2' color='textSecondary'>
                  {'30 DAYS'}
                </Typography>
                <Typography style={{ fontSize: '16px', padding: '0.7rem'  }} variant='subtitle2' color='textSecondary'>
                  {'LIFETIME'}
                </Typography>
              </div>

              <div className='col-2' style={{ textAlign: 'center', padding: '0px' }}>
                <Typography variant='subtitle2' style={{ color: '#212121', marginBottom: '0.5rem' }}>
                  {'MAX DRAWDOWN'}
                </Typography>
                <Typography
                  variant='subtitle2'
                  style={{
                    
                    marginLeft: '0.5rem',
                    border: '1px solid #707070',
                    padding: '0.5rem',
                    borderRight: '0px',
                    margin: '0px',
                    fontWeight: '500',
                    fontSize: '20px',
                  }}
                >
                  {tabValue &&
                  props.analystsForSubscriptionDetails &&
                  props.analystsForSubscriptionDetails.performance[tabValue] &&
                  Object.values(props.analystsForSubscriptionDetails.performance[tabValue]).length > 0
                    ? props.analystsForSubscriptionDetails.performance[tabValue].MAX_DRAWDOWN_LAST_MONTH
                    : 0}
                </Typography>
                <Typography
                  variant='subtitle2'
                  style={{
                    
                    marginLeft: '0.5rem',
                    border: '1px solid #707070',
                    padding: '0.5rem',
                    borderRight: '0px',
                    borderTop: '0px',
                    fontWeight: '500',
                    fontSize: '20px',
                    margin: '0px'
                  }}
                >
                  {tabValue &&
                  props.analystsForSubscriptionDetails &&
                  props.analystsForSubscriptionDetails.performance[tabValue] &&
                  Object.values(props.analystsForSubscriptionDetails.performance[tabValue]).length > 0
                    ? props.analystsForSubscriptionDetails.performance[tabValue].MAX_DRAWDOWN_LIFE_TIME
                    : 0}
                </Typography>
              </div>

              <div className='col-2' style={{ textAlign: 'center', padding: '0px' }}>
                <Typography variant='subtitle2' style={{ color: '#212121', marginBottom: '0.5rem' }}>
                  {'DAYS TO RECOVERY'}
                </Typography>
                <Typography
                  variant='subtitle2'
                  style={{  marginLeft: '0.5rem', border: '1px solid #707070', fontWeight: '500',
                  fontSize: '20px',
                  padding: '0.5rem', margin: '0px' }}
                >
                  {tabValue &&
                  props.analystsForSubscriptionDetails &&
                  props.analystsForSubscriptionDetails.performance[tabValue] &&
                  Object.values(props.analystsForSubscriptionDetails.performance[tabValue]).length > 0
                    ? props.analystsForSubscriptionDetails.performance[tabValue].DAYS_TO_RECOVERY_LAST_MONTH
                    : 0}
                </Typography>
                <Typography
                  variant='subtitle2'
                  style={{
                    
                    marginLeft: '0.5rem',
                    border: '1px solid #707070',
                    padding: '0.5rem',
                    borderTop: '0px',
                    margin: '0px', fontWeight: '500',
                    fontSize: '20px',
                  }}
                >
                  {tabValue &&
                  props.analystsForSubscriptionDetails &&
                  props.analystsForSubscriptionDetails.performance[tabValue] &&
                  Object.values(props.analystsForSubscriptionDetails.performance[tabValue]).length > 0
                    ? props.analystsForSubscriptionDetails.performance[tabValue].DAYS_TO_RECOVERY_LIFE_TIME
                    : 0}
                </Typography>
              </div>
            </Row>
          </div>
        </div>
      </div>
    </>
  );
};

export default Performance;
