import { call, put, takeEvery, takeLatest, select } from 'redux-saga/effects';
import { push } from 'connected-react-router/immutable';
import api from '../../network';
import utils from '../../theme/utils';
export const getSigninData = state => state.auth.signinData;

// ********** USER AUTH******************* //

function* user_auth_worker(request) {
  const signinData = yield select(getSigninData); //  get the redux object

  const { userAuthPayloads, userAuthPath } = request;
  yield put({ type: 'USER_AUTH_START' });
  try {
    const response = yield call(api.userAuth, userAuthPayloads);
    const checkStatus = utils.checkAPIfailure(response);
    if (checkStatus.hasOwnProperty('success') && checkStatus.success === true) {
      yield put({ type: 'USER_AUTH_SUCCESS', userAuthData: checkStatus });
      yield put({ type: 'SWITCH_TO_OTP', payload: true });
      if (userAuthPath) {
        yield put(push({ pathname: userAuthPath, state: { detail: 'userAuth', userAuthData: checkStatus } }));
      }
    } else {
      yield put({ type: 'SWITCH_TO_OTP', payload: false });
      yield put({ type: 'USER_AUTH_MID', userAuthMessage: checkStatus });
      yield put({ type: 'USER_AUTH_ALERT_SHOW_HIDE_DANGER' });
    }
  } catch (error) {
    const checkStatus = utils.checkAPIfailure(error);
    yield put({ type: 'SWITCH_TO_OTP', payload: false });
    yield put({ type: 'USER_AUTH_FAILURE', userAuthError: checkStatus });
    yield put({ type: 'USER_AUTH_ALERT_SHOW_HIDE_DANGER' });
  }
}

function* user_auth_alert_dismiss_worker(request) {
  const { path } = request;
  yield put(push(path));
}

// **********Sign In******************* //

function* signin_worker(request) {
  const signinData = yield select(getSigninData); //  get the redux object

  const { signinPayloads, signinPath } = request;
  yield put({ type: 'SIGNIN_START' });
  console.log('signin data --->', signinPayloads);
  try {
    const response = yield call(api.signin, signinPayloads);
    console.log(`response ------------> `, response);
    const checkStatus = utils.checkAPIfailure(response);
    console.log('check status : ' + checkStatus.hasOwnProperty('groups'));
    if (checkStatus.hasOwnProperty('success') && checkStatus.success === true) {
      if (checkStatus.hasOwnProperty('groups')) {
        if (checkStatus.groups[0].GroupName === signinPayloads.group) {
          yield put({ type: 'SIGNIN_SUCCESS', signinData: checkStatus });
          yield put(push(signinPath));
        } else {
          console.log('no group or not same group');
          yield put({ type: 'SIGNIN_FAILURE', signinError: 'User group does not matched the selected group' });
          yield put({ type: 'SIGNIN_ALERT_SHOW_HIDE_DANGER' });
        }
      } else {
        console.log('no group wrong otp');
        console.log(checkStatus);
        yield put({ type: 'SIGNIN_FAILURE', signinError: 'You have entered a wrong verification code!' });
        yield put(push({ pathname: 'verify-otp', state: { detail: 'userAuth', userAuthData: checkStatus } }));
        yield put({ type: 'SIGNIN_ALERT_SHOW_HIDE_DANGER' });
      }
    } else {
      console.log('error mid');
      yield put({ type: 'SIGNIN_MID', signinMessage: checkStatus });
      yield put({ type: 'SIGNIN_ALERT_SHOW_HIDE_DANGER' });
    }
  } catch (error) {
    console.log('singup failure in last catch');
    const checkStatus = utils.checkAPIfailure(error);
    yield put({ type: 'SIGNIN_FAILURE', signinError: checkStatus });
    yield put({ type: 'SIGNIN_ALERT_SHOW_HIDE_DANGER' });
  }
}
// ************* device token ********** //

function* device_token(request) {
  let signinData = yield select(getSigninData); //  get the redux object

  let tokenData = localStorage.getItem('deviceToken');
  try {
    let payload = { device_token: JSON.parse(tokenData) };
    const tokenRes = yield call(api.deviceToken, payload, signinData.token.AuthenticationResult.AccessToken);
    const checkStatus = utils.checkAPIfailure(tokenRes);
    if (checkStatus.hasOwnProperty('success') && checkStatus.success === true) {
      console.log(':::::::SILENTLY UPDATED:::::::::::');
      console.log(tokenRes);
      console.log('::::::::::::::::::::::::::::::::::');
    } else {
      console.log('failed updating device token');
    }
  } catch (error) {
    console.log(error);

    const checkStatus = utils.checkAPIfailure(error);
    console.log(checkStatus);

    if (checkStatus.Error && checkStatus.Error.Message && checkStatus.Error.Message === 'Access Token has expired') {
      // change funcName to the current function name so that it gets called back
      const params = {
        funcName: device_token,
        params: request
      };
      yield call(refreshTokenFunc, params);
    } else if (
      checkStatus.Error &&
      checkStatus.Error.Message &&
      checkStatus.Error.Message === 'Access Token has been revoked'
    ) {
      yield put({ type: 'LOGOUT_SUCCESS' });
      // window.localStorage.clear();
      window.localStorage.removeItem('notification');
      window.localStorage.removeItem('notifications');
      yield put(push('/user-analyst'));
    } else {
      console.log('Network Err! or Internal Server Err!');
    }
  }
}

