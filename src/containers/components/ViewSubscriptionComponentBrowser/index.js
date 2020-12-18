import React from 'react';
import { Row, Col } from 'react-bootstrap';
import DeleteIcon from '@material-ui/icons/DeleteOutlined';
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
    <div className='my-4' style={{ border: '1px solid #B1AEC1', borderRadius: '3rem', marginLeft: '1rem', marginRight: '1rem' }}>
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
      <Row>
        <Col style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '600', marginTop: '5px', marginBottom: '10px', }}>
          <div style={{ display: 'flex', justifyContent: 'flex-start', flex: '1 1 auto' }}>
            <div style={{ border: '3px solid transparent', marginLeft: '1rem', fontSize: '14px', fontWeight: '500', position: 'relative', top: '65%', transform: 'translateY(-40%)' }}>
              {props.data.segment.name == 'EQUITY' ? 'CASH' : props.data.segment.name}
            </div>
            <div style={{ border: '3px solid transparent', fontSize: '14px', fontWeight: '500', position: 'relative', top: '65%', transform: 'translateY(-40%)' }}>
              {props.data.script && '| '}
              {props.data.script}
            </div>
            <div style={{ border: '3px solid transparent', fontSize: '14px', fontWeight: '500', position: 'relative', top: '65%', transform: 'translateY(-40%)' }}>
              {props.data.trade_type && '| '}
              {props.data.trade_type.toUpperCase()}
            </div>
          </div>
          </Col>

          <div className= 'col-3'
            style={{
              borderRight: '1px solid #eeeeee',
              borderLeft: '1px solid #eeeeee',
              textAlign: 'center',
              // marginBottom: '20px',
              marginTop: '10px',
              marginBottom: '10px',
              fontSize: '14px',
              fontWeight: '500'
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
            <div style={{fontSize: '12px', fontWeight: '400'}}>Duration</div>
          </div>
          <div className="col-3"             style={{
              borderRight: '1px solid #eeeeee',
              textAlign: 'center',
              // marginBottom: '20px',
              marginTop: '10px',
              marginBottom: '10px',
              fontSize: '1.1rem'
              }} >
            <div>₹ {numberWithCommas(props.data.amount)}</div>
            <div style={{fontSize: '12px', fontWeight: '400'}}>Price</div>
          </div>

          <div className= 'col-2'>
          <div style={{ color: '#da5b69', cursor: 'pointer' }} onClick={handleClick}>
            {/* <DeleteIcon style={{ fontSize: '16px' }} />
            &nbsp;
            <span>
              <strong style={{ borderTop: '2px solid transparent' }}>Delete Plan</strong>
            </span> */}
            <div style={{ marginTop: '1rem', textAlign: 'center',
              marginBottom: '1rem', }}>
              <DeleteIcon style={{ fontSize: '1.5rem', verticalAlign: 'middle', color: 'black' }} />
            </div>
          </div>
        </div>
      </Row>
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
