import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import AdvancedTable from "../../../components/AdvancedTable";
import { objectToQueryString } from "../../../utils/commonFunnction";
import AdminActions from "../../../store/actions/admin-actions";
import { useSearchParams } from "react-router-dom";
import CstmButton from "../../../components/CstmButton";
import DownloadButton from "../../../components/DownloadButton";
import ActionButton from "../../../components/ActionButton";
import RejectionButton from "../../../components/RejectionButton";
import { UilExclamationTriangle } from "@iconscout/react-unicons";
import Button from "../../../components/Button";
import Modal from "../../../components/Modal";
import CommonForm from "../../../components/CommonForm";
import ManageComplianceTemplateApproverForm from "../Admin/ManageCompliance/ManageComplinaceTemplateApproverForm";
import { GET_ONE_COMPLIANCE_DY_FORM } from "../../../store/reducers/admin-reducer";
import projectListActions from "../../../store/actions/projectList-actions";
import { GET_GLOBAL_COMPLAINCE_TYPE_APPROVER_DATA } from "../../../store/reducers/projectList-reducer";
import ManageApproverForm from "./ManageApproverForm";
import CommonActions from "../../../store/actions/common-actions";
import { Urls } from "../../../utils/url";
import ComplianceApprovalLog from "../../../components/ComplianceApprovalLogss";
import { COMPLIANCELOGLIST } from "../../../store/reducers/eventlogs-reducer";
import eventManagementActions from "../../../store/actions/eventLogs-actions";

