import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Unicons from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import EditButton from "../../../../components/EditButton";
import AdvancedTable from "../../../../components/AdvancedTable";
import Modal from "../../../../components/Modal";
import Button from "../../../../components/Button";
import DeleteButton from "../../../../components/DeleteButton";
import CstmButton from "../../../../components/CstmButton";
import ToggleButton from "../../../../components/ToggleButton";
import { getAccessType, objectToQueryString } from "../../../../utils/commonFunnction";
import { ALERTS } from "../../../../store/reducers/component-reducer";
import CommonActions from "../../../../store/actions/common-actions";
import { Urls } from "../../../../utils/url";
import EarnValueMgmtForm from "../../../../pages/PMIS/Formss/EarnValueMgmtFinancial/EarnValueMgmtForm";
import FinanceActions from "../../../../store/actions/finance-actions";
import FormssActions from "../../../../store/actions/formss-actions";
import AdminActions from "../../../../store/actions/admin-actions";
import Multiselection from "../../../../components/FormElements/Multiselection";
import SelectDropDown from "../../../../components/FormElements/SelectDropDown";
import { data } from "autoprefixer";
import moment from "moment/moment";
import CommonForm from "../../../../components/CommonForm";

import { UilSearch } from "@iconscout/react-unicons";
import ActualWorkdoneForm from "./ActualWorkdoneForm";
import FileUploader from "../../../../components/FIleUploader";
import FilterActions from "../../../../store/actions/filter-actions";

