import React from 'react';
import ReactApexChart from 'react-apexcharts';

import './Bar.scss';

class Bar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [
        {
          name: 'Capital',
          data: props && props.data && props.data.data
        }
      ],
      options: {
        chart: {
          type: 'bar',
          toolbar: {
            show: false
          }
        },
        fill: {
          type: 'solid',
          colors: props && props.data.colors
        },
        plotOptions: {
          bar: {
            columnWidth: '70%',
            distributed: true,
            dataLabels: {
              position: 'top'
            }
          }
        },
        dataLabels: {
          enabled: true,
          formatter: function(val) {
            return Math.round(val);
          },
          offsetY: -20,
          style: {
            fontSize: '0.7rem',
            colors: props && props.data.colors
          }
        },
        legend: {
          show: false
        },
        xaxis: {
          type: 'category',
          labels: {
            rotate: 0,
            rotateAlways: false,
            hideOverlappingLabels: true,
            style: {
              // colors: props && props.data.colors,
              fontSize: '0.6rem'
            }
          },
          axisBorder: {
            show: true,
            color: '#78909C',
            height: 1,
            width: '100%',
            offsetX: 0,
            offsetY: 0
          },
          categories: props && props.data && props.data.categories
        },
        yaxis: {
          show: true,
          showAlways: true,
          labels: {
            formatter: function(val) {
              return `${Math.round(val) / 100000}lac`;
            }
          },
          axisBorder: {
            show: true,
            color: '#78909C',
            offsetX: 0,
            offsetY: 0
          }
        },
        tooltip: {
          enabled: true,
          theme: 'light',
          marker: {
            show: false
          },
          // custom: function({ series, seriesIndex, dataPointIndex, w }) {
          //   return (
          //     '<div class="arrow_box p-2">' +
          //     '<span class="font-weight-bold">' +
          //     w.globals.labels[dataPointIndex] +
          //     ': ' +
          //     '</span>' +
          //     '<span>' +
          //     series[seriesIndex][dataPointIndex] / 100000 +
          //     'lac' +
          //     '</span>' +
          //     '</div>'
          //   );
          // },
          style: {
            fontSize: '0.7rem',
            fontFamily: undefined,
            colors: props && props.data.colors
          }
        }
      }
    };
  }

  render() {
    return (
      <div id='chart'>
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type='bar'
          height={this.props ? (this.props.height ? this.props.height : 340) : 340}
          width={this.props ? (this.props.height ? this.props.height : 340) : 340}
        />
      </div>
    );
  }
}

export default Bar;
