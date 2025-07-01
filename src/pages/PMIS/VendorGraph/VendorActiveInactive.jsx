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
import AdminActions from "../../../store/actions/admin-actions";


const VendorActiveInactive = ({customeruniqueId}) => {
  const [selectedCircle, setSelectedCircle] = useState([]);
  let dispatch = useDispatch();
  const [data, setData] = useState([])

  // let customeruniqueId = "65dee316811c797c9f26d836"

  let CircleList = useSelector((state) => {
    return state?.adminData?.getManageCircle?.map((itm) => ({
      label: itm?.circleCode,
      value: itm?.circleCode,
    }));
  });

  let pieGraphData = useSelector((state) => {
    return state?.GraphData?.getGraphVendorActiveInactive || [""]
  });


  useEffect(() => {
    dispatch(AdminActions.getManageCircle());
    dispatch(GraphActions.getGraphVendorActiveInactive());
  }, []);

  const handleFilter = () => {
    const filterData = {};
    if (selectedCircle.length > 0) {
      filterData.circleCode = selectedCircle?.map((Sweety) => Sweety.value);
    }
    dispatch(GraphActions.postGraphVendorActiveInactive(filterData, () => {}));
  };

  const handleClear = () => {
    setSelectedCircle([])
    dispatch(GraphActions.getGraphVendorActiveInactive());
  };

  return (
    <div className="bg-transparent border-[1.5px] border-pcol rounded-md h-full p-4">
      <div className="text-center mb-4">
            <h1 className="text-[#f4d3a8] font-bold text-lg whitespace-nowrap underline">Total Partners</h1>
        </div>
      <div className="flex items-center space-x-4 mb-8">
        <div className="flex space-x-4 justify-between w-full">
          <NewMultiSelects label='Partner' placeholder="Circle" option={CircleList} value={selectedCircle} cb={(data) => setSelectedCircle(data)} />

        <div className="flex space-x-4">
          <Button classes="w-12 h-10 text-white mt-1 flex justify-center bg-[#3e454d] border-solid border-[#64676d] border-2" onClick={handleFilter} icon={<UilSearch size="36" className="text-[#f4d3a8]" />}></Button>

          <Button classes="w-12 h-10 text-white mt-1 flex justify-center bg-[#3e454d] border-solid border-[#64676d] border-2" onClick={handleClear} icon={<UilRefresh size="36" className = "text-[#f4d3a8]"/>}></Button>
        </div>

      </div>
      </div>

      <DountChart data={pieGraphData} headerName={"Total_Partners"} label="Total Partners" />

    </div>

  );
};
export default VendorActiveInactive;