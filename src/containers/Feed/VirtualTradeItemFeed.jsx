import React from 'react';
import { Row, Image } from 'react-bootstrap';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/index';
import { Link } from 'react-router-dom';
import './feed.scss';

import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import KiteButton from './kiteButton';

const VirtualTradeItemFeed = props => {
  const { data } = props;
  console.log('data', data);
  return (
    <>
      {/* style={{ width: '100%', border: '1px solid #eeeeee', padding: '15px 15px 0px', marginBottom: '10px' }} */}
      <div className='card'>
        <Row style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div className='col-9 p-0 pr-2 m-0 mr-auto'>
            <p style={{ color: '#212121', fontSize: '16px', padding: '2px', marginBottom: '0px' }}>
              <strong>{data.instrument && data.instrument.trading_symbol}</strong>
              &nbsp;
            </p>
            <p style={{ color: '#616161', fontSize: '12px', padding: '2px', marginBottom: '0px' }}>
              {data.segment.name && data.segment.name.toUpperCase()}
              {' | '}
              {data.trade_type && data.trade_type.toUpperCase()}
              {' | '}
              {data.order_type && data.order_type.toUpperCase()}
              {' | '}
              {data.complexity && data.complexity.toUpperCase()}
            </p>
            <p
              style={{
                color: '#2962ff',
                fontSize: '10px',
                fontStyle: 'italic',
                padding: '0px',
                marginBottom: '3px',
                cursor: 'pointer'
              }}
            >
              <Image src={data.analyst.profile_picture} roundedCircle style={{ height: '13px', width: '13px' }} />
              &nbsp;
              <Link to={{ pathname: '/user/view-analyst-profile', state: { user_id: data.analyst.user_id } }}>
                {data.analyst.name}
              </Link>
              &nbsp;&nbsp;
              {/* <ChatBubbleOutlineIcon style={{ fontSize: '10px' }} /> */}
            </p>
          </div>
          <div className='col-3 m-0 p-0'>
            {data.status === 'OPEN' && (
              <div
                className='row'
                style={{
                  color: '#101010',
                  padding: '5px',
                  backgroundColor: '#54E2B1',
                  borderRadius: '3px',
                  fontSize: '12px',
                  textAlign: 'center',
                  marginBottom: '3px'
                }}
              >
                <p className='mb-0 mx-auto'>
                  <LockOpenIcon style={{ fontSize: '10px' }} className='mb-1' /> {data.status}
                </p>
              </div>
            )}
            {data.status === 'CLOSED' && (
              <div
                className='row'
                style={{
                  color: '#101010',
                  padding: '5px',
                  backgroundColor: '#B1AEC1',
                  borderRadius: '3px',
                  fontSize: '12px',
                  textAlign: 'center',
                  marginBottom: '3px'
                }}
              >
                <p className='mb-0 mx-auto'>
                  <LockIcon style={{ fontSize: '10px' }} className='mb-1' /> {data.status}
                </p>
              </div>
            )}

            {data.status === 'EXPIRED' && (
              <div
                className='row'
                style={{
                  color: '#101010',
                  padding: '5px',
                  backgroundColor: '#B1AEC1',
                  borderRadius: '3px',
                  fontSize: '12px',
                  textAlign: 'center',
                  marginBottom: '3px'
                }}
              >
                <p className='mb-0 mx-auto'>
                  <QueryBuilderIcon style={{ fontSize: '10px' }} className='mb-1' /> {data.status}
                </p>
              </div>
            )}

            {data.status === 'CANCELLED' && (
              <div
                className='row'
                style={{
                  color: '#101010',
                  padding: '5px',
                  backgroundColor: '#B1AEC1',
                  borderRadius: '3px',
                  fontSize: '10px',
                  textAlign: 'center',
                  marginBottom: '3px'
                }}
              >
                <p className='mb-0 mx-auto'>
                  <CancelIcon style={{ fontSize: '10px' }} className='mb-1' /> {data.status}
                </p>
              </div>
            )}

            {data.status === 'EXECUTED' && (
              <div
                className='row'
                style={{
                  color: '#101010',
                  padding: '5px',
                  backgroundColor: '#FFCF55',
                  borderRadius: '3px',
                  fontSize: '12px',
                  textAlign: 'center',
                  marginBottom: '3px'
                }}
              >
                <p className='mb-0 mx-auto'>
                  <CheckCircleOutlineIcon style={{ fontSize: '10px' }} className='mb-1' /> ACTIVE
                  {/* <ArrowUpwardIcon style={{ fontSize: '10px' }} /> */}
                </p>
              </div>
            )}

            <div className='text-center'>
              <p style={{ color: '#212121', fontSize: '12px' }}>
                {moment(data.order_placement_time).format('DD/MM' + ' ' + 'HH:mm')}
              </p>
            </div>
          </div>
        </Row>

        {data.segment && data.segment.name === 'INVESTMENT' ? (
          // Values Section in Investment Section
          <Row style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
            <div>
              <p style={{ color: '#9e9e9e', padding: '2px', marginBottom: '0px', fontSize: '12px' }}>
                Order/Exec. Price
              </p>
              <p style={{ color: '#212121', padding: '2px', marginBottom: '0px', fontSize: '12px' }}>
                {data.price}/{data.executed_price}
              </p>
            </div>
            <div>
              <p style={{ color: '#9e9e9e', padding: '2px', marginBottom: '0px', fontSize: '12px' }}>Quantity</p>
              <p style={{ color: '#212121', padding: '2px', marginBottom: '0px', fontSize: '12px' }}>{data.quantity}</p>
            </div>
            <div>
              <p style={{ color: '#9e9e9e', padding: '2px', marginBottom: '0px', fontSize: '12px' }}>Target Price</p>
              <p style={{ color: '#212121', padding: '2px', marginBottom: '0px', fontSize: '12px' }}>{data.target}</p>
            </div>
            <div>
              <p
                style={{
                  color: '#9e9e9e',
                  padding: '2px',
                  marginBottom: '0px',
                  fontSize: '12px'
                }}
              >
                {data.gains >= 0 ? <>Gain</> : <>Loss </>}
              </p>
              <p
                style={{
                  color: data.gains >= 0 ? '#038C33' : '#F44336',
                  padding: '5px',
                  padding: '2px',
                  marginBottom: '0px',
                  // backgroundColor: data.gains >=0 ? '#C0FEE0': '#FED7D4',
                  borderRadius: '3px',
                  fontSize: '12px'
                }}
                className='text-center'
              >
                {Number(data.gains).toFixed(2)}({Number(data.gains_percentage).toFixed(2) + '%'})
              </p>
            </div>
          </Row>
        ) : (
          // Values Section in all trade expcept Investment
          <Row style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
            <div>
              <p style={{ color: '#9e9e9e', padding: '2px', marginBottom: '0px', fontSize: '12px' }}>
                Order/Exec. Price
              </p>
              <p style={{ color: '#212121', padding: '2px', marginBottom: '0px', fontSize: '12px' }}>
                {data.price}/{data.executed_price}
              </p>
              <p style={{ color: '#9e9e9e', padding: '10px 2px 2px', marginBottom: '0px', fontSize: '12px' }}>
                Target Price
              </p>
              <p style={{ color: '#212121', padding: '2px', marginBottom: '0px', fontSize: '12px' }}>{data.target}</p>
            </div>
            <div>
              <p style={{ color: '#9e9e9e', padding: '2px', marginBottom: '0px', fontSize: '12px' }}>Quantity</p>
              <p style={{ color: '#212121', padding: '2px', marginBottom: '0px', fontSize: '12px' }}>{data.quantity}</p>
              <p style={{ color: '#9e9e9e', padding: '10px 2px 2px', marginBottom: '0px', fontSize: '12px' }}>
                Stop Loss
              </p>
              <p style={{ color: '#212121', padding: '2px', marginBottom: '0px', fontSize: '12px' }}>
                {data.stop_loss}
              </p>
            </div>
            <div>
              <div>
                <p
                  style={{
                    color: '#9e9e9e',
                    padding: '2px',
                    marginBottom: '0px',
                    fontSize: '12px',
                    textAlign: 'center'
                  }}
                >
                  {data.gains >= 0 ? <>Gain</> : <>Loss </>}
                </p>
                <p
                  style={{
                    color: data.gains >= 0 ? '#038C33' : '#F44336',
                    padding: '5px',
                    padding: '2px',
                    marginBottom: '0px',
                    // backgroundColor: data.gains >=0 ? '#C0FEE0': '#FED7D4',
                    borderRadius: '3px',
                    fontSize: '12px'
                  }}
                  className='text-center'
                >
                  {Number(data.gains).toFixed(2)}({Number(data.gains_percentage).toFixed(2) + '%'})
                </p>
              </div>
              <p
                style={{
                  color: '#9e9e9e',
                  padding: '10px 2px 2px',
                  marginBottom: '0px',
                  fontSize: '12px',
                  textAlign: 'center'
                }}
              >
                <>Risk : Reward</>
              </p>
              <p
                style={{
                  color:
                    data.reward === data.risk
                      ? '#f0880a'
                      : data.reward > data.risk
                      ? '#038C33'
                      : data.reward < data.risk
                      ? '#F44336'
                      : '#9e9e9e',
                  padding: '5px',
                  padding: '2px',
                  marginBottom: '0px',
                  borderRadius: '3px',
                  fontSize: '12px'
                }}
                className='text-center'
              >
                {/* {// Risk = Math.abs(data.stop_loss - data.price)
                // Reward = Math.abs(data.target - data.price)
                // we are converting it into => Risk: Reward = 1: x
                `1 : ${(Math.abs(data.target - data.price) / Math.abs(data.stop_loss - data.price)).toFixed(2)}`} */}
                {`1: ${(data.reward / data.risk).toFixed(2)}`}
              </p>
            </div>
          </Row>
        )}
        <div style={{ padding: '5px 0' }}></div>

        {props.kiteButton ? (
          <div>
            {data.allow_entry &&
            data.instrument &&
            data.order_type &&
            data.quantity &&
            data.price &&
            data.stop_loss &&
            data.target ? (
              <KiteButton
                data={data}
                instrument={data.instrument}
                order_type={data.order_type}
                quantity={data.quantity}
                price={data.price}
                stop_loss={data.stop_loss}
                target={data.target}
              />
            ) : null}
          </div>
        ) : null}
      </div>
    </>
  );
};

const mapStateToProps = state => ({
  signinData: state.auth.signinData,
  message: state.auth.message
});

const mapDispatchToProps = dispatch => ({
  changeHomeState: params => dispatch(actions.changeHomeState(params)),
  setTradeItem: params => dispatch(actions.setTradeItem(params))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(VirtualTradeItemFeed));
