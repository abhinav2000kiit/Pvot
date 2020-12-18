import * as actionTypes from '../constants';
import { updateObject } from '../../shared/utility';
import { switchToOtp } from '../actions/auth';
// import { getAvailableTradeBalance } from '../actions/auth';
// import { changeHomeState } from '../actions';

const initialState = {
  userAuthError: null,
  userAuthLoading: false,
  userAuthData: null,
  userAuthMessage: null,
  userAuthShow: false,
  switchToOtp: false,

  deviceToken: null,

  userGroup: null,
  signinError: null,
  signinLoading: false,
  signinData: null,
  signinMessage: null,
  signinShow: false,
  signupError: null,
  signupLoading: false,
  signupData: null,
  signupMessage: null,
  signupShow: false,
  verifyOtpError: null,
  verifyOtpLoading: false,
  verifyOtpData: null,
  verifyOtpMessage: null,
  verifyOtpShow: false,
  resendOtpError: null,
  resendOtpLoading: false,
  resendOtpData: null,
  resendOtpMessage: null,
  resendOtpShow: false,

  forgotPasswordError: null,
  forgotPasswordLoading: false,
  forgotPasswordData: null,
  forgotPasswordMessage: null,
  forgotPasswordShow: false,

  resetPasswordError: null,
  resetPasswordLoading: false,
  resetPasswordData: null,
  resetPasswordMessage: null,
  resetPasswordShow: false,
  logoutError: null,
  logoutLoading: false,
  logoutData: null,
  logoutMessage: null,
  logoutShow: false,
  homeState: 1,
  bankAccountDetails: null,
  erroBankDetails: null,
  isErrorBankDetails: false,
  errorSubscription: null,
  isErrorSubscriptionPlan: false,
  loader: false,
  message: null,
  availableTradeBalance: null,
  profileImage: null,
  instrumentTokens: null,
  webinarList: null
};

// device token

const deviceToken = (state, action) =>
  updateObject(state, {
    deviceToken: action.deviceToken
  });

// **********USER AUTH******************* //

const userAuthStart = (state, action) =>
  updateObject(state, {
    userAuthError: null,
    userAuthLoading: true,
    userAuthShow: false
  });

const userAuthSuccess = (state, action) =>
  updateObject(state, {
    userAuthData: action.userAuthData,
    userAuthLoading: false,
    userAuthError: null,
    userAuthShow: false
  });

const userAuthFail = (state, action) =>
  updateObject(state, {
    userAuthError: action.userAuthError,
    userAuthLoading: false,
    userAuthShow: true
  });

const userAuthMid = (state, action) =>
  updateObject(state, {
    userAuthMessage: action.userAuthMessage,
    userAuthLoading: false,
    userAuthShow: true,
    userAuthError: null
  });

const uaashd = (state, action) =>
  updateObject(state, {
    userAuthShow: true
  });

const uaashdd = (state, action) =>
  updateObject(state, {
    userAuthShow: false,
    userAuthLoading: false
  });

const switchToOtpFunc = (state, action) =>
  updateObject(state, {
    switchToOtp: action.payload
  });

// **********Sign In******************* //

const saveInstrumentToken = (state, action) =>
  updateObject(state, {
    instrumentTokens: action.payload
  });
const saveWebinarList = (state, action) =>
  updateObject(state, {
    webinarList: action.payload
  });
const clearInstrumentToken = (state, action) =>
  updateObject(state, {
    instrumentTokens: null
  });

const signinStart = (state, action) =>
  updateObject(state, {
    signinError: null,
    signinLoading: true,
    signinShow: false
  });

const signinSuccess = (state, action) =>
  updateObject(state, {
    signinData: action.signinData,
    signinLoading: false,
    signinError: null,
    signinShow: false
  });

const signinFail = (state, action) =>
  updateObject(state, {
    signinError: action.signinError,
    signinLoading: false,
    signinShow: true
  });

const signinMid = (state, action) =>
  updateObject(state, {
    signinMessage: action.signinMessage,
    signinLoading: false,
    signinShow: true,
    signinError: null
  });

const sashd = (state, action) =>
  updateObject(state, {
    signinShow: true
  });

const sashdd = (state, action) =>
  updateObject(state, {
    signinShow: false,
    signinLoading: false
  });

// **********Sign Up******************* //

const signupStart = (state, action) =>
  updateObject(state, {
    signupError: null,
    signupLoading: true,
    signupShow: false
  });

const signupSuccess = (state, action) =>
  updateObject(state, {
    signupData: action.signupData,
    signupLoading: false,
    signupError: null,
    signupShow: false
  });

