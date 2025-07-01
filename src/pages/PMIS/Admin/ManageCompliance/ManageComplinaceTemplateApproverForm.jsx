import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../../../components/Modal";
import Button from "../../../../components/Button";
import { UilRefresh } from "@iconscout/react-unicons";
import {
  getAccessType,
  labelToValue,
  objectToQueryString,
} from "../../../../utils/commonFunnction";
import { Urls } from "../../../../utils/url";
import CommonForm from "../../../../components/CommonForm";
import CommonTableFormSiteParent from "../../../../components/CommonTableFormSiteParent";
import projectListActions from "../../../../store/actions/projectList-actions";
import ManageSnap from "./ManageSnap";
import moment from "moment";
import { ALERTS } from "../../../../store/reducers/component-reducer";

const ManageComplianceTemplateApproverForm = ({ callbackFoResetForm = () => { }, CompleteData ,approverType}) => {
  const { L1UserId = "", SnapData = {} } =
    useSelector(
      (state) => state.projectList.globalComplianceTypeApproverData?.[0]
    ) || {};
  const today = moment().format("YYYY-MM-DD");
  //   let assignedToCount = mileStone?.assignerResult?.length || 0;
  //   let milestoneStatus = mileStone?.mileStoneStatus
  let user = JSON.parse(localStorage.getItem("user"));
  let rolename = user?.roleName;
  let userId = user?.uniqueId;

  let rowId = CompleteData?.uniqueId;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setValues,
    getValues,
    reset,
    formState: { errors },
  } = useForm();

  const {
    register: registerForm1,
    setValue: setValueForm1,
    getValues: getValuesForm1,
    handleSubmit: handleSubmitForm1,
    formState: { errors: errorsForm1 },
  } = useForm();
  const {
    register: registerForm2,
    setValue: setValueForm2,
    getValues: getValuesForm2,
    handleSubmit: handleSubmitForm2,
    formState: { errors: errorsForm2 },
  } = useForm();
  const {
    register: registerForm3,
    setValue: setValueForm3,
    getValues: getValuesForm3,
    handleSubmit: handleSubmitForm3,
    formState: { errors: errorsForm3 },
  } = useForm();
  const {
    register: registerForm4,
    setValue: setValueForm4,
    getValues: getValuesForm4,
    handleSubmit: handleSubmitForm4,
    formState: { errors: errorsForm4 },
  } = useForm();
  const {
    register: registerForm5,
    setValue: setValueForm5,
    getValues: getValuesForm5,
    handleSubmit: handleSubmitForm5,
    formState: { errors: errorsForm5 },
  } = useForm();
  const {
    register: registerForm0,
    setValue: setValueForm0,
    getValues: getValuesForm0,
    handleSubmit: handleSubmitForm0,
    formState: { errors: errorsForm0 },
  } = useForm();
  const {
    register: registerFormSelect,
    setValue: setValueFormSelect,
    getValues: getValuesFormSelect,
    handleSubmit: handleSubmitFormSelect,
    formState: { errors: errorsFormSelect },
  } = useForm();

  const [modalOpen, setmodalOpen] = useState(false);
  const [type, settype] = useState(true);
  const [modalHead, setmodalHead] = useState(<></>);
  const [modalBody, setmodalBody] = useState(<></>);
  const [invoiceData, setinvoiceData] = useState([]);
  const [uniqueness, setUniqueness] = useState("");
  const [listing, setlisting] = useState([]);
  const [L1Approver, setL1Approver] = useState(null);
  const dispatch = useDispatch();

  let dataOfOldProject = useSelector((state) => {
    let datew = state.projectList.globalComplianceTypeApproverData;

    if (type && datew && datew.length > 0) {
      settype(false);

      let dtresult = datew[0];

      dtresult["PlanDetailsData"] &&
        Object.keys(dtresult["PlanDetailsData"]).map((iytm) => {
          setValueForm1(iytm, dtresult["PlanDetailsData"][iytm]);
        });

      dtresult["AcceptanceLogData"] &&
        Object.keys(dtresult["AcceptanceLogData"]).map((iytm) => {
          setValueForm5(iytm, dtresult["AcceptanceLogData"][iytm]);
        });

      dtresult["RanCheckListData"] &&
        Object.keys(dtresult["RanCheckListData"]).map((iytm) => {
          setValueForm3(iytm, dtresult["RanCheckListData"][iytm]);
        });

      dtresult["SiteDetailsData"] &&
        Object.keys(dtresult["SiteDetailsData"]).map((iytm) => {
          setValueForm2(iytm, dtresult["SiteDetailsData"][iytm]);
        });

      dtresult["TemplateData"] &&
        Object.keys(dtresult["TemplateData"]).map((iytm) => {
          setValueForm0(iytm, dtresult["TemplateData"][iytm]);
        });

      return datew[0];
    }
  });

  let dataOfProject = useSelector((state) => {
    let dataOlder = state.adminData.getOneComplianceDyform
      ? state.adminData.getOneComplianceDyform.length > 0
        ? state.adminData.getOneComplianceDyform[0]["result"]
        : state.adminData.getOneComplianceDyform
      : state.adminData.getOneComplianceDyform;

    return dataOlder;
  });

  let final_data = {};

  const handleTemplateSubmit = (data) => {
    let Template_data = {};
    dataOfProject["Template"].map((itew) => {
      let fieldNaming = labelToValue(itew.fieldName);
      Template_data[fieldNaming] = data[fieldNaming]?.trim();
    });

    final_data["TemplateData"] = Template_data;

    dispatch(
      projectListActions.globalComplianceTypeApproverDataPatch(
        Urls.compliance_globalSaver_Approver,
        rowId,
        final_data,
        () => { }
      )
    );
  };

  const handlePlanDetailsSubmit = (data) => {
    let Plan_Deatils_data = {};
    dataOfProject["planDetails"].map((itew) => {
      let fieldNaming = labelToValue(itew.fieldName);
      Plan_Deatils_data[fieldNaming] = data[fieldNaming]?.trim();
    });

    final_data["PlanDetailsData"] = Plan_Deatils_data;

    dispatch(
      projectListActions.globalComplianceTypeApproverDataPatch(
        Urls.compliance_globalSaver_Approver,
        rowId,
        final_data,
        () => { }
      )
    );
  };

  const handleSiteDetailsSubmit = (data) => {
    let Site_Deatils_data = {};
    dataOfProject["siteDetails"].map((itew) => {
      let fieldNaming = labelToValue(itew.fieldName);
      Site_Deatils_data[fieldNaming] = data[fieldNaming]?.trim();
    });

    final_data["SiteDetailsData"] = Site_Deatils_data;

    dispatch(
      projectListActions.globalComplianceTypeApproverDataPatch(
        Urls.compliance_globalSaver_Approver,
        rowId,
        final_data,
        () => { }
      )
    );
  };

  const handleRanCheckListSubmit = (data) => {
    let Ran_Checklist_data = {};
    dataOfProject["ranChecklist"].map((itew) => {
      let fieldNaming = labelToValue(itew.fieldName);
      Ran_Checklist_data[fieldNaming] = data[fieldNaming]?.trim();
    });

    final_data["RanCheckListData"] = Ran_Checklist_data;

    dispatch(
      projectListActions.globalComplianceTypeApproverDataPatch(
        Urls.compliance_globalSaver_Approver,
        rowId,
        final_data,
        () => { }
      )
    );
  };

  const handleAcceptanceLogSubmit = (data) => {
    let Acceptance_Log_data = {};
    dataOfProject["acceptanceLog"].map((itew) => {
      let fieldNaming = labelToValue(itew.fieldName);
      Acceptance_Log_data[fieldNaming] = data[fieldNaming]?.trim();
    });

    final_data["AcceptanceLogData"] = Acceptance_Log_data;

    dispatch(
      projectListActions.globalComplianceTypeApproverDataPatch(
        Urls.compliance_globalSaver_Approver,
        rowId,
        final_data,
        () => { }
      )
    );
  };

  const funcaller = () => {
    reset({});
    // alert("removed")
  };

  useEffect(() => {
    reset({});
    settype(true);
    callbackFoResetForm(() => {
      reset({});
      settype(true);
    })
    return () => {
      reset({});
      settype(false);
    }
  }, [rowId]);

  let dtype = {
    Decimal: "number",
    Text: "text",
    Dropdown: "select",
    Number: "number",
    Date: "datetime",
    "Auto Created": "sdisabled",
  };


  function isViewOnly() {
    if (approverType === "L1") {
      return ["In Process", "Submit"].includes(CompleteData?.currentStatus)
      ? null
      : "sdisabled";
    }
    else if (approverType === "L2") {
      return ["Approve"].includes(CompleteData?.currentStatus)
      ? null
      : "sdisabled";
    }
    
  }

  const tabslist = {};

  if (dataOfProject?.Template) {
    tabslist["Template"] = (
      <>
        <div className="flex justify-end">
          {!isViewOnly() && (
            <Button
              classes="w-30"
              name="Save Template"
              onClick={handleSubmitForm0(handleTemplateSubmit)}
            />
          )}
        </div>
        <CommonForm
          classes={"grid-cols-4 gap-1 mt-1"}
          Form={
            dataOfProject["Template"].map((its) => {
              let type = isViewOnly() || dtype[its.dataType];
              let option = its.dropdownValue
                ? its.dropdownValue.split(",").map((itm) => ({
                    value: itm,
                    label: itm,
                  }))
                : [];

              return {
                label: its.fieldName,
                value: "",
                required: its.required === "Yes",
                option: option,
                name: its.fieldName,
                type: type,
                props: {
                  maxSelectableDate: today,
                },
              };
            }) || []
          }
          errors={errorsForm0}
          register={registerForm0}
          setValue={setValueForm0}
          getValues={getValuesForm0}
        />
      </>
    );
  }

  if (dataOfProject?.planDetails) {
    tabslist["Planning Details"] = (
      <>
        <div className="flex justify-end">
          {!isViewOnly() && (
            <Button
              classes="w-30"
              name="Save Plan Details"
              onClick={handleSubmitForm1(handlePlanDetailsSubmit)}
            />
          )}
        </div>
        <CommonForm
          classes={"grid-cols-4 gap-1 mt-1"}
          Form={
            dataOfProject["planDetails"].map((its) => {
              let type = isViewOnly() || dtype[its.dataType];
              let option = its.dropdownValue
                ? its.dropdownValue.split(",").map((itm) => ({
                    value: itm,
                    label: itm,
                  }))
                : [];

              return {
                label: its.fieldName,
                value: "",
                required: its.required === "Yes",
                option: option,
                name: its.fieldName,
                type: type,
                props: {
                  maxSelectableDate: today,
                },
              };
            }) || []
          }
          errors={errorsForm1}
          register={registerForm1}
          setValue={setValueForm1}
          getValues={getValuesForm1}
        />
      </>
    );
  }

  if (dataOfProject?.siteDetails) {
    tabslist["Site Details"] = (
      <>
        <div className="flex justify-end">
        {!isViewOnly() && (
          <Button
            classes="w-30"
            name="Save Site Details"
            onClick={handleSubmitForm2(handleSiteDetailsSubmit)}
          />
        )}
        </div>
        <CommonForm
          classes={"grid-cols-4 gap-1"}
          Form={
            dataOfProject
              ? dataOfProject["siteDetails"]
                ? dataOfProject["siteDetails"].map((its) => {
                  return {
                    label: its.fieldName,
                    value: "abc",
                    name: its.fieldName,
                    type: isViewOnly() || dtype[its.dataType],
                    option: its.dropdownValue
                      ? its.dropdownValue.split(",").map((itm) => {
                        return {
                          value: itm,
                          label: itm,
                        };
                      })
                      : [],
                    required: its.required == "Yes" ? true : false,
                    props: {
                      maxSelectableDate: today,
                    },
                  };
                })
                : []
              : []
          }
          errors={errorsForm2}
          register={registerForm2}
          setValue={setValueForm2}
          getValues={getValuesForm2}
        />
      </>
    )
  }

  if (dataOfProject?.ranChecklist) {
    tabslist["Checklist"] = (
      <>
        <div className="flex justify-end">
        {!isViewOnly() && (
          <Button
            classes="w-30"
            name="Save Ran AT Checklist"
            onClick={handleSubmitForm3(handleRanCheckListSubmit)}
          />
        )}
        </div>
        <CommonForm
          classes={"grid-cols-4 gap-1"}
          Form={
            dataOfProject
              ? dataOfProject["ranChecklist"]
                ? dataOfProject["ranChecklist"].map((its) => {
                  return {
                    label: its.fieldName,
                    value: "abc",
                    name: its.fieldName,
                    type: isViewOnly() || dtype[its.dataType],
                    option: its.dropdownValue
                      ? its.dropdownValue.split(",").map((itm) => {
                        return {
                          value: itm,
                          label: itm,
                        };
                      })
                      : [],
                    required: its.required == "Yes" ? true : false,
                    props: {
                      maxSelectableDate: today,
                    },
                  };
                })
                : []
              : []
          }
          errors={errorsForm3}
          register={registerForm3}
          setValue={setValueForm3}
          getValues={getValuesForm3}
        />
      </>
    )
  }

  if (dataOfProject?.snap) {
    tabslist["Snap"] = (
      <ManageSnap
        viewOnly={isViewOnly()}
        L1Approver={L1Approver}
        snapData={SnapData}
        l1ApproverForm={true}
        projectData={(() => {
          const final_data = {};
          final_data["uniqueId"] = rowId;
          return final_data;
        })()}
      />
    )
  }

  if (dataOfProject?.acceptanceLog) {
    tabslist["Acceptance Log"] = (
      <>
        <div className="flex justify-end">
        {!isViewOnly() && (
          <Button
            classes="w-30"
            name="Save Acceptance Log"
            onClick={handleSubmitForm5(handleAcceptanceLogSubmit)}
          />
        )}
        </div>
        <CommonForm
          classes={"grid-cols-4 gap-1"}
          Form={
            dataOfProject
              ? dataOfProject["acceptanceLog"]
                ? dataOfProject["acceptanceLog"].map((its) => {
                  return {
                    label: its.fieldName,
                    value: "abc",
                    name: its.fieldName,
                    type: isViewOnly() || dtype[its.dataType],
                    option: its.dropdownValue
                      ? its.dropdownValue.split(",").map((itm) => {
                        return {
                          value: itm,
                          label: itm,
                        };
                      })
                      : [],
                    required: its.required == "Yes" ? true : false,
                    props: {
                      maxSelectableDate: today,
                    },
                  };
                })
                : []
              : []
          }
          errors={errorsForm5}
          register={registerForm5}
          setValue={setValueForm5}
          getValues={getValuesForm5}
        />
      </>
    )
  }

  return (
    <>
      <Modal
        modalHead="Compliance Form"
        children={modalBody}
        setIsOpen={setmodalOpen}
        isOpen={modalOpen}
        size={"full1"}
      />

      <div className="relative overflow-scroll h-[94vh] p-4">
        <div className="aboslute top-5 right-5 flex justify-end">
          <Button classes='w-auto h-8' onClick={(e) => {
            reset({});
            settype(true);
            dispatch(
              projectListActions.globalComplianceTypeApproverDataGet(
                CompleteData?.uniqueId,
                "",
                true,
                () => {
                  reset({});
                  settype(true);
                }
              )
            );
          }} name={""} icon={<UilRefresh />}></Button>
        </div>

        <CommonTableFormSiteParent
          setType={settype}
          funcaller={funcaller}
          defaultValue={"Template"}
          tabslist={tabslist}
        />
      </div>
    </>
  );
};

export default ManageComplianceTemplateApproverForm;
