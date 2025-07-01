import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const TripleBarGraph = ({
  data,
  headerName,
  seriesData = [],
  horizontal = false,
  title = "",
  columnWidth = "90%",
  month = [],
  enabledOnSeries = [false, false, false, false, false], 
  dataLabelSuffix="",
  XAxisTitle = "",  
  YAxisTitle = "", 
  YAxisSecondaryTitle = "Acheievement (%)",
  data1,
  data2,
  data3,
  data4,
  data5,
  shubham = false, 
   
}) => {

  let max1 = Math.max(
    ...(data1 || []),
    ...(data2 || []),
    ...(data3 || []),
  )


  // if (max1 % 500 !== 0) {
  //   max1 = Math.ceil(max1 / 500) * 500;
  // }
  if (!shubham) {
    if (max1 % 500 !== 0) {
      max1 = Math.ceil(max1 / 500) * 500;
    }
  } else {
    if (max1 % 50 !== 0) {
      max1 = Math.ceil(max1 / 50) * 50;
    }
  }

  let max2 = Math.max(
    ...(data4 || []),
    ...(data5 || []),
  )
  if (max2 % 25 !== 0) {
    max2 = Math.ceil(max2 /25) * 25;
  }

  // max2 = Math.round(max2)
  const months = Array(12).fill(0);

  const category = data?.map((item) => item.description) || [];

  const defaultSeries = [];

  const series = seriesData.length > 0 ? seriesData : defaultSeries;

  // const colors = ["#13b497", "#ffab2d", "#f9a8d4", "#b8ee30"];

  const colors = ["#13b497", "#ffab2d", "#2b98d6", "#b8ee30", "#f4d3a8"];
  // const BarBorderColors = ["#28a745", "#b8ee30", "#e83e8c","#b8ee30"];


  const offsetX = horizontal ? 0 : -1;
  const offsetY = horizontal ? 0 : -7;

  const options = {
    chart: {
      height: 440,
      type: "line",
      background: "#3e454d",
      stacked: false,
      toolbar: {
          show: true,
          tools: {
              download: true, 
              zoomin: false, 
              zoomout: false, 
              reset: false,
              pan: false,
              zoom: false,                
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
    title: {
      text: title,
      align: "center",
      style: {
        fontSize: "15px",
        fontWeight: "bold",
        color: "#ffffff",
      },
    },
    dataLabels: {
      enabled: true,
      formatter: (val, { seriesIndex }) => (seriesIndex === 3 || seriesIndex === 4 ? `${val}%` : `${val} ${dataLabelSuffix}`),
      enabledOnSeries: [0,1,2,3,4],
      offsetX: offsetX,
      offsetY: offsetY,
      style: {
        colors: ["transparent"],
        fontSize: "8px",
        fontWeight: 'bold',
    }, 
    background: {
        enabled: true, 
        borderRadius: 0,
        borderWidth: 0, 
        borderColor: "transparent", 
      },
    },
    xaxis: {
      categories: category,
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
          colors: "#ffffff",
          fontSize: "10px",
        },
      },
    },
    yaxis: [
      {
        title: {
          text: 'Revenue (₹) Lac', 
          style:{
            color: "#ffffff",
            fontSize: '18px'
          } 
        },
        labels: {
          formatter: function (val) {
            return val.toFixed(0);
          },
          
          style: {
            colors: "#ffffff",
            fontSize: "9px",
          },
        },
        min:0,
        max:max1,
        tickAmount: 5,
      }, 
      {
        labels: {
          show:false,
          formatter: function (val) {
            return val.toFixed(0);
          },
          
          style: {
            colors: "#ffffff",
            fontSize: "9px",
          },
        },
        min:0,
        max:max1,
      }, 
      {
        labels: {
          show:false,
          formatter: function (val) {
            return val.toFixed(0);
          },
          
          style: {
            colors: "#ffffff",
            fontSize: "9px",
          },
        },
        min:0,
        max:max1,
      }, 
      {
        opposite: true,
        title: {
          text: 'Achievement (%)',
          style:{
            color: "#ffffff",
            fontSize: '18px',
          }  
        },
        labels: {
          style: {
            colors: "#ffffff",
            fontSize: "9px",
          },
          formatter: function (val) {return `${val.toFixed(0)}%`;},
        },
        min:0,
        max:max2,
        tickAmount: 5
      },
      {
        opposite: true,
        show:false,
        title: {
          text: 'Achievement (%)',
          style:{
            color: "#ffffff",
            fontSize: '18px',
          }  
        },
        labels: {
          style: {
            colors: "#ffffff",
            fontSize: "9px",
          },
          formatter: function (val) {return `${val.toFixed(0)}%`;},
        },
        min:0,
        max:max2
      }
    ],

    plotOptions: {
      bar: {
        columnWidth:columnWidth,
        horizontal: horizontal,
        borderRadius: 2,
        dataLabels: {
          style: {
            colors: "#fff",
          },
          position: "top",
        },
      },
    },
    stroke: {
      colors: ["transparent", "transparent", "transparent", "#b8ee30", "#f4d3a8"],
      curve: 'smooth',
      width: [0.8, 0.8, 0.8, 2.5, 2.5],
      // colors: BarBorderColors,
    },
    grid: {
      borderColor: "transparent",
      strokeDashArray: 0,
    },
    fill: {
      colors: colors,
    },
    markers: {
      size: 6, 
      colors: ['#f4d3a8', '#b8ee30'],  
      strokeColor: 'black', 
      strokeWidth:1, 
      hover: {
          size: 6, 
      }
  },
    legend: {
      show: true,
      colors: colors,
      position: "bottom",
      labels: {
        colors: "#ffffff",
      },
      markers: {
        fillColors: colors,
      },
      fontSize: "10px",
      fontWeight: "bold",
    },
    tooltip: {
      theme: "dark",  
      marker: {
        fillColors: colors,  
      },
      y: {
        formatter: function (value, { seriesIndex }) {
          if (seriesIndex === 3 || seriesIndex === 4) {
            return `${value}%`;
          }
          return value;
        },
      },
      
    },
  };

  return (
    <ReactApexChart options={options} series={series} type="line" height={355} />
  );
};

export default TripleBarGraph;