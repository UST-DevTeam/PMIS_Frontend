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
import PieChart from "../../../components/PieChart";
import DountChart from "../../../components/DountChart";

const TotalActiveCustomer = () => {

  const [selectedOrglevel, setSelectedOrgLevel] = useState([]);
  const dispatch = useDispatch();

  let OrgLevelList =[
    { "label": "Active", "value": "Active" },
    { "label": "Inactive", "value": "Inactive" },
  ]

  let GraphData = useSelector((state) => {
    return state?.GraphData?.getGraphTotalActiveCustomer || [];
  });

  useEffect(() => {
    dispatch(GraphActions.getGraphTotalActiveCustomer());
  }, []);

  const handleFilter = () => {
    const filterData = {};
    if (selectedOrglevel && selectedOrglevel.value) {
      filterData.status = [selectedOrglevel.value];
    }
    dispatch(GraphActions.postGraphTotalActiveCustomer(filterData, () => {}));
  };


  const handleClear = () => {
    setSelectedOrgLevel([]);
    dispatch(GraphActions.getGraphTotalActiveCustomer());
  };

  return (
    <div className="bg-transparent border-[1.5px] border-pcol rounded-md h-full p-4">
         <div className="text-center mb-4">
            <h1 className="text-[#f4d3a8] font-bold text-lg whitespace-nowrap underline">Total Customer</h1>
        </div>
        <div className="flex items-center justify-between space-x-10 mb-8">
        <div className="flex space-x-2 items-center w-full">
          <NewSingleSelect
            label="Org Level"
            option={OrgLevelList}
            value={selectedOrglevel}
            placeholder="Status"
            cb={(data) => setSelectedOrgLevel(data)}
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
      <DountChart data={GraphData} headerName = {"Total_Customer"} label="Total Customers" height={360} horizontal={false} columnWidth="30%" colors={["#5cccb7", "#ffab2d", "#fbd0d0", "#f9a8d4", "#b8ee30"]} />
    </div>
  );
};

export default TotalActiveCustomer;