// **********Sign Up******************* //

function* signup_worker(request) {
  const signinData = yield select(getSigninData); //  get the redux object

  const { signupPayloads, signupPath } = request;
  yield put({ type: 'SIGNUP_START' });
  try {
    const response = yield call(api.signup, signupPayloads);
    const checkStatus = utils.checkAPIfailure(response);
    if (checkStatus.hasOwnProperty('success') && checkStatus.success === true) {
      yield put({ type: 'SIGNUP_SUCCESS' });
      yield put(
        push({
          pathname: signupPath,
          state: { detail: 'signup', mobilenumber: signupPayloads.UserAttributes[0].Value }
        })
      );
    } else {
      yield put({ type: 'SIGNUP_MID', signupMessage: checkStatus });
      yield put({ type: 'SIGNUP_ALERT_SHOW_HIDE_DANGER' });
    }
  } catch (error) {
    const checkStatus = utils.checkAPIfailure(error);
    yield put({ type: 'SIGNUP_FAILURE', signupError: checkStatus });
    yield put({ type: 'SIGNUP_ALERT_SHOW_HIDE_DANGER' });
  }
}

// **********Verify Otp******************* //

function* verify_otp_worker(request) {
  const signinData = yield select(getSigninData); //  get the redux object

  const { verifyOtpPayloads, verifyOtpPath } = request;
  yield put({ type: 'VERIFY_OTP_START' });
  try {
    const response = yield call(api.verifyOtp, verifyOtpPayloads);
    const checkStatus = utils.checkAPIfailure(response);
    if (checkStatus.hasOwnProperty('success') && checkStatus.success === true) {
      console.log(verifyOtpPath);
      yield put({ type: 'VERIFY_OTP_SUCCESS', verifyOtpData: checkStatus });
      yield put(push({ pathname: verifyOtpPath }));
    } else {
      yield put({ type: 'VERIFY_OTP_MID', verifyOtpMessage: checkStatus });
      yield put({ type: 'VERIFY_OTP_ALERT_SHOW_HIDE_DANGER' });
    }
  } catch (error) {
    const checkStatus = utils.checkAPIfailure(error);
    yield put({ type: 'VERIFY_OTP_FAILURE', verifyOtpError: checkStatus });
    yield put({ type: 'VERIFY_OTP_ALERT_SHOW_HIDE_DANGER' });
  }
}

function* verify_otp_alert_dismiss_worker(request) {
  const { path } = request;
  yield put(push(path));
}

// **********Resend Otp******************* //

function* resend_otp_worker(request) {
  const signinData = yield select(getSigninData); //  get the redux object

  const { resendOtpPayloads, resendOtpPath } = request;
  yield put({ type: 'RESEND_OTP_START' });
  try {
    const response = yield call(api.resendOtp, resendOtpPayloads);
    const checkStatus = utils.checkAPIfailure(response);
    if (checkStatus.hasOwnProperty('success') && checkStatus.success === true) {
      yield put({ type: 'RESEND_OTP_SUCCESS', resendOtpData: checkStatus });
      yield put(push({ pathname: resendOtpPath }));
    } else {
      yield put({ type: 'RESEND_OTP_MID', resendOtpMessage: checkStatus });
      yield put({ type: 'RESEND_OTP_ALERT_SHOW_HIDE_DANGER' });
    }
  } catch (error) {
    const checkStatus = utils.checkAPIfailure(error);
    yield put({ type: 'RESEND_OTP_FAILURE', resendOtpError: checkStatus });
    yield put({ type: 'RESEND_OTP_ALERT_SHOW_HIDE_DANGER' });
  }
}

function* resend_otp_alert_dismiss_worker(request) {
  const { path } = request;
  yield put(push(path));
}

// **********Forgot Password******************* //

function* forgot_password_worker(request) {
  const signinData = yield select(getSigninData); //  get the redux object

  const { forgotPasswordPayloads, forgotPasswordPath } = request;
  yield put({ type: 'FORGOT_PASSWORD_START' });
  try {
    const response = yield call(api.forgotPassword, forgotPasswordPayloads);
    const checkStatus = utils.checkAPIfailure(response);
    if (checkStatus.hasOwnProperty('success') && checkStatus.success === true) {
      yield put({ type: 'FORGOT_PASSWORD_SUCCESS', forgotPasswordData: checkStatus });
      yield put(push({ pathname: forgotPasswordPath, state: { detail: 'forgotpassword' } }));
    } else {
      yield put({ type: 'FORGOT_PASSWORD_MID', forgotPasswordMessage: checkStatus });
      yield put({ type: 'FORGOT_PASSWORD_ALERT_SHOW_HIDE_DANGER' });
    }
  } catch (error) {
    const checkStatus = utils.checkAPIfailure(error);
    yield put({ type: 'FORGOT_PASSWORD_FAILURE', forgotPasswordError: checkStatus });
    yield put({ type: 'FORGOT_PASSWORD_ALERT_SHOW_HIDE_DANGER' });
  }
}

