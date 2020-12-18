import React from 'react';
import { Image, Row, Col } from 'react-bootstrap';
import { Button } from '@material-ui/core';
import Loading from '../Loading/Loading';
import TradeItemBrowser from '../components/VirtualTradeItemBrowser';

const RecentTrades = props => {
  const [tabValue, setTabvalue] = React.useState('EQUITY');

  console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@', props);

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
      <div>
        <div className='row row-cols-3'>
          {props.recentlyClosedTradeList ? (
            props.recentlyClosedTradeList.length > 0 ? (
              props.recentlyClosedTradeList.filter(item => item.segment.name === tabValue).length > 0 ? (
                props.recentlyClosedTradeList
                  .filter(item => item.segment.name === tabValue)
                  .map((v, idx) => (
                    <div className='col mb-4' key={idx}>
                      <TradeItemBrowser
                        profile='user'
                        user={props && props.data && props.data.analyst_info.user}
                        id={`trade${idx}`}
                        data={v}
                      />
                    </div>
                  ))
              ) : (
                <Row>
                  <Col>
                    <Image
                      src={require('../../assets/images/svg/Investor_No_Activity.svg')}
                      className='user-on-board-image'
                    />
                  </Col>
                </Row>
              )
            ) : (
              <Row>
                <Col>
                  <Image
                    src={require('../../assets/images/svg/Investor_No_Activity.svg')}
                    className='user-on-board-image'
                  />
                </Col>
              </Row>
            )
          ) : (
            <Loading height='40vh' />
          )}
        </div>
      </div>
    </>
  );
};

export default RecentTrades;
