import * as types from '../constants';

// device token

export const deviceToken = () => ({
  type: types.DEVICE_TOKEN
});

// **********USER AUTH******************* //

export const userAuthStart = () => ({
  type: types.USER_AUTH_START
});

export const userAuth = (userAuthPayloads, userAuthPath) => ({
  type: types.USER_AUTH,
  userAuthPayloads,
  userAuthPath
});

export const updateSwitchToOtp = payload => ({
  type: types.SWITCH_TO_OTP,
  payload
});

export const userAuthSuccess = userAuthData => ({
  type: types.USER_AUTH_SUCCESS,
  userAuthData
});

export const userAuthFail = userAuthError => ({
  type: types.USER_AUTH_FAILURE,
  userAuthError
});

export const userauthalertshowhidedanger = () => ({
  type: types.USER_AUTH_ALERT_SHOW_HIDE_DANGER
});

export const userauthalertshowhidedangerdismiss = () => ({
  type: types.USER_AUTH_ALERT_SHOW_HIDE_DANGER_DISMISS
});

export const userAuthMid = userAuthMessage => ({
  type: types.USER_AUTH_MID,
  userAuthMessage
});

// **********Sign In******************* //

export const signinStart = () => ({
  type: types.SIGNIN_START
});

export const signin = (signinPayloads, signinPath) => ({
  type: types.SIGNIN,
  signinPayloads,
  signinPath
});

export const signinSuccess = signinData => ({
  type: types.SIGNIN_SUCCESS,
  signinData
});

export const signinFail = siginError => ({
  type: types.SIGNIN_FAILURE,
  siginError
});

export const signinalertshowhidedanger = () => ({
  type: types.SIGNIN_ALERT_SHOW_HIDE_DANGER
});

export const signinalertshowhidedangerdismiss = () => ({
  type: types.SIGNIN_ALERT_SHOW_HIDE_DANGER_DISMISS
});

export const signinMid = signinMessage => ({
  type: types.SIGNIN_MID,
  signinMessage
});

// **********Sign Up******************* //

export const signupStart = () => ({
  type: types.SIGNUP_START
});

export const signup = (signupPayloads, signupPath) => ({
  type: types.SIGNUP,
  signupPayloads,
  signupPath
});

export const signupSuccess = signupData => ({
  type: types.SIGNUP_SUCCESS,
  signupData
});

export const signupFail = signupError => ({
  type: types.SIGNUP_FAILURE,
  signupError
});

export const signupalertshowhidedanger = () => ({
  type: types.SIGNUP_ALERT_SHOW_HIDE_DANGER
});

export const signupalertshowhidedangerdismiss = () => ({
  type: types.SIGNUP_ALERT_SHOW_HIDE_DANGER_DISMISS
});

export const signupMid = signupMessage => ({
  type: types.SIGNUP_MID,
  signupMessage
});

// **********Verify Otp******************* //

export const verifyOtpStart = () => ({
  type: types.VERIFY_OTP_START
});

export const verifyOtp = (verifyOtpPayloads, verifyOtpPath) => ({
  type: types.VERIFY_OTP,
  verifyOtpPayloads,
  verifyOtpPath
});

export const verifyOtpSuccess = verifyOtpData => ({
  type: types.VERIFY_OTP_SUCCESS,
  verifyOtpData
});

export const verifyOtpFail = verifyOtpError => ({
  type: types.VERIFY_OTP_FAILURE,
  verifyOtpError
});

export const verifyotpalertshowhidedanger = () => ({
  type: types.VERIFY_OTP_ALERT_SHOW_HIDE_DANGER
});

export const verifyotpalertshowhidedangerdismiss = path => ({
  type: types.VERIFY_OTP_ALERT_SHOW_HIDE_DANGER_DISMISS,
  path
});

export const verifyOtpMid = verifyOtpMessage => ({
  type: types.VERIFY_OTP_MID,
  verifyOtpMessage
});

// **********Resend Otp******************* //

export const resendOtpStart = () => ({
  type: types.RESEND_OTP_START
});

export const resendOtp = (resendOtpPayloads, resendOtpPath) => ({
  type: types.RESEND_OTP,
  resendOtpPayloads,
  resendOtpPath
});

export const resendOtpSuccess = resendOtpData => ({
  type: types.RESEND_OTP_SUCCESS,
  resendOtpData
});

export const resendOtpFail = resendOtpError => ({
  type: types.RESEND_OTP_FAILURE,
  resendOtpError
});

export const resendotpalertshowhidedanger = () => ({
  type: types.RESEND_OTP_ALERT_SHOW_HIDE_DANGER
});

export const resendotpalertshowhidedangerdismiss = path => ({
  type: types.RESEND_OTP_ALERT_SHOW_HIDE_DANGER_DISMISS,
  path
});

export const resendOtpMid = resendOtpMessage => ({
  type: types.RESEND_OTP_MID,
  resendOtpMessage
});

// **********Forgot Password******************* //

export const forgotPasswordStart = () => ({
  type: types.FORGOT_PASSWORD_START
});

