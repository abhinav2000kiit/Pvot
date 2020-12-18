import React from 'react'
import Header from '../components/Header/customHeader'
import { connect } from 'react-redux'
import * as actions from '../../redux/actions'
import { CircularProgress } from '@material-ui/core'
import { Row, Col} from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import './index.scss'

function ReferAFriend(props){
    React.useEffect(()=>{
        props.getReferralCode()
    }, [])
    const handleShare = () => {
        if(navigator.share){
            navigator.share({
              url:`https://m.pvot.in/referral-code?referralCode=${props.referralCode}`,
              text:`Hey! I'm on my way to build wealth in stocks through Pvot. Download Pvot app and signup using my referral code: ${props.referralCode} A smarter way to earn from stocks is here!\n\n`
            })
        }
    }
    return (
    <div className='parent' style={{width: '100%', display:'grid', gridTemplateRows:'56px auto'}}>
        <Header title={'Become an Affiliate'} backButton backTo={() => props.history.push('/')}/>
        <Col className='mt-4 center-col-space-between'>
            <div>
                <Row>
                    <Col className='text-center'>
                        <h6>Total Amount: 0</h6>
                        <h6>Credited Amount: 0</h6>
                    </Col>
                </Row>
                <Row className='px-3 mt-5'>
                    <Col>
                        <h6 style={{color:'bold'}}>What would I get?</h6>
                        <ol>
                            <li>Recurring commissions of <b>10% on all revenue</b> Pvot earns through subscription of expert plans by your referrals.</li>
                        </ol>
                        <p>You can get your custom referral link below.</p>
                    </Col>
                </Row>
                <Row className='px-3'>
                    <Col className='col-8 px-5' 
                    style={{
                        borderRadius: '14px 0 0 14px', 
                        height:'50px',
                        display:'flex',
                        alignItems:'center',
                        border:'1px solid #2962ff',
                        // padding: '0 24px'
                        }} >
                        <span className='ml-3'>{props.referralCode ? props.referralCode : <CircularProgress size='1rem' color='primary' />}</span>
                    </Col>
                    <Col className='col-4' 
                    style={{
                        borderRadius: '0 14px 14px 0', 
                        backgroundColor: '#2962ff',  
                        height:'50px',
                        display:'flex',
                        alignItems:'center',
                        justifyContent: 'center', 
                        color:'white',
                        border:'1px solid #2962ff'
                    }} 
                    onClick={props.referralCode ? handleShare : null}>
                        Share Code
                    </Col>
                </Row>
                <Row className='px-3 mt-3'>
                    <Col>
                        <h6>How to get started?</h6>
                        <ol>
                            <li>Use your affiliate ID to refer to any Pvot page. 
                            Display the link on your site, social media or emails. 
                            A standard affiliate link looks like this: <br/>
                            <span style={{color: "#2962ff"}}>‍https://m.pvot.in/referral-code?referralCode=YOURUNIQUECODE</span></li>
                            <li>
                            Commissions can be tracked in your account. As soon as a customer pays, your share of commissions 
                            will start showing up on your account within 24 hours. Subscription fees as well as our fees earned 
                            via selling of strategies purchased by your referrals will be considered for your commission 
                            calculation. For example: <br/>
                                <ul>
                                    <li>A user purchases a subscription plan for INR 5000 from expert. Our fees for this happens 
                                    to be INR 1000 (20% of what’s charged by the expert). So your commissions would be Rs.100 per month.</li>
                                    <li>Second, an expert creator generates an invoice of Rs.10000 for a user based on the profit sharing fees. 
                                    Our share of fees is INR 2000, hence your share would be INR 200. In essence, you earn 10% of all what we earn 
                                    from your referral.</li>
                                </ul>
                            </li>
                        </ol>
                    </Col>
                </Row>
            </div>
            <Row>
                <Col className='text-center my-3'>
                    <span style={{color: '#2962ff'}} onClick={() => props.history.push('/ref-T-C')}>Terms & Conditions</span>
                </Col>
            </Row>
            {/* </div> */}
        </Col>
    </div>
    )
}
const mapStateToProps = state => ({
    referralCode: state.user.referralCode
})
const mapDispatchToProps = dispatch => ({
  getReferralCode: () => dispatch(actions.getReferralCode())
})
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ReferAFriend))