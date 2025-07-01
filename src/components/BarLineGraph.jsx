import React from "react";
import ReactApexChart from "react-apexcharts";

const BarLineGraph = ({ data, headerName,
  seriesData = [],
  horizontal = false,
  title = "",
  columnWidth = "90%",
  dataLabelSuffix="",
  XAxisTitle = "",  
  YAxisTextTitle = 'Revenue (₹) Lac',
  YAxisSecondaryTitle = "Acheievement (%)",
  data1,
  data2,
  data3,
}) => {

  let max1 = Math.max(
    ...(data1 || []),
    ...(data2 || []),
  )
  if (max1 % 100 !== 0) {
    max1 = Math.ceil(max1 / 100) * 100;
  }



  let max2 = Math.max(
    ...(data3 || [])
  )

  if (max2 % 25 !== 0) {
    max2 = Math.ceil(max2 /25) * 25;
  }

    const category = data?.map(item => item.description);


        
    const defaultSeries = [];

    const series = seriesData.length > 0 ? seriesData : defaultSeries;

    const colors = ["#13b497", "#ffab2d", "#b8ee30"];
    // const BarBorderColors = ["#28a745", "#b8ee30","#b8ee30"];

    const options = {
        chart: {
            height: 440,
            type: 'line', 
            background: '#3e454d',
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
            align: 'center',
            style: {
                fontSize: '15px',
                fontWeight: 'bold',
                color: '#ffffff'
            }
        },
        dataLabels: {
            enabled: true,
            formatter: (val, { seriesIndex }) => (seriesIndex === 3 ? `${val}%` : `${val} ${dataLabelSuffix}`),
            enabledOnSeries: [0,1,2],
            formatter: (val, { seriesIndex }) => {
                if (seriesIndex === 2) {
                  return `${val}%`;
                }
                return val;
              },
            offsetY: -7,
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
                text: YAxisTextTitle, 
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
              tickAmount:5,
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
              max:max1
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
              tickAmount:5,
            }
          ],
        plotOptions: {
            bar: {
                columnWidth: '50%',
                horizontal: horizontal,
                borderRadius: 2,
               
            },
        },
        stroke: {
            colors: ["transparent", "transparent", "#b8ee30"],
            curve: 'smooth',
            width: ["1.5", "1.5", 2],
            // colors: BarBorderColors,
          },
        grid: {
            borderColor: 'transparent',
            strokeDashArray: 0,
        },
        markers: {
            size: 6, 
            colors: ['#b8ee30'], 
            strokeColor: 'black', 
            strokeWidth: 0.5, 
            hover: {
                size: 6, 
            }
        },
        fill: {
            colors: colors,
            opacity: [1, 1, 1],
        },
        legend: {
            show: true,
            colors: colors,
            position: "bottom",
            labels: {
                colors: '#ffffff'
            },
            markers: {
                fillColors: colors,
            },
            fontSize: '10px',
            fontWeight: 'bold',
        },
        tooltip: {
            theme: "dark",  
            marker: {
              fillColors: colors,  
            },
            y: {
              formatter: function(value, { seriesIndex }) {
                if (seriesIndex === 2) { 
                  return `${value}%`;  
                }
                return value;
              },
            },
          },
    };

    return <ReactApexChart options={options} series={series} type="line" height={355} />;
};

export default BarLineGraph;
