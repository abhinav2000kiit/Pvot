import React from 'react';
import { withRouter } from 'react-router-dom';
import { Row, Image } from 'react-bootstrap';
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  typography: {
    padding: 10
  }
}));

const VirtualTradeItem = props => {
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

  return (
    <>
      <div
        className='bg-white'
        style={{ width: '100%', border: '1px solid #eeeeee', padding: '15px 15px 0px', marginBottom: '10px' }}
      >
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}
        >
          <Row>
            <Typography className={classes.typography}>Are you sure you want to delete the trade?</Typography>
          </Row>
          <Row style={{ padding: '10px', justifyContent: 'flex-end', margin: '0px' }}>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleClose} style={{ color: 'red' }}>
              Delete
            </Button>
          </Row>
        </Popover>
        <Row style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <p style={{ color: '#212121', fontSize: '16px', padding: '2px', marginBottom: '0px' }}>
              <strong>{data.scrip_name}&nbsp;</strong>
              <span
                style={{
                  height: '13px',
                  width: '13px',
                  backgroundColor:
                    data.type === 'OPTIONS'
                      ? '#f7c244'
                      : data.type === 'CASH'
                      ? '#69e182'
                      : data.type === 'FUTURE'
                      ? '#e25241'
                      : data.type === 'INVESTMENT'
                      ? '#212121'
                      : '',
                  borderRadius: '50%',
                  display: 'inline-block',
                  marginTop: '5px'
                }}
              />
            </p>
            <p style={{ color: '#616161', fontSize: '14px', padding: '2px', marginBottom: '0px' }}>SBIN 29 June/11</p>
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
              <Image
                src={require('../../../assets/images/jpeg/ayush.jpeg')}
                roundedCircle
                style={{ height: '13px', width: '13px' }}
              />
              &nbsp;<Link to='/user/view-analyst-profile'>{data.analyst}</Link>&nbsp;&nbsp;
              <ChatBubbleOutlineIcon onClick={() => props.history.push('/chat/124')} style={{ fontSize: '10px' }} />
            </p>
          </div>
          <div>
            {data.status === 'profit' ? (
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
            ) : (
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
            {data.lock === true ? (
              <p style={{ color: '#212121', fontSize: '12px' }}>
                <LockIcon style={{ fontSize: '10px', color: 'red' }} />
                {data.post_date}
              </p>
            ) : (
              <p style={{ color: '#212121', fontSize: '12px' }}>
                <LockOpenIcon style={{ fontSize: '10px', color: 'orange' }} />
                {data.post_date}
              </p>
            )}
          </div>
        </Row>
        <Row style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', marginBottom: '10px' }}>
          <div>
            <p style={{ color: '#9e9e9e', padding: '2px', marginBottom: '0px', fontSize: '12px' }}>Order Price</p>
            <p style={{ color: '#212121', padding: '2px', marginBottom: '0px', fontSize: '12px' }}>
              {data.order_price}
            </p>
            <p style={{ color: '#9e9e9e', padding: '10px 2px 2px', marginBottom: '0px', fontSize: '12px' }}>
              Target Price
            </p>
            <p style={{ color: '#212121', padding: '2px', marginBottom: '0px', fontSize: '12px' }}>
              {data.target_price}
            </p>
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
                Trade PnL
              </p>
              <p
                style={{
                  color: '#00e676',
                  padding: '5px',
                  padding: '2px',
                  marginBottom: '0px',
                  backgroundColor: '#C0FEE0',
                  borderRadius: '3px',
                  fontSize: '12px'
                }}
              >
                {data.gain}({data.value})
              </p>
            </div>
          </div>
        </Row>
      </div>
    </>
  );
};

export default withRouter(VirtualTradeItem);
