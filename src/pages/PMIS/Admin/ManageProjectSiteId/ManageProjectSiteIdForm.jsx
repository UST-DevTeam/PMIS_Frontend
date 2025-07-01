import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../../../components/Modal";
import CommonForm from "../../../../components/CommonForm";
import Button from "../../../../components/Button";
import AdminActions from "../../../../store/actions/admin-actions";
import NewLookBadge from "../../../../components/Badge";
import ManageSite from "../ManageSite/ManageSite";
import projectListActions from "../../../../store/actions/projectList-actions";
import ManageMilestone from "../ManageMilestone/ManageMilestone";
import { Urls } from "../../../../utils/url";

const ManageProjectSiteIdForm = ({
  isOpen,
  setIsOpen,
  resetting,
  formValue = {},
  projectuniqueId,
}) => {




  const { register, handleSubmit, watch, reset, setValue, getValues, formState: { errors } } = useForm()
  let dispatch = useDispatch();
  const [modalOpen, setmodalOpen] = useState(false);
  const [modalFullOpen, setmodalFullOpen] = useState(false);
  const [modalFullBody, setmodalFullBody] = useState(<></>);
  const [modalBody, setmodalBody] = useState(<></>);
  const [SiteId, setSiteId] = useState("Add");
  const [mile, setMile] = useState("Add");
  const [old, setOld] = useState({});

  const[projectType,setProjectType] = useState("");
  const[subProjectType,setSubProjectType] = useState("");

  const [globalData, setGlobalData] = useState({
    "siteEngineer": {},
    "t_issues": {},
    "t_tracking": {},
    "t_sFinancials": {},
    "mileStone": {},
  });



  const dataGetterOld = useSelector((state) => {
    let oldata = state.projectList.getProjectTypeSub
    if (old["_id"] != oldata["_id"]) {
      setOld(oldata)
      setProjectType(oldata["projectType"])
      setValue("ptype", oldata["projectType"])

    }
    return state.projectList.getProjectTypeSub
  })





  let Form = [

    {
      label: "Project Type",
      name: "ptype",
      type: "sdisabled",
      value: "",
      required: true,
      classes: "col-span-1",
    },
    {
      label: "SubProject Type",
      name: "roleName",
      type: "select",
      value: "Select",
      option: dataGetterOld.subprojectresult,
      props: {
        onChange: (e) => {
          const selectedIndex = e.target.selectedIndex; 
          const selectedOption = e.target.options[selectedIndex];
          const label = selectedOption.label; 
          setSubProjectType(label)
          dispatch(AdminActions.getProjectTypeDyform(dataGetterOld?.custId + "/" + e.target.value))
        }
      },
      required: true,
      classes: "col-span-1",
    },
    {
      label: "Site ID",
      name: "siteId",
      type: "jsxcmpt",
      value: "",
      component: 
        <p className="cursor-pointer" 
          onClick={() => {
            setmodalFullOpen(prev => !prev)
            setmodalFullBody(<ManageSite oldgetvalue={getValues} setGlobalData={setGlobalData} setSiteId={setSiteId} setmodalFullOpen={setmodalFullOpen} projectuniqueId={projectuniqueId}  />)
          }}>
          <NewLookBadge text={SiteId} notifyType={"info"} />
        </p>,
      props: {
        onChange: (e) => { },
      },
      required: true,
      classes: "col-span-1",
    },
    {
      label: "Milestone",
      name: "milestone",
      type: "jsxcmpt",
      value: "",
      component: <p className="cursor-pointer" onClick={() => {
        setmodalFullOpen(true)
        setmodalFullBody(<ManageMilestone setGlobalData={setGlobalData} setSiteId={setMile} setmodalFullOpen={setmodalFullOpen} projectuniqueId={projectuniqueId} />)
      }}> 
      <NewLookBadge text={"Add"} notifyType={"error"} />
      </p >,
      props: {
        onChange: (e) => { },
      },
      required: true,
      classes: "col-span-1",
    },
  ];
  
  const onTableViewSubmit = (data) => {
    dispatch(projectListActions.submitProjectTypeData(Urls.projectList_globalSaver, globalData, () => {
      dispatch(projectListActions.getProjectTypeAll(projectuniqueId))
      setIsOpen(false)
    }))
  };

  useEffect(() => {
  }, [isOpen]);

  return (
    <>
      <Modal
        size={"full"}
        children={modalFullBody}
        isOpen={modalFullOpen}
        setIsOpen={setmodalFullOpen}
      />
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-full pb-4">
        <CommonForm
          classes={"grid-cols-1 gap-1"}
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

export default ManageProjectSiteIdForm;
