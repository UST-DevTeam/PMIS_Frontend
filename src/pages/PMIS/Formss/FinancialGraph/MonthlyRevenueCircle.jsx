import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NewMultiSelects from "../../../../components/NewMultiSelect";
import GraphActions from "../../../../store/actions/graph-actions";
import Button from "../../../../components/Button";
import { UilSearch, UilRefresh } from "@iconscout/react-unicons";
import NewSingleSelect from "../../../../components/NewSingleSelect";
import TripleBarGraph from "../../../../components/TripleBarGraph"


const MonthlyRevenueCircle = () => {
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
//   const [selectedDepartment, setSelectedDepartment] = useState([]);
  const [selectedCircle, setSelectedCircle] = useState([]);
  const [selectedZone, setSelectedZone] = useState([]);
  const [selectedProjectType, setSelectedProjectType] = useState([]);
  const [selectedYears, setSelectedYears] = useState(null);
  const [selectedMonths, setSelectedMonths] = useState([]);
  const dispatch = useDispatch();

  const monthStr = `${month}`;


  // let CircleList = useSelector((state) => {
  //   return state?.currentuserData?.getcurrentusercircleprojectid?.map((itm) => ({
  //     label: itm?.circle,
  //     value: itm?.projectuid,
  //   }));
  // });

  let ZoneList = useSelector((state) => {
    return state?.GraphData?.getGraphZoneInCirlceRevenue?.map((itm) => ({
      label: itm?.zone,
      value: itm?.projectgroupuid,
    }));
  });



  let GraphData = useSelector((state) => {
    return state?.GraphData?.getGraphRevenuePlanVSActual_Circle || [];
  });

  let data1 = GraphData?.map(item => item.aop) || []
  let data2 = GraphData?.map(item => item.pv) || []
  let data3 = GraphData?.map(item => item.amount) || []

  const SecondaryAxis = GraphData?.map(item => item.ach) || [];
  const ThirdAxis = GraphData?.map(item => item.percentage) || [];




  const SeriesData = [
    {
        name: "AOP-Target",
        type: "column",
        data: GraphData?.map(item => item.aop) || [],
        yaxisIndex: 0
    },
    {
        name: "PV-Target",
        type: "column",
        data: GraphData?.map(item => item.pv) || [],
        yaxisIndex: 0
    },
    {
        name: "Actual Revenue",
        type: "column",
        data: GraphData?.map(item => item.amount) || [],
        yaxisIndex: 0
    },
    {
        name: "Actual / PV (%)",
        type: "line",
        data: SecondaryAxis,
        yaxisIndex: 1
    },
    {
        name: "Actual / AOP (%)",
        type: "line",
        data: ThirdAxis,
        yaxisIndex: 1
    },
];


  useEffect(() => {
    dispatch(GraphActions.getGraphZoneInCirlceRevenue());
    dispatch(GraphActions.getGraphRevenuePlanVSActual_Circle());
  }, []);



const handleFilter = () => {
    const filterData = {};
    if (selectedZone.length > 0) {
      filterData.projectgroupuid = selectedZone?.map((Sweety) => Sweety.value);
    }
    if (selectedProjectType.length > 0) {
      filterData.projectType = selectedProjectType?.map((Sweety) => Sweety.value);
    }
    if (selectedYears) {
      filterData.year = selectedYears.value;
    }
    if (selectedMonths.length > 0) {
      filterData.viewBy = selectedMonths?.map((Sweety) => Sweety.value);
    }
    dispatch(GraphActions.postGraphRevenuePlanVSActual_Circle(filterData, () => {}));
  };


  const handleClear = () => {
    // setSelectedCircle([]);
    setSelectedZone([]);
    setSelectedProjectType([]);
    setSelectedYears(null);
    setSelectedMonths([]);
    dispatch(GraphActions.getGraphRevenuePlanVSActual_Circle());
  };

  const years = Array.from(new Array(currentYear - 2020), (val, index) => ({
    label: 2021 + index,
    value: 2021 + index,
  }));

  const monthsList = [
    { value: "1", label: "Jan" },
    { value: "2", label: "Feb" },
    { value: "3", label: "Mar" },
    { value: "4", label: "Apr" },
    { value: "5", label: "May" },
    { value: "6", label: "Jun" },
    { value: "7", label: "Jul" },
    { value: "8", label: "Aug" },
    { value: "9", label: "Sep" },
    { value: "10", label: "Oct" },
    { value: "11", label: "Nov" },
    { value: "12", label: "Dec" },
  ];

  return (
    <div className="bg-transparent border-[1.5px] border-pcol rounded-md h-full p-4">
         <div className="text-center mb-4">
            <h1 className="text-[#f4d3a8] font-bold text-lg whitespace-nowrap underline">Circle - Revenue Plan VS Actual</h1>
        </div>
        <div className="flex items-center justify-between space-x-10">
        <div className="flex space-x-2 items-center w-full">
        <NewMultiSelects
            label="Circle"
            option={ZoneList}
            value={selectedZone}
            cb={(data) => setSelectedZone(data)}
            placeholder="Zone"
          />
          {/* <NewMultiSelects
            label="Project Type"
            option={projectTypeList}
            value={selectedProjectType}
            cb={(data) => setSelectedProjectType(data)}
            placeholder="Project Type"
          /> */}
          <NewSingleSelect
            label="Year"
            option={years}
            value={selectedYears}
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
           </div>
      <div className="flex space-x-2">
            <Button
              classes="w-12 h-10 text-white mt-1 flex justify-center bg-transparent border-solid border-[#64676d] border-2"
              onClick={handleFilter}
              icon={<UilSearch size="36" className="text-[#f4d3a8]"/>}
            ></Button>
            <Button
              classes="w-12 h-10 text-white mt-1 flex justify-center bg-transparent border-solid border-[#64676d] border-2"
              onClick={handleClear}
              icon={<UilRefresh size="36" className = "text-[#f4d3a8]"/>}
            ></Button>
          </div>
        </div>
      <TripleBarGraph data={GraphData} headerName={"Circle_Revenue_Plan_VS_Actual"} seriesData={SeriesData} YAxisTitle={"Sites"} XAxisTitle={"Zone"} horizontal={false}  data1= {data1} data2= {data2} data3= {data3} data4= {SecondaryAxis} data5= {ThirdAxis} shubham={true}/>
    </div>
  );
};

export default MonthlyRevenueCircle;