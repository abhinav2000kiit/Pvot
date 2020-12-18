import React from 'react';
import Header from '../components/Header/customHeader';
import { Image, Row } from 'react-bootstrap';
import { Button, Typography, TextField } from '@material-ui/core';
import { connect } from 'react-redux';
import SendIcon from '@material-ui/icons/Send';
import * as actions from '../../redux/actions/index';
import Message from './message';
import './chat.scss';
import moment from 'moment';
const messages = [
  {
    message:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    received: 'test',
    date: moment().format('DD/MM/YYYY HH:mm A')
  },
  {
    message:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    received: 'test',
    date: moment().format('DD/MM/YYYY HH:mm A')
  },
  {
    message:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    sent: 'test',
    date: moment().format('DD/MM/YYYY HH:mm A')
  },
  {
    message:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    received: 'test',
    date: moment().format('DD/MM/YYYY HH:mm A')
  },
  {
    message:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    received: 'test',
    date: moment().format('DD/MM/YYYY HH:mm A')
  },
  {
    message:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    sent: 'test',
    date: moment().format('DD/MM/YYYY HH:mm A')
  }
];

const Chat = props => {
  React.useEffect(() => {
    var elmnt = document.getElementById('emtpyMessage');
    console.log(elmnt);
    elmnt.scrollIntoView();
  }, []);
  return (
    <div className='bg-white'>
      <Header title='Chat' />
      <div>
        {messages.map(message => (
          <Message data={message} />
        ))}
      </div>
      <div id='emtpyMessage' style={{ marginBottom: '70px' }}></div>
      <div className='row chat-send'>
        <TextField className='col-9 chat-text' placeholder='enter the message' />
        <Button className='col-2 bg-primary chat-button'>
          <SendIcon style={{ color: 'white' }} />
        </Button>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  message: state.auth.message,
  signinData: state.auth.signinData,
  analystsForSubscription: state.user.analystsForSubscription,
  analystsForSubscriptionDetails: state.user.analystsForSubscriptionDetails,
  filters: state.user.filters
});

const mapDispatchToProps = dispatch => ({
  setMessage: message => dispatch(actions.setMessage(message)),
  fetchAnalystsForSubscriptions: params => dispatch(actions.fetchAnalystsForSubscriptions(params)),
  fetchPerformanceAndTransactionsData: params => dispatch(actions.fetchPerformanceAndTransactionsData(params)),
  savePerformanceAndTransactionsData: () => dispatch(actions.savePerformanceAndTransactionsData(null))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat);