function* forgot_password_alert_dismiss_worker(request) {
  const { path } = request;
  yield put(push(path));
}

// **********Reset Password******************* //

function* reset_password_worker(request) {
  const signinData = yield select(getSigninData); //  get the redux object

  const { resetPasswordPayloads, resetPasswordPath } = request;
  yield put({ type: 'RESET_PASSWORD_START' });
  try {
    const response = yield call(api.resetPassword, resetPasswordPayloads);
    const checkStatus = utils.checkAPIfailure(response);
    if (checkStatus.hasOwnProperty('success') && checkStatus.success === true) {
      yield put({ type: 'RESET_PASSWORD_SUCCESS', resetPasswordData: checkStatus });
      yield put(push({ pathname: resetPasswordPath }));
    } else {
      yield put({ type: 'RESET_PASSWORD_MID', resetPasswordMessage: checkStatus });
      yield put({ type: 'RESET_PASSWORD_ALERT_SHOW_HIDE_DANGER' });
    }
  } catch (error) {
    const checkStatus = utils.checkAPIfailure(error);
    yield put({ type: 'RESET_PASSWORD_FAILURE', resetPasswordError: checkStatus });
    yield put({ type: 'RESET_PASSWORD_ALERT_SHOW_HIDE_DANGER' });
  }
}

function* reset_password_alert_dismiss_worker(request) {
  const { path } = request;
  yield put(push(path));
}

// **********Log Out******************* //

function* logout_worker(request) {
  // const signinData = yield select(getSigninData); //  get the redux object

  const { logoutPath } = request;
  console.log(logoutPath);
  // console.log(logoutPayloads);
  yield put({ type: 'LOGOUT_START' });
  try {
    yield put({ type: 'LOGOUT_SUCCESS' });
    // window.localStorage.clear();
    // window.localStorage.removeItem('notification');
    // window.localStorage.removeItem('notifications');
    window.localStorage.clear();
    yield put(push(logoutPath));

    // const response = yield call(api.logout, logoutPayloads);
    // const checkStatus = utils.checkAPIfailure(response);
    // console.log('___________________++++++++++++++++++' + JSON.stringify(checkStatus));
    // if (checkStatus.hasOwnProperty('success') && checkStatus.success === true) {
    //   yield put({ type: 'LOGOUT_SUCCESS', logoutData: checkStatus });
    //   yield put(push(logoutPath));
    // } else {
    //   yield put({ type: 'LOGOUT_MID', logoutMessage: checkStatus });
    //   yield put({ type: 'LOGOUT_ALERT_SHOW_HIDE_DANGER' });
    // }
  } catch (error) {
    const checkStatus = utils.checkAPIfailure(error);
    yield put({ type: 'LOGOUT_FAILURE', logoutError: checkStatus });
    yield put({ type: 'LOGOUT_ALERT_SHOW_HIDE_DANGER' });
  }
}

function* change_password(request) {
  const signinData = yield select(getSigninData); //  get the redux object

  //console.log('request in ChangePassword.....',request)
  yield put({ type: 'SET_LOADER', payload: true });
  const { nextUrl } = request.payload;
  const { oldPassword, newPassword } = request.payload;
  try {
    const response = yield call(api.changePassword, request.payload);
    console.log('response', response);
    if (response.data) {
      yield put({ type: 'SET_LOADER', payload: false });
      //yield put({ type: 'SET_MESSAGE', payload: 'Password Changed Successfully' });
      if (response.status === 200) {
        yield put({ type: 'SET_LOADER', payload: false });
        if (response.data && response.data.success === true) {
          yield put({ type: 'SET_MESSAGE', payload: 'Password Changed Successfully' });
        } else {
          yield put({ type: 'SET_MESSAGE', payload: 'Error occured while changing password.' });
        }
      }
    }
    //console.log('response',response)
  } catch (error) {
    console.log('error: ', error);

    const checkStatus = utils.checkAPIfailure(error);
    console.log(checkStatus);

    if (checkStatus.Error && checkStatus.Error.Message && checkStatus.Error.Message === 'Access Token has expired') {
      // change funcName to the current function name so that it gets called back
      const params = {
        funcName: change_password,
        params: request
      };
      yield call(refreshTokenFunc, params);
    } else {
      console.log('Network Err! or Internal Server Err!');

      yield put({ type: 'SET_LOADER', payload: false });
      yield put({ type: 'SET_MESSAGE', payload: 'Error occured while changing password.' });
      // const checkStatus = utils.checkAPIfailure(error);
      // yield put({ type: 'LOGOUT_FAILURE', logoutError: checkStatus });
      // yield put({ type: 'LOGOUT_ALERT_SHOW_HIDE_DANGER' });
    }
  }
}

