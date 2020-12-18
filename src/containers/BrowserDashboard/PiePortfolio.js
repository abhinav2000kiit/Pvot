import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/index';

import Pie from '../Graphs/Pie';
import Bar from '../Graphs/Bar';
import BarChartPlaceholder from './Charts/barChartPlaceholder';
import PieChartPlaceholder from './Charts/pieChartPlaceholder';

const VirtualTradeList = props => {
  const [pieData1, setPieData1] = React.useState({ names: [], data: [], colors: [] });
  const [pieData2, setPieData2] = React.useState({ names: [], data: [], colors: [] });
  const [barData, setBarData] = React.useState({ data: [], categories: [], colors: [] });
  const [barData1, setBarData1] = React.useState({ data: [], categories: [], colors: [] });

  React.useEffect(() => {
    props.setMessage(null);
    props.getTradeList();
    props.getProfileImage();
    props.setTradeItem();
    props.getAvailableTradeBalance();
    props.getTradeCounts();
  }, []);

  const { tradeList, availableTradeBalance, tradeCounts, logoutLoading } = props;

  const colorPalette = ['#048C62', '#31C48C', '#54E2B1', '#8EEDD2'];

  React.useEffect(() => {
    if (props.message) {
      props.setMessage(null);
    }
  }, [props.message]);

  React.useEffect(() => {
    let data1 = { names: [], data: [], colors: colorPalette };
    let data2 = { names: [], data: [], colors: colorPalette };
    let barchartData = { data: [], categories: [], colors: colorPalette };
    let data3 = { names: [], data: [], colors: colorPalette };

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

      availableTradeBalance &&
      availableTradeBalance.map(item => {
        barchartData1.categories.push(item.segment.name === 'EQUITY' ? 'CASH' : item.segment.name);
        barchartData1.data.push(item.balance);
      });

    setPieData1(data1);
    setPieData2(data2);
    setBarData(barchartData);
    setBarData1(barchartData1);
  }, [tradeCounts, availableTradeBalance]);

  const image = props.profileImage ? props.profileImage : require('../../assets/images/jpeg/placeholder.jpg');
  const name =
    props.signinData &&
    props.signinData.user &&
    props.signinData.user.UserAttributes.filter(item => item.Name === 'name').length > 0 &&
    props.signinData.user.UserAttributes.filter(item => item.Name === 'name')[0].Value;

  return (
    <div>
      <div style={{ paddingTop: '3rem', zIndex: '1' }}>
        <div className='row' style={{ textAlign: 'center' }}>
          <div
            className='col-4'
            style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}
          >
            <h6 className='text-muted  py-3'>Segment wise distribution for last 30 days</h6>
            <div style={{ textAlign: 'center' }}>
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

          <div
            className='col-4'
            style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}
          >
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

          <div
            className='col-4'
            style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}
          >
            <h6 className='text-muted py-3'>Overall Portfolio Capital Allocation</h6>
            <div className='p-1'>
              {barData && barData.data.length > 0 ? <Bar data={barData} /> : <BarChartPlaceholder />}
            </div>
          </div>

          <div
            className='col-4'
            style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}
          >
            <h6 className='text-muted py-3'>Overall Portfolio Capital Allocation</h6>
            <div className='p-1'>
              {barData && barData.data.length > 0 ? <Pie data={barData1} /> : <PieChartPlaceholder />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  logoutLoading: state.auth.logoutLoading,
  logoutError: state.auth.logoutError,
  logoutData: state.auth.logoutData,
  logoutMessage: state.auth.logoutMessage,
  logoutShow: state.auth.logoutShow,
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
  logout: path => dispatch(actions.logout(path)),
  getTradeList: () => dispatch(actions.getTradeList()),
  setMessage: message => dispatch(actions.setMessage(message)),
  setTradeItem: () => dispatch(actions.setTradeItem(null)),
  getAvailableTradeBalance: payload => dispatch(actions.getAvailableTradeBalance(payload)),
  getTradeCounts: token => dispatch(actions.getTradeCounts(token)),
  getProfileImage: token => dispatch(actions.getProfileImage(token))
});

export default connect(mapStateToProps, mapDispatchToProps)(VirtualTradeList);
