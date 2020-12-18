import React from 'react';
import Header from '../components/Header/customHeader';
import { Row, Col, Image } from 'react-bootstrap';
import * as actions from '../../redux/actions/index';
import { connect } from 'react-redux';
import SingleAnalyst from './SingleAnalyst';
import { CircularProgress, Dialog } from '@material-ui/core';
import Grow from '@material-ui/core/Grow';
import Loading from '../Loading/Loading';
import ShareIcon from '@material-ui/icons/Share';
import htmlToImage from 'html-to-image'

// import Button from '@material-ui/core/Button';
// import MenuItem from '@material-ui/core/MenuItem';
// import FormControl from '@material-ui/core/FormControl';
// import Select from '@material-ui/core/Select';
// import Box from '@material-ui/core/Box';
// import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
// import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

import './AnalystLeaderboard.scss';

const AnalystLeaderboard = props => {
  // const [tradeType, setTradeType] = React.useState('all');
  // const [criteria, setCriteria] = React.useState('absolute_returns');
  // const [ascending, setAscending] = React.useState(true);

  // const handleTradeFilter = event => {
  //   setTradeType(event.target.value);
  // };

  // const handleCriteriaFilter = event => {
  //   setCriteria(event.target.value);
  // };

  // const handleSorting = event => {
  //   setAscending(!ascending);
  // };

  React.useEffect(() => {
    props.getAnalystLeaderboard();
  }, []);

  const [openShare, setOpenshare] = React.useState(false)
  const handleShare = () => {
      let node = document.getElementById('leaderboard');
      htmlToImage.toBlob(node).then(blob => {
        let file = new File([blob], 'trade.png', { type: 'image/png' });
        if (navigator.share) {
          navigator
            .share({
              text: `I, ${props.analystDetails.user.name}, have achieved a new milestone in expert trading leaderboard on Pvot. Click the link below to see my performance and copy my winning portfolio. Download Pvot app for the best experience.\n\n`,
              files: [file],
              url: 'https://play.google.com/store/apps/details?id=in.pvot'
            })
            .then(() => console.log('success'))
            .catch(err => console.log(err));
        } else {
          console.log('browser not supported');
        }
      });
    }

  // console.log('###############################', props);
  return (
    <Grow in={true} timeout={300}>
      <div id="leaderboard">
        <Header title={'Leaderboard'} backButton backTo={() => props.history.push('/')} shareButton={props.analyst_leaderboard ? props.analyst_leaderboard.find(el => el.analyst_info.user.user_id === props.analystDetails.user.user_id ) !== undefined ? true : false :false} shareClick={handleShare} />
        {/* <div className='row my-3'>
        <div className='col center-col'>
          <div
            style={{ position: 'absolute', left: '12px' }}
            onClick={() => {
              props.history.push('/user/user-home');
              // props.changeHomeState(1);
            }}
          >
            <ArrowBackIcon style={{ color: '#2962ff' }} />
          </div>
          <div
            className='analyst-profile-header signin-span-not-a-member-blue mr-5'
            style={{ fontWeight: '600', fontSize: '1rem' }}
          >
            Leaderboard
          </div>
        </div>
      </div> */}
        <div>
          {/* <div className='row' style={{ backgroundColor: '#fff', height: '5rem', padding: '1rem 0' }}>
          <div className='col-4 p-0 mt-3'>
            <FormControl
              style={{
                minWidth: 80,
                paddingRight: '1rem',
                paddingLeft: '0.4rem'
              }}
            >
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={tradeType}
                onChange={handleTradeFilter}
              >
                <MenuItem value={'all'}>All</MenuItem>
                <MenuItem value={'options'}>Options</MenuItem>
                <MenuItem value={'cash'}>Cash</MenuItem>
                <MenuItem value={'futures'}>Futures</MenuItem>
                <MenuItem value={'investment'}>Investment</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className='col-2 p-0'>
            <Box
              boxShadow={3}
              bgcolor='background.paper'
              style={{
                borderRadius: '0.5rem',
                padding: '2px auto',
                border: '2px solid #eee',
                width: '4rem'
              }}
            >
              <Button onClick={handleSorting} style={{ textTransform: 'none' }}>
                {ascending ? (
                  <>
                    Asc <ArrowDownwardIcon style={{ fontSize: 'inherit' }} />
                  </>
                ) : (
                  <>
                    <ArrowUpwardIcon style={{ fontSize: 'inherit' }} />
                    Desc
                  </>
                )}
              </Button>
            </Box>
          </div>
          <div className='col-6 p-0 mt-3'>
            <FormControl
              style={{
                minWidth: 130,
                paddingRight: '0.2rem',
                paddingLeft: '1rem'
              }}
            >
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={criteria}
                onChange={handleCriteriaFilter}
              >
                <MenuItem value={'absolute_returns'}>Absolute Returns</MenuItem>
                <MenuItem value={'minimum_capital'}>Minimum Capital</MenuItem>
                <MenuItem value={'max_drawdown'}>Max Drawdown</MenuItem>
                <MenuItem value={'capital_per_Trade'}>Capital/Trade</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div> */}
          <div style={{ backgroundColor: '#fafafa', padding: '0.5rem' }}>
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
        </div>
      </div>
    </Grow>
  );
};

const mapStateToProps = state => ({
  analystDetails: state.analyst.analystDetails,
  message: state.auth.message,
  signinData: state.auth.signinData,
  analyst_leaderboard: state.analyst.analyst_leaderboard,
  filters: state.user.filters
});

const mapDispatchToProps = dispatch => ({
  setMessage: message => dispatch(actions.setMessage(message)),
  getAnalystLeaderboard: params => dispatch(actions.getAnalystLeaderboard(params))
  // changeHomeState: params => dispatch(actions.changeHomeState(params))
});

export default connect(mapStateToProps, mapDispatchToProps)(AnalystLeaderboard);
