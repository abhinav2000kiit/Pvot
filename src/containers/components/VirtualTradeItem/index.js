import React from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import EditIcon from '@material-ui/icons/Edit';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import { connect } from 'react-redux';
import * as actions from '../../../redux/actions/index';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import './VirtualTradeItem.scss';
import download from 'downloadjs';
import { Input, ClickAwayListener } from '@material-ui/core';
import ShareIcon from '@material-ui/icons/Share';
import ShareVirtualTrade from './ShareVirtualTrade';
// import nodeHtmlToImage from 'node-html-to-image'

import { Mixpanel } from '../../../shared/mixPanel';

const useStyles = makeStyles(theme => ({
  typography: {
    padding: 10
  }
}));

const IOSSwitch = withStyles(theme => ({
  root: {
    width: 36,
    height: 20,
    padding: 0,
    margin: theme.spacing(1)
  },
  switchBase: {
    padding: 1,
    '&$checked': {
      transform: 'translateX(16px)',
      color: theme.palette.common.white,
      '& + $track': {
        backgroundColor: '#52d869',
        opacity: 1,
        border: 'none'
      }
    },
    '&$focusVisible $thumb': {
      color: '#52d869',
      border: '6px solid #fff'
    }
  },
  thumb: {
    width: 18,
    height: 18,
    borderRadius: 26 / 2,
    border: `1px solid ${theme.palette.grey[400]}`,
    backgroundColor: theme.palette.grey[100],
    opacity: 1,
    transition: theme.transitions.create(['background-color', 'border'])
  },
  track: {
    borderRadius: 26 / 2,
    border: `1px solid ${theme.palette.grey[400]}`,
    backgroundColor: theme.palette.grey[50],
    opacity: 1,
    transition: theme.transitions.create(['background-color', 'border'])
  },
  checked: {},
  focusVisible: {}
}))(({ classes, ...props }) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked
      }}
      {...props}
    />
  );
});

