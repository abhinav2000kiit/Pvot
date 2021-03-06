import React from 'react';
import { Row, Image } from 'react-bootstrap';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withRouter, Link } from 'react-router-dom';
import moment from 'moment';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/index';

import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CloseIcon from '@material-ui/icons/Close';
import Drawer from '@material-ui/core/Drawer';
import './feed.scss';
import { ReactTinyLink } from 'react-tiny-link';
import Comments from './Comments';

import { Mixpanel } from '../../shared/mixPanel'

const useStyles = makeStyles({
  root: {
    borderRadius: '20px',
    width: '100%'
  },
  media: {
    height: 140
  },
  drawerPaper: {
    height: '100%',
    backgroundColor: 'rgb(250, 250, 250)'
  }
});

const VirtualLinkItemFeed = props => {
  const classes = useStyles();
  const [openFilter, setOpenFilter] = React.useState(false);

  const { data } = props;
  // console.log(data)

  const [liked, setLiked] = React.useState(data && data.is_liked);
  const [likedCount, setLikedCount] = React.useState(data && data.like_count);

  const likePic = () => {
    if (liked) {
      Mixpanel.track('Un-Like Button Clicked - Investor', {link_id : data.link_id});
      setLiked(false);
      setLikedCount(likedCount - 1);
      props.unLikeImage({ link_id: data.link_id, type: 'links' });
    } else {
      Mixpanel.track('Like Button Clicked - Investor', {link_id : data.link_id});
      setLiked(true);
      setLikedCount(likedCount + 1);
      props.likeImage({ link_id: data.link_id, type: 'links' });
    }
  };
  const openComments = () => {
    Mixpanel.track('Comment Button Clicked - Investor', {link_id : data.link_id});
    setOpenFilter(true);
  };

  return (
    <>
      {/* style={{ width: '100%', border: '1px solid #eeeeee', padding: '15px 15px 0px', marginBottom: '10px' }} */}

      <Drawer
        anchor='bottom'
        open={openFilter}
        classes={{
          paper: classes.drawerPaper
        }}
        // onClose={}
        // onOpen={}
      >
        <div style={{ height: '100%' }}>
          <div style={{ backgroundColor: '#fafafa', padding: '10px' }}>
            <div className='title'>
              <div />

              <Typography variant='h6' style={{ fontSize: '16px' }}>
                Comments
              </Typography>

              <div>
                <CloseIcon style={{ cursor: 'pointer', color: 'black' }} onClick={() => setOpenFilter(false)} />
              </div>
            </div>

            <div style={{ marginTop: '50px', height: '100%' }}>
              <Comments data={data} />
            </div>
          </div>
        </div>
      </Drawer>

      <Row style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
        <Card className={classes.root}>
          <CardActionArea>
            {/* <CardMedia className={classes.media} image={data.image} title={data.description} onClick={openComments} /> */}
            <ReactTinyLink
              cardSize='small'
              showGraphic
              maxLine={5}
              minLine={1}
              defaultMedia={require('../../assets/images/svg/Logo.svg')}
              url={data.link}
            />
            <CardContent>
              {/*  <Typography gutterBottom variant="h5" component="h2"  onClick={openComments} >
              {data.title}
              </Typography> */}
              <Typography variant='body2' color='textSecondary' component='p' onClick={openComments}>
                {data.description}
                {/* Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                across all continents except Antarctica */}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <div className='d-flex justify-content-between'>
              <div className='text-align-center ' style={{ cursor: 'pointer' }} onClick={likePic}>
                <span>
                  {!liked ? (
                    <FavoriteBorderIcon style={{ color: '#212121' }} />
                  ) : (
                    <FavoriteIcon style={{ color: '#F44336' }} />
                  )}
                </span>
                <span className='text-dark ml-1'>{likedCount} Likes</span> &nbsp;&nbsp;&nbsp;&nbsp;
              </div>
              <div className='text-align-center mx-auto' style={{ cursor: 'pointer' }} onClick={openComments}>
                <span>
                  <ChatOutlinedIcon style={{ color: '#212121' }} />
                </span>
                <span className='text-dark ml-1'>{data.comment_count && data.comment_count} Comments</span>
              </div>
            </div>
          </CardActions>
        </Card>
      </Row>
    </>
  );
};

const mapStateToProps = state => ({
  signinData: state.auth.signinData,
  message: state.auth.message
});

const mapDispatchToProps = dispatch => ({
  likeImage: payload => dispatch(actions.likeImage(payload)),
  unLikeImage: payload => dispatch(actions.unLikeImage(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(VirtualLinkItemFeed));
