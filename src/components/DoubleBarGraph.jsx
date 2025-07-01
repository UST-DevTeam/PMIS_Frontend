import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const DoubleBarGraph = ({ data,headerName, seriesData = [], horizontal = false, title="", XAxisTitle = "", YAxisTitle = "", columnWidth= '70%', dataLabelSuffix="",}) => {

    let category = data?.map(item => item.description) ||[];

    const defaultSeries = [
        {
            name: "Joined",
            data: data?.map(item => item.joined) || [],
        },
        {
            name: "Exit",
            data: data?.map(item => item.exit) || [],
        },
    ];

    const series = seriesData.length > 0 ? seriesData : defaultSeries;

    // const colors = ["#FFA0A0", "#B9D9EB"];
    const colors = ["#13b497", "#ffab2d"];
    // const BarBorderColors = ["#28a745", "#b8ee30"];

    const offsetY = horizontal ? 0 : -14;

    const options = {
        chart: {
            height: 440,
            type: 'bar',
            background: '#3e454d',
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
            formatter: (val) => `${val} ${dataLabelSuffix}`,
            enabledOnSeries: [0,1],
            offsetY: offsetY,
            style: {
                colors: ["white"],
                fontSize: "9px",
                fontWeight: 'bold',
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
            labels:{
                style:{
                    colors:'#ffffff',
                    fontSize: '9px',
                }
            }
        },
        yaxis:{
            title: {
                text: YAxisTitle,
                style: {
                  color: '#ffffff',
                  fontSize: '17px',
                  fontWeight: 'bold',
                },
              },
            labels:{
                style:{
                    colors:'#ffffff',
                    fontSize: '9px',
                },
                formatter: (value) => {
                    return Math.round(value);
                }
            }
        },
        plotOptions: {
            bar: {
                columnWidth: columnWidth,
                horizontal: horizontal,
                borderRadius: 2,
                dataLabels: {
                    style: {
                        colors: '#fff',
                    },
                    position: 'top',
                },
            },
        },
        stroke: {
            colors: ["transparent", "transparent", "#b8ee30"],
            curve: 'smooth',
            width: [1.5, 1.5],
            // colors: BarBorderColors,
          },
        grid: {
            borderColor: 'transparent',
            strokeDashArray: 0,
        },
        // fill: {
        //     colors: ["#FFA0A0", "#B9D9EB"]   
        //     // colors: ["#FFA0A0", "rgb(116,142,99)"]   
        // },
        fill:{
            colors: colors,
        },
        markers: {
            size: 6, 
            colors: colors,  
            strokeColor: 'black', 
            strokeWidth: 0.5, 
            hover: {
                size: 6, 
            }
        },
        legend: {
            show: true,
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
                colors: colors,  
            },
        },
    };
    return (<ReactApexChart options={options} series={series} type="bar" height={440} />)
}
export default DoubleBarGraph;