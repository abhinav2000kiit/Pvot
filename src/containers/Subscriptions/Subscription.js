import React, { Component } from 'react'
import {Row, Col, Image} from 'react-bootstrap'
import moment from 'moment'

export class Subscription extends Component {
    render() {
        console.log('====', this.props.data)
        return (
            <Row className='mt-2 pb-3' style={{borderBottom: '1px solid grey'}}>
                <Col>
                    <Row>
                        <Col>
                            <Col className='small mb-3'>{this.props.data.segment.name}</Col>
                            <Row>
                                <Col>
                                    <span className='smaller'>Start Date: {moment(this.props.data.subscription_start_date).format('DD/MM/YYYY') }</span>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <span className='smaller'>End Date: {moment(this.props.data.subscription_end_date).format('DD/MM/YYYY') }</span>
                                </Col>
                            </Row>
                        </Col>
                        <Col>
                        <p><Image width='20px' height='20px' src={this.props.data.analyst.profile_pic ? this.props.data.analyst.profile_pic : require('../../assets/images/jpeg/placeholder.jpg')} roundedCircle /> {this.props.data.analyst.name}</p>
                            <Row>
                                <Col className='smaller'>Amount:  {this.props.data.amount}</Col>
                            </Row>
                            <Row>
                                <Col className='smaller'>Validity: {(moment(this.props.data.subscription_end_date) - moment(this.props.data.subscription_start_date))/(1000*3600*24) } days</Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className='smaller mt-2 col' style={{opacity: 0.8}}>
                        <Col>
                            Transaction Id: {this.props.data.record_id}
                        </Col>
                    </Row>
                </Col>
            </Row>
        )
    }
}

export default Subscription
