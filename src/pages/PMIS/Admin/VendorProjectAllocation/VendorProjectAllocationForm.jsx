import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import moment from "moment";
import * as Unicons from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../../../components/Modal";
import CommonForm from "../../../../components/CommonForm";
import Button from "../../../../components/Button";
import AdminActions from "../../../../store/actions/admin-actions";

const VendorProjectAllocationForm = ({
  isOpen,
  setIsOpen,
  resetting,
  formValue = {},
}) => {

  let dispatch = useDispatch();
  const [modalOpen, setmodalOpen] = useState(false);


  let projectList = useSelector((state) => {
    return state?.adminData?.getVishal.map((itm) => {
      return {
        name: itm?.projectId,
        id: itm?.uniqueId,
      };
    });
  });


  let Form = [
    {
      label: "Vendor",
      name: "vendor",
      value: "",
      required: true,
      type: "sdisabled",
      classes: "col-span-1",
    },
    {
      label: "Project",
      name: "project",
      type: "BigmuitiSelect",
      value: "",
      option: projectList,
      props: {
        onChange: (e) => { }
      },
      classes: "col-span-1 w-full",
      width:"350px"
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
    if (formValue.uniqueId) {
      dispatch(
        AdminActions.postVendorProjectAllocation(
          data,
          () => {
            console.log("CustomQueryActions.postDBConfig");
            setIsOpen(false);
            dispatch(AdminActions.getVendorProjectAllocation());
          },
          formValue.uniqueId
        )
      );
    } else {
      dispatch(
        AdminActions.postVendorProjectAllocation(data, () => {
          console.log("CustomQueryActions.postDBConfig");
          setIsOpen(false);
          dispatch(AdminActions.getVendorProjectAllocation());
        })
      );
    }
  };

  useEffect(() => {
    dispatch(AdminActions.getVishal());
    if (resetting) {
      reset({});
      Form.map((fieldName) => {
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

        projectList.map(()=>{
          if(key.name == "projectName" && formValue[key.name] == "All Projects"){
            setValue(key.name, formValue[key.name]);
        }})

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

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-full pb-4">
        <CommonForm
          classes={"grid-cols-1 gap-1"}
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

export default VendorProjectAllocationForm;
