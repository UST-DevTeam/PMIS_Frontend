import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import moment from "moment";
import { useDispatch, useSelector} from "react-redux";
import Modal from "../../../../components/Modal";
import CommonForm from "../../../../components/CommonForm";
import Button from "../../../../components/Button";
import AdminActions from "../../../../store/actions/admin-actions";
import { ALERTS } from "../../../../store/reducers/component-reducer";

const SubProjectMasterTableForm = ({
  isOpen,
  setIsOpen,
  resetting,
  formValue = {},
}) => {

  let dispatch = useDispatch();
  const [modalOpen, setmodalOpen] = useState(false);

  let subProjectList = useSelector((state) => {
    return state?.adminData?.getSubProjectDeliveryPVA.map((itm) => {
      return {
        name: itm?.subProject,
        id: itm?.subProjectId,
      };
    }) || []
  });


  let Form = [
    {
      label: "Customer",
      name: "customerName",
      value: "",
      required: true,
      type: "sdisabled",
      classes: "col-span-1",
    },
    {
      label: "Project Type",
      name: "projectType",
      value: "",
      required: true,
      type: "sdisabled",
      classes: "col-span-1",
    },
    {
      label: "Sub Project",
      name: "subProject",
      type: "BigmuitiSelect",
      option: subProjectList,
      value: "",
      props: {
        onChange: (e) => { },
      },
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
    if (!data['subProject']){
      let msgdata = {
        show: true,
        icon: "error",
        buttons: [],
        type: 1,
        text: "Please Select atleast one Sub-Project Type",
      };
      dispatch(ALERTS(msgdata));
    }
    let allData = {}
    allData['customer'] = formValue.customerId
    allData['projectType'] = formValue.projectType
    allData['subProjectIds'] = data.subProject.split(",")
      dispatch(AdminActions.postDeliveryPVA(allData,() => {
            setIsOpen(false);
            dispatch(AdminActions.getDeliveryPVA())
          },
          formValue.uniqueId
        )
      );
  };


  useEffect(() => {
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

export default SubProjectMasterTableForm;
