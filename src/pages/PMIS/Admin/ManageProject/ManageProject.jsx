import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as Unicons from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import EditButton from "../../../../components/EditButton";
import TrashButton from "../../../../components/TrashButton";
import ManageProjectForm from "../../../../pages/PMIS/Admin/ManageProject/ManageProjectForm";
import ManageSubProjectMultiDynamicForm from "../../../../pages/PMIS/Admin/ManageProject/ManageSubProjectMultiDynamicForm";
import AdvancedTable from "../../../../components/AdvancedTable";
import Modal from "../../../../components/Modal";
import Button from "../../../../components/Button";
import DeleteButton from "../../../../components/DeleteButton";
import CstmButton from "../../../../components/CstmButton";
import ToggleButton from "../../../../components/ToggleButton";
import { MdMessage } from "react-icons/md";

import {
  getAccessType,
  objectToQueryString,
} from "../../../../utils/commonFunnction";
import { ALERTS } from "../../../../store/reducers/component-reducer";
import CommonActions from "../../../../store/actions/common-actions";
import ComponentActions from "../../../../store/actions/component-actions";

import { Urls } from "../../../../utils/url";
import { useNavigate, useParams } from "react-router-dom";
import OperationManagementActions from "../../../../store/actions/admin-actions";
import AdminActions from "../../../../store/actions/admin-actions";
import FileUploader from "../../../../components/FIleUploader";
import ConditionalButton from "../../../../components/ConditionalButton";
import ButtonWithTooltip from "../../../../components/ButtonWithTooltip";
import eventManagementActions from "../../../../store/actions/eventLogs-actions";
import EventLog from "../../../../components/EventLogs";
import CommonForm from "../../../../components/CommonForm";
import PopupMenu from "../../../../components/PopupMenu";
import FilterActions from "../../../../store/actions/filter-actions";
import ManageSubProjectMultiDynamicFormTask from "./ManageSubProjectMultiDynamicFormTask";
import { GET_PROJECT_ALL_LIST } from "../../../../store/reducers/projectList-reducer";
import { PROJECTEVENTLIST } from "../../../../store/reducers/eventlogs-reducer";
import SearchBarView from "../../../../components/SearchBarView";
import projectListActions from "../../../../store/actions/projectList-actions";


