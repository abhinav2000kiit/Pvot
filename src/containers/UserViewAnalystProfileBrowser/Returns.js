import React from 'react';
import { Image, Row, Col } from 'react-bootstrap';
import { Button } from '@material-ui/core';
import ApexColumn from '../Graphs/ApexColumn';

const Returns = props => {
  const [tabValue, setTabvalue] = React.useState('EQUITY');

  return (
    <>
      <Row
        style={{
          paddingBottom: '1rem',
          marginBottom: '1rem',
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
      <div style={{ padding: '0 10px', marginBottom: '40px' }}>
        {props && tabValue && props.analystsForSubscriptionDetails ? (
          props.analystsForSubscriptionDetails.monthly_returns[tabValue] ? (
            <ApexColumn
              style={{ width: '220%' }}
              data={props.analystsForSubscriptionDetails.monthly_returns[tabValue]}
            />
          ) : null
        ) : null}
      </div>
    </>
  );
};

export default Returns;
