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
import { UilImport, UilSearch,UilTimes,UilRefresh } from '@iconscout/react-unicons'
import PieChart from "../../../components/PieChart";
import RadialBarChart from "../../../components/FormElements/RadialBarChart";


const PoStatusChart = () => {
  const [type, settype] = useState(false);
  const [selectedProjectGroup, setSelectedProjectGroup] = useState([]);
  const [selectedProjectType, setSelectedProjectType] = useState([]);
  const [selectedProjectManager, setSelectedProjectManager] = useState([]);
  let dispatch = useDispatch();
  const [data, setData] = useState([])

  let projectGroupList = useSelector((state) => {
    return state?.filterData?.getfinancialPoManagementProjectGroup?.map((itm) => {
      return {
        label: itm.projectGroupId,
        value: itm.uniqueId,
      };
    });
  });

  // let projectTypeList = useSelector((state) => {
  //   return state?.filterData?.getProjectProjectType.map((itm) => {
  //     return {
  //       label: itm.projectType,
  //       value: itm.projectType,
  //     };
  //   });
  // });

  // let projectManagerList = useSelector((state) => {
  //   return state?.filterData?.getProjectProjectManager.map((itm) => {
  //     return {
  //       label: itm.projectManager,
  //       value: itm.projectManager,
  //     };
  //   });
  // });

  let pieGraphData = useSelector((state) => {
    return state?.GraphData?.getGraphPoStatus || [""]
  });

  let colors = ['#003459','#007EA7','#00A8E8']


  useEffect(() => {
    dispatch(GraphActions.getGraphPOStatus());
    dispatch(FilterActions.getfinancialPoManagementProjectGroup())
  }, []);

  const handleFilter = () => {
    const filterData = {
      ...(selectedProjectGroup.length && { selectedProjectGroup: selectedProjectGroup.map(item => item.value) }),
      ...(selectedProjectType.length && { selectedProjectType: selectedProjectType.map(item => item.value) }),
      ...(selectedProjectManager.length && { selectedProjectManager: selectedProjectManager.map(item => item.value) }),
    }

    dispatch(GraphActions.postGraphPOStatus(filterData,() => {}))

  }
  const handleClear = () => {
    setSelectedProjectGroup([]);
    setSelectedProjectType([]);
    setSelectedProjectManager([]);
    dispatch(GraphActions.getGraphPOStatus());
  };

  return (
    <div className="bg-transparent border-[1.5px] border-pcol rounded-md h-full p-4">
      <div className="text-center mb-4">
            <h1 className="text-[#f4d3a8] font-bold text-lg whitespace-nowrap underline">PO Status</h1>
        </div>
      <div className="flex items-center space-x-4 mb-8">
        <div className="flex space-x-4 justify-between w-full">
          <NewMultiSelects label='Project Group' placeholder="Project Group" option={projectGroupList} value={selectedProjectGroup} cb={(data) => setSelectedProjectGroup(data)} />
          <div className="flex space-x-4">
            <Button classes="w-12 h-10 text-white mt-1 flex justify-center bg-[#3e454d] border-solid border-[#64676d] border-2" onClick={handleFilter} icon={<UilSearch size="36" className="text-[#f4d3a8]"/>}></Button>
            <Button classes="w-12 h-10 text-white mt-1 flex justify-center bg-[#3e454d] border-solid border-[#64676d] border-2" onClick={handleClear} icon={<UilRefresh size="36" className = "text-[#f4d3a8]"/>}></Button>
          </div>
        </div>
      </div>
      <PieChart data={pieGraphData}  colors = {colors} />
    </div>

  );
};
export default PoStatusChart;