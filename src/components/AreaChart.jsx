import { offset } from "highcharts";
import React from "react";
import ReactApexChart from "react-apexcharts";

const AreaChart = ({data, dataLabelSuffix="", XAxisTitle = "", YAxisTitle = "", }) => {
  let graphData = data;

  let Graph = {
    series: [
      {
        name: "Acc.Revenue",
        data: graphData,
      },
    ],
    options: {
      chart: {
        height: 350,
        width: 600,
        type: "line",
      },
      plotOptions: {
        line: {
          isSlopeChart: true,
        },
      },
      grid: {
        show: false,
        borderColor: "#1c1c1c",
      },
      xaxis: {
        title: {
          text: XAxisTitle,
          style: {
            color: '#ffffff',
            fontSize: '16px',
            fontWeight: 'bold',
          },
        },
        labels: {
          style: {
            colors: "White",
            fontSize: "13px",
            fontWeight: "14px"

          },
        },
        position: "bottom",
      },
      yaxis: {
        title: {
          text: YAxisTitle,
          style: {
            color: '#ffffff',
            fontSize: '17px',
            fontWeight: 'bold',
          },
        },        labels: {
          style: {
            colors: "White",
          },
        },
      },
      stroke: {
        curve: "straight",
        width: 2.7,
      },
      markers: {
        size: 5.5, 
        colors: ['#f9a3a4'], 
        strokeColor: 'black', 
        strokeWidth: 0.5, 
        hover: {
            size: 7, 
        }
    },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 0.7,
          opacityFrom: 0.6,
          opacityTo: 0.8,
          stops: [0, 90, 100],
        },
        colors: ["#5cccb7"], 
      },
      colors: ["#5cccb7"],
      dataLabels: {
        enabled: true,
        formatter: (val) => {
          if (typeof val === 'number') {
            return `${val} ${dataLabelSuffix}`;
          }
          return val;
        },
        offsetY:  -6,
        offsetX: 23,
        style: {
          colors: ["transparent"],
          fontSize: "10px",
          fontWeight: 'bold',
      }, 
      background: {
          enabled: true, 
          borderRadius: 0,
          borderWidth: 0, 
          borderColor: "transparent", 
        },
      },
      tooltip: {
        theme: "dark",  
        marker: {
          fillColors: ["#5cccb7"],  
        },
    },
    },
  };

  return (
    <ReactApexChart
      options={Graph.options}
      series={Graph.series}
      type="area"
      height={350}
    />
  );
};

export default AreaChart;
