import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CommonForm from "../../../../components/CommonForm";
import Button from "../../../../components/Button";
import projectListActions from "../../../../store/actions/projectList-actions";
import { useDispatch, useSelector } from "react-redux";
import { Urls } from "../../../../utils/url";
import MyHomeActions from "../../../../store/actions/myHome-actions";
import NewLookBadge from "../../../../components/Badge";
import ManageSite from "./ManageSite";
import ManageComplianceTemplateForm from "../ManageCompliance/ManageComplianceTemplateForm";
import Modal from "../../../../components/Modal";
import AdminActions from "../../../../store/actions/admin-actions";
import { GET_COMPLIANCE_DEGROW_TEMPLATE_DATA, GET_ONE_COMPLIANCE_DY_FORM, GET_ONE_COMPLIANCE_L1_LIST } from "../../../../store/reducers/admin-reducer";
import { GET_GLOBAL_COMPLAINCE_TYPE_DATA } from "../../../../store/reducers/projectList-reducer";
import ManageComplianceTemplateApproverForm from "../ManageCompliance/ManageComplinaceTemplateApproverForm";
import ManageComplianceDegrowTemplateForm from "../ManageCompliance/ManageComplianceDegrowTemplateForm";
import ManageComplianceDegrowSRQ_Raise_And_DismantleTemplateForm from "../ManageCompliance/ManageComplianceDegrowSRQ_Raise_And_DismantleTemplateForm";

