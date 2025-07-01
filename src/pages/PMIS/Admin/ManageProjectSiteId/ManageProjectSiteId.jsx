import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Unicons from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../../../components/Modal";
import Button from "../../../../components/Button";
import DeleteButton from "../../../../components/DeleteButton";
import CstmButton from "../../../../components/CstmButton";
import { MdMessage } from "react-icons/md";
import PopupMenu from "../../../../components/PopupMenu";
import {
  getAccessType,
  objectToQueryString,
  parseTwoDigit,
} from "../../../../utils/commonFunnction";
import { ALERTS } from "../../../../store/reducers/component-reducer";
import CommonActions from "../../../../store/actions/common-actions";
import { Urls } from "../../../../utils/url";
import AdminActions from "../../../../store/actions/admin-actions";
import { useNavigate, useParams } from "react-router-dom";
import ManageProjectSiteIdForm from "./ManageProjectSiteIdForm";
import projectListActions from "../../../../store/actions/projectList-actions";
import AdvancedTableExpandable from "../../../../components/AdvancedTableExpandable";
import AllocateProjectForm from "./AllocateProjectForm";
import SearchBarView from "../../../../components/SearchBarView";
import ManageMilestoneSite from "../ManageSite/ManageMilestoneSite";
import ProgressBar from "../../../../components/ProgressBar";
import { onehundcolor } from "../../../../utils/queryBuilder";
import ConditionalButton from "../../../../components/ConditionalButton";
import eventManagementActions from "../../../../store/actions/eventLogs-actions";
import EventLog from "../../../../components/EventLogs";
import {
  GET_ONE_MANAGE_PROJECT_TYPE_DY_FORM,
  GET_PARTNER_ACTIVITY,
} from "../../../../store/reducers/admin-reducer";
import FilterActions from "../../../../store/actions/filter-actions";
import FileUploader from "../../../../components/FIleUploader";
import { SITEEVENTLIST } from "../../../../store/reducers/eventlogs-reducer";
import { GET_USER_ALLLOCATED_PROJECT } from "../../../../store/reducers/projectList-reducer";
import VendorGroupTaskAllocation from "./VendorGroupTaskAllocation";
import { UilColumns, UilExclamationTriangle}  from "@iconscout/react-unicons";

