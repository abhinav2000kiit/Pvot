import React from 'react';
import ReactApexChart from 'react-apexcharts';

import './Pie.scss';

class Pie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      series: props && props.series && props.series.data,
      options: {
        chart: {
          type: 'donut'
        },
        plotOptions: {
          pie: {
            donut: {
              labels: {
                show: true,
                total: {
                  showAlways: true,
                  show: true
                }
                // name: {
                //   show: true,
                //   fontSize: '22px',
                //   fontFamily: 'Helvetica, Arial, sans-serif',
                //   fontWeight: 600,
                //   color: undefined,
                //   offsetY: -10
                // }
              }
            }
          }
        },
        legend: {
          fontFamily: 'Helvetica, Arial',
          fontSize: '10',
          position: props && props.legend ? props.legend : 'right',
          horizontalAlign: 'center'
        },
        pie: {
          expandOnClick: true
        },
        fill: {
          type: 'solid'
        },
        labels: props && props.series && props.series.names,
        dataLabels: {
          enabled: true,
          dropShadow: {
            blur: 3,
            opacity: 0.8
          },
          formatter: function(val, opts) {
            return `${Math.round(val)}%`;
          }
        },
        colors: props && props.series && props.series.colors
      }
    };
  }

  render() {
    console.log(this.props.width);
    return (
      <div id='chart'>
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type='donut'
          width={this.props ? (this.props.width ? this.props.width : 340) : 340}
        />
      </div>
    );
  }
}

export default Pie;
