import { call, put, takeEvery, takeLatest, select } from 'redux-saga/effects';
import { push } from 'connected-react-router/immutable';
import api from '../../network';
import utils from '../../theme/utils';

export const getSigninData = state => state.auth.signinData;

// eslint-disable-next-line camelcase
function* fetch_analysts_for_subscriptions(request) {
  const signinData = yield select(getSigninData); //  get the redux object

  console.log('here fetch_analysts_for_subscriptions!!!', request);
  try {
    yield put({ type: 'SET_FILTER_VALUES', payload: request.payload });
    console.log(request.payload.searchParams);
    let payload = {
      searchParams: request.payload.searchParams,
      token: signinData.token.AuthenticationResult.AccessToken
    };
    const response = yield call(api.analystFilterList, payload);
    console.log('response', response);
    if (response.status === 200) {
      if (response.data && response.data.code === 200) {
        yield put({ type: 'SAVE_ANALYSTS_FOR_SUBSCRIPTION', payload: response.data.response });
      } else {
        yield put({ type: 'SAVE_ANALYSTS_FOR_SUBSCRIPTION', payload: [] });
        yield put({ type: 'SET_MESSAGE', payload: 'Something went wrong' });
      }
    } else {
      yield put({ type: 'SET_MESSAGE', payload: 'something went wrong' });
    }
  } catch (error) {
    console.log('error: ', error);

    const checkStatus = utils.checkAPIfailure(error);
    console.log(checkStatus);

    if (checkStatus.Error && checkStatus.Error.Message && checkStatus.Error.Message === 'Access Token has expired') {
      // change funcName to the current function name so that it gets called back
      const params = {
        funcName: fetch_analysts_for_subscriptions,
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
  // const response = yield call(api.createBankAccount, request.payload.params, request.payload.token);
  // console.log('response', response);
  // if (response.status === 200) {
  //   if (response.data && response.data.code === 200) {
  //     const bankDetail = yield call(api.getBankDetails, request.payload.token);
  //     console.log(bankDetail);
  //     if (bankDetail.status === 200 && bankDetail.data.code === 200) {
  //       yield put({ type: 'SAVE_BANK_ACCOUNT', payload: bankDetail.data.response });
  //     }
  //     yield put({ type: 'SET_MESSAGE', payload: response.data.response });
  //   } else {
  //     yield put({ type: 'SET_MESSAGE', payload: response.data.response });
  //   }
  // } else {
  //   yield put({ type: 'SET_MESSAGE', payload: response.statusText });
  // }
}

function* fetch_performance_and_transactions_data(request) {
  const signinData = yield select(getSigninData); //  get the redux object
  console.log('here fetch_performance_and_transactions_data!!!', request);
  try {
    const payload = {
      analyst_id: request.payload.analyst_id,
      token: signinData.token.AuthenticationResult.AccessToken
    };
    const response = yield call(api.getAnalystPerformance, payload);
    console.log('response', response);
    if (response.status === 200) {
      if (response.data && response.data.code === 200) {
        yield put({ type: 'SAVE_PERFORMANCE_AND_TRANSACTIONS_DATA', payload: response.data.response });
      } else {
        yield put({ type: 'SET_ANALYST_MESSAGE', payload: response.data.response });
      }
    } else {
      yield put({ type: 'SET_ANALYST_MESSAGE', payload: response.statusText });
    }
  } catch (error) {
    console.log('error: ', error);

    const checkStatus = utils.checkAPIfailure(error);
    console.log(checkStatus);

    if (checkStatus.Error && checkStatus.Error.Message && checkStatus.Error.Message === 'Access Token has expired') {
      // change funcName to the current function name so that it gets called back
      const params = {
        funcName: fetch_performance_and_transactions_data,
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

function* getAnalystSubscriptionPlan(request) {
  const signinData = yield select(getSigninData); //  get the redux object

  console.log('Get subscription plan list', request);
  try {
    const payload = {
      analyst_id: request.payload.analyst_id,
      segment: request.payload.segment,
      token: signinData.token.AuthenticationResult.AccessToken
    };

    const response = yield call(api.getFilterSubscriptionPlanList, payload);
    console.log('response', response);
    if (response.status === 200) {
      if (response.data && response.data.code === 200) {
        yield put({ type: 'SET_ANALYST_SUBSCRIPTION_PLAN', payload: response.data.response });
      } else {
        yield put({ type: 'SET_ANALYST_SUBSCRIPTION_PLAN', payload: [] });
        yield put({ type: 'SET_MESSAGE', payload: response.data.response });
      }
    } else {
      yield put({ type: 'SET_ANALYST_SUBSCRIPTION_PLAN', payload: [] });
      yield put({ type: 'SET_MESSAGE', payload: response.statusText });
    }
  } catch (error) {
    console.log('error: ', error);

    const checkStatus = utils.checkAPIfailure(error);
    console.log(checkStatus);

    if (checkStatus.Error && checkStatus.Error.Message && checkStatus.Error.Message === 'Access Token has expired') {
      // change funcName to the current function name so that it gets called back
      const params = {
        funcName: getAnalystSubscriptionPlan,
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

function* getPaymentSubscriptionLink(request) {
  const signinData = yield select(getSigninData); //  get the redux object

  console.log('Get payment subscription link', request);
  try {
    const payload = { token: signinData.token.AuthenticationResult.AccessToken };

    const response = yield call(api.paymentSubscriptionLink, request.payload.data, payload.token);
    console.log('response', response);
    if (response.status === 200) {
      if (response.data && response.data.code === 200) {
        yield put({ type: 'SET_PAYMENT_SUBSCRIPTION_LINK', payload: response.data.response });
      } else {
        yield put({ type: 'SET_PAYMENT_SUBSCRIPTION_LINK', payload: null });
        yield put({ type: 'SET_MESSAGE', payload: response.data.response });
      }
    } else {
      yield put({ type: 'SET_PAYMENT_SUBSCRIPTION_LINK', payload: null });
      yield put({ type: 'SET_MESSAGE', payload: response.statusText });
    }
  } catch (error) {
    console.log('error: ', error);

    const checkStatus = utils.checkAPIfailure(error);
    console.log(checkStatus);

    if (checkStatus.Error && checkStatus.Error.Message && checkStatus.Error.Message === 'Access Token has expired') {
      // change funcName to the current function name so that it gets called back
      const params = {
        funcName: getPaymentSubscriptionLink,
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

function* getRecentlyClosedTrades(request) {
  const signinData = yield select(getSigninData); //  get the redux object

  console.log('Get recently closed trades', request);
  try {
    const payload = {
      analyst_id: request.payload.analyst_id,
      token: signinData.token.AuthenticationResult.AccessToken
    };

    const response = yield call(api.fetchRecentlyClosedTrades, payload);
    console.log('response', response);
    if (response.status === 200) {
      if (response.data && response.data.code === 200) {
        yield put({ type: 'SET_RECENTLY_CLOSED_TRADES', payload: response.data.response });
      } else {
        yield put({ type: 'SET_RECENTLY_CLOSED_TRADES', payload: [] });
        // yield put({ type: 'SET_MESSAGE', payload: response.data.response });
      }
    } else {
      yield put({ type: 'SET_RECENTLY_CLOSED_TRADES', payload: null });
      // yield put({ type: 'SET_MESSAGE', payload: response.statusText });
    }
  } catch (error) {
    console.log('error: ', error);

    const checkStatus = utils.checkAPIfailure(error);
    console.log(checkStatus);

    if (checkStatus.Error && checkStatus.Error.Message && checkStatus.Error.Message === 'Access Token has expired') {
      // change funcName to the current function name so that it gets called back
      const params = {
        funcName: getRecentlyClosedTrades,
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

function* fetch_user_cards(request) {
  const signinData = yield select(getSigninData); //  get the redux object

  console.log('here fetch_user_cards!!!', request);
  try {
    let response = yield fetch('https://api.myjson.com/bins/13ncd2');
    response = yield response.json();
    console.log('response', response);

    yield put({ type: 'SAVE_USER_CARDS', payload: response });
    // const response = yield call(api.createBankAccount, request.payload.params, request.payload.token);
    // console.log('response', response);
    // if (response.status === 200) {
    //   if (response.data && response.data.code === 200) {
    //     const bankDetail = yield call(api.getBankDetails, request.payload.token);
    //     console.log(bankDetail);
    //     if (bankDetail.status === 200 && bankDetail.data.code === 200) {
    //       yield put({ type: 'SAVE_BANK_ACCOUNT', payload: bankDetail.data.response });
    //     }
    //     yield put({ type: 'SET_MESSAGE', payload: response.data.response });
    //   } else {
    //     yield put({ type: 'SET_MESSAGE', payload: response.data.response });
    //   }
    // } else {
    //   yield put({ type: 'SET_MESSAGE', payload: response.statusText });
    // }
  } catch (error) {
    console.log('error: ', error);

    const checkStatus = utils.checkAPIfailure(error);
    console.log(checkStatus);

    if (checkStatus.Error && checkStatus.Error.Message && checkStatus.Error.Message === 'Access Token has expired') {
      // change funcName to the current function name so that it gets called back
      const params = {
        funcName: fetch_user_cards,
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

function* fetch_all_webinars(request) {
  const signinData = yield select(getSigninData); //  get the redux object

  console.log('here fetch_all_webinars!!!', request);
  try {
    // let response = yield fetch('https://api.myjson.com/bins/13ncd2');
    // response = yield response.json();
    // console.log('response', response);
    // yield put({ type: 'SAVE_USER_CARDS', payload: response });
    // const response = yield call(api.createBankAccount, request.payload.params, request.payload.token);
    // console.log('response', response);
    // if (response.status === 200) {
    //   if (response.data && response.data.code === 200) {
    //     const bankDetail = yield call(api.getBankDetails, request.payload.token);
    //     console.log(bankDetail);
    //     if (bankDetail.status === 200 && bankDetail.data.code === 200) {
    //       yield put({ type: 'SAVE_BANK_ACCOUNT', payload: bankDetail.data.response });
    //     }
    //     yield put({ type: 'SET_MESSAGE', payload: response.data.response });
    //   } else {
    //     yield put({ type: 'SET_MESSAGE', payload: response.data.response });
    //   }
    // } else {
    //   yield put({ type: 'SET_MESSAGE', payload: response.statusText });
    // }
  } catch (error) {
    console.log('error: ', error);

    const checkStatus = utils.checkAPIfailure(error);
    console.log(checkStatus);

    if (checkStatus.Error && checkStatus.Error.Message && checkStatus.Error.Message === 'Access Token has expired') {
      // change funcName to the current function name so that it gets called back
      const params = {
        funcName: fetch_all_webinars,
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

function* follow(request) {
  const signinData = yield select(getSigninData); //  get the redux object
  console.log('follow!!!', request);
  try {
    const payload = { analyst_id: request.payload, accesstoken: signinData.token.AuthenticationResult.AccessToken };
    const followRes = yield call(api.follow, payload);
    const checkStatus = utils.checkAPIfailure(followRes);
    if (checkStatus.hasOwnProperty('success') && checkStatus.success === true) {
      console.log(':::::::SILENTLY UPDATED:::::::::::');
      console.log(followRes);
      console.log('::::::::::::::::::::::::::::::::::');
    } else {
      console.log('failed follow');
    }
  } catch (error) {
    console.log('error: ', error);

    const checkStatus = utils.checkAPIfailure(error);
    console.log(checkStatus);

    if (checkStatus.Error && checkStatus.Error.Message && checkStatus.Error.Message === 'Access Token has expired') {
      // change funcName to the current function name so that it gets called back
      const params = {
        funcName: follow,
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

function* unfollow(request) {
  const signinData = yield select(getSigninData); //  get the redux object
  console.log('unfollow', request);
  try {
    const payload = { analyst_id: request.payload, accesstoken: signinData.token.AuthenticationResult.AccessToken };
    const unfollowRes = yield call(api.unfollow, payload, signinData.token.AuthenticationResult.AccessToken);
    const checkStatus = utils.checkAPIfailure(unfollowRes);
    if (checkStatus.hasOwnProperty('success') && checkStatus.success === true) {
      console.log(':::::::SILENTLY UPDATED:::::::::::');
      console.log(unfollowRes);
      console.log('::::::::::::::::::::::::::::::::::');
    } else {
      console.log('failed unfollow');
    }
  } catch (error) {
    console.log('error: ', error);

    const checkStatus = utils.checkAPIfailure(error);
    console.log(checkStatus);

    if (checkStatus.Error && checkStatus.Error.Message && checkStatus.Error.Message === 'Access Token has expired') {
      // change funcName to the current function name so that it gets called back
      const params = {
        funcName: unfollow,
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

function* getFeed(request) {
  const signinData = yield select(getSigninData); //  get the redux object
  yield put({ type: 'SET_LOADER', payload: true });
  try {
    const response = yield call(api.getFeed, signinData.token.AuthenticationResult.AccessToken);
    console.log('response', response);
    if (response.status === 200) {
      yield put({ type: 'SET_LOADER', payload: false });
      if (response.data && response.data.code === 200) {
        yield put({ type: 'SET_FEED', payload: response.data.response });
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
        funcName: getFeed,
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

function* getSubFeed(request) {
  const signinData = yield select(getSigninData); //  get the redux object
  yield put({ type: 'SET_LOADER', payload: true });
  try {
    const response = yield call(api.getSubFeed, signinData.token.AuthenticationResult.AccessToken);
    console.log('response', response);
    if (response.status === 200) {
      yield put({ type: 'SET_LOADER', payload: false });
      if (response.data && response.data.code === 200) {
        yield put({ type: 'SET_SUB_FEED', payload: response.data.response });
      } else if (response.data && response.data.code === 404) {
        yield put({ type: 'SET_LOADER', payload: false });
        // yield put({ type: 'SET_MESSAGE', payload: response.data.response });
      } else {
        yield put({ type: 'SET_LOADER', payload: false });
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
        funcName: getSubFeed,
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

// function* getFeedImages(request) {
//   const signinData = yield select(getSigninData); //  get the redux object
//   yield put({ type: 'SET_LOADER', payload: true });
//   try {
//     const response = yield call(api.getFeedImages, request.payload);
//     console.log('response', response);
//     if (response.status === 200) {
//       yield put({ type: 'SET_LOADER', payload: false });
//       if (response.data && response.data.code === 200) {
//         yield put({ type: 'SET_FEED_IMAGES', payload: response.data.response });
//       } else if (response.data && response.data.code === 404) {
//         // yield put({ type: 'SET_MESSAGE', payload: response.data.response });
//       } else {
//         // yield put({ type: 'SET_MESSAGE', payload: response.data.response });
//       }
//     } else {
//       yield put({ type: 'SET_LOADER', payload: false });
//       // yield put({ type: 'SET_MESSAGE', payload: response.statusText });
//     }
//   } catch (error) {
//     yield put({ type: 'SET_LOADER', payload: false });
//     console.log('error: ', error);

//     const checkStatus = utils.checkAPIfailure(error);
//     console.log(checkStatus);

//     if (checkStatus.Error && checkStatus.Error.Message && checkStatus.Error.Message === 'Access Token has expired') {
//       // change funcName to the current function name so that it gets called back
//       const params = {
//         funcName: getFeedImages,
//         params: request
//       };
//       yield call(refreshTokenFunc, params);
//     } else {
//       console.log('Network Err! or Internal Server Err!');
//     }
//     // yield put({ type: 'SET_MESSAGE', payload: error });
//   }
// }

function* refreshTokenFunc(params) {
  console.log(`inside saga refresh token func ::: ${params}`);
  console.log(params);
  const signinData = yield select(getSigninData); //  get the redux object

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

      yield call(params.funcName, params.params); // call the fucntion (saga func) where it got expired!
    } else {
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

function* like(request) {
  const signinData = yield select(getSigninData); //  get the redux object
  console.log('like!!!', request);
  let payload = '';
  try {
    if (request.payload.type === 'images') {
      payload = {
        image_id: request.payload.image_id,
        type: request.payload.type,
        accesstoken: signinData.token.AuthenticationResult.AccessToken
      };
    } else if (request.payload.type === 'videos') {
      payload = {
        video_id: request.payload.video_id,
        type: request.payload.type,
        accesstoken: signinData.token.AuthenticationResult.AccessToken
      };
    } else {
      payload = {
        link_id: request.payload.link_id,
        type: request.payload.type,
        accesstoken: signinData.token.AuthenticationResult.AccessToken
      };
    }
    // const payload = { image_id: request.payload.image_id, type: request.payload.type, accesstoken: signinData.token.AuthenticationResult.AccessToken };
    const likeRes = yield call(api.like, payload);
    const checkStatus = utils.checkAPIfailure(likeRes);
    if (checkStatus.hasOwnProperty('success') && checkStatus.success === true) {
      // do nothing!
    } else {
      console.log('failed like');
    }
  } catch (error) {
    console.log('error: ', error);

    const checkStatus = utils.checkAPIfailure(error);
    console.log(checkStatus);

    if (checkStatus.Error && checkStatus.Error.Message && checkStatus.Error.Message === 'Access Token has expired') {
      // change funcName to the current function name so that it gets called back
      const params = {
        funcName: like,
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

function* unLike(request) {
  const signinData = yield select(getSigninData); //  get the redux object
  console.log('unlike', request);
  let payload = '';
  try {
    if (request.payload.type === 'images') {
      payload = {
        image_id: request.payload.image_id,
        type: request.payload.type,
        accesstoken: signinData.token.AuthenticationResult.AccessToken
      };
    } else if (request.payload.type === 'videos') {
      payload = {
        video_id: request.payload.video_id,
        type: request.payload.type,
        accesstoken: signinData.token.AuthenticationResult.AccessToken
      };
    } else {
      payload = {
        link_id: request.payload.link_id,
        type: request.payload.type,
        accesstoken: signinData.token.AuthenticationResult.AccessToken
      };
    }
    // const payload = { image_id: request.payload.image_id, type: request.payload.type, accesstoken: signinData.token.AuthenticationResult.AccessToken };
    const unLikeRes = yield call(api.unlike, payload, signinData.token.AuthenticationResult.AccessToken);
    const checkStatus = utils.checkAPIfailure(unLikeRes);
    if (checkStatus.hasOwnProperty('success') && checkStatus.success === true) {
      // do nothing!
    } else {
      console.log('failed unlike');
    }
  } catch (error) {
    console.log('error: ', error);

    const checkStatus = utils.checkAPIfailure(error);
    console.log(checkStatus);

    if (checkStatus.Error && checkStatus.Error.Message && checkStatus.Error.Message === 'Access Token has expired') {
      // change funcName to the current function name so that it gets called back
      const params = {
        funcName: unLike,
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

function* getComments(request) {
  const signinData = yield select(getSigninData); //  get the redux object
  // yield put({ type: 'SET_LOADER', payload: true });
  let payload = '';
  try {
    if (request.payload.type === 'images') {
      payload = {
        imageId: request.payload.image_id,
        type: request.payload.type,
        url: `/api/feed/images/comments?image_id=${request.payload.image_id}`,
        accesstoken: signinData.token.AuthenticationResult.AccessToken
      };
    } else if (request.payload.type === 'videos') {
      payload = {
        videoId: request.payload.video_id,
        type: request.payload.type,
        url: `/api/feed/videos/comments?video_id=${request.payload.video_id}`,
        accesstoken: signinData.token.AuthenticationResult.AccessToken
      };
    } else {
      payload = {
        linkId: request.payload.link_id,
        type: request.payload.type,
        url: `/api/feed/links/comments?link_id=${request.payload.link_id}`,
        accesstoken: signinData.token.AuthenticationResult.AccessToken
      };
    }

    console.log(payload);
    // const payload = { imageId: request.payload.image_id, type: request.payload.type, accesstoken: signinData.token.AuthenticationResult.AccessToken };
    const response = yield call(api.getComments, payload);
    console.log('response', response);
    if (response.status === 200) {
      // yield put({ type: 'SET_LOADER', payload: false });
      if (response.data && response.data.code === 200) {
        yield put({ type: 'SET_COMMENTS', payload: response.data.response });
      } else if (response.data && response.data.code === 404) {
        // yield put({ type: 'SET_MESSAGE', payload: response.data.response });
      } else {
        // yield put({ type: 'SET_MESSAGE', payload: response.data.response });
      }
    } else {
      // yield put({ type: 'SET_LOADER', payload: false });
      // yield put({ type: 'SET_MESSAGE', payload: response.statusText });
    }
  } catch (error) {
    // yield put({ type: 'SET_LOADER', payload: false });
    console.log('error: ', error);

    const checkStatus = utils.checkAPIfailure(error);
    console.log(checkStatus);

    if (checkStatus.Error && checkStatus.Error.Message && checkStatus.Error.Message === 'Access Token has expired') {
      // change funcName to the current function name so that it gets called back
      const params = {
        funcName: getComments,
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

function* postComment(request) {
  const signinData = yield select(getSigninData); //  get the redux object
  // yield put({ type: 'SET_LOADER', payload: true });
  let payload = '';
  try {
    if (request.payload.type === 'images') {
      payload = {
        image_id: request.payload.image_id,
        comment: request.payload.comment,
        type: request.payload.type,
        url: `/api/feed/images/comments`,
        accesstoken: signinData.token.AuthenticationResult.AccessToken
      };
    } else if (request.payload.type === 'videos') {
      payload = {
        video_id: request.payload.video_id,
        comment: request.payload.comment,
        type: request.payload.type,
        url: `/api/feed/videos/comments`,
        accesstoken: signinData.token.AuthenticationResult.AccessToken
      };
    } else {
      payload = {
        link_id: request.payload.link_id,
        comment: request.payload.comment,
        type: request.payload.type,
        url: `/api/feed/links/comments`,
        accesstoken: signinData.token.AuthenticationResult.AccessToken
      };
    }

    // const payload = {
    //   image_id: request.payload.image_id,
    //   comment: request.payload.comment,
    //   accesstoken: signinData.token.AuthenticationResult.AccessToken
    // };
    const response = yield call(api.postComment, payload);
    console.log('response', response);
    if (response.status === 200) {
      console.log('success!!');
      // yield put({ type: 'SET_LOADER', payload: false });
      if (response.data && response.data.code === 200) {
        console.log('comment posted !');
      } else if (response.data && response.data.code === 404) {
        console.log('comment posted err 404!');
        // yield put({ type: 'SET_MESSAGE', payload: response.data.response });
      } else {
        console.log('comment not posted ! no success');
        // yield put({ type: 'SET_MESSAGE', payload: response.data.response });
      }
    } else {
      console.log('comment not posted else  !');
      // yield put({ type: 'SET_LOADER', payload: false });
      // yield put({ type: 'SET_MESSAGE', payload: response.statusText });
    }
  } catch (error) {
    // yield put({ type: 'SET_LOADER', payload: false });
    console.log('error: ', error);

    const checkStatus = utils.checkAPIfailure(error);
    console.log(checkStatus);

    if (checkStatus.Error && checkStatus.Error.Message && checkStatus.Error.Message === 'Access Token has expired') {
      // change funcName to the current function name so that it gets called back
      const params = {
        funcName: postComment,
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

function* getSubscriptions(request) {
  const signinData = yield select(getSigninData); //  get the redux object
  yield put({ type: 'SET_LOADER', payload: true });
  try {
    const response = yield call(api.getSubscriptions, signinData.token.AuthenticationResult.AccessToken);
    console.log('response', response);
    if (response.status === 200) {
      yield put({ type: 'SET_LOADER', payload: false });
      if (response.data && response.data.code === 200) {
        yield put({ type: 'SET_SUBSCRIPTION', payload: response.data.response });
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
        funcName: getSubscriptions,
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
function* get_preferences_worker(request) {
  let signinData = yield select(getSigninData);
  let token = signinData.token.AuthenticationResult.AccessToken;
  console.log('inside get_preferences');
  try {
    const response = yield call(api.getPreferences, token);
    const refreshResponse = utils.checkAPIfailure(response);
    if (refreshResponse.code === 200) {
      yield put({ type: 'GET_PREFERENCES_SUCCESS', preferences: refreshResponse.response });
    }
  } catch (error) {
    console.log('Error in get preferences', error);
    const checkStatus = utils.checkAPIfailure(error);
    console.log(checkStatus);

    if (checkStatus.Error && checkStatus.Error.Message && checkStatus.Error.Message === 'Access Token has expired') {
      // change funcName to the current function name so that it gets called back
      const params = {
        funcName: get_preferences_worker,
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
    }
  }
}

function* set_preferences_worker(request) {
  const params = request.payload;
  const url = request.url;
  const signinData = yield select(getSigninData);
  const token = signinData.token.AuthenticationResult.AccessToken;
  const payload = {
    params,
    token
  };
  try {
    const response = yield call(api.setPreferences, payload);
    const refreshResponse = utils.checkAPIfailure(response);
    if (refreshResponse.code === 200) {
      yield put({ type: 'SET_PREFERENCES_SUCCESS', newPreferences: payload.params.selected_preference_ids });
      yield put(push(url));
    }
    // yield put({type: 'SET_PREFERENCES_SUCCESS', newPreferences: payload.params.selected_preference_ids})
  } catch (error) {
    console.log('Error in set preferences', error);
    const checkStatus = utils.checkAPIfailure(error);
    console.log(checkStatus);

    if (checkStatus.Error && checkStatus.Error.Message && checkStatus.Error.Message === 'Access Token has expired') {
      // change funcName to the current function name so that it gets called back
      const params = {
        funcName: set_preferences_worker,
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
    }
  }
}

function* setKycDetails(request) {
  const signinData = yield select(getSigninData); //  get the redux object

  console.log(request);
  let KYCPayload = request.KYCPayload;
  console.log(KYCPayload);
  try {
    const response = yield call(api.updateUserName, KYCPayload);
    console.log('KYC response', response);
    if (response.status === 200) {
      if (response.data && response.data.success) {
        yield put({ type: 'SET_KYC_DETAILS_SUCCESS', payload: KYCPayload.UserAttributes });
      }
    }
  } catch (error) {
    console.log('error: ', error);

    const checkStatus = utils.checkAPIfailure(error);
    console.log(checkStatus);

    if (checkStatus.Error && checkStatus.Error.Message && checkStatus.Error.Message === 'Access Token has expired') {
      // change funcName to the current function name so that it gets called back
      const params = {
        funcName: setKycDetails,
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
function* getRiskProfileQuestions(request) {
  console.log(request);
  let url = '/api/investor/risk-profiling';
  let signinData = yield select(getSigninData);
  let AccessToken = signinData.token.AuthenticationResult.AccessToken;
  try {
    let response = yield call(api.getRiskProfileQuestions, AccessToken);
    console.log('questions', response);
    const refreshResponse = utils.checkAPIfailure(response);
    if (refreshResponse.code === 200) {
      yield put({ type: 'GET_RISK_PROFILE_QUESTIONS_SUCCESS', questions: refreshResponse.response });
    }
  } catch (error) {
    console.log('error ', error);
    const checkStatus = utils.checkAPIfailure(error);
    console.log(checkStatus);

    if (checkStatus.Error && checkStatus.Error.Message && checkStatus.Error.Message === 'Access Token has expired') {
      // change funcName to the current function name so that it gets called back
      const params = {
        funcName: getRiskProfileQuestions,
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

function* sendRiskProfileAnswers(request) {
  let url = request.url;
  let payload = request.payload;
  let signinData = yield select(getSigninData);
  let token = signinData.token.AuthenticationResult.AccessToken;
  try {
    let response = yield call(api.sendRiskProfileAnswers, url, payload, token);
    const refreshResponse = utils.checkAPIfailure(response);
    if (refreshResponse.code === 200) {
      yield put({ type: 'SEND_RISK_PROFILE_ANSWERS_SUCCESS', answers: payload.risk_profiling });
      yield put({ type: 'GET_RISK_PROFILING_SCORE_SUCCESS', score: refreshResponse.risk_profiling_score });
    }
  } catch (error) {
    console.log('error ', error);
    const checkStatus = utils.checkAPIfailure(error);
    console.log(checkStatus);

    if (checkStatus.Error && checkStatus.Error.Message && checkStatus.Error.Message === 'Access Token has expired') {
      // change funcName to the current function name so that it gets called back
      const params = {
        funcName: sendRiskProfileAnswers,
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
function* allow_trade_entry(request) {
  const signinData = yield select(getSigninData); //  get the redux object

  try {
    const payload = { ...request.payload, token: signinData.token.AuthenticationResult.AccessToken };

    const response = yield call(api.allowTradeEntry, payload);
    console.log('response', response);
    if (response.status === 200) {
      if (response.data && response.data.code === 200) {
        yield put({ type: 'SET_ALLOW_ENTRY', payload: response.data.response.allow_entry });
      }
    } else if (response.code === 400) {
      yield put({ type: 'SET_MESSAGE', payload: response.response });
    } else {
      yield put({ type: 'SET_MESSAGE', payload: response.statusText });
    }
  } catch (error) {
    console.log('error: ', error);

    const checkStatus = utils.checkAPIfailure(error);
    console.log(checkStatus);

    if (checkStatus.Error && checkStatus.Error.Message && checkStatus.Error.Message === 'Access Token has expired') {
      // change funcName to the current function name so that it gets called back
      const params = {
        funcName: allow_trade_entry,
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

function* getReferralCode(request) {
  const signinData = yield select(getSigninData);
  try {
    const token = signinData.token.AuthenticationResult.AccessToken;
    const response = yield call(api.getReferralCode, token);
    const checkResponse = utils.checkAPIfailure(response);
    if (checkResponse.code === 200) {
      console.log(checkResponse);
      yield put({ type: 'SET_REFERRAL_CODE', referral_code: checkResponse.response.referral_code });
    }
  } catch (error) {
    console.log('error ', error);
    const checkStatus = utils.checkAPIfailure(error);
    console.log(checkStatus);

    if (checkStatus.Error && checkStatus.Error.Message && checkStatus.Error.Message === 'Access Token has expired') {
      // change funcName to the current function name so that it gets called back
      const params = {
        funcName: getReferralCode,
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

function* checkReferralCode(request) {
  console.log('============', request.payload);
  const payload = request.payload;
  const signinData = yield select(getSigninData);
  try {
    const token = signinData.token.AuthenticationResult.AccessToken;
    const response = yield call(api.checkReferralCode, payload, token);
    const checkResponse = utils.checkAPIfailure(response);
    if (checkResponse.response) {
      yield put({ type: 'SET_MESSAGE', payload: 'Referral Code Successfull' });
      yield put({ type: 'SET_REFERRAL_VERIFICATION', verified: true, referredBy: checkResponse.response.referred_by })
    } else {
      yield put({ type: 'REFERRAL_FAILED' });
    }
  } catch (error) {
    console.log('error ', error);
    const checkStatus = utils.checkAPIfailure(error);
    console.log(checkStatus);

    if (checkStatus.Error && checkStatus.Error.Message && checkStatus.Error.Message === 'Access Token has expired') {
      // change funcName to the current function name so that it gets called back
      const params = {
        funcName: checkReferralCode,
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

      yield put({ type: 'SET_MESSAGE', payload: 'Invalid Referral Code' });
      //yield put({ type: 'SET_LOADER', payload: false });
      //yield put({ type: 'SET_MESSAGE', payload: 'Some error occured while placing trade' });
      //yield put({ type: 'ERROR_CREATE_SUBSCRIPTION_PLAN', payload: error });
    }
  }
}

function* getBlogListDesktopSaga(request){
  const signinData = yield select(getSigninData)
  try{
    const token = signinData ? signinData.token.AuthenticationResult.AccessToken : null
    const response = yield call(api.getBlogListDesktop, token)
    const checkResponse = utils.checkAPIfailure(response);
    if (checkResponse.code === 200) {
      console.log('======',checkResponse)
      yield put({ type: 'SET_BLOG_LIST_DESKTOP', payload: checkResponse.response });
    }
  } catch (error) {
    console.log('error ', error);
    const checkStatus = utils.checkAPIfailure(error);
    if (checkStatus.Error && checkStatus.Error.Message && checkStatus.Error.Message === 'Access Token has expired') {
      // change funcName to the current function name so that it gets called back
      const params = {
        funcName: getBlogListDesktopSaga,
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
function* getReferredBy(request) {
  const signinData = yield select(getSigninData);
  try {
    const token = signinData.token.AuthenticationResult.AccessToken;
    const response = yield call(api.getReferredBy, token);
    const checkResponse = utils.checkAPIfailure(response);
    if (checkResponse.code === 200) {
      console.log(checkResponse);
      yield put({ type: 'SET_REFERRED_BY', referred_by: checkResponse.response.referred_by });
    }
  } catch (error) {
    console.log('error ', error);
    const checkStatus = utils.checkAPIfailure(error);
    console.log(checkStatus);

    if (checkStatus.Error && checkStatus.Error.Message && checkStatus.Error.Message === 'Access Token has expired') {
      // change funcName to the current function name so that it gets called back
      const params = {
        funcName: getReferredBy,
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

function* getBlogListSaga(request){
  const signinData = yield select(getSigninData);
  try {
    const token = signinData ? signinData.token.AuthenticationResult.AccessToken : null;
    const response = yield call(api.getBlogList, token);
    const checkResponse = utils.checkAPIfailure(response);
    if (checkResponse.code === 200) {
      console.log(checkResponse);
      yield put({ type: 'SET_BLOG_LIST', blogList: checkResponse.response });
    }
  } catch (error) {
    console.log('error ', error);
    const checkStatus = utils.checkAPIfailure(error);
    console.log(checkStatus);

    if (checkStatus.Error && checkStatus.Error.Message && checkStatus.Error.Message === 'Access Token has expired') {
      // change funcName to the current function name so that it gets called back
      const params = {
        funcName: getBlogListSaga,
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


function* getBlogDetailSaga(request){
  const signinData = yield select(getSigninData);
  try {
    const token = signinData ? signinData.token.AuthenticationResult.AccessToken : null;
    const response = yield call(api.getBlogDetail, token, request.id);
    const checkResponse = utils.checkAPIfailure(response);
    if (checkResponse.code === 200) {
      console.log(checkResponse);
      yield put({ type: 'SET_BLOG_DETAIL', blogDetail: checkResponse.response });
    }
  } catch (error) {
    console.log('error ', error);
    const checkStatus = utils.checkAPIfailure(error);
    console.log(checkStatus);

    if (checkStatus.Error && checkStatus.Error.Message && checkStatus.Error.Message === 'Access Token has expired') {
      // change funcName to the current function name so that it gets called back
      const params = {
        funcName: getBlogDetailSaga,
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

      yield put({ type: 'SET_BLOG_MESSAGE', payload: 'Invalid Url' });
      //yield put({ type: 'SET_LOADER', payload: false });
      //yield put({ type: 'SET_MESSAGE', payload: 'Some error occured while placing trade' });
      //yield put({ type: 'ERROR_CREATE_SUBSCRIPTION_PLAN', payload: error });
    }
  }
}

function* getBlogCommentsSaga(request){
  const signinData = yield select(getSigninData);
  try {
    const token = signinData ? signinData.token.AuthenticationResult.AccessToken : null;
    const response = yield call(api.getBlogComments, token, request.id);
    const checkResponse = utils.checkAPIfailure(response);
    if (checkResponse.code === 200) {
      console.log(checkResponse);
      yield put({ type: 'SET_BLOG_COMMENTS', blogComments: checkResponse.response });
    }
  } catch (error) {
    console.log('error ', error);
    const checkStatus = utils.checkAPIfailure(error);
    console.log(checkStatus);

    if (checkStatus.Error && checkStatus.Error.Message && checkStatus.Error.Message === 'Access Token has expired') {
      // change funcName to the current function name so that it gets called back
      const params = {
        funcName: getBlogCommentsSaga,
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
function* sendBlogCommentSaga(request){
  const signinData = yield select(getSigninData);
  try {
    const token = signinData.token.AuthenticationResult.AccessToken;
    const response = yield call(api.sendBlogComment,request.payload, request.id, token);
    const checkResponse = utils.checkAPIfailure(response);
    if (checkResponse.code === 200) {
      console.log(checkResponse);
      yield put({ type: 'SEND_BLOG_COMMENT_SUCCESS'});
      yield call(getBlogCommentsSaga, request)
    }
  } catch (error) {
    console.log('error ', error);
    const checkStatus = utils.checkAPIfailure(error);
    console.log(checkStatus);

    if (checkStatus.Error && checkStatus.Error.Message && checkStatus.Error.Message === 'Access Token has expired') {
      // change funcName to the current function name so that it gets called back
      const params = {
        funcName: sendBlogCommentSaga,
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

function* toggleBlogLikeSaga(request){
  const signinData = yield select(getSigninData);
  try {
    const token = signinData.token.AuthenticationResult.AccessToken;
    const response = yield call(api.toggleBlogLike,request.payload, token);
    const checkResponse = utils.checkAPIfailure(response);
    if (checkResponse.code === 200) {
      console.log(checkResponse);
      if(request.payload.like)  yield put({ type: 'BLOG_LIKE_SUCCESS'});
      else yield put({ type: 'BLOG_UNLIKE_SUCCESS'});
    }
  } catch (error) {
    console.log('error ', error);
    const checkStatus = utils.checkAPIfailure(error);
    console.log(checkStatus);

    if (checkStatus.Error && checkStatus.Error.Message && checkStatus.Error.Message === 'Access Token has expired') {
      // change funcName to the current function name so that it gets called back
      const params = {
        funcName: sendBlogCommentSaga,
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

export default function* watchAll() {
  return (
    yield takeEvery('FETCH_ANALYSTS_FOR_SUBSCRIPTION', fetch_analysts_for_subscriptions),
    yield takeEvery('FETCH_PERFORMANCE_AND_TRANSACTIONS_DATA', fetch_performance_and_transactions_data),
    yield takeEvery('FETCH_USER_CARDS', fetch_user_cards),
    yield takeEvery('FETCH_ALL_WEBINARS', fetch_all_webinars),
    yield takeEvery('GET_ANALYST_SUBSCRIPTION_PLAN', getAnalystSubscriptionPlan),
    yield takeEvery('GET_PAYMENT_SUBSCRIPTION_LINK', getPaymentSubscriptionLink),
    yield takeEvery('GET_RECENTLY_CLOSED_TRADES', getRecentlyClosedTrades),
    yield takeEvery('UNFOLLOW', unfollow),
    yield takeEvery('FOLLOW', follow),
    yield takeEvery('LIKE', like),
    yield takeEvery('UNLIKE', unLike),
    yield takeEvery('GET_FEED', getFeed),
    yield takeEvery('GET_SUB_FEED', getSubFeed),
    // yield takeEvery('GET_FEED_IMAGES', getFeedImages),
    yield takeEvery('GET_COMMENTS', getComments),
    yield takeEvery('POST_COMMENT', postComment),
    yield takeEvery('GET_SUBSCRIPTION', getSubscriptions),
    yield takeEvery('GET_PREFERENCES', get_preferences_worker),
    yield takeEvery('SET_PREFERENCES', set_preferences_worker),
    yield takeEvery('SET_KYC_DETAILS', setKycDetails),
    yield takeEvery('GET_RISK_PROFILE_QUESTIONS', getRiskProfileQuestions),
    yield takeEvery('SEND_RISK_PROFILE_ANSWERS', sendRiskProfileAnswers),
    yield takeEvery('ALLOW_ENTRY', allow_trade_entry),
    yield takeEvery('GET_REFERRAL_CODE', getReferralCode),
    yield takeEvery('CHECK_REFERRAL_CODE', checkReferralCode),
    yield takeEvery('GET_BLOG_LIST_DESKTOP', getBlogListDesktopSaga),
    yield takeEvery('GET_REFERRED_BY', getReferredBy),
    yield takeEvery('GET_BLOG_LIST', getBlogListSaga),
    yield takeEvery('GET_BLOG_DETAIL', getBlogDetailSaga),
    yield takeEvery('GET_BLOG_COMMENTS', getBlogCommentsSaga),
    yield takeEvery('SEND_BLOG_COMMENT', sendBlogCommentSaga),
    yield takeEvery('TOGGLE_BLOG_LIKE', toggleBlogLikeSaga)
  );
}