function* create_subscription_plan(request) {
  const signinData = yield select(getSigninData); //  get the redux object

  console.log('request in create_subscription_plan.....', request);
  yield put({ type: 'SET_LOADER', payload: true });
  try {
    const payload = { ...request.payload, accesstoken: signinData.token.AuthenticationResult.AccessToken };
    const response = yield call(api.createSubscriptionPlan, payload, 'post');
    console.log('response', response);
    if (response.status === 200) {
      yield put({ type: 'SET_LOADER', payload: false });
      if (response.data && response.data.code === 200) {
        const subscriptionPlanList = yield call(api.getSubscriptionPlanList, payload.accesstoken);
        console.log(subscriptionPlanList);
        if (subscriptionPlanList.status === 200 && subscriptionPlanList.data.code === 200) {
          yield put({ type: 'SET_SUBSCRIPTION_PLAN_LIST', payload: subscriptionPlanList.data.response });
        }
        yield put({ type: 'SET_MESSAGE', payload: 'Subscription Plan created successfully' });
      } else {
        yield put({ type: 'ERROR_CREATE_SUBSCRIPTION_PLAN', payload: response.data.response });
      }
    }
  } catch (error) {
    console.log('error: ', error);

    const checkStatus = utils.checkAPIfailure(error);
    console.log(checkStatus);

    if (checkStatus.Error && checkStatus.Error.Message && checkStatus.Error.Message === 'Access Token has expired') {
      // change funcName to the current function name so that it gets called back
      const params = {
        funcName: create_subscription_plan,
        params: request
      };
      yield call(refreshTokenFunc, params);
    } else if (
      checkStatus.Error &&
      checkStatus.Error.Message &&
      checkStatus.Error.Message === 'Access Token has been revoked'
    ) {
      yield put({ type: 'LOGOUT_SUCCESS' });
      // window.localStorage.clear();
      window.localStorage.removeItem('notification');
      window.localStorage.removeItem('notifications');
      yield put(push('/user-analyst'));
    } else {
      console.log('Network Err! or Internal Server Err!');
    }
    // yield put({ type: 'SET_LOADER', payload: false });
    // yield put({ type: 'SET_MESSAGE', payload: 'Some error occured while creating subscription' });
    // yield put({ type: 'ERROR_CREATE_SUBSCRIPTION_PLAN', payload: error });
  }
}

function* create_analyst_portfolio(request) {
  const signinData = yield select(getSigninData); //  get the redux object

  console.log('request in create_analyst_portfolio.....', request);
  yield put({ type: 'SET_LOADER', payload: true });
  try {
    const payload = { ...request.payload, accesstoken: signinData.token.AuthenticationResult.AccessToken };
    console.log('request in create_analyst_portfolio.....', payload);

    const response = yield call(api.createAnalystPortfolio, payload, 'post');
    console.log('response', response);
    if (response.status === 200) {
      yield put({ type: 'SET_LOADER', payload: false });
      if (response.data && response.data.code === 200) {
        const analystPortfolio = yield call(api.getAnalystPortfolio, payload.accesstoken);
        console.log('analystPortfolio', analystPortfolio);
        if (analystPortfolio.status === 200 && analystPortfolio.data.code === 200) {
          yield put({ type: 'SET_ANALYST_PORTFOLIO', payload: analystPortfolio.data.response });
          yield put({ type: 'SET_MESSAGE', payload: 'Analyst Portfolio created successfully' });
        }
        // yield put({ type: 'SET_MESSAGE', payload: response.data.response });
      } else if (response.data && response.data.code === 500) {
        yield put({ type: 'SET_MESSAGE', payload: response.data.response });
      } else {
        yield put({ type: 'ERROR_CREATE_SUBSCRIPTION_PLAN', payload: response.data.response });
      }
    }
  } catch (error) {
    console.log('error: ', error);
    const checkStatus = utils.checkAPIfailure(error);
    // console.log(checkStatus);

    if (checkStatus) {
      if (checkStatus.Error && checkStatus.Error.Message && checkStatus.Error.Message === 'Access Token has expired') {
        // change funcName to the current function name so that it gets called back
        const params = {
          funcName: create_analyst_portfolio,
          params: request
        };
        yield call(refreshTokenFunc, params);
      } else if (
        checkStatus.Error &&
        checkStatus.Error.Message &&
        checkStatus.Error.Message === 'Access Token has been revoked'
      ) {
        yield put({ type: 'LOGOUT_SUCCESS' });
        // window.localStorage.clear();
        window.localStorage.removeItem('notification');
        window.localStorage.removeItem('notifications');
        yield put(push('/user-analyst'));
      } else {
        console.log('Network Err! or Internal Server Err!');
      }
    }
  }
}

