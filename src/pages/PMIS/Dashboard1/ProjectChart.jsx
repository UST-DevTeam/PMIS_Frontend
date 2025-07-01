import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Unicons from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NewMultiSelects from "../../../components/NewMultiSelect";
import GraphActions from "../../../store/actions/graph-actions";
import FilterActions from "../../../store/actions/filter-actions";
import Button from "../../../components/Button";
import DountChart from "../../../components/DountChart";
import { UilImport, UilSearch, UilTimes, UilRefresh } from '@iconscout/react-unicons'


const ProjectChart = (id) => {
  const [type, settype] = useState(false);
  const [selectedProjectGroup, setSelectedProjectGroup] = useState([]);
  const [selectedProjectType, setSelectedProjectType] = useState([]);
  const [selectedProjectManager, setSelectedProjectManager] = useState([]);
  let dispatch = useDispatch();
  const [data, setData] = useState([])

  

  let customeruniqueId = id['customeruniqueId']

  // let projectGroupList = useSelector((state) => {
  //   return state?.filterData?.getProjectProjectGroup.map((itm) => {
  //     return {
  //       label: itm.ProjectGroup,
  //       value: itm.ProjectGroup,
  //     };
  //   });
  // });

  let projectTypeList = useSelector((state) => {
    return state?.filterData?.getProjectProjectType?.map((itm) => {
      return {
        label: itm.projectType,
        value: itm.projectType,
      };
    });
  });

  // let projectManagerList = useSelector((state) => {
  //   return state?.filterData?.getProjectProjectManager.map((itm) => {
  //     return {
  //       label: itm.projectManager,
  //       value: itm.projectManager,
  //     };
  //   });
  // });

  let pieGraphData = useSelector((state) => {
    return state?.GraphData?.getGraphProjectStatus || [""]
  });


  useEffect(() => {
    
    // dispatch(FilterActions.getProjectProjectGroup(`${customeruniqueId}`));
    dispatch(FilterActions.getProjectProjectType());
    // dispatch(FilterActions.getProjectProjectManager(`${customeruniqueId}`));
    dispatch(GraphActions.getGraphProjectStatus());
  }, []);

  const handleFilter = () => {
    const filterData = {
      // ...(selectedProjectGroup.length && { selectedProjectGroup: selectedProjectGroup.map(item => item.value) }),
      ...(selectedProjectType.length && { selectedProjectType: selectedProjectType.map(item => item.value) }),
      // ...(selectedProjectManager.length && { selectedProjectManager: selectedProjectManager.map(item => item.value) }),
    }

    dispatch(GraphActions.postGraphProjectStatus(filterData, () => { }))

  }
  const handleClear = () => {
    // setSelectedProjectGroup([]);
    setSelectedProjectType([]);
    // setSelectedProjectManager([]);
    dispatch(GraphActions.getGraphProjectStatus());
  }; 

  return (
    <div className="bg-transparent border-[1.5px] border-pcol rounded-md h-full p-4">
      <div className="text-center mb-4">
            <h1 className="text-[#f4d3a8] font-bold text-lg whitespace-nowrap underline">Total Projects</h1>
        </div>
      <div className="flex items-center space-x-4 mb-8">
        <div className="flex space-x-4 justify-between w-full">
          {/* <NewMultiSelects label='Project Group' option={projectGroupList} value={selectedProjectGroup} cb={(data) => setSelectedProjectGroup(data)} /> */}

          <NewMultiSelects label='Project Type' placeholder="Project Type" option={projectTypeList} value={selectedProjectType} cb={(data) => setSelectedProjectType(data)} />

          {/* <NewMultiSelects label='Project Manager' option={projectManagerList} value={selectedProjectManager} cb={(data) => setSelectedProjectManager(data)} /> */}

        <div className="flex space-x-4">
          <Button classes="w-12 h-10 text-white mt-1 flex justify-center bg-[#3e454d] border-solid border-[#64676d] border-2" onClick={handleFilter} icon={<UilSearch size="36" className="text-[#f4d3a8]" />}></Button>

          <Button classes="w-12 h-10 text-white mt-1 flex justify-center bg-[#3e454d] border-solid border-[#64676d] border-2" onClick={handleClear} icon={<UilRefresh size="36" className = "text-[#f4d3a8]"/>}></Button>
        </div>

      </div>
      </div>

      <DountChart data={pieGraphData} headerName = {"Total_Projects"} label="Total Projects"/>

    </div>

  );
};
export default ProjectChart;