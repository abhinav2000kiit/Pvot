import React from 'react';
//import './BasicDetail.scss';
import { Row, Col } from 'react-bootstrap';
import Header from '../components/Header/customHeader';
import { TextField } from 'formik-material-ui';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import BasicNavigator from '../components/BottomNavigator';
import { Typography } from '@material-ui/core';
import Box from '../components/Box';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { connect } from 'react-redux';
import moment from 'moment';
import * as actions from '../../redux/actions/index';
import SubscribedItem from '../components/ViewSubscriptionComponentBrowser';
import CircularProgress from '@material-ui/core/CircularProgress';
import DialogTitle from '@material-ui/core/DialogTitle';
import Zoom from '@material-ui/core/Zoom';
import Grow from '@material-ui/core/Grow';

import './CreateSubscriptionPlan.scss';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  root: {
    padding: theme.spacing(3, 2),
    width: '100%'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  textField: {
    // marginLeft: theme.spacing(1),
    // marginRight: theme.spacing(1),
    // width: 200,
  },
  button: {
    width: 224,
    textTransform: 'none',
    fontWeight: 'normal'
  }
}));

const subscriptionPlans = [
  {
    segment: 'Cash',
    duration: 90,
    type: 'Intraday',
    scrip: 'EQUITY',
    amount: 2000
  },
  {
    segment: 'Options',
    duration: 180,
    type: 'Positional',
    scrip: 'NIFTY',
    amount: 1000
  },
  {
    segment: 'Futures',
    duration: 360,
    type: 'Intraday',
    //scrip:'EQUITY',
    amount: 2000
  },
  {
    segment: 'Investment',
    duration: 180,
    type: 'Positional',
    //scrip:'NIFTY',
    amount: 1000
  }
];

