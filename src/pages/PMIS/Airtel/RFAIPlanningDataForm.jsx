import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import CommonForm from "../../../components/CommonForm";
import CommonTableFormSiteParent from "../../../components/CommonTableFormSiteParent";
import Button from "../../../components/Button";
import { UilDownloadAlt } from "@iconscout/react-unicons";
import CommonActions from "../../../store/actions/common-actions";


const RFAIPlanningDataForm = ({
  uid,
  completeData
}) => {

  const today = moment().format("YYYY-MM-DD");

  let user = JSON.parse(localStorage.getItem("user"));
  let rolename = user?.roleName;



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

  const dispatch = useDispatch();


  const siteDetailsForm = [
    {
      label:"Circle",
      value:"",
      type:"sdisabled",
      name:"Circle"
    },
    {
      label:"Site ID",
      value:"",
      type:"sdisabled",
      name:"Site ID"
    },
    {
      label:"Site Name",
      value:"",
      type:"sdisabled",
      name:"Site Name"
    },
    
  ]

  const AnteenaForm = [
    {
      label:"No of MW mount available",
      value:"",
      type:"sdisabled",
      name:"No of MW mount available"
    }
  ]

  let AnteenaKeys = [
    "Height of MW Antenna mount",
    "Azimuth of MW Antenna mount",
    "New GSM mount height",
    "New GSM mount azimuth",
    "No of RRU",
    "RAN Type",
  ];


  let siteDetails = Object.keys(completeData?.SiteDetails || {}).map((itm) => ({
    type: "sdisabled",
    label: itm,
    value:completeData?.SiteDetails[itm] || "",
    name: itm,
  }));

  let BTS = Object.keys(completeData?.BTS || {}).map((itm) => ({
    type: "sdisabled",
    label: itm,
    value:completeData?.BTS[itm] || "",
    name: itm,
  }));

  let Antenna = Object.keys(completeData?.Antenna || {}).map((itm) => ({
    type: "sdisabled",
    label: itm,
    value: completeData?.Antenna[itm] || "",
    name: itm,
  }));

  let BBUModel = Object.keys(completeData['BBU Model'] || {}).map((itm) => ({
    type: "sdisabled",
    label: itm,
    value:completeData['BBU Model'][itm] || "",
    name: itm,
  }));

  let MediaType = Object.keys(completeData['Media Type'] || {}).map((itm) => ({
    type: "sdisabled",
    label: itm,
    value:completeData['Media Type'][itm] || "",
    name: itm,
  }));


  const finalSiteDetailsForm = [
    ...siteDetailsForm,
    ...siteDetails.filter(
      (item) => !siteDetailsForm.some((f) => f.name === item.name)
    ),
  ];

  const finalAnteenaForm = [
    ...AnteenaForm,
    ...Antenna.filter(
      (item) => !AnteenaForm.some((f) => f.name === item.name)
    ),
  ];





  useEffect(() => {
    siteDetails.forEach((itm) => {
      setValueForm1(itm.name, itm.value);
    });
    BTS.forEach((itm) => {
      setValueForm2(itm.name, itm.value);
    });
    Antenna.forEach((itm) => {
      setValueForm3(itm.name, itm.value);
    });
    BBUModel.forEach((itm) => {
      setValueForm4(itm.name, itm.value);
    });
    MediaType.forEach((itm) => {
      setValueForm5(itm.name, itm.value);
    });
  }, []);






  const funcaller = () => {
    reset({});
  };





  
  return (
    <>
      <div className="p-4">
        <div className="aboslute top-5 right-5 flex justify-end">
          <Button
            classes="w-auto h-8"
            onClick={(e) => {
              dispatch(CommonActions.commondownload(`/export/airtelPlannedData/${uid}`,`${completeData?.['Sr Number']}_${completeData?.Circle}_${completeData?.['Site ID']}_PlanningData.xlsx`))
            }}
            name={""}
            icon={<UilDownloadAlt/>}
            title="Download"
          ></Button>
        </div>
        <CommonTableFormSiteParent
          funcaller={funcaller}
          defaultValue={"Site Details"}
          tabslist={{
            "Site Details": (
              <>
                <CommonForm
                  classes={"grid-cols-4 gap-1 mt-1"}
                  Form={finalSiteDetailsForm}
                  errors={errorsForm1}
                  register={registerForm1}
                  setValue={setValueForm1}
                  getValues={getValuesForm1}
                />
              </>
            ),
            "BTS": (
              <>
                <CommonForm
                  classes={"grid-cols-4 gap-1"}
                  Form={BTS}
                  errors={errorsForm2}
                  register={registerForm2}
                  setValue={setValueForm2}
                  getValues={getValuesForm2}
                />
              </>
            ),
            "Antenna": (
              <>
                <CommonForm
                  classes={"grid-cols-4 gap-1"}
                  Form={finalAnteenaForm}
                  errors={errorsForm3}
                  register={registerForm3}
                  setValue={setValueForm3}
                  getValues={getValuesForm3}
                />
              </>
            ),
            "BBU Model": (
              <>
                <CommonForm
                  classes={"grid-cols-4 gap-1"}
                  Form={BBUModel}
                  errors={errorsForm4}
                  register={registerForm4}
                  setValue={setValueForm4}
                  getValues={getValuesForm4}
                />
              </>
            ),
            "Media Type": (
              <>
                <CommonForm
                  classes={"grid-cols-4 gap-1"}
                  Form={MediaType}
                  errors={errorsForm5}
                  register={registerForm5}
                  setValue={setValueForm5}
                  getValues={getValuesForm5}
                />
              </>
            ),
          }}
        />
      </div>
    </>
  );
};
export default RFAIPlanningDataForm;