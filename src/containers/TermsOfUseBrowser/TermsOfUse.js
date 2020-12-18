import React from 'react';
import Header from '../components/Header/customHeader';
import BottomNavigator from '../components/BottomNavigator';
import Grow from '@material-ui/core/Grow';

import './TermsOfUse.scss';

const TermsOfUse = props => {
  return (
    <Grow in={true} timeout={700}>
        <div style={{ padding: '1rem 5rem', marginBottom: '40px' }} className='text-justify'>
          <div className='row'>
            <p>
              The terms "We" / "Us" / "Our"/”Company”/”The Company” individually and collectively refer to EffiFront
              Technologies Private Limited and the terms "Visitor” or ”User” refer to the users. The terms "Website",
              "App", "Pvot" individually and collectively refer to the Pvot website and Pvot mobile apps on Android and
              iOS platforms. This page states the Terms and Conditions under which you (Visitor) may visit this website
              (“Website”). Please read this page carefully. If you do not accept the Terms and Conditions stated here,
              we would request you to exit this site. The business, any of its business divisions and / or its
              subsidiaries, associate companies or subsidiaries to subsidiaries or such other investment companies (in
              India or abroad) reserve their respective rights to revise these Terms and Conditions at any time by
              updating this posting. You should visit this page periodically to re-appraise yourself of the Terms and
              Conditions, because they are binding on all users of this Website.
            </p>
          </div>
          <div className='row'>
            <h6>Eligibility</h6>
            <p>
              To register an account you must be at least 13 years old. To subscribe and make payments you must be at
              least 18 years old or have your parent’s permission. If you know a user is under the age of 13, please
              report them to us at hello@pvot.in.
            </p>
          </div>
          <div className='row'>
            <h6>User Conduct</h6>
            <ul>
              <li>Illegal Activities - Don’t break the law or encourage others to break the law.</li>
              <li>Abuse - Don’t harass or bully others, or promote violence or hatred towards others.</li>
              <li>
                Personal Information - Don’t distribute others’ personal information or otherwise abuse it. Creators
                with access to their users’ personal information should not use it for anything unrelated to Pvot.
              </li>
              <li>Fraud - Don’t post information that is false or otherwise misleading.</li>
              <li>
                Impersonation - Don’t impersonate anyone. Don’t use another’s account, or allow others to use your
                account.
              </li>
              <li>
                Username Squatting - Don’t create an account to prevent others from using the name or to sell the name.
              </li>
              <li>Intellectual Property - Don’t infringe on others’ intellectual property rights.</li>
              <li>Spam - Don’t spam others or distribute unsolicited advertising material.</li>
              <li>Malware - Don’t use Pvot to host or distribute, malicious or destructive software.</li>
              <li>Endorsement - Don’t claim endorsement by Pvot.</li>
              <li>Service Degradation - Don’t degrade others’ use of Pvot.</li>
              <li>
                Data Mining - Don’t crawl, scrape or otherwise index information on Pvot without our explicit
                permission.
              </li>
              <li>
                Content Sharing – Distributing a creator’s content without explicit permission can expose your to legal
                litigation from the creator.
              </li>
            </ul>
          </div>
          <div className='row'>
            <h6>Creator Conduct</h6>
            <p>
              Creators can launch a service that users can subscribe or purchase their content from. You appoint us as
              your agent to collect and process payments on your behalf, and any commission fee if applicable for
              payments made towards your service. You are responsible for any taxes you owe based on the payments you
              receive. You must also follow our rules about content.
            </p>
            <p>To become a creator, you register your profile as an Expert and can simply launch a service.</p>
            <p>
              If you create a service that publishes what may constitute "financial advice" that is targeted towards
              Indian audience, you understand and agree that if you are not registered (or exempt from registration)
              with the Securities and Exchange Board of India (“SEBI”) as an investment adviser under the Securities and
              Exchange Board of India (Investment Advisers) Regulations, 2013 (“IA Regulations”), information published
              by you on Pvot is at your own risk and you alone will be liable for any actions arising pursuant to
              publishing such information.
            </p>
            <p>
              As your agent, our receipt of funds from a user on your behalf is the same as receipt of funds by you
              directly, and you will only have recourse against us, and not against any user, for any failure by us to
              settle funds to you. We try to provide timely access to your funds, but you may occasionally experience
              delays in accessing your funds. We may also block or hold payments for violations of the terms or
              compliance reasons, including collecting tax reporting information. When payments are delayed or blocked
              we try to communicate the reasons to you promptly. In order to protect creators and users, we may block
              users’ payments if we believe them to be fraudulent.
            </p>
            <p>
              Our commission structure is variable and can range from 5%-20% of the payments made towards your service
              or content + 2% towards payment gateway charges. If you have a separate agreement made via a Pvot sales
              agent, kindly refer to that for the exact commission amount. Our fee to process transactions on your
              behalf may vary on a case to case basis depending on purchase or payment channel. We do not handle most
              tax payments, but we collect tax identification information and report this to tax authorities as legally
              required. You are responsible for reporting any taxes.
            </p>
          </div>
          <div className='row'>
            <h6>CONTENT RESTRICTIONS</h6>
            We restrict some types of content. You cannot:
            <ul>
              <li>Create any content depicting explicitly sexual or violent acts in graphic detail.</li>
              <li>
                Create content using others' intellectual property, unless you have written permission to use it, or
                your use is protected by fair use.
              </li>
              <li>
                Any content that is illegal under Indian or local state laws or laws of the region that you reside in.
              </li>
            </ul>
            <p>
              We are not party to the agreement between creators and users. If a user requests a refund from us, we only
              grant it in very exceptional situations. We may deduct the refunded amount from future payments to
              creator.
            </p>
          </div>
          <div className='row'>
            <h6>INTELLECTUAL PROPERTY</h6>
            <p>
              The Website is a platform for 3rd party content creators to showcase and sell their digital content. As
              such the complete ownership of the content rests with such content creators. The Company DOES NOT claim
              any ownership on such content and it is solely the right and prerogative of the respective content
              creator.
            </p>
            <p>
              The content creator is responsible for original authorship and ensuring that the complete rights of the
              content published on the Website rest with the content creator and that it respects the local laws. The
              Website will not be held liable for content plagiarism or claims of ownership by any other party or
              violation of local laws by a content creator. If, however such a dispute is raised by another credible
              party by contacting the Company, the Company reserves the complete right to take down such content from
              the Website and App and further penalizing the content creator by completely removing their presence and
              all of their content from the Website. We do not screen or endorse any content on the Website. If you see
              content that violates these terms, then let us know and we may remove it.
            </p>
          </div>
          <div className='row'>
            <h6>YOUR CONTENT</h6>
            <p>
              By posting content on to Website you grant us a royalty-free, perpetual, irrevocable, non-exclusive,
              sublicensable, worldwide license to use, reproduce, distribute, perform, publicly display or prepare
              derivative works of your content. The purpose of this license is to allow us to operate Pvot, promote Pvot
              and promote your content on Pvot. We are not trying to steal your content or use it in an exploitative
              way. You may not post content that infringes on others' intellectual property or proprietary rights. Users
              may not use content posted by creators in any way not authorized by the creator.
            </p>
          </div>
          <div className='row'>
            <h6>USE OF CONTENT</h6>
            <p>
              All logos, brands, marks headings, labels, names, signatures, numerals, shapes or any combinations
              thereof, appearing in this site, except as otherwise noted, are properties either owned, or used under
              licence, by the business and / or its associate entities who feature on this Website. You may not
              otherwise use, reproduce, distribute, perform, publicly display or prepare derivative works of our content
              unless we give you permission in writing. The use of these properties or any other content on this site,
              except as provided in these terms and conditions or in the site content, is strictly prohibited. You may
              not sell or modify the content of this Website or reproduce, display, publicly perform, distribute, or
              otherwise use the materials in any way for any public or commercial purpose without the respective
              organisation’s or entity’s written permission.
            </p>
            <p>
              Content we create is protected by copyright, trademark and trade secret laws. Some examples of our content
              are the text on the site, our logo, and our codebase. We grant you a license to use our logo and other
              copyrights or trademarks to promote your Pvot service.
            </p>
          </div>
          <div className='row'>
            <h6>ACCEPTABLE WEBSITE USE</h6>
            <ol type='A'>
              <li>
                Security Rules: Visitors are prohibited from violating or attempting to violate the security of the Web
                site, including, without limitation,
                <ol>
                  <li>
                    accessing data not intended for such user or logging into a server or account which the user is not
                    authorized to access.
                  </li>
                  <li>
                    attempting to probe, scan or test the vulnerability of a system or network or to breach security or
                    authentication measures without proper authorization.
                  </li>
                  <li>
                    attempting to interfere with service to any user, host or network, including, without limitation,
                    via means of submitting a virus or "Trojan horse" to the Website, overloading, "flooding", "mail
                    bombing" or "crashing".
                  </li>
                  <li>
                    sending unsolicited electronic mail, sms, push notifications including promotions and/or advertising
                    of products or services. Violations of system or network security may result in civil or criminal
                    liability. The business and / or its associate entities will have the right to investigate
                    occurrences that they suspect as involving such violations and will have the right to involve, and
                    cooperate with, law enforcement authorities in prosecuting users who are involved in such
                    violations.
                  </li>
                </ol>
              </li>
              <li>
                General Rules: Visitors may not use the Web Site in order to transmit, distribute, store or destroy
                material:
                <ol>
                  <li>
                    that could constitute or encourage conduct that would be considered a criminal offence or violate
                    any applicable law or regulation OR
                  </li>
                  <li>
                    in a manner that will infringe the copyright, trademark, trade secret or other intellectual property
                    rights of others or violate the privacy or publicity of other personal rights of others OR
                  </li>
                  <li>
                    that is libellous, defamatory, pornographic, profane, obscene, threatening, abusive or hateful.
                  </li>
                </ol>
              </li>
            </ol>
          </div>
          <div className='row'>
            <h6>COPYRIGHT INFRINGEMENT</h6>
            <p>
              If you believe that any content on Pvot infringes your copyrights, please send written notice to:
              hello@pvot.in
            </p>
            <p>This notice should include the following information:</p>
            <ul>
              <li>
                The electronic or physical signature of the copyright owner, or a person authorized to act on their
                behalf.
              </li>
              <li>A description of the copyrighted work that you claim has been infringed.</li>
              <li>
                A description of the exact location on Pvot of the content that you claim is infringing. This
                description must allow us to find and identify the content.
              </li>
              <li>Your name, address, telephone number and email address.</li>
              <li>
                A statement by you that: a) you believe in good faith that the use of the content that you claim to
                infringe your copyright is not authorized by law, the copyright owner, or the owner’s agent, b) all
                information contained in your copyright notice is accurate, and c) under penalty of perjury, you are
                either the copyright owner, or authorized to act on their behalf.
              </li>
            </ul>
          </div>
          <div className='row'>
            <h6>USER GENERATED CONTENT</h6>
            <p>
              Users may create content on Pvot in "services" or "communities" or "chats". All such content has to comply
              with policies mentioned in this document. Your continued use of Pvot is conditional upon acknowledgement
              and acceptance of the following:
            </p>
            <ul>
              <li>
                Pvot does not vet or verify the identities of its users or creators who are creating content on its
                platform.
              </li>
              <li>
                Pvot does not verify or endorse the views of creators who are publishing content on its platform
                including content that may be of the nature of "financial advice". Relying on the views of such creators
                (whether registered with SEBI or not) to make any financial investments, is purely at the risk of the
                user.
              </li>
              <li>
                Pvot has no way to vet or verify any claims or reports or opinions expressed in any content posted on
                its platform by users.
              </li>
              <li>
                Pvot sometime uses its proprietary method to analyze and report content created by the creator. However,
                Pvot is not responsible or liable for the quality, accuracy, veracity, reliability or timeliness of any
                claim, news, information, artwork or opinion published by users on its platform.
              </li>
              <li>
                Pvot reserves the right to remove any content which is reported to be in violation of any policy
                outlined in this document.
              </li>
              <li>
                You, as a user are responsible for fact checking or assessing the accuracy and utility of any report or
                claim or opinion published by another user on Pvot.
              </li>
            </ul>
          </div>
          <div className='row'>
            <h6>STOCK OR MARKET QUOTES</h6>
            <p>
              You acknowledge and accept that stock quotes that may appear in Pvot communities are only provided for
              setting the context. Such quotes are delayed and are NOT to be used for trading purposes. Pvot is NOT
              responsible for any damage or losses arising out of your trades.
            </p>
          </div>
          <div className='row'>
            <h6>INDEMNITY</h6>
            <p>
              You agree to indemnify and hold harmless, without objection, the Company, its officers, directors,
              employees and agents from and against any claims, actions and/or demands and/or liabilities and/or losses
              and/or damages whatsoever arising from or resulting from their use of the Website or their breach of the
              terms. Further, you, as a creator agree to indemnify and hold harmless, without objection, the Company,
              its officers, directors, employees and agents from and against any claims, actions and/or demands and/or
              liabilities and/or losses and/or damages whatsoever arising from or resulting from claims by the users of
              the Website, the Securities and Exchange Board of India or any other regulatory or law enforcement agency.
            </p>
          </div>
          <div className='row'>
            <h6>WARRANTY DISCLAIMER</h6>
            <p>
              Pvot is provided “as is” and without warranty of any kind. Any warranty of merchantability, fitness for a
              particular purpose, non-infringement, and any other warranty is excluded to the greatest extent permitted
              by law. The disclaimers of warranty under this clause also apply to our affiliates and third party service
              providers.
            </p>
          </div>
          <div className='row'>
            <h6>LIMIT OF LIABILITY</h6>
            <p>
              User agrees that neither Company nor its group companies, directors, officers or employee shall be liable
              for any direct or/and indirect or/and incidental or/and special or/and consequential or/and exemplary
              damages, resulting from the use or/and the inability to use the service or/and for cost of procurement of
              substitute goods or/and services or resulting from any goods or/and data or/and information or/and
              services purchased or/and obtained or/and messages received or/and transactions entered into through
              or/and from the service or/and resulting from unauthorized access to or/and alteration of user's
              transmissions or/and data or/and arising from any other matter relating to the service, including but not
              limited to, damages for loss of profits or/and use or/and data or other intangible, even if Company has
              been advised of the possibility of such damages.
            </p>
            <p>
              User further agrees that Company shall not be liable for any damages arising from interruption, suspension
              or termination of service, including but not limited to direct or/and indirect or/and incidental or/and
              special consequential or/and exemplary damages, whether such interruption or/and suspension or/and
              termination was justified or not, negligent or intentional, inadvertent or advertent. User agrees that
              Company shall not be responsible or liable to user, or anyone, for the statements or conduct of any third
              party of the service. In sum, in no event shall Company's total liability to the User for all damages
              or/and losses or/and causes of action exceed the amount paid by the User to Company, if any, that is
              related to the cause of action.
            </p>
            <p>
              To the extent permitted by law, our liability for damages is limited to the amount of money we have earned
              through your use of Pvot. We are specifically not liable for loss associated with failure to deliver
              content and from losses caused by conflicting contractual agreements.
            </p>
          </div>
          <div className='row'>
            <h6>DISCLAIMER OF CONSEQUENTIAL DAMAGES</h6>
            <p>
              In no event shall Company or any parties, organizations or entities associated with the corporate brand
              name us or otherwise, mentioned at this Website be liable for any damages whatsoever (including, without
              limitations, incidental and consequential damages, lost profits, or damage to computer hardware or loss of
              data information or business interruption) resulting from the use or inability to use the Website and the
              Website material, whether based on warranty, contract, tort, or any other legal theory, and whether or
              not, such organization or entities were advised of the possibility of such damages.
            </p>
          </div>
          <div className='row'>
            <h6>GOVERNING LAW</h6>
            <p>
              We encourage you to contact us if you have an issue. If a dispute does arise out of these terms or related
              to your use of Pvot, and it cannot be resolved after you talk with us, then it must be resolved in
              Bangalore under Karnataka law.
            </p>
            <p>
              Karnataka law, excluding its conflict of law provisions, governs these terms and all other Pvot policies.
              If a lawsuit does arise, both parties consent to the exclusive jurisdiction and venue of the courts
              located in Bangalore, Karnataka, India.
            </p>
            <p>
              These terms and any referenced policies are the entire agreement between you and us, and supersede all
              prior agreements. If any provision of these terms is held to be unenforceable, that provision is modified
              to the extent necessary to enforce it. If a provision cannot be modified, it is severed from these terms,
              and all other provisions remain in force. If either party fails to enforce a right provided by these
              terms, it does not waive the ability to enforce any rights in the future.
            </p>
            <p>If you have any questions, please email hello@pvot.in</p>
          </div>
          <div className='row'>
            <h6>LEGAL DISCLAIMERS</h6>
            <p>
              The terms "We" / "Us" / "Our"/ ”Company”/ “The ”Company” individually and collectively refer to EffiFront
              Technologies Private Limited and the terms "You" /"Your" / "Yourself" refer to the users. The terms
              "Website", "App" individually and collectively refer to the Pvot website and Pvot mobile apps on Android
              and iOS platforms. By registering on the Website and agreeing to its Terms of Use and Privacy Policy, you
              also agree and acknowledge the following Legal Disclaimer notice:
            </p>
            <p>
              - You agree that the use of Pvot, the application and its services, are at solely at your own risk.
              Neither the Website nor its associates nor employees nor third party content providers guarantee that the
              service will be completely uninterrupted or error-free or foolproof against miscreant activities. Nor do
              they warranty that you will get the exact results as expected or promised by the website or product.
            </p>
            <p>
              - The website and the application are provided on an “AS IS” basis with no warranties expressly stated or
              promised regarding the results that would be obtained from the use of it. Warranties are only indicated
              and are liable to change or differ based on your usage or in cases of emergency or inevitable technical
              problems.
            </p>
            <p>
              In no event will the Website or any person or entity or third party involved in the creation, production
              and distribution of the content on the website and the application be liable in contract or legally for
              any damages, including and not limited to, direct, indirect, incidental, special, and consequential
              incurred to you while or on using the Website. By registering on the website or downloading the
              application, you agree that the provisions mentioned in this section shall apply to all use of and content
              on the website and the application.
            </p>
            <p>
              The above disclaimer of liability applies to any damages or injury caused by any failure of performance,
              error, omission, inaccuracy, interruption, deletion, delay, defect in operation or transmission, computer
              virus attack, communication line failure, theft or destruction or unauthorised access to, alteration of or
              use of this website, on account of breach of contract or negligence or under any other cause of action.
            </p>
            <p>
              You specifically acknowledge that Company is not liable for any kind of defamatory or offensive or illegal
              conduct of other users or third parties or their content and that the risk of injury from the foregoing
              rests entirely with you.
            </p>
          </div>
        </div>
        {/* <BottomNavigator /> */}
    </Grow>
  );
};

export default TermsOfUse;
