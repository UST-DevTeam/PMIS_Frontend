import React from "react";
import ReactApexChart from "react-apexcharts";

const ColumnChart = ({data,headerName,colors}) => {
  const chartData = {
    series: [{
      name:"Count",
      data: data
    }],
    options: {
      chart: {
        height: 350,
        type: 'bar',
        background:'#3e454d',
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
      colors: ["#13b497", "#ffab2d", "#2b98d6", "#fd5c63",],
      plotOptions: {
        bar: {
          columnWidth: '45%',
          distributed: true,
          dataLabels: {
            position: 'top',
          }
        }
      },
      xaxis: {
        categories: [
          ['Total Open Qunatity'],
          ['Invoiced Quantity'],   
          ['Workdone Quantity'],
          ['Open Quantity']  
        ],
        labels: {
          style: {
            colors: 'White',
          }
        }
      },
      yaxis: {
        labels: {
          style: {
            colors: 'White',
          }
        }
      },
      grid: {
        show: false,
        borderColor: '#1c1c1c'
      },
      // tooltip: {
      //   x: {
      //     show: false,
      //   }
      // },
      legend: {
        show: true,
        labels: {
          colors: '#ffffff',
        },
      },
    }
  };

  return (
  
      <ReactApexChart options={chartData.options} series={chartData.series} type="bar" height={350} />
  );
};
export default ColumnChart;
