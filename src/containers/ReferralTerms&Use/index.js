import React from 'react'
import {Row, Col} from 'react-bootstrap'
import { connect } from 'react-redux'
import Header from '../components/Header/customHeader'
import './index.scss'
function RefTC(props) {
    console.log(props)
    return (
    <>
            <Header title={'Affiliate – Terms & Conditions'} backButton backTo={() => props.history.push('/refer-friend')} />
            <Row className='my-2'>
                <Col className='col-10 offset-1'>
                    <p>This is a contract between {props.signinData && props.signinData.user && props.signinData.user.UserAttributes.find(el => el.Name === 'name').Value} (the “Affiliate”) and us (“Pvot” or “Effifront Technologies Private Ltd.”).
                    It describes how we will work together and other aspects of our business relationship.</p>
                    <h6>Commission </h6>
                    <ul>
                        <li>As defined by the program details </li>
                    </ul>
                    <h6>Non-Exclusivity</h6>
                    <p>This Agreement does not create an exclusive agreement between you and us. 
                    Both you and we will have the right to recommend similar products and services of third parties and to 
                    work with other parties in connection with the design, sale, installation, implementation and use of similar 
                    services and products of third parties.</p>
                    <h6>Customer Transactions</h6>
                    <ul>
                        <li>Acceptance and Validity.  An Affiliate Lead will be considered valid and accepted if, 
                        in our reasonable determination: (i) it is a new potential customer of ours, and (ii) is not, 
                        at the time of submission or forty five (45) days prior, one of our pre-existing customers, or 
                        involved in our active sales process. Notwithstanding the foregoing, we may choose not to accept
                        an Affiliate Lead in our reasonable discretion. If an Affiliate Lead does not purchase the Subscription 
                        Service within the time period, you will not be eligible for a Commission payment, even if the Affiliate 
                        Lead decides to purchase after the time period has expired.  An Affiliate Lead is not considered valid if 
                        it’s first click on the Affiliate Link is after this Agreement has expired or terminated.</li>
                        <li>Engagement with Prospects. Once we have received the Affiliate Lead information, we may elect 
                        to engage with the prospect directly, regardless of whether or not the Affiliate Lead is valid. 
                        If an Affiliate Lead is not valid then we may choose to maintain it in our database and we may 
                        choose to engage with such Affiliate Lead. Any engagement between Pvot and an Affiliate Lead will be at
                         Pvot’s discretion.</li>
                        <li>Commission and Payment. Requirements for Payment; Forfeiture. In order to receive payment under this
                         Agreement, you must have: 
                        (i) agreed to the terms of this Agreement (generally completed through the Affiliate Tool); 
                        (ii) completed all steps necessary to create your account in the Affiliate Tool in accordance with 
                        our directions, 
                        (iii) have a valid and up-to-date Bank account (iv) 
                        completed any and all required tax documentation in order for Pvot to process any payments 
                        that may be owed to you.</li>
                        <li>Commission Payment. We, or a Pvot Affiliate, will pay the Commission amount due to you within 
                        thirty (30) days after the end of each month for any Commission amounts that you become eligible f
                        or according to the Eligibility section above. We will determine the currency in which we pay the 
                        Commission, as well as the applicable conversion rate. We will not pay more than one Commission payment 
                        or other similar referral fee on any given Customer Transaction (unless we choose to in our discretion). </li>
                        <li>Taxes. You are responsible for payment of all taxes applicable to the Commission. All amounts payable
                         by us to you are subject to offset by us against any amounts owed by you to us.</li>
                    </ul>
                    <h6>Training and Support</h6>
                    <ul>
                        <li>Affiliate Training and Support. We may make available to you, without charge, various webinars and 
                        other resources made available as part of our Affiliate Program. If we make such resources available to you, 
                        you will encourage your sales representatives and/or other relevant personnel to participate in training 
                        and/or other certifications as we recommend and may make available to you from time-to-time. We may change 
                        or discontinue any or all parts of the Affiliate Program benefits or offerings at any time without notice.</li>

                    </ul>
                    <h6>Trademarks</h6>
                    <p>You grant to us a nonexclusive, nontransferable, royalty-free right to use and display your trademarks, service marks 
                    and logos (“Affiliate Marks”) in connection with the Affiliate Program and this Agreement.</p>
                    <p>During the term of this Agreement, in the event that we make our trademark available to you within the Affiliate Tool, 
                    you may use our trademark as long as you follow the usage requirements in this section.  You must: 
                    <br/>(i) only use the images of our trademark that we make available to you, without altering them in any way; 
                    <br/>(ii) only use our trademarks in connection with the Affiliate Program and this Agreement; and 
                    <br/>(iii) immediately comply if we request that you discontinue use.  
                    <br/>You must not: 
                    <br/>(i) use our trademark in a misleading or disparaging way; 
                    <br/>(ii) use our trademark in a way that implies we endorse, sponsor or approve of your services or products; or 
                    <br/>(iii) use our trademark in violation of applicable law or in connection with an obscene, indecent, or unlawful topic or material.</p>
                    <h6>Proprietary Rights</h6>
                    <ul>
                        <li>Pvot’s Proprietary Rights.  No license to any software is granted by this Agreement. The Pvot Products 
                        are protected by intellectual property laws. The Pvot Products belong to and are the property of us or our licensors 
                        (if any). We retain all ownership rights in the Pvot Products. You agree not to copy, rent, lease, sell, distribute, or 
                        create derivative works based on the Pvot Content, or the Pvot Products in whole or in part, by any means, except as 
                        expressly authorized in writing by us.</li>
                        <li>We encourage all customers, affiliates and partners to comment on the Pvot Products, provide suggestions for 
                        improving them, and vote on suggestions they like. You agree that all such comments and suggestions will be non-confidential 
                        and that we own all rights to use and incorporate them into the Pvot Products, without payment to you.</li>
                        <li>Customer’s Proprietary Rights. As between you and Customer, Customer retains the right to access and use the 
                        Customer portal associated with the Pvot Products. For the avoidance of doubt, Customer will own and retain all 
                        rights to the Customer Data.</li>
                    </ul>
                    <h6>Confidentiality</h6>
                    <p>
                        As used herein, “Confidential Information” means all confidential information disclosed by a party ("Disclosing Party") 
                        to the other party (“Receiving Party”), 
                        <br/>(i) whether orally or in writing, that is designated as confidential, and 
                        <br/>(ii) Pvot customer and prospect information, whether or not otherwise designated as confidential. 
                        <br/>Confidential Information does not include any information that 
                        <br/>(i) is or becomes generally known to the public without breach of any obligation 
                        owed to the Disclosing Party or 
                        <br/>(ii) was known to the Receiving Party prior to its disclosure by the Disclosing Party 
                        without breach of any obligation owed to the Disclosing Party.  
                        <br/>The Receiving Party shall: 
                        <br/>(i) protect the confidentiality
                         of the Confidential Information of the Disclosing Party using the same degree of care that it uses with its own confidential
                          information, but in no event less than reasonable care, 
                          <br/>(ii) not use any Confidential Information of the Disclosing Party 
                          for any purpose outside the scope of this Agreement, 
                          <br/>(iii) not disclose Confidential Information of the Disclosing Party 
                          to any third party, and 
                          <br/>(iv) limit access to Confidential Information of the Disclosing Party to its employees, 
                          contractors and agents. The Receiving Party may disclose Confidential Information of the Disclosing Party if required 
                          to do so under any federal, state, or local law, statute, rule or regulation, subpoena or legal process.</p>
                    <h6>Opt Out and Unsubscribing</h6>
                    <p>You will comply promptly with all opt out, unsubscribe, "do not call" and "do not send" requests.  For the duration of this 
                    Agreement, you will establish and maintain systems and procedures appropriate to effectuate all opt out, unsubscribe, "do not 
                    call" and "do not send" requests.</p>
                    <h6>Term and Termination</h6>
                    <ul>
                        <li>Term. This Agreement will apply for as long as you participate in the Affiliate Program, until terminated.</li>
                        <li>No cause Termination.  Both you and we may terminate this Agreement on seven (7) days written notice to the other party.</li>
                    </ul>
                    <p>Upon termination or expiration, you will immediately discontinue all use of our trademark and references to 
                    this Affiliate Program from your website(s) and other collateral. For the avoidance of doubt, termination or expiration 
                    of this Agreement shall not cause a Customer’s subscription agreement to be terminated.</p>
                    <h6>Affiliate Representations and Warranties</h6>
                    <p>You represent and warrant that: (i) you have all sufficient rights and permissions to participate in the Affiliate 
                    Program and to provision Pvot with Affiliate Lead’s for our use in sales and marketing efforts or as otherwise set forth 
                    in this Agreement, (ii) your participation in this Affiliate Program will not conflict with any of your existing agreements 
                    or arrangements; and (iii) you own or have sufficient rights to use and to grant to us our right to use the Affiliate Marks.</p>
                    <h6>Non-Solicitation</h6>
                    <p>You agree not to intentionally solicit for employment any of our employees or contractors during the term of this Agreement 
                    and for a period of twelve (12) months following the termination or expiration of this Agreement.</p>
                    <h6>General</h6>
                    <ul>
                        <li>Applicable Law. This Agreement shall be governed by the laws of Republic of India, without regard to the conflict of 
                        laws provisions thereof. In the event either of us initiates an action in connection with this Agreement or any other 
                        dispute between the parties, the exclusive venue and jurisdiction of such action shall be in the state courts in Bengaluru, India.</li>
                        <li>Force Majeure. Neither party will be responsible for failure or delay of performance if caused by: an act of war, hostility, 
                        or sabotage; act of God; electrical, internet, or telecommunication outage that is not caused by the obligated party; government 
                        restrictions; or other event outside the reasonable control of the obligated party. Each party will use reasonable efforts to 
                        mitigate the effect of a force majeure event.</li>
                        <li>Relationship of the Parties. Both you and we agree that no joint venture, partnership, employment, or agency relationship 
                        exists between you and us as a result of this Agreement.</li>
                        <li>Entire Agreement. This Agreement is the entire agreement between us for the Affiliate Program and supersedes all other 
                        proposals and agreements, whether electronic, oral or written, between us.</li>
                        <li>Assignment. You will not assign or transfer this Agreement, including any assignment or transfer by reason of merger, 
                        reorganisation, sale of all or substantially all of its assets, change of control or operation of law, without our prior 
                        written consent. We may assign this Agreement to any affiliate or in the event of merger, reorganization, sale of all or 
                        substantially all of our assets, change of control or operation of law.</li>
                        <li>No Third Party Beneficiaries.  Nothing in this Agreement, express or implied, is intended to or shall confer upon any 
                        person or entity (other than the parties hereto) any right, benefit or remedy of any nature whatsoever under or by 
                        reason of this Agreement.</li>
                        <li>No Licenses. We grant to you only the rights and licenses expressly stated in this Agreement, and you receive no 
                        other rights or licenses with respect to us, the Pvot Products, our trademarks, or any other property or right of ours.</li>
                        <li>Sales by Pvot. This Agreement shall in no way limit our right to sell the Pvot Products, directly or indirectly, 
                        to any current or prospective customers.</li>
                        <li>Authority. Each party represents and warrants to the other that it has full power and authority to enter into this 
                        Agreement and that it is binding upon such party and enforceable in accordance with its terms.</li>
                    </ul>
                </Col>
            </Row>
    </>
    )
}

const mapStateToProps = state => ({
    signinData: state.auth.signinData
})

export default connect(mapStateToProps)(RefTC)