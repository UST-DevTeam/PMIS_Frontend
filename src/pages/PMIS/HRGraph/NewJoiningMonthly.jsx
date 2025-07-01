// import React, { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import * as Unicons from "@iconscout/react-unicons";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import GraphActions from "../../../store/actions/graph-actions";
// import FilterActions from "../../../store/actions/filter-actions";
// import Button from "../../../components/Button";
// import DountChart from "../../../components/DountChart";
// import PieChart from "../../../components/PieChart";
// import { UilImport, UilSearch, UilTimes, UilRefresh } from '@iconscout/react-unicons'
// import BarGraph from "../../../components/BarGrpah";
// import NewMultiSelects from "../../../components/NewMultiSelect";
// import AdminActions from "../../../store/actions/admin-actions";
// import NewSingleSelect from "../../../components/NewSingleSelect";


// const NewJoiningMonthly = () => {
//     const [type, setType] = useState(false);
//     const [selectedDepartment, setSelectedDepartment] = useState([]);
//     const [selectedYears, setSelectedYears] = useState([]);
//     let dispatch = useDispatch();
//     const [ data ,setData] = useState([])

//     let customeruniqueId = "65dee316811c797c9f26d836"

//     const currentYear = new Date().getFullYear();
//     const years = Array.from(new Array(currentYear - 2020), (val, index) => 2021 + index);

//     let departmentList = useSelector((state) => {
//         return state?.adminData?.getManageDepartment.map((itm) => {
//           return {
//             label: itm?.department,
//             value: itm?.uniqueId,
//           };
//         });
//       });

//       let projectTypeList = useSelector((state) => {
//         return state?.filterData?.getProjectProjectType.map((itm) => {
//           return {
//             label: itm.projectType,
//             value: itm.projectType,
//           };
//         });
//       });

//       let projectManagerList = useSelector((state) => {
//         return state?.filterData?.getProjectProjectManager.map((itm) => {
//           return {
//             label: itm.projectManager,
//             value: itm.projectManager,
//           };
//         });
//       });

//     let GraphData = useSelector((state) => {
//         return state?.GraphData?.getGraphNewJoiningMonthly || []
//     });
//     console.log(GraphData,"GraphDataGraphDataGraphData")

//     useEffect(() => {
//         dispatch(AdminActions.getManageDepartment());
//         dispatch(GraphActions.getGraphNewJoiningMonthly());
//     }, []);

//     // const handleFilter = () => {

        
//     //     const filterData = {
//     //       ...(setSelectedDepartment.length && { selectedDepartment: selectedDepartment?.map(item => item.department) }),
//     //     }
//     //     const departmentValue = selectedDepartment.length > 0 ? selectedDepartment[0].value : '';
    
//     //     dispatch(GraphActions.postGraphPOStatus(filterData,() => {}))
    
//     //   }
//       const handleClear = () => {
//         setSelectedDepartment([]);
//         setSelectedYears([]);
//         dispatch(GraphActions.getGraphNewJoiningMonthly());
//       };

//       const handleFilter = () => {
//         const filterData = {
//           ...(selectedDepartment.length && { department: selectedDepartment.map(item => item.value) }),
//           ...(selectedYears.length && { year: selectedYears.map(year => year) })
//         }
    
//         dispatch(GraphActions.postGraphNewJoiningMonthly(filterData,() => {}))
    
//       }

//     return (
//         <div className="bg-transparent border-[1.5px] border-pcol rounded-md h-full p-4">
//              <div className="flex items-center space-x-4 mb-8">
//             <div className="flex space-x-4 justify-between w-full">
//               <NewMultiSelects label='Partner' option={departmentList} value={selectedDepartment} cb={(data) => setSelectedDepartment(data)} />
//               <NewMultiSelects label='Year' option={years.map(year => ({ label: year, value: year }))} value={selectedYears} cb={(data) => setSelectedYears(data)} />
//             <div className="flex space-x-4">
//               <Button classes="w-12 h-10 text-white mt-1 flex justify-center bg-[#3e454d] border-solid border-[#64676d] border-2" onClick={handleFilter} icon={<UilSearch size="18" className={"hello"} />}></Button>

