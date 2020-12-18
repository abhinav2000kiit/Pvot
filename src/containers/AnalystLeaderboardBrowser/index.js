import React from 'react';
import Header from '../components/Header/customHeader';
import { Row, Col, Image } from 'react-bootstrap';
import * as actions from '../../redux/actions/index';
import { connect } from 'react-redux';
import SingleAnalyst from './SingleAnalyst';
import { CircularProgress } from '@material-ui/core';
import Grow from '@material-ui/core/Grow';
import Loading from '../Loading/Loading';

import './AnalystLeaderboard.scss';

const AnalystLeaderboard = props => {
  // console.log('###############################', props);
  return (
    <div style={{ paddingTop: '1rem', paddingBottom: '1.5rem' }}>
      {props && props.analyst_leaderboard !== null ? (
        props.analyst_leaderboard.length > 0 ? (
          props.analyst_leaderboard.map((d, idx) => <SingleAnalyst data={d} idx={idx} key={idx} />)
        ) : (
          <Row>
            <Col>
              <Image
                src={require('../../assets/images/svg/Investor_No_Activity.svg')}
                className='user-on-board-image'
              />
            </Col>
          </Row>
        )
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default AnalystLeaderboard;
