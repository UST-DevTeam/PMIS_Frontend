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

const ManageComplianceDegrowTemplateForm = ({
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
 const {
 bbuCard = [],
 existingAntenna = [],
 miscMaterial = [],
 radio = [],
 tbAnteena = [],
 } = useSelector(
 (state) => state.adminData.getComplianceDegrowTemplateData?.usedfields?.[0]
 ) || {};

 function removeExtraFields(quantityKeys, data) {
 const temp = {};
 const value = quantityKeys.filter((item) => data[item])?.[0];

 Object.keys(data).forEach((key) => {
 const splitedKey = key.split(" ").at(key.split(" ").length - 1);
 if (isNaN(splitedKey)) {
 temp[key] = data[key];
 }
 if (+splitedKey <= +data[value]) {
 temp[key] = data[key];
 }
 });

 return temp;
 }

 const forms = {
 "TWIN BEAM": [
 "TB Antenna Specifications",
 "Existing Other Antenna Specifications",
 "Radio Specifications In Sector",
 "BBU/card Specifications",
 "Misc Material Specifications",
 "Snap",
 ],
 "LAYER DEGROW": [
 "Existing Other Antenna Specifications",
 "Radio Specifications In Sector",
 "BBU/card Specifications",
 "Misc Material Specifications",
 "Snap",
 ],
 "SECTOR DEGROW": [
 "Existing Other Antenna Specifications",
 "Radio Specifications In Sector",
 "BBU/card Specifications",
 "Misc Material Specifications",
 "Snap",
 ],
 "4TR-2TR": [
 "Radio Specifications In Sector",
 "BBU/card Specifications",
 "Misc Material Specifications",
 ],
 };

 const projectTypeName = siteCompleteData["projectType"];
 const subProjectName = siteCompleteData["subProject"];

 const today = moment().format("YYYY-MM-DD");
 let assignedToCount = mileStone?.assignerResult?.length || 0;
 let milestoneStatus = mileStone?.mileStoneStatus;
 let user = JSON.parse(localStorage.getItem("user"));
 let rolename = user?.roleName;
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
 reset: reset1,
 } = useForm();
 const {
 register: registerForm2,
 setValue: setValueForm2,
 getValues: getValuesForm2,
 handleSubmit: handleSubmitForm2,
 formState: { errors: errorsForm2 },
 reset: reset2,
 } = useForm();
 const {
 register: registerForm3,
 setValue: setValueForm3,
 getValues: getValuesForm3,
 handleSubmit: handleSubmitForm3,
 formState: { errors: errorsForm3 },
 reset: reset3,
 } = useForm();
 const {
 register: registerForm4,
 setValue: setValueForm4,
 getValues: getValuesForm4,
 handleSubmit: handleSubmitForm4,
 formState: { errors: errorsForm4 },
 reset: reset4,
 } = useForm();
 const {
 register: registerForm6,
 setValue: setValueForm6,
 getValues: getValuesForm6,
 handleSubmit: handleSubmitForm6,
 formState: { errors: errorsForm6 },
 reset: reset5
 } = useForm();
 const {
 register: registerForm5,
 setValue: setValueForm5,
 getValues: getValuesForm5,
 handleSubmit: handleSubmitForm5,
 formState: { errors: errorsForm5 },
 reset: reset6
 } = useForm();
 const {
 register: registerForm0,
 setValue: setValueForm0,
 getValues: getValuesForm0,
 handleSubmit: handleSubmitForm0,
 formState: { errors: errorsForm0 },
 reset: reset7
 } = useForm();
 const {
 register: registerFormSelect,
 setValue: setValueFormSelect,
 getValues: getValuesFormSelect,
 handleSubmit: handleSubmitFormSelect,
 formState: { errors: errorsFormSelect },
 reset: reset8
 } = useForm();

 const [modalOpen, setmodalOpen] = useState(false);
 const [type, settype] = useState(true);
 const [modalBody, setmodalBody] = useState(<></>);
 const [L1Approver, setL1Approver] = useState(null);
 const dispatch = useDispatch();


 useEffect(() => {
 dispatch(
 AdminActions.getComplianceDegrowTemplateData(projectTypeName, subProjectName, true, "")
 );
 }, [subProjectName]);

 const data = useSelector(
 (state) => state.projectList.globalComplianceTypeData
 );
 useEffect(() => {
 (() => {
 reset1()
 reset2()
 reset3()
 reset4()
 reset5()
 reset6()
 reset7()
 reset8()
 })()

 if (data && data.length) {
 settype(false);

 let dtresult = data[0];

 if (dtresult["tbAnteena"]) {
 dispatch(
 AdminActions.updateFields(
 +dtresult["tbAnteena"]["TB Antenna Quantity"],
 "tbAnteena"
 )
 );

 Object.keys(dtresult["tbAnteena"]).map((iytm) => {
 setValueForm6(iytm, dtresult["tbAnteena"][iytm]);
 });
 }

 if (dtresult["existingAntenna"]) {
 dispatch(
 AdminActions.updateFields(
 +dtresult["existingAntenna"]["Existing Antenna Quantity"] ||
 +dtresult["existingAntenna"]["Existing Other Antenna Quantity"],
 "existingAntenna"
 )
 );
 Object.keys(dtresult["existingAntenna"]).map((iytm) => {
 setValueForm1(iytm, dtresult["existingAntenna"][iytm]);
 });
 }

 if (dtresult["miscMaterial"]) {

 Object.keys(dtresult["miscMaterial"]).map((iytm) => {
 setValueForm5(iytm, dtresult["miscMaterial"][iytm]);
 });
 }

 if (dtresult["bbuCard"]) {
 dispatch(
 AdminActions.updateFields(
 +dtresult["bbuCard"]["BBU/Card Count"] ||
 +dtresult["bbuCard"]["BBU/Card Quantity"],
 "bbuCard"
 )
 );
 Object.keys(dtresult["bbuCard"]).map((iytm) => {
 setValueForm3(iytm, dtresult["bbuCard"][iytm]);
 });
 }

 if (dtresult["radio"]) {
 dispatch(
 AdminActions.updateFields(
 +dtresult["radio"]["Radio Count"] ||
 +dtresult["radio"]["Radio Quantity"],
 "radio"
 )
 );
 Object.keys(dtresult["radio"]).map((iytm) => {
 setValueForm2(iytm, dtresult["radio"][iytm]);
 });
 }

 dtresult["subProjectName"] &&
 Object.keys(dtresult["subProjectName"]).map((iytm) => {
 setValueForm0(iytm, dtresult["subProjectName"][iytm]);
 });
 }

 }, [type, data]);

 // let dataOfProject = useSelector((state) => {
 // let dataOlder = state.adminData.getOneComplianceDyform
 // ? state.adminData.getOneComplianceDyform.length > 0
 // ? state.adminData.getOneComplianceDyform[0]["result"]
 // : state.adminData.getOneComplianceDyform
 // : state.adminData.getOneComplianceDyform;

 // return dataOlder;
 // });

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

 const handleSubProjectSubmit = (data) => {
 final_data["subProjectName"] = data;

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
 text: subProjectName + " Tab Data has been successfully updated.",
 };
 dispatch(ALERTS(msgdata));
 }
 )
 );
 };

 const handleTbAnteenaSubmit = (data) => {
 const newData = removeExtraFields(
 ["TB Antenna Quantity", "TB Antenna Count"],
 data
 );

 let Tv_Anteena_data = {};
 tbAnteena.map((itew) => {
 let fieldNaming = labelToValue(itew.fieldName);
 Tv_Anteena_data[fieldNaming] = newData[fieldNaming]?.trim();
 });

 final_data["tbAnteena"] = Tv_Anteena_data;

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
 text: "TB Antenna Specifications Tab Data has been successfully updated.",
 };
 dispatch(ALERTS(msgdata));
 }
 )
 );
 };

 const handleExistingAnteenaSubmit = (data) => {
 const newData = removeExtraFields(
 ["Existing Other Antenna Quantity", "Existing Antenna Quantity"],
 data
 );
 let Existing_Antenna_data = {};
 existingAntenna.map((itew) => {
 let fieldNaming = labelToValue(itew.fieldName);
 Existing_Antenna_data[fieldNaming] = newData[fieldNaming]?.trim();
 });

 final_data["existingAntenna"] = Existing_Antenna_data;

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
 text: "Existing Antenna Specifications Tab Data has been successfully updated.",
 };
 dispatch(ALERTS(msgdata));
 }
 )
 );
 };

 const handleRadoioSubmit = (data) => {
 const newData = removeExtraFields(["Radio Quantity", "Radio Count"], data);
 let Radio_data = {};
 radio.map((itew) => {
 let fieldNaming = labelToValue(itew.fieldName);
 Radio_data[fieldNaming] = newData[fieldNaming]?.trim();
 });

 final_data["radio"] = Radio_data;

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
 text: "Radio Specifications In Sector Tab Data has been successfully updated.",
 };
 dispatch(ALERTS(msgdata));
 }
 )
 );
 };

 const handleBbuCardSubmit = (data) => {
 const newData = removeExtraFields(
 ["BBU/Card Count", "BBU/Card Quantity"],
 data
 );

 let Bbu_Card_data = {};
 bbuCard.map((itew) => {
 let fieldNaming = labelToValue(itew.fieldName);
 Bbu_Card_data[fieldNaming] = newData[fieldNaming]?.trim();
 });

 final_data["bbuCard"] = Bbu_Card_data;

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
 text: "BBU/card Specifications Tab Data has been successfully updated.",
 };
 dispatch(ALERTS(msgdata));
 }
 )
 );
 };

 const handleMiscMaterialSubmit = (data) => {
 let Misc_Material_data = {};
 miscMaterial.map((itew) => {
 let fieldNaming = labelToValue(itew.fieldName);
 Misc_Material_data[fieldNaming] = data[fieldNaming]?.trim();
 });

 final_data["miscMaterial"] = Misc_Material_data;

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
 text: "Misc Material Specifications Tab Data has been successfully updated.",
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
 ></Button>
 </div>

 <CommonTableFormSiteParent
 funcaller={funcaller}
 beforeAnyChange={() => {
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
 defaultValue={subProjectName}
 tabslist={
 ["4TR-2TR"].includes(subProjectName)
 ? null
 : {
 [subProjectName]: (
 <>
 <div className="flex justify-end">
 {!isViewOnly() && (
 <Button
 classes="w-30"
 name={
 "Save " +
 subProjectName
 .split(" ")
 .map(
 (itm) =>
 itm?.[0] + itm?.slice(1).toLowerCase()
 )
 .join(" ")
 }
 onClick={handleSubmitForm0(handleSubProjectSubmit)}
 />
 )}
 </div>
 <CommonForm
 classes={"grid-cols-4 gap-1 mt-1"}
 Form={[
 {
 label: "Antenna Total in Sector",
 value: "",
 required: true,
 name: "antennaCount",
 type: isViewOnly() || "number",
 props: {
 min: 0
 },
 },
 ]}
 errors={errorsForm0}
 register={registerForm0}
 setValue={setValueForm0}
 getValues={getValuesForm0}
 />
 </>
 ),
 }
 }
 />
 {subProjectName && (
 <CommonTableFormSiteParent
 funcaller={funcaller}
 defaultValue={forms[subProjectName][0]}
 tabslist={(() => {
 const fields = {};

 forms[subProjectName].forEach((itm) => {
 if ("TB Antenna Specifications" === itm) {
 fields["TB Antenna Specifications"] = (
 <>
 <div className="flex justify-end">
 {!isViewOnly() && (
 <Button
 classes="w-30"
 name="Save TB Antenna"
 onClick={handleSubmitForm6(handleTbAnteenaSubmit)}
 />
 )}
 </div>
 <CommonForm
 classes={"grid-cols-4 gap-1 mt-1"}
 Form={tbAnteena.map((its, index) => {
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
 ...(index === 0 && {
 onChange: (e) => {
 if (e.target.value < 1) {
 e.target.value = "";
 }
 dispatch(
 AdminActions.updateFields(
 +e.target.value,
 "tbAnteena"
 )
 );
 },
 }),
 },
 };
 })}
 // Form={filesUploadForm}
 errors={errorsForm6}
 register={registerForm6}
 setValue={setValueForm6}
 getValues={getValuesForm6}
 />
 </>
 );
 }

 if ("Existing Other Antenna Specifications" === itm) {
 fields["Existing Other Antenna Specifications"] = (
 <>
 <div className="flex justify-end">
 {!isViewOnly() && (
 <Button
 classes="w-30"
 name="Save Existing Other Antenna"
 onClick={handleSubmitForm1(
 handleExistingAnteenaSubmit
 )}
 />
 )}
 </div>
 <CommonForm
 classes={"grid-cols-4 gap-1 mt-1"}
 Form={existingAntenna.map((its, index) => {
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
 ...(index === 0 && {
 onChange: (e) => {
 if (e.target.value < 1) {
 e.target.value = "";
 }
 dispatch(
 AdminActions.updateFields(
 +e.target.value,
 "existingAntenna"
 )
 );
 },
 }),
 },
 };
 })}
 // Form={filesUploadForm}
 errors={errorsForm1}
 register={registerForm1}
 setValue={setValueForm1}
 getValues={getValuesForm1}
 />
 </>
 );
 }

 if ("Radio Specifications In Sector" === itm) {
 fields["Radio Specifications In Sector"] = (
 <>
 <div className="flex justify-end">
 {!isViewOnly() && (
 <Button
 classes="w-30"
 name="Save Radio Specifications"
 onClick={handleSubmitForm2(handleRadoioSubmit)}
 />
 )}
 </div>
 <CommonForm
 classes={"grid-cols-4 gap-1"}
 Form={radio.map((its, index) => {
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
 ...(index === 0 && {
 onChange: (e) => {
 if (e.target.value < 1) {
 e.target.value = "";
 }
 dispatch(
 AdminActions.updateFields(
 +e.target.value,
 "radio"
 )
 );
 },
 }),
 },
 };
 })}
 // Form={filesUploadForm}
 errors={errorsForm2}
 register={registerForm2}
 setValue={setValueForm2}
 getValues={getValuesForm2}
 />
 </>
 );
 }

 if ("BBU/card Specifications" === itm) {
 fields["BBU/card Specifications"] = (
 <>
 <div className="flex justify-end">
 {!isViewOnly() && (
 <Button
 classes="w-30"
 name="Save BBU/card"
 onClick={handleSubmitForm3(handleBbuCardSubmit)}
 />
 )}
 </div>
 <CommonForm
 classes={"grid-cols-4 gap-1"}
 Form={bbuCard.map((its, index) => {
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
 ...(index === 0 && {
 onChange: (e) => {
 if (e.target.value < 1) {
 e.target.value = "";
 }
 dispatch(
 AdminActions.updateFields(
 +e.target.value,
 "bbuCard"
 )
 );
 },
 }),
 },
 };
 })}
 // Form={filesUploadForm}
 errors={errorsForm3}
 register={registerForm3}
 setValue={setValueForm3}
 getValues={getValuesForm3}
 />
 </>
 );
 }

 if ("Snap" === itm) {
 fields["Snap"] = (
 <ManageSnap
 beforeLoad={() => {
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
 externalData={(() => {
 const indexes = {};

 if (
 forms[subProjectName].includes(
 "TB Antenna Specifications"
 )
 ) {
 indexes["TB Antenna Specifications"] =
 +tbAnteenaWithData?.["TB Antenna Quantity"];
 }
 if (
 forms[subProjectName].includes(
 "Existing Other Antenna Specifications"
 )
 ) {
 indexes["Existing Other Antenna Specifications"] =
 +existingAntennaWithData?.[
 "Existing Antenna Quantity"
 ] ||
 +existingAntennaWithData?.[
 "Existing Other Antenna Quantity"
 ];
 }
 if (
 forms[subProjectName].includes(
 "Radio Specifications In Sector"
 )
 ) {
 indexes["Radio Specifications In Sector"] =
 +radioWithData?.["Radio Count"] ||
 +radioWithData?.["Radio Quantity"];
 }
 if (
 forms[subProjectName].includes(
 "BBU/card Specifications"
 )
 ) {
 indexes["BBU/card Specifications"] =
 +bbuCardWithData?.["BBU/Card Count"] ||
 +bbuCardWithData?.["BBU/Card Quantity"];
 }

 return indexes;
 })()}
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
 );
 }

 if ("Misc Material Specifications" === itm) {
 fields["Misc Material Specifications"] = (
 <>
 <div className="flex justify-end">
 {!isViewOnly() && (
 <Button
 classes="w-30"
 name="Save Misc Material"
 onClick={handleSubmitForm5(
 handleMiscMaterialSubmit
 )}
 />
 )}
 </div>
 <CommonForm
 classes={"grid-cols-4 gap-1"}
 Form={miscMaterial.map((its, index) => {
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
 })}
 // Form={filesUploadForm}
 errors={errorsForm5}
 register={registerForm5}
 setValue={setValueForm5}
 getValues={getValuesForm5}
 />
 </>
 );
 }
 });

 return fields;
 })()}
 />
 )}
 </div>
 </>
 );
};

export default ManageComplianceDegrowTemplateForm;