import React, { useEffect,useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as Unicons from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NewMultiSelects from "../../../components/NewMultiSelect";
import GraphActions from "../../../store/actions/graph-actions";
import FilterActions from "../../../store/actions/filter-actions";
import Button from "../../../components/Button";
import DountChart from "../../../components/DountChart";
import PieChart from "../../../components/PieChart";
import { UilImport,UilSearch,UilRefresh } from '@iconscout/react-unicons'
import PolarChart from "../../../components/FormElements/PolarChart";
import AreaChart from "../../../components/AreaChart";
import moment from "moment/moment";
import FormssActions from "../../../store/actions/formss-actions";
import NewSingleSelect from "../../../components/NewSingleSelect";
import LineChartsss from "../../../components/LineChartsss";
import { Series } from "highcharts";


const AccrualRevenueTrendChart = () => {

    const exportData = useRef([])
    const months = [];
    const now = new Date();
    const monthsNumber = []

  for (let i = 0; i < 6; i++) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const month = date.getMonth() + 1;
    monthsNumber.push(month)
    const year = date.getFullYear();
    months.push({ month, year });
  }

    months.reverse();
    monthsNumber.reverse();


  const [extraColumnsState, setExtraColumns] = useState(months);

    const currrentYear = new Date().getFullYear();

    const [type, settype] = useState(false);
    const [selectedOptions1, setSelectedOptions1] = useState([]);
    const [selectedOptions2, setSelectedOptions2] = useState([]);
    const [selectedOptions3, setSelectedOptions3] = useState([]);
    const endDate = moment().format("Y");
    const [year, setyear] = useState(currrentYear);
    let dispatch = useDispatch();
    const [ data ,setData] = useState([])

   

    let costCenterList = useSelector((state) => {
        return state?.formssData?.getAccrualRevenueTrend.map((itm) => {
          return {
            label: itm.costCenter,
            value: itm.uniqueId,
          };
        });
      });

    let listYear = [];
        for (let ywq = 2021; ywq <= +endDate; ywq++) {
            listYear.push({
                label:ywq,
                value:ywq
            });
        }


    let listMonth = [
        { value: 1, label: "Jan" },
        { value: 2, label: "Feb" },
        { value: 3, label: "Mar" },
        { value: 4, label: "Apr" },
        { value: 5, label: "May" },
        { value: 6, label: "Jun" },
        { value: 7, label: "Jul" },
        { value: 8, label: "Aug" },
        { value: 9, label: "Sep" },
        { value: 10, label: "Oct" },
        { value: 11, label: "Nov" },
        { value: 12, label: "Dec" },
    ];

      

    let pieGraphData = useSelector((state) => {
        return state?.GraphData?.getGraphAccrualRevenueTrend ||['']
    });

    const SeriesData = [
      {
          name: "Acc.Revenue",
          data: pieGraphData?.map(item => item.y) ||[],
      },
  ];





    useEffect(() => {
        exportData.current = []
        extraColumnsState.forEach((itm) => {
            exportData.current =  [...exportData.current, 'M-'+itm.month+"Y-"+itm.year]
          });
          dispatch(
                GraphActions.postGraphAccrualRevenueTrend(
              {
                Monthly: exportData.current.join(",")
              },
              () => {}
            )
          );
          // dispatch(
          //       FormssActions.postAccrualRevenueTrend(
          //     {
          //       Monthly: exportData.current.join(",")
          //     },
          //     () => {}
          //   )
          // );
    }, []);



    const handleFilter = () => {
      const filterData = {
        selectedOptions1: selectedOptions1.value || "",
        selectedOptions2: selectedOptions2.value || currrentYear,
        selectedOptions3: selectedOptions3.length ? selectedOptions3.map(item => item.value) : monthsNumber,
      }
      exportData.current = []
      filterData?.selectedOptions3.forEach((itm) =>{
        exportData.current =  [...exportData.current,  'M-'+itm+"Y-"+filterData?.selectedOptions2]
      })
      dispatch(GraphActions.postGraphAccrualRevenueTrend(
        {
          Monthly: exportData.current.join(","),costCenter:filterData?.selectedOptions1 || ""
        }, () => {}));
    }

    const handleClear = () => {
      setSelectedOptions1([]);
      setSelectedOptions2([]);
      setSelectedOptions3([]);
      exportData.current = []
        extraColumnsState.forEach((itm) => {
            exportData.current =  [...exportData.current, 'M-'+itm.month+"Y-"+itm.year]
          });
          dispatch(
                GraphActions.postGraphAccrualRevenueTrend(
              {
                Monthly: exportData.current.join(",")
              },
              () => {}
            )
          );
    };

    return (
      <div className="bg-transparent border-[1.5px] border-pcol rounded-md h-full p-4">
        <div className="text-center mb-4">
            <h1 className="text-[#f4d3a8] font-bold text-lg whitespace-nowrap underline">Accrual Revenue Trend</h1>
        </div>
        <div className="flex items-center justify-between space-x-10">
        <div className="flex space-x-2 items-center w-full">
                  <NewSingleSelect label='Cost Center' option={costCenterList} value={selectedOptions1} cb={( data ) => setSelectedOptions1(data)} placeholder = "Cost Center" />

                  <NewSingleSelect label='Year' option={listYear} value={selectedOptions2} cb={( data ) => setSelectedOptions2(data)} placeholder = "Year" />

                  <NewMultiSelects label='Month' option={listMonth} value={selectedOptions3} cb={( data ) => setSelectedOptions3(data)} placeholder = "Month" />
                
                  </div>
                <div className="flex space-x-2">
                      <Button
                        classes="w-12 h-10 text-white mt-1 flex justify-center bg-transparent border-solid border-[#64676d] border-2"
                        onClick={handleFilter}
                        icon={<UilSearch size="36" className="text-[#f4d3a8]" />}
                      ></Button>
                      <Button
                        classes="w-12 h-10 text-white mt-1 flex justify-center bg-transparent border-solid border-[#64676d] border-2"
                        onClick={handleClear}
                        icon={<UilRefresh size="36" className = "text-[#f4d3a8]"/>}
                      ></Button>
                    </div>
                  </div>
              <LineChartsss data = {pieGraphData} headerName={"Accrual_Revenue_Trend"} seriesData={SeriesData} dataLabelSuffix="L"/>

            </div>

    );
};
export default AccrualRevenueTrendChart;