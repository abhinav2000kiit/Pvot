import React, { Component } from 'react'
import {Button} from '@material-ui/core'
import { Row, Col, Image} from 'react-bootstrap'
import Preference from './Preference'
import {connect} from 'react-redux'
import * as actions from '../../redux/actions' 
import CircularProgress from '@material-ui/core/CircularProgress';
import {withRouter} from 'react-router-dom'

export class AnalystInterestsList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            interests: null,
            newselected: [],
            prevselected: [],
            isLoading: true
        }
        this.preferenceSelected = this.preferenceSelected.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleSkip = this.handleSkip.bind(this)
    }
    componentDidMount(){
        this.props.getPreferences()
    }
    preferenceSelected(preference_id, action){
        if (action==='add'){
            this.setState(previousState => ({
                newselected: [...previousState.newselected, preference_id]
            }));
        }else if(action==='remove'){
            let rm = this.state.newselected.filter(i=> i !== preference_id)
            this.setState({
                newselected: rm
            })
        }
    }
    handleSkip(e){
        this.props.history.push('/user/user-home')
    }
    handleSubmit(e){
        e.preventDefault()
        const payloads = {
            selected_preference_ids:this.state.newselected,
            previous_preference_ids: this.state.prevselected
        }
        console.log(payloads)
        this.props.setPreferences(payloads, '/user/user-home');
    }
    componentDidUpdate(){
        if (this.state.isLoading && this.props.userPreferencesDataAll !== null){
            const {userPreferencesDataAll, userPreferencesDataSelected} = this.props
            let interestsList = userPreferencesDataAll.map(item => <Preference key={item.id} id={item.id} preference={item.name} selected={item.selected} preferenceSelected={this.preferenceSelected} /> )
            this.setState({
                isLoading: false,
                interests: interestsList,
                newselected: this.props.userPreferencesDataSelected,
                prevselected: this.props.userPreferencesDataSelected
            })
        }
    }
    render() {
        const {interests, newselected,prevselected, isLoading} = this.state ;       
        console.log(newselected, prevselected)
        const name = this.props.signinData.user.UserAttributes[2]['Value'].split(" ")
        return (
                <Row className='parent p-2'>
                    <Col className='content-holder'>
                        <Row className='variable-margin-top-minor'>
                            <Col className='right-col'>
                                <div className='one-six-black-light' onClick={this.handleSkip}>
                                    <u>Skip</u>
                                </div>
                            </Col>
                        </Row>
                        <Row className='variable-margin-top-minor'>
                            <Col>
                                <Row className='greetings'>
                                    <Col>
                                        <div className='forgot-sub-heading'>Hey {name[0]}!</div>
                                        <small>Pick at least 3 trading topics you’re interested in. We’ll show you interesting posts on these. </small>
                                    </Col>
                                </Row>
                                <Row id='interests-list'>
                                    {isLoading? <Col className='center-col mt-3'><CircularProgress name='circle' color='primary' /></Col> :interests}
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                    {newselected.length >=3?
                        <div className='screen-end-container variable-margin-top-minor'>
                            <Button
                                className='no-border-radius'
                                color='primary'
                                variant='contained'
                                fullWidth
                                onClick={this.handleSubmit}
                                type='submit'
                            >
                                Next
                            </Button>
                        </div>: null}
                </Row>
        )
    }
}

const mapStateToProps = (state)=>{
    return{
        signinData: state.auth.signinData,
        userPreferencesDataAll: state.user.userPreferencesDataAll,
        userPreferencesDataSelected: state.user.userPreferencesDataSelected
    }
}
const mapDispatchToProps = (dispatch) =>{
    return {
        getPreferences: () => dispatch(actions.getPreferences()),
        setPreferences: (payloads, url) => dispatch(actions.setPreferences(payloads, url))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AnalystInterestsList))