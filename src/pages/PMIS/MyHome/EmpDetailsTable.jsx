import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import EditButton from "../../../components/EditButton";
import EmpDetails from "../MyHome/EmpDetails";
import AdvancedTable from "../../../components/AdvancedTable";
import Modal from "../../../components/Modal";
import Button from "../../../components/Button";
import DeleteButton from "../../../components/DeleteButton";
import CstmButton from "../../../components/CstmButton";
import { getAccessType, objectToQueryString } from "../../../utils/commonFunnction";
import { ALERTS } from "../../../store/reducers/component-reducer";
import CommonActions from "../../../store/actions/common-actions";
import { Urls} from "../../../utils/url";
import HrActions from "../../../store/actions/hr-actions";
import { useNavigate} from "react-router-dom";
import FileUploader from "../../../components/FIleUploader";
import { GET_EMPLOYEE_DETAILS } from "../../../store/reducers/hr-reduces";
import AdminActions from "../../../store/actions/admin-actions";
import ConditionalButton from "../../../components/ConditionalButton";
import { GET_CITIES, GET_MANAGE_COST_CENTER, GET_MANAGE_DEPARTMENT, GET_MANAGE_DESIGNATION } from "../../../store/reducers/admin-reducer";

const EmpDetailsTable = () => {
  const [modalOpen, setmodalOpen] = useState(false);
  const [modalBody, setmodalBody] = useState(<></>);
  const [type, settype] = useState(false);
  const [fileOpen, setFileOpen] = useState(false);
  const [fileOpen2, setFileOpen2] = useState(false);
  const [fileOpen3, setFileOpen3] = useState(false);
  const [modalHead, setmodalHead] = useState(<></>);
  const [strVal, setstrVal] = useState(false);

  let dispatch = useDispatch();

  let navigate = useNavigate();

  const currentDate = new Date();
  const dt = currentDate.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).replace(/\//g, '-')

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setValues,
    getValues,
    formState: { errors },
  } = useForm();

  let roleList = useSelector((state) => {
    return state?.adminData?.getManageProfile.map((itm) => {
      return {
        label: itm?.roleName,
        value: itm?.uniqueId,
      };
    });
  });


  let costCenterList = useSelector((state) => {
    return state?.adminData?.getManageCostCenter.map((itm) => {
      return {
        label: itm?.costCenter,
        value: itm._id,
      };
    });
  });
  
  let showType = getAccessType("Action(ManageEmployee)")

  let shouldIncludeEditColumn = false

  if (showType === "visible"){
    shouldIncludeEditColumn = true
  }

  let dbConfigList = useSelector((state) => {
    console.log(state, "state statejjjj");
    let interdata = state?.hrReducer?.getManageEmpDetails;
    return interdata?.map((itm) => {
      let updateditm = {
        ...itm,
        edit: (
          <CstmButton
            className={"p-2"}
            child={
              <EditButton
                name={""}
                onClick={() => {
                  dispatch(GET_CITIES({dataAll:[],reset:true}))
                  dispatch(GET_EMPLOYEE_DETAILS({ dataAll:[], reset: true}));
                  dispatch(GET_MANAGE_DEPARTMENT({ dataAll:[], reset:true}));
                  dispatch(GET_MANAGE_DESIGNATION({ dataAll:[], reset:true }));
                  dispatch(GET_MANAGE_COST_CENTER({ dataAll:[], reset:true }));
                  dispatch(AdminActions.getCities(true, `stateCode=${itm?.state}`));
                  if (itm.customer){
                    dispatch(AdminActions.getManageDepartment(true,"",itm.customer));
                    dispatch(AdminActions.getManageDesignation(true,"",itm.customer));
                    dispatch(AdminActions.getManageCostCenter(true,"",itm.customer));
                  }
                  navigate(`/empdetails/${itm.uniqueId}`);
                  setmodalBody(
                    <>
                      <EmpDetails resetting={false} formValue={itm} />
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
                            CommonActions.deleteApiCallerBulk(
                              `${Urls.admin_empdetails}`,
                              {
                                ids:[itm.uniqueId]
                              },
                              () => {
                                dispatch(HrActions.getManageEmpDetails());
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
    let interdata = state?.hrReducer?.getManageEmpDetails;
    console.log(interdata,1234567)
    if (interdata.length > 0) {
      return interdata[0]["overall_table_count"];
    } else {
      return 0;
    }
  });

  

  let table = {
    columns: [
      {
        name: "Emp Name",
        value: "empName",
        style: "min-w-[200px] max-w-[200px] font-extrabold text-center sticky left-0 bg-[#3e454d]",
      },
      {
        name: "Emp Code",
        value: "empCode",
        style: "min-w-[150px] max-w-[450px] text-center sticky left-[199px] bg-[#3e454d]",
      },
      {
        name: "Email ID",
        value: "email",
        style: "min-w-[250px] max-w-[450px] text-center",
      },
      {
        name: "Mobile No.",
        value: "mobile",
        style: "min-w-[120px] max-w-[450px] text-center",
      },
      {
        name: "Grade",
        value: "designationName",
        style: "min-w-[100px] max-w-[450px] text-center",
      },
      {
        name: "PMIS Role",
        value: "userRoleName",
        style: "min-w-[120px] max-w-[450px] text-center",
      },
      {
        name: "Status",
        value: "status",
        style: "min-w-[100px] max-w-[450px] text-center",
      },     
      ...(shouldIncludeEditColumn
        ? [
            {
              name: "Edit",
              value: "edit",
              style: "min-w-[100px] max-w-[200px] text-center",
            },
            {
              name: "Delete",
              value: "delete",
              style: "min-w-[100px] max-w-[100px] text-center",
            },
          ]
        : [])
      // {
      //     name: "View",
      //     value: "view",
      //     style: "min-w-[100px] max-w-[100px] text-center"
      // }
    ],
    properties: {
      rpp: [10, 20, 50, 100],
    },
    filter: [
      {
          label: "EMP Name",
          type: "text",
          name: "empName",
          props: {
          }
      },
      {
          label: "EMP Code",
          type: "text",
          name: "empCode",
          props: {
          }
      },
      {
          label: "PMIS Role",
          type: "select",
          name: "pmisRole",
          props: {
          },
          option:roleList
      },
      {
          label: "Status",
          type: "select",
          name: "status",
          option: [
            { label: "Active", value: "Active" },
            { label: "Resign", value: "Resign" },
            { label: "Abscond", value: "Abscond" },
            { label: "Exit", value: "Exit" },
          ],
          props: {}
      },
    ],
  };
  const onSubmit = (data) => {
    let shouldReset = data.reseter;
    delete data.reseter;
    let strVal=objectToQueryString(data)
    setstrVal(strVal)
    dispatch(HrActions.getManageEmpDetails(shouldReset,'', strVal));
  };

  useEffect(() => {
    dispatch(HrActions.getManageEmpDetails());
    dispatch(AdminActions.getManageProfile());
    dispatch(AdminActions.getManageCostCenter())

  }, []);
  

  const onTableViewSubmit = (data) => {
    data["fileType"] = "ManageEmployee";
    dispatch(
      CommonActions.fileSubmit(Urls.common_file_uploadr, data, () => {
        dispatch(HrActions.getManageEmpDetails());
        setFileOpen(false);
        resetting("");
      })
    );
  };
  const onTableViewSubmit2 = (data) => {
    data["fileType"] = "UpgradeEmployee";
    console.log('datadatadatadatadata',data)
    dispatch(
      CommonActions.fileSubmit(Urls.common_file_uploadr, data, () => {
        dispatch(HrActions.getManageEmpDetails());
        setFileOpen2(false);
        resetting("");
      })
    );
  };
  const onTableViewSubmit3 = (data) => {
    data["fileType"] = "UpgradeEmployeeWithEmpCode";
    
    dispatch(
      CommonActions.fileSubmit(Urls.common_file_uploadr, data, () => {
        dispatch(HrActions.getManageEmpDetails());
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
            {" "}
            <ConditionalButton 
              showType={getAccessType("Add New(ManageEmployee)")}
              classes="w-auto mr-1"
              onClick={() => {
                dispatch(GET_EMPLOYEE_DETAILS({ dataAll: [], reset: true, }));
                navigate(`${"/empdetails"}`);
              }}
              name={"Add New"}
            ></ConditionalButton>

            <ConditionalButton
            showType={getAccessType("Upload(ManageEmployee)")}
              name={"Upload"}
              classes="w-auto mr-1"
              onClick={(e) => {
                setFileOpen((prev) => !prev);
              }}
            ></ConditionalButton>
            <ConditionalButton
            showType={getAccessType("Upgrade(ManageEmployee)")}
              name={"Upgrade"}
              classes="w-auto mr-1"
              onClick={(e) => {
                setFileOpen2((prev) => !prev);
              }}
            ></ConditionalButton>
            <ConditionalButton
            showType={getAccessType("Upgrade(ManageEmployee)")}
              name={"Upgrade Email"}
              classes="w-auto mr-1"
              onClick={(e) => {
                setFileOpen3((prev) => !prev);
              }}
            ></ConditionalButton>
            
          </div>
        }
        table={table}
        exportButton={["/export/manageEmployee"+"?"+strVal,"Export_Employee("+dt+").xlsx"]}
        filterAfter={onSubmit}
        tableName={"ManageEmployee"}
        handleSubmit={handleSubmit}
        data={dbConfigList}
        errors={errors}
        register={register}
        setValue={setValue}
        getValues={getValues}
        totalCount={dbConfigTotalCount}
        checkboxshow = {shouldIncludeEditColumn}
        delurl = {Urls.admin_empdetails}
        geturl = {HrActions.getManageEmpDetails()}
        getaccessExport = {"Export(ManageEmployee)"}
        heading = {"Total Employee:-"}
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
        tempbtn={true} tempbtnlink = {["/template/ManageEmployee.xlsx","ManageEmployee.xlsx"]}
        head = {"Upload File"}
      />
      <FileUploader
        isOpen={fileOpen2}
        fileUploadUrl={""}
        onTableViewSubmit={onTableViewSubmit2}
        setIsOpen={setFileOpen2}
        tempbtn={true} tempbtnlink = {["/template/ManageEmployee.xlsx","ManageEmployee.xlsx"]}
        head = {"Upload Upgrade File"}
      />
      <FileUploader
        isOpen={fileOpen3}
        fileUploadUrl={""}
        onTableViewSubmit={onTableViewSubmit3}
        setIsOpen={setFileOpen3}
        tempbtn={true} tempbtnlink = {["/template/UpgradeEmployee2.xlsx","UpgradeEmployee2.xlsx"]}
        head = {"Upload Upgrade File"}
      />
    </>
  );
};

export default EmpDetailsTable;
