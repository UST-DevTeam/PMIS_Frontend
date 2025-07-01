import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../../../components/Modal";
import CommonForm from "../../../../components/CommonForm";
import Button from "../../../../components/Button";
import projectListActions from "../../../../store/actions/projectList-actions";
import { Urls } from "../../../../utils/url";

const VendorGroupTaskAllocation = ({
  from,
  listsite,
  isOpen,
  setIsOpen,
  resetting,
  formValue = {},
  projectuniqueId,
  filtervalue,
  checkbox,
  parentcheckbox,
  onClose = () => {},
  formName
}) => {
  const {
    register,
    handleSubmit,
    watch,
    reset: reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();
  let dispatch = useDispatch();
  const [modalOpen, setmodalOpen] = useState(false);
  const [modalFullOpen, setmodalFullOpen] = useState(false);
  const [activeTab, setactiveTab] = useState(3);
  const [modalFullBody, setmodalFullBody] = useState(<></>);
  const [old, setOld] = useState({});

  const dataGetterOld = useSelector((state) => {
    let oldata = state.projectList.getuserallocatedproject[0];
    if (oldata) {
      if (old["empDeatils"]) {
        if (oldata != old) {
          setValue("mileName", formValue["Name"]);
          setValue("ptypeId", oldata["PId"]);
          setOld(oldata);
        }
      } else {
        setValue("mileName", formValue["Name"]);
        setValue("ptypeId", oldata["PId"]);
        setOld(oldata);
      }
    }
    return oldata;
  });



  const workDescriptionOption = useSelector((state) => {
    return state?.adminData?.getPartnerActivity.map((itm) => {
      return {
        label: itm.workDescriptionName,
        value: itm.workDescription + ":;" + itm.milestone,
      };
    });
  });

  let Form = [
    {
      label: "Work Description",
      name: "workDescription",
      value: "",
      required: true,
      type: "select",
      option: workDescriptionOption,
      props: {
        onChange: (e) => {
          const selectedValue = e.target.value.split(":;")[1];
          setValue("groupMilestone", selectedValue);
        },
      },
      classes: "col-span-1",
    },
    {
      label: "Milestone Name",
      name: "groupMilestone",
      value: "",
      required: true,
      type: "sdisabled",
      classes: "col-span-1",
    }
  ];

  if (formName !== "Deallocate Task"){
    Form.push(
      {
        label: "Assign Vendor",
        name: "vendorId",
        type: "newSingleSelect50",
        value: "",
        singleSelect: true,
        option: dataGetterOld
          ? dataGetterOld["vendorDetails"]
            ? dataGetterOld["vendorDetails"].map((vendor) => ({
                value: vendor.id,
                label: vendor.name, 
              }))
            : []
          : [],
        id: dataGetterOld
          ? dataGetterOld["vendorDetails"]
            ? dataGetterOld["vendorDetails"].map((vendor) => ({
                value: vendor.id,
                label: vendor.name,
              }))
            : []
          : [],
        onSelecting: (e) => {
          console.log("onSelecting vendor", e);
          setValue("userId", "");
        },
        onRemoving: (e) => {
          console.log("onRemoving vendor", e);
          setValue("userId", "");
        },
        required: true,
        classes: "col-span-1",
        width: "400px",
      }      
    )
  }

  const onTableViewSubmit = (data) => {
    let allData = {};
    allData["workDescription"] = data["workDescription"].split(":;")[0];
    allData["groupMilestone"] = data["groupMilestone"];
    allData["vendorId"] = data["vendorId"];
    allData["siteId"] = listsite;


    if (formName !== "Deallocate Task"){
      dispatch(
        projectListActions.partnerGroupMilestonePatch(
          Urls.projectList_partner_group_milestone,
          allData,
          () => {
            dispatch(
              projectListActions.getProjectTypeAll(projectuniqueId, filtervalue)
            );
            setIsOpen(false);
            checkbox([]);
            parentcheckbox([]);
          }
        )
      );
    }
    else {
      dispatch(
        projectListActions.partnerGroupMilestonePost(
          Urls.projectList_partner_group_milestone,
          allData,
          () => {
            dispatch(
              projectListActions.getProjectTypeAll(projectuniqueId, filtervalue)
            );
            setIsOpen(false);
            checkbox([]);
            parentcheckbox([]);
          }
        )
      );
    }



  };

  useEffect(() => {
    
    reset();
  }, []);

  return (
    <>
      <Modal
        size={"xl"}
        children={modalFullBody}
        isOpen={modalFullOpen}
        setIsOpen={setmodalFullOpen}
      />

      <div className="">
        <CommonForm
          classes={""}
          Form={Form}
          errors={errors}
          register={register}
          setValue={setValue}
          getValues={getValues}
        />
        <Button
          classes={"mt-2 w-sm text-center flex mx-auto"}
          onClick={handleSubmit(onTableViewSubmit)}
          name="Submit"
        />
      </div>
    </>
  );
};

export default VendorGroupTaskAllocation;
