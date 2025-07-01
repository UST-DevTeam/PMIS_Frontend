import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NewMultiSelects from "../../../components/NewMultiSelect";
import GraphActions from "../../../store/actions/graph-actions";
import Button from "../../../components/Button";
import { UilSearch, UilRefresh } from "@iconscout/react-unicons";
import BarGraph from "../../../components/BarGrpah";
import AdminActions from "../../../store/actions/admin-actions";
import NewSingleSelect from "../../../components/NewSingleSelect";
import { GET_GRAPH_SOFT_MS1_VS_MS2 } from "../../../store/reducers/graph-reducer";

const SoftMS1VsMS2 = () => {

    const [selectedCircle, setSelectedCircle] = useState([]);
    const [selectedProjectType, setSelectedProjectType] = useState([]);
    const dispatch = useDispatch();

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
      
  let GraphData = useSelector((state) => {
    return state?.GraphData?.getGraphSoftMS1vsMS2 || [];
  });

  const seriesData = [
    {
        name: "Count",
        data: GraphData?.map(item => item.count) ||[],
    },
];
  
  useEffect(() => {
    dispatch(GET_GRAPH_SOFT_MS1_VS_MS2({dataAll:[],reset:true}))
    dispatch(GraphActions.getGraphSoftMS1vsMS2());
  }, []);


  const handleFilter = () => {
    const filterData = {};
    if (selectedCircle.length > 0) {
      filterData.circleName = selectedCircle?.map((Sweety) => Sweety.value);
    }
    if (selectedProjectType.length > 0) {
      filterData.projectType = selectedProjectType?.map((Sweety) => Sweety.value);
    }
    dispatch(GraphActions.postGraphSoftMS1vsMS2(filterData, () => {}));
  };

  const handleClear = () => {
    setSelectedCircle([])
    setSelectedProjectType([]);
    dispatch(GraphActions.getGraphSoftMS1vsMS2());
  };


  return (
    <div className="bg-transparent border-[1.5px] border-pcol rounded-md w-auto p-4">
          <div className="text-center flex-1 mr-32">
            <h1 className="text-[#f4d3a8] font-bold text-lg whitespace-nowrap underline">Soft MS1 Vs MS2</h1>
          </div>
        <div className="flex items-center justify-between space-x-10">
        <div className="flex space-x-2 items-center w-full">
        <NewMultiSelects label='Partner' placeholder="Circle" option={CircleList} value={selectedCircle} cb={(data) => setSelectedCircle(data)} />
        <NewMultiSelects placeholder="Project Type" option={projectTypeList} value={selectedProjectType} cb={setSelectedProjectType} />
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
      <BarGraph data={GraphData} headerName={"Soft_MS1_Vs_MS2"} seriesData={seriesData} horizontal={false}  columnWidth='50%' />
    </div>
  );
};

export default SoftMS1VsMS2;