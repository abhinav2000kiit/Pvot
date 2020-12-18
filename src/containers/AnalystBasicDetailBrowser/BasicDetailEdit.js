import React, { useEffect } from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import { Input, TextField } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/index';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Loading from '../Loading/Loading';
import Profilepic from './Profilepic';
import PublishIcon from '@material-ui/icons/Publish';
import CircularProgress from '@material-ui/core/CircularProgress';
import './BasicDetails.scss';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  root: {
    padding: theme.spacing(3, 2)
  },
  formControl: {
    margin: theme.spacing(0),
    fontSize: 16,
    minWidth: 120
  },
  label: {
    margin: theme.spacing(0),
    fontSize: 10,
    fontWeight: 'bolder'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  button: {
    width: 224,
    textTransform: 'none',
    fontWeight: 'normal'
  }
}));

const BasicDetailEdit = props => {
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
    props.isDocumentUpdated(false);
  }, []);
  const [state, setState] = React.useState({
    qualification: analystDetails ? analystDetails.education : '',
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

  const onCancel = () => {
    // props.setDetailsPageEdit(false);
    props.setProfileDisplayPage(true);
  };

  console.log('@@@@@@@@@@@@@', props, state);

  return (
    // <Slide direction='down' in={true} timeout={500} mountOnEnter unmountOnExit>

    <div style={{ paddingLeft: '3.5rem' }}>
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
                ? props.signinData.user.UserAttributes.filter(item => item.Name === 'name')[0].Value.split(' ')[1]
                : ''
              : '',
          email:
            props.signinData &&
            props.signinData.user &&
            props.signinData.user.UserAttributes &&
            props.signinData.user.UserAttributes.filter(item => item.Name === 'email').length > 0
              ? props.signinData.user.UserAttributes.filter(item => item.Name === 'email')[0].Value
              : '',
          phone:
            props.signinData &&
            props.signinData.user &&
            props.signinData.user.UserAttributes &&
            props.signinData.user.UserAttributes.filter(item => item.Name === 'phone_number').length > 0
              ? props.signinData.user.UserAttributes.filter(item => item.Name === 'phone_number')[0].Value
              : '',
          trading_experience: analystDetails ? analystDetails.trading_experience : 0
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
        }}
        render={({ submitForm, isSubmitting, errors, touched, handleChange, values, handleSubmit, setFieldValue }) => (
          <form onSubmit={handleSubmit}>
            <Row>
              <Col lg={3} md={3} sm={3} xs={3}>
                <Profilepic style={{ float: 'left' }} />
              </Col>
              <Col lg={6} md={6} sm={6} xs={6} style={{ paddingLeft: '3.5rem' }}>
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
                <Row style={{ marginTop: '30px' }}>
                  <FormControl className={classes.formControl}>
                    <TextField
                      name='lastname'
                      helperText={touched.lastname ? errors.lastname : ''}
                      error={Boolean(errors.lastname)}
                      label='Last Name'
                      //type="password"
                      value={values.lastname}
                      onChange={handleChange}
                      fullWidth
                    />
                    {errors.lastname && touched.lastname}
                  </FormControl>
                </Row>
                <Row style={{ marginTop: '30px' }}>
                  <FormControl className={classes.formControl}>
                    <TextField
                      name='phone'
                      helperText={touched.phone ? errors.phone : ''}
                      error={Boolean(errors.phone)}
                      label='Phone'
                      //type="password"
                      value={values.phone}
                      onChange={handleChange}
                      fullWidth
                    />
                    {errors.phone && touched.phone}
                  </FormControl>
                </Row>
              </Col>
            </Row>
            <Row style={{ marginTop: '30px' }}>
              <FormControl className={classes.formControl}>
                <InputLabel shrink htmlFor='age-native-label-placeholder'>
                  Qualification
                </InputLabel>
                <Select
                  style={{ width: '26.5rem' }}
                  value={state.qualification}
                  //name="education"
                  helperText={touched.qualification ? errors.qualification : ''}
                  onChange={e => handleStateChange(e, 'qualification')}
                >
                  <option value=''>Select</option>
                  <option value={`Graduate/PG (No SEBI Certification)`}>Graduate/PG (No SEBI Certification)</option>
                  <option value={`SEBI RIA`}>{`SEBI RIA`}</option>
                  <option value={`SEBI Research Analyst`}>{`SEBI Research Analyst`}</option>
                  <option value={`NISM Research Analyst`}>{`NISM Research Analyst`}</option>
                  <option value={`CFA/CMT/FRM`}>CFA/CMT/FRM</option>
                </Select>
                <span style={{ color: '#f44336', fontSize: '0.75rem' }}>
                  {state.qualification === '' || state.qualification === null ? errors.qualification : ''}
                </span>
                {/* <FormHelperText>"Problem"</FormHelperText> */}
              </FormControl>
            </Row>
            <Row style={{ marginTop: '30px' }}>
              <FormControl className={classes.formControl}>
                <InputLabel shrink htmlFor='id-trading-experience' style={{ color: '#616161' }}>
                  Trading Exp.
                </InputLabel>
                <Select
                  style={{ width: '26.5rem' }}
                  value={state.tradingExperience}
                  onChange={e => handleStateChange(e, 'tradingExperience')}
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
                </Select>
              </FormControl>
            </Row>
            <Row style={{ marginTop: '30px' }}>
              <FormControl className={classes.formControl}>
                <InputLabel shrink htmlFor='certificate'>
                  Certification
                </InputLabel>
                <div
                  className='certificateInput'
                  id='certificate'
                  style={{ marginBottom: '0px', paddingBottom: '32px', width: '26.5rem' }}
                >
                  <label htmlFor='file' style={{ cursor: 'pointer' }}>
                    {fileCounter > 0 ? 'Files Selected' : 'Upload Certification'}
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
            </Row>
            <Row style={{ padding: '2rem 0px' }}>
              <Button
                variant='outlined'
                color='primary'
                className={classes.button}
                disabled={isSubmitting}
                style={{ borderColor: '#54E2B1', borderRadius: '1.5rem', color: 'black' }}
                onClick={onCancel}
              >
                Cancel
              </Button>
              {props.loader ? (
                <CircularProgress name='circle' color='primary' />
              ) : (
                <Button
                  className={classes.button}
                  disabled={isSubmitting}
                  type='submit'
                  style={{ backgroundColor: '#54E2B1', borderRadius: '1.5rem', marginLeft: '2rem', color: 'black' }}
                >
                  Save Details
                </Button>
              )}
            </Row>
          </form>
        )}
      />

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
              // props.changeHomeState(3);
              // props.setDetailsPageEdit(false);
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
        <DialogTitle id='alert-dialog-title'>for {state.qualification} kindly add your certification first</DialogTitle>
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
  );
};

const mapStateToProps = state => ({
  signinData: state.auth.signinData,
  loader: state.auth.loader,
  message: state.auth.message,
  analystDetails: state.analyst.analystDetails,
  documentUpdated: state.analyst.documentUpdated,
  loading: state.analyst.loading
});

const mapDispatchToProps = dispatch => ({
  // changePassword: params => dispatch(actions.changePassword(params)),
  setMessage: message => dispatch(actions.setMessage(message)),
  uploadDocument: data => dispatch(actions.uploadDocument(data)),
  updateAnalystBasicDetails: payload => dispatch(actions.updateAnalystBasicDetails(payload)),
  isDocumentUpdated: payload => dispatch(actions.documentUpdated(payload)),
  setProfileDisplayPage: param => dispatch(actions.setProfileDisplayPage(param))
});

export default connect(mapStateToProps, mapDispatchToProps)(BasicDetailEdit);