const ManageProjectSiteId = () => {
  let permission = JSON.parse(localStorage.getItem("permission")) || {};
  let user = JSON.parse(localStorage.getItem("user"));
  let rolename = user?.roleName;

  const { proId, projectuniqueId } = useParams();
  const [modalOpen, setmodalOpen] = useState(false);
  const [modalFullOpen, setmodalFullOpen] = useState(false);
  const [fileOpen, setFileOpen] = useState(false);
  const [fileOpenlink, setFileOpenlink] = useState([]);
  const [fileType, setfileType] = useState("");
  const [modalFullBody, setmodalFullBody] = useState(<></>);
  const [strValFil, setstrVal] = useState(false);
  const [bulkfileOpen, setbulkfileOpen] = useState(false);
  const [globalData, setGlobalData] = useState({});
  const [SiteId, setSiteId] = useState("Add");
  const [parentsite, setparentsite] = useState([]);
  const [childsite, setchildsite] = useState([]);
  const [modalBody, setmodalBody] = useState(<></>);
  const [getmultiSelect, setmultiSelect] = useState([]);
  const [modalHead, setmodalHead] = useState(<></>);
  const [old, setOld] = useState(<></>);
  const [subProjectId, setSubProjectId] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

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

  let showTypeforAction = getAccessType("Actions(Site)");

  let shouldIncludeEditColumn = false;

  if (showTypeforAction === "visible") {
    shouldIncludeEditColumn = true;
  }

  let upgradepopupShowType = false;

  let showType1 = getAccessType("Upgrade(Site Page)");
  if (showType1 === "visible") {
    upgradepopupShowType = true;
  }

  let subProjectList = useSelector((state) => {
    return state?.filterData?.getSiteSubProject.map((itm) => {
      return {
        label: itm.subproject,
        value: itm.subprojectId,
      };
    });
  });

  let dbConfigL = useSelector((state) => {
    let interdata = state?.projectList?.getprojectalllist || [];
    return interdata;
  });

  let dbConfigList = useSelector((state) => {
    let interdata = state?.projectList?.getprojectalllist || [];
    return interdata?.map((itm) => {
      let updateditm = {
        ...itm,
        siteIdLink: (
          <p
            className="text-[#13b497] font-extrabold"
            onClick={() => {
              setmodalFullOpen((prev) => !prev);
              setmodalHead("Update Site:-" + itm["Site Id"]);
              dispatch(
                GET_ONE_MANAGE_PROJECT_TYPE_DY_FORM({
                  dataAll: [],
                  reset: true,
                })
              );
              dispatch(AdminActions.getOneProjectTypeDyform(itm.uniqueId));
              setmodalBody(
                <ManageMilestoneSite
                  siteCompleteData={itm}
                  uid={itm["uniqueId"]}
                  mileStone={{}}
                  setGlobalData={setGlobalData}
                  setSiteId={setSiteId}
                  setmodalFullOpen={setmodalFullOpen}
                  projectuniqueId={projectuniqueId}
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
              subId={itm.SubProjectId}
              checked={parentsite.indexOf(itm.uniqueId) != -1}
              value={itm.uniqueId}
              onChange={(e) => {
                if (e.target.checked) {
                  setSubProjectId((prev) => [...prev, itm.SubProjectId]);
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
                  setSubProjectId((prev) => {
                    let lst = prev.indexOf(itm.SubProjectId);
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
            <p className="text-[#13b497] font-extrabold">
              {itm.siteageing + " Days"}
            </p>
          ) : (
            <p className="text-rose-400 font-extrabold">
              {itm.siteageing + " Days"}
            </p>
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
                <p>
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
                                {itwsw.assignerName &&
                                itwsw.assignerName.trim().split(" ").length > 1
                                  ? `${itwsw.assignerName
                                      .split(" ")[0]
                                      .substr(0, 1)}${itwsw.assignerName
                                      .split(" ")[1]
                                      .substr(0, 1)}`
                                  : itwsw.assignerName
                                  ? itwsw.assignerName
                                      .split(" ")[0]
                                      .substr(0, 1)
                                  : ""}
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
              iewq.mileStoneStatus != "Open" && rolename == "Admin" ? (
                <>
                  <p
                    className="cursor-pointer"
                    onClick={() => {
                      setmodalOpen(true);
                      setmodalHead("If you want to OPEN the task again");
                      setmodalBody(
                        <>
                          <div className="flex justify-between mt-5">
                            <label
                              htmlFor=""
                              className="w-auto flex text-[#13b497] font-extrabold pl-20 whitespace-nowrap"
                            >
                              {" "}
                              Current Status:
                            </label>
                            <p className="w-20 rounded-xl font-extrabold justify-center text-yellow-500 bg-slate-500 flex text- mr-28 whitespace-nowrap">
                              {iewq.mileStoneStatus}
                            </p>
                          </div>
                          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-full pb-4">
                            <Button
                              classes={
                                "mt-2 w-sm text-center flex mx-auto font-bold text-base"
                              }
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
                                          projectuniqueId,
                                          strValFil
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
                  setmodalHead("Update Milestone");
                  dispatch(
                    GET_ONE_MANAGE_PROJECT_TYPE_DY_FORM({
                      dataAll: [],
                      reset: true,
                    })
                  );
                  dispatch(AdminActions.getOneProjectTypeDyform(itm.uniqueId));
                  setmodalBody(
                    <ManageMilestoneSite
                      siteCompleteData={itm}
                      uid={itm["uniqueId"]}
                      mileStone={iewq}
                      setGlobalData={setGlobalData}
                      setSiteId={setSiteId}
                      setmodalFullOpen={setmodalFullOpen}
                      projectuniqueId={projectuniqueId}
                      filterView={strValFil}
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
                <p className="text-[#13b497] font-extrabold">
                  {iewq.taskageing + " Days"}
                </p>
              ) : (
                <p className="text-rose-400 font-extrabold">
                  {iewq.taskageing + " Days"}
                </p>
              ),
            Predecessor: iewq.Predecessor,
            CompletionBar: (
              <ProgressBar
                notifyType={iewq.taskageing >= 0 ? "success" : "alert"}
                percent={iewq.mileStoneStatus == "Closed" ? "100" : "0"}
                text={
                  parseTwoDigit(
                    iewq.mileStoneStatus == "Closed" ? "100" : "0"
                  ) + " %"
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
                                          projectuniqueId,
                                          strValFil
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
                      setmodalHead(`MileStone Event Log:-( ${iewq?.["Name"]})`);
                      dispatch(
                        eventManagementActions.getmilestoneeventList(
                          true,
                          iewq.uniqueId
                        )
                      );
                      setmodalBody(
                        <EventLog
                          type={"milestone"}
                          unqeId={iewq?.uniqueId}
                          urlType={"getmilestoneeventList"}
                        />
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
                                classes="w-15 bg-rose-400"
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

                        if (tkChaeck && itm.totalCount == itm.milestoneCount) {
                          setparentsite((prev) => [...prev, itm.uniqueId]);
                        }

                        return finalinzingdata;
                      });
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

        delete: (
          <>
            {1 == 1 ? (
              <div className="flex items-center w-30">
                <>
                  <p
                    className=""
                    onClick={() => {
                      setmodalFullOpen((prev) => !prev);
                      setmodalHead(`Site Event Log:-( ${itm?.["Site Id"]})`);
                      dispatch(SITEEVENTLIST({ dataAll: [], reset: true }));
                      dispatch(
                        eventManagementActions.getsiteeventList(
                          true,
                          itm?.uniqueId
                        )
                      );
                      setmodalBody(
                        <EventLog
                          type={"site"}
                          unqeId={itm?.uniqueId}
                          urlType={"getsiteeventList"}
                        />
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
                                classes="w-15 bg-rose-400"
                                onClick={() => {
                                  dispatch(
                                    CommonActions.deleteApiCallerBulk(
                                      `${Urls.projectList_siteEngineer}`,
                                      { ids: [itm.uniqueId] },
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

  let dbConfigTotalCount =
    useSelector((state) => {
      let interdata = state?.projectList?.getprojectalllist;
      if (interdata.length > 0) {
        return interdata[0]["overall_table_count"];
      }
    }) || [];

  let table = {
    columns: [
      {
        name: (
          <input
            type={"checkbox"}
            checked={
              dbConfigL.length != 0 && parentsite.length == dbConfigL.length
                ? true
                : false
            }
            onClick={(e) => {
              if (e.target.checked) {
                dbConfigL.map((itm) => {
                  if (childsite.indexOf(itm.uniqueId) == -1) {
                    setparentsite((prev) => [...prev, itm.uniqueId]);
                  }
                  itm.milestoneArray.map((iewq) => {
                    if (childsite.indexOf(iewq.uniqueId) == -1) {
                      setchildsite((prev) => [...prev, iewq.uniqueId]);
                    }
                  });
                });
              } else {
                setchildsite((prev) => []);
                setparentsite((prev) => []);
              }
            }}
          />
        ),
        value: "checkboxProject",
        style: "min-w-[40px] max-w-[40px] text-center",
      },
      {
        name: "Site ID",
        value: "siteIdLink",
        style:
          "min-w-[140px] max-w-[200px] text-center sticky left-0 bg-[#3e454d] z-20 cursor-pointer",
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
      {
        name: "Completion (%)",
        value: "CompletionBar",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
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
      {
        name: "Billing Status",
        value: "siteBillingStatus",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      // {
      //   name: "Event Logs",
      //   value: "siteeventLogs",
      //   style: "min-w-[140px] max-w-[200px] text-center",
      // },
      // {
      //   name: "Edit",
      //   value: "edit",
      //   style: "min-w-[100px] max-w-[200px] text-center",
      // },
      ...(shouldIncludeEditColumn
        ? [
            {
              name: "Delete",
              value: "delete",
              style: "min-w-[50px] max-w-[100px] text-center",
            },
          ]
        : []),
    ],
    childList: [""],
    childs: {
      milestoneArray: [
        {
          name: "",
          value: "checkboxProject",
          style: "min-w-[40px] max-w-[40px] text-center",
        },
        {
          name: "Site ID",
          value: "SiteNaming",
          style:
            "min-w-[140px] max-w-[200px] sticky left-0 bg-[#3e454d] text-center z-20",
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
        {
          name: "Completion (%)",
          value: "CompletionBar",
          style: "min-w-[140px] max-w-[200px] text-center",
        },

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

        {
          name: "Billing Status",
          value: "",
          style: "min-w-[140px] max-w-[200px] text-center",
        },
        ...(shouldIncludeEditColumn
          ? [
              {
                name: "Delete",
                value: "deleteing",
                style: "min-w-[50px] max-w-[100px] text-center",
              },
            ]
          : []),
      ],
    },
    properties: {
      rpp: [10, 20, 50, 100],
    },

    filter: [
      {
        label: "Site ID",
        type: "text",
        name: "siteId",
        props: {},
      },
      {
        label: "Sub Project",
        type: "select",
        name: "subProject",
        option: subProjectList,
        props: {},
      },
      {
        label: "Site Status",
        type: "select",
        name: "siteStatus",
        option: [
          { label: "Open", value: "Open" },
          { label: "Close", value: "Close" },
          { label: "Drop", value: "Drop" },
        ],
        props: {},
      },
      {
        label: "Billing Status",
        type: "select",
        name: "siteBillingStatus",
        option: [
          { label: "Unbilled", value: "Unbilled" },
          { label: "Billed", value: "Billed" },
        ],
        props: {},
      },
    ],
  };

  const onSubmit = (data) => {
    let shouldReset = data.reseter;
    delete data.reseter;
    let strVal = objectToQueryString(data);
    setstrVal(strVal);
    dispatch(
      projectListActions.getProjectTypeAll(
        projectuniqueId,
        objectToQueryString(data),
        shouldReset
      )
    );
  };

  useEffect(() => {
    dispatch(projectListActions.getProjectType(projectuniqueId, true, 0));
    dispatch(projectListActions.getCircleWithPGData(projectuniqueId, true, 0));
    dispatch(projectListActions.getProjectTypeAll(projectuniqueId));
    dispatch(projectListActions.getMappedData(projectuniqueId, true, 0));
    dispatch(FilterActions.getSiteSubProject(projectuniqueId, true, "", 0));
  }, []);

  const handleBulkDelte = () => {
    dispatch(
      CommonActions.deleteApiCallerBulk(
        `${Urls.projectList_siteEngineer}`,
        { ids: parentsite },
        () => {
          dispatch(projectListActions.getProjectTypeAll(projectuniqueId));
          setmodalOpen(false);
          setShowDeleteModal(false)
          setparentsite([]);
          setmultiSelect([]);
        }
      )
    );
  };

  let siteexportpopup = false;
  let exportpopupshowType = getAccessType("Export(Site)");
  if (exportpopupshowType === "visible") {
    siteexportpopup = true;
  }

  const onTableViewSubmit = (data) => {
    data["fileType"] = fileType;
    let makeurl = `${Urls.common_update_site_milestone}${
      "/" + projectuniqueId
    }`;
    dispatch(
      CommonActions.fileSubmit(makeurl, data, () => {
        dispatch(AdminActions.getManageCircle());
        setFileOpen(false);
      })
    );
  };

  const onBulkUploadSite = (data, projectuniqueId) => {
    let makeUrl = `${Urls.upload_bulk_site_one_project}${
      "/" + projectuniqueId
    }`;
    dispatch(
      CommonActions.fileSubmit(makeUrl, data, () => {
        setFileOpen(false);
        reset("");
      })
    );
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
                console.log("SearchBarView onblur", e.target.value);
                dispatch(
                  projectListActions.getProjectTypeAll(
                    projectuniqueId,
                    e.target.value != ""
                      ? "mileStoneName=" + e.target.value
                      : ""
                  )
                );
              }}
              onchange={(e) => {
                dispatch(
                  projectListActions.getProjectTypeAll(
                    projectuniqueId,
                    e.target.value != ""
                      ? "mileStoneName=" + e.target.value
                      : ""
                  )
                );
              }}
              placeHolder={"S Milestone Name"}
            />
          </>
        }
        headerButton={
          <div className="flex">
            {Array.isArray(parentsite) &&
              parentsite?.length > 0 &&
              shouldIncludeEditColumn && (
                <Button
                  name={""}
                  classes="w-full mr-1 bg-rose-500 text-white"
                  onClick={() => setShowDeleteModal(true)}
                >
                  Delete
                </Button>
                // <Button
                //   classes="mr-1 bg-rose-500"
                //   onClick={(e) => {
                //     setmodalOpen((prev) => !prev);
                //     setmodalHead("Confirm Delete");
                //     setmodalBody(
                //       <div className="flex justify-center py-6">
                //         <button
                //           onClick={handleBulkDelte}
                //           className="w-1/4 rounded-full bg-green-600"
                //         >
                //           OK
                //         </button>
                //       </div>
                //     );
                //   }}
                //   name={"Delete"}
                // ></Button>
              )}
            {Array.isArray(parentsite) && parentsite?.length > 0 && (
              <ConditionalButton
                showType={getAccessType("Task Allocation")}
                classes="mr-1 bg-[#ebad5d]"
                onClick={(e) => {
                  const uniqueArr = [...new Set(subProjectId)];
                  if (uniqueArr.length === 1) {
                    setmodalOpen((prev) => !prev);
                    dispatch(
                      GET_USER_ALLLOCATED_PROJECT({ dataAll: [], reset: true })
                    );
                    dispatch(
                      GET_PARTNER_ACTIVITY({ dataAll: [], reset: true })
                    );
                    dispatch(
                      AdminActions.getPartnerActivity(
                        true,
                        `subProjectId=${uniqueArr[0]}`
                      )
                    );
                    dispatch(
                      projectListActions.getUserAllocatedProject(
                        true,
                        projectuniqueId
                      )
                    );
                    setmodalHead("Partner Allocation");
                    setmodalBody(
                      <VendorGroupTaskAllocation
                        from={"bulktask"}
                        listsite={parentsite}
                        projectuniqueId={projectuniqueId}
                        isOpen={modalOpen}
                        setIsOpen={setmodalOpen}
                        resetting={false}
                        formValue={{}}
                        filtervalue={strValFil}
                        checkbox={setchildsite}
                        parentcheckbox={setparentsite}
                        subId={uniqueArr[0]}
                      />
                    );
                  } else {
                    let msgdata = {
                      show: true,
                      icon: "error",
                      buttons: [],
                      type: 1,
                      text: "Kindly select Site's from the same Sub-Project.",
                    };
                    dispatch(ALERTS(msgdata));
                  }
                }}
                name={"Allocate to Partner"}
              ></ConditionalButton>
            )}
            {Array.isArray(parentsite) && parentsite?.length > 0 && (
              <ConditionalButton
                showType={getAccessType("Task Allocation")}
                classes="mr-1 bg-[#4b8085]"
                onClick={(e) => {
                  const uniqueArr = [...new Set(subProjectId)];
                  if (uniqueArr.length === 1) {
                    setmodalOpen((prev) => !prev);
                    dispatch(
                      GET_USER_ALLLOCATED_PROJECT({ dataAll: [], reset: true })
                    );
                    dispatch(
                      GET_PARTNER_ACTIVITY({ dataAll: [], reset: true })
                    );
                    dispatch(
                      AdminActions.getPartnerActivity(
                        true,
                        `subProjectId=${uniqueArr[0]}`
                      )
                    );
                    dispatch(
                      projectListActions.getUserAllocatedProject(
                        true,
                        projectuniqueId
                      )
                    );
                    setmodalHead("Deallocate Task");
                    setmodalBody(
                      <VendorGroupTaskAllocation
                        from={"bulktask"}
                        listsite={parentsite}
                        projectuniqueId={projectuniqueId}
                        isOpen={modalOpen}
                        setIsOpen={setmodalOpen}
                        resetting={false}
                        formValue={{}}
                        filtervalue={strValFil}
                        checkbox={setchildsite}
                        parentcheckbox={setparentsite}
                        subId={uniqueArr[0]}
                        formName = {"Deallocate Task"}
                      />
                    );
                  } else {
                    let msgdata = {
                      show: true,
                      icon: "error",
                      buttons: [],
                      type: 1,
                      text: "Kindly select Site's from the same Sub-Project.",
                    };
                    dispatch(ALERTS(msgdata));
                  }
                }}
                name={"Deallocate Task"}
              ></ConditionalButton>
            )}

            <ConditionalButton
              showType={getAccessType("Add Site")}
              classes="mr-1"
              onClick={(e) => {
                setmodalOpen((prev) => !prev);
                setmodalHead("Add Site");
                setmodalBody(
                  <ManageProjectSiteIdForm
                    projectuniqueId={projectuniqueId}
                    isOpen={modalOpen}
                    setIsOpen={setmodalOpen}
                    resetting={true}
                    formValue={{}}
                  />
                );
              }}
              name={"Add Site"}
            ></ConditionalButton>

            <ConditionalButton
              showType={getAccessType("Task Allocation")}
              classes="mr-1"
              onClick={(e) => {
                if (childsite.length > 0) {
                  setmodalOpen((prev) => !prev);
                  dispatch(
                    GET_USER_ALLLOCATED_PROJECT({ dataAll: [], reset: true })
                  );
                  dispatch(
                    projectListActions.getUserAllocatedProject(
                      true,
                      projectuniqueId
                    )
                  );
                  setmodalHead("Allocate Task");
                  setmodalBody(
                    <AllocateProjectForm
                      from={"bulktask"}
                      listsite={childsite}
                      parentsite={parentsite}
                      projectuniqueId={projectuniqueId}
                      isOpen={modalOpen}
                      setIsOpen={setmodalOpen}
                      resetting={false}
                      formValue={{}}
                      filtervalue={strValFil}
                      checkbox={setchildsite}
                      parentcheckbox={setparentsite}
                    />
                  );
                } else {
                  let msgdata = {
                    show: true,
                    icon: "error",
                    buttons: [],
                    type: 1,
                    text: "Please Select at least one Task for bulk allocate",
                  };
                  dispatch(ALERTS(msgdata));
                }
              }}
              name={"Allocate to In-house"}
            ></ConditionalButton>

            {/* <ConditionalButton
              showType={getAccessType("Site Allocation")}
              classes="w-auto"
              onClick={(e) => {
                if (parentsite.length > 0) {
                  setmodalOpen((prev) => !prev);
                  // dispatch(AdminActions.getProject())
                  dispatch(
                    projectListActions.getUserAllocatedProject(
                      true,
                      projectuniqueId
                    )
                  );
                  setmodalHead("Allocate Site");
                  setmodalBody(
                    <AllocateProjectForm
                      from={"bulksite"}
                      listsite={parentsite}
                      projectuniqueId={projectuniqueId}
                      isOpen={modalOpen}
                      setIsOpen={setmodalOpen}
                      resetting={false}
                      formValue={{}}
                    />
                  );
                } else {
                  let msgdata = {
                    show: true,
                    icon: "error",
                    buttons: [],
                    type: 1,
                    text: "Please Select at least one site for bulk allocate",
                  };
                  dispatch(ALERTS(msgdata));
                }
              }}
              name={"Site Allocate"}
            ></ConditionalButton> */}

            <ConditionalButton
              name={"Upload"}
              showType={getAccessType("Upload(Site Page)")}
              classes="mr-1"
              onClick={(e) => {
                setbulkfileOpen((prev) => !prev);
              }}
            ></ConditionalButton>

            {upgradepopupShowType && (
              <PopupMenu
                name={"Upgrade"}
                icon={"Upgrade"}
                classes="w-auto"
                bgColor={"bg-[#A16E83]"}
                child={
                  <div classes="flex z-40 max-h-96 flex-col p-1">
                    <Button
                      name={"Upgrade Site"}
                      classes="w-auto m-5"
                      onClick={(e) => {
                        setFileOpen((prev) => !prev);
                        setFileOpenlink([
                          `/template/Site_Update.xlsx`,
                          "Site_Update.xlsx",
                        ]);
                        setfileType(`updateSiteOneProject`);
                      }}
                    ></Button>
                    <Button
                      name={"Upgrade Task"}
                      classes="w-auto m-5"
                      onClick={() => {
                        setFileOpen((prev) => !prev);
                        setFileOpenlink([
                          `/template/Task_Update.xlsx`,
                          "Task_Update.xlsx",
                        ]);
                        setfileType(`updateMilestoneOneProject`);
                      }}
                    ></Button>
                  </div>
                }
              />
            )}
            {siteexportpopup && (
              <PopupMenu
                name={"Export"}
                icon={"Export"}
                classes={"w-auto"}
                bgColor={"bg-[#147b99]"}
                child={
                  <div classes="flex z-40 max-h-96 flex-col p-1">
                    {/* <div classes="z-40 max-h-96 justify-center"> */}
                    <Button
                      name={"Export"}
                      classes="w-auto m-5"
                      onClick={(e) => {
                        dispatch(
                          CommonActions.commondownload(
                            "/export/siteId/" +
                              `${projectuniqueId}` +
                              "?" +
                              `${strValFil}`,
                            `Export_Sites.xlsx`
                          )
                        );
                      }}
                    ></Button>
                    <Button
                      name={"Export with Task"}
                      classes="w-auto m-5"
                      onClick={(e) => {
                        dispatch(
                          CommonActions.commondownload(
                            "/export/siteIdwithMilestone/" +
                              `${projectuniqueId}` +
                              "?" +
                              `${strValFil}`,
                            "Export_Sites_with_Milestone.xlsx"
                          )
                        );
                      }}
                    ></Button>
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
        data={dbConfigList[0]?.uniqueId ? dbConfigList : []}
        errors={errors}
        register={register}
        setValue={setValue}
        getValues={getValues}
        multiSelect={false}
        getmultiSelect={getmultiSelect}
        setmultiSelect={setmultiSelect}
        totalCount={dbConfigTotalCount}
        heading={"Total Sites:-"}
        TableHeight = "h-[70vh]"
      />

      <Modal
        size={"sm"}
        modalHead={modalHead}
        children={modalBody}
        isOpen={modalOpen}
        actionOnClose={() => {
          setmodalBody(null);
        }}
        setIsOpen={setmodalOpen}
      />
      <Modal
        size={"full"}
        modalHead={modalHead}
        children={modalBody}
        isOpen={modalFullOpen}
        actionOnClose={() => {
          setmodalBody(null);
        }}
        setIsOpen={setmodalFullOpen}
      />
      <FileUploader
        isOpen={fileOpen}
        fileUploadUrl={""}
        onTableViewSubmit={onTableViewSubmit}
        tempbtn={fileOpenlink.length != 0}
        tempbtnlink={fileOpenlink}
        setIsOpen={setFileOpen}
      />
      <FileUploader
        isOpen={bulkfileOpen}
        fileUploadUrl={""}
        onTableViewSubmit={(data) => {
          onBulkUploadSite(data, projectuniqueId);
          setbulkfileOpen(false);
          resetting("");
        }}
        setIsOpen={setbulkfileOpen}
        tempbtn={true}
        tempbtnlink={[
          `/template/OneProject/${projectuniqueId}`,
          `Template (${proId}).xlsx`,
        ]}
      />
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center  bg-opacity-75 z-[10]">
          <div className="bg-white p-4 rounded-lg shadow-xl">
            <UilExclamationTriangle className="text-red-500 flex mx-auto w-14 h-14" />
            <p className="mt-4">{`Are you sure you want to delete ${
              parentsite.length > 1 ? "these rows" : "this row"
            }?`}</p>
            <div className="mt-6 flex justify-center space-x-4">
              <Button name="Delete" classes="w-auto bg-rose-500" onClick={handleBulkDelte} />
              <Button name="Cancel" classes="w-auto" onClick={() => setShowDeleteModal(false)} />
              
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ManageProjectSiteId;
