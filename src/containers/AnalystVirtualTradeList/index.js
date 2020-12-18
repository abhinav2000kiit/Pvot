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
import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';
import waiting from '../../assets/gifs/waiting.gif';

import Pie from '../Graphs/Pie';
import Bar from '../Graphs/Bar';
import BarChartPlaceholder from './Charts/barChartPlaceholder';
import PieChartPlaceholder from './Charts/pieChartPlaceholder';

import { Mixpanel } from '../../shared/mixPanel'

const VirtualTradeList = props => {
  const [pieData1, setPieData1] = React.useState({ names: [], data: [], colors: [] });
  const [pieData2, setPieData2] = React.useState({ names: [], data: [], colors: [] });
  const [barData, setBarData] = React.useState({ data: [], categories: [], colors: [] });

  React.useEffect(() => {
    props.setMessage(null);
    props.getTradeList();
    props.getProfileImage();
    props.setTradeItem();
    props.getAvailableTradeBalance();
    props.getTradeCounts();
  }, []);

  const { tradeList, availableTradeBalance, tradeCounts } = props;

  // graph related stuff

  // const colorPalette = ['#ff6e54', '#ffa600', '#955196', '#dd5182'];
  // const colorPalette = ['#49A695', '#F2A679', '#3F6973', '#D9725B'];
  // const colorPalette = ['#B9BF04', '#F27405', '#F23005', '#F2B705'];
  // const colorPalette = ['#103240', '#732929', '#2B4022', '#061F40'];
  // const colorPalette = ['#A60321', '#F28705', '#5A4D95', '#F5685E'];
  const colorPalette = ['#048C62', '#31C48C', '#54E2B1', '#8EEDD2'];

  // const series1 = {
  //   names: ['Cash', 'Options', 'Futures', 'Investment'],
  //   data: [
  //     tradeList ? tradeList.filter(item => item.segment.name === 'EQUITY' && item.sub_segment === 'CASH').length : 0,
  //     tradeList ? tradeList.filter(item => item.segment.name === 'OPTIONS').length : 0,
  //     tradeList ? tradeList.filter(item => item.segment.name === 'FUTURES').length : 0,
  //     tradeList
  //       ? tradeList.filter(item => item.segment.name === 'EQUITY' && item.sub_segment === 'INVESTMENT').length
  //       : 0
  //   ],
  //   colors: colorPalette
  // };

  // const series2 = {
  //   names: ['Intraday', 'Positional'],
  //   data: [
  //     tradeList ? tradeList.filter(item => item.trade_type === 'Intraday').length : 0,
  //     tradeList ? tradeList.filter(item => item.trade_type === 'Positional').length : 0
  //   ],
  //   colors: colorPalette
  // };

  React.useEffect(() => {
    if (props.message) {
      props.setMessage(null);
    }
  }, [props.message]);

  React.useEffect(() => {
    Mixpanel.track('Dashboard Page visited - Expert');
    let data1 = { names: [], data: [], colors: colorPalette };
    let data2 = { names: [], data: [], colors: colorPalette };
    let barchartData = { data: [], categories: [], colors: colorPalette };

    tradeCounts &&
      Object.keys(tradeCounts.trade_segments).map(trade => {
        trade === 'EQUITY' ? data1.names.push('CASH') : data1.names.push(trade);
      });
    tradeCounts &&
      Object.values(tradeCounts.trade_segments).map(trade => {
        data1.data.push(trade);
      });

    tradeCounts &&
      Object.keys(tradeCounts.trade_type).map(trade => {
        data2.names.push(trade);
      });
    tradeCounts &&
      Object.values(tradeCounts.trade_type).map(trade => {
        data2.data.push(trade);
      });

    availableTradeBalance &&
      availableTradeBalance.map(item => {
        barchartData.categories.push(item.segment.name === 'EQUITY' ? 'CASH' : item.segment.name);
        barchartData.data.push(item.balance);
      });

    setPieData1(data1);
    setPieData2(data2);
    setBarData(barchartData);
  }, [tradeCounts, availableTradeBalance]);

  const image = props.profileImage ? props.profileImage : require('../../assets/images/jpeg/placeholder.jpg');
  const name =
    props.signinData &&
    props.signinData.user &&
    props.signinData.user.UserAttributes.filter(item => item.Name === 'name').length > 0 &&
    props.signinData.user.UserAttributes.filter(item => item.Name === 'name')[0].Value;

  // console.log('+++++++++++++++++++++++++++', tradeCounts, availableTradeBalance, pieData1, pieData2, barData);
  console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@', props);

  return (
    <>
      <Slide direction='left' in={true} mountOnEnter unmountOnExit>
        <div>
          {!props.loader || props.availableTradeBalance ? (
            <>
              <Row
                style={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  padding: '20px 5px',
                  position: 'fixed',
                  zIndex: '999',
                  backgroundColor: '#fff',
                  width: '100%',
                  top: '0',
                  left: '0'
                }}
                className='shadow'
              >
                <div className='col-3'>
                  <Image src={image} roundedCircle style={{ height: '70px', width: '70px' }} />
                </div>
                <div className='col'>
                  <h5 style={{ paddingLeft: '8px' }}>Hi {name}!</h5>
                  <div>
                    <Button
                      color='primary'
                      onClick={() => {
                        Mixpanel.track('Analyst Profile button clicked - Expert');
                        props.history.push('/analyst-public-profile', { user_id: props.analystDetails.user.user_id })
                        }
                      }
                    >
                      Public Profile
                    </Button>
                    <Button style={{ color: '#048C62' }} onClick={() => {
                        Mixpanel.track('Leaderboard button clicked - Expert');
                        props.history.push('/analyst-leaderboard')
                    } }>
                      Leaderboard
                    </Button>
                  </div>
                </div>
              </Row>

              {/* <div style={{ textAlign: 'right', marginTop: '-25px', marginBottom: '10px' }}>
            <Typography
              variant='caption'
              style={{
                color: 'rgb(41, 98, 255)',
                cursor: 'pointer',
                marginRight: '20px',
                padding: '5px',
                border: '1px dotted red'
              }}
              onClick={() => props.history.push('/analyst-public-profile')}
            >
              My Public Profile
            </Typography>
          </div> */}
              <div style={{ paddingTop: '9rem', zIndex: '1' }}>
                <div className='shadow-lg rounded mb-4 px-3 pt-1 pb-3'>
                  <h6 className='text-muted py-3'>Segment wise distribution for last 30 days</h6>
                  <div className=''>
                    {pieData1 &&
                    pieData1.data.length > 0 &&
                    pieData1.data.reduce(function(acc, val) {
                      return acc + val;
                    }) > 0 ? (
                      <Pie series={pieData1} />
                    ) : (
                      <PieChartPlaceholder />
                    )}
                  </div>
                </div>
                <div className='shadow-lg rounded mb-4 px-3 pt-1 pb-3'>
                  <h6 className='text-muted py-3'>Duration wise distribution for last 30 days</h6>
                  <div className=''>
                    {pieData2 &&
                    pieData2.data.length > 0 &&
                    pieData2.data.reduce(function(acc, val) {
                      return acc + val;
                    }) > 0 ? (
                      <Pie series={pieData2} />
                    ) : (
                      <PieChartPlaceholder />
                    )}
                  </div>
                </div>
                <div className='shadow-lg rounded mb-4 px-3 pt-1 pb-3'>
                  <h6 className='text-muted py-3'>Overall Portfolio Capital Allocation</h6>
                  <div className='p-1'>
                    {barData && barData.data.length > 0 ? <Bar data={barData} /> : <BarChartPlaceholder />}
                  </div>
                </div>
                <br></br>
                <br></br>
              </div>
            </>
          ) : (
            <div className='container' style={{ height: '70vh' }}>
              <div className='row align-items-center justify-content-center' style={{ height: '90%' }}>
                <img src={waiting} alt='Loading' width='142' height='176' />
              </div>
            </div>
          )}
        </div>
      </Slide>
      <BottomNavigation />
    </>
  );
};

const mapStateToProps = state => ({
  analystDetails: state.analyst.analystDetails,
  signinData: state.auth.signinData,
  loader: state.auth.loader,
  tradeList: state.analyst.tradeList,
  message: state.auth.message,
  profileImage: state.auth.profileImage,
  availableTradeBalance: state.auth.availableTradeBalance,
  tradeCounts: state.analyst.tradeCounts
});

const mapDispatchToProps = dispatch => ({
  getTradeList: () => dispatch(actions.getTradeList()),
  setMessage: message => dispatch(actions.setMessage(message)),
  setTradeItem: () => dispatch(actions.setTradeItem(null)),
  getAvailableTradeBalance: payload => dispatch(actions.getAvailableTradeBalance(payload)),
  getTradeCounts: token => dispatch(actions.getTradeCounts(token)),
  getProfileImage: token => dispatch(actions.getProfileImage(token))
});

export default connect(mapStateToProps, mapDispatchToProps)(VirtualTradeList);
