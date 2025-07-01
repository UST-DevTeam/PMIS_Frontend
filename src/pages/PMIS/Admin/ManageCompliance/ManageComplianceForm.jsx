import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../../../components/Modal";
import CommonForm from "../../../../components/CommonForm";
import Button from "../../../../components/Button";
import AdminActions from "../../../../store/actions/admin-actions";
import { GET_ACTIVITY_AND_OEM_COMPLIANCE, GET_PROJECT_TYPE_COMPLIANCE, GET_SUB_PROJECT_TYPE_COMPLIANCE } from "../../../../store/reducers/admin-reducer";

const ManageComplianceForm = ({
  customeruniqueId,
  isOpen,
  setIsOpen,
  resetting,
  formValue = {},
}) => {


  const complainceRef = useRef({
    cid: "",
    projectType: "",
  });

  let dispatch = useDispatch();

  const [modalOpen, setmodalOpen] = useState(false);

  const { customerList, projectTypes, subProjectTypes, activity, OEM, milestone } =
    useSelector((state) => {
      const customerList = state?.adminData?.getManageCustomer.map((itm) => {
        return {
          label: itm?.customerName,
          value: itm?.uniqueId,
        };
      });
      const projectTypes = state?.adminData?.getProjectTypeCompliance.map(
        (itm) => {
          return {
            label: itm?.projectType,
            value: itm?.projectType,
          };
        }
      );
      const subProjectTypes = state?.adminData?.getSubProjectTypeCompliance.map(
        (itm) => {
          return {
            label: itm?.subProject,
            value: itm?.uniqueId,
          };
        }
      );
      const activity = state?.adminData?.getActivityAndOemCompliance.find(itm => itm.fieldName === "ACTIVITY")?.dropdownValue.split(",").map(
        (itm) => {
          return {
            label: itm,
            value: itm,
          };
        }
      ) || []

      const OEM = state?.adminData?.getActivityAndOemCompliance.find(itm => itm.fieldName === "OEM NAME")?.dropdownValue.split(",").map(
        (itm) => {
          return {
            label: itm,
            value: itm,
          };
        }
      ) || []

      const milestone = state?.adminData?.getActivityAndOemCompliance[0]?.MileStone?.map(
        (itm) => {
          return {
            label: itm.fieldName,
            value: itm.fieldName,
          };
        }
      ) || []

      return { customerList, projectTypes, subProjectTypes, activity, OEM, milestone };
    });


  let Form = [
    {
      label: "Customer Name",
      value: "",
      name: Object.entries(formValue).length > 0 ? "customerName" : "customer",
      type: Object.entries(formValue).length > 0 ? "sdisabled" : "select",
      required: true,
      option: customerList,
      props: {
        onChange: (e) => {
          const cid = e.target.value;
          complainceRef.current.cid = cid;
          dispatch(AdminActions.getProjectTypeCompiliance(true, `customerId=${cid}`));
        },
      },
      classes: "col-span-1",
    },

    {
      label: "Project Type",
      name: "projectType",
      type: "select",
      props: {
        onChange: (e) => {
          const projectType = e.target.value;
          complainceRef.current.projectType = projectType;
          dispatch(
            AdminActions.getSubProjectTypeCompiliance(true, "", complainceRef.current.cid, projectType)
          );
        },
      },
      option: projectTypes,
      required: true,
      value: "",
      classes: "col-span-1",
    },
    {
      label: "Sub Project",
      name: "subProject",
      type: "select",
      value: "",
      props: {
        onChange: (e) => {
          const subProjectType = e.target.value;
          dispatch(
            AdminActions.getActivityAndOemCompiliance(true, `subProjectType=${subProjectType}&milestoneArgs=${"YES"}`)
          );
        },
      },
      option: subProjectTypes,
      required: true,
      classes: "col-span-1",
    },
    {
      label: "Activity",
      name: "activity",
      type: "select",
      value: "",
      props: {
        onChange: (e) => { },
      },
      option: activity,
      required: true,
      classes: "col-span-1",
    },
    {
      label: "OEM",
      name: "oem",
      type: "select",
      value: "",
      props: {
        onChange: (e) => { },
      },
      option: OEM,
      required: true,
      classes: "col-span-1",
    },
    {
      label: "Milestone",
      name: "complianceMilestone",
      type: "select",
      value: "",
      option: milestone,
      props: {
        onChange: (e) => { },
      },
      required: true,
      classes: "col-span-1",
    },
  ];
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();


  const onTableViewSubmit = (data) => {
    if (formValue?.uniqueId) {
      dispatch(
        AdminActions.postCompiliance(
          true,
          data,
          () => {
            setIsOpen(false);
            dispatch(AdminActions.getCompiliance());
          },
          formValue?.uniqueId
        )
      );
    } else {
      dispatch(
        AdminActions.postCompiliance(true, data, () => {
          setIsOpen(false);
          dispatch(AdminActions.getCompiliance());

        })
      );
    }
  };
  useEffect(() => {
    dispatch(AdminActions.getManageCustomer());
    dispatch(GET_PROJECT_TYPE_COMPLIANCE({ dataAll: [], reset: true }))
    dispatch(GET_SUB_PROJECT_TYPE_COMPLIANCE({ dataAll: [], reset: true }))
    dispatch(GET_ACTIVITY_AND_OEM_COMPLIANCE({ dataAll: [], reset: true }))
    if (resetting) {
      reset({});
      Form.map((fieldName) => {
        console.log(fieldName, "fieldNamefieldNamefieldName");
        setValue(fieldName["name"], fieldName["value"]);
      });
    } else {
      reset({});
      console.log(Object.keys(formValue), "Object.keys(formValue)");
      Form.forEach((key) => {
        if (["endAt", "startAt"].indexOf(key.name) != -1) {
          console.log("date formValuekey", key.name, formValue[key.name]);
          const momentObj = moment(formValue[key.name]);
          setValue(key.name, momentObj.toDate());
        } else {
          setValue(key.name, formValue[key.name]);
        }
      });
    }
  }, [formValue, resetting]);
  return (
    <>
      <Modal
        size={"xl"}
        children={
          <>
            <CommonForm
              classes={"grid-cols-1 gap-1"}
              Form={Form}
              errors={errors}
              register={register}
              setValue={setValue}
              getValues={getValues}
            />
          </>
        }
        isOpen={modalOpen}
        setIsOpen={setmodalOpen}
      />

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-full pb-5">
        <CommonForm
          classes={"grid-cols-2 gap-1"}
          Form={Form}
          errors={errors}
          register={register}
          setValue={setValue}
          getValues={getValues}
        />
        {/* <button></button> */}

        {/* <button onClick={() => { setmodalOpen(true) }} className='flex bg-primaryLine mt-6 w-42 absolute right-1 top-1 justify-center rounded-md bg-pbutton px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bg-pbutton'>Add DB Type <Unicons.UilPlus /></button> */}
        {/* <Table headers={["S.No.", "DB Type", "DB Server", "DB Name", "Created By", "Created Date", "Last Modified By", "Last Modified Date", "Actions"]} columns={[["1", "abcd", "ancd", "abcd", "ancd"], ["2", "adsa", "dasdas", "abcd", "ancd"]]} /> */}
        {/* <button onClick={(handleSubmit(onTableViewSubmit))} className='bg-primaryLine mt-6 w-full justify-center rounded-md bg-pbutton px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bg-pbutton'>Submit</button> */}
        <Button
          classes={"mt-2 w-sm text-center flex mx-auto"}
          onClick={handleSubmit(onTableViewSubmit)}
          name="Submit"
        />
      </div>
    </>
  );
};

export default ManageComplianceForm;