const ActualWorkdone = () => {
  
  const currentMonth = new Date().getMonth() + 1;
  const currrentYear = new Date().getFullYear();
  const [refresh, setRefresh] = useState(false);
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
  const [projectType, setprojectType] = useState("")
  const [projectId, setprojectId] = useState("")



  let dispatch = useDispatch();



  let showType = getAccessType("Actions(EVM-Delivery)")

  let shouldIncludeEditColumn = false

  if (showType === "visible"){
    shouldIncludeEditColumn = true
  } 



  let dbConfigList = useSelector((state) => {
    let interdata = state?.formssData?.getEVMDelivery || [];
    return interdata?.map((itm) => {
      let updateditm = {
        ...itm,
        "uniqueId":"1",

        edit: (
          <CstmButton
            className={"p-2"}
            child={
              <EditButton
                name={""}
                onClick={() => {
                  setmodalOpen(true);
                  setmodalHead("Edit Actual");
                  setmodalBody(
                    <>
                      <ActualWorkdoneForm
                        isOpen={modalOpen}
                        setIsOpen={setmodalOpen}
                        resetting={false}
                        formValue={itm}
                        year={year}
                        monthss={extraColumns}
                        weeks={extraColumns}
                        view = {ValGm}
                      />
                    </>
                  );

                  //setmodalOpen(false)
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
                              `${Urls.formss_EVM_delivery}/${itm.uniqueId}`,
                              () => {
                                dispatch(FormssActions.getEVMDelivery());
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
    let interdata = state?.formssData?.getEVMDelivery || [];
    if (interdata.length > 0) {
      return interdata[0]["overall_table_count"];
    } else {
      return 0;
    }
  });

  let projectIdList = useSelector((state) => {
    return state?.filterData?.getformevmdeliveryprojectid.map((itm) => {
      return {
        label: itm.projectId,
        value: itm.uniqueId,
      };
    });
  });

  let projectTypeList = useSelector((state) => {
    return state?.filterData?.getformevmdeliveryprojecttype.map((itm) => {
      return {
        label: itm.projectType,
        value: itm.uniqueId,
      };
    });
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

  let table = {
    columns: [
      {
        name: "Project Type",
        value: "projectType",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Project ID",
        value: "projectId",
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
          ]
        : [])
    ],
    properties: {
      rpp: [10, 20, 50, 100],
    },
    filter: [],
  };

  let listYear = [];

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
    let weekString;
    if (wwq < 10) {
      weekString = "WK#0" + wwq;
    } else {
      weekString = "WK#" + wwq;
    }
    listW.push({ id: weekString, name: weekString });
  }

  for (let ywq = 2021; ywq <= +endDate; ywq++) {
    listYear.push(ywq);
  }

  let listDict = {
    "": [],
    Weekly: listW,
    Monthly: [
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
      { id: 12, name: "Dec" },
    ],
  };

  const onSubmit = (data) => {
    let value = data.reseter;
    delete data.reseter;
    dispatch(
      FormssActions.postEVMDelivery(
        {
          viewBy: extraColumns.join(","),
          year: `${currrentYear}`,
          yyear: `${currrentYear}`,
          selectional: ValGm,
          typeSelectional: ValGm,
        },
        () => {}, objectToQueryString(data)
      )
    );
  };

  useEffect(() => {
    dispatch(FilterActions.getformEvmDeliveryProjectType(true,"",0))
    dispatch(FilterActions.getformEvmDeliveryProjectId(true,"",0))
    dispatch(
      FormssActions.postEVMDelivery(
        {
          viewBy: extraColumns.join(","),
          year: `${currrentYear}`,
          yyear: `${currrentYear}`,
          selectional: "Monthly",
          typeSelectional: "Monthly",
        },
        () => {}
      )
    );
  }, []);

  let formD = [
    {
      label: "Project Type",
      name: "projectType",
      value: "Select",
      bg : 'bg-[#3e454d] text-gray-300 border-[1.5px] border-solid border-[#64676d]',
      type: "select",
      option: projectTypeList,
      props: {
        onChange: (e) => {
          setValue("projectType", e.target.value);
          setprojectType(e.target.value);
        },
      },
      required: false,
      classes: "col-span-1 h-38px",
    },
    {
      label: "Project Id",
      name: "projectId",
      value: "Select",
      bg : 'bg-[#3e454d] text-gray-300 border-[1.5px] border-solid border-[#64676d]',
      type: "select",
      option: projectIdList,
      props: {
        onChange: (e) => {
          setValue("projectId", e.target.value);
          setprojectId(e.target.value);
        },
      },
      required: false,
      classes: "col-span-1 h-38px",
    },
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
          setValue("yyear", e.target.value);
          setyear(e.target.value);
        },
      },
      required: true,
      classes: "col-span-1 h-38px",
    },

    {
      label: "View As",
      name: "typeSelectional",
      value: "Select",
      bg : 'bg-[#3e454d] text-gray-300 border-[1.5px] border-solid border-[#64676d]',
      type: "select",
      option: [
        {
          label: "Monthly View",
          value: "Monthly",
        },
        {
          label: "Weekly View",
          value: "Weekly",
        },
      ],
      props: {
        onChange: (e) => {
          setValue("selectional", e.target.value);
          setValGm(e.target.value);
          setSelectType(e.target.value);
        },
      },
      required: true,
      classes: "col-span-1",
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
      required: true,
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
    
    extraColumns.forEach((index , i) => {
      if (ValGm && ValGm === "Monthly") {
        cols.push([
          {
            name: `Plan-${monthMap[index]}'${year}`,
            value: "M-" + (index),
            style: "min-w-[200px] max-w-[200px] text-center",
          },
          {
            name: `Actual-${monthMap[index]}'${year}`,
            value: "count-" + (index),
            style: "min-w-[200px] max-w-[200px] text-center",
          },
        ]);
      }
      else {
        cols.push([

          {
            name: `Plan-${index}`,
            value:index,
            style: "min-w-[200px] max-w-[200px] text-center",
          },
          {
            name: `Actual-${index}`,
            value:"count-" + index,
            style: "min-w-[200px] max-w-[200px] text-center",
          },
        ]);
      }
    });
    cols = cols.flat(Infinity);
    setNewColumns(cols);
  }, [extraColumns]);



  const handleAddActivity = (res) => {
    try {
      if (res?.typeSelectional === "Monthly") {
        res['viewBy'] = res['Monthly']
        setExtraColumns(
          res?.viewBy
            ?.split(",")
            ?.map((key) => +key)
            ?.sort((a, b) => a - b)
        );
      } else {
        res['viewBy'] = res['Weekly']
        setExtraColumns(
          res?.viewBy?.split(",")?.sort((a, b) => {
            const numA = parseInt(a.split("-")[1]);
            const numB = parseInt(b.split("-")[1]);

            return numA - numB;
          })
        );
      }

      dispatch(FormssActions.postEVMDelivery(res, () => {}));
    } catch (error) {
      console.error("[ERROR] :: " + error.message);
    }
  };

  const onTableViewSubmit = (data) => { 
    data["fileType"]="EVMDelivery"
    dispatch(CommonActions.fileSubmit(Urls.common_file_uploadr, data, () => {
        setFileOpen(false)
    }))
  }



  return (
    <>
      <div className="flex items-center justify-start">
        <div className="col-span-1 md:col-span-1">
          <CommonForm
            classes="grid grid-cols-5 w-[1000px] overflow-y-hidden p-2"
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

      <AdvancedTable
        headerButton={
          <>
          <Button name={"Upload File"} classes='w-auto mr-1' onClick={(e) => {
                    setFileOpen(prev=>!prev)
                }}>
          </Button>
          </>
        }
        table={table}
        exportButton={["/export/EvmDelivery", "Export_EvmDelivery.xlsx","POST",{viewBy: extraColumns.join(","),
          year:year,
          yyear:year,
          selectional: ValGm,
          typeSelectional:ValGm,
          projectType:projectType,
          projectId:projectId,}]}
          filterAfter={onSubmit}
          tableName={"AcctualWorkdoneform"}
          TableHeight = "h-[52vh]" 
          handleSubmit={handleSubmit}
          data={dbConfigList}
          errors={errors}
          register={register}
          setValue={setValue}
          getValues={getValues}
          totalCount={dbConfigTotalCount}
          getaccessExport = {"Export(EVM-Delivery)"}
          heading = "Total Count :- "
      />

      <Modal
        size={"sm"}
        modalHead={modalHead}
        children={modalBody}
        isOpen={modalOpen}
        setIsOpen={setmodalOpen}
      />

      <FileUploader isOpen={fileOpen} fileUploadUrl={""} onTableViewSubmit={onTableViewSubmit} setIsOpen={setFileOpen} tempbtn={true} tempbtnlink = {["/template/EVMDelivery.xlsx","EVMDelivery.xlsx"]} />
    </>
  );
};

export default ActualWorkdone;
