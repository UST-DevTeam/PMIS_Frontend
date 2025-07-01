import React, { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as Unicons from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import EditButton from "../../../../components/EditButton";
import AdvancedTable from "../../../../components/AdvancedTable";
import Modal from "../../../../components/Modal";
import Button from "../../../../components/Button";
import DeleteButton from "../../../../components/DeleteButton";
import CstmButton from "../../../../components/CstmButton";
// import { getAccessType, objectToQueryString } from "../../../../../utils/commonFunnction";
import { getAccessType, objectToQueryString } from "../../../../utils/commonFunnction";

import { ALERTS } from "../../../../store/reducers/component-reducer";
import CommonActions from "../../../../store/actions/common-actions";
import { Urls } from "../../../../utils/url";
// import FinanceActions from "../../../../store/actions/finance-actions";
// import FormssActions from "../../../store/actions/formss-actions";
import moment from "moment/moment";
// import CommonForm from "../../../components/CommonForm";
// import PLform from "../Formss/P&L/PLform";
// import { UilSearch } from "@iconscout/react-unicons";
import FileUploader from "../../../../components/FIleUploader";
// import CurrentuserActions from "../../../store/actions/currentuser-action";
import gpTrackingActions from "../../../../store/actions/gpTrackingActions";
import SalaryDBForm from "../salaryDBForm";
import AdvancedTableGpTracking from "../../../../components/AdvanceTableGpTracking";
import CommonForm from "../../../../components/CommonForm";
import { UilSearch } from "@iconscout/react-unicons";

const GPTracking = () => {
  
  const currentMonth = new Date().getMonth() + 1;
  const currrentYear = new Date().getFullYear();
  const [modalOpen, setmodalOpen] = useState(false);
  const [modalBody, setmodalBody] = useState(<></>);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [ValGm, setValGm] = useState("Month");
  const endDate = moment().format("Y");
  const [year, setyear] = useState(currrentYear);
  const [modalHead, setmodalHead] = useState(<></>);
  const [extraColumns, setExtraColumns] = useState("");
  const [newColumns, setNewColumns] = useState([]);
  const [selectType, setSelectType] = useState("");
  const [fileOpen, setFileOpen] = useState(false)
  const saveQuery = useRef("")
  // const Data = useRef("")

  let zoneList = useSelector(state => state?.gpTrackingReducer?.getZoneByCustomerId.map((itm) => {
    return {
      label: itm?.zone,
      value: itm?.zoneId,
      zoneName: itm?.zone
    };
  }))

  const monthss = [
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

  let dispatch = useDispatch();



  let costCenterList = useSelector((state) => {

    return state?.gpTrackingReducer?.getCostCenter.map((itm) => {
      return {
        label: itm?.costCenter,
        value: itm?.costCenterId,
      };
    });
  });

  let showType = getAccessType("Actions(P&L)")
  let shouldIncludeEditColumn = false

  if (showType === "visible") {
    shouldIncludeEditColumn = true
  }


  let dbConfigList = useSelector((state) => {
    
    let interdata = state?.gpTrackingReducer?.getGPTrackingMain || [];

    return interdata?.map((itm) => {
      // let vendorCostTemp = 0
      let updateditm = {
        ...itm,
        // vendorCostTemp: (
        //   totalRevenuer=itm?.total_Amount || 0,
        //   TotalAmountvendorCosttemp=itm?.TotalAmountvendorCost || 0,
        //   totalOtherFixedCostTemp=itm?.totalOtherFixedCost || 0,
        //   vendorCostTemp=totalRevenuer(TotalAmountvendorCosttemp+totalOtherFixedCostTemp)

        // ),
        total_Amount: itm?.total_Amount?.toFixed(2),
        totalSalary: itm?.totalSalary?.toFixed(2),
        TotalAmountvendorCost: itm?.TotalAmountvendorCost?.toFixed(2),
        totalOtherFixedCost: itm?.totalOtherFixedCost?.toFixed(2),
        ApprovedAmount: itm?.ApprovedAmount?.toFixed(2),
        COGS: itm?.COGS?.toFixed(2),
        GROSSPROFITINR: ("₹ " + (itm?.GROSSPROFITINR?.toFixed(2) || 0)),
        GROSSRevenuePer: (itm?.GPRevenuePercentage ? itm?.GPRevenuePercentage?.toFixed(2) : "0") + " %",
        monthName: itm?.Month
        // edit: (
        //   <CstmButton
        //     className={"p-2"}
        //     child={
        //       <EditButton
        //         name={""}
        //         onClick={() => {
        //           setmodalOpen(true);
        //           setmodalHead("Edit Plan");
        //           setmodalBody(
        //             <>
        //               <SalaryDBForm
        //                 isOpen={modalOpen}
        //                 setIsOpen={setmodalOpen}
        //                 resetting={false}
        //                 formValue={itm}
        //                 year = {year}
        //                 monthss = {[itm?.month]}
        //                 filtervalue = {""}
        //               />
        //             </>
        //           );
        //         }}
        //       ></EditButton>
        //     }
        //   />
        // ),

        // delete: (
        //   <CstmButton
        //     child={
        //       <DeleteButton
        //         name={""}
        //         onClick={() => {
        //           let msgdata = {
        //             show: true,
        //             icon: "warning",
        //             buttons: [
        //               <Button
        //                 classes='w-15 bg-rose-400'
        //                 onClick={() => {
        //                   dispatch(
        //                     CommonActions.deleteApiCaller(
        //                       `${Urls.gpTracking_salaryDB}/${itm.uniqueId}`,
        //                       () => {
        //                         // dispatch(FormssActions.getProfiltLoss());
        //                         dispatch(gpTrackingActions.getGPSalaryDB())
        //                         dispatch(ALERTS({ show: false }));
        //                       }
        //                     )
        //                   );
        //                 }}
        //                 name={"OK"}
        //               />,
        //               <Button
        //                 classes="w-auto"
        //                 onClick={() => {
        //                   dispatch(ALERTS({ show: false }));
        //                 }}
        //                 name={"Cancel"}
        //               />,
        //             ],
        //             text: "Are you sure you want to Delete?",
        //           };
        //           dispatch(ALERTS(msgdata));
        //         }}
        //       ></DeleteButton>
        //     }
        //   />
        // ),
      };
      return updateditm;
    });
  });

  let dbConfigTotalCount = useSelector((state) => {
    let interdata = state?.gpTrackingReducer?.getGPTrackingMain || [];
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
    formState: { errors },
  } = useForm();

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

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
  // for (let ywq = 2023; ywq <= +endDate; ywq++) {
  //   listYear.push(ywq);
  // }
  for (let ywq = 2023; ywq <= +endDate; ywq++) {
    listYear.push({ label: ywq, value: ywq });
  }






  let listDict = {

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
    // alert('dhdjjdjjjd')
    console.log("hello_printed")
    let value = data.reseter;
    delete data.reseter;
    const customerName = customerList.find(item => item.value == data.customer)?.customerName
    const costCenterName = data["Cost Center"].split(",").map(costCenterId => costCenterList.find(item => item.value == costCenterId)?.label)
    const zoneName = data.Zone.split(",").map(zoneId => zoneList.find(item => item.value == zoneId)?.zoneName)
    data.customer = customerName
    data.costCenter = costCenterName
    data.zoneName = zoneName
    delete data["Cost Center"]
    delete data["Zone"]
    let strVal = objectToQueryString(data);
    saveQuery.current = data
    dispatch(gpTrackingActions.getGPTrackingMain(true, strVal))
  };


  
  useEffect(() => {
    // dispatch(FormssActions.getProfiltLoss())
     dispatch(gpTrackingActions.getGPTrackingMain())

    // dispatch(CurrentuserActions.getcurrentuserCostCenter(true,"",0))
    // dispatch(gpTrackingActions.getGPProjectGroup())
    dispatch(gpTrackingActions.getGPCustomer())

  }, []);


  let formD = [
    {
      label: "Year",
      name: "year",
      value: "Select",
      bg: 'bg-[#3e454d] text-gray-300 border-[1.5px] border-solid border-[#64676d]',
      type: "select",
      option: listYear.map((itmYr) => {
        return {
          label: itmYr,
          value: itmYr,
        };
      }),
      props: {
        onChange: (e) => {
          setValue("year", e.target.value);
          setyear(e.target.value);
        },
      },
      required: false,
      classes: "col-span-1 h-38px",
    },
    {
      label: ValGm,
      name: "viewBy",
      value: "Select",
      type: "newmuitiSelect2",
      option: listDict[ValGm].map((dasd) => {
        return {
          value: dasd?.id,
          label: dasd?.name,
        };
      }),
      props: {
        selectType: selectType,
      },
      hasSelectAll: true,
      required: false,
      classes: "col-span-1 h-10",
    },
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
    let cols = [];
    cols = cols.flat(Infinity);
    setNewColumns(cols);
  }, [extraColumns]);

  // const handleAddActivity = (res) => {
  //   Data.current = ""
  //   setExtraColumns(res['Month'])
  //   Data.current = res['Cost Center']
  //   // dispatch(FormssActions.postProfiltLossOnSearch(res, () => {}));
  //   console.log(res, 'lieoijejiejijied')
  //   dispatch(gpTrackingActions.getGPSalaryDB(true, res))
  // };


  const onTableViewSubmit = (data) => {
    data["fileType"] = "ManageSalaryDB"
    dispatch(CommonActions.fileSubmit(Urls.common_file_uploadr, data, () => {
      setFileOpen(false)
      dispatch(gpTrackingActions.getGPSalaryDB())
    }))
  }

  let customerList = useSelector((state) => {

    return state?.gpTrackingReducer?.getCustomer.map((itm) => {

      return {
        label: itm?.customer,
        value: itm?.uniqueId,
        customerName: itm?.customerName
      };
    });
  });

  const handleCustomerChange = (value) => {
    const selectedValue = value;
    setSelectedCustomer(selectedValue);
    // dispatch(gpTrackingActions.getGPProjectGroup(selectedValue,true));

    dispatch(gpTrackingActions.getGPCostCenter(selectedValue, true));
    dispatch(gpTrackingActions.getZoneByCustomerId(selectedValue, true));
  };


  let Form = [
    {
      label: "Year",
      value: "",
      name: "year",
      type: "select",
      option: listYear,
      required: false,
    },
    {
      label: "Month",
      value: "",
      name: "month",
      type: "select",
      option: monthss,
      required: false,
    },
    {
      label: "Customer",
      value: "",
      name: "customer",
      type: "select",
      option: customerList,
      props: {
        onChange: (e) => {
          // alert(e.target.value)
          handleCustomerChange(e.target.value);
        },
      },
      required: false,
    },
    {
      label: "Cost Center",
      value: "",
      name: "costCenter",
      type: "select",
      option: costCenterList,
      required: false,
    },

  ];


  const table = useMemo(() => {
    return {
      columns: [

        {
          name: "Customer",
          value: "customer",
          style: "min-w-[140px] max-w-[200px] text-center",
          bg: "bg-sky-500"
        },
        {
          name: "Cost Center",
          value: "costCenter",
          style: "min-w-[90px] max-w-[90px] text-center",
          bg: "bg-sky-200"
        },
        {
          name: "Zone",
          value: "zone",
          style: "min-w-[90px] max-w-[90px] text-center",
          bg: "bg-sky-200"
        },
        {
          name: "Year",
          value: "year",
          style: "min-w-[70px] max-w-[90px] text-center",
          bg: "bg-sky-200"
        },
        {
          name: "Month",
          value: "monthName",
          style: "min-w-[100px] max-w-[90px] text-center",
          bg: "bg-sky-200"
        },
        {
          name: "Revenue",
          value: "total_Amount",
          style: "min-w-[90px] max-w-[90px] text-center",
          bg: "bg-orange-400 whitespace-nowrap px-2"
        },
        {
          name: "Salary",
          value: "totalSalary",
          style: "min-w-[90px] max-w-[90px] text-center",
          bg: "bg-green-600 whitespace-nowrap px-2"
        },

        {
          name: "Vendor Cost",
          value: "TotalAmountvendorCost",
          style: "min-w-[90px] max-w-[150px] text-center",
          bg: "bg-green-600 whitespace-nowrap px-2"
        },
        {
          name: "Other Fixed Cost",
          value: "totalOtherFixedCost",
          style: "min-w-[90px] max-w-[150px] text-center",
          bg: "bg-green-600 whitespace-nowrap px-2"
        },
        {
          name: "Employee Expanse",
          value: "ApprovedAmount",
          style: "min-w-[90px] max-w-[150px] text-center",
          bg: "bg-green-600 whitespace-nowrap px-2"
        },
        {
          name: "COGS",
          value: "COGS",
          style: "min-w-[90px] max-w-[150px] text-center",
          bg: "bg-green-600 whitespace-nowrap px-2"
        },
        {
          name: "GROSS PROFIT",
          value: "GROSSPROFITINR",
          style: "min-w-[90px] max-w-[150px] text-center",
          bg: "bg-sky-200 whitespace-nowrap px-2"
        },
        {
          name: "GROSS MARGIN",
          value: "GROSSRevenuePer",
          style: "min-w-[90px] max-w-[200px] text-center",
          bg: "bg-sky-200 whitespace-nowrap"
        },

        ...newColumns,
        ...(shouldIncludeEditColumn
          ? [
            // {
            //   name: "Edit",
            //   value: "edit",
            //   style: "min-w-[100px] max-w-[200px] text-center",
            // },
            // {
            //   name: "Delete",
            //   value: "delete",
            //   style: "min-w-[100px] max-w-[200px] text-center",
            // },
          ]
          : [])
      ],
      properties: {
        rpp: [10, 20, 50, 100],
      },
      filter: [],
    }
  }, [handleCustomerChange])


  let formFields = [
    {
      label: "Year",
      value: "",
      name: "year",
      type: "select",
      option: listYear,
      required: true,
      bg: 'bg-[#3e454d] text-gray-300 border-[1.5px] border-solid border-[#64676d]',

    },
    {
      label: "Month",
      value: "",
      name: "month",
      type: "newmuitiSelect2",
      option: monthss,
      required: true,
      props: {
        selectType: "selectType",
      },
      hasSelectAll: true,
      classes: "col-span-1 h-10",

    },
    {
      label: "Customer",
      value: "",
      name: "customer",
      type: "select",
      bg: 'bg-[#3e454d] text-gray-300 border-[1.5px] border-solid border-[#64676d]',
      option: customerList,
      props: {
        onChange: (e) => {
          handleCustomerChange(e.target.value);
        },
      },
      required: false,

    },
    {
      label: "Cost Center",
      value: "",
      name: "costCenter",
      type: "newmuitiSelect2",
      option: costCenterList,
      required: false,
      props: {
        selectType: "selectType",
      },
      hasSelectAll: true,
      classes: "col-span-1 h-10",

    },
    {
      label: "Zone",
      value: "Select",
      name: "zone",
      type: "newmuitiSelect2",
      option: zoneList,
      required: false,
      props: {
        selectType: "selectType",
      },
      classes: "col-span-1 h-10",
      hasSelectAll: true,
    },
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
    //   required: false,
    //   classes: "col-span-1 h-10",
    // },

  ];


  return (
    <>

      <div className="col-span-1 flex space-x-2 md:col-span-1">
        <CommonForm
          classes="grid grid-cols-5 w-[900px] overflow-y-hidden p-2"
          Form={formFields}
          errors={errors}
          register={register}
          setValue={setValue}
          getValues={getValues}
        />
        <div className="flex w-fit mt-4 -ml-3 items-center justify-center">
          <Button
            classes="flex h-fit"
            name=""
            icon={<UilSearch className="w-5 m-2 h-5" />}
            onClick={handleSubmit(onSubmit)}
          />
        </div>
      </div>

      <AdvancedTableGpTracking
      totalHeads={true}
        headerButton={
          <>
            <div className="flex justify-between">
              {/* <Button
              onClick={(e) => {
                setmodalOpen((prev) => !prev);
                setmodalHead("New Plan");
                setmodalBody(<SalaryDBForm isOpen={modalOpen} setIsOpen={setmodalOpen} resetting={true} formValue={{}} />)
              }}
              name={"Add New"}
              classes='w-auto mr-1'>
            </Button> */}
              {/* <Button name={"Upload File"} classes='w-auto mr-1' onClick={(e) => {
                    setFileOpen(prev=>!prev)
                }}>
            </Button> */}

              <Button name={"Export"} classes='w-auto mr-1 !h-10' onClick={(e) => {
                dispatch(CommonActions.commondownloadpost("/export/gpTracking", "GP_Tracking.xlsx", "POST", saveQuery?.current))
              }}>
              </Button>
             {/* <Button name={"Export2"} classes='w-auto mr-1 !h-10' onClick={(e) => {
                dispatch(CommonActions.commondownloadpost("/gpTracking/Test", "GP_Tracking.xlsx", "POST", saveQuery.current))
              }}>
              </Button>*/}
            </div>
          </>
        }
        table={table}
        filterAfter={onSubmit}
        tableName={"Salary DB Form"}
        TableHeight = "h-[54vh]" 
        handleSubmit={handleSubmit}
        data={dbConfigList}
        errors={errors}
        register={register}
        setValue={setValue}
        getValues={getValues}
        totalCount={""}
        heading="Values are in Lakh"
      />
      <Modal
        size={"sm"}
        modalHead={modalHead}
        children={modalBody}
        isOpen={modalOpen}
        setIsOpen={setmodalOpen}
      />
      <FileUploader isOpen={fileOpen} fileUploadUrl={""} onTableViewSubmit={onTableViewSubmit} setIsOpen={setFileOpen} tempbtn={true} tempbtnlink={["/template/SalaryDb.xlsx", "Salary_DB.xlsx"]} />
    </>
  );
};

export default GPTracking;
