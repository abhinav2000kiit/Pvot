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

  React.useEffect(() => {
    props.setMessage(null);
    props.getAvailableTradeBalance();
    props.getTradeCounts();
  }, []);

  const { availableTradeBalance, tradeCounts } = props;

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

  // console.log('+++++++++++++++++++++++++++', tradeCounts, availableTradeBalance, pieData1, pieData2, barData);

  return (
    <>
      <div className='row' style={{ textAlign: 'center' }}>
        <div
          className='col-4 p-0'
          style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'left' }}
        >
          <div
            className='shadow'
            style={{
              border: '1px solid #ccc',
              borderTopRightRadius: '2rem',
              borderTopLeftRadius: '2rem',
              width: '90%',
              marginRight: 'auto'
            }}
          >
            <h6
              className='text-muted py-3'
              style={{ background: '#f2f2f2', borderTopRightRadius: '2rem', borderTopLeftRadius: '2rem' }}
            >
              Segment wise distribution for last 30 days
            </h6>
            <div className='pt-4'>
              {pieData1 &&
              pieData1.data.length > 0 &&
              pieData1.data.reduce(function(acc, val) {
                return acc + val;
              }) > 0 ? (
                <Pie series={pieData1} legend={'bottom'} width={window && window.innerWidth / 3.75} />
              ) : (
                <PieChartPlaceholder />
              )}
            </div>
          </div>
        </div>

        <div
          className='col-4 p-0'
          style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'right' }}
        >
          <div
            className='shadow'
            style={{
              border: '1px solid #ccc',
              borderTopRightRadius: '2rem',
              borderTopLeftRadius: '2rem',
              width: '90%',
              margin: '0 auto'
            }}
          >
            <h6
              className='text-muted py-3'
              style={{ background: '#f2f2f2', borderTopRightRadius: '2rem', borderTopLeftRadius: '2rem' }}
            >
              Duration wise distribution for last 30 days
            </h6>
            <div className='pt-4'>
              {pieData2 &&
              pieData2.data.length > 0 &&
              pieData2.data.reduce(function(acc, val) {
                return acc + val;
              }) > 0 ? (
                <Pie series={pieData2} legend={'bottom'} width={window && window.innerWidth / 3.75} />
              ) : (
                <PieChartPlaceholder />
              )}
            </div>
          </div>
        </div>

        <div
          className='col-4 p-0'
          style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}
        >
          <div
            className='shadow'
            style={{
              border: '1px solid #ccc',
              borderTopRightRadius: '2rem',
              borderTopLeftRadius: '2rem',
              width: '90%',
              marginLeft: 'auto'
            }}
          >
            <h6
              className='text-muted py-3'
              style={{ background: '#f2f2f2', borderTopRightRadius: '2rem', borderTopLeftRadius: '2rem' }}
            >
              Overall Portfolio Capital Allocation
            </h6>
            <div className=''>
              {barData && barData.data.length > 0 ? (
                <Bar data={barData} height={window && window.innerWidth / 4} />
              ) : (
                <BarChartPlaceholder />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = state => ({
  loader: state.auth.loader,
  message: state.auth.message,
  availableTradeBalance: state.auth.availableTradeBalance,
  tradeCounts: state.analyst.tradeCounts
});

const mapDispatchToProps = dispatch => ({
  setMessage: message => dispatch(actions.setMessage(message)),
  getAvailableTradeBalance: payload => dispatch(actions.getAvailableTradeBalance(payload)),
  getTradeCounts: token => dispatch(actions.getTradeCounts(token))
});

export default connect(mapStateToProps, mapDispatchToProps)(VirtualTradeList);
