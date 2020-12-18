import React from 'react'
import { Row, Col, Image } from 'react-bootstrap'
import Header  from '../components/Header/customHeader'
import * as actions from '../../redux/actions'
import { connect } from 'react-redux'
import { CircularProgress } from '@material-ui/core'
import {withRouter} from 'react-router-dom'
import BlogCard from './BlogCard'
import './index.scss'

function Blog(props) {
    React.useEffect(()=>{
        props.getBlogList()
    }, [])
    
    return (
        <div className='parent'>
            <Header title='Blogs' backButton backTo={() => props.history.push('/')}/>
            <Row className='mt-3 px-2'>
                <Col>
                    {props.blogList
                    ? props.blogList.length > 0
                        ?
                        props.blogList.map(item => 
                            <BlogCard key={item.id} data={item} />
                        )
                        : <p className='text-center'>No Blogs!</p>
                    :<Row className='mt-3'><Col className='text-center'><CircularProgress color='primary' /></Col></Row>}
                </Col>
            </Row>
           
        </div>
    )
}

const mapStateToProps = state => ({
    blogList: state.user.blogList
})

const mapDispatchToProps = dispatch => ({
    getBlogList: () => dispatch(actions.getBlogList())
})

export default connect(mapStateToProps, mapDispatchToProps)(Blog)