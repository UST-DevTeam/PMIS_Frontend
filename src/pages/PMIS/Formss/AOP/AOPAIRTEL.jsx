import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as Unicons from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import EditButton from "../../../../components/EditButton";
import AdvancedTable from "../../../../components/AdvancedTable";
import Modal from "../../../../components/Modal"; 
import Button from "../../../../components/Button";
import DeleteButton from "../../../../components/DeleteButton";
import CstmButton from "../../../../components/CstmButton";
import { getAccessType, objectToQueryString } from "../../../../utils/commonFunnction";
import { ALERTS } from "../../../../store/reducers/component-reducer";
import CommonActions from "../../../../store/actions/common-actions";
import { Urls } from "../../../../utils/url";
import FinanceActions from "../../../../store/actions/finance-actions";
import FormssActions from "../../../../store/actions/formss-actions";
import moment from "moment/moment";
import CommonForm from "../../../../components/CommonForm";

import { UilSearch } from "@iconscout/react-unicons";
import FileUploader from "../../../../components/FIleUploader";
import CurrentuserActions from "../../../../store/actions/currentuser-action";
import AOPTrackerForm from "./AOPTrackerForm";
import PLform from "../P&L/PLform";
import AddActualAOP from "./AddActualAOP";
import { tableAction } from "../../../../store/actions/table-action";
import { SET_TABLE } from "../../../../store/reducers/table-reducer";
import Api from "../../../../utils/api";
import Tabs from "../../../../components/Tabs";
import { SET_BUSSINESS_UNIT } from "../../../../store/reducers/dropDown-reducer";
import { FaDollarSign, FaRupeeSign } from "react-icons/fa";
import AdvancedTableGpTracking from "../../../../components/AdvanceTableGpTracking";
import AdvancedTableAOP from "../../../../components/AdvanceTableAOP";

