/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/sort-comp */
/* eslint-disable global-require */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';
import { Row, Col, Image, ListGroup } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect } from 'react-redux';
import { Button, ButtonGroup, FormControl } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import DesktopWindowsOutlinedIcon from '@material-ui/icons/DesktopWindowsOutlined';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import ResizeImage from 'image-resize';
import Slider from '@material-ui/core/Slider';
import Cropper from 'react-easy-crop';
import getCroppedImg from '../AnalystProfileBrowser/cropImage';
import * as actions from '../../redux/actions/index';
import RotateRightIcon from '@material-ui/icons/RotateRight';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined';
import ContactSupportOutlinedIcon from '@material-ui/icons/ContactSupportOutlined';
import Slide from '@material-ui/core/Slide';
import Loading from '../Loading/Loading';

import { Mixpanel } from '../../shared/mixPanel';

class Profilepic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: this.props.profileImage ? this.props.profileImage : require('../../assets/images/jpeg/placeholder.jpg'),
      slectedImage: null,
      crop: { x: 0, y: 0 },
      zoom: 1,
      aspect: 5 / 5,
      croppedAreaPixels: null,
      fileName: null,
      fileType: null,
      croppedImage: null,
      rotation: 0
    };
  }

  componentDidUpdate(preState, preProps) {
    if (this.props.profileImage && this.state.image !== this.props.profileImage) {
      this.setState({
        image: this.props.profileImage
      });
    }
  }

  selectFile = event => {
    console.log('#######################', event);
    if (event.target.files && event.target.files.length > 0) {
      this.setState({
        slectedImage: window.URL.createObjectURL(event.target.files[0]),
        crop: { x: 0, y: 0 },
        zoom: 1,
        fileName: event.target.files[0].name,
        fileType: event.target.files[0].type
      });
    }
  };

  onCropChange = crop => {
    this.setState({ crop });
  };
  // onRotationChange = rotation => {
  //   this.setState({ rotation });
  // };
  onRotationChange = r => {
    let rotation = this.state.rotation + r;
    this.setState({ rotation });
  };
  onCropComplete = (croppedArea, croppedAreaPixels) => {
    console.log(croppedArea, croppedAreaPixels);
    this.setState({ croppedAreaPixels });
  };

  onZoomChange = zoom => {
    this.setState({ zoom });
  };

  getImage = async () => {
    const croppedImage = await getCroppedImg(
      this.state.slectedImage,
      this.state.croppedAreaPixels,
      this.state.fileName,
      this.state.fileType,
      this.state.rotation
    );
    console.log('donee', { croppedImage });
    this.setState({ slectedImage: null, croppedImage: croppedImage }, () => {
      var resizeImage = new ResizeImage({
        format: this.state.fileType,
        outputType: 'blob',
        width: 750,
        height: 750
      });
      resizeImage
        .play(window.URL.createObjectURL(this.state.croppedImage))
        .then(response => {
          console.log('!!!!!!!!!!!!!!!!!', response);
          var formData = new FormData();
          console.log(response);
          formData.append('field_name', 'profile_pic');
          formData.append('profile_pic', response);
          this.props.updateProfileImage({
            payload: formData
          });
          this.setState({
            croppedImage: null
          });
        })
        .catch(error => {
          console.error(error);
        });
    });
  };

  render() {
    return (
      <Row>
        <Row className='align-content-center justify-content-center'>
          <label className='profile_image'>
            <Image src={this.state.image} roundedCircle className='analyst-image' />
            <input
              className='profiel_image_input'
              type='file'
              accept='image/*'
              onChange={event => this.selectFile(event)}
              style={{ display: 'none' }}
            />
          </label>
        </Row>
        <Dialog
          open={this.state.slectedImage ? true : false}
          onClose={() => {
            this.setState({
              slectedImage: null
            });
          }}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
          style={{ height: '200', width: '200' }}
        >
          <DialogContent>
            <div className='row justify-content-center align-items-center'>
              <div className='col-3'>
                <DialogActions>
                  <Button
                    onClick={() => {
                      this.setState({
                        slectedImage: null
                      });
                    }}
                    autoFocus
                  >
                    <CloseIcon />
                  </Button>
                </DialogActions>
              </div>
              <div className='col-6'>
                <button onClick={() => this.onRotationChange(-90)} className='bg-transparent border-0'>
                  <RotateLeftIcon className='rotationIcon bg-transparent text-primary' />
                </button>
                <button onClick={() => this.onRotationChange(90)} className='bg-transparent border-0'>
                  <RotateRightIcon className='rotationIcon bg-transparent text-primary' />
                </button>
              </div>
              <div className='col-3'>
                <DialogActions>
                  <Button
                    onClick={() => {
                      this.getImage();
                    }}
                    autoFocus
                  >
                    <DoneIcon />
                  </Button>
                </DialogActions>
              </div>
            </div>
            <div className='p-2' style={{ height: '25vh', width: '25vw', position: 'relative' }}>
              <Cropper
                image={this.state.slectedImage}
                crop={this.state.crop}
                zoom={this.state.zoom}
                rotation={this.state.rotation}
                cropShape='round'
                showGrid={false}
                aspect={this.state.aspect}
                onCropChange={this.onCropChange}
                onRotationChange={this.onRotationChange}
                onCropComplete={this.onCropComplete}
                onZoomChange={this.onZoomChange}
              />
            </div>
            <div className='text-center controls m-2 p-2'>
              <Slider
                value={this.state.zoom}
                min={1}
                max={3}
                step={0.1}
                aria-labelledby='Zoom'
                onChange={(e, zoom) => this.onZoomChange(zoom)}
              />
            </div>
          </DialogContent>
        </Dialog>

        <Loading open={this.props.loading} popover />
      </Row>
    );
  }
}

const mapStateToProps = state => ({
  logoutLoading: state.auth.logoutLoading,
  logoutError: state.auth.logoutError,
  logoutData: state.auth.logoutData,
  logoutMessage: state.auth.logoutMessage,
  logoutShow: state.auth.logoutShow,
  signinData: state.auth.signinData,
  profileImage: state.auth.profileImage,
  analystDetails: state.analyst.analystDetails,
  subscriptionPlan: state.analyst.subscriptionPlan,
  userGroup: state.auth.userGroup,
  analystsForSubscriptionDetails: state.user.analystsForSubscriptionDetails,
  analystPortfolio: state.analyst.analystPortfolio,
  loading: state.analyst.loading
});

const mapDispatchToProps = dispatch => ({
  logout: path => dispatch(actions.logout(path)),
  // logoutalertshowhidedanger: () => dispatch(actions.logoutalertshowhidedanger()),
  // logoutalertshowhidedangerdismiss: () => dispatch(actions.logoutalertshowhidedangerdismiss()),
  updateName: namePayload => dispatch(actions.updateName(namePayload)),
  updateProfileImage: profileImage => dispatch(actions.updateProfileImage(profileImage)),
  getSubscriptionPlanList: token => dispatch(actions.getSubscriptionPlanList(token)),
  getAnalystPortfolio: token => dispatch(actions.getAnalystPortfolio(token))
  // getProfileImage: token => dispatch(actions.getProfileImage(token))
  // fetchPerformanceAndTransactionsData: params => dispatch(actions.fetchPerformanceAndTransactionsData(params))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Profilepic));
