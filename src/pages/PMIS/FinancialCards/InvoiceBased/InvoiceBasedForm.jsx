import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../../../components/Modal";
import CommonForm from "../../../../components/CommonForm";
import Button from "../../../../components/Button";
import AdminActions from "../../../../store/actions/admin-actions";
import FinanceActions from "../../../../store/actions/finance-actions";
import CurrentuserActions from "../../../../store/actions/currentuser-action";
import { GET_CURRENT_USER_PG, GET_CURRENT_USER_PID } from "../../../../store/reducers/currentuser-reducer";

const InvoiceBasedForm = ({ isOpen, setIsOpen, resetting, formValue = {} }) => {


  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const [modalOpen, setmodalOpen] = useState(false);

  let dispatch = useDispatch();

  
  let customerList = useSelector((state) => {
    return state?.adminData?.getManageCustomer.map((itm) => {
      return {
        label: itm?.customerName,
        value: itm?.uniqueId,
      };
    });
  });


  let projectGroupList = useSelector((state) => {
    return state?.currentuserData?.getcurrentuserPG.map((itm) => {
      return {
        label: itm.projectGroup,
        value: itm.uniqueId,
      };
    });
  });



  let Form = [
    {
      label: "Customer",
      value: "",
      name: Object.entries(formValue).length > 0 ? "customerName" : "customer",
      type: Object.entries(formValue).length > 0 ? "sdisabled" : "select",
      required: true,
      option: customerList,
      classes: "col-span-1",
      props: {
        onChange: (e) => {
          dispatch(CurrentuserActions.getcurrentuserPG(true, `customer=${e.target.value}`,1))
        },
      },
    },
    {
      label: "Project Group",
      name: Object.entries(formValue).length > 0 ? "projectGroupId" : "projectGroup",
      type: Object.entries(formValue).length > 0 ? "sdisabled" : "select",
      value: "",
      option: projectGroupList,
      props: {
        onChange: (e) => {
        },
      },
      required: true,
      classes: "col-span-1",
    },
    {
      label: "GBPA",
      value: "",
      name: "gbpa",
      type: "text",
      props: {
        onChange: (e) => { },
      },
      classes: "col-span-1",
    },
    {
      label: "PO Number",
      value: "",
      name: "poNumber",
      type: Object.entries(formValue).length > 0 ? "sdisabled" : "text",
      required: true,
      props: {
        onChange: (e) => { },
      },
      classes: "col-span-1",
      min: "0",
    },
    {
      label: "PO Start Date",
      value: "",
      name: "poStartDate",
      type: "datetime",
      props: {
        onChange: (e) => { },
      },
      classes: "col-span-1",
    },
    {
      label: "PO End Date",
      value: "",
      name: "poEndDate",
      type: "datetime",
      props: {
        onChange: (e) => { },
      },
      classes: "col-span-1",
    },
    {
      label: "Item Code",
      value: "",
      name: "itemCode",
      type: Object.entries(formValue).length > 0 ? "sdisabled" : "text",
      required: true,
      props: {
        onChange: (e) => { },
      },
      classes: "col-span-1",
    },
    {
      label: "Description",
      value: "",
      name: "description",
      type: "text",
      props: {
        onChange: (e) => { },
      },
      classes: "col-span-1",
    },
    {
      label: "Unit Rate",
      value: "",
      name: "unitRate(INR)",
      type: Object.entries(formValue).length > 0 ? "sdisabled" : "number",
      required: true,
      props: {
        valueAsNumber: true,
        min: 1,
        onChange: (e) => {
        },
        
      },
      classes: "col-span-1",
    },
    {
      label: "Initial PO Qty",
      value: "",
      name: "initialPoQty",
      type: formValue['poStatus'] === "Closed" || formValue['poStatus'] === "Short Closed" ? "sdisabled" : "number",
      required: true,
      props: {
        valueAsNumber: true,
        min: 1,
        onChange: (e) => { },
      },
      classes: "col-span-1",
    },
    {
      label: "Status",
      value: "",
      name: "poStatus",
      type: "select",
      required: true,
      option: [
        { label: "Open", value: "Open" },
        { label: "Closed", value: "Closed" },
        { label: "Short Closed", value: "Short Closed" },
      ],
      classes: "col-span-1",
    },
  ];

  const onTableViewSubmit = (data) => {
    if (formValue.uniqueId) {
      dispatch(
        FinanceActions.postPOInvoicedBased(
          true,
          data,
          () => {
            setIsOpen(false);
            dispatch(FinanceActions.getPOInvoicedBased());
          },
          formValue.uniqueId
        )
      );
    } else {
      dispatch(
        FinanceActions.postPOInvoicedBased(true, data, () => {
          setIsOpen(false);
          dispatch(FinanceActions.getPOInvoicedBased());
        })
      );
    }
  };


  useEffect(() => {
    dispatch(GET_CURRENT_USER_PG({ dataAll: [], reset: true }))
    dispatch(GET_CURRENT_USER_PID({ dataAll: [], reset: true }))
    dispatch(AdminActions.getManageCustomer());
    if (resetting) {
      reset({});
      Form.map((fieldName) => {
        setValue(fieldName["name"], fieldName["value"]);
      });
    } else {
      reset({});
      // console.log(formValue, "Object.keys(formValue)");
      Form.forEach((key) => {

        if (["poStartDate", "poEndDate"].indexOf(key.name) != -1 &&
          formValue[key.name]) {
          const momentObj = moment(formValue[key.name], "DD/MM/YYYY");
          setValue(key.name, momentObj.toDate());
        } else if (key.type == "select") {
          let dtwq = key.option.filter(
            (itq) => itq.label == formValue[key.name]
          );

          // console.log(dtwq, key.name, formValue[key.name], "dtwqdtwqdtwq");
          if (dtwq.length > 0) {
            setValue(key.name, dtwq[0]["value"]);
          } else {
            setValue(key.name, formValue[key.name]);
          }
        }
        else {
          setValue(key.name, formValue[key.name]);
        }
      });
    }
  }, [formValue, resetting]);



  return (
    <>
      <Modal
        size={"sm"}
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
        <Button
          classes={"mt-2 w-sm text-center flex mx-auto"}
          onClick={handleSubmit(onTableViewSubmit)}
          name="Submit"
        />
      </div>
    </>
  );
};

export default InvoiceBasedForm;
