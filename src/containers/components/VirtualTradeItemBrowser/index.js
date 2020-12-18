import React from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import EditIcon from '@material-ui/icons/EditOutlined';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import { connect } from 'react-redux';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
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
import DeleteIcon from '@material-ui/icons/DeleteOutlined';

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
  const [openDialog, setOpenDialog] = React.useState(false);

  React.useEffect(() => {
    if (props.message) {
      props.setMessage(props.message);
    }
  }, [props.message]);

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

  const handleCancelClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSwitch = event => {
    console.log('clicked!!!!');
    const params = {
      record_id: props.data.record_id,
      allow_entry: !props.data.allow_entry
    };
    props.allowTradeEntry({
      params: params
    });
    setAllow(!allow);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const [error, setError] = React.useState();
  const [isEdit, setEdit] = React.useState(false);

  // console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@', props);

  return (
    <>
      {/* <div style={{ width: '100%', border: '1px solid #eeeeee', padding: '15px 15px 0px', marginBottom: '10px' }}> */}
      <div
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
              }}
              style={{ color: 'red' }}
            >
              Yes
            </Button>
          </Row>
        </Popover>

        <div className='col'>

        <Row>
          <div className='col-6'>
            <div style={{ color: '#212121', fontSize: '12px', paddingLeft: '2rem' }}>
              {moment(data.order_placement_time).format('DD/MM')}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              {moment(data.order_placement_time).format('HH:mm')}
            </div>
          </div>
          <div className='col-6' style={{ position: 'absolute', right: '0px', top: '-0.5rem', paddingLeft: '3rem', paddingRight: '0.5rem' }}>
            {data.status === 'OPEN' && (
              <div
                style={{
                  color: '#101010',
                  backgroundColor: '#FFCF55',
                  borderRadius: '1.5rem',
                  paddingTop: '0.5rem',
                  height: '6rem',
                  fontSize: '12px',
                  textAlign: 'center',
                  paddingTop: '0.5rem'
                }}
              >
                <p className='mb-0 mx-auto'>
                  <LockOpenIcon style={{ fontSize: '10px' }} className='mb-1' /> {data.status}
                </p>
              </div>
            )}
            {data.status === 'CLOSED' && (
              <div
                style={{
                  color: '#101010',
                  backgroundColor: '#B1AEC1',
                  borderRadius: '1.5rem',
                  paddingTop: '0.5rem',
                  height: '6rem',
                  fontSize: '12px',
                  textAlign: 'center',
                }}
              >
                <p className='mb-0 mx-auto'>
                  <LockIcon style={{ fontSize: '10px' }} className='mb-1' /> {data.status}
                </p>
              </div>
            )}

            {data.status === 'EXPIRED' && (
              <div
                style={{
                  color: '#101010',
                  backgroundColor: '#B1AEC1',
                  borderRadius: '1.5rem',
                  paddingTop: '0.5rem',
                  height: '6rem',
                  fontSize: '12px',
                  textAlign: 'center',
                }}
              >
                <p className='mb-0 mx-auto'>
                  <QueryBuilderIcon style={{ fontSize: '10px' }} className='mb-1' /> {data.status}
                </p>
              </div>
            )}

            {data.status === 'CANCELLED' && (
              <div
                style={{
                  color: '#101010',
                  backgroundColor: '#B1AEC1',
                  borderRadius: '1.5rem',
                  paddingTop: '0.5rem',
                  height: '6rem',
                  fontSize: '10px',
                  textAlign: 'center',
                }}
              >
                <p className='mb-0 mx-auto'>
                  <CancelIcon style={{ fontSize: '10px' }} className='mb-1' /> {data.status}
                </p>
              </div>
            )}
            {data.status === 'EXECUTED' && (
              <div
                style={{
                  color: '#101010',
                  backgroundColor: '#54E2B1',
                  borderRadius: '1.5rem',
                  paddingTop: '0.5rem',
                  height: '6rem',
                  fontSize: '12px',
                  textAlign: 'center',
                }}
              >
                <p className='mb-0 mx-auto'>
                  <CheckCircleOutlineIcon style={{ fontSize: '10px' }} className='mb-1' /> ACTIVE
                  {/* <ArrowUpwardIcon style={{ fontSize: '10px' }} /> */}
                </p>
              </div>
            )}
          </div>
        </Row>

        <Col
          style={{
            marginBottom: '1.5rem',
            border: '1px solid grey',
            borderRadius: '3rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '1rem',
            backgroundColor: 'white'
          }}
        >
          <Row
            style={{
              paddingLeft: '1rem',
              paddingRight: '1rem',
              color: '#212121',
              fontSize: '16px',
              marginBottom: '1rem'
            }}
          >
          <strong style={{display: 'block'}}>{data.instrument && data.instrument.trading_symbol}</strong>
          </Row>

          <Col
            style={{
              paddingLeft: '1rem',
              paddingRight: '1rem',
              marginBottom: '1rem'
            }}
          >
            <Row
              style={{
                backgroundColor: data.gains >= 0 ? '#54E2B1' : '#f44336da',
                paddingTop: '0.5rem',
                paddingBottom: '0.5rem',
                marginBottom: '0px',
                fontSize: '14px',
                fontWeight: '550',
                width: '100%',
                marginBottom: '1rem',
                borderRadius: '3rem'
              }}
            >
              <div className="col-3" style={{textAlign: 'left'}}>{data.gains >= 0 ? <>GAIN</> : <>LOSS</>}</div>
              <div className="col-2"></div>
              <div className="col-7" style={{textAlign: 'right'}}>
              {Number(data.gains).toFixed(2)}&nbsp;&nbsp;({Number(data.gains_percentage).toFixed(2) + '%'})
              </div>
            </Row>

            <Row
              style={{
                border: '1px solid black',
                borderColor:
                  data.reward === data.risk
                    ? '#B1AEC1'
                    : data.reward > data.risk
                    ? '#54E2B1'
                    : data.reward < data.risk
                    ? '#f44336da'
                    : 'rgba(20, 19, 19, 0.938)',
                paddingTop: '0.5rem',
                paddingBottom: '0.5rem',
                marginBottom: '0px',
                fontSize: '14px',
                fontWeight: '550',
                width: '100%',
                borderRadius: '3rem'
              }}
            >
              <div className="col-7" style={{textAlign: 'left'}}>RISK : REWARD</div>
              <div className="col-1" style={{padding: '0px'}}></div>
              <div className="col-4"  style={{textAlign: 'right'}}>
              {`1: ${(data.reward / data.risk).toFixed(2)}`}
              </div>
            </Row>
          </Col>

          
            <Row
              style={{
                color: '#616161',
                fontSize: '12px',
                fontWeight: 'bold',
                marginBottom: '2rem',
                paddingLeft: '1rem',
                paddingRight: '1rem',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-evenly'
              }}
            >
              <div>{data.segment && data.segment.name.toUpperCase()}</div>
              <div>{' | '}</div>
              <div>{data.trade_type && data.trade_type.toUpperCase()}</div>
              <div>{' | '}</div>
              <div>{data.order_type && data.order_type.toUpperCase()}</div>
              <div>{' | '}</div>
              <div>{data.complexity && data.complexity.toUpperCase()}</div>
          </Row>

          <Col
            style={{
              paddingLeft: '1rem',
              paddingRight: '1rem'
            }}
          >
            <div className='row'>
              <div className="col-6"
                style={{
                  alignItems: 'center',
                  borderRight: '.3px solid #B1AEC1',
                  borderBottom: '.3px solid #B1AEC1',
                  padding: '.5rem',
                  paddingLeft: '1rem',
                  paddingTop: '1rem',
                  width: '10rem'
                }}
              >
                <div style={{ color: '#2B2B2B', fontSize: '12px', textAlign: 'center', fontWeight: '500' }}>
                  <b>₹{data.price}</b>
                </div>
                <div style={{ color: '#2B2B2B', fontSize: '12px', textAlign: 'center' }}>Order Price</div>
              </div>
              <div className="col-6"
                style={{
                  alignItems: 'center',
                  borderLeft: '.3px solid #B1AEC1',
                  borderBottom: '.3px solid #B1AEC1',
                  padding: '.5rem',
                  paddingLeft: '1rem',
                  paddingTop: '1rem',
                  width: '10rem'
                }}
              >
                <div style={{ color: '#2B2B2B', fontSize: '12px', textAlign: 'center', fontWeight: '500' }}>
                  <b>₹{data.target}</b>
                </div>
                <div style={{ color: '#2B2B2B', fontSize: '12px', textAlign: 'center' }}>Target Price</div>
              </div>
            </div>
            <div className='row'>
              <div className="col-6"
                style={{
                  alignItems: 'center',
                  borderRight: '.3px solid #B1AEC1',
                  borderTop: '.3px solid #B1AEC1',
                  padding: '.5rem',
                  paddingLeft: '1rem',
                  paddingTop: '1rem',
                  width: '10rem'
                }}
              >
                <div style={{ color: '#2B2B2B', fontSize: '12px', textAlign: 'center', fontWeight: '500' }}>
                  <b>{data.quantity}</b>
                </div>
                <div style={{ color: '#2B2B2B', fontSize: '12px', textAlign: 'center' }}>Quantity</div>
              </div>
              <div className="col-6"
                style={{
                  alignItems: 'center',
                  borderLeft: '.3px solid #B1AEC1',
                  borderTop: '.3px solid #B1AEC1',
                  padding: '.5rem',
                  paddingLeft: '1rem',
                  paddingTop: '1rem',
                  width: '10rem'
                }}
              >
                <div style={{ color: '#2B2B2B', fontSize: '12px', textAlign: 'center', fontWeight: '500' }}>
                  <b>{data.stop_loss}</b>
                </div>
                <div style={{ color: '#2B2B2B', fontSize: '12px', textAlign: 'center' }}>Stop Loss</div>
              </div>
            </div>
          </Col>

              {data.status === 'EXECUTED' ? (
                <Col style={{
                  paddingLeft: '1rem',
                  paddingRight: '1rem'
                }}>
                  <Row style={{ textAlign: 'center' }}>
                    <div style={{ width: '100%', height: '2px', borderBottom: '1px solid #eeeeee', marginTop: '0.7rem' }} />
                  </Row>
                  <Row>
                    {/* <FormControlLabel
                        control={<IOSSwitch checked={allow} onChange={handleSwitch} name='allow' />}
                    #565EBFbel='Allow entry'
                        labelPlacement='start'
                        style={{
                          fontSize: '1rem'
                        }}
                      /> */}
                    <div className='col-6' style={{padding: '0px', marginLeft: '1rem'}}>
                      <Row>
                        <div className='col-7' style={{padding: '1.3rem 0px 0px 0rem'}}>
                          <span style={{ fontSize: '1rem', color: '#565EBF' }}>Allow Entry</span>
                        </div>
                        <div className='col-4' style={{padding: '1.1rem 0px 0px 0px'}}>
                          <IOSSwitch checked={allow} onChange={handleSwitch} name='allow' />
                        </div>
                      </Row>
                    </div>
                    <div className='col-3'
                    style={{
                      padding: '0px',
                      paddingTop: '0.4rem',
                      marginBottom: '0px',
                      fontSize: '2rem',
                      textAlign: 'center',
                      
                      cursor: !data.stop_loss_hit && !data.target_hit ? 'pointer' : 'default'
                    }}
                    onClick={() => {
                      if (!data.stop_loss_hit && !data.target_hit) {
                        // props.changeHomeState(1);
                        props.setTradeItem(data);
                        // props.history.push('/new-trade');
                        props.setCheck(true);
                      }
                    }}
                    >
                    <EditIcon
                      style={{
                        fontSize: '2rem',
                        textAlign: 'center',
                        color: '#565EBF'
                      }}
                    />
                    </div>
                   <div className='col-2' style={{padding: '0px',}}>
                      <div
                        style={{
                          padding: '0px',
                          paddingTop: '0.4rem',
                          marginBottom: '0px',
                          fontSize: '2rem',
                          textAlign: 'center',
                          cursor: 'pointer'
                        }}
                        onClick={handleCancelClick}
                        className='ml-2'
                      >
                        <DeleteIcon
                          style={{
                            fontSize: '2rem',
                            textAlign: 'center'
                          }}
                        />
                      </div>
                    </div>
                  </Row>
                  </Col>
                
              ) : data.status === 'OPEN' ? (
                <Col style={{
                  paddingLeft: '1rem',
                  paddingRight: '1rem'
                }}>
                  <Row style={{ textAlign: 'center' }}>
                    <div style={{ width: '100%', height: '2px', borderBottom: '1px solid #eeeeee', marginTop: '0.7rem'  }} />
                  </Row>
                  <Row>
                    {/* <FormControlLabel
                        control={<IOSSwitch checked={allow} onChange={handleSwitch} name='allow' />}
                    #565EBFbel='Allow entry'
                        labelPlacement='start'
                        style={{
                          fontSize: '1rem'
                        }}
                      /> */}
                    <div className='col-6' style={{padding: '0px'}}>
                      <Row>
                        <div className='col-7' style={{padding: '1.3rem 0px 0px 0rem'}}>
                          <span style={{ fontSize: '1rem', color: '#565EBF' }}>Allow Entry</span>
                        </div>
                        <div className='col-4' style={{padding: '1.1rem 0px 0px 0px'}}>
                          <IOSSwitch checked={allow} onChange={handleSwitch} name='allow' />
                        </div>
                      </Row>
                    </div>
                    <div className='col-3'
                    style={{
                      padding: '0px',
                      paddingTop: '0.4rem',
                      marginBottom: '0px',
                      fontSize: '2rem',
                      textAlign: 'center',
                      
                      cursor: !data.stop_loss_hit && !data.target_hit ? 'pointer' : 'default'
                    }}
                    onClick={() => {
                      if (!data.stop_loss_hit && !data.target_hit) {
                        // props.changeHomeState(1);
                        props.setTradeItem(data);
                        // props.history.push('/new-trade');
                        props.setCheck(true);
                      }
                    }}
                    >
                    <EditIcon
                      style={{
                        fontSize: '2rem',
                        textAlign: 'center',
                        color: '#565EBF'
                      }}
                    />
                    </div>
                   <div className='col-2' style={{padding: '0px',}}>
                      <div
                        style={{
                          padding: '0px',
                          paddingTop: '0.4rem',
                          marginBottom: '0px',
                          fontSize: '2rem',
                          textAlign: 'center',
                          cursor: 'pointer'
                        }}
                        onClick={handleCancelClick}
                        className='ml-2'
                      >
                        <DeleteIcon
                          style={{
                            fontSize: '2rem',
                            textAlign: 'center'
                          }}
                        />
                      </div>
                    </div>
                  </Row>
                  </Col>
              ) : (
                <div style={{ padding: '5px 0' }}></div>
              )}
        </Col>
        </div>
      </div>

      <Dialog
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
            OK
          </Button>
        </DialogActions>
      </Dialog>

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
