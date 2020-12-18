import React from 'react';
import ReactApexChart from 'react-apexcharts';

class ColumnCharts extends React.Component {
  constructor(props) {
    super(props);
    console.log('#############################', props);

    this.state = {
      series: [
        {
          name: 'Monthly Returns',
          data: this.props && this.props.data && Object.values(this.props.data).map(value => value.returns)
        }
      ],
      options: {
        chart: {
          type: 'bar',
          height: 350,
          toolbar: {
            show: false
          }
        },
        plotOptions: {
          bar: {
            horizontal: true,
            columnWidth: '80%',
            startingShape: 'flat',
            endingShape: 'rounded',
            dataLabels: {
              position: 'top',
              orientation: 'horizontal'
            }
          }
        },
        fill: {
          type: 'solid',
          colors: [
            function({ value }) {
              if (value < 0) {
                return '#dd3c4c';
              } else {
                return '#31C48C';
              }
            }
          ]
        },
        dataLabels: {
          enabled: true,
          style: {
            fontSize: '12px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 'bold',
            colors: ['#343a40']
          },
          formatter: function(val, opt) {
            return val.toFixed(1);
          },
          offsetX: -10
        },
        yaxis: {},
        xaxis: {
          type: 'category',
          categories: this.props && this.props.data && Object.values(this.props.data).map(value => value.month),
          show: true,
          showAlways: true,
          labels: {
            formatter: function(val) {
              return `${val}%`;
            }
          }
        },
        tooltip: {
          enabled: true,
          custom: function({ series, seriesIndex, dataPointIndex, w }) {
            return (
              '<div class="p-2">' +
              '<span>' +
              w.config.xaxis.categories[dataPointIndex] +
              ' : ' +
              series[seriesIndex][dataPointIndex] +
              '</span>' +
              '</div>'
            );
          },
          style: {
            fontSize: '12px',
            fontFamily: undefined
          },
          marker: {
            show: false
          },
          items: {
            display: 'flex'
          },
          fixed: {
            enabled: false,
            position: 'topRight',
            offsetX: 0,
            offsetY: 0
          }
        }
      }
    };
  }

  render() {
    return (
      <div id='chart'>
        <ReactApexChart options={this.state.options} series={this.state.series} type='bar' height={450} />
      </div>
    );
  }
}

export default ColumnCharts;