function* place_trade(request) {
  const signinData = yield select(getSigninData); //  get the redux object

  // const { accesstoken, payload } = request.payload
  // //console.log('request',request)
  // console.log('accesstoken',accesstoken)
  // console.log('payload',payload)
  console.log('request in place_trade.....', request);
  // console.log('isntrumeny_token in formdata', request.payload.payload.get('instrument_token'));
  // console.log('segmetn in formdata', request.payload.payload.get('segment'));
  // yield put({ type: 'SET_LOADER', payload: true });
  try {
    const newRequest = { ...request.payload, accesstoken: signinData.token.AuthenticationResult.AccessToken };

    let response;
    // yield put({ type: 'SET_LOADER', payload: true });
    yield put({ type: 'SET_LOADING', payload: true });
    if (request.payload.payload.updated) {
      response = yield call(api.updateTrade, request.payload.payload.formData, newRequest.accesstoken);
    } else {
      // const { accesstoken, payload } = request.payloa;
      console.log('request in place_trade.....', request);
      console.log('isntrumeny_token in formdata', request.payload.payload.get('instrument_token'));
      console.log('segmetn in formdata', request.payload.payload.get('segment'));
      console.log('trade_type in formdata', request.payload.payload.get('trade_type'));
      console.log('transaction_type in formdata', request.payload.payload.get('order_type'));

      response = yield call(api.placeTrade, newRequest, 'post');
    }
    console.log(response);
    if (response.status === 200 || response.status === 400) {
      // yield put({ type: 'SET_LOADER', payload: false });
      if (response.data && (response.data.code === 200 || response.data.code === 400)) {
        const tradeList = yield call(api.getTradeList, newRequest.accesstoken);
        if (
          (tradeList.status === 200 || tradeList.status === 400) &&
          (tradeList.data.code === 200 || tradeList.data.code === 400)
        ) {
          yield put({ type: 'SET_TRADE_LIST', payload: tradeList.data.response });
          yield put({ type: 'SET_LOADING', payload: false });
        }
        console.log(response.data);
        yield put({ type: 'SET_LOADING', payload: false });
        yield put({
          type: 'SET_MESSAGE',
          payload: response.data.message ? response.data.message : response.data.response
        });
      } else {
        // add message received from backend here
        yield put({ type: 'SET_LOADING', payload: false });
        yield put({ type: 'SET_MESSAGE', payload: response.data.response });
      }
    }
  } catch (error) {
    console.log('error: ', error);
    yield put({ type: 'SET_LOADING', payload: false });

    const checkStatus = utils.checkAPIfailure(error);
    console.log(checkStatus);

    if (checkStatus.Error && checkStatus.Error.Message && checkStatus.Error.Message === 'Access Token has expired') {
      // change funcName to the current function name so that it gets called back
      const params = {
        funcName: place_trade,
        params: request
      };
      yield call(refreshTokenFunc, params);
    } else if (
      checkStatus.Error &&
      checkStatus.Error.Message &&
      checkStatus.Error.Message === 'Access Token has been revoked'
    ) {
      yield put({ type: 'LOGOUT_SUCCESS' });
      // window.localStorage.clear();
      window.localStorage.removeItem('notification');
      window.localStorage.removeItem('notifications');
      yield put(push('/user-analyst'));
    } else {
      console.log('Network Err! or Internal Server Err!');
      yield put({ type: 'SET_LOADER', payload: false });
      yield put({ type: 'SET_MESSAGE', payload: 'Some error occured while placing trade' });
      //yield put({ type: 'ERROR_CREATE_SUBSCRIPTION_PLAN', payload: error });
    }
  }
}

function* get_available_trade_balance(request) {
  const signinData = yield select(getSigninData); //  get the redux object
  console.log('request in get_available_trade_balance.....', request);
  // yield put({ type: 'SET_LOADER', payload: true });
  try {
    const payload = { accesstoken: signinData.token.AuthenticationResult.AccessToken };
    const response = yield call(api.getAvailableTradeBalance, payload.accesstoken);
    console.log('response', response);
    if (response.status === 200) {
      yield put({ type: 'SET_LOADER', payload: false });
      if (response.data && response.data.code === 200) {
        yield put({ type: 'SET_AVAILABLE_TRADE_BALANCE', payload: response.data.response });
      } else {
        // add message received from backend here
        yield put({ type: 'SET_MESSAGE', payload: 'Unable to get available trade balance' });
      }
    }
  } catch (error) {
    console.log('error: ', error);

    const checkStatus = utils.checkAPIfailure(error);
    console.log(checkStatus);

    if (checkStatus.Error && checkStatus.Error.Message && checkStatus.Error.Message === 'Access Token has expired') {
      // change funcName to the current function name so that it gets called back
      const params = {
        funcName: get_available_trade_balance,
        params: request
      };
      yield call(refreshTokenFunc, params);
    } else if (
      checkStatus.Error &&
      checkStatus.Error.Message &&
      checkStatus.Error.Message === 'Access Token has been revoked'
    ) {
      yield put({ type: 'LOGOUT_SUCCESS' });
      // window.localStorage.clear();
      window.localStorage.removeItem('notification');
      window.localStorage.removeItem('notifications');
      yield put(push('/user-analyst'));
    } else {
      console.log('Network Err! or Internal Server Err!');

      yield put({ type: 'SET_MESSAGE', payload: 'Unable to get available trade balance' });
      //yield put({ type: 'SET_LOADER', payload: false });
      //yield put({ type: 'SET_MESSAGE', payload: 'Some error occured while placing trade' });
      //yield put({ type: 'ERROR_CREATE_SUBSCRIPTION_PLAN', payload: error });
    }
  }
}

