import React from 'react'
import { Row, Col } from 'react-bootstrap'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import BlogCard from './BlogCard'

export default function BlogTag({ data }) {
    return (
        <Row className='my-5'>
            <Col className='col-12 my-3'>
                <h3><span className='border-bottom' id={data.tag}>{data.tag}</span></h3>
            </Col>
            <Col className='col-12 mt-2'>
                <Carousel responsive={{desktop:{breakpoint:{max:4000, min:0}, items: 4, slidesToSlide: 2}}} showDots >
                    {data.blogs.map((blog, idx) => <BlogCard key={idx} blog={blog} />)}
                </Carousel>
            </Col>
        </Row>
    )
}