export const forgotPassword = (forgotPasswordPayloads, forgotPasswordPath) => ({
  type: types.FORGOT_PASSWORD,
  forgotPasswordPayloads,
  forgotPasswordPath
});

export const forgotPasswordSuccess = forgotPasswordData => ({
  type: types.FORGOT_PASSWORD_SUCCESS,
  forgotPasswordData
});

export const forgotPasswordFail = forgotPasswordError => ({
  type: types.FORGOT_PASSWORD_FAILURE,
  forgotPasswordError
});

export const forgotpasswordalertshowhidedanger = () => ({
  type: types.FORGOT_PASSWORD_ALERT_SHOW_HIDE_DANGER
});

export const forgotpasswordalertshowhidedangerdismiss = path => ({
  type: types.FORGOT_PASSWORD_ALERT_SHOW_HIDE_DANGER_DISMISS,
  path
});

export const forgotPasswordMid = forgotPasswordMessage => ({
  type: types.FORGOT_PASSWORD_MID,
  forgotPasswordMessage
});

// **********Reset Password******************* //

export const resetPasswordStart = () => ({
  type: types.RESET_PASSWORD_START
});

export const resetPassword = (resetPasswordPayloads, resetPasswordPath) => ({
  type: types.RESET_PASSWORD,
  resetPasswordPayloads,
  resetPasswordPath
});

export const resetPasswordSuccess = resetPasswordData => ({
  type: types.RESET_PASSWORD_SUCCESS,
  resetPasswordData
});

export const resetPasswordFail = resetPasswordError => ({
  type: types.RESET_PASSWORD_FAILURE,
  resetPasswordError
});

export const resetpasswordalertshowhidedanger = () => ({
  type: types.RESET_PASSWORD_ALERT_SHOW_HIDE_DANGER
});

export const resetpasswordalertshowhidedangerdismiss = path => ({
  type: types.RESET_PASSWORD_ALERT_SHOW_HIDE_DANGER_DISMISS,
  path
});

export const resetPasswordMid = resetPasswordMessage => ({
  type: types.RESET_PASSWORD_MID,
  resetPasswordMessage
});

// **********Log Out******************* //

export const logoutStart = () => ({
  type: types.LOGOUT_START
});

export const logout = logoutPath => ({
  type: types.LOGOUT,
  logoutPath
});

export const logoutSuccess = logoutData => ({
  type: types.LOGOUT_SUCCESS,
  logoutData
});

export const logoutFail = logoutError => ({
  type: types.LOGOUT_FAILURE,
  logoutError
});

export const logoutalertshowhidedanger = () => ({
  type: types.LOGOUT_ALERT_SHOW_HIDE_DANGER
});

export const logoutalertshowhidedangerdismiss = () => ({
  type: types.LOGOUT_ALERT_SHOW_HIDE_DANGER_DISMISS
});

export const logoutMid = logoutMessage => ({
  type: types.LOGOUT_MID,
  logoutMessage
});

export const changePassword = payload => ({
  type: types.CHANGE_PASSWORD,
  payload
});

//******************** SET LOADER ******************* */
export const setLoader = payload => ({
  type: types.SET_LOADER,
  payload
});
//******************** ANALYST HOME STATE ******************* */

export const changeHomeState = payload => ({
  type: types.CHANGE_HOME_STATE,
  payload
});

//******************** ANALYST CREATE SUBSCRIPTION ******************* */
export const createSubscriptionPlan = payload => ({
  type: types.CREATE_SUBSCRIPTION_PLAN,
  payload
});
//******************** ANALYST BANK ACCOUNT CRAETION ******************* */
export const createBankAccount = payload => ({
  type: types.CREATE_BANK_ACCOUNT,
  payload
});
//******************** SET MESSAGE ******************* */
export const setMessage = payload => ({
  type: types.SET_MESSAGE,
  payload
});

//******************** TRADE ******************* */
export const placeTrade = payload => ({
  type: types.PLACE_TRADE,
  payload
});
export const getAvailableTradeBalance = payload => ({
  type: types.GET_AVAILABLE_TRADE_BALANCE,
  payload
});
export const setAvailableTradeBalance = payload => ({
  type: types.SET_AVAILABLE_TRADE_BALANCE,
  payload
});
export const fetchIntrumentTokens = payload => ({
  type: types.FETCH_INSTRUMENT_TOKENS,
  payload
});
export const saveInstrumentTokens = payload => ({
  type: types.SAVE_INSTRUMENT_TOKENS,
  payload
});
export const clearInstrumentTokens = payload => ({
  type: types.CLEAR_INSTRUMENT_TOKENS,
  payload
});
//******************** UPLOAD DOCUMENT ******************* */
export const uploadDocument = data => ({
  type: types.UPLOAD_DOCUMENT,
  payload: data
});

//******************** ANALYST UPDATE DETAILS ******************* */
export const updateAnalystBasicDetails = payload => ({
  type: types.UPDATE_ANALYST_BASIC_DETAILS,
  payload
});
//******************** WEBINAR ******************* */
export const getWebinarList = payload => ({
  type: types.GET_WEBINAR_LIST,
  payload
});
export const saveWebinarList = payload => ({
  type: types.SAVE_WEBINAR_LIST,
  payload
});
