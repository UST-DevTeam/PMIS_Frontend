import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Unicons from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import EditButton from "../../../../components/EditButton";
import AdvancedTable from "../../../../components/AdvancedTable";
import { UilImport } from "@iconscout/react-unicons";
import Modal from "../../../../components/Modal";
import Button from "../../../../components/Button";
import DeleteButton from "../../../../components/DeleteButton";
import CstmButton from "../../../../components/CstmButton";
import ToggleButton from "../../../../components/ToggleButton";
import { objectToQueryString } from "../../../../utils/commonFunnction";
import { ALERTS } from "../../../../store/reducers/component-reducer";
import CommonActions from "../../../../store/actions/common-actions";
import { Urls, backendassetUrl, baseUrl } from "../../../../utils/url";
import AdminActions from "../../../../store/actions/admin-actions";
import FileUploader from "../../../../components/FIleUploader";
import ExpenseAdvanceActions from "../../../../store/actions/expenseAdvance-actions";
import FillAdvanceForm from "../../../../pages/PMIS/MyHome/ClaimAdvAdvanceForm/FillAdvanceForm";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import ClaimAdvanceForm from "./ClaimAdvanceForm";
import DownloadButton from "../../../../components/DownloadButton";
import FillExpenseForm from "../ClaimAdvExpenseForm/FillExpenseForm";

