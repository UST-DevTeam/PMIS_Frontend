import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../../../components/Modal";
import CommonForm from "../../../../components/CommonForm";
import Button from "../../../../components/Button";
import AdminActions from "../../../../store/actions/admin-actions";

const ManageUserProjectAllocForm = ({
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
      label: "Employee",
      name: "emp",
      value: "",
      required: true,
      type: "sdisabled",
      classes: "col-span-1",
    },
    {
      label: "Profile",
      name: "userRole",
      value: "",
      required: true,
      type: "sdisabled",
      classes: "col-span-1",
    },
    {
      label: "Project",
      name: "projectIds",
      type: "BigmuitiSelect",
      value: "",
      option: projectList,
      props: {
        onChange: (e) => { },
      },
      classes: "col-span-2",
      width:"450px"
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
        AdminActions.postProjectAllocation(
          data,
          () => {
            setIsOpen(false);
            dispatch(AdminActions.getProjectAllocation());
          },
          formValue.uniqueId
        )
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
      Form.forEach((key) => {
          setValue(key.name, formValue[key.name]);
      });
    }
  }, [formValue, resetting]);


  return (
    <>
      <Modal
        size={"full"}
        children={
          <>
            <CommonForm
              classes={"grid-cols-2 gap-1"}
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
        <Button
          classes={"mt-2 w-sm text-center flex mx-auto"}
          onClick={handleSubmit(onTableViewSubmit)}
          name="Submit"
        />
      </div>
    </>
  );
};

export default ManageUserProjectAllocForm;
