// import React, { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import * as Unicons from "@iconscout/react-unicons";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import GraphActions from "../../../store/actions/graph-actions";
// import FilterActions from "../../../store/actions/filter-actions";
// import Button from "../../../components/Button";
// import { UilImport, UilSearch, UilTimes, UilRefresh } from '@iconscout/react-unicons'
// import BarGraph from "../../../components/BarGrpah";
// import AdminActions from "../../../store/actions/admin-actions";
// import NewSingleSelect from "../../../components/NewSingleSelect";
// import NewMultiSelects from "../../../components/NewMultiSelect";


// const WeeklyActiveEmpList = () => {
//     const [type, setType] = useState(false);
//     const [selectedDepartment, setSelectedDepartment] = useState([]);
//     const [selectedOptions1, setSelectedOptions1] = useState([]);
//     const [selectedOptions2, setSelectedOptions2] = useState([]);
//     const [selectedOptions3, setSelectedOptions3] = useState([]);
//     let dispatch = useDispatch();
//     const [ data ,setData] = useState([])

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
//         return state?.GraphData?.getGraphWeeklyActiveEmp || []
//     });

//     useEffect(() => {
//         dispatch(AdminActions.getManageDepartment());
//         dispatch(GraphActions.getGraphWeeklyActiveEmp());
//     }, []);

//     const handleFilter = () => {

        
//       const filterData = {
//         ...(setSelectedDepartment.length && { selectedDepartment: selectedDepartment?.map(item => item.department) }),
//       }
//       const departmentValue = selectedDepartment.length > 0 ? selectedDepartment[0].value : '';
  
//       dispatch(GraphActions.getGraphWeeklyActiveEmp(filterData, `department=${departmentValue}`))
  
//     }
//     const handleClear = () => {
//       setSelectedDepartment([]);
//       dispatch(GraphActions.getGraphWeeklyActiveEmp());
//     };


//     return (
//         <div className="bg-transparent border-[1.5px] border-pcol rounded-md h-full p-4">
//             <div className="flex items-center space-x-4 mb-8">
//             <div className="flex space-x-4 justify-between w-full">
//               <NewMultiSelects label='Partner' option={departmentList} value={selectedDepartment} cb={(data) => setSelectedDepartment(data)} />
//             <div className="flex space-x-4">
//               <Button classes="w-12 h-10 text-white mt-1 flex justify-center bg-[#3e454d] border-solid border-[#64676d] border-2" onClick={handleFilter} icon={<UilSearch size="18" className={"hello"} />}></Button>

//               <Button classes="w-12 h-10 text-white mt-1 flex justify-center bg-[#3e454d] border-solid border-[#64676d] border-2" onClick={handleClear} icon={<UilRefresh size="36" />}></Button>
//             </div>

//           </div>
//         </div>
//             <BarGraph data={GraphData} horizontal={false} title="Weekly Active Employee" />
//             {/* <BarGraph data={GraphData} horizontal={type} /> */}
//             {/* <button onClick={() => setType(true)}> <Unicons.UilHorizontalAlignLeft size="15" color="#13b497" /></button>
//             <button onClick={() => setType(false)}> <Unicons.UilVerticalAlignBottom size="15" color="#13b497" /></button> */}
//         </div>
//     );
// };
// export default WeeklyActiveEmpList; 

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

const WeeklyActiveEmpList = () => {

//   const [extraColumnsState, setExtraColumns] = useState(months);
  const [selectedDepartment, setSelectedDepartment] = useState([]);
  // const [selectedOrglevel, setSelectedOrgLevel] = useState([]);
  const dispatch = useDispatch();

  // let OrgLevelList = useSelector((state) => {
  //   return state?.GraphData?.getWeeklyHorizontalName?.map((itm) => ({
  //     label: itm?.description,
  //     value: itm?.description,
  //   }));
  // });
  // let departmentList = useSelector((state) => {
  //   return state?.adminData?.getManageDepartment?.map((itm) => ({
  //     label: itm?.department,
  //     value: itm?.uniqueId,
  //   }));
  // });
  let departmentList = useSelector((state) => {
    return state?.GraphData?.getGraphOrganizationLevel?.map((itm) => ({
      label: itm?.orgLevel,
      value: itm?.orgLevel,
    }));
  });

  let GraphData = useSelector((state) => {
    return state?.GraphData?.getGraphWeeklyActiveEmp || [];
  });

  // Utility function to get the week number
  const getWeekNumber = (date) => {
    const startDate = new Date(date.getFullYear(), 0, 1);
    const days = Math.floor((date - startDate) / (24 * 60 * 60 * 1000));
    const weekNumber = Math.ceil((days + 1) / 7);
    return weekNumber;
  };

  const today = new Date();
  const currentWeekNumber = getWeekNumber(today);
  const lastWeekNumber = currentWeekNumber - 1;


  const SeriesData = [
    {
      name: `Week - #${currentWeekNumber}`,
      data: GraphData?.map(item => item.joined) || [],
    },
    {
      name: `Week - #${lastWeekNumber}`,
      data: GraphData?.map(item => item.exit) || [],
    },
  ];

  useEffect(() => {
    // dispatch(GraphActions.getWeeklyHorizontalName());
    // dispatch(GraphActions.getGraphOrganizationLevel());
    // dispatch(AdminActions.getManageDepartment());
    dispatch(GraphActions.getGraphWeeklyActiveEmp());
  }, []);


  // const handleFilter = () => {
  //   const filterData = {
  //       description: selectedOrglevel?.map((item) => item.value) || [],
  //       orgLevel: selectedDepartment?.map((item) => item.value) || [],
  //   };

  //   dispatch(
  //     GraphActions.postGraphWeeklyActiveEmp(
  //       { description: filterData.description, orgLevel: filterData.orgLevel},
  //       () => {}
  //     )
  //   );
  // };

  const handleFilter = () => {
    const filterData = {};
    // if (selectedOrglevel.length > 0) {
    //   filterData.description = selectedOrglevel?.map((Sweety) => Sweety.value);
    // }
    if (selectedDepartment.length > 0) {
      filterData.orgLevel = selectedDepartment?.map((Sweety) => Sweety.value);
    }
    dispatch(GraphActions.postGraphWeeklyActiveEmp(filterData, () => {}));
  };


  const handleClear = () => {
    setSelectedDepartment([]);
    dispatch(GraphActions.getGraphWeeklyActiveEmp());
  };


  return (
    <div className="bg-transparent border-[1.5px] border-pcol rounded-md h-full p-4">
        <div className="text-center mb-4">
            <h1 className="text-[#f4d3a8] font-bold text-lg whitespace-nowrap underline">Weekly Active Employee</h1>
        </div>
        <div className="flex items-center justify-between space-x-10">
        <div className="flex space-x-2 items-center w-full">
          {/* <NewMultiSelects
            label="Org Level"
            option={OrgLevelList}
            value={selectedOrglevel}
            placeholder="Description"
            cb={(data) => setSelectedOrgLevel(data)}
          /> */}
          <NewMultiSelects
            label="Department"
            option={departmentList}
            value={selectedDepartment}
            placeholder="Org Level"
            cb={(data) => setSelectedDepartment(data)}
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
      <DoubleBarGraph data={GraphData} headerName={"Weekly_Active_Employee"} seriesData={SeriesData} horizontal={false}/>
    </div>
  );
};

export default WeeklyActiveEmpList;