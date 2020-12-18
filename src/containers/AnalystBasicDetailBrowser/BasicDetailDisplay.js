import React, { useEffect } from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/index';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Loading from '../Loading/Loading';
import './BasicDetails.scss';
import DialogTitle from '@material-ui/core/DialogTitle';

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

  console.log('@@@@@@@@@@@@@', props);

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
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          console.log(`%%%%%%%%%%%%%%%values: `, values);
          props.setProfileDisplayPage(false);
          // props.setDetailsPageEdit(true);
        }}
        render={({ submitForm, isSubmitting, errors, touched, handleChange, values, handleSubmit, setFieldValue }) => (
          <form onSubmit={handleSubmit}>
            <Row>
              <Col lg={4} md={4} sm={4} xs={4}>
                <Image src={props.profileImage} roundedCircle className='analyst-image' />
              </Col>
              <Col lg={6} md={6} sm={6} xs={6} style={{ paddingLeft: '2.5rem' }}>
                <Row>
                  <div style={{ color: '#2B2B2B', fontSize: '16px' }}>
                    {values.firstname} {values.lastname}
                  </div>
                </Row>
                <Row style={{ marginTop: '30px' }}>
                  <div style={{ color: '#2B2B2B', fontSize: '16px' }}>{values.phone}</div>
                </Row>
                <Row style={{ marginTop: '30px' }}>
                  <Col>
                    <Row style={{ color: '#707070', fontSize: '14px' }}>Qualification</Row>
                    <Row style={{ color: '#2B2B2B', fontSize: '16px' }}>{state.qualification}</Row>
                  </Col>
                </Row>
                <Row style={{ marginTop: '30px' }}>
                  <Col>
                    <Row style={{ color: '#707070', fontSize: '14px' }}>Trading Experience</Row>
                    <Row style={{ color: '#2B2B2B', fontSize: '16px' }}>{state.tradingExperience} Years</Row>
                  </Col>
                </Row>
                <Row style={{ marginTop: '30px' }}>
                  <Col>
                    <Row style={{ color: '#707070', fontSize: '14px' }}>Certification</Row>
                    <Row style={{ color: '#2B2B2B', fontSize: '16px' }}>Certificate.pdf</Row>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row style={{ display: 'flex', justifyContent: 'center', padding: '2rem 0px' }}>
              <Button
                variant='outlined'
                className={classes.button}
                disabled={isSubmitting}
                type='submit'
                style={{
                  borderColor: '#54E2B1',
                  borderRadius: '3rem',
                  padding: '0.5rem 1rem 0.5rem 1rem',
                  color: '#2B2B2B'
                }}
              >
                Edit
              </Button>
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
  loading: state.analyst.loading,
  profileImage: state.auth.profileImage
});

const mapDispatchToProps = dispatch => ({
  setMessage: message => dispatch(actions.setMessage(message)),
  setProfileDisplayPage: param => dispatch(actions.setProfileDisplayPage(param))
});

export default connect(mapStateToProps, mapDispatchToProps)(BasicDetailEdit);