Date.prototype.addDays = function(days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

const CreateSubscriptionPlan = props => {
  React.useEffect(() => {
    if (props.signinData) {
      props.getSubscriptionPlanList();
    }
  }, []);

  const classes = useStyles();
  let { message } = props;
  const [openDialog, setOpenDialog] = React.useState(false);
  // const [virtualCapitalError, setVirtualCapitalError] = React.useState(false);
  const [someValueChanged, setSomeValueChanged] = React.useState(false);
  const updateValueChanged = () => {
    setSomeValueChanged(true);
  };
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  React.useEffect(() => {
    console.log('useEffect+_+_+_+_+_+_+_+_+_+_+_+_+_+_');
    if (message !== null) {
      setOpenDialog(true);
    }
  }, [message]);
  const { isErrorSubscriptionPlan, resetErrorCreateSubscription, errorSubscription } = props;
  // const [loader,setLoader] = React.useState(false)
  // // React.useEffect(() => {
  // //   setSomeValueChanged(false);
  // //   setLoader(false);
  // // });

  const [shouldDisable, setShouldDisable] = React.useState(true);
  const [subscriptionObject, setSubscriptionObject] = React.useState({
    tradingType: null,
    tradingDuration: null,
    tradingTime: null,
    tradingScrip: null,
    subSegment: null
  });

  const checkError = () => {
    if (subscriptionObject.tradingType && subscriptionObject.tradingDuration && subscriptionObject.tradingTime) {
      if (subscriptionObject.tradingType === 'Options' || subscriptionObject.tradingType === 'Future') {
        if (subscriptionObject.tradingScrip) {
          setShouldDisable(false);
        } else {
          setShouldDisable(true);
        }
      } else {
        setShouldDisable(false);
      }
      console.log(subscriptionObject.tradingType);
    } else {
      setShouldDisable(true);
    }
    // if(tradingDuration.filter(t => t.isSelected === true)>0){
    //   setShouldDisable(true)
    // }
    // if(tradingTime.filter(t => t.isSelected === true)>0){
    //   setShouldDisable(true)
    // }
    // if(tradingType.filter(t => t.isSelected===true))
  };

  const [value, setValue] = React.useState(true);

  React.useEffect(() => {
    checkError();
  }, [subscriptionObject]);
  const defaultType = [
    { text: 'Intraday', isSelected: false, value: 'INTRADAY' },
    { text: 'Positional', isSelected: false, value: 'DELIVERY' }
  ];
  const defaultTypeForInvestment = [{ text: 'Positional', isSelected: false, value: 'DELIVERY' }];
  const defaultTime = [
    { text: '1 Day', isSelected: false, value: 1 },
    { text: '1 Week', isSelected: false, value: 7 },
    { text: '1 Month', isSelected: false, value: 30 },
    { text: '3 Months', isSelected: false, value: 90 }
  ];
  const defaultTimeForInvestment = [
    { text: '1 Month', isSelected: false, value: 30 },
    { text: '3 Months', isSelected: false, value: 90 },
    { text: '6 Months', isSelected: false, value: 180 },
    { text: '12 Months', isSelected: false, value: 360 }
  ];
  const [tradingType, setTradingType] = React.useState([
    { id: 0, text: 'Cash', isSelected: false, value: 'EQUITY' },
    { id: 1, text: 'Options', isSelected: false, value: 'OPTIONS' },
    { id: 2, text: 'Future', isSelected: false, value: 'FUTURES' },
    { id: 3, text: 'Investment', isSelected: false, value: 'INVESTMENT' }
  ]);
  const [tradingDuration, setTradingDuration] = React.useState([
    { text: '1 Day', isSelected: false, value: 1 },
    { text: '1 Week', isSelected: false, value: 7 },
    { text: '1 Month', isSelected: false, value: 30 },
    { text: '3 Months', isSelected: false, value: 90 },
    { text: '6 Months', isSelected: false, value: 180 },
    { text: '12 Months', isSelected: false, value: 365 }
  ]);
  const [tradingTime, setTradingTime] = React.useState([
    { text: 'Intraday', isSelected: false, value: 'INTRADAY' },
    { text: 'Positional', isSelected: false, value: 'DELIVERY' }
  ]);
  const [tradingScrip, setTradingScrip] = React.useState([
    { text: 'NIFTY', isSelected: false, value: 'NF' },
    { text: 'BANK NIFTY', isSelected: false, value: 'BNF' },
    { text: 'EQUITY', isSelected: false, value: 'EQ' }
  ]);
  const handleChangeTradingType = text => {
    console.log('text', text);
    let newArr = tradingType;
    newArr = newArr.map(item => {
      if (item.text === text) {
        setSubscriptionObject({
          ...subscriptionObject,
          tradingType: item.value,
          tradingScrip: text === 'Investment' || text === 'Cash' ? null : subscriptionObject.tradingScrip
        });

        console.log(item.value);
        return { ...item, isSelected: true };
      } else {
        return { ...item, isSelected: false };
      }
    });

    setTradingType(newArr);
    if (text === 'Investment') {
      setTradingTime(defaultTypeForInvestment);
      setTradingDuration(defaultTimeForInvestment);
      setSubscriptionObject(draft => ({ ...draft, tradingTime: null, tradingDuration: null }));
    } else {
      setTradingTime(defaultType);
      setTradingDuration(defaultTime);
      setSubscriptionObject(draft => ({ ...draft, tradingTime: null, tradingDuration: null }));
    }
  };
  const handleChangeTradingDuration = text => {
    let newArr = tradingDuration;
    newArr = newArr.map(item => {
      if (item.text === text) {
        setSubscriptionObject({ ...subscriptionObject, tradingDuration: item.value });
        return { ...item, isSelected: true };
      } else {
        return { ...item, isSelected: false };
      }
    });
    setTradingDuration(newArr);
  };
  const handleChangeTradingTime = text => {
    let newArr = tradingTime;
    console.log(newArr);
    newArr = newArr.map(item => {
      console.log(item);
      if (item.text === text) {
        console.log(item);
        setSubscriptionObject({ ...subscriptionObject, tradingTime: item.value });
        return { ...item, isSelected: true };
      } else {
        return { ...item, isSelected: false };
      }
    });
    console.log(newArr);
    setTradingTime(newArr);
  };
  const handleChangeTradingScrip = text => {
    let newArr = tradingScrip;
    newArr = newArr.map(item => {
      if (item.text === text) {
        setSubscriptionObject({ ...subscriptionObject, tradingScrip: item.value });
        return { ...item, isSelected: true };
      } else {
        return { ...item, isSelected: false };
      }
    });
    setTradingScrip(newArr);
  };
  let selectedType = tradingType.filter(x => x.id === 1 || x.id === 2);
  selectedType = selectedType.filter(x => x.isSelected === true);
  console.log('selectedType...', subscriptionObject);
  // console.log('here!!!!!!!!!!!!!')
  // const [state, setState] = React.useState({ education: '', tradingExperience: '', certification: '' })
  // const handleChange = (e, variable) => {
  //   console.log(e, variable)
  // }
  // console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@', props, subscriptionObject);

  return (
    <>
      <Dialog
        onClose={handleClose}
        aria-labelledby='simple-dialog-title'
        open={open}
        fullWidth={true}
        TransitionComponent={Grow}
        transitionDuration={500}
      >
        <DialogContent>
          <div className='p-3'>
            <div className='text-center' style={{ fontSize: '1rem', fontWeight: '600', color: '#2962ff' }}>
              Your Subscription Plans
            </div>
            {props.subscriptionPlan && props.subscriptionPlan.map(data => <SubscribedItem data={data} />)}
          </div>
        </DialogContent>
        <DialogContent>
          {!props.subscriptionPlan ||
            (props.subscriptionPlan && props.subscriptionPlan.length === 0 && (
              <p className='text-secondary'>No Subscription Plan Found</p>
            ))}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpen(false);
              // props.history.push('/analyst-profile');
            }}
            color='primary'
            autoFocus
          >
            OK
          </Button>
        </DialogActions>
        {/* <DialogActions style={{ display: 'flex', justifyContent: 'center' }}>
            <Button onClick={handleClose} color="primary">
                Okay
            </Button>
        </DialogActions> */}
      </Dialog>

      <div style={{ width: '150%', paddingLeft: '3rem' }}>
        {props.subscriptionPlan && props.subscriptionPlan.map(data => <SubscribedItem data={data} />)}

        {!props.subscriptionPlan ||
          (props.subscriptionPlan && props.subscriptionPlan.length === 0 && (
            <p className='text-secondary'>No Subscription Plan Found</p>
          ))}
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
              props.setMessage(null);
              setSomeValueChanged(false);
              setOpenDialog(false);
              setOpen(true);
            }}
            color='primary'
            autoFocus
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>

      {/* <Dialog
        open={virtualCapitalError}
        onClose={() => setVirtualCapitalError(false)}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>Kindly Allocate your trade first!</DialogTitle>
        <DialogActions>
          <Button
            onClick={() => {
              setVirtualCapitalError(false);
            }}
            color='primary'
            autoFocus
          >
            OK
          </Button>
        </DialogActions>
      </Dialog> */}
    </>
  );
};

const mapStateToProps = state => ({
  signinData: state.auth.signinData,
  errorSubscription: state.auth.errorSubscription,
  isErrorSubscriptionPlan: state.auth.isErrorSubscriptionPlan,
  loader: state.auth.loader,
  subscriptionPlan: state.analyst.subscriptionPlan,
  message: state.auth.message,
  analystDetails: state.analyst.analystDetails
});

const mapDispatchToProps = dispatch => ({
  setMessage: message => dispatch(actions.setMessage(message)),
  getSubscriptionPlanList: token => dispatch(actions.getSubscriptionPlanList(token))
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateSubscriptionPlan);
