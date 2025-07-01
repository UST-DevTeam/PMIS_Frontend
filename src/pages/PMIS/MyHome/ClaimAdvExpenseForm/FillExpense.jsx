import React, { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import EditButton from "../../../../components/EditButton";
import Modal from "../../../../components/Modal";
import Button from "../../../../components/Button";
import DeleteButton from "../../../../components/DeleteButton";
import CstmButton from "../../../../components/CstmButton";
import { objectToQueryString } from "../../../../utils/commonFunnction";
import { ALERTS } from "../../../../store/reducers/component-reducer";
import CommonActions from "../../../../store/actions/common-actions";
import { Urls, backendassetUrl} from "../../../../utils/url";
import AdminActions from "../../../../store/actions/admin-actions";
import ExpenseAdvanceActions from "../../../../store/actions/expenseAdvance-actions";
import FillExpenseForm from "../../../../pages/PMIS/MyHome/ClaimAdvExpenseForm/FillExpenseForm";
import AdvancedTableRow from "../../../../components/AdvancedTableRow";
import DownloadButton from "../../../../components/DownloadButton";
import ViewButton from "../../../../components/ViewButton";

const FillExpense = () => {
  const expenseRef = useRef("");
  const [modalFullOpen, setmodalFullOpen] = useState(false);
  const [modalOpen, setmodalOpen] = useState(false);
  const [hide, setHide] = useState(false);
  const [modalBody, setmodalBody] = useState(<></>);
  const [modalHead, setmodalHead] = useState(<></>);

  let dispatch = useDispatch();

  const currentDate = new Date();
  const dt = currentDate
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    .replace(/\//g, "-");


    let userLimitValue = useSelector((state) => {
      const userLimitArray = state?.expenseAdvanceData?.getUserLimit;
      return userLimitArray && userLimitArray?.length > 0 ? userLimitArray[0].value : null;
    });

  let dbConfigListL = useSelector((state) => {
    let interdata = state?.expenseAdvanceData
      ?.getExpensesByExpenseNoInPopUp || [""];
    return interdata?.map((itm) => {
      let categoriesArray = itm.categories ? itm.categories.split(",") : [];
      let updateditm = {
        ...itm,

        categories: categoriesArray.join(","),

        // attachment: (
        //   <div className="flex justify-center items-center">
        //     <img
        //       src={backendassetUrl + itm?.attachment}
        //       className="w-24 h-14 content-center flex object-contain"
        //     />
        //   </div>
        // ),

        edit: (
          <CstmButton
            className={"p-2"}
            child={
              <EditButton
                name={""}
                onClick={() => {
               console.log(itm,"asdfghjkllkjhgfdsasdfghjklkjhgfd")
                  setmodalOpen(true);
                  setmodalFullOpen(false)
                  dispatch(ExpenseAdvanceActions.getFillExpense());
                  setmodalHead("");
                  setmodalBody(
                    <>
                      <FillExpenseForm
                        isOpen={modalOpen}
                        setIsOpen={setmodalOpen}
                        resetting={false}
                        formValue={itm}
                      />
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
                        classes="w-15 bg-green-500"
                        onClick={() => {
                          dispatch(
                            CommonActions.deleteApiCaller(
                              `${Urls.expAdv_fill_expense}/${itm.expenseuniqueId}`,
                              () => {
                                dispatch(
                                  ExpenseAdvanceActions.getFillExpense()
                                  // ExpenseAdvanceActions.getExpensesByExpenseNoInPopUp()
                                );
                                dispatch(ALERTS({ show: false }));
                                setmodalFullOpen(false); 
                              }
                            )
                          );
                        }}
                        name={"OK"}
                      />,
                      <Button
                        classes="w-24"
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

  useEffect(() => {   
    
    dispatch(AdminActions.getManageExpenseAdvance());
    dispatch(
      ExpenseAdvanceActions.getExpADvPrjectDetails()
    );
    dispatch(AdminActions.getManageExpenseAdvance());
    if(!modalFullOpen){
      setHide(false)
    }
  } , [modalFullOpen,],)

  let dbConfigList = useSelector((state) => {
    let interdata = state?.expenseAdvanceData?.getFillExpense || [""];
    return interdata?.map((itm) => {
      let categoriesArray = itm.categories ? itm.categories.split(",") : [];
      let updateditm = {
        ...itm,

        categories: categoriesArray.join(","),

        // attachment: (
        //   <div className="flex justify-center items-center">
        //     <img
        //       src={backendassetUrl + itm?.attachment}
        //       className="w-24 h-14 content-center flex object-contain"
        //     />
        //   </div>
        // ),

        ExpenseNo: (
          <p
            className="cursor-pointer text-pcol font-extrabold"
            onClick={(e) => {
              expenseRef.current = itm;
              dispatch(ExpenseAdvanceActions.getExpensesByExpenseNoInPopUp(true,`ExpenseNo=${itm?.ExpenseNo}`));
              setmodalFullOpen((prev) => !prev);
              setHide(true);
              setmodalHead(itm?.ExpenseNo);

              
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
                  dispatch(ExpenseAdvanceActions.getFillExpense());
                  setmodalHead("Edit Expense");
                  setmodalBody(
                    <>
                      <FillExpenseForm
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

        addRow: (
          <CstmButton
            className={"p-2"}
            child={
              <Button
                name="➕"
                classes="w-1/2 h-5 bg-green-500"
                onClick={() => {
                  expenseRef.current = itm;
                  setmodalHead("New expense under " + itm?.ExpenseNo);
                  setmodalBody(
                    <FillExpenseForm
                      isOpen={modalOpen}
                      setIsOpen={setmodalOpen}
                      resetting={true}
                      dataItm={itm}
                      formValue={{}}
                      expenseRef={expenseRef}
                    />
                  );

                  setmodalOpen(true);
                }}
              />
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
                        classes="w-15 bg-green-500"
                        onClick={() => {
                          dispatch(
                            CommonActions.deleteApiCaller(
                              `${Urls.expAdv_fill_expense}/${itm.uniqueId}`,
                              () => {
                                dispatch(
                                  ExpenseAdvanceActions.getFillExpense()
                                );
                                dispatch(ALERTS({ show: false }));
                              }
                            )
                          );
                        }}
                        name={"OK"}
                      />,
                      <Button
                        classes="w-24"
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
    let interdata = state?.expenseAdvanceData?.getFillExpense || [];
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
      {
        name: "Expense No.",
        value: "ExpenseNo",
        style: "min-w-[200px] max-w-[200px] text-center sticky left-0 bg-[#3e454d]",
      },  
      ...(!hide
        ? [
          {
            name: "Customer",
            value: "customerName",
            style: "min-w-[140px] max-w-[450px] text-center",
          },
        ]
        : []),  
      {
        name: "Cost Center",
        value: "costcenter",
        style: "min-w-[140px] max-w-[450px] text-center",
      },
      {
        name: "Project ID",
        value: "projectIdName",
        style: "min-w-[200px] max-w-[450px] text-center",
      },
      {
        name: "Site ID",
        value: "Site_Id",
        style: "min-w-[120px] max-w-[450px] text-center",
      },
      {
        name: "Task Name",
        value: "Task",
        style: "min-w-[200px] max-w-[450px] text-center",
      },
      
      {
        name: "Amount",
        value: "Amount",
        style: "min-w-[120px] max-w-[450px] text-center",
      },
      ...( !hide ? [

    ] : [
      {
        name: "ClaimType",
        value: "ClaimType",
        style: "min-w-[150px] max-w-[200px] text-center",
      },
      {
        name: "Category",
        value: "categories",
        style: "min-w-[140px] max-w-[450px] text-center",
      },
      {
        name: "Claim Date",
        value: "expenseDate",
        style: "min-w-[140px] max-w-[450px] text-center",
      },
      {
        name: "Bill Number",
        value: "billNumber",
        style: "min-w-[120px] max-w-[450px] text-center",
      },
      {
        name: "Start Km",
        value: "startKm",
        style: "min-w-[100px] max-w-[450px] text-center",
      },
      {
        name: "end Km",
        value: "endKm",
        style: "min-w-[100px] max-w-[450px] text-center",
      },
      {
        name: "Start Location",
        value: "startLocation",
        style: "min-w-[100px] max-w-[450px] text-center",
      },
      {
        name: "End Location",
        value: "endLocation",
        style: "min-w-[100px] max-w-[450px] text-center",
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
        name: "Submission Date",
        value: "SubmissionDate",
        style: "min-w-[120px] max-w-[450px] text-center",
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
      {
        name: "Status",
        value: "status",
        style: "min-w-[120px] max-w-[450px] text-center",
      },
      ...( !hide ? [{
        name: "Add Row",
        value: "addRow",
        style: "min-w-[100px] max-w-[100px] text-center",
      },

    ] : [
      {
        name: "Edit",
        value: "edit",
        style: "min-w-[100px] max-w-[100px] text-center",
      },
      {
        name: "Delete",
        value: "delete",
        style: "min-w-[100px] max-w-[100px] text-center",
      },
    ]),

      
    ],
    properties: {
      rpp: [10, 20, 50, 100],
    },
    filter: [
      // {
      //     label: "Role",
      //     type: "select",
      //     name: "rolename",
      //     option: roleList,
      //     props: {
      //     }
      // }
    ],
  };

  const onSubmit = (data) => {
    let value = data.reseter;
    delete data.reseter;
    dispatch(
      ExpenseAdvanceActions.getFillExpense(value, objectToQueryString(data))
    );
  };

  useEffect(() => {
    
    dispatch(AdminActions.getManageExpenseAdvance());
    dispatch(
      ExpenseAdvanceActions.getExpADvPrjectDetails()
    );
    dispatch(ExpenseAdvanceActions.getFillExpense());
    // dispatch(ExpenseAdvanceActions.getExpensesByExpenseNoInPopUp());
  }, []);

  return (
    <>
      <AdvancedTableRow
        headerButton={
          <div className="flex gap-1">
            <Button
              classes="w-auto"
              onClick={(e) => {
                setmodalOpen((prev) => !prev);
                setmodalHead("Add Expense");
                setmodalBody(
                  <FillExpenseForm
                    isOpen={modalOpen}
                    setIsOpen={setmodalOpen}
                    resetting={true}
                    formValue={{}}
                  />
                );
              }}
              name={"Add Expense"}
            ></Button>
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
        heading = {"Total Expense:- "}
      />

      <Modal
        size={"smsh"}
        modalHead={modalHead}
        children={modalBody}
        isOpen={modalOpen}
        setIsOpen={setmodalOpen}
      />

      <Modal
        size={"full"}
        modalHead={modalHead}
        children={ <AdvancedTableRow
        headerButton={<div className="flex gap-1"></div>}
          // table={{
          //   ...table,
          //   columns: [...table.columns].splice(table.columns.length - 3, 0, {
          //     name: "Add Row",
          //     value: "addRow",
          //     style: "min-w-[100px] max-w-[100px] text-center",
          //   }),
          // }}
          table={table}
          filterAfter={onSubmit}
          tableName={"UserListTable"}
          handleSubmit={handleSubmit}
          // data={dbConfigListL}
          data={dbConfigListL?.map((item, index) => {
            return {
              ...item,
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
                              `attachment=${item?.attachment}`,
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
                        setmodalHead("Attachment Preview: "+ item?.ExpenseNo);
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
                        setmodalFullOpen((prev) => !prev);
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
          showTotalCount = {false}
        />}
        isOpen={modalFullOpen}
        setIsOpen={setmodalFullOpen}
      />
    </>
  );
};

export default FillExpense;