function* upload_document(request) {
  const signinData = yield select(getSigninData); //  get the redux object

  console.log('request in upload_document.....', request);
  // yield put({ type: 'SET_LOADER', payload: true });
  try {
    const newRequest = {
      payload: request.payload.payload,
      accesstoken: signinData.token.AuthenticationResult.AccessToken
    };
    yield put({ type: 'SET_LOADING', payload: true });
    const response = yield call(api.uploadDocument, newRequest, 'post');
    console.log('response', response);
    if (response.status === 200) {
      //yield put({ type: 'SET_LOADER', payload: false });
      if (response.data && response.data.code === 200) {
        //
        yield put({ type: 'SET_LOADING', payload: false });
        yield put({ type: 'DOCUMENT_UPDATED', payload: true });
        yield put({ type: 'SET_MESSAGE', payload: response.data.response });
      } else {
        yield put({ type: 'SET_LOADING', payload: false });
        // add message received from backend here
        yield put({ type: 'SET_MESSAGE', payload: response.data.response });
      }
    }
  } catch (error) {
    console.log('error: ', error);
    yield put({ type: 'SET_LOADING', payload: false });

    const checkStatus = utils.checkAPIfailure(error);
    console.log(checkStatus);

    if (checkStatus.Error && checkStatus.Error.Message && checkStatus.Error.Message === 'Access Token has expired') {
      // change funcName to the current function name so that it gets called back
      const params = {
        funcName: upload_document,
        params: request
      };
      yield call(refreshTokenFunc, params);
    } else if (
      checkStatus.Error &&
      checkStatus.Error.Message &&
      checkStatus.Error.Message === 'Access Token has been revoked'
    ) {
      yield put({ type: 'LOGOUT_SUCCESS' });
      // window.localStorage.clear();
      window.localStorage.removeItem('notification');
      window.localStorage.removeItem('notifications');
      yield put(push('/user-analyst'));
    } else {
      console.log('Network Err! or Internal Server Err!');

      yield put({ type: 'SET_MESSAGE', payload: 'Unable to upload Document' });
      //yield put({ type: 'SET_LOADER', payload: false });
      //yield put({ type: 'SET_MESSAGE', payload: 'Some error occured while placing trade' });
      //yield put({ type: 'ERROR_CREATE_SUBSCRIPTION_PLAN', payload: error });
    }
  }
}

function* update_analyst_basic_details(request) {
  const signinData = yield select(getSigninData); //  get the redux object

  console.log('request in update_analyst_basic_details.....', request);
  yield put({ type: 'SET_LOADER', payload: true });
  try {
    const payload = { ...request.payload, accesstoken: signinData.token.AuthenticationResult.AccessToken };
    const response = yield call(api.updateAnalystBasicDetails, payload, 'post');
    console.log('response', response);
    if (response.status === 200) {
      if (response.data && response.data.code === 200) {
        const analystDetails = yield call(api.getAnalystDetails, payload);
        if (analystDetails.status === 200 && analystDetails.data.code === 200) {
          yield put({ type: 'SET_ANALYST_DETAILS', payload: analystDetails.data.response });
        }
        if (payload.user) {
          let name = payload.user.first_name + ' ' + payload.user.last_name;

          //console.log('name:',name)
          yield put({
            type: 'UPDATE_NAME',
            Namepayload: {
              AccessToken: payload.accesstoken,
              UserAttributes: [
                {
                  Name: 'name',
                  Value: name
                }
              ]
            }
          });
        }
        yield put({ type: 'DOCUMENT_UPDATED', payload: false });
        yield put({ type: 'SET_MESSAGE', payload: response.data.response });
        yield put({ type: 'SWITCH_TO_PROFILE_DISPLAY', payload: true });
      } else {
        // add message received from backend here
        console.log(response);
        yield put({ type: 'SET_MESSAGE', payload: response.data.response });
      }
      yield put({ type: 'SET_LOADER', payload: true });
    }
  } catch (error) {
    console.log('error: ', error);

    const checkStatus = utils.checkAPIfailure(error);
    console.log(checkStatus);
    yield put({ type: 'SWITCH_TO_PROFILE_DISPLAY', payload: false });

    if (checkStatus.Error && checkStatus.Error.Message && checkStatus.Error.Message === 'Access Token has expired') {
      // change funcName to the current function name so that it gets called back
      const params = {
        funcName: update_analyst_basic_details,
        params: request
      };
      yield call(refreshTokenFunc, params);
    } else if (
      checkStatus.Error &&
      checkStatus.Error.Message &&
      checkStatus.Error.Message === 'Access Token has been revoked'
    ) {
      yield put({ type: 'LOGOUT_SUCCESS' });
      // window.localStorage.clear();
      window.localStorage.removeItem('notification');
      window.localStorage.removeItem('notifications');
      yield put(push('/user-analyst'));
    } else {
      console.log('Network Err! or Internal Server Err!');

      // yield put({ type: 'SET_MESSAGE', payload: 'Unable to upload Document' });
      yield put({ type: 'SET_LOADER', payload: false });
      yield put({ type: 'SET_MESSAGE', payload: 'Some error occured while updating details' });
      //yield put({ type: 'ERROR_CREATE_SUBSCRIPTION_PLAN', payload: error });
    }
  }
}

