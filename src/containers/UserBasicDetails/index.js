import React, { useEffect } from 'react';
import './UserBasicDetails.scss';
import { Row, Col, Image } from 'react-bootstrap';
import Header from '../components/Header/customHeader';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import BasicNavigator from '../components/BottomNavigator';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/index';
import { Typography } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import ResizeImage from 'image-resize';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Slider from '@material-ui/core/Slider';
import Cropper from 'react-easy-crop';
import DialogTitle from '@material-ui/core/DialogTitle';
import PublishIcon from '@material-ui/icons/Publish';
import CircularProgress from '@material-ui/core/CircularProgress';
import getCroppedImg from './cropImage';

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
  console.log('here!!!!!!!!!!!!!');
  const [open, setOpen] = React.useState(false);
  const [rotation, setRotation] = React.useState(0);
  const [state, setState] = React.useState({
    name:
      props.signinData &&
      props.signinData.user &&
      props.signinData.user.UserAttributes.filter(item => item.Name === 'name').length > 0
        ? props.signinData.user.UserAttributes.filter(item => item.Name === 'name')[0].Value
        : null,
    isEdit: false,
    image: props.profileImage ? props.profileImage : require('../../assets/images/jpeg/placeholder.jpg'),
    slectedImage: null,
    crop: { x: 0, y: 0 },
    zoom: 1,
    aspect: 5 / 5,
    croppedAreaPixels: null,
    fileName: null,
    fileType: null,
    croppedImage: null
  });
  let { message } = props;
  const [openDialog, setOpenDialog] = React.useState(false);
  React.useEffect(() => {
    console.log('useEffect+_+_+_+_+_+_+_+_+_+_+_+_+_+_');
    if (message !== null) {
      setOpenDialog(true);
    }
  }, [message]);
  useEffect(() => {}, []);
  const [someValueChanged, setSomeValueChanged] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const onNameChane = event => {
    setState({
      ...state,
      name: event.target.value
    });
  };

  const handleName = () => {
    setState({
      ...state,
      isEdit: true
    });
  };

  const selectFile = event => {
    if (event.target.files && event.target.files.length > 0) {
      setState({
        ...state,
        slectedImage: window.URL.createObjectURL(event.target.files[0]),
        crop: { x: 0, y: 0 },
        zoom: 1,
        fileName: event.target.files[0].name,
        fileType: event.target.files[0].type
      });
    }
  };

  const onCropChange = crop => {
    setState({ ...state, crop });
  };

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    console.log(croppedArea, croppedAreaPixels);
    setState({ ...state, croppedAreaPixels });
  };

  const onZoomChange = zoom => {
    setState({ ...state, zoom });
  };
  React.useEffect(() => {
    setState({
      ...state,
      image: props.profileImage ? props.profileImage : require('../../assets/images/jpeg/placeholder.jpg')
    });
  }, [props.profileImage]);
  const getImage = async () => {
    const croppedImage = await getCroppedImg(
      state.slectedImage,
      state.croppedAreaPixels,
      state.fileName,
      state.fileType,
      rotation
    );
    console.log('donee', { croppedImage });
    setState({ ...state, slectedImage: null, croppedImage: croppedImage });
  };

  React.useEffect(() => {
    if (state.croppedImage) {
      var resizeImage = new ResizeImage({
        format: state.fileType,
        outputType: 'blob',
        width: 750,
        height: 750
      });
      resizeImage.play(window.URL.createObjectURL(state.croppedImage)).then(response => {
        var formData = new FormData();
        console.log(response);
        formData.append('field_name', 'profile_pic');
        formData.append('profile_pic', response);
        props.updateProfileImage({
          accesstoken: props.signinData.token.AuthenticationResult.AccessToken,
          payload: formData
        });
        setState({ ...state, croppedImage: null });
      });
    }
  }, [state.croppedImage]);

  const handleNameEdit = () => {
    const preName =
      props.signinData &&
      props.signinData.user &&
      props.signinData.user.UserAttributes.filter(item => item.Name === 'name').length > 0 &&
      props.signinData.user.UserAttributes.filter(item => item.Name === 'name')[0].Value;
    if (state.isEdit) {
      setState({
        ...state,
        isEdit: false
      });
      if (state.name !== preName) {
        if (state.name && state.name !== '') props.updateName(state.name);
        else setState({ ...state, name: preName });
      }
    }
  };
  //console.log(`state: `,state)
  return (
    <div className='bg-white'>
      <Header someValueChanged={someValueChanged} title={`Personal Details`} />
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
        <Row className='mt-1'>
          <Col className='center-col'>
            <Row>
              <Image src={state.image} roundedCircle className='analyst-image' />
            </Row>
            <Row>
              <label className='profile_image text-primary' style={{ textDecoration: 'underline' }}>
                Upload Image
                <input
                  className='profiel_image_input'
                  type='file'
                  accept='image/*'
                  onChange={event => selectFile(event)}
                />
              </label>
            </Row>
            <Row className='mt-3'>
              <div className='signin-span-not-a-member-black'>
                <ClickAwayListener onClickAway={handleNameEdit}>
                  <FormControl>
                    <Input
                      id='Name'
                      className=''
                      placeholder='Firstname Lastname'
                      disableUnderline={!state.isEdit}
                      value={state.name}
                      onChange={event => onNameChane(event)}
                      fullWidth
                      autoComplete='off'
                      onClick={handleName}
                      focus={state.isEdit}
                      classes={{
                        input: 'name-text'
                      }}
                    />
                  </FormControl>
                </ClickAwayListener>
                {props.signinData &&
                  props.signinData.user &&
                  (props.signinData.user.UserAttributes.filter(item => item.Name === 'name').length === 0 ||
                    (props.signinData.user.UserAttributes.filter(item => item.Name === 'name').length > 0 &&
                      !props.signinData.user.UserAttributes.filter(item => item.Name === 'name')[0].Value)) && (
                    <p
                      style={{
                        fontSize: '12px',
                        color: '#212121',
                        opacity: '0.5'
                      }}
                    >
                      Click name field to edit
                    </p>
                  )}
              </div>
            </Row>
          </Col>
        </Row>
        <Row className=''>
          <div className='col-1'></div>
          <Col className='col-10'>
            <Row className='mt-3'>
              <span className='text-secondary  signin-span-not-a-member-black '>Mobile</span>
            </Row>
            <Row
              className='mt-1  user-basic-details-row d-flex justify-content-between'
              style={{ borderBotttom: '1px solid #212121' }}
            >
              <span className='signin-span-not-a-member-black'>
                {props.signinData &&
                  props.signinData.user.UserAttributes.filter(item => item.Name === 'phone_number')[0].Value}
              </span>
              <span className=' text-primary signin-forgot-password ' style={{ textDecoration: 'underLine' }}>
                Verify
              </span>
            </Row>
            <Row className='mt-3 '>
              <span className='text-secondary signin-span-not-a-member-black'>Email ID</span>
            </Row>
            <Row className='mt-1 mb-3 user-basic-details-row d-flex justify-content-between '>
              <span className='signin-span-not-a-member-black'>
                {props.signinData &&
                  props.signinData.user.UserAttributes.filter(item => item.Name === 'email')[0].Value}
              </span>
              <span className='text-primary signin-forgot-password' style={{ textDecoration: 'underLine' }}>
                Verify
              </span>
            </Row>
          </Col>
        </Row>

        <Paper className={classes.root} style={{ marginTop: '20px' }}>
          <Formik
            initialValues={{
              oldPassword: '',
              password: '',
              confirmPassword: ''
              // ,
              // password: '',
              // select: 'none',
              // tags: [],
              // rememberMe: true,
            }}
            validate={values => {
              const errors = {};
              if (!values.oldPassword) {
                errors.oldPassword = 'Enter your old password';
              }
              if (!values.password) {
                errors.password = 'Enter your new password';
              }
              if (!values.confirmPassword) {
                errors.confirmPassword = 'Repeat your new password';
              }
              if (values.password !== values.confirmPassword) {
                errors.confirmPassword = 'New passwords do not match!';
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(false);
              // let submitData = {
              //   ifscCode: values.password,
              //   accountNumber: values.confirm
              // }
              props.changePassword({
                accesstoken: props.signinData.token.AuthenticationResult.AccessToken,
                PreviousPassword: values.oldPassword,
                ProposedPassword: values.password,
                nextUrl: '/analyst-home'
              });
              console.log('password: ', values.password);
              console.log('CONFRIMpassword: ', values.confirmPassword);
              console.log('oldpassword: ', values.oldPassword);
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
                  <TextField
                    name='oldPassword'
                    helperText={touched.oldPassword ? errors.oldPassword : ''}
                    error={Boolean(errors.oldPassword)}
                    label='Old Password'
                    type='password'
                    value={values.oldPassword}
                    onChange={handleChange}
                    //fullWidth
                  />
                  {errors.oldPassword && touched.oldPassword}
                </Row>
                <Row style={{ marginTop: '20px' }}>
                  <TextField
                    name='password'
                    helperText={touched.password ? errors.password : ''}
                    error={Boolean(errors.password)}
                    label='New Password'
                    type='password'
                    value={values.password}
                    onChange={handleChange}
                    //fullWidth
                  />
                  {errors.password && touched.password}
                </Row>
                <Row style={{ marginTop: '20px' }}>
                  <TextField
                    name='confirmPassword'
                    helperText={touched.confirmPassword ? errors.confirmPassword : ''}
                    error={Boolean(errors.confirmPassword)}
                    label='Confirm Password'
                    type='password'
                    value={values.confirmPassword}
                    onChange={handleChange}
                    //fullWidth
                  />
                  {errors.confirmPassword && touched.confirmPassword}
                </Row>
                <Row style={{ display: 'flex', justifyContent: 'center', padding: '20px 0px' }}>
                  {props.loader ? (
                    <CircularProgress name='circle' color='primary' />
                  ) : (
                    <Button
                      variant='contained'
                      color='primary'
                      type='submit'
                      disabled={isSubmitting}
                      className={classes.button}
                    >
                      Update Password
                    </Button>
                  )}
                </Row>
              </form>
            )}
          />

          {/* <Row>
              <TextField
                label="Confirm Password"
                defaultValue="Hello World"
                className={classes.textField}
                margin="normal"
                type="password"
              />
            </Row> */}
          {/* <Row style={{display:'flex',justifyContent:'center', padding:'20px 0px'}}>
              <Button variant="contained" color="primary" className={classes.button}>
                Change Password
              </Button>
            </Row> */}
        </Paper>
        <Row style={{ display: 'flex', justifyContent: 'center', padding: '40px 50px', marginBottom: '30px' }}>
          <a href='#' style={{ color: 'red', textDecoration: 'underline' }} onClick={() => setOpen(true)}>
            Delete My Account
          </a>
        </Row>
      </div>
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
            }}
            color='primary'
            autoFocus
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={state.slectedImage}
        onClose={() => {
          setState({
            ...state,
            slectedImage: null
          });
        }}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
        fullWidth
      >
        <div className='crop-container'>
          <Cropper
            image={state.slectedImage}
            crop={state.crop}
            zoom={state.zoom}
            cropShape='round'
            showGrid={false}
            aspect={state.aspect}
            rotation={rotation}
            onCropChange={onCropChange}
            onCropComplete={onCropComplete}
            onRotationChange={setRotation}
            onZoomChange={onZoomChange}
          />
        </div>
        <div className='controls'>
          {/* <Typography variant='overline'>Rotation</Typography> */}
          <Slider
            value={state.zoom}
            min={1}
            max={3}
            step={0.1}
            aria-labelledby='Zoom'
            onChange={(e, zoom) => onZoomChange(zoom)}
          />
        </div>
        <div className='controls'>
          {/* <Typography variant='overline'>Rotation</Typography> */}
          <Slider
            value={rotation}
            min={0}
            max={360}
            step={90}
            aria-labelledby='Rotation'
            onChange={(e, rotation1) => setRotation(rotation1)}
          />
        </div>
        <DialogActions>
          <Button
            onClick={() => {
              getImage();
            }}
            color='primary'
            autoFocus
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
      <BasicNavigator />
    </div>
  );
};

const mapStateToProps = state => ({
  signinData: state.auth.signinData,
  loader: state.auth.loader,
  message: state.auth.message,
  profileImage: state.auth.profileImage
});

const mapDispatchToProps = dispatch => ({
  updateProfileImage: profileImage => dispatch(actions.updateProfileImage(profileImage)),
  changePassword: params => dispatch(actions.changePassword(params)),
  setMessage: message => dispatch(actions.setMessage(message))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BasicDetail);
