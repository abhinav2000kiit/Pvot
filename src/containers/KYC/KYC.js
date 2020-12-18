import React, { Component } from 'react'
import './KYC.css'
import {Row, Col, Image} from 'react-bootstrap'
import AadhaarCardForm from '../AadhaarCardForm'
import PanCardForm from '../PanCardForm'
import {connect} from 'react-redux'
import * as actions from '../../redux/actions'
import {Snackbar} from '@material-ui/core'

class KYC extends Component {
    constructor(props){
        super(props)
        this.state = {
            panNumber: this.props.signinData &&
            this.props.signinData.user.UserAttributes.filter(item => item.Name === 'custom:pan_card')[0] && this.props.signinData.user.UserAttributes.filter(item => item.Name === 'custom:pan_card')[0].Value,
            aadhaarNumber: this.props.signinData &&
            this.props.signinData.user.UserAttributes.filter(item => item.Name === 'custom:aadhaar')[0] && this.props.signinData.user.UserAttributes.filter(item => item.Name === 'custom:aadhaar')[0].Value,
            openSnackbar: false
        }
        this.getPanNumber = this.getPanNumber.bind(this)
        this.getAadhaarNumber = this.getAadhaarNumber.bind(this)
        this.sendData = this.sendData.bind(this)
    }
    getPanNumber(panNumber){
        this.setState({
          panNumber
        }, ()=> console.log(panNumber))
    }
    getAadhaarNumber(aadhaarNumber){
        this.setState({
          aadhaarNumber
        }, ()=> console.log(aadhaarNumber))
    }
    sendData(){
        const {aadhaarNumber, panNumber} = this.state
        console.log(aadhaarNumber, panNumber)
        this.props.setKYCDetails({
            AccessToken: this.props.signinData.token.AuthenticationResult.AccessToken,
            UserAttributes: [
                {
                    Name: "custom:aadhaar",
                    Value: aadhaarNumber
                },
                {
                    Name: "custom:pan_card",
                    Value: panNumber
                }
            ]
        })
        this.props.closeLowerScreen()
        // this.props.closeLowerScreen()
    }
    render() {
        return (
            <div className='lower-screen'>
                <Row className='lower-screen-header'>
                <Col>KYC</Col>
                </Row>
                <div className='lower-screen-content'>
                    <Row>
                        <Col>
                            <div className='lower-screen-sub-heading'>
                                <p style={{width: '24px'}}></p>
                                <p>{(this.state.aadhaarNumber && this.state.aadhaarNumber.length===12) && (this.state.panNumber && this.state.panNumber.length === 10) ? 'Your details are complete. Tap to edit.' : 'Enter your details below'}</p>
                                <Image onClick={this.props.closeLowerScreen} src={require('../../assets/images/svg/close-icon.svg')} className='close' />
                            </div>
                        </Col>
                    </Row>
                    <Row className='small mt-2 center-row'><span>PAN CARD</span> {this.state.panNumber && this.state.panNumber.length === 10? <Image className='ml-2' src={require('../../assets/images/svg/tick.svg')} /> : null}</Row>
                    <Row className='mt-3'>
                        <Col className='center-col'>
                            <center className=''><PanCardForm setValue={this.state.panNumber} sendPanNumber={this.getPanNumber}/></center>
                        </Col>
                    </Row>
                    <Row className='mt-4 small center-row'><span>AADHAAR CARD</span> {this.state.aadhaarNumber && this.state.aadhaarNumber.length === 12? <Image className='ml-2' src={require('../../assets/images/svg/tick.svg')} /> : null}</Row>
                    <Row className='mt-3'>
                        <Col>
                            <center><AadhaarCardForm setValue={this.state.aadhaarNumber} sendAadhaarNumber={this.getAadhaarNumber} /></center>
                        </Col>
                    </Row>
                    <Row>
                        <div className='lower-screen-action small center-row mt-4'>
                            <button className='cancel' onClick={this.props.closeLowerScreen} disabled={(this.state.aadhaarNumber && this.state.aadhaarNumber.length===12) && (this.state.panNumber && this.state.panNumber.length === 10)?false: true} style={{opacity: (this.state.aadhaarNumber && this.state.aadhaarNumber.length===12) && (this.state.panNumber && this.state.panNumber.length === 10)? 1: 0.6}}>Cancel</button>
                            <button className='ml-2 save' onClick={this.sendData} disabled={(this.state.aadhaarNumber && this.state.aadhaarNumber.length===12) && (this.state.panNumber && this.state.panNumber.length === 10)?false: true} style={{opacity: (this.state.aadhaarNumber && this.state.aadhaarNumber.length===12) && (this.state.panNumber && this.state.panNumber.length === 10)? 1: 0.6}}>Save</button>
                        </div>
                    </Row>
                    <Row className='mt-3 center-row' onClick={()=> this.setState({openSnackbar: true})}><Image src={require('../../assets/icons/svg/info-icon.svg')} width='14px' />Why does Pvot need this info?</Row>
                </div>
                <Snackbar
                    open={this.state.openSnackbar}
                    onClose={()=> this.setState({openSnackbar: false})}
                    TransitionComponent= 'SlideTransition'
                    autoHideDuration='6000'
                    message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pharetra ac velit et facilisis. Donec accumsan nisl sit amet velit maximus molestie. Curabitur consequat elit vitae arcu bibendum porttitor. Fusce dignissim a est id viverra. Phasellus finibus erat non pellentesque semper. Nulla facilisi. Donec posuere purus ut felis consequat viverra. "
                />
            </div>
        )
    }
}
const mapStateToProps = (state)=>({
    signinData: state.auth.signinData,
    
})
const mapDispatchToProps = (dispatch)=>({
    setKYCDetails: (KYCPayload) => dispatch(actions.setKYCDetails(KYCPayload))
})
export default connect(mapStateToProps, mapDispatchToProps)(KYC)
