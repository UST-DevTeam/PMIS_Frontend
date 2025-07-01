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
import ColumnChart from "../../../components/Columnchart";
import FinanceActions from "../../../store/actions/finance-actions";
import NewSingleSelect from "../../../components/NewSingleSelect";
import CurrentuserActions from "../../../store/actions/currentuser-action";
import NewSingleSelectCommon from "../../../components/FormElements/NewSingleSelectCommon";


const PoTrackingWorkdoneChart = () => {
  const [type, settype] = useState(false);
  const [selectedProjectGroup, setSelectedProjectGroup] = useState([]);
  const [selectedItemCode, setSelectedItemCode] = useState([]);

  let dispatch = useDispatch();
  const [data, setData] = useState([])

  let projectGroupList = useSelector((state) => {
    return state?.currentuserData?.getcurrentuserPG
    .map((itm) => {
      return {
        label: itm.projectGroup,
        value: itm.uniqueId,
      };
    });
  });

  let itemCodeList = useSelector((state) => {
    return state?.financeData?.getPOWorkDoneItemCode
    .map((itm) => {
      return {
        label: itm.itemCode,
        value: itm.itemCode,
      };
    });
  });

  console.log(itemCodeList,"itemCodeList")

  

  let GraphData = useSelector((state) => {
    return state?.GraphData?.getGraphPoTrackingWorkdone || [""]
  });


  let value = []

  if (GraphData.length > 0) {
    const { totalQty=0, invoicedQty = 0, workDoneQty = 0, openQty = 0 } = GraphData[0];
    value.push(totalQty,invoicedQty,workDoneQty,openQty);
  } else {
    value.push(0, 0, 0,0);
  }


  let colors = ["#13b497", "#ffab2d", "#2b98d6", "#fd5c63",]

  useEffect(() => {
    dispatch(FinanceActions.getPOWorkDoneItemCode())
    dispatch(GraphActions.getGraphPOTrackingWorkdone());
    dispatch(CurrentuserActions.getcurrentuserPG())
  }, []);




  const handleFilter = () => {
    const filterData = {
      selectedItemCode:selectedItemCode.value || "",
      ...(selectedProjectGroup.length && { selectedProjectGroup: selectedProjectGroup.map(item => item.value) }),
    }
    dispatch(GraphActions.postGraphPOTrackingWorkdone(filterData,() => {}))
  }
  
  

  const handleClear = () => {
    setSelectedProjectGroup([]);
    setSelectedItemCode([]);
    dispatch(GraphActions.getGraphPOTrackingWorkdone());
  };

  return (
    <div className="bg-transparent border-[1.5px] border-pcol rounded-md h-full p-4">
      <div className="text-center mb-4">
            <h1 className="text-[#f4d3a8] font-bold text-lg whitespace-nowrap underline">PO Item Code Workdone</h1>
        </div>
        <div className="flex items-center justify-between space-x-10">
        <div className="flex space-x-2 items-center w-full">
          <NewMultiSelects label='Project Group' placeholder="Project Group" option={projectGroupList} value={selectedProjectGroup} cb={(data) => setSelectedProjectGroup(data)}/>
          <NewSingleSelect label='Item Code' placeholder = "Item Code"  option={itemCodeList} value={selectedItemCode} cb={( data ) => setSelectedItemCode(data)} />
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
      <ColumnChart data={value} headerName={"PO_Item_Code_Workdone"} />
    </div>

  );
};
export default PoTrackingWorkdoneChart;