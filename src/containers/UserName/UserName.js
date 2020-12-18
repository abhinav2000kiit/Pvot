import React, { Component, Fragment } from 'react'
import { Input, FormControlLabel, Dialog, Button, FormControl, TextField, CircularProgress} from '@material-ui/core'
import {Image, Form, Row, Col} from 'react-bootstrap'
import * as actions from '../../redux/actions/index';
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom';


export class UserName extends Component {
    constructor(props){
        super(props)
        this.state = {
            name: '',
            nameInputSuccess: false,
            referCode: window.localStorage.getItem('referralCode') ? window.localStorage.getItem('referralCode') : '',
            checkingReferCode: false,
            message: ''
        }
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
    }
    componentDidMount() {
        const name = this.props.signinData && this.props.signinData.user.UserAttributes.filter(item => item.Name === 'name')[0].Value
        // if (name != ' '){
        //     if(this.props.userGroup === 'USER') this.props.history.push('/user/user-home');
        //     else this.props.history.push('/analyst-home')
        // }
    }
    componentDidUpdate() {
        if((this.props.message === 'Referral Code Successfull' || this.props.message === 'Invalid Referral Code' || this.props.referralVerified)){
            if(this.state.checkingReferCode){
                this.setState({
                    checkingReferCode: false,
                    message: this.props.message
                })
            }
        }
    }
    componentWillUnmount(){
        window.localStorage.removeItem('referralCode')
    }
    handleInputChange(e){
        if(e.target.name === 'referCode'){
            this.setState({
                referCode: e.target.value
            })
        }else{
            let lastChar = e.target.value[e.target.value.length - 1]
            if((lastChar>='a' && lastChar <='z') || (lastChar>='A' && lastChar <='Z') || (lastChar === ' ') || (lastChar === undefined)){
                this.setState({
                    name : e.target.value,
                    nameInputSuccess: true
                })
        }
        }
        
    }
    checkingReferralCode(){
        if(this.state.referCode.trim().length > 0){
            this.props.checkReferralCode(JSON.stringify({referral_code:this.state.referCode}));

            this.setState({
                checkingReferCode: true
            })
        }
    }
    handleFormSubmit(e){
        e.preventDefault()
        console.log(this.state.name)
        
        if(this.state.name.trim() !== ''){
            console.log(this.state)
            this.setState({
                nameInputSuccess: true
            })
            this.props.updateName({
                AccessToken: this.props.signinData.token.AuthenticationResult.AccessToken,
                UserAttributes: [
                    {
                        Name:'name',
                        Value: this.state.name.trim()
                    }
                ]
            })
            if(this.props.userGroup === 'USER') this.props.history.push('/user-preferences');
            else this.props.history.push('/analyst-home')
        }
    }
    render() {
        const {name, nameInputSuccess} = this.state
        return (
            <>
            <Row className='parent p-2'>
                <Col className='center-col-around'>
                    <Row>
                        <Col className='right-col'>
                            <Image src={require('../../assets/images/svg/grid_pvot.svg')} />
                        </Col>
                    </Row>
                    <Form onSubmit={this.handleFormSubmit}>
                        <Row>
                            <Col>
                                <div className='forgot-sub-heading'>Welcome to Pvot! Let's get you started. What's your name?</div>
                            </Col>
                        </Row>
                        <Row className='mt-5' noValidate onSubmit={this.handleFormSubmit}>
                            <Col>
                                <FormControl>
                                    <TextField 
                                        value={name} 
                                        type='text' 
                                        id='user-name'
                                        name='name'
                                        onChange={this.handleInputChange}
                                        className='name-input'
                                        label="Enter your name"
                                    />
                                </FormControl>
                            </Col>
                        </Row>
                        
                        {this.state.name.trim() !== ''?
                        <div className='screen-end-container'>
                            <Button 
                                className='pointer no-border-radius' 
                                variant='contained' 
                                color='primary' 
                                type='submit'
                                onClick={this.handleFormSubmit} 
                                fullWidth>
                                Enter
                            </Button>
                        </div>: null}
                    </Form>
                    <Row className='mt-4 variable-margin-top-minor'>
                            <Col className='col-10 mx-auto py-2'>
                                <Row className='center-row'>
                                    <Col className='col-8 mr-3'>
                                            <TextField
                                                label={this.props.referredBy ? 'Referred By' : ''}
                                                // variant='outlined'
                                                value={this.props.referredBy ? this.props.referredBy : this.state.referCode}
                                                onChange={this.handleInputChange}
                                                name='referCode'
                                                // className='small py-2'
                                                placeholder='Referal Code'
                                                readOnly={this.state.message === 'Referral Code Successfull' || this.props.referralVerified}
                                                // style={{
                                                //     border:'1px solid grey'
                                                // }}
                                            />
                                    </Col>
                                    <Col style={{opacity: this.state.referCode.trim().length === 0 ? 0.7 : 1}}>
                                        {this.state.checkingReferCode ? <CircularProgress color='primary' size='1em' /> : this.state.message !== 'Referral Code Successfull' && !this.props.referralVerified ? <Button color='primary' onClick={this.checkingReferralCode.bind(this)} disabled={this.state.referCode.trim().length === 0}>Apply</Button> : <span>Verified</span> }
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    <Row className='left-col'>
                        <Col>
                            <Image src={require('../../assets/images/svg/grid_pvot.svg')} />
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Dialog 
                open={this.state.message === 'Invalid Referral Code'}
                onClose = {() => this.setState({message:''})}
            >
                <span className='p-3'>Invalid referral code</span>
            </Dialog>
        </>
        )
    }
}
const mapStateToProps = (state) =>{
    return{
        signinData: state.auth.signinData,
        userGroup: state.auth.userGroup,
        message: state.auth.message,
        referralVerified: state.user.referralVerified,
        referredBy: state.user.referredBy
    }
}
const mapDispatchtoProps = (dispatch) => {
    return{
        updateName: (namePayload) => dispatch(actions.updateName(namePayload)),
        checkReferralCode: (payload) => dispatch(actions.checkReferralCode(payload))
    }
}
export default connect(mapStateToProps, mapDispatchtoProps)(withRouter(UserName))
