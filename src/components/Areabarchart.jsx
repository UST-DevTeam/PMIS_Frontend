import React from "react";
import ReactApexChart from "react-apexcharts";

const Areabarchart = () => {
  const seriesData = [{
    name: "ABC",
    data: ["20","60","5","30"]
  }];

  const optionsData = {
    chart: {
      type: 'area',
      height: 320,
      zoom: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'straight'
    },
    title: {
      text: 'Fundamental Analysis of Stocks' ,
      align: 'left'
    },
    subtitle: {
      text: 'Price Movements',
      align: 'left'
    },
    labels: ["15NOv","16NOV","17NOV","18NOv"],
    xaxis: {
      type: 'datetime',
    },
    yaxis: {
      opposite: false
    },
    legend: {
      horizontalAlign: 'left'
    }
  };

  return (
    <div>
      <div id="chart" className="bg-gray-200 shadow-md rounded-md">
        <ReactApexChart options={optionsData} series={seriesData} type="area" height={240} />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default Areabarchart;
