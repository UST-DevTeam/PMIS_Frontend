import autoprefixer from "autoprefixer";
import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const TripleLineFourBarGraph = ({
  data,
  headerName,
  seriesData = [],
  horizontal = false,
  title = "",
  columnWidth = "90%",
  dataLabelSuffix="",
  XAxisTitle = "",  
  YAxisTitle = "", 
  YAxisSecondaryTitle = "Acheievement (%)",
  data1,
  data2,
  data3,
  data4,
  data5,
  data6,
  data7,
}) => {

  const category = data?.map((item) => item.description) || [];

let max1 = Math.max(
  ...(data1 || []),
  ...(data2 || []),
  ...(data3 || []),
  ...(data4 || []),
)
if (max1 % 500 !== 0) {
  max1 = Math.ceil(max1 / 500) * 500;
}

let max2 = Math.max(
  ...(data5 || []),
  ...(data6 || []),
  ...(data7 || []),
)
if (max2 % 50 !== 0) {
  max2 = Math.ceil(max2 /50) * 50;
}
let min2 = Math.min(
  ...(data5 || []),
  ...(data6 || []),
  ...(data7 || []),
)
if (min2<0){
    if (min2 % 25 !== 0) {
        min2 = Math.floor(min2 /25) * 25;
    }
}else{
    min2 = 0
}


  const defaultSeries = [
    {
        name: "Sum of Projected Revenue",
        data: data?.map(item => item.aop) || [],
        type: "bar",
      },
    {
        name: "Sum of Projected Cost",
        data: data?.map(item => item.pv) || [],
        type: "bar",
      },
      {
        name: "Sum of Actual Revenue",
        data: data?.map(item => item.amount) || [],
        type: "bar",
      },
      {
        name: "Sum of Actual Cost",
        data: data?.map(item => item.amount) || [],
        type: "bar",
      },
  ];

  const series = seriesData.length > 0 ? seriesData : defaultSeries;

  // const colors = ["#5cccb7", "#ffab2d", "#B9D9EB", "#b8ee30"];
  const colors = ["#13b497", "#ffab2d", "#2b98d6", "#fd5c63", "#b8ee30", "#f4d3a8", "#BDA9EB"];
  // const BarBorderColors = ["#28a745", "#b8ee30", "#e83e8c","#b8ee30"];
  const offsetX = horizontal ? 0 : -3;
  const offsetY = horizontal ? 0 : -7;

  const options = {
    chart: {
      height: 400,
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
      formatter: (val, { seriesIndex }) => (seriesIndex === 4 || seriesIndex === 5 || seriesIndex === 6 ? `${val}%` : `${val} ${dataLabelSuffix}`),
      enabledOnSeries: [0,1,2,3,4,5,6],
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
          text: '', 
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
          text: '',
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
        min:min2,
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
        min:min2,
        max:max2
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
        min:min2,
        max:max2
      }
    ],

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
        colors: ["#13b497", "#ffab2d", "#2b98d6", "#fd5c63", "#b8ee30", "#f4d3a8", "#BDA9EB"],
        curve: 'smooth',
        width: [0.8, 0.8, 0.8, 0.8, 2.5, 2.5, 2.5],
        // colors: BarBorderColors,
    },
    grid: {
      borderColor: "transparent",
      strokeDashArray: 0,
    },
    markers: {
        size: 6, 
        colors: ['#13b497', '#ffab2d', '#2b98d6', '#fd5c63', '#b8ee30', '#f4d3a8', '#BDA9EB'],
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
          if (seriesIndex === 4 || seriesIndex === 5 || seriesIndex === 6) {
            return `${value}%`;
          }
          return value;
        },
      },
      
    },
  };

  return (
    <ReactApexChart options={options} series={series} type="line" height={400} />
  );
};

export default TripleLineFourBarGraph;