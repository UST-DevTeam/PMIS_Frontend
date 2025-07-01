import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../../../components/Modal";
import CommonForm from "../../../../components/CommonForm";
import Button from "../../../../components/Button";
import gpTrackingActions from "../../../../store/actions/gpTrackingActions";
import FormssActions from "../../../../store/actions/formss-actions";
import { useParams } from "react-router-dom";

const DeliveryPVAForm = ({
  isOpen,
  setIsOpen,
  resetting,
  formValue = {},
  filters,
}) => {
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [extraaFormFields, setExtraaFormFields] = useState([])

  const { MSType, customerId } = useParams()

  let circleList = useSelector((state) => {
    return state?.formssData?.getCircle.map((itm) => {
      return {
        label: itm?.circle,
        value: itm?.circleId,
      };
    });
  });

  const subProjectType = useSelector(state => {
    return state?.formssData?.getCircleSubProjectType || []
  })


  const endDate = moment().format("Y");
  const [modalOpen, setmodalOpen] = useState(false);

  let dispatch = useDispatch();

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
      label: "Circle",
      value: "",
      name:
        Object.entries(formValue).length > 0
          ? "circle"
          : "circleId",
      type: Object.entries(formValue).length > 0 ? "sdisabled" : "select",
      option: circleList,
      required: true,
    },
    ...extraaFormFields
  ];

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    getValues,
    formState: { errors },
    unregister
  } = useForm();


  useEffect(() => {
    subProjectType.forEach(item => {
      unregister(item?.subProjectName)
    })

    const fields = subProjectType?.map(item => {
      return {
        label: item?.subProjectName,
        value: "",
        name: item?.subProjectName + "-" + item?.subProjectId,
        type: Object.entries(formValue).length > 0 ? "sdisabled" : "number",
        required: false,
        defaultValue: 0
      }

    })
    setExtraaFormFields(fields)
  }, [subProjectType])


  const onTableViewSubmit = async (data) => {
    const newData = {}
    newData["year"] = Number(data["year"]);
    newData["month"] = Number(data["month"]);
    newData['circleId'] = data['circleId'];
    newData['MSType'] = MSType.split("-")[0];

    delete data['circleId']
    delete data['year']
    delete data['month']

    const subProjects = []

    Object.keys(data).forEach(key => {
      subProjects.push({
        subProjectId: key.split("-")[1],
        subProjectName: key.split("-")[0],
        value: data[key] ? +data[key] : 0
      })
    })

    newData["subProjects"] = subProjects
    newData["customerId"] = customerId

    dispatch(FormssActions.patchEvmActual(newData, () => {
      setIsOpen(false);
      dispatch(FormssActions.getPvaData(filters))
      reset()
    }))

  };
  

  useEffect(() => {
    dispatch(FormssActions.getCircle(customerId))
    dispatch(FormssActions.getCircleSubProjectType(customerId))
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

export default DeliveryPVAForm;
