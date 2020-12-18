import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import * as actions from '../../redux/actions/index';
import { connect } from 'react-redux';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import { withRouter } from 'react-router-dom';
import TradeListBrowser from '../TradeListBrowser/TradeList';
import Trades from '../TradesBrowser/Trades';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';

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
  button: {
    width: 224,
    textTransform: 'none',
    fontWeight: 'normal'
  }
}));

const BrowserTrade = props => {
  const classes = useStyles();
  let { tradeItem } = props;
  const [openFilter, setOpenFilter] = React.useState(false);
  const [refreshData, setRefreshData] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);

  const { onClose, value: valueProp, open, ...other } = props;

  React.useEffect(() => {
    if (props.message) {
      props.setMessage(props.message);
    }
  }, [props.message]);

  const [check, setCheck] = React.useState(false);

  React.useEffect(() => {
    props.setTradeItem();
  }, []);

  React.useEffect(() => {
    props.getTradeList();
    props.getSubscriptionPlanList();

    if (tradeItem) {
      setOpenFilter(true);
    }
  }, [tradeItem]);

  function handleClose() {
    setOpenFilter(false);
  }

  return (
    <>
      {check ? (
        <div
          anchor='bottom'
          open={openFilter}
          classes={{
            paper: classes.drawerPaper
          }}
          style={{ minHeight: '100%', maxHeight: '100%', width: '100%' }}
          {...other}
        >
          <div style={{ height: '100%' }}>
            <div style={{ padding: '3rem 6rem 1rem 6rem' }}>
              <Typography
                variant='h6'
                style={{ borderBottom: '0.6px solid #B1AEC1', fontSize: '16px', color: '#565ebf' }}
              >
                <KeyboardBackspaceIcon
                  style={{ color: '#707070', cursor: 'pointer' }}
                  onClick={() => setCheck(false)}
                />
                <span style={{ padding: '0rem 1rem 0rem 1rem', marginLeft: '1rem' }}>
                  {tradeItem ? 'Edit Trade' : 'New Order'}
                </span>
              </Typography>
              <Trades tradeList={props.tradeList} handleCloseFilter={handleClose} setCheck={setCheck} />
            </div>
          </div>
        </div>
      ) : (
        <div>
          <TradeListBrowser
            tradeList={props.tradeList}
            refreshData={refreshData}
            setCheck={setCheck}
            isRefreshData={setRefreshData}
          />
        </div>
      )}

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
              setOpenDialog(false);
              // props.history.push('/');
            }}
            color='primary'
            autoFocus
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const mapStateToProps = state => ({
  signinData: state.auth.signinData,
  loader: state.auth.loader,
  tradeItem: state.analyst.tradeItem,
  analystDetails: state.analyst.analystDetails,
  message: state.auth.message,
  tradeList: state.analyst.tradeList
});

const mapDispatchToProps = dispatch => ({
  setMessage: message => dispatch(actions.setMessage(message)),
  getTradeList: () => dispatch(actions.getTradeList()),
  getSubscriptionPlanList: () => dispatch(actions.getSubscriptionPlanList()),
  setTradeItem: () => dispatch(actions.setTradeItem(null))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BrowserTrade));