const ClaimAdvanceOnclick = () => {
  const [modalOpen, setmodalOpen] = useState(false);
  const [fileOpen, setFileOpen] = useState(false);
  const [modalBody, setmodalBody] = useState(<></>);
  const [modalHead, setmodalHead] = useState(<></>);
  const [claimByNumber, setClaimByNumber] = useState([]);
  const { id } = useParams();

  const navigate = useNavigate();

  let dispatch = useDispatch();

  const currentDate = new Date();
  const dt = currentDate
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    .replace(/\//g, "-");

  let dbConfigTotalCount = useSelector((state) => {
    let interdata = state?.expenseAdvanceData?.getClaimAndAdvancebyNumber || [];
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
        name: "Month-Year",
        value: "expensemonth",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Claim/Advance/Settlement Date",
        value: "expenseDate",
        style: "min-w-[180px] max-w-[100px] text-center",
      },
      {
        name: "Claim/Advance/Settlement ID",
        value: "name",
        style:
          "min-w-[180px] max-w-[100px] text-center sticky left-0 bg-[#3e454d]",
      },
      
      {
        name: "Designation",
        value: "designation",
        style: "min-w-[150px] max-w-[100px] text-center",
      },
      {
        name: "Claim/Advance/Settlement Type",
        value: "types",
        style: "min-w-[150px] max-w-[100px] text-center",
      },
      {
        name: "Category",
        value: "categories",
        style: "min-w-[150px] max-w-[100px] text-center",
      },
      {
        name: "Start Km",
        value: "startKm",
        style: "min-w-[150px] max-w-[100px] text-center",
      },
      {
        name: "End Km",
        value: "endKm",
        style: "min-w-[150px] max-w-[100px] text-center",
      },
      {
        name: "Total Distance",
        value: "Total_distance",
        style: "min-w-[150px] max-w-[100px] text-center",
      },
      {
        name: "Check-IN Date",
        value: "checkInDate",
        style: "min-w-[130px] max-w-[450px] text-center ",
      },
      {
        name: "Check-Out Date",
        value: "checkOutDate",
        style: "min-w-[130px] max-w-[450px] text-center ",
      },
      {
        name: "Total Days",
        value: "totaldays",
        style: "min-w-[130px] max-w-[450px] text-center ",
      },
      {
        name: "Project ID",
        value: "projectIdName",
        style: "min-w-[150px] max-w-[100px] text-center",
      },
      {
        name: "Employee Name",
        value: "empName",
        style: "min-w-[150px] max-w-[100px] text-center",
      },
      {
        name: "Employee code",
        value: "empCode",
        style: "min-w-[150px] max-w-[100px] text-center",
      },
      {
        name: "Customer",
        value: "customerName",
        style: "min-w-[140px] max-w-[250px] text-center",
      },
      {
        name: "Cost Center",
        value: "costcenter",
        style: "min-w-[130px] max-w-[450px] text-center ",
      },
      {
        name: "Claimed Amount",
        value: "Amount",
        style: "min-w-[200px] max-w-[100px] text-center",
      },
      {
        name: "Approved Amount",
        value: "ApprovedAmount",
        style: "min-w-[200px] max-w-[100px] text-center",
      },
      {
        name: "Bill Number",
        value: "billNumber",
        style: "min-w-[200px] max-w-[100px] text-center",
      },
      {
        name: "Status",
        value: "customStatus",
        style: "min-w-[250px] max-w-[450px] text-center",
      },
      {
        name: "Additional Info",
        value: "additionalInfo",
        style: "min-w-[200px] max-w-[100px] text-center",
      },
      {
        name: "Remarks",
        value: "remark",
        style: "min-w-[200px] max-w-[100px] text-center",
      },
      {
        name: "Edit",
        value: "edit",
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
      ExpenseAdvanceActions.getFillAdvance(value, objectToQueryString(data))
    );
  };

  useEffect(() => {
    dispatch(AdminActions.getManageExpenseAdvance());
    const name = sessionStorage.getItem("claimName");
    dispatch(
      ExpenseAdvanceActions.getClaimAndAdvancebyNumber(
        true,
        `Number=${name}`,
        (data) => setClaimByNumber(data)
      )
    );
  }, [id, dispatch, modalOpen]);

  const onTableViewSubmit = (data) => {
    data["fileType"] = "ManageClaimType";
    dispatch(
      CommonActions.fileSubmit(Urls.common_file_uploadr, data, () => {
        dispatch(ExpenseAdvanceActions.getFillAdvance());
        setFileOpen(false);
      })
    );
  };
  return (
    <>
      <AdvancedTable
        headerButton={
          <div className="flex gap-1">
            {/* <Button
              classes="w-auto"
              onClick={(e) => {
                navigate("/home/claimAndAdvance")
              }}
              name={"Back"}
            ></Button> */}
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
        data={
          claimByNumber?.length > 0
            ? claimByNumber?.map((item) => {
              console.log('itemitemitem',item)
                return {
                  ...item,
                  edit: (
                    <CstmButton
                      className={"p-2"}
                      child={
                        <EditButton
                          name={""}
                          onClick={() => {
                            if (item.type === "Settlement") {
                              // alert("You are not Authorized to Edit!");
                              // return; 
                              let msgdata = {
                                show: true,
                                icon: "error",
                                buttons: [],
                                type: 1,
                                text: "You Are Not Authorize to Edit !",
                            };
                            dispatch(ALERTS(msgdata));
                            return;
                            }
                            setmodalOpen(true);
                            // dispatch(AdminActions.getManageExpenseAdvance());
                            setmodalHead(
                              item.name +
                                " : " +
                                `Approved Amount : ${item.Amount}`
                            );
                            if (
                              item.advanceType === "Project Advance" ||
                              item.type === "Advance"
                            ) {
                              setmodalBody(
                                <>
                                  <FillAdvanceForm
                                    isOpen={modalOpen}
                                    setIsOpen={setmodalOpen}
                                    resetting={false}
                                    formValue={item}
                                  />
                                </>
                              );
                            } else if (
                              item.advanceType !== "Project Advance" ||
                              item.type === "Expense"
                            ) {
                              dispatch(AdminActions.getManageExpenseAdvance());
                              dispatch(
                                ExpenseAdvanceActions.getExpADvPrjectDetails()
                              );
                              setmodalBody(
                                <>
                                  <FillExpenseForm
                                    isOpen={modalOpen}
                                    setIsOpen={setmodalOpen}
                                    resetting={false}
                                    formValue={item}
                                  />
                                </>
                              );
                            }
                          }}
                        ></EditButton>
                      }
                    />
                  ),
                };
              })
            : ""
        }
        errors={errors}
        register={register}
        setValue={setValue}
        getValues={getValues}
        totalCount={dbConfigTotalCount}
      />

      <Modal
        size={"xlss"}
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

export default ClaimAdvanceOnclick;
