import React from 'react';
import './App.scss';
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { AnimatedSwitch } from 'react-router-transition';
// import { TransitionGroup, Transition, CSSTransition } from 'react-transition-group';

import { ConnectedRouter } from 'connected-react-router';
import asyncComponent from './hoc/asyncComponent/asyncComponent';
import Layout from './hoc/Layout/Layout';
import { BrowserView, MobileOnlyView, TabletView, isBrowser, isMobile, isMobileOnly } from 'react-device-detect';
import Navbar from './containers/ExpertBrowser/Navbar';
import Footer from './containers/BrowserFooter/Footer';

const asyncNavbar = asyncComponent(() => import('./containers/ExpertBrowser/Navbar'));
const asyncFooter = asyncComponent(() => import('./containers/BrowserFooter/Footer'));

const asyncSplash = asyncComponent(() => import('./containers/Splash/Splash'));

const asyncErrorView = asyncComponent(() => import('./containers/common/ErrorView'));

const asyncUserAnalyst = asyncComponent(() => import('./containers/UserAnalyst/UserAnalyst'));
const asyncWelcome = asyncComponent(() => import('./containers/ExpertWelcome'));

const asyncSignIn = asyncComponent(() => import('./containers/SignIn/SignIn'));

const asyncSignUp = asyncComponent(() => import('./containers/SignUp/SignUp'));

const asyncForgotPassword = asyncComponent(() => import('./containers/ForgotPassword/ForgotPassword'));

const asyncResetPassword = asyncComponent(() => import('./containers/ResetPassword/ResetPassword'));

const asyncVerifyOtp = asyncComponent(() => import('./containers/VerifyOtp/VerifyOtp'));

const asyncBoardUserOne = asyncComponent(() => import('./containers/BoardUserOne/BoardUserOne'));

const asyncBoardAnalystOne = asyncComponent(() => import('./containers/BoardAnalystOne/BoardAnalystOne'));

const asyncGetStarted = asyncComponent(() => import('./containers/GetStarted/GetStarted'));

const asyncPaymentSuccess = asyncComponent(() => import('./containers/UserPayment/PaymentSuccess'));
const asyncPaymentFailure = asyncComponent(() => import('./containers/UserPayment/PaymentFailure'));

const asyncResetPasswordSuccess = asyncComponent(() =>
  import('./containers/ResetPasswordSuccess/ResetPasswordSuccess')
);
const asyncPaymentFaqs = asyncComponent(() => import('./containers/PaymentFaqs/PaymentFaqs'));

const asyncAnalystHome = asyncComponent(() => import('./containers/AnalystHome/AnalystHome'));
// const ExpertBrowser = asyncComponent(() => import('./containers/ExpertBrowser/Navbar'));
// const AnalystProfileBrowser = asyncComponent(() => import('./containers/AnalystProfileBrowser'));

const asyncUserHome = asyncComponent(() => import('./containers/UserHome'));

const asyncNotifications = asyncComponent(() => import('./containers/Notifications/index'));

const asyncBasicDetail = asyncComponent(() => import('./containers/AnalystBasicDetail/BasicDetail'));
const asyncUserBasicDetail = asyncComponent(() => import('./containers/UserBasicDetails'));
const asyncAnalystLeaderboard = asyncComponent(() => import('./containers/AnalystLeaderboard'));

const asyncBrowserDashboard = asyncComponent(() => import('./containers/BrowserDashboard/BrowserDashboard'));
const asyncBrowserTrade = asyncComponent(() => import('./containers/BrowserTrade'));
const asyncBrowserProfile = asyncComponent(() => import('./containers/AnalystProfileBrowser/AnalystProfileBrowser'));
const asyncAccountDetail = asyncComponent(() => import('./containers/AnalystAccountDetails/AccountDetails'));
const asyncChat = asyncComponent(() => import('./containers/Chat'));

const asyncCreateSubscription = asyncComponent(() =>
  import('./containers/AnalystCreateSubscriptionPlan/CreateSubscriptionPlan')
);

const asyncNewTrade = asyncComponent(() => import('./containers/Trades/Trades'));

const asyncTradeAllocation = asyncComponent(() => import('./containers/AnalystTradeAllocation/index'));

