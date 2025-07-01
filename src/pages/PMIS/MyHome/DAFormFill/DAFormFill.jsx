import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import EditButton from "../../../../components/EditButton";
import AdvancedTable from "../../../../components/AdvancedTable";
import Modal from "../../../../components/Modal";
import Button from "../../../../components/Button";
import DeleteButton from "../../../../components/DeleteButton";
import CstmButton from "../../../../components/CstmButton";
import { objectToQueryString } from "../../../../utils/commonFunnction";
import { ALERTS } from "../../../../store/reducers/component-reducer";
import CommonActions from "../../../../store/actions/common-actions";
import { Urls, backendassetUrl, baseUrl } from "../../../../utils/url";
import FileUploader from "../../../../components/FIleUploader";
import ExpenseAdvanceActions from "../../../../store/actions/expenseAdvance-actions";
import { useNavigate } from "react-router-dom";
import DAFormFillFORM from "./DAFormFillFORM";
import DownloadButton from "../../../../components/DownloadButton";

const DAFormFill = () => {
  const [modalOpen, setmodalOpen] = useState(false);
  const [fileOpen, setFileOpen] = useState(false);
  const [modalBody, setmodalBody] = useState(<></>);
  const [modalHead, setmodalHead] = useState(<></>);

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

  let dbConfigList = useSelector((state) => {
    let interdata = state?.expenseAdvanceData?.getDAFill || [""];
    return interdata?.map((itm) => {
      console.log("itmitmitm", itm);
      let updateditm = {
        ...itm,

        edit: (
          <CstmButton
            className={"p-2"}
            child={
              <EditButton
                name={""}
                onClick={() => {
                  setmodalOpen(true);
                  // dispatch(ExpenseAdvanceActions.getDAFill(true,`${itm?.uniqueId}`))
                  dispatch(ExpenseAdvanceActions.getDAFill(itm?.uniqueId));
                  // dispatch(ExpenseAdvanceActions.getExpenseDACostCenter(true,`projectId=${e.target.value}`));
                  setmodalHead("Edit DA");
                  setmodalBody(
                    <>
                      <DAFormFillFORM
                        isOpen={modalOpen}
                        setIsOpen={setmodalOpen}
                        resetting={false}
                        formValue={itm}
                      />
                      {/* <div className='mx-3'><Button name={"Submit"} classes={""} onClick={(handleSubmit(onTableViewSubmit))} /></div> */}
                    </>
                  );
                  dispatch(ExpenseAdvanceActions.getDAFill());
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
                        classes="w-15 bg-rose-400"
                        onClick={() => {
                          dispatch(
                            CommonActions.deleteApiCaller(
                              `${Urls.expAdv_DA_Fill}/${itm.uniqueId}`,
                              () => {
                                dispatch(ExpenseAdvanceActions.getDAFill());
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
    let interdata = state?.expenseAdvanceData?.getDAFill || [];
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
        name: "Employee Code",
        value: "employeeCode",
        style:
          "min-w-[170px] max-w-[450px] text-center sticky left-0 bg-[#3e454d] z-10",
      },
      {
        name: "Employee Name",
        value: "employeeName",
        style:
          "min-w-[150px] max-w-[450px] text-center sticky left-[169px] bg-[#3e454d] z-10",
      },
      {
        name: "DA Date",
        value: "Claim_Date",
        style: "min-w-[100px] max-w-[450px] text-center",
      },
      {
        name: "Customer",
        value: "customerName",
        style: "min-w-[130px] max-w-[450px] text-center",
      },
      {
        name: "Cost Center",
        value: "costcenterName",
        style: "min-w-[130px] max-w-[450px] text-center",
      },
      {
        name: "Project ID",
        value: "projectIdName",
        style: "min-w-[170px] max-w-[450px] text-center",
      },
      {
        name: "DA Amount",
        value: "Amount",
        style: "min-w-[110px] max-w-[450px] text-center",
      },
      {
        name: "Remarks",
        value: "remark",
        style: "min-w-[370px] max-w-[450px] text-center",
      },
      {
        name: "Additional Info",
        value: "additionalInfo",
        style: "min-w-[370px] max-w-[450px] text-center",
      },
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
    ],
    properties: {
      rpp: [10, 20, 50, 100],
    },
    filter: [
      {
        label: "Approval Status",
        type: "select",
        name: "status",
        option: [],
        // props: {
        // }
      },
    ],
  };

  const onSubmit = (data) => {
    let value = data.reseter;
    delete data.reseter;
    dispatch(ExpenseAdvanceActions.getDAFill(value, objectToQueryString(data)));
  };

  useEffect(() => {
    dispatch(ExpenseAdvanceActions.getDAFill());
  }, []);

  const onTableViewSubmit = (data) => {
    data["fileType"] = "ManageClaimType";
    dispatch(
      CommonActions.fileSubmit(Urls.common_file_uploadr, data, () => {
        dispatch(ExpenseAdvanceActions.getDAFill());
        setFileOpen(false);
      })
    );
  };
  return (
    <>
      <AdvancedTable
        headerButton={
          <div className="flex gap-1">
            <Button
              classes="mr-1"
              onClick={(e) => {
                setmodalOpen((prev) => !prev);
                setmodalHead("Add DA");
                setmodalBody(
                  <DAFormFillFORM
                    resetting={true}
                    isOpen={modalOpen}
                    setIsOpen={setmodalOpen}
                    formValue={{}}
                  />
                );
              }}
              name={"Add DA"}
            ></Button>

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
        heading={"Total:-"}
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

export default DAFormFill;
