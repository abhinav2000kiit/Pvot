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
import InfoIcon from '@material-ui/icons/Info';

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
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
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
    height: 224
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`
  }
}));

function VerticalTabs(props) {
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
    <div>

      <div style={{ padding: '10px 10px', height: '50vh' }}>
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
              <form onSubmit={handleSubmit} >

                <div className={classes.root}>
                  <Tabs
                    orientation='vertical'
                    value={value}
                    onChange={handleChange1}
                    aria-label='Vertical tabs example'
                    className={classes.tabs}
                  >
                    <Tab label='TOTAL ALLOCATION' {...a11yProps(0)} />
                  </Tabs>
                  <TabPanel value={value} index={0}>
                    <div className='row' style={{ width: '60%', border: '0.5px solid #565EBF', borderRadius: '3rem' }}>
                      <div>
                        <input
                          style={{
                            fontSize: '20px',
                            width: '30%',
                            borderBottom: '1px solid black',
                            position: 'absolute',
                            bottom: '2.5rem'
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
                          onChange={e => {
                            e.persist();
                            if (/^(\(?\+?[0-9]*\)?)?[0-9()]*$/i.test(e.target.value)) {
                              handleChange(e);
                            }
                          }}
                        />
                        {errors.portfolioAllocation && touched.portfolioAllocation}
                        <div
                          className='input-helper'
                          style={{ marginBottom: '10px', paddingRight: '12rem', position: 'absolute', bottom: '0px', width: '50%' }}
                        >
                          In rupees (10k - 49lac)
                        </div>
                        {errors.virtualCapital_number && (
                          <p style={{ color: '#f44336', fontSize: '0.75rem' }}>{errors.virtualCapital_number}</p>
                        )}
                      </div>
                    </div>
                  </TabPanel>
                </div>
              </form>
            )}
          />
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

export default connect(mapStateToProps, mapDispatchToProps)(VerticalTabs);
