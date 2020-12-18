import React, { Component } from 'react'
import {Button} from '@material-ui/core'
import { Row, Col, Image} from 'react-bootstrap'
import Preference from './Preference'
import {connect} from 'react-redux'
import * as actions from '../../../redux/actions' 
import CircularProgress from '@material-ui/core/CircularProgress';
import {withRouter} from 'react-router-dom'

import { Mixpanel } from '../../../shared/mixPanel'

export class UserPreferencesList extends Component {
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
        Mixpanel.track('Preferences page visited - Investor');
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
        this.props.closeLowerScreen()
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
                <div className='lower-screen small'>
                    <div className='lower-screen-header'>
                        <span>My Preferences</span>
                    </div>
                    <div className='lower-screen-content'>
                        <Row>
                            <Col>
                                <div className='lower-screen-sub-heading'>
                                    <p style={{width: '24px'}}></p>
                                    <p>Pick at least 3 trading topics you’re interested in. We’ll show you interesting posts on these. </p>
                                    <Image  onClick={this.props.closeLowerScreen} src={require('../../../assets/images/svg/close-icon.svg')} className='close' />
                                </div>
                            </Col>
                        </Row>
                        <Row className=''>
                            <Col>
                                <Row>
                                    {isLoading? <Col className='center-col mt-3'><CircularProgress name='circle' color='primary' /></Col> :interests}
                                </Row>
                            </Col>
                        </Row>
                        <Row className=' small center-row mt-3'>
                            <button className='cancel' disabled={newselected.length>=3?false:true} style={{opacity:newselected.length>=3?1:0.6}}>Cancel</button>
                            <button className='ml-2 save' onClick={this.handleSubmit} disabled={newselected.length>=3?false:true} style={{opacity:newselected.length>=3?1:0.6}}>Save</button>
                        </Row>
                    </div>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserPreferencesList))