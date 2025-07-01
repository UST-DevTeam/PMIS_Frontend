import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../../../components/Modal";
import CommonForm from "../../../../components/CommonForm";
import Button from "../../../../components/Button";
import AdminActions from "../../../../store/actions/admin-actions";

const ManageClaimTypeDesignationForm = ({
  isOpen,
  isEditable = false,
  setIsOpen,
  resetting,
  formValue = {},
}) => {
  const [modalOpen, setmodalOpen] = useState(false);

  let dispatch = useDispatch();
  let claimTypeHeaders = useSelector((state) => {
    let interdata = state?.adminData?.getManageClaimType || [""];
    return interdata;
  });

  let DesignationList = useSelector((state) => {
    return state?.adminData?.getManageDesignation?.map((itm) => {
      return {
        label: itm?.designation,
        value: itm?.uniqueId,
      };
    });
  });

  let hh = claimTypeHeaders.map((item) => {
    const names = item?.claimType + "__" + item?.uniqueId;
    return {
      label: item.claimType,
      value: formValue[item.claimType] || "", 
      name: names,
      // required: true,
      type: "text",
      classes: "col-span-1",
    };
  });

  let Form = [
    {
      label: "Grade",
      value: "",
      name:Object.entries(formValue).length > 0 ? "designation" : "Designation",
      type:Object.entries(formValue).length > 0 ? "sdisabled" : "select",
      option: DesignationList,
      required: true,
      classes: "col-span-1",
    },
    {
      label: "Site ID",
      value: "",
      name: "siteId",
      type: "select",
      option: [
        { name: "Yes", label: "Yes" },
        { name: "No", label: "No" },
      ],
      required: true,
      classes: "col-span-1",
    },
    {
      label: "Task Name",
      value: "",
      name: "taskName",
      type: "select",
      option: [
        { name: "Yes", label: "Yes" },
        { name: "No", label: "No" },
      ],
      required: true,
      classes: "col-span-1",
    },
  ];

  if (Form !== null) {
    Form.push(...hh);
  }

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    // dispatch(AuthActions.signIn(data, () => {
    //     navigate('/authenticate')
    // }))
  };
  const onTableViewSubmit = (data) => {
    if (formValue.uniqueId) {
      dispatch(
        AdminActions.postManageClaimTypeDesignation(
          data,
          () => {
            setIsOpen(false);
            dispatch(AdminActions.getManageClaimTypeDesignation());
          },
          formValue.uniqueId
        )
      );
    } else {
      dispatch(
        AdminActions.postManageClaimTypeDesignation(data, () => {
          setIsOpen(false);
          dispatch(AdminActions.getManageClaimTypeDesignation());
        })
      );
    }
  };

  useEffect(() => {
      dispatch(AdminActions.getManageClaimType());
      dispatch(AdminActions.getManageDesignation());
    if (resetting) {
      reset({});
      Form.map((fieldName) => {
        setValue(fieldName["name"], fieldName["value"]);
      });
    } else {
      reset({});
      Object.keys(formValue).forEach((key) => {
        console.log(key, formValue[key], "Object.keys(formValue)");
        if (["endAt", "startAt"].indexOf(key.name) != -1) {
          console.log("date formValuekey", key.name, formValue[key.name]);
          const momentObj = moment(formValue[key.name]);
          setValue(key.name, momentObj.toDate());
        } else {
          setValue(key, formValue[key]);
        }
      });


      hh.map((itm)=>{
        setValue(itm.name,itm.value);
      })
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

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-full pb-4">
        <CommonForm
          classes={"grid-cols-3 gap-1"}
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

export default ManageClaimTypeDesignationForm;
