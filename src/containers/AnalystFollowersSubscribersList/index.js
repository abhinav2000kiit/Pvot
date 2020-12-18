import React from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import Header from '../components/Header/customHeader'
import * as actions from '../../redux/actions'
import {Row, Col, Image} from 'react-bootstrap'
import {CircularProgress} from '@material-ui/core'
import moment from 'moment'


function FollowerCard(props){
    return (
        <Row className='py-3 px-2' style={{borderBottom: '1px solid grey'}}>
            <Col>{props.trader.name}</Col>
            <Col style={{display: 'flex', alignItems: 'center'}}>
                <div style={{width: '20px', height: '20px', borderRadius: '10px', backgroundColor: props.riskProfile < 3.3 ? 'skyblue' : props.riskProfile < 6.6 ? 'yellow' : 'red' }}></div>
                <span className='ml-2'>{props.riskProfile < 3.3 ? 'Low Risk' : props.riskProfile < 6.6 ? 'Moderate Risk' : 'Aggresive Risk'}</span>
            </Col>
        </Row>
    )
}
function SubscriberCard(props){
    return (
        <Row className='py-3 px-2' style={{borderBottom: '1px solid grey'}}>
            <Col>
                <Row style={{display: 'flex', alignItems: 'center'}}>
                    <Col className='col-2'>
                        <Image roundedCircle width='100%' src={props.trader.profile_picture ? props.trader.profile_picture : require('../../assets/images/jpeg/placeholder.jpg')} />
                    </Col>
                    <Col className='col-10 mt-3' style={{display: 'flex', alignItems: 'center'}}>
                        <p>{props.trader.name}</p>
                    </Col>
                </Row>
                <Row className='mt-2'>
                    <Col>
                        <Row>
                            <Col>
                                <p className='small m-0 mb-1'>Plan ID: {props.planId}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <p className='small m-0 mb-1'>Start Date: {props.subscription_start_date ? moment(props.subscription_start_date).format('DD/MM/YYYY') : null}</p>
                            </Col>
                            <Col>
                                <p className='small m-0 mb-1'>End Date: {props.subscription_end_date ? moment(props.subscription_end_date).format('DD/MM/YYYY') : null}</p>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

class List extends React.Component{
    constructor(props){
        super(props)
    }
    componentDidMount(){
            this.props.getFollowers()
            this.props.getSubscribers()
    }
    render(){
        let followerCards = this.props.followers ? this.props.followers.map((item, idx) => <FollowerCard key={idx} trader={item.trader} riskProfile = {item.trader_risk_profiling_score} />) : null;
        let subscriberCards = this.props.subscribers ? this.props.subscribers.map((item, idx) => <SubscriberCard key={idx} trader={item.trader} subscription_start_date = {item.subscription_start_date} subscription_end_date = {item.subscription_end_date} planId={item.subscription_plan.plan_id} />) : null
        return (
            <React.Fragment>
                <Header title={this.props.location.state.list} backButton={true} />
                <Row>
                    <Col>
                        {this.props.location.state.list==='Followers' ?
                            followerCards ? followerCards.length>0 ? followerCards : <center className='mt-3'>You have no followers!</center> : <center className='mt-3'><CircularProgress color='primary' /></center>:
                            subscriberCards ? subscriberCards.length>0 ? subscriberCards : <center className='mt-3'>You have no subscribers!</center> : <center className='mt-3'><CircularProgress color='primary' /></center>}
                    </Col>
                </Row>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        followers : state.analyst.followers,
        subscribers: state.analyst.subscribers
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getFollowers : () => dispatch(actions.getAnalystFollowers()),
        getSubscribers: () => dispatch(actions.getAnalystSubscribers())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(List))