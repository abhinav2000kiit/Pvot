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
import PieChartPlaceholder from '../AnalystVirtualTradeList/Charts/pieChartPlaceholder';

const AllocationPie = props => {
  const [chartData, setChartData] = React.useState({ names: [], data: [], colors: [] });

  const { values } = props;

  // const colorPalette = ['#ff6e54', '#ffa600', '#955196', '#dd5182'];
  // const colorPalette = ['#49A695', '#F2A679', '#3F6973', '#D9725B'];
  // const colorPalette = ['#B9BF04', '#F27405', '#F23005', '#F2B705'];
  // const colorPalette = ['#103240', '#732929', '#2B4022', '#061F40'];
  // const colorPalette = ['#A60321', '#F28705', '#5A4D95', '#F5685E'];
  const colorPalette = ['#048C62', '#31C48C', '#54E2B1', '#8EEDD2'];

  React.useEffect(() => {
    if (props.message) {
      props.setMessage(null);
    }
  }, [props.message]);

  React.useEffect(() => {
    let chartData = { names: [], data: [], colors: colorPalette };

    values &&
      Object.keys(values).map(item => {
        chartData.names.push(item);
        chartData.data.push(values[item]);
      });

    setChartData(chartData);
  }, [values]);

  // console.log('+++++++++++++++++++++++++++', tradeCounts, availableTradeBalance, pieData1, pieData2, barData);
  console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@', props, chartData);

  return (
    <div style={{ border: '0.5px solid #707070', borderRadius: '3rem', paddingTop: '2rem', paddingBottom: '2.5rem' }}>
      <div>
        {chartData &&
        chartData.data.length > 0 &&
        chartData.data.reduce(function(acc, val) {
          return acc + val;
        }) > 0 ? (
          <Pie series={chartData} legend={'bottom'} width={500} />
        ) : (
          <PieChartPlaceholder />
        )}
      </div>
    </div>
  );
};

export default AllocationPie;