function* fetch_instrument_tokens(request) {
  const signinData = yield select(getSigninData); //  get the redux object

  console.log('request in fetch_instrument_tokens.....', request);
  yield put({ type: 'SAVE_INSTRUMENT_TOKENS', payload: [] });
  yield put({ type: 'SET_LOADER', payload: true });
  //yield put({ type: 'SET_LOADER', payload: true });
  try {
    const response = yield call(api.fetchInstrumentToken, {
      token: signinData.token.AuthenticationResult.AccessToken,
      segment: request.payload.payload.segment,
      trading_symbol: request.payload.payload.trading_symbol
    });
    console.log('response', response);
    yield put({ type: 'SET_LOADER', payload: false });
    if (response.status === 200) {
      // yield put({ type: 'SET_LOADER', payload: false });
      if (response.data && response.data.code === 200) {
        // let name=request.payload.user.first_name+" "+request.payload.user.last_name

        //console.log('name:',name)
        yield put({ type: 'SAVE_INSTRUMENT_TOKENS', payload: response.data.response });
        // yield put({ type: 'SET_MESSAGE', payload: response.data.response });
      } else {
        yield put({ type: 'SAVE_INSTRUMENT_TOKENS', payload: [] });
        // add message received from backend here
        // yield put({ type: 'SET_MESSAGE', payload: response.data.response });
      }
    }
  } catch (error) {
    console.log('error: ', error);

    const checkStatus = utils.checkAPIfailure(error);
    console.log(checkStatus);

    if (checkStatus.Error && checkStatus.Error.Message && checkStatus.Error.Message === 'Access Token has expired') {
      // change funcName to the current function name so that it gets called back
      const params = {
        funcName: fetch_instrument_tokens,
        params: request
      };
      yield call(refreshTokenFunc, params);
    } else if (
      checkStatus.Error &&
      checkStatus.Error.Message &&
      checkStatus.Error.Message === 'Access Token has been revoked'
    ) {
      yield put({ type: 'LOGOUT_SUCCESS' });
      // window.localStorage.clear();
      window.localStorage.removeItem('notification');
      window.localStorage.removeItem('notifications');
      yield put(push('/user-analyst'));
    } else {
      console.log('Network Err! or Internal Server Err!');

      yield put({ type: 'SET_LOADER', payload: false });
      yield put({ type: 'SAVE_INSTRUMENT_TOKENS', payload: null });
      // // yield put({ type: 'SET_MESSAGE', payload: 'Unable to upload Document' });
      // yield put({ type: 'SET_LOADER', payload: false });
      // yield put({ type: 'SET_MESSAGE', payload: 'Some error occured while updating details' });
      // //yield put({ type: 'ERROR_CREATE_SUBSCRIPTION_PLAN', payload: error });
    }
  }
}

function* get_webinar_list(request) {
  const signinData = yield select(getSigninData); //  get the redux object

  console.log('request in get_webinar_list.....', request.payload.token);
  //yield put({ type: 'SET_LOADER', payload: true });
  try {
    const response = yield call(api.getWebinarList, request.payload.token);
    console.log('response', response);
    if (response.status === 200) {
      // yield put({ type: 'SET_LOADER', payload: false });
      if (response.data && response.data.code === 200) {
        // let name=request.payload.user.first_name+" "+request.payload.user.last_name

        //console.log('name:',name)
        yield put({ type: 'SAVE_WEBINAR_LIST', payload: response.data.response });
        // yield put({ type: 'SET_MESSAGE', payload: response.data.response });
      } else {
        console.log('eror in getting webinar list : ', response.data.response);
        //yield put({ type: 'SAVE_INSTRUMENT_TOKENS', payload: []  });
        // add message received from backend here
        // yield put({ type: 'SET_MESSAGE', payload: response.data.response });
      }
    }
  } catch (error) {
    console.log('error in last catch :::::::::::::  ', error);

    const checkStatus = utils.checkAPIfailure(error);
    console.log(checkStatus);

    if (checkStatus.Error && checkStatus.Error.Message && checkStatus.Error.Message === 'Access Token has expired') {
      const params = {
        funcName: get_webinar_list,
        params: request
      };
      yield call(refreshTokenFunc, params);
    } else if (
      checkStatus.Error &&
      checkStatus.Error.Message &&
      checkStatus.Error.Message === 'Access Token has been revoked'
    ) {
      yield put({ type: 'LOGOUT_SUCCESS' });
      // window.localStorage.clear();
      window.localStorage.removeItem('notification');
      window.localStorage.removeItem('notifications');
      yield put(push('/user-analyst'));
    } else {
      console.log('Network Err! or Internal Server Err!');
    }

    // yield put({ type: 'SAVE_INSTRUMENT_TOKENS', payload: null  });
    // // yield put({ type: 'SET_MESSAGE', payload: 'Unable to upload Document' });
    // yield put({ type: 'SET_LOADER', payload: false });
    // yield put({ type: 'SET_MESSAGE', payload: 'Some error occured while updating details' });
    // //yield put({ type: 'ERROR_CREATE_SUBSCRIPTION_PLAN', payload: error });
  }
}

