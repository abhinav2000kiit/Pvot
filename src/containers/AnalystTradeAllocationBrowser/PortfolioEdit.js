import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import { connect } from 'react-redux';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { Row, Col } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
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
import InfoIcon from '@material-ui/icons/InfoOutlined';
import TotalAlloc from './totalAlloc';

const StyledTabs = withStyles({
  indicator: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    '& > span': {
      width: '100%',
      backgroundColor: '#565EBF'
    }
  }
})(props => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

const StyledTab = withStyles(theme => ({
  root: {
    textTransform: 'none',
    color: 'black',
    textAlign: 'right',
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),
    '&:focus': {
      opacity: 1
    }
  }
}))(props => <Tab disableRipple {...props} />);

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <>{children}</>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: '24rem'
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`
  }
}));

function PortfolioEdit(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange1 = (event, newValue) => {
    setValue(newValue);
  };

  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);

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
    // props.setEditpage(false);
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

  return (
    <div>
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
            3. Expert must choose at least one segment from cash, options, futures, and investment choices to allocate
            the Portfolio.
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
              //   props.history.push('/');
            }}
            color='primary'
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>

      <div className='row'>
        <div className='col-9'>
          <div style={{ fontSize: '16px', fontWeight: '500', marginBottom: '1rem' }}>
            ENTER YOUR PREFERRED ALLOCATION
          </div>
          <div style={{ padding: '10px 10px' }}>
            <div>
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
                    <Row
                      style={{
                        border: '0.5px solid #565EBF',
                        borderRadius: '2rem',
                        padding: '1rem 1rem 1rem 0.5rem',
                        width: '85%',
                        marginBottom: '3rem'
                      }}
                    >
                      <div
                        className='col-4'
                        style={{ padding: '.9rem 0rem 0rem 0rem', fontSize: '15px', fontWeight: '500' }}
                      >
                        TOTAL ALLOCATION{' '}
                      </div>
                      <div className='col-8'>
                        <input
                          style={{
                            width: '100%',
                            paddingRight: '1rem',
                            borderBottom: '0.5px solid #757575',
                            fontSize: '16px'
                          }}
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
                          placeholder='₹ | Total Allocation Amount'
                          value={values.portfolioAllocation === 0 ? null : values.portfolioAllocation}
                          onChange={e => {
                            e.persist();
                            if (/^(\(?\+?[0-9]*\)?)?[0-9()]*$/i.test(e.target.value)) {
                              handleChange(e);
                            }
                          }}
                        />
                        {errors.portfolioAllocation && touched.portfolioAllocation}
                        <div className='input-helper'>In rupees (10k - 49lac)</div>
                        {errors.virtualCapital_number && (
                          <p style={{ color: '#f44336', fontSize: '0.75rem' }}>{errors.virtualCapital_number}</p>
                        )}
                      </div>
                    </Row>
                    <div className={classes.root}>
                      <StyledTabs
                        orientation='vertical'
                        variant='scrollable'
                        value={value}
                        onChange={handleChange1}
                        aria-label='Vertical tabs example'
                        className={classes.tabs}
                      >
                        <StyledTab
                          label='TECHNICAL'
                          style={{
                            color: value === 0 ? '#565EBF' : '#212121',
                            textTransform: 'none'
                          }}
                          {...a11yProps(0)}
                        />
                        <StyledTab
                          label='FUNDAMENTAL'
                          style={{
                            color: value === 1 ? '#565EBF' : '#212121',
                            textTransform: 'none'
                          }}
                          {...a11yProps(1)}
                        />
                      </StyledTabs>
                      <TabPanel style={{ width: '75%' }} value={value} index={0}>
                        <Row style={{ marginBottom: '0.5rem', padding: '0px 7rem 0px 4rem' }}>
                          <input
                            style={{ width: '100%', borderBottom: '0.5px solid #757575', fontSize: '16px' }}
                            name='technicalAllocation'
                            helperText={touched.technicalAllocation ? errors.technicalAllocation : ''}
                            error={Boolean(errors.technicalAllocation)}
                            label='Technical Allocation'
                            type='number'
                            value={values.technicalAllocation === 0 ? null : values.technicalAllocation}
                            placeholder='₹ | Total Technical Allocation Amount'
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
                        <Row style={{ marginBottom: '0.5rem', padding: '0px 7rem 0px 4rem' }}>
                          <input
                            style={{ width: '100%', borderBottom: '0.5px solid #757575', fontSize: '16px' }}
                            name='cash'
                            type='number'
                            helperText={touched.cash ? errors.cash : ''}
                            error={Boolean(errors.cash)}
                            label='Cash Allocation'
                            value={values.cash === 0 ? null : values.cash}
                            placeholder='₹ | Cash Allocation Amount'
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
                        <Row style={{ marginBottom: '0.5rem', padding: '0px 7rem 0px 4rem' }}>
                          <input
                            style={{ width: '100%', borderBottom: '0.5px solid #757575', fontSize: '16px' }}
                            name='options'
                            type='number'
                            helperText={touched.options ? errors.options : ''}
                            error={Boolean(errors.options)}
                            label='Options Allocation'
                            value={values.options === 0 ? null : values.options}
                            placeholder='₹ | Options Allocation Amount'
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
                        <Row style={{ marginBottom: '0.5rem', padding: '0px 7rem 0px 4rem' }}>
                          <input
                            style={{ width: '100%', borderBottom: '0.5px solid #757575', fontSize: '16px' }}
                            name='future'
                            type='number'
                            helperText={touched.future ? errors.future : ''}
                            error={Boolean(errors.future)}
                            label='Futures Allocation'
                            value={values.future === 0 ? null : values.future}
                            placeholder='₹ | Future Allocation Amount'
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
                      <TabPanel style={{ width: '75%' }} value={value} index={1}>
                        {/* Investment Capital or Fundamental Allocation value input field */}
                        <Row style={{ marginBottom: '0.5rem', padding: '0px 7rem 0px 4rem' }}>
                          <input
                            style={{ width: '100%', borderBottom: '0.5px solid #757575', fontSize: '16px' }}
                            name='fundamentalAllocation'
                            helperText={touched.portfolioAllocation ? errors.portfolioAllocation : ''}
                            error={Boolean(errors.portfolioAllocation) || Boolean(errors.investmentCapital_number)}
                            label='Fundamental Allocation'
                            type='number'
                            value={values.fundamentalAllocation === 0 ? null : values.fundamentalAllocation}
                            placeholder='₹ | Total Fundamental Allocation Amount'
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
                    </div>

                    <Row
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        padding: '0px 0px 0px 5rem',
                        marginTop: '-2rem'
                      }}
                    >
                      <Button
                        variant='outlined'
                        color='primary'
                        className={classes.button}
                        type='submit'
                        style={{
                          borderColor: '#54E2B1',
                          borderRadius: '1.5rem',
                          color: 'black',
                          padding: '0.5rem 4rem'
                        }}
                      >
                        CANCEL
                      </Button>
                      <Button
                        className={classes.button}
                        onClick={submitForm}
                        style={{
                          backgroundColor: '#54E2B1',
                          borderRadius: '1.5rem',
                          marginLeft: '2rem',
                          color: 'black',
                          padding: '0.5rem 4rem'
                        }}
                      >
                        SAVE
                      </Button>
                    </Row>
                  </form>
                )}
              />
            </div>
          </div>
        </div>
        <div className='col-3'>
          {/* <div style={{ position: 'absolute', right: '3rem', marginTop: '20px' }}> */}
          <div style={{ width: 'fit-content', marginTop: '0.5rem' }}>
            <Typography
              variant='caption'
              style={{
                backgroundColor: '#FFCF55',
                cursor: 'pointer',
                padding: '10px',
                borderRadius: '2rem'
              }}
              onClick={() => setOpen(true)}
            >
              <InfoIcon style={{ fontSize: '18px', position: 'relative', top: '-1.5px' }} /> &nbsp;
              <span style={{ fontSize: '11px' }}>
                <b>IMPORTANT: HOW IT WORKS</b>
              </span>
            </Typography>
            <div style={{ fontSize: '9px', textAlign: 'center', marginTop: '5px' }}>
              <span style={{ fontWeight: 'bold' }}>Note:</span>&nbsp;Please read before submitting allocation
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PortfolioEdit));
