import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Unicons from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../../components/Modal";
import Button from "../../../components/Button";
import DeleteButton from "../../../components/DeleteButton";
import CstmButton from "../../../components/CstmButton";
import ToggleButton from "../../../components/ToggleButton";
import { MdMessage } from "react-icons/md";
import PopupMenu from "../../../components/PopupMenu";
import {
  getAccessType,
  objectToQueryString,
  parseTwoDigit,
} from "../../../utils/commonFunnction";
import { ALERTS } from "../../../store/reducers/component-reducer";
import CommonActions from "../../../store/actions/common-actions";
import { Urls } from "../../../utils/url";
import OperationManagementActions from "../../../store/actions/admin-actions";
import AdminActions from "../../../store/actions/admin-actions";
import { useNavigate, useParams } from "react-router-dom";
import projectListActions from "../../../store/actions/projectList-actions";
import AdvancedTableExpandable from "../../../components/AdvancedTableExpandable";
import SearchBarView from "../../../components/SearchBarView";

import ProgressBar from "../../../components/ProgressBar";
import { onehundcolor } from "../../../utils/queryBuilder";
import ConditionalButton from "../../../components/ConditionalButton";
import eventManagementActions from "../../../store/actions/eventLogs-actions";
import EventLog from "../../../components/EventLogs";
import { GET_ONE_MANAGE_PROJECT_TYPE_DY_FORM } from "../../../store/reducers/admin-reducer";
import FilterActions from "../../../store/actions/filter-actions";
import ManageProjectSiteIdForm from "../Admin/ManageProjectSiteId/ManageProjectSiteIdForm";
import AllocateProjectForm from "../Admin/ManageProjectSiteId/AllocateProjectForm";
import ManageMilestoneSite from "../Admin/ManageSite/ManageMilestoneSite";
import { GET_CIRCLE_WITH_PG_DATA, GET_MAPPED_DATA } from "../../../store/reducers/projectList-reducer";
import MyHomeActions from "../../../store/actions/myHome-actions";
import { GET_FILTER_MYTASK_SUBPROJECT } from "../../../store/reducers/filter-reducer";


