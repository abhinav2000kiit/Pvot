import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import { connect } from 'react-redux';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Header from '../components/Header/customHeader';
import { Row, Col } from 'react-bootstrap';
import BasicNavigator from '../components/BottomNavigator';
import { Formik } from 'formik';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import * as actions from '../../redux/actions/index';
import SwipeableViews from 'react-swipeable-views';
import Zoom from '@material-ui/core/Zoom';
import Grow from '@material-ui/core/Grow';

import './AnalystTradeAllocation.scss';

Array.prototype.sum = function(prop) {
  var total = 0;
  for (var i = 0, _len = this.length; i < _len; i++) {
    total += this[i][prop];
  }
  return total;
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component='div'
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#fff',
    marginTop: '20px'
  },
  button: {
    width: 224,
    textTransform: 'none',
    fontWeight: 'normal'
  }
}));

const TradeAllocation = props => {
  const theme = useTheme();

  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  // console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@', props);

  const handleChangeIndex = index => {
    setValue(index);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleClose2 = () => {
    console.log(JSON.stringify(allocateMyTrade));
    props.createAnalystPortfolio({
      trading_experience: allocateMyTrade.trading_experience,
      capital_required: allocateMyTrade.capital_required,
      segment_list: [...allocateMyTrade.segment_list],
      trading_capital: allocateMyTrade.trading_capital,
      investment_capital: allocateMyTrade.investment_capital
    });
    setOpen2(false);
  };
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  React.useEffect(() => {
    // if (props.signinData) {
    //   props.getAnalystPortfolio(props.signinData.token.AuthenticationResult.AccessToken);
    // }

    if (props.message) {
      //   props.setMessage(null);
      setSomeValueChanged(false);
    }
  }, [props.message]);
  const handleStateChange = (event, newValue) => {
    setValue(newValue);
  };
  const [allocateMyTrade, setAllocateMyTrade] = React.useState({
    trading_experience: props.analystDetails ? props.analystDetails.trading_experience : '',
    capital_required: '',
    segment_list: [],
    trading_capital: '',
    investment_capital: ''
  });
  const [someValueChanged, setSomeValueChanged] = React.useState(false);
  const updateValueChanged = () => {
    setSomeValueChanged(true);
  };

  const options = props.analystDetails
    ? props.analystDetails.segment_list &&
      props.analystDetails.segment_list.filter(item => item.segment.name === 'OPTIONS').length > 0
      ? props.analystDetails.segment_list.filter(item => item.segment.name === 'OPTIONS')[0].initial_allocation
      : 0
    : 0;

  // const options = props.analystPortfolio
  //   ? props.analystPortfolio.filter(item => item.segment.name === 'OPTIONS').length > 0
  //     ? props.analystPortfolio.filter(item => item.segment.name === 'OPTIONS')[0].initial_allocation
  //     : null
  //   : null;

  const future = props.analystDetails
    ? props.analystDetails.segment_list &&
      props.analystDetails.segment_list.filter(item => item.segment.name === 'FUTURES').length > 0
      ? props.analystDetails.segment_list.filter(item => item.segment.name === 'FUTURES')[0].initial_allocation
      : 0
    : 0;

  // const future = props.analystPortfolio
  //   ? props.analystPortfolio.filter(item => item.segment.name === 'FUTURES').length > 0
  //     ? props.analystPortfolio.filter(item => item.segment.name === 'FUTURES')[0].initial_allocation
  //     : null
  //   : null;

  const cash = props.analystDetails
    ? props.analystDetails.segment_list &&
      props.analystDetails.segment_list.filter(item => item.segment.name === 'EQUITY').length > 0
      ? props.analystDetails.segment_list.filter(item => item.segment.name === 'EQUITY')[0].initial_allocation
      : 0
    : 0;

  // const cash = props.analystPortfolio
  //   ? props.analystPortfolio.filter(item => item.segment.name === 'EQUITY').length > 0
  //     ? props.analystPortfolio.filter(item => item.segment.name === 'EQUITY')[0].initial_allocation
  //     : null
  //   : null;

  const fundamentalAllocation = props.analystDetails
    ? props.analystDetails.segment_list &&
      props.analystDetails.segment_list.filter(item => item.segment.name === 'INVESTMENT').length > 0
      ? props.analystDetails.segment_list.filter(item => item.segment.name === 'INVESTMENT')[0].initial_allocation
      : 0
    : 0;

  // const fundamentalAllocation = props.analystPortfolio
  //   ? props.analystPortfolio.filter(item => item.segment.name === 'INVESTMENT').length > 0
  //     ? props.analystPortfolio.filter(item => item.segment.name === 'INVESTMENT')[0].initial_allocation
  //     : null
  //   : null;

  const allocationComplete =
    props && props.analystDetails
      ? props.analystDetails.segment_list
        ? Object.keys(props.analystDetails.segment_list).length > 0
          ? true
          : false
        : false
      : false;

  return (
    <>
      <Zoom in={true} timeout={500}>
        <div>
          <Header
            someValueChanged={someValueChanged}
            title='Pvot-X'
            backButton
            backTo={() => props.history.push('/')}
          />
          <Dialog
            onClose={handleClose}
            aria-labelledby='simple-dialog-title'
            open={open}
            TransitionComponent={Grow}
            transitionDuration={500}
          >
            {/* <DialogTitle id="simple-dialog-title">Delete My Account</DialogTitle> */}
            <DialogContent>
              <p>
                <strong>Following rules apply to Portfolio allocation:</strong>
              </p>
              <p>1. Portfolio allocation = Technical Allocation + Fundamental Allocation</p>
              <p>2. Technical Allocation = Capital for Cash Allocation + Options Allocation + Futures Allocation</p>
              <p>
                3. Expert must choose at least one segment from cash, options, futures, and investment choices to
                allocate the Portfolio.
              </p>
              <p style={{ color: 'red' }}>4. Allocation once made cannot be changed for 1 year.</p>
              {/* <p>
            5. For Investment stocks purchased, the capital will be locked until at least 10% gains or loss from
            purchase price or minimum 3 months holding period
          </p> */}
            </DialogContent>
            <DialogActions style={{ display: 'flex', justifyContent: 'center' }}>
              <Button onClick={handleClose} className='bg-primary text-white'>
                Okay
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog onClose={handleClose2} aria-labelledby='simple-dialog-title' open={open2}>
            {/* <DialogTitle id="simple-dialog-title">Delete My Account</DialogTitle> */}
            <DialogTitle>
              {/* Are you sure? You cannot change this till {new Date().getDate()}/{new Date().getMonth() + 1}/
          {new Date().getFullYear() + 1} */}
              Are you sure? You can not change this later.
            </DialogTitle>
            <DialogActions>
              <Button onClick={() => setOpen2(false)} color='primary'>
                Cancel
              </Button>
              <Button onClick={handleClose2} color='primary'>
                Yes
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog onClose={() => props.setMessage(null)} aria-labelledby='simple-dialog-title' open={props.message}>
            {/* <DialogTitle id="simple-dialog-title">Delete My Account</DialogTitle> */}
            <DialogTitle>{props.message}</DialogTitle>
            <DialogActions>
              <Button
                onClick={() => {
                  props.setMessage(null);
                  props.history.push('/analyst-home');
                }}
                color='primary'
              >
                Ok
              </Button>
            </DialogActions>
          </Dialog>
          <div style={{ textAlign: 'right', marginTop: '20px' }}>
            <Typography
              variant='caption'
              style={{
                color: 'rgb(41, 98, 255)',
                cursor: 'pointer',
                marginRight: '20px',
                padding: '5px',
                border: open === true ? '' : '1px dotted red'
              }}
              onClick={() => setOpen(true)}
            >
              How it works
            </Typography>
          </div>
          <div style={{ padding: '10px 10px' }}>
            <div className={classes.root}>
              <Formik
                initialValues={{
                  options: options,
                  future: future,
                  cash: cash,
                  fundamentalAllocation: fundamentalAllocation,
                  technicalAllocation: options + future + cash,
                  portfolioAllocation: options + future + cash + fundamentalAllocation
                }}
                validate={values => {
                  const errors = {};

                  if (!values.technicalAllocation && values.technicalAllocation !== 0) {
                    errors.technicalAllocation = 'Enter trading capital value';
                  } else if (!/^(\(?\+?[0-9]*\)?)?[0-9_\\(\)]*$/i.test(values.technicalAllocation)) {
                    errors.tradingCapital_number = 'Please enter numbers only';
                  }
                  if (!values.cash && values.cash !== 0) {
                    errors.cash = 'Enter cash value';
                  } else if (!/^(\(?\+?[0-9]*\)?)?[0-9_\- \(\)]*$/i.test(values.cash)) {
                    errors.cash = 'Please enter numbers only';
                  }
                  // if (!values.options && values.options !== 0) {
                  //   errors.options = 'Enter options value';
                  // } else
                  if (!/^(\(?\+?[0-9]*\)?)?[0-9_\- \(\)]*$/i.test(values.options)) {
                    errors.options = 'Please enter numbers only';
                  } else if (values.options !== 0 && values.options < 100000) {
                    errors.options = 'At least 1lac';
                  }

                  // if (!(values.future >= 0)) {
                  //   errors.future = 'Repeat future value';
                  // } else
                  if (!/^(\(?\+?[0-9]*\)?)?[0-9_\- \(\)]*$/i.test(values.future)) {
                    errors.future = 'Please enter numbers only';
                  } else if (values.future !== 0 && values.future < 200000) {
                    errors.future = 'At least 2lac';
                  }
                  if (
                    values.fundamentalAllocation &&
                    !/^(\(?\+?[0-9]*\)?)?[0-9_\\(\)]*$/i.test(values.fundamentalAllocation)
                  ) {
                    errors.investmentCapital_number = 'Please enter numbers only';
                  }
                  //console.log((values.fundamentalAllocation + values.technicalAllocation)===values.portfolioAllocation)
                  if (values.fundamentalAllocation + values.technicalAllocation !== values.portfolioAllocation) {
                    errors.portfolioAllocation = "Technical Allocation doesn't add up";
                  }
                  if (values.cash + values.options + values.future !== values.technicalAllocation) {
                    errors.technicalAllocation = "Technical Allocation doesn't add up";
                  }
                  if (values.portfolioAllocation && !/^(\(?\+?[0-9]*\)?)?[0-9()]*$/i.test(values.portfolioAllocation)) {
                    errors.virtualCapital_number = 'Please enter numbers only';
                  }
                  if (values.portfolioAllocation > 4900000 || values.portfolioAllocation < 10000) {
                    errors.portfolioAllocation = 'You can only enter amount between 10,000 to 49,00,000';
                    errors.technicalAllocation = '!';
                  }
                  return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                  setSubmitting(false);
                  // let submitData = {
                  //   ifscCode: values.password,
                  //   accountNumber: values.confirm
                  // }
                  const cash = values.cash ? values.cash : 0;
                  const future = values.future ? values.future : 0;
                  const options = values.options ? values.options : 0;
                  const fundamentalAllocation = values.fundamentalAllocation ? values.fundamentalAllocation : 0;
                  setOpen2(true);
                  console.log('capital: ', values.technicalAllocation);
                  console.log('cash: ', values.cash);
                  console.log('options: ', values.options);
                  console.log('future: ', values.future);
                  setAllocateMyTrade({
                    ...allocateMyTrade,
                    capital_required: values.portfolioAllocation,
                    segment_list: [
                      { name: 'EQUITY', balance_allocation: cash },
                      { name: 'FUTURES', balance_allocation: future },
                      { name: 'OPTIONS', balance_allocation: options },
                      { name: 'INVESTMENT', balance_allocation: fundamentalAllocation }
                    ],
                    trading_capital: values.technicalAllocation,
                    investment_capital: fundamentalAllocation
                  });
                }}
                render={({
                  submitForm,
                  isSubmitting,
                  errors,
                  touched,
                  handleChange,
                  values,
                  handleSubmit,
                  setFieldValue
                }) => (
                  <form onSubmit={handleSubmit}>
                    {/* Virtual Capital or Portfolio Allocation value input field */}
                    <TextField
                      name='portfolioAllocation'
                      helperText={touched.portfolioAllocation ? errors.portfolioAllocation : ''}
                      error={Boolean(errors.portfolioAllocation)}
                      label={
                        errors.portfolioAllocation ? (
                          <Row>
                            <span>Portfolio Allocation</span>
                            <span
                              style={{
                                color: '#0080ff',
                                fontSize: '1.8rem',
                                position: 'relative',
                                top: '-18px',
                                left: '2px'
                              }}
                            >
                              !
                            </span>
                          </Row>
                        ) : (
                          <span>Portfolio Allocation</span>
                        )
                      }
                      type='number'
                      disabled={allocationComplete}
                      value={values.portfolioAllocation === 0 ? null : values.portfolioAllocation}
                      onChange={e => {
                        e.persist();
                        if (/^(\(?\+?[0-9]*\)?)?[0-9()]*$/i.test(e.target.value)) {
                          handleChange(e);
                        }
                      }}
                    />
                    {errors.portfolioAllocation && touched.portfolioAllocation}
                    <p className='input-helper' style={{ marginBottom: '20px' }}>
                      In rupees (10k - 49lac)
                    </p>
                    {errors.virtualCapital_number && (
                      <p style={{ color: '#f44336', fontSize: '0.75rem' }}>{errors.virtualCapital_number}</p>
                    )}
                    <AppBar position='static' style={{ backgroundColor: '#fff', color: 'gray', boxShadow: 'none' }}>
                      <Tabs
                        value={value}
                        indicatorColor='none'
                        onChange={handleStateChange}
                        variant='fullWidth'
                        aria-label='simple tabs example'
                      >
                        {/* Trading Capital or Technical Allocation tab heading */}
                        <Tab
                          label={
                            errors.technicalAllocation || errors.tradingCapital_number ? (
                              <Row>
                                <span className='tabHeading'>Technical Allocation</span>
                                <span
                                  style={{
                                    color: '#0080ff',
                                    fontSize: '1.3rem',
                                    position: 'relative',
                                    top: '-15px',
                                    left: '2px'
                                  }}
                                >
                                  !
                                </span>
                              </Row>
                            ) : (
                              <span className='tabHeading'>Technical Allocation</span>
                            )
                          }
                          {...a11yProps(0)}
                          style={{
                            color: value === 0 ? '#2962ff' : '',
                            textTransform: 'none',
                            borderTop: value === 0 ? '1px solid #cdcdcd' : '',
                            borderLeft: value === 0 ? '1px solid #cdcdcd' : '',
                            borderRight: value === 0 ? '1px solid #cdcdcd' : '',
                            borderBottom: value !== 0 ? '1px solid #cdcdcd' : ''
                          }}
                        />
                        {/* Investment Capital or Fundamental Allocation tab name */}
                        <Tab
                          label={
                            errors.portfolioAllocation || errors.investmentCapital_number ? (
                              <Row>
                                <span className='tabHeading'>Fundamental Allocation</span>
                                <span
                                  style={{
                                    color: '#0080ff',
                                    fontSize: '1.3rem',
                                    position: 'relative',
                                    top: '-15px',
                                    left: '2px'
                                  }}
                                >
                                  !
                                </span>
                              </Row>
                            ) : (
                              <span className='tabHeading'>Fundamental Allocation</span>
                            )
                          }
                          {...a11yProps(1)}
                          style={{
                            color: value === 1 ? '#2962ff' : '',
                            textTransform: 'none',
                            borderTop: value === 1 ? '1px solid #cdcdcd' : '',
                            borderLeft: value === 1 ? '1px solid #cdcdcd' : '',
                            borderRight: value === 1 ? '1px solid #cdcdcd' : '',
                            borderBottom: value !== 1 ? '1px solid #cdcdcd' : ''
                          }}
                        />
                      </Tabs>
                    </AppBar>
                    <SwipeableViews
                      axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                      index={value}
                      onChangeIndex={handleChangeIndex}
                    >
                      <TabPanel value={value} index={0}>
                        {/* Trading Capital or Technical Allocation value input field */}
                        <Row style={{ marginTop: '20px' }}>
                          <TextField
                            name='technicalAllocation'
                            helperText={touched.technicalAllocation ? errors.technicalAllocation : ''}
                            error={Boolean(errors.technicalAllocation)}
                            label='Technical Allocation'
                            type='number'
                            value={values.technicalAllocation === 0 ? null : values.technicalAllocation}
                            disabled={allocationComplete}
                            onChange={e => {
                              e.persist();
                              console.log('check', e.target.value);
                              if (/^(\(?\+?[0-9]*\)?)?[0-9()]*$/.test(e.target.value)) {
                                handleChange(e);
                              }
                            }}
                            //fullWidth
                          />
                          {errors.technicalAllocation && touched.technicalAllocation}
                          <p className='input-helper'>In rupees</p>
                          {errors.tradingCapital_number && (
                            <p style={{ color: '#f44336', fontSize: '0.75rem' }}>{errors.tradingCapital_number}</p>
                          )}
                        </Row>
                        {/* Cash allocaton value input field */}
                        <Row style={{ marginTop: '20px' }}>
                          <TextField
                            name='cash'
                            type='number'
                            helperText={touched.cash ? errors.cash : ''}
                            error={Boolean(errors.cash)}
                            label='Cash Allocation'
                            value={values.cash === 0 ? null : values.cash}
                            disabled={allocationComplete}
                            onChange={e => {
                              e.persist();
                              if (/^(\(?\+?[0-9]*\)?)?[0-9()]*$/i.test(e.target.value)) {
                                handleChange(e);
                                updateValueChanged();
                              }
                            }}
                            //fullWidth
                          />
                          {errors.cash && touched.cash}
                          <p className='input-helper'>In rupees</p>
                        </Row>
                        {/* Options Allocation value input field */}
                        <Row style={{ marginTop: '20px' }}>
                          <TextField
                            name='options'
                            type='number'
                            helperText={touched.options ? errors.options : ''}
                            error={Boolean(errors.options)}
                            label='Options Allocation'
                            value={values.options === 0 ? null : values.options}
                            disabled={allocationComplete}
                            onChange={e => {
                              e.persist();
                              if (/^(\(?\+?[0-9]*\)?)?[0-9()]*$/i.test(e.target.value)) {
                                handleChange(e);
                                updateValueChanged();
                              }
                            }}
                            //fullWidth
                          />
                          {errors.options && touched.options}
                          <p className='input-helper'>In rupees (Minimum 1lac)</p>
                        </Row>
                        {/* Futures Allocation value input field */}
                        <Row style={{ marginTop: '20px' }}>
                          <TextField
                            name='future'
                            type='number'
                            helperText={touched.future ? errors.future : ''}
                            error={Boolean(errors.future)}
                            label='Futures Allocation'
                            value={values.future === 0 ? null : values.future}
                            disabled={allocationComplete}
                            onChange={e => {
                              e.persist();
                              if (/^(\(?\+?[0-9]*\)?)?[0-9()]*$/i.test(e.target.value)) {
                                handleChange(e);
                                updateValueChanged();
                              }
                            }}
                            //fullWidth
                          />
                          {errors.future && touched.future}
                          <p className='input-helper'>In rupees (Minimum 2lac)</p>
                        </Row>
                      </TabPanel>
                      <TabPanel value={value} index={1}>
                        {/* Investment Capital or Fundamental Allocation value input field */}
                        <Row style={{ marginTop: '20px' }}>
                          <TextField
                            name='fundamentalAllocation'
                            helperText={touched.portfolioAllocation ? errors.portfolioAllocation : ''}
                            error={Boolean(errors.portfolioAllocation) || Boolean(errors.investmentCapital_number)}
                            label='Fundamental Allocation'
                            type='number'
                            value={values.fundamentalAllocation === 0 ? null : values.fundamentalAllocation}
                            disabled={allocationComplete}
                            onChange={e => {
                              e.persist();
                              if (/^(\(?\+?[0-9]*\)?)?[0-9()]*$/i.test(e.target.value)) {
                                handleChange(e);
                                updateValueChanged();
                              }
                            }}
                            //fullWidth
                          />
                          {errors.portfolioAllocation && touched.portfolioAllocation}
                          <p className='input-helper'>In rupees</p>
                          {errors.investmentCapital_number && (
                            <p style={{ color: '#f44336', fontSize: '0.75rem' }}>{errors.investmentCapital_number}</p>
                          )}
                        </Row>
                      </TabPanel>
                    </SwipeableViews>
                    <Row
                      style={{ display: 'flex', justifyContent: 'center', padding: '20px 0px', marginBottom: '50px' }}
                    >
                      {allocationComplete ? (
                        <>
                          <button type='button' className='btn disabledSubmitButton'>
                            Submit
                          </button>
                        </>
                      ) : (
                        <>
                          <Button
                            variant='contained'
                            color='primary'
                            type='submit'
                            disabled={isSubmitting}
                            className={classes.button}
                          >
                            Submit
                          </Button>
                          {touched.portfolioAllocation && (
                            <p style={{ color: '#f44336', fontSize: '0.75rem', marginTop: '20px' }}>
                              {errors.portfolioAllocation}
                            </p>
                          )}
                        </>
                      )}
                    </Row>
                  </form>
                )}
              />
            </div>
          </div>
        </div>
      </Zoom>
      <BasicNavigator />
    </>
  );
};

const mapStateToProps = state => ({
  analystDetails: state.analyst.analystDetails,
  message: state.auth.message,
  // analystPortfolio: state.analyst.analystPortfolio,
  signinData: state.auth.signinData
});

const mapDispatchToProps = dispatch => ({
  createAnalystPortfolio: payload => dispatch(actions.createAnalystPortfolio(payload)),
  // getAnalystPortfolio: token => dispatch(actions.getAnalystPortfolio(token)),
  setMessage: message => dispatch(actions.setMessage(message))
});

export default connect(mapStateToProps, mapDispatchToProps)(TradeAllocation);
