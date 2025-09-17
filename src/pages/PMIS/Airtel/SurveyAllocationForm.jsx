import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../../components/Modal";
import CommonForm from "../../../components/CommonForm";
import Button from "../../../components/Button";
import projectListActions from "../../../store/actions/projectList-actions";
import { Urls } from "../../../utils/url";
import DynamicTabContent from "../../../components/DynamicTabContent";
import { ALERTS } from "../../../store/reducers/component-reducer";
import AirtelActions from "../../../store/actions/airtel-actions";

const SurveyAllocationForm = ({from,listsite,isOpen,setIsOpen,resetting,formValue = {},projectuniqueId,filtervalue,checkbox,parentcheckbox}) => {

  const {register,handleSubmit,watch,reset,setValue,getValues,formState: { errors }} = useForm();

  let dispatch = useDispatch();

  const [modalFullOpen, setmodalFullOpen] = useState(false);
  const [activeTab, setactiveTab] = useState(3);
  const [modalFullBody, setmodalFullBody] = useState(<></>);
  const [old, setOld] = useState({});

  const dataGetterOld = useSelector((state) => {
    let oldata = state.airtelData.getAirtelUserAllocatedProject[0];
    if (oldata) {
      if (old["empDeatils"]) {
        if (oldata != old) {
        //   setValue("circleId", formValue["Name"]);
        //   setValue("ptypeId", oldata["PId"]);
          setOld(oldata);
        }
      } else {
        // setValue("mileName", formValue["Name"]);
        // setValue("ptypeId", oldata["PId"]);
        setOld(oldata);
      }
    }
    return oldata;
  });


  let Form = [
    {
      label: "Assign In-House",
      name: "userId",
      type: "BigmuitiSelect",
      value: "",
      option: dataGetterOld
        ? dataGetterOld["empDeatils"] && dataGetterOld["empDeatils"][0]?.["name"]
          ? dataGetterOld["empDeatils"]
          : []
        : [],
      props: {
        onChange: (e) => {
          // console.log(e.target.value, "e.target.value");
        },
      },

      onSelecting: (e) => {
        // console.log("onRemovings user", e);
        setValue("vendorId", "");
      },
      onRemoving: (e) => {
        // console.log("onRemoving  user", e);
        setValue("vendorId", "");
      },
      required: true,
      classes: "col-span-2",
      width:"400px"
    },
  ];

  let VendorForm = [
    {
      label: "Assign Partner",
      name: "vendorId",
      type: "BigmuitiSelect",
      value: "",
      singleSelect: true,
      option: dataGetterOld
        ? dataGetterOld["vendorDetails"]
          ? dataGetterOld["vendorDetails"]
          : []
        : [],
      props: {
        onChange: (e) => {
        },
      },
      onSelecting: (e) => {
        // console.log("onRemovings vendor", e);
        setValue("userId", "");
      },
      onRemoving: (e) => {
        // console.log("onRemoving vendor", e);
        setValue("userId", "");
      },
      required: true,
      classes: "col-span-1",
      width:"400px"
    },
  ];

  const onTableViewSubmit = (data) => {

    if (activeTab == 0){
        if (!("userId" in data) || !data['userId']){
            let msgdata = {
                show: true,
                icon: "error",
                buttons: [],
                type: 1,
                text: "Oops! You need to select at least one user before proceeding.",
            };
            dispatch(ALERTS(msgdata));
            return
        }
    }
    else if (activeTab == 1){
        if (!("vendorId" in data) || !data['vendorId']){
            let msgdata = {
                show: true,
                icon: "error",
                buttons: [],
                type: 1,
                text: "Oops! You need to select a partner before proceeding.",
            };
            dispatch(ALERTS(msgdata));
            return
        }

    }
    else {
        let msgdata = {
            show: true,
            icon: "error",
            buttons: [],
            type: 1,
            text: "Oops! Something went Wrong Please reload the page and try again",
        };
        dispatch(ALERTS(msgdata));
        return

    }

    let dataForApp = [];
    let assigningTo = ""

    if (activeTab == 0) {
      dataForApp = data["userId"];
      assigningTo = "In-House"
      
    } else if (activeTab == 1) {
      dataForApp = data["vendorId"];
      assigningTo = "Partner"
    }

    let finaldata = {
        assignerId: dataForApp,
        assigningTo: assigningTo,
        "uid":formValue["uniqueId"],
    }

    dispatch(AirtelActions.patchAirtelRFAIOffered(Urls.airtelRFAIOffered,finaldata,
        () => {
            dispatch(AirtelActions.getAirtelRFAIOffered())
            setIsOpen(false);
            setValue("userId", "");
            setValue("vendorId", "");
            setactiveTab(3);

        }
    ))


    // if (listsite.length == 0) {
    //   let finaldata = {
    //     name: from,
    //     data: {
    //       assignerId: dataForApp,
    //       assigningTo: assigningTo
    //     },
    //     from: {
    //       uid: formValue["uniqueId"],
    //     },
    //   };

    //   dispatch(
    //     projectListActions.globalProjectTypeDataPatch(Urls.projectList_globalSaver,projectuniqueId,finaldata,
    //       () => {
    //         dispatch(projectListActions.getProjectTypeAll(projectuniqueId,filtervalue));
    //         setIsOpen(false);
    //         checkbox([]);
    //         parentcheckbox([]);

    //       }
    //     )
    //   );
    // } else {
    //   let finaldata = {
    //     name: from,
    //     data: {
    //       assignerId: dataForApp,
    //       assigningTo: assigningTo
    //     },
    //     from: {
    //       uid: listsite,
    //     },
    //   };

    //   dispatch(
    //     projectListActions.globalProjectTypeDataPatch(
    //       Urls.projectList_globalSaver,
    //       projectuniqueId,
    //       finaldata,
    //       () => {
    //         dispatch(projectListActions.getProjectTypeAll(projectuniqueId,filtervalue));
    //         setIsOpen(false);
    //         checkbox([]);
    //         parentcheckbox([]);
    //       }
    //     )
    //   );
    // }
  };

  useEffect(() => {
    setactiveTab(3)
    setValue("userId", "");
    setValue("vendorId", "");
  }, [formValue.uniqueId]);




  return (
    <>
      <Modal
        size={"xl"}
        children={modalFullBody}
        isOpen={modalFullOpen}
        setIsOpen={setmodalFullOpen}
      />

      <div className="flex justify-evenly">
        <Button
          name={"Allocate to In-House"}
          onClick={() => {
            setactiveTab(0);
          }}
          classes="w-auto mt-10"
        />
        <Button
          name={"Allocate to Partner"}
          onClick={() => {
            setactiveTab(1);
          }}
          classes="w-auto mt-10"
        />
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-full pb-4">
        <DynamicTabContent
          activeTab={activeTab}
          tabList={[
            <CommonForm
              classes={"grid-cols-1 gap-1 w-full"}
              Form={Form}
              errors={errors}
              register={register}
              setValue={setValue}
              getValues={getValues}
            />,
            <CommonForm
              classes={"grid-cols-1 gap-1"}
              Form={VendorForm}
              errors={errors}
              register={register}
              setValue={setValue}
              getValues={getValues}
            />,
          ]}
        />
        {activeTab != 3 ? (
          <Button
            classes={"mt-2 w-sm text-center flex mx-auto"}
            onClick={handleSubmit(onTableViewSubmit)}
            name="Submit"
          />
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default SurveyAllocationForm;