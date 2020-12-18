import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import Box from '../components/Box';
import { TextField } from 'formik-material-ui';
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

const SubscriptionPlanCreation = props => {
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
    { text: '3 Months', isSelected: false, value: 180 },
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
    { text: '3 Months', isSelected: false, value: 180 },
    { text: '12 Months', isSelected: false, value: 365 }
  ]);
  const [tradingTime, setTradingTime] = React.useState([
    { text: 'Intraday', isSelected: false, value: 'INTRADAY' },
    { text: 'Positional', isSelected: false, value: 'DELIVERY' }
  ]);
  const [tradingScrip, setTradingScrip] = React.useState([
    { text: 'NIFTY', isSelected: false, value: 'NF' },
    { text: 'BANK NIFTY', isSelected: false, value: 'BNF' },
    // { text: 'EQUITY', isSelected: false, value: 'EQ' }
    { text: 'ALL SCRIP', isSelected: false, value: 'ALL' }
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
      <div style={{ padding: '10px', padding: '10px 1rem 0px 3rem' }}>
        <Dialog
          onClose={handleClose}
          aria-labelledby='simple-dialog-title'
          open={open}
          fullWidth={true}
          TransitionComponent={Grow}
          transitionDuration={500}
        >
          {/* <DialogContent>
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
          </DialogContent> */}
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
       
          {/* <Typography variant="caption" style={{ fontSize: '14px', fontWeight: '500', marginTop: '2rem' }} align="left">
            Pricing
          </Typography> */}
          <Formik 
            initialValues={{
              pricing: ''
              // ,
              // password: '',
              // select: 'none',
              // tags: [],
              // rememberMe: true,
            }}
            validate={values => {
              const errors = {};
              if (someValueChanged === false) {
                updateValueChanged();
              }
              if (tradingType.filter(f => f.isSelected === true) > 0) {
                errors.segment = 'Select a value first!';
              }
              if (!values.pricing) {
                errors.pricing = 'Please enter a price value';
              } else if (!/^(\(?\+?[0-9]*\)?)?[0-9_\- \(\)]*$/i.test(values.pricing)) {
                errors.pricing = 'Please enter numbers only';
              }
              return errors;
            }}
            handleChanged={(e, values) => {
              console.log(e.target);
              values.pricing = e.target.value;
            }}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(false);
              // if (
              //   props.analystDetails &&
              //   props.analystDetails.capital_required &&
              //   props.analystDetails.capital_required > 0 &&
              //   props.analystDetails.segment_list &&
              //   props.analystDetails.segment_list.length > 0
              // ) {
              let subscriptionObj = {
                pricing: parseInt(values.pricing),
                tradingType: subscriptionObject.tradingType,
                tradingDuration: tradingDuration.filter(t => t.isSelected === true)[0]
                  ? tradingDuration.filter(t => t.isSelected === true)[0].value
                  : null,
                tradingTime: tradingTime.filter(t => t.isSelected === true)[0]
                  ? tradingTime.filter(t => t.isSelected === true)[0].text
                  : null,
                tradingScrip: tradingScrip.filter(t => t.isSelected === true)[0]
                  ? tradingScrip.filter(t => t.isSelected === true)[0].text
                  : null,
                subSegment: tradingType.filter(t => t.isSelected === true)[0]
                  ? tradingType.filter(t => t.isSelected === true)[0].text.toUpperCase()
                  : null
              };
              let date = new Date();
              console.log('@@@@@@@@@@@@@@@@@@@@@@@@', subscriptionObj);

              props.createSubscriptionPlan({
                segment_name: subscriptionObj.tradingType,
                amount: subscriptionObj.pricing,
                days: subscriptionObj.tradingDuration.toString(),
                from_date: moment(date).format('DD/MM/YYYY'),
                //"end_date":'10/12/2020'
                end_date: moment(date.addDays(subscriptionObj.tradingDuration)).format('DD/MM/YYYY'),
                trade_type: subscriptionObj.tradingTime,
                script: subscriptionObject.tradingScrip,
                sub_segment_name: subscriptionObj.subSegment
              });
              // } else {
              //   setVirtualCapitalError(true);
              // }

              // setLoader(true)
              // let date = new Date()
              // console.log('end_date: ',date.addDays(subscriptionObj.tradingDuration*30))
              // console.log(`duration: `,subscriptionObj.tradingDuration)
              // console.log(`tradingType: `,tradingType.filter(t => t.isSelected===true)[0].text)
              // console.log(`tradingDuration: `,tradingDuration.filter(t => t.isSelected===true)[0].text)
              // console.log(`values: ${JSON.stringify(values, null, 2).pricing}`)
              // console.log(`values: ${JSON.stringify(values, null, 2)}`)
              // setTimeout(() => {
              //   console.log(`Data to send to API: ${subscriptionObj}`)
              //   console.log(`Data to send to API: ${subscriptionObj.pricing}`)
              //   console.log(`Data to send to API: ${subscriptionObj.tradingType}`)
              //   console.log(`Data to send to API: ${subscriptionObj.tradingDuration}`)
              //   console.log(`Data to send to API: ${subscriptionObj.tradingTime}`)
              //   console.log(`Data to send to API: ${subscriptionObj.tradingScrip}`)
              // }, 500);
            }}
            render={({ submitForm, isSubmitting, values, errors, setFieldValue, handleChanged }) => (
              <Form>
                <Typography variant='caption' style={{ fontSize: '14px', fontWeight: '500' }} align='left'>
                  Choose The Segment
                </Typography>
                <Row>
                  {tradingType.map((t, i) => (
                    <Col lg={3} md={3} sm={3} xs={3} style={{ padding: '1rem' }} key={i}>
                      <Box
                        allowed='true'
                        isSelected={t.isSelected}
                        text={t.text}
                        handleChange={handleChangeTradingType}
                        // style={{ borderColor: '#565EBF', color: '#565EBF', borderRadius: '3rem' }}
                      />
                    </Col>
                  ))}
                  {/* {subscriptionObject.tradingType ? null : <p className='error-text'>* mandatory</p>} */}
                  {/* <Col lg={3} md={3} sm={3} xs={3} style={{padding:'5px'}}>
              <Box allowed="true" isSelected={true} text={`Cash`}/>
            </Col>
            <Col lg={3} md={3} sm={3} xs={3} style={{padding:'5px'}}>
              <Box allowed="true" isSelected={false} text={`Options`}/>
            </Col>
            <Col lg={3} md={3} sm={3} xs={3} style={{padding:'5px'}}>
              <Box allowed="true" isSelected={false} text={`Future`}/>
            </Col>
            <Col lg={3} md={3} sm={3} xs={3} style={{padding:'5px'}}>
              <Box allowed="true" isSelected={false} text={`Investment`}/>
            </Col> */}
                </Row>

                <Typography
                  variant='caption'
                  style={{ fontSize: '14px', fontWeight: '500', marginTop: '2rem' }}
                  align='left'
                >
                  Choose the Trade Type
                </Typography>
                <Row>
                  {tradingTime.map((t, i) => (
                    <Col lg={3} md={3} sm={3} xs={3} style={{ padding: '1rem' }} key={i}>
                      <Box
                        allowed='true'
                        isSelected={t.isSelected}
                        text={t.text}
                        handleChange={handleChangeTradingTime}
                      />
                    </Col>
                  ))}
                  {/* {subscriptionObject.tradingTime ? null : (
                    <Col lg={12} md={12} sm={12} xs={12}>
                      <p className='error-text'>* mandatory</p>
                    </Col>
                  )} */}
                  {/* <Col lg={3} md={3} sm={3} xs={3} style={{padding:'5px'}}>
              <Box allowed="true" isSelected={true} text={`Intraday`}/>
            </Col>
            <Col lg={3} md={3} sm={3} xs={3} style={{padding:'5px'}}>
              <Box allowed="true" isSelected={false} text={`Positional`}/>
            </Col> */}
                </Row>

                {selectedType && selectedType.length > 0 ? (
                  <div>
                    <Typography
                      variant='caption'
                      style={{ fontSize: '14px', fontWeight: '500', marginTop: '2rem' }}
                      align='left'
                    >
                      Scrip
                    </Typography>
                    <Row>
                      {tradingScrip.map(t => (
                        <Col lg={3} md={3} sm={3} xs={3} style={{ padding: '1rem' }}>
                          <Box
                            allowed='true'
                            isSelected={t.isSelected}
                            text={t.text}
                            handleChange={handleChangeTradingScrip}
                          />
                        </Col>
                      ))}
                    </Row>
                    {/* {subscriptionObject.tradingScrip ? null : <p className='error-text'>* mandatory</p>} */}
                  </div>
                ) : null}

                <Typography
                  variant='caption'
                  style={{ fontSize: '14px', fontWeight: '500', marginTop: '2rem' }}
                  align='left'
                >
                  Subscription Period
                </Typography>
                <Row>
                  {tradingDuration.map(t => (
                    <div className="col" style={{ padding: '1rem' }}>
                      <Box
                        allowed='true'
                        isSelected={t.isSelected}
                        text={t.text}
                        handleChange={handleChangeTradingDuration}
                      />
                    </div>
                  ))}
                  {/* {subscriptionObject.tradingDuration ? null : <p className='error-text'>* mandatory</p>} */}
                </Row>

                <div style={{ padding: '20px', width: '50%', margin: '1rem auto' }}>
                  <Field label='Fees in (₹)' name='pricing' type='number' min='1' component={TextField} />
                  <p className='input-helper'>In rupees</p>
                </div>

                <Row style={{ display: 'flex', justifyContent: 'center', padding: '20px 0px' }}>
                  {/* {console.log('isSubmitting',isSubmitting)} */}
                  {props.loader ? (
                    <CircularProgress name='circle' color='primary' />
                  ) : (
                    <Button
                      className={classes.button}
                      disabled={shouldDisable || (props.subscriptionPlan && props.subscriptionPlan.length >= 8)}
                      onClick={submitForm}
                      style={{ backgroundColor: '#54E2B1', borderRadius: '1.5rem', marginLeft: '2rem', color: 'black' }}
                    >
                      Add Subscription
                    </Button>
                  )}
                  {props.subscriptionPlan && props.subscriptionPlan.length >= 8 && (
                    <p
                      style={{
                        fontSize: '12px',
                        color: '#f44336',
                        opacity: '0.8',
                        marginTop: '1rem',
                        paddingLeft: '3rem',
                        paddingRight: '3rem'
                      }}
                    >
                      You can Add maximum 8 subscription plan. Delete plans to add more.
                    </p>
                  )}
                </Row>
                {/* <Row style={{ display: 'flex', justifyContent: 'center', padding: '20px 0px' }}>
            <Button 
              variant="contained" 
              color="primary" 
              className={classes.button} 
              disabled={isSubmitting} 
              onClick={submitForm}
            >
              Add Subscription
            </Button>
          </Row> */}
              </Form>
            )}
          />
          {/* <TextField
              //label="IFSC Code"
              defaultValue="3500"
              className={classes.textField}
              margin="normal"
            //  type="password"
            /> */}
        

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
      </div>
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
  createSubscriptionPlan: params => dispatch(actions.createSubscriptionPlan(params)),
  // resetErrorCreateSubscription: message => dispatch(actions.resetErrorCreateSubscription(message)),
  setMessage: message => dispatch(actions.setMessage(message)),
  getSubscriptionPlanList: token => dispatch(actions.getSubscriptionPlanList(token))
});

export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionPlanCreation);
