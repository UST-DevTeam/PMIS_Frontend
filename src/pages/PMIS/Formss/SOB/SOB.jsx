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
import FormssActions from "../../../../store/actions/formss-actions";
import moment from "moment/moment";
import CommonForm from "../../../../components/CommonForm";


import { UilSearch } from "@iconscout/react-unicons"; 
import SOBForms from "./SOBForms";

const SOB = () => {

  const [currentMonth , setCurrentMonth ] = useState(new Date().getMonth() + 1);
  const [currrentYear , setCurrentYear] = useState(new Date().getFullYear())
  const [modalOpen, setmodalOpen] = useState(false);
  const [modalBody, setmodalBody] = useState(<></>);
  const [modalHead, setmodalHead] = useState(<></>);
  const [extraColumns, setExtraColumnss] = useState("");

  const [ValGm, setValGm] = useState("Month");
  const endDate = moment().format("Y");
  const [year, setyear] = useState(currrentYear);
  const exportData = useRef([])
  const [showEditButton, setShowEditButton] = useState(false);
  const [extraColumnsState, setExtraColumns] = useState([extraColumns]);
  const [newColumns, setNewColumns] = useState([]);
  const [selectType, setSelectType] = useState("");
  const [circle, setCircle] = useState("");
  const [selectedCircle, setSelectedCircle] = useState(""); 


  let dispatch = useDispatch();  

  let dbConfigList = useSelector((state) => {
    let interdata = state?.formssData?.getSobdata || [];
    console.log(interdata , 'asdfsdfsafdasdf' )
    return interdata?.map((itm) => {
      
      let updateditm = {
        ...itm,
        edit: showEditButton ? ( 
            <CstmButton
              className={"p-2"}
              child={
                <EditButton
                  name={""}
                  onClick={() => {
                    setmodalOpen(true);
                    setmodalHead("Edit SOB");
                    setmodalBody(
                      <> 
                        <SOBForms
                          isOpen={modalOpen}
                          setIsOpen={setmodalOpen}
                          SOBHeaders={SOBHeaders}
                          SoBCircleList={SoBCircleList}
                          resetting={false}
                          formValue={{...itm , circle: `${selectedCircle}`, }}
                          year={year}
                          monthss={[currentMonth]}
                          />
                      </>
                    );
                  }}
                ></EditButton>
              }
            />
          ) : null,

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
      console.log(updateditm , 'asdfsdfsafdasdf')
      return updateditm;
    });
  });



  let dbConfigTotalCount = useSelector((state) => {
    let interdata = state?.formssData?.getSobdata || [];
    if (interdata.length > 0) {
      return interdata[0]["overall_table_count"];
    } else {
      return 0;
    }
  });

  let SOBHeaders = useSelector((state) => {
    let interdata = state?.formssData?.getSobdataDynamic?.[0]?.projectType || [""]
    return interdata
})

let SoBCircleList = useSelector((state) => {
    return state?.formssData?.getSobdataDynamic?.[0]?.circle?.map((itm) => {
      return {
        label: itm?._id,
        value: itm?.circleuid,
      };
    });
  });


let hh = SOBHeaders?.map((item) => { 
    return {
        name: item._id,
        value: item._id,
        style:'min-w-[100px] max-w-[200px] text-center'
    };
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
        name: "Partner",
        value: "competitor",
        style: "min-w-[140px] max-w-[200px] text-center p-2",
      },
      
    //   ...newColumns,

     
      // {
      //   name: "Edit",
      //   value: "edit",
      //   style: "min-w-[100px] max-w-[200px] text-center",
      // },
    ],
    
    properties: {
      rpp: [10, 20, 50, 100],
    },
    filter: [
    //   {
    //     label: "Cirlce",
    //     type: "autoSuggestion",
    //     name: "cirlce",
    //     option: circleList,
    //     props: {},
    //   },
      
    ],
  };

  const pp=[
        ...(shouldIncludeEditColumn
            ? [
                {
                  name: "Edit",
                  value: "edit",
                  style: "min-w-[100px] max-w-[200px] text-center",
                },
              ]
            : [])
    ]

if (table?.columns) {
    table.columns.push(...hh);
}
if (table?.columns) {
    table.columns.push(...pp);
}

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

// useEffect(() => {
//     const exportData = extraColumnsState?.map(itm => itm.month + "-" + itm.year).join(",");
//     dispatch(
//       FormssActions.postFormsSob(
//         {
//           Monthly: exportData
//         },
//         () => {}
//       )
//     );
//   }, [extraColumnsState, dispatch]);
useEffect(() => {
    if (selectedCircle) {
        dispatch(
          FormssActions.postFormsSob(
            {
              viewBy: `${currentMonth}`,
              year: `${currrentYear}`,
              yyear: `${currrentYear}`,
              selectional: "Monthly",
              typeSelectional: "Monthly",
              circle: `${selectedCircle}`,
            },
            () => {}
          )
        );
      }

      else{
        dispatch(
            FormssActions.postFormsSob(
              {
                viewBy: `${currentMonth}`,
                year: `${currrentYear}`,
                yyear: `${currrentYear}`,
                selectional: "Monthly",
                typeSelectional: "Monthly",
                circle: `${selectedCircle}`,
              },
              () => {}
            )
          );
      }
  }, [currentMonth,selectedCircle]);
  

  let formD = [
    {
        label: "Circle",
        name: "circle",
        value: "Select",
        bg : 'bg-[#3e454d] text-gray-300 border-[1.5px] border-solid border-[#64676d]',
        type: "select",
        option: SoBCircleList,
        props: {
        onChange: (e) => {
          setCircle(e.target.value);
        },
      },
        required: true,
        classes: "col-span-1",
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
      classes: "col-span-1",
    },
    {
      label: ValGm,
      name: "viewBy",
      value: "Select",
      type: "select",
      bg : 'bg-[#3e454d] text-gray-300 border-[1.5px] border-solid border-[#64676d]',
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
    dispatch(FormssActions.getSobdataDynamic())
}, [])

console.log(table , dbConfigList , 'asdfasdfasdf')

useEffect(() => {

    const monthMap = {1:"Jan", 2: "Feb", 3: "Mar", 4: "Apr", 5: "May", 6: "Jun", 7: "Jul", 8: "Aug", 9: "Sep", 10: "Oct", 11: "Nov", 12: "Dec"};
    let cols = [];
    extraColumnsState?.forEach((itm) => {
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

//   const handleAddActivity = (res) => {
//     try {
//       let months = res?.Month?.split(",")?.map((key) => +key)?.sort((a, b) => a - b);
//       let extraCol = months.map((month) => ({
//         month: month,
//         year: res.year
//       }));
//       setExtraColumns(extraCol);
//       exportData.current = []

//       months.forEach((itm) => {
//       exportData.current =  [...exportData.current,  'M-'+itm+"Y-"+res.year]
//       }

//       )
//       dispatch(FormssActions.postFormsSob(
//         {
//           Monthly: exportData.current.join(",")
//         }, () => {}));
//         setShowEditButton(true)
//     } catch (error) {
//       console.error("[ERROR] :: " + error.message);
//     }
//   };

const handleAddActivity = (res) => {
    try {
      setCurrentYear(res?.year)
      setCurrentMonth(res?.viewBy)
      setSelectedCircle(res?.circle);
      setShowEditButton(true)
      resetForm();
    } 
    catch (error) {
      console.error("[ERROR] :: " + error.message);
    }
  };

  // const resetForm = () => {
  //   setValue("circle", ""); 
  //   setValue("year", "");
  //   setValue("viewBy", ""); 
  //   setCircle(""); 
  // };

  return (
    <>
    <div className="flex items-center justify-start gap-5">
    <div className="col-span-1 md:col-span-1">
      <CommonForm
        classes="grid grid-cols-4 w-[550px] sm:grid-cols-6 xl:grid-cols-3 xl:w-[550px] sm:w-full overflow-y-hidden p-2"
        Form={formD}
        errors={errors}
        register={register}
        setValue={setValue}
        getValues={getValues}
      /> 
    </div>
    <div className="flex w-fit mt-4 -ml-3 items-center justify-center">
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
        // exportButton={["/export/sobForms", "Export_Sob_Form.xlsx","POST",{ Monthly  :exportData.current}]}
        exportButton={["/export/sobForms", "Export_Sob_Form.xlsx", "POST", {
          viewBy: currentMonth,
          year: year,
          yyear: year,
          selectional: "Monthly",
          typeSelectional: "Monthly",
          circle: selectedCircle
        }]}

        filterAfter={onSubmit}
        tableName={"SobTable"}
        TableHeight="68vh"
        handleSubmit={handleSubmit}
        data={dbConfigList}
        errors={errors}
        register={register}
        setValue={setValue}
        getValues={getValues}
        totalCount={dbConfigTotalCount}
        getaccessExport = {"Export(Accrual Revenue Trend)"}
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

export default SOB;


