import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../../../components/Modal";
import CommonForm from "../../../../components/CommonForm";
import Button from "../../../../components/Button";
import AdminActions from "../../../../store/actions/admin-actions";
import { GET_CURRENT_USER_PG } from "../../../../store/reducers/currentuser-reducer";
import CurrentuserActions from "../../../../store/actions/currentuser-action";
import { GET_ACTIVITY_AND_OEM_COMPLIANCE, GET_PROJECT_TYPE_COMPLIANCE, GET_SUB_PROJECT_TYPE_COMPLIANCE } from "../../../../store/reducers/admin-reducer";
import HrActions from "../../../../store/actions/hr-actions";

const ManageComplianceL2Form = ({
  customeruniqueId,
  isOpen,
  setIsOpen,
  resetting,
  formValue = {},
}) => {

    
  const complainceRef = useRef({
    cid: "",
    projectType: "",
  });

  const {register,handleSubmit,watch,reset,setValue,getValues,formState: { errors }} = useForm();

  let dispatch = useDispatch();

  const [modalOpen, setmodalOpen] = useState(false);

  
  const { customerList, projectTypes, subProjectTypes, activity,milestone } =
    useSelector((state) => {
      const customerList = state?.adminData?.getManageCustomer.map((itm) => {
        return {
          name: itm?.customerName,
          id: itm?.customerId,
        };
      });
      const projectTypes = state?.adminData?.getProjectTypeCompliance.map((itm) => {
        return {
          name: itm?.projectType,
          id: itm?.projectType,
        };
      });
      // const subProjectTypes = state?.adminData?.getSubProjectTypeCompliance.map(
      //   (itm) => {
      //     return {
      //       label: itm?.subProject,
      //       value: itm?.uniqueId,
      //     };
      //   }
      // );
      // const activity= state?.adminData?.getActivityAndOemCompliance.find(itm => itm.fieldName === "ACTIVITY")?.dropdownValue.split(",").map(
      //   (itm) => {
      //     return {
      //       label: itm,
      //       value: itm,
      //     };
      //   }
      // ) || []

      const milestone= state?.adminData?.getActivityAndOemCompliance.map(
        (itm) => {
          return {
            id: itm.milestoneName,
            name: itm.milestoneName,
          };
        }
      ) || []

      return { customerList, projectTypes,milestone };
    });

    let projectGroupList = useSelector((state) => {
        return state?.currentuserData?.getcurrentuserPG.map((itm) => {
          return {
            name: itm.projectGroup,
            id: itm.uniqueId,
          };
        });
    });

      // let allEmployeeList = useSelector((state) => {
      //   return state?.hrReducer?.getHRAllEmployee.map((itm) => {
      //     return {
      //       label: itm?.empName,
      //       value: itm.uniqueId,
      //     };
      //   });
      // });


  let Form = [
    {
      label: "Emp Name",
      name: "emp",
      type: "sdisabled",
      value: "",
      required: true,
      classes: "col-span-1",
    },
    {
      label: "Profile",
      name: "userRole",
      type: "sdisabled",
      value: "",
      required: true,
      classes: "col-span-1",
    },
    {
      label: "Customer Name",
      value: "",
      name:"customer",
      type:  "BigmuitiSelect",
      required: true,
      option: customerList,
      props: {
        onSelect: (e) => {
          setValue("projectType", null);
          setValue("projectGroup", null);
          setValue("complianceMilestone", null);
          dispatch(GET_CURRENT_USER_PG({ dataAll: [], reset: true }))
          dispatch(GET_PROJECT_TYPE_COMPLIANCE({ dataAll:[], reset:true }))
          dispatch(GET_ACTIVITY_AND_OEM_COMPLIANCE({ dataAll:[], reset:true }))
          let finalselection = e.map((itm) => itm.id)
          dispatch(CurrentuserActions.getcurrentuserPG(true, `customerId=${finalselection}`,1))
          dispatch(AdminActions.getProjectTypeCompiliance(true, `customerId=${finalselection}`));
          setValue("customer", finalselection.join());
          const cid = finalselection;
          complainceRef.current.cid = cid;
        },
        onRemove: (e) => {
          setValue("projectType",null);
          setValue("projectGroup",null);
          setValue("complianceMilestone",null);
          dispatch(GET_CURRENT_USER_PG({ dataAll: [], reset: true }))
          dispatch(GET_PROJECT_TYPE_COMPLIANCE({ dataAll:[], reset:true }))
          dispatch(GET_ACTIVITY_AND_OEM_COMPLIANCE({ dataAll:[], reset:true }))
          let finalselection = e.map((itm) => itm.id)
          dispatch(CurrentuserActions.getcurrentuserPG(true, `customerId=${finalselection}`,1))
          dispatch(AdminActions.getProjectTypeCompiliance(true, `customerId=${finalselection}`));
          if (finalselection.length === 0) {
            setValue("customer", null);
          } else {
            setValue("customer", finalselection.join());
          }
          const cid = finalselection;
          complainceRef.current.cid = cid;
        },
        
      },
      classes: "col-span-1",
    },
    {
      label: "Project Group",
      name: "projectGroup",
      type:  "BigmuitiSelect",
      value: "",
      option: projectGroupList,
      required: true,
      classes: "col-span-1",
    },
    {
      label: "Project Type",
      name: "projectType",
      type: "BigmuitiSelect",
      props: {
        onSelect: (e) => {
          setValue("complianceMilestone",null);
          let finalselection = e.map((itm) => itm.id)
          dispatch(AdminActions.getActivityAndOemCompiliance(true,`customerId=${complainceRef.current.cid}&projectType=${finalselection}`))
          setValue("projectType", finalselection.join());
        },
        onRemove: (e) => {
          setValue("complianceMilestone",null);
          let finalselection = e.map((itm) => itm.id)
          dispatch(AdminActions.getActivityAndOemCompiliance(true,`customerId=${complainceRef.current.cid}&projectType=${finalselection}`))
          if (finalselection.length === 0) {
            setValue("projectType", null);
          } else {
            setValue("projectType", finalselection.join());
          }
        },
      },
      option: projectTypes,
      required: true,
      value: "",
      classes: "col-span-1",
    },
    {
      label: "Milestone",
      name: "complianceMilestone",
      type: "BigmuitiSelect",
      value: "",
      props: {
        onChange: (e) => {},
      },
      required: true,
      classes: "col-span-1",
      option:milestone
    },
  ];
  


  const onTableViewSubmit = (data) => {
    data['approverType'] = "L2Approver"
    data['customer'] = data['customer']?.split(",") || []
    data['projectGroup'] = data['projectGroup']?.split(",") || []
    data['projectType'] = data['projectType']?.split(",") || []
    data['complianceMilestone'] = data['complianceMilestone']?.split(",") || []
    delete data.emp
    delete data.userRole
    if (formValue?.uniqueId) {
      dispatch(
        AdminActions.postComplianceApprover(
          true,
          data,
          () => {
            setIsOpen(false);
            dispatch(AdminActions.getComplianceApprover(true,`approverType=L2Approver`));
          },
          formValue?.uniqueId
        )
      );
    } else {
      dispatch(
        AdminActions.postComplianceApprover(true, data, () => {
          setIsOpen(false);
          dispatch(AdminActions.getComplianceApprover(true,`approverType=L2Approver`));

        })
      );
    }
  };


  useEffect(() => {


    if (resetting) {
      reset({});
      Form.map((fieldName) => {
        setValue(fieldName["name"], fieldName["value"]);
      });
    } else {
      reset({});
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
            {/* <CommonForm
              classes={"grid-cols-1 gap-1"}
              Form={Form}
              errors={errors}
              register={register}
              setValue={setValue}
              getValues={getValues}
            /> */}
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

export default ManageComplianceL2Form;
