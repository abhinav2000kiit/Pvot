import React from 'react'
import * as actions from '../../../redux/actions'
import { Row, Col, Image } from 'react-bootstrap'
import SendIcon from '@material-ui/icons/Send';
import { CircularProgress, ButtonBase } from '@material-ui/core'
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import moment from 'moment'
import { Link } from 'react-router-dom';


function CommentSection(props) {
    React.useEffect(() => {
        props.getBlogComments(props.match.params.id)
    }, [props.match])
    const [comment, setComment] = React.useState("")
    const [commentSent, setCommentSent] = React.useState(false) 
    const handleCommentChange = (e) => {
        e.preventDefault()
        setComment(e.target.value)
    }

    React.useEffect(() => {
        if(commentSent){
            setCommentSent(false)
            document.getElementById('commentBottom').scrollIntoView()
        } 
    }, [props.blogComments])

    const handleCommentSubmit = (e) => {
        if(comment.trim().length > 0){
            props.sendBlogComment({
                content: comment,
            }, props.match.params.id)
            setComment('')
            setCommentSent(true)

        }
    }
    console.log(comment)
    return (
        <Row className='mt-3 px-2' style={{ borderTop: '1px solid grey' }}>
            {props.signinData
            ?(
                <>
                    <Col>
                        <input
                            className='mt-3 p-3'
                            id='comment'
                            placeholder="Comment"
                            value={comment}
                            onChange={handleCommentChange}
                            style={{
                                width:'100%',
                                border: '1px solid black',
                                borderRadius: '28px'
                            }}
                        />
                    </Col>
                    <div className='mt-2 mx-3 text-center center-col-special'>
                        {!commentSent ? <ButtonBase>
                            <SendIcon onClick={handleCommentSubmit} color='primary' />
                        </ButtonBase> : <CircularProgress />}
                    </div>
                </>

            )
            :<Link to='/' ><u>Sign in</u> to comment.</Link>}
            <Col className='col-12'>
                {props.blogComments 
                    ? props.blogComments.length > 0
                        ? props.blogComments.map(comment => 
                            <Row className='px-2 mt-2 mb-3'>
                                <Col className='comment-row'>
                                    <Row className='mt-1 center-row-between'>
                                        <span>
                                            <Image height='50px' src={comment.user.profile_picture ? comment.user.profile_picture :require('../../../assets/images/jpeg/placeholder.jpg')} roundedCircle />
                                            <span className='ml-2'><b>{comment.user.name}</b></span>
                                        </span>
                                        <span className='small'>{moment(comment.created_date).format('DD/MM/YYYY')}</span>
                                    </Row>
                                    <Row className='mt-2'>
                                        <p style={{marginLeft:'60px'}}>{comment.content}</p>
                                    </Row>
                                    
                                </Col>
                            </Row>
                        )
                        : <center className='my-3'>No Comments!</center>
                    : <Row className='mt-3'><Col className='text-center'><CircularProgress color='primary' /></Col></Row>}
                <div id='commentBottom'></div>
            </Col>
        </Row>
    )
}

const mapStateToProps = state => ({
    signinData: state.auth.signinData,
    blogComments: state.user.blogComments,
    blogDetail: state.user.blogDetail
})

const mapDispatchToProps = dispatch => ({
    getBlogComments: (id) => dispatch(actions.getBlogComments(id)),
    sendBlogComment: (payload, id) => dispatch(actions.sendBlogComment(payload, id)),
})


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CommentSection))