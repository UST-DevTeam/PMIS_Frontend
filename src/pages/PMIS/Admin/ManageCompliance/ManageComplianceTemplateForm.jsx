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

const ManageComplianceTemplateForm = ({
  siteCompleteData,
  uid,
  mileStone,
  setGlobalData,
  projectuniqueId,
  setmodalFullOpen,
  setSiteId,
  myTaskPage,
  filterView,
}) => {
  const {
    L1UserName = '',
    L1UserId = '',
    currentStatus = "",
    SnapData = {},
  } = useSelector((state) => state.projectList.globalComplianceTypeData?.[0]) ||
    {};



  const today = moment().format("YYYY-MM-DD");
  let user = JSON.parse(localStorage.getItem("user"));
  let userId = user?.uniqueId;

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
  const [modalBody, setmodalBody] = useState(<></>);
  const [L1Approver, setL1Approver] = useState(null);
  const dispatch = useDispatch();

  let L1optionList = useSelector((state) => {
    return state?.adminData?.getOneComplianceL1List?.map((itm) => {
      return {
        label: itm?.approverName,
        value: itm?.approverId,
      };
    });
  });

  useEffect(() => {
    setL1Approver(L1UserId);
    reset({})
    settype(true)
    setTimeout(() => {
    const value = isViewOnly()
    if (!value) {
      console.log("____", `[value="${L1UserId}"]`)
      const ele = document.querySelector(`[value="${L1UserId}"]`)
      if (!ele) return
      ele.setAttribute("selected", true)
    } else {
      const ele = document.querySelector(`[name="sdisabled"]`)
      if (!ele) return
      ele.value = L1UserName
    }
    setValueFormSelect("selectField", L1UserId);
    // reset({})
    settype(true)
    }, 0)
  }, [L1UserId, L1UserName]);


  let dataOfOldProject = useSelector((state) => {
    let datew = state.projectList.globalComplianceTypeData;

    if (type && datew && datew.length) {
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

  final_data["siteuid"] = siteCompleteData["uniqueId"];
  final_data["milestoneuid"] = mileStone["uniqueId"];
  final_data["projectuniqueId"] = projectuniqueId;
  final_data["subprojectId"] = siteCompleteData["SubProjectId"];
  final_data["approverType"] = "L1Approver";
  final_data["L1UserId"] = L1Approver;
  final_data["userId"] = userId;
  final_data["milestoneName"] = mileStone["Name"];
  final_data["siteIdName"] = siteCompleteData["Site Id"];
  final_data["systemId"] = siteCompleteData["systemId"];
  final_data['currentStatus'] = "In Process"

  const handleTemplateSubmit = (data) => {
    if (!L1Approver) {
      let msgdata = {
        show: true,
        icon: "error",
        buttons: [],
        type: 1,
        text: "Please Select Your L1 Approver",
      };
      dispatch(ALERTS(msgdata));
      return;
    }

    let Template_data = {};
    dataOfProject["Template"].map((itew) => {
      let fieldNaming = labelToValue(itew.fieldName);
      Template_data[fieldNaming] = data[fieldNaming]?.trim();
    });

    final_data["TemplateData"] = Template_data;

    dispatch(
      projectListActions.globalComplianceTypeDataPatch(
        Urls.compliance_globalSaver,
        final_data,
        () => { 
          let msgdata = {
            show: true,
            icon: "success",
            buttons: [],
            type: 1,
            text: "Template Tab Data has been successfully updated.",
          };
          dispatch(ALERTS(msgdata));
        }
      )
    );

  };

  const handlePlanDetailsSubmit = (data) => {
    if (!L1Approver) {
      let msgdata = {
        show: true,
        icon: "error",
        buttons: [],
        type: 1,
        text: "Please Select Your L1 Approver",
      };
      dispatch(ALERTS(msgdata));
      return;
    }

    let Plan_Deatils_data = {};
    dataOfProject["planDetails"].map((itew) => {
      let fieldNaming = labelToValue(itew.fieldName);
      Plan_Deatils_data[fieldNaming] = data[fieldNaming]?.trim();
    });

    
    final_data['PlanDetailsData'] = Plan_Deatils_data


    dispatch(
      projectListActions.globalComplianceTypeDataPatch(
        Urls.compliance_globalSaver,
        final_data,
        () => {
          let msgdata = {
            show: true,
            icon: "success",
            buttons: [],
            type: 1,
            text: "Planning Details Tab Data has been successfully updated.",
          };
          dispatch(ALERTS(msgdata));
        }
      )
    );
  };

  const handleSiteDetailsSubmit = (data) => {
    if (!L1Approver) {
      let msgdata = {
        show: true,
        icon: "error",
        buttons: [],
        type: 1,
        text: "Please Select Your L1 Approver",
      };
      dispatch(ALERTS(msgdata));
      return;
    }

    let Site_Deatils_data = {};
    dataOfProject["siteDetails"].map((itew) => {
      let fieldNaming = labelToValue(itew.fieldName);
      Site_Deatils_data[fieldNaming] = data[fieldNaming]?.trim();
    });

    final_data["SiteDetailsData"] = Site_Deatils_data;

    dispatch(
      projectListActions.globalComplianceTypeDataPatch(
        Urls.compliance_globalSaver,
        final_data,
        () => {
          let msgdata = {
            show: true,
            icon: "success",
            buttons: [],
            type: 1,
            text: "Site Details Tab Data has been successfully updated.",
          };
          dispatch(ALERTS(msgdata));
        }
      )
    );
  };

  const handleRanCheckListSubmit = (data) => {
    if (!L1Approver) {
      let msgdata = {
        show: true,
        icon: "error",
        buttons: [],
        type: 1,
        text: "Please Select Your L1 Approver",
      };
      dispatch(ALERTS(msgdata));
      return;
    }

    let Ran_Checklist_data = {};
    dataOfProject["ranChecklist"].map((itew) => {
      let fieldNaming = labelToValue(itew.fieldName);
      Ran_Checklist_data[fieldNaming] = data[fieldNaming]?.trim();
    });

    final_data["RanCheckListData"] = Ran_Checklist_data;

    dispatch(
      projectListActions.globalComplianceTypeDataPatch(
        Urls.compliance_globalSaver,
        final_data,
        () => {
          let msgdata = {
            show: true,
            icon: "success",
            buttons: [],
            type: 1,
            text: "Ran Checklist Tab Data has been successfully updated.",
          };
          dispatch(ALERTS(msgdata));
        }
      )
    );
  };


  const handleAcceptanceLogSubmit = (data) => {
    if (!L1Approver) {
      let msgdata = {
        show: true,
        icon: "error",
        buttons: [],
        type: 1,
        text: "Please Select Your L1 Approver",
      };
      dispatch(ALERTS(msgdata));
      return;
    }

    let Acceptance_Log_data = {};
    dataOfProject["acceptanceLog"].map((itew) => {
      let fieldNaming = labelToValue(itew.fieldName);
      Acceptance_Log_data[fieldNaming] = data[fieldNaming]?.trim();
    });

    final_data["AcceptanceLogData"] = Acceptance_Log_data;

    dispatch(
      projectListActions.globalComplianceTypeDataPatch(
        Urls.compliance_globalSaver,
        final_data,
        () => { 
          let msgdata = {
            show: true,
            icon: "success",
            buttons: [],
            type: 1,
            text: "Acceptance Log Tab Data has been successfully updated.",
          };
          dispatch(ALERTS(msgdata));
        }
      )
    );
  };


  const funcaller = () => {
    reset({});
  };

  useEffect(() => {
    reset({});
    settype(true);
  }, [uid]);

  let dtype = {
    Decimal: "number",
    Text: "text",
    Dropdown: "select",
    Number: "number",
    Date: "datetime",
    "Auto Created": "sdisabled",
  };



  function isViewOnly() {
    return ["In Process", "Reject", ""].includes(currentStatus)
      ? null
      : "sdisabled";
  }


  const tabslist = {};
  const activeTab = []

  if (dataOfProject?.Template) {
    activeTab.push("Template")
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
    activeTab.push("Planning Details")
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
    activeTab.push("Site Details")
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
    activeTab.push("Checklist")
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
    activeTab.push("Snap")
    tabslist["Snap"] = (
      <ManageSnap
        viewOnly={isViewOnly()}
        L1Approver={L1Approver}
        snapData={SnapData}
        projectData={{
          siteuid: siteCompleteData["uniqueId"],
          milestoneuid: mileStone["uniqueId"],
          projectuniqueId: projectuniqueId,
          subprojectId: siteCompleteData["SubProjectId"],
          approverType: "L1Approver",
          L1UserId: L1Approver,
          userId: userId,
          milestoneName: mileStone["Name"],
          siteIdName: siteCompleteData["Site Id"],
          systemId: siteCompleteData["systemId"],
          currentStatus: "In Process",
        }}
      />
    )
  }

  if (dataOfProject?.acceptanceLog) {
    activeTab.push("Acceptance Log")
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


  console.log(tabslist,activeTab[1],"____________tabslist____________")











  

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
          <Button
            classes="w-auto h-8"
            onClick={(e) => {
              reset({});
              settype(true);
              dispatch(
                projectListActions.globalComplianceTypeDataGet(
                  siteCompleteData.uniqueId,
                  mileStone.uniqueId,
                  "",
                  true,
                  () => {
                    reset({});
                    settype(true);
                  }
                )
              );
            }}
            name={""}
            icon={<UilRefresh />}
            title="Refresh"
          ></Button>
        </div>
       
        <CommonForm
          classes={"flex mx-auto w-1/4"}
          Form={[
            {
              label: "Select Your L1 Approver",
              name: isViewOnly() || "selectField",
              type: isViewOnly() || "select",
              option: L1optionList,
              props: {
                onChange: (e) => {
                  setL1Approver(e.target.value);
                },
              },
              required: true,
            },
          ]}
          errors={errorsFormSelect}
          register={registerFormSelect}
          setValue={setValueFormSelect}
          getValues={getValuesFormSelect}
        />

        <CommonTableFormSiteParent
          funcaller={funcaller}
          defaultValue={activeTab[0]}
          tabslist={tabslist}
        />
      </div>
    </>
  );
};

export default ManageComplianceTemplateForm;