const MyTask = () => {
  let permission = JSON.parse(localStorage.getItem("permission")) || {};
  let user = JSON.parse(localStorage.getItem("user"));
  let rolename = user?.roleName;
  const { projectuniqueId } = useParams();

  const [modalOpen, setmodalOpen] = useState(false);
  const [modalFullOpen, setmodalFullOpen] = useState(false);
  const [modalFullBody, setmodalFullBody] = useState(<></>);
  const [strValFil, setstrVal] = useState(false);

  const [globalData, setGlobalData] = useState({});
  const [SiteId, setSiteId] = useState("Add");
  const [parentsite, setparentsite] = useState([]);
  const [childsite, setchildsite] = useState([]);
  const [modalBody, setmodalBody] = useState(<></>);
  const [getmultiSelect, setmultiSelect] = useState([]);






  const [modalHead, setmodalHead] = useState(<></>);

  const [old, setOld] = useState(<></>);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    SubmitTask,
    watch,
    setValue,
    setValues,
    getValues,
    formState: { errors },
  } = useForm();
  let dispatch = useDispatch();
  const dataGetterOld = useSelector((state) => {
    let oldata = state.projectList.getProjectTypeSub;
    if (old["_id"] != oldata["_id"]) {
      setOld(oldata);
      setValue("ptype", oldata["projectType"]);
    }
    return state.projectList.getProjectTypeSub;
  });

  let showTypeforAction = getAccessType("Actions(Site)")

  let shouldIncludeEditColumn = false

  if (showTypeforAction === "visible"){
    shouldIncludeEditColumn = true
  }

  let customerList = useSelector((state) => {
    return state?.adminData?.getManageCustomer.map((itm) => {
        return {
            label: itm?.customerName,
            value: itm?.uniqueId
        }
    })
}) 

  let subProjectList = useSelector((state) => {
    return state?.filterData?.getMyTaskSubProject.map((itm) => {
      return {
        label: itm.subprojectName,
        value: itm.subProjectId,
      };
    });
  });



  let dbConfigL = useSelector((state) => {
    let interdata = state?.myHomeData?.getmyTask || [];
    return interdata;
  });

  let milestoneEventLogsData = useSelector((state) => {
    let interdata = state?.eventlogsReducer?.milestoneeventList || [];
    return interdata;
  });

  let sitelogsEventLogsData = useSelector((state) => {
    let interdata = state?.eventlogsReducer?.siteeventList || [];
    return interdata;
  });

  let dbConfigList = useSelector((state) => {
    let interdata = state?.myHomeData?.getmyTask || [];
    return interdata?.map((itm) => {
      let updateditm = {
        ...itm,
        siteIdLink: (
          <p
            className="text-[#13b497] font-extrabold"
            onClick={() => {
              setmodalFullOpen((prev) => !prev);
              setmodalHead("Update Site:-"+itm['Site Id']);
              dispatch(GET_ONE_MANAGE_PROJECT_TYPE_DY_FORM({dataAll: [], reset: true}));
              // dispatch(GET_CIRCLE_WITH_PG_DATA({dataAll: [], reset: true}))
              dispatch(GET_MAPPED_DATA({dataAll: [], reset: true}))
              dispatch(AdminActions.getOneProjectTypeDyform(itm.uniqueId));
              dispatch(projectListActions.getCircleWithPGData(itm.projectuniqueId));
              dispatch(projectListActions.getMappedData(itm.projectuniqueId));
              setmodalBody(
                <ManageMilestoneSite
                  siteCompleteData={itm}
                  uid={itm["uniqueId"]}
                  mileStone={{}}
                  setGlobalData={setGlobalData}
                  setSiteId={setSiteId}
                  setmodalFullOpen={setmodalFullOpen}
                  projectuniqueId={itm['projectuniqueId']}
                  myTaskPage = "Yes"
                />
              );

              // setmodalBody(<ManageProjectSiteIdForm projectuniqueId={projectuniqueId} isOpen={modalOpen} setIsOpen={setmodalOpen} resetting={true} formValue={{}} />)
            }}
          >
            {itm["Site Id"]}
          </p>
        ),

        // CompletionBar: <ProgressBar notifyType={"success"} text={`${100 - ((itm.milestoneArray.length - itm.milestoneArray.filter(iewq => iewq.mileStoneStatus == "Close").length) / itm.milestoneArray.length * 100)}`} />,
        CompletionBar: (
          <ProgressBar
            notifyType={"success"}
            percent={`${
              100 -
              ((itm?.milestoneArray?.length -
                itm?.milestoneArray?.filter(
                  (iewq) => iewq?.mileStoneStatus == "Closed"
                ).length) /
                itm?.milestoneArray?.length) *
                100
            }`}
            text={`${
              itm?.milestoneArray?.filter(
                (iewq) => iewq?.mileStoneStatus == "Closed"
              ).length
            } / ${itm?.milestoneArray?.length}`}
          />
        ),
        checkboxProject: (
          <>
            <input
              type={"checkbox"}
              id={itm.uniqueId}
              checked={parentsite.indexOf(itm.uniqueId) != -1}
              value={itm.uniqueId}
              onChange={(e) => {
                if (e.target.checked) {
                  setparentsite((prev) => [...prev, e.target.value]);
                  let dlisting = itm.milestoneArray.map((iewq) => {
                    return iewq.uniqueId;
                  });
                  setchildsite((prev) => [...prev, ...dlisting]);
                } else {
                  setparentsite((prev) => {
                    let lst = prev.indexOf(e.target.value);
                    prev.splice(lst, 1);
                    return [...prev];
                  });

                  setchildsite((prev) => {
                    itm?.milestoneArray?.map((iewq) => {
                      let lst = prev.indexOf(iewq.uniqueId);
                      prev.splice(lst, 1);
                    });
                    return [...prev];
                  });
                }
              }}
            />
          </>
        ),

        siteage: itm.siteageing ? (
          itm.siteageing >= 0 ? (
            <p className="text-[#13b497] font-extrabold">{itm.siteageing + " Days"}</p>
          ) : (
            <p className="text-rose-400 font-extrabold">{itm.siteageing + " Days"}</p>
          )
        ) : (
          ""
        ),
        

        milestoneArray: itm?.milestoneArray?.map((iewq) => {
          return {
            ...iewq,
            SubProject: "",

            MileDevName: (
              <div className="flex">
                <p
                >
                  {iewq.assignerResult ? (

                   
                    <>
                      <div class="">
                        <div class="group flex flex-row relative items-center w-full">
                        {iewq.assignerResult
                          .slice(0, 2)
                          .map((itwsw, index) => (
                              <p
                                  key={index}
                                  className={`flex justify-center items-center mx-0.5 rounded-full text-white w-8 h-8 ${onehundcolor[index]}`}
                              >
                                  {" "}
                                  {itwsw.assignerName && itwsw.assignerName.trim().split(" ").length > 1
                                      ? `${itwsw.assignerName.split(" ")[0].substr(0, 1)}${itwsw.assignerName.split(" ")[1].substr(0, 1)}`
                                      : itwsw.assignerName
                                          ? itwsw.assignerName.split(" ")[0].substr(0, 1)
                                          : ''}
                              </p>
                          ))}
                          <span class="pointer-events-none w-max absolute -top-8 bg-gray-500 z-[100px] rounded-lg p-2 opacity-0 transition-opacity group-hover:opacity-100">
                            {iewq.assignerResult.map((itws) => {
                              return itws.assignerName + ", ";
                            })}
                          </span>
                        </div>
                      </div>
                    </>
                  ) : (
                    "Unassigned"
                  )}
                </p>
              </div>
            ),

            mileStoneStatusUpda:
              iewq.mileStoneStatus == "Closed" && rolename == "Admin" ? (
                <>
                  <p
                    className="cursor-pointer"
                    onClick={() => {
                      setmodalOpen(true);
                      setmodalHead("If you want to OPEN the task again");
                      setmodalBody(
                        <>
                          <div className="flex justify-between">
                            <label htmlFor="" className="w-auto flex text-[#13b497] font-extrabold pl-20 whitespace-nowrap">
                              {" "}
                              Current Status:
                            </label>
                            <p className="w-20 rounded-xl font-extrabold justify-center text-yellow-500 bg-slate-500 flex text- mr-28 whitespace-nowrap">
                              {iewq.mileStoneStatus}
                            </p>
                          </div>
                          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-full pb-4">
                          <Button
                              classes={"mt-2 w-sm text-center flex mx-auto"}
                              name="Open Task"
                              onClick={() => {
                                let finaldata = {
                                  mileStoneStatus: "Open",
                                };
                                dispatch(
                                  projectListActions.globalProjectTypeDataPatch(
                                    Urls.projectList_changeTaskStatus,
                                    iewq.uniqueId,
                                    finaldata,
                                    () => {
                                      dispatch(
                                        projectListActions.getProjectTypeAll(
                                          projectuniqueId,strValFil
                                        )
                                      );
                                      setmodalOpen(false);
                                    }
                                  )
                                );
                              }}
                            />
                          </div>
                        </>
                      );
                    }}
                  >
                    {iewq.mileStoneStatus}
                  </p>
                </>
              ) : (
                <p>{iewq.mileStoneStatus}</p>
              ),

            SiteNaming: (
              <p
                className="text-yellow-500 font-extrabold"
                onClick={() => {
                  setmodalFullOpen((prev) => !prev);
                  // dispatch(AdminActions.getProject())
                  setmodalHead("Update Milestone");
                  dispatch(GET_ONE_MANAGE_PROJECT_TYPE_DY_FORM({dataAll: [], reset: true}));
                  // dispatch(GET_CIRCLE_WITH_PG_DATA({dataAll: [], reset: true}))
                  // dispatch(GET_MAPPED_DATA({dataAll: [], reset: true}))
                  dispatch(AdminActions.getOneProjectTypeDyform(itm.uniqueId));
                  
                  setmodalBody(
                    <ManageMilestoneSite
                      siteCompleteData={itm}
                      uid={itm["uniqueId"]}
                      mileStone={iewq}
                      setGlobalData={setGlobalData}
                      setSiteId={setSiteId}
                      setmodalFullOpen={setmodalFullOpen}
                      projectuniqueId={itm.projectuniqueId}
                      myTaskPage = "Yes"
                    />
                  );

                  // setmodalBody(<ManageProjectSiteIdForm projectuniqueId={projectuniqueId} isOpen={modalOpen} setIsOpen={setmodalOpen} resetting={true} formValue={{}} />)
                }}
              >
                {iewq.Name}
              </p>
            ),
            eventLogsmilestone: <></>,
            taskmageing:
              iewq.taskageing >= 0 ? (
                <p className="text-[#13b497] font-extrabold">{iewq.taskageing + " Days"}</p>
              ) : (
                <p className="text-rose-400 font-extrabold">{iewq.taskageing + " Days"}</p>
              ),
            Predecessor: iewq.Predecessor,
            CompletionBar: (
              <ProgressBar
                notifyType={iewq.taskageing >= 0 ? "success" : "alert"}
                percent={iewq.mileStoneStatus == "Open" ? "0" : "100"}
                text={
                  parseTwoDigit(iewq.mileStoneStatus == "Open" ? "0" : "100") +
                  " %"
                }
              />
            ),
            editing:
              iewq.mileStoneStatus == "Closed" && rolename == "Admin" ? (
                <>
                  <p
                    className="cursor-pointer bg-green-500 p-1 rounded-2xl my-auto"
                    onClick={() => {
                      setmodalOpen(true);
                      setmodalHead("");
                      setmodalBody(
                        <>
                          <div className="flex justify-between">
                            <label htmlFor="" className="font-bold">
                              {" "}
                              Status:
                            </label>
                            <p className="bg-green-400 rounded-lg w-16 text-center">
                              {iewq.mileStoneStatus}
                            </p>
                          </div>
                          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-full pb-4">
                            <Button
                              classes={"mt-2 w-sm text-center flex mx-auto"}
                              name="Open Task"
                              onClick={() => {
                                let finaldata = {
                                  mileStoneStatus: "Open",
                                };
                                dispatch(
                                  projectListActions.globalProjectTypeDataPatch(
                                    Urls.projectList_changeTaskStatus,
                                    iewq.uniqueId,
                                    finaldata,
                                    () => {
                                      dispatch(
                                        projectListActions.getProjectTypeAll(
                                          projectuniqueId,strValFil
                                        )
                                      );
                                      setmodalOpen(false);
                                    }
                                  )
                                );
                              }}
                            />
                          </div>
                        </>
                      );
                    }}
                  >
                    {iewq.mileStoneStatus}
                  </p>
                </>
              ) : (
                <p></p>
              ),

            deleteing: (
              <div className="flex items-center w-30">
                <>
                  <p
                    className=""
                    onClick={() => {
                      setmodalFullOpen((prev) => !prev);
                      // dispatch(AdminActions.getProject())

                      setmodalHead("Event Log");
                      dispatch(
                        eventManagementActions.getmilestoneeventList(
                          true,
                          iewq.uniqueId
                        )
                      );

                      setmodalBody(
                        <EventLog type={"milestone"} unqeId={iewq?.uniqueId} />
                      );
                    }}
                  >
                    <MdMessage size={30} />
                  </p>
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
                                      `${Urls.projectList_changeTaskStatus}/${iewq.uniqueId}`,
                                      () => {
                                        dispatch(
                                          projectListActions.getProjectTypeAll(
                                            projectuniqueId
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
                </>
              </div>
            ),
            checkboxProject: (
              <>
                <input
                  type={"checkbox"}
                  checked={childsite.indexOf(iewq.uniqueId) != -1}
                  value={iewq.uniqueId}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setchildsite((prev) => {
                        let finalinzingdata = [...prev, e.target.value];

                        let tkChaeck = true;
                        itm.milestoneArray.map((iefr) => {
                          if (finalinzingdata.indexOf(iefr.uniqueId) == -1) {
                            tkChaeck = false;
                          }
                        });

                        console.log(tkChaeck, "tkChaecktkChaecktkChaeck");

                        if (tkChaeck && itm.totalCount == itm.milestoneCount) {
                          setparentsite((prev) => [...prev, itm.uniqueId]);
                        }

                        return finalinzingdata;
                      });

                      console.log(
                        childsite,
                        "childsitechildsitechildsitechildsite"
                      );
                    } else {
                      setchildsite((prev) => {
                        let lst = prev.indexOf(e.target.value);
                        prev.splice(lst, 1);
                        setparentsite((preving) => {
                          let lst = preving.indexOf(itm.uniqueId);
                          preving.splice(lst, 1);
                          return [...preving];
                        });
                        return [...prev];
                      });
                    }
                  }}
                />
              </>
            ),
          };
        }),

        siteeventLogs: <></>,
        delete: (
          <>
            {1 == 1 ? (
              <div className="flex items-center w-30">
                <>
                  <p
                    className=""
                    onClick={() => {
                      setmodalFullOpen((prev) => !prev);
                      setmodalHead("Event Log");
                      dispatch(
                        eventManagementActions.getsiteeventList(
                          true,
                          itm?.uniqueId
                        )
                      );
                      setmodalBody(
                        <EventLog type={"site"} unqeId={itm?.uniqueId} />
                      );
                    }}
                  >
                    <MdMessage size={30} />
                  </p>
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
                                    CommonActions.deleteApiCallerBulk(
                                      `${Urls.projectList_siteEngineer}`,{ids : [itm.uniqueId]},
                                      () => {
                                        dispatch(
                                          projectListActions.getProjectTypeAll(
                                            projectuniqueId
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
                </>
              </div>
            ) : (
              ""
            )}
          </>
        ),
      };
      return updateditm;
    });
  });
  console.log("safasfasfasfasfasdfasdfasdfabc4545", dbConfigList[0]);
  let dbConfigTotalCount =
    useSelector((state) => {
        let interdata = state?.myHomeData?.getmyTask || 0;
      // console.log("afdsdasfasfasfasfadfs", interdata[0]);
      if (interdata.length > 0) {
        console.log(
          "asdfas0fjasofnafsdna",
          interdata[0]["overall_table_count"]
        );
        return interdata[0]["overall_table_count"];
      }
    }) || [];
  console.log("afdasfoja0jdfamssdfghjsdc", dbConfigTotalCount.length);
  // let Form = [
  //     { label: "DB Server", value: "", option: ["Please Select Your DB Server"], type: "select" },
  //     { label: "Custom Queries", value: "", type: "textarea" }
  // ]

  let milestoneLogsTable = {
    columns: [
      {
        name: "Site Id",
        value: "SiteId",
        style: "min-w-[50px] max-w-[100px] text-center",
      },
      {
        name: "Email",
        value: "email",
        style: "min-w-[50px] max-w-[200px] text-center",
      },
      {
        name: "Time & Date ",
        value: "UpdatedAt",
        style: "min-w-[80px] max-w-[200px] text-center",
      },
      {
        name: "Updated Data",
        value: "updatedData",
        style: "min-w-[50px] max-w-[300px] text-center",
      },
    ],
    properties: {
      rpp: [10, 20, 50, 100],
    },
    filter: [
      // {
      //     label: "Role",
      //     type: "text",
      //     name: "rolename",
      //     // option: roleList,
      //     props: {
      //     }
      // }
    ],
  };
  let table = {
    columns: [
      {
        name: "Site ID",
        value: "siteIdLink",
        style:"min-w-[140px] max-w-[200px] text-center font-extrabold hover:text-[#CA8A04] focus:outline-none hover:font-semibold  sticky left-0 bg-[#3e454d] z-20 cursor-pointer",
      },
      {
        name: "Project ID",
        value: "projectId",
        style:
          "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Customer",
        value: "customerName",
        style:"min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Sub Project",
        value: "subProject",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Owner",
        value: "PMName",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Planned Start Date",
        value: "siteStartDate",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Planned End Date",
        value: "siteEndDate",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Completition Date",
        value: "Site_Completion Date",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Ageing",
        value: "siteageing",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      // {
      //   name: "Completion (%)",
      //   value: "CompletionBar",
      //   style: "min-w-[140px] max-w-[200px] text-center",
      // },
      {
        name: "Predecessor",
        value: "Predecessor",
        style: "min-w-[240px] max-w-[240px] text-center",
      },
      {
        name: "Status",
        value: "siteStatus",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
    ],
    childList: [""],
    childs: {
      milestoneArray: [
        // {
        //   name: "",
        //   value: "checkboxProject",
        //   style: "min-w-[40px] max-w-[40px] text-center",
        // },
        {
          name: "Site ID",
          value: "SiteNaming",
          style:
            "min-w-[140px] max-w-[200px] sticky left-0 bg-[#3e454d] text-center  z-20",
        },
        {
          name: "Project ID",
          value: "projectId",
          style:
            "min-w-[140px] max-w-[200px] sticky left-[140px] bg-[#3e454d] text-center z-20",
        },
        {
          name: "Sub Project",
          value: "SubProject",
          style: "min-w-[140px] max-w-[200px] text-center",
        },
        {
          name: "Owner",
          value: "MileDevName",
          style: "min-w-[180px] max-w-[180px] text-center",
        },
        {
          name: "Planned Start Date",
          value: "mileStoneStartDate",
          style: "min-w-[140px] max-w-[200px] text-center",
        },
        {
          name: "Planned End Date",
          value: "mileStoneEndDate",
          style: "min-w-[140px] max-w-[200px] text-center",
        },
        {
          name: "Completition Date",
          value: "CC_Completion Date",
          style: "min-w-[140px] max-w-[200px] text-center",
        },
        {
          name: "Ageing",
          value: "taskmageing",
          style: "min-w-[140px] max-w-[200px] text-center",
        },
        // {
        //   name: "Completion (%)",
        //   value: "CompletionBar",
        //   style: "min-w-[140px] max-w-[200px] text-center",
        // },

        {
          name: "Predecessor",
          value: "Predecessor",
          style: "min-w-[240px] max-w-[240px] text-center",
        },
        {
          name: "Status",
          value: "mileStoneStatusUpda",
          style: "min-w-[140px] max-w-[200px] text-center",
        },

        // {
        //   name: "Billing Status",
        //   value: "",
        //   style: "min-w-[140px] max-w-[200px] text-center",
        // },
        // {
        //   name: "Event Logs",
        //   value: "eventLogsmilestone",
        //   style: "min-w-[140px] max-w-[200px] text-center",
        // },
        // {
        //   name: "Edit",
        //   value: "editing",
        //   style: "min-w-[100px] max-w-[200px] text-center",
        // },
        // ...(shouldIncludeEditColumn
        //   ? [
        //       {
        //         name: "Delete",
        //         value: "deleteing",
        //         style: "min-w-[50px] max-w-[100px] text-center",
        //       },
        //     ]
        //   : []),
        // {
        //   name: "Delete",
        //   value: "deleteing",
        //   style: "min-w-[50px] max-w-[100px] text-center",
        // },
      ],
    },
    properties: {
      rpp: [10, 20, 50, 100],
    },
    filter: [
      {
        label: "Customer",
        type: "select",
        name: "customer",
        option:customerList,
        props: {
          onChange:(e)=>{
            if (e.target.value){
              dispatch(FilterActions.getMyTaskSubProject(true,"",e.target.value))
            }
            else{
              dispatch(GET_FILTER_MYTASK_SUBPROJECT({dataAll:[],reset:true}))
            }
          }
        }
    },
      {
        label: "Sub Project",
        type: "select",
        name: "subProject",
        option:subProjectList,
        props: {}
      },
      {
          label: "Site Status",
          type: "select",
          name: "siteStatus",
          option: [
            { label: "Open", value: "Open" },
            { label: "Close", value: "Close" },
            { label: "Drop", value: "Drop" },
            { label: "All", value: "all" },
          ],
          props: {}
      },
      {
          label: "MileStone Status",
          type: "select",
          name: "mileStoneStatus",
          option:[
            {label:'Open', value:'Open'},
            {label:'In Process', value:'In Process'},
            {label:'Submit', value:'Submit'},
            {label:'Approve', value:'Approve'},
            {label:'Submit to Airtel', value:'Submit to Airtel'},
            {label:'Reject', value:'Reject'},
            {label:'Closed', value:'Closed'},
            {label:'All', value:'All'},
          ],
          props: {}
      }
    ],
  };

  const onSubmit = (data) => {
    let shouldReset = data.reseter;
    delete data.reseter;
    let strVal=objectToQueryString(data)
    setstrVal(strVal)
    dispatch(MyHomeActions.getMyTask(true,strVal))
  };
  useEffect(() => {
    dispatch(AdminActions.getManageCustomer())
    dispatch(MyHomeActions.getMyTask())
    dispatch(GET_FILTER_MYTASK_SUBPROJECT({dataAll:[],reset:true}))
  }, []);

  const handleBulkDelte = () => {   
  };


  return (
    <>
      <AdvancedTableExpandable
      parentsite={parentsite}
      childsite={childsite}
        searchView={
          <>
            <SearchBarView
              onblur={(e) => {
              }}
              onchange={(e) => {
                const siteNameQuery = (e.target.value ? "siteName=" + (e.target.value + '&') : "" ) +strValFil;
                dispatch(MyHomeActions.getMyTask(true,siteNameQuery));  
              }}
              placeHolder={"Site Name"}
            />

            <SearchBarView
              onblur={(e) => {
              }}
              onchange={(e) => {
                dispatch(MyHomeActions.getMyTask(true,(e.target.value ? "mileStoneName=" + (e.target.value + '&'): "") +strValFil));
              }}
              placeHolder={"Milestone Name"}
            />
          </>
        }
        
        headerButton={
          <div className="flex gap-1">
          {(Array.isArray(parentsite) && parentsite?.length > 0 ) && (
                <Button
                  classes="w-auto"
                  onClick={(e) => {
                    setmodalOpen((prev) => !prev);
                    setmodalHead("Confirm Delete");
                    setmodalBody(
                      <div className="flex justify-center py-6">
                        <button 
                          onClick={handleBulkDelte}
                          className="w-1/4 rounded-full bg-green-600"
                        >
                        OK
                        </button>
                      </div>
                    );
                  }}
                  name={"Delete"}
                ></Button>
            )}
            <ConditionalButton
              showType={getAccessType("Export(Site)")}
              classes="w-auto "
              onClick={(e) => {
                dispatch(
                  CommonActions.commondownload("/export/myTask?"+strValFil,"Export_My_Task.xlsx")
                );
              }}
              name={"Export"}
            ></ConditionalButton>
          </div>
        }
        table={table}
        filterAfter={onSubmit}
        tableName={"UserListTable"}
        handleSubmit={handleSubmit}
        data={dbConfigList[0]?.uniqueId ? dbConfigList : []}
        errors={errors}
        register={register}
        setValue={setValue}
        getValues={getValues}
        multiSelect={false}
        getmultiSelect={getmultiSelect}
        setmultiSelect={setmultiSelect}
        totalCount={dbConfigTotalCount}
        heading = {'Total Sites:-'}
        TableHeight = "h-[70vh]"
      />

      <Modal
        size={"sm"}
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
    </>
  );
};

export default MyTask;
