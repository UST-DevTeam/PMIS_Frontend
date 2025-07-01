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
import AOPTrackerForm from "../AOP/AOPTrackerForm";
import PLform from "../P&L/PLform";

import { tableAction } from "../../../../store/actions/table-action";
import { SET_TABLE } from "../../../../store/reducers/table-reducer";
import Api from "../../../../utils/api";
import { FaDollarSign, FaRupeeSign } from "react-icons/fa";
import gpTrackingActions from "../../../../store/actions/gpTrackingActions";
import { SET_BUSSINESS_UNIT } from "../../../../store/reducers/dropDown-reducer";

function Tabs({ data, enable, setEnable }) {

  return (
    <div>
      <div className="flex items-center px-4 space-x-4">
        {
          data.map(item => {
            return <button onClick={() => setEnable(item.label)} className={`text-white rounded-2xl py-[6px] px-3 ${enable === item.label ? "bg-onHoverButton" : "bg-pcol"}`}>{item.label}</button>
          })
        }

      </div>
      <div className="mt-4 p-4">
        {
          data.find(item => item.label === enable)?.body
        }
      </div>
    </div>

  )
}

const ForcastCOPGSTracking = () => {

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setValues,
    reset,
    formValue,
    getValues,
    formState: { errors },
  } = useForm();




  const [dollarAmount, setDollarAmount] = useState({
    amount: null,
    visibility: false
  })

  const currentMonth = new Date().getMonth() + 1;
  const currrentYear = new Date().getFullYear();
  const [modalOpen, setmodalOpen] = useState(false);
  const [modalBody, setmodalBody] = useState(<></>);
  const [ValGm, setValGm] = useState("Month");
  const endDate = moment().format("Y");
  const [year, setyear] = useState(currrentYear);
  const [modalHead, setmodalHead] = useState(<></>);
  const [extraColumns, setExtraColumns] = useState("");
  const [newColumns, setNewColumns] = useState([]);
  const [selectType, setSelectType] = useState("");
  const [fileOpen, setFileOpen] = useState(false)
  const Data = useRef("")
  // let months = [
  //   "Jan",
  //   "Feb",
  //   "Mar",
  //   "Apr",
  //   "May",
  //   "Jun",
  //   "Jul",
  //   "Aug",
  //   "Sep",
  //   "Oct",
  //   "Nov",
  //   "Dec",
  // ];
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
  const months = [
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

  let rows = useSelector(state => {
    return Array.isArray(state.formssData.getForecastCOGS)
      ? state.formssData.getForecastCOGS
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
    return state?.gpTrackingReducer?.getCostCenter.map((itm) => {
      return {
        label: itm?.costCenter,
        value: itm?.costCenterId,
      };
    });
  });
  let bussinessUnit = useSelector((state) => {
    return Array.isArray(state?.dropDown?.bussinessUnit) ? state?.dropDown?.bussinessUnit.map((itm) => {
      return {
        label: itm,
        value: itm,
      };
    }) : []
  });

  let showType = getAccessType("Actions(P&L)")
  let shouldIncludeEditColumn = false

  if (showType === "visible") {
    shouldIncludeEditColumn = true
  }

  let dbConfigList = useSelector((state) => {
    let interdata = state?.formssData?.getProfitloss || [];
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
                      <PLform
                        isOpen={modalOpen}
                        setIsOpen={setmodalOpen}
                        resetting={false}
                        formValue={itm}
                        year={year}
                        monthss={[itm?.month]}
                        filtervalue={""}
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
                              `${Urls.forms_profit_loss}/${itm.uniqueId}`,
                              () => {
                                dispatch(FormssActions.getProfiltLoss());
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
    let interdata = state?.formssData?.getProfitloss || [];
    if (interdata.length > 0) {
      return interdata[0]["overall_table_count"];
    } else {
      return 0;
    }
  });

  const handleCustomerChange = (value) => {
    const selectedValue = value;
    // dispatch(gpTrackingActions.getGPProjectGroup(selectedValue,true));
    dispatch(gpTrackingActions.getGPCostCenter(selectedValue, true));


  };

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

  let table = {
    columns: [
      {
        name: "Customer",
        value: "customerName",
        style: "px-2 text-center  text-3xl",
      },
      {
        name: "UST Project ID",
        value: "ustProjectID",
        style: "px-2 text-center",
      },
      {
        name: "Cost Center",
        value: "costCenter",
        style: "px-2 text-center",
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

  let listYear = [];
  for (let ywq = 2023; ywq <= +endDate; ywq++) {
    listYear.push({ label: ywq, value: ywq });
  }

  // let listDict = {
  //   "": [],
  //   Month: [
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

  const onSubmit = (data) => {
    let value = data.reseter;
    delete data.reseter;
    let strVal = objectToQueryString(data);
    dispatch(FormssActions.getProfiltLoss(true, strVal));
  };
  // async function inrToUsd() {
  //   const response = await fetch('https://api.exchangerate-api.com/v4/latest/INR');
  //   const data = await response.json();
  //   const rate = data.rates.USD;
  //   setDollarAmount((prev) => {
  //     return { ...prev, amount: rate }
  //   })
  //   return rate;
  // }
  const bussiness = async () => {
    let res = await Api.get({ url: Urls.businessUnit, contentType: "application/json" })
    console.log("================", res.data.data)
    dispatch(SET_BUSSINESS_UNIT(res.data?.data[0]?.bussinessUnit))
  }
  useEffect(() => {
    // inrToUsd
    // bussiness()                  
    // dispatch(FormssActions.getProfiltLoss())

    // dispatch(tableAction.getTable(Urls.aop, SET_TABLE))
    // dispatch(CurrentuserActions.getcurrentuserCostCenter(true, "", 0))
    dispatch(FormssActions.getForecastCOGS())
  }, []);

  let customerList = useSelector((state) => {
    return state?.gpTrackingReducer?.getCustomer.map((itm) => {
      return {
        label: itm?.customer,
        value: itm?.uniqueId,
      };
    });
  });

  let formD = [
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
      bg: 'bg-[#3e454d] text-gray-300 border-[1.5px] border-solid border-[#64676d]',
    },
    {
      label: "Month",
      value: "",
      name: "month",
      type: "select",
      option: months,
      required: true,
      bg: 'bg-[#3e454d] text-gray-300 border-[1.5px] border-solid border-[#64676d]',
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
    {
      label: "Customer",
      value: "",
      name: "customerId",
      type: "select",
      option: customerList,
      bg: 'bg-[#3e454d] text-gray-300 border-[1.5px] border-solid border-[#64676d]',
      props: {
        onChange: (e) => {
          handleCustomerChange(e?.target?.value);
        },
      },
      // required: true,
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
      bg: 'bg-[#3e454d] text-gray-300 border-[1.5px] border-solid border-[#64676d]',
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
    {
      label: "Customer",
      value: "",
      name: "customerId",
      type: "select",
      option: customerList,
      bg: 'bg-[#3e454d] text-gray-300 border-[1.5px] border-solid border-[#64676d]',
      props: {
        onChange: (e) => {
          handleCustomerChange(e?.target?.value);
        },
      },
      // required: true,
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


  const tabs = [
    {
      label: "Month",
      body:
        <div className="flex items-center justify-start">


          <div className="w-full">
            <CommonForm
              classes="grid grid-cols-5"
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
          </div>
        </div>
    },
    {
      label: "Cumulative",
      body: <div className="flex items-center justify-start">


        <div className="w-full">
          <CommonForm
            classes="grid grid-cols-5"
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
            onClick={handleSubmit(handleAddActivity)}
          />
        </div>
      </div>
    },
  ]
  const [enable, setEnable] = useState(tabs[0].label)
  async function handleAddActivity(res) {
    Data.current = ""
    // setExtraColumns(res['Month'])
    Data.current = res['CostCenter']
    // FRERFER
    console.log("============", res)
    if (enable == "Cumulative") {

      res['month'] = res['Month']
    }


    const resp = await Api.post({ data: res, url: Urls.aop + "?filter=true" })
    if (resp.status == 200) {
      dispatch(SET_TABLE(resp?.data?.data))
    }
    // dispatch(tableAction.getTable(Urls.aop+"?filter=true", SET_TABLE))
    // dispatch(FormssActions.postProfiltLossOnSearch(res, () => {}));
  };
  useEffect(() => {
    dispatch(gpTrackingActions.getGPCustomer());
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
    // let cols = [];
    // cols = cols.flat(Infinity);
    // setNewColumns(cols);
    const columns = [
      {
        name: "Revenue",
        value: "revenue",
        style: "px-2 text-center",
      },
      {
        name: "COGS",
        value: "cogs",
        style: "px-2 text-center",
      },
      {
        name: "GP",
        value: "gp",
        style: "px-2 text-center",
      },
      {
        name: "GM (%)",
        value: "gm",
        style: "px-2 text-center",
      },
    ]

  }, [extraColumns]);







  const onTableViewSubmit = (data) => {
    data["fileType"] = "AOP"
    dispatch(CommonActions.fileSubmit(Urls.common_file_uploadr, data, () => {
      setFileOpen(false)
      // dispatch(FormssActions.getProfiltLoss())
      dispatch(tableAction.getTable(Urls.aop, SET_TABLE))
    }))
  }

  return (
    <>
      <Tabs data={tabs} setEnable={setEnable} enable={enable} />

      <AdvancedTable
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
                  dispatch(tableAction.getTable(Urls.aop + `?dollorView=${!dollarAmount.visibility}`, SET_TABLE))
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
                  setmodalBody(<AOPTrackerForm isOpen={modalOpen} setIsOpen={setmodalOpen} resetting={true} formValue={{}} />)
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
                setFileOpen(prev => !prev)
              }}>
              </Button>
              <Button name={"Export"} classes='w-auto mr-1' onClick={(e) => {
                dispatch(CommonActions.commondownloadpost("/export/AOP", "AOP.xlsx", "POST", { 'year': year, 'Month': extraColumns, 'Cost Center': Data.current }))
              }}>
              </Button>
            </div>
          </>
        }
        table={table}
        filterAfter={onSubmit}
        tableName={"PLform"}
        TableHeight="h-[45vh]"
        handleSubmit={handleSubmit}
        data={rows}
        errors={errors}
        register={register}
        setValue={setValue}
        getValues={getValues}
        totalCount={dbConfigTotalCount}
        heading={'Total Count :-'}
      />
      <Modal
        size={"sm"}
        modalHead={modalHead}
        children={modalBody}
        isOpen={modalOpen}
        setIsOpen={setmodalOpen}
      />
      <FileUploader isOpen={fileOpen} fileUploadUrl={""} onTableViewSubmit={onTableViewSubmit} setIsOpen={setFileOpen} tempbtn={true} tempbtnlink={["/template/AOP.xlsx", "AOP.xlsx"]} />
    </>
  );
};

export default ForcastCOPGSTracking;


