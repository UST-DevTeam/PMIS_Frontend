import React, { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { UilImport } from "@iconscout/react-unicons";
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
import ExpenseAdvanceActions from "../../../../store/actions/expenseAdvance-actions";
import { Urls, backendassetUrl, baseUrl } from "../../../../utils/url";
import AdminActions from "../../../../store/actions/admin-actions";
import { useNavigate, useNavigation, useParams } from "react-router-dom";
import ClaimAdvanceForm from "./ClaimAdvanceForm";
import DownloadButton from "../../../../components/DownloadButton";
import jsPDF from "jspdf";
import ConditionalButton from "../../../../components/ConditionalButton";
import PopupMenu from "../../../../components/PopupMenu";

const ClaimAndAdvance = () => {

  const expenseRef = useRef("");
  const [modalOpen, setmodalOpen] = useState(false);
  const [claimByNumber, setClaimByNumber] = useState([]);
  const [modalFullOpen, setmodalFullOpen] = useState(false);
  const [modalBody, setmodalBody] = useState(<></>);
  const [modalHead, setmodalHead] = useState(<></>);
  const [hide, setHide] = useState(false);

  const navigate = useNavigate();

  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(ExpenseAdvanceActions.getClaimAndAdvance());
    // dispatch(ExpenseAdvanceActions.getFillExpensesss());
  }, []);

  let Amounts = useSelector((state) => {
    let interdata = state?.expenseAdvanceData?.getClaimAndAdvance;
    if (interdata.length > 0) {
      return interdata[0];
    } else {
      return 0;
    }
  });

  let dbConfigList = useSelector((state) => {
    let interdata = state?.expenseAdvanceData?.getClaimAndAdvance || [""];
    console.log(
      state?.expenseAdvanceData,
      "stateexpenseAdvanceData",
      interdata[0]?.data,
      typeof interdata[0]
    );
    let interdata2 = [];
    if (interdata.length > 0) {
      interdata2 = interdata[0]?.data || [];
    }
    return interdata2?.map((item) => {
      console.log('itemitemitem',item)
      const itm = { ...item };
      itm["debitExpense"] = 0;
      itm.advanceExpense = 0;
      if (itm?.type == "Expense" || itm?.type === "Daily Allowance") {
        itm.debitExpense = itm?.totalApprovedAmountRow;
      } else if (itm?.type !== "Expense" || itm?.type !== "Daily Allowance") {
        itm.advanceExpense = itm?.totalApprovedAmountRow;
      }

      let updateditm = {
        ...itm,

        name: (
          <p
            className={`cursor-pointer font-extrabold ${
              itm.type === "Expense" ? "text-rose-400" : "text-pcol"
            }`}
            onClick={(e) => {
              expenseRef.current = itm;
              sessionStorage.setItem("claimName", itm?.name);
              navigate(
                `/home/claimAndAdvance/claimAndAdvanceOnclick/${item?._id}`
              );
            }}
          >
            {itm.name}
          </p>
        ),
        customStatus: (
          <p
            className={`cursor-pointer font-extrabold ${
              [3, 5, 7].includes(itm?.customisedStatus)
                ? "text-rose-400"
                : "text-pcol"
            }`}
          >
            {itm.customStatus}
          </p>
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
                        classes="w-15 bg-rose-400"
                        onClick={() => {
                          dispatch(
                            CommonActions.deleteApiCaller(
                              `${Urls.expAdv_claim_and_advance}/${itm.uniqueId}`,
                              () => {
                                dispatch(
                                  ExpenseAdvanceActions.getClaimAndAdvance()
                                );
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
                  dispatch(
                    CommonActions.commondownload(
                      "/expenses/DownloadAttachment" +
                        "?" +
                        `expenseId=${itm.name}`,
                      "expense.pdf"
                    )
                  );
                }}
              ></DownloadButton>
            }
          />
        ),
      };
      return updateditm;
    });
  });

  useEffect(() => {
    if (!modalFullOpen) {
      setHide(false);
    }
  }, [modalFullOpen]);

  let dbConfigTotalCount = useSelector((state) => {
    let interdata = state?.expenseAdvanceData?.getClaimAndAdvance || [""];
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
        name: "Customer",
        value: "customerName",
        style:"min-w-[130px] max-w-[200px] text-center",
      },
      {
        name: "Cost Center",
        value: "costCenter",
        style: "min-w-[130px] max-w-[450px] text-center",
      },
      
      {
        name: "Expanse/Advance/Settlement ID",
        value: "name",
        style:
          "min-w-[230px] max-w-[450px] text-center sticky left-0 bg-[#3e454d]",
      },
      {
        name: "Submission Date",
        value: "AddedAt",
        style:
          "min-w-[170px] max-w-[450px] text-center left-[110px] bg-[#3e454d]",
      },
      {
        name: "Claim Date",
        value: "submissionDate",
        style: "min-w-[250px] max-w-[450px] text-center",
      },
      
      
      {
        name: "Credit(Expanse)",
        value: "debitExpense",
        style: "min-w-[250px] max-w-[450px] text-center",
      },
      {
        name: "Debit(Advance)",
        value: "advanceExpense",
        style: "min-w-[250px] max-w-[450px] text-center",
      },
      {
        name: "Status",
        value: "customStatus",
        style: "min-w-[250px] max-w-[450px] text-center",
      },
      {
        name: "Last Action Date",
        value: "actionAt",
        style: "min-w-[250px] max-w-[450px] text-center",
      },
      {
        name: "Attachment",
        value: "attachment",
        style: "min-w-[250px] max-w-[450px] text-center",
      },
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
      ExpenseAdvanceActions.getClaimAndAdvance(value, objectToQueryString(data))
    );
  };

  return (
    <>
      <div className="flex flex-col md:flex-row text-sm space-y-2 md:space-y-0 md:space-x-2">
      <p className="p-2 text-white font-extrabold">
            Opening balance :{" "}
            <span className={`font-extrabold ${Amounts?.Openingbalance > 0 ? "text-pcol" : "text-rose-400"}`}>
            {Amounts?.Openingbalance > 0 
              ? `${Amounts?.Openingbalance} Dr` 
              : Amounts?.Openingbalance < 0 
              
              ? `${Math.abs(Amounts?.Openingbalance)} Cr`
              : Amounts?.Openingbalance}
            </span>
        </p>
        
        <p className="p-2 text-white font-extrabold">
          Expanse Approved :{" "}
          <span className={`font-extrabold ${Amounts?.ExpenseAmountTotal ? "text-rose-400" : "text-pcol"}`}>
           
            {`${Amounts?.ExpenseAmountTotal} Cr`}
          </span>
        </p>
        <p className="p-2 text-white font-extrabold">
          Advance Approved/Reimbursed :{" "}
          <span className={`font-extrabold ${Amounts?.AdvanceAmountTotal > 0 ? "text-pcol" : "text-rose-400"}`}>
            
            {`${Amounts?.AdvanceAmountTotal} Dr`}
          </span>
        </p>
        
        <p className="p-2 text-white font-extrabold">
          Current Balance :{" "}
          {/* <span className={`font-extrabold ${Amounts?.finalAmount > 0 ? "text-rose-400" : "text-pcol"}`}>
            {Amounts?.finalAmount}
          </span> */}
          <span className={`font-extrabold ${Amounts?.finalAmount > 0 ? "text-pcol" : "text-rose-400"}`}>
            {Amounts?.finalAmount < 0 
              ? `${Math.abs(Amounts.finalAmount)} Cr` 
              : `${Amounts?.finalAmount} Dr`
            }
          </span>
        </p>


        {/* <p className="p-2 text-white font-extrabold">
        Settlement Amount:{" "}
          <span className={`font-extrabold ${Amounts?.finalAmount > 0 ? "text-rose-400" : "text-pcol"}`}>
            {Amounts?.finalAmount}
          </span>
          <span className={`font-extrabold ${Amounts?.SettleAmountTotal > 0 ? "text-pcol" : "text-pcol"}`}>
            {Amounts?.SettleAmountTotal < 0 
              ? `${Math.abs(Amounts.SettleAmountTotal)}` 
              : `${Amounts?.SettleAmountTotal}`
            }
          </span>
        </p> */}
        
        
      </div>

      <div className="mb-20">
        <AdvancedTable
          headerButton={
            <>
              <Button
                onClick={() => {
                  navigate(`${"/home/claimAndAdvance/Expense"}`);
                }}
                name={"Fill Expense"}
              ></Button>

              <Button
                classes="ml-1"
                onClick={() => {
                  navigate(`${"/home/claimAndAdvance/Advance"}`);
                }}
                name={"Fill Advance"}
              ></Button>
              <ConditionalButton
                showType={getAccessType("Fill DA")}
                classes="ml-1 mr-1"
                onClick={() => {
                  navigate(`${"/home/claimAndAdvance/DAFormFill"}`);
                }}
                name={"Fill DA"}
              ></ConditionalButton>

              




              <PopupMenu
              name={"Export"}
              icon={"Export"}
              classes={"w-auto"}
              bgColor={"bg-[#147b99]"}
              
              child={
                <div classes="z-40 max-h-70 justify-ce0nter w-2">
                  <Button
                    name={"Export Expenses"}
                    classes="w-auto m-3"
                    onClick={() => {
                      dispatch(
                        CommonActions.commondownload3(
                          "/export/UserExpenses",
                          "Export_Expenses.xlsx"
                        )
                      );
                    }}
                    >
                  </Button>
                  <Button
                    name={"Export Advances"}
                    classes="w-auto m-3"
                    onClick={() => {
                      dispatch(
                        CommonActions.commondownload3(
                          "/export/userAdvances",
                          "Export_Advances.xlsx"
                        )
                      );
                    }}
                    >
                  </Button>
                  <Button
                showType={getAccessType("Export(CA & ADV)")}
                classes="w-auto ml-1"
                onClick={() => {
                  dispatch(CommonActions.commondownload3("/export/ExpensesAndAdvance","Export_ExpensesAndAdvance.xlsx"))
                }}
                name={"Export Ledger Book"}
              ></Button> 
                <Button
                showType={getAccessType("Export(CA & ADV)")}
                classes="w-auto ml-1"
                onClick={() => {
                  dispatch(CommonActions.commondownload3("/export/currentBalance","Export_CurrentBalance.xlsx"))
                }}
                name={"Export Current Balance"}
              ></Button>  
                     
                     
                </div>
              }
            />


            </>
          }
          table={table}
          TableHeight = "h-[65vh]" 
          filterAfter={onSubmit}
          tableName={"UserListTable"}
          handleSubmit={handleSubmit}
          data={dbConfigList}
          errors={errors}
          register={register}
          setValue={setValue}
          getValues={getValues}
          totalCount={dbConfigTotalCount}
          showTotalCount = {false}
          getaccessExport={"Export(Claim&Advance)"}
        />
      </div>
      <Modal
        size={"full"}
        modalHead={modalHead}
        children={
          <AdvancedTable
            headerButton={<div className="flex gap-1"></div>}
            table={table}
            filterAfter={onSubmit}
            tableName={"UserListTable"}
            handleSubmit={handleSubmit}
            data={claimByNumber}
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
    </>
  );
};

export default ClaimAndAdvance;
