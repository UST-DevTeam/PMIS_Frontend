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
import { UilSearch } from "@iconscout/react-unicons";
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
import {
  GET_CIRCLE_WITH_PG_DATA,
  GET_MAPPED_DATA,
} from "../../../store/reducers/projectList-reducer";
import MyHomeActions from "../../../store/actions/myHome-actions";
import VendorActions from "../../../store/actions/vendor-actions";
import moment from "moment/moment";
import CommonForm from "../../../components/CommonForm";
import gpTrackingActions from "../../../store/actions/gpTrackingActions";
import Api from "../../../utils/api";
import { GET_PROJECT_TYPE } from "../../../store/reducers/vendor-reducer";

const VendorProjectTracking = () => {
  let permission = JSON.parse(localStorage.getItem("permission")) || {};
  let user = JSON.parse(localStorage.getItem("user"));
  let rolename = user?.roleName;

  // console.log(permission?.pmpermission,"permission")
  // console.log(permission?.pmpermission.findIndex(prev=>prev.moduleName=="Add Site")!=-1&&permission?.pmpermission[permission?.pmpermission.findIndex(prev=>prev.moduleName=="Add Site")],"permission")
  const [assignDate, setAssignDate] = useState()
  // console.log(getAccessType("Add Site"), "getAccessType");
  const { projectuniqueId } = useParams();
  const [ValGm, setValGm] = useState("Month");
  const [modalOpen, setmodalOpen] = useState(false);
  const [modalFullOpen, setmodalFullOpen] = useState(false);
  const [modalFullBody, setmodalFullBody] = useState(<></>);
  const [strValFil, setstrVal] = useState(false);
  const currrentYear = new Date().getFullYear();
  const [year, setyear] = useState(currrentYear);
  const [globalData, setGlobalData] = useState({});
  const [extraColumns, setExtraColumns] = useState("")
  const [SiteId, setSiteId] = useState("Add");
  const [parentsite, setparentsite] = useState([]);
  const [childsite, setchildsite] = useState([]);
  const [modalBody, setmodalBody] = useState(<></>);
  const [getmultiSelect, setmultiSelect] = useState([]);
  const endDate = moment().format("Y");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectType, setSelectType] = useState("");
  const [modalHead, setmodalHead] = useState(<></>);
  const [filters, setFilters] = useState({

  })
  const [old, setOld] = useState(<></>);
  const navigate = useNavigate();


  let Month = [
    { id: 1, name: "Jan" },
    { id: 2, name: "Feb" },
    { id: 3, name: "Mar" },
    { id: 4, name: "Apr" },
    { id: 5, name: "May" },
    { id: 6, name: "Jun" },
    { id: 7, name: "Jul" },
    { id: 8, name: "Aug" },
    { id: 9, name: "Sep" },
    { id: 10, name: "Oct" },
    { id: 11, name: "Nov" },
    { id: 12, name: "Dec" }
  ]
  let listYear = [];
  for (let ywq = 2023; ywq <= +endDate; ywq++) {
    listYear.push(ywq);
  }
  let listDict = {
    "": [],
    Month: [
      { id: 1, name: "Jan" },
      { id: 2, name: "Feb" },
      { id: 3, name: "Mar" },
      { id: 4, name: "Apr" },
      { id: 5, name: "May" },
      { id: 6, name: "Jun" },
      { id: 7, name: "Jul" },
      { id: 8, name: "Aug" },
      { id: 9, name: "Sep" },
      { id: 10, name: "Oct" },
      { id: 11, name: "Nov" },
      { id: 12, name: "Dec" }
    ],
  };



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



  let showTypeforAction = getAccessType("Actions(Site)");

  let shouldIncludeEditColumn = false;

  if (showTypeforAction === "visible") {
    shouldIncludeEditColumn = true;
  }




  const handleAddActivity = (data) => {
    setExtraColumns(data['Month'])
    setValue("viewBy", data['Month'])
    if (assignDate) {
      const { start, end } = assignDate
      data["start"] = start?.split("T")[0]
      data["end"] = end?.split("T")[0]
    }

    setFilters({
      ...filters,
      ...data
    })
    dispatch(VendorActions.getVendorProjectTracking(true, objectToQueryString(data)));
  };

  const projectType = useSelector(state => {
    return state.vendorData.getProjectType.map(item => ({
      label: item?.projectType,
      value: item?.uid?.join(",")
    }))
  })

  let dbConfigList = useSelector((state) => {
    let interdata = state?.vendorData?.getvendorProjectTracking || [];
    return interdata?.map((itm) => {
      let updateditm = {
        ...itm,
        siteIdLink: (
          <p
            className="text-[#13b497] font-extrabold"
            // onClick={() => {
            //   setmodalFullOpen((prev) => !prev);
            //   setmodalHead("Update Site:-" + itm["Site Id"]);
            //   dispatch(
            //     GET_ONE_MANAGE_PROJECT_TYPE_DY_FORM({
            //       dataAll: [],
            //       reset: true,
            //     })
            //   );
            //   // dispatch(GET_CIRCLE_WITH_PG_DATA({dataAll: [], reset: true}))
            //   dispatch(GET_MAPPED_DATA({ dataAll: [], reset: true }));
            //   dispatch(AdminActions.getOneProjectTypeDyform(itm.uniqueId));
            //   dispatch(
            //     projectListActions.getCircleWithPGData(itm.projectuniqueId)
            //   );
            //   dispatch(projectListActions.getMappedData(itm.projectuniqueId));
            //   setmodalBody(
            //     <ManageMilestoneSite
            //       siteCompleteData={itm}
            //       uid={itm["uniqueId"]}
            //       mileStone={{}}
            //       setGlobalData={setGlobalData}
            //       setSiteId={setSiteId}
            //       setmodalFullOpen={setmodalFullOpen}
            //       projectuniqueId={itm["projectuniqueId"]}
            //       myTaskPage="Yes"
            //     />
            //   );

            //   // setmodalBody(<ManageProjectSiteIdForm projectuniqueId={projectuniqueId} isOpen={modalOpen} setIsOpen={setmodalOpen} resetting={true} formValue={{}} />)
            // }}
          >
            {itm["Site Id"]}
          </p>
        ),

        // CompletionBar: <ProgressBar notifyType={"success"} text={`${100 - ((itm.milestoneArray.length - itm.milestoneArray.filter(iewq => iewq.mileStoneStatus == "Close").length) / itm.milestoneArray.length * 100)}`} />,
        CompletionBar: (
          <ProgressBar
            notifyType={"success"}
            percent={`${100 -
              ((itm?.milestoneArray?.length -
                itm?.milestoneArray?.filter(
                  (iewq) => iewq?.mileStoneStatus == "Closed"
                ).length) /
                itm?.milestoneArray?.length) *
              100
              }`}
            text={`${itm?.milestoneArray?.filter(
              (iewq) => iewq?.mileStoneStatus == "Closed"
            ).length
              } / ${itm?.milestoneArray?.length}`}
          />
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
          // console.log(iewq, "iewqiewqiewqiewq");
          return {
            ...iewq,
            SubProject: "",

            MileDevName: (
              <div className="flex">
                <p
                // className="cursor"
                // onClick={() => {
                //   if (iewq.mileStoneStatus != "Closed") {
                //     setmodalOpen(true);

                //     dispatch(
                //       projectListActions.getUserAllocatedProject(
                //         true,
                //         projectuniqueId
                //       )
                //     );

                //     setmodalHead("Allocate User");
                //     setmodalBody(
                //       <>
                //         <AllocateProjectForm
                //           from={"mileStone"}
                //           listsite={[]}
                //           projectuniqueId={projectuniqueId}
                //           isOpen={modalOpen}
                //           setIsOpen={setmodalOpen}
                //           resetting={false}
                //           formValue={iewq}
                //         />
                //       </>
                //     );
                //   } else {
                //     let msgdata = {
                //       show: true,
                //       icon: "error",
                //       buttons: [],
                //       type: 1,
                //       text: "This task is already closed so cannot reallocate",
                //     };
                //     dispatch(ALERTS(msgdata));
                //   }

                //   console.log("ahshshhs", itm);
                // }}
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
                          {/* {iewq.assignerResult
                            .slice(0, 2)
                            .map((itwsw, index) => (
                              <p
                                className={`flex justify-center items-center mx-0.5 rounded-full text-white w-8 h-8 ${onehundcolor[index]}`}
                              >
                                {" "}
                                {itwsw.assignerName.split(" ").length > 1
                                  ? itwsw.assignerName
                                      .split(" ")[0]
                                      .substr(0, 1) +
                                    itwsw.assignerName
                                      .split(" ")[1]
                                      .substr(0, 1)
                                  : itwsw.assignerName
                                      .split(" ")[0]
                                      .substr(0, 1)}
                              </p>
                            ))} */}
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
            VendorName: (
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
                          {/* {iewq.assignerResult
                            .slice(0, 2)
                            .map((itwsw, index) => (
                              <p
                                className={`flex justify-center items-center mx-0.5 rounded-full text-white w-8 h-8 ${onehundcolor[index]}`}
                              >
                                {" "}
                                {itwsw.assignerName.split(" ").length > 1
                                  ? itwsw.assignerName
                                      .split(" ")[0]
                                      .substr(0, 1) +
                                    itwsw.assignerName
                                      .split(" ")[1]
                                      .substr(0, 1)
                                  : itwsw.assignerName
                                      .split(" ")[0]
                                      .substr(0, 1)}
                              </p>
                            ))} */}
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
            VendorId: (
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
                                {itwsw.vendorCode &&
                                  itwsw.vendorCode.trim().split(" ").length > 1
                                  ? `${itwsw.vendorCode
                                    .split(" ")[0]
                                    .substr(0, 1)}${itwsw.vendorCode
                                      .split(" ")[1]
                                      .substr(0, 1)}`
                                  : itwsw.vendorCode
                                    ? itwsw.vendorCode
                                      .split(" ")[0]
                                      .substr(0, 1)
                                    : ""}
                              </p>
                            ))}
                          {/* {iewq.assignerResult
                            .slice(0, 2)
                            .map((itwsw, index) => (
                              <p
                                className={`flex justify-center items-center mx-0.5 rounded-full text-white w-8 h-8 ${onehundcolor[index]}`}
                              >
                                {" "}
                                {itwsw.assignerName.split(" ").length > 1
                                  ? itwsw.assignerName
                                      .split(" ")[0]
                                      .substr(0, 1) +
                                    itwsw.assignerName
                                      .split(" ")[1]
                                      .substr(0, 1)
                                  : itwsw.assignerName
                                      .split(" ")[0]
                                      .substr(0, 1)}
                              </p>
                            ))} */}
                          <span class="pointer-events-none w-max absolute -top-8 bg-gray-500 z-[100px] rounded-lg p-2 opacity-0 transition-opacity group-hover:opacity-100">
                            {iewq.assignerResult.map((itws) => {
                              return itws.vendorCode + ", ";
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
                <p>{iewq.mileStoneStatus}</p>
              ),

            SiteNaming: (
              <p
                className="text-yellow-500 font-extrabold"
                // onClick={() => {
                //   setmodalFullOpen((prev) => !prev);
                //   // dispatch(AdminActions.getProject())
                //   setmodalHead("Update Milestone");
                //   dispatch(
                //     GET_ONE_MANAGE_PROJECT_TYPE_DY_FORM({
                //       dataAll: [],
                //       reset: true,
                //     })
                //   );
                //   // dispatch(GET_CIRCLE_WITH_PG_DATA({dataAll: [], reset: true}))
                //   // dispatch(GET_MAPPED_DATA({dataAll: [], reset: true}))
                //   dispatch(AdminActions.getOneProjectTypeDyform(itm.uniqueId));

                //   setmodalBody(
                //     <ManageMilestoneSite
                //       siteCompleteData={itm}
                //       uid={itm["uniqueId"]}
                //       mileStone={iewq}
                //       setGlobalData={setGlobalData}
                //       setSiteId={setSiteId}
                //       setmodalFullOpen={setmodalFullOpen}
                //       projectuniqueId={itm.projectuniqueId}
                //       myTaskPage="Yes"
                //     />
                //   );

                //   // setmodalBody(<ManageProjectSiteIdForm projectuniqueId={projectuniqueId} isOpen={modalOpen} setIsOpen={setmodalOpen} resetting={true} formValue={{}} />)
                // }}
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
            // checkboxProject: (
            //   <>
            //     <input
            //       type={"checkbox"}
            //       checked={childsite.indexOf(iewq.uniqueId) != -1}
            //       value={iewq.uniqueId}
            //       onChange={(e) => {
            //         if (e.target.checked) {
            //           setchildsite((prev) => {
            //             let finalinzingdata = [...prev, e.target.value];

            //             let tkChaeck = true;
            //             itm.milestoneArray.map((iefr) => {
            //               if (finalinzingdata.indexOf(iefr.uniqueId) == -1) {
            //                 tkChaeck = false;
            //               }
            //             });

            //             console.log(tkChaeck, "tkChaecktkChaecktkChaeck");

            //             if (tkChaeck && itm.totalCount == itm.milestoneCount) {
            //               setparentsite((prev) => [...prev, itm.uniqueId]);
            //             }

            //             return finalinzingdata;
            //           });

            //           console.log(
            //             childsite,
            //             "childsitechildsitechildsitechildsite"
            //           );
            //         } else {
            //           setchildsite((prev) => {
            //             let lst = prev.indexOf(e.target.value);
            //             prev.splice(lst, 1);
            //             setparentsite((preving) => {
            //               let lst = preving.indexOf(itm.uniqueId);
            //               preving.splice(lst, 1);
            //               return [...preving];
            //             });
            //             return [...prev];
            //           });
            //         }
            //       }}
            //     />
            //   </>
            // ),
            // MileStartDate: <div className='flex content-center w-full justify-center'>
            //     <CstmButton className={"p-2 w-full"} child={<Button name={iewq.plannedStartDate ? iewq.plannedStartDate : "Assign Date"} onClick={() => {
            //         setmodalOpen(true)

            //         dispatch(projectListActions.getUserAllocatedProject(true, projectuniqueId))
            //         setmodalHead("Add Planned Start Date")
            //         setmodalBody(<>
            //             <AllocateProjectDateForm projectuniqueId={projectuniqueId} isOpen={modalOpen} setIsOpen={setmodalOpen} resetting={false} formValue={iewq} />
            //             {/* <div className='mx-3'><Button name={"Submit"} classes={""} onClick={(handleSubmit(onTableViewSubmit))} /></div> */}
            //         </>)
            //         console.log('ahshshhs', itm)
            //         //setmodalOpen(false)
            //     }} classes='w-full'></Button>} />
            // </div>
          };
        }),
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

        // projectId: (
        //   <p
        //     // onClick={() => handleFullName(item)}
        //     onClick={() => navigate(`/projectSiteId/${itm.customeruniqueId}`)}
        //     className="text-pcol font-extrabold hover:underline focus:outline-none hover:font-semibold"
        //   >
        //     {itm.projectId}
        //   </p>
        // ),

        // "siteStatus": <div className='flex '><CstmButton className={"p-2"} child={<EditButton name={""} onClick={() => {
        //     setmodalOpen(true)
        //     setmodalHead("")
        //     setmodalBody(<>
        //    <div className='flex justify-between'>
        //    <label htmlFor="" className='font-bold'> Status:</label>
        //       <p className='bg-green-400 rounded-lg w-16 text-center'>{itm.siteStatus}</p>
        //    </div>
        //    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-full pb-4">
        //         <Button classes={"mt-2 w-sm text-center flex mx-auto"} name="Open Task" />
        //     </div>
        //     </>)
        // }}></EditButton>} /></div>,

        // siteStatus:
        //   itm.siteStatus == "Close" && rolename == "Admin" ? (
        //     <>
        //       <p
        //         className="cursor-pointer"
        //         onClick={() => {
        //           setmodalOpen(true);
        //           setmodalHead("");
        //           setmodalBody(
        //             <>
        //               <div className="flex justify-between">
        //                 <label htmlFor="" className="font-bold">
        //                   {" "}
        //                   Status:
        //                 </label>
        //                 <p className="bg-green-400 rounded-lg w-16 text-center">
        //                   {itm.siteStatus}
        //                 </p>
        //               </div>
        //               <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-full pb-4">
        //                 <Button
        //                   classes={"mt-2 w-sm text-center flex mx-auto"}
        //                   name="Open Task"
        //                 />
        //               </div>
        //             </>
        //           );
        //         }}
        //       >
        //         {itm.siteStatus}
        //       </p>
        //     </>
        //   ) : (
        //     <p>{itm.siteStatus}</p>
        //   ),

        // edit: (
        //   <div className="flex ">
        //     <CstmButton
        //       className={"p-2"}
        //       child={
        //         <EditButton
        //           name={""}
        //           onClick={() => {
        //             setmodalOpen(true);
        //             dispatch(AdminActions.getProject());
        //             setmodalHead("Edit Site ID");
        //             setmodalBody(
        //               <>
        //                 <ManageProjectSiteIdForm
        //                   isOpen={modalOpen}
        //                   setIsOpen={setmodalOpen}
        //                   resetting={false}
        //                   formValue={itm}
        //                 />
        //                 {/* <div className='mx-3'><Button name={"Submit"} classes={""} onClick={(handleSubmit(onTableViewSubmit))} /></div> */}
        //               </>
        //             );
        //             console.log("ahshshhs", itm);
        //             //setmodalOpen(false)
        //           }}
        //         ></EditButton>
        //       }
        //     />
        //   </div>
        // ),

        // edit: <div className="flex "></div>,
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

  let customerList = useSelector((state) => {
    return state?.gpTrackingReducer?.getCustomer.map((itm) => {
      return {
        label: itm?.customer,
        value: itm?.uniqueId,
      };
    });
  })

  let dbConfigTotalCount =
    useSelector((state) => {
      let interdata = state?.vendorData?.getvendorProjectTracking || 0;
      if (interdata.length > 0) {
        return interdata[0]["overall_table_count"];
      }
    }) || [];

  let formD = [
    {
      label: "Year",
      name: "year",
      value: "Select",
      bg: 'bg-[#3e454d] text-gray-300 border-[1.5px] border-solid border-[#64676d]',
      type: "select",
      option: listYear.map((itmYr) => {
        return {
          label: itmYr,
          value: itmYr,
        };
      }),
      props: {
        onChange: (e) => {
          setValue("year", e.target.value);
          setyear(e.target.value);
        },
      },
      required: false,
      classes: "col-span-1 h-38px",
    },
    {
      label: ValGm,
      name: "viewBy",
      value: "Select",
      type: "newmuitiSelect2",
      option: listDict[ValGm].map((dasd) => {
        return {
          value: dasd?.id,
          label: dasd?.name,
        };
      }),
      minWidth:"min-w-[260px]",
      props: {
        selectType: selectType,
      },
      hasSelectAll: true,
      required: false,
      classes: "w-full w-[300px] h-10",
    },
    {
      label: "Date Range",
      value: "",
      name: "assignDate",
      type: "datetimeRange",
      bg: "bg-[#3e454d] text-gray-300 border-[1.5px] border-solid border-[#64676d]",
      required: false,
      onChange: (data) => {
        setAssignDate(data)
      }
    },
  ];

  let table = {
    columns: [
      {
        name: "Site ID",
        value: "siteIdLink",
        style:
          "min-w-[140px] max-w-[200px] text-center font-extrabold hover:text-[#CA8A04] focus:outline-none hover:font-semibold  sticky left-0 bg-[#3e454d] z-20 cursor-pointer",
      },
      {
        name: "Customer",
        value: "Customer",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Project Group",
        value: "projectGroupName",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Project ID",
        value: "projectId",
        style:
          "min-w-[140px] max-w-[200px] text-center sticky left-[140px] bg-[#3e454d] z-20",
      },
      {
        name: "Project Type",
        value: "projectType",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Sub Project",
        value: "subProject",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Vendor Name",
        value: "",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Vendor ID",
        value: "",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Task Allocation Date",
        value: "assignDate",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "MS Completition Date",
        value: "",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Task Closure Date",
        value: "",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Ageing",
        value: "siteageing",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Predecessor",
        value: "Predecessor",
        style: "min-w-[240px] max-w-[240px] text-center",
      },
      {
        name: "MS1 Completion Date",
        value: "MS1Date",
        style: "min-w-[240px] max-w-[240px] text-center",
      },
      {
        name: "MS2 Completion Date",
        value: "MS2Date",
        style: "min-w-[240px] max-w-[240px] text-center",
      },


      //   {
      //     name: "Owner",
      //     value: "PMName",
      //     style: "min-w-[140px] max-w-[200px] text-center",
      //   },
      //   {
      //     name: "Planned Start Date",
      //     value: "siteStartDate",
      //     style: "min-w-[140px] max-w-[200px] text-center",
      //   },
      //   {
      //     name: "Planned End Date",
      //     value: "siteEndDate",
      //     style: "min-w-[140px] max-w-[200px] text-center",
      //   },
      //   {
      //     name: "Completition Date",
      //     value: "Site_Completion Date",
      //     style: "min-w-[140px] max-w-[200px] text-center",
      //   },

      // {
      //   name: "Completion (%)",
      //   value: "CompletionBar",
      //   style: "min-w-[140px] max-w-[200px] text-center",
      // },

      //   {
      //     name: "MS Status",
      //     value: "siteStatus",
      //     style: "min-w-[140px] max-w-[200px] text-center",
      //   },
      {
        name: "MS Status",
        value: "",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Vendor Item Code",
        value: "vendorItemCode2",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Vendor Rate",
        value: "vendorRate2",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "PO eligibility (Yes/No)",
        value: "",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      // {
      //   name: "Billing Status",
      //   value: "siteBillingStatus",
      //   style: "min-w-[140px] max-w-[200px] text-center",
      // },
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
      //   ...(shouldIncludeEditColumn
      //     ? [
      //         {
      //           name: "Delete",
      //           value: "delete",
      //           style: "min-w-[50px] max-w-[100px] text-center",
      //         },
      //       ]
      //     : [])
      // {
      //   name: "Delete",
      //   value: "delete",
      //   style: "min-w-[50px] max-w-[100px] text-center",
      // },
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
            "min-w-[140px] max-w-[200px] sticky left-0 bg-[#3e454d] text-center  z-20",
        },
        {
          name: "Customer",
          value: "customer",
          style: "min-w-[140px] max-w-[200px] text-center",
        },
        {
          name: "Project Group",
          value: "projectGroup",
          style: "min-w-[140px] max-w-[200px] text-center",
        },
        {
          name: "Project ID",
          value: "projectId",
          style:
            "min-w-[140px] max-w-[200px] sticky left-[140px] bg-[#3e454d] text-center z-20",
        },
        {
          name: "Project Type",
          value: "projectType",
          style: "min-w-[140px] max-w-[200px] text-center",
        },
        {
          name: "Sub Project",
          value: "SubProject",
          style: "min-w-[140px] max-w-[200px] text-center",
        },
        {
          name: "Vendor Name",
          value: "VendorName",
          style: "min-w-[180px] max-w-[180px] text-center",
        },
        {
          name: "Vendor ID",
          value: "VendorId",
          style: "min-w-[140px] max-w-[200px] text-center",
        },
        {
          name: "Task Allocation Date",
          value: "assignDate",
          style: "min-w-[140px] max-w-[200px] text-center",
        },
        {
          name: "MS Completition Date",
          value: "CC_Completion Date",
          style: "min-w-[140px] max-w-[200px] text-center",
        },
        {
          name: "Task Closure Date",
          value: "Task Closure",
          style: "min-w-[140px] max-w-[200px] text-center",
        },
        {
          name: "Ageing",
          value: "taskmageing",
          style: "min-w-[140px] max-w-[200px] text-center",
        },
        {
          name: "Predecessor",
          value: "Predecessor",
          style: "min-w-[240px] max-w-[240px] text-center",
        },
        {
          name: "MS1 Completion Date",
          value: "ms1CompletitionDate",
          style: "min-w-[240px] max-w-[240px] text-center",
        },
        {
          name: "MS2 Completion Date",
          value: "ms2CompletitionDate",
          style: "min-w-[240px] max-w-[240px] text-center",
        },
        {
          name: "MS Status",
          value: "mileStoneStatusUpda",
          style: "min-w-[140px] max-w-[200px] text-center",
        },
        {
          name: "Vendor Item Code",
          value: "",
          style: "min-w-[140px] max-w-[200px] text-center",
        },
        {
          name: "Vendor Rate",
          value: "",
          style: "min-w-[140px] max-w-[200px] text-center",
        },
        {
          name: "PO eligibility (Yes/No)",
          value: "",
          style: "min-w-[140px] max-w-[200px] text-center",
        },

        // {
        //   name: "Planned Start Date",
        //   value: "mileStoneStartDate",
        //   style: "min-w-[140px] max-w-[200px] text-center",
        // },
        // {
        //   name: "Planned End Date",
        //   value: "mileStoneEndDate",
        //   style: "min-w-[140px] max-w-[200px] text-center",
        // },
        // {
        //   name: "Completition Date",
        //   value: "CC_Completion Date",
        //   style: "min-w-[140px] max-w-[200px] text-center",
        // },

        // {
        //   name: "Completion (%)",
        //   value: "CompletionBar",
        //   style: "min-w-[140px] max-w-[200px] text-center",
        // },




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
        value: "",
        name: "customerId",
        type: "select",
        bg: "bg-[#3e454d] text-gray-300 border-[1.5px] border-solid border-[#64676d]",
        option: customerList,
        props: {
          onChange: (e) => {
            if (e.target.value){
              setSelectedCustomer(e?.target?.value)
              dispatch(VendorActions.getProjectType(true, e.target.value))
            }
            else{
              setSelectedCustomer(null)
              dispatch(GET_PROJECT_TYPE({dataAll:[],reset:true}))
            }
          },
        },
        required: false,
      },
      {
        label: "Project Type",
        value: "",
        type: "select",
        name: "projectType",
        option: projectType,
      },
      {
        label: "Site Id",
        value: "",
        name: "siteId",
        type: "text",
      },
      {
        label: "Milestone",
        value: "",
        name: "milestone",
        type: "text",
      },
      {
        label: "Vendor Name",
        value: "",
        type: "text",
        name: "vendorName",
      },
      {
        label: "Vendor Code",
        value: "",
        name: "vendorCode",
        type: "text",
      },
    ],
  };

  const onSubmit = (data) => {
    let shouldReset = data.reseter;
    delete data.reseter;

    let strVal = objectToQueryString(data);
    setstrVal(strVal);
    setFilters({
      ...filters,
      ...data
    })
    dispatch(VendorActions.getVendorProjectTracking(true, objectToQueryString(data)));
  };

  useEffect(() => {
    dispatch(gpTrackingActions.getGPCustomer());
    dispatch(VendorActions.getVendorProjectTracking())
  }, []);

  return (
    <>
      <div className="flex items-center justify-start">
        <div className="col-span-1 md:col-span-1">
          <CommonForm
            classes="grid-cols-3 w-[850px] overflow-y-hidden p-2"
            Form={formD}
            errors={errors}
            register={register}
            setValue={setValue}
            getValues={getValues}
          />
        </div>
        <div className="flex w-fit mt-3 -ml-5 items-center justify-center">
          <Button
            classes="flex h-fit"
            name=""
            icon={<UilSearch className="w-5 m-2 h-5" />}
            onClick={handleSubmit(handleAddActivity)}
          />
        </div>
      </div>

      <AdvancedTableExpandable
        mergedRows={true}
        parentsite={parentsite}
        childsite={childsite}
        searchView={
          <>
            {/* <SearchBarView
              onblur={(e) => {}}
              onchange={(e) => {
                const siteNameQuery =
                  (e.target.value ? "siteName=" + (e.target.value + "&") : "") +
                  strValFil;
                dispatch(MyHomeActions.getMyTask(true, siteNameQuery));
              }}
              placeHolder={"Site Name"}
            /> */}

            {/* <SearchBarView
              onblur={(e) => {}}
              onchange={(e) => {
                dispatch(
                  MyHomeActions.getMyTask(
                    true,
                    (e.target.value
                      ? "mileStoneName=" + (e.target.value + "&")
                      : "") + strValFil
                  )
                );
              }}
              placeHolder={"Milestone Name"}
            /> */}
          </>
        }
        headerButton={
          <div className="flex gap-1">
            <ConditionalButton
              showType={getAccessType("Export(Site)")}
              classes="w-auto "
              onClick={(e) => {
                dispatch(
                  CommonActions.commondownload(
                    "/export/vendor-project-tracking?" + objectToQueryString(filters),
                    "Vendor-Project-Tracking.xlsx"
                  )
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
        heading={"Total Sites:-"}
        TableHeight="h-[52vh]"
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
export default VendorProjectTracking;