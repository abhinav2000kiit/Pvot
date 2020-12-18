import React from 'react'
import { Row, Col, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import LikeSection from '../LikeSection'


export default function BlogCard({blog}) {
    return (
        
            <Row className='mx-5 mb-5'>
                <Col>
                <Link to={`blog/${blog.id}`}>
                    <Image src={blog.header_image} className='img-fluid' />
                    <p className='small mt-2'>{blog.reading_time} MIN. READ</p>
                    <h4 className='mt-2'>{blog.heading}</h4>
                    <p>{blog.description}</p>
                </Link>
                    <LikeSection likes_blog={blog.likes_blog} likes={blog.total_likes} id={blog.id} comments={blog.total_comments} />
                </Col>
            </Row>
    )
}
