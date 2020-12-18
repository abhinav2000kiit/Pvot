import React from 'react';
import ReactApexChart from 'react-apexcharts';

import './Bar.scss';

const ApexColumnChart =({data}) => {

    let arrayObj = data;

    arrayObj = arrayObj.map(item => {
          return {
            x: item.month,
            y: item.returns
          };
        });
    
    let state = {
      series: [{
        name: 'Monthly Returns',
        data: arrayObj
      }],
      options : {
      chart: {
        toolbar: {
          show: false
        }
      }, 
      grid: {
        show: false
      },
      axisTicks : {
        show: false
      },
      tooltip: {
        enabled: false, // TODO : Format this if needed 
      },
       plotOptions: {
        bar: {
          horizontal: true,
          colors: {
            ranges: [{
              from: -100,
              to: 0,
              color: '#ff6961'
            }, {
              from: 0,
              to: 100,
              color: '#77dd77'
            }]
          },
          columnWidth: '80%',
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          if (val  === 0 ) return "";
          return val + "%";
        },
        style: {
          colors: ["#304758"]
        }
      },
      xaxis: {
        title: {
          text: 'Returns',
        },
        tickAmount: 8,
        min: -20,
        max: 20,
        labels: {
          formatter: function (x) {
            return x.toFixed(0) + "%";
          }
        }
      },
      yaxis: {
        title: {
          text: 'Month',
        },
        labels: {
          formatter: function (y) {
            return y;
          }
        },
      type: 'category',
      }
      }
    };
    return (
      <div id='chart' className="card">
        <h6 style={{textAlign: "center"}}>Monthly Returns</h6>
        <ReactApexChart options={state.options} series={state.series} type='bar' height={340} />
      </div>
    );
  }

export default ApexColumnChart;
