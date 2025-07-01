import React from "react";
import ReactApexChart from "react-apexcharts";

const LineChartsss = ({ data,headerName, horizontal = false, seriesData = [], title="", XAxisTitle = "", YAxisTitle = "", dataLabelSuffix="", }) => {

    let category = data?.map(item => item.description) ||[];
    const defaultSeries = [
        {
            name: "Active Employee",
            data: data?.map(item => item.count) ||[],
        },
    ];
    const series = seriesData.length > 0 ? seriesData : defaultSeries;

    const options = {
        chart: {
            height: 400,
            type: 'line',
            background: '#3e454d',
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
            },
        },
        dataLabels: {
            enabled: true,
            formatter: (val) => `${val} ${dataLabelSuffix}`,
            style: {
                fontSize: '13px',
                fontWeight: 'bold',
                colors: ['transparent'],
            }, 
            offsetY: -7,
            dropShadow: {
                enabled: false,
            }, 
            background: {
                enabled: true,
                borderColor: 'transparent',
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
                    colors: '#ffffff',
                    fontSize: '10px',
                }
            }
        },
        yaxis: {
            title: {
                text: YAxisTitle,
                style: {
                  color: '#ffffff',
                  fontSize: '17px',
                  fontWeight: 'bold',
                },
              },
            labels: {
                style: {
                    colors: '#ffffff',
                    fontSize: '9px',
                }
            }
        },
        stroke: {
            curve: 'smooth',
            width: 3,
            // colors: '#f9a3a4'
            colors: '#5cccb7'
        },
        grid: {
            borderColor: 'transparent',
            strokeDashArray: 0,
        },
        markers: {
            size: 4.5, 
            colors: ['#ffab2d'], 
            strokeColor: 'black', 
            strokeWidth: 0.5, 
            hover: {
                size: 6, 
            }
        },
        tooltip: {
            theme: "dark",  
            marker: {
                fillColors: ['#ffab2d'],  
            },
            },  
        
    };

    return (
        <ReactApexChart options={options} series={series} type="line" height={400} />
    );
}

export default LineChartsss;


