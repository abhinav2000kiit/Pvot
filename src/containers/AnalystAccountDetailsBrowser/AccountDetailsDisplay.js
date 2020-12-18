/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from 'react-redux';
import ifsc from 'ifsc';
import * as actions from '../../redux/actions/index';
//import * as Yup from "yup";
import Zoom from '@material-ui/core/Zoom';

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
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  },
  resize: {
    fontSize: 16
  },
  button: {
    width: 224,
    textTransform: 'none',
    fontWeight: 'normal'
  }
}));

// const validationSchema = Yup.object({
//   ifscCode: Yup.string("Enter IFSC code").required("IFSC Code is required!"),
//   accountNumber: Yup.string("Enter your account number").required("Account Number is required!"),
// });

const AccountDetail = props => {
  const { bankAccountDetails, message, setMessage } = props;
  const classes = useStyles();
  const [openDialog, setOpenDialog] = React.useState(false);
  const [bankDetails, setBankDetails] = React.useState('');

  const checkIfsc = ifscCode => {
    if (ifscCode) {
      console.log(ifscCode);
      if (ifsc.validate(ifscCode)) {
        ifsc.fetchDetails(ifscCode).then(function(res) {
          console.log(res);
          setBankDetails(res);
        });
      }
    }
  };

  useEffect(() => {
    checkIfsc(bankAccountDetails && bankAccountDetails.ifsc_code);
  }, [bankAccountDetails]);

  useEffect(() => {
    if (message) {
      setOpenDialog(true);
    }
  }, [message]);

  const titleCase = str => {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
      splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(' ');
  };

  const handleSubmit = () => {
    console.log(`values: `);
    // props.setAccountPageEdit(true);
    props.setAccountDisplayPage(false);
  };

  console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@', props);
  return (
    <div style={{ paddingLeft: '3.5rem' }}>
      <Row style={{ fontSize: '12px', opacity: '0.8' }}>Account Holder's Name</Row>
      <Row style={{ marginBottom: '1rem' }}>{bankAccountDetails && bankAccountDetails.name}</Row>
      <Row style={{ fontSize: '12px', opacity: '0.8' }}>Bank Name</Row>
      <Row style={{ marginBottom: '1rem' }}>
        <div>
          {bankDetails.BRANCH ? (
            <Typography>
              {titleCase(bankDetails.BANK)}, {titleCase(bankDetails.BRANCH)}, {titleCase(bankDetails.CITY)},{' '}
              {titleCase(bankDetails.STATE)}
            </Typography>
          ) : (
            <Typography>{bankDetails}</Typography>
          )}
        </div>
      </Row>
      <Row style={{ fontSize: '12px', opacity: '0.8' }}>Account Number</Row>
      <Row style={{ marginBottom: '1rem' }}>{bankAccountDetails.number}</Row>
      <Row style={{ fontSize: '12px', opacity: '0.8' }}>IFSC Code</Row>
      <Row style={{ marginBottom: '1rem' }}>{bankAccountDetails.ifsc_code}</Row>

      <Button
        variant='outlined'
        className={classes.button}
        // disabled={isSubmitting}
        type='submit'
        onClick={handleSubmit}
        style={{ borderColor: '#54E2B1', borderRadius: '3rem', padding: '0.5rem 1rem 0.5rem 1rem' }}
      >
        Edit
      </Button>
      <Dialog
        open={openDialog}
        onClose={() => {
          setOpenDialog(false);
          setMessage();
        }}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{message}</DialogTitle>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenDialog(false);
              setMessage();
            }}
            color='primary'
            autoFocus
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const mapStateToProps = state => ({
  signinData: state.auth.signinData,
  bankAccountDetails: state.auth.bankAccountDetails,
  erroBankDetails: state.auth.erroBankDetails,
  isErrorBankDetails: state.auth.isErrorBankDetails,
  message: state.auth.message
});

const mapDispatchToProps = dispatch => ({
  // resetErrorBankDetails: message => dispatch(actions.resetErrorBankDetails(message)),
  setMessage: () => dispatch(actions.setMessage(null)),
  setAccountDisplayPage: param => dispatch(actions.setAccountDisplayPage(param))
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountDetail);
