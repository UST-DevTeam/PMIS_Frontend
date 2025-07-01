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
import { GET_MANAGE_EXPENSE_ADVANCE } from "../../../../store/reducers/admin-reducer";

const ClaimAdvanceForm = ({
  isOpen,
  item,
  setIsOpen,
  resetting,
  formValue = {},
  expenseRef = { current: {} },
}) => {
  let expnumber = formValue?.ExpenseNo || "";

  const [modalOpen, setmodalOpen] = useState(false);
  const [Km, setKm] = useState(false);
  const [category, setCategory] = useState();
  let dispatch = useDispatch();
  const today = moment().format("YYYY-MM-DD");

  let claimTypeList = useSelector((state) => {
    return state?.adminData?.getManageExpenseAdvance?.map((itm) => {
      return {
        label: itm?.name,
        value: itm?.claimTypeId,
        categories: itm?.categories?.split(",")?.map((item) => {
          return {
            label: item,
            value: item,
          };
        }),
      };
    });
  });

  console.log(claimTypeList, "claimTypeListclaimTypeList");

  let projectDetailsList = useSelector((state) => {
    return state?.expenseAdvanceData?.getExpADvPrjectDetails.map((itm) => {
      return {
        label: itm?.projectId,
        value: itm?.projectUniqueId,
      };
    });
  });

  let projectSiteIdList = useSelector((state) => {
    return state?.expenseAdvanceData?.getExpADvSiteID.map((itm) => {
      return {
        label: itm["Site Id"],
        value: itm?.siteUniqueId,
      };
    });
  });

  let projectTaskNameList = useSelector((state) => {
    return state?.expenseAdvanceData?.getExpADvTaskName.map((itm) => {
      return {
        label: itm?.Name,
        value: itm?.taskUniqueId,
      };
    });
  });

  const handleCategoryChange = (e) => {
    setKm(e.target.value !== "");
  };

  let Form = [
    {
      label: "Expense",
      value: "",
      name: "name",
      type: "text",
      // required: true,
      classes: "col-span-1",
    },
    {
      label: "Expense Date",
      value: "expenseDate",
      name: "ExpenseDate",
      type: "datetime",
      props: {
        maxSelectableDate: today,
      },
      // required: true,
      classes: "col-span-1",
    },
    {
      label: "Claim Type",
      value: "",
      name: "claimType",
      type: "select",
      option: claimTypeList,
      props: {
        onChange: (e) => {
          setCategory(
            claimTypeList.find((item) => item.value === e.target.value)
              ?.categories || []
          );
        },
      },
      required: true,
      classes: "col-span-1",
    },
    {
      label: "Category",
      value: "",
      name: "categories",
      type: "select",
      option: category,
      props: {
        onChange: handleCategoryChange,
        // id: "category-expand",
      },
      // required: true,
      classes: "col-span-1",
    },
    ...(Km
      ? [
          {
            label: "Start Km",
            value: "",
            name: "startKm",
            type: "number",
            classes: "col-span-1",
          },
          {
            label: "End Km",
            value: "",
            name: "endKm",
            type: "number",
            classes: "col-span-1",
          },
          {
            label: "Total Km",
            value: "",
            name: "totalKm",
            type: "sdisabled",
            classes: "col-span-1",
          },
        ]
      : []),
    {
      label: "Bill Number ",
      value: "",
      name: "billNumber",
      type: "text",
      // required: true,
      classes: "col-span-1",
    },
    {
      label: "Claimed Amount",
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
      label: "Attachment",

      value: "",
      name: "Attachment",
      type: "file",
      // required: true,

      props: {
        onChange: (e) => {
          console.log(e.target.files, "e geeter");
          setValue("attachment", e.target.files[0]);
        },
        accept: ".img, .png, .jpg, .jpeg, .webp, .pdf",
      },
      classes: "col-span-1",
      multiple: false,
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

  const startKm = watch("startKm");
  const endKm = watch("endKm");

  useEffect(() => {
    if (startKm !== undefined && endKm !== undefined) {
      const totalKm = endKm - startKm;
      //   if (totalKm <= 0) {
      //     let msgdata = {
      //       show: true,
      //       icon: 'warning',
      //       buttons: [
      //         <Button
      //           classes='w-auto'
      //           onClick={() => {
      //             dispatch(ALERTS({ show: false }));
      //           }}
      //           name={"OK"}
      //         />
      //       ],
      //       text: "Total Km cannot be zero or negative.",
      //     };
      //     dispatch(ALERTS(msgdata));
      //   }
      setValue("totalKm", totalKm >= 0 ? totalKm : 0);
    }
  }, [startKm, endKm, setValue]);

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
        ExpenseAdvanceActions.postFillExpense(
          true,
          data,
          () => {
            setIsOpen(false);
            dispatch(
              ExpenseAdvanceActions.getClaimAndAdvancebyNumber(
                true,
                `Number=${expnumber}`
              )
            );
          },
          formValue.uniqueId
        )
      );
    } else {
      if (expenseRef.current) {
        data.expenseId = expenseRef.current?.ExpenseNo;
      }
      dispatch(
        ExpenseAdvanceActions.postFillExpense(true, data, () => {
          console.log("CustomQueryActions.postDBConfig");
          setIsOpen(false);
          dispatch(
            ExpenseAdvanceActions.getClaimAndAdvancebyNumber(
              true,
              `Number=${expnumber}`
            )
          );
        })
      );
    }
  };
  console.log(Form, "Form 11");

  useEffect(() => {
    dispatch(GET_MANAGE_EXPENSE_ADVANCE({ dataAll: [], reset: true }));
    // dispatch(AdminActions.getManageExpenseAdvance());
    dispatch(ExpenseAdvanceActions.getExpADvPrjectDetails());
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
          console.warn(`________________________`, key, formValue[key]);
          setValue(key, formValue[key]);
          // setValue(key, '667276486619c27f4c4a28f3');
        }
      });
      claimTypeList.map((itm) => {
        setValue(itm.name, itm.value);
      });
    }
  }, [formValue, resetting, setValue]);

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

export default ClaimAdvanceForm;
