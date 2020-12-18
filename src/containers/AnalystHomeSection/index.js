import React from 'react';
//import './BasicDetail.scss';
import { Row, Col, Image } from 'react-bootstrap';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
import FormControl from '@material-ui/core/FormControl';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import BottomNavigator from '../components/BottomNavigator';
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
//import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Header from '../components/Header/customHeader';
import './AnalystHomeSection.scss';
import PropTypes from 'prop-types';
import deburr from 'lodash/deburr';
import Downshift from 'downshift';
//import TextField from '@material-ui/core/TextField';
import Popper from '@material-ui/core/Popper';
//import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import AutoSuggest from './AutoSuggest';
import CloseIcon from '@material-ui/icons/Close';
import { Redirect } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Drawer from '@material-ui/core/Drawer';
import TradeList from '../TradeList/TradeList';
import Trades from '../Trades/Trades';
import Slide from '@material-ui/core/Slide';

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

const CreateSubscriptionPlan = props => {
  const classes = useStyles();
  let { tradeItem } = props;
  const [openFilter, setOpenFilter] = React.useState(false);
  const [refreshData, setRefreshData] = React.useState(false);
  const [checked, setChecked] = React.useState(false);

  // for edit trade -- needs to be tested!
  React.useEffect(() => {
    setChecked(true);
    if (tradeItem) {
      setOpenFilter(true);
    }
  }, [tradeItem]);

  function handleClose() {
    setOpenFilter(false);
  }

  console.log(props.tradeItem);
  console.log('::::::::::::::::');
  console.log(refreshData);
  console.log('::::::::::::::::');

  return (
    // <Slide direction='right' in={checked} mountOnEnter unmountOnExit>
    <div>
      {/* <Drawer
        anchor='bottom'
        open={openFilter}
        classes={{
          paper: classes.drawerPaper
        }}
        // onClose={}
        // onOpen={}
      >
        <div style={{ height: '100%' }}>
          <div style={{ backgroundColor: '#fafafa', padding: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <CloseIcon
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  props.setTradeItem();
                  setOpenFilter(false);
                }}
              />
            </div>

            <Typography variant='h6' style={{ paddingLeft: '40%', fontSize: '16px', color: 'blue' }}>
              {tradeItem ? <>Edit Trade</> : <>New Order</>}
            </Typography>

            <Trades handleCloseFilter={handleClose} />
          </div>
        </div>
      </Drawer> */}

      <Header title={'Trades'} addTrade={true} refresh={true} refreshData={setRefreshData} setOpen={setOpenFilter} />

      <TradeList refreshData={refreshData} isRefreshData={setRefreshData} />

      <BottomNavigator />
    </div>
    // </Slide>
  );
};

const mapStateToProps = state => ({
  signinData: state.auth.signinData,
  loader: state.auth.loader,
  tradeItem: state.analyst.tradeItem,
  analystDetails: state.analyst.analystDetails
});

const mapDispatchToProps = dispatch => ({
  changeHomeState: params => dispatch(actions.changeHomeState(params)),
  // clearIntrumentTokens: () => dispatch(actions.clearInstrumentTokens()),
  setTradeItem: () => dispatch(actions.setTradeItem(null))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateSubscriptionPlan));
