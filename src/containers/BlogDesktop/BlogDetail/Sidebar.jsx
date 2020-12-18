import React from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { CircularProgress } from '@material-ui/core'
import { Row, Col, Image } from 'react-bootstrap'
import * as actions from '../../../redux/actions'
import { Link } from 'react-router-dom'

function Sidebar(props) {
    const recommended = props.blogDetail ? props.blogDetail.recommended : null
    return (
        recommended
        ?   <Row>
                <Col>
                    <h5 className='text-center'><u>Insights our readers are loving!</u></h5>
                    {recommended.map((item, idx) => (
                        <Link key={idx} to={`/blog/${item.id}`}>
                            <Row  className='mt-3 pointer'>
                                <Col className='border-bottom'>
                                    <Image className='img-fluid' src={item.header_image} />
                                    <p className='small center-row-between mt-2'>
                                        <span>{item.tags[0].toUpperCase()}</span>
                                        <span>{item.reading_time} MIN READ</span>
                                    </p>
                                    <h5 className='mt-2 pb-2'>{item.heading}</h5>
                                    <p>{item.description}</p>
                                </Col>
                            </Row>
                        </Link>
                    ))}
                </Col>
            </Row>
        : <center><CircularProgress /></center>
    )
}


const mapStateToProps = state => ({
    blogDetail: state.user.blogDetail
})

const mapDispatchToProps = dispatch => ({
    getBlogDetail: (id) => dispatch(actions.getBlogDetail(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Sidebar))