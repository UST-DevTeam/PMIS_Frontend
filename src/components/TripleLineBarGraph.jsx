import autoprefixer from "autoprefixer";
import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const TripleLineBarGraph = ({
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
}) => {

  const category = data?.map((item) => item.description) || [];

//   const lineDataKey = data?.map(item => {
//     const aop = item.aop || 0;
//     const pv = item.pv || 0; 
//     const percentage = aop === 0 ? 0 : ((pv / aop) * 100).toFixed(1);
//     return `${percentage}%`; 
// });

let max1 = Math.max(
  ...(data1 || []),
  ...(data2 || []),
  ...(data3 || []),
)
if (max1 % 500 !== 0) {
  max1 = Math.ceil(max1 / 500) * 500;
}

let max2 = Math.max(
  ...(data4 || []),
  ...(data5 || []),
)
if (max2 % 25 !== 0) {
  max2 = Math.ceil(max2 /25) * 25;
}

  const defaultSeries = [
    {
        name: "AOP -Target",
        data: data?.map(item => item.aop) || [],
        type: "bar",
      },
    {
        name: "PV - Target",
        data: data?.map(item => item.pv) || [],
        type: "bar",
      },
      {
        name: "Achievement",
        data: data?.map(item => item.amount) || [],
        type: "bar",
      },
  ];

//   if (lineDataKey) {
//     const lineSeriesData = data?.map(item => item[lineDataKey]) || []; 
//     defaultSeries.push({
//       name: lineSeriesName,
//       data: lineSeriesData,
//       type: "line",
//     });
//   }

  const series = seriesData.length > 0 ? seriesData : defaultSeries;

  // const colors = ["#5cccb7", "#ffab2d", "#B9D9EB", "#b8ee30"];
  const colors = ["#13b497", "#ffab2d", "#2b98d6", "#b8ee30", "#f4d3a8"];

  // const BarBorderColors = ["#28a745", "#b8ee30", "#e83e8c","#b8ee30"];
  const offsetX = horizontal ? 0 : -3;
  const offsetY = horizontal ? 0 : -7;

  const options = {
    chart: {
      height: 440,
      type: "line",
      background: "#3e454d",
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
        fontSize: "6px",
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
          text: 'Sites', 
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
    // yaxis: [
    //     {
    //       title: {
    //         text: YAxisTitle,
    //         style: {
    //           color: "#ffffff",
    //           fontSize: "17px",
    //           fontWeight: "bold",
    //         },
    //       },
    //       labels: {
    //         style: {
    //           colors: "#ffffff",
    //           fontSize: "9px",
    //         },
    //       },
    //     },
    //     {
    //       opposite: true,
    //       min:0,
    //       // max:150,
    //       title: {
    //         text: lineDataKey,
    //         style: {
    //           color: "#ffffff",
    //           fontSize: "17px",
    //           fontWeight: "bold",
    //         },
    //       },
    //       labels: {
    //         style: {
    //           colors: "#ffffff",
    //           fontSize: "9px",
    //         },
    //         formatter: (value) => `${value}%`,
    //       },
    //     },
    //   ],
    plotOptions: {
      bar: {
        columnWidth: columnWidth,
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
      width: [0.8, 0.8, 0.8, 3, 3],
      // colors: BarBorderColors,
    },
    grid: {
      borderColor: "transparent",
      strokeDashArray: 0,
    },
    markers: {
      size: 7, 
      colors: ['#f4d3a8', '#b8ee30'],  
      strokeColor: 'black', 
      strokeWidth:1, 
      hover: {
          size: 8, 
      }
  },
    fill: {
      colors: colors,
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
    <ReactApexChart options={options} series={series} type="line" height={440} />
  );
};

export default TripleLineBarGraph;