const ManageProject = () => {

  const { cname, ptname, projecttypeuniqueId, customeruniqueId } = useParams();
  const [modalOpen, setmodalOpen] = useState(false);
  const [modalBody, setmodalBody] = useState(<></>);
  const [modalHead, setmodalHead] = useState(<></>);
  const [fileOpen, setFileOpen] = useState(false);
  const [fileOpenlink, setFileOpenlink] = useState([]);
  const [fileType, setfileType] = useState("");
  const [modalFullOpen, setmodalFullOpen] = useState(false);
  const [bulkfileOpen, setbulkfileOpen] = useState(false);
  const [strValFil, setstrVal] = useState(false);
  const [modalSize, setModalSize] = useState("lg");
  const [searchTerm, setSearchTerm] = useState("");
  const debounceTimeout = useRef(null);

  let dispatch = useDispatch();
  let navigate = useNavigate();

  let projectTypeForm = [
    {
      label: "Select Project Type",
      name: "projectType",
      type: "BigmuitiSelect",
      value: "",
      option: [
        { id: "hiii", name: "hello" },
        { id: "hello", name: "hii" },
      ],
      props: {
        onChange: (e) => {
          console.log(e.target.value, "e.target.value");
        },
      },
      required: true,
      classes: "col-span-1",
      width:"350px"
    },
  ];

  let dbConfigList = useSelector((state) => {
    let interdata = state?.adminData?.getProject;
    return interdata?.map((itm) => {
      let updateditm = {
        ...itm,
        // "status": <CstmButton child=
        // {<ToggleButton onChange={(e) => {
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

        // status:"dsadsadsa",
        projectId: (
          <button>
            <p
              onClick={() => {
                dispatch(GET_PROJECT_ALL_LIST({dataAll:[],reset:true}))
                dispatch(
                  ComponentActions.globalUrlStore(itm.projectId,`/projectManagement_2/${cname}/${ptname}/${itm.custId}/${itm.projectId}/${itm.uniqueId}`
                  )
                );
                dispatch(
                  ComponentActions.breadcrumb(
                    itm.projectId,
                    `/projectManagement_2/${cname}/${ptname}/${itm.custId}/${itm.projectId}/${itm.uniqueId}`,
                    1,
                    false
                  )
                );
                navigate(
                  `/projectManagement_2/${cname}/${ptname}/${itm.custId}/${itm.projectId}/${itm.uniqueId}`
                );
              }}
              className="text-pcol font-extrabold hover:underline hover:text-[#CA8A04] focus:outline-none hover:font-semibold"
            >
              {itm.projectId}
            </p>
          </button>
        ),  
        eventLogs: <></>,
        edit: (
          <>
            <div className="flex justify-center gap-3">
              <p
                className="items-center cursor-pointer text-[#E6BE8A]"
                onClick={() => {
                  setModalSize("lg")
                  setmodalFullOpen((prev) => !prev);
                  setmodalHead("Project Event Logs");
                  dispatch(PROJECTEVENTLIST({dataAll:[],reset:true}))
                  dispatch(eventManagementActions?.getprojecteventList(true,itm?.uniqueId));
                  setmodalBody(<EventLog type={"project"} unqeId={itm?.uniqueId} urlType={"getprojecteventList"}/> );
                }}
              >
                <MdMessage size={30} />
              </p>
              <CstmButton
                className={"p-2"}
                child={
                  <EditButton
                    name={""}
                    onClick={() => {
                      // alert(itm.uniqueId)
                      setmodalOpen(true);
                      // dispatch(AdminActions.getProject(`${itm.customeruniqueId}/${itm.uniqueId}`))
                      setmodalHead("Edit Project");
                      setmodalBody(
                        <>
                          <ManageProjectForm
                            isOpen={modalOpen}
                            customeruniqueId={customeruniqueId}
                            setIsOpen={setmodalOpen}
                            resetting={false}
                            formValue={itm}
                            filterData = {strValFil}
                          />
                          {/* <div className='mx-3'><Button name={"Submit"} classes={""} onClick={(handleSubmit(onTableViewSubmit))} /></div> */}
                        </>
                      );

                      //setmodalOpen(false)
                    }}
                  ></EditButton>
                }
              />

              {itm.status == "Trash" ? (
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
                              classes="w-15 bg-green-500"
                              onClick={() => {
                                dispatch(
                                  CommonActions.deleteApiCaller(
                                    `${Urls.admin_project}/${itm.customeruniqueId}/${itm.uniqueId}`,
                                    () => {
                                      dispatch(
                                        AdminActions.getProject(
                                          `${customeruniqueId}`
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
                                console.log("snnsnsnsns");
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
              ) : (
                ""
              )}
            </div>
          </>
        ),

        // trash: (
        //   <CstmButton
        //     className={""}
        //     child={
        //       <TrashButton
        //         name={""}
        //         onClick={() => {
        //           // alert(itm.uniqueId)
        //           setmodalOpen(true);
        //           // dispatch(AdminActions.getProject(`${itm.customeruniqueId}/${itm.uniqueId}`))
        //           setmodalHead("Edit Project");
        //           setmodalBody(
        //             <>
        //               <ManageProjectForm
        //                 isOpen={modalOpen}
        //                 customeruniqueId={customeruniqueId}
        //                 setIsOpen={setmodalOpen}
        //                 resetting={false}
        //                 formValue={itm}
        //               />
        //               {/* <div className='mx-3'><Button name={"Submit"} classes={""} onClick={(handleSubmit(onTableViewSubmit))} /></div> */}
        //             </>
        //           );

        //           //setmodalOpen(false)
        //         }}
        //       ></TrashButton>
        //     }
        //   />
        // ),

        // delete: (
        //   <CstmButton
        //     child={
        //       <DeleteButton
        //         name={""}
        //         onClick={() => {
        //           let msgdata = {
        //             show: true,
        //             icon: "warning",
        //             buttons: [
        //               <Button
        //                 classes="w-15 bg-green-500"
        //                 onClick={() => {
        //                   dispatch(
        //                     CommonActions.deleteApiCaller(
        //                       `${Urls.admin_project}/${itm.customeruniqueId}/${itm.uniqueId}`,
        //                       () => {
        //                         dispatch(
        //                           AdminActions.getProject(`${customeruniqueId}`)
        //                         );
        //                         dispatch(ALERTS({ show: false }));
        //                       }
        //                     )
        //                   );
        //                 }}
        //                 name={"OK"}
        //               />,
        //               <Button
        //                 classes="w-auto"
        //                 onClick={() => {
        //                   console.log("snnsnsnsns");
        //                   dispatch(ALERTS({ show: false }));
        //                 }}
        //                 name={"Cancel"}
        //               />,
        //             ],
        //             text: "Are you sure you want to Delete?",
        //           };
        //           dispatch(ALERTS(msgdata));
        //         }}
        //       ></DeleteButton>
        //     }
        //   />
        // ),
      };
      return updateditm;
    });
  });
  let dbConfigTotalCount = useSelector((state) => {
    let interdata = state?.adminData?.getProject;
    if (interdata.length > 0) {
      return interdata[0]["overall_table_count"];
    } else {
      return 0;
    }
  });
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setValues,
    getValues,
    formState: { errors },
  } = useForm();

  let circleList = useSelector((state) => {
    return state?.filterData?.getProjectCircle.map((itm) => {
      return {
        label: itm.circle,
        value: itm.circle,
      };
    });
  });

  let projectIdList = useSelector((state) => {
    return state?.filterData?.getProjectProjectId.map((itm) => {
      return {
        label: itm.projectId,
        value: itm.projectId,
      };
    });
  });

  let projectGroupList = useSelector((state) => {
    return state?.filterData?.getProjectProjectGroup.map((itm) => {
      return {
        label: itm.ProjectGroup,
        value: itm.ProjectGroup,
      };
    });
  });

  let projectTypeList = useSelector((state) => {
    return state?.filterData?.getProjectProjectType.map((itm) => {
      return {
        label: itm.projectType,
        value: itm.projectType,
      };
    });
  });

  let projectManagerList = useSelector((state) => {
    return state?.filterData?.getProjectProjectManager.map((itm) => {
      return {
        label: itm.projectManager,
        value: itm.projectManager,
      };
    });
  });

  let showTypeforAction = getAccessType("Action(Project)")

  let shouldIncludeEditColumn = false

  if (showTypeforAction === "visible"){
    shouldIncludeEditColumn = true
  }


  let table = {
    columns: [
      {
        name: "Project ID",
        value: "projectId",
        style: "min-w-[170px] max-w-[200px] text-center sticky left-0 bg-[#3e454d]",
      },
      {
        name: "Project Group",
        value: "projectGroupId",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Project Type",
        value: "projectTypeName",
        style: "min-w-[100px] max-w-[200px] text-center",
      },
      {
        name: "Project Manager",
        value: "PMName",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Circle",
        value: "circleName",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Start Date",
        value: "startDate",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "End Date",
        value: "endDate",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Status",
        value: "status",
        style: "min-w-[100px] max-w-[200px] text-center",
      },
      ...(shouldIncludeEditColumn
        ? [
            {
              name: "Edit",
              value: "edit",
              style: "min-w-[100px] max-w-[200px] text-center",
            },
          ]
        : [])
    ],
    // properties: {
    //   rpp: [10, 20, 50, 100],
    // },
    filter: [
      // {
      //   label: "Project ID",
      //   type: "select",
      //   name: "projectId",
      //   option: projectIdList,
      //   props: {},
      // },
      // {
      //   label: "Project Group",
      //   type: "select",
      //   name: "projectGroup",
      //   option: projectGroupList,
      //   props: {},
      // },
      // {
      //   label: "Project Type",
      //   type: "select",
      //   name: "projectType",
      //   option: projectTypeList,
      //   props: {},
      // },
      // {
      //   label: "Project Manager",
      //   type: "autoSuggestion",
      //   name: "projectManager",
      //   option: projectManagerList,
      //   props: {},
      // },
      // {
      //   label: "Circle",
      //   type: "select",
      //   name: "circle",
      //   option: circleList,
      //   props: {},
      // },
      {
        label: "Status",
        type: "select",
        name: "statusType",
        option: [
          { label: "Active", value: "Active" },
          { label: "Trash", value: "Trash" },
          { label: "Archive", value: "Archive" },
        ],
        props: {},
      },
      // {
      //   label: "Select Project Type",
      //   name: "projectType",
      //   type: "BigmuitiSelect",
      //   value: "",
      //   option: [
      //     // dispatch(AdminActions.getCardProjectType(customeruniqueId))
      //   ],
      //   props: {
      //     onChange: (e) => {
      //       console.log(e.target.value, "e.target.value");
      //     },
      //   },
      //   required: true,
      //   classes: "col-span-1",
      //   width:"350px"
      // },
      
    ],
  };
  const onSubmit = (data) => {

    let value = data.reseter
    delete data["reseter"];
    let strVal=objectToQueryString(data)
    setstrVal(strVal)
    dispatch(AdminActions.getProject(`${customeruniqueId}${projecttypeuniqueId ? "/" + projecttypeuniqueId : ""}`,true,strVal));
  };
  useEffect(() => {
    dispatch(AdminActions.getProject(`${customeruniqueId}${projecttypeuniqueId ? "/" + projecttypeuniqueId : ""}`));
    // dispatch(FilterActions.getProjectCircle(`${customeruniqueId}${projecttypeuniqueId ? "/" + projecttypeuniqueId : ""}`));
    // dispatch(FilterActions.getProjectProjectId(`${customeruniqueId}${projecttypeuniqueId ? "/" + projecttypeuniqueId : ""}`));
    // dispatch(FilterActions.getProjectProjectGroup(`${customeruniqueId}${projecttypeuniqueId ? "/" + projecttypeuniqueId : ""}`));
    // dispatch(FilterActions.getProjectProjectType(`${customeruniqueId}${projecttypeuniqueId ? "/" + projecttypeuniqueId : ""}`));
    // dispatch(FilterActions.getProjectProjectManager(`${customeruniqueId}${projecttypeuniqueId ? "/" + projecttypeuniqueId : ""}`));
    // dispatch(eventManagementActions.getprojecteventList());
  }, []);

  const onTableViewSubmit = (data) => {
    data["fileType"]=fileType
    dispatch(
      CommonActions.fileSubmit(Urls.common_update_site_milestone, data, () => {
        dispatch(AdminActions.getProject(customeruniqueId));
        setFileOpen(false);
        reset("");
      })
    );
  };


  const onBulkUploadSite = (data, cuid, puid) => {
    data["fileType"]="ManageSiteBulkUpload"
    let makeUrl = `${Urls.upload_bulk_site}${cuid ? "/" + cuid : ""}${
      puid ? "/" + puid : ""
    }`;
    dispatch(
      CommonActions.fileSubmit(makeUrl, data, () => {
        // dispatch(AdminActions.getProject());
        setFileOpen(false);
        reset("");
      })
    );
  };

  let FormMulti= [
    {
      label: "Sub Project",
      name: "subProject",
      type: "select",
      value: "",
      required: true,
      props: {
        onChange: (e) => {
        },
      },
      classes: "col-span-1",
    },
  ]

  let exportpopupShowType = false
  let upgradepopupShowType = false
  
  let showType1 = getAccessType("Export(Project)")
  if (showType1 === "visible"){
    exportpopupShowType = true
  }
  let showType2 = getAccessType("Upgrade(Project)")
  if (showType2 === "visible"){
    upgradepopupShowType = true
  }

  const handleSearch = (value) => {
    dispatch(
      AdminActions.getProject(
        `${customeruniqueId}${projecttypeuniqueId ? "/" + projecttypeuniqueId : ""}`,
        true,
        value !== "" ? "searvhView=" + value : ""
      )
    );
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Clear the previous timeout
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    // Set a new timeout
    debounceTimeout.current = setTimeout(() => {
      handleSearch(value);
    }, 500); // Adjust the delay (in milliseconds) as needed
  };



  return (
    <>
      <AdvancedTable
        searchView={
          <>
            <SearchBarView
              onblur={(e) => {
              }}
              // onchange={(e) => {
              //   dispatch(AdminActions.getProject(`${customeruniqueId}${projecttypeuniqueId ? "/" + projecttypeuniqueId : ""}`,true,e.target.value != ""? "searvhView=" + e.target.value: ""));
              // }}
              onchange={handleChange}
              placeHolder={"Search...."}
            />
          </>
        }
        headerButton={
          <div className="flex">
            <ConditionalButton
              showType={getAccessType("Add Project")}
              classes="mr-1"
              onClick={(e) => {
                setModalSize("lg")
                setmodalOpen((prev) => !prev);
                setmodalHead("Add Project");
                setmodalBody(
                  <ManageProjectForm
                    isOpen={modalOpen}
                    projecttypeuniqueId={projecttypeuniqueId}
                    customeruniqueId={customeruniqueId}
                    setIsOpen={setmodalOpen}
                    resetting={true}
                    formValue={{}}
                  />
                );
              }}
              name={"Add Project"}
            ></ConditionalButton>
          
            <ConditionalButton
              name={"Bulk Upload"}
              showType={getAccessType("Bulk Upload(Project)")}
              classes="w-auto mr-1"
              bgColor={"bg-yellow-600"}
              onClick={(e) => {
                setbulkfileOpen((prev) => !prev);
              }}
            ></ConditionalButton>

            { exportpopupShowType && (
            <PopupMenu
              name={"Export"}
              icon={"Export"}
              classes={"w-auto"}
              bgColor={"bg-[#147b99]"}
              child={
                <div classes="z-40 max-h-96 justify-center">
                  <Button
                    name={"Export Project"}
                    classes="w-auto m-4"
                    onClick={() => {
                      dispatch(
                        CommonActions.commondownload(
                          "/export/Project/" + `${customeruniqueId}` + "/" + `${projecttypeuniqueId}`+"?"+strValFil,
                          "Export_Project.xlsx"
                        )
                      );
                    }}
                    >
                  </Button>
                      {/* <Button
                      name={"Export Site"}
                      classes="w-auto m-4"
                      onClick={() => {
                        dispatch(
                          CommonActions.commondownload(
                            "/export/siteWithOutTask/" +`${customeruniqueId}` +"/" +`${projecttypeuniqueId}`,
                            "Export_Project_with_Site.xlsx"
                          )
                        );
                      }}
                      >
                      </Button> */}
                      {/* <Button
                      name={"Export Site with Task"}
                      classes="w-auto m-4"
                      onClick={() => {
                        dispatch(
                          CommonActions.commondownload(
                            "/export/siteWithAll/" +`${customeruniqueId}` +"/" +`${projecttypeuniqueId}`,
                            "Export_Project_with_Task.xlsx"
                          )
                        );
                      }}
                      >
                      </Button> */}
                      
                      <Button
                      name={"Export Site with Sub Project"}
                      classes="w-auto m-4"
                      onClick={() => {
                        setModalSize("sm")
                        setmodalOpen(true)  
                        setmodalHead("Sub Project Export")
                        setmodalBody(<>
                            <ManageSubProjectMultiDynamicForm
                            isOpen={modalOpen}
                            projecttypeuniqueId={projecttypeuniqueId}
                            customeruniqueId={customeruniqueId}
                            setIsOpen={setmodalOpen}
                            resetting={true}
                            formValue={{}}
                          />
                        </>)
                      }}
                      >
                      </Button>
                      <Button
                      name={"Export Task with Sub Project"}
                      classes="w-auto m-4"
                      onClick={() => {
                        setModalSize("sm")
                        setmodalOpen(true)  
                        setmodalHead("Sub-Project Task Export")
                        setmodalBody(<>
                           <ManageSubProjectMultiDynamicFormTask
                            isOpen={modalOpen}
                            projecttypeuniqueId={projecttypeuniqueId}
                            customeruniqueId={customeruniqueId}
                            setIsOpen={setmodalOpen}
                            resetting={true}
                            formValue={{}}
                          />
                        </>)
                        // dispatch(
                        //   CommonActions.commondownload(
                        //     "/export/siteWithOutTask/" +`${customeruniqueId}` +"/" +`${projecttypeuniqueId}`,
                        //     "Export_Project_with_Site.xlsx"
                        //   )
                        // );
                      }}
                      >
                      </Button>
                </div>
              }
            />
            )}

            {upgradepopupShowType && (
              <PopupMenu
                name={"Upgrade"}
                icon={"Upgrade"}
                classes="w-auto"
                bgColor={"bg-[#A16E83]"}
                child={
                  <div classes="flex z-40 max-h-96 flex-col p-1">
                    <Button name={"Upgrade Site"} classes='w-auto m-5' 
                      onClick={(e) => {
                          setFileOpen(prev=>!prev)
                          setFileOpenlink([`/template/Site_Update.xlsx`,"Site_Update.xlsx"])
                          setfileType(`updateSite`)
                      }}>
                    </Button>

                     <Button
                      name={"Upgrade Task"}
                      classes="w-auto m-5"
                      onClick={() => {
                        setFileOpen(prev=>!prev)
                        setFileOpenlink([`/template/Task_Update.xlsx`,"Task_Update.xlsx"])
                        setfileType(`updateMilestone`)
                      }}
                      >
                      </Button>

                     <Button
                      name={"Upgrade Old Task"}
                      classes="w-auto m-5"
                      onClick={() => {
                        setFileOpen(prev=>!prev)
                        setFileOpenlink([`/template/Old_Task_Update.xlsx`,"Old_Task_Update.xlsx"])
                        setfileType(`updateOldMilestone`)
                      }}
                      >
                      </Button>
                </div>
                    
                  }
              />
            )}

          </div>
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
        heading = {"Total Projects:-"}
        totalCount={dbConfigTotalCount}
      />
      <Modal
        size={modalSize}
        Form={FormMulti}
        modalHead={modalHead}
        children={modalBody}
        isOpen={modalOpen}
        setIsOpen={setmodalOpen}
      />
      <Modal
        size={"full"}
        modalHead={modalHead}
        children={modalBody}
        isOpen={modalFullOpen}
        setIsOpen={setmodalFullOpen}
      />

      <FileUploader
        isOpen={fileOpen}
        fileUploadUrl={""}  
        onTableViewSubmit={onTableViewSubmit}
        tempbtn={fileOpenlink.length!=0}
        tempbtnlink={fileOpenlink}
        setIsOpen={setFileOpen}
      />

       <FileUploader
        isOpen={bulkfileOpen}
        fileUploadUrl={""}
        tempbtn={true}
        tempbtnlink={[
          `/ProjectIDBulkUploadTemplate${
            customeruniqueId ? "/" + customeruniqueId : ""
          }${projecttypeuniqueId ? "/" + projecttypeuniqueId : ""}`,
          "BulkSite.xlsx",
        ]}
        onTableViewSubmit={(data) => {
          onBulkUploadSite(data, customeruniqueId,projecttypeuniqueId );
          setbulkfileOpen(false)
          resetting("")
        }}
        setIsOpen={setbulkfileOpen}
      />
    </>
  );
};

export default ManageProject;
