import React from 'react';

import './Faqs.scss';
import Header from '../components/Header/customHeader';
import BottomNavigator from '../components/BottomNavigator';
import Grow from '@material-ui/core/Grow';

const ExpertFaqs = props => {
  return (
    <Grow in={true} timeout={700}>
        <div
          className='accordion'
          id='accordionExample'
          style={{ padding: '1rem 5rem', marginBottom: '40px' }}
          className='text-justify'
        >
          <div className='card'>
            <div className='card-header questionArea' id='headingOne'>
              <h2 className='mb-0'>
                <button
                  className='btn btn-link collapsed questionButton'
                  type='button'
                  data-toggle='collapse'
                  data-target='#collapseOne'
                  aria-expanded='true'
                  aria-controls='collapseOne'
                  style={{
                    width:'100%'
                  }}
                >
                  How do I get started?
                </button>
              </h2>
            </div>
            <div
              id='collapseOne'
              className='collapse show'
              aria-labelledby='headingOne'
              data-parent='#accordionExample'
            >
              <div className='card-body answer'>
                <p>You can get started as an advisor in four simple steps</p>
                <ol>
                  <li className='mb-1'>
                    Fill in your necessary personal details and complete verification process online. In some cases, we
                    may need additional details and would reach out to you over the phone number you have used to sign
                    up on the app.
                  </li>
                  <li className='mb-1'>
                    Decide on a target customer segment that best suits your strategy. Pick and allocate the portfolio
                    capital across multiple trading segments (technical and fundamental) you think would be appropriate
                    for your trading/investment strategy.
                  </li>
                  <li className='mb-1'>
                    Create relevant subscription plans for investors to see you trading activity on Pvot-X in real time.
                  </li>
                  <li className='mb-1'>Start building your performance history by taking trades on the Pvot-X.</li>
                </ol>
              </div>
            </div>
          </div>

          <div className='card'>
            <div className='card-header questionArea' id='headingTwo'>
              <h2 className='mb-0'>
                <button
                  className='btn btn-link collapsed questionButton'
                  type='button'
                  data-toggle='collapse'
                  data-target='#collapseTwo'
                  aria-expanded='false'
                  aria-controls='collapseTwo'
                  style={{
                    width:'100%'
                  }}
                >
                  How are trades to be made on Pvot-X?
                </button>
              </h2>
            </div>
            <div id='collapseTwo' className='collapse' aria-labelledby='headingTwo' data-parent='#accordionExample'>
              <div className='card-body answer'>
                Pvot-X is designed to behave like any brokerage application which an investor uses to trade. So, you can
                take trades just like you would take on any trading application.
              </div>
            </div>
          </div>

          <div className='card'>
            <div className='card-header questionArea' id='headingThree'>
              <h2 className='mb-0'>
                <button
                  className='btn btn-link collapsed questionButton'
                  type='button'
                  data-toggle='collapse'
                  data-target='#collapseThree'
                  aria-expanded='false'
                  aria-controls='collapseThree'
                  style={{
                    width:'100%'
                  }}
                >
                  What are the conditions for making trades?
                </button>
              </h2>
            </div>
            <div id='collapseThree' className='collapse' aria-labelledby='headingThree' data-parent='#accordionExample'>
              <div className='card-body answer'>
                <ul>
                  <li className='mb-1'>
                    Just like the conditions on any trading application. Pvot-X supports most trading scenarios and
                    applies trading margins for Intraday and Positional trades just like you'd experience on any leading
                    trading platform.
                  </li>
                  <li className='mb-1'>
                    We do not allow cross margining across Cash & Derivative segments because many brokers don't allow
                    the investors do so.
                  </li>
                  <li className='mb-1'>
                    We are conservative in our approach when it comes to capital protection and thus do not allow margin
                    calculations for hedge positions. The hedged trades would be considered as individual trades and
                    appropriate margins would be levied.
                  </li>
                  <li className='mb-1'>
                    We review the margin requirements of the underlying from time to time to keep the same most relevant
                    to the current market conditions.
                  </li>
                  <li className='mb-1'>
                    At this point of time, we are not considering liquidity of the underlying traded while calculating
                    the performance. We shall introduce this feature soon.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className='card'>
            <div className='card-header questionArea' id='headingThree'>
              <h2 className='mb-0'>
                <button
                  className='btn btn-link collapsed questionButton'
                  type='button'
                  data-toggle='collapse'
                  data-target='#collapsefour'
                  aria-expanded='false'
                  aria-controls='collapsefour'
                  style={{
                    width:'100%'
                  }}
                >
                  What are the best practices for trading on Pvot?
                </button>
              </h2>
            </div>
            <div id='collapsefour' className='collapse' aria-labelledby='headingThree' data-parent='#accordionExample'>
              <div className='card-body answer'>
                <ul>
                  <li className='mb-1'>
                    Pvot is built to benefit investors and reward smart Experts. We strongly urge Experts who sign up to
                    keep in mind the investors interest while maintaining the highest quality standard.
                  </li>
                  <li className='mb-1'>
                    We reserve the right to cancel/delete/remove any trade that may misrepresent or provide
                    inappropriate advantage. For e.g. if you place a trade in illiquid deep OTM call option, we may
                    choose to remove that data to share a fair insight to the investor.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className='card'>
            <div className='card-header questionArea' id='headingThree'>
              <h2 className='mb-0'>
                <button
                  className='btn btn-link collapsed questionButton'
                  type='button'
                  data-toggle='collapse'
                  data-target='#collapsefive'
                  aria-expanded='false'
                  aria-controls='collapsefive'
                  style={{
                    width:'100%'
                  }}
                >
                  How do I keep track of my trading performance?
                </button>
              </h2>
            </div>
            <div id='collapsefive' className='collapse' aria-labelledby='headingThree' data-parent='#accordionExample'>
              <div className='card-body answer'>
                Your trading performance is being recorded and is being converted into actionable insights for the
                investors. You can visit your "Public Profile" under the Dashboard section to see the last 30 trading
                performance and an overall portfolio performance.
              </div>
            </div>
          </div>

          <div className='card'>
            <div className='card-header questionArea' id='headingThree'>
              <h2 className='mb-0'>
                <button
                  className='btn btn-link collapsed questionButton'
                  type='button'
                  data-toggle='collapse'
                  data-target='#collapsesix'
                  aria-expanded='false'
                  aria-controls='collapsesix'
                  style={{
                    width:'100%'
                  }}
                >
                  What are the pricing regulations?
                </button>
              </h2>
            </div>
            <div id='collapsesix' className='collapse' aria-labelledby='headingThree' data-parent='#accordionExample'>
              <div className='card-body answer'>
                There are no pricing regulations. You have complete control on pricing your subscription plans.
              </div>
            </div>
          </div>

          <div className='card'>
            <div className='card-header questionArea' id='headingThree'>
              <h2 className='mb-0'>
                <button
                  className='btn btn-link collapsed questionButton'
                  type='button'
                  data-toggle='collapse'
                  data-target='#collapseseven'
                  aria-expanded='false'
                  aria-controls='collapseseven'
                  style={{
                    width:'100%'
                  }}
                >
                  How many subscription plans can I create?
                </button>
              </h2>
            </div>
            <div id='collapseseven' className='collapse' aria-labelledby='headingThree' data-parent='#accordionExample'>
              <div className='card-body answer'>
                <ul>
                  <li className='mb-1'>
                    You can create up to 8 subscription plans for showing your real time activity to the investors.
                  </li>
                  <li className='mb-1'>
                    If you delete a subscription plan for that has an subscriber, your trading activity would continue
                    to stay visible until the validity of the subscription. No new subscription would be added on a
                    deleted subscription.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className='card'>
            <div className='card-header questionArea' id='headingThree'>
              <h2 className='mb-0'>
                <button
                  className='btn btn-link collapsed questionButton'
                  type='button'
                  data-toggle='collapse'
                  data-target='#twentyone'
                  aria-expanded='false'
                  aria-controls='twentyone'
                  style={{
                    width:'100%'
                  }}
                >
                  Till what time is the Portfolio Capital allocated for?
                </button>
              </h2>
            </div>
            <div id='twentyone' className='collapse' aria-labelledby='headingThree' data-parent='#accordionExample'>
              <div className='card-body answer'>
                The portfolio capital allocated on Pvot has no expiry. The portfolio capital will grow/shrink based on
                the success of your trading activity. If you happen to make several loss making trades and the portfolio
                capital turns to zero, your account will be defunct. You may not be able to perform any trading activity
                on the platform.
              </div>
            </div>
          </div>

          <div className='card'>
            <div className='card-header questionArea' id='headingThree'>
              <h2 className='mb-0'>
                <button
                  className='btn btn-link collapsed questionButton'
                  type='button'
                  data-toggle='collapse'
                  data-target='#collapseeight'
                  aria-expanded='false'
                  aria-controls='collapseeight'
                  style={{
                    width:'100%'
                  }}
                >
                  How many investors can subscribe to my service?
                </button>
              </h2>
            </div>
            <div id='collapseeight' className='collapse' aria-labelledby='headingThree' data-parent='#accordionExample'>
              <div className='card-body answer'>There is no limit.</div>
            </div>
          </div>

          <div className='card'>
            <div className='card-header questionArea' id='headingThree'>
              <h2 className='mb-0'>
                <button
                  className='btn btn-link collapsed questionButton'
                  type='button'
                  data-toggle='collapse'
                  data-target='#collapsenine'
                  aria-expanded='false'
                  aria-controls='collapsenine'
                  style={{
                    width:'100%'
                  }}
                >
                  What are the expectations of investors using Pvot?
                </button>
              </h2>
            </div>
            <div id='collapsenine' className='collapse' aria-labelledby='headingThree' data-parent='#accordionExample'>
              <div className='card-body answer'>
                Investors expectation is to find Stock Experts who they can subscribe to in order to create wealth in
                the stock markets in the most cost effective manner.
              </div>
            </div>
          </div>

          <div className='card'>
            <div className='card-header questionArea' id='headingThree'>
              <h2 className='mb-0'>
                <button
                  className='btn btn-link collapsed questionButton'
                  type='button'
                  data-toggle='collapse'
                  data-target='#collapseten'
                  aria-expanded='false'
                  aria-controls='collapseten'
                  style={{
                    width:'100%'
                  }}
                >
                  How much can I earn on Pvot?
                </button>
              </h2>
            </div>
            <div id='collapseten' className='collapse' aria-labelledby='headingThree' data-parent='#accordionExample'>
              <div className='card-body answer'>
                There is no upper limit to your potential earnings. Your earning would be a function of your consistent
                success and appropriate pricing of the subscription plan.
              </div>
            </div>
          </div>

          <div className='card'>
            <div className='card-header questionArea' id='headingThree'>
              <h2 className='mb-0'>
                <button
                  className='btn btn-link collapsed questionButton'
                  type='button'
                  data-toggle='collapse'
                  data-target='#collapseeleven'
                  aria-expanded='false'
                  aria-controls='collapseeleven'
                  style={{
                    width:'100%'
                  }}
                >
                  How are the payments to Experts handled by pvot?
                </button>
              </h2>
            </div>
            <div
              id='collapseeleven'
              className='collapse'
              aria-labelledby='headingThree'
              data-parent='#accordionExample'
            >
              <div className='card-body answer'>
                Experts would be paid every Tuesday of the week for the earnings accumulated in the previous week. In
                case of a National/Bank holiday, the payments would be done on the next business day.
              </div>
            </div>
          </div>

          <div className='card'>
            <div className='card-header questionArea' id='headingThree'>
              <h2 className='mb-0'>
                <button
                  className='btn btn-link collapsed questionButton'
                  type='button'
                  data-toggle='collapse'
                  data-target='#twelve'
                  aria-expanded='false'
                  aria-controls='twelve'
                  style={{
                    width:'100%'
                  }}
                >
                  Do you store the credit/debit card information?
                </button>
              </h2>
            </div>
            <div id='twelve' className='collapse' aria-labelledby='headingThree' data-parent='#accordionExample'>
              <div className='card-body answer'>No, we don't.</div>
            </div>
          </div>
        </div>
        {/* <BottomNavigator /> */}
    </Grow>
  );
};

export default ExpertFaqs;
