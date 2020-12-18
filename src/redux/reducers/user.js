import * as actionTypes from '../constants';
import { updateObject } from '../../shared/utility';
// import { getAvailableTradeBalance } from '../actions/auth';
// import { changeHomeState } from '../actions';

const initialState = {
  analystsForSubscription: null,
  analystsForSubscriptionDetails: null,
  savedCards: null,
  filters: null,
  webinars: null,
  analystSubscriptionPlanList: null,
  paymentLinkForSubscription: null,
  recentlyClosedTradeList: null,
  userInfo: null,
  follow: null,
  unfollow: null,
  like: null,
  unLike: null,
  feed: null,
  subFeed: null,
  feedImages: null,
  comments: null,
  postComment: null,
  subscriptions: null,
  userPreferencesDataAll: null,
  userPreferencesDataSelected: null,
  riskProfileQuestions: null,
  riskProfileAnswers: null,
  analystMessage: null,
  referralCode: null,
  referralVerified: false,
  referredBy: null,
  blogList: null, 
  blogDetail: null,
  blogComments: null,
  blogMessage: null
};

// {
//   sortBy:[{ id: 0, text: 'High -Low', isSelected: false }, { id: 1, text: 'Low -High', isSelected: false }, { id: 2, text: 'High - Low', isSelected: false }, { id: 3, text: 'Low - High', isSelected: false }],
//   tradingSegment:[{ id: 0, text: 'Cash', isSelected: false }, { id: 1, text: 'Options', isSelected: false }, { id: 2, text: 'Future', isSelected: false }, { id: 3, text: 'Investment', isSelected: false }],
//   tradingType:[{ text: 'Intraday', isSelected: false }, { text: 'Positional', isSelected: false }]
// }

const saveAnalystsForSubscriptions = (state, action) =>
  updateObject(state, {
    analystsForSubscription: action.payload
  });

const savePerformanceAndTransactionsData = (state, action) =>
  updateObject(state, {
    analystsForSubscriptionDetails: action.payload,
    analystMessage: null
  });

const saveUserCards = (state, action) =>
  updateObject(state, {
    savedCards: action.payload
  });
const updateFilterValue = (state, action) =>
  updateObject(state, {
    filters: action.payload
  });

const setAnalystSubscriptionPlan = (state, action) =>
  updateObject(state, {
    analystSubscriptionPlanList: action.payload
  });
const setPaymentSubscriptionLinkReducer = (state, action) =>
  updateObject(state, {
    paymentLinkForSubscription: action.payload
  });
const setRecentlyClosedTrades = (state, action) =>
  updateObject(state, {
    recentlyClosedTradeList: action.payload
  });
const setUserInfo = (state, action) => {
  updateObject(state, {
    userInfo: action.payload
  });
};

// I dont think this is necessary

const setFollow = (state, action) =>
  updateObject(state, {
    follow: action.payload
  });

const setUnFollow = (state, action) =>
  updateObject(state, {
    unfollow: action.payload
  });


const setLike = (state, action) =>
updateObject(state, {
  like: action.payload
});

const setUnLike = (state, action) =>
  updateObject(state, {
    unLike: action.payload
  });

const saveFeed = (state, action) =>
  updateObject(state, {
    feed: action.payload
  });

const saveSubFeed = (state, action) =>
  updateObject(state, {
    subFeed: action.payload
  });

const saveFeedImages = (state, action) =>
  updateObject(state, {
    feedImages: action.payload
  });

const saveComments = (state, action) =>
updateObject(state, {
  comments: action.payload
});

const postComment = (state, action) =>
updateObject(state, {
  postComment: action.payload
});

const saveSubscriptions = (state, action) =>
  updateObject(state, {
    subscriptions: action.payload
  });

const saveUserPreferences = (state, action) =>{
  let selectedPreferences = []
  action.preferences.forEach(preference=>{
    if(preference.selected){
      selectedPreferences.push(preference.id)
    }
  })
  console.log('=====================',action.preferences, selectedPreferences)
  return updateObject(state,{
    userPreferencesDataAll: action.preferences,
    userPreferencesDataSelected: selectedPreferences
  })
}
const saveUserNewPreferences = (state, action) =>{
  let arr = state.userPreferencesDataAll
  for(let i=0; i< arr.length; i++){
    let ind = action.newPreferences.indexOf(arr[i].id)
    if(ind !== -1){
      arr[i].selected = true
    }else{
      arr[i].selected = false
    }
  }
  return updateObject(state,{
    userPreferencesDataSelected: action.newPreferences,
    userPreferencesDataAll: arr
  })
}
const saveRiskProfileQuestions = (state, action) =>{
  let answers = []
  for(let i=0;i< action.questions.length;i++){
    if(action.questions[i].selected_answer){
      answers.push({question_id: action.questions[i].id, answer: action.questions[i].selected_answer})
    }
  }
  return updateObject(state,{
    riskProfileQuestions: action.questions,
    riskProfileAnswers: answers
  })
}
const saveRiskProfileAnswers = (state, action) => {
  let questions = state.riskProfileQuestions
  for(let i=0;i<action.answers.length;i++){
    if(questions.find(item => item.id === action.answers[0].question_id)){
      questions.find(item => item.id === action.answers[0].question_id).selected_answer = action.answers[i].answer
    }
  }
  return updateObject(state, {
    riskProfileQuestions: questions,
    riskProfileAnswers: action.answers,
  })
}
const getReferralCode = (state, action) => 
  updateObject(state, {
    referralCode: null
  })

