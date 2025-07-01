import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NewMultiSelects from "../../../components/NewMultiSelect";
import GraphActions from "../../../store/actions/graph-actions";
import Button from "../../../components/Button";
import { UilSearch, UilRefresh } from "@iconscout/react-unicons";
import BarGraph from "../../../components/BarGrpah";
import AdminActions from "../../../store/actions/admin-actions";
import NewSingleSelect from "../../../components/NewSingleSelect";
import DoubleBarGraph from "../../../components/DoubleBarGraph";
import TripleBarGraph from "../../../components/TripleBarGraph";
import BarLineGraph from "../../../components/BarLineGraph";
import TripleLineBarGraph from "../../../components/TripleLineBarGraph";

const MS1AndMS2CircleWise = () => {
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
//   const [selectedDepartment, setSelectedDepartment ] = useState([]);
const [selectedCircle, setSelectedCircle] = useState([]);
  const [selectedProjectType, setSelectedProjectType] = useState([]);
  const [selectedYears, setSelectedYears] = useState(null);
  const [selectedMonths, setSelectedMonths] = useState([]);
  const dispatch = useDispatch();

  const monthStr = `${month}`;

let CircleList = useSelector((state) => {
    return state?.adminData?.getManageCircle?.map((itm) => ({
      label: itm?.circleCode,
      value: itm?.circleCode,
    }));
  });

  let AllProjectTypeList = useSelector((state) => {
    return state?.GraphData?.getGraphAllProjectType?.map((itm) => ({
      label: itm?.projectType,
      value: itm?.projectType,
    }));
  });

  let GraphData = useSelector((state) => {
    return state?.GraphData?.getGraphMS1AndMS2CircleWise || [];
  });

  let data1 = GraphData?.map(item => item.SiteIdCount) || []
  let data2 = GraphData?.map(item => item.TotalMS1Done) || []
  let data3 = GraphData?.map(item => item.TotalMS2Done) || []
  let data4 = GraphData?.map(item => item.ach1) || []
  let data5 = GraphData?.map(item => item.ach2) || []

  const SeriesData = [
    {
      name: "Total Sites",
      data: data1,
      type: "bar",
    },
    {
        name: "MS1",
        data: data2,
        type: "bar",
      },
      {
        name: "MS2",
        data: data3,
        type: "bar",
      },
      {
        name: "MS1/Total Sites(%)", 
        data: data4,
        type: "line", 
      },
      {
        name: "MS2/MS1(%)", 
        data: data5,
        type: "line", 
      },
  ];

  useEffect(() => {
    dispatch(AdminActions.getManageCircle(true,"",0));
    dispatch(GraphActions.getGraphAllProjectType(true,"",0));
    dispatch(GraphActions.getGraphMS1AndMS2CircleWise());
  }, []);

const handleFilter = () => {
    const filterData = {};
    if (selectedCircle.length > 0) {
      filterData.circleCode = selectedCircle?.map((Sweety) => Sweety.value);
    }
    if (selectedProjectType.length > 0) {
      filterData.projectType = selectedProjectType?.map((Sweety) => Sweety.value);
    }
    if (selectedYears) {
      filterData.year = selectedYears.value;
    }
    dispatch(GraphActions.postGraphMS1AndMS2CircleWise(filterData, () => {}));
  };


  const handleClear = () => {
    setSelectedCircle([]);
    setSelectedProjectType([]);
    setSelectedYears(null);
    dispatch(GraphActions.getGraphMS1AndMS2CircleWise());
  };

  const years = Array.from(new Array(currentYear - 2020), (val, index) => ({
    label: 2021 + index,
    value: 2021 + index,
  }));

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
            <h1 className="text-[#f4d3a8] font-bold text-lg whitespace-nowrap underline">MS1 / MS2 Report</h1>
        </div>
        <div className="flex items-center justify-between space-x-10">
        <div className="flex space-x-2 items-center w-full">
        <NewMultiSelects
            label="Circle"
            option={CircleList}
            value={selectedCircle}
            cb={(data) => setSelectedCircle(data)}
            placeholder="Circle"
          />
          <NewMultiSelects
            label="Project Type"
            option={AllProjectTypeList}
            value={selectedProjectType}
            cb={(data) => setSelectedProjectType(data)}
            placeholder="Project Type"
          />
          {/* <NewSingleSelect
            label="Year"
            option={years}
            value={selectedYears}
            placeholder="Year"
            cb={(data) => setSelectedYears(data)}
          /> */}
          {/* <NewMultiSelects
            label="Month"
            option={monthsList}
            value={selectedMonths}
            cb={(data) => setSelectedMonths(data)}
            placeholder="Month"
          /> */}
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
      <TripleLineBarGraph data={GraphData} headerName = {"MS1_MS2_Report"} seriesData={SeriesData} horizontal={false} YAxisTitle={"Sites"} XAxisTitle={"Circle"} columnWidth={"80%"} data1={data1} data2={data2} data3={data3} data4={data4} data5={data5}/>
    </div>
  );
};

export default MS1AndMS2CircleWise;