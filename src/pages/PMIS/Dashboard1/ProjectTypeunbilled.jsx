import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NewMultiSelects from "../../../components/NewMultiSelect";
import GraphActions from "../../../store/actions/graph-actions";
import Button from "../../../components/Button";
import { UilSearch, UilRefresh } from "@iconscout/react-unicons";
import NewSingleSelect from "../../../components/NewSingleSelect";
import moment from "moment";
import BarGraph from "../../../components/BarGrpah";
import FilterActions from "../../../store/actions/filter-actions";
import { GET_GRAPH_PROJECT_TYPE_UNBILLED } from "../../../store/reducers/graph-reducer";

const ProjectTypeUnbilled = () => {

  const exportData = useRef([]);
  const months = [];
  const now = new Date();
  const monthsNumber = [];
  const month=8

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
  const [selectedamount, setSelectedamount] = useState(null);
  const [selectedMonths, setSelectedMonths] = useState([]);
  const [selectedProjectType, setSelectedProjectType] = useState(null);
  const endDate = moment().format("Y");
  const dispatch = useDispatch();


  let projectTypeList = useSelector((state) => {
    return state?.filterData?.getfinancialworkdoneprojecttype.map((itm) => {
      return {
        label: itm.projectType,
        value: itm.uid,
      };
    });
  });

  let GraphData = useSelector((state) => {
    return state?.GraphData?.getProjectTypeUnbilledGraph || [];
  });

  const total = GraphData.reduce((sum, item) => sum + item.count, 0);

  const seriesData = [
    {
        name: "Amount",
        data: GraphData?.map(item => item.count) || [],
    },
  ];



  useEffect(() => {
    dispatch(GET_GRAPH_PROJECT_TYPE_UNBILLED({dataAll:[],reset:true}))
    dispatch(GraphActions.getProjectTypeUnbilledGraph())
    dispatch(FilterActions.getfinancialWorkDoneProjectType(true,"",0))
  }, []);

  const handleFilter = () => {
      const filterData = {};
      if (selectedamount) {
        filterData.amount = selectedamount.value;
      }
      if (selectedProjectType) {
        filterData.projectType = selectedProjectType.value;
      }
      dispatch(GraphActions.postProjectTypeUnbilledGraph(filterData, () => {}));
  };


  const handleClear = () => {
    setSelectedamount(null);
    setSelectedProjectType(null);
    dispatch(GraphActions.getProjectTypeUnbilledGraph())
  };

  let listYear = [];
  for (let ywq = 2023; ywq <= +endDate; ywq++) {
    listYear.push({'value':ywq,'label':ywq});
  }

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

  const amountList = [
    {value:"amount1",label:"MS1 Unbilled"},
    {value:"amount2",label:"MS2 Unbilled"},
    {value:"final_amount",label:"Total Unbilled"}
  ]
  return (
    <div className="bg-transparent border-[1.5px] border-pcol rounded-md h-full p-4">
      <div className="w-full flex justify-between items-center">
        <div className="flex">
          <p className="text-[#f4d3a8] font-semibold whitespace-nowrap px-1">Total Amount:</p>
          <p className="text-[#E6BE8A] font-bold">{total ? `${parseFloat(total).toFixed(2)}` : ""}L</p>
        </div>
        <div className="text-center flex-1 mr-32">
            <h1 className="text-[#f4d3a8] font-bold text-lg whitespace-nowrap underline">Project Type Unbilled</h1>
        </div>
      </div>
         
        <div className="flex items-center justify-between space-x-10">
        <div className="flex space-x-2 items-center w-full">
          <NewSingleSelect
            label="Project Type"
            option={projectTypeList}
            value={selectedProjectType}
            placeholder="Project Type"
            cb={(data) => setSelectedProjectType(data)}
            
          />
          <NewSingleSelect
            label="Amount"
            option={amountList}
            value={selectedamount}
            placeholder="Amount"
            cb={(data) => setSelectedamount(data)}
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
              icon={<UilRefresh size="36" className = "text-[#f4d3a8]" />}
            ></Button>
          </div>
        </div>
        <BarGraph data={GraphData} headerName={"Project_Type_Unbilled"} seriesData={seriesData} horizontal={false} dataLabelSuffix="L" columnWidth='50%' />
    </div>
  );
};

export default ProjectTypeUnbilled;