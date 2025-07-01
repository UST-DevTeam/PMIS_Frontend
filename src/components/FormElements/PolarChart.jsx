import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const PolarChart = ({ data }) => {

  let name = data?.map(item => item.status) || []
  let dataSeries = data?.map(item => item.count) || []

  const options = {
        series: [14, 23, 21, 17, 15, 10],
        chart: {
            type: 'polarArea',
        },
        plotOptions: {
            polarArea: {
                rings: {
                strokeWidth: 1,
                strokeColor: '#fff',
                },
                spokes: {
                strokeWidth: 1,
                connectorColors: '#fff',
                }
            }
        },
        stroke: {
            colors: ['#fff']
        },
        fill: {
            opacity: 0.8
        },
        legend: {
            labels: {
              colors: '#fff',
            },
            position: 'right',
          },
          dataLabels: {
            style: {
              colors: ['#fff']
            }
          },
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                width: 350
                },
                legend: {
                position: 'bottom'
                }
            }
        }]
    };


  return (
    
      <ReactApexChart
        options={options}
        type="polarArea"
        series={options.series}
        height="400"
      />
  );
};

export default PolarChart;