const AOPTrackingAirtel = () => {
  // const Data = useRef("")
  const forExport=useRef()
  const currentMonth = new Date().getMonth() + 1;
  const currrentYear = new Date().getFullYear();
  const [modalOpen, setmodalOpen] = useState(false);
  const [modalBody, setmodalBody] = useState(<></> );
  const [ValGm, setValGm] = useState("Month");
  const endDate = moment().format("Y");
  const [year, setyear] = useState(currrentYear);
  const [modalHead, setmodalHead] = useState(<></>);
  const [extraColumns, setExtraColumns] = useState("");
  const [newColumns, setNewColumns] = useState([]);
  const [selectType, setSelectType] = useState("");
  const [fileOpen, setFileOpen] = useState(false)
  const [actionVisibility, setActionVisibility] = useState(true);
  const Data = useRef("")
  const monthMap = {
    1: "Jan",
    2: "Feb",
    3: "Mar",
    4: "Apr",
    5: "May",
    6: "Jun",
    7: "Jul",
    8: "Aug",
    9: "Sep",
    10: "Oct",
    11: "Nov",
    12: "Dec",
  };
  let months =[
    { label: "Jan", value: 1 },
    { label: "Feb", value: 2 },
    { label: "Mar", value: 3 },
    { label: "Apr", value: 4 },
    { label: "May", value: 5 },
    { label: "Jun", value: 6 },
    { label: "Jul", value: 7 },
    { label: "Aug", value: 8 },
    { label: "Sep", value: 9 },
    { label: "Oct", value: 10 },
    { label: "Nov", value: 11 },
    { label: "Dec", value: 12 },
  ];


  const keysToProcess=['COGS','SGNA','actualRevenue','actualSGNA','actualSalary','actualVendorCost','employeeExpanse','miscellaneousExpenses','miscellaneousExpensesSecond','otherFixedCost','planRevenue']
  const divideAndRound = (value) => {
    if (value !== null && value !== undefined && value !== '' && !isNaN(value)) {
      return Math.round((value * 1000000) * 100) / 100;
    }
    return value;
  };
  
  const processItem = (item, keys) => {
    const result = { ...item };
    keys.forEach((key) => {
      if (result.hasOwnProperty(key)) {
        result[key] = divideAndRound(result[key]);
      }
    });
    return result;
  };


  let dispatch = useDispatch();
  let rows = useSelector(state => {
    return Array.isArray(state.table?.tableContent) 
      ? state.table.tableContent.map(item => {
        let index =
        isNaN(item.month) == false ? monthMap[item.month] : item.month;
          return { ...item, month: index,gm: (item?.gm * 100).toFixed(2) + ' %',actualGm: (item?.actualGm * 100).toFixed(2) + ' %',actualNp: (item?.actualNp * 100).toFixed(2) + ' %',np: (item?.np * 100).toFixed(2) + ' %',edit: (
            <CstmButton
              className={"p-2"}
              child={
                <EditButton
                  name={""}
                  size={14}
                  onClick={() => {
                    setmodalOpen(true);
                    setmodalHead("Edit Plan");
                    setmodalBody(
                      <>
                        <AOPTrackerForm
                          isOpen={modalOpen}
                          setIsOpen={setmodalOpen}
                          resetting={false}
                          formValue={processItem(item, keysToProcess)}
                          year={item?.year}
                          month={item?.month}
                          monthss={monthMap[item?.month]}
                          filtervalue={""}
                          forAirtel={true}
                        />
                      </>
                    );
                  }}
                ></EditButton>
              }
            />
          ),
  
          delete: (
            <CstmButton
              child={
                <DeleteButton
                  name={""}
                  size={14}
                  onClick={() => {
                    let msgdata = {
                      show: true,
                      icon: "warning",
                      buttons: [
                        <Button
                          classes='w-15 bg-rose-400'
                          onClick={() => {
                            dispatch(
                              CommonActions.deleteApiCaller(
                                `${Urls.aop}/${item?.uniqueId}`,
                                () => {
                                  dispatch(tableAction.getTable(Urls.aop+'?forAirtel=true', SET_TABLE))
                                  dispatch(ALERTS({ show: false }));
                                }
                              )
                            );
                          }}
                          name={"OK"}
                        />,
                        <Button
                          classes="w-auto"
                          onClick={() => {
                            dispatch(ALERTS({ show: false }));
                          }}
                          name={"Cancel"}
                        />,
                      ],
                      text: "Are you sure you want to Delete?",
                    };
                    dispatch(ALERTS(msgdata));
                  }}
                ></DeleteButton>
              }
            />
          ), }; 
        })
      : [];
  });
  let circleList = useSelector((state) => {
    return state?.adminData?.getManageCircle.map((itm) => {
      return {
        label: itm?.circleName,
        value: itm?.uniqueId,
      };
    });
  });

  let costCenterList = useSelector((state) => {
    return state?.currentuserData?.getcurrentusercostcenter.map((itm) => {
      return {
        label: itm?.costCenter,
        value: itm?.uniqueId,
      };
    });
  });







  

  let dbConfigList = useSelector((state) => {
    let interdata = state?.formssData?.getProfitloss || [];
    return interdata?.map((itm) => {
      let updateditm = {
        ...itm,

        
      };
      return updateditm;
    });
  });

  let dbConfigTotalCount = useSelector((state) => {
    let interdata = state?.table?.tableContent || [];
    if (interdata.length > 0) {
      return interdata[0]["overall_table_count"];
    } else {
      return 0;
    }
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setValues,
    reset,
    getValues,
    clearErrors, 
    formState: { errors },
  } = useForm();

  const [dollarAmount, setDollarAmount] = useState({
      amount: null,
      visibility: false
    })

  const getPreviousCurrentAndNextMonth = () => {
    const currentDate = new Date();
    const currentMonthIndex = currentDate.getMonth();
    const previousMonthIndex = (currentMonthIndex - 1 + 12) % 12;
    const nextMonthIndex = (currentMonthIndex + 1) % 12;
    const currentYear = currentDate.getFullYear();
    const previousMonthYear =
      currentMonthIndex === 0 ? currentYear - 1 : currentYear;
    const nextMonthYear =
      currentMonthIndex === 11 ? currentYear + 1 : currentYear;

    return [
      { month: months[previousMonthIndex], year: previousMonthYear },
      { month: months[currentMonthIndex], year: currentYear },
      { month: months[nextMonthIndex], year: nextMonthYear },
    ];
  };

  const [previousMonthData, currentMonthData, nextMonthData] =
    getPreviousCurrentAndNextMonth();

  

  let listYear = [];
  for (let ywq = 2023; ywq <= +endDate; ywq++) {
    listYear.push({ label: ywq, value: ywq });
  }

  let listDict = {
    "": [],
    Month: [
      { id: 1, name: "Jan" },
      { id: 2, name: "Feb" },
      { id: 3, name: "Mar" },
      { id: 4, name: "Apr" },
      { id: 5, name: "May" },
      { id: 6, name: "Jun" },
      { id: 7, name: "Jul" },
      { id: 8, name: "Aug" },
      { id: 9, name: "Sep" },
      { id: 10, name: "Oct" },
      { id: 11, name: "Nov" },
      { id: 12, name: "Dec" }
    ],
  };

  const onSubmit = (data) => {
    let value = data.reseter;
    delete data.reseter;
    let strVal = objectToQueryString(data);
    dispatch(FormssActions.getProfiltLoss(true, strVal));
  };
  useEffect(() => {
    // bussiness()   
    dispatch(FormssActions.getProfiltLoss())
    dispatch(tableAction.getTable(Urls.aop+"?forAirtel=true", SET_TABLE))
    dispatch(CurrentuserActions.getcurrentuserCostCenter(true,"",0))
  }, []);


  // let formD = [
  //   {
  //     label: "Year",
  //     name: "year",
  //     value: "Select",
  //     bg : 'bg-[#3e454d] text-gray-300 border-[1.5px] border-solid border-[#64676d]',
  //     type: "select",
  //     option: listYear.map((itmYr) => {
  //       return {
  //         label: itmYr,
  //         value: itmYr,
  //       };
  //     }),
  //     props: {
  //       onChange: (e) => {
  //         setValue("year", e.target.value);
  //         setyear(e.target.value);
  //       },
  //     },
  //     required: true,
  //     classes: "col-span-1 h-38px",
  //   },
  //   {
  //     label: ValGm,
  //     name: "viewBy",
  //     value: "Select",
  //     type: "newmuitiSelect2",
  //     option: listDict[ValGm].map((dasd) => {
  //       return {
  //         value: dasd?.id,
  //         label: dasd?.name,
  //       };
  //     }),
  //     props: {
  //       selectType:selectType,
  //     },
  //     hasSelectAll:true,
  //     required: true,
  //     classes: "col-span-1 h-10",
  //   },
  //   {
  //     label: 'Cost Center',
  //     name: "costCenter",
  //     value: "select",
  //     type: "newmuitiSelect2",
  //     option: costCenterList,
  //     props: {
  //       selectType:selectType,
  //     },
  //     hasSelectAll:true,
  //     classes: "col-span-1 h-10",
  //   },
  // ];

  const bussiness=async ()=>{
    let res=await Api.get({url:Urls.businessUnit,contentType:"application/json"})
    console.log("================",res.data.data)
    dispatch(SET_BUSSINESS_UNIT(res.data?.data[0]?.businessUnit))
  }
  useEffect(() => {
    const monthMap = {
      1: "Jan",
      2: "Feb",
      3: "Mar",
      4: "Apr",
      5: "May",
      6: "Jun",
      7: "Jul",
      8: "Aug",
      9: "Sep",
      10: "Oct",
      11: "Nov",  
      12: "Dec",
    };           

    bussiness()   

    let cols = [];
    cols = cols.flat(Infinity);
    setNewColumns(cols);
  }, [extraColumns]);

  // const handleAddActivity =async (res) => {
  //   Data.current = ""
  //   setExtraColumns(res['Month'])
  //   Data.current  = res['CostCenter']
  //   // FRERFER
  //   console.log("============",res)
  //   const resp=await Api.post({ data:res, url: Urls.aop+"?filter=true&forAirtel=true" })
  //   if (resp.status==200){
  //        dispatch(SET_TABLE(resp?.data?.data))
  //   }
  //   // dispatch(tableAction.getTable(Urls.aop+"?filter=true", SET_TABLE))
  //   // dispatch(FormssActions.postProfiltLossOnSearch(res, () => {}));
  // };

  let customerList = useSelector((state) => {
    return state?.gpTrackingReducer?.getCustomer.map((itm) => {
      return {
        label: itm?.customer,
        value: itm?.uniqueId,
      };
    });
  });
  
   let bussinessUnit = useSelector((state) => {
      return Array.isArray(state?.dropDown?.bussinessUnit)?state?.dropDown?.bussinessUnit.map((itm) => {
        return {
          label: itm,
          value: itm,
        };
      }):[]
    });       

  const onTableViewSubmit = (data) => { 
    data["fileType"]="AOP"
    dispatch(CommonActions.fileSubmit(Urls.common_file_uploadr, data, () => {
        setFileOpen(false)
        // dispatch(FormssActions.getProfiltLoss())
        dispatch(tableAction.getTable(Urls.aop+"?forAirtel=true", SET_TABLE))
    }))
  }
  let formD = [
   
    {
      label: "Year",
      value: "",
      name: "year",
      type: "select",
      option: listYear,
      required: true,
      bg : 'bg-[#3e454d] text-gray-300 border-[1.5px] border-solid border-[#64676d]',
    },
    {
      label: "Month",
      value: "",
      name: "month",
      type:"select",
      option: months,
      required: true,
      bg : 'bg-[#3e454d] text-gray-300 border-[1.5px] border-solid border-[#64676d]',
    },
    {
      label: 'Business unit',
      name: "businessUnit",
      value: "select",
      type: "newmuitiSelect2",
      option: bussinessUnit,
      props: {
        selectType: selectType,
      },
      hasSelectAll: true,
      classes: "col-span-1 h-10 ",
    },
    // {
    //   label: "Customer",
    //   value: "",
    //   name:"customerId",
    //   type:"select",
    //   option: customerList,
    //   bg : 'bg-[#3e454d] text-gray-300 border-[1.5px] border-solid border-[#64676d]',
    //   props: {
    //     onChange: (e) => {
    //       handleCustomerChange(e?.target?.value);
    //     },
    //   },
    //   // required: true,
    // },
    // {
    //   label: "Cost Center",
    //   value: "",
    //   name:"costCenterId",
    //   type:  "select",
    //   option: costCenterList,
    //   required: true,
    // },
    // {
    //   label: "Customer",
    //   name: "customerName",
    //   value: "select",
    //   type: "newmuitiSelect2",
    //   option: customerList,
    //   props: {
    //     selectType: selectType,
    //     // onChange: (e) => {
    //     //   handleCustomerChange(e);
    //     // },
    //     cb:async (e) => {

    //       // setSeletedCustomerMulti(e)
    //       let ids=e.map((item)=>item.value)
    //       if (e !== ""){
    //         await dispatch(CurrentuserActions.getcurrentuserCostCenter(true,`customerId=${ids.join(",")}`,1,))
    //       }
    //       else {
    //         // dispatch(GET_CURRENT_USER_COST_CENTER({dataAll:[],reset:true}))
    //       }
    //   },
     
  
    
    // },
    //   hasSelectAll: true,
    //   classes: "col-span-1 h-10 ",
    // },
    {
      label: 'Cost Center',
      name: "costCenter",
      value: "select",
      type: "newmuitiSelect2",
      option: costCenterList,
      props: {
        selectType: selectType,
      },
      hasSelectAll: true,
      classes: "col-span-1 h-10",
    },
    
  ];
  let cummulativeFilter = [
    // {
    //   label: "Year",
    //   name: "year",
    //   value: "Select",
    //   bg: 'bg-[#3e454d] text-gray-300 border-[1.5px] border-solid border-[#64676d]',
    //   type: "select",
    //   option: listYear.map((itmYr) => {
    //     return {
    //       label: itmYr,
    //       value: itmYr,
    //     };
    //   }),
    //   props: {
    //     onChange: (e) => {
    //       setValue("year", e.target.value);
    //       setyear(e.target.value);
    //     },
    //   },
    //   required: true,
    //   classes: "col-span-1 h-38px",
    // },
    // {
    //   label: ValGm,
    //   name: "viewBy",
    //   value: "Select",
    //   type: "newmuitiSelect2",
    //   option: listDict[ValGm].map((dasd) => {
    //     return {
    //       value: dasd?.id,
    //       label: dasd?.name,
    //     };
    //   }),
    //   props: {
    //     selectType: selectType,
    //   },
    //   hasSelectAll: true,
    //   required: true,
    //   classes: "col-span-1 h-10",
    // },
    {
      label: "Year",
      value: "",
      name: "year",
      type: "select",
      option: listYear,
      required: true,
      bg : 'bg-[#3e454d] text-gray-300 border-[1.5px] border-solid border-[#64676d]',
    },
    // {
    //   label: "Month",
    //   value: "",
    //   name: "month",
    //   type:"select",
    //   option: months,
    //   required: true,
    //   bg : 'bg-[#3e454d] text-gray-300 border-[1.5px] border-solid border-[#64676d]',
    // },
    {
      label: 'Month',
      name: "month",
      value: "select",
      type: "newmuitiSelect2",
      option: months,
      props: {
        selectType: selectType,
      },
      hasSelectAll: true,
      classes: "col-span-1 h-10 ",
    },
    
    // {
    //   label: "Cost Center",
    //   value: "",
    //   name:"costCenterId",
    //   type:  "select",
    //   option: costCenterList,
    //   required: true,
    // },
    {
      label: 'Business unit',
      name: "businessUnit",
      value: "select",
      type: "newmuitiSelect2",
      option: bussinessUnit,
      props: {
        selectType: selectType,
      },
      hasSelectAll: true,
      classes: "col-span-1 h-10 ",
    },
    // {
    //   label: "Customer",
    //   value: "",
    //   name:"customerId",
    //   type:"select",
    //   option: customerList,
    //   bg : 'bg-[#3e454d] text-gray-300 border-[1.5px] border-solid border-[#64676d]',
    //   props: {
    //     onChange: (e) => {
    //       handleCustomerChange(e?.target?.value);
    //     },
    //   },
    //   // required: true,
    // },
    // {
    //   label: "Customer",
    //   name: "customerName",
    //   value: "select",
    //   type: "newmuitiSelect2",
    //   option: customerList,
    //   props: {
    //     selectType: selectType,
    //     // onChange: (e) => {
    //     //   handleCustomerChange(e);
    //     // },
    //     cb:async (e) => {

    //       // setSeletedCustomerMulti(e)
    //       let ids=e.map((item)=>item.value)
    //       if (e !== ""){
    //         await dispatch(CurrentuserActions.getcurrentuserCostCenter(true,`customerId=${ids.join(",")}`,1,))
    //       }
    //       else {
    //         // dispatch(GET_CURRENT_USER_COST_CENTER({dataAll:[],reset:true}))
    //       }
    //   },
     
  
    
    // },
    //   hasSelectAll: true,
    //   classes: "col-span-1 h-10 ",
    // },
    {
      label: 'Cost Center',
      name: "costCenter",
      value: "select",
      type: "newmuitiSelect2",
      option: costCenterList,
      props: {
        selectType: selectType,
      },
      hasSelectAll: true,
      classes: "col-span-1 h-10",
    },
    
  ];
  const onError = (errors) => {
    if(forExport.current){
      clearErrors()

      dispatch(CommonActions.commondownloadpost("/export/AOP?forAirtel=true&filter=true"+ (enable=="Cumulative"?"&Cumulative=true":""), "AOP.xlsx", "POST",{}))

    }
    console.log("Form Errors:", errors);
    return {}
  };

  const tabs = [
    {
      label: "Month",
      body:
          <div className="flex items-center justify-start">

        
            <div className="w-full">
              <CommonForm
                classes="grid grid-cols-6"
                Form={formD}
                errors={errors}
                register={register}
                setValue={setValue}
                getValues={getValues}
              />
            </div>
            <div className="flex w-auto mt-4 -ml-1 items-center justify-center">
              <Button
                classes="flex h-fit"
                name=""
                icon={<UilSearch className="w-5 m-2 h-5" />}
                onClick={()=>{
                  forExport.current=false
            return handleSubmit(handleAddActivity,onError)()}}
              />
            </div>
          </div>
    },
    {
      label: "Cumulative",
      body: <div className="flex items-center justify-start">

        
      <div className="w-full">
        <CommonForm
          classes="grid grid-cols-6"
          Form={cummulativeFilter}
          errors={errors}
          register={register}
          setValue={setValue}
          getValues={getValues}
        />
      </div>
      <div className="flex w-fit mt-4 -ml-3 items-center justify-center">
        <Button
          classes="flex h-fit"
          name=""
          icon={<UilSearch className="w-5 m-2 h-5" />}
          onClick={()=>{
            forExport.current=false
            return handleSubmit(handleAddActivity,onError)()}}
        />
      </div>
    </div>
    },
  ]
  const [enable, setEnable] = useState(tabs[0].label)

  let shouldIncludeEditColumn = true
  if (enable=="Cumulative") {
    shouldIncludeEditColumn = false
  }
  if (actionVisibility === false) {
    shouldIncludeEditColumn = false;
  }

  let table = {
    columns: [
      {
        name: "Year",
        value: "year",
        style: "px-1 text-center text-3xl",
        bg: "bg-sky-200",
         text:'black'
      },
      {
        name: "Month",
        value: "month",
        style: "px-1 text-center",
        bg: "bg-sky-200",
         text:'black'
      },
      
      {
        name: "Bussiness Unit",
        value: "businessUnit",
        style: "px-1 text-center",
        bg: "bg-sky-200",
         text:'black'
      },
      {
        name: "Customer",
        value: "customerName",
        style: "px-2 text-center",
        bg: "bg-sky-500",
         text:'black'
      },
      {
        name: "UST Project ID",
        value: "ustProjectID",
        style: "min-w-[140px] max-w-[200px] text-center",
         bg: "bg-sky-500",
          text:'black'
      },
      {
        name: "MCT Project ID",
        value: "costCenter",
        style: "px-2 text-center",
         bg: "bg-sky-500",
          text:'black'
      },
      {
        name: "Zone",
        value: "zone",
        style: "px-2 text-center",
         bg: "bg-sky-500",
          text:'black'
      },
      {
        name: "Planned Revenue",
        value: "planRevenue",
        // style: "px-2 text-center",
        // bg: "bg-orange-400 whitespace-nowrap"
        style: "px-2 text-center",
         bg: "bg-sky-500",
         text:'black'
      },
      {
        name: "Planned COGS",
        value: "COGS",
        style: "px-2 text-center",
        bg: "bg-orange-400",
         text:'black'
      },
      {
        name: "Planned Gross Profit",
        value: "planGp",
        style: "px-2 text-center",
        bg: "bg-orange-400",
         text:'black'
      },
      {
        name: "Planned Gross Margin(%)",
        value: "gm",
        style: "px-2 text-center",
        bg: "bg-orange-400",
         text:'black'
      },
      {
        name: "Planned SGNA",
        value: "SGNA",
        style: "px-2 text-center",
        bg: "bg-orange-400",
         text:'black'
      },
      {
        name: "Planned Net Profit",
        value: "np",
        style: "px-2 text-center",
        bg: "bg-orange-400",
         text:'black'
      },
      {
        name: "Actual Revenue",
        value: "actualRevenue",
        style: "px-2 text-center",
         bg: "bg-green-600",
          text:'black'
      },
      {
        name: "Actual COGS",
        value: "actualCOGS",
        style: "px-2 text-center",
         bg: "bg-green-600",
          text:'black'
      },
      {
        name: "Actual Gross Profit",
        value: "actualGp",
        style: "px-2 text-center",
         bg: "bg-green-600",
          text:'black'
      },
      {
        name: "Actual Gross Margin(%)",
        value: "actualGm",
        style: "px-2 text-center",
         bg: "bg-green-600",
          text:'black'
      },
      {
        name: "Actual SGNA",
        value: "actualSGNA",
        style: "px-2 text-center",
         bg: "bg-green-600",
          text:'black'
      },
      {
        name: "Actual Net Profit",
        value: "actualNp",
        style: "px-2 text-center",
         bg: "bg-green-600",
          text:'black'
      },
      ...newColumns,
      ...(shouldIncludeEditColumn
        ? [
            {
              name: "Edit",
              value: "edit",
              style: "min-w-[100px] max-w-[200px] text-center",
            },
            {
              name: "Delete",
              value: "delete",
              style: "min-w-[100px] max-w-[200px] text-center",
            },
          ]
        : [])
    ],
    properties: {
      rpp: [10, 20, 50, 100],
    },
    filter: [],
  };


  async  function handleAddActivity(res){
    setActionVisibility(true);
      if (res?.["Business unit"] !== "" || res?.["Cost Center"] !== "" || res?.["Customer"] !== "") {
        setActionVisibility(false);
    }
    Data.current = ""
    // setExtraColumns(res['Month'])
    Data.current = res['CostCenter']
    // FRERFER
    console.log("============", res)
    if (enable=="Cumulative"){
      setActionVisibility(false);
      res['month']=res['Month']
    }
    console.log("kmjnhvghc vjklhuygv bnjlhbvj==",forExport)
    if (forExport.current) {
      dispatch(
        CommonActions.commondownloadpost(
          "/export/AOP?filter=true&forAirtel=true" +
            (enable == "Cumulative" ? "&Cumulative=true" : ""),
         "AOP.xlsx",
          "POST",
          res
        )
      );
      return true;
    }
    
    const resp = await Api.post({ data: res, url: Urls.aop+("?filter=true&forAirtel=true")+( enable=="Cumulative"?"&Cumulative=true":"" )})
    if (resp.status == 200) {
      dispatch(SET_TABLE(resp?.data?.data))
    }
    // dispatch(tableAction.getTable(Urls.aop+"?filter=true", SET_TABLE))
    // dispatch(FormssActions.postProfiltLossOnSearch(res, () => {}));
  };
  return (
    <>
      <div className="flex items-center justify-start">
        {/* <div className="col-span-1 md:col-span-1">
          <CommonForm
            classes="grid grid-cols-3 w-[550px] overflow-y-hidden p-2"
            Form={formD}
            errors={errors}
            register={register}
            setValue={setValue}
            getValues={getValues}
          />
        </div>
        <div className="flex w-fit mt-4 -ml-3 items-center justify-center">
          <Button
            classes="flex h-fit"
            name=""
            icon={<UilSearch className="w-5 m-2 h-5" />}
            onClick={handleSubmit(handleAddActivity)}
          />
        </div> */}
      </div>
      <Tabs data={tabs} setEnable={setEnable} enable={enable}  forAOP={true} />
      <AdvancedTableAOP 
      totalHeads={true}
        headerButton={
          <>
          <div className="flex gap-1">
          <Button
                onClick={() => {

                  setDollarAmount((prev) => {
                    if (prev.visibility == true) {
                      return {
                        amount: null,
                        visibility: false
                      }
                    }
                    else {
                      // let resp= inrToUsd()
                      // let amount=resp.then((data)=>data)
                      // console.log(",ckmfdevdf;vrvf",amount)
                      return {
                        // amount:resp,
                        ...prev,
                        visibility: true
                      }
                    }
                  })
                  dispatch(tableAction.getTable(Urls.aop + `?forAirtel=true&dollorView=${!dollarAmount.visibility}`, SET_TABLE))
                }}
                //  onClick={(e) => {
                //       setmodalOpen((prev) => !prev);
                //       setmodalHead("New Plan");
                //       // setmodalBody(<PLform isOpen={modalOpen} setIsOpen={setmodalOpen} resetting={true} formValue={{}} />)
                //       setmodalBody(<AOPTrackerForm isOpen={modalOpen} setIsOpen={setmodalOpen} resetting={true} formValue={{}} />)
                //     }}
                // name={"Add New Plan"}
                classes='w-auto'>{dollarAmount.visibility ? <FaDollarSign /> : <FaRupeeSign />}
              </Button>
            <Button
              onClick={(e) => {
                setmodalOpen((prev) => !prev);
                setmodalHead("New Plan");
                // setmodalBody(<PLform isOpen={modalOpen} setIsOpen={setmodalOpen} resetting={true} formValue={{}} />)
                setmodalBody(<AOPTrackerForm isOpen={modalOpen} setIsOpen={setmodalOpen} resetting={true} formValue={{}} forAirtel={true} />)
              }}
              name={"Add New Plan"}
              classes='w-auto'>
            </Button>
            {/* <Button
              onClick={(e) => {
                setmodalOpen((prev) => !prev);
                setmodalHead("Add Actual Plan");
                // setmodalBody(<PLform isOpen={modalOpen} setIsOpen={setmodalOpen} resetting={true} formValue={{}} />)
                setmodalBody(<AddActualAOP isOpen={modalOpen} setIsOpen={setmodalOpen} resetting={true} formValue={{}} />)
              }}
              name={"Add Actual Plan"}
              classes='w-auto'>
            </Button> */}
            <Button name={"Upload File"} classes='w-auto' onClick={(e) => {
                    setFileOpen(prev=>!prev)
                }}>
            </Button>
            <Button name={"Export"} classes='w-auto mr-1' onClick={() => {
                forExport.current=true
                return handleSubmit(handleAddActivity,onError)()
               
              }}>
              </Button>
          </div>
          </>
        }
        table={table}
        filterAfter={onSubmit}
        tableName={"PLform"}
        TableHeight="h-[47vh]"
        handleSubmit={handleSubmit}
        data={rows}
        errors={errors}
        register={register}
        setValue={setValue}
        getValues={getValues}
        totalCount={dollarAmount.visibility ? " Dollar" : " INR"}
        heading = {'Values are shows in Million :'}
      />
      <Modal
        size={"sm"}
        modalHead={modalHead}
        children={modalBody}
        isOpen={modalOpen}
        setIsOpen={setmodalOpen}
      />
      <FileUploader isOpen={fileOpen} fileUploadUrl={""} onTableViewSubmit={onTableViewSubmit} setIsOpen={setFileOpen} tempbtn={true} tempbtnlink = {["/template/AOP.xlsx","AOP.xlsx"]} />
    </>
  );
};

export default AOPTrackingAirtel;




