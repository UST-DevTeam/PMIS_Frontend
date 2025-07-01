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
import { json } from "react-router-dom";

const FillExpenseForm = ({
  isOpen,
  setIsOpen,
  resetting,
  dataItm=undefined,
  formValue = {},
  expenseRef = { current: {} },
}) => {
  const [modalOpen, setmodalOpen] = useState(false);
  const [Km, setKm] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState('');
  const [selectedValue, setSelectedValue] = useState('');
  const [category, setCategory] = useState([]);
  const [selectedValue2, setSelectedValue2] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedProjectId, setselectedProjectId] = useState('');
  const today = moment().format("YYYY-MM-DD");
  let dispatch = useDispatch();
  
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
    const selectedCategoryValue = e.target.value;
    setSelectedCategory(selectedCategoryValue);
    setKm(selectedCategoryValue !== "");
  };


  const handleClaimTypeChange = (value) => {
    const selectedValue = value;
    setSelectedValue(selectedValue);

    const selectedOption = claimTypeList.find(
      (option) => option.value === selectedValue
    );
    setSelectedLabel(selectedOption ? selectedOption.label : '');

    if (selectedOption?.categories.length > 1) {
      setKm(true);
    } else {
      setKm(false);
    }

    setCategory(selectedOption?.categories || []);
  };

  
  const handleClaimTypeChange2 = (value) => {
    const selectedValue2 = value;
    setSelectedValue2(selectedValue2);
    dispatch(ExpenseAdvanceActions.getUserLimit(selectedValue2))
  };

  let Form = [
    {
      label: "Claim Type",
      value: "",
      name: "claimType",
      type: "select",
      option: claimTypeList,
      props: {
        onChange: (e)=>{
          handleClaimTypeChange(e.target.value)
          handleClaimTypeChange2(e.target.value)
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
      },
      // required: true,
      classes: "col-span-1",
    },
    ...(Km && selectedCategory
      ? [
          {
            label: "Start Km",
            value: "",
            name: "startKm",
            type: "number",
            classes: "col-span-1",
            props:{
              valueAsNumber:true,
              min: 0,
            }
          },
          {
            label: "End Km",
            value: "",
            name: "endKm",
            type: "number",
            classes: "col-span-1",
            props:{
              valueAsNumber:true,
              min: 0,
            }
          },
          {
            label: "Total Km",
            value: "",
            name: "totalKm",
            type: "sdisabled",
            classes: "col-span-1",
          },
          {
            label: "Start Location",
            value: "",
            name: "startLocation",
            type: "text",
            classes: "col-span-1",
          },
          {
            label: "End Location",
            value: "",
            name: "endLocation",
            type: "text",
            classes: "col-span-1",
          },
        ]
      : []),
    {
      label: "Project Id",
      value: "",
      name:
        Object.entries(formValue).length > 0 ? "projectIdName" : "projectId",
      type: Object.entries(formValue).length > 0 ? "sdisabled" : "newSingleSelect45",
      option: projectDetailsList,
      props: {
        onChange: (e) => {
          setselectedProjectId(e?.target?.value)
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
    // {},
    // {
    //   label: "Project Id",
    //   value: "",
    //   name:
    //     Object.entries(formValue).length > 0 ? "projectIdName" : "projectId",
    //   type: Object.entries(formValue).length > 0 ? "sdisabled" : "newmultiselect",
    //   option: projectDetailsList,
    //   props: {
    //     onChange: (e) => {
    //       dispatch(
    //         ExpenseAdvanceActions.getExpADvSiteID(
    //           true,
    //           `projectId=${e.target.value}`
    //         )
    //       );
    //     },
    //   },
    //   // required: true,
    //   classes: "col-span-1",
    // },
    // {
    //   label: "Project Id",
    //   name: "projectId",
    //   type: "newSingleSelect45",
    //   option: projectDetailsList,
    //   props: {
    //   onChange: (e) => {
    //     console.log('ehjdjduduyhyh',e)
    //     dispatch(
    //       ExpenseAdvanceActions.getExpADvSiteID(
    //         true,
    //         `projectId=${e.target.value}`
    //       )
    //     );
    //   },
    // },
    //   classes: "col-span-1",
    // },
    {
      label: "Site Id",
      value: "",
      name: Object.entries(formValue).length > 0 ? "Site_Id" : "Site Id",
      type: Object.entries(formValue).length > 0 ? "sdisabled" : "newSingleSelect45",
      option: projectSiteIdList,
      props: {
        onChange: (e) => {
          dispatch(
            ExpenseAdvanceActions.getExpADvTaskName(
              true,
              `siteId=${e.target.value}`
            )
          );
        },
      },
      //   required: true,
      classes: "col-span-1",
    },
    {
      label: "Task Name",
      value: "",
      name: Object.entries(formValue).length > 0 ? "Task" : "Name",
      type: Object.entries(formValue).length > 0 ? "sdisabled" : "newSingleSelect45",
      option: projectTaskNameList,
      // required: true,
      classes: "col-span-1",
    },
    {
      label: "Expense Date",
      value: "",
      name: dataItm ? "ExpenseDate": "ExpenseDate",
      type: dataItm ? "datetime": "datetime" ,
      props: {
        maxSelectableDate: today,
      },
      required: true,
      classes: "col-span-1",
    },
    {
      label: "Bill Number ",
      value: "",
      name: "billNumber",
      type: "text",
      // required: true,
      classes: "col-span-1",
    },
    ...(!Km || !selectedCategory
      ? [
          {
            label: "Amount ",
            value: "",
            name: "Amount",
            type: "number",
            props: {
              // valueAsNumber: true,
              min: 0,
              onChange: (e) => {},
            },
            // required: true,
            classes: "col-span-1",
          },
        ]
      : []),

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
    
    {
      label: "Additional Info",
      value: "",
      name: "additionalInfo",
      type: "text",
      // required: true,
      classes: "col-span-1",
    },
  ];
  if (selectedLabel.toLocaleLowerCase() === "hotel") {
    Form.splice(1, 0,
      { 
        label: "Check In Date", 
        name: "checkInDate", 
        type: "datetime", 
        formattype: "date", 
        format: "yyyy-MM-dd", 
        formatop: "yyyy-MM-DD", 
        required: true,
        classes: "col-span-1",
        props:{
          maxSelectableDate:today,
        }
      },
      { 
        label: "Check Out Date", 
        name: "checkOutDate", 
        type: "datetime", 
        formattype: "date", 
        format: "yyyy-MM-dd", 
        formatop: "yyyy-MM-DD", 
        required: true,
        classes: "col-span-1",
        props:{
          maxSelectableDate:today,
        }
      },
      {
        label: "Total Days",
        value: "",
        name: "totaldays",
        type: "sdisabled",
        classes: "col-span-1",
      }
    );
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

  const startKm = watch("startKm");
  const endKm = watch("endKm");
  const checkInDate = watch("checkInDate");
  const checkOutDate = watch("checkOutDate");
  useEffect(() => {
    if (!Km) {
      reset({
        startKm: "",
        endKm: "",
        totalKm: "",
        startLocation: "",
        endLocation: "",
      });
    }
  }, [Km, reset]);

  useEffect(() => {
    if (startKm !== undefined && endKm !== undefined) {
      const totalKm = endKm - startKm;
      setValue("totalKm", totalKm >= 0 ? totalKm : 0);
    }
  }, [startKm, endKm, setValue]);


  useEffect(() => {
    if (checkInDate && checkOutDate) {
      const totalDays = moment(checkOutDate).diff(moment(checkInDate), 'days');
      setValue("totaldays", totalDays >= 0 ? totalDays : 0);
    }
  }, [checkInDate, checkOutDate, setValue]);


  const onSubmit = (data) => {
    console.log(data);
    // dispatch(AuthActions.signIn(data, () => {
    //     navigate('/authenticate')
    // }))
  };


  const onTableViewSubmit = (data) => {
    
   
    if (data?.projectId === '' || data?.projectId === null || data?.projectId === undefined){
      
      let msgdata = {
        show: true,
        icon: "error",
        buttons: [],
        type: 1,
        text: "Please Select Project ID",
    };
    dispatch(ALERTS(msgdata));
    return
    }
    
    if (formValue.expenseuniqueId) {
      dispatch(
        ExpenseAdvanceActions.postFillExpense(
          true,
          data,
          () => {
            setIsOpen(false);
            dispatch(ExpenseAdvanceActions.getFillExpense());
          },
          formValue.expenseuniqueId
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
          dispatch(ExpenseAdvanceActions.getFillExpense());
        })
      );
    }
  };

  useEffect(() => {
    // dispatch(AdminActions.getManageExpenseAdvance());
    // dispatch(ExpenseAdvanceActions.getExpADvPrjectDetails());
  
    
    if (resetting) {
      reset({});

      setKm(false)
      setSelectedLabel('')
      
      Form.map((fieldName) => {
        setValue(fieldName["name"], fieldName["value"]);
      });
    } else {
      reset({});
      


      // setCategory(claimTypeList.filter((itm)=>itm.label==formValue["types"])[0]["categories"])
      setCategory(
        claimTypeList.filter((itm) => itm.label == formValue["types"])[0]?.categories || ['']
      );

      if (claimTypeList.filter((itm)=>itm.label==formValue["types"])[0]?.["categories"][0]['label']!="") {
        setKm(true);
      } else {
        setKm(false);
      }

      
      console.log(Object.keys(formValue),claimTypeList.filter((itm)=>itm.label==formValue["types"])[0],formValue,formValue["categories"], "Object.keys(formValue)");
      Object.keys(formValue).forEach((key) => {
        console.log(key,"key. name")

        if (["expenseDate"].indexOf(key) != -1) {
          const momentObj = moment(formValue[key],"DD-MM-yyyy");
          setValue("ExpenseDate", momentObj.toDate());
        } else {
          setValue(key, formValue[key]);
        }
      });


      
      setValue("claimType",claimTypeList.filter((itm)=>itm.label==formValue["claimType"])[0]?.["value"]) ||[]
      handleClaimTypeChange(claimTypeList.filter((itm)=>itm.label==formValue["claimType"])[0]?.["value"])
    }

    if(dataItm){
      
      const momentObj = moment(dataItm["expenseDate"],"YYYY-MM-DD");
      setValue("ExpenseDate", momentObj.toDate());
      setValue("ExpenseDate", momentObj.format("YYYY-MM-DD"));
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

export default FillExpenseForm;
