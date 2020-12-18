import * as types from '../constants';
import { type } from 'jquery';

// **********Update Name******************* //

export const updateName = Namepayload => ({
  type: types.UPDATE_NAME,
  Namepayload
});
export const updateEmail = EmailPayload => ({
  type: types.UPDATE_EMAIL,
  EmailPayload
});
export const updateDematAccounts = payload => ({
  type: types.UPDATE_DEMAT_ACCOUNTS,
  payload
});
export const updateProfileImage = profileImage => ({
  type: types.UPDATE_PROFILE_IMAGE,
  profileImage
});

export const setUpdateProfileImage = profileImage => ({
  type: types.SET_UPDATED_PROFILE_IMAGE,
  profileImage
});

export const setUpdatedName = Namepayload => ({
  type: types.SET_UPDATED_NAME,
  Namepayload
});

export const resetErrorBankDetails = payload => ({
  type: types.ERROR_CREATE_BANK_ACCOUNT,
  payload
});

export const resetErrorCreateSubscription = payload => ({
  type: types.RESET_ERROR_CREATE_SUBSCRIPTION,
  payload
});

export const getBankDetails = payload => ({
  type: types.GET_BANK_DETAILS,
  payload
});

export const getAnalystDetails = data => ({
  type: types.GET_ANALYST_DETAILS,
  payload: data
});

export const setAnalystDetails = data => ({
  type: types.SET_ANALYST_DETAILS,
  payload: data
});

export const getSubscriptionPlanList = token => ({
  type: types.GET_SUBSCRIPTION_PLAN_LIST,
  payload: token
});

export const setSubscriptionPlanList = data => ({
  type: types.SET_SUBSCRIPTION_PLAN_LIST,
  payload: data
});

export const deleteSubscriptionPlan = data => ({
  type: types.DELETE_SUBSCRIPTION_PLAN,
  payload: data
});

export const getTradeList = token => ({
  type: types.GET_TRADE_LIST,
  payload: token
});

export const getTradeCounts = token => ({
  type: types.GET_TRADE_COUNTS,
  payload: token
});

export const setTradeCounts = data => ({
  type: types.SET_TRADE_COUNTS,
  payload: data
});

export const setTradeList = data => ({
  type: types.SET_TRADE_LIST,
  payload: data
});

export const setTradeItem = data => ({
  type: types.SET_TRADE_ITEM,
  payload: data
});

export const cancelTrade = data => ({
  type: types.CANCEL_TRADE,
  payload: data
});

export const getProfileImage = data => ({
  type: types.GET_PROFILE_IMAGE,
  token: data
});

export const documentUpdated = data => ({
  type: types.DOCUMENT_UPDATED,
  payload: data
});

export const getAnalystFollowers = sssssss => ({
  type: types.GET_ANALYST_FOLLOWERS
});

export const getAnalystSubscribers = () => ({
  type: types.GET_ANALYST_SUBSCRIBERS
});

//******************** CREATE ANALYST PORTFOLIO ******************* */
export const createAnalystPortfolio = payload => ({
  type: types.CREATE_ANALYST_PORTFOLIO,
  payload
});

export const getAnalystPortfolio = token => ({
  type: types.GET_ANALYST_PORTFOLIO,
  payload: token
});

export const setAnalystPortfolio = data => ({
  type: types.SET_ANALYST_PORTFOLIO,
  payload: data
});

//******************** Allow Trade Entry ******************* */
export const allowTradeEntry = data => ({
  type: types.ALLOW_ENTRY,
  payload: data
});

//***************** Analyst Leaderboard ******************************/
export const getAnalystLeaderboard = data => ({
  type: types.GET_ANALYST_LEADERBOARD,
  payload: data
});

export const setAnalystLeaderboard = data => ({
  type: types.SET_ANALYST_LEADERBOARD,
  payload: data
});

//***************** Browser Page Switch ******************************/
export const setProfileDisplayPage = data => ({
  type: types.SWITCH_TO_PROFILE_DISPLAY,
  payload: data
});

export const setAccountDisplayPage = data => ({
  type: types.SWITCH_TO_ACCOUNT_DISPLAY,
  payload: data
});
