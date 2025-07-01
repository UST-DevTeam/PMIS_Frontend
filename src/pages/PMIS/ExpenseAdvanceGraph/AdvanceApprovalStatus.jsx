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

const AdvanceApprovalStatus = () => {

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
  const [selectedYears, setSelectedYears] = useState(null);
  const [selectedMonths, setSelectedMonths] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState([]);
  const [selectedOrglevel, setSelectedOrgLevel] = useState([]);
  const dispatch = useDispatch();

  let OrgLevelList = useSelector((state) => {
    return state?.GraphData?.getWeeklyHorizontalName?.map((itm) => ({
      label: itm?.description,
      value: itm?.description,
    }));
  });
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
    return state?.GraphData?.getGraphAdvanceApprovalStatus || [];
  });


  const SeriesData = [
    {
      name: "Value",
      data: GraphData?.map(item => item.count) || [],
    },
  ];

  useEffect(() => {
    dispatch(GraphActions.getWeeklyHorizontalName());
    dispatch(GraphActions.getGraphAdvanceApprovalStatus());
  }, []);

  const handleFilter = () => {
    const filterData = {};
    if (selectedOrglevel.length > 0) {
      filterData.description = selectedOrglevel?.map((Sweety) => Sweety.value);
    }
    if (selectedDepartment.length > 0) {
      filterData.orgLevel = selectedDepartment?.map((Sweety) => Sweety.value);
    }
    if (selectedYears) {
      filterData.year = selectedYears.value;
    }
    if (selectedMonths.length > 0) {
      filterData.month = selectedMonths?.map((Sweety) => Sweety.value);
    }
    dispatch(GraphActions.postGraphAdvanceApprovalStatus(filterData, () => {}));
  };


  const handleClear = () => {
    setSelectedOrgLevel([]);
    setSelectedDepartment([]);
    setSelectedYears(null);
    setSelectedMonths([]);
    dispatch(GraphActions.getGraphAdvanceApprovalStatus());
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
            <h1 className="text-[#f4d3a8] font-bold text-lg whitespace-nowrap underline">Advance Approval Status</h1>
        </div>
        <div className="flex items-center justify-between space-x-10">
        <div className="flex space-x-2 items-center w-full">
          <NewMultiSelects
            label="Org Level"
            option={OrgLevelList}
            value={selectedOrglevel} 
            placeholder="Organization Level"
            cb={(data) => setSelectedOrgLevel(data)}
          />
          {/* <NewMultiSelects
            label="Department"
            option={departmentList}
            value={selectedDepartment}
            placeholder="Org Level"
            cb={(data) => setSelectedDepartment(data)}
          /> */}
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
            cb={(data) => setSelectedMonths(data)}
            placeholder="Month"
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
      <BarGraph data={GraphData} headerName={"Advance_Approval_Status"} seriesData={SeriesData} horizontal={false} dataLabelSuffix="L" columnWidth="30%" colors={["#5cccb7", "#ffab2d", "#fbd0d0", "#f9a8d4", "#b8ee30"]} />
    </div>
  );
};

export default AdvanceApprovalStatus;