const signupFail = (state, action) =>
  updateObject(state, {
    signupError: action.signupError,
    signupLoading: false,
    signupShow: true
  });

const signupMid = (state, action) =>
  updateObject(state, {
    signupMessage: action.signupMessage,
    signupLoading: false,
    signupShow: true,
    signupError: null
  });

const suashd = (state, action) =>
  updateObject(state, {
    signupShow: true
  });

const suashdd = (state, action) =>
  updateObject(state, {
    signupShow: false,
    signupLoading: false
  });

// **********Verify Otp******************* //

const verifyOtpStart = (state, action) =>
  updateObject(state, {
    verifyOtperror: null,
    verifyOtpLoading: true,
    verifyOtpShow: false
  });

const verifyOtpSuccess = (state, action) =>
  updateObject(state, {
    verifyOtpData: action.verifyOtpData,
    verifyOtpLoading: false,
    verifyOtpError: null,
    verifyOtpShow: false
  });

const verifyOtpFail = (state, action) =>
  updateObject(state, {
    verifyOtpError: action.verifyOtpError,
    verifyOtpLoading: false,
    verifyOtpShow: true
  });

const verifyOtpMid = (state, action) =>
  updateObject(state, {
    verifyOtpMessage: action.verifyOtpMessage,
    verifyOtpLoading: false,
    verifyOtpShow: true,
    verifyOtpError: null
  });

const voashd = (state, action) =>
  updateObject(state, {
    verifyOtpShow: true
  });

const voashdd = (state, action) =>
  updateObject(state, {
    verifyOtpShow: false,
    verifyOtpLoading: false
  });

// **********Resend Otp******************* //

const resendOtpStart = (state, action) =>
  updateObject(state, {
    resendOtpError: null,
    resendOtpLoading: true,
    resendOtpShow: false
  });

const resendOtpSuccess = (state, action) =>
  updateObject(state, {
    resendOtpData: action.resendOtpData,
    resendOtpLoading: false,
    resendOtpError: null,
    resendOtpShow: false
  });

const resendOtpFail = (state, action) =>
  updateObject(state, {
    resendOtpError: action.resendOtpError,
    resendOtpLoading: false,
    resendOtpShow: true
  });

const resendOtpMid = (state, action) =>
  updateObject(state, {
    resendOtpMessage: action.resendOtpMessage,
    resendOtpLoading: false,
    resendOtpShow: true,
    resendOtpError: null
  });

const roashd = (state, action) =>
  updateObject(state, {
    resendOtpShow: true
  });

const roashdd = (state, action) =>
  updateObject(state, {
    resendOtpShow: false,
    resendOtpLoading: false
  });

// ********** HOME SCREEN ******************* //
const changeHomeState = (state, action) =>
  updateObject(state, {
    homeState: action.payload
  });

// **********Forgot Password******************* //

const forgotPasswordStart = (state, action) =>
  updateObject(state, {
    forgotPasswordError: null,
    forgotPasswordLoading: true,
    forgotPasswordShow: false
  });

const forgotPasswordSuccess = (state, action) =>
  updateObject(state, {
    forgotPasswordData: action.forgotPasswordData,
    forgotPasswordLoading: false,
    forgotPasswordError: null,
    forgotPasswordShow: false
  });

const forgotPasswordFail = (state, action) =>
  updateObject(state, {
    forgotPasswordError: action.forgotPasswordError,
    forgotPasswordLoading: false,
    forgotPasswordShow: true
  });

const forgotPasswordMid = (state, action) =>
  updateObject(state, {
    forgotPasswordMessage: action.forgotPasswordMessage,
    forgotPasswordLoading: false,
    forgotPasswordShow: true,
    forgotPasswordError: null
  });

const fpashd = (state, action) =>
  updateObject(state, {
    forgotPasswordShow: true
  });

const fpashdd = (state, action) =>
  updateObject(state, {
    forgotPasswordShow: false,
    forgotPasswordLoading: false
  });

// **********Reset Password******************* //

const resetPasswordStart = (state, action) =>
  updateObject(state, {
    resetPasswordError: null,
    resetPasswordLoading: true,
    resetPasswordShow: false
  });

const resetPasswordSuccess = (state, action) =>
  updateObject(state, {
    resetPasswordData: action.resetPasswordData,
    resetPasswordLoading: false,
    resetPasswordError: null,
    resetPasswordShow: false
  });

