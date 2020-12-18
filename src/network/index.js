import Api from './api_config';

export default {
  // **** GET **** //
  // getAnalystDetails: token => Api.getWithToken('/api/analyst/get-details', token),
  getAnalystDetails: (params, verb) => Api.customRequest('/api/analyst/get-details', verb, params),
  getBankDetails: token => Api.getWithToken('/api/bankaccount/get', token),
  analystFilterList: request =>
    Api.getWithToken(
      `/api/analyst/filter?capital_required_min=${request.searchParams.minCapitalAvailable}&max_draw_down_min=${request.searchParams.minDrawdown}&max_draw_down_max=${request.searchParams.maxDrawdown}&percentage_returns_min=${request.searchParams.minAnnualisedReturn}&percentage_returns_max=${request.searchParams.maxAnnualisedReturn}&capital_required_max=${request.searchParams.maxCapitalAvailable}&segment_name=${request.searchParams.tradingSegment}&trade_type=${request.searchParams.tradingTypes}`,
      request.token
    ),
  fetchInstrumentToken: request =>
    Api.getWithToken(
      `/api/instrument/list?segment=${request.segment}&trading_symbol=${escape(request.trading_symbol)}`,
      request.token
    ),
  fetchRecentlyClosedTrades: request =>
    Api.getWithToken(`/api/trade/recent-closed?analyst_id=${request.analyst_id}`, request.token),

  getWebinarList: request => Api.getWithToken('/api/webinars/list', request),
  getSubscriptionPlanList: token => Api.getWithToken('/api/subscription-plan/list', token),
  getFilterSubscriptionPlanList: request =>
    Api.getWithToken(
      `/api/subscription-plan/list?analyst_id=${request.analyst_id}&segment=${request.segment}&trade_type=${request.trade_type}`,
      request.token
    ),
  getTradeList: token => Api.getWithToken('/api/trade/list?l=1000&o=0', token),
  getAnalystPerformance: request =>
    Api.getWithToken(`/api/analyst/performance_details?analyst_id=${request.analyst_id}`, request.token),
  getProfilePicture: token => Api.getWithToken(`/api/document/get?type=profile_pic`, token),
  getTradeCounts: token => Api.getWithToken('/api/trade/counts', token),

  // getFeed : (params) => Api.getWithParamToken('/api/trade/recent-closed?feed-page=True', params),

  getFeed: token => Api.getWithToken('/api/investor/feed', token),
  getSubFeed: token => Api.getWithToken('/api/trade/list?l=1000&o=0', token),
  // getFeedImages: token => Api.getWithToken('/api/feed/images', token),

  //${params.type}/like
  getComments: request => Api.getWithToken(request.url, request.accesstoken),

  getSubscriptions: token => Api.getWithToken('/api/subscription/my-subscriptions', token),

  // **** POST **** //

  userAuth: params => Api.post('/tokens/', params),
  signup: params => Api.post('/users/', params),
  signin: params => Api.post('/tokens/', params),
  forgotPassword: params => Api.post('/password-reset/', params),
  createBankAccount: (params, token) => Api.postBankAccount('/api/bankaccount/create', params, token),
  updateTrade: (params, token) => Api.postBankAccount('/api/trade/revise', params, token),
  paymentSubscriptionLink: (params, token) => Api.postBankAccount('/api/subscription/get-link', params, token),

  follow: (params, token) => Api.postWithToken('/api/analyst/follow', params, token),

  like: (params, token) => Api.postWithToken(`/api/feed/${params.type}/like`, params, token),

  postComment: (params, token) => Api.postWithToken(params.url, params, token),
  // Api.postWithToken(`/api/feed/${params.type}/comments`, params, token),

  // **** PUT **** //

  // **** PATCH **** //
  updateUserName: params => Api.patch('/users', params),
  verifyOtp: params => Api.patch('/tokens/verification/', params),
  resendOtp: params => Api.patch('/tokens/', params),

  deviceToken: (params, token) => Api.patchWithToken('/api/device-token', params, token),

  resetPassword: params => Api.patch('/password-reset/', params),
  changePassword: params => Api.patch('/tokens/password/', params),
  // **** DELETE **** //

  logout: params => Api.delete('/tokens/', params),
  deleteSubscriptionPlan: payload => Api.deleteWithToken('/api/subscription-plan', payload),
  cancelTradeList: payload => Api.postBankAccount('/api/trade/cancel', payload.record_id, payload.accesstoken),

  unfollow: (params, token) => Api.deleteWithToken('/api/analyst/follow', params, token),

  unlike: (params, token) => Api.deleteWithToken(`/api/feed/${params.type}/like`, params, token),

  // **** CREATE SUBSCRIPTION PLAN **** //
  createSubscriptionPlan: (params, verb) => Api.customRequest('/api/subscription-plan/create', verb, params),
  // **** PLACE TRADE **** //
  placeTrade: (params, verb) => Api.customFormDataRequest('/api/trade/place', verb, params),
  getAvailableTradeBalance: token => Api.getWithToken('/api/me/balance', token),
  // **** UPLOAD DOCUMENT **** //
  uploadDocument: (params, verb) => Api.customFormDataRequest('/api/document/upload', verb, params),
  // **** UDPATE ANALYST BASIC DETAILS **** //
  updateAnalystBasicDetails: (params, verb) => Api.customRequest('/api/analyst/update-details', verb, params),
  // createBankAccount: params => Api.post('/api/bankaccount/create/', params)
  // **** CREATE ANALYST PORTFOLIO **** //
  createAnalystPortfolio: (params, verb) => Api.customRequest('/api/analyst/portfolio', verb, params),
  getAnalystPortfolio: token => Api.getWithToken('/api/analyst/portfolio', token),

  getPreferences: token => Api.getWithToken('/api/investor/preference', token),
  setPreferences: (payload) => Api.postWithBodyToken('/api/investor/preference', payload.params, payload.token),
  getRiskProfileQuestions: (token) => Api.getWithToken('/api/investor/risk-profiling', token),
  sendRiskProfileAnswers: (url,payload, token) => Api.postWithBodyToken(url, payload, token),
  getAnalystFollowers: (token) => Api.getWithToken('/api/analyst/followers', token),
  getAnalystSubscribers: (token) => Api.getWithToken('/api/analyst/subscribers', token),


  // ***** Allow Trade Entry ******** //
  allowTradeEntry: payload => Api.postWithBodyToken('/api/trade/allow-entry', payload.params, payload.token),

  // ***** Analyst Leaderboard *********//
  getAnalystLeaderboardApi: payload => Api.getWithToken('/api/analyst/leaderboard', payload.token),
  getReferralCode: (token) => Api.getWithToken('/api/referral_code', token),
  checkReferralCode: (payload, token) => Api.postWithBodyToken('/api/user-referred-by', payload, token),
  getReferredBy: (token) => Api.getWithToken('/api/user-referred-by', token),
  getBlogListDesktop: (token) => Api.getWithToken('/api/blog/desktop', token),
  getBlogList: (token) => Api.getWithToken('/api/blog', token),
  getBlogDetail: (token, id) => Api.getWithToken(`/api/blog/${id}`, token),
  getBlogComments: (token, id) => Api.getWithToken(`/api/blog/comments/${id}`, token),
  sendBlogComment: (payload, id, token) => Api.postWithBodyToken(`/api/blog/comments/${id}`, payload, token),
  toggleBlogLike: (payload, token) => Api.getWithToken(`/api/blog/${payload.id}/${payload.like ? 'like' : 'unlike'}`, token)
};