const setReferralCode = (state, action) => 
  updateObject(state, {
    referralCode: action.referral_code
  })

const setReferredBy = (state, action) =>
  updateObject(state, {
    referralVerified: action.referred_by ? true : false,
    referredBy: action.referred_by
  })

const setBlogListDesktop = (state, action) => 
  updateObject(state, {
    blogList: action.payload
  })
export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SAVE_ANALYSTS_FOR_SUBSCRIPTION:
      return saveAnalystsForSubscriptions(state, action);
    case actionTypes.SAVE_PERFORMANCE_AND_TRANSACTIONS_DATA:
      return savePerformanceAndTransactionsData(state, action);
    case actionTypes.SAVE_USER_CARDS:
      return saveUserCards(state, action);
    case actionTypes.SET_FILTER_VALUES:
      return updateFilterValue(state, action);
    case actionTypes.GET_ANALYST_SUBSCRIPTION_PLAN:
      return updateObject(state, {
        analystSubscriptionPlanList : null
      })
    case actionTypes.FETCH_PERFORMANCE_AND_TRANSACTIONS_DATA:
      return updateObject(state, {
        analystMessage: null,
        analystsForSubscriptionDetails: null
      })
    case actionTypes.SET_ANALYST_MESSAGE:
      return updateObject(state, {
        analystMessage: action.payload,
        analystsForSubscriptionDetails: null
      })
    case actionTypes.SET_ANALYST_SUBSCRIPTION_PLAN:
      return setAnalystSubscriptionPlan(state, action);
    case actionTypes.SET_PAYMENT_SUBSCRIPTION_LINK:
      return setPaymentSubscriptionLinkReducer(state, action);
    case actionTypes.SET_RECENTLY_CLOSED_TRADES:
      return setRecentlyClosedTrades(state, action);
    case actionTypes.SET_USER_INFO:
      return setUserInfo(state, action);
    case actionTypes.FOLLOW:
      return setFollow(state, action); 
    case actionTypes.UNFOLLOW:
      return setUnFollow(state, action);
    case actionTypes.LIKE:
      return setLike(state, action); 
    case actionTypes.UNLIKE:
      return setUnLike(state, action);
    case actionTypes.SET_FEED:
      return saveFeed(state, action);
    case actionTypes.SET_SUB_FEED:
      return saveSubFeed(state, action);
    case actionTypes.SET_FEED_IMAGES:
      return saveFeedImages(state, action);
    case actionTypes.SET_COMMENTS:
      return saveComments(state, action);
    case actionTypes.POST_COMMENT:
       return postComment(state, action);
    case actionTypes.SET_SUBSCRIPTION:
       return saveSubscriptions(state, action);
    case actionTypes.GET_PREFERENCES_SUCCESS:
      return saveUserPreferences(state, action)
    case actionTypes.SET_PREFERENCES_SUCCESS:
      return saveUserNewPreferences(state, action)
    case actionTypes.GET_RISK_PROFILE_QUESTIONS_SUCCESS:
      return saveRiskProfileQuestions(state, action)
    case actionTypes.SEND_RISK_PROFILE_ANSWERS_SUCCESS:
      return saveRiskProfileAnswers(state, action)
    case actionTypes.GET_REFERRAL_CODE:
      return getReferralCode(state, action)
    case actionTypes.SET_REFERRAL_CODE:
      return setReferralCode(state, action)
    case 'SET_REFERRAL_VERIFICATION':
      return updateObject(state, {
        referralVerified: true,
        referredBy: action.referredBy
      })
    case 'SET_REFERRED_BY':
      return setReferredBy(state, action)
    case 'SET_BLOG_LIST':
      return updateObject(state, {
        blogList: action.blogList
      })
    case actionTypes.SET_BLOG_LIST_DESKTOP:
      return setBlogListDesktop(state, action)
    // case 'GET_BLOG_DETAIL':
    //   return updateObject(state, {
    //     blogDetail: null
    //   })
    case 'SET_BLOG_DETAIL':
      return updateObject(state, {
        blogDetail: action.blogDetail
      })
    case 'GET_BLOG_COMMENTS':
      return updateObject(state, {
        blogComments: null
      })
    case 'SET_BLOG_COMMENTS':
      return updateObject(state, {
        blogComments: action.blogComments
      })
    case 'SET_BLOG_MESSAGE':
      return updateObject(state, {
        blogMessage: action.payload
      })
    case 'RESET_BLOG_MESSAGE':
      return updateObject(state, {
        blogMessage: null
      })
    default:
      return state;
  }
};
