import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import moment from "moment";
import * as Unicons from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../../../components/Modal";
import CommonForm from "../../../../components/CommonForm";
import Button from "../../../../components/Button";
import FormssActions from "../../../../store/actions/formss-actions";
import CurrentuserActions from "../../../../store/actions/currentuser-action";

const PLform = ({
  isOpen,
  setIsOpen,
  resetting,
  formValue = {},
  year,
  month,
  monthss,
}) => {

  let roleName = useSelector((state) => {
    console.log(state,"++++state")
    let role = state?.auth?.user?.roleName;
    return role;
  });

  let costCenterList = useSelector((state) => {
    return state?.currentuserData?.getcurrentusercostcenter.map((itm) => {
      return {
        label: itm?.costCenter,
        value: itm?.uniqueId,
      };
    });
  });

  const endDate = moment().format("Y");
  const [modalOpen, setmodalOpen] = useState(false);
  let dispatch = useDispatch();

  const months = [
    {'label':'Jan','value':1},
    {'label':'Feb','value':2},
    {'label':'Mar','value':3},
    {'label':'Apr','value':4},
    {'label':'May','value':5},
    {'label':'Jun','value':6},
    {'label':'Jul','value':7},
    {'label':'Aug','value':8},
    {'label':'Sep','value':9},
    {'label':'Oct','value':10},
    {'label':'Nov','value':11},
    {'label':'Dec','value':12},
  ]

  let listYear = [];
  for (let ywq = 2023; ywq <= +endDate; ywq++) {
    listYear.push({'label':ywq,'value':ywq});
  }

  let Form = [
    {
      label: "Year",
      value: "",
      name: 'year',
      type: Object.entries(formValue).length > 0 ? "sdisabled" : "select",
      option:listYear,
      required:true,
    },
    {
      label: "Month",
      value: "",
      name: 'month',
      type: Object.entries(formValue).length > 0 ? "sdisabled" : "select",
      option:months,
      required:true,
    },
    {
      label: "Cost Center",
      value: "",
      name: Object.entries(formValue).length > 0 ? "costCenterName" : "costCenter",
      type: Object.entries(formValue).length > 0 ? "sdisabled" : "select",
      option:costCenterList,
      required:true,
    },
    {
      label: "Projected Revenue",
      value: "",
      name: `projectedRevenue`,
      type: "number",
      props: {
        valueAsNumber: true,
        min: 1,
      },
    },
    {
      label: "Actual Revenue",
      value: "",
      name: `actualRevenue`,
      type: "number",
      props: {
        valueAsNumber: true,
        min: 1,
      },
      classes: "col-span-1",
    },
    {
      label: "Projected Cost",
      value: "",
      name: "projectedCost",
      type: "number",
      props: {
        valueAsNumber: true,
        min: 1,
      },
      classes: "col-span-1",
    },
    {
      label: "Actual Cost",
      value: "",
      name: `actualCost`,
      type: "number",
      props: {
        valueAsNumber: true,
        min: 1,
      },
      classes: "col-span-1",
    },
    {
      label: "SGNA Cost",
      value: "",
      name: "sgna",
      type: "number",
      props: {
        valueAsNumber: true,
        min: 1,
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


  const onSubmit = (data) => {
    console.log(data);
  };

  const onTableViewSubmit = (data) => {

    const convertToIntOrNull = (value) => isNaN(value) ? null : parseInt(value);

    data['year'] = Number(data['year'])
    data['month'] = Number(data['month'])
    data.projectedRevenue = convertToIntOrNull(data.projectedRevenue);
    data.projectedCost = convertToIntOrNull(data.projectedCost);
    data.actualRevenue = convertToIntOrNull(data.actualRevenue);
    data.actualCost = convertToIntOrNull(data.actualCost);
    data.sgna = convertToIntOrNull(data.sgna);

    if (formValue.uniqueId) {
      dispatch(FormssActions.putprofitandloss(data,() => {
          setIsOpen(false) 
          dispatch(FormssActions.getProfiltLoss())}, formValue.uniqueId)
      );
    } else {
      dispatch(
        FormssActions.putprofitandloss(data, () => {
          setIsOpen(false);
          dispatch(FormssActions.getProfiltLoss());
        })
      );
    }
  };


  useEffect(() => {
    dispatch(CurrentuserActions.getcurrentuserCostCenter())
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

export default PLform;
