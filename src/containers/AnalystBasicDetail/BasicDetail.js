import React, { useEffect } from 'react';
//import './BasicDetail.scss';
import { Row, Col } from 'react-bootstrap';
import Header from '../components/Header/customHeader';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import BasicNavigator from '../components/BottomNavigator';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/index';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Loading from '../Loading/Loading';
// import DialogContentText from '@material-ui/core/DialogContentText';
import Slide from '@material-ui/core/Slide';
import Zoom from '@material-ui/core/Zoom';

import DialogTitle from '@material-ui/core/DialogTitle';
import PublishIcon from '@material-ui/icons/Publish';
import CircularProgress from '@material-ui/core/CircularProgress';

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
  button: {
    width: 224,
    textTransform: 'none',
    fontWeight: 'normal'
  }
}));

const BasicDetail = props => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [files, setFiles] = React.useState(null);
  const [fileCounter, setFileCounter] = React.useState(0);
  const [documentUpload, setdocumentUpload] = React.useState(false);
  let { message, getBankDetails, bankAccountDetails, analystDetails } = props;
  const [openDialog, setOpenDialog] = React.useState(false);
  const [documentRequired, setDocumentRequired] = React.useState(false);
  React.useEffect(() => {
    if (message !== null) {
      setOpenDialog(true);
    }
  }, [message]);
  useEffect(() => {
    getBankDetails();
    props.isDocumentUpdated(false);
  }, []);
  const [state, setState] = React.useState({
    qualification: analystDetails ? analystDetails.education : null,
    tradingExperience: analystDetails ? analystDetails.trading_experience : 0,
    certification: ''
  });
  const handleStateChange = (e, variable) => {
    if (variable === 'qualification') {
      setState({ ...state, qualification: e.target.value });
    }
    if (variable === 'tradingExperience') {
      setState({ ...state, tradingExperience: e.target.value });
    }
    //console.log(e.target.value, variable)
  };
  const [someValueChanged, setSomeValueChanged] = React.useState(false);
  const updateValueChanged = () => {
    setSomeValueChanged(true);
  };
  React.useEffect(() => {
    if (props.documentUpdated) {
      setFileCounter(0);
      setFiles(null);
    }
  }, [props.documentUpdated]);
  const handleInputFile = e => {
    console.log('asdf', e.target.files);
    console.log('file0', e.target.files[0]);
    setFiles(e.target.files[0]);

    // for(let i=0;i<e.target.files.length;i++){
    //   setFiles(draft => [...draft,e.target.files[i]])
    // }
    setFileCounter(e.target.files.length);
  };
  const handleClose = () => {
    setOpen(false);
  };
  // const handleCertifiacteUpload = e => {
  //   console.log('certificate: ', e.target.files);
  // };
  const shouldDisable = value => {
    if (
      state.qualification === 'SEBI RIA' ||
      state.qualification === 'SEBI Research Analyst' ||
      state.qualification === 'NISM Research Analyst'
    ) {
      if (!documentUpload || !props.documentUpdated) {
        return true;
      }
      return false;
    }
    return false;
  };

  console.log('@@@@@@@@@@@@@', props, state);

  return (
    // <Slide direction='down' in={true} timeout={500} mountOnEnter unmountOnExit>
    <>
      <Zoom in={true} timeout={500}>
        <div>
          <Header
            someValueChanged={someValueChanged}
            backButton
            backTo={() => props.history.push('/')}
            title={`Personal Details`}
          />
          <Dialog onClose={handleClose} aria-labelledby='simple-dialog-title' open={open}>
            <DialogTitle id='simple-dialog-title'>Delete My Account</DialogTitle>
            <DialogContent>
              Your account will be permanently deleted and you will not be able to use the same phone number or email to
              sign up again. Are you sure?
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color='primary'>
                Cancel
              </Button>
              <Button onClick={handleClose} color='primary'>
                Ok, Delete
              </Button>
            </DialogActions>
          </Dialog>
          <div style={{ padding: '10px', marginTop: '20px' }}>
            <Paper className={classes.root}>
              <Formik
                initialValues={{
                  firstname:
                    props.signinData &&
                    props.signinData.user &&
                    props.signinData.user.UserAttributes &&
                    props.signinData.user.UserAttributes.filter(item => item.Name === 'name').length > 0
                      ? props.signinData.user.UserAttributes.filter(item => item.Name === 'name')[0].Value.split(' ')[0]
                      : '',
                  lastname:
                    props.signinData &&
                    props.signinData.user &&
                    props.signinData.user.UserAttributes &&
                    props.signinData.user.UserAttributes.filter(item => item.Name === 'name').length > 0
                      ? props.signinData.user.UserAttributes.filter(item => item.Name === 'name')[0].Value.split(' ')[1]
                        ? props.signinData.user.UserAttributes.filter(item => item.Name === 'name')[0].Value.split(
                            ' '
                          )[1]
                        : ''
                      : '',
                  email:
                    props.signinData &&
                    props.signinData.user &&
                    props.signinData.user.UserAttributes &&
                    props.signinData.user.UserAttributes.filter(item => item.Name === 'email').length > 0
                      ? props.signinData.user.UserAttributes.filter(item => item.Name === 'email')[0].Value
                      : ''
                }}
                validate={values => {
                  const errors = {};
                  if (someValueChanged === false) {
                    updateValueChanged();
                  }
                  if (!values.firstname) {
                    errors.firstname = 'Enter your first name';
                  }
                  if (!values.lastname) {
                    errors.lastname = 'Enter your last name';
                  }
                  if (state.qualification === null || state.qualification === '') {
                    errors.qualification = 'Qualification is necessary';
                  }
                  // if (!values.email) {
                  //   errors.email = 'Enter your email';
                  // }
                  // if (!values.password) {
                  //   errors.password = 'Enter your new password';
                  // }
                  // if (!values.confirmPassword) {
                  //   errors.confirmPassword = 'Repeat your new password';
                  // }
                  // if (values.password !== values.confirmPassword) {
                  //   errors.confirmPassword = "New passwords do not match!";
                  // }
                  return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                  setSubmitting(false);
                  if (!shouldDisable()) {
                    console.log(state.education);
                    props.updateAnalystBasicDetails({
                      trading_experience: state.tradingExperience,
                      capital_required:
                        props.analystDetails && props.analystDetails.capital_required
                          ? props.analystDetails.capital_required
                          : 0,
                      education: state.qualification,
                      user: {
                        first_name: values.firstname,
                        last_name: values.lastname
                        // email: values.email
                      }
                    });
                  } else {
                    setDocumentRequired(true);
                  }

                  // setSubmitting(false)
                  // // let submitData = {
                  // //   ifscCode: values.password,
                  // //   accountNumber: values.confirm
                  // // }
                  // props.changePassword({
                  //   "accesstoken": props.signinData.token.AuthenticationResult.AccessToken,
                  //   "PreviousPassword": values.oldPassword,
                  //   "ProposedPassword": values.password,
                  //   "nextUrl": '/analyst-home'
                  // })
                  // console.log('password: ', values.password)
                  // console.log('CONFRIMpassword: ', values.confirmPassword)
                  // console.log('oldpassword: ', values.oldPassword)
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
                    <Row>
                      <FormControl className={classes.formControl}>
                        <TextField
                          name='firstname'
                          helperText={touched.firstname ? errors.firstname : ''}
                          error={Boolean(errors.firstname)}
                          label='First Name'
                          //type="password"
                          value={values.firstname}
                          onChange={handleChange}
                          //fullWidth
                        />
                        {errors.firstname && touched.firstname}
                      </FormControl>
                    </Row>
                    <Row style={{ marginTop: '10px' }}>
                      <FormControl className={classes.formControl}>
                        <TextField
                          name='lastname'
                          helperText={touched.lastname ? errors.lastname : ''}
                          error={Boolean(errors.lastname)}
                          label='Last Name'
                          //type="password"
                          value={values.lastname}
                          onChange={handleChange}
                          //fullWidth
                        />
                        {errors.lastname && touched.lastname}
                      </FormControl>
                    </Row>
                    {/* <Row style={{ marginTop: '10px' }}>
                  <FormControl className={classes.formControl}>
                    <TextField
                      name='email'
                      helperText={touched.email ? errors.email : ''}
                      error={Boolean(errors.email)}
                      label='Email'
                      //type="password"
                      value={values.email}
                      onChange={handleChange}
                      //fullWidth
                    />
                    {errors.email && touched.email}
                  </FormControl>
                </Row> */}
                    <Row style={{ marginTop: '20px' }}>
                      <FormControl className={classes.formControl}>
                        <InputLabel shrink htmlFor='age-native-label-placeholder'>
                          Qualification
                        </InputLabel>
                        <NativeSelect
                          value={state.qualification}
                          //name="education"
                          helperText={touched.qualification ? errors.qualification : ''}
                          onChange={e => handleStateChange(e, 'qualification')}
                        >
                          <option value=''>Select</option>
                          {/* <option value={`Graduate`}>Graduate</option>
                      <option value={`Post graduation`}>Post graduation</option>
                      <option value={`Graduate & SEBI RIA`}>{`Graduate & SEBI RIA`}</option>
                      <option value={`Post Graduate & SEBI RIA`}>{`Post Graduate & SEBI RIA`}</option> */}
                          <option value={`Graduate/PG (No SEBI Certification)`}>
                            Graduate/PG (No SEBI Certification)
                          </option>
                          <option value={`SEBI RIA`}>{`SEBI RIA`}</option>
                          <option value={`SEBI Research Analyst`}>{`SEBI Research Analyst`}</option>
                          <option value={`NISM Research Analyst`}>{`NISM Research Analyst`}</option>
                          <option value={`CFA/CMT/FRM`}>CFA/CMT/FRM</option>
                        </NativeSelect>
                        <span style={{ color: '#f44336', fontSize: '0.75rem' }}>
                          {state.qualification === '' || state.qualification === null ? errors.qualification : ''}
                        </span>
                        {/* <FormHelperText>"Problem"</FormHelperText> */}
                      </FormControl>
                    </Row>
                    <Row style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
                      <Col lg={6} md={6} sm={6} xs={6} style={{ padding: '0px' }}>
                        <FormControl className={classes.formControl}>
                          <InputLabel shrink htmlFor='id-trading-experience' style={{ color: '#616161' }}>
                            Trading Exp.
                          </InputLabel>
                          <NativeSelect
                            value={state.tradingExperience}
                            onChange={e => handleStateChange(e, 'tradingExperience')}
                            style={{ width: '90%' }}
                            inputProps={{
                              name: 'tradingExperience',
                              id: 'id-trading-experience'
                            }}
                          >
                            <option value={0}>0 years</option>
                            <option value={1}>1 year</option>
                            <option value={2}>2 years</option>
                            <option value={3}>3 years</option>
                            <option value={4}>4 years</option>
                            <option value={5}>5 years</option>
                            <option value={6}>6 years</option>
                            <option value={7}>7 years</option>
                            <option value={8}>8 years</option>
                            <option value={9}>9 years</option>
                            <option value={10}>10 years</option>
                            <option value={11}>11 years</option>
                            <option value={12}>12 years</option>
                            <option value={13}>13 years</option>
                            <option value={14}>14 years</option>
                            <option value={15}>15 years</option>
                            <option value={16}>16 years</option>
                            <option value={17}>17 years</option>
                            <option value={18}>18 years</option>
                            <option value={19}>19 years</option>
                            <option value={20}>20 years</option>
                            <option value={21}>21 years</option>
                            <option value={22}>22 years</option>
                            <option value={23}>23 years</option>
                            <option value={24}>24 years</option>
                            <option value={25}>25 years</option>
                            <option value={26}>26 years</option>
                            <option value={27}>27 years</option>
                            <option value={28}>28 years</option>
                            <option value={29}>29 years</option>
                            <option value={30}>30+ years</option>
                          </NativeSelect>
                        </FormControl>
                      </Col>
                      <Col lg={6} md={6} sm={6} xs={6} style={{ padding: '0px', alignSelf: 'flex-end' }}>
                        <FormControl className={classes.formControl}>
                          <InputLabel shrink htmlFor='certificate'>
                            Certification
                          </InputLabel>
                          <div className='file' id='certificate' style={{ marginBottom: '0px', paddingBottom: '32px' }}>
                            <label for='file' style={{ cursor: 'pointer' }}>
                              {fileCounter > 0 ? 'Files Selected' : 'Choose File'}
                            </label>
                            <Input type='file' name='file' id='file' onChange={handleInputFile} />
                            <PublishIcon
                              onClick={() => {
                                if (files !== null) {
                                  var formData = new FormData();
                                  console.log('!!!!!!!!!!!!!', files);
                                  formData.append('field_name', 'certificate');
                                  formData.append('certificate', files);
                                  props.uploadDocument({
                                    payload: formData
                                  });
                                  setdocumentUpload(true);
                                }
                              }}
                              className='icon'
                              style={{ fontSize: '19px', cursor: fileCounter > 0 ? 'pointer' : 'default' }}
                            />
                            {fileCounter > 0 ? <div className='counter'>{fileCounter}</div> : null}
                          </div>
                          {shouldDisable() && !documentUpload && <p className='error-text'>Add Certification</p>}
                        </FormControl>
                      </Col>
                    </Row>
                    <Row style={{ display: 'flex', justifyContent: 'center', padding: '20px 0px' }}>
                      {props.loader ? (
                        <CircularProgress name='circle' color='primary' />
                      ) : (
                        <Button
                          variant='contained'
                          color='primary'
                          className={classes.button}
                          disabled={isSubmitting}
                          type='submit'
                        >
                          Save Details
                        </Button>
                      )}
                    </Row>
                  </form>
                )}
              />
            </Paper>

            <Paper className={classes.root} style={{ marginTop: '20px', marginBottom: '3rem' }}>
              <div className='d-flex justify-content-between'>
                <Typography variant='h6' style={{ marginBottom: '15px' }}>
                  Bank Account Details
                </Typography>
                <Link className='mt-1' style={{ fontSize: '1rem' }} to='/account-detail'>
                  Edit
                </Link>
              </div>
              <Typography variant='body1' align='center' style={{ marginBottom: '15px' }}>
                {bankAccountDetails && bankAccountDetails.name}
              </Typography>
              <Typography variant='body1' align='center' style={{ marginBottom: '15px' }}>
                {bankAccountDetails && bankAccountDetails.bank.name}
              </Typography>
              <Typography variant='body1' align='center' style={{ marginBottom: '15px' }}>
                {bankAccountDetails && `${bankAccountDetails.ifsc_code}, ${bankAccountDetails.type}`}
              </Typography>
            </Paper>
            {/* <Row style={{ display: 'flex', justifyContent: 'center', padding: '40px 50px', marginBottom: '30px' }}>
            <a href='#' style={{ color: 'red', textDecoration: 'underline' }} onClick={() => setOpen(true)}>
              Delete My Account
            </a>
          </Row> */}
          </div>

          <Loading open={props.loading} popover />

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
                  setOpenDialog(false);
                  setSomeValueChanged(false);
                  // props.history.push('/analyst-home');
                  props.changeHomeState(3);
                }}
                color='primary'
                autoFocus
              >
                OK
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            open={documentRequired}
            onClose={() => setDocumentRequired(false)}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
          >
            <DialogTitle id='alert-dialog-title'>
              for {state.qualification} kindly add your certification first
            </DialogTitle>
            <DialogActions>
              <Button
                onClick={() => {
                  setDocumentRequired(false);
                }}
                color='primary'
                autoFocus
              >
                OK
              </Button>
            </DialogActions>
          </Dialog>
        </div>
        {/* </Slide> */}
      </Zoom>
      <BasicNavigator />
    </>
  );
};

const mapStateToProps = state => ({
  signinData: state.auth.signinData,
  loader: state.auth.loader,
  message: state.auth.message,
  bankAccountDetails: state.auth.bankAccountDetails,
  analystDetails: state.analyst.analystDetails,
  documentUpdated: state.analyst.documentUpdated,
  loading: state.analyst.loading
});

const mapDispatchToProps = dispatch => ({
  // changePassword: params => dispatch(actions.changePassword(params)),
  setMessage: message => dispatch(actions.setMessage(message)),
  uploadDocument: data => dispatch(actions.uploadDocument(data)),
  getBankDetails: token => dispatch(actions.getBankDetails(token)),
  updateAnalystBasicDetails: payload => dispatch(actions.updateAnalystBasicDetails(payload)),
  isDocumentUpdated: payload => dispatch(actions.documentUpdated(payload)),
  changeHomeState: params => dispatch(actions.changeHomeState(params))
});

export default connect(mapStateToProps, mapDispatchToProps)(BasicDetail);
