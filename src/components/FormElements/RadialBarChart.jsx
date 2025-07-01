import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const RadialBarChart = ({ data }) => {

    let name = data?.map(item => item.status) || []
    let dataSeries = data?.map(item => item.count) || []

    const options = {
        series: dataSeries,
        // series: [44, 55, 67, 200],
        chart: {
            height: 350,
            type: 'radialBar',
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
                  color: '#373d3f',
                  fontSize: '16px',
                  fontFamily: undefined,
                  fontWeight: 600,
                  formatter: function (w) {
                    return w.globals.seriesTotals.reduce((a, b) => {
                      return a + b
                    }, 0) 
                  }
                }
            }
            }
        },
        labels: name,

    };


  return (
    
      <ReactApexChart
        options={options}
        type="radialBar"
        series={options.series}
        height="400"
      />
  );
};

export default RadialBarChart;