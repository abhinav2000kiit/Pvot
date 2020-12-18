import React from 'react';
import Grow from '@material-ui/core/Grow';

import './Faqs.scss';
import Header from '../components/Header/customHeader';
import BottomNavigator from '../components/BottomNavigator';

const InvestorFaqs = props => {
  return (
    <Grow in={true} timeout={700}>
      <div style={{ height: '100vh', overflow: 'auto' }}>
        <Header title={'FAQ'} backButton backTo={() => props.history.push('/')} />
        <div
          className='accordion'
          id='accordionExample'
          style={{ padding: '20px', marginBottom: '40px' }}
          className='text-justify'
        >
          <div className='row my-3 faqSectionTitle'>
            <h6>About Pvot</h6>
          </div>

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
                  How does Pvot make money?
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
                Pvot is free to use for retail investors. We let experts (individuals and firms) actively manage their
                mock portfolio or mock trades. This helps them build credibility on the platform - as the experts manage
                the portfolios or trades in real time with real market prices. These experts charge fees to disclose
                their live mock portfolio to retail investors. We charge the experts a technology fees for using our
                platform. This fee is typically charged per active subscription basis.
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
                  Who is Pvot for?
                </button>
              </h2>
            </div>
            <div id='collapseTwo' className='collapse' aria-labelledby='headingTwo' data-parent='#accordionExample'>
              <div className='card-body answer'>
                <ul>
                  <li className='mb-1'>There are two kinds of people - traders and investors! Pvot is for both.</li>
                  <li className='mb-1'>
                    Pvot is an analytics driven advisory marketplace that connects retail traders and investors to stock
                    experts for technical and fundamental analysis best suited for their needs.
                  </li>
                  <li className='mb-1'>
                    Pvot aims to become the ideal platform for retail traders, retail investors and stock experts
                    specializing in technical and fundamental analysis.
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
                  data-target='#collapseThree'
                  aria-expanded='false'
                  aria-controls='collapseThree'
                  style={{
                    width:'100%'
                  }}
                >
                  How does Pvot work?
                </button>
              </h2>
            </div>
            <div id='collapseThree' className='collapse' aria-labelledby='headingThree' data-parent='#accordionExample'>
              <div className='card-body answer'>
                Pvot onboards stock experts who manage their mock portfolio/trades through Pvot's proprietary platform.
                We track each expert's every single trade across multiple factors and bring the insights to you so that
                you can pick the one that fits you the best. You can follow experts for free and track their recently
                closed investments/trades. Once you subscribe to the expert you feel comfortable with, you will be able
                to see their portfolio/trades in real time.
              </div>
            </div>
          </div>

          <div className='row my-3 faqSectionTitle'>
            <h6>General Questions</h6>
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
                  How can Pvot help me?
                </button>
              </h2>
            </div>
            <div id='collapsefour' className='collapse' aria-labelledby='headingThree' data-parent='#accordionExample'>
              <div className='card-body answer'>
                Pvot helps retail investors and traders by aiding them in creating wealth in stocks by Pvot is an
                advisory marketplace for connecting retail investors and traders with their best suited stock expert. To
                start with, you can follow these experts for free and track their recently closed investments/trades.
                Once you subscribe to the expert you feel most comfortable with, you will be able to see their
                portfolio/trades in real time. You can replicate the same trades in your brokerage account and earn
                returns. This way, you'll have access to profitable trading strategies of expert professionals.
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
                  How do I get started on Pvot?
                </button>
              </h2>
            </div>
            <div id='collapsefive' className='collapse' aria-labelledby='headingThree' data-parent='#accordionExample'>
              <div className='card-body answer'>
                <p>You can get started on Pvot in three simple steps:</p>
                <ol>
                  <li className='mb-1'>Complete an easy sign up with minimal details</li>
                  <li className='mb-1'>Select few areas of interest that you want to follow</li>
                  <li className='mb-1'>
                    Browse Experts, compare performance and Subscribe the best to see their real time activity!
                  </li>
                </ol>
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
                  Do I need a demat account to use Pvot?
                </button>
              </h2>
            </div>
            <div id='collapsesix' className='collapse' aria-labelledby='headingThree' data-parent='#accordionExample'>
              <div className='card-body answer'>
                No. There is no trading facility on Pvot so the only demat account you need to trade/invest with should
                be on a different platform. Pvot is a platform to get to know who are top performing experts so that you
                don't end up paying money to someone who may not be suited to your needs or may not be an expert in
                their field.
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
                  Do I need previous stock market experience to use Pvot?
                </button>
              </h2>
            </div>
            <div id='collapseseven' className='collapse' aria-labelledby='headingThree' data-parent='#accordionExample'>
              <div className='card-body answer'>
                You can be complete stock market novice and still be able to use Pvot profitably. You can track
                performance of any experts(s) that you like and spend time understanding their skill level for as long
                as you want before subscribing.
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
                >
                  How does pvot define open, executed, and closed virtual trades?
                </button>
              </h2>
            </div>
            <div id='twentyone' className='collapse' aria-labelledby='headingThree' data-parent='#accordionExample'>
              <div className='card-body answer'>
                <ul>
                  <li className='mb-1'>
                    Open virtual trade: Order has been placed, but the virtual market prices has not matched with the
                    pvot’s order price.
                  </li>
                  <li className='mb-1'>
                    Executed virtual Trade: Order price has been matched with the virtual market prices. However, the
                    market prices has not reached the target or stop loss price.
                  </li>
                  <li className='mb-1'>
                    Closed virtual Trade: Either the target price or stop loss price has been reached.
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
                  data-target='#collapseeight'
                  aria-expanded='false'
                  aria-controls='collapseeight'
                  style={{
                    width:'100%'
                  }}
                >
                  Could I cancel the subscription at any time?
                </button>
              </h2>
            </div>
            <div id='collapseeight' className='collapse' aria-labelledby='headingThree' data-parent='#accordionExample'>
              <div className='card-body answer'>
                Yes, you can cancel subscription anytime. You will not be able to see the expert’s portfolio/trades at
                the end of the subscription period for which you have paid for the subscription. The subscriptions are
                NOT auto-renewed.
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
                  data-target='#collapsenine'
                  aria-expanded='false'
                  aria-controls='collapsenine'
                  style={{
                    width:'100%'
                  }}
                >
                  How much does a subscription cost?
                </button>
              </h2>
            </div>
            <div id='collapsenine' className='collapse' aria-labelledby='headingThree' data-parent='#accordionExample'>
              <div className='card-body answer'>
                It depends. Pvot does not have any restrictions on what an experts charge their clients. This means
                experts have complete control over pricing.
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
                  What is the refund and cancellation policy?
                </button>
              </h2>
            </div>
            <div id='collapseten' className='collapse' aria-labelledby='headingThree' data-parent='#accordionExample'>
              <div className='card-body answer'>
                Once paid, there will be no refund of the subscription fee. Even after cancellation, you would continue
                to have access to live activity of the experts until the end of the subscription period.
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
                  What are the best practices for subscribing to expert on Pvot?
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
                You have complete access to any expert you wish to subscribe after you the subscription fee. We provide
                you with some important data points such as Capital Required, Risk:Reward performance, etc. which helps
                you evaluate experts and make an informed decision when it comes to finding the most suited expert.
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
                >
                  Do you store the credit/debit card information?
                </button>
              </h2>
            </div>
            <div id='twelve' className='collapse' aria-labelledby='headingThree' data-parent='#accordionExample'>
              <div className='card-body answer'>No, we don't.</div>
            </div>
          </div>

          <div className='card'>
            <div className='card-header questionArea' id='headingThree'>
              <h2 className='mb-0'>
                <button
                  className='btn btn-link collapsed questionButton'
                  type='button'
                  data-toggle='collapse'
                  data-target='#fourteen'
                  aria-expanded='false'
                  aria-controls='fourteen'
                >
                  Can anyone use the app? Is it free?
                </button>
              </h2>
            </div>
            <div id='fourteen' className='collapse' aria-labelledby='headingThree' data-parent='#accordionExample'>
              <div className='card-body answer'>
                Anyone can use the app. Its free to use and download. Retail investors can track experts performance of
                closed trades/investments for unlimited time for free.
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
                  data-target='#fifteen'
                  aria-expanded='false'
                  aria-controls='fifteen'
                >
                  Is it available on Playstore and App Store?
                </button>
              </h2>
            </div>
            <div id='fifteen' className='collapse' aria-labelledby='headingThree' data-parent='#accordionExample'>
              <div className='card-body answer'>
                Pvot is available on Play Store. iOS users can access the app download link from our website, and upon
                downloading, save the link on their home screen.
              </div>
            </div>
          </div>

          <div className='row my-3 faqSectionTitle'>
            <h6>Related to Experts</h6>
          </div>

          <div className='card'>
            <div className='card-header questionArea' id='headingThree'>
              <h2 className='mb-0'>
                <button
                  className='btn btn-link collapsed questionButton'
                  type='button'
                  data-toggle='collapse'
                  data-target='#sixteen'
                  aria-expanded='false'
                  aria-controls='sixteen'
                >
                  What are the minimum qualifications of an Expert on pvot?
                </button>
              </h2>
            </div>
            <div id='sixteen' className='collapse' aria-labelledby='headingThree' data-parent='#accordionExample'>
              <div className='card-body answer'>
                The expert has to be graduate. Other than this there are no minimum qualifications. If you are good at
                what you do, you are likely to see high number of subscribers to follow your activity. The reason to
                have no bars on qualification is because Pvot intends to provide fair opportunity to smart
                technical/fundamental analysts to demonstrate their performance to a larger audience
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
                  data-target='#seventeen'
                  aria-expanded='false'
                  aria-controls='seventeen'
                >
                  How does Pvot vet the Experts before they start trading?
                </button>
              </h2>
            </div>
            <div id='seventeen' className='collapse' aria-labelledby='headingThree' data-parent='#accordionExample'>
              <div className='card-body answer'>
                For any SEBI Registered Investment Advisor or NISM Certified Research Analyst to come on the platform,
                we manually review the certificate and it's validity. We require them to provide at one ID proof along
                with the certificate. We clearly show this information on the platform. For all other experts, we don't
                mandate any proofs. However, these experts are free to monetize their activities.
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
                  data-target='#eighteen'
                  aria-expanded='false'
                  aria-controls='eighteen'
                >
                  How many Experts can I follow at a time?
                </button>
              </h2>
            </div>
            <div id='eighteen' className='collapse' aria-labelledby='headingThree' data-parent='#accordionExample'>
              <div className='card-body answer'>There is no limit to how many Experts you can follow.</div>
            </div>
          </div>

          <div className='card'>
            <div className='card-header questionArea' id='headingThree'>
              <h2 className='mb-0'>
                <button
                  className='btn btn-link collapsed questionButton'
                  type='button'
                  data-toggle='collapse'
                  data-target='#nineteen'
                  aria-expanded='false'
                  aria-controls='nineteen'
                >
                  How many Experts can I subscribe to at a time?
                </button>
              </h2>
            </div>
            <div id='nineteen' className='collapse' aria-labelledby='headingThree' data-parent='#accordionExample'>
              <div className='card-body answer'>There is no upper limit to how many Experts you can subscribe to.</div>
            </div>
          </div>

          <div className='card'>
            <div className='card-header questionArea' id='headingThree'>
              <h2 className='mb-0'>
                <button
                  className='btn btn-link collapsed questionButton'
                  type='button'
                  data-toggle='collapse'
                  data-target='#twenty'
                  aria-expanded='false'
                  aria-controls='twenty'
                >
                  What expertise/proprietary value do these analysts provide?
                </button>
              </h2>
            </div>
            <div id='twenty' className='collapse' aria-labelledby='headingThree' data-parent='#accordionExample'>
              <div className='card-body answer'>
                The top experts that you see on the platform are experienced in assessing stock movements. When they
                taking a trade, they are applying their years of experience in ensuring that the trades stay profitable.
                This way you to get see their years of experience put in practice.
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
                  data-target='#twentytwo'
                  aria-expanded='false'
                  aria-controls='twentytwo'
                >
                  How much commission out of my subscription fee does Pvot earn?
                </button>
              </h2>
            </div>
            <div id='twentytwo' className='collapse' aria-labelledby='headingThree' data-parent='#accordionExample'>
              <div className='card-body answer'>
                We typically charge 20% of the technology usage fee to the Experts per subscription. However, we review
                the performance of the Experts from time to time and for the top performing Experts the commission fee
                may be reduce to 5% per subscription. Similarly, a drop in performance would attract higher commission
                fee upto 20%.
              </div>
            </div>
          </div>
        </div>
        {/* <BottomNavigator /> */}
      </div>
    </Grow>
  );
};

export default InvestorFaqs;
