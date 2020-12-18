import React from 'react'
import { Row, Col, Image } from 'react-bootstrap'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import * as actions from '../../../redux/actions'
import BlogHeader from './BlogHeader'
import { CircularProgress } from '@material-ui/core'
import BlogTag from './BlogTag'
import '../BlogDesktop.scss'


function BlogList(props) {
    React.useEffect(()=>{
        props.getBlogList()
    }, [])
    return (
        props.blogList
        ?  <Row style={{padding: '0 4%'}}>
            <Col>
                <Row className='mt-4' >
                    <Col>
                        <BlogHeader />                
                    </Col>
                </Row>
                {props.blogList && props.blogList.tags && props.blogList.tags.map((item, idx) => item.blogs.length > 0 ? <BlogTag data={item} key={idx} /> : null)}
            </Col>
            </Row>
        : <center className='mt-3'><CircularProgress /></center>
    )
}

const mapStateToProps = state => ({
    blogList: state.user.blogList
})
const mapDispatchToProps = dispatch => ({
    getBlogList: () => dispatch(actions.getBlogListDesktop())
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(BlogList))