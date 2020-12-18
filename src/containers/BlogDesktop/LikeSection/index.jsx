import React from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import InsertCommentIcon from '@material-ui/icons/InsertComment';
import * as actions from '../../../redux/actions'

function LikeSection(props) {
    const [like, setLike] = React.useState(false)
    const [count, setCount] = React.useState(0)
    const { likes, comments, likes_blog, id, signinData } = props
    
    React.useEffect(() => {
        setLike(likes_blog ? likes_blog : false)
        setCount(0)
    }, [props])

    const toggleLike = () => {
        props.toggleBlogLike({
            like : !like,
            id: id
        })
        if(like){
            if(likes_blog) setCount(-1)
            else setCount(0)
        }else{
            if(!likes_blog) setCount(1)
            else setCount(0)
        }
        setLike(!like)
        
    }
    return (
        <div>
            {signinData 
            ? like 
              ? <FavoriteIcon onClick={toggleLike} style={{color:'red'}} /> 
              : <FavoriteBorderIcon onClick={toggleLike} style={{color: '#ff0000'}} /> 
            : <FavoriteIcon style={{color:'red'}} />}
              {' '} {likes + count} Likes
              <span className='ml-2'><InsertCommentIcon />{' '} {comments} Comments</span>
        </div>
    )
}

const mapStateToProps = state => ({
    signinData: state.auth.signinData
})

const mapDispatchToProps =(dispatch) => ({
    toggleBlogLike: (payload) => dispatch(actions.toggleBlogLike(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LikeSection))