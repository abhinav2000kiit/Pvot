/**
 * Auth
 */

export {
  deviceToken,
  userAuthStart,
  userAuth,
  userAuthSuccess,
  userAuthFail,
  userauthalertshowhidedanger,
  userauthalertshowhidedangerdismiss,
  userAuthMid,
  updateSwitchToOtp,
  signinStart,
  signin,
  signinSuccess,
  signinFail,
  signinalertshowhidedanger,
  signinalertshowhidedangerdismiss,
  signinMid,
  signupStart,
  signup,
  signupSuccess,
  signupFail,
  signupalertshowhidedanger,
  signupalertshowhidedangerdismiss,
  signupMid,
  verifyOtpStart,
  verifyOtp,
  verifyOtpSuccess,
  verifyOtpFail,
  verifyotpalertshowhidedanger,
  verifyotpalertshowhidedangerdismiss,
  verifyOtpMid,
  resendOtpStart,
  resendOtp,
  resendOtpSuccess,
  resendOtpFail,
  resendotpalertshowhidedanger,
  resendotpalertshowhidedangerdismiss,
  resendOtpMid,
  forgotPasswordStart,
  forgotPassword,
  forgotPasswordSuccess,
  forgotPasswordFail,
  forgotpasswordalertshowhidedanger,
  forgotpasswordalertshowhidedangerdismiss,
  forgotPasswordMid,
  resetPasswordStart,
  resetPassword,
  resetPasswordSuccess,
  resetPasswordFail,
  resetpasswordalertshowhidedanger,
  resetpasswordalertshowhidedangerdismiss,
  resetPasswordMid,
  logoutStart,
  logout,
  logoutSuccess,
  logoutFail,
  logoutalertshowhidedanger,
  logoutalertshowhidedangerdismiss,
  logoutMid,
  changeHomeState,
  changePassword,
  createSubscriptionPlan,
  createBankAccount,
  setLoader,
  setMessage,
  placeTrade,
  getAvailableTradeBalance,
  setAvailableTradeBalance,
  uploadDocument,
  updateAnalystBasicDetails,
  fetchIntrumentTokens,
  saveInstrumentTokens,
  clearInstrumentTokens,
  getWebinarList,
  saveWebinarList
} from './auth';

export * from './analystAccount';

export * from './user';
