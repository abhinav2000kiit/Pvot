import { call, put, takeEvery, takeLatest, select } from 'redux-saga/effects';
import { push } from 'connected-react-router/immutable';
import api from '../../network';
import utils from '../../theme/utils';
export const getSigninData = state => state.auth.signinData;
export const getUserGroup = state => state.auth.userGroup;

// eslint-disable-next-line camelcase
function* create_bank_account(request) {
  const signinData = yield select(getSigninData); //  get the redux object

  try {
    const response = yield call(
      api.createBankAccount,
      request.payload.params,
      signinData.token.AuthenticationResult.AccessToken
    );
    console.log('response', response);
    if (response.status === 200) {
      if (response.data && response.data.code === 200) {
        const bankDetail = yield call(api.getBankDetails, signinData.token.AuthenticationResult.AccessToken);
        console.log(bankDetail);
        if (bankDetail.status === 200 && bankDetail.data.code === 200) {
          yield put({ type: 'SAVE_BANK_ACCOUNT', payload: bankDetail.data.response });
        }
        yield put({ type: 'SWITCH_TO_ACCOUNT_DISPLAY', payload: true });
        yield put({ type: 'SET_MESSAGE', payload: response.data.response });
      } else {
        yield put({ type: 'SWITCH_TO_ACCOUNT_DISPLAY', payload: true });
        yield put({ type: 'SET_MESSAGE', payload: response.data.response });
      }
    } else {
      yield put({ type: 'SWITCH_TO_ACCOUNT_DISPLAY', payload: true });
      yield put({ type: 'SET_MESSAGE', payload: response.statusText });
    }
  } catch (error) {
    console.log('error: ', error);
    yield put({ type: 'SWITCH_TO_ACCOUNT_DISPLAY', payload: false });

    const checkStatus = utils.checkAPIfailure(error);
    console.log(checkStatus);

    if (checkStatus.Error && checkStatus.Error.Message && checkStatus.Error.Message === 'Access Token has expired') {
      // change funcName to the current function name so that it gets called back
      const params = {
        funcName: create_bank_account,
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

      yield put({ type: 'SET_MESSAGE', payload: error });
    }
  }
}

function* get_bank_account(request) {
  const signinData = yield select(getSigninData); //  get the redux object

  try {
    const payload = { token: signinData.token.AuthenticationResult.AccessToken };

    const response = yield call(api.getBankDetails, payload.token);
    console.log('response', response);
    if (response.status === 200) {
      if (response.data && response.data.code === 200) {
        yield put({ type: 'SAVE_BANK_ACCOUNT', payload: response.data.response });
      } else {
        // yield put({ type: 'SET_MESSAGE', payload: response.data.response });
      }
    } else {
      // yield put({ type: 'SET_MESSAGE', payload: response.statusText });
    }
  } catch (error) {
    console.log('error: ', error);

    const checkStatus = utils.checkAPIfailure(error);
    console.log(checkStatus);

    if (checkStatus.Error && checkStatus.Error.Message && checkStatus.Error.Message === 'Access Token has expired') {
      // change funcName to the current function name so that it gets called back
      const params = {
        funcName: get_bank_account,
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
    // yield put({ type: 'SET_MESSAGE', payload: error });
  }
}

function* getAnalystDetails(request) {
  const signinData = yield select(getSigninData); //  get the redux object

  try {
    const payload = { ...request.payload, accesstoken: signinData.token.AuthenticationResult.AccessToken };
    // const response = yield call(api.getAnalystDetails, request.payload);
    const response = yield call(api.getAnalystDetails, payload, 'get');
    const bankDetail = yield call(api.getBankDetails, payload.accesstoken);
    if (bankDetail.status === 200 && bankDetail.data.code === 200) {
      yield put({ type: 'SAVE_BANK_ACCOUNT', payload: bankDetail.data.response });
    }
    console.log('response', response);
    if (response.status === 200) {
      if (response.data && response.data.code === 200) {
        yield put({ type: 'SET_ANALYST_DETAILS', payload: response.data.response });
      } else if (response.data && response.data.code === 404) {
        // yield put({ type: 'SET_MESSAGE', payload: response.data.response });
      } else {
        // yield put({ type: 'SET_MESSAGE', payload: response.data.response });
      }
    } else {
      // yield put({ type: 'SET_MESSAGE', payload: response.statusText });
    }
  } catch (error) {
    console.log('error: ', error);

    const checkStatus = utils.checkAPIfailure(error);
    console.log(checkStatus);

    if (checkStatus.Error && checkStatus.Error.Message && checkStatus.Error.Message === 'Access Token has expired') {
      // change funcName to the current function name so that it gets called back
      const params = {
        funcName: getAnalystDetails,
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

    // yield put({ type: 'SET_MESSAGE', payload: error });
  }
}

function* getSubscriptionPlanList(request) {
  const signinData = yield select(getSigninData); //  get the redux object

  try {
    const payload = signinData.token.AuthenticationResult.AccessToken;

    const response = yield call(api.getSubscriptionPlanList, payload);
    console.log('response', response);
    if (response.status === 200) {
      if (response.data && response.data.code === 200) {
        yield put({ type: 'SET_SUBSCRIPTION_PLAN_LIST', payload: response.data.response });
      } else if (response.data && response.data.code === 404) {
        // yield put({ type: 'SET_MESSAGE', payload: response.data.response });
        yield put({ type: 'SET_SUBSCRIPTION_PLAN_LIST', payload: [] });
      } else {
        // yield put({ type: 'SET_MESSAGE', payload: response.data.response });
      }
    } else {
      // yield put({ type: 'SET_MESSAGE', payload: response.statusText });
    }
  } catch (error) {
    console.log('error: ', error);

    const checkStatus = utils.checkAPIfailure(error);
    console.log(checkStatus);

    if (checkStatus.Error && checkStatus.Error.Message && checkStatus.Error.Message === 'Access Token has expired') {
      // change funcName to the current function name so that it gets called back
      const params = {
        funcName: getSubscriptionPlanList,
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
    // yield put({ type: 'SET_MESSAGE', payload: error });
  }
}

function* getTradeList(request) {
  const signinData = yield select(getSigninData); //  get the redux object

  yield put({ type: 'SET_LOADER', payload: true });
  try {
    const payload = signinData.token.AuthenticationResult.AccessToken;
    const response = yield call(api.getTradeList, payload);
    console.log('response', response);
    if (response.status === 200) {
      yield put({ type: 'SET_LOADER', payload: false });
      if (response.data && response.data.code === 200) {
        yield put({ type: 'SET_TRADE_LIST', payload: response.data.response });
      } else if (response.data && response.data.code === 404) {
        // yield put({ type: 'SET_MESSAGE', payload: response.data.response });
      } else {
        // yield put({ type: 'SET_MESSAGE', payload: response.data.response });
      }
    } else {
      yield put({ type: 'SET_LOADER', payload: false });
      // yield put({ type: 'SET_MESSAGE', payload: response.statusText });
    }
  } catch (error) {
    yield put({ type: 'SET_LOADER', payload: false });
    console.log('error: ', error);

    const checkStatus = utils.checkAPIfailure(error);
    console.log(checkStatus);

    if (checkStatus.Error && checkStatus.Error.Message && checkStatus.Error.Message === 'Access Token has expired') {
      // change funcName to the current function name so that it gets called back
      const params = {
        funcName: getTradeList,
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
    // yield put({ type: 'SET_MESSAGE', payload: error });
  }
}

function* getTradeCounts(request) {
  const signinData = yield select(getSigninData); //  get the redux object

  yield put({ type: 'SET_LOADER', payload: true });
  try {
    const payload = signinData.token.AuthenticationResult.AccessToken;

    const response = yield call(api.getTradeCounts, payload);
    console.log('response', response);
    if (response.status === 200) {
      yield put({ type: 'SET_LOADER', payload: false });
      if (response.data && response.data.success === true) {
        yield put({ type: 'SET_TRADE_COUNTS', payload: response.data });
      } else if (response.data && response.data.code === 404) {
        // yield put({ type: 'SET_MESSAGE', payload: response.data.response });
      } else {
        // yield put({ type: 'SET_MESSAGE', payload: response.data.response });
      }
    } else {
      yield put({ type: 'SET_LOADER', payload: false });
      // yield put({ type: 'SET_MESSAGE', payload: response.statusText });
    }
  } catch (error) {
    yield put({ type: 'SET_LOADER', payload: false });
    console.log('error: ', error);

    const checkStatus = utils.checkAPIfailure(error);
    console.log(checkStatus);

    if (checkStatus.Error && checkStatus.Error.Message && checkStatus.Error.Message === 'Access Token has expired') {
      // change funcName to the current function name so that it gets called back
      const params = {
        funcName: getTradeCounts,
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
    // yield put({ type: 'SET_MESSAGE', payload: error });
  }
}

function* updateName(request) {
  const signinData = yield select(getSigninData); //  get the redux object

  try {
    const Namepayload = {
      UserAttributes: request.Namepayload.UserAttributes,
      AccessToken: signinData.token.AuthenticationResult.AccessToken
    };

    let userGroup = yield select(getUserGroup); //  get the redux object
    const response = yield call(api.updateUserName, Namepayload);
    console.log('response', response);
    if (response.status === 200) {
      if (response.data && response.data.success) {
        yield put({ type: 'SET_UPDATED_NAME', payload: request.Namepayload.UserAttributes[0].Value });
        // yield put({ type: 'SET_MESSAGE', payload: response.data.response });
      } else {
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
        funcName: updateName,
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
  // try {
  //   const response = yield call(api.createBankAccount, request.payload.params, request.payload.token);
  //   console.log('response', response);
  // } catch (error) {
  //   console.log('error: ', error);
  // }
}

function* updateEmail(request) {
  const signinData = yield select(getSigninData); //  get the redux object

  console.log('request in create_bank_account.....', request);

  try {
    const EmailPayload = {
      UserAttributes: request.EmailPayload.UserAttributes,
      AccessToken: signinData.token.AuthenticationResult.AccessToken
    };

    const response = yield call(api.updateUserName, EmailPayload);
    console.log('response', response);
    if (response.status === 200) {
      if (response.data && response.data.success) {
        yield put({ type: 'SET_UPDATED_EMAIL', payload: EmailPayload.UserAttributes[0].Value });

        // yield put({ type: 'SET_MESSAGE', payload: response.data.response });
      } else {
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
        funcName: updateEmail,
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
  // try {
  //   const response = yield call(api.createBankAccount, request.payload.params, request.payload.token);
  //   console.log('response', response);
  // } catch (error) {
  //   console.log('error: ', error);
  // }
}

function* updateProfileImage(request) {
  const signinData = yield select(getSigninData); //  get the redux object

  try {
    const newRequest = {
      payload: request.profileImage.payload,
      accesstoken: signinData.token.AuthenticationResult.AccessToken
    };
    yield put({ type: 'SET_LOADING', payload: true });
    const response = yield call(api.uploadDocument, newRequest, 'post');
    console.log('response', response);
    if (response.status === 200) {
      if (response.data && response.data.code === 200) {
        const profileImage = yield call(api.getProfilePicture, newRequest.accesstoken);
        console.log(profileImage);
        if (profileImage.status === 200 && profileImage.data && profileImage.data.code === 200) {
          yield put({ type: 'SET_LOADING', payload: false });
          yield put({ type: 'SET_UPDATED_PROFILE_IMAGE', payload: profileImage.data.response.file });
        }

        // yield put({ type: 'SET_MESSAGE', payload: response.data.response });
      } else {
        yield put({ type: 'SET_LOADING', payload: false });
        // add message received from backend here
        // yield put({ type: 'SET_MESSAGE', payload: response.data.response });
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
        funcName: updateProfileImage,
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
  // try {
  //   const response = yield call(api.createBankAccount, request.payload.params, request.payload.token);
  //   console.log('response', response);
  // } catch (error) {
  //   console.log('error: ', error);
  // }
}

function* getProfileImage(request) {
  const signinData = yield select(getSigninData); //  get the redux object

  console.log(request);
  try {
    const response = yield call(api.getProfilePicture, signinData.token.AuthenticationResult.AccessToken);
    console.log('response', response);
    if (response.status === 200) {
      if (response.data && response.data.code === 200) {
        yield put({ type: 'SET_UPDATED_PROFILE_IMAGE', payload: response.data.response.file });

        // yield put({ type: 'SET_MESSAGE', payload: response.data.response });
      } else {
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
        funcName: getProfileImage,
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
  // try {
  //   const response = yield call(api.createBankAccount, request.payload.params, request.payload.token);
  //   console.log('response', response);
  // } catch (error) {
  //   console.log('error: ', error);
  // }
}

function* deleteSubscriptionPlan(request) {
  const signinData = yield select(getSigninData); //  get the redux object

  console.log('request in create_subscription_plan.....', request);
  // yield put({ type: 'SET_LOADER', payload: true });
  try {
    const payload = {
      subscription_plan_id: request.payload.subscription_plan_id,
      accesstoken: signinData.token.AuthenticationResult.AccessToken
    };

    const response = yield call(api.deleteSubscriptionPlan, payload);
    console.log('response', response);
    if (response.status === 200) {
      // yield put({ type: 'SET_LOADER', payload: false });
      if (response.data && response.data.code === 200) {
        const subscriptionPlanList = yield call(api.getSubscriptionPlanList, payload.accesstoken);
        if (subscriptionPlanList.status === 200 && subscriptionPlanList.data.code === 200) {
          yield put({ type: 'SET_SUBSCRIPTION_PLAN_LIST', payload: subscriptionPlanList.data.response });
        } else if (subscriptionPlanList.status === 200 && subscriptionPlanList.data.code === 404) {
          yield put({ type: 'SET_SUBSCRIPTION_PLAN_LIST', payload: [] });
        }
        yield put({ type: 'SET_MESSAGE', payload: 'Subscription Plan Deleted successfully' });
      } else {
        yield put({ type: 'SET_MESSAGE', payload: 'Some Error occured while deleting' });
        // yield put({ type: 'ERROR_CREATE_SUBSCRIPTION_PLAN', payload: response.data.response });
      }
    }
  } catch (error) {
    console.log('error: ', error);

    const checkStatus = utils.checkAPIfailure(error);
    console.log(checkStatus);

    if (checkStatus.Error && checkStatus.Error.Message && checkStatus.Error.Message === 'Access Token has expired') {
      // change funcName to the current function name so that it gets called back
      const params = {
        funcName: deleteSubscriptionPlan,
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
      yield put({ type: 'SET_MESSAGE', payload: 'Some error occured while creating subscription' });
      // yield put({ type: 'ERROR_CREATE_SUBSCRIPTION_PLAN', payload: error });
    }
  }
}

function* cancelTradeRequest(request) {
  const signinData = yield select(getSigninData); //  get the redux object

  // yield put({ type: 'SET_LOADER', payload: true });
  try {
    const payload = {
      accesstoken: signinData.token.AuthenticationResult.AccessToken,
      record_id: request.payload.record_id
    };

    yield put({ type: 'SET_LOADING', payload: true });
    const response = yield call(api.cancelTradeList, payload);
    console.log('response', response);
    if (response.status === 200) {
      // yield put({ type: 'SET_LOADER', payload: false });
      if (response.data && response.data.code === 200) {
        const tradeList = yield call(api.getTradeList, payload.accesstoken);
        console.log(tradeList);
        yield put({ type: 'SET_MESSAGE', payload: 'Trade Canceled successfully' });
        if (tradeList.status === 200 && tradeList.data.code === 200) {
          yield put({ type: 'SET_TRADE_LIST', payload: tradeList.data.response });
          yield put({ type: 'SET_LOADING', payload: false });
        } else if (tradeList.status === 200 && tradeList.data.code === 404) {
          yield put({ type: 'SET_LOADING', payload: false });
          yield put({ type: 'SET_TRADE_LIST', payload: [] });
        }
      } else {
        yield put({ type: 'SET_LOADING', payload: false });
        yield put({ type: 'SET_MESSAGE', payload: 'Some Error occured while canceling' });
        // yield put({ type: 'ERROR_CREATE_SUBSCRIPTION_PLAN', payload: response.data.response });
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
        funcName: cancelTradeRequest,
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
      yield put({ type: 'SET_MESSAGE', payload: 'Some error occured while canceling trade List' });
      // yield put({ type: 'ERROR_CREATE_SUBSCRIPTION_PLAN', payload: error });
    }
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

  yield put({ type: 'SET_LOADING', payload: false });

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
      // console.log(refreshRes)
      yield put({ type: 'LOGOUT_SUCCESS' });
      // window.localStorage.clear();
      window.localStorage.removeItem('notification');
      window.localStorage.removeItem('notifications');
      yield put(push('/user-analyst'));
    }
  } catch (error) {
    console.log(error);
    yield put({ type: 'LOGOUT_SUCCESS' });
    // window.localStorage.clear();
    window.localStorage.removeItem('notification');
    window.localStorage.removeItem('notifications');
    yield put(push('/user-analyst'));
  }
}
function* updateDematAccounts(request) {
  const signinData = yield select(getSigninData); //  get the redux object

  console.log('request in create_bank_account.....', request);

  try {
    const payload = {
      UserAttributes: request.payload.UserAttributes,
      AccessToken: signinData.token.AuthenticationResult.AccessToken
    };
    const response = yield call(api.updateUserName, payload);
    console.log('response', response);
    if (response.status === 200) {
      if (response.data && response.data.success) {
        yield put({ type: 'SET_UPDATED_DEMAT_ACCOUNTS', payload: payload.UserAttributes[0].Value });
        console.log('DONE');

        // yield put({ type: 'SET_MESSAGE', payload: response.data.response });
      } else {
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
        funcName: updateDematAccounts,
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
  // try {
  //   const response = yield call(api.createBankAccount, request.payload.params, request.payload.token);
  //   console.log('response', response);
  // } catch (error) {
  //   console.log('error: ', error);
  // }
}

function* getAnalystFollowers(request) {
  const signinData = yield select(getSigninData); //  get the redux object

  try {
    const token = signinData.token.AuthenticationResult.AccessToken;
    const response = yield call(api.getAnalystFollowers, token);
    if (response.status === 200) {
      if (response.data) {
        yield put({ type: 'SET_ANALYST_FOLLOWERS', payload: response.data.response });
      }
    }
  } catch (error) {
    console.log('error: ', error);

    const checkStatus = utils.checkAPIfailure(error);
    console.log(checkStatus);

    if (checkStatus.Error && checkStatus.Error.Message && checkStatus.Error.Message === 'Access Token has expired') {
      // change funcName to the current function name so that it gets called back
      const params = {
        funcName: getAnalystFollowers,
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

function* getAnalystSubscribers(request) {
  const signinData = yield select(getSigninData); //  get the redux object

  try {
    const token = signinData.token.AuthenticationResult.AccessToken;
    const response = yield call(api.getAnalystSubscribers, token);
    if (response.status === 200) {
      if (response.data) {
        yield put({ type: 'SET_ANALYST_SUBSCRIBERS', payload: response.data.response });
      }
    }
  } catch (error) {
    console.log('error: ', error);

    const checkStatus = utils.checkAPIfailure(error);
    console.log(checkStatus);

    if (checkStatus.Error && checkStatus.Error.Message && checkStatus.Error.Message === 'Access Token has expired') {
      // change funcName to the current function name so that it gets called back
      const params = {
        funcName: getAnalystSubscribers,
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
function* getAnalystLeaderboard(request) {
  const signinData = yield select(getSigninData); //  get the redux object

  try {
    // yield put({ type: 'ANALYST_LEADERBOARD', payload: request.payload });
    const payload = { token: signinData.token.AuthenticationResult.AccessToken };

    const response = yield call(api.getAnalystLeaderboardApi, payload);
    console.log('response', response);
    if (response.status === 200) {
      if (response.data && response.data.code === 200) {
        yield put({ type: 'SET_ANALYST_LEADERBOARD', payload: response.data.response });
      } else {
        yield put({ type: 'SET_MESSAGE', payload: 'Something went wrong' });
        console.log('leaderboard error', response);
      }
    } else {
      yield put({ type: 'SET_MESSAGE', payload: 'something went wrong' });
    }
  } catch (error) {
    const checkStatus = utils.checkAPIfailure(error);

    if (checkStatus.Error && checkStatus.Error.Message && checkStatus.Error.Message === 'Access Token has expired') {
      // change funcName to the current function name so that it gets called back
      const params = {
        funcName: getAnalystLeaderboard,
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
      yield put({ type: 'SET_MESSAGE', payload: 'something went wrong' });
    }
  }
}

export default function* watchAll() {
  return (
    yield takeEvery('CREATE_BANK_ACCOUNT', create_bank_account),
    yield takeEvery('UPDATE_NAME', updateName),
    yield takeEvery('UPDATE_EMAIL', updateEmail),
    yield takeEvery('UPDATE_PROFILE_IMAGE', updateProfileImage),
    yield takeEvery('GET_BANK_DETAILS', get_bank_account),
    yield takeEvery('GET_ANALYST_DETAILS', getAnalystDetails),
    yield takeEvery('GET_SUBSCRIPTION_PLAN_LIST', getSubscriptionPlanList),
    yield takeEvery('GET_TRADE_LIST', getTradeList),
    yield takeEvery('GET_TRADE_COUNTS', getTradeCounts),
    yield takeEvery('DELETE_SUBSCRIPTION_PLAN', deleteSubscriptionPlan),
    yield takeEvery('CANCEL_TRADE', cancelTradeRequest),
    yield takeEvery('GET_PROFILE_IMAGE', getProfileImage),
    yield takeEvery('UPDATE_DEMAT_ACCOUNTS', updateDematAccounts),
    yield takeEvery('GET_ANALYST_FOLLOWERS', getAnalystFollowers),
    yield takeEvery('GET_ANALYST_FOLLOWERS', getAnalystSubscribers),
    yield takeEvery('GET_ANALYST_LEADERBOARD', getAnalystLeaderboard)
  );
}
