import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import EditButton from "../../../../components/EditButton";
import AdvancedTable from "../../../../components/AdvancedTable";
import Modal from "../../../../components/Modal"; 
import Button from "../../../../components/Button";
import DeleteButton from "../../../../components/DeleteButton";
import CstmButton from "../../../../components/CstmButton";
import { getAccessType } from "../../../../utils/commonFunnction";
import { ALERTS } from "../../../../store/reducers/component-reducer";
import FormssActions from "../../../../store/actions/formss-actions";
import moment from "moment/moment";
import CommonForm from "../../../../components/CommonForm";
import { UilSearch } from "@iconscout/react-unicons";
import AccrualRevenueTrendForm from "./AccrualRevenueTrendForm";

const AccrualRevenueTrend = () => {

  const currentMonth = new Date().getMonth() + 1;
  const currrentYear = new Date().getFullYear();

  const [refresh, setRefresh] = useState(false);
  const [modalOpen, setmodalOpen] = useState(false);
  const [change, setChange] = useState(false);
  const [modalBody, setmodalBody] = useState(<></>);
  const [modalHead, setmodalHead] = useState(<></>);
  const [ValGm, setValGm] = useState("Month");
  const endDate = moment().format("Y");
  const [year, setyear] = useState(currrentYear);
  const exportData = useRef([])
 

  let extraColumns;

  if (currentMonth === 1) {
    extraColumns = [
      {'month':11,"year":currrentYear-1},
      {'month':12,"year":currrentYear-1},
      {'month':1,"year":currrentYear}
    ];
  } else if (currentMonth === 2) {
    extraColumns = [
      {'month':12,"year":currrentYear-1},
      {'month':1,"year":currrentYear},
      {'month':2,"year":currrentYear}
    ];
  } else {
    extraColumns = [
      {'month':currentMonth-2,"year":currrentYear},
      {'month':currentMonth-1,"year":currrentYear},
      {'month':currentMonth,"year":currrentYear}
    ];
  }
  const [extraColumnsState, setExtraColumns] = useState(extraColumns);
  const [newColumns, setNewColumns] = useState([]);
  const [selectType, setSelectType] = useState("");

  let dispatch = useDispatch();





  let dbConfigList = useSelector((state) => {
    let interdata = state?.formssData?.getAccrualRevenueTrend || [];
    return interdata?.map((itm) => {
      let updateditm = {
        ...itm,
        'edit': (
          <CstmButton
            
            className={"p-2"}
            child={
              <EditButton
                key={`edit-button-${itm.uniqueId}`}
                name={""}
                onClick={() => {
                  setmodalOpen(true);
                  setmodalHead("Edit Amount");
                  setmodalBody(
                    <>
                      <AccrualRevenueTrendForm
                        isOpen={modalOpen}
                        setIsOpen={setmodalOpen}
                        resetting={false}
                        formValue={itm}
                        year = {year}
                        monthss = {extraColumnsState}
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
                        // onClick={() => {
                        //   dispatch(
                        //     CommonActions.deleteApiCaller(
                        //       `${Urls.formss_earnValue_mgmt_financial}/${itm.uniqueId}`,
                        //       () => {
                        //         dispatch(
                        //           FormssActions.getEarnValueMgmtFinancial()
                        //         );
                        //         dispatch(ALERTS({ show: false }));
                        //       }
                        //     )
                        //   );
                        // }}
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
    let interdata = state?.formssData?.getAccrualRevenueTrend || [];
    if (interdata.length > 0) {
      return interdata[0]["overall_table_count"];
    } else {
      return 0;
    }
  });

  let showType = getAccessType("Actions(Accrual Revenue Trend)")

  let shouldIncludeEditColumn = false

  if (showType === "visible"){
    shouldIncludeEditColumn = true
  } 

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setValues,
    getValues,
    formState: { errors },
  } = useForm();

  let table = {
    columns: [
      {
        name: "Customer",
        value: "customer",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Cost center",
        value: "costCenter",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "UST Project ID",
        value: "ustProjectid",
        style: "min-w-[140px] max-w-[200px] text-center",
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
  for (let ywq = 2021; ywq <= +endDate; ywq++) {
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

  const onSubmit = (data) => {
    let value = data.reseter;
    delete data.reseter;
  };

  useEffect(() => {
    exportData.current = []
    extraColumnsState.forEach((itm) => {
      exportData.current =  [...exportData.current, 'M-'+itm.month+"Y-"+itm.year]
    });
    dispatch(
      FormssActions.postAccrualRevenueTrend(
        {
          Monthly: exportData.current.join(",")
        },
        () => {}
      )
    );
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
          setValue("yyear", e.target.value);
          setyear(e.target.value);
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
        selectType:selectType
      },
      hasSelectAll:true,
      required: true,
      classes: "col-span-1 ",
    },
  ];

  useEffect(() => {

    const monthMap = {1:"Jan", 2: "Feb", 3: "Mar", 4: "Apr", 5: "May", 6: "Jun", 7: "Jul", 8: "Aug", 9: "Sep", 10: "Oct", 11: "Nov", 12: "Dec"};
    let cols = [];
    extraColumnsState.forEach((itm) => {
      let monthName = monthMap[itm.month];
      let year = itm.year;
      cols.push([
        {
          name: `${monthName} ${year}`,
          value: "M-"+itm.month+'Y-'+year,
          style: "min-w-[200px] max-w-[200px] text-center",
        },
      ]);
  
    });
    cols = cols.flat(Infinity);

    setNewColumns(cols);

  }, [extraColumnsState,  modalOpen]);

  const handleAddActivity = (res) => {
    try {
      let months = res?.Month?.split(",")?.map((key) => +key)?.sort((a, b) => a - b);
      let extraCol = months.map((month) => ({
        month: month,
        year: res.year
      }));
      setExtraColumns(extraCol);
      exportData.current = []

      months.forEach((itm) => {
        exportData.current =  [...exportData.current,  'M-'+itm+"Y-"+res.year]
      }

      )
      dispatch(FormssActions.postAccrualRevenueTrend(
        {
          Monthly: exportData.current.join(",")
        }, () => {}));
    } catch (error) {
      console.error("[ERROR] :: " + error.message);
    }
  };

  return (
    <>
    <div className="flex items-center justify-start ">
      <div className="col-span-1 md:col-span-1">
        <CommonForm
          classes="grid grid-cols-2 w-[400px] overflow-y-hidden"
          Form={formD}
          errors={errors}
          register={register}
          setValue={setValue}
          getValues={getValues}
        />
      </div>
      <div className="flex w-fit mt-4 -ml-3 items-center justify-center ">
        <Button
          classes=" flex h-fit "
          name=""
          icon={<UilSearch className="w-5 m-2 h-5" />}
          onClick={handleSubmit(handleAddActivity)}
        />
      </div>
    </div>


      <AdvancedTable 
        table={table}
        exportButton={["/export/accrualRevenueTrend", "Export_Accrual_Revenue_Trend_Form.xlsx","POST",{ Monthly  :exportData.current}]}
        filterAfter={onSubmit}
        tableName={"AccrualRevenueTrend"}
        TableHeight = "h-[51vh]" 
        handleSubmit={handleSubmit}
        data={dbConfigList}
        errors={errors}
        register={register}
        setValue={setValue}
        getValues={getValues}
        totalCount={dbConfigTotalCount}
        getaccessExport = {"Export(Accrual Revenue Trend)"}
        heading = {"Total Count :- "}
      />
      <Modal
        size={"sm"}
        modalHead={modalHead}
        children={modalBody}
        isOpen={modalOpen}
        setIsOpen={setmodalOpen}
      />
    </>
  );
};

export default AccrualRevenueTrend;

