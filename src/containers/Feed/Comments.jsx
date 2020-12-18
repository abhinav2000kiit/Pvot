import React from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import Chart from 'react-google-charts';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import FilterListIcon from '@material-ui/icons/FilterList';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import VirtualTradeItem from '../components/VirtualTradeItem';
import BottomNavigation from '../components/BottomNavigator';
import * as actions from '../../redux/actions/index';
import VirtualTradeItemFeed from './VirtualTradeItemFeed';
import VirtualImageFeed from './VirtualImageFeed';
import moment from 'moment';
import Header from '../components/Header/customHeader';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';
import placeholder from '../../assets/images/jpeg/placeholder.jpg';

import ReactPlayer from 'react-player';
import { ReactTinyLink } from 'react-tiny-link';

import './feed.scss';

const useStyles = makeStyles(theme => ({
  input: {
    marginLeft: theme.spacing(1),
    flex: 1
  },
  iconButton: {
    padding: 10
  }
}));

const Comments = props => {
  const classes = useStyles();

  const [comment, setcomment] = React.useState('');
  const [commented, setcommented] = React.useState(false);
  const [playing, setPlaying] = React.useState(false);
  const { data, profileImage, comments } = props;
  let payload = {};
  React.useEffect(() => {
    if (data) {
      if (data.data_type === 'IMAGE') {
        payload = { image_id: data.image_id, type: 'images' };
      }
      if (data.data_type === 'LINK') {
        payload = { link_id: data.link_id, type: 'links' };
      }
      if (data.data_type === 'VIDEO') {
        payload = { video_id: data.video_id, type: 'videos' };
      }
      props.getComments(payload);
    }
  }, [data, commented]);

  React.useEffect(() => {
    props.getProfileImage();
  }, [profileImage]);

  let inputComment = event => {
    event.preventDefault();
    setcomment(event.target.value);
  };

  let postComment = () => {
    console.log('post', comment.length);
    // make post call
    if (comment === null || comment === '' || comment.length === 0) {
      console.log('not a valid comment');
    } else {
      let payload = {},
        fetchPayload = {};
      if (data.data_type === 'IMAGE') {
        payload = { image_id: data.image_id, comment: comment, type: 'images' };
      }
      if (data.data_type === 'LINK') {
        payload = { link_id: data.link_id, comment: comment, type: 'links' };
      }
      if (data.data_type === 'VIDEO') {
        payload = { video_id: data.video_id, comment: comment, type: 'videos' };
      }
      // let payload = { "image_id": data.image_id, "comment": comment, "type": "images"  };
      props.postComment(payload);
      setcomment('');
      // fetch back new comments
      if (data.data_type === 'IMAGE') {
        fetchPayload = { image_id: data.image_id, type: 'images' };
      }
      if (data.data_type === 'LINK') {
        fetchPayload = { link_id: data.link_id, type: 'links' };
      }
      if (data.data_type === 'VIDEO') {
        fetchPayload = { video_id: data.video_id, type: 'videos' };
      }
      props.getComments(fetchPayload);
      setcommented(!commented);
    }
  };

  let handlePlay = e => {
    e.stopPropagation();
    setPlaying(!playing);
  };

  console.log(comments);

  return (
    <div>
      {data && data.image && <Image src={data.image} className='responsiveImage' />}
      {data && data.video && (
        <div className='player-wrapper'>
          <ReactPlayer
            className='react-player'
            url={data.video}
            playing={playing}
            width='100%'
            height='100%'
            onClick={e => handlePlay(e)}
          />
        </div>
      )}
      {data && data.link && (
        <ReactTinyLink cardSize='small' showGraphic={true} maxLine={5} minLine={1} url={data.link} />
      )}
      <br></br>
      {data && data.title && (
        <p>
          <strong>{data.title}</strong>
        </p>
      )}
      {data && data.description && <p>{data.description}</p>}

      <Typography variant='h6' style={{ fontSize: '12px', padding: '5px' }}>
        Comments
      </Typography>

      <div className='comments'>
        {comments && comments.length > 0 ? (
          comments.map(v => (
            <div className='comment-wrap'>
              <div className='photo'>
                <div
                  className='avatar'
                  style={{
                    backgroundImage:
                      v.user && v.user.profile_picture ? `url(${v.user.profile_picture})` : `url(${placeholder})`
                  }}
                ></div>
              </div>
              <div className='comment-block'>
                <p className='comment-name'>
                  <b>{v.user.name}</b>
                </p>
                <p className='comment-text'>{v.comment}</p>
                <div className='bottom-comment'>
                  <div className='comment-date'>{moment(v.created_date).format('MMM DD h:mm A')}</div>
                  {/* <ul className="comment-actions">
                                <li className="complain">Complain</li>
                                <li className="reply">Reply</li>
                            </ul> */}
                </div>
              </div>
            </div>
          ))
        ) : (
          // <Typography className='text-secondary'>No comments yet!</Typography>
          <Row>
            <Col>
              <Image
                src={require('../../assets/images/svg/Investor_No_Activity.svg')}
                className='user-on-board-image'
              />
            </Col>
          </Row>
        )}
      </div>

      <div className='spacing'></div>
      <div className='fixed'>
        <div style={{ height: '10px' }}></div>
        <div className='comment-wrap' style={{ marginBottom: '10px', width: '100%' }}>
          <div className='photo'>
            <div
              className='avatar'
              style={{ backgroundImage: profileImage ? `url(${profileImage})` : `url(${placeholder})` }}
            >
              {' '}
            </div>
          </div>
          <div className='comment-block' style={{ borderRadius: '50px' }}>
            <InputBase
              className={classes.input}
              value={comment}
              onChange={event => {
                inputComment(event);
              }}
              placeholder='Add comment...'
              inputProps={{ 'aria-label': 'Add comment...' }}
            />
            <IconButton type='submit' className={classes.iconButton} onClick={postComment} aria-label='send'>
              <SendIcon />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  signinData: state.auth.signinData,
  profileImage: state.auth.profileImage,
  comments: state.user.comments
});

const mapDispatchToProps = dispatch => ({
  getProfileImage: () => dispatch(actions.getProfileImage()),
  getComments: payload => dispatch(actions.getComments(payload)),
  postComment: payload => dispatch(actions.postComment(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