const ComplianceL1ApproverTable = () => {
  const childFunction = useRef()
  const [URLSearchParams, setURLSearchParams] = useSearchParams();
  const route = URLSearchParams.get("from");
  const [modalOpen, setmodalOpen] = useState(false);
  const [modalBody, setmodalBody] = useState(<></>);
  const [modalHead, setmodalHead] = useState(<></>);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [modalFullOpen, setmodalFullOpen] = useState(false);
  const [rowId, setRowId] = useState(null);
  const [mileId, setMileId] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    setValues,
    getValues,
    formState: { errors },
  } = useForm();

  let dispatch = useDispatch();

  const currentDate = new Date();
  const dt = currentDate
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    .replace(/\//g, "-");

  function downloadAttachment(type,id,siteName,milestoneName) {
    dispatch(
      CommonActions.commondownload(`/compliance/export/${type}/${id}`,`${siteName}_${milestoneName}_(${dt})_report.${type === "Excel" ? "xlsx" : "pdf"}`)
    );
  }

  function callbackFoResetForm(cb = () => { }) {
    childFunction.current = cb
  }

  let dbConfigList = useSelector((state) => {
    let interdata = state?.adminData?.getComplianceMilestoneL1Approver || [""];
    return interdata?.map((itm) => {
      let updateditm = {
        ...itm,

        siteIdLink: (
          <p
            className="text-[#13b497] cursor-pointer font-extrabold"
            onClick={() => {
              if (childFunction.current) {
                childFunction.current()
              }

              setmodalFullOpen((prev) => !prev);

              setmodalHead(itm["siteIdName"]);
              dispatch(
                GET_ONE_COMPLIANCE_DY_FORM({ dataAll: [], reset: true })
              );
              dispatch(
                GET_GLOBAL_COMPLAINCE_TYPE_APPROVER_DATA({
                  dataAll: [],
                  reset: true,
                })
              );
              dispatch(
                AdminActions.getOneComplianceDyform(
                  itm.siteuid,
                  itm.milestoneName,
                  true,
                  ""
                )
              );
              dispatch(
                projectListActions.globalComplianceTypeApproverDataGet(
                  itm.uniqueId,
                  "",
                  true
                )
              );
              setmodalBody(
                <ManageComplianceTemplateApproverForm callbackFoResetForm={callbackFoResetForm} CompleteData={itm} approverType = {"L1"} />
              );
            }}
          >
            {itm["siteIdName"]}
          </p>
        ),
        attachmentDownload: (
          <CstmButton
            className={"p-2"}
            child={
              <div className="flex space-x-2 items-center">
                <Button
                  onClick={() => {
                    downloadAttachment("Excel", itm?.uniqueId,itm?.siteIdName,itm?.milestoneName);
                  }}
                  classes="!py-[2px] bg-green-600"
                  title="Download Excel"
                >
                  <svg
                    className="w-4 h-4 fill-white"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                    fill="rgba(29,29,29,1)"
                  >
                    <path d="M2.85858 2.87732L15.4293 1.0815C15.7027 1.04245 15.9559 1.2324 15.995 1.50577C15.9983 1.52919 16 1.55282 16 1.57648V22.4235C16 22.6996 15.7761 22.9235 15.5 22.9235C15.4763 22.9235 15.4527 22.9218 15.4293 22.9184L2.85858 21.1226C2.36593 21.0522 2 20.6303 2 20.1327V3.86727C2 3.36962 2.36593 2.9477 2.85858 2.87732ZM4 4.73457V19.2654L14 20.694V3.30599L4 4.73457ZM17 19H20V4.99997H17V2.99997H21C21.5523 2.99997 22 3.44769 22 3.99997V20C22 20.5523 21.5523 21 21 21H17V19ZM10.2 12L13 16H10.6L9 13.7143L7.39999 16H5L7.8 12L5 7.99997H7.39999L9 10.2857L10.6 7.99997H13L10.2 12Z"></path>
                  </svg>
                </Button>
                <Button
                  onClick={() => {
                    downloadAttachment("pdf", itm?.uniqueId,itm?.siteIdName,itm?.milestoneName);
                  }}
                  classes="!py-[2px] bg-red-600"
                  title="Download Pdf"
                >
                  <svg
                    className="w-4 h-4 fill-white"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M5 4H15V8H19V20H5V4ZM3.9985 2C3.44749 2 3 2.44405 3 2.9918V21.0082C3 21.5447 3.44476 22 3.9934 22H20.0066C20.5551 22 21 21.5489 21 20.9925L20.9997 7L16 2H3.9985ZM10.4999 7.5C10.4999 9.07749 10.0442 10.9373 9.27493 12.6534C8.50287 14.3757 7.46143 15.8502 6.37524 16.7191L7.55464 18.3321C10.4821 16.3804 13.7233 15.0421 16.8585 15.49L17.3162 13.5513C14.6435 12.6604 12.4999 9.98994 12.4999 7.5H10.4999ZM11.0999 13.4716C11.3673 12.8752 11.6042 12.2563 11.8037 11.6285C12.2753 12.3531 12.8553 13.0182 13.5101 13.5953C12.5283 13.7711 11.5665 14.0596 10.6352 14.4276C10.7999 14.1143 10.9551 13.7948 11.0999 13.4716Z"></path>
                  </svg>{" "}
                </Button>
              </div>
            }
          />
        ),
        L1Age: itm.L1Age?(
          itm.L1Age > 2 ? (
            <p className="text-rose-400 font-extrabold">{itm.L1Age + " Days"}</p>
            
          ) : (
            <p className="text-[#13b497] font-extrabold">{itm.L1Age + " Days"}</p>
          )
        ):(""),
        L2Age: itm.L2Age?(
          itm.L2Age > 2 ? (
            <p className="text-rose-400 font-extrabold">{itm.L2Age + " Days"}</p>
            
          ) : (
            <p className="text-[#13b497] font-extrabold">{itm.L2Age + " Days"}</p>
          )
        ):(""),
        logs: (
          <CstmButton
            className={"p-2"}
            child={
              <>
                <div className="flex space-x-2">
                  <ActionButton
                    bgColor="bg-yellow-600"
                    icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M19 22H5C3.34315 22 2 20.6569 2 19V3C2 2.44772 2.44772 2 3 2H17C17.5523 2 18 2.44772 18 3V15H22V19C22 20.6569 20.6569 22 19 22ZM18 17V19C18 19.5523 18.4477 20 19 20C19.5523 20 20 19.5523 20 19V17H18ZM16 20V4H4V19C4 19.5523 4.44772 20 5 20H16ZM6 7H14V9H6V7ZM6 11H14V13H6V11ZM6 15H11V17H6V15Z"></path></svg>}
                    name={""}
                    onClick={() => {
                      dispatch(COMPLIANCELOGLIST({dataAll:[],reset:true}))
                      setmodalOpen((prev) => !prev);
                      setmodalHead("Approval Logs");
                      dispatch(eventManagementActions.getComplianceLog(true,itm?.uniqueId))
                      setmodalBody(
                        <ComplianceApprovalLog
                          type={"Approval"}
                          unqeId={itm?.uniqueId}
                        />
                      );
                    }}
                  ></ActionButton>
                </div>
              </>
            }
          />
        ),
        currentStatus:(
          <p
            className={`px-3.5 font-extrabold rounded-xl text-center ${itm["currentStatus"] === "Reject" ? "bg-red-600 " : itm["currentStatus"] === "Closed"? "bg-green-600":"bg-yellow-600" }  border-[0.01px] border-[#eed398] whitespace-nowrap `}
          >
            {itm["currentStatus"]}
          </p>
        ),
        ...(itm["currentStatus"] === "Submit" && {
          approverAction: (
            <CstmButton
              className={"p-2"}
              child={
                <>
                  <div className="flex space-x-2">
                    <ActionButton
                      name={""}
                      onClick={() => {
                        dispatch(
                          AdminActions.getOneComplianceL2List(
                            itm.siteuid,
                            itm.milestoneName,
                            true,
                            ""
                          )
                        )
                          .then(() => {
                            setmodalOpen((prev) => !prev);
                            setmodalHead("Approve Milestone");
                            setmodalBody(
                              <ManageApproverForm
                                formData={itm}
                                setmodalOpen={setmodalOpen}
                              />
                            );
                          })
                          .catch(() => {
                            console.log("condition in catch");
                          });
                      }}
                    ></ActionButton>

                    <RejectionButton
                      name={""}
                      onClick={() => {
                        setRowId(itm["uniqueId"]);
                        setMileId(itm["milestoneuid"]);
                        setShowRejectModal(true);
                      }}
                    ></RejectionButton>
                  </div>
                </>
              }
            />
          ),
        }),

        // "status": <CstmButton child={<ToggleButton onChange={(e) => {
        //     let data = {
        //         "enabled": e.target.checked ? 1 : 0
        //     }
        //     dispatch(AlertConfigurationActions.patchAlertConfig(true, data, () => {
        //         alert(e.target.checked)
        //         e.target.checked = e.target.checked
        //     }, itm.id))
        //     // if(itm.enabled==0){
        //     //     itm.enabled=1
        //     // }else{
        //     //     itm.enabled=0
        //     // }
        //     // itm.enabled=itm.enabled==0?1:0
        // }} defaultChecked={itm.enabled == 1 ? true : false}></ToggleButton>} />,

        // "edit": <CstmButton className={"p-2"} child={<EditButton name={""} onClick={() => {
        //     setmodalOpen(true)
        //     dispatch(AdminActions.getManageCircle())
        //     setmodalHead("Edit Circle")
        //     setmodalBody(<>
        //         <ManageCircleForm isOpen={modalOpen} setIsOpen={setmodalOpen} resetting={false} formValue={itm} />
        //     </>)
        // }}></EditButton>} />,

        // "delete": <CstmButton child={<DeleteButton name={""} onClick={() => {
        //     let msgdata = {
        //         show: true,
        //         icon: 'warning',
        //         buttons: [
        //             <Button classes='w-15 bg-rose-400' onClick={() => {
        //                 dispatch(CommonActions.deleteApiCaller(`${Urls.admin_circle}/${itm.uniqueId}`, () => {
        //                     dispatch(AdminActions.getManageCircle())
        //                     dispatch(ALERTS({ show: false }))
        //                 }))
        //             }} name={"OK"} />,
        //             <Button classes='w-auto' onClick={() => {
        //                 dispatch(ALERTS({ show: false }))
        //             }} name={"Cancel"} />
        //         ],
        //         text: "Are you sure you want to Delete?"
        //     }
        //     dispatch(ALERTS(msgdata))
        // }}></DeleteButton>} />
      };
      return updateditm;
    });
  });

  let dbConfigTotalCount = useSelector((state) => {
    let interdata = state?.adminData?.getComplianceMilestoneL1Approver;
    if (interdata.length > 0) {
      return interdata[0]["overall_table_count"];
    } else {
      return 0;
    }
  });

  let table = {
    columns: [
      {
        name: "Site Id",
        value: "siteIdLink",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Milestone",
        value: "milestoneName",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "SR Number",
        value: "srNumber",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Project Group",
        value: "projectGroupName",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Project Type",
        value: "projectTypeName",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Sub Project",
        value: "subTypeName",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Project ID",
        value: "projectIdName",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "ACTIVITY",
        value: "activity",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "SSID",
        value: "systemId",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "TOCO ID",
        value: "activity",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Unique ID",
        value: "Unique ID",
        style: "min-w-[250px] max-w-[300px] text-center",
      },
      {
        name: "Form Submission Date",
        value: "formSubmitDate",
        style: "min-w-[200px] max-w-[200px] text-center",
      },
      {
        name: "Approval/Rejection Date",
        value: "L1ActionDate",
        style: "min-w-[200px] max-w-[200px] text-center",
      },
      {
        name: "Submitted to Airtel Date",
        value: "L2ActionDate",
        style: "min-w-[180px] max-w-[200px] text-center",
      },
      {
        name: "Airtel Action Date",
        value: "AirtelActionDate",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "L1-Ageing",
        value: "L1Age",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "L2-Ageing",
        value: "L2Age",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Airtel-Ageing",
        value: "",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      // {
      //     name: "Delay",
      //     value: "",
      //     style: "min-w-[100px] max-w-[200px] text-center"
      // },
      {
        name: "Form & Checklist Attachment",
        value: "attachmentDownload",
        style: "min-w-[200px] max-w-[200px] text-center",
      },
      // {
      //     name: "Form & Checklist Attachment Preview",
      //     value: "",
      //     style: "min-w-[300px] max-w-[300px] text-center"
      // },
      {
        name: "Current Status",
        value: "currentStatus",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Logs",
        value: "logs",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Action",
        value: "approverAction",
        style: "min-w-[140px] max-w-[200px] text-center",
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
    dispatch(AdminActions.getManageCircle(value, objectToQueryString(data)));
  };

  const handleReject = () => {
    let data = {
      type: "L1",
      milestoneuid: mileId,
      currentStatus: "Reject",
    };
    dispatch(
      AdminActions.approverActionPost(
        rowId,
        data,
        () => {
          setShowRejectModal(false);
          setRowId(null);
          setMileId(null);
          dispatch(
            AdminActions.getComplianceMilestoneL1Approver(route.split("/"))
          );
        },
        true
      )
    );
  };

  useEffect(() => {
    dispatch(AdminActions.getComplianceMilestoneL1Approver(route.split("/")));
  }, []);

  return (
    <>
      <AdvancedTable
        headerButton={
          <div className="flex gap-1">
            {/* <Button classes='w-auto' onClick={(e) => {
                setmodalOpen(prev => !prev)
                dispatch(AdminActions.getManageCircle())
                setmodalHead("New Circle")
                setmodalBody(<ManageCircleForm isOpen={modalOpen} setIsOpen={setmodalOpen} resetting={true} formValue={{}} />)
                }}
                name={"Add Circle"}></Button>
                <Button name={"Upload File"} classes='w-auto mr-1' onClick={(e) => {
                    setFileOpen(prev=>!prev)
                }}></Button>
                <Button name={"Export"} classes='w-auto mr-1' onClick={(e) => {
                    dispatch(CommonActions.commondownload("/export/manageCircle","Export_Circle("+dt+").xlsx"))
                }}></Button> */}
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
        heading={"Total Count :- "}
      />

      <Modal
        size={modalHead === "Approval Logs" ? "full" : "sm"}
        modalHead={modalHead}
        children={modalBody}
        isOpen={modalOpen}
        setIsOpen={setmodalOpen}
      />
      <Modal
        size={"full"}
        modalHead={modalHead}
        children={modalBody}
        isOpen={modalFullOpen}
        setIsOpen={setmodalFullOpen}
      />

      {showRejectModal && (
        <div className="fixed inset-0 flex items-center justify-center  bg-opacity-75 z-[10]">
          <div className="bg-white p-4 rounded-lg shadow-xl">
            <UilExclamationTriangle className="text-red-500 flex mx-auto w-14 h-14" />
            <p className="mt-4">{`Are you sure you want to Reject This Milestone?`}</p>
            <div className="mt-6 flex justify-center space-x-4">
              <Button
                name="Reject"
                classes="w-auto bg-rose-500"
                onClick={handleReject}
              />
              <Button
                name="Cancel"
                classes="w-auto"
                onClick={() => {
                  setShowRejectModal(false);
                  setRowId(null);
                  setMileId(null);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ComplianceL1ApproverTable;
