import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const DountChart = ({ data ,headerName, label="", DonutHeight="250"}) => {

  let name = data?.map(item => item.status) || []
  let dataSeries = data?.map(item => item.count) || [] 

  const fillColors = ['#13b497', '#ffab2d', '#13b497', '#13b497'];

  const options = {
    chart: {
      type: 'donut',
      background: 'transparent',
      toolbar: {
        show: true,
        offsetX: 0,
        offsetY: 0,
        tools: {
          download: true,
        },
        export: {
          csv:{
              filename:headerName
          },
          svg: {
              filename: headerName,
          },
          png: {
              filename: headerName,
          }
      }
      }
    },
    plotOptions: {
      pie: {
        donut: {
          size:'65%',
          labels: { 
            show: true,
            total: {
              show: true,
              showAlways: true,
              label: label,
              fontSize: '18px',
              fontFamily: 'Helvetica, Arial, sans-serif',
              fontWeight: 600,
              color: '#ffffff',
              formatter: function (w) {
                return w.globals.seriesTotals.reduce((a, b) => {
                  return a + b
                }, 0)
              },
            }
          },
        }
      }
    },
    dataLabels: {
      enabled: true,
        style: {
        fontSize: '12px',
        fontFamily: 'Helvetica, Arial, sans-serif',
        fontWeight: 'bold',
        colors: ['#fff']
      },
    },
    fill:{
      colors: ['#13b497','#ffab2d', "#13b497", "#13b497"]
    },
    series: dataSeries,
    labels: name,
    responsive: [{
      breakpoint: 480,
      options: {
        legend: {
          position: 'bottom'
        }
      }
    }],
    legend:{
      position:"right",
      // horizontalAlign: 'bottom',
      fontSize: '18px',
      offsetY: 100,
      offsetX: -10,
      labels:{
        colors:'#ffffff'
      },
      markers: {
        width: 12,
        height: 12,
        strokeWidth: 0,
        fillColors: fillColors,
        radius: 12,
      },
    },
  }


  return (
    
      <ReactApexChart
        options={options}
        type="donut"
        series={options.series}
        height= {DonutHeight}
      />
  );
};

export default DountChart;