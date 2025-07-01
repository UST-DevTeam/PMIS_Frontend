import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Unicons from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import EditButton from "../../../../components/EditButton";
import ManageSubProjectForm from "../../../PMIS/Admin/ManageSubProject/ManageSubProjectForm";
import AdvancedTable from "../../../../components/AdvancedTable";
import Modal from "../../../../components/Modal";
import Button from "../../../../components/Button";
import DeleteButton from "../../../../components/DeleteButton";
import CstmButton from "../../../../components/CstmButton";
import ToggleButton from "../../../../components/ToggleButton";
import { objectToQueryString } from "../../../../utils/commonFunnction";
import { ALERTS } from "../../../../store/reducers/component-reducer";
import CommonActions from "../../../../store/actions/common-actions";
import { Urls, backendassetUrl, baseUrl } from "../../../../utils/url";
// import AdminActions from '../../../../store/actions/admin-actions';
import AdminActions from "../../../../store/actions/admin-actions";
import { useNavigate, useParams } from "react-router-dom";
import CCDash from "../../../../components/CCDash";
import CommonForm from "../../../../components/CommonForm";
import CommonTableForm from "../../../../components/CommonTableForm";
import ComponentActions from "../../../../store/actions/component-actions";

const ManageSubProject = () => {
  const { projecttypeuniqueId } = useParams();

  const [modalOpen, setmodalOpen] = useState(false);
  const [modalBody, setmodalBody] = useState(<></>);
  const [type, settype] = useState(false);
  const [modalHead, setmodalHead] = useState(<></>);

  // setconditioncountform((prev) => {
  //     let val = [...prev]
  //     let sval = val.pop()
  //     if (isNaN(sval)) {
  //       finval = 1
  //     } else {
  //       finval = sval + 1
  //     }
  //     console.log(finval, "finval", val, prev)
  //     return [...prev, finval]
  //   })

  let dispatch = useDispatch();

  let navigate = useNavigate();

  let conditionmultiForm = [
    {
      label: "Doc. Number",
      name: "docNumber",
      value: "",
      type: "text",
      props: "",
      required: false,
      placeholder: "",
    },
    {
      label: "Doc. Number1",
      name: "docNumber",
      value: "",
      type: "text",
      props: "",
      required: false,
      placeholder: "",
    },
  ];

  let dbConfigList = useSelector((state) => {
    let interdata = state?.adminData?.getManageSubProject;
    return interdata?.map((itm) => {
      let updateditm = {
        ...itm,

        imgshow: <img src={backendassetUrl + itm?.companyimg} />,
        // "status": <CstmButton child={<ToggleButton onChange={(e) => {
        //     console.log(e.target.checked, "e.target.checked")
        //     let data = {
        //         "enabled": e.target.checked ? 1 : 0
        //     }
        //     dispatch(AlertConfigurationActions.patchAlertConfig(true, data, () => {
        //         // alert(e.target.checked)
        //         e.target.checked = e.target.checked
        //     }, itm.id))
        //     // if(itm.enabled==0){
        //     //     itm.enabled=1
        //     // }else{
        //     //     itm.enabled=0
        //     // }
        //     // itm.enabled=itm.enabled==0?1:0
        //     console.log(itm.enabled, "itm.enabled")
        // }} defaultChecked={itm.enabled == 1 ? true : false}></ToggleButton>} />,

        template: (
          <CstmButton
            className={"p-2"}
            child={
              <Button
                classes="w-10"
                name={""}
                icon={<Unicons.UilAirplay />}
                onClick={() => {
                  setmodalOpen(true);
                  dispatch(AdminActions.getManageSubProjectType());
                  setmodalHead("Templates");
                  setmodalBody(
                    <>
                      <div className="flex flex-col justify-between p-2">
                        <div class="overflow-scroll">
                          {/* {conditioncountform.map((val, index) => {
                                        return <>
                                            <CommonForm classes={"grid-cols-1 md:grid-cols-2 lg:gap-8 w-full"} errors={errors} Form={conditionmultiForm.map((itm) => {
                                                return {
                                                    ...itm,
                                                    type: itm.name == "formovalue" ? nestfilter["wherecondition" + "_" + val + "_form"] == "joins" ? "muitiSelect" : "text" : itm.type,
                                                    props: itm.label == "Select Column" || (itm.label == "Value" && nestfilter["wherecondition" + "_" + val + "_form"] == "joins") ? {
                                                        ...itm.props, onSelect: (a, b) => {
                                                            console.log("gamecall", a, b, "column" + "_" + val + "_form")
                                                            setValue(itm.label == "Select Column" ? "wherecolumn" + "_" + val + "_form" : "formovalue" + "_" + val + "_form", b.category + "smartGame" + b.name)
                                                        }
                                                    } : { ...itm.props },
                                                    option: itm.label == "Expression" ? all_command_type_wise[nestfilter["wherecondition" + "_" + val + "_form"]] : itm.option,
                                                    name: itm.name + "_" + val + "_form"
                                                }
                                            })}
                                                register={register} setValue={setValue} getValues={getValues} />
                                        </>
                                    })} */}
                        </div>
                      </div>
                      <CommonTableForm
                        classes={"grid-cols-2 gap-1"}
                        Form={conditionmultiForm}
                        errors={errors}
                        register={register}
                        setValue={setValue}
                        getValues={getValues}
                      />

                      {/* <ManageProjectTypeForm isOpen={modalOpen} setIsOpen={setmodalOpen} resetting={false} formValue={itm} /> */}
                      {/* <div className='mx-3'><Button name={"Submit"} classes={""} onClick={(handleSubmit(onTableViewSubmit))} /></div> */}
                    </>
                  );
                }}
              ></Button>
            }
          />
        ),
        milestone: (
          <CstmButton
            className={"p-2"}
            child={
              <Button
                classes="w- 10"
                name={""}
                icon={<Unicons.UilAirplay />}
                onClick={() => {
                  setmodalOpen(true);
                  dispatch(AdminActions.getManageSubProjectType());
                  setmodalHead("Milestone");
                  setmodalBody(
                    <>
                      <ManageSubProjectForm
                        isOpen={modalOpen}
                        setIsOpen={setmodalOpen}
                        resetting={false}
                        formValue={itm}
                      />
                      {/* <div className='mx-3'><Button name={"Submit"} classes={""} onClick={(handleSubmit(onTableViewSubmit))} /></div> */}
                    </>
                  );
                }}
              ></Button>
            }
          />
        ),
        commercial: (
          <CstmButton
            className={"p-2"}
            child={
              <Button
                classes="w-10"
                icon={<Unicons.UilAirplay />}
                name={""}
                onClick={() => {
                  setmodalOpen(true);
                  dispatch(AdminActions.getManageSubProjectType());
                  setmodalHead("Coomercial");
                  setmodalBody(
                    <>
                      <ManageSubProjectForm
                        isOpen={modalOpen}
                        setIsOpen={setmodalOpen}
                        resetting={false}
                        formValue={itm}
                      />
                      {/* <div className='mx-3'><Button name={"Submit"} classes={""} onClick={(handleSubmit(onTableViewSubmit))} /></div> */}
                    </>
                  );
                }}
              ></Button>
            }
          />
        ),

        delete: (
          <CstmButton
            child={
              <DeleteButton
                name={""}
                onClick={() => {
                  let msgdata = {
                    show: true,
                    icon: "warning",
                    buttons: [
                      <Button
                        classes='w-15 bg-rose-400'
                        onClick={() => {
                          dispatch(
                            CommonActions.deleteApiCaller(
                              `${Urls.admin_sub_projecttype}/${projecttypeuniqueId}/${itm.uniqueId}`,
                              () => {
                                dispatch(
                                  AdminActions.getManageSubProjectType(
                                    projecttypeuniqueId
                                  )
                                );
                                dispatch(ALERTS({ show: false }));
                              }
                            )
                          );
                        }}
                        name={"OK"}
                      />,
                      <Button
                        classes="w-auto"
                        onClick={() => {
                          dispatch(ALERTS({ show: false }));
                        }}
                        name={"Cancel"}
                      />,
                    ],
                    text: "Are you sure you want to Delete?",
                  };
                  dispatch(ALERTS(msgdata));
                }}
              ></DeleteButton>
            }
          />
        ),
      };
      return updateditm;
    });
  });
  let dbConfigTotalCount = useSelector((state) => {
    let interdata = state?.adminData?.getManageSubProject;
    if (interdata.length > 0) {
      return interdata[0]["overall_table_count"];
    } else {
      return 0;
    }
  });
  // let Form = [
  //     { label: "DB Server", value: "", option: ["Please Select Your DB Server"], type: "select" },
  //     { label: "Custom Queries", value: "", type: "textarea" }
  // ]
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setValues,
    getValues,
    formState: { errors },
  } = useForm();

  let table = {
    columns: [
      {
        name: "Project Type",
        value: "projectType",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Sub Type",
        value: "subProject",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Status",
        value: "status",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Template",
        value: "template",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Milestone",
        value: "milestone",
        style: "min-w-[140px] max-w-[200px] text-center",
      },

      {
        name: "Commercial",
        value: "commercial",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Edit",
        value: "edit",
        style: "min-w-[100px] max-w-[200px] text-center",
      },
      {
        name: "Delete",
        value: "delete",
        style: "min-w-[100px] max-w-[200px] text-center",
      },
    ],
    properties: {
      rpp: [10, 20, 50, 100],
    },
    filter: [
      // {
      //     label: "Role",
      //     type: "select",
      //     name: "rolename",
      //     option: roleList,
      //     props: {
      //     }
      // }
    ],
  };
  const onSubmit = (data) => {
    let value = data.reseter;
    delete data.reseter;
    dispatch(
      AdminActions.getManageProjectType(value, objectToQueryString(data))
    );
  };
  useEffect(() => {
    dispatch(AdminActions.getManageSubProjectType(projecttypeuniqueId));
  }, []);
  return type ? (
    <>
      <div className="flex p-2">
        <Button
          classes="w-auto"
          onClick={() => {
            settype(false);
          }}
          name={"View"}
        />
      </div>
      <AdvancedTable
        headerButton={
          <>
            <Button
              onClick={(e) => {
                setmodalOpen((prev) => !prev);
                // dispatch(OperationManagementActions.getOperationUserList())
                setmodalHead("New Sub Project ");
                setmodalBody(
                  <ManageSubProjectForm
                    projecttypeuniqueId={projecttypeuniqueId}
                    isOpen={modalOpen}
                    setIsOpen={setmodalOpen}
                    resetting={true}
                    formValue={{}}
                  />
                );
              }}
              name={"Add Sub Project "}
            ></Button>
          </>
        }
        table={table}
        filterAfter={onSubmit}
        tableName={"UserListTable"}
        handleSubmit={handleSubmit}
        data={dbConfigList}
        errors={errors}
        register={register}
        setValue={setValue}
        getValues={getValues}
        totalCount={dbConfigTotalCount}
      />

      <Modal
        size={"lg"}
        modalHead={modalHead}
        children={modalBody}
        isOpen={modalOpen}
        setIsOpen={setmodalOpen}
      />

      {/* <CommonForm/> */}
    </>
  ) : (
    <>
      <CCDash
        approveddata={dbConfigList?.map((itm) => {
          return (
            <>
              <div
                className="bg-pink-100 shadow-md hover:shadow-rxl w-[98%] flex h-24 cursor-pointer rounded-lg hover:scale-[102%] transition-all duration-500 font-oxygen font-bold  hover:text-lg  "
                onClick={() => {
                  dispatch(
                    ComponentActions.globalUrlStore(
                      itm["subProject"],
                      `${"/project"}/${itm["uniqueId"]}`
                    )
                  );
                  navigate(`${"/project"}/${itm["uniqueId"]}`);
                }}
              >
                {itm["companyimg"] && itm["companyimg"] != "" && (
                  <>
                    <img
                      className="m-auto w-24"
                      src={backendassetUrl + itm["companyimg"]}
                    />
                  </>
                )}
                <div className="m-auto ">{itm["subProject"]}</div>
              </div>
            </>
          );
        })}
        settype={settype}
        label="Add / Modify Project Type"
        showbtn={false}
      />

      {/* <CCDash settype={settype} nextNavigate={"/viewcu"} name={"projectType"} img={""} data={dbConfigList} url="/list/manageCustomer" label='Add / Modify Project Type' /> */}
    </>
  );
};

export default ManageSubProject;
