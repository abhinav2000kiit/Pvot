import React from 'react';
import Header from '../components/Header/customHeader';
import { Image, Row } from 'react-bootstrap';
import { Button, Typography, TextField } from '@material-ui/core';
import { connect } from 'react-redux';
import SendIcon from '@material-ui/icons/Send';
import * as actions from '../../redux/actions/index';
import './chat.scss';
import moment from 'moment';

const Message = props => {
  const { data } = props;
  return (
    <>
      {data.received ? (
        <div style={{ marginBottom: '1rem' }}>
          <Row className='p-3 mr-3 ml-3 bg-light received-message'>
            <p>{data.message}</p>
          </Row>
          <div className='d-flex' style={{ display: 'flex' }}>
            <div>
              <Image
                src={require('../../assets/images/jpeg/ayush.jpeg')}
                roundedCircle
                style={{ height: '40px', width: '40px', marginLeft: '1.5rem', marginTop: '0.4rem' }}
                onClick={event => {
                  event.stopPropagation();
                  props.history.push('/user/view-analyst-profile');
                }}
              />
            </div>
            <div className='float-right ml-auto mr-4 mt-1'>
              <p style={{ fontSize: '12px', color: 'lightgrey' }}>{data.date}</p>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <Row className='bg-primary p-3 mr-3 ml-3 sent-message'>
            <p style={{ color: 'white' }}>{data.message}</p>
          </Row>
          <div className='d-flex' style={{ display: 'flex' }}>
            <div className='mt-1' style={{ marginLeft: '1.5rem' }}>
              <p style={{ fontSize: '12px', color: 'lightgrey' }}>{data.date}</p>
            </div>
            <div className='float-right ml-auto mr-4 mt-1'>
              <Image
                src={require('../../assets/images/jpeg/ayush.jpeg')}
                roundedCircle
                style={{ height: '40px', width: '40px' }}
                onClick={event => {
                  event.stopPropagation();
                  props.history.push('/user/view-analyst-profile');
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Message);