const asyncCardDetail = asyncComponent(() => import('./containers/CardDetail/CardDetail'));

const asyncAnalystHomeSection = asyncComponent(() => import('./containers/AnalystHomeSection'));

const asyncPrivacyPolicy = asyncComponent(() => import('./containers/PrivacyPolicy/PrivacyPolicy'));
const asyncPrivacyPolicyBrowser = asyncComponent(() => import('./containers/PrivacyPolicyBrowser/PrivacyPolicy'));

const asyncTermsOfUse = asyncComponent(() => import('./containers/TermsOfUse/TermsOfUse'));
const asyncTermsOfUseBrowser = asyncComponent(() => import('./containers/TermsOfUseBrowser/TermsOfUse'));

const asyncExpertFaqs = asyncComponent(() => import('./containers/FAQs/ExpertFaqs'));
const asyncExpertFaqsBrowser = asyncComponent(() => import('./containers/FAQsBrowser/ExpertFaqs'));

const asyncInvestorFaqs = asyncComponent(() => import('./containers/FAQs/InvestorFaqs'));

const asyncUserManual = asyncComponent(() => import('./containers/UserManual/UserManual'));

const asyncAnalystVirtualTradeList = asyncComponent(() => import('./containers/AnalystVirtualTradeList'));

const asyncWebinars = asyncComponent(() => import('./containers/Webinars'));

const asyncUserBrowseAnalysts = asyncComponent(() => import('./containers/UserBrowseAnalysts'));

const asyncUserViewAnalystProfile = asyncComponent(() => import('./containers/UserViewAnalystProfile'));

const asyncUserCardDetails = asyncComponent(() => import('./containers/UserCardDetails'));

const asyncUserPayment = asyncComponent(() => import('./containers/UserPayment'));
const asyncUserSubscriptions = asyncComponent(() => import('./containers/UserSubscriptionPage'));

const asyncUserAuthenticationBrowser = asyncComponent(() =>
  import('./containers/UserAuthenticationBrowser/UserAuthenticationBrowser')
);
const asyncUserAuthentication = asyncComponent(() => import('./containers/UserAuthentication/UserAuthentication'));

const asyncUserTerms = asyncComponent(() => import('./containers/Terms/Terms'));

const asyncUserName = asyncComponent(() => import('./containers/UserName/UserName'));
const asyncUserPreferences = asyncComponent(() => import('./containers/UserPreferences/UserPreferencesList'));
const asyncAnalystFollowersSubscribersList = asyncComponent(() =>
  import('./containers/AnalystFollowersSubscribersList')
);

const asyncRefTC = asyncComponent(() => import('./containers/ReferralTerms&Use'));

const asyncReferAFriend = asyncComponent(() => import('./containers/ReferAFriend'));

const asyncReferralCode = asyncComponent(() => import('./containers/ReferralCode'));

const asyncBlog = asyncComponent(() => import('./containers/Blog/Index'));
const asyncBlogDetail = asyncComponent(() => import('./containers/Blog/BlogDetail'));

const asyncBlogListDesktop = asyncComponent(() => import('./containers/BlogDesktop/BlogList'));
const asyncBlogDetailDestop = asyncComponent(() => import('./containers/BlogDesktop/BlogDetail'));

