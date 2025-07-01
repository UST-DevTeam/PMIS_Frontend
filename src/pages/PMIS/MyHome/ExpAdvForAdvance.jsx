import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Unicons from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import EditButton from "../../../components/EditButton";
import EmpDetails from "./EmpDetails";
import moment from "moment";
import AdvancedTable from "../../../components/AdvancedTable";
import Modal from "../../../components/Modal";
import Button from "../../../components/Button";
import DeleteButton from "../../../components/DeleteButton";
import CstmButton from "../../../components/CstmButton";
import ToggleButton from "../../../components/ToggleButton";
import { getAccessType, objectToQueryString } from "../../../utils/commonFunnction";
import { ALERTS } from "../../../store/reducers/component-reducer";
import CommonActions from "../../../store/actions/common-actions";
import HrActions from "../../../store/actions/hr-actions";
import { useNavigate, useParams } from "react-router-dom";
import FileUploader from "../../../components/FIleUploader";
import ExpenseAdvanceActions from "../../../store/actions/expenseAdvance-actions";
import { Urls } from "../../../utils/url";
import ConditionalButton from "../../../components/ConditionalButton";
import AdminActions from "../../../store/actions/admin-actions";

const ExpAdvForAdvance = () => {
  const [modalOpen, setmodalOpen] = useState(false);
  const [modalBody, setmodalBody] = useState(<></>);
  const [type, settype] = useState(false);
  const [strValFil, setstrVal] = useState(false);
  const [fileOpen, setFileOpen] = useState(false);
  const [modalHead, setmodalHead] = useState(<></>);
  const endDate = moment().format("Y");

  let dispatch = useDispatch();
  let listYear = [];

  for (let ywq = 2021; ywq <= +endDate; ywq++) {
    listYear.push({'label':ywq,'value':ywq});
  }

  let monthList = [
    {'label':'Jan', 'value':'Jan'},
    {'label':'Feb', 'value':'Feb'},
    {'label':'Mar', 'value':'Mar'},
    {'label':'Apr', 'value':'Apr'},
    {'label':'May', 'value':'May'},
    {'label':'Jun', 'value':'Jun'},
    {'label':'Jul', 'value':'Jul'},
    {'label':'Aug', 'value':'Aug'},
    {'label':'Sep', 'value':'Sep'},
    {'label':'Oct', 'value':'Oct'},
    {'label':'Nov', 'value':'Nov'},
    {'label':'Dec', 'value':'Dec'},
  ]

  let navigate = useNavigate();

  const monthMap = { "01": "Jan", "02": "Feb", "03": "Mar", "04": "Apr", "05": "May", "06": "Jun", "07": "Jul", "08": "Aug", "09": "Sep", "10": "Oct", "11": "Nov", "12": "Dec" };
  
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setValues,
    getValues,
    formState: { errors },
  } = useForm();

  let dbConfigList = useSelector((state) => {
    let interdata = state?.expenseAdvanceData?.getHRAllAdvance || [];
    return interdata?.map((itm) => {
      let updateditm = {
        ...itm,
        

        Month: monthMap[itm.Month] || itm.Month,
      
        edit: (
          <CstmButton
            className={"p-2"}
            child={
              <EditButton
                name={""}
                onClick={() => {
                  // dispatch(HrActions.getManageEmpDetails())
                  setmodalHead("Edit Customer Details")
                  setmodalBody(
                    <>
                      <EmpDetails resetting={false} formValue={itm} />
                      {/* <div className='mx-3'><Button name={"Submit"} classes={""} onClick={(handleSubmit(onTableViewSubmit))} /></div> */}
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
                              `${Urls.expAdv_hr_all_advance}/${itm.uniqueId}`,
                              () => {
                                dispatch(ExpenseAdvanceActions.getHRAllAdvance());
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

        view: (
          <CstmButton
            className={"p-5"}
            child={
              <Button
                name={""}
                onClick={() => {
                  setmodalOpen(true);
                  setmodalHead("Show PDF");
                  setmodalBody(
                    <>
                      {/* <div className='mx-3'><Button name={"Submit"} classes={""} onClick={(handleSubmit(onTableViewSubmit))} /></div> */}
                    </>
                  );
                }}
              ></Button>
            }
          />
        ),
      };
      return updateditm;
    });
  });
  let dbConfigTotalCount = useSelector((state) => {
    console.log('statestatestate',state)
    let interdata = state?.expenseAdvanceData?.getHRAllAdvance;
    if (interdata.length > 0) {
      return interdata[0]["overall_table_count"];
    } else {
      return 0;
    }
  });
  let claimTypeList = useSelector((state) => {
    return state?.adminData?.getClaimTypeAdvances?.map((itm) => {
      return {
        label: itm?.claimType,
        value: itm?.claimTypeId,
      };
    });
  });


  

  // let Form = [
  //     { label: "DB Server", value: "", option: ["Please Select Your DB Server"], type: "select" },
  //     { label: "Custom Queries", value: "", type: "textarea" }
  // ]

  let showType = getAccessType("Action(Exp & Adv)")

  let shouldIncludeEditColumn = false

  if (showType === "visible"){
    shouldIncludeEditColumn = true
  }

  let table = {
    columns: [
        {
            name: "Advance Month",
            value: "Month",
            style: "min-w-[120px] max-w-[200px] text-center",
        },
        {
            name: "Employee Name",
            value: "Employee Name",
            style: "min-w-[170px] max-w-[200px] text-center sticky left-[0px] bg-[#3e454d]",
        },
        {
            name: "Employee Code",
            value: "Employee Code",
            style: "min-w-[150px] max-w-[450px] text-center sticky left-[169px] bg-[#3e454d]",
        },
        {
          name: "UST Employee Code",
          value: "UST Employee Code",
          style: "min-w-[150px] max-w-[450px] text-center sticky left-[169px] bg-[#3e454d]",
      },
        {
            name: "Contact No.",
            value: "Contact Number",
            style: "min-w-[150px] max-w-[200px] text-center",
        },
        {
            name: "Advance No.",
            value: "Advance number",
            style: "min-w-[120px] max-w-[450px] text-center",
        },
        {
            name: "Advance Date",
            value: "Advance Date",
            style: "min-w-[150px] max-w-[450px] text-center",
        },
        {
            name: "Advance Type",
            value: "Advance Type",
            style: "min-w-[250px] max-w-[450px] text-center",
        },
        {
            name: "Circle",
            value: "Circle",
            style: "min-w-[200px] max-w-[200px] text-center",
        },
        {
            name: "Project ID",
            value: "Project ID",
            style: "min-w-[150px] max-w-[450px] text-center",
        },
        {
            name: "Cost Center",
            value: "Cost Center",
            style: "min-w-[120px] max-w-[450px] text-center",
        },
        {
            name: "Amount",
            value: "Amount",
            style: "min-w-[100px] max-w-[200px] text-center",
        },
        {
            name: "Claim Date",
            value: "Submission Date",
            style: "min-w-[120px] max-w-[450px] text-center",
        },
        {
            name: "Approval Amount",
            value: "Approved Amount",
            style: "min-w-[150px] max-w-[450px] text-center",
        },
        {
            name: "Last Action Date",
            value: "Last Action Date",
            style: "min-w-[150px] max-w-[450px] text-center",
        },
        {
          name: "Current Status",
          value: "Status",
          style: "min-w-[100px] max-w-[200px] text-center",
      },
        {
            name: "L1 Status",
            value: "L1 Status",
            style: "min-w-[100px] max-w-[200px] text-center",
        },
        {
            name: "L2 Status",
            value: "L2 Status",
            style: "min-w-[100px] max-w-[200px] text-center",
        },
        {
            name: "Finance Approve Status",
            value: "L3 Status",
            style: "min-w-[150px] max-w-[450px] text-center",
        },
        {
            name: "L1 Approver",
            value: "L1 Approver",
            style: "min-w-[150px] max-w-[450px] text-center",
        },
        {
            name: "L2 Approver",
            value: "L2 Approver",
            style: "min-w-[150px] max-w-[450px] text-center",
        },
        {
            name: "Finance Approver",
            value: "L3 Approver",
            style: "min-w-[150px] max-w-[450px] text-center",
        },
        {
            name: "Remarks",
            value: "Remarks",
            style: "min-w-[200px] max-w-[450px] text-center",
        },
        ...(shouldIncludeEditColumn ? 
          [
            {
                name: "Actions",
                value: "delete",
                style: "min-w-[200px] max-w-[450px] text-center",
            }
          ]: []
        )
    ],

    properties: {
      rpp: [10, 20, 50, 100],
    },
    filter: [
      {
        label: "Status",
        type: "select",
        name: "status",
        option: [
          { label: "Submitted", value: "Submitted" },
          { label: "L1-Approved", value: "L1-Approved" },
          { label: "L1-Rejected", value: "L1-Rejected" },
          { label: "L2-Approved", value: "L2-Approved" },
          { label: "L2-Rejected", value: "L2-Rejected" },
          { label: "L3-Approved", value: "L3-Approved" },
          { label: "L3-Rejected", value: "L3-Rejected" },
        ],
        // props: {
        // }
      },
      
      {
        label: "Employee Code",
        type: "text",
        name: "empCode",
        props: {},
      },
      {
        label: "Advance Number",
        type: "text",
        name: "AdvanceNo",
        props: {},
      },
     
      {
        label: "Claim Type",
        value: "",
        // name: Object.entries(formValue).length > 0 ? "name" : "claimType",
        name: "claimType",
        // type: Object.entries(formValue).length > 0 ? "sdisabled" : "select",
        type:"select",
        option: claimTypeList,
        props: {
            onChange: (e) => {
              // dispatch(
              //   AdminActions.getManageExpenseAdvance(
              //     true,
              //     `claimtypeDa=${e.target.value}`
              //   )
              // );
            },
          },
        // required: true,
        classes: "col-span-1",
    },
    {
      label: "Month",
      type: "select",
      name: "month",
      option:monthList,
      props: {
      }
    },
    {
      label: "Year",
      type: "select",
      name: "year",
      option:listYear,
      props: {
      }
    },
   
    ],
  };
  const onSubmit = (data) => {
    // let value = data.reseter;
    // delete data.reseter;
    // dispatch(ExpenseAdvanceActions.getHRAllAdvance(value, objectToQueryString(data)));
    let shouldReset = data.reseter;
    delete data.reseter;
    let strVal = objectToQueryString(data);
    setstrVal(strVal);
    // dispatch(ExpenseAdvanceActions?.getL1Data(true, strVal));
    dispatch(ExpenseAdvanceActions.getHRAllAdvance(true, strVal));
  };
  useEffect(() => {
    dispatch(ExpenseAdvanceActions.getHRAllAdvance());
    dispatch(AdminActions.getManageAdvanceTypeFilter())
  }, []);
  const onTableViewSubmit = (data) => {
    data["fileType"] = "ManageEmployee";
    dispatch(
      CommonActions.fileSubmit(Urls.common_file_uploadr, data, () => {
        dispatch(ExpenseAdvanceActions.getHRAllAdvance());
        setFileOpen(false);
        resetting("");
      })
    );
  };
  return (
    <>
      <AdvancedTable
        headerButton={
          <div className="flex">
            <ConditionalButton
              classes="mr-1"
              showType={getAccessType("Expense(Exp & Adv)")}
              onClick={(e) => {
                navigate("/hr/Claim");
              }}
              name={"Expense"}
            ></ConditionalButton>
            <ConditionalButton
              classes="mr-1"
              showType={getAccessType("Advance(Exp & Adv)")}
              onClick={(e) => {
                navigate("/hr/Advance");
              }}
              name={"Advance"}
            ></ConditionalButton>

            <ConditionalButton
              classes="mr-1"
              showType={getAccessType("Export(Exp & Adv)")}
              onClick={(e) => {
                dispatch(CommonActions.commondownload("export/AllAdvance"+"?"+strValFil,"Export_AllAdvance.xlsx"))
              }}
              name={"Export"}
            ></ConditionalButton>
          </div>
        }
        table={table}
        filterAfter={onSubmit}
        tableName={"UserListTable"}
        handleSubmit={handleSubmit}
        data={dbConfigList}
        errors={errors}
        register={register}
        setValue={setValue}
        getValues={getValues}
        totalCount={dbConfigTotalCount}
        heading="Total Count:-"
      />

      <Modal
        size={"sm"}
        modalHead={modalHead}
        children={modalBody}
        isOpen={modalOpen}
        setIsOpen={setmodalOpen}
      />

      {/* <CommonForm/> */}
      <FileUploader
        isOpen={fileOpen}
        fileUploadUrl={""}
        onTableViewSubmit={onTableViewSubmit}
        setIsOpen={setFileOpen}
      />
    </>
  );
};

export default ExpAdvForAdvance;