function* refreshTokenFunc(params) {
  console.log('inside saga refresh token func ::: ' + params);
  console.log(params);
  let signinData = yield select(getSigninData); //  get the redux object

  const signinPayloads = {
    refreshToken: signinData.token.AuthenticationResult.RefreshToken,
    grant_type: 'REFRESH_TOKEN'
  };

  try {
    const response = yield call(api.signin, signinPayloads);
    const refreshRes = utils.checkAPIfailure(response);

    if (refreshRes.hasOwnProperty('success') && refreshRes.success === true) {
      const updatedSigninData = {
        groups: signinData.groups,
        token: {
          AuthenticationResult: {
            ExpiresIn: refreshRes.token.AuthenticationResult.ExpiresIn,
            IdToken: refreshRes.token.AuthenticationResult.IdToken,
            RefreshToken: signinData.token.AuthenticationResult.RefreshToken,
            TokenType: refreshRes.token.AuthenticationResult.TokenType,
            AccessToken: refreshRes.token.AuthenticationResult.AccessToken
          }
        },
        user: signinData.user
      };
      yield put({ type: 'SIGNIN_SUCCESS', signinData: updatedSigninData });

      yield call(params.funcName, params.params);
    } else {
      yield put({ type: 'LOGOUT_SUCCESS' });
      // window.localStorage.clear();
      window.localStorage.removeItem('notification');
      window.localStorage.removeItem('notifications');
      yield put(push('/user-analyst'));
    }
  } catch (error) {
    // console.log(error.Message);
    yield put({ type: 'LOGOUT_SUCCESS' });
    // window.localStorage.clear();
    window.localStorage.removeItem('notification');
    window.localStorage.removeItem('notifications');
    yield put(push('/user-analyst'));
  }
}

export default function* watchAll() {
  return (
    yield takeEvery('USER_AUTH', user_auth_worker),
    yield takeEvery('DEVICE_TOKEN', device_token),
    yield takeEvery('USER_AUTH_ALERT_SHOW_HIDE_DANGER_DISMISS', user_auth_alert_dismiss_worker),
    yield takeEvery('SIGNIN', signin_worker),
    yield takeEvery('SIGNUP', signup_worker),
    yield takeEvery('VERIFY_OTP', verify_otp_worker),
    yield takeEvery('RESEND_OTP', resend_otp_worker),
    yield takeEvery('FORGOT_PASSWORD', forgot_password_worker),
    yield takeEvery('RESET_PASSWORD', reset_password_worker),
    yield takeEvery('LOGOUT', logout_worker),
    yield takeEvery('CHANGE_PASSWORD', change_password),
    yield takeEvery('VERIFY_OTP_ALERT_SHOW_HIDE_DANGER_DISMISS', verify_otp_alert_dismiss_worker),
    yield takeEvery('RESEND_OTP_ALERT_SHOW_HIDE_DANGER_DISMISS', resend_otp_alert_dismiss_worker),
    yield takeEvery('FORGOT_PASSWORD_ALERT_SHOW_HIDE_DANGER_DISMISS', forgot_password_alert_dismiss_worker),
    yield takeEvery('RESET_PASSWORD_ALERT_SHOW_HIDE_DANGER_DISMISS', reset_password_alert_dismiss_worker),
    yield takeEvery('CREATE_SUBSCRIPTION_PLAN', create_subscription_plan),
    yield takeEvery('GET_AVAILABLE_TRADE_BALANCE', get_available_trade_balance),
    yield takeEvery('UPLOAD_DOCUMENT', upload_document),
    yield takeEvery('UPDATE_ANALYST_BASIC_DETAILS', update_analyst_basic_details),
    yield takeEvery('FETCH_INSTRUMENT_TOKENS', fetch_instrument_tokens),
    yield takeEvery('PLACE_TRADE', place_trade),
    yield takeEvery('GET_WEBINAR_LIST', get_webinar_list),
    yield takeEvery('CREATE_ANALYST_PORTFOLIO', create_analyst_portfolio)
  );
}
