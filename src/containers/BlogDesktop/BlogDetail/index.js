import React from 'react'
import { Row, Col } from 'react-bootstrap'
import '../BlogDesktop.scss'
import Blog from './Blog'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import * as actions from '../../../redux/actions'
import { CircularProgress, Dialog, Button } from '@material-ui/core'
import Sidebar from './Sidebar'

function BlogDetail(props) {
    React.useEffect(()=>{
        props.getBlogDetail(props.match.params.id)  
    }, [props.match])
    return (
        !props.blogMessage
        ?props.blogDetail 
        ?   <Row className='mt-3' style={{padding: '0 4%'}}>
                <Col className='col-9'>
                    <Blog />
                </Col>
                <Col className='col-3 sidebar'>
                    <Sidebar />
                </Col>
            </Row>
        :   <center className='mt-3'><CircularProgress /></center>
        : <Dialog open={true} onClose={() => {
            props.resetBlogMessage()
            props.history.push('/blogs')
        }}>
            <Row className='px-5 py-2'>
                <Col>
                    <h5>Invalid Url !</h5>
                </Col>
            </Row>
            <Row>
                <div className='ml-auto'>
                    <Button onClick={() => {
                        props.resetBlogMessage()
                        props.history.push('/blogs')
                    }}>Ok</Button>
                </div>
            </Row>
        </Dialog>
    )
}

const mapStateToProps = state => ({
    blogDetail: state.user.blogDetail,
    blogMessage: state.user.blogMessage
})

const mapDispatchToProps = dispatch => ({
    getBlogDetail: (id) => dispatch(actions.getBlogDetail(id)),
    resetBlogMessage: () => dispatch({type:'RESET_BLOG_MESSAGE'})
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(BlogDetail))
