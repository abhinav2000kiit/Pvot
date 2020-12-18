import React, { Component, Fragment } from 'react'
import {Row, Col, Image, Button} from 'react-bootstrap'
import { FormControl, Radio, RadioGroup, FormControlLabel } from '@material-ui/core'
import './RiskProfile.css'
import * as actions from '../../redux/actions'
import {connect} from 'react-redux'
import {CircularProgress, LinearProgress, Snackbar} from '@material-ui/core'
import ClearRoundedIcon from '@material-ui/icons/ClearRounded';

import { Mixpanel } from '../../shared/mixPanel'

export class RiskProfile extends Component {
    constructor(props){
        super(props)
        this.state = {
            ques_no: 1,
            questions: this.props.riskProfileQuestions ? this.props.riskProfileQuestions : null,
            answers: this.props.riskProfileAnswers ? this.props.riskProfileAnswers: [] ,
            showResult: this.props.signinData.user.UserAttributes.filter(item => item.Name === 'custom:risk_profiling_score').length? true : false,
            isLoading: this.props.riskProfileQuestions ? false : true,
            resultsLoading:this.props.signinData.user.UserAttributes.filter(item => item.Name === 'custom:risk_profiling_score').length ? false : true,
            score: this.props.signinData.user.UserAttributes.filter(item => item.Name === 'custom:risk_profiling_score').length ? this.props.signinData.user.UserAttributes.filter(item => item.Name === 'custom:risk_profiling_score')[0].Value : null,
            openSnackbar: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.nextQuestion = this.nextQuestion.bind(this)
        this.prevQuestion = this.prevQuestion.bind(this)
        this.sendResults = this.sendResults.bind(this)
    }
    componentDidUpdate(){
        const {isLoading} = this.state
        if(isLoading && this.props.riskProfileQuestions){
            this.setState({
                questions: this.props.riskProfileQuestions,
                isLoading: false
            })
        }
        if(this.props.signinData.user.UserAttributes.filter(item => item.Name === 'custom:risk_profiling_score').length && this.state.resultsLoading){
            this.setState({
                score: this.props.signinData.user.UserAttributes.filter(item => item.Name === 'custom:risk_profiling_score')[0].Value,
                resultsLoading: false
            })
        }
        if(this.props.signinData.user.UserAttributes.filter(item => item.Name === 'custom:risk_profiling_score').length && this.props.signinData.user.UserAttributes.filter(item => item.Name === 'custom:risk_profiling_score')[0].Value !== this.state.score){
            this.setState({
                score: this.props.signinData.user.UserAttributes.filter(item => item.Name === 'custom:risk_profiling_score')[0].Value,
                resultsLoading: false
            })
        }
        if(this.state.answers.length === 0 && this.state.answers !== this.props.riskProfileAnswers){
            this.setState({
                answers: this.props.riskProfileAnswers
            })
        }
    }
    componentDidMount(){
        Mixpanel.track('Risk Profile page visited - Investor');
        if(this.state.questions === null){
            this.props.getRiskProfileQuestions()
        }
    }
    nextQuestion(e){
        this.setState(prevState => ({
            ques_no: prevState.ques_no +1
        }))
    }
    prevQuestion(e){
        this.setState(prevState => ({
            ques_no: prevState.ques_no -1
        }))
    }
    handleChange(e, id){
        console.log(id)
        let answers = this.state.answers
        if(answers.filter(item=> item.question_id === id).length){
            answers.filter(item=> item.question_id === id)[0].answer = e.target.value
        }else{
            answers.push({
                question_id: id,
                answer: e.target.value
            })
        }
        this.setState({
            answers
        }, ()=> console.log('answers', this.state.answers))
    }
    sendResults(){
        let payload = {
            risk_profiling: this.state.answers
        }
        this.props.sendRiskProfileAnswers('/api/investor/risk-profiling', payload)
        this.setState({
            showResult: true
        })
    }
    render() {
        const {questions, ques_no} = this.state
        if(questions && (ques_no <= questions.length)){
            var ques = questions[ques_no-1]
            var ans = this.state.answers.find(item => item.question_id === ques.id) ? this.state.answers.find(item => item.question_id === ques.id).answer : null 
            console.log(ans)
        }
        return (
            <div className='lower-screen'>
                <div className='lower-screen-header'>
                    <span>My Risk Profile</span>
                </div>
                <div className='lower-screen-content small'>
                    {!this.state.showResult ? this.state.isLoading ? 
                        <Fragment>
                            <Row>
                                <Col>
                                    <div className='lower-screen-sub-heading'>
                                        <p style={{width: '24px'}}></p>
                                        <Image  onClick={this.props.closeLowerScreen} src={require('../../assets/images/svg/close-icon.svg')} className='close' />
                                    </div>
                                </Col>
                            </Row>
                            <Row className='center-row'> <CircularProgress color='primary' /> </Row>
                        </Fragment>
                    :
                    (ques_no <= questions.length) ?
                        (<div>
                    <Row>
                        <Col>
                            <div className='lower-screen-sub-heading'>
                                <p style={{width: '24px'}}></p>
                                <p>Help us assess your risk tolerance</p>
                                <Image  onClick={this.props.closeLowerScreen} src={require('../../assets/images/svg/close-icon.svg')} className='close' />
                            </div>
                        </Col>
                    </Row>
                        <Row className='mt-3'>
                            <Col>
                                <Row>
                                    <Col className='col-2 right-col'>Q. {ques_no}</Col>
                                    <Col className='col-10'>{ques.question}</Col>
                                </Row>
                                <RadioGroup value={this.state.answers.find(item => item.question_id === ques.id) ? this.state.answers.find(item => item.question_id === ques.id).answer : null} onChange={(e) => this.handleChange(e, ques.id)}>
                                <Row className='mt-3'>
                                    <Col className='offset-2'>
                                        <FormControlLabel    value={ques.options[0]} control={<Radio color='primary'/>} label={ques.options[0]} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className='offset-2'>
                                        <FormControlLabel    value={ques.options[1]} control={<Radio color='primary'/>} label={ques.options[1]} />
                                    </Col>
                                </Row>
                                <Row className=''>
                                    <Col className='offset-2'>
                                        <FormControlLabel    value={ques.options[2]} control={<Radio color='primary'/>} label={ques.options[2]} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className='offset-2'>
                                        <FormControlLabel  value={ques.options[3]} control={<Radio color='primary'/>} label={ques.options[3]} />
                                    </Col>
                                </Row>
                                </RadioGroup>
                            </Col>
                        </Row>
                        <Row className='mt-3 center-row'>
                            <Col className='left-col col-2' onClick={this.prevQuestion}>
                                {ques_no>1 ? <Image style={{transform: 'rotate(180deg)'}}  src={require('../../assets/images/svg/right_angle.svg')} /> : null}
                            </Col>
                            <Col className='col-8'>
                                <div style={{height: '4px', width:'100%', borderRadius: '2px',backgroundColor:'#ccc'}}>
                                    <div style={{height:'4px', width: ((ques_no)*100)/questions.length + '%',borderRadius: '2px', transition: 'width 0.2s ease-in-out', backgroundColor:'#2962FF'}}></div>
                                </div>
                            </Col>
                            <Col className='right-col col-2' onClick={this.state.answers.find(item => item.question_id === ques.id) ? this.nextQuestion : null}>
                                <Image src={require('../../assets/images/svg/right_angle.svg')}  style={{opacity: this.state.answers.find(item => item.question_id === ques.id) ? 1 : 0.3}} />
                            </Col>
                        </Row>
                        </div>)
                    :(
                        <Row>
                            <Col>
                                <Row>
                                    <Col>
                                        <div className='lower-screen-sub-heading'>
                                            <p style={{width: '24px'}}></p>
                                            <p>Your Risk Profiling is almost done</p>
                                            <Image  onClick={this.props.closeLowerScreen} src={require('../../assets/images/svg/close-icon.svg')} className='close' />
                                        </div>
                                    </Col>
                                </Row>
                                <Row className='mt-2'>
                                    <Col>
                                        <center>Choose to proceed</center>
                                    </Col>
                                </Row>
                                <Row className='mt-4'>
                                    <Col className='right-col'>
                                        <button className='cancel col py-2' onClick={(e)=> this.setState({ques_no: 1, showResult: false, resultsLoading: true})}>Edit Answers</button>
                                    </Col>
                                    <Col className='left-col'>
                                        <button onClick={this.sendResults} className='save col py-2'>Save & Continue</button>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    ): <div>
                        {this.state.resultsLoading ? <Row>
                            <Col>
                                <div className='lower-screen-sub-heading'>
                                    <p style={{width: '24px'}}></p>
                                    <CircularProgress color='primary' />
                                    <Image  onClick={this.props.closeLowerScreen} src={require('../../assets/images/svg/close-icon.svg')} className='close' />
                                </div>
                            </Col>
                        </Row> :
                        <div>
                            <Row>
                                <Col>
                                    <div className='lower-screen-sub-heading'>
                                        <p style={{width: '24px'}}></p>
                                        <p>Your risk profile score is</p>
                                        <Image  onClick={this.props.closeLowerScreen} src={require('../../assets/images/svg/close-icon.svg')} className='close' />
                                    </div>
                                </Col>
                            </Row>
                            <Row >
                                <Col>
                                    <center className='small color-blue'>{this.state.score < 3.3? 'Conservative' : this.state.score<6.6 ? 'Moderate' : 'Aggresive'} <Image src={require('../../assets/images/svg/tick.svg')} /></center>
                                </Col>
                            </Row>
                            <Row className='mt-4'>
                                <Col className='col-8 offset-2'>
                                    <LinearProgress variant="determinate" value={this.state.score*10} />
                                </Col>
                            </Row>
                            <Row className='mt-1'>
                                <Col className='col-10 offset-1'>
                                    <Row>
                                        <Col className='left-col smaller'>Low</Col>
                                        <Col className='center-col smaller'>Risk Appetite</Col>
                                        <Col className='right-col smaller'>High</Col>
                                    </Row>
                                </Col>
                            </Row>
                            <Row className='mt-3'>
                                <Col>
                                    <center className='small'><button className='cancel' onClick={(e)=> {
                                        Mixpanel.track('Re-take Quiz Button Clicked - Investor');
                                        this.setState({ques_no: 1, showResult: false, resultsLoading: true})}}>Re-take quiz</button></center>
                                </Col>
                            </Row>
                        </div>
                    }</div>}
                    <div style={{position: 'relative'}}>
                        <div className='check-parent'>
                            <div className='chat-bubble p-2 pb-4 smaller' style={{display: this.state.openSnackbar ? 'flex': 'none', opacity: this.state.openSnackbar ? '1': '0'}}>
                                <Image src={require('../../assets/images/svg/high-voltage.svg')}  style={{width: '48px', marginRight: '4%'}} />
                                <span>Your risk profile score can guide you on what investing or trading decision to choose. Generally speaking, a conservative and a balanced risk profile investor may avoid trading in derivative markets.</span>
                                <Image  onClick={() => this.setState({openSnackbar: false})} src={require('../../assets/images/svg/close-icon.svg')} className='close' style={{marginLeft: '4%'}} />
                            </div>
                        </div>
                        <Row className='mt-3 center-row' onClick={()=> this.setState({openSnackbar: true})}><Image src={require('../../assets/icons/svg/info-icon.svg')} width='14px' />Why does Pvot need this info?</Row>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    signinData: state.auth.signinData,
    riskProfileQuestions: state.user.riskProfileQuestions,
    riskProfileAnswers: state.user.riskProfileAnswers,
})
const mapDispatchToProps = (dispatch)=>({
    getRiskProfileQuestions : ()=> dispatch(actions.getRiskProfileQuestions()),
    sendRiskProfileAnswers : (url,results) => dispatch(actions.sendRiskProfileAnswers(url,results))
})

export default connect(mapStateToProps, mapDispatchToProps)(RiskProfile)
