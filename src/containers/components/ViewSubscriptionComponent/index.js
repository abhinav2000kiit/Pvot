import React from 'react';
import { Row, Col } from 'react-bootstrap';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import { connect } from 'react-redux';
import * as actions from '../../../redux/actions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  typography: {
    padding: 10
  }
}));

const SubscribedItem = props => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div className='my-4' style={{ border: '1px solid #eeeeee', borderRadius: '1rem' }}>
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
        style={{ width: '30rem' }}
      >
        <Row className='text-center'>
          <Col>
            <Typography className={classes.typography}>Are you sure?</Typography>
          </Col>
        </Row>
        <Row style={{ padding: '10px', justifyContent: 'flex-end', margin: '0px' }}>
          <Button onClick={handleClose} style={{ textTransform: 'none' }}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              setAnchorEl(null);
              props.deleteSubscriptionPlan({
                subscription_plan_id: props.data.plan_id
              });
            }}
            style={{ color: 'red', textTransform: 'none' }}
          >
            Delete
          </Button>
        </Row>
      </Popover>
      <div>
        <Row style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '600', padding: '0.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'flex-start', flex: '1 1 auto' }}>
            <div
              style={{
                height: '1rem',
                width: '1rem',
                // props.data.segment==='Investment'?'#2b3252':
                backgroundColor:
                  props.data.segment.name === 'OPTIONS'
                    ? '#f7c244'
                    : props.data.segment.name === 'EQUITY'
                    ? '#69e182'
                    : props.data.segment.name === 'FUTURES'
                    ? '#e25241'
                    : props.data.segment.name === 'INVESTMENT'
                    ? '#212121'
                    : '',
                borderRadius: '50%',
                display: 'inline-block',
                marginTop: '5px'
              }}
            />
            <div style={{ border: '3px solid transparent', borderLeft: '6px solid transparent', fontSize: '0.8rem' }}>
              {props.data.segment.name == 'EQUITY' ? 'CASH' : props.data.segment.name}
            </div>
            <div style={{ border: '3px solid transparent', fontSize: '0.8rem' }}>
              {props.data.script && '| '}
              {props.data.script}
            </div>
          </div>
          <div style={{ color: '#da5b69', cursor: 'pointer' }} onClick={handleClick}>
            {/* <DeleteIcon style={{ fontSize: '16px' }} />
            &nbsp;
            <span>
              <strong style={{ borderTop: '2px solid transparent' }}>Delete Plan</strong>
            </span> */}
            <div className='px-2'>
              <DeleteIcon style={{ fontSize: '1.2rem' }} />
            </div>
          </div>
        </Row>
        <div style={{ backgroundColor: '#eee', borderBottomLeftRadius: '1rem', borderBottomRightRadius: '1rem' }}>
          <Row
            style={{
              dsiplay: 'flex',
              justifyContent: 'space-between',
              // marginBottom: '20px',
              padding: '0.5rem 1rem',
              fontSize: '0.8rem'
            }}
          >
            <div>
              {props.data.days === 1
                ? '1 Day'
                : props.data.days === 7
                ? ' 1 Week'
                : props.data.days === 30
                ? '1 Month'
                : `${props.data.days / 30} Months`}
            </div>
            <div>{props.data.trade_type}</div>
            <div>₹ {numberWithCommas(props.data.amount)}</div>
          </Row>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  signinData: state.auth.signinData,
  message: state.auth.message
});

const mapDispatchToProps = dispatch => ({
  deleteSubscriptionPlan: params => dispatch(actions.deleteSubscriptionPlan(params))
});

export default connect(mapStateToProps, mapDispatchToProps)(SubscribedItem);