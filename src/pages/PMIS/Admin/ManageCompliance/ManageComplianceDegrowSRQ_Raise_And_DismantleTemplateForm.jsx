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
import AdminActions from "../../../../store/actions/admin-actions";

const ManageComplianceDegrowSRQ_Raise_And_DismantleTemplateForm = ({
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
    L1UserName = "",
    L1UserId = "",
    currentStatus = "",
    SnapData = {},
    bbuCard: bbuCardWithData = [],
    existingAntenna: existingAntennaWithData = [],
    miscMaterial: miscMaterialWithData = [],
    radio: radioWithData = [],
    tbAnteena: tbAnteenaWithData = [],

  } = useSelector((state) => state.projectList.globalComplianceTypeData?.[0]) ||
    {};

  const snapFields = useSelector((state) => state.adminData.getComplianceDegrowTemplateData?.usedfields?.[0]) ||
    {};

  const {
    bbuCard = [],
    existingAntenna = [],
    miscMaterial = [],
    radio = [],
    tbAnteena = [],
    Template = []
  } = useSelector(
    (state) => state.adminData.getComplianceDegrowTemplateData?.usedfields?.[0]
  ) || {};





  function removeExtraFields(quantityKeys, data) {
    const temp = {}
    const value = quantityKeys.filter(item => data[item])?.[0]

    Object.keys(data).forEach(key => {
      const splitedKey = key.split(" ").at(key.split(" ").length - 1)
      if (isNaN(splitedKey)) {
        temp[key] = data[key]
      }
      if (+splitedKey <= +data[value]) {
        temp[key] = data[key]
      }
    })

    return temp
  }



  const projectTypeName = siteCompleteData["projectType"];
  const subProjectName = siteCompleteData["subProject"];

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
    register: registerForm0,
    setValue: setValueForm0,
    getValues: getValuesForm0,
    handleSubmit: handleSubmitForm0,
    formState: { errors: errorsForm0 },
    reset: reset0
  } = useForm();

  // const {
  //   register: registerForm1,
  //   setValue: setValueForm1,
  //   getValues: getValuesForm1,
  //   handleSubmit: handleSubmitForm1,
  //   formState: { errors: errorsForm1 },
  //   reset: reset1
  // } = useForm();
  // const {
  //   register: registerForm2,
  //   setValue: setValueForm2,
  //   getValues: getValuesForm2,
  //   handleSubmit: handleSubmitForm2,
  //   formState: { errors: errorsForm2 },
  //   reset: reset2
  // } = useForm();
  // const {
  //   register: registerForm3,
  //   setValue: setValueForm3,
  //   getValues: getValuesForm3,
  //   handleSubmit: handleSubmitForm3,
  //   formState: { errors: errorsForm3 },
  //   reset: reset3
  // } = useForm();
  // const {
  //   register: registerForm4,
  //   setValue: setValueForm4,
  //   getValues: getValuesForm4,
  //   handleSubmit: handleSubmitForm4,
  //   formState: { errors: errorsForm4 },
  //   reset: reset4
  // } = useForm();

  // const {
  //   register: registerForm5,
  //   setValue: setValueForm5,
  //   getValues: getValuesForm5,
  //   handleSubmit: handleSubmitForm5,
  //   formState: { errors: errorsForm5 },
  //   reset: reset5
  // } = useForm();

  // const {
  //   register: registerForm6,
  //   setValue: setValueForm6,
  //   getValues: getValuesForm6,
  //   handleSubmit: handleSubmitForm6,
  //   formState: { errors: errorsForm6 },
  //   reset: reset6
  // } = useForm();


  // const {
  //   register: registerFormSelect,
  //   setValue: setValueFormSelect,
  //   getValues: getValuesFormSelect,
  //   handleSubmit: handleSubmitFormSelect,
  //   formState: { errors: errorsFormSelect },
  // } = useForm();

  const [modalOpen, setmodalOpen] = useState(false);
  const [type, settype] = useState(true);
  const [modalBody, setmodalBody] = useState(<></>);
  const [L1Approver, setL1Approver] = useState(null);
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(
      AdminActions.getComplianceDegrowTemplateData(
        projectTypeName,
        subProjectName,
        true,
        `milestone=${mileStone?.Name}&&siteId=${siteCompleteData?.uniqueId}`
      )
    );
  }, [subProjectName, mileStone?.Name, siteCompleteData?.uniqueId]);

  let dataOfOldProject = useSelector((state) => {
    let datew = state.projectList.globalComplianceTypeData;

    if (type && datew && datew.length) {
      settype(false);

      let dtresult = datew[0];

      dtresult["Template"] &&
        Object.keys(dtresult["Template"]).map((iytm) => {
          setValueForm0(iytm, dtresult["Template"][iytm]);
        });
    }
  });



  let final_data = {};

  final_data["siteuid"] = siteCompleteData["uniqueId"];
  final_data["milestoneuid"] = mileStone["uniqueId"];
  final_data["projectuniqueId"] = projectuniqueId;
  final_data["subprojectId"] = siteCompleteData["SubProjectId"];
  final_data["userId"] = userId;
  final_data["milestoneName"] = mileStone["Name"];
  final_data["siteIdName"] = siteCompleteData["Site Id"];
  final_data["systemId"] = siteCompleteData["systemId"];
  final_data["currentStatus"] = "In Process";
  final_data["formType"] = "Static";

  const handleSubmitMileStone = (data) => {

    final_data["Template"] = data;

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
            text: mileStone?.Name + "Tab Data has been successfully updated.",
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
    reset0()
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
        {/* <div className="aboslute top-5 right-5 flex justify-end">
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
          ></Button>
        </div> */}

        <CommonTableFormSiteParent
          funcaller={funcaller}
          defaultValue={mileStone["Name"]}
          tabslist={
            {
              [mileStone["Name"]]: (
                <>
                  {
                    mileStone["Name"] === "SRQ Raise" && <div className="flex justify-end">
                      {!isViewOnly() && (
                        <Button
                          classes="w-30"
                          name={
                            "Save"
                          }
                          onClick={handleSubmitForm0(handleSubmitMileStone)}
                        />
                      )}
                    </div>
                  }
                  {
                    mileStone["Name"] === "SRQ Raise" ? <CommonForm
                      classes={"grid-cols-4 gap-1 mt-1"}
                      Form={Template.map((its, index) => {
                        let type = isViewOnly() || dtype[its.dataType];
                        let option = its.dropdownValue
                          ? its.dropdownValue.split(",").map((itm) => {
                            return {
                              value: itm,
                              label: itm,
                            };
                          })
                          : [];

                        return {
                          label: its.fieldName,
                          value: "",
                          required: its.required == "Yes" ? true : false,
                          option: option,
                          name: its.fieldName,
                          type: type,
                          props: {
                            maxSelectableDate: today,
                          },
                        };
                      })}
                      errors={errorsForm0}
                      register={registerForm0}
                      setValue={setValueForm0}
                      getValues={getValuesForm0}
                    /> : <ManageSnap
                      externalData={snapFields}
                      viewOnly={isViewOnly()}
                      L1Approver={L1Approver}
                      snapData={SnapData}
                      projectData={(() => {
                        const final_data = {};
                        final_data["siteuid"] = siteCompleteData["uniqueId"];
                        final_data["milestoneuid"] = mileStone["uniqueId"];
                        final_data["formType"] = "Static";
                        final_data["projectuniqueId"] = projectuniqueId;
                        final_data["subprojectId"] =
                          siteCompleteData["SubProjectId"];
                        final_data["userId"] = userId;
                        final_data["milestoneName"] = mileStone["Name"];
                        final_data["siteIdName"] = siteCompleteData["Site Id"];
                        final_data["systemId"] = siteCompleteData["systemId"];
                        final_data["currentStatus"] = "In Process";
                        return final_data;
                      })()}
                    />
                  }

                </>
              ),
            }
          }
        />
      </div>
    </>
  );
};

export default ManageComplianceDegrowSRQ_Raise_And_DismantleTemplateForm
