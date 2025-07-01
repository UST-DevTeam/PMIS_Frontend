import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import moment from "moment";
import * as Unicons from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";

import Modal from "../../../../components/Modal";
import CommonForm from "../../../../components/CommonForm";
import Button from "../../../../components/Button";
// import { useParams } from "react-router-dom";
import FinanceActions from "../../../../store/actions/finance-actions";
import { GET_POWORKDONE_ITEMCODE } from "../../../../store/reducers/finance-reducer";
import { Form } from "react-router-dom";

import { objectToQueryString } from "../../../../utils/commonFunnction";

const WorkDoneForm = ({
  // setupDatq,
  setcallSt,
  callSt,
  setcurrentPage,
  isOpen,
  setIsOpen,
  resetting,
  formValue = {},
}) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const [finalForm, setFinalForm] = useState({});
  const [modalOpen, setmodalOpen] = useState(false);

  let dispatch = useDispatch();

  // let ItemCodeList = useSelector((state) => {
  //   return state?.financeData?.getPOWorkDoneItemCode?.map((itm) => {
  //     return {
  //       label: itm?.ItemCode,
  //       value: itm?.ItemCode,
  //     };
  //   });
  // });

  let ItemCodeList = useSelector((state) => {
    const itemList = state?.financeData?.getPOWorkDoneItemCode;
    return itemList && itemList.length > 0 && Object.keys(itemList[0]).length > 0
      ? itemList.map((itm) => ({
          label: itm?.ItemCode,
          value: itm?.ItemCode,
        }))
      : [];
  });



 

  // }).filter((item, index, self) =>
  //     index === self.findIndex((t) => (
  //         t.value === item.value
  //     ))
  // );

  let inwoForm = [
    {
      label: "Item Code",
      value: "",
      name: "itemCode",
      type: "select",
      option: ItemCodeList,
      props: {
        onChange: (e) => {},
      },
      classes: "col-span-1",
    },
    {
      label: "Quantity",
      value: "",
      name: "quantity",
      type: "number",
      props: {
        valueAsNumber: true,
        min: 0,
        onChange: (e) => {},
      },
      classes: "col-span-1",
    },
  ];

  let sForm = [
    {
      label: "Work Done Bucket",
      value: "",
      name: "workdonebucket",
      type: "text",
      props: {
        onChange: (e) => {},
      },
      classes: "col-span-1",
    },
    {
      label: "Invoice Bucket",
      value: "",
      name: "invoicebucket",
      type: "text",
      props: {
        onChange: (e) => {},
      },
      classes: "col-span-1",
    },
    {
      label: "Item Code 1",
      value: "",
      name: "itemCode1",
      type: "select",
      option: ItemCodeList,
      props: {
        onChange: (e) => {},
      },
      classes: "col-span-1",
    },
    {
      label: "Quantity 1",
      value: "",
      name: "quantity1",
      type: "number",
      props: {
        valueAsNumber: true,
        min: 1,
        onChange: (e) => {},
      },
      classes: "col-span-1",
    },
    {
      label: "Item Code 2",
      value: "",
      name: "itemCode2",
      type: "select",
      option: ItemCodeList,
      props: {
        onChange: (e) => {},
      },
      classes: "col-span-1",
    },
    {
      label: "Quantity 2",
      value: "",
      name: "quantity2",
      type: "number",
      props: {
        valueAsNumber: true,
        min: 0,
        onChange: (e) => {},
      },
      classes: "col-span-1",
    },
    {
      label: "Item Code 3",
      value: "",
      name: "itemCode3",
      type: "select",
      option: ItemCodeList,
      props: {
        onChange: (e) => {},
      },
      classes: "col-span-1",
    },
    {
      label: "Quantity 3",
      value: "",
      name: "quantity3",
      type: "number",
      props: {
        valueAsNumber: true,
        min: 0,
        onChange: (e) => {},
      },
      classes: "col-span-1",
    },
    {
      label: "Item Code 4",
      value: "",
      name: "itemCode4",
      type: "select",
      option: ItemCodeList,
      props: {
        onChange: (e) => {},
      },
      classes: "col-span-1",
    },
    {
      label: "Quantity 4",
      value: "",
      name: "quantity4",
      type: "number",
      props: {
        valueAsNumber: true,
        min: 0,
        onChange: (e) => {},
      },
      classes: "col-span-1",
    },
    {
      label: "Item Code 5",
      value: "",
      name: "itemCode5",
      type: "select",
      option: ItemCodeList,
      props: {
        onChange: (e) => {},
      },
      classes: "col-span-1",
    },
    {
      label: "Quantity 5",
      value: "",
      name: "quantity5",
      type: "number",
      props: {
        valueAsNumber: true,
        min: 0,
        onChange: (e) => {},
      },
      classes: "col-span-1",
    },
    {
      label: "Item Code 6",
      value: "",
      name: "itemCode6",
      type: "select",
      option: ItemCodeList,
      props: {
        onChange: (e) => {},
        min: 0,
      },
      classes: "col-span-1",
    },
    {
      label: "Quantity 6",
      value: "",
      name: "quantity6",
      type: "number",
      props: {
        valueAsNumber: true,
        min: 0,
        onChange: (e) => {},
      },
      classes: "col-span-1",
    },
    {
      label: "Item Code 7",
      value: "",
      name: "itemCode7",
      type: "select",
      option: ItemCodeList,
      props: {
        onChange: (e) => {},
      },
      classes: "col-span-1",
    },
    {
      label: "Quantity 7",
      value: "",
      name: "quantity7",
      type: "number",
      props: {
        valueAsNumber: true,
        min: 0,
        onChange: (e) => {},
      },
      classes: "col-span-1",
    },
  ];

  let cForm = [];

  console.log(
    ["", "", "", "", "", "", ""].map((itwq, index) => {
      return sForm.map((iets) => {
        cForm.push({
          ...iets,
          label: iets.label + " " + (+index + 1),
          name: iets.name + "" + (+index + 1),
          props: {
            ...iets.props,
            onChange: (e) => {
              console.log(
                "sadsadsadas",
                iets.name + (+index + 1),
                e.target.value
              );
            },
          },
        });
      });
    }),
    "dfghj"
  );
  const onSubmit = (data) => {
    console.log(data);
    // dispatch(AuthActions.signIn(data, () => {
    //     navigate('/authenticate')
    // }))
  };

  const onTableViewSubmit = (data) => {

    data['projectGroup'] = formValue['projectGroupUid']
    data['MS1'] = formValue['MS1']
    data['MS2'] = formValue['MS2']
    
    // const page = sessionStorage.getItem("page") || 1
    if (formValue.uniqueId) {
      dispatch(
        FinanceActions.postPOWorkDoneBased(
          true,
          data,
          () => {
            setIsOpen(false);
            dispatch(FinanceActions.getPOWorkDoneBased(true , {}));
          },
          formValue.uniqueId
        )
      );
    } else {
      dispatch(
        FinanceActions.postPOWorkDoneBased(true, data, () => {
          setIsOpen(false);
          dispatch(FinanceActions.getPOWorkDoneBased());
        })
      );
    }
  };

  useEffect(() => {
    if (!isOpen) {
      reset({});
      sForm.map((fieldName) => {
        setValue(fieldName["name"], formValue[fieldName["name"]] || "");
      });
    } else {
      // setcallSt(false)
      reset({});
      // console.log(Object.keys(formValue), "Object.keys(formValue)");
      Object.keys(formValue).forEach((key) => {
        // console.log(key, "keykeykeykeykey");
        if (key == "itemCodeArray") {
          console.log(formValue["itemCodeArray"], "formValue");
        } else if (["endAt", "startAt"].indexOf(key.name) != -1) {
          // console.log("date formValuekey", key.name, formValue[key.name]);
          const momentObj = moment(formValue[key.name]);
          setValue(key.name, momentObj.toDate());
        } else {
          setValue(key, formValue[key]);
        }
      });
    }
  }, [isOpen,formValue,resetting]);
  return (
    <>
      <Modal
        size={"xl"}
        children={
          <>
            <CommonForm
              classes={"grid-cols-1 gap-1"}
              Form={inwoForm}
              errors={errors}
              register={register}
              setValue={setValue}
              getValues={getValues}
            />
            <CommonForm
              classes={"grid-cols-1 gap-1"}
              Form={sForm}
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

      {console.log(
        [""].map((itw) => {
          return cForm;
        }, "cFormcFormcForm")
      )}
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-full pb-4">
        <CommonForm
          classes={"grid-cols-2 gap-1"}
          Form={sForm}
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

export default WorkDoneForm;



// useEffect(() => {
//   if (isOpen) {
//     reset({});
//     Form.forEach(key => setValue(key.name, formValue[key.name] || ""));
    
//   } else {
//     reset({});
//     Object.keys(formValue).forEach((key) => {
//       setValue(key, formValue[key]);
//     });
//   }
// }, [isOpen, formValue,resetting]);
