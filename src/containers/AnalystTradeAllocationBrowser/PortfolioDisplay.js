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
import AllocatioPie from './AllocationPie';
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
    <div
      component='div'
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <>{children}</>
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
      <div>
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
                <Row>
                  <div className='col-5' style={{ padding: '0rem 1rem 0rem 1rem' }}>
                    <Row style={{ padding: '1rem 0rem 1rem 0rem' }}>
                      <div className='col'>
                        <div style={{ fontSize: '16px', fontWeight: '500' }}>YOUR PREFERRED ALLOCATION</div>
                      </div>
                    </Row>
                    <Col style={{}}>
                      <div style={{ border: '0.5px solid #707070', borderRadius: '3rem', padding: '1rem' }}>
                        <Row style={{ borderBottom: '0.5px solid #707070', padding: '1rem 0.5rem 2rem 0.5rem' }}>
                          <div className='col-6' style={{ fontSize: '16px', fontWeight: '500' }}>
                            TOTAL ALLOCATION{' '}
                          </div>
                          <div className='col-6' style={{ textAlign: 'right' }}>
                            <div style={{ fontWeight: '500' }}>₹{values.portfolioAllocation}</div>
                          </div>
                        </Row>
                        <Row style={{ padding: '2rem 0.5rem 1rem 0.5rem' }}>
                          <div className='col-6'>
                            <div style={{ fontSize: '16px', fontWeight: '500' }}>TECHNICAL</div>
                          </div>
                        </Row>
                        <Row style={{ padding: '0rem 0.5rem 1rem 0.5rem' }}>
                          <div className='col-6'>TOTAL</div>
                          <div className='col-6' style={{ textAlign: 'right' }}>
                            <div style={{ fontWeight: '500' }}>₹{values.technicalAllocation}</div>
                          </div>
                        </Row>
                        <Row style={{ padding: '0rem 0.5rem 1rem 0.5rem' }}>
                          <div className='col-6'>CASH</div>
                          <div className='col-6' style={{ textAlign: 'right' }}>
                            <div style={{ fontWeight: '500' }}>₹{values.cash}</div>
                          </div>
                        </Row>
                        <Row style={{ padding: '0rem 0.5rem 1rem 0.5rem' }}>
                          <div className='col-6'>OPTIONS </div>
                          <div className='col-6' style={{ textAlign: 'right' }}>
                            <div style={{ fontWeight: '500' }}>₹{values.options}</div>
                          </div>
                        </Row>
                        <Row style={{ padding: '0rem 0.5rem 2rem 0.5rem' }}>
                          <div className='col-6'>FUTURES</div>
                          <div className='col-6' style={{ textAlign: 'right' }}>
                            <div style={{ fontWeight: '500' }}>₹{values.future}</div>
                          </div>
                        </Row>
                        <Row style={{ borderTop: '0.5px solid #707070', padding: '2rem 0.5rem 1rem 0.5rem' }}>
                          <div className='col-6'>
                            <div style={{ fontSize: '16px', fontWeight: '500' }}>FUNDAMENTAL</div>
                          </div>
                        </Row>
                        <Row style={{ padding: '0rem 0.5rem 1rem 0.5rem' }}>
                          <div className='col-6'>TOTAL</div>
                          <div className='col-6' style={{ textAlign: 'right' }}>
                            <div style={{ fontWeight: '500' }}>₹{values.fundamentalAllocation}</div>
                          </div>
                        </Row>
                      </div>
                    </Col>
                  </div>
                  <div className='col-1'></div>
                  <div className='col-6' style={{ paddingLeft: '1rem' }}>
                    <Row style={{ padding: '1rem 0rem 1rem 0rem' }}>
                      <div className='col'>
                        <div style={{ fontSize: '16px', fontWeight: '500' }}>ALLOCATION DISTRIBUTION</div>
                      </div>
                    </Row>
                    <Col>
                      <AllocatioPie
                        values={{
                          CASH: values.cash,
                          OPTIONS: values.options,
                          FUTURES: values.future,
                          INVESTMENT: values.fundamentalAllocation
                        }}
                      />
                    </Col>
                  </div>
                </Row>
              )}
            />
          </div>
        </div>
      </div>
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
  // getAnalystPortfolio: token => dispatch(actions.getAnalystPortfolio(token)),
  setMessage: message => dispatch(actions.setMessage(message))
});

export default connect(mapStateToProps, mapDispatchToProps)(TradeAllocation);
