import React from 'react'
import { Row, Col, Image } from 'react-bootstrap'
import {Input, FormControl, InputLabel, FormHelperText, CircularProgress} from '@material-ui/core'
import * as actions from '../../redux/actions'
import {connect} from 'react-redux'

function ReferralVerification(props) {
    const [referralCode, setReferralCode] = React.useState("")
    const [verifying, setVerifying] = React.useState(false)

    React.useEffect(() => {
        props.setMessage()
    }, [])
    
    const verifyReferralCode = () => {
        if(referralCode.trim().length > 0){
            props.checkReferralCode(JSON.stringify({referral_code:referralCode}));
            setVerifying(true)
        }
    }
    if((props.message === 'Referral Code Successfull' || props.message === 'Invalid Referral Code' || props.referralVerified)){
        if(verifying){
            setVerifying(false)
        }
    }
    return (
        <div className='lower-screen small'>
            <div className='lower-screen-header'>
                <span>Enter Referral Code</span>
            </div>
            <div className='lower-screen-content'>
                <Row>
                    <Col>
                        <div className='lower-screen-sub-heading'>
                            <p style={{width: '24px'}}></p>
                            <Image  onClick={props.closeLowerScreen} src={require('../../assets/images/svg/close-icon.svg')} className='close' />
                        </div>
                    </Col>
                </Row>
                <Row className='mt-3'>
                    <Col className='text-center'>
                        <FormControl>
                            <InputLabel htmlFor='referralCode'>{props.referredBy ? 'Referred By' : 'Referral Code'}</InputLabel>
                            <Input
                                id='referralCode'
                                name='referralCode'
                                size='small'
                                value={props.referredBy ? props.referredBy : referralCode}
                                onChange={(e) => {
                                    setReferralCode(e.target.value)
                                    if((props.message === 'Referral Code Successfull' || props.message === 'Invalid Referral Code')){
                                        props.setMessage()
                                    }
                                }}
                                readOnly={verifying || props.message === 'Referral Code Successfull' || props.referralVerified}
                                disabled={verifying || props.message === 'Referral Code Successfull' || props.referralVerified}
                                />
                            { props.message === 'Invalid Referral Code' && <FormHelperText id="my-helper-text"><span style={{color:'red'}}>{props.message}</span></FormHelperText>}
                        </FormControl>
                        <Row className=' small center-row mt-3'>
                            <button className='cancel' onClick={props.closeLowerScreen}>Cancel</button>
                            {verifying ? <span className='ml-3'><CircularProgress color='primary' /></span> :
                                <button className='ml-2 save' onClick={verifyReferralCode} disabled={props.message === 'Referral Code Successfull' || props.referralVerified} style={{opacity: referralCode.trim().length > 0 ? 1 : 0.7 }}>{props.message === 'Referral Code Successfull' || props.referralVerified ? 'Verified' : 'Verify'}</button>
                            }
                        </Row>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    message: state.auth.message,
    referralVerified: state.user.referralVerified,
    referredBy: state.user.referredBy
})
const mapDispatchToProps = (dispatch) => ({
    checkReferralCode: (payload) => dispatch(actions.checkReferralCode(payload)),
    setMessage: () => dispatch(actions.setMessage(null))
})

export default connect(mapStateToProps, mapDispatchToProps)(ReferralVerification)