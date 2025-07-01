import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import moment from "moment";
import * as Unicons from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";

import Modal from "../../../../components/Modal";
import CommonForm from "../../../../components/CommonForm";
import Button from "../../../../components/Button";
// import { useParams } from "react-router-dom";
import AdminActions from "../../../../store/actions/admin-actions";
import FinanceActions from "../../../../store/actions/finance-actions";
import projectListActions from "../../../../store/actions/projectList-actions";
import { GET_CARD_PROJECT_TYPE, GET_MANAGE_PROJECT_GROUP, GET_PO_PROJECTTYPE, GET_PO_PROJECTID, GET_INVOICE_SITEID, GET_INVOICE_SSID } from "../../../../store/reducers/admin-reducer";
import CurrentuserActions from "../../../../store/actions/currentuser-action";
import { GET_CURRENT_USER_PG, GET_CURRENT_USER_PID, GET_CURRENT_USER_PT } from "../../../../store/reducers/currentuser-reducer";

const InvoiceForm = ({ isOpen, setIsOpen, resetting, formValue = {}, filtervalue }) => {
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
  const [pType, setpType] = useState("");
  const [qType, setqType] = useState("");
  const [rType, setrType] = useState("");

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


  let projectIdList = useSelector((state) => {
    return state?.currentuserData?.getcurrentuserPID.map((itm) => {
      return {
        label: itm?.projectId,
        value: itm?.uniqueId,
      };
    });
  });

  let SiteList = useSelector((state) => {
    return state?.adminData?.getInvoiceSiteId.map((itm) => {
      return {
        label: itm.siteId,
        value: itm?.uniqueId,
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
      type: "select",
      name: "projectGroup",
      value: "",
      option: projectGroupList,
      props: {
        onChange: (e) => {
          dispatch(CurrentuserActions.getcurrentuserPID(true, `projectGroup=${e.target.value}`))
        },
      },
      required: true,
      classes: "col-span-1",
    },
    {
      label: "Project ID",
      value: "",
      name: "projectId",
      option: projectIdList,
      type: "select",
      required: true,
      props: {
        onChange: (e) => {
          dispatch(AdminActions.getInvoiceSiteId(true, `projectId=${e.target.value}`))
        },

      },
      classes: "col-span-1",
    },
    {
      label: "Site Id",
      value: "",
      name: "siteId",
      type: "select",
      option: SiteList,
      required: true,
      props: {
        onChange: (e) => {
        },
      },
      classes: "col-span-1",
    },
    {
      label: "WCC No",
      value: "",
      name: "wccNumber",
      type: "text",
      // required: true,
      props: {
        onChange: (e) => { },
      },
      classes: "col-span-1",
    },
    {
      label: "WCC SignOff Date",
      value: "",
      name: "wccSignOffdate",
      type: "datetime",
      // required: true,
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
      label: "Invoiced Quantity",
      value: "",
      name: "qty",
      type: "number",
      required: true,
      props: {
        valueAsNumber: true,
        min: 1,
        onChange: (e) => { },
      },
      classes: "col-span-1",
    },
    {
      label: "Invoice Number",
      value: "",
      name: "invoiceNumber",
      type: "text",
      required: true,
      props: {
        onChange: (e) => { },
      },
      classes: "col-span-1",
    },
    {
      label: "Invoice Date",
      value: "",
      name: "invoiceDate",
      type: "datetime",
      required: true,
      props: {
        onChange: (e) => { },
      },
      classes: "col-span-1",
    },
    {
      label: "Unit Rate",
      value: "",
      name: "unitRate",
      type: "number",
      required: true,
      props: {
        valueAsNumber: true,
        min: 0,
        onChange: (e) => { },
      },
      classes: "col-span-1",
    },
    {
      label: "Status",
      value: "",
      name: "status",
      type: "select",
      required: true,
      option: [
        { label: "Billed", value: "Billed" },
        { label: "Partially Billed", value: "Partially Billed" },
      ],
      classes: "col-span-1",
    },
  ];
  // const onSubmit = (data) => {
  //   console.log(data);
  //   // dispatch(AuthActions.signIn(data, () => {
  //   //     navigate('/authenticate')
  //   // }))
  // };

  const onTableViewSubmit = (data) => {
    if (formValue.uniqueId) {
      dispatch(
        FinanceActions.postInvoice(
          true,
          data,
          () => {
            setIsOpen(false);
            dispatch(FinanceActions.getInvoice(true,filtervalue));
          },
          formValue.uniqueId
        )
      );
    } else {
      dispatch(
        FinanceActions.postInvoice(true, data, () => {
          setIsOpen(false);
          dispatch(FinanceActions.getInvoice());
        })
      );
    }
  };
  useEffect(() => {
    dispatch(AdminActions.getManageCustomer());
    dispatch(GET_CURRENT_USER_PG({ dataAll: [], reset: true }))
    dispatch(GET_CURRENT_USER_PT({ dataAll: [], reset: true }))
    dispatch(GET_CURRENT_USER_PID({ dataAll: [], reset: true }))
    dispatch(GET_INVOICE_SITEID({ dataAll: [], reset: true }))
    dispatch(GET_INVOICE_SSID({ dataAll: [], reset: true }))
    

    if (resetting) {
      reset({});
      Form.map((fieldName) => {
        setValue(fieldName["name"], fieldName["value"]);
      });
    } else {
      reset({});
      Form.forEach((key) => {
        if (["wccSignOffdate", "invoiceDate"].indexOf(key.name) != -1 &&
          formValue[key.name]) {
          const momentObj = moment(formValue[key.name], "DD/MM/YYYY");
          setValue(key.name, momentObj.toDate());
        } else if (key.type == "select") {
          // if (key.name == "projectType") {
          //   setpType(formValue["projectTypeName"]);
          // }

          // if (key.name == "projectGroup") {
          //   dispatch(projectListActions.getProjectCircle(true,`projectGroupId=${formValue["projectGroup"]}`));
          //   setcircle(true);
          // }

          let dtwq = key.option.filter(
            (itq) => itq.label == formValue[key.name]
          );
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
        <Button
          classes={"mt-2 w-sm text-center flex mx-auto"}
          onClick={handleSubmit(onTableViewSubmit)}
          name="Submit"
        />
      </div>
    </>
  );
};

export default InvoiceForm;
