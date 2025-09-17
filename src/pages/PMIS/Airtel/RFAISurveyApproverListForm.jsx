import { useEffect,useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../../components/Modal";
import CommonForm from "../../../components/CommonForm";
import Button from "../../../components/Button";
import AirtelActions from "../../../store/actions/airtel-actions";
import { GET_CURRENTUSER_CIRCLE_LIST } from "../../../store/reducers/airtel-reducer";

const RFAISurveyApproverListForm = ({
  isOpen,
  setIsOpen,
  resetting,
  formValue = {},
}) => {

  const {register,handleSubmit,watch,reset,setValue,getValues,formState: { errors }} = useForm();

  console.log(formValue,"formValue")

  let dispatch = useDispatch();

  const [modalOpen, setmodalOpen] = useState(false);



    

    let customerList = useSelector((state) => {
        return state?.adminData?.getManageCustomer.map((itm) => {
          return {
            label: itm.customerName,
            value: itm.customerId,
          };
        });
    });

    let circleList = useSelector((state) => {
        return state?.airtelData?.getAirtelCurrentUserCircleList.map((itm) => {
          return {
            label: itm.CircleName,
            value: itm.uniqueId,
          };
        });
    });


  let Form = [
    {
      label: "Emp Name",
      name: "emp",
      type: "sdisabled",
      value: "",
      required: true,
      classes: "col-span-1",
    },
    {
      label: "Profile",
      name: "roleName",
      type: "sdisabled",
      value: "",
      required: true,
      classes: "col-span-1",
    },
    {
      label: "Customer Name",
      value: "",
      name:"customer",
      type:  "select",
      required: true,
      option: customerList,
      props: {
        onChange: ((e) => {
          if (e.target.value){
            dispatch(GET_CURRENTUSER_CIRCLE_LIST({ dataAll:[], reset:true }));
            dispatch(AirtelActions.getAirtelCurrentUserCircleList(e.target.value,formValue.uniqueId))
          }
          else{
            dispatch(GET_CURRENTUSER_CIRCLE_LIST({ dataAll:[], reset:true }));
          }

        }),
      },
      classes: "col-span-1",
    },
    
    {
        label: "Circle",
        name: "circle",
        type:  "select",
        value: "",
        option: circleList,
        required: true,
        classes: "col-span-1",
    },
  ];

  




  const onTableViewSubmit = (data) => {
    data['empId'] = formValue.uniqueId
    dispatch(AirtelActions.postAirtelRFAISurveyApproverList(true,data,() => {
        setIsOpen(false);
        dispatch(AirtelActions.getAirtelRFAISurveyApproverList(true))},
        formValue?.uniqueId)
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
      Form.forEach((key) => {
        setValue(key.name, formValue[key.name]);
      });
    }
  }, [formValue, resetting]);

  return (
    <>
      <Modal
        size={"xl"}
        children={<></>}
        isOpen={modalOpen}
        setIsOpen={setmodalOpen}
      />

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-full pb-4">
        <CommonForm
          classes={"grid-cols-2 gap-1"}
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

export default RFAISurveyApproverListForm;
