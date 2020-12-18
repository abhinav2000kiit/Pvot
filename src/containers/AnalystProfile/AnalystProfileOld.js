/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/sort-comp */
/* eslint-disable global-require */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';
import './AnalystProfile.scss';
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
import getCroppedImg from './cropImage';
import * as actions from '../../redux/actions/index';
import RotateRightIcon from '@material-ui/icons/RotateRight';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined';
import ContactSupportOutlinedIcon from '@material-ui/icons/ContactSupportOutlined';

class AnalystProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name:
        this.props.signinData &&
        this.props.signinData.user &&
        this.props.signinData.user.UserAttributes.filter(item => item.Name === 'name').length > 0
          ? this.props.signinData.user.UserAttributes.filter(item => item.Name === 'name')[0].Value === ' '
            ? null
            : this.props.signinData.user.UserAttributes.filter(item => item.Name === 'name')[0].Value
          : null,
      isEdit: false,
      analyst_followers: this.props.analystsForSubscriptionDetails
        ? this.props.analystsForSubscriptionDetails.followers_count
        : 0,
      analyst_subscribers: this.props.analystsForSubscriptionDetails
        ? this.props.analystsForSubscriptionDetails.subscriber_count
        : 0,
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

  componentDidMount() {
    if (this.props.signinData && this.props.userGroup === 'ANALYST' && !this.props.subscriptionPlan) {
      this.props.getSubscriptionPlanList(this.props.signinData.token.AuthenticationResult.AccessToken);
    }
    if (this.props.signinData && this.props.userGroup === 'ANALYST' && !this.props.subscriptionPlan) {
      this.props.getAnalystPortfolio(this.props.signinData.token.AuthenticationResult.AccessToken);
    }
    // if (this.props.analystDetails) {
    //   this.props.fetchPerformanceAndTransactionsData({
    //     analyst_id: this.props.analystDetails.user.user_id,
    //     token: this.props.signinData.token.AuthenticationResult.AccessToken
    //   });
    // }
    this.props.getProfileImage(this.props.signinData.token.AuthenticationResult.AccessToken);
  }

  handleLogoutSubmit = event => {
    event.preventDefault();
    const payloads = {
      accesstoken: this.props.signinData.token.AuthenticationResult.AccessToken
    };
    this.props.logout(payloads, '/signin');
    // this.props.history.push('/signin');
  };
  componentDidUpdate(preState, preProps) {
    if (this.props.profileImage && this.state.image !== this.props.profileImage) {
      this.setState({
        image: this.props.profileImage
      });
    }
  }

  onNameChange = event => {
    this.setState({
      name: event.target.value
    });
  };

  handleName = () => {
    this.setState({
      isEdit: true
    });
  };

  selectFile = event => {
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
          var formData = new FormData();
          console.log(response);
          formData.append('field_name', 'profile_pic');
          formData.append('profile_pic', response);
          this.props.updateProfileImage({
            accesstoken: this.props.signinData.token.AuthenticationResult.AccessToken,
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

  handleNameEdit = () => {
    const preName =
      this.props.signinData &&
      this.props.signinData.user &&
      this.props.signinData.user.UserAttributes.filter(item => item.Name === 'name').length > 0
        ? this.props.signinData.user.UserAttributes.filter(item => item.Name === 'name')[0].Value
        : null;
    if (this.state.isEdit) {
      this.setState({
        isEdit: false
      });
      if (this.state.name !== preName) {
        if (this.state.name && this.state.name !== '')
          this.props.updateName({
            AccessToken: this.props.signinData.token.AuthenticationResult.AccessToken,
            UserAttributes: [
              {
                Name: 'name',
                Value: this.state.name
              }
            ]
          });
        else this.setState({ name: preName });
      }
    }
  };

  render() {
    console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@', this.props);

    const { signinData, analystDetails, analystPortfolio, subscriptionPlan, logoutLoading } = this.props;

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
    // const allocationComplete = analystPortfolio ? (analystPortfolio.length > 0 ? true : false) : false;

    const subscriptionComplete = subscriptionPlan ? (subscriptionPlan.length > 0 ? true : false) : false;

    return (
      <Row className='container-fluid mainArea mb-5 py-2'>
        <Col className='center-col-special'>
          <Row className='topSection align-content-center'>
            <Col className='center-col'>
              <div className='analyst-profile-header'>Settings</div>
            </Col>
            {logoutLoading ? (
              <CircularProgress name='circle' />
            ) : (
              <div onClick={this.handleLogoutSubmit} className='logoutText'>
                <u>Logout</u>
              </div>
            )}
          </Row>

          {/* Section 1: Image, Name, Follower and Subscriber */}
          <Row className='ImageSection'>
            <Col className='center-col'>
              <Row className="profileImageSection align-content-center justify-content-center'">
                <label className='profile_image'>
                  <Image src={this.state.image} roundedCircle className='analyst-image' />
                  <input
                    className='profiel_image_input'
                    type='file'
                    accept='image/*'
                    onChange={event => this.selectFile(event)}
                  />
                </label>
              </Row>
              <Row className='fullNameSection align-content-center justify-content-center'>
                <ClickAwayListener onClickAway={this.handleNameEdit}>
                  <FormControl>
                    <input
                      id='Name'
                      className='fullName'
                      placeholder='Firstname Lastname'
                      disableUnderline={!this.state.isEdit}
                      value={this.state.name}
                      onChange={event => this.onNameChange(event)}
                      fullWidth
                      autoComplete='off'
                      onClick={this.handleName}
                      focus={this.state.isEdit}
                    />
                  </FormControl>
                </ClickAwayListener>
                {this.props.signinData &&
                  this.props.signinData.user &&
                  ((this.props.signinData.user.UserAttributes.filter(item => item.Name === 'name').length > 0 &&
                    !this.props.signinData.user.UserAttributes.filter(item => item.Name === 'name')[0].Value) ||
                    this.props.signinData.user.UserAttributes.filter(item => item.Name === 'name').length === 0) && (
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
              </Row>
              <Row className='followerSection align-content-center justify-content-center'>
                <Col className='mx-3'>
                  <Row className='mt-3 justify-content-center'>
                    <div className='followerCount'>{this.state.analyst_followers}</div>
                  </Row>
                  <Row>
                    <div className='followereTitle'>Followers</div>
                  </Row>
                </Col>
                <Col className='mt-3 mb-2'>
                  <div className='verticalLine'></div>
                </Col>
                <Col className='mx-3'>
                  <Row className='mt-3 justify-content-center'>
                    <div className='followerCount'>{this.state.analyst_subscribers}</div>
                  </Row>
                  <Row>
                    <div className='followereTitle'>Subscribers</div>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>

          {/* Section 2: Personal Details, Portfolio Allocation, Subscription Plan */}
          <div className='profileButtonArea mx-auto px-4'>
            <Typography align='center' className='profileButtonInfoText mx-auto'>
              {/* {signinDataName && tradingExp && education && allocationComplete && subscriptionComplete
                ? 'Edit your details by clicking bellow'
                : 'Complete your details to start trading'} */}
              {signinDataName && tradingExp && education && !allocationComplete && !subscriptionComplete
                ? 'Now complete the Portfolio Allocation'
                : signinDataName && tradingExp && education && allocationComplete && !subscriptionComplete
                ? 'Finally provide your Subscription Plan'
                : signinDataName && tradingExp && education && allocationComplete && subscriptionComplete
                ? 'You are ready to place a trade'
                : 'Complete your Profile to start trading'}
            </Typography>
            <div className='row my-2 fullProfileButton'>
              {signinDataName && tradingExp && education ? (
                <Button
                  variant='outlined'
                  className='btn-block rounded-lg py-2 px-1 profileButton'
                  onClick={() =>
                    this.props.history.push({
                      pathname: '/basic-detail'
                    })
                  }
                >
                  <div className='row buttonTextSection'>
                    <div className='mx-auto my-auto buttonText'>Profile</div>
                    <CheckCircleOutlinedIcon className='tikIcon mr-2 my-auto' />
                  </div>
                </Button>
              ) : (
                <Button
                  variant='outlined'
                  className='btn-block rounded-lg py-2 px-1 profileButton'
                  onClick={() =>
                    this.props.history.push({
                      pathname: '/basic-detail'
                    })
                  }
                >
                  <div className='row buttonTextSection'>
                    <div className='col mx-auto buttonText'>Profile</div>
                  </div>
                </Button>
              )}
            </div>
            <div className='row my-2 fullProfileButton'>
              {signinDataName && tradingExp && education ? (
                allocationComplete ? (
                  <Button
                    variant='outlined'
                    className='btn-block rounded-lg py-2 px-1 profileButton'
                    onClick={() =>
                      this.props.history.push({
                        pathname: '/allocate-my-trade'
                      })
                    }
                  >
                    <div className='row buttonTextSection'>
                      <div className='mx-auto my-auto buttonText'>Portfolio Allocation</div>
                      <CheckCircleOutlinedIcon className='tikIcon mr-2 my-auto' />
                    </div>
                  </Button>
                ) : (
                  <Button
                    variant='outlined'
                    className='btn-block rounded-lg py-2 px-1 profileButton'
                    onClick={() =>
                      this.props.history.push({
                        pathname: '/allocate-my-trade'
                      })
                    }
                  >
                    <div className='row buttonTextSection'>
                      <div className='col mx-auto buttonText'>Portfolio Allocation</div>
                    </div>
                  </Button>
                )
              ) : (
                <Button variant='outlined' className='btn-block rounded-lg py-2 px-1 profileDisabledButton'>
                  <div className='row buttonTextSection'>
                    <div className='col mx-auto DisabledButtonText'>Portfolio Allocation</div>
                  </div>
                </Button>
              )}
            </div>
            <div className='row my-2 fullProfileButton'>
              {signinDataName && tradingExp && education && allocationComplete ? (
                subscriptionComplete ? (
                  <Button
                    variant='outlined'
                    className='btn-block rounded-lg py-2 px-1 profileButton'
                    onClick={() => {
                      this.props.history.push({
                        pathname: '/create-subscription-plan'
                      });
                    }}
                  >
                    <div className='row buttonTextSection'>
                      <div className='mx-auto my-auto buttonText'>Subscription Plans</div>
                      <CheckCircleOutlinedIcon className='tikIcon mr-2 my-auto' />
                    </div>
                  </Button>
                ) : (
                  <Button
                    variant='outlined'
                    className='btn-block rounded-lg py-2 px-1 profileButton'
                    onClick={() => {
                      this.props.history.push({
                        pathname: '/create-subscription-plan'
                      });
                    }}
                  >
                    <div className='row buttonTextSection'>
                      <div className='col mx-auto buttonText'>Subscription Plans</div>
                    </div>
                  </Button>
                )
              ) : (
                <Button variant='outlined' className='btn-block rounded-lg py-2 px-1 profileDisabledButton'>
                  <div className='row buttonTextSection'>
                    <div className='col mx-auto DisabledButtonText'>Subscription Plans</div>
                  </div>
                </Button>
              )}
            </div>
          </div>

          {/* Section 3: User Manual */}
          <div className='userManualSection'>
            <Row className='mb-5'>
              <Col align='center' className=''>
                <button className='btn btn-link manualButton' onClick={() => this.props.history.push('/user-manual')}>
                  <ContactSupportOutlinedIcon /> User Manual
                </button>
              </Col>
            </Row>
          </div>

          {/* Section 4: FAQ, About and Privacy Policy */}
          <div className='bottomSection mx-auto'>
            <Row className='mx-auto'>
              <ButtonGroup variant='text' aria-label='text primary button group' align='center'>
                <span className='bottomButton' onClick={() => this.props.history.push('/expert-faqs')}>
                  FAQs
                </span>
                {/* <div className='bottomVerticalLine'></div> */}
                <span className='bottomButton' onClick={() => this.props.history.push('/privacy-policy')}>
                  Privacy Policy
                </span>
                {/* <div className='bottomVerticalLine'></div> */}
                <span className='bottomButton' onClick={() => this.props.history.push('/terms-of-use')}>
                  Terms of Use
                </span>
              </ButtonGroup>
            </Row>
          </div>
        </Col>
        <Dialog
          open={this.state.slectedImage}
          onClose={() => {
            this.setState({
              slectedImage: null
            });
          }}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
          fullWidth
          className='cropImageDialog'
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
            <div className='crop-container p-2'>
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
  bankAccountDetails: state.auth.bankAccountDetails,
  userGroup: state.auth.userGroup,
  analystsForSubscriptionDetails: state.user.analystsForSubscriptionDetails,
  analystPortfolio: state.analyst.analystPortfolio
});

const mapDispatchToProps = dispatch => ({
  logout: (params, path) => dispatch(actions.logout(params, path)),
  logoutalertshowhidedanger: () => dispatch(actions.logoutalertshowhidedanger()),
  logoutalertshowhidedangerdismiss: () => dispatch(actions.logoutalertshowhidedangerdismiss()),
  updateName: namePayload => dispatch(actions.updateName(namePayload)),
  updateProfileImage: profileImage => dispatch(actions.updateProfileImage(profileImage)),
  getSubscriptionPlanList: token => dispatch(actions.getSubscriptionPlanList(token)),
  getAnalystPortfolio: token => dispatch(actions.getAnalystPortfolio(token)),
  getProfileImage: token => dispatch(actions.getProfileImage(token))
  // fetchPerformanceAndTransactionsData: params => dispatch(actions.fetchPerformanceAndTransactionsData(params))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AnalystProfile));
