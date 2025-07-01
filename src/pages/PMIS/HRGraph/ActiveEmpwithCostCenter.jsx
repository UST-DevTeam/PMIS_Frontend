// import React, { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import GraphActions from "../../../store/actions/graph-actions";
// import FilterActions from "../../../store/actions/filter-actions";
// import Button from "../../../components/Button";
// import BarGraph from "../../../components/BarGrpah";
// import { UilImport, UilSearch, UilTimes, UilRefresh } from '@iconscout/react-unicons'
// import NewMultiSelects from "../../../components/NewMultiSelect";
// import AdminActions from "../../../store/actions/admin-actions";

// const ActiveEmpwithCostCenter = () => {
//     const [type, setType] = useState(false);
//     const [selectedDepartment, setSelectedDepartment] = useState([]);
//     const [selectedOptions1, setSelectedOptions1] = useState([]);
//     const [selectedOptions2, setSelectedOptions2] = useState([]);
//     const [selectedOptions3, setSelectedOptions3] = useState([]);
//     let dispatch = useDispatch();
//     const [ data ,setData] = useState([])

//     let customeruniqueId = "65dee316811c797c9f26d836"

//     let departmentList = useSelector((state) => {
//       return state?.adminData?.getManageDepartment.map((itm) => {
//         return {
//           label: itm?.department,
//           value: itm?.uniqueId,
//         };
//       });
//     });

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
//         return state?.GraphData?.getGraphActiveEmpWithCC || []
//     });

//     useEffect(() => {
//       // dispatch(AdminActions.getManageDepartment());
//       dispatch(GraphActions.getGraphActiveEmpwithCostCenter());
//     }, []);

//     // const handleFilter = () => {
//     //   const filterData = {
//     //     ...(setSelectedDepartment.length && { selectedDepartment: selectedDepartment?.map(item => item.description) }),
//     //   }
  
//     //   dispatch(GraphActions.getGraphActiveEmpwithCostCenter(filterData, () => { }))
  
//     // }
//     // const handleClear = () => {
//     //   setSelectedDepartment([]);
//     //   dispatch(GraphActions.getGraphActiveEmpwithCostCenter());
//     // };

//     return (
//         <div className="bg-transparent border-[1.5px] border-pcol rounded-md h-full p-4">
//           <div className="flex items-center space-x-4 mb-8">
//             <div className="flex space-x-4 justify-between w-full">
//               {/* <NewMultiSelects label='Partner' option={departmentList} value={selectedDepartment} cb={(data) => setSelectedDepartment(data)} /> */}
//             {/* <div className="flex space-x-4">
//               <Button classes="w-12 h-10 text-white mt-1 flex justify-center bg-[#3e454d] border-solid border-[#64676d] border-2" onClick={handleFilter} icon={<UilSearch size="18" className={"hello"} />}></Button>

//               <Button classes="w-12 h-10 text-white mt-1 flex justify-center bg-[#3e454d] border-solid border-[#64676d] border-2" onClick={handleClear} icon={<UilRefresh size="36" />}></Button>
//             </div> */}

//           </div>
//         </div>
          
//             <BarGraph data={GraphData} horizontal={true} title="Airtel Active Employee" />
//             {/* <BarGraph data={GraphData} horizontal={type} /> */}
//             {/* <button onClick={() => setType(true)}> <Unicons.UilHorizontalAlignLeft size="15" color="#13b497" /></button>
//             <button onClick={() => setType(false)}> <Unicons.UilVerticalAlignBottom size="15" color="#13b497" /></button> */}
//         </div>
//     );
// };
// export default ActiveEmpwithCostCenter; 

import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NewMultiSelects from "../../../components/NewMultiSelect";
import GraphActions from "../../../store/actions/graph-actions";
import Button from "../../../components/Button";
import { UilSearch, UilRefresh } from "@iconscout/react-unicons";
import BarGraph from "../../../components/BarGrpah";
import AdminActions from "../../../store/actions/admin-actions";
import NewSingleSelect from "../../../components/NewSingleSelect";

const ActiveEmpwithCostCenter = () => {

//   const [extraColumnsState, setExtraColumns] = useState(months);
  const [selectedDepartment, setSelectedDepartment] = useState([]);
  const [selectedOrglevel, setSelectedOrgLevel] = useState([]);
  const dispatch = useDispatch();

  let OrgLevelList = useSelector((state) => {
    return state?.GraphData?.getGraphOrganizationLevel?.map((itm) => ({
      label: itm?.orgLevel,
      value: itm?.orgLevel,
    }));
  });

  let GraphData = useSelector((state) => {
    return state?.GraphData?.getGraphActiveEmpWithCC || [];
  });

  const totalEmployees = GraphData.length > 0 ? GraphData[0]?.total || 0 : 0;
  
  useEffect(() => {
    dispatch(GraphActions.getGraphActiveEmpwithCostCenter());
    dispatch(GraphActions.getGraphOrganizationLevel());
  }, []);

  useEffect(() => {
  }, [GraphData]);

  const handleFilter = () => {
    const filterData = {
      orgLevel: selectedOrglevel?.map((item) => item.value) || [],
    };
    dispatch(
      GraphActions.postGraphActiveEmpwithCostCenter(
        { orgLevel: filterData.orgLevel},
        () => {}
      )
    );
  };


  const handleClear = () => {
    setSelectedOrgLevel([]);
    dispatch(GraphActions.getGraphActiveEmpwithCostCenter());
  };


  return (
    <div className="bg-transparent border-[1.5px] border-pcol rounded-md w-auto p-4">
        <div className="w-full flex justify-between items-center">
          <div className="flex">
            <p className="text-[#f4d3a8] font-semibold whitespace-nowrap px-1">Total Employee: </p>
            <p className="text-[#E6BE8A] font-bold">{totalEmployees}</p>
          </div>
          <div className="text-center flex-1 mr-32">
            <h1 className="text-[#f4d3a8] font-bold text-lg whitespace-nowrap underline">Airtel Active Employee</h1>
          </div>
        </div>
        <div className="flex items-center justify-between space-x-10">
        <div className="flex space-x-2 items-center w-full">
          <NewMultiSelects
            label="Org Level"
            option={OrgLevelList}
            value={selectedOrglevel}
            placeholder="Org Level"
            cb={(data) => setSelectedOrgLevel(data)}
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
      <BarGraph data={GraphData} headerName={"Airtel_Active_Employee"} horizontal={true}  columnWidth='80%' />
    </div>
  );
};

export default ActiveEmpwithCostCenter;