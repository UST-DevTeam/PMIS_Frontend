import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as Unicons from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import EditButton from "../../../components/EditButton";
import AdvancedTable from "../../../components/AdvancedTable";
import Modal from "../../../components/Modal";
import Button from "../../../components/Button";
import DeleteButton from "../../../components/DeleteButton";
import CstmButton from "../../../components/CstmButton";
// import { getAccessType, objectToQueryString } from "../../../../../utils/commonFunnction";
import { getAccessType,objectToQueryString } from "../../../utils/commonFunnction";

import { ALERTS } from "../../../store/reducers/component-reducer";
import CommonActions from "../../../store/actions/common-actions";
import { Urls } from "../../../utils/url";
// import FinanceActions from "../../../../store/actions/finance-actions";
import FormssActions from "../../../store/actions/formss-actions";
import moment from "moment/moment";
import CommonForm from "../../../components/CommonForm";
import PLform from "../Formss/P&L/PLform";
import { UilSearch } from "@iconscout/react-unicons";
import FileUploader from "../../../components/FIleUploader";
import CurrentuserActions from "../../../store/actions/currentuser-action";
import gpTrackingActions from "../../../store/actions/gpTrackingActions";
import SalaryDBForm from "./salaryDBForm";

const SalaryDB = () => {

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
  const Data = useRef("")

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

  if (showType === "visible"){
    shouldIncludeEditColumn = true
  }

  let dbConfigList = useSelector((state) => {
    let interdata = state?.gpTrackingReducer?.getSalaryDB || [];
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
                      <SalaryDBForm
                        isOpen={modalOpen}
                        setIsOpen={setmodalOpen}
                        resetting={false}
                        formValue={itm}
                        year = {year}
                        monthss = {[itm?.month]}
                        filtervalue = {""}
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
                              `${Urls.gpTracking_salaryDB}/${itm.uniqueId}`,
                              () => {
                                // dispatch(FormssActions.getProfiltLoss());
                                dispatch(gpTrackingActions.getGPSalaryDB())
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
    let interdata = state?.gpTrackingReducer?.getSalaryDB || [];
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
    for (let ywq = 2023; ywq <= +endDate; ywq++) {
      listYear.push(ywq);
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
  let table = {
    columns: [
      {
        name: "Year",
        value: "year",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Month",
        value: "month",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Customer",
        value: "customer",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Cost Center",
        value: "costCenter",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Zone",
        value: "zone",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Salary Cost",
        value: "cost",
        style: "min-w-[200px] max-w-[200px] text-center",
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
    filter: [
    //   {
    //   label: "Year",
    //   name: "year",
    //   value: "Select",
    //   bg : 'bg-[#3e454d] text-gray-300 border-[1.5px] border-solid border-[#64676d]',
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
    //   bg : 'bg-[#3e454d] text-gray-300 border-[1.5px] border-solid border-[#64676d]',
    //   option: listDict[ValGm].map((dasd) => {
    //     return {
    //       value: dasd?.id,
    //       label: dasd?.name,
    //     };
    //   }),
    //   props: {
    //     selectType:selectType,
    //   },
    //   hasSelectAll:true,
    //   required: true,
    //   classes: "col-span-1 h-10",
    // },
    // {
    //   label: 'Project Group',
    //   name: "projectGroup",
    //   value: "select",
    //   type: "newmuitiSelect2",
    //   bg : 'bg-[#3e454d] text-gray-300 border-[1.5px] border-solid border-[#64676d]',
    //   option: costCenterList,
    //   props: {
    //     selectType:selectType,
    //   },
    //   hasSelectAll:true,
    //   classes: "col-span-1 h-10",
    // }
  ],
  };

  

  const onSubmit = (data) => {
    let value = data.reseter;
    delete data.reseter;
    let strVal = objectToQueryString(data);
    dispatch(gpTrackingActions.getGPSalaryDB(true, strVal));
  };
  useEffect(() => {
    // dispatch(FormssActions.getProfiltLoss())
    dispatch(gpTrackingActions.getGPSalaryDB())
    // dispatch(CurrentuserActions.getcurrentuserCostCenter(true,"",0))
    // dispatch(gpTrackingActions.getGPProjectGroup())
    dispatch(gpTrackingActions.getGPCustomer())

  }, []);


  let formD = [
    {
      label: "Year",
      name: "year",
      value: "Select",
      bg : 'bg-[#3e454d] text-gray-300 border-[1.5px] border-solid border-[#64676d]',
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
      required: true,
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
        selectType:selectType,
      },
      hasSelectAll:true,
      required: true,
      classes: "col-span-1 h-10",
    },
    {
      label: 'Cost Center',
      name: "costCenter",
      value: "select",
      type: "newmuitiSelect2",
      option: costCenterList,
      props: {
        selectType:selectType,
      },
      hasSelectAll:true,
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

  const handleAddActivity = (res) => {
    Data.current = ""
    setExtraColumns(res['Month'])
    Data.current  = res['Cost Center']
    // dispatch(FormssActions.postProfiltLossOnSearch(res, () => {}));
    console.log(res,'lieoijejiejijied')
    dispatch(gpTrackingActions.getGPSalaryDB(true,res))
  };
  

  const onTableViewSubmit = (data) => { 
    data["fileType"]="ManageSalaryDB"
    dispatch(CommonActions.fileSubmit(Urls.common_file_uploadr, data, () => {
        setFileOpen(false)
        dispatch(gpTrackingActions.getGPSalaryDB())
    }))
  }

  return (
    <>
    
      {/* <div className="flex items-center justify-start">
        <div className="col-span-1 md:col-span-1">
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
        </div>
      </div> */}

      <AdvancedTable 
        headerButton={
          <>
          <div className="flex">
            <Button
              onClick={(e) => {
                setmodalOpen((prev) => !prev);
                setmodalHead("New Plan");
                setmodalBody(<SalaryDBForm isOpen={modalOpen} setIsOpen={setmodalOpen} resetting={true} formValue={{}} />)
              }}
              name={"Add New"}
              classes='w-auto mr-1'>
            </Button>
            <Button name={"Upload File"} classes='w-auto mr-1' onClick={(e) => {
                    setFileOpen(prev=>!prev)
                }}>
            </Button>
            <Button name={"Export"} classes='w-auto mr-1' onClick = {(e) => {
              dispatch(CommonActions.commondownloadpost("/export/salaryDB","Export_salaryDB.xlsx","POST",{'year':year,'Month':extraColumns,'Cost Center':Data.current}))
              }}>
            </Button>
          </div>
          </>
        }
        table={table}
        filterAfter={onSubmit}
        tableName={"Salary DB Form"}
        TableHeight = "h-[68vh]" 
        handleSubmit={handleSubmit}
        data={dbConfigList}
        errors={errors}
        register={register}
        setValue={setValue}
        getValues={getValues}
        totalCount={dbConfigTotalCount}
        heading = {'Total Count :-'}
      />
      <Modal
        size={"sm"}
        modalHead={modalHead}
        children={modalBody}
        isOpen={modalOpen}
        setIsOpen={setmodalOpen}
      />
      <FileUploader isOpen={fileOpen} fileUploadUrl={""} onTableViewSubmit={onTableViewSubmit} setIsOpen={setFileOpen} tempbtn={true} tempbtnlink = {["/template/SalaryDB.xlsx","Salary_DB.xlsx"]} />
    </>
  );
};

export default SalaryDB;
