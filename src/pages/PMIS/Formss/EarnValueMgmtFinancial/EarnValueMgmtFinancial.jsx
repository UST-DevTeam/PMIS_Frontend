import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
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
import EarnValueMgmtForm from "../../../../pages/PMIS/Formss/EarnValueMgmtFinancial/EarnValueMgmtForm";
import FinanceActions from "../../../../store/actions/finance-actions";
import FormssActions from "../../../../store/actions/formss-actions";
import moment from "moment/moment";
import CommonForm from "../../../../components/CommonForm";
import { UilSearch } from "@iconscout/react-unicons";
import FileUploader from "../../../../components/FIleUploader";
import { FaDollarSign, FaRupeeSign } from "react-icons/fa";
import CurrentuserActions from "../../../../store/actions/currentuser-action";
import { GET_CURRENT_USER_COST_CENTER } from "../../../../store/reducers/currentuser-reducer";
import AdvancedTableInvoicePVA from "../../../../components/AdvancedTableInvoicePVA";

const EarnValueMgmtFinancial = () => {
  const Data = useRef("")
  const currentMonth = new Date().getMonth() + 1;
  const currrentYear = new Date().getFullYear();
  const [modalOpen, setmodalOpen] = useState(false);
  const [change, setChange] = useState(false);
  const [modalBody, setmodalBody] = useState(<></>);
  const [ValGm, setValGm] = useState("Monthly");
  const endDate = moment().format("Y");
  const [year, setyear] = useState(currrentYear);
  const [modalHead, setmodalHead] = useState(<></>);
  const [extraColumns, setExtraColumns] = useState([currentMonth]);
  const [newColumns, setNewColumns] = useState([]);
  const [selectType, setSelectType] = useState("");
  const [fileOpen, setFileOpen] = useState(false)
  const[viewType,setViewType] = useState("Month")
  const exportData = useRef([])
  const [amountType, setAmountType] = useState("INR")
  const[costCenter,setCostCenter] = useState([""])
  const[customer,setCustomer] = useState([""])
  const[businessUnit,setBusinessUnit] = useState([""])
  const[monthList,setMonthList] = useState([])
  const[selectedYear,setSelectedYear] = useState(currrentYear)

  let extraColumnsWithYear;

  if (currentMonth === 1) {
    extraColumnsWithYear = [
      {'month':11,"year":currrentYear-1},
      {'month':12,"year":currrentYear-1},
      {'month':1,"year":currrentYear}
    ];
  } else if (currentMonth === 2) {
    extraColumnsWithYear = [
      {'month':12,"year":currrentYear-1},
      {'month':1,"year":currrentYear},
      {'month':2,"year":currrentYear}
    ];
  } else {
    extraColumnsWithYear = [
      {'month':currentMonth-2,"year":currrentYear},
      {'month':currentMonth-1,"year":currrentYear},
      {'month':currentMonth,"year":currrentYear}
    ];
  }
  const [extraColumnsState, setExtraColumnsState] = useState(extraColumnsWithYear);

  let dispatch = useDispatch();

  let showType = getAccessType("Actions(EVM-Financial)")
  let shouldIncludeEditColumn = false
  if (showType === "visible"){
    shouldIncludeEditColumn = true
  }

  let dbConfigList = useSelector((state) => {
    let interdata = state?.formssData?.getEarnValueMgmtFinancial || [];
    return interdata?.map((itm) => {
      let updateditm = {
        ...itm,
        edit: (
          <CstmButton
            className={"p-2"}
            child={
              <EditButton
                name={""}
                onClick={() => {
                  setmodalOpen(true);
                  setmodalHead("Edit Plan");
                  setmodalBody(
                    <>
                      <EarnValueMgmtForm
                        isOpen={modalOpen}
                        setIsOpen={setmodalOpen}
                        resetting={false}
                        formValue={itm}
                        year = {year}
                        monthss = {extraColumns}
                        columnHeader = {extraColumnsState}
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
                              `${Urls.formss_earnValue_mgmt_financial}/${itm.uniqueId}`,
                              () => {
                                dispatch(
                                  FormssActions.getEarnValueMgmtFinancial()
                                );
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
        ),
      };
      return updateditm;
    });
  });

  let dbConfigTotalCount = useSelector((state) => {
    let interdata = state?.formssData?.getEarnValueMgmtFinancial || [];
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
    getValues,
    formState: { errors },
  } = useForm();

  useEffect(() => {

    const allMonths = [
        { label: "Jan", value: 1 }, { label: "Feb", value: 2 }, { label: "Mar", value: 3 },
        { label: "Apr", value: 4 }, { label: "May", value: 5 }, { label: "Jun", value: 6 },
        { label: "Jul", value: 7 }, { label: "Aug", value: 8 }, { label: "Sep", value: 9 },
        { label: "Oct", value: 10 }, { label: "Nov", value: 11 }, { label: "Dec", value: 12 }
    ];
    setMonthList(selectedYear == currrentYear ? allMonths.slice(0, currentMonth) : allMonths);

  }, [selectedYear]);



  let table = {
    columns: [
      {
        name: "Customer",
        value: "customer",
        style: "min-w-[90px] max-w-[90px] text-center",
      },
      {
        name: "Cost Center",
        value: "costCenter",
        style: "min-w-[90px] max-w-[90px] text-center",
      },
      {
        name: "Zone",
        value: "zone",
        style: "min-w-[90px] max-w-[90px] text-center",
      },
      {
        name: "Business Unit",
        value: "businessUnit",
        style: "min-w-[100px] max-w-[100px] text-center",
      },
      ...newColumns,
    
      // ...(shouldIncludeEditColumn && viewType === "Month"
      //   ? [
      //       {
      //         name: "Edit",
      //         value: "edit",
      //         style: "min-w-[100px] max-w-[100px] text-center",
      //       },
      //     ]
      //   : [])
    ],
    properties: {
      rpp: [10, 20, 50, 100],
    },
    filter: [],
  };

  let listYear = [];
  for (let ywq = 2023; ywq <= +endDate; ywq++) {
    listYear.push({ label: ywq, value: ywq });
  }

  function getWeekNumber(d) {
    d = new Date(+d);
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    var yearStart = new Date(d.getFullYear(), 0, 1);
    var weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
    return [d.getFullYear(), weekNo];
  }

  function weeksInYear(year) {
    var month = 11,
      day = 31,
      week;

    do {
      let d = new Date(year, month, day--);
      week = getWeekNumber(d)[1];
    }
    while (week == 1);

    return week;
  }

  let listW = [];
  for (let wwq = 1; wwq <= +weeksInYear(year); wwq++) {
    const weekString = "W-" + wwq;
    listW.push({ id: weekString, name: weekString });
  }

  // let listDict = {
  //   "": [],
  //   Weekly: listW,
  //   Monthly: [
  //     { id: 1, name: "Jan" },
  //     { id: 2, name: "Feb" },
  //     { id: 3, name: "Mar" },
  //     { id: 4, name: "Apr" },
  //     { id: 5, name: "May" },
  //     { id: 6, name: "Jun" },
  //     { id: 7, name: "Jul" },
  //     { id: 8, name: "Aug" },
  //     { id: 9, name: "Sep" },
  //     { id: 10, name: "Oct" },
  //     { id: 11, name: "Nov" },
  //     { id: 12, name: "Dec" }
  //   ],
  // };


  const bussinessUnit = useSelector((state) =>
    (state?.currentuserData?.getcurrentuserBusinessUnit ?? []).filter((itm) => itm.businessUnit).map((itm) => ({
      label: itm.businessUnit,
      value: itm.businessUnit,
    }))
  );

  let customerList = useSelector((state) => {
    return state?.currentuserData?.getcurrentuserCustomer.map((itm) => {
      return {
        label: itm?.customerName,
        value: itm?.customerId,
      };
    });
  });

  const costCenterList = useSelector((state) =>
    (state?.currentuserData?.getcurrentusercostcenter ?? [])?.map((itm) => ({
      label: itm.costCenter,
      value: itm.uniqueId,
    }))
  );


  const onSubmit = (data) => {
    let value = data.reseter;
    delete data.reseter;
    dispatch(FinanceActions.getPoLifeCycle(value, objectToQueryString(data)));
  };

  useEffect(() => {
    dispatch(CurrentuserActions.getcurrentuserCustomer())
    dispatch(CurrentuserActions.getcurrentuserBusinessUnit())
  }, []);

  useEffect(() => {
    exportData.current = []
    extraColumnsState.forEach((itm) => {
      exportData.current =  [...exportData.current, itm.month+"-"+itm.year]
    });
    dispatch(
      FormssActions.postEarnValueMgmtFinancial(
        {
          Monthly: exportData.current.join(","),
          viewType:viewType,
          amountType:amountType,
          customer:customer,
          costCenter:costCenter,
          businessUnit:businessUnit
        },
        () => { }
      )
    );
  }, [amountType]);


  useEffect(() => {
    const monthMap = {1: "Jan",2: "Feb",3: "Mar",4: "Apr",5: "May",6: "Jun",7: "Jul",8: "Aug",9: "Sep",10: "Oct",11: "Nov", 12: "Dec"};
    let cols = [];
    extraColumnsState.forEach((itm) => {
      let monthName = monthMap[itm.month];
      let year = itm.year;
      if (ValGm && ValGm === "Monthly") {
        cols.push([
         
          {
            name: `PV Target (${monthName} ${year})`,
            value: "pv-"+itm.month+"-"+year,
            style: "min-w-[150px] max-w-[150px] text-center",
          },
          {
            name: `Achievement (${monthName} ${year})`,
            value: "amount-"+itm.month+"-"+year,
            style: "min-w-[180px] max-w-[180px] text-center",
          },  
        ]);
      } else {
        cols.push([
      
          {
            name: `PV Target (${index} ${year})`,
            value: '',
            style: "min-w-[200px] max-w-[200px] text-center",
          },
          {
            name: `Achievement (${index} ${year})`,
            value: index,
            style: "min-w-[200px] max-w-[200px] text-center",
          },
        ]);
      }
    });
    cols = cols.flat(Infinity);
    setNewColumns(cols);
  }, [extraColumnsState, modalOpen]);


  let formD = [
    {
      label: "Year",
      value: "",
      name: "year",
      type: "select",
      option: listYear,
      required: true,
      props:{
        onChange:(e) => {
          if (e.target.value){
            setSelectedYear(e.target.value)
          }
          else {
            setSelectedYear(currrentYear)
          }
        }
      },
      bg : 'bg-[#3e454d] text-gray-300 border-[1.5px] border-solid border-[#64676d]',
      classes:"w-44 sm:w-24 md:w-34 xl:w-44"
    },
    {
      label: "Month",
      value: "",
      name: "month",
      type:"newmuitiSelect2",
      option: monthList,
      required: true,
      props: {
        selectType: selectType,
      },
      classes: "col-span-1 ",
      hasSelectAll:true,
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
      classes: "col-span-1 h-10",
    },
    {
      label: "Customer",
      value: "",
      name: "customerId",
      type: "select",
      option: customerList,
      bg: 'bg-[#3e454d] text-gray-300 border-[1.5px] border-solid border-[#64676d]',
      props: {
        onChange: (e) => {
          if (e.target.value){
            dispatch(CurrentuserActions.getcurrentuserCostCenter(true,"",1,e.target.value))
          }
          else {
            dispatch(GET_CURRENT_USER_COST_CENTER({dataAll:[],reset:true}))
          }
          
        },
      },
      classes:"w-44 sm:w-24 md:w-34 xl:w-44"
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

  async  function handleAddActivity(res){
    let months = res?.Month?.split(",")?.map((key) => +key)?.sort((a, b) => a - b);
    let costCenter = res?.['Cost Center'].split(",")
    let customer = res?.['customerId'].split(",")
    let businessUnit = res?.['Business unit'].split(",")
    let extraCol = months.map((itm) => ({ month: itm, year: res.year }));
    setExtraColumnsState(extraCol)
    setCustomer(customer)
    setCostCenter(costCenter)
    setBusinessUnit(businessUnit)
    exportData.current = []
    months.forEach((itm) => {
      exportData.current =  [...exportData.current, itm+"-"+res.year]
    });
    dispatch(
      FormssActions.postEarnValueMgmtFinancial(
        {
          Monthly: exportData.current.join(","),
          viewType:viewType,
          amountType:amountType,
          customer:customer,
          costCenter:costCenter,
          businessUnit:businessUnit
        },
        () => {}
      )
    );
  };

  const onTableViewSubmit = (data) => {
    data["fileType"] = "EVMFinancial"
    dispatch(CommonActions.fileSubmit(Urls.common_file_uploadr, data, () => {
      setFileOpen(false)
    }))
  }

  return (
    <>
      <div className="flex items-center px-4 space-x-4 mt-1">
        <button 
          onClick={() => {
            setViewType("Month")
            if (viewType !== "Month") {
              exportData.current = []
              extraColumnsState.forEach((itm) => {
                exportData.current =  [...exportData.current, itm.month+"-"+itm.year]
              });
              dispatch(
                FormssActions.postEarnValueMgmtFinancial(
                  {
                    Monthly: exportData.current.join(","),
                    viewType:"Month",
                    amountType:amountType,
                    customer:customer,
                    costCenter:costCenter,
                    businessUnit:businessUnit
                  },
                  () => {}
                )
              );
            }
            
          }}
          className={`text-white rounded-full py-[6px] px-3 ${viewType === "Month" ? "bg-onHoverButton" : "bg-pcol"} `}>
          Month
        </button>
        <button 
          onClick={() => {
            setViewType("Cumulative")
            if (viewType !== "Cumulative"){
              exportData.current = []
              extraColumnsState.forEach((itm) => {
                exportData.current =  [...exportData.current, itm.month+"-"+itm.year]
              });
              dispatch(
                FormssActions.postEarnValueMgmtFinancial(
                  {
                    Monthly: exportData.current.join(","),
                    viewType:"Cumulative",
                    amountType:amountType,
                    customer:customer,
                    costCenter:costCenter,
                    businessUnit:businessUnit
                  },
                  () => {}
                )
              );
            }
          }}
          className={`text-white rounded-full py-[6px] px-3 ${viewType === "Cumulative" ? "bg-onHoverButton" : "bg-pcol"} `}>
          Cumulative
        </button>
        
      </div>
      <div className="flex items-center justify-start ">
        <div className="col-span-1 md:col-span-1">
          <CommonForm
            classes="grid grid-cols-5 w-full overflow-y-hidden"
            Form={formD}
            errors={errors}
            register={register}
            setValue={setValue}
            getValues={getValues}
          />
        </div>
        <div className="flex w-fit mt-4  items-center justify-center ">
          <Button
            classes=" flex h-fit "
            name=""
            icon={<UilSearch className="w-5 m-2 h-5" />}
            onClick={handleSubmit(handleAddActivity)}
          />
        </div>
      </div>
      <AdvancedTableInvoicePVA
      totalHeads = {true} 
        headerButton={
          <> 
          <Button
            onClick={() => {
              setAmountType(amountType === "INR" ? "DOLLAR" : "INR")
            }}       
            classes='w-auto mr-1'>{amountType === "INR" ? <FaRupeeSign /> : <FaDollarSign />}
          </Button>
            <Button name={"Upload File"} classes='w-auto mr-1' onClick={(e) => {
              setFileOpen(prev => !prev)
            }}>
            </Button>
          </>
        }
        table={table}
        exportButton={["/forms/earnValue", `Export_${viewType}_${amountType}_Invoice_PVA.xlsx`,"POST",{Monthly: exportData.current.join(","),viewType:viewType,amountType:amountType,customer:customer,costCenter:costCenter,businessUnit:businessUnit}]}
        filterAfter={onSubmit}
        tableName={"EvmFinancialForm"}
        TableHeight="h-[50.5vh]"
        handleSubmit={handleSubmit}
        data={dbConfigList}
        errors={errors}
        register={register}
        setValue={setValue}
        getValues={getValues}
        totalCount={""}
        getaccessExport={"Export(EVM-Financial)"}
        heading = {`Values are shows in Million : ${amountType}`}
      />

      <Modal
        size={"sm"}
        modalHead={modalHead}
        children={modalBody}
        isOpen={modalOpen}
        setIsOpen={setmodalOpen}
      />
      <FileUploader isOpen={fileOpen} fileUploadUrl={""} onTableViewSubmit={onTableViewSubmit} setIsOpen={setFileOpen} tempbtn={true} tempbtnlink={["/template/EvmFinancial.xlsx", "EvmFinancial.xlsx"]} />
    </>
  );
};
export default EarnValueMgmtFinancial;
