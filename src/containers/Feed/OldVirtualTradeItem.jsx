import React from 'react';
import { Row, Image } from 'react-bootstrap';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/index';
import { Link } from 'react-router-dom';
import './feed.scss';

const useStyles = makeStyles(theme => ({
  typography: {
    padding: 10
  }
}));

const VirtualTradeItemFeed = props => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const { data } = props;
  //console.log('data',data)
  // console.log(data.stop_loss_hit, data.target_hit);
  return (
    <>
      {/* style={{ width: '100%', border: '1px solid #eeeeee', padding: '15px 15px 0px', marginBottom: '10px' }} */}
      <div className='card'>
        <Row style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div className='col-8 p-0 pr-2 m-0 mr-3'>
            <p style={{ color: '#212121', fontSize: '16px', padding: '2px', marginBottom: '0px' }}>
              <strong>{data.instrument && data.instrument.trading_symbol}</strong>
              {/* <span
                style={{
                  height: '13px',
                  width: '13px',
                  backgroundColor: data.trade_type === 'Intraday' ? '#00e5ff' : '#212121',
                  borderRadius: '50%',
                  display: 'inline-block',
                  marginTop: '5px'
                }}
              /> */}
              &nbsp;
              {/* <span
                style={{
                  height: '13px',
                  width: '13px',
                  backgroundColor:
                    data.segment.name === 'OPTIONS'
                      ? '#f7c244'
                      : data.segment.name === 'EQUITY' && data.sub_segment === 'CASH'
                      ? '#69e182'
                      : data.segment.name === 'FUTURES'
                      ? '#e25241'
                      : data.segment.name === 'EQUITY' && data.sub_segment === 'INVESTMENT'
                      ? '#212121'
                      : '',
                  borderRadius: '50%',
                  display: 'inline-block',
                  marginTop: '5px'
                }}
              /> */}
            </p>
            <p style={{ color: '#616161', fontSize: '12px', padding: '2px', marginBottom: '0px' }}>
              {/* {data.instrument && data.instrument.exchange}&nbsp;
              {moment(data.order_placement_time).format('DD MMMM/YY')} */}
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
              {/* <Link to='/user/view-analyst-profile'> */}
              {data.analyst.name}
              {/* </Link> */}
              &nbsp;&nbsp;
              {/* <ChatBubbleOutlineIcon style={{ fontSize: '10px' }} /> */}
            </p>
          </div>
          <div>
            {data.status === 'OPEN' && (
              <p
                style={{
                  color: '#808080',
                  padding: '5px',
                  backgroundColor: '#DCDCDC',
                  borderRadius: '3px',
                  fontSize: '12px',
                  textAlign: 'center',
                  marginBottom: '3px'
                }}
              >
                {data.status}
              </p>
            )}
            {data.status === 'CLOSED' && (
              <p
                style={{
                  color: '#F44336',
                  padding: '5px',
                  backgroundColor: '#FED7D4',
                  borderRadius: '3px',
                  fontSize: '12px',
                  textAlign: 'center',
                  marginBottom: '3px'
                }}
              >
                {data.status}
              </p>
            )}

            {data.status === 'EXPIRED' && (
              <p
                style={{
                  color: '#F44336',
                  padding: '5px',
                  backgroundColor: '#FED7D4',
                  borderRadius: '3px',
                  fontSize: '12px',
                  textAlign: 'center',
                  marginBottom: '3px'
                }}
              >
                {data.status}
              </p>
            )}

            {data.status === 'CANCELLED' && (
              <p
                style={{
                  color: '#F44336',
                  padding: '5px',
                  backgroundColor: '#FED7D4',
                  borderRadius: '3px',
                  fontSize: '12px',
                  textAlign: 'center',
                  marginBottom: '3px'
                }}
              >
                {data.status}
              </p>
            )}
            {data.status === 'EXECUTED' && data.gains >= 0 && (
              <p
                style={{
                  color: '#00e676',
                  padding: '5px',
                  backgroundColor: '#C0FEE0',
                  borderRadius: '3px',
                  fontSize: '12px',
                  textAlign: 'center',
                  marginBottom: '3px'
                }}
              >
                Profit&nbsp;
                <ArrowUpwardIcon style={{ fontSize: '10px' }} />
              </p>
            )}
            {data.status === 'EXECUTED' && data.gains < 0 && (
              <p
                style={{
                  color: '#F44336',
                  padding: '5px',
                  backgroundColor: '#FED7D4',
                  borderRadius: '3px',
                  fontSize: '12px',
                  textAlign: 'center',
                  marginBottom: '3px'
                }}
              >
                Loss&nbsp;
                <ArrowDownwardIcon style={{ fontSize: '10px' }} />
              </p>
            )}

            {data.stop_loss_hit ||
            data.target_hit === true ||
            data.status === 'CANCELLED' ||
            data.status === 'CLOSE' ? (
              <p style={{ color: '#212121', fontSize: '12px' }}>
                <LockIcon style={{ fontSize: '10px', color: '#F44336' }} />
                {moment(data.order_placement_time).format('DD/MM/YYYY')}
              </p>
            ) : (
              <p style={{ color: '#212121', fontSize: '12px' }}>
                <LockOpenIcon style={{ fontSize: '10px', color: 'orange' }} />
                {moment(data.order_placement_time).format('DD/MM/YYYY')}
              </p>
            )}
          </div>
        </Row>
        <Row style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
          <div>
            <p style={{ color: '#9e9e9e', padding: '2px', marginBottom: '0px', fontSize: '12px' }}>Order Price</p>
            <p style={{ color: '#212121', padding: '2px', marginBottom: '0px', fontSize: '12px' }}>{data.price}</p>
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
            <p style={{ color: '#212121', padding: '2px', marginBottom: '0px', fontSize: '12px' }}>{data.stop_loss}</p>
          </div>
          <div>
            <div>
              <p
                style={{ color: '#9e9e9e', padding: '2px', marginBottom: '0px', fontSize: '12px', textAlign: 'center' }}
              >
                {data.gains >= 0 ? <>Gain</> : <>Loss </>}
              </p>
              <p
                style={{
                  color: data.gains >= 0 ? '#00e676' : '#F44336',
                  padding: '5px',
                  padding: '2px',
                  marginBottom: '0px',
                  backgroundColor: data.gains >= 0 ? '#C0FEE0' : '#FED7D4',
                  borderRadius: '3px',
                  fontSize: '12px'
                }}
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
                  Math.abs(data.target - data.price) === Math.abs(data.stop_loss - data.price)
                    ? '#f0880a'
                    : Math.abs(data.target - data.price) > Math.abs(data.stop_loss - data.price)
                    ? '#038C33'
                    : Math.abs(data.target - data.price) < Math.abs(data.stop_loss - data.price)
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
              {// Risk = Math.abs(data.stop_loss - data.price)
              // Reward = Math.abs(data.target - data.price)
              // we are converting it into => Risk: Reward = 1: x
              `1 : ${(Math.abs(data.target - data.price) / Math.abs(data.stop_loss - data.price)).toFixed(2)}`}
            </p>
          </div>
        </Row>
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
