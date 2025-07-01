


import React, { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import EditButton from "../../../../components/EditButton";
import AdvancedTable from "../../../../components/AdvancedTable";
import Modal from "../../../../components/Modal";
import Button from "../../../../components/Button";
import DeleteButton from "../../../../components/DeleteButton";
import DownloadButton from "../../../../components/DownloadButton";
import CstmButton from "../../../../components/CstmButton";
import { objectToQueryString } from "../../../../utils/commonFunnction";
import { ALERTS } from "../../../../store/reducers/component-reducer";
import CommonActions from "../../../../store/actions/common-actions";
import { Urls, backendassetUrl, baseUrl } from "../../../../utils/url";
import AdminActions from "../../../../store/actions/admin-actions";
import FileUploader from "../../../../components/FIleUploader";
import ExpenseAdvanceActions from "../../../../store/actions/expenseAdvance-actions";
import L3FormFORM from "../../../../pages/PMIS/MyHome/L3Form/L3FormFORM";
import CommonForm from "../../../../components/CommonForm";
import { useNavigate } from "react-router-dom";
import { CLEAR_GET_CLAIM_AND_ADVANCE } from "../../../../store/reducers/expenseAdvance-reducer";
import ViewButton from "../../../../components/ViewButton";

const L3Form = () => {
  const expenseRef = useRef("");
  const [amount, setAmount] = useState({
    ExpenseNo: {},
    amount: {},
    claimedAmount: {},
    remark: {},
    addedFor: {},
  });
  const [modalOpen, setmodalOpen] = useState(false);
  const [modalFullOpen, setmodalFullOpen] = useState(false);
  const [fileOpen, setFileOpen] = useState(false);
  const [advanceRow, setAdvanceRow] = useState([]);
  const [strValFil, setstrVal] = useState(false);
  const [selectAll, setSelectAll] = useState([]);
  const [modalBody, setmodalBody] = useState(<></>);
  const [modalHead, setmodalHead] = useState(<></>);
  const [hide, setHide] = useState(false);
  const [expensAmount, setExpensAmount] = useState(false);
  const navigate = useNavigate();
  const amountRef = useRef();

  let dispatch = useDispatch();

  const currentDate = new Date();
  const dt = currentDate
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    .replace(/\//g, "-");

  const monthMap = {
    "01": "Jan",
    "02": "Feb",
    "03": "Mar",
    "04": "Apr",
    "05": "May",
    "06": "Jun",
    "07": "Jul",
    "08": "Aug",
    "09": "Sep",
    10: "Oct",
    11: "Nov",
    12: "Dec",
  };
  let dbConfigList = useSelector((state) => {
    let interdata = state?.expenseAdvanceData?.getL3Data || [""];
    return interdata?.map((itm) => {
      let updateditm = {
        ...itm,

        // attachment: (
        //   <div className="flex justify-center items-center">
        //     <img
        //       src={backendassetUrl + itm?.attachment}
        //       className="w-24 h-14 content-center flex object-contain"
        //     />
        //   </div>
        // ),
        expensemonth: monthMap[itm.expensemonth] || itm.expensemonth,

        checkboxAdvance: (
          <input
            type="checkbox"
            id={itm.uniqueId}
            checked={advanceRow.includes(itm.uniqueId)}
            value={itm.uniqueId}
            onChange={(e) => {
              if (e.target.checked) {
                setSelectAll((prev) => [...new Set([...prev, e.target.id])]);
                setAdvanceRow((prev) => [...prev, e.target.value]);
                
              } else {
                if (selectAll.includes(e.target.id)) {
                  setSelectAll((prev) =>
                    prev.filter((id) => id !== e.target.id)
                  );
                }
                setAdvanceRow((prev) =>
                  prev.filter((id) => id !== e.target.value)
                );
              }
              
            }}
          />
        ),

        ExpenseNo: (
          <p
            className="cursor-pointer text-pcol font-extrabold"
            onClick={(e) => {
              expenseRef.current = itm;
              
              dispatch(
                ExpenseAdvanceActions.getL3Data(
                  true,
                  `ExpenseNo=${itm?.ExpenseNo}`
                )
              );
              
              setmodalFullOpen((prev) => !prev);
              setHide(true);
              setmodalHead("(L3)" + " " + itm?.ExpenseNo);
              // dispatch(CLEAR_GET_CLAIM_AND_ADVANCE())
            }}
          >
            {itm.ExpenseNo}
          </p>
        ),

        edit: (
          <CstmButton
            className={"p-2"}
            child={
              <EditButton
                name={""}
                onClick={() => {
                  setmodalOpen(true);
                  dispatch(ExpenseAdvanceActions.getL3Data());
                  setmodalHead("Edit L3 Expense Approval");
                  setmodalBody(
                    <>
                      <L3FormFORM
                        isOpen={modalOpen}
                        setIsOpen={setmodalOpen}
                        resetting={false}
                        formValue={itm}
                      />
                      {/* <div className='mx-3'><Button name={"Submit"} classes={""} onClick={(handleSubmit(onTableViewSubmit))} /></div> */}
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
                              `${Urls.expAdv_L3Data}/${itm.uniqueId}`,
                              () => {
                                dispatch(ExpenseAdvanceActions.getL3Data());
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
    let interdata = state?.expenseAdvanceData?.getL3Data || [];
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

  let table = {
    columns: [
      ...( !hide ? [
        {
          name: (
            <input
              type="checkbox"
              checked={(dbConfigList?.length === selectAll?.length)}
              className='check-state'
              onChange={(e) => {
                
                if (e.target.checked) {
                  setAdvanceRow(dbConfigList.map((itm) => itm.uniqueId));
                  setSelectAll(Array.isArray(dbConfigList) ? dbConfigList.map(itm => itm.uniqueId) : []);
                  
                  try {
                    let eleRefs = document.getElementsByClassName('check-state');
                    if (eleRefs) {
                      eleRefs = Array.from(eleRefs);
                      if (Array.isArray(eleRefs)) {
                        eleRefs.forEach(ele => {
                          if (ele) {
                            ele.setAttribute('checked', true);
                          }
                        });
                      }
                    }
                  } catch (error) {
                  }
                } else {
                  setAdvanceRow([]);
                  setSelectAll([]);
                  
                  try {
                    let eleRefs = document.getElementsByClassName('check-state');
                    if (eleRefs) {
                      eleRefs = Array.from(eleRefs);
                      if (Array.isArray(eleRefs)) {
                        eleRefs.forEach(ele => {
                          if (ele) {
                            ele.removeAttribute('checked');
                          }
                        });
                      }
                    }
                  } catch (error) {
                  }
                }
                
              }}
            />
          )
          ,
          value: "checkboxAdvance",
          style: "min-w-[40px] max-w-[60px] text-center sticky left-0 bg-[#3e454d]",
        },
      ] : 
        []),
      {
        name: "Month",
        value: "expensemonth",
        style: "min-w-[80px] max-w-[450px] text-center sticky left-0 bg-[#3e454d]",
      },
      {
        name: "Expense ID",
        value: "ExpenseNo",
        style: "min-w-[170px] max-w-[450px] text-center sticky left-[79px] bg-[#3e454d] p-2 ",
      },
      {
        name: "Expense Date",
        value: "expenseDate",
        style: "min-w-[170px] max-w-[450px] text-center",
      },
      ...(!hide
        ? []
        : [
            {
              name: "Claim Type",
              value: "claimType",
              style: "min-w-[170px] max-w-[450px] text-center",
            },
          ]),
      {
        name: "Circle",
        value: "circle",
        style: "min-w-[170px] max-w-[450px] text-center",
      },
      {
        name: "Customer",
        value: "customerName",
        style: "min-w-[140px] max-w-[250px] text-center",
      },
      {
        name: "Cost Center",
        value: "costcenter",
        style: "min-w-[170px] max-w-[450px] text-center",
      },
      {
        name: "Project ID",
        value: "projectIdName",
        style: "min-w-[170px] max-w-[450px] text-center",
      },
      ...(!hide
        ? []
        : [
          {
            name: "Site ID",
            value: "Site_Id",
            style: "min-w-[170px] max-w-[450px] text-center",
          },
          {
            name: "Task Name",
            value: "Task",
            style: "min-w-[170px] max-w-[450px] text-center",
          },
          ]),
      {
        name: "Employee Name",
        value: "empName",
        style: "min-w-[170px] max-w-[450px] text-center",
      },
      {
        name: "Employee Code",
        value: "empCode",
        style: "min-w-[170px] max-w-[450px] text-center",
      },
      {
        name: "UST Code",
        value: "ustCode",
        style: "min-w-[170px] max-w-[450px] text-center",
      },
      {
        name: "Designation",
        value: "designation",
        style: "min-w-[170px] max-w-[450px] text-center",
      },
      ...(!hide
        ? []
        : [
          {
            name: "Start KM",
            value: "startKm",
            style: "min-w-[170px] max-w-[450px] text-center",
          },
          {
            name: "End KM",
            value: "endKm",
            style: "min-w-[170px] max-w-[450px] text-center",
          },
          {
            name: "Total KM",
            value: "Total_distance",
            style: "min-w-[170px] max-w-[450px] text-center",
          },
          {
            name: "Start Location",
            value: "startLocation",
            style: "min-w-[170px] max-w-[450px] text-center",
          },
          {
            name: "End Location",
            value: "endLocation",
            style: "min-w-[170px] max-w-[450px] text-center",
          },
          {
            name: "Check-IN Date",
            value: "checkInDate",
            style: "min-w-[170px] max-w-[450px] text-center",
          },
          {
            name: "Check-Out Date",
            value: "checkOutDate",
            style: "min-w-[170px] max-w-[450px] text-center",
          },
          {
            name: "Total Days",
            value: "totaldays",
            style: "min-w-[170px] max-w-[450px] text-center",
          }, 
          {
            name: "Additional Info",
            value: "additionalInfo",
            style: "min-w-[170px] max-w-[450px] text-center",
          },         
          ]),
      {
        name: "Bill Number",
        value: "billNumber",
        style: "min-w-[170px] max-w-[450px] text-center",
      },
      {
        name: "Claimed Amount",
        value: "Amount",
        style: "min-w-[170px] max-w-[450px] text-center sticky left-[248px] bg-[#3e454d]",
      },
      {
        name: "Current Status",
        value: "customStatus",
        style: "min-w-[120px] max-w-[450px] text-center",
      },
      {
        name: "Last Action Date",
        value: "actionAt",
        style: "min-w-[200px] max-w-[450px] text-center",
      },
      ...(!hide
        ? []
        : [
            {
              name: "Attachment",
              value: "attachment",
              style: "min-w-[150px] max-w-[450px] text-center",
            },
            {
              name: "Attachment Preview",
              value: "view",
              style: "min-w-[150px] max-w-[450px] text-center",
            },          
          ]),
      ...(!hide
        ? []
        : [
            {
              name: "Amount",
              value: "amount",
              style: "min-w-[150px] max-w-[450px] text-center",
            },
            // {
            //   name: "Status",
            //   value: "status",
            //   style: "min-w-[100px] max-w-[450px] text-center",
            // },
            {
              name: "Remarks",
              value: "remark",
              style: "min-w-[350px] max-w-[450px] text-center",
            },
          ]),

      // {
      //   name: "Edit",
      //   value: "edit",
      //   style: "min-w-[100px] max-w-[100px] text-center",
      // },
      //   {
      //     name: "Delete",
      //     value: "delete",
      //     style: "min-w-[100px] max-w-[100px] text-center",
      //   },
    ],
    properties: {
      rpp: [10, 20, 50, 100],
    },
    filter: [
      {
        label: "Approval Status",
        type: "select",
        name: "status",
        option: [
          // { label: "Submitted", value: "Submitted" },
          // { label: "L1-Approved", value: "L1-Approved" },
          // { label: "L1-Rejected", value: "L1-Rejected" },
          { label: "L2-Approved", value: "L2-Approved" },
          // { label: "L2-Rejected", value: "L2-Rejected" },
          { label: "L3-Approved", value: "L3-Approved" },
          { label: "L3-Rejected", value: "L3-Rejected" },
        ],
        // props: {
        // }
      },
      {
        label: "Employee Name",
        type: "text",
        name: "empName",
        props: {},
      },
      {
        label: "Employee Code",
        type: "text",
        name: "empCode",
        props: {},
      },
      // {
      //   label: "Cost Center",
      //   type: "text",
      //   name: "costCenter",
      //   props: {},
      // },
    ],
  };

  useEffect(() => {
    if (!modalFullOpen) {
      setHide(false);
    }
  }, [modalFullOpen]);

  function handleAmountAndRemark(type) {
    const data = { approver: "L3-" + type, type: "Expense", status: type };
    const amountRemark = [];

    if (typeof amount === "undefined" || typeof expenseRef === "undefined") {
      console.error("amount or expenseRef is not defined");
      return;
    }

    // const keys = [...new Set([...Object.keys(amount.amount), ...Object.keys(amount.remark)])];
    const keys = dbConfigList?.map((item) => item.uniqueId);

    keys.forEach((key) => {
      const item = dbConfigList.find((item) => item.uniqueId === key);
      console.log(item,"=afdfadfsdfgfdgdgfddfgsddfassfadf=" ,amount);
      console.log(item,"=afdfadfsdfgfdgdgfddfgsddfassfadf=" ,amount);
      if (item) {
        amountRemark.push({
          _id: key,
          ApprovedAmount: amount?.amount?.[item?.uniqueId] ? +amount["amount"][item?.uniqueId] : +item?.ApprovedAmount || 0 ,
          Amount: key in amount.claimedAmount ? +item?.Amount : dbConfigList.find((item) => item.uniqueId === key)?.Amount,
          remark: key in amount.remark ? amount.remark[key] : item?.remark || "",
        });
      }
    });

    data.data = amountRemark;
    data.expenseId = expenseRef.current?.ExpenseNo;
    data.addedFor = expenseRef.current?.addedFor;

    console.log("kjhgfdghkjl;khgfdsfghjkljhgfdsfghjkjhgfdsdgjhk",data)
    dispatch(
      ExpenseAdvanceActions.postApprovalStatus(true, data, () => {
        // setIsOpen(false);
        dispatch(ExpenseAdvanceActions.getL3Data());

        setmodalOpen(false);
        setmodalFullOpen(false);
        setmodalBody(<></>);
        setmodalHead(<></>);

        const refs = document.querySelectorAll(".amountWithRemark");
        if (refs) {
          const data = Array.from(refs);
          if (data && Array.isArray(data)) {
            data.forEach((ele) => {
              ele.value = "";
            });
          }
        }
      })
    );

    // console.log("___data___", data);
  }

  function AllAmountAndRemark(type) {
    const data = { approver: "L3-" + type, type: "Expense", status: type };
    const selectedExpenses = advanceRow; 

    if (!selectedExpenses || selectedExpenses.length === 0) {
        console.error("No expenses selected for approval/rejection");
        return;
    }

    data.data = selectedExpenses.map(expenseId => {
        const allExpense = dbConfigList.find(item => item.uniqueId === expenseId);
        return {
            ExpenseNo: allExpense?.ExpenseNo.props.children || "",
        };
    }); 

    dispatch(
        ExpenseAdvanceActions.postApprovalAllExpenseStatus(true, data, () => {
            dispatch(ExpenseAdvanceActions.getL3Data());
            setAdvanceRow([]);
            setSelectAll([]);
        })
    );
}

  const onSubmit = (data) => {
    let shouldReset = data.reseter;
    delete data.reseter;
    let strVal = objectToQueryString(data);
    setstrVal(strVal);
    dispatch(ExpenseAdvanceActions.getL3Data(true, strVal));
  };

  
  useEffect(() => {
    if (!modalFullOpen) {
      dispatch(ExpenseAdvanceActions.getL3Data());
      dispatch( CLEAR_GET_CLAIM_AND_ADVANCE() );    }
    setExpensAmount(false);
    setAmount({
      ExpenseNo: {},
      amount: {},
      claimedAmount: {},
      remark: {},
      addedFor: {},
    })
  }, [modalFullOpen,]);

  const onTableViewSubmit = (data) => {
    data["fileType"] = "ManageClaimType";
    dispatch(
      CommonActions.fileSubmit(Urls.common_file_uploadr, data, () => {
        dispatch(ExpenseAdvanceActions.getL3Data());
        setFileOpen(false);
      })
    );
  };
  // const convertToInputFieldHandler =(e)=>{
  //   amountRef.current.replaceWith(

  // }
  return (
    <>
      <AdvancedTable
        headerButton={
          <div className="flex gap-1">
            <Button
              classes="w-auto"
              onClick={(e) => {
                navigate("/home/approverCards/FinanceApprover");
              }}
              name={"L3 Expense"}
            ></Button>
            <Button
              classes="w-auto"
              onClick={(e) => {
                navigate("/home/approverCards/L3Advance");
              }}
              name={"L3 Advance"}
            ></Button>
            <div className="flex gap-1">
                <Button
                  onClick={() => {
                    // alert("Checked")
                    AllAmountAndRemark("Rejected");
                  }}
                  name="Reject"
                />
                <Button
                  onClick={() => {
                    // alert("Checked")
                    AllAmountAndRemark("Approved");
                  }}
                  name="Approve"
                />
                <Button
              classes="w-auto"
              onClick={(e) => {
                dispatch(CommonActions.commondownload("/export/l3Approval"+"?"+strValFil,"Export_L3Aprroval.xlsx"))
              }}
              name={"Export"}
            ></Button>
              </div>

            {/* <Button name={"Upload File"} classes='w-auto mr-1' onClick={(e) => {
                    setFileOpen(prev=>!prev)
                }}></Button> */}
          </div>
        }
        table={table}
        // templateButton={["/template/Circle.xlsx","Circle.xlsx"]}
        // exportButton={["/export/manageCircle","Export_Circle("+dt+").xlsx"]}
        filterAfter={onSubmit}
        tableName={"UserListTable"}
        handleSubmit={handleSubmit}
        data={dbConfigList}
        errors={errors}
        register={register}
        setValue={setValue}
        getValues={getValues}
        totalCount={dbConfigTotalCount}
      />

      <Modal
        size={"full"}
        modalHead={modalHead}
        children={
          <AdvancedTable
            headerButton={
              <div className="flex gap-1">
                <Button
                  onClick={() => {
                    handleAmountAndRemark("Rejected");
                  }}
                  name="Reject"
                />
                <Button
                  onClick={() => {
                    handleAmountAndRemark("Approved");
                  }}
                  name="Approve"
                />
              </div>
            }
            table={table}
            filterAfter={onSubmit}
            tableName={"UserListTable"}
            handleSubmit={handleSubmit}
            data={dbConfigList?.map((item, index) => {
              console.log("nkwjdwoiekjdlkdmalkdmlksamdlksamdlks=", item);
              return {
                ...item,
                amount: (
                  <div
                    onClick={() => {
                      setExpensAmount(true);
                      console.log(
                        "kwihdiwjdowkedowkedoiewkdowedoewd",
                        setExpensAmount
                      );
                    }}
                  >
                    {expensAmount ? (
                      <input
                        type="number"
                        defaultValue={item?.ApprovedAmount}
                        className="p-4 w-full !border amountWithRemark bg-[#3e454d]"
                        placeholder="Enter Amount.."
                        onChange={(e) => {
                          setAmount((prev) => {
                            return {
                              ...prev,
                              amount: {
                                ...prev.amount,
                                [item.uniqueId]: e.target.value,
                              },
                              claimedAmount: {
                                ...prev.claimedAmount,
                                [item.uniqueId]:
                                  dbConfigList.find(
                                    (item) => item.uniqueId === item.uniqueId
                                  )?.Amount || 0,
                              },
                              addedFor: {
                                ...prev.addedFor,
                                [item.uniqueId]: dbConfigList.find(
                                  (item) => item.uniqueId === item.uniqueId
                                )?.addedFor,
                              },
                              ExpenseNo: {
                                ...prev.ExpenseNo,
                                [item.uniqueId]: dbConfigList.find(
                                  (item) => item.uniqueId === item.uniqueId
                                )?.ExpenseNo,
                              },
                            };
                          });
                        }}
                      />
                    ) : (
                      <p>{item?.ApprovedAmount}</p>
                    )}
                  </div>
                ),
                remark: (
                  <input
                    type="text"
                    defaultValue={item?.remark || ""}
                    className="p-4 w-full !border amountWithRemark bg-[#3e454d]"
                    placeholder="Enter Your Remark..."
                    onChange={(e) => {
                      setAmount((prev) => {
                        return {
                          ...prev,
                          remark: {
                            ...prev.remark,
                            [item.uniqueId]: e.target.value,
                          },
                          claimedAmount: {
                            ...prev.claimedAmount,
                            [item.uniqueId]:
                              dbConfigList.find(
                                (item) => item.uniqueId === item.uniqueId
                              )?.Amount || 0,
                          },
                          addedFor: {
                            ...prev.addedFor,
                            [item.uniqueId]: dbConfigList.find(
                              (item) => item.uniqueId === item.uniqueId
                            )?.addedFor,
                          },
                          ExpenseNo: {
                            ...prev.ExpenseNo,
                            [item.uniqueId]: dbConfigList.find(
                              (item) => item.uniqueId === item.uniqueId
                            )?.ExpenseNo,
                          },
                        };
                      });
                    }}
                  />
                ),

                attachment: (
                  <CstmButton
                    className={"p-2"}
                    child={
                      <DownloadButton
                        name={""}
                        onClick={() => {
                          dispatch(
                            CommonActions.commondownload2(
                              "/expenses/downloadFile" +
                                "?" +
                                `attachment=${item.attachment}`,
                              `${item?.attachment}`
                            )
                          );
                        }}
                      ></DownloadButton>
                    }
                  />
                ),

                view: (
                  <CstmButton
                    className={"p-2"}
                    child={
                      <ViewButton
                        name={""}
                        onClick={() => {
                          setmodalOpen(true);
                          setmodalHead("Attachment Preview");
                          setmodalBody(
                            <>
                    
                               <div className="flex justify-center items-center">
                               <img
                                   src={backendassetUrl + item?.attachment}
                                   className="w-full h-full content-center flex object-contain"
                                 />
                             </div>
                    
                            </>
                          );
                        }}
                      ></ViewButton>
                    }
            />
                ),


              };
            })}
            errors={errors}
            register={register}
            setValue={setValue}
            getValues={getValues}
            totalCount={dbConfigTotalCount}
          />
        }
        isOpen={modalFullOpen}
        setIsOpen={setmodalFullOpen}
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
        tempbtn={true}
        tempbtnlink={["/template/Circle.xlsx", "Circle.xlsx"]}
      />
    </>
  );
};

export default L3Form;
