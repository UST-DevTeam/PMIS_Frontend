import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../../../components/Modal";
import CommonForm from "../../../../components/CommonForm";
import Button from "../../../../components/Button";
import AdminActions from "../../../../store/actions/admin-actions";
import { useParams } from "react-router-dom";
import { ALERTS } from "../../../../store/reducers/component-reducer";
import CommonActions from "../../../../store/actions/common-actions";
// import { GET_PROJECTTYPE_MULTIDYNAMIC, GET_SUBPROJECT_MULTIDYNAMIC } from "../../../../store/reducers/admin-reducer";

const ManageSubProjectMultiDynamicFormTask = ({ isOpen, setIsOpen, resetting, formValue = {}, }) => {

  const { register, handleSubmit, watch, reset, setValue, getValues, formState: { errors } } = useForm();

  const { customeruniqueId, projecttypeuniqueId } = useParams();

  let dispatch = useDispatch();

  const [modalOpen, setmodalOpen] = useState(false);
  const [selectType, setSelectType] = useState("");
  const [selectedSubproject,setSelectedSubproject]= useState("")
  const [selectedSubproject2,setSelectedSubproject2]= useState("")
  let subProjectList = useSelector((state) => {
    return state?.adminData?.getSubProjectMultiDynamic?.map((itm) => {
      return {
        label: itm.subProject,
        value: itm.subProjectId,
      };
    });
  });
  let ProjectTypeList = useSelector((state) => {
    return state?.adminData?.getProjectTypeMultiDynamic?.map((itm) => {
      return {
        label: itm.projectType,
        value: itm.projectTypeId,
      };
    });
  });

  let Form = [
    {
      label: "Project Type",
      name: "projectType",
      type: "newmuitiSelect3",
      option: ProjectTypeList,
      required: true,
      classes: "col-span-1 mb-[50px]",
      props: {
        value: selectType,
        onChange: (e) => {
          setSelectType(e);
          const multipleProjectTypeValues = e.map(option => option.value);
          const jsonString = encodeURIComponent(JSON.stringify(multipleProjectTypeValues));
          dispatch(AdminActions.getSubProjectMultiDynamic(true, customeruniqueId, `projectType=${jsonString}`));
        },
        selectType: selectType,
      },
      hasSelectAll: true,
      
    },
    {
      label: "Sub Project", 
      name: "subProject",
      type: "newmuitiSelect3",
      option: subProjectList,
      value: "",
      required: true,
      classes: "col-span-1 mb-[50px]",
      props:{
        value:selectedSubproject,
        onChange: (e) => {
          setSelectedSubproject(e)
          const selectedValuess = e.map(option => option.value);
          setSelectedSubproject2(selectedValuess);
        },
        selectedSubproject: selectedSubproject,
      },
      hasSelectAll:true,
      
    
    },
  ];

  const onSubmit = (data) => {
    console.log(data, "datadatadatadata");
    // dispatch(AuthActions.signIn(data, () => {
    //     navigate('/authenticate')
    // }))
  };
  
  const onTableViewSubmit = (data) => {
    console.log('datadatadata',typeof(selectedSubproject2),data,formValue,selectedSubproject2,)
    dispatch(
      CommonActions.commondownload(
        "/export/siteWithTask2" +'/'+`${customeruniqueId}`,
        "Export_Project_Type_with_Task.xlsx","POST",{'subproject':selectedSubproject2}
      )
    );
    setIsOpen(false);
    setSelectType("");
    setSelectedSubproject2("");
  };
  
  useEffect(() => {
    if (customeruniqueId && projecttypeuniqueId) {
        dispatch(AdminActions.getProjectTypeMultiDynamic(true,customeruniqueId,projecttypeuniqueId));
      } else if (customeruniqueId) {
        dispatch(AdminActions.getProjectTypeMultiDynamic(true,customeruniqueId));
      }

    if (resetting) {
      reset();
      setSelectType("");
      setSelectedSubproject("");
      setSelectedSubproject2("");
      Form.map((fieldName) => {
        setValue(fieldName["name"], fieldName["value"]);
      });
    } else {
      reset();
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

      <div className="m-2 sm:mx-auto sm:w-full sm:max-w-full">
        <CommonForm
          classes={"grid-cols-2 gap-1"}
          Form={Form}
          errors={errors}
          register={register}
          setValue={setValue}
          getValues={getValues}
        />
        <Button
          classes={"mt-4 w-sm text-center flex mx-auto"}
          onClick={handleSubmit(onTableViewSubmit)}
          name="Export"
        />
      </div>
    </>
  );
};

export default ManageSubProjectMultiDynamicFormTask;
