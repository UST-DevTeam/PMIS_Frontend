import { colors } from "@material-ui/core";
import { offset } from "highcharts";
import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const BarGraph = ({ data,headerName, seriesData = [], height="440", horizontal = false, title="", columnWidth="40%", dataLabelSuffix="", XAxisTitle = "", YAxisTitle = "",  colors = ["#13b497"], }) => { 
    let category = data?.map(item => item.description) ||[];

    const defaultSeries = [
        {
            name: "Active Employee",
            data: data?.map(item => item.count) ||[],
        },
    ];

    const series = seriesData?.length ? seriesData : defaultSeries;

    const offsetX = horizontal ? 13 : 0;
    const offsetY = horizontal ? 0 : -15;

    // const BarBorderColors = ["#399c85", "#cc881c", "#e19b9b", "#d178a5", "#8ab222"];


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
        
        // title: {
        //     text: title, 
        //     align: 'center',
        //     // offsetY: 15, 
        //     style: {
        //         fontSize: '15px',
        //         fontWeight: 'bold',
        //         color: '#ffffff'
        //     },
        // },
        dataLabels: {
            enabled: true,
            formatter: (val) => `${val} ${dataLabelSuffix}`,
            enabledOnSeries: [0],
            offsetY: offsetY,
            offsetX: offsetX,
            style: {
                colors: ["white"],
                fontSize: "10px",
                fontWeight: 'bold',
              },
        },
        xaxis: {
            // categories: ["AIRTEL MACRO KTK","AIRTEL MACRO UP WEST","AIRTEL SMALL CELL BIHAR & JHARKHAND","AIRTEL SMALL CELL DELHI & NCR","AIRTEL SMALL CELL ORISSA","AIRTEL SMALL CELL RAJASTHAN","AIRTEL SURVEY KOLKATA","AIRTEL TI SERVICE J&K","AIRTEL TI SERVICES AP & TELANGANA","AIRTEL TI SERVICES MPCG","AIRTEL TI SERVICES MUMBAI","AIRTEL TI SERVICES PUNJAB","AIRTEL TI SERVICES TNCH","AIRTEL TI SERVICES UP EAST"],
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
                    fontSize: '10px',
                }
            }
        },
        yaxis:{
            title: {
                text: YAxisTitle,
                style: {
                  color: '#ffffff',
                  fontSize: '16px',
                  fontWeight: 'bold',
                },
                left: "500px"
              },
            labels:{
                style:{
                    colors:'#ffffff',
                    fontSize: '10px',
                    fontWeight: 'bold',
                }
            },
        },
        plotOptions: {
            bar: {
                columnWidth: columnWidth,
                horizontal: horizontal,
                borderRadius: 4,
                borderRadiusApplication: 'end',
                dataLabels: {
                    style: {
                        colors: '#fff',
                    },
                    position: 'top',
                },
                // colors: {
                //     ranges: [{ from: 0, to: 200000, color: '#199afb'}],
                // },
                distributed: true,
            },
        },
        stroke: {
            width: [0],
            // colors: BarBorderColors,
          },
        grid: {
            borderColor: 'transparent',
            strokeDashArray: 0,
        },
        // colors: ["#33b2df","#546E7A","#d4526e","#13d8aa","#A5978B","#2b908f","#f9a3a4","#90ee7e","#f48024","#69d2e7"],
        // colors: ["#66c8e2","#7f8c8d","#f77a82","#2ee1c0","#c0b7a5","#5db7a3","#fbd0d0","#c4f4a0","#f6a04c","#9ee6f1"], recent use
        colors: colors,
        legend:{
            show: false,
            position:"bottom",
            labels:{
              colors:'#ffffff'
            },
            fontSize: '8px', 
            fontWeight: 'bold',           
          },
        tooltip: {
        theme: "dark",  
        marker: {
            fillColors: colors,  
        },
        },  
    };
    return (<ReactApexChart options={options} series={series} type="bar" height={height} />)
}
export default BarGraph;