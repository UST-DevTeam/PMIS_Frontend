import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as Unicons from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import EditButton from "../../../components/EditButton";
import EmpDetails from "./EmpDetails";
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
import DownloadButton from "../../../components/DownloadButton";
import { Urls } from "../../../utils/url";
import ConditionalButton from "../../../components/ConditionalButton";
import moment from "moment";
import AdminActions from "../../../store/actions/admin-actions";

const ExpAdvForClaim = () => {
  const expenseRef = useRef("");
  const [modalOpen, setmodalOpen] = useState(false);
  const [modalBody, setmodalBody] = useState(<></>);
  const [type, settype] = useState(false);
  const [fileOpen, setFileOpen] = useState(false);
  const [fileOpen2, setFileOpen2] = useState(false);
  const [strValFil, setstrVal] = useState(false);
  const [fileOpen3, setFileOpen3] = useState(false);
  const [modalHead, setmodalHead] = useState(<></>);
  const endDate = moment().format("Y");

  let dispatch = useDispatch();
  let navigate = useNavigate();
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

  let showType = getAccessType("Action(Exp & Adv)")

  let shouldIncludeEditColumn = false

  if (showType === "visible"){
    shouldIncludeEditColumn = true
  }

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
    let interdata = state?.expenseAdvanceData?.getHRAllExpenses || [];
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
                              `${Urls.expAdv_hr_all_expenses}/${itm.uniqueId}`,
                              () => {
                                dispatch(ExpenseAdvanceActions.getHRAllExpenses());
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
        attachment: (
          <CstmButton
            className={"p-2"}
            child={
            <DownloadButton
                name={""}
                onClick={() => {
                    dispatch(CommonActions.commondownload("/expenses/DownloadAttachment"+"?"+`expenseId=${itm["Expense number"]}`,"expense.pdf"))                      
                }}
              ></DownloadButton>
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
    console.log('statestatestate2',state)
    let interdata = state?.expenseAdvanceData?.getHRAllExpenses;
    if (interdata.length > 0) {
      return interdata[0]["overall_table_count"];
    } else {
      return 0;
    }
  });



  let claimTypeList = useSelector((state) => {
    return state?.adminData?.getClaimTypeExpenses?.map((itm) => {
      
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

  let table = {
    columns: [
        {
            name: "Claim Month",
            value: "Month",
            style: "min-w-[120px] max-w-[200px] text-center",
        },
        {
          name: "Submission Date",
          value: "Submission Date",
          style: "min-w-[120px] max-w-[450px] text-center",
      },
        {
            name: "Employee Name",
            value: "Employee Name",
            style: "min-w-[150px] max-w-[200px] text-center sticky left-0 bg-[#3e454d]",
        },
        {
            name: "Employee Code",
            value: "Employee Code",
            style: "min-w-[130px] max-w-[450px] text-center sticky left-[149px] bg-[#3e454d]",
        },
        {
          name: "UST Employee Code",
          value: "UST Employee Code",
          style: "min-w-[150px] max-w-[450px] text-center sticky left-[169px] bg-[#3e454d]",
      },
        {
            name: "Contact No.",
            value: "Contact Number",
            style: "min-w-[140px] max-w-[200px] text-center",
        },
        {
            name: "Expense No.",
            value: "Expense number",
            style: "min-w-[120px] max-w-[450px] text-center",
        },
        {
            name: "Claim Date",
            value: "Claim Date",
            style: "min-w-[150px] max-w-[450px] text-center",
        },
        
        {
            name: "Claim Type",
            value: "Claim Type",
            style: "min-w-[250px] max-w-[450px] text-center",
        },
        {
            name: "Category",
            value: "Category",
            style: "min-w-[150px] max-w-[450px] text-center",
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
            name: "Site ID",
            value: "Site ID",
            style: "min-w-[150px] max-w-[450px] text-center",
        },
        {
            name: "Task Name",
            value: "Task Name",
            style: "min-w-[150px] max-w-[450px] text-center",
        },
        {
            name: "Amount",
            value: "Amount",
            style: "min-w-[100px] max-w-[200px] text-center",
        },
        
        {
            name: "Approval Amount",
            value: "Approved Amount",
            style: "min-w-[150px] max-w-[450px] text-center",
        },
        {
            name: "Bill No",
            value: "Bill No",
            style: "min-w-[100px] max-w-[200px] text-center",
        },
        {
            name: "Start KM",
            value: "Start KM",
            style: "min-w-[100px] max-w-[200px] text-center",
        },
        {
            name: "End KM",
            value: "End KM",
            style: "min-w-[100px] max-w-[200px] text-center",
        },
        {
            name: "Total KM",
            value: "Total KM",
            style: "min-w-[100px] max-w-[200px] text-center",
        },
        {
            name: "Start Location",
            value: "Start Location",
            style: "min-w-[150px] max-w-[450px] text-center",
        },
        {
            name: "End Location",
            value: "End Location",
            style: "min-w-[150px] max-w-[450px] text-center",
        },
        {
            name: "Transportation Mode",
            value: "Transport Mode",
            style: "min-w-[150px] max-w-[450px] text-center",
        },
        {
              name: "Check-IN Date",
              value: "Check-IN Date",
              style: "min-w-[150px] max-w-[450px] text-center",
        },
        {
            name: "Check-OUT Date",
            value: "Check-OUT Date",
            style: "min-w-[150px] max-w-[450px] text-center",
        },
        {
            name: "Total Days",
            value: "Total Days",
            style: "min-w-[150px] max-w-[450px] text-center",
        },
        {
          name: "Current Status",
          value: "Status",
          style: "min-w-[150px] max-w-[450px] text-center",
      },
        {
            name: "Last Action Date",
            value: "Last Action Date",
            style: "min-w-[150px] max-w-[450px] text-center",
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
            name: "L3 Status",
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
        {
            name: "Attachment",
            value: "attachment",
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
        label: "Expense Number",
        type: "text",
        name: "ExpenseNo",
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
    let shouldReset = data.reseter;
    delete data.reseter;
    let strVal = objectToQueryString(data);
    setstrVal(strVal);
    dispatch(ExpenseAdvanceActions.getHRAllExpenses(true, strVal));
  };
  useEffect(() => {
    dispatch(ExpenseAdvanceActions.getHRAllExpenses());
    dispatch(AdminActions.getManageExpenseTypeFilter());
  }, []);
  const onTableViewSubmit = (data) => {
    data["fileType"] = "ManageClaims";
    dispatch(
      CommonActions.fileSubmit(Urls.common_file_uploadr, data, () => {
        dispatch(ExpenseAdvanceActions.getHRAllExpenses());
        setFileOpen2(false);
        resetting("");
      })
    );
  };
  const onTableViewSubmit2 = (data) => {
    data["fileType"] = "UploadCurrentBalance";
    dispatch(
      CommonActions.fileSubmit(Urls.common_file_uploadr, data, () => {
        dispatch(ExpenseAdvanceActions.getHRAllExpenses());
        setFileOpen3(false);
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
              name={"Upload Claims"}
              showType={getAccessType("Upload Claims(Exp & Adv)")}
              classes="mr-1"
              onClick={(e) => {
                setFileOpen2((prev) => !prev);
              }}
            ></ConditionalButton>

            <ConditionalButton
              name={"Opening Balance"}
              showType={getAccessType("Opening Balance(Exp & Adv)")}
              classes="mr-1"
              onClick={(e) => {
                setFileOpen3((prev) => !prev);
              }}
            ></ConditionalButton>

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
                dispatch(CommonActions.commondownload("export/AllExpenses"+"?"+strValFil,"Export_AllExpenses.xlsx"))
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
      <FileUploader
        isOpen={fileOpen2}
        fileUploadUrl={""}
        onTableViewSubmit={onTableViewSubmit}
        setIsOpen={setFileOpen2}
        tempbtn={true} tempbtnlink = {["/template/ManageClaims.xlsx","ManageClaims.xlsx"]}
      />
      <FileUploader
        isOpen={fileOpen3}
        fileUploadUrl={""}
        onTableViewSubmit={onTableViewSubmit2}
        setIsOpen={setFileOpen3}
        tempbtn={true} tempbtnlink = {["/template/ManageCurrentBalance.xlsx","ManageCurrentBalance.xlsx"]}
      />
    </>
  );
};

export default ExpAdvForClaim;
