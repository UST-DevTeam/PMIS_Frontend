import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import moment from "moment";
import * as Unicons from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../../../components/Modal";
import CommonForm from "../../../../components/CommonForm";
import Button from "../../../../components/Button";
import AdminActions from "../../../../store/actions/admin-actions";
import ExpenseAdvanceActions from "../../../../store/actions/expenseAdvance-actions";
import { ALERTS } from "../../../../store/reducers/component-reducer";

const FillAdvanceForm = ({
  isOpen,
  setIsOpen,
  resetting,
  formValue = {},
}) => {
  const [modalOpen, setmodalOpen] = useState(false);

  let dispatch = useDispatch();

  let projectDetailsList = useSelector((state) => {
    return state?.expenseAdvanceData?.getExpADvPrjectDetails.map((itm) => {
      return {
        label: itm?.projectId,
        value: itm?.projectUniqueId,
      };
    });
  });

  let AdvanceProject = useSelector((state) => {
    return state?.expenseAdvanceData?.getClaimTypeAdvance.map((itm) => {
      return {
        label: itm?.name,
        value: itm?.claimTypeId,
      };
    });
  });

  let Form = [
    {
      label: "Project Id",
      value: "",
      name:Object.entries(formValue).length > 0 ? "projectIdName" : "projectId",
      type: Object.entries(formValue).length > 0 ? "sdisabled" : "newSingleSelect45",
      option: projectDetailsList,
      props: {
        onChange: (e) => {
          dispatch(
            ExpenseAdvanceActions.getExpADvSiteID(
              true,
              `projectId=${e.target.value}`
            )
          );
        },
      },
      required: true,
      classes: "col-span-1",
    },   
    {
      label: "Advance Type",
      value: "",
      name:Object.entries(formValue).length > 0 ? "advanceType" : "name ",
      type: Object.entries(formValue).length > 0 ? "sdisabled" : "select",
      option: AdvanceProject,
      // required: true,
      classes: "col-span-1",
    },
    {
      label: "Amount ",
      value: "",
      name: "Amount",
      type: "number",
      props: {
        valueAsNumber: true,
        min: 0,
        onChange: (e) => {},
        },
      // required: true,
      classes: "col-span-1",
    },
    {
      label: "Additional Info",
      value: "",
      name: "additionalInfo",
      type: "text",
      props: {},
      // required: true,
      classes: "col-span-1",
    },
    {
      label: "Remarks ",
      value: "",
      name: "remark",
      type: "text",
      props: {},
      // required: true,
      classes: "col-span-1",
    },
    // {
    //     label: "Attachment",

    //     value: "",
    //     name: "Attachment",
    //     type: "file",
    //     // required: true,
        
    //     props: {
    //         onChange: ((e) => {
    //             console.log(e.target.files, "e geeter")
    //             setValue("attachment",e.target.files[0])
    //         }),
    //         accept: '.img, .png, .jpg, .jpeg, .webp, .pdf',
    //     },
    //     classes: "col-span-1",
    //     multiple:false,
    // },
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
    // dispatch(AuthActions.signIn(data, () => {
    //     navigate('/authenticate')
    // }))
  };
  const onTableViewSubmit = (data) => {
    console.log(data, "datadata");
    // dasdsadsadasdas
    if (formValue.uniqueId) {
      dispatch(
        ExpenseAdvanceActions.postFillAdvance(
          true,
          data,
          () => {
            setIsOpen(false);
            dispatch(ExpenseAdvanceActions.getFillAdvance());
          },
          formValue.uniqueId
        )
      );
    } else {
      dispatch(
        ExpenseAdvanceActions.postFillAdvance(true, data, () => {
          console.log("CustomQueryActions.postDBConfig");
          setIsOpen(false);
          dispatch(ExpenseAdvanceActions.getFillAdvance());
        })
      );
    }
  };
  console.log(Form, "Form 11");

  useEffect(() => {
    dispatch(ExpenseAdvanceActions.getExpADvPrjectDetails());
    dispatch(ExpenseAdvanceActions.getClaimTypeAdvance());
    if (resetting) {
      reset({});
      Form.map((fieldName) => {
        setValue(fieldName["name"], fieldName["value"]);
      });
    } else {
      reset({});
      console.log(Object.keys(formValue), "Object.keys(formValue)");
      Object.keys(formValue).forEach((key) => {
        if (["endAt", "startAt"].indexOf(key.name) != -1) {
          console.log("date formValuekey", key.name, formValue[key.name]);
          const momentObj = moment(formValue[key.name]);
          setValue(key.name, momentObj.toDate());
        } else {
          // console.log("formValuekey",key,key)
          setValue(key, formValue[key]);
        }
      });
    }
  }, [formValue, resetting ]);
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

export default FillAdvanceForm;
