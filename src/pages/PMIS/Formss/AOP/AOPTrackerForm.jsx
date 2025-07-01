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
// import gpTrackingActions from "../../../../store/actions/gpTrackingActions";
import { rule } from "postcss";
import gpTrackingActions from "../../../../store/actions/gpTrackingActions";
import Api from "../../../../utils/api";
import { tableAction } from "../../../../store/actions/table-action";
import { Urls } from "../../../../utils/url";
import { CLEAR_RECORDS, SET_TABLE } from "../../../../store/reducers/table-reducer";

const AOPTrackerForm = ({
  isOpen,
  setIsOpen,
  resetting,
  formValue = {},
  year,
  month,
  monthss,
  forAirtel=false
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
    dispatch( gpTrackingActions.getGPCostCenter(selectedValue,true));


  };

  
  const monthMap = {
    1: "Jan",
    2: "Feb",
    3: "Mar",
    4: "Apr",
    5: "May",
    6: "Jun",
    7: "Jul",
    8: "Aug",
    9: "Sep",
    10: "Oct",
    11: "Nov",
    12: "Dec",
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
 console.log(formValue,'sdujduiiudiudu')
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
      name:
        Object.entries(formValue).length > 0
          // ? monthMap[formValue?.month]
          ? "month"
          : "month",
      type: Object?.entries(formValue)?.length > 0 ? "sdisabled" : "select",
      option: months,
      required: true,
    },
    {
      label: "Customer",
      value: "",
      name:
        Object.entries(formValue).length > 0
          ? "customerName"
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
    //   label: "UST Project ID",
    //   value: "",
    //   name: "ustProjectID",
    //   // type: "text",
    //   type: Object.entries(formValue).length > 0 ? "text" : "text",
    //   classes: "col-span-1",
    //   required:true,
    //     // props:{
    //     //   // "valueAsNumber":true,
    //     //   "min":0
    //     // }
    //   // props: {
    //   //   valueAsNumber: true,
    //   //   min: 0,
    //   // },
    // },
    // {
    //   label: "Bussiness Unit ",
    //   value: "",
    //   name: "businessUnit",
    //   type: "text",
    //   // type: Object.entries(formValue).length > 0 ? "text" : "text",
    //   classes: "col-span-1",
    //   required:true,
      
    //   // props: {
    //   //   valueAsNumber: true,
    //   //   min: 0,
    //   // },
    // },
    {
      label: "Planned Revenue",
      value: "",
      name: "planRevenue",
      type: "number",
      classes: "col-span-1",
      required:true,
        props:{
          "valueAsNumber":true,
          
        }
      // props: {
      //   valueAsNumber: true,
      //   min: 0,
      // },
    },
    {
      label: "Planned COGS",
      value: "",
      name: "COGS",
      type: "number",
      classes: "col-span-1",
      required:true,
        props:{
          "valueAsNumber":true,
          
        }
      // props: {
      //   valueAsNumber: true,
      //   min: 0,
      // },
    },
    
  
      {
        label: "Planned SGNA Cost",
        value: "",
        name: "SGNA",
        type: "number",
        classes: "col-span-1",
        required:true,
        props:{
          "valueAsNumber":true,
          
        }
        // props: {
        //   valueAsNumber: true,
        //   min: 0,
        // },
      },
      {
        label: "Actual Revenue",
        value: "",
        name: "actualRevenue",
        type: "number",
        classes: "col-span-1",
        required:true,
        props:{
          "valueAsNumber":true,
          
        }
        // props: {
        //   valueAsNumber: true,
        //   min: 0,
        // },
      },
      {
        label: "Actual Salary",
        value: "",
        name: "actualSalary",
        type: "number",
        classes: "col-span-1",
        required:true,
        props:{
          "valueAsNumber":true,
         
        }
        // props: {
        //   valueAsNumber: true,
        //   min: 0,
        // },
      },
      {
        label: "Actual Vendor Cost ",
        value: "",
        name: "actualVendorCost",
        type: "number",
        classes: "col-span-1",
        required:true,
        props:{
          "valueAsNumber":true,
          
        }
        // props: {
        //   valueAsNumber: true,
        //   min: 0,
        // },
      },
      {
        label: "Other Fixed Cost",
        value: "",
        name: "otherFixedCost",
        type: "number",
        classes: "col-span-1",
        required:true,
        props:{
          "valueAsNumber":true,
         
        }
   
      },
      {
        label: "Employee Expanse",
        value: "",
        name: "employeeExpanse",
        type: "number",
        classes: "col-span-1",
        required:true,
        props:{
          "valueAsNumber":true,
         
        }
   
      },
      {
        label: "Actual SGNA Cost",
        value: "",
        name: "actualSGNA",
        type: "number",
        classes: "col-span-1",
        // required:true,
      props:{
        "valueAsNumber":true,
       
      }
      },
      {
        label: "Miscellaneous Expenses",
        value: "miscellaneousExpenses",
        name: "miscellaneousExpenses",
        type: "number",
        classes: "col-span-1",
        // required:true,
        props:{
          "valueAsNumber":true,
         
        }

      },
      {
        label: "Miscellaneous Expenses 2",
        value: "miscellaneousExpensesSecond",
        name: "miscellaneousExpensesSecond",
        type: "number",
        classes: "col-span-1",
        // required:true,
        props:{
          "valueAsNumber":true,
         
        }

      },
      
       

  ];
  if(forAirtel){
    Form.splice(2, 1);
  }

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

  const onTableViewSubmit =async (data) => {
    const convertToIntOrNull = (value) =>
      isNaN(value) ? null : parseInt(value);

    data["year"] = Number(data["year"]);
    data["month"] = Number(data["month"]);

    // data.cost = convertToIntOrNull(data.cost);
    

    if (formValue?.uniqueId) {
      
      const resp = await Api.post({ data, url: Urls.aop+"/"+formValue?.uniqueId+(forAirtel?"?forAirtel=true" :""),"cb": () => dispatch(tableAction.getTable(Urls.aop+(forAirtel?"?forAirtel=true":''), SET_TABLE)) })
      if (resp.status == 201 || resp.status == 200) {
        setIsOpen(false);
      }
      
    } else {
      // { data, url, contentType = "application/json", show = 1, upload = false, cb = () => { } }
      const resp = await Api.post({ data, url: Urls.aop+(forAirtel?"?forAirtel=true" :""),"cb": () => dispatch(tableAction.getTable(Urls.aop+(forAirtel?"?forAirtel=true":''), SET_TABLE)) })
      if (resp.status == 201 || resp.status == 200) {
      
        setIsOpen(false);
      }
      
    }
  };

  useEffect(() => {
    // dispatch(CurrentuserActions.getcurrentuserCostCenter())
    if(forAirtel){
      dispatch( gpTrackingActions.getGPCostCenter("airtel",true));
    }
    else{
      dispatch(gpTrackingActions.getGPCustomer());
      
    }
    dispatch(gpTrackingActions.getGPCostCenter);
    dispatch(gpTrackingActions.getGPOtherFixedCostTypes())
   
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

    // return ()=>dispatch(CLEAR_RECORDS())
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

export default AOPTrackerForm;