//               <Button classes="w-12 h-10 text-white mt-1 flex justify-center bg-[#3e454d] border-solid border-[#64676d] border-2" onClick={handleClear} icon={<UilRefresh size="36" />}></Button>
//             </div>

//           </div>
//         </div>
            
//             <BarGraph data={GraphData} horizontal={false} title="Monthly New Joining"/>
//             {/* <BarGraph data={GraphData} horizontal={type} /> */}
//             {/* <button onClick={() => setType(true)}> <Unicons.UilHorizontalAlignLeft size="15" color="#13b497" /></button>
//             <button onClick={() => setType(false)}> <Unicons.UilVerticalAlignBottom size="15" color="#13b497" /></button> */}
//         </div>
//     );
// };
// export default NewJoiningMonthly;


import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NewMultiSelects from "../../../components/NewMultiSelect";
import GraphActions from "../../../store/actions/graph-actions";
import Button from "../../../components/Button";
import { UilSearch, UilRefresh } from "@iconscout/react-unicons";
import BarGraph from "../../../components/BarGrpah";
import AdminActions from "../../../store/actions/admin-actions";
import NewSingleSelect from "../../../components/NewSingleSelect";

const NewJoiningMonthly = () => {
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
  const [selectedDepartment, setSelectedDepartment] = useState([]);
  const [selectedYears, setSelectedYears] = useState(null);
  const [selectedMonths, setSelectedMonths] = useState([]);
  const dispatch = useDispatch();

  // let departmentList = useSelector((state) => {
  //   return state?.adminData?.getManageDepartment?.map((itm) => ({
  //     label: itm?.department,
  //     value: itm?.uniqueId,
  //   }));
  // });
  let ORGLevelList = useSelector((state) => {
    return state?.GraphData?.getGraphOrganizationLevel?.map((itm) => ({
      label: itm?.orgLevel,
      value: itm?.orgLevel,
    }));
  });

  let GraphData = useSelector((state) => {
    return state?.GraphData?.getGraphNewJoiningMonthly || [];
  });


  useEffect(() => {
    // dispatch(AdminActions.getManageDepartment());
    dispatch(GraphActions.getGraphOrganizationLevel());
    dispatch(GraphActions.getGraphNewJoiningMonthly());
  }, []);

;

  // const handleFilter = () => {
  //   const filterData = {
  //     orgLevel: selectedDepartment?.map((item) => item.value) || [],
  //     year: selectedYears ? selectedYears.value : currentYear,
  //     month: selectedMonths?.map((item) => item.value) || monthsNumber,
  //   };

  //   dispatch(
  //     GraphActions.postGraphNewJoiningMonthly(
  //       { orgLevel: filterData.orgLevel, year: filterData.year, month: filterData.month },
  //       () => {}
  //     )
  //   );
  // };
  const handleFilter = () => {
    const filterData = {};
    if (selectedDepartment.length > 0) {
      filterData.orgLevel = selectedDepartment?.map((Sweety) => Sweety.value);
    }
    if (selectedYears) {
      filterData.year = selectedYears.value;
    }
    if (selectedMonths.length > 0) {
      filterData.month = selectedMonths?.map((Sweety) => Sweety.value);
    }
    dispatch(GraphActions.postGraphNewJoiningMonthly(filterData, () => {}));
  };
  


  const handleClear = () => {
    setSelectedDepartment([]);
    setSelectedYears(null);
    setSelectedMonths([]);
    dispatch(GraphActions.getGraphNewJoiningMonthly());
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
            <h1 className="text-[#f4d3a8] font-bold text-lg whitespace-nowrap underline">Monthly New Joining</h1>
        </div>
        <div className="flex items-center justify-between space-x-10">
        <div className="flex space-x-2 items-center w-full">
          <NewMultiSelects
            label="Department"
            option={ORGLevelList}
            value={selectedDepartment}
            placeholder="Org Level" 
            cb={(data) => setSelectedDepartment(data)}
          />
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
            placeholder="Month"
            cb={(data) => setSelectedMonths(data)}
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
      <BarGraph data={GraphData} headerName={"Monthly_New_Joining"} horizontal={false}  title="Monthly New Joining" />
    </div>
  );
};

export default NewJoiningMonthly;


