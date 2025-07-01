import React from 'react';
import ReactDOM from 'react-dom';
import ReactApexChart from 'react-apexcharts'; // Import ReactApexChart

class Linechart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [44, 55, 67, 83],
      options: {
        chart: {
          height: 350,
          type: 'radialBar',
          // colors: '#eef3f7',
        },
        plotOptions: {
          radialBar: {
            dataLabels: {
              name: {
                fontSize: '22px',
              },
              value: {
                fontSize: '16px',
              },
              total: {
                show: true,
                label: 'Total',
                formatter: function (w) {
                  // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
                  return 249;
                },
              },
            },
          },
        },
        legend: {
          show: false
        },
        labels: ['Apples', 'Oranges', 'Bananas', 'Berries'],
      },
    };
  }

  render() {
    return (
      <div>
        <div id="chart" className="bg-gray-200 shadow-md rounded-md">
          <ReactApexChart options={this.state.options} series={this.state.series} type="radialBar" height={277} />
        </div>
        <div id="html-dist"></div>
      </div>
    );
  }
}

export default Linechart;
