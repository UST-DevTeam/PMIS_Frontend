import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NewMultiSelects from "../../../components/NewMultiSelect";
import GraphActions from "../../../store/actions/graph-actions";
import Button from "../../../components/Button";
import { UilSearch, UilRefresh } from "@iconscout/react-unicons";
import NewSingleSelect from "../../../components/NewSingleSelect";
import CurrentuserActions from "../../../store/actions/currentuser-action";
import moment from "moment";
import TripleLineFourBarGraph from "../../../components/TripleLineFourBarGraph";
import LineTripleGraph from "../../../components/LineTripleGraph";

const ProfitAndLossTrend = () => {
  const exportData = useRef([]);
  const months = [];
  const now = new Date();
  const monthsNumber = [];
  const month=8

  for (let i = 0; i < 6; i++) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const month = date.getMonth() + 1;
    monthsNumber.push(month);
    const year = date.getFullYear();
    months.push({ month, year });
  }

  months.reverse();
  monthsNumber.reverse();

  const [extraColumnsState, setExtraColumns] = useState(months);

  const currentYear = new Date().getFullYear();
    const [selectedCircle, setSelectedCircle] = useState([]);
  const [selectedYears, setSelectedYears] = useState(null);
  const [selectedMonths, setSelectedMonths] = useState([]);
  const [selectedCostCenter, setSelectedCostCenter] = useState([]);
  const endDate = moment().format("Y");
  const dispatch = useDispatch();


  let CostCenterList = useSelector((state) => {
    return state?.currentuserData?.getcurrentusercostcenter?.map((itm) => ({
      label: itm?.costCenter,
      value: itm?.uniqueId,
    }));
  });

  let GraphData = useSelector((state) => {
    return state?.GraphData?.getGraphPAndLTrends || [];
  });



  useEffect(() => {
    dispatch(CurrentuserActions.getcurrentuserCostCenter(true, "", 0));
    dispatch(GraphActions.getGraphPAndLTrends());
  }, []);

const handleFilter = () => {
    const filterData = {};
    if (selectedYears) {
      filterData.year = selectedYears.value;
    }
    if (selectedMonths.length > 0) {
        filterData.viewBy = selectedMonths?.map((Sweety) => Sweety.value);
      }
    if (selectedCostCenter.length > 0) {
      filterData.costCenter = selectedCostCenter?.map((Sweety) => Sweety.value);
    }
    dispatch(GraphActions.postGraphPAndLTrends(filterData, () => {}));
  };


  const handleClear = () => {
    setSelectedYears(null);
    setSelectedMonths([]);
    setSelectedCostCenter([]);
    dispatch(GraphActions.getGraphPAndLTrends());
  };

  let listYear = [];
  for (let ywq = 2023; ywq <= +endDate; ywq++) {
    listYear.push({'value':ywq,'label':ywq});
  }

  const monthsList = [
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
  return (
    <div className="bg-transparent border-[1.5px] border-pcol rounded-md h-full p-4">
         <div className="text-center mb-4">
            <h1 className="text-[#f4d3a8] font-bold text-lg whitespace-nowrap underline">Profit & Loss Trend</h1>
        </div>
        <div className="flex items-center justify-between space-x-10">
        <div className="flex space-x-2 items-center w-full">
          <NewSingleSelect
            label="Year"
            option={listYear}
            value={selectedYears || null}
            placeholder="Year"
            cb={(data) => setSelectedYears(data)}
          />
          <NewMultiSelects
            label="Month"
            option={monthsList}
            value={selectedMonths}
            cb={(data) => setSelectedMonths(data)}
            placeholder="Month"
          />
          <NewMultiSelects
            label="Cost Center"
            option={CostCenterList}
            value={selectedCostCenter}
            cb={(data) => setSelectedCostCenter(data)}
            placeholder="Cost Center"
          />
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
              icon={<UilRefresh size="36" className = "text-[#f4d3a8]" />}
            ></Button>
          </div>
        </div>
      <LineTripleGraph data={GraphData} headerName={"Profit_and_Loss_Trend"} />
    </div>
  );
};

export default ProfitAndLossTrend;