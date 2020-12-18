import React from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import TextField from '@material-ui/core/TextField';
import Header from '../components/Header/customHeader';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
import FormControl from '@material-ui/core/FormControl';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import BasicNavigator from '../components/BottomNavigator';
import { Typography } from '@material-ui/core';
import Box from '../components/Box';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { Chart } from 'react-google-charts';
import * as actions from '../../redux/actions/index';
import { connect } from 'react-redux';
import Slider from '@material-ui/core/Slider';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import CircularProgress from '@material-ui/core/CircularProgress';
import '../AnalystHomeSection/AnalystHomeSection.scss';
import PropTypes from 'prop-types';
import deburr from 'lodash/deburr';
import Downshift from 'downshift';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import AutoSuggest from '../AnalystHomeSection/AutoSuggest';
import CloseIcon from '@material-ui/icons/Close';
import { withRouter } from 'react-router-dom';
import './Trades.scss';
import Grow from '@material-ui/core/Grow';
import Zoom from '@material-ui/core/Zoom';
import Loading from '../Loading/Loading';

import { Mixpanel } from '../../shared/mixPanel';

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
  textField: {},
  button: {
    width: 224,
    textTransform: 'none',
    fontWeight: 'normal'
  },
  overrides: {
    MuiInputLabel: {
      root: {
        color: 'red',
        fontSize: 13
      }
    }
  }
}));

function renderInput(inputProps) {
  const { InputProps, classes, ref, ...other } = inputProps;
  // console.log(`inputProps: `, inputProps);
  return (
    <TextField
      InputProps={{
        inputRef: ref,
        classes: {
          root: classes.inputRoot,
          input: classes.inputInput
        },
        ...InputProps
      }}
      label={<span className='scripNameLabel'>Scrip Name</span>}
      InputLabelProps={{ shrink: 'true' }}
      {...other}
    />
  );
}

renderInput.propTypes = {
  classes: PropTypes.object.isRequired,
  InputProps: PropTypes.object
};

