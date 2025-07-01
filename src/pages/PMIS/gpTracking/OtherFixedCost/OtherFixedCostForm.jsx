import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import moment from "moment";
import * as Unicons from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../../../components/Modal";
import CommonForm from "../../../../components/CommonForm";
import Button from "../../../../components/Button";
// import FormssActions from "../../../store/actions/formss-actions";
// import CurrentuserActions from "../../../store/actions/currentuser-action";
import gpTrackingActions from "../../../../store/actions/gpTrackingActions";


const OtherFixedCostForm = ({
  isOpen,
  setIsOpen,
  resetting,
  formValue = {},
  year,
  month,
  monthss,
}) => {
  const [selectedCustomer, setSelectedCustomer] = useState("");

  let costCenterList = useSelector((state) => {
    return state?.gpTrackingReducer?.getCostCenter.map((itm) => {
      return {
        label: itm?.costCenter,
        value: itm?.costCenterId,
      };
    });
  });
  let gpCostTypesList = useSelector((state) => {
    console.log("ygsgdygyegyedygygu",state)
    return state?.gpTrackingReducer?.getOtherFixedCostTypes.map((itm) => {
      return {
        label: itm?.costType,
        value: itm?.uniqueId,
      };
    });
  });
  let customerList = useSelector((state) => {
    console.log("hjdjhbdbhehyukg", state);
    return state?.gpTrackingReducer?.getCustomer.map((itm) => {
      
      return {
        label: itm?.customer,
        value: itm?.uniqueId,
      };
    });
  });

  const endDate = moment().format("Y");
  const [modalOpen, setmodalOpen] = useState(false);
  let dispatch = useDispatch();
  const handleCustomerChange = (value) => {
    const selectedValue = value;
    setSelectedCustomer(selectedValue);
    // dispatch(gpTrackingActions.getGPProjectGroup(selectedValue,true));
    dispatch(gpTrackingActions.getGPCostCenter(selectedValue,true));
  };

  const months = [
    { label: "Jan", value: 1 },
    { label: "Feb", value: 2 },
    { label: "Mar", value: 3 },
    { label: "Apr", value: 4 },
    { label: "May", value: 5 },
    { label: "Jun", value: 6 },
    { label: "Jul", value: 7 },
    { label: "Aug", value: 8 },
    { label: "Sep", value: 9 },
    { label: "Oct", value: 10 },
    { label: "Nov", value: 11 },
    { label: "Dec", value: 12 },
  ];

  let listYear = [];
  for (let ywq = 2023; ywq <= +endDate; ywq++) {
    listYear.push({ label: ywq, value: ywq });
  }

  let Form = [
    {
      label: "Year",
      value: "",
      name: "year",
      type: Object.entries(formValue).length > 0 ? "sdisabled" : "select",
      option: listYear,
      required: true,
    },
    {
      label: "Month",
      value: "",
      name: "month",
      type: Object.entries(formValue).length > 0 ? "sdisabled" : "select",
      option: months,
      required: true,
    },
    {
      label: "Customer",
      value: "",
      name:
        Object.entries(formValue).length > 0
          ? "customer"
          : "customerId",
      type: Object.entries(formValue).length > 0 ? "sdisabled" : "select",
      option: customerList,
      props: {
        onChange: (e) => {
          handleCustomerChange(e.target.value);
        },
      },
      required: true,
    },
    {
      label: "Cost Center",
      value: "",
      name:
        Object.entries(formValue).length > 0
          ? "costCenter"
          : "costCenterId",
      type: Object.entries(formValue).length > 0 ? "sdisabled" : "select",
      option: costCenterList,
      required: true,
    },
    // {
    //     label: "Cost Type",
    //     value: "",
    //     name: "costType",
    //     type: "text",
    //     classes: "col-span-1",
    //   },
    {
      label: "Cost Type",
      value: "",
      name:
        Object.entries(formValue).length > 0
          ? "costType"
          : "costTypeId",
      type: Object.entries(formValue).length > 0 ? "sdisabled" : "select",
      option: gpCostTypesList,
      required: true,
    },
    // {
    //     label: "Cost Type",
    //     value: "",
    //     name: "costType",
    //     type: "text",
    //     classes: "col-span-1",
    //   },
    {
      label: "Cost",
      value: "",
      name: "cost",
      type: "text",
      classes: "col-span-1",
      // props: {
      //   valueAsNumber: true,
      //   min: 0,
      // },
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

  const onSubmit = (data) => {
    console.log(data);
  };

  const onTableViewSubmit = (data) => {
    const convertToIntOrNull = (value) =>
      isNaN(value) ? null : parseInt(value);

    data["year"] = Number(data["year"]);
    data["month"] = Number(data["month"]);

    // data.cost = convertToIntOrNull(data.cost);
    

    if (formValue.uniqueId) {
      dispatch(
        gpTrackingActions.postGPOtherFixedCost(true,
          data,
          () => {
            setIsOpen(false);
            dispatch(gpTrackingActions.getOtherFixedCost());
          },
          formValue.uniqueId
        )
      );
    } else {
      dispatch(
        gpTrackingActions.postGPOtherFixedCost(true,data, () => {
          setIsOpen(false);
          dispatch(gpTrackingActions.getOtherFixedCost());
        })
      );
    }
  };

  useEffect(() => {
    // dispatch(CurrentuserActions.getcurrentuserCostCenter())
    dispatch(gpTrackingActions.getGPCostCenter);
    dispatch(gpTrackingActions.getGPOtherFixedCostTypes())
    dispatch(gpTrackingActions.getGPCustomer());
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
        <Button
          classes={"mt-2 w-sm text-center flex mx-auto"}
          onClick={handleSubmit(onTableViewSubmit)}
          name="Submit"
        />
      </div>
    </>
  );
};

export default OtherFixedCostForm;
