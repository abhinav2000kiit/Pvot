import * as types from '../constants';
import { type } from 'jquery';

// **********Update Name******************* //

export const fetchAnalystsForSubscriptions = payload => ({
  type: types.FETCH_ANALYSTS_FOR_SUBSCRIPTION,
  payload
});
export const saveAnalystsForSubscriptions = payload => ({
  type: types.SAVE_ANALYSTS_FOR_SUBSCRIPTION,
  payload
});

export const applyAnalystBrowseFilter = payload => ({
  type: types.APPLY_ANALYST_BROWSE_FILTER,
  payload
});

export const setAnalystBrowseFilter = payload => ({
  type: types.SET_ANALYST_BROWSE_LIST,
  payload
});

export const setFilterValues = payload => ({
  type: types.SET_FILTER_VALUES,
  payload
});

export const fetchPerformanceAndTransactionsData = payload => ({
  type: types.FETCH_PERFORMANCE_AND_TRANSACTIONS_DATA,
  payload
});

export const savePerformanceAndTransactionsData = payload => ({
  type: types.SAVE_PERFORMANCE_AND_TRANSACTIONS_DATA,
  payload
});

export const fetchUserCards = payload => ({
  type: types.FETCH_USER_CARDS,
  payload
});
export const saveUserCards = payload => ({
  type: types.SAVE_USER_CARDS,
  payload
});

export const getAnalystSubscriptionPlan = payload => ({
  type: types.GET_ANALYST_SUBSCRIPTION_PLAN,
  payload
});

export const setAnalystSubscriptionPlan = payload => ({
  type: types.SET_ANALYST_SUBSCRIPTION_PLAN,
  payload
});

export const getPaymentSubscriptionLink = payload => ({
  type: types.GET_PAYMENT_SUBSCRIPTION_LINK,
  payload
});

export const setPaymentSubscriptionLink = payload => ({
  type: types.SET_PAYMENT_SUBSCRIPTION_LINK,
  payload
});

export const fetchAllWebinars = payload => ({
  type: types.FETCH_ALL_WEBINARS,
  payload
});
export const saveAllWebinars = payload => ({
  type: types.SAVE_ALL_WEBINARS,
  payload
});

export const fetchRecentlyClosedTrades = payload => ({
  type: types.GET_RECENTLY_CLOSED_TRADES,
  payload
});
export const saveRecentlyClosedTrades = payload => ({
  type: types.SET_RECENTLY_CLOSED_TRADES,
  payload
});
export const submitUserInfo = payload => ({
  type: types.SET_USER_INFO,
  payload
});

export const submitUserFollow = payload => ({
  type: types.FOLLOW,
  payload
});

export const submitUserUnFollow = payload => ({
  type: types.UNFOLLOW,
  payload
});


export const likeImage = payload => ({
  type: types.LIKE,
  payload
});

export const unLikeImage = payload => ({
  type: types.UNLIKE,
  payload
});

export const getFeed = token => ({
  type: types.GET_FEED,
  payload: token
});

export const setFeed = data => ({
  type: types.SET_FEED,
  payload: data
});

export const getSubFeed = token => ({
  type: types.GET_SUB_FEED,
  payload: token
});

export const setSubFeed = data => ({
  type: types.SET_SUB_FEED,
  payload: data
});

export const getFeedImages = token => ({
  type: types.GET_FEED_IMAGES,
  payload: token
});

export const setFeedImages = data => ({
  type: types.SET_FEED_IMAGES,
  payload: data
});

export const getComments = token => ({
  type: types.GET_COMMENTS,
  payload: token
});

export const setComments = data => ({
  type: types.SET_COMMENTS,
  payload: data
});

export const postComment = data => ({
  type: types.POST_COMMENT,
  payload: data
});


export const getSubscriptions = token => ({
  type: types.GET_SUBSCRIPTION,
  payload: token
});

export const setSubscriptions = data => ({
  type: types.SET_SUBSCRIPTION,
  payload: data
});

export const getPreferences = () => ({
  type: types.GET_PREFERENCES
})
export const setPreferences = (payload, url) =>({
  type: types.SET_PREFERENCES, 
  payload, 
  url
})
export const setKYCDetails = (KYCPayload) => ({
  type: types.SET_KYC_DETAILS,
  KYCPayload
})

export const getRiskProfileQuestions = ()=>({
  type: types.GET_RISK_PROFILE_QUESTIONS
})

export const sendRiskProfileAnswers = (url, payload) => ({
  type: types.SEND_RISK_PROFILE_ANSWERS,
  url,
  payload
})

export const getReferralCode = () => ({
  type: types.GET_REFERRAL_CODE
})
export const checkReferralCode = (payload) => ({
  type: types.CHECK_REFERRAL_CODE,
  payload
})

export const getBlogListDesktop = () => ({
  type: types.GET_BLOG_LIST_DESKTOP
})

export const getReferredBy = () => ({
  type: types.GET_REFERRED_BY
})

export const getBlogList = () => ({
  type: types.GET_BLOG_LIST
})

export const getBlogDetail = (id) => ({
  type: types.GET_BLOG_DETAIL, 
  id
})

export const getBlogComments = (id) => ({
  type: types.GET_BLOG_COMMENTS,
  id
})

export const sendBlogComment = (payload, id) => ({
  type: types.SEND_BLOG_COMMENT,
  payload,
  id
})

export const toggleBlogLike = (payload) => ({
  type: types.TOGGLE_BLOG_LIKE,
  payload
})