class App extends React.Component {
  render() {
    console.log(this.props.history);
    this.props.history.index = 1;
    const { userGroup, signinData } = this.props;

    // if (this.props.history.location === '' || this.props.history.location === '/') {
    //   this.props.history.push('/splash');
    // }

    console.log('###############################', userGroup, signinData);

    return (
      <>
        <BrowserView>
          <ConnectedRouter history={this.props.history}>
            {signinData ? <Navbar /> : null}
            <Switch>
              {!signinData && <Route exact path='/splash' component={asyncSplash} />}
              {!signinData && <Route exact path='/' component={asyncSplash} />}
              {!signinData && <Route exact path='/error' component={asyncErrorView} />}
              {!signinData && <Route exact path='/welcome' component={asyncWelcome} />}

              <Route exact path='/terms' component={asyncUserTerms} />
              <Route exact path='/privacy-policy' component={asyncPrivacyPolicy} />
              <Route exact path='/terms-of-use' component={asyncTermsOfUse} />
              <Route exact path='/user-manual' component={asyncUserManual} />
              <Route exact path='/blogs' component={asyncBlogListDesktop} />
              <Route exact path='/blog/:id' component={asyncBlogDetailDestop} />

              {signinData && userGroup === 'ANALYST' && (
                <Route exact path='/dashboard' component={asyncBrowserDashboard} />
              )}
              {signinData && userGroup === 'ANALYST' && <Route exact path='/trades' component={asyncBrowserTrade} />}
              {signinData && userGroup === 'ANALYST' && <Route exact path='/profile' component={asyncBrowserProfile} />}
              {userGroup && signinData && <Route exact path='/notifications' component={asyncNotifications} />}
              {userGroup === 'ANALYST' && signinData && <Route exact path='/expert-faqs' component={asyncExpertFaqs} />}
              {signinData ? (
                userGroup === 'ANALYST' ? (
                  <Redirect to='/dashboard' />
                ) : (
                  <Redirect to='/user/user-home' />
                )
              ) : (
                <Redirect to='/splash' />
              )}
            </Switch>
            {signinData ? <Footer /> : null}
          </ConnectedRouter>
        </BrowserView>

        <TabletView>
          <ConnectedRouter history={this.props.history}>
            <Route path='*' component={asyncErrorView} />
          </ConnectedRouter>
        </TabletView>

        <MobileOnlyView>
          <ConnectedRouter history={this.props.history}>
            {/* <Layout>
              <AnimatedSwitch atEnter={{ opacity: 0 }} atLeave={{ opacity: 0 }} atActive={{ opacity: 1 }}> */}
            <Switch>
              <Route exact path='/analyst-public-profile-view' component={asyncUserViewAnalystProfile} />
              {signinData && userGroup === 'ANALYST' && (
                <Route exact path='/followers' component={asyncAnalystFollowersSubscribersList} />
              )}
              {signinData && userGroup === 'ANALYST' && (
                <Route exact path='/subscribers' component={asyncAnalystFollowersSubscribersList} />
              )}
              {signinData && <Route exact path='/user-name' component={asyncUserName} />}
              {signinData && userGroup === 'USER' && (
                <Route exact path='/user-preferences' component={asyncUserPreferences} />
              )}
              {!signinData && <Route exact path='/splash' component={asyncSplash} />}
              <Route exact path='/terms' component={asyncUserTerms} />
              {!signinData && <Route exact path='/' component={asyncSplash} />}
              {!signinData && <Route exact path='/error' component={asyncErrorView} />}
              {userGroup && signinData && <Route exact path='/notifications' component={asyncNotifications} />}
              {!signinData && <Route exact path='/user-analyst' component={asyncUserAnalyst} />}
              {userGroup && !signinData && <Route exact path='/userauth' component={asyncUserAuthentication} />}
              {userGroup && !signinData && <Route exact path='/signin' component={asyncSignIn} />}
              {userGroup && !signinData && <Route exact path='/signup' component={asyncSignUp} />}
              {userGroup && <Route exact path='/forgot-password' component={asyncForgotPassword} />}
              {userGroup && <Route exact path='/reset-password' component={asyncResetPassword} />}
              {userGroup && !signinData && <Route exact path='/verify-otp' component={asyncVerifyOtp} />}
              {userGroup === 'USER' && !signinData && (
                <Route exact path='/board-user-one' component={asyncBoardUserOne} />
              )}
              {userGroup === 'ANALYST' && !signinData && (
                <Route exact path='/board-analyst-one' component={asyncBoardAnalystOne} />
              )}
              {userGroup && <Route exact path='/get-started' component={asyncGetStarted} />}
              {userGroup && <Route exact path='/reset-password-success' component={asyncResetPasswordSuccess} />}
              {userGroup === 'ANALYST' && <Route exact path='/analyst-home' component={asyncAnalystHome} />}
              {userGroup === 'ANALYST' && (
                <Route exact path='/analyst-section-home' component={asyncAnalystHomeSection} />
              )}
              {userGroup === 'ANALYST' && <Route exact path='/basic-detail' component={asyncBasicDetail} />}
              {userGroup === 'ANALYST' && signinData && (
                <Route exact path='/account/FAQs' component={asyncPaymentFaqs} />
              )}
              {userGroup === 'ANALYST' && signinData && (
                <Route exact path='/account-detail' component={asyncAccountDetail} />
              )}
              {userGroup === 'ANALYST' && signinData && (
                <Route exact path='/analyst-leaderboard' component={asyncAnalystLeaderboard} />
              )}
              {userGroup === 'ANALYST' && signinData && <Route exact path='/new-trade' component={asyncNewTrade} />}
              {userGroup === 'ANALYST' && signinData && (
                <Route exact path='/create-subscription-plan' component={asyncCreateSubscription} />
              )}
              {userGroup === 'ANALYST' && signinData && (
                <Route exact path='/virtual-trade-list' component={asyncAnalystVirtualTradeList} />
              )}
              {userGroup === 'ANALYST' && signinData && (
                <Route exact path='/allocate-my-trade' component={asyncTradeAllocation} />
              )}
              {userGroup === 'USER' && signinData && <Route exact path='/card-detail' component={asyncCardDetail} />}
              <Route exact path='/privacy-policy' component={asyncPrivacyPolicy} />
              <Route exact path='/terms-of-use' component={asyncTermsOfUse} />
              {userGroup === 'ANALYST' && signinData && <Route exact path='/expert-faqs' component={asyncExpertFaqs} />}
              {userGroup === 'USER' && signinData && (
                <Route exact path='/investor-faqs' component={asyncInvestorFaqs} />
              )}
              <Route exact path='/user-manual' component={asyncUserManual} />
              {userGroup === 'USER' && signinData && <Route exact path='/webinars' component={asyncWebinars} />}
              {userGroup === 'USER' && signinData && (
                <Route exact path='/subscription/payment-success' component={asyncPaymentSuccess} />
              )}
              {userGroup === 'USER' && signinData && (
                <Route exact path='/subscription/payment-failure' component={asyncPaymentFailure} />
              )}
              {/* ------------------------------------- User Routes ------------------------------------- */}
              {userGroup === 'USER' && <Route exact path='/user/user-home' component={asyncUserHome} />}
              {userGroup === 'USER' && <Route exact path='/user/browse-analysts' component={asyncUserBrowseAnalysts} />}
              {userGroup === 'USER' && <Route exact path='/basic-detail' component={asyncUserBasicDetail} />}
              {signinData && <Route exact path='/chat/:id' component={asyncChat} />}
              {signinData && <Route exact path='/user/view-analyst-profile' component={asyncUserViewAnalystProfile} />}
              {signinData && <Route exact path='/analyst-public-profile' component={asyncUserViewAnalystProfile} />}
              {userGroup === 'USER' && <Route exact path='/user/card-details' component={asyncUserCardDetails} />}
              {signinData && userGroup === 'USER' && (
                <Route exact path='/subscriptions' component={asyncUserSubscriptions} />
              )}
              {userGroup === 'USER' && signinData && <Route exact path='/user/payment' component={asyncUserPayment} />}
              {!signinData && <Route exact path='/referral-code' component={asyncReferralCode} />}
              {signinData && <Route exact path='/refer-friend' component={asyncReferAFriend} />}
              {signinData && <Route exact path='/ref-T-C' component={asyncRefTC} />}
              <Route exact path='/blogs' component={asyncBlog} />
              <Route exact path='/blog/:id' component={asyncBlogDetail} />
              {signinData ? (
                userGroup === 'ANALYST' ? (
                  <Redirect to='/analyst-home' />
                ) : (
                  <Redirect to='/user/user-home' />
                )
              ) : (
                <Redirect to='/splash' />
              )}
              {/* <Route exact path='*' component={asyncErrorView} /> */}
            </Switch>
            {/* </AnimatedSwitch>
            </Layout> */}
          </ConnectedRouter>
        </MobileOnlyView>
      </>
    );
  }
}

const mapStateToProps = state => ({
  userGroup: state.auth.userGroup,
  signinData: state.auth.signinData
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(App);
