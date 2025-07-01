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
import projectListActions from "../../../store/actions/projectList-actions";
import FunnelChart from "../../../components/PyramidCharts";
import AdminActions from "../../../store/actions/admin-actions";
import CurrentuserActions from "../../../store/actions/currentuser-action";
import { GET_GRAPH_MS2_VS_WCC_PENDING_REASON } from "../../../store/reducers/graph-reducer";


const MS2vsWCCPendingReason = () => {
  const [selectedCircle, setSelectedCircle] = useState([]);
  const [selectedProjectType, setSelectedProjectType] = useState([]);
  let dispatch = useDispatch();
  const [data, setData] = useState([])

  let CircleList = useSelector((state) => {
    return state?.currentuserData?.getcurrentusercircleprojectid?.map((itm) => ({
      label: itm?.circle,
      value: itm?.projectuid,
    }));
  });

  let projectTypeList = useSelector((state) => {
    return state?.filterData?.getfinancialworkdoneprojecttype.map((itm) => {
      return {
        label: itm.projectType,
        value: itm.uid,
      };
    });
  });

  let pieGraphData = useSelector((state) => {
    return state?.GraphData?.getGraphMS2vsWCCPendingReason || [""]
  });


  useEffect(() => {
    dispatch(GET_GRAPH_MS2_VS_WCC_PENDING_REASON({dataAll:[],reset:true}))
    dispatch(GraphActions.getGraphMS2vsWCCPendingReason());
  }, []);

  const handleFilter = () => {
    const filterData = {};
    if (selectedCircle.length > 0) {
      filterData.circleName = selectedCircle?.map((Sweety) => Sweety.value);
    }
    if (selectedProjectType.length > 0) {
      filterData.projectType = selectedProjectType?.map((Sweety) => Sweety.value);
    }
    dispatch(GraphActions.postGraphMS2vsWCCPendingReason(filterData, () => {}));
  };

  const handleClear = () => {
    setSelectedCircle([])
    setSelectedProjectType([]);
    dispatch(GraphActions.getGraphMS2vsWCCPendingReason());
  };

  return (
    <div className="bg-transparent border-[1.5px] border-pcol rounded-md h-full p-4">
      <div className="text-center mb-4">
            <h1 className="text-[#f4d3a8] font-bold text-lg whitespace-nowrap underline">MS2 VS WCC Pending Reason</h1>
        </div>
      <div className="flex items-center space-x-4 mb-8">
        <div className="flex space-x-4 justify-between w-full">
          <NewMultiSelects label='Partner' placeholder="Circle" option={CircleList} value={selectedCircle} cb={(data) => setSelectedCircle(data)} />
          <NewMultiSelects placeholder="Project Type" option={projectTypeList} value={selectedProjectType} cb={setSelectedProjectType} />

        <div className="flex space-x-4">
          <Button classes="w-12 h-10 text-white mt-1 flex justify-center bg-[#3e454d] border-solid border-[#64676d] border-2" onClick={handleFilter} icon={<UilSearch size="36" className="text-[#f4d3a8]" />}></Button>

          <Button classes="w-12 h-10 text-white mt-1 flex justify-center bg-[#3e454d] border-solid border-[#64676d] border-2" onClick={handleClear} icon={<UilRefresh size="36" className = "text-[#f4d3a8]"/>}></Button>
        </div>

      </div>
      </div>
      <FunnelChart data={pieGraphData} label="MS2 VS WCC Pending"  colorSeries={["#13b497","#ffab2d","#7f8c8d","#f77a82","#2ee1c0","#ffab2d","#5db7a3"]}/>
      {/* <BarGraph data={pieGraphData} label="MS2 VS WCC Pending" horizontal={true} colors={["#13b497",]}/> */}

    </div>

  );
};
export default MS2vsWCCPendingReason;