const resetPasswordFail = (state, action) =>
  updateObject(state, {
    resetPasswordError: action.resetPasswordError,
    resetPasswordLoading: false,
    resetPasswordShow: true
  });

const resetPasswordMid = (state, action) =>
  updateObject(state, {
    resetPasswordMessage: action.resetPasswordMessage,
    resetPasswordLoading: false,
    resetPasswordShow: true,
    resetPasswordError: null
  });

const rpashd = (state, action) =>
  updateObject(state, {
    resetPasswordShow: true
  });

const rpashdd = (state, action) =>
  updateObject(state, {
    resetPasswordShow: false,
    resetPasswordLoading: false
  });

// **********Log Out******************* //

const logoutStart = (state, action) =>
  updateObject(state, {
    logoutError: null,
    logoutLoading: true,
    logoutShow: false
  });

const logoutSuccess = (state, action) =>
  updateObject(state, {
    logoutData: action.logoutData,
    logoutLoading: false,
    logoutError: null,
    logoutShow: false
  });

const logoutFail = (state, action) =>
  updateObject(state, {
    logoutError: action.logoutError,
    logoutLoading: false,
    logoutShow: true
  });

const logoutMid = (state, action) =>
  updateObject(state, {
    logoutMessage: action.logoutMessage,
    logoutLoading: false,
    logoutShow: true,
    logoutError: null
  });

const ltashd = (state, action) =>
  updateObject(state, {
    logoutShow: true
  });

const ltashdd = (state, action) =>
  updateObject(state, {
    logoutShow: false,
    logoutLoading: false
  });

const updateName = (state, action) => {
  console.log('update_name_action', action);
  updateObject(state, {
    signinData: {
      ...state.signinData,
      user: {
        ...state.signinData.user,
        UserAttributes: state.signinData.user.UserAttributes.map(item => {
          console.log('checking update name');
          if (item.Name === 'name') {
            return { Name: item.Name, Value: action.payload };
          }
          return item;
        })
      }
    }
  });
};

const updaBankDetails = (state, action) =>
  updateObject(state, {
    bankAccountDetails: action.payload,
    isErrorBankDetails: false
  });

const setMessage = (state, action) =>
  updateObject(state, {
    message: action.payload
  });

const errorCreateBankDetails = (state, action) =>
  updateObject(state, {
    erroBankDetails: action.payload,
    isErrorBankDetails: !state.isErrorBankDetails
  });
const setLoader = (state, action) =>
  updateObject(state, {
    loader: action.payload
  });
const errorCreateSubscriptionPlan = (state, action) =>
  updateObject(state, {
    errorCreateSubscriptionPlan: action.payload,
    isErrorSubscriptionPlan: !state.isErrorSubscriptionPlan
  });
const setAvailableTradeBalance = (state, action) =>
  updateObject(state, {
    availableTradeBalance: action.payload
  });
const setProfileImahe = (state, action) =>
  updateObject(state, {
    profileImage: action.payload
  });
const updateGroup = (state, action) =>
  updateObject(state, {
    userGroup: action.payload
  });

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.DEVICE_TOKEN:
      return deviceToken(state, action);

    case actionTypes.USER_AUTH_START:
      return userAuthStart(state, action);
    case actionTypes.USER_AUTH_SUCCESS:
      return userAuthSuccess(state, action);
    case actionTypes.USER_AUTH_FAILURE:
      return userAuthFail(state, action);
    case actionTypes.USER_AUTH_MID:
      return userAuthMid(state, action);
    case actionTypes.SWITCH_TO_OTP:
      return switchToOtpFunc(state, action);

    case actionTypes.USER_AUTH_ALERT_SHOW_HIDE_DANGER:
      return uaashd(state, action);
    case actionTypes.USER_AUTH_ALERT_SHOW_HIDE_DANGER_DISMISS:
      return uaashdd(state, action);

    case actionTypes.SET_GROUP:
      return updateGroup(state, action);
    case actionTypes.SIGNIN_START:
      return signinStart(state, action);
    case actionTypes.SIGNIN_SUCCESS:
      return signinSuccess(state, action);
    case actionTypes.SIGNIN_FAILURE:
      return signinFail(state, action);
    case actionTypes.SIGNIN_MID:
      return signinMid(state, action);
    case actionTypes.SIGNIN_ALERT_SHOW_HIDE_DANGER:
      return sashd(state, action);
    case actionTypes.SIGNIN_ALERT_SHOW_HIDE_DANGER_DISMISS:
      return sashdd(state, action);
    case actionTypes.SIGNUP_START:
      return signupStart(state, action);
    case actionTypes.SIGNUP_SUCCESS:
      return signupSuccess(state, action);
    case actionTypes.SIGNUP_FAILURE:
      return signupFail(state, action);
    case actionTypes.SIGNUP_MID:
      return signupMid(state, action);
    case actionTypes.SIGNUP_ALERT_SHOW_HIDE_DANGER:
      return suashd(state, action);
    case actionTypes.SIGNUP_ALERT_SHOW_HIDE_DANGER_DISMISS:
      return suashdd(state, action);
    case actionTypes.VERIFY_OTP_START:
      return verifyOtpStart(state, action);
    case actionTypes.VERIFY_OTP_SUCCESS:
      return verifyOtpSuccess(state, action);
    case actionTypes.VERIFY_OTP_FAILURE:
      return verifyOtpFail(state, action);
    case actionTypes.VERIFY_OTP_MID:
      return verifyOtpMid(state, action);
    case actionTypes.VERIFY_OTP_ALERT_SHOW_HIDE_DANGER:
      return voashd(state, action);
    case actionTypes.VERIFY_OTP_ALERT_SHOW_HIDE_DANGER_DISMISS:
      return voashdd(state, action);
    case actionTypes.RESEND_OTP_START:
      return resendOtpStart(state, action);
    case actionTypes.RESEND_OTP_SUCCESS:
      return resendOtpSuccess(state, action);
    case actionTypes.RESEND_OTP_FAILURE:
      return resendOtpFail(state, action);
    case actionTypes.RESEND_OTP_MID:
      return resendOtpMid(state, action);
    case actionTypes.RESEND_OTP_ALERT_SHOW_HIDE_DANGER:
      return roashd(state, action);
    case actionTypes.RESEND_OTP_ALERT_SHOW_HIDE_DANGER_DISMISS:
      console.log(action);
      return roashdd(state, action);

    case actionTypes.FORGOT_PASSWORD_START:
      return forgotPasswordStart(state, action);
    case actionTypes.FORGOT_PASSWORD_SUCCESS:
      return forgotPasswordSuccess(state, action);
    case actionTypes.FORGOT_PASSWORD_FAILURE:
      return forgotPasswordFail(state, action);
    case actionTypes.FORGOT_PASSWORD_MID:
      return forgotPasswordMid(state, action);
    case actionTypes.FORGOT_PASSWORD_ALERT_SHOW_HIDE_DANGER:
      return fpashd(state, action);
    case actionTypes.FORGOT_PASSWORD_ALERT_SHOW_HIDE_DANGER_DISMISS:
      return fpashdd(state, action);
    case actionTypes.RESET_PASSWORD_START:
      return resetPasswordStart(state, action);
    case actionTypes.RESET_PASSWORD_SUCCESS:
      return resetPasswordSuccess(state, action);
    case actionTypes.RESET_PASSWORD_FAILURE:
      return resetPasswordFail(state, action);
    case actionTypes.RESET_PASSWORD_MID:
      return resetPasswordMid(state, action);
    case actionTypes.RESET_PASSWORD_ALERT_SHOW_HIDE_DANGER:
      return rpashd(state, action);
    case actionTypes.RESET_PASSWORD_ALERT_SHOW_HIDE_DANGER_DISMISS:
      return rpashdd(state, action);
    case actionTypes.LOGOUT_START:
      return logoutStart(state, action);
    case actionTypes.LOGOUT_SUCCESS:
      return logoutSuccess(state, action);
    case actionTypes.LOGOUT_FAILURE:
      return logoutFail(state, action);
    case actionTypes.LOGOUT_MID:
      return logoutMid(state, action);
    case actionTypes.LOGOUT_ALERT_SHOW_HIDE_DANGER:
      return ltashd(state, action);
    case actionTypes.LOGOUT_ALERT_SHOW_HIDE_DANGER_DISMISS:
      return ltashdd(state, action);
    case actionTypes.CHANGE_HOME_STATE:
      return changeHomeState(state, action);
    case actionTypes.SET_UPDATED_NAME:
      console.log('action');
      return {
        ...state,
        signinData: {
          ...state.signinData,
          user: {
            ...state.signinData.user,
            UserAttributes:
              state.signinData.user.UserAttributes.filter(item => item.Name === 'name').length > 0
                ? state.signinData.user.UserAttributes.map(item => {
                    if (item.Name === 'name') {
                      return { Name: item.Name, Value: action.payload };
                    }
                    return item;
                  })
                : [...state.signinData.user.UserAttributes, { Name: 'name', Value: action.payload }]
          }
        }
      };
    case actionTypes.SET_UPDATED_EMAIL:
      console.log('action');
      return {
        ...state,
        signinData: {
          ...state.signinData,
          user: {
            ...state.signinData.user,
            UserAttributes:
              state.signinData.user.UserAttributes.filter(item => item.Name === 'email').length > 0
                ? state.signinData.user.UserAttributes.map(item => {
                    if (item.Name === 'email') {
                      return { Name: item.Name, Value: action.payload };
                    }
                    return item;
                  })
                : [...state.signinData.user.UserAttributes, { Name: 'email', Value: action.payload }]
          }
        }
      };
    case actionTypes.SET_UPDATED_DEMAT_ACCOUNTS:
      return {
        ...state,
        signinData: {
          ...state.signinData,
          user: {
            ...state.signinData.user,
            UserAttributes:
              state.signinData.user.UserAttributes.filter(item => item.Name === 'custom:default_broker').length > 0
                ? state.signinData.user.UserAttributes.map(item => {
                    if (item.Name === 'custom:default_broker') {
                      return {
                        Name: 'custom:default_broker',
                        Value: action.payload
                      };
                    }
                    return item;
                  })
                : [...state.signinData.user.UserAttributes, { Name: 'custom:default_broker', Value: action.payload }]
          }
        }
      };
    case actionTypes.SET_KYC_DETAILS_SUCCESS:
      return {
        ...state,
        signinData: {
          ...state.signinData,
          user: {
            ...state.signinData.user,
            UserAttributes:
              state.signinData.user.UserAttributes.filter(item => item.Name === 'custom:pan_card').length > 0
                ? state.signinData.user.UserAttributes.map(item => {
                    if (item.Name === 'custom:pan_card') {
                      return {
                        Name: 'custom:pan_card',
                        Value: action.payload[1].Value
                      };
                    } else if (item.Name === 'custom:aadhaar') {
                      return {
                        Name: 'custom:aadhaar',
                        Value: action.payload[0].Value
                      };
                    }
                    return item;
                  })
                : [
                    ...state.signinData.user.UserAttributes,
                    { Name: 'custom:pan_card', Value: action.payload[1].Value },
                    { Name: 'custom:aadhaar', Value: action.payload[0].Value }
                  ]
          }
        }
      };
    case actionTypes.GET_RISK_PROFILING_SCORE_SUCCESS:
      return {
        ...state,
        signinData: {
          ...state.signinData,
          user: {
            ...state.signinData.user,
            UserAttributes:
              state.signinData.user.UserAttributes.filter(item => item.Name === 'custom:risk_profiling_score').length >
              0
                ? state.signinData.user.UserAttributes.map(item => {
                    if (item.Name === 'custom:risk_profiling_score') {
                      return {
                        Name: 'custom:risk_profiling_score',
                        Value: action.score
                      };
                    }
                    return item;
                  })
                : [
                    ...state.signinData.user.UserAttributes,
                    { Name: 'custom:risk_profiling_score', Value: action.score }
                  ]
          }
        }
      };
    case actionTypes.SAVE_BANK_ACCOUNT:
      return updaBankDetails(state, action);
    case actionTypes.ERROR_CREATE_BANK_ACCOUNT:
      return errorCreateBankDetails(state, action);
    case actionTypes.RESET_ERROR_CREATE_SUBSCRIPTION:
      return errorCreateSubscriptionPlan(state, action);
    case actionTypes.SET_LOADER:
      return setLoader(state, action);
    case actionTypes.SET_MESSAGE:
      return setMessage(state, action);
    case actionTypes.SET_AVAILABLE_TRADE_BALANCE:
      return setAvailableTradeBalance(state, action);
    case actionTypes.SET_UPDATED_PROFILE_IMAGE:
      return setProfileImahe(state, action);
    case actionTypes.SAVE_INSTRUMENT_TOKENS:
      return saveInstrumentToken(state, action);
    case actionTypes.CLEAR_INSTRUMENT_TOKENS:
      return clearInstrumentToken(state, action);
    case actionTypes.SAVE_WEBINAR_LIST:
      return saveWebinarList(state, action);
    case actionTypes.CHECK_REFERRAL_CODE:
      return updateObject(state, {
        message: null
      });
    case actionTypes.GET_PAYMENT_SUBSCRIPTION_LINK:
      return updateObject(state, {
        message: null
      });
    case 'RESET_MESSAGE':
      return updateObject(state, {
        message: null
      });
    default:
      return state;
  }
};
