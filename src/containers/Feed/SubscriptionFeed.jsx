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
import Header from '../components/Header/customHeader';
import Slide from '@material-ui/core/Slide';
import Loading from '../Loading/Loading';

const SubscriptionFeed = props => {
  const { subFeed } = props;
  React.useEffect(() => {
    props.getSubFeed();
  }, []);

  // console.log('@@@@@@@@@@@@@@@@2', subFeed);

  return (
    <Slide direction='left' in={true} timeout={300} mountOnEnter unmountOnExit>
      <div>
        <Header title='Subscription Feed' />

        {!props.loader && props.subFeed ? (
          <div style={{ padding: '8px', width: '100%', marginTop: '15px' }}>
            {subFeed && subFeed.length > 0 ? (
              <>
                {subFeed
                  .sort((a, b) => {
                    if (a.updated_date < b.updated_date) return 1;
                    return -1;
                  })
                  .map(v => (
                    <VirtualTradeItemFeed data={v} kiteButton={true} />
                  ))}
                <div style={{ height: '50px' }}></div>
              </>
            ) : (
              // <Typography className='text-secondary'>No Trade Found</Typography>
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
        ) : (
          <Loading />
        )}
      </div>
    </Slide>
  );
};

const mapStateToProps = state => ({
  signinData: state.auth.signinData,
  loader: state.auth.loader,
  subFeed: state.user.subFeed
});

const mapDispatchToProps = dispatch => ({
  getSubFeed: () => dispatch(actions.getSubFeed())
});

export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionFeed);
