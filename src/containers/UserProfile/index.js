import React, { Fragment } from 'react';
import './UserProfile.scss';
import { Row, Col, Image, ListGroup } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect } from 'react-redux';
import { Button, FormControl, TextField } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import DesktopWindowsOutlinedIcon from '@material-ui/icons/DesktopWindowsOutlined';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Slider from '@material-ui/core/Slider';
import Cropper from 'react-easy-crop';
import ResizeImage from 'image-resize';
import getCroppedImg from './cropImage';
import * as actions from '../../redux/actions/index';
import KYC from '../KYC/KYC';
import Subscriptions from '../Subscriptions/Subscriptions';
import DematAccounts from './../DematAccounts/DematAccounts';
import RiskProfile from '../RiskProfile/RiskProfile';
import UserPreferencesList from './UserPreferences/UserPreferencesList';
import Slide from '@material-ui/core/Slide';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import ReferralVerification from '../ReferralVerification'


import { Mixpanel } from '../../shared/mixPanel';

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name:
        this.props.signinData &&
        this.props.signinData.user &&
        this.props.signinData.user.UserAttributes.filter(item => item.Name === 'name').length > 0
          ? this.props.signinData.user.UserAttributes.filter(item => item.Name === 'name')[0].Value
          : null,
      tempName: null,
      phoneNumber:
        this.props.signinData &&
        this.props.signinData.user.UserAttributes.filter(item => item.Name === 'phone_number')[0].Value,
      email:
        this.props.signinData &&
        this.props.signinData.user.UserAttributes.filter(item => item.Name === 'email')[0].Value,
      isEdit: false,
      tempEmail: null,
      analyst_followers: 0,
      image: this.props.profileImage ? this.props.profileImage : require('../../assets/images/jpeg/placeholder.jpg'),
      slectedImage: null,
      crop: { x: 0, y: 0 },
      zoom: 1,
      aspect: 5 / 5,
      croppedAreaPixels: null,
      fileName: null,
      fileType: null,
      croppedImage: null,
      rotation: 0,
      KYC:
        this.props.signinData &&
        this.props.signinData.user.UserAttributes.filter(item => item.Name === 'custom:pan_card')[0] &&
        this.props.signinData.user.UserAttributes.filter(item => item.Name === 'custom:pan_card')[0].Value &&
        this.props.signinData.user.UserAttributes.filter(item => item.Name === 'custom:aadhaar')[0] &&
        this.props.signinData.user.UserAttributes.filter(item => item.Name === 'custom:aadhaar')[0].Value
          ? true
          : false,
      openKYC: false,
      subscriptions: this.props.subscriptions && this.props.subscriptions.length > 0 ? true : false,
      openSubscriptions: false,
      dematAccounts:
        this.props.signinData &&
        this.props.signinData.user.UserAttributes.filter(item => item.Name === 'custom:default_broker')[0] &&
        this.props.signinData &&
        this.props.signinData.user.UserAttributes.filter(item => item.Name === 'custom:default_broker')[0].Value
          ? true
          : false,
      openDematAccounts: false,
      riskProfile: this.props.signinData.user.UserAttributes.filter(
        item => item.Name === 'custom:risk_profiling_score'
      )[0]
        ? true
        : false,
      openRiskProfile: false,
      preferences:
        this.props.userPreferencesDataSelected && this.props.userPreferencesDataSelected.length ? true : false,
      openPreferences: false,
      openReferralVerification: false,
      fetchingReferralCode: false,
    };
    this.openLowerScreen = this.openLowerScreen.bind(this);
    this.closeLowerScreen = this.closeLowerScreen.bind(this);
    this.resetDetails = this.resetDetails.bind(this);
  }
  componentDidMount() {
    this.props.getProfileImage();
    if (this.props.aadharNumber && this.props.panNumber && !this.state.KYC) {
      this.setState({
        KYC: true
      });
    }
    this.props.getPreferences();
    this.props.getSubscriptions();
    this.props.getReferredBy()
  }
  handleLogoutSubmit = event => {
    event.preventDefault();
    Mixpanel.track('Logout Clicked - Investor');
    this.props.logout('/signin');

    // this.props.history.push('/signin');
  };

  componentDidUpdate(preState, preProps) {
    if (this.props.profileImage && this.state.image !== this.props.profileImage) {
      this.setState({
        image: this.props.profileImage
      });
    }
    if (
      this.props.signinData &&
      this.props.signinData.user.UserAttributes.filter(item => item.Name === 'custom:pan_card')[0] &&
      this.props.signinData.user.UserAttributes.filter(item => item.Name === 'custom:pan_card')[0].Value &&
      this.props.signinData.user.UserAttributes.filter(item => item.Name === 'custom:aadhaar')[0] &&
      this.props.signinData.user.UserAttributes.filter(item => item.Name === 'custom:aadhaar')[0].Value &&
      !this.state.KYC
    ) {
      this.setState({
        KYC: true
      });
    }
    if (
      this.props.signinData.user.UserAttributes.filter(item => item.Name === 'custom:risk_profiling_score')[0] &&
      !this.state.riskProfile
    ) {
      this.setState({
        riskProfile: true
      });
    }
    if (
      this.props.signinData &&
      this.props.signinData.user.UserAttributes.filter(item => item.Name === 'custom:default_broker')[0] &&
      !this.state.dematAccounts
    ) {
      this.setState({
        dematAccounts: true
      });
    }
    if (
      this.props.userPreferencesDataSelected &&
      this.props.userPreferencesDataSelected.length &&
      !this.state.preferences
    ) {
      this.setState({
        preferences: true
      });
    }
    if (this.props.subscriptions && this.props.subscriptions.length > 0 && !this.state.subscriptions) {
      this.setState({
        subscriptions: true
      });
    }

  }

  onNameChange = event => {
    let lastChar = event.target.value[event.target.value.length - 1];
    if (
      (lastChar >= 'a' && lastChar <= 'z') ||
      (lastChar >= 'A' && lastChar <= 'Z') ||
      lastChar === ' ' ||
      lastChar === undefined
    ) {
      this.setState({
        name: event.target.value
      });
    }
  };
  onEmailChange = event => {
    this.setState({
      email: event.target.value
    });
  };

  resetDetails() {
    const { tempName, tempEmail, name, email } = this.state;
    this.setState(
      {
        isEdit: false,
        name: tempName ? tempName : name,
        email: tempEmail ? tempEmail : email
      },
      () => console.log(this.state.isEdit)
    );
  }
  handleName = () => {
    const { name, email } = this.state;
    this.setState(
      {
        isEdit: true,
        tempName: name,
        tempEmail: email
      },
      () => console.log(this.state.isEdit)
    );
  };

  selectFile = event => {
    console.log(event.target.files[0]);
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
  onRotationChange = rotation => {
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
    Mixpanel.track('Edit info Clicked - Investor');
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
    const preEmail =
      this.props.signinData &&
      this.props.signinData.user &&
      this.props.signinData.user.UserAttributes.filter(item => item.Name === 'email').length > 0
        ? this.props.signinData.user.UserAttributes.filter(item => item.Name === 'email')[0].Value
        : null;
    if (this.state.isEdit) {
      this.setState({
        isEdit: false
      });
      if (this.state.email !== preEmail) {
        if (this.state.email && this.state.email !== '')
          this.props.updateEmail({
            UserAttributes: [
              {
                Name: 'email',
                Value: this.state.email
              }
            ]
          });
        else this.setState({ email: preEmail });
      }
    }
  };

  openLowerScreen(e, screenName) {
    this.resetDetails();
    console.log(screenName);
    this.closeLowerScreen(e);
    this.setState({
      [screenName]: true
    });
  }
  closeLowerScreen(e) {
    console.log('check1');
    this.setState({
      openKYC: false,
      openSubscriptions: false,
      openDematAccounts: false,
      openPreferences: false,
      openRiskProfile: false,
      openReferralVerification: false
    });
  }
  fetchReferralCode(){
    this.props.getReferralCode()
    this.setState({
      fetchingReferralCode: true
    })
  }

  

  render() {
    console.log('from reducer', this.props.profileImage);
    let lowerScreen = null;
    if (this.state.openKYC) lowerScreen = <KYC closeLowerScreen={this.closeLowerScreen} />;
    else if (this.state.openSubscriptions) lowerScreen = <Subscriptions closeLowerScreen={this.closeLowerScreen} />;
    else if (this.state.openDematAccounts) lowerScreen = <DematAccounts closeLowerScreen={this.closeLowerScreen} />;
    else if (this.state.openRiskProfile) lowerScreen = <RiskProfile closeLowerScreen={this.closeLowerScreen} />;
    else if (this.state.openPreferences) lowerScreen = <UserPreferencesList closeLowerScreen={this.closeLowerScreen} />;
    else if (this.state.openReferralVerification) lowerScreen = <ReferralVerification closeLowerScreen={this.closeLowerScreen} />
    return (
      <Slide direction='left' in={true} timeout={300} mountOnEnter unmountOnExit>
        <div>
          <Row className='parent'>
            <Col style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <Row className='mt-4'>
                  <Col className='center-col'>
                    <Image
                      style={{ position: 'absolute', left: '12px', height: '150%' }}
                      src={require('../../assets/images/svg/Logo.svg')}
                    />
                    <div className='analyst-profile-header signin-span-not-a-member-blue mr-5'>Profile</div>
                  </Col>
                </Row>

                {lowerScreen ? (
                  <Row onClick={this.closeLowerScreen} className='blackScreen'>
                    <Col></Col>
                  </Row>
                ) : null}
                {!this.state.isEdit ? (
                  <Row>
                    <Col className='my-3 right-col'>
                      <span className='color-blue small pointer' onClick={this.handleName}>
                        Edit Info
                      </span>
                    </Col>
                  </Row>
                ) : (
                  <Row>
                    <Col
                      className='my-3'
                      style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                    >
                      <span className='color-blue small pointer' onClick={this.resetDetails}>
                        <Image src={require('../../assets/images/svg/close-icon.svg')} className='close' />
                      </span>
                      <span className='color-blue small pointer' onClick={this.handleNameEdit}>
                        Save Info
                      </span>
                    </Col>
                  </Row>
                )}

                {/* <div style={{display: 'flex', flexDirection: 'column' ,justifyContent:'space-between', minHeight: '90vh'}}> */}
                <div className='ctn'>
                  <div
                    className='transition p-2'
                    style={{
                      boxShadow: this.state.isEdit ? '0 0 16px 0 rgba(0,0,0,0.2)' : '0 0 0px 0 rgba(0,0,0,0.2)'
                    }}
                  >
                    <Row className=''>
                      <Col className='col-5'>
                        <Image src={this.state.image} roundedCircle width='100px' />
                      </Col>
                      <Col className='col-7 center-col-space-evenly'>
                        {this.state.isEdit ? (
                          <input
                            value={this.state.name}
                            onChange={this.onNameChange}
                            readOnly={!this.state.isEdit}
                            className=''
                            style={{
                              color: 'black',
                              borderBottom: '1px solid'
                            }}
                          />
                        ) : (
                          <span>{this.state.name}</span>
                        )}
                        {this.state.isEdit ? (
                          <input
                            value={this.state.email !== ' ' ? this.state.email : null}
                            onChange={this.onEmailChange}
                            readOnly={!this.state.isEdit}
                            placeholder='Add Email'
                            className=''
                            style={{
                              color: 'black',
                              borderBottom: '1px solid'
                            }}
                          />
                        ) : (
                          <span className=''>
                            {this.state.email !== ' ' ? (
                              this.state.email
                            ) : (
                              <span style={{ opacity: 0.8 }}>Add Email</span>
                            )}
                          </span>
                        )}
                        <span
                          className=''
                          style={{ display: 'flex', alignItems: 'center', opacity: this.state.isEdit ? 0.8 : 1 }}
                        >
                          {this.state.phoneNumber}{' '}
                          <Image className='ml-1' src={require('../../assets/images/svg/tick.svg')} />
                        </span>
                      </Col>
                    </Row>
                    <Row className='mt-2'>
                      <Col className='col-5 smaller' style={{ display: this.state.isEdit ? 'block' : 'none' }}>
                        <center>
                          <label className='color-blue'>
                            Change Photo
                            <input
                              style={{ display: 'none' }}
                              className='profiel_image_input'
                              type='file'
                              accept='image/*'
                              onChange={event => this.selectFile(event)}
                            />
                          </label>
                        </center>
                      </Col>
                    </Row>
                  </div>

                  <Row className='mt-2'>
                    <Col>
                      <ul>
                        <li className='list mt-3' onClick={e => {
                          Mixpanel.track('Preferences Clicked - Investor');
                          this.openLowerScreen(e, 'openPreferences')}}>
                          <span>My Preferences</span>
                          {this.state.preferences ? (
                            <Image className='tick' src={require('../../assets/images/svg/tick.svg')} />
                          ) : null}
                        </li>
                        <li className='list mt-3' onClick={e => {
                          Mixpanel.track('Subscriptions Clicked - Investor');
                          this.openLowerScreen(e, 'openSubscriptions')}}>
                          <span>My Subscriptions</span>
                          {this.state.subscriptions ? (
                            <Image className='tick' src={require('../../assets/images/svg/tick.svg')} />
                          ) : null}
                        </li>
                        <li className='list mt-3' onClick={e => {
                          Mixpanel.track('Demataccounts Clicked - Investor');
                          this.openLowerScreen(e, 'openDematAccounts')}}>
                          <span>My Demat Accounts</span>
                          {this.state.dematAccounts ? (
                            <Image className='tick' src={require('../../assets/images/svg/tick.svg')} />
                          ) : null}
                        </li>
                        <li className='list mt-3' onClick={e => {
                          Mixpanel.track('Risk Profile Clicked - Investor');
                          this.openLowerScreen(e, 'openRiskProfile')}}>
                          <span>My Risk Profile</span>
                          {this.state.riskProfile ? (
                            <Image className='tick' src={require('../../assets/images/svg/tick.svg')} />
                          ) : null}
                        </li>
                        <li className='list mt-3' onClick={(e) => this.props.history.push('/blogs')}>
                          Blogs
                        </li>
                        {this.props.referredBy ? null : <li className='list mt-3' onClick={(e) => this.openLowerScreen(e, 'openReferralVerification')}>
                          Enter Referral Code
                        </li>}
                        <li className='list mt-3' onClick={() => {
                          Mixpanel.track('Help Center Clicked - Investor');
                          this.props.history.push('/investor-faqs')}}>
                          <span>Help Center</span>
                        </li>
                      </ul>
                    </Col>
                  </Row>

                  <Row className='mt-2'>
                    <Col className='center-col'>
                      <Row>
                        <div>
                          {this.props.logoutLoading ? (
                            <CircularProgress name='circle' color='primary' />
                          ) : (
                            <Row
                              className='bg-white user-logout'
                              onClick={this.handleLogoutSubmit}
                              style={{ cursor: 'pointer' }}
                            >
                              <Col className='center-col'>
                                <div className='logout color-blue'>Logout</div>
                              </Col>
                            </Row>
                          )}
                        </div>
                      </Row>
                    </Col>
                  </Row>
                </div>
              </div>
              <div>
                <Row className='text-center'>
                  <Col className='privacy-policy'>
                    <span className='small color-blue' onClick={() => this.props.history.push('/privacy-policy')}>
                      Privacy Policy
                    </span>
                  </Col>
                  <Col>
                    <span className='small color-blue' onClick={() => this.props.history.push('/terms')}>                                                                                                                                                                                                                       
                      Terms of Use
                    </span>
                  </Col>                                                                                                                            
                </Row>
                
              </div>
              <div style={{ marginBottom: '60px' }} />
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
            >
              <div className='crop-container'>
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
              <div className='controls'>
                <Slider
                  value={this.state.zoom}
                  min={1}
                  max={3}
                  step={0.1}
                  aria-labelledby='Zoom'
                  onChange={(e, zoom) => this.onZoomChange(zoom)}
                />
              </div>
              <div className='controls'>
                {/* <Typography variant='overline'>Rotation</Typography> */}
                <Slider
                  value={this.state.rotation}
                  min={0}
                  max={360}
                  step={90}
                  aria-labelledby='Rotation'
                  onChange={(e, rotation) => this.onRotationChange(rotation)}
                />
              </div>

              <DialogActions>
                <Button
                  onClick={() => {
                    this.getImage();
                  }}
                  color='primary'
                  autoFocus
                >
                  OK
                </Button>
              </DialogActions>
            </Dialog>
            
          </Row>
          {lowerScreen}
        </div>
      </Slide>
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
  bankAccountDetails: state.auth.bankAccountDetails,
  userGroup: state.auth.userGroup,
  panNumber: state.user.panNumber,
  aadharNumber: state.user.aadharNumber,
  userPreferencesDataSelected: state.user.userPreferencesDataSelected,
  subscriptions: state.user.subscriptions,
  referralCode: state.user.referralCode,
  message: state.auth.message,
  referredBy: state.user.referredBy
});

const mapDispatchToProps = dispatch => ({
  logout: path => dispatch(actions.logout(path)),
  // // logoutalertshowhidedanger: () => dispatch(actions.logoutalertshowhidedanger()),
  // logoutalertshowhidedangerdismiss: () => dispatch(actions.logoutalertshowhidedangerdismiss()),
  updateName: namePayload => dispatch(actions.updateName(namePayload)),
  updateEmail: emailPayload => dispatch(actions.updateEmail(emailPayload)),
  updateProfileImage: profileImage => dispatch(actions.updateProfileImage(profileImage)),
  getProfileImage: token => dispatch(actions.getProfileImage(token)),
  getPreferences: () => dispatch(actions.getPreferences()),
  // getRiskProfileQuestions: () => dispatch(actions.getRiskProfileQuestions()),
  getSubscriptions: token => dispatch(actions.getSubscriptions(token)),
  getReferralCode: () => dispatch(actions.getReferralCode()),
  checkReferralCode: (payload) => dispatch(actions.checkReferralCode(payload)),
  getReferredBy: () => dispatch(actions.getReferredBy())
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserProfile));