const VirtualTradeItem = props => {
  const { data, message } = props;
  // const [openDialog, setOpenDialog] = React.useState(false);

  // console.log('@@@@@@@@@@@@@@@@@@@@', data);

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  // const [allow, setAllow] = React.useState(
  //   data.status === 'EXPIRED' || data.status === 'CANCELLED' || data.status === 'CLOSED'
  //     ? false
  //     : data.status === 'OPEN' || data.status === 'EXECUTED'
  //     ? true
  //     : null
  // );
  const [allow, setAllow] = React.useState(data && data.allow_entry);
  const [showDialog, setDialog] = React.useState(false);
  // const [openDialog, setOpenDialog] = React.useState(false);

  const handleCancelClick = event => {
    Mixpanel.track('Cancel Trade Clicked - Expert');
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSwitch = () => {
    Mixpanel.track('Allow entry Clicked - Expert', { allowEntry: !props.data.allow_entry });
    const params = {
      record_id: props.data.record_id,
      allow_entry: !props.data.allow_entry
    };
    props.allowTradeEntry({
      params: params
    });
    setAllow(!allow);
  };

  // React.useEffect(() => {
  //   if (props.message !== null) {
  //     setOpenDialog(true);
  //   }
  // }, []);

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const [isEdit, setEdit] = React.useState(false);

  // console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@', props);

  return (
    <>
      {/* <div style={{ width: '100%', border: '1px solid #eeeeee', padding: '15px 15px 0px', marginBottom: '10px' }}> */}
      <div
        className='card'
        onClick={() => {
          setDialog(true);
          setEdit(true);
        }}
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
            <Typography className={classes.typography}>Are you sure you want to cancel the trade?</Typography>
          </Row>
          <Row style={{ padding: '10px', justifyContent: 'flex-end', margin: '0px' }}>
            <Button onClick={handleClose}>No</Button>
            <Button
              onClick={() => {
                handleClose();
                const recordData = new FormData();
                recordData.append('record_id', data.record_id);
                props.cancelTrade({
                  record_id: recordData
                });
                // props.setMessage(props.message);
              }}
              style={{ color: 'red' }}
            >
              Yes
            </Button>
          </Row>
        </Popover>
        <Row style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div className='col-9 p-0 pr-2 m-0 mr-auto'>
            <p
              style={{
                color: '#212121',
                fontSize: '16px',
                padding: '2px',
                marginBottom: '0px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start'
              }}
            >
              <span>
                <strong>{data.instrument && data.instrument.trading_symbol}</strong>
              </span>
              {data.status === 'CLOSED' ? (
                <Row>
                  <Col style={{ fontSize: '10px', opacity: '0.8', textAlign: 'right' }}>
                    <ShareIcon color='primary' style={{ fontSize: '16px' }} />
                  </Col>
                </Row>
              ) : null}
            </p>
            <p style={{ color: '#616161', fontSize: '12px', padding: '2px', marginBottom: '0px' }}>
              {data.segment && data.segment.name.toUpperCase()}
              {' | '}
              {data.trade_type && data.trade_type.toUpperCase()}
              {' | '}
              {data.order_type && data.order_type.toUpperCase()}
              {' | '}
              {data.complexity && data.complexity.toUpperCase()}
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
                  <LockIcon style={{ fontSize: '12px', position: 'relative', top: '1px', marginRight: '3px' }} className='mb-1' /> {data.status}
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
                  <CheckCircleOutlineIcon style={{ fontSize: '12px', position: 'relative', top: '1px', marginRight: '3px' }} className='mb-1' /> ACTIVE
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

        {data.status === 'EXECUTED' ? (
          <div className='mt-3 cardBottom'>
            <Row style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ width: '100%', height: '2px', borderBottom: '1px solid #eeeeee' }} />
            </Row>
            <Row style={{ display: 'flex', justifyContent: 'space-between' }} className='py-2'>
              <div className='tradeBottomSections'>
                <FormControlLabel
                  control={<IOSSwitch checked={allow} onChange={handleSwitch} name='allow' />}
                  label='Allow entry'
                  labelPlacement='start'
                  style={{
                    fontSize: '1rem'
                  }}
                />
              </div>
              <div
                style={{
                  color: '#2962ff',
                  paddingTop: '0.4rem',
                  marginBottom: '0px',
                  fontSize: '1rem',
                  textAlign: 'center',
                  cursor: !data.stop_loss_hit && !data.target_hit ? 'pointer' : 'default'
                }}
                onClick={() => {
                  if (!data.stop_loss_hit && !data.target_hit) {
                    // props.changeHomeState(1);
                    Mixpanel.track('Edit Trade Clicked - Expert');
                    props.setTradeItem(data);
                    props.history.push('/new-trade');
                  }
                }}
              >
                <EditIcon
                  style={{
                    fontSize: '1rem',
                    textAlign: 'center'
                  }}
                />{' '}
                Edit
              </div>
            </Row>
          </div>
        ) : data.status === 'OPEN' ? (
          <div className='mt-3 cardBottom'>
            <Row style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ width: '100%', height: '2px', borderBottom: '1px solid #eeeeee' }} />
            </Row>
            <Row style={{ display: 'flex', justifyContent: 'space-between' }} className='py-2'>
              <div className='tradeBottomSections'>
                <FormControlLabel
                  control={<IOSSwitch checked={allow} onChange={handleSwitch} name='allow' />}
                  label='Allow entry'
                  labelPlacement='start'
                  style={{
                    fontSize: '1rem'
                  }}
                />
              </div>
              <div
                style={{
                  color: '#2962ff',
                  paddingTop: '0.4rem',
                  marginBottom: '0px',
                  fontSize: '1rem',
                  textAlign: 'center',
                  cursor: !data.stop_loss_hit && !data.target_hit ? 'pointer' : 'default'
                }}
                onClick={() => {
                  if (!data.stop_loss_hit && !data.target_hit) {
                    // props.changeHomeState(1);
                    Mixpanel.track('Edit Trade Clicked - Expert');
                    props.setTradeItem(data);
                    props.history.push('/new-trade');
                  }
                }}
              >
                <EditIcon
                  style={{
                    fontSize: '1rem',
                    textAlign: 'center'
                  }}
                />{' '}
                Edit
              </div>
              <div
                style={{
                  color: '#f44336',
                  paddingTop: '0.4rem',
                  marginBottom: '0px',
                  fontSize: '1rem',
                  textAlign: 'center',
                  cursor: 'pointer'
                }}
                onClick={handleCancelClick}
                className='ml-2'
              >
                <CloseIcon
                  style={{
                    fontSize: '1rem',
                    textAlign: 'center'
                  }}
                />{' '}
                Cancel
              </div>
            </Row>
          </div>
        ) : (
          <div style={{ padding: '5px 0' }}></div>
        )}
      </div>

      {/* <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{props.message}</DialogTitle>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenDialog(false);
              props.setMessage(null);
            }}
            color='primary'
            autoFocus
          >
            OK4
          </Button>
        </DialogActions>
      </Dialog> */}

      {data.status === 'CLOSED' && data.analyst ? (
        <ShareVirtualTrade data={data} id={props.id} showDialog={showDialog} setDialog={setDialog} />
      ) : null}
    </>
  );
};

const mapStateToProps = state => ({
  signinData: state.auth.signinData,
  message: state.auth.message,
  allowEntry: state.analyst.allowEntry
});

const mapDispatchToProps = dispatch => ({
  cancelTrade: payload => dispatch(actions.cancelTrade(payload)),
  changeHomeState: params => dispatch(actions.changeHomeState(params)),
  setTradeItem: params => dispatch(actions.setTradeItem(params)),
  allowTradeEntry: params => dispatch(actions.allowTradeEntry(params)),
  setMessage: message => dispatch(actions.setMessage(message))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(VirtualTradeItem));