function renderSuggestion(suggestionProps) {
  const { suggestion, index, itemProps, highlightedIndex, selectedItem } = suggestionProps;
  const isHighlighted = highlightedIndex === index;
  const isSelected = (selectedItem || '').indexOf(suggestion.trading_symbol) > -1;
  console.log(`suggestionProps --> `, suggestionProps);
  return (
    <MenuItem
      {...itemProps}
      key={suggestion.instrument_token}
      selected={isHighlighted}
      component='div'
      style={{
        fontWeight: isSelected ? 500 : 400
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
        <span className='small'>{suggestion.name}</span>
        {suggestion.CMP ? <span style={{ color: 'red', fontSize: '10px' }}>₹{suggestion.CMP}</span> : null}
      </div>
    </MenuItem>
  );
}

renderSuggestion.propTypes = {
  highlightedIndex: PropTypes.oneOfType([PropTypes.oneOf([null]), PropTypes.number]).isRequired,
  index: PropTypes.number.isRequired,
  itemProps: PropTypes.object.isRequired,
  selectedItem: PropTypes.string.isRequired,
  suggestion: PropTypes.shape({
    label: PropTypes.string.isRequired
  }).isRequired
};

function getSuggestions(value, suggestions, { showEmpty = false } = {}) {
  const inputValue = deburr(value.trim()).toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;

  console.log(`sss`, suggestions, inputLength, inputValue);

  return inputLength === 0 && !showEmpty
    ? []
    : suggestions !== null &&
        suggestions.filter(suggestion => {
          const keep = suggestion.trading_symbol.toLowerCase();

          if (keep) {
            count += 1;
          }

          console.log(keep);
          return keep;
        });
}

function valuetext(value) {
  //console.log('value',value)
  return `${value}%`;
}

const Trades = props => {
  const classes = useStyles();
  let { message, availableTradeBalance, tradeList, analystDetails, signinData, subscriptionPlan } = props;
  const [openDialog, setOpenDialog] = React.useState(false);
  const [profileErrorMessage, setProfileErrorMessage] = React.useState('');
  const [virtualCapitalError, setVirtualCapitalError] = React.useState(false);
  const [valueError, setValueError] = React.useState('');
  const [valueErrorMessage, setValueErrorMessage] = React.useState(false);

  // React.useEffect(() => {
  //   if (message !== null && tradeList !== null) {
  //     setOpenDialog(true);
  //   }
  // }, [message]);
  React.useEffect(() => {
    Mixpanel.track('add trade page visited');

    const signinDataName =
      signinData && signinData.user && signinData.user.UserAttributes.filter(item => item.Name === 'name').length > 0
        ? signinData.user.UserAttributes.filter(item => item.Name === 'name')[0].Value === ' '
          ? null
          : signinData.user.UserAttributes.filter(item => item.Name === 'name')[0].Value
        : null;

    const signinDataEmail =
      signinData && signinData.user && signinData.user.UserAttributes.filter(item => item.Name === 'email').length > 0
        ? signinData.user.UserAttributes.filter(item => item.Name === 'email')[0].Value === ' '
          ? null
          : signinData.user.UserAttributes.filter(item => item.Name === 'email')[0].Value
        : null;

    const tradingExp = analystDetails && analystDetails.trading_experience >= 0;

    const education = analystDetails && analystDetails.education;

    const allocationComplete = analystDetails
      ? analystDetails.segment_list
        ? Object.keys(analystDetails.segment_list).length > 0
          ? true
          : false
        : false
      : false;

    const subscriptionComplete = subscriptionPlan && (subscriptionPlan.length > 0 ? true : false);

    if (signinDataName && tradingExp && education && !allocationComplete && !subscriptionComplete) {
      setProfileErrorMessage(
        'Please provide us your Portfolio Allocation and Subscription Plans before posting a new trade'
      );
      setVirtualCapitalError(true);
    } else if (signinDataName && tradingExp && education && allocationComplete && !subscriptionComplete) {
      setProfileErrorMessage('Please provide us at least one Subscription Plan before posting a new trade');
      setVirtualCapitalError(true);
    } else if (signinDataName && tradingExp && education && !allocationComplete && subscriptionComplete) {
      setProfileErrorMessage('Please provide us your Portfolio Allocation before posting a new trade');
      setVirtualCapitalError(true);
    } else if ((!signinDataName || !tradingExp || !education) && allocationComplete && subscriptionComplete) {
      setProfileErrorMessage('Please complete your Profile before posting a new trade');
      setVirtualCapitalError(true);
    } else if (!(signinDataName && tradingExp && education) && allocationComplete && !subscriptionComplete) {
      setProfileErrorMessage('Please complete your Profile and Subscription Plan before posting a new trade');
      setVirtualCapitalError(true);
    } else if (subscriptionComplete && !(signinDataName && tradingExp && education) && !allocationComplete) {
      setProfileErrorMessage('Please complete your Profile and Trade Allocation before posting a new trade');
      setVirtualCapitalError(true);
    } else if (!subscriptionComplete && !(signinDataName && tradingExp && education) && !allocationComplete) {
      setProfileErrorMessage('Please complete your details before posting a new trade');
      setVirtualCapitalError(true);
    } else if (message !== null && tradeList !== null) {
      setOpenDialog(true);
    }
  }, [message, tradeList, signinData, analystDetails, subscriptionPlan]);

  React.useEffect(() => {
    props.clearInstrumentTokens();
    return () => {
      props.setTradeItem();
    };
  }, []);

  const [confidenceLevel, setConfidenceLevel] = React.useState(40);
  const [virtualTradeObject, setVirtualTradeObject] = React.useState({
    tradeType: props.tradeItem ? props.tradeItem.segment.name : null,
    duration: props.tradeItem ? props.tradeItem.trade_type : null,
    transactionType: props.tradeItem ? props.tradeItem.order_type : null,
    // subSegment: props.tradeItem ? props.tradeItem.sub_segment : null,
    complexity: props.tradeItem ? props.tradeItem.complexity : null,
    status: props.tradeItem ? props.tradeItem.status : null
    // tradingScrip: null
  });

  const [shouldDisable, setShouldDisable] = React.useState(true);
  const [transactionType, setTransactionType] = React.useState();
  const checkError = () => {
    if (virtualTradeObject.tradeType && virtualTradeObject.duration && virtualTradeObject.transactionType) {
      setShouldDisable(false);
    } else {
      setShouldDisable(true);
    }
  };
  React.useEffect(() => {
    checkError();
  }, [virtualTradeObject]);

  const handleSlider = (e, v) => {
    //console.log('e.target.value:',e,v)
    setConfidenceLevel(v);
  };
  React.useState(() => {
    props.getAvailableTradeBalance();
    return () => {
      props.setMessage(null);
    };
  }, []);

  const [tradeType, setTradeType] = React.useState([
    {
      id: 0,
      text: 'Cash',
      isSelected: props.tradeItem ? props.tradeItem.segment.name === 'EQUITY' : false,
      value: 'EQUITY',
      allowed: props.tradeItem ? (props.tradeItem.segment.name === 'EQUITY' ? true : false) : true
    },
    {
      id: 1,
      text: 'Options',
      isSelected: props.tradeItem ? props.tradeItem.segment.name === 'OPTIONS' : false,
      value: 'OPTIONS',
      allowed: props.tradeItem ? (props.tradeItem.segment.name === 'OPTIONS' ? true : false) : true
    },
    {
      id: 2,
      text: 'Futures',
      isSelected: props.tradeItem ? props.tradeItem.segment.name === 'FUTURES' : false,
      value: 'FUTURES',
      allowed: props.tradeItem ? (props.tradeItem.segment.name === 'FUTURES' ? true : false) : true
    },
    {
      id: 3,
      text: 'Investment',
      isSelected: props.tradeItem ? props.tradeItem.segment.name === 'INVESTMENT' : false,
      value: 'INVESTMENT',
      allowed: props.tradeItem ? (props.tradeItem.segment.name === 'INVESTMENT' ? true : false) : true
    }
  ]);

  const [duration, setDuration] = React.useState([
    {
      text: 'Intraday',
      isSelected: props.tradeItem ? props.tradeItem.trade_type === 'INTRADAY' : false,
      allowed: props.tradeItem ? (props.tradeItem.trade_type === 'INTRADAY' ? true : false) : true
    },
    {
      text: 'Positional',
      isSelected: props.tradeItem ? props.tradeItem.trade_type === 'POSITIONAL' : false,
      allowed: props.tradeItem ? (props.tradeItem.trade_type === 'POSITIONAL' ? true : false) : true
    }
  ]);

  const [tradingScrip, setTradingScrip] = React.useState([
    { text: 'NIFTY', isSelected: false },
    { text: 'BANK NIFTY', isSelected: false },
    { text: 'EQUITY', isSelected: false }
  ]);

  const [complexity, setComplexity] = React.useState([
    {
      text: 'RGLR',
      allowed: props.tradeItem ? (props.tradeItem.complexity === 'RGLR' ? true : false) : true,
      isSelected: props.tradeItem ? props.tradeItem.complexity === 'RGLR' : false
    },
    {
      text: 'AMO',
      allowed: props.tradeItem ? (props.tradeItem.complexity === 'AMO' ? true : false) : true,
      isSelected: props.tradeItem ? props.tradeItem.complexity === 'AMO' : false
    },
    {
      text: 'BO',
      allowed: props.tradeItem ? (props.tradeItem.complexity === 'BO' ? true : false) : true,
      isSelected: props.tradeItem ? props.tradeItem.complexity === 'BO' : false
    },
    {
      text: 'CO',
      allowed: props.tradeItem ? (props.tradeItem.complexity === 'CO' ? true : false) : true,
      isSelected: props.tradeItem ? props.tradeItem.complexity === 'CO' : false
    }
  ]);

  const [stockSelected, setStockSelected] = React.useState(
    props.tradeItem ? props.tradeItem.instrument.trading_symbol : null
  );
  const [lotSize, setLotSize] = React.useState(null);

  const handleBuyClick = () => {
    // console.log('Buy Clicked');
    setTransactionType('Buy');
  };

  const handleSellClick = () => {
    // console.log('Sell Clicked');
    setTransactionType('Sell');
  };

  const handleChangeTradingType = text => {
    let newArr = tradeType;
    newArr = newArr.map(item => {
      if (item.text === text) {
        setVirtualTradeObject({ ...virtualTradeObject, tradeType: text });
        return { ...item, isSelected: true };
      } else {
        return { ...item, isSelected: false };
      }
    });
    setStockSelected(null);
    setTradeType(newArr);
    console.log(`TEXT_SELECTED: `, text.toUpperCase());

    // Disable Intraday for Investment
    if (text === 'Investment') {
      setDuration([
        {
          text: 'Intraday',
          isSelected: props.tradeItem ? props.tradeItem.trade_type === 'INTRADAY' : false,
          allowed: false
        },
        {
          text: 'Positional',
          isSelected: props.tradeItem ? props.tradeItem.trade_type === 'POSITIONAL' : false,
          allowed: true
        }
      ]);
      // setVirtualTradeObject({ ...virtualTradeObject, tradeType: text, duration: null });
    } else {
      setDuration([
        {
          text: 'Intraday',
          isSelected: props.tradeItem ? props.tradeItem.trade_type === 'INTRADAY' : false,
          allowed: true
        },
        {
          text: 'Positional',
          isSelected: props.tradeItem ? props.tradeItem.trade_type === 'POSITIONAL' : false,
          allowed: true
        }
      ]);
    }
  };

  const handleComplexity = text => {
    let newArr = complexity;
    newArr = newArr.map(item => {
      if (item.text === text) {
        setVirtualTradeObject({ ...virtualTradeObject, complexity: text });
        return { ...item, isSelected: true };
      } else {
        return { ...item, isSelected: false };
      }
    });
    setComplexity(newArr);
  };

  const handleChangeDuration = text => {
    let newArr = duration;
    newArr = newArr.map(item => {
      if (item.text === text) {
        setVirtualTradeObject({ ...virtualTradeObject, duration: text });
        return { ...item, isSelected: true };
      } else {
        return { ...item, isSelected: false };
      }
    });
    setDuration(newArr);

    if (text === 'Positional') {
      setComplexity([
        { text: 'RGLR', allowed: true },
        { text: 'AMO', allowed: true },
        { text: 'BO', allowed: false },
        { text: 'CO', allowed: false }
      ]);
    } else if (text === 'Intraday') {
      setComplexity([
        { text: 'RGLR', allowed: true },
        { text: 'AMO', allowed: true },
        { text: 'BO', allowed: true },
        { text: 'CO', allowed: true }
      ]);
    }
  };

  const handleChangeTradingScrip = text => {
    let newArr = tradingScrip;
    newArr = newArr.map(item => {
      if (item.text === text) {
        setVirtualTradeObject({ ...virtualTradeObject, tradingScrip: text });
        return { ...item, isSelected: true };
      } else {
        return { ...item, isSelected: false };
      }
    });
    setTradingScrip(newArr);
  };
  let selectedType = tradeType.filter(x => x.id === 1 || x.id === 2);
  selectedType = selectedType.filter(x => x.isSelected === true);

  // console.log('selectedType...', selectedType, stockSelected);
  const fetchFromAPI = (e, clearSelection) => {
    console.log(`e`, e.target.value, clearSelection);
    clearSelection();
    let segment = null;
    if (tradeType.filter(s => s.isSelected === true).length > 0) {
      segment = tradeType.filter(s => s.isSelected === true)[0].text.toUpperCase();
      if (segment === 'CASH') {
        segment = 'EQUITY';
      }
      if (segment === 'INVESTMENT') {
        segment = 'INVESTMENT';
      }
      console.log(`segment:`, segment);
    }
    if (e.target.value.length > 2 && segment) {
      props.fetchIntrumentTokens({
        payload: { segment, trading_symbol: e.target.value }
      });
    }
  };

  // const shouldAdd = () => {
  //   const data = props.tradeList;
  //   // console.log(data);
  //   if (
  //     virtualTradeObject.tradeType === 'Investment' &&
  //     props.tradeList &&
  //     props.tradeList.filter(item => item.sub_segment === 'INVESTMENT' && item.status === 'OPEN').length >= 5
  //   ) {
  //     return true;
  //   } else if (
  //     virtualTradeObject.tradeType &&
  //     props.tradeList &&
  //     props.tradeList.filter(item => item.sub_segment !== 'INVESTMENT' && item.status === 'OPEN').length >= 15
  //   ) {
  //     return true;
  //   }
  //   return false;
  // };
  const dataOfBalance = [['', 'Balance', { role: 'style' }]];
  availableTradeBalance &&
    availableTradeBalance.map(item => {
      dataOfBalance.push([
        item.segment.name === 'EQUITY' ? 'CASH' : item.segment.name,
        item.balance,
        `color: ${
          item.segment.name === 'OPTIONS'
            ? '#419488'
            : item.segment.name === 'FUTURES'
            ? '#e25241'
            : item.segment.name === 'EQUITY'
            ? '#ffc107'
            : '#00bcd4'
        }`
      ]);
    });

  console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@', props, virtualTradeObject);

  return (
    <Zoom in={true} timeout={200}>
      <div>
        <div>
          <div style={{ padding: '1rem' }}>
            <Formik
              initialValues={{
                stock: props.tradeItem ? props.tradeItem.instrument.trading_symbol : '',
                orderPrice: props.tradeItem ? props.tradeItem.price : '',
                targetPrice: props.tradeItem ? props.tradeItem.target : '',
                orderQuantity: props.tradeItem ? props.tradeItem.quantity : '',
                stopLoss: props.tradeItem ? props.tradeItem.stop_loss : ''
              }}
              validate={values => {
                const errors = {};
                if (!values.orderPrice) {
                  errors.orderPrice = 'Required';
                }
                if (values.orderPrice <= 0) {
                  errors.orderPrice = 'Should be greater than zero';
                }
                if (values.targetPrice === '' || values.targetPrice === null) {
                  errors.targetPrice = 'Required';
                }
                if (values.targetPrice <= 0) {
                  if (values.targetPrice === 0) {
                    if (
                      !(
                        virtualTradeObject.tradeType === 'Options' &&
                        virtualTradeObject.transactionType === 'Buy' &&
                        (virtualTradeObject.duration === 'Intraday' || virtualTradeObject.duration === 'Positional')
                      )
                    ) {
                      errors.targetPrice = 'Should be greater than zero';
                    }
                  } else {
                    errors.targetPrice = `Can't be negative`;
                  }
                }
                if (!values.orderQuantity) {
                  errors.orderQuantity = 'Required';
                }
                if (!Number.isInteger(values.orderQuantity) || values.orderQuantity <= 0) {
                  errors.orderQuantity = 'Value should be in Positive Integer';
                }
                if (props.instrumentTokens && props.instrumentTokens.length > 0) {
                  let filtered = props.instrumentTokens.filter(it => it.instrument_token === stockSelected);
                  if (filtered.length > 0) {
                    if (
                      values.orderQuantity % filtered[0].lot_size !== 0 &&
                      virtualTradeObject.tradeType !== 'Investment' &&
                      virtualTradeObject.tradeType !== 'Cash'
                    ) {
                      errors.orderQuantity = `Quantity can only be in the multiples of ${filtered[0].lot_size}`;
                    }
                  }
                }

                if (virtualTradeObject.transactionType === 'Buy') {
                  if (values.orderPrice < values.stopLoss)
                    errors.orderPrice = 'Order Price cannot be less than Stop Loss';
                  if (values.targetPrice < values.stopLoss)
                    errors.targetPrice = 'Target Price cannot be less than Stop Loss';
                  if (values.targetPrice < values.orderPrice)
                    errors.targetPrice = 'Target Price cannot be less than Order Price';
                }
                if (virtualTradeObject.transactionType === 'Sell') {
                  if (values.orderPrice > values.stopLoss)
                    errors.orderPrice = 'Order Price cannot be more than Stop Loss';
                  if (values.targetPrice > values.stopLoss)
                    errors.targetPrice = 'Target Price cannot be more than Stop Loss';
                  if (values.targetPrice > values.orderPrice)
                    errors.targetPrice = 'Target Price cannot be more than Order Price';
                }

                if (values.orderPrice === values.targetPrice) {
                  errors.orderPrice = 'Order Price and Target Price cannot be same';
                }
                if (values.targetPrice === values.stopLoss) {
                  errors.targetPrice = 'Target Price and Stop Loss cannot be same';
                }
                if (values.orderPrice === values.stopLoss) {
                  errors.orderPrice = 'Order Price and Stop Loss cannot be same';
                }
                if (virtualTradeObject.complexity === 'CO') {
                  if (
                    !(
                      values.stopLoss >= (values.orderPrice * 98.5) / 100 &&
                      values.stopLoss <= (values.orderPrice * 101.5) / 100
                    )
                  ) {
                    errors.stopLoss = `Stop Loss should be between ${((values.orderPrice * 98.5) / 100).toFixed(
                      2
                    )} and ${((values.orderPrice * 101.5) / 100).toFixed(2)} range`;
                  }
                }
                if (!values.stopLoss && virtualTradeObject.tradeType !== 'Investment') {
                  errors.stopLoss = 'Required';
                }

                // if (!virtualTradeObject.tradeType) {
                //   errors.tradeType = 'Required';
                // }
                // if (!virtualTradeObject.duration) {
                //   errors.duration = 'Required';
                // }
                // if (!virtualTradeObject.complexity) {
                //   errors.complexity = 'Required';
                // }

                return errors;
              }}
              onChange={data => {
                console.log('check', data);
              }}
              onSubmit={(values, { setSubmitting }) => {
                if (
                  props.analystDetails &&
                  props.analystDetails.capital_required &&
                  props.analystDetails.capital_required > 0 &&
                  props.analystDetails.segment_list &&
                  props.analystDetails.segment_list.length > 0
                ) {
                  setSubmitting(false);
                  console.log('here123', stockSelected);
                  let subscriptionObj = {
                    pricing: parseInt(values.pricing),
                    duration: duration.filter(t => t.isSelected === true)[0]
                      ? duration.filter(t => t.isSelected === true)[0].text
                      : null,
                    tradeType: tradeType.filter(t => t.isSelected === true)[0]
                      ? tradeType.filter(t => t.isSelected === true)[0].text
                        ? tradeType.filter(t => t.isSelected === true)[0].text.toUpperCase()
                        : null
                      : null,
                    transactionType: transactionType
                      ? transactionType.toUpperCase()
                      : virtualTradeObject.transactionType.toUpperCase(),
                    tradingScrip: tradingScrip.filter(t => t.isSelected === true)[0]
                      ? tradingScrip.filter(t => t.isSelected === true)[0].text
                      : null,
                    // sub_segment: tradeType.filter(t => t.isSelected === true)[0]
                    //   ? tradeType.filter(t => t.isSelected === true)[0].text
                    //     ? tradeType.filter(t => t.isSelected === true)[0].text.toUpperCase()
                    //     : null
                    //   : null,
                    complexity: complexity.filter(c => c.isSelected === true)[0]
                      ? complexity.filter(c => c.isSelected === true)[0].text
                        ? complexity.filter(c => c.isSelected === true)[0].text.toUpperCase()
                        : 'RGLR'
                      : 'RGLR'
                  };
                  if (subscriptionObj.tradeType === 'CASH') {
                    subscriptionObj = { ...subscriptionObj, tradeType: 'EQUITY' };
                  }
                  let date = new Date();
                  var formData = new FormData();
                  console.log('segmentsegmentsegmentsegmentsegment', subscriptionObj);
                  formData.append('instrument_token', stockSelected);
                  formData.append('segment', subscriptionObj.tradeType);
                  formData.append('trade_type', subscriptionObj.duration);
                  formData.append('order_type', subscriptionObj.transactionType);
                  formData.append('stop_loss', values.stopLoss ? values.stopLoss : 0.1);
                  formData.append('target_price', values.targetPrice);
                  formData.append('quantity', values.orderQuantity);
                  formData.append('order_price', values.orderPrice);
                  formData.append('confidence_level', confidenceLevel);
                  // formData.append('sub_segment', subscriptionObj.sub_segment);
                  formData.append('complexity', subscriptionObj.complexity);

                  console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@', subscriptionObj);

                  if (
                    transactionType === 'Buy' &&
                    (values.targetPrice < values.orderPrice || values.orderPrice < values.stopLoss)
                  ) {
                    setValueError('Order Price should be greater than Stop Loss and Less than Target Price');
                    setValueErrorMessage(true);
                  } else if (
                    transactionType === 'Sell' &&
                    (values.targetPrice > values.orderPrice || values.orderPrice > values.stopLoss)
                  ) {
                    setValueError('Order Price should be Less than Stop Loss and Greater than Target Price');
                    setValueErrorMessage(true);
                  } else {
                    if (props.tradeItem) {
                      formData.append('record_id', props.tradeItem.record_id);
                      props.placeTrade({
                        payload: { formData, updated: true }
                      });
                      setVirtualTradeObject({
                        ...virtualTradeObject,
                        tradeType: null,
                        duration: null,
                        transactionType: null,
                        complexity: null
                      });
                      Mixpanel.track('Updated a Trade!', { tradeId: props.tradeItem.record_id });
                    } else {
                      props.placeTrade({
                        payload: formData
                      });
                      setVirtualTradeObject({
                        ...virtualTradeObject,
                        tradeType: null,
                        duration: null,
                        transactionType: null,
                        complexity: null
                      });
                      Mixpanel.track('Placed a new Trade!');
                    }
                  }
                } else {
                  setVirtualCapitalError(true);
                  setProfileErrorMessage('Please complete your profile details before placing a trade');
                }
              }}
              render={({
                submitForm,
                isSubmitting,
                errors,
                touched,
                changeOrder,
                handleChange,
                values,
                handleSubmit,
                setFieldValue
              }) => (
                <form style={{ width: '70%' }} onSubmit={handleSubmit}>
                  <div style={{ padding: '20px', height: '100%' }}>
                    {/*************************************************** Trade Type ******************************************************/}
                    <div>
                      <span className='labels'>Choose Instrument</span>
                      <Row>
                        {tradeType.map(t => (
                          <Col lg={3} md={3} sm={3} xs={3} style={{ padding: '1rem' }}>
                            <Box
                              isSelected={t.isSelected}
                              allowed={t.allowed}
                              text={t.text}
                              handleChange={handleChangeTradingType}
                            />
                          </Col>
                        ))}
                      </Row>
                    </div>

                    {/*************************************************** Scrip Name ******************************************************/}
                    <div className='my-2'>
                      <Row style={{ marginTop: '30px' }}>
                        <div style={{ paddingTop: '2.5rem' }} className='col-6'>
                          <FormControl className={classes.formControl}>
                            <Downshift
                              id='downshift-simple'
                              initialSelectedItem={stockSelected}
                              onChange={selection => {
                                let instrument_token =
                                  props.instrumentTokens &&
                                  props.instrumentTokens.filter(i => i.trading_symbol === selection).length > 0
                                    ? props.instrumentTokens.filter(i => i.trading_symbol === selection)[0]
                                        .instrument_token
                                    : null;
                                setStockSelected(instrument_token);
                                if (props.instrumentTokens && props.instrumentTokens.length > 0) {
                                  let filtered = props.instrumentTokens.filter(
                                    it => it.instrument_token === instrument_token
                                  );
                                  if (filtered.length > 0) {
                                    if (
                                      values.orderQuantity % filtered[0].lot_size !== 0 &&
                                      virtualTradeObject.tradeType !== 'Investment' &&
                                      virtualTradeObject.tradeType !== 'Cash'
                                    ) {
                                      setLotSize(filtered[0].lot_size ? filtered[0].lot_size : null);
                                    }
                                    setLotSize(filtered[0].lot_size ? filtered[0].lot_size : null);
                                  }
                                }
                                console.log(changeOrder);
                              }}
                            >
                              {({
                                getInputProps,
                                getItemProps,
                                getLabelProps,
                                getMenuProps,
                                highlightedIndex,
                                inputValue,
                                isOpen,
                                selectedItem,
                                clearSelection
                              }) => {
                                const { onBlur, onFocus, ...inputProps } = getInputProps({
                                  placeholder: 'Type to Search',
                                  onChange: e => fetchFromAPI(e, clearSelection)
                                });
                                return (
                                  <div className={classes.container}>
                                    {renderInput({
                                      fullWidth: true,
                                      classes,
                                      InputProps: { onBlur, onFocus },
                                      inputProps
                                    })}
                                    {props.loader === true ? (
                                      <CircularProgress
                                        size='0.8rem'
                                        style={{
                                          fontSize: '16px',
                                          position: 'absolute',
                                          right: '0px',
                                          top: '13px',
                                          color: '#616161'
                                        }}
                                      />
                                    ) : (
                                      <CloseIcon
                                        style={{
                                          fontSize: '16px',
                                          position: 'absolute',
                                          right: '0px',
                                          top: '13px',
                                          color: '#616161',
                                          cursor: 'pointer'
                                        }}
                                        onClick={clearSelection}
                                      />
                                    )}

                                    <div {...getMenuProps()}>
                                      {isOpen ? (
                                        <Paper className={classes.paper} square>
                                          {inputProps.value.length > 2 ? (
                                            getSuggestions(
                                              inputValue,
                                              props.instrumentTokens ? props.instrumentTokens : []
                                            ).length === 0 ? (
                                              <MenuItem
                                                component='div'
                                                style={{
                                                  fontWeight: 400,
                                                  color: '#BAB9B9'
                                                }}
                                              >
                                                No value found.
                                              </MenuItem>
                                            ) : (
                                              getSuggestions(
                                                inputValue,
                                                props.instrumentTokens ? props.instrumentTokens : []
                                              ).map((suggestion, index) =>
                                                renderSuggestion({
                                                  suggestion,
                                                  index,
                                                  itemProps: getItemProps({ item: suggestion.trading_symbol }),
                                                  highlightedIndex,
                                                  selectedItem
                                                })
                                              )
                                            )
                                          ) : null}
                                        </Paper>
                                      ) : null}
                                    </div>
                                  </div>
                                );
                              }}
                            </Downshift>
                          </FormControl>
                        </div>
                        <div className='col-6'>
                          <span className='labels mt-4'>Choose Trade Type</span>
                          <Row className='mt-2'>
                            {duration.map(t => (
                              <Col lg={6} md={6} sm={6} xs={6} style={{ padding: '1rem' }}>
                                <Box
                                  isSelected={t.isSelected}
                                  allowed={t.allowed}
                                  text={t.text}
                                  handleChange={handleChangeDuration}
                                />
                              </Col>
                            ))}
                          </Row>
                        </div>
                      </Row>
                    </div>

                    {/*************************************************** Duration ******************************************************/}
                    <div className='my-2'></div>

                    {/*************************************************** Complexity ******************************************************/}
                    <div className='my-2'>
                      <span className='labels mt-4'>Choose Variety</span>
                      <Row className='mt-2'>
                        {complexity.map(t => (
                          <Col lg={3} md={3} sm={3} xs={3} style={{ padding: '1rem' }}>
                            <Box
                              isSelected={t.isSelected}
                              allowed={t.allowed}
                              text={t.text}
                              handleChange={handleComplexity}
                            />
                          </Col>
                        ))}
                      </Row>
                    </div>

                    {/*************************************************** Values ******************************************************/}
                    <Row style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
                      <Col lg={3} md={3} sm={3} xs={3} style={{ padding: '4px' }}>
                        <div>Enter Order Price</div>
                        <FormControl className={classes.formControl}>
                          {/* <input
                            style={{ width: '8rem' }}
                            placeholder='₹ | 100'
                            name='orderPrice'
                            helperText={touched.orderPrice ? errors.orderPrice : ''}
                            error={Boolean(errors.orderPrice)}
                            type='number'
                            disabled={virtualTradeObject.status === 'EXECUTED'}
                            //type="password"
                            value={values.orderPrice}
                            onChange={handleChange}
                            id='id-orderPrice'
                            //fullWidth
                          /> */}
                          <TextField
                            name='orderPrice'
                            helperText={touched.orderPrice ? errors.orderPrice : ''}
                            error={Boolean(errors.orderPrice)}
                            placeholder='₹ | 100'
                            type='number'
                            disabled={virtualTradeObject.status === 'EXECUTED'}
                            //type="password"
                            value={values.orderPrice}
                            onChange={handleChange}
                            id='id-orderPrice'
                            //fullWidth
                          />
                          {errors.orderPrice && touched.orderPrice}
                        </FormControl>
                      </Col>
                      <Col lg={3} md={3} sm={3} xs={3} style={{ padding: '4px' }}>
                        <div>Enter Target Price</div>
                        <FormControl className={classes.formControl}>
                          <TextField
                            name='targetPrice'
                            helperText={touched.targetPrice ? errors.targetPrice : ''}
                            error={Boolean(errors.targetPrice)}
                            placeholder='₹ | 100'
                            type='number'
                            //type="password"
                            value={values.targetPrice}
                            onChange={handleChange}
                            id='id-targetPrice'
                            //fullWidth
                          />
                          {errors.targetPrice && touched.targetPrice}
                        </FormControl>
                      </Col>

                      <Col lg={3} md={3} sm={3} xs={3} style={{ padding: '4px' }}>
                        <div>Enter Quantity</div>
                        <FormControl className={classes.formControl}>
                          <TextField
                            name='orderQuantity'
                            helperText={touched.orderQuantity ? errors.orderQuantity : ''}
                            error={Boolean(errors.orderQuantity)}
                            placeholder='₹ | 100'
                            type='number'
                            disabled={virtualTradeObject.status === 'EXECUTED'}
                            //type="password"
                            value={values.orderQuantity}
                            onChange={handleChange}
                            id='id-orderQuantity'
                            //fullWidth
                          />
                          {errors.orderQuantity && touched.orderQuantity}
                        </FormControl>
                      </Col>
                      <Col lg={3} md={3} sm={3} xs={3} style={{ padding: '4px' }}>
                        <div>Enter Stop Loss</div>
                        {virtualTradeObject.tradeType === 'Investment' ||
                        (props.tradeItem && props.tradeItem.segment.name === 'INVESTMENT') ? null : (
                          <FormControl className={classes.formControl}>
                            <TextField
                              name='stopLoss'
                              helperText={touched.stopLoss ? errors.stopLoss : ''}
                              error={Boolean(errors.stopLoss)}
                              placeholder='₹ | 100'
                              //type="password"
                              value={values.stopLoss}
                              onChange={handleChange}
                              type='number'
                              id='id-stopLoss'
                              disabled={virtualTradeObject.tradeType === 'Investment' ? true : false}
                              //fullWidth
                            />
                            {errors.stopLoss && touched.stopLoss}
                          </FormControl>
                        )}
                      </Col>
                    </Row>

                    {/*************************************************** Buttons ******************************************************/}
                    {props.loader ? (
                      <Row style={{ display: 'flex', justifyContent: 'center', padding: '20px 0px' }}>
                        <CircularProgress name='circle' color='primary' />
                      </Row>
                    ) : virtualTradeObject.transactionType === null ? (
                      <Row style={{ paddingTop: '2rem' }}>
                        <Col lg={3} md={3} sm={3} xs={3}>
                          <Button
                            type='submit'
                            style={{
                              backgroundColor: '#F6A28C',
                              textAlign: 'center',
                              width: '100%',
                              color: 'black',
                              padding: '0.5rem',
                              borderRadius: '2rem'
                            }}
                            onClick={handleBuyClick}
                            disabled={
                              !(
                                virtualTradeObject.tradeType &&
                                virtualTradeObject.duration &&
                                virtualTradeObject.complexity &&
                                stockSelected
                              )
                            }
                          >
                            <span>Buy</span>
                          </Button>
                        </Col>
                        <Col lg={3} md={3} sm={3} xs={3}>
                          <Button
                            type='submit'
                            style={{
                              backgroundColor: '#54E2B1',
                              textAlign: 'center',
                              width: '100%',
                              color: 'black',
                              padding: '0.5rem',
                              borderRadius: '2rem'
                            }}
                            onClick={handleSellClick}
                            disabled={
                              !(
                                virtualTradeObject.tradeType &&
                                virtualTradeObject.duration &&
                                virtualTradeObject.complexity &&
                                stockSelected
                              )
                            }
                          >
                            <span>Sell</span>
                          </Button>
                        </Col>
                      </Row>
                    ) : (
                      <Row style={{ paddingTop: '2rem' }}>
                        <Col lg={3} md={3} sm={3} xs={3}>
                          <Button
                            style={{
                              backgroundColor: '#565EBF',
                              textAlign: 'center',
                              width: '100%',
                              color: 'black',
                              padding: '0.5rem',
                              borderRadius: '2rem'
                            }}
                            type='submit'
                            disabled={isSubmitting || shouldDisable}
                            //onClick={submitForm}
                          >
                            Modify
                          </Button>
                        </Col>
                      </Row>
                    )}
                  </div>
                </form>
              )}
            />
          </div>
        </div>

        <Dialog
          open={valueErrorMessage}
          onClose={() => setValueErrorMessage(false)}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogTitle id='alert-dialog-title'>{valueError}</DialogTitle>
          <DialogActions>
            <Button
              onClick={e => {
                e.preventDefault();
                props.setMessage(null);
                setValueErrorMessage(false);
                setValueError('');
              }}
              color='primary'
              autoFocus
            >
              OK
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={openDialog}
          // onClose={() => setOpenDialog(false)}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogTitle id='alert-dialog-title'>{props.message}</DialogTitle>
          <DialogActions>
            <Button
              onClick={() => {
                props.setMessage(null);
                // props.handleCloseFilter();

                //setSomeValueChanged(false)
                // if (virtualTradeObject.tradeType) {
                //   props.changeHomeState(1);
                //   console.log('ok clicked');
                // }
                setOpenDialog(false);
                // props.history.push('/');
                props.setCheck(false);
              }}
              color='primary'
              autoFocus
            >
              OK
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={virtualCapitalError}
          onClose={() => setVirtualCapitalError(false)}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogTitle id='alert-dialog-title'>{profileErrorMessage}</DialogTitle>
          <DialogActions>
            <Button
              onClick={() => {
                // props.changeHomeState(3);
                // props.handleCloseFilter();
                setVirtualCapitalError(false);
                props.setMessage(null);
                setOpenDialog(false);
              }}
              color='primary'
              autoFocus
            >
              OK
            </Button>
          </DialogActions>
        </Dialog>

        <Loading open={props.loading} popover />
      </div>
    </Zoom>
  );
};

const mapStateToProps = state => ({
  signinData: state.auth.signinData,
  loader: state.auth.loader,
  message: state.auth.message,
  availableTradeBalance: state.auth.availableTradeBalance,
  profileImage: state.auth.profileImage,
  instrumentTokens: state.auth.instrumentTokens,
  tradeItem: state.analyst.tradeItem,
  analystDetails: state.analyst.analystDetails,
  subscriptionPlan: state.analyst.subscriptionPlan,
  loader: state.auth.loader,
  loading: state.analyst.loading
});

const mapDispatchToProps = dispatch => ({
  placeTrade: params => dispatch(actions.placeTrade(params)),
  setMessage: message => dispatch(actions.setMessage(message)),
  getAvailableTradeBalance: payload => dispatch(actions.getAvailableTradeBalance(payload)),
  fetchIntrumentTokens: payload => dispatch(actions.fetchIntrumentTokens(payload)),
  clearInstrumentTokens: () => dispatch(actions.clearInstrumentTokens()),
  setTradeItem: () => dispatch(actions.setTradeItem(null))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Trades));
