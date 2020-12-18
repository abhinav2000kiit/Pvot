import React from 'react'
import { Row, Col, Image } from 'react-bootstrap'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import InsertCommentIcon from '@material-ui/icons/InsertComment';
import moment from 'moment'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../../redux/actions'



function BlogCard(props) {
    const { data } = props
    const [like, setLike] = React.useState(false)
    const [count, setCount] = React.useState(0)
    React.useEffect(() => {
        setLike(data ? data.likes_blog : false)
        setCount(0)
    }, [data])

    const toggleLike = () => {
        props.toggleBlogLike({
            like : !like,
            id: data.id
        })
        if(like){
            if(data.likes_blog) setCount(-1)
            else setCount(0)
        }else{
            if(!data.likes_blog) setCount(1)
            else setCount(0)
        }
        setLike(!like)
        
    }

    return (
        <Row className='card custom-card card-list px-0 mt-2'>
            <Col>
                <Link to={`/blog/${data.id}`} >
                <Row style={{borderBottom:'1px solid grey', color:'black'}}>
                    <Col className='col-12'>
                        <Image src={data.header_image ? data.header_image : "" } />
                    </Col>
                    <Col className='col-12 mt-3 center-col-space-between px-0'>
                        <h6 className='text-justify'><b>{data.heading}</b></h6>
                        <p className='text-justify'>{data.description}</p>
                        <Row className='center-row-between small mb-2'>
                            <span>{data.reading_time} MIN. READ</span>
                            <span>{moment(data.created_data).format('DD/MM/YYYY')}</span>
                        </Row>
                        
                    </Col>
                    
                </Row>
                </Link>
              <Row className='center-row-between my-2'>
                  <span>
                  {props.signinData ? like 
                    ? <FavoriteIcon onClick={toggleLike} style={{color:'red'}} /> 
                    : <FavoriteBorderIcon onClick={toggleLike} style={{color: '#ff0000'}} /> 
                : <FavoriteIcon style={{color:'red'}} /> }
                    {' '} {data.total_likes + count} Likes</span>
                  <span className='ml-2'><InsertCommentIcon /> {' '} {data.total_comments} Comments</span>
              </Row>
            </Col>  
        </Row>
    )
}

const mapStateToProps = state => ({
    signinData:  state.auth.signinData
})

const mapDispatchToProps =(dispatch) => ({
    toggleBlogLike: (payload) => dispatch(actions.toggleBlogLike(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(BlogCard)