import { colors } from "@material-ui/core";
import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const PentaBarGraph = ({ data, horizontal = false, title="", columnWidth="30%" }) => {
    // const horizontal = data?.horizontal || false;
    let SeriesData1 = data?.map(item => item.claimSubmitted) ||[];  
    let SeriesData2 = data?.map(item => item.claimApproved) ||[];  
    let SeriesData3 = data?.map(item => item['L2-Approved']) ||[];  
    let SeriesData4 = data?.map(item => item['L1-Approved']) ||[];  
    let SeriesData5 = data?.map(item => item['Rejected']) ||[];  
    let category = data?.map(item => item.description) ||[];
    // let SeriesDataMonth = data?.map(item => item.month_year) ||[];
    // let category = data?.map(item => item.description) ||[];

    const series = [
        {
            name: "Active Employee",
            data: SeriesData1,
        },
        {
            name: "Active Employee",
            data: SeriesData2,
        },
        {
            name: "Active Employee",
            data: SeriesData3,
        },
        {
            name: "Active Employee",
            data: SeriesData4,
        },
        {
            name: "Active Employee",
            data: SeriesData5,
        },
    ];
    
    
    const options = {
        chart: {
            height: 440,
            type: 'bar',
            background: '#3e454d',

        },
        title: {
            text: title, 
            align: 'center',
            // offsetY: 15, 
            style: {
                fontSize: '15px',
                fontWeight: 'bold',
                color: '#ffffff'
            },
        },
        dataLabels: {
            enabled: true,
            style: {
                colors: ["white"],
                fontSize: "10px",
                fontWeight: 'bold',
              },
        },
        xaxis: {
            // categories: ["AIRTEL MACRO KTK","AIRTEL MACRO UP WEST","AIRTEL SMALL CELL BIHAR & JHARKHAND","AIRTEL SMALL CELL DELHI & NCR","AIRTEL SMALL CELL ORISSA","AIRTEL SMALL CELL RAJASTHAN","AIRTEL SURVEY KOLKATA","AIRTEL TI SERVICE J&K","AIRTEL TI SERVICES AP & TELANGANA","AIRTEL TI SERVICES MPCG","AIRTEL TI SERVICES MUMBAI","AIRTEL TI SERVICES PUNJAB","AIRTEL TI SERVICES TNCH","AIRTEL TI SERVICES UP EAST"],
            categories: category,
            labels:{
                style:{
                    colors:'#ffffff',
                    fontSize: '8px',
                }
            }
        },
        yaxis:{
            labels:{
                style:{
                    colors:'#ffffff',
                    fontSize: '8.45px',
                    fontWeight: 'bold',
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
                },
                // colors: {
                //     ranges: [{ from: 0, to: 200000, color: '#199afb'}],
                // },
                distributed: true,
            },
        },
        grid: {
            borderColor: 'transparent',
            strokeDashArray: 0,
        },
        // colors: ["#33b2df","#546E7A","#d4526e","#13d8aa","#A5978B","#2b908f","#f9a3a4","#90ee7e","#f48024","#69d2e7"],
        // colors: ["#66c8e2","#7f8c8d","#f77a82","#2ee1c0","#c0b7a5","#5db7a3","#fbd0d0","#c4f4a0","#f6a04c","#9ee6f1"], recent use
        colors: ["#5cccb7"], 
        legend:{
            show: true,
            position:"bottom",
            labels:{
              colors:'#ffffff'
            },
            fontSize: '8px', 
            fontWeight: 'bold',           
          },

    };
    return (<ReactApexChart options={options} series={series} type="bar" height={440} />)
}
export default PentaBarGraph;