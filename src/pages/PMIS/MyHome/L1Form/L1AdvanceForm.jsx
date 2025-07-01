import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import EditButton from '../../../../components/EditButton';
import AdvancedTable from '../../../../components/AdvancedTable';
import Modal from '../../../../components/Modal';
import Button from '../../../../components/Button';
import DeleteButton from '../../../../components/DeleteButton';
import CstmButton from '../../../../components/CstmButton';
import { objectToQueryString } from '../../../../utils/commonFunnction';
import { ALERTS } from '../../../../store/reducers/component-reducer';
import CommonActions from '../../../../store/actions/common-actions';
import { Urls, backendassetUrl, baseUrl } from "../../../../utils/url";
import AdminActions from '../../../../store/actions/admin-actions';
import FileUploader from '../../../../components/FIleUploader';
import ExpenseAdvanceActions from '../../../../store/actions/expenseAdvance-actions';
// import L1AdvanceForm from '../../../../pages/PMIS/MyHome/L1AdvanceForm/L1AdvanceFormFORM'
import CommonForm from '../../../../components/CommonForm';
import L1AdvanceFormFORM from './L1AdvanceFormFORM';
import { useNavigate } from 'react-router-dom';

const L1AdvanceForm = () => {
    const expenseRef = useRef("");
    const [amount, setAmount] = useState({
      AdvanceNo: {},
      amount: {},
      claimedAmount: {},
      remark: {},
      addedFor: {},
    });

    const [modalOpen, setmodalOpen] = useState(false)
    const [fileOpen, setFileOpen] = useState(false)
    const [advanceRow, setAdvanceRow] = useState([]);
    const [selectAll, setSelectAll] = useState([]);
    const [modalBody, setmodalBody] = useState(<></>)
    const [modalHead, setmodalHead] = useState(<></>)

    const navigate = useNavigate()

    let dispatch = useDispatch()

    const currentDate = new Date();
    const dt = currentDate.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      }).replace(/\//g, '-')

      const monthMap = { "01": "Jan", "02": "Feb", "03": "Mar", "04": "Apr", "05": "May", "06": "Jun", "07": "Jul", "08": "Aug", "09": "Sep", "10": "Oct", "11": "Nov", "12": "Dec" };

      let dbConfigL = useSelector((state) => {
        let interdata = state?.expenseAdvanceData?.getL1AdvanceData || [""]
        return interdata;
      });

    
    let dbConfigList = useSelector((state) => {
        let interdata = state?.expenseAdvanceData?.getL1AdvanceData || [""]
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
                
                              
                "edit": <CstmButton className={"p-2"} child={<EditButton name={""} onClick={() => {
                    setmodalOpen(true)
                    dispatch(ExpenseAdvanceActions.getL1AdvanceData())
                    setmodalHead("Edit L1 Advance Approval")
                    setmodalBody(<>
                        <L1AdvanceFormFORM isOpen={modalOpen} setIsOpen={setmodalOpen} resetting={false} formValue={itm} />
                        {/* <div className='mx-3'><Button name={"Submit"} classes={""} onClick={(handleSubmit(onTableViewSubmit))} /></div> */}
                    </>)
                    //setmodalOpen(false)
                }}></EditButton>} />,
                
                "delete": <CstmButton child={<DeleteButton name={""} onClick={() => {
                    let msgdata = {
                        show: true,
                        icon: 'warning',
                        buttons: [
                            <Button classes='w-15 bg-rose-400' onClick={() => {
                                dispatch(CommonActions.deleteApiCaller(`${Urls.expAdv_L1AdvanceData}/${itm.uniqueId}`, () => {
                                    dispatch(ExpenseAdvanceActions.getL1AdvanceData())
                                    dispatch(ALERTS({ show: false }))
                                }))
                            }} name={"OK"} />,
                            <Button classes='w-auto' onClick={() => {
                                dispatch(ALERTS({ show: false }))
                            }} name={"Cancel"} />
                        ],
                        text: "Are you sure you want to Delete?"
                    }
                    dispatch(ALERTS(msgdata))
                }}></DeleteButton>} />
            }
            return updateditm
        });
    })

    let dbConfigTotalCount = useSelector((state) => {
        let interdata = state?.expenseAdvanceData?.getL1AdvanceData || []
        if (interdata.length > 0) {
            return interdata[0]["overall_table_count"]
        } else {
            return 0
        }
    })

    const {register,handleSubmit,watch,setValue,setValues,getValues,formState: { errors },} = useForm()

    let table = {
        columns: [
          {
            name: (
              <input
                type="checkbox"
                checked={(dbConfigList?.length === selectAll?.length)}
                className='check-state'
                onChange={(e) => {
                  if (e.target.checked) {
                    setAdvanceRow(dbConfigL.map((itm) => itm.uniqueId));
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
                      // Handle error if needed
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
                      // Handle error if needed
                    }
                  }
                }}
              />
            )
            ,
            value: "checkboxAdvance",
            style: "min-w-[40px] max-w-[60px] text-center sticky left-0 bg-[#3e454d]",
          },
          {
            name: "Month",
            value: "expensemonth",
            style: "min-w-[80px] max-w-[450px] text-center",
          },
          {
            name: "Advance ID",
            value: "AdvanceNo",
            style: "min-w-[170px] max-w-[450px] text-center sticky left-[39px] bg-[#3e454d]",
          },
          {
            name: "Advance Date",
            value: "CreatedAt",
            style: "min-w-[170px] max-w-[450px] text-center",
          },
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
        //   {
        //     name: "Category",
        //     value: "categories",
        //     style: "min-w-[170px] max-w-[450px] text-center",
        //   },
        //   {
        //     name: "Bill Number",
        //     value: "billNumber",
        //     style: "min-w-[170px] max-w-[450px] text-center",
        //   },
          {
            name: "Claimed Amount",
            value: "Amount",
            style: "min-w-[170px] max-w-[450px] text-center sticky left-[169px] bg-[#3e454d]",
          },
          {
            name: "Additional Info",
            value: "additionalInfo",
            style: "min-w-[170px] max-w-[450px] text-center",
          },
          {
            name: "Current Status",
            value: "customStatus",
            style: "min-w-[120px] max-w-[450px] text-center",
          },
          {
            name: "Last Action Date",
            value: "lastActionDate",
            style: "min-w-[200px] max-w-[450px] text-center",
          },
        //   {
        //     name: "Attachment",
        //     value: "attachment",
        //     style: "min-w-[150px] max-w-[450px] text-center",
        //   },
          // {
          //   name: "Status",
          //   value: "status",
          //   style: "min-w-[100px] max-w-[450px] text-center",
          // },
          {
            name: "Approved Amount",
            value: "amount",
            style: "min-w-[170px] max-w-[450px] text-center",
          },
          {
            name: "Remarks",
            value: "remark",
            style: "min-w-[350px] max-w-[450px] text-center",
          },
          {
            name: "Edit",
            value: "edit",
            style: "min-w-[100px] max-w-[100px] text-center",
          },
        //   {
        //     name: "Delete",
        //     value: "delete",
        //     style: "min-w-[100px] max-w-[100px] text-center",
        //   },
        ],
        properties: {
            rpp: [10, 20, 50, 100]
        },
        filter: [
            {
                label: "Approval Status",
                type: "select",
                name: "status",
                option: [
                    { "label":"Submitted", "value":"Submitted" },
                    { "label":"L1-Approved", "value":"L1-Approved" },
                    { "label":"L1-Rejected", "value":"L1-Rejected" },
                    // { "label":"L2-Approved", "value":"L2-Approved" },
                    // { "label":"L2-Rejected", "value":"L2-Rejected" },
                    // { "label":"L3-Approved", "value":"L3-Approved" },
                    // { "label":"L3-Rejected", "value":"L3-Rejected" },
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
        ]
    }

    function handleAmountAndRemark(type) {
      const data = { approver: "L1-" + type, type: "Advance", status: type};
      const amountRemark = [];
    
      if (typeof amount === "undefined" || typeof expenseRef === "undefined") {
        console.error("amount or expenseRef is not defined");
        return;
      }
    
      let selectRows = [];
      if (selectAll.length === dbConfigList.length) {
        selectRows = selectAll;
      } else {
        selectRows = advanceRow;
      }  
      selectRows.forEach((key) => {
        const item = dbConfigList.find(item => item.uniqueId === key);
        if (item) {
          amountRemark.push({
            _id: key,
            ApprovedAmount: key in amount.amount ? +amount.amount[key] : 0,
            Amount: key in amount.claimedAmount ? +amount.claimedAmount[key] : item.Amount,
            remark: key in amount.remark ? amount.remark[key] : "",
            addedFor: key in amount.addedFor ? amount.addedFor[key] : item.addedFor,
            AdvanceNo: key in amount.AdvanceNo ? amount.AdvanceNo[key] : item.AdvanceNo,
          });
        }
      });
    
      data.data = amountRemark;
    
    
      dispatch(
        ExpenseAdvanceActions.postApprovalStatus(true, data, () => {
          dispatch(ExpenseAdvanceActions.getL1AdvanceData({ids : selectAll}))
    
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
    }

    
    const onSubmit = (data) => {
        let value = data.reseter
        delete data.reseter
        dispatch(ExpenseAdvanceActions.getL1AdvanceData(value, objectToQueryString(data)))
    }

    useEffect(() => { 
        dispatch(ExpenseAdvanceActions.getL1AdvanceData())
    }, [])

    const onTableViewSubmit = (data) => { 
        data["fileType"]="ManageClaimType"
        dispatch(CommonActions.fileSubmit(Urls.common_file_uploadr, data, () => {
            dispatch(ExpenseAdvanceActions.getL1AdvanceData())
            setFileOpen(false)
        }))
    }
    return <>
        <AdvancedTable
            headerButton={<div className='flex gap-1'>
               <Button classes='w-auto' onClick={(e) => {
                  navigate("/home/approverCards/L1Approver")
                }}
                name={"L1 Expense"}>
                </Button>
                <Button classes='w-auto' onClick={(e) => {
                  navigate("/home/approverCards/L1Advance")
                }}
                name={"L1 Advance"}>
                </Button>

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
                <Button
              classes="w-auto"
              onClick={(e) => {
                dispatch(CommonActions.commondownload("/export/Advance/l1Approval","Export__Advance_L2Aprroval.xlsx"))
              }}
              name={"Export"}
            ></Button>
              </div>
                
                {/* <Button name={"Upload File"} classes='w-auto mr-1' onClick={(e) => {
                    setFileOpen(prev=>!prev)
                }}></Button> */}
                </div>}
            table={table}
            // templateButton={["/template/Circle.xlsx","Circle.xlsx"]}
            // exportButton={["/export/manageCircle","Export_Circle("+dt+").xlsx"]}
            filterAfter={onSubmit}
            tableName={"UserListTable"}
            handleSubmit={handleSubmit}
            data={dbConfigList?.map((item) => {
              return {
                ...item,
                amount: (
                  <input
                    type="number"
                    className="p-4 w-full !border amountWithRemark bg-[#3e454d]"
                    placeholder="Enter Amount..."
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
                            [item.uniqueId]: item.Amount || 0,
                          },
                          addedFor: {
                            ...prev.addedFor,
                            [item.uniqueId]: item.addedFor,
                          },
                          AdvanceNo: {
                            ...prev.AdvanceNo,
                            [item.uniqueId]: item.AdvanceNo,
                          },
                        };
                      });
                    }}
                  />
                ),
                remark: (
                  <input
                    type="text"
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
                            [item.uniqueId]: item.Amount || 0,
                          },
                          addedFor: {
                            ...prev.addedFor,
                            [item.uniqueId]: item.addedFor,
                          },
                          AdvanceNo: {
                            ...prev.AdvanceNo,
                            [item.uniqueId]: item.AdvanceNo,
                          },
                        };
                      });
                    }}
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

        <Modal size={"sm"} modalHead={modalHead} children={modalBody} isOpen={modalOpen} setIsOpen={setmodalOpen} />

        {/* <CommonForm/> */}
        <FileUploader isOpen={fileOpen} fileUploadUrl={""} onTableViewSubmit={onTableViewSubmit} setIsOpen={setFileOpen} tempbtn={true} tempbtnlink = {["/template/Circle.xlsx","Circle.xlsx"]}/>
    </>


};

export default L1AdvanceForm;