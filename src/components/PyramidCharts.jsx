// FunnelChart.jsx
import React from 'react';
import ApexCharts from 'react-apexcharts';

const FunnelChart = ({data}) => {
    let name = data?.map(item => item.description) || []
  const series = [{
    name: 'Counts',
    data: data?.map(item => item.count) ||[]
  }];

  const options = {
    chart: {
      type: 'bar',
      height: 350
    },
    plotOptions: {
        bar: {
          horizontal: true,
          isFunnel: true,
          borderRadius: 3,
        },
      },
    // title: {
    //   text: 'Sales Funnel',
    //   align: 'center'
    // },
    labels: name,
    colors: ['#13b497'],
    dataLabels: {
      enabled: true,
      formatter: (value, { seriesIndex, dataPointIndex }) => {
        return `${name[dataPointIndex]}: ${value}`;
      },
      style: {
        colors: ['#FFFFFF'] 
      }
    },
    // legend:{
    //     enabled:true,
    //     position:"bottom",
    //     labels:{
    //       colors:'#ffffff'
    //     },
    //   },
  };

  return (
      <ApexCharts options={options} series={series} type="bar" height={350} />
  );
};

export default FunnelChart;
