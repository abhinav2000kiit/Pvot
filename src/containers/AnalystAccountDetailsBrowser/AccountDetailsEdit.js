/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Formik } from 'formik';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from 'react-redux';
import ifsc from 'ifsc';
import * as actions from '../../redux/actions/index';

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
  const { bankAccountDetails, isErrorBankDetails, resetErrorBankDetails, erroBankDetails, message, setMessage } = props;
  let names = bankAccountDetails && bankAccountDetails.name;
  names = names && names.split(' ');
  const classes = useStyles();
  const [someValueChanged, setSomeValueChanged] = React.useState(false);
  const [loader, setLoader] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [ifscLoader, setIfscLoader] = React.useState(false);
  const [bankDetails, setBankDetails] = React.useState('');
  const updateValueChanged = () => {
    setSomeValueChanged(true);
  };
  // const submit = data => {
  //   console.log(`data: `,data)
  // }
  useEffect(() => {
    setSomeValueChanged(false);
    setLoader(false);
  }, [bankAccountDetails]);
  useEffect(() => {
    if (message) {
      setLoader(false);
      setOpenDialog(true);
    }
  }, [message]);
  const checkIfsc = ifscCode => {
    if (ifscCode) {
      console.log(ifscCode);
      if (ifsc.validate(ifscCode)) {
        setIfscLoader(true);
        ifsc.fetchDetails(ifscCode).then(function(res) {
          console.log(res);
          setBankDetails(res);
          setIfscLoader(false);
        });
      }
    }
  };

  const titleCase = str => {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
      splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(' ');
  };

  const onCancel = () => {
    // props.setAccountPageEdit(false);
    props.setAccountDisplayPage(true);
  };

  console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@', props);
  return (
    <div style={{ paddingLeft: '3.5rem' }}>
      <div>
        <Formik
          initialValues={{
            ifscCode: props && props.bankAccountDetails ? props.bankAccountDetails.ifsc_code : '',
            accountNumber: props && props.bankAccountDetails ? props.bankAccountDetails.number : '',
            reAccountNumber: props && props.bankAccountDetails ? props.bankAccountDetails.number : '',
            check: false,
            firstName:
              props && props.bankAccountDetails
                ? props.bankAccountDetails.name.split(' ')[0]
                  ? props.bankAccountDetails.name.split(' ')[0]
                  : ''
                : '',
            lastName:
              props && props.bankAccountDetails
                ? props.bankAccountDetails.name.split(' ')[2]
                  ? props.bankAccountDetails.name.split(' ')[2]
                  : props.bankAccountDetails.name.split(' ')[1]
                  ? props.bankAccountDetails.name.split(' ')[1]
                  : ''
                : '',
            middleName:
              props && props.bankAccountDetails
                ? props.bankAccountDetails.name.split(' ')[2]
                  ? props.bankAccountDetails.name.split(' ')[1]
                  : ''
                : '',
            selectbank: ''

            // ,
            // password: '',
            // select: 'none',
            // tags: [],
            // rememberMe: true,
          }}
          onChange={value => {
            // e.persist();
            console.log(value);
            // setFieldTouched(name, true, false);
          }}
          validate={values => {
            const errors = {};
            if (someValueChanged === false) {
              updateValueChanged();
            }
            if (!values.accountNumber) {
              errors.accountNumber = 'Account number is required';
            } else if (!/^(\(?\+?[0-9_]*\)?)?[0-9__\- \(\)]*$/i.test(values.accountNumber)) {
              errors.accountNumber = 'Please enter alphanumeric only';
            }
            if (!values.ifscCode) {
              errors.ifscCode = 'IFSC Code is required';
            } else if (!/^(\(?\+?[a-zA-Z0-9_]*\)?)?[a-zA-Z0-9__\- \(\)]*$/i.test(values.ifscCode)) {
              errors.ifscCode = 'Please enter alphanumeric only';
            }
            if (!values.reAccountNumber) {
              errors.reAccountNumber = 'Re-enter your account number';
            }
            if (values.reAccountNumber !== values.accountNumber) {
              errors.reAccountNumber = 'These two account numbers do not match!';
            }
            if (values.check === false) {
              errors.check = 'Please tick the checkbox to proceed';
            }
            if (!values.firstName) {
              errors.firstName = 'First Name is required';
            }
            if (!values.lastName) {
              errors.lastName = 'Last Name is required';
            }
            if (values.ifscCode) {
              if (!ifsc.validate(values.ifscCode)) {
                errors.ifscCode = 'Not a valid ifScCode';
              }
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            console.log(`values: `, values);
            setSubmitting(false);
            // const bankName = values.selectbank;
            const bankName = bankDetails && bankDetails.BANK;
            console.log('bank name -->', bankName);
            let name;
            if (values.middleName) {
              name = `${values.firstName} ${values.middleName} ${values.lastName}`;
            } else {
              name = `${values.firstName} ${values.lastName}`;
            }
            var formData = new FormData();
            formData.append('bank_name', bankName);
            formData.append('name_as_on_bank_account', name);
            formData.append('number', values.accountNumber);
            formData.append('type', 'current');
            formData.append('ifsc_code', values.ifscCode);
            formData.append('micr_code', 12);

            // `bank_name=${bankName}&name_as_on_bank_account=${name}&number=${values.accountNumber}&type=SAVINGS&ifsc_code=${values.ifscCode}&micr_code=12`
            props.createBankAccount({
              params: formData
            });
            setLoader(true);
            // values.ifscCode = '';
            // values.accountNumber = '';
            // values.reAccountNumber = '';
            // values.check = false;
            // values.firstName = '';
            // values.lastName = '';
            // values.middleName = '';
            // values.selectbank = 'HDFC BANK';
          }}
          render={({
            submitForm,
            isSubmitting,
            errors,
            touched,
            handleChange,
            values,
            handleSubmit,
            handleBlur,
            setFieldValue
          }) => (
            <form style={{ width: '85%' }} onSubmit={handleSubmit}>
              <Row style={{ fontSize: '14px', color: 'gray', marginBottom: '2rem' }}>
                Link your bank account to receive your earnings directly
              </Row>
              <FormControl className={classes.formControl}>
                <Row>
                  <TextField
                    name='firstName'
                    helperText={touched.firstName ? errors.firstName : ''}
                    error={Boolean(errors.firstName)}
                    label='First Name'
                    type='text'
                    value={values.firstName}
                    onChange={e => {
                      e.persist();
                      handleChange(e);
                    }}
                  />
                  {errors.firstName && touched.firstName}
                </Row>
                <Row style={{ marginTop: '20px' }}>
                  <TextField
                    name='middleName'
                    label='Middle Name'
                    type='text'
                    value={values.middleName}
                    onChange={handleChange}
                  />
                </Row>
                <Row style={{ marginTop: '20px' }}>
                  <TextField
                    name='lastName'
                    helperText={touched.lastName ? errors.lastName : ''}
                    error={Boolean(errors.lastName)}
                    label='Last Name'
                    type='text'
                    value={values.lastName}
                    onChange={handleChange}
                  />
                  {errors.lastName && touched.lastName}
                </Row>
              </FormControl>
              <FormControl className={classes.formControl}>
                <Row style={{ marginTop: '20px' }}>
                  <ClickAwayListener onClickAway={() => checkIfsc(values.ifscCode)}>
                    <TextField
                      name='ifscCode'
                      id='ifscCode'
                      helperText={errors.ifscCode ? errors.ifscCode : ''}
                      error={Boolean(errors.ifscCode)}
                      label='IFSC Code'
                      type='text'
                      value={values.ifscCode}
                      onChange={e => {
                        e.persist();
                        if (/^(\(?\?[a-zA-Z0-9]*\)?)?[a-zA-Z0-9\\(\)]*$/i.test(e.target.value)) {
                          handleChange(e);
                        }
                      }}
                      // fullWidth
                    />
                  </ClickAwayListener>
                </Row>
                <Row style={{ marginTop: '20px' }}>
                  {ifscLoader ? (
                    <CircularProgress size='1rem' name='circle' color='primary' align='center' />
                  ) : (
                    <div>
                      {bankDetails.BRANCH ? (
                        <Typography variant='caption' style={{ color: 'gray' }} align='center'>
                          {titleCase(bankDetails.BANK)}, {titleCase(bankDetails.BRANCH)}, {titleCase(bankDetails.CITY)},{' '}
                          {titleCase(bankDetails.STATE)}
                        </Typography>
                      ) : (
                        <Typography variant='caption' style={{ color: 'gray' }} align='center'>
                          {bankDetails}
                        </Typography>
                      )}
                    </div>
                  )}
                </Row>
                <Row style={{ marginTop: '20px' }}>
                  <TextField
                    name='accountNumber'
                    helperText={errors.accountNumber ? errors.accountNumber : ''}
                    error={Boolean(errors.accountNumber)}
                    label='Account Number'
                    //type="number"
                    value={values.accountNumber}
                    onChange={e => {
                      e.persist();
                      if (/^(\(?\?[0-9]*\)?)?[0-9\\(\)]*$/i.test(e.target.value)) {
                        handleChange(e);
                      }
                    }}
                    //fullWidth
                  />
                  {errors.accountNumber && touched.accountNumber}
                </Row>
                <Row style={{ marginTop: '20px' }}>
                  <TextField
                    name='reAccountNumber'
                    helperText={touched.reAccountNumber ? errors.reAccountNumber : ''}
                    error={Boolean(errors.reAccountNumber)}
                    label='Re-enter Account Number'
                    type='password'
                    value={values.reAccountNumber}
                    onChange={e => {
                      e.persist();
                      if (/^(\(?\?[0-9]*\)?)?[0-9\\(\)]*$/i.test(e.target.value)) {
                        handleChange(e);
                      }
                    }}
                    //fullWidth
                  />
                  {errors.reAccountNumber && touched.reAccountNumber}
                </Row>
              </FormControl>
              <FormControl className={classes.formControl}>
                <Row style={{ marginTop: '20px' }}>
                  <div className='col-1'>
                    <input
                      type='checkbox'
                      name='check'
                      value={values.check}
                      checked={values.check}
                      helperText={touched.check ? errors.check : ''}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      style={{ display: 'inline', width: 'auto' }}
                    />
                  </div>
                  <div className='col-11'>
                    <small>
                      &nbsp;I ensure that above mentioned bank account details are correct and I will be responsible to
                      pay the applicable taxes on my earnings through Pvot
                    </small>
                    {errors.check ? (
                      <p style={{ color: 'red' }}>
                        <small>{errors.check}</small>
                      </p>
                    ) : null}
                  </div>
                </Row>
              </FormControl>
              <Row style={{ display: 'flex', justifyContent: 'center', padding: '20px 0px' }}>
                {loader ? (
                  <CircularProgress name='circle' color='primary' />
                ) : (
                  <Button
                    type='submit'
                    // disabled={isSubmitting || !bankDetails.BRANCH || bankDetails === 'Not Found'}
                    className={classes.button}
                    style={{ backgroundColor: '#54E2B1', borderRadius: '1.5rem', marginRight: '2rem', color: 'black' }}
                  >
                    Save
                  </Button>
                )}

                <Button
                  variant='outlined'
                  color='primary'
                  className={classes.button}
                  style={{ borderColor: '#54E2B1', borderRadius: '1.5rem', color: 'black' }}
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Row>
            </form>
          )}
        />
      </div>
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
              props.setAccountPageEdit(false);
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
  createBankAccount: params => dispatch(actions.createBankAccount(params)),
  // resetErrorBankDetails: message => dispatch(actions.resetErrorBankDetails(message)),
  setMessage: () => dispatch(actions.setMessage(null)),
  setAccountDisplayPage: param => dispatch(actions.setAccountDisplayPage(param))
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountDetail);
