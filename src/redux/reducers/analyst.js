import * as actionTypes from '../constants';
import { updateObject } from '../../shared/utility';
//import { getAvailableTradeBalance } from '../actions/auth';
//import { changeHomeState } from '../actions';

const initialState = {
  analystDetails: null,
  subscriptionPlan: null,
  tradeList: null,
  tradeItem: null,
  documentUpdated: false,
  tradeCounts: null,
  analystPortfolio: null,
  allowEntry: true,
  followers: null,
  subscribers: null,
  analyst_leaderboard: null,
  loading: false,
  switchToProfileDisplay: false,
  switchToAccountDisplay: false
};

// {
//   sortBy:[{ id: 0, text: 'High -Low', isSelected: false }, { id: 1, text: 'Low -High', isSelected: false }, { id: 2, text: 'High - Low', isSelected: false }, { id: 3, text: 'Low - High', isSelected: false }],
//   tradingSegment:[{ id: 0, text: 'Cash', isSelected: false }, { id: 1, text: 'Options', isSelected: false }, { id: 2, text: 'Future', isSelected: false }, { id: 3, text: 'Investment', isSelected: false }],
//   tradingType:[{ text: 'Intraday', isSelected: false }, { text: 'Positional', isSelected: false }]
// }

const saveAnalystDetails = (state, action) =>
  updateObject(state, {
    analystDetails: action.payload
  });
const saveSubscriptionPlan = (state, action) =>
  updateObject(state, {
    subscriptionPlan: action.payload
  });
const saveTradeList = (state, action) =>
  updateObject(state, {
    tradeList: action.payload
  });

const saveTradeItem = (state, action) =>
  updateObject(state, {
    tradeItem: action.payload
  });

const updateDocument = (state, action) =>
  updateObject(state, {
    documentUpdated: action.payload
  });

const saveTradeCounts = (state, action) =>
  updateObject(state, {
    tradeCounts: action.payload
  });

const saveAnalystPortfolio = (state, action) =>
  updateObject(state, {
    analystPortfolio: action.payload
  });

const setAllowEntry = (state, action) =>
  updateObject(state, {
    allowEntry: action.payload
  });

const setAnalystFollowers = (state, action) =>
  updateObject(state, {
    followers: action.payload
  });

const setAnalystSubscribers = (state, action) =>
  updateObject(state, {
    subscribers: action.payload
  });
const setAnalystLeaderboard = (state, action) =>
  updateObject(state, {
    analyst_leaderboard: action.payload
  });
const setLoading = (state, action) =>
  updateObject(state, {
    loading: action.payload
  });
const setProfileDisplayPage = (state, action) =>
  updateObject(state, {
    switchToProfileDisplay: action.payload
  });
const setAccountDisplayPage = (state, action) =>
  updateObject(state, {
    switchToAccountDisplay: action.payload
  });

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_ANALYST_DETAILS:
      return saveAnalystDetails(state, action);
    case actionTypes.SET_SUBSCRIPTION_PLAN_LIST:
      return saveSubscriptionPlan(state, action);
    case actionTypes.SET_TRADE_LIST:
      return saveTradeList(state, action);
    case actionTypes.SET_TRADE_ITEM:
      return saveTradeItem(state, action);
    case actionTypes.DOCUMENT_UPDATED:
      return updateDocument(state, action);
    case actionTypes.SET_TRADE_COUNTS:
      return saveTradeCounts(state, action);
    case actionTypes.SET_ANALYST_PORTFOLIO:
      return saveAnalystPortfolio(state, action);
    case actionTypes.SET_ALLOW_ENTRY:
      return setAllowEntry(state, action);
    case actionTypes.SET_ANALYST_FOLLOWERS:
      return setAnalystFollowers(state, action);
    case actionTypes.SET_ANALYST_SUBSCRIBERS:
      return setAnalystSubscribers(state, action);
    case actionTypes.SET_ANALYST_LEADERBOARD:
      return setAnalystLeaderboard(state, action);
    case actionTypes.SET_LOADING:
      return setLoading(state, action);
    case actionTypes.SWITCH_TO_PROFILE_DISPLAY:
      return setProfileDisplayPage(state, action);
    case actionTypes.SWITCH_TO_ACCOUNT_DISPLAY:
      return setAccountDisplayPage(state, action);
    default:
      return state;
  }
};
