import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../../../components/Modal";
import CommonForm from "../../../../components/CommonForm";
import Button from "../../../../components/Button";
import AdminActions from "../../../../store/actions/admin-actions";
import HrActions from "../../../../store/actions/hr-actions";
import { circle } from "leaflet";
import { useParams } from "react-router-dom";
import projectListActions from "../../../../store/actions/projectList-actions";
import { ALERTS } from "../../../../store/reducers/component-reducer";
import FilterActions from "../../../../store/actions/filter-actions";
import { GET_PROJECT_CIRCLE } from "../../../../store/reducers/projectList-reducer";

const ManageProjectForm = ({ isOpen, setIsOpen, resetting, formValue = {}, filterData }) => {

  const { register, handleSubmit, watch, reset, setValue, getValues, formState: { errors } } = useForm();

  const { customeruniqueId, projecttypeuniqueId } = useParams();


  let dispatch = useDispatch();

  const [modalOpen, setmodalOpen] = useState(false);
  const [pType, setpType] = useState("");
  const [circlewq, setcircle] = useState("");

  const today = moment().format("YYYY-MM-DD");

  let pmempList = useSelector((state) => {
    return state?.filterData?.getautosuggestionProjectManager?.map((itm) => {
      return {
        // label: itm.empName + "(" + itm.email + ")",
        label: itm.empName,
        value: itm.uniqueId,
      };
    });
  });


  let projectGroupList = useSelector((state) => {
    return state?.adminData?.getManageProjectGroup.map((itm) => {
      return {
        label: itm.projectGroupId,
        value: itm.uniqueId,
      };
    });
  });


  let projectTypeList = useSelector((state) => {
    return state?.adminData?.getCardProjectType.map((itm) => {
      return {
        label: itm.projectType,
        value: itm.uniqueId,
      };
    });
  });

  // let subProjectList = useSelector((state) => {
  //   return state?.adminData?.getManageProjectType
  //     .filter((itm) => {
  //       console.log(itm.projectType == pType, "dasdsadsadas");
  //       return itm.projectType == pType;
  //     })
  //     .map((itm) => {
  //       return {
  //         label: itm.subProject,
  //         value: itm.uniqueId,
  //       };
  //     });
  // });

  let PMList = useSelector((state) => {
    return state?.hrReducer?.getManageEmpDetails.map((itm) => {
      return {
        label: itm.empName,
        value: itm.empName,
      };
    });
  });

  let circleList = useSelector((state) => {
    return state?.projectList?.getprojectcircle.map((itm) => {
      return {
        label: itm.circle,
        value: itm.uniqueId,
      };
    });
  });

  useSelector((state) => {
    console.log(circlewq, getValues(), circleList.length, "getValues");

    if (circlewq && circleList.length > 0) {
      setValue("circle", getValues()["circle"]);
    }
  });


  let Form = [
    {
      label: "Project ID",
      name: "projectId",
      type: Object.entries(formValue).length > 0 ? "sdisabled" : "text",
      value: "",
      required: true,
      classes: "col-span-1",
    },
    {
      label: "Project Group",
      name: "projectGroup",
      type: "select",
      value: "",
      option: projectGroupList,
      props: {
        onChange: (e) => {
          dispatch(
            projectListActions.getProjectCircle(
              true,
              `projectGroupId=${e.target.value}`
            )
          );
        },
      },
      required: true,
      classes: "col-span-1",
    },
    {
      label: "Project Type",
      value: "",
      name: Object.entries(formValue).length > 0 && customeruniqueId !== undefined && projecttypeuniqueId !== undefined ? "projectTypeName" : "projectType",
      type: Object.entries(formValue).length > 0 && customeruniqueId !== undefined && projecttypeuniqueId !== undefined ? "sdisabled" : "select",

      required: true,
      option: projectTypeList,
      props: {
        onChange: (e) => {
          setpType(
            projectTypeList.filter((iteq) => iteq.value == e.target.value)[0][
            "label"
            ]
          );
          console.log(e.target.value, "e geeter");
          setValue("projectType", e.target.value);
        },
      },
      classes: "col-span-1",
    },
    // {
    //   label: "Sub-Project Type",
    //   name: "subProject",
    //   type: "select",
    //   value: "",
    //   option: subProjectList,
    //   required: true,
    //   props: {
    //     onChange: (e) => {},
    //   },
    //   classes: "col-span-1",
    // },
    {
      label: "Circle",
      name: "circle",
      type: "select",
      value: "",
      option: circleList,
      required: true,
      props: {
        onChange: (e) => {
          // alert(e.target.value)
        },
      },
      classes: "col-span-1",
    },
    {
      label: "Start Date",
      name: "startDate",
      type: "datetime",
      value: "",
      props: {
        maxSelectableDate:today,
        onChange: (e) => {
          // console.log(e.target.value);
        },
      },
      required: true,
      classes: "col-span-1",
    },
    {
      label: "End Date",
      name: "endDate",
      type: "datetime",
      value: "",
      props: {
        minSelectableDate:today,
        onChange: (e) => { },
      },
      required: true,
      classes: "col-span-1",
    },
    {
      label: "Project Manager",
      name: "PMName",
      type: "autoSuggestion",
      value: "",
      option: pmempList,
      props: {
        onChange: (e) => {
          let filteredData = pmempList.filter(
            (itm) => itm.label == e.target.value
          );
          if (filteredData.length > 0) {
            setValue("PMId", filteredData[0]["value"]);
          }
          console.log(
            pmempList.filter((itm) => itm.label == e.target.value),
            e.target.value,
            "e.target.value"
          );
        },
      },
      required: true,
      classes: "col-span-1",
    },
    {
      label: "Status",
      name: "status",
      type: "select",
      option: [
        { label: "Active", value: "Active" },
        { label: "Archive", value: "Archive" },
        { label: "Trash", value: "Trash" },
      ],
      required: true,
      classes: "col-span-1",
    },
  ];
  const onSubmit = (data) => {
    console.log(data, "datadatadatadata");
    // dispatch(AuthActions.signIn(data, () => {
    //     navigate('/authenticate')
    // }))
  };
  const onTableViewSubmit = (data) => {

    let startDate = data['startDate'];
    let endDate = data['endDate']
    let start = new Date(startDate)
    let end = new Date(endDate)
    
    if (start>end) {
      let msgdata = {
        show: true,
        icon: "error",
        buttons: [],
        type: 1,
        text: "Start Date should not be greater than End Date",
      };
      dispatch(ALERTS(msgdata));
      return;
    }







    const options = {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };

    const inputStartDate = new Date(data["startDate"]);
    const startDateISTString = inputStartDate.toLocaleString("en-IN", options);
    data["startDate"] = startDateISTString.split(", ")[0];

    const inpuEndtDate = new Date(data["endDate"]);
    const endDateISTString = inpuEndtDate.toLocaleString("en-IN", options);
    data["endDate"] = endDateISTString.split(", ")[0];

    delete data["PMName"];

    if (formValue?.uniqueId) {
      dispatch(AdminActions.postProject(true, customeruniqueId, data, () => {
        setIsOpen(false);
        dispatch(AdminActions.getProject(`${customeruniqueId}${projecttypeuniqueId ? "/" + projecttypeuniqueId : ""}`,true,filterData));
      },
        formValue?.uniqueId
      )
      );
    }
    else {
      dispatch(AdminActions.postProject(true, customeruniqueId, data, () => {
        setIsOpen(false);
        dispatch(AdminActions.getProject(`${customeruniqueId}${projecttypeuniqueId ? "/" + projecttypeuniqueId : ""}`));
      })
      );
    }
  };
  useEffect(() => {
    dispatch(AdminActions.getManageProjectGroup(true, "", customeruniqueId));
    dispatch(AdminActions.getManageProjectType(customeruniqueId));
    dispatch(FilterActions.getautosuggestionProjectManager());
    if (customeruniqueId && projecttypeuniqueId) {
      dispatch(AdminActions.getCardProjectType(customeruniqueId, projecttypeuniqueId));
    } else if (customeruniqueId) {
      dispatch(AdminActions.getCardProjectType(customeruniqueId));
    }
    dispatch(GET_PROJECT_CIRCLE({dataAll:[],reset:true}))
    // dispatch(AdminActions.getCardProjectType(customeruniqueId));



    if (resetting) {
      reset({});
      Form.map((fieldName) => {
        setValue(fieldName["name"], fieldName["value"]);
      });
    } else {
      reset({});
      // console.log(formValue, "Object.keys(formValue)");
      Form.forEach((key) => {
        if (["startDate", "endDate"].indexOf(key.name) != -1) {
          // console.log("date formValuekey", key.name, formValue[key.name]);
          const momentObj = moment(formValue[key.name], "DD/MM/YYYY");
          setValue(key.name, momentObj.toDate());
        } else if (key.type == "select") {
          if (key.name == "projectType") {
            setpType(formValue["projectTypeName"]);
          }

          if (key.name == "projectGroup") {
            dispatch(projectListActions.getProjectCircle(true, `projectGroupId=${formValue["projectGroup"]}`));
            setcircle(true);
          }

          let dtwq = key.option.filter(
            (itq) => itq.label == formValue[key.name]
          );

          console.log(dtwq, key.name, formValue[key.name], "dtwqdtwqdtwq");
          if (dtwq.length > 0) {
            setValue(key.name, dtwq[0]["value"]);
          } else {
            setValue(key.name, formValue[key.name]);
          }
        } else {
          setValue(key.name, formValue[key.name]);
        }
      });
    }
  }, [formValue, resetting,]);
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

export default ManageProjectForm;
