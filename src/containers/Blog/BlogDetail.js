import React from 'react'
import { Row, Col, Image } from 'react-bootstrap'
import Header  from '../components/Header/customHeader'
import './index.scss'
import * as actions from '../../redux/actions'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { CircularProgress, Button, Dialog, ButtonBase } from '@material-ui/core'
import moment from 'moment'
import SendIcon from '@material-ui/icons/Send';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import InsertCommentIcon from '@material-ui/icons/InsertComment';
import IconButton from '@material-ui/core/IconButton';
import KeyboardBack from '@material-ui/icons/KeyboardBackspaceSharp';
import { Link } from 'react-router-dom'



function BlogDetail(props) {
    const [like, setLike] = React.useState(false)
    const [count, setCount] = React.useState(0)
    const [commentSent, setCommentSent] = React.useState(false)
    React.useEffect(() => {
        props.getBlogDetail(props.match.params.id)
        props.getBlogComments(props.match.params.id)
    }, [])
    
    
    React.useEffect(() => {
        setLike(props.blogDetail ? props.blogDetail.blog.likes_blog : false)
        setCount(0)
    }, [props.blogDetail])
    
    React.useEffect(() => {
        setCommentSent(false)
    }, [props.blogComments])
    
    const [comment, setComment] = React.useState("")
    const handleCommentChange = (e) => {
        setComment(e.target.value)
    }
    const handleCommentSubmit = (e) => {
        if(comment.trim().length > 0){
            props.sendBlogComment({
                content: comment,
            }, props.match.params.id)
            setComment('')
            setCommentSent(true)
        }
    }
    const toggleLike = () => {
        props.toggleBlogLike({                                                                                                                                                                                                                                                                                                                                                              
            like : !like,
            id: props.match.params.id
        })
        if(like){
            if(props.blogDetail.blog.likes_blog) setCount(-1)
            else setCount(0)
        }else{
            if(!props.blogDetail.blog.likes_blog) setCount(1)
            else setCount(0)
        }
        setLike(!like)
        
    }

    return (
        !props.blogMessage
        ? <div className='parent'>
        {/* <Header title='Blogs' backButton backTo={() => props.history.push('/')}/> */}
        <Link to='/blogs'>
            <div className='backButton'>
                <IconButton color='primary' style={{color:'white'}}>
                    <KeyboardBack />                                        
                </IconButton>
            </div>
        </Link>
        {props.blogDetail && props.blogDetail.blog
        ? props.blogDetail.blog.id === parseInt(props.match.params.id) 
            ? 
            <>
            <Image src={props.blogDetail.blog.header_image ? props.blogDetail.blog.header_image : "" } style={{width:'100%'}} />
            <Row className='px-3 mt-2 detail'>
                <Col>
                    <h5 className='mt-2'>{props.blogDetail.blog.heading}</h5>
                    <p>{props.blogDetail.blog.description}</p>
                    <Row className='center-row-between small mt-3'>
                        <span>{props.blogDetail.blog.reading_time} MIN. READ</span>
                        <span>{moment(props.blogDetail.blog.created_date).format('DD/MM/YYYY')}</span>
                    </Row>
                    <div className='row mt-3 lighter' dangerouslySetInnerHTML={{ __html: props.blogDetail.blog.content}} ></div>

                    {props.blogDetail.blog.tags 
                    ? 
                        <Row className='center-row-between'>
                            {props.blogDetail.blog.tags.map((tag, idx) => 
                                <span className='tag' key={idx}>{tag.tag}</span>
                            )}
                        </Row>
                    : null}
                    <Row className='mt-3 center-row-between'>
                        <span style={{fontSize:'14px'}}>
                        {props.signinData ? like 
                            ? <FavoriteIcon onClick={toggleLike} style={{color:'red'}} /> 
                            : <FavoriteBorderIcon onClick={toggleLike} style={{color: '#ff0000'}} /> 
                        : <FavoriteIcon style={{color:'red'}} /> }
                            {' '} {props.blogDetail.blog.total_likes + count}</span>
                        <span className='ml-2'><InsertCommentIcon style={{fontSize:'20px'}} /> {' '} {props.blogComments ? props.blogComments.length : props.blogDetail.blog.total_comments}</span>
                    </Row>
                </Col>
            </Row>
            </>
            : <Row className='mt-3'><Col className='text-center'><CircularProgress color='primary' /></Col></Row>
        : <Row className='mt-3'><Col className='text-center'><CircularProgress color='primary' /></Col></Row>}
        {props.signinData 
        ? <Row className='mt-3 px-2' style={{ borderTop: '1px solid grey' }}>
            <Col>
                <input
                    className='mt-2 p-2'
                    id='comment'
                    placeholder="Comment"
                    value={comment}
                    onChange={handleCommentChange}
                    style={{
                        width:'100%',
                        border: '1px solid black',
                        borderRadius: '14px'
                    }}
                />
            </Col>
            <div className='mt-2 mx-3 text-center center-col-special'>
                {!commentSent
                ?<ButtonBase>
                    <SendIcon onClick={handleCommentSubmit} color='primary' />
                </ButtonBase>
                :<CircularProgress />}
            </div>
        </Row>
        : <p className='text-center'><Link to='/'>Sign in</Link> to comment</p>}
        {props.blogComments 
        ? props.blogComments.length > 0
            ? props.blogComments.map(comment => 
                <Row className='px-2 mt-2'>
                    <Col className='comment-row'>
                        <Row className='mt-1 center-row-between'>
                            <span>
                                <Image height='20px' src={comment.user.profile_picture ? comment.user.profile_picture :require('../../assets/images/jpeg/placeholder.jpg')} roundedCircle />
                                <span className='ml-2 small'><b>{comment.user.name}</b></span>
                            </span>
                            <span className='small'>{moment(comment.created_date).format('DD/MM/YYYY')}</span>
                        </Row>
                        <Row className='mt-2'>
                            <p>{comment.content}</p>
                        </Row>
                        
                    </Col>
                </Row>
            )
            : <center className='mt-3'>No Comments!</center>
        : <Row className='mt-3'><Col className='text-center'><CircularProgress color='primary' /></Col></Row>}
    </div>
        :<Dialog open={true} onClose={() => {
            props.resetBlogMessage()
            props.history.push('/blogs')
        }}>
            <Row className='px-5 py-2'>
                <Col>Invalid url !</Col>
            </Row>
            <Button onClick={() => {
                props.resetBlogMessage()
                props.history.push('/blogs')
            }}>Ok</Button>
        </Dialog>
    )
}

const mapStateToProps = state => ({
    signinData: state.auth.signinData,
    blogDetail: state.user.blogDetail,
    blogComments: state.user.blogComments,
    blogMessage: state.user.blogMessage
})

const mapDispatchToProps = dispatch => ({
    getBlogDetail: (id) => dispatch(actions.getBlogDetail(id)),
    getBlogComments: (id) => dispatch(actions.getBlogComments(id)),
    sendBlogComment: (payload, id) => dispatch(actions.sendBlogComment(payload, id)),
    toggleBlogLike: (payload) => dispatch(actions.toggleBlogLike(payload)),
    resetBlogMessage: () => dispatch({type: 'RESET_BLOG_MESSAGE'})
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(BlogDetail))
