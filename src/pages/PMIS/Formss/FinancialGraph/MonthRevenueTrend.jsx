import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NewMultiSelects from "../../../../components/NewMultiSelect";
import GraphActions from "../../../../store/actions/graph-actions";
import Button from "../../../../components/Button";
import { UilSearch, UilRefresh } from "@iconscout/react-unicons";
import BarGraph from "../../../../components/BarGrpah";
import AdminActions from "../../../../store/actions/admin-actions";
import NewSingleSelect from "../../../../components/NewSingleSelect";
import DoubleBarGraph from "../../../../components/DoubleBarGraph";
import TripleBarGraph from "../../../../components/TripleBarGraph";

const MonthRevenueTrend = () => {
  const exportData = useRef([]);
  const months = [];
  const now = new Date();
  const monthsNumber = [];

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
  const [selectedProjectType, setSelectedProjectType] = useState([]);
  const [selectedYears, setSelectedYears] = useState(null);
  const [selectedMonths, setSelectedMonths] = useState([]);
  const dispatch = useDispatch();


  const CircleList = useSelector((state) => {
    return state?.currentuserData?.getcurrentusercircleprojectid?.map((itm) => ({
      label: itm?.circle,
      value: itm?.projectuid,
    }));
  });


  let GraphData = useSelector((state) => {
    return state?.GraphData?.getGraphRevenuePlanVSActual_Trend || [];
  });

  let data1 = GraphData?.map(item => item.aop) || []
  let data2 = GraphData?.map(item => item.pv) || []
  let data3 = GraphData?.map(item => item.amount) || []
  const SecondaryAxis = GraphData?.map(item => item.ach) || [];
  const ThirdAxis = GraphData?.map(item => item.percentage) || [];


  const SeriesData = [
    {
      name: "AOP-Target",
      type: "bar",
      data: data1,
  },
  {
      name: "PV-Target",
      type: "bar",
      data: data2,
  },
  {
      name: "Actual Revenue",
      type: "bar",
      data: data3,
  },
  {
      name: "Actual / PV (%)",
      type: "line",
      data: SecondaryAxis,
  },
  {
      name: "Actual / AOP (%)",
      type: "line",
      data: ThirdAxis,
  },
];

  useEffect(() => {
    dispatch(GraphActions.getGraphRevenuePlanVSActual_Trend());
  }, []);


  const handleFilter = () => {
    const filterData = {};
    if (selectedCircle.length > 0) {
      filterData.circleName = selectedCircle?.map((Sweety) => Sweety.value);
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
    dispatch(GraphActions.postGraphRevenuePlanVSActual_Trend(filterData, () => {}));
  };


  const handleClear = () => {
    setSelectedCircle([]);
    setSelectedProjectType([]);
    setSelectedYears(null);
    setSelectedMonths([]);
    dispatch(GraphActions.getGraphRevenuePlanVSActual_Trend());
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
            <h1 className="text-[#f4d3a8] font-bold text-lg whitespace-nowrap underline">Trend - Revenue Plan VS Actual</h1>
        </div>
        <div className="flex items-center justify-between space-x-10">
        <div className="flex space-x-2 items-center w-full">
          {/* <NewMultiSelects
            label="Circle"
            option={CircleList}
            value={selectedCircle}
            cb={(data) => setSelectedCircle(data)}
            placeholder="Circle" 
          /> */}
          {/* <NewMultiSelects
            label="Project Type"
            option={AllProjectTypeList}
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
              icon={<UilSearch size="36" className="text-[#f4d3a8]" />}
            ></Button>
            <Button
              classes="w-12 h-10 text-white mt-1 flex justify-center bg-transparent border-solid border-[#64676d] border-2"
              onClick={handleClear}
              icon={<UilRefresh size="36" className = "text-[#f4d3a8]"/>}
            ></Button>
          </div>
        </div>
      <TripleBarGraph data={GraphData} headerName={"Trend_Revenue_Plan_Vs_Actual"} seriesData={SeriesData} horizontal={false} YAxisTitle={"Sites"} data1= {data1} data2= {data2} data3= {data3} data4= {SecondaryAxis} data5= {ThirdAxis}/>
    </div>
  );
};

export default MonthRevenueTrend;


//===========================================================================================================================================================================================================================================


// import React, { useEffect, useRef, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import NewMultiSelects from "../../../../components/NewMultiSelect";
// import GraphActions from "../../../../store/actions/graph-actions";
// import Button from "../../../../components/Button";
// import { UilSearch, UilRefresh } from "@iconscout/react-unicons";
// import BarGraph from "../../../../components/BarGrpah";
// import AdminActions from "../../../../store/actions/admin-actions";
// import NewSingleSelect from "../../../../components/NewSingleSelect";
// import DoubleBarGraph from "../../../../components/DoubleBarGraph";
// import TripleBarGraph from "../../../../components/TripleBarGraph";

// const MonthRevenueTrend = () => {
//   const exportData = useRef([]);
//   const months = [];
//   const now = new Date();
//   const monthsNumber = [];

//   for (let i = 0; i < 6; i++) {
//     const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
//     const month = date.getMonth() + 1;
//     monthsNumber.push(month);
//     const year = date.getFullYear();
//     months.push({ month, year });
//   }

//   months.reverse();
//   monthsNumber.reverse();

//   const [extraColumnsState, setExtraColumns] = useState(months);

//   const currentYear = new Date().getFullYear();
//   // const [selectedDepartment, setSelectedDepartment] = useState([]);
//   const [selectedCircle, setSelectedCircle] = useState([]);
//   const [selectedProjectType, setSelectedProjectType] = useState([]);
//   const [selectedYears, setSelectedYears] = useState(null);
//   const [selectedMonths, setSelectedMonths] = useState([]);
//   const dispatch = useDispatch();

//   // let departmentList = useSelector((state) => {
//   //   return state?.GraphData?.getGraphOrganizationLevel?.map((itm) => ({
//   //     label: itm?.orgLevel,
//   //     value: itm?.orgLevel,
//   //   }));
//   // });

//   let CircleList = useSelector((state) => {
//     return state?.adminData?.getManageCircle?.map((itm) => ({
//       label: itm?.circleName,
//       value: itm?.circleName,
//     }));
//   });

//   let AllProjectTypeList = useSelector((state) => {
//     return state?.GraphData?.getGraphAllProjectType?.map((itm) => ({
//       label: itm?.projectType,
//       value: itm?.projectType,
//     }));
//   });

//   let GraphData = useSelector((state) => {
//     return state?.GraphData?.getGraphRevenuePlanVSActual_Trend || [];
//   });

//   const SecondaryAxis = GraphData?.map(item => item.ach) || [];


//   const SeriesData = [
//     {
//       name: "AOP-Target",
//       type: "bar",
//       data: GraphData?.map(item => item.aop) || [],
//   },
//   {
//       name: "PV-Target",
//       type: "bar",
//       data: GraphData?.map(item => item.pv) || [],
//   },
//   {
//       name: "Actual Revenue",
//       type: "bar",
//       data: GraphData?.map(item => item.amount) || [],
//   },
//   {
//       name: "Acheievement(%)",
//       type: "line",
//       data: SecondaryAxis,
//       yaxis: 1
//   },
// ];

//   useEffect(() => {
//     // dispatch(AdminActions.getManageCircle());
//     // dispatch(GraphActions.getGraphAllProjectType());
//     dispatch(GraphActions.getGraphRevenuePlanVSActual_Trend());
//     fetchGraphData(); 
//   }, []);

//   const fetchGraphData = () => {
//     // exportData.current = extraColumnsState.map(
//     //   (itm) => `M-${itm.month}Y-${itm.year}`
//     // );
//     dispatch(
//       GraphActions.getGraphRevenuePlanVSActual_Trend(
//       )
//     );
//   };

//   // const handleFilter = () => {
//   //   const filterData = {
//   //     orgLevel: selectedDepartment.map((item) => item.value) || [],
//   //     year: selectedYears ? selectedYears.value : currentYear,
//   //     month: selectedMonths?.map((item) => item.value) || monthsNumber,
//   //   };
//   //   console.log('FilterData:', filterData);

//   //   dispatch(
//   //     GraphActions.postGraphMonthlyJoiningVsExit(
//   //       { orgLevel: filterData.orgLevel, year: filterData.year, month: filterData.month },
//   //       () => {}
//   //     )
//   //   );
//   // };
//   const handleFilter = () => {
//     const filterData = {};
//     if (selectedCircle.length > 0) {
//       filterData.circleName = selectedCircle?.map((Sweety) => Sweety.value);
//     }
//     if (selectedProjectType.length > 0) {
//       filterData.projectType = selectedProjectType?.map((Sweety) => Sweety.value);
//     }
//     if (selectedYears) {
//       filterData.year = selectedYears.value;
//     }
//     if (selectedMonths.length > 0) {
//       filterData.month = selectedMonths?.map((Sweety) => Sweety.value);
//     }
//     dispatch(GraphActions.postGraphRevenuePlanVSActual_Trend(filterData, () => {}));
//   };


//   const handleClear = () => {
//     setSelectedCircle([]);
//     setSelectedProjectType([]);
//     setSelectedYears(null);
//     setSelectedMonths([]);
//     fetchGraphData();
//     // dispatch(GraphActions.getGraphRevenuePlanVSActual_Circle());
//   };  

//   const years = Array.from(new Array(currentYear - 2020), (val, index) => ({
//     label: 2021 + index,
//     value: 2021 + index,
//   }));

//   const monthsList = [
//     { value: 1, label: "Jan" },
//     { value: 2, label: "Feb" },
//     { value: 3, label: "Mar" },
//     { value: 4, label: "Apr" },
//     { value: 5, label: "May" },
//     { value: 6, label: "Jun" },
//     { value: 7, label: "Jul" },
//     { value: 8, label: "Aug" },
//     { value: 9, label: "Sep" },
//     { value: 10, label: "Oct" },
//     { value: 11, label: "Nov" },
//     { value: 12, label: "Dec" },
//   ];

//   return (
//     <div className="bg-transparent border-[1.5px] border-pcol rounded-md h-full p-4">
//        <div className="text-center mb-4">
//             <h1 className="text-white text-base font-bold">Trend - Revenue Plan VS Actual</h1>
//         </div>
//         <div className="flex items-center justify-between space-x-10">
//         <div className="flex space-x-2 items-center w-full">
//           <NewMultiSelects
//             label="Circle"
//             option={CircleList}
//             value={selectedCircle}
//             cb={(data) => setSelectedCircle(data)}
//             placeholder="Circle"
//           />
//           {/* <NewMultiSelects
//             label="Project Type"
//             option={AllProjectTypeList}
//             value={selectedProjectType}
//             cb={(data) => setSelectedProjectType(data)}
//             placeholder="Project Type"
//           /> */}
//           <NewSingleSelect
//             label="Year"
//             option={years}
//             value={selectedYears}
//             placeholder="Year"
//             cb={(data) => setSelectedYears(data)}
//           />
//           <NewMultiSelects
//             label="Month"
//             option={monthsList} 
//             value={selectedMonths}
//             cb={(data) => setSelectedMonths(data)}
//             placeholder="Month"
//           />
//            </div>
//       <div className="flex space-x-2">
//             <Button
//               classes="w-12 h-10 text-white mt-1 flex justify-center bg-transparent border-solid border-[#64676d] border-2"
//               onClick={handleFilter}
//               icon={<UilSearch size="18" className={"hello"} />}
//             ></Button>
//             <Button
//               classes="w-12 h-10 text-white mt-1 flex justify-center bg-transparent border-solid border-[#64676d] border-2"
//               onClick={handleClear}
//               icon={<UilRefresh size="36" />}
//             ></Button>
//           </div>
//         </div>
//       <TripleBarGraph data={GraphData} seriesData={SeriesData} horizontal={false} YAxisTitle={"Sites"} enabledOnSeries={[true, true, true]} dataLabelSuffix="L" 
//       yaxis={[
//         {
//           title: {
//             text: "Primary Axis - Revenue", // Custom title for Primary Axis
//           },
//           opposite: false, // This will be on the left side by default
//         },
//         {
//           title: {
//             text: "Secondary Axis - Achievement (%)", // Custom title for Secondary Axis
//           },
//           opposite: true, // This will be on the right side
//         },
//       ]}/>
//     </div>
//   );
// };

// export default MonthRevenueTrend;