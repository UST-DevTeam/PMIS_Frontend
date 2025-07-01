import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import moment from "moment";
import * as Unicons from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../../../components/Modal";
import CommonForm from "../../../../components/CommonForm";
import Button from "../../../../components/Button";
import AdminActions from "../../../../store/actions/admin-actions";
import { useNavigate, useParams } from "react-router-dom";
import ExpenseAdvanceActions from "../../../../store/actions/expenseAdvance-actions";
import { ALERTS } from "../../../../store/reducers/component-reducer";
import { GET_EXPENSE_DA_COST_CENTER } from "../../../../store/reducers/expenseAdvance-reducer";
// import state from "sweetalert/typings/modules/state";

const DAFormFillFORM = ({
  isOpen,
  setIsOpen,
  resetting,
  formValue = {},
}) => {
  const [modalOpen, setmodalOpen] = useState(false);

  let dispatch = useDispatch();
  const today = moment().format('YYYY-MM-DD');

  let claimTypeList = useSelector((state) => {
    return state?.adminData?.getManageExpenseAdvance?.map((itm) => {
      
      return {
        label: itm?.name,
        value: itm?.claimTypeId,
      };
    });
  });

  let EmpCodeList = useSelector((state) => {
    return state?.expenseAdvanceData?.getExpenseEMPCode.map((itm) => {
      return {
        label: itm?.empCode + '(' +itm.empName+')',
        value: itm?.uniqueId,
      };
    });
  });
  
  let EmpNameList = useSelector((state) => {
    return state?.expenseAdvanceData?.getExpenseEMPCode.map((itm) => {
      return {
        label: itm?.empName,
        value: itm?.uniqueId,
      };
    });
  });



  // let EmpName = useSelector((state) => {
  //   return state?.expenseAdvanceData?.getExpenseEMPName.map((itm) => {
  //     return itm?.empName || ""
  //   });
  // });

  let projectList = useSelector((state) => {
    return state?.expenseAdvanceData?.getExpenseDAProjectId?.map((itm) => {
      return {
        label: itm?.projectIdName,
        value: itm?.projectId,
      };
    });
  });

  let CostCenterList = useSelector((state) => {
    return state?.expenseAdvanceData?.getExpenseDACostCenter?.map((itm) => {
      return {
        label: itm?.costcenter,
        value: itm?.costcenterId,
      };
    });
  });

  let Form = [  
    {
        label: "Claim Type",
        value: "",
        // name: Object.entries(formValue).length > 0 ? "name" : "claimType",
        name: "claimType",
        // type: Object.entries(formValue).length > 0 ? "sdisabled" : "select",
        type:"select",
        option: claimTypeList,
        props: {
            onChange: (e) => {
              // dispatch(
              //   AdminActions.getManageExpenseAdvance(
              //     true,
              //     `claimtypeDa=${e.target.value}`
              //   )
              // );
            },
          },
        // required: true,
        classes: "col-span-1",
    },
    {
      label: "DA Date",
      value: "",
      name: "Claim_Date",
      type: "datetime",
      required: true,
      props: {
        maxSelectableDate: today,
      },
      classes: "col-span-1",
    },
    {
        label: "Employee",
        value: "",
        name: "EmpCode",
        type: "newSingleSelect45",
        option: EmpCodeList,
        props: {
            onChange: (e) => {
              dispatch(ExpenseAdvanceActions.getExpenseDAProjectId(true,`empCode=${e.target.value}`));
               dispatch( ExpenseAdvanceActions.getExpenseEMPName(true,`empCode=${e.target.value}`));
            },

          },
        // required: true,
        classes: "col-span-1",
    },
    // {
    //     label: "Employee Name",
    //     value: "",
    //     name: "empName",
    //     option: EmpNameList,
    //     type: "select",
    //     props: {
    //         onchange: (e) => {
    //         },
    //     },
    //     // required: true,
    //     classes: "col-span-1",
    // },
    
    {
        label: "Project ID",
        value: "",
        name: "projectId",
        type: "newSingleSelect45",
        option: projectList,
        props: {
            onChange: (e) => {
              dispatch(
                ExpenseAdvanceActions.getExpenseDACostCenter(
                  true,
                  `projectId=${e.target.value}`
                )
              );
            },
          },
        // required: true,
        classes: "col-span-1",
    },
    {
        label: "Cost Center",
        value: "",
        name: "CostCenter",
        type: "select",
        option: CostCenterList,
        // required: true,
        classes: "col-span-1",
    },
    {
        label: "DA Amount",
        value: "",
        name: "Amount",
        type: "number",
        props: {
            onchange: (e) => {},
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
    if (formValue.uniqueId) {
      dispatch(
        ExpenseAdvanceActions.postDAFill(
          true,
          data,
          () => {
            setIsOpen(false);
            dispatch(ExpenseAdvanceActions.getDAFill());
          },
          formValue.uniqueId
        )
      );
    } else {
              dispatch(
        ExpenseAdvanceActions.postDAFill(true, data, () => {
          setIsOpen(false);
          dispatch(ExpenseAdvanceActions.getDAFill());
        })
      );
    }
  };
  console.log(Form, "Form 11");

  useEffect(() => {
    // dispatch(GET_EXPENSE_DA_COST_CENTER({ dataAll: [], reset: true }))
    dispatch(AdminActions.getManageExpenseAdvance(true,`claimtypeDa=${"DailyAllowance"}`));
    dispatch(ExpenseAdvanceActions.getExpenseEMPCode());
    // dispatch(ExpenseAdvanceActions.getExpenseDAProjectId());
    dispatch(ExpenseAdvanceActions.getExpenseDACostCenter());
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
          setValue(key, formValue[key]);
        }
      });
      if (formValue.claimType) {
        setValue("claimType", formValue.claimType);
      };

      EmpCodeList.map((item)=>{
        setValue("EmpCode", item.value ||'');
      })
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

export default DAFormFillFORM;









// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import moment from "moment";
// import * as Unicons from "@iconscout/react-unicons";
// import { useDispatch, useSelector } from "react-redux";
// import Modal from "../../../../components/Modal";
// import CommonForm from "../../../../components/CommonForm";
// import Button from "../../../../components/Button";
// import AdminActions from "../../../../store/actions/admin-actions";
// import { useNavigate, useParams } from "react-router-dom";
// import ExpenseAdvanceActions from "../../../../store/actions/expenseAdvance-actions";
// import { ALERTS } from "../../../../store/reducers/component-reducer";
// import { GET_EXPENSE_DA_COST_CENTER } from "../../../../store/reducers/expenseAdvance-reducer";

// const DAFormFillFORM = ({
//   isOpen,
//   setIsOpen,
//   resetting,
//   formValue = {},
// }) => {
//   const [modalOpen, setmodalOpen] = useState(false);

//   let dispatch = useDispatch();
//   const today = moment().format('YYYY-MM-DD');

//   let claimTypeList = useSelector((state) => {
//     return state?.adminData?.getManageExpenseAdvance?.map((itm) => {
      
//       return {
//         label: itm?.name,
//         value: itm?.claimTypeId,
//       };
//     });
//   });

//   let EmpCodeList = useSelector((state) => {
//     return state?.expenseAdvanceData?.getExpenseEMPCode.map((itm) => {
//       return {
//         label: itm?.empCode,
//         value: itm?.uniqueId,
//       };
//     });
//   });
//   let EmpNameList = useSelector((state) => {
//     return state?.expenseAdvanceData?.getExpenseEMPName.map((itm) => {
//       return {
//         label: itm?.empName,
//         value: itm?.uniqueId,
//       };
//     });
//   });


//   // let EmpName = useSelector((state) => {
//   //   return state?.expenseAdvanceData?.getExpenseEMPName.map((itm) => {
//   //     return itm?.empName || ""
//   //   });
//   // });

//   let projectList = useSelector((state) => {
//     return state?.expenseAdvanceData?.getExpenseDAProjectId?.map((itm) => {
//       return {
//         label: itm?.projectIdName,
//         value: itm?.projectId,
//       };
//     });
//   });

//   let CostCenterList = useSelector((state) => {
//     return state?.expenseAdvanceData?.getExpenseDACostCenter?.map((itm) => {
//       return {
//         label: itm?.costcenter,
//         value: itm?.costcenterId,
//       };
//     });
//   });

//   let Form = [  
//     {
//         label: "Claim Type",
//         value: "",
//         name: Object.entries(formValue).length > 0 ? "name" : "claimType",
//         // type: Object.entries(formValue).length > 0 ? "sdisabled" : "select",
//         type:"select",
//         option: claimTypeList,
//         props: {
//             onChange: (e) => {
//               // dispatch(
//               //   AdminActions.getManageExpenseAdvance(
//               //     true,
//               //     `claimtypeDa=${e.target.value}`
//               //   )
//               // );
//             },
//           },
//         // required: true,
//         classes: "col-span-1",
//     },
//     {
//       label: "DA Date",
//       value: "",
//       name: "Claim_Date",
//       type: "datetime",
//       props: {
//         maxSelectableDate: today,
//       },
//       classes: "col-span-1",
//     },
//     {
//         label: "Employee Code ",
//         value: "",
//         name: "EmpCode",
//         type: "select",
//         option: EmpCodeList,
//         props: {
//             onChange: (e) => {
//               dispatch(ExpenseAdvanceActions.getExpenseDAProjectId(true,`empCode=${e.target.value}`));
//                dispatch( ExpenseAdvanceActions.getExpenseEMPName(true,`empCode=${e.target.value}`));
//             },

//           },
//         // required: true,
//         classes: "col-span-1",
//     },
//     {
//         label: "Employee Name",
//         value: "",
//         name: "empName",
//         option: EmpNameList,
//         type: "select",
//         props: {
//             onchange: (e) => {
//             },
//         },
//         // required: true,
//         classes: "col-span-1",
//     },
    
//     {
//         label: "Project ID",
//         value: "",
//         name: "projectId",
//         type: "select",
//         option: projectList,
//         props: {
//             onChange: (e) => {
//               dispatch(
//                 ExpenseAdvanceActions.getExpenseDACostCenter(
//                   true,
//                   `projectId=${e.target.value}`
//                 )
//               );
//             },
//           },
//         // required: true,
//         classes: "col-span-1",
//     },
//     {
//         label: "Cost Center",
//         value: "",
//         name: "CostCenter",
//         type: "select",
//         option: CostCenterList,
//         // required: true,
//         classes: "col-span-1",
//     },
//     {
//         label: "DA Amount",
//         value: "",
//         name: "Amount",
//         type: "number",
//         props: {
//             onchange: (e) => {},
//         },
//         // required: true,
//         classes: "col-span-1",
//     },
//     {
//       label: "Remarks ",
//       value: "",
//       name: "remark",
//       type: "text",
//       props: {},
//       // required: true,
//       classes: "col-span-1",
//     },
//   ];
//   const {
//     register,
//     handleSubmit,
//     watch,
//     reset,
//     setValue,
//     getValues,
//     formState: { errors },
//   } = useForm();

//   const onSubmit = (data) => {
//     console.log(data);
//     // dispatch(AuthActions.signIn(data, () => {
//     //     navigate('/authenticate')
//     // }))
//   };
//   const onTableViewSubmit = (data) => {
//     if (formValue.uniqueId) {
//       dispatch(
//         ExpenseAdvanceActions.postDAFill(
//           true,
//           data,
//           () => {
//             setIsOpen(false);
//             dispatch(ExpenseAdvanceActions.getDAFill());
//           },
//           formValue.uniqueId
//         )
//       );
//     } else {
//               dispatch(
//         ExpenseAdvanceActions.postDAFill(true, data, () => {
//           setIsOpen(false);
//           dispatch(ExpenseAdvanceActions.getDAFill());
//         })
//       );
//     }
//   };
//   console.log(Form, "Form 11");

//   useEffect(() => {
//     // dispatch(GET_EXPENSE_DA_COST_CENTER({ dataAll: [], reset: true }))
//     dispatch(AdminActions.getManageExpenseAdvance(true,`claimtypeDa=${"DailyAllowance"}`));
//     dispatch(ExpenseAdvanceActions.getExpenseEMPCode());
//     // dispatch(ExpenseAdvanceActions.getExpenseDAProjectId());
//     dispatch(ExpenseAdvanceActions.getExpenseDACostCenter());
//     if (resetting) {
//       reset({});
//       Form.map((fieldName) => {
//         setValue(fieldName["name"], fieldName["value"]);
//       });
//     } else {
//       reset({});
//       console.log(Object.keys(formValue), "Object.keys(formValue)");
//       Object.keys(formValue).forEach((key) => {
//         if (["endAt", "startAt"].indexOf(key.name) != -1) {
//           console.log("date formValuekey", key.name, formValue[key.name]);
//           const momentObj = moment(formValue[key.name]);
//           setValue(key.name, momentObj.toDate());
//         } else {
//           setValue(key, formValue[key]);
//         }
//       });
//     }
//   }, [formValue, resetting]);
//   return (
//     <>
//       <Modal
//         size={"xl"}
//         children={
//           <>
//             <CommonForm
//               classes={"grid-cols-1 gap-1"}
//               Form={Form}
//               errors={errors}
//               register={register}
//               setValue={setValue}
//               getValues={getValues}
//             />
//           </>
//         }
//         isOpen={modalOpen}
//         setIsOpen={setmodalOpen}
//       />

//       <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-full pb-4">
//         <CommonForm
//           classes={"grid-cols-2 gap-1"}
//           Form={Form}
//           errors={errors}
//           register={register}
//           setValue={setValue}
//           getValues={getValues}
//         />
//         {/* <button></button> */}

//         {/* <button onClick={() => { setmodalOpen(true) }} className='flex bg-primaryLine mt-6 w-42 absolute right-1 top-1 justify-center rounded-md bg-pbutton px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bg-pbutton'>Add DB Type <Unicons.UilPlus /></button> */}
//         {/* <Table headers={["S.No.", "DB Type", "DB Server", "DB Name", "Created By", "Created Date", "Last Modified By", "Last Modified Date", "Actions"]} columns={[["1", "abcd", "ancd", "abcd", "ancd"], ["2", "adsa", "dasdas", "abcd", "ancd"]]} /> */}
//         {/* <button onClick={(handleSubmit(onTableViewSubmit))} className='bg-primaryLine mt-6 w-full justify-center rounded-md bg-pbutton px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bg-pbutton'>Submit</button> */}
//         <Button
//           classes={"mt-2 w-sm text-center flex mx-auto"}
//           onClick={handleSubmit(onTableViewSubmit)}
//           name="Submit"
//         />
//       </div>
//     </>
//   );
// };

// export default DAFormFillFORM;
