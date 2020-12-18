import React from 'react'
import { Row, Col, Image } from 'react-bootstrap'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { CircularProgress} from '@material-ui/core'
import * as actions from '../../../redux/actions'
import LikeSection from '../LikeSection'
import CommentSection from './CommentSection'
import moment from 'moment'

function Blog(props) {
    const blog = props.blogDetail ? props.blogDetail.blog : null
    return (
        blog && parseInt(props.match.params.id) === parseInt(blog.id)
        ?   <Row>
                <Col className='col-12'>
                    <Image className='img-fluid banner-image' src={blog.header_image} />
                    <p className='mt-3 center-row-between'><span>{blog.reading_time} MIN. READ</span><span>{moment(blog.created_date).format('DD/MM/YYYY')}</span></p>
                    <h2>{blog.heading}</h2>
                    <div className='content text-justify' dangerouslySetInnerHTML={{__html: blog.content}}></div>
                    <Row className='mt-3'>
                        {blog.tags.map((item, idx) => <Link to={`/blogs#${item.tag}`} key={idx} className='tag'>{item.tag}</Link>)}
                    </Row>
                    <div className='mt-3'>
                        <LikeSection likes_blog={blog.likes_blog} likes={blog.total_likes} id={blog.id} comments={props.blogComments ? props.blogComments.length : blog.total_comments } />
                    </div>
                </Col>
                <Col className='col-12'>
                    <CommentSection />
                </Col>
            </Row> 
        : <center className='mt-5'><CircularProgress /></center>     
    )
}

const mapStateToProps = state => ({
    blogDetail: state.user.blogDetail,
    blogComments: state.user.blogComments
})

const mapDispatchToProps = dispatch => ({
    getBlogDetail: (id) => dispatch(actions.getBlogDetail(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Blog))