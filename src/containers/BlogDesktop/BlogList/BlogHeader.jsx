import React from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { Row, Col, Image } from 'react-bootstrap'
import { CircularProgress } from '@material-ui/core'
import { BlogCard } from './BlogCard'

function BlogHeader(props) {
    return (
        props.blogList && props.blogList.mostLiked
        ?   props.blogList.mostLiked.length > 0
        ?
        <Row>
                <Col className='col-9 pointer' onClick={() => props.history.push(`/blog/${props.blogList.mostLiked[0].id}`)}>
                    <Image src={props.blogList.mostLiked[0].header_image} className='img-fluid banner-image'/>
                    <Row className='banner-text'>
                        <Col></Col>
                        <Col className='col-6 bg'>
                            <p className='small'>{props.blogList.mostLiked[0].reading_time} MIN. READ</p>
                            <h2>{props.blogList.mostLiked[0].heading}</h2>
                            <p>{props.blogList.mostLiked[0].description}</p>
                        </Col>
                    </Row>
                </Col>
                <Col className='sidebar'>
                    <h5 className='mb-3'><u>More Insights!</u></h5>
                    {props.blogList.mostLiked.slice(1,6).map((item, idx) => (
                        <Row key={idx} className='mt-3 pointer' onClick={() => props.history.push(`/blog/${item.id}`)}>
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
                    )
                    )}
                </Col>
        </Row>
        : <center className='mt-3'>No Blogs!</center>
        :null
    )
}

const mapStateToProps = state => ({
    blogList: state.user.blogList
})

export default connect(mapStateToProps)(withRouter(BlogHeader))