const CompletitonCreiteriaForm = ({
  siteCompleteData,
  mileStone,
  projectuniqueId,
  setmodalFullOpen,
  setmodalOpen,
  customeruniqueId,
  myTaskPage,
  filterView
}) => {

  const dispatch = useDispatch();
  const dateString = siteCompleteData["siteStartDate"];
  const [day, month, year] = dateString?.split("-")?.map(Number);
  const datestr = new Date(year, month - 1, day);
  // const [modalFullOpen, setmodalFullOpen] = useState(false);
  const [modalFullBody, setmodalFullBody] = useState(<></>);
  const [modalFullOpen1, setmodalFullOpen1] = useState(false);

  const projectTypeName = siteCompleteData['projectType']
  const subProjectName = siteCompleteData['subProject']



  const checkmilestone = mileStone["Completion Criteria"].split(",")
  const checkmilestoneStatus = mileStone['mileStoneStatus']
  const milestoneName = mileStone['Name']









  const {
    register: register,
    handleSubmit: handleSubmit,
    setValue: setValue,
    getValues: getValues,
    formState: { errors: errors },
  } = useForm();

  let mileStoneprops = {
    "Completion Date": {
      maxSelectableDate: new Date(),
      minSelectableDate: datestr,
    },
  };

  let dataecoder = {
    Date: "datetime",
    Number: "number",
    File: "file",
    Text: "text",
    Dropdown: "select"
  };

  let mileStoneCompletion = useSelector((state) => {

    let mtoneCompletion = state?.adminData?.getManageCompletionCriteria || [];
    return mileStone["Completion Criteria"].split(",").map((dta) => {
      let geeter = mtoneCompletion.filter((itm) => itm.completion == dta);
      if (dta == "Forms & Checklist") {
        return {
          label: dta,
          name: "Checklist",
          type: "jsxcmpt",
          value: "",
          component:
            <p className="cursor-pointer"
              onClick={() => {
                dispatch(GET_GLOBAL_COMPLAINCE_TYPE_DATA({ dataAll: [], reset: true }))
                if (projectTypeName !== "DEGROW") {
                  dispatch(GET_ONE_COMPLIANCE_L1_LIST({ dataAll: [], reset: true }))
                  dispatch(GET_ONE_COMPLIANCE_DY_FORM({ dataAll: [], reset: true }))
                  dispatch(AdminActions.getOneComplianceDyform(siteCompleteData.uniqueId, mileStone.Name, true, ""));
                  dispatch(AdminActions.getOneComplianceL1List(siteCompleteData.uniqueId, mileStone.Name, true, ""));
                }
                dispatch(projectListActions.globalComplianceTypeDataGet(siteCompleteData.uniqueId, mileStone.uniqueId, "", true));
                setmodalFullOpen1(true)
                setmodalFullBody(
                  projectTypeName === "DEGROW" && milestoneName === "Survey" ?
                    <ManageComplianceDegrowTemplateForm
                      siteCompleteData={siteCompleteData}
                      uid={siteCompleteData.uniqueId}
                      customeruniqueId={customeruniqueId}
                      projectuniqueId={projectuniqueId}
                      setmodalFullOpen={setmodalFullOpen}
                      setmodalOpen={setmodalOpen}
                      mileStone={mileStone}
                      myTaskPage={myTaskPage}
                      filterView={filterView}
                    />
                    : projectTypeName === "DEGROW" && (milestoneName === "SRQ Raise" || milestoneName === "Dismantle") ?
                      <ManageComplianceDegrowSRQ_Raise_And_DismantleTemplateForm
                        siteCompleteData={siteCompleteData}
                        uid={siteCompleteData.uniqueId}
                        customeruniqueId={customeruniqueId}
                        projectuniqueId={projectuniqueId}
                        setmodalFullOpen={setmodalFullOpen}
                        setmodalOpen={setmodalOpen}
                        mileStone={mileStone}
                        myTaskPage={myTaskPage}
                        filterView={filterView}
                      />
                      : <ManageComplianceTemplateForm
                        siteCompleteData={siteCompleteData}
                        uid={siteCompleteData.uniqueId}
                        customeruniqueId={customeruniqueId}
                        projectuniqueId={projectuniqueId}
                        setmodalFullOpen={setmodalFullOpen}
                        setmodalOpen={setmodalOpen}
                        mileStone={mileStone}
                        myTaskPage={myTaskPage}
                        filterView={filterView}
                      />
                )
              }}>
              <NewLookBadge text={"Form"} notifyType={"info"} />
            </p>,
          props: {
            onChange: (e) => { },
          },
          required: false,
          classes: "col-span-1",
        };

      }
      else {
        return {
          label: dta,
          value: "",
          name: "CC_" + dta,
          required: true,
          type: geeter.length > 0 ? dataecoder[geeter[0]["type"]] : "",
          option: geeter?.[0]?.type == "Dropdown" ? geeter[0]["dropdown"]?.split(",").map((itm) => {
            return {
              label: itm,
              value: itm,
            };
          }) : [],
          props: mileStoneprops[dta] || {},
        };
      }
    });
  });

  let backgeturl = projectListActions.getProjectTypeAll(projectuniqueId, filterView);
  if (myTaskPage === "Yes") {
    backgeturl = MyHomeActions.getMyTask();
  }


  const onsubmiting = (data) => {
    if (checkmilestone.includes("Forms & Checklist")) {
      data['Checklist'] = "Yes"
      data['siteuid'] = siteCompleteData.uniqueId
      data['mName'] = mileStone['Name']
      data['projectTypeName'] = projectTypeName
      data['subProjectTypeName'] = subProjectName
    }
    dispatch(
      projectListActions.postSubmit(Urls.projectList_closeMilestone + mileStone["uniqueId"], data, () => {
        setmodalOpen(false);
        setmodalFullOpen(false);
        dispatch(backgeturl);
      }
      )
    );
  };

  useEffect(() => {
  }, []);

  return (
    <>
      <Modal
        size={"full"}
        children={modalFullBody}
        isOpen={modalFullOpen1}
        setIsOpen={setmodalFullOpen1}
        modalHead={"Forms & Checklist"}
      />

      <CommonForm
        classes={"grid-cols-1 gap-1"}
        Form={mileStoneCompletion}
        errors={errors}
        register={register}
        setValue={setValue}
        getValues={getValues}
      />

      <div className="flex justify-center">
        {!checkmilestone.includes("Forms & Checklist") && (
          <Button
            onClick={handleSubmit(onsubmiting)}
            name={"Submit"}
            classes="w-auto"
          />
        )}
        {checkmilestone.includes("Forms & Checklist") && ['Open', 'In Process'].includes(checkmilestoneStatus) && (
          <Button
            onClick={handleSubmit(onsubmiting)}
            name={"Submit"}
            classes="w-auto"
          />
        )}
      </div>
    </>
  );
};

export default CompletitonCreiteriaForm;
