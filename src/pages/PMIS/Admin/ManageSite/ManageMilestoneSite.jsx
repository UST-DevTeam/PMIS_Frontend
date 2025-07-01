import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../../../components/Modal";
import Button from "../../../../components/Button";
import {getAccessType,labelToValue} from "../../../../utils/commonFunnction";
import { ALERTS } from "../../../../store/reducers/component-reducer";
import { Urls} from "../../../../utils/url";
import AdminActions from "../../../../store/actions/admin-actions";
import { useParams } from "react-router-dom";
import CommonForm from "../../../../components/CommonForm";
import CommonTableFormSiteParent from "../../../../components/CommonTableFormSiteParent";
import projectListActions from "../../../../store/actions/projectList-actions";
import { uiStatusColor } from "../../../../utils/queryBuilder";
import CompletitonCreiteriaForm from "./CompletitonCreiteriaForm";
import ConditionalButton from "../../../../components/ConditionalButton";
import moment from "moment";


const ManageMilestoneSite = ({
  siteCompleteData,
  uid,
  mileStone,
  setGlobalData,
  projectuniqueId,
  setmodalFullOpen,
  setSiteId,
  myTaskPage,
  filterView
}) => {

  const { customeruniqueId } = useParams;
  const today = moment().format("YYYY-MM-DD");
  let assignedToCount = mileStone?.assignerResult?.length || 0;
  let milestoneStatus = mileStone?.mileStoneStatus
  let milestonName = mileStone?.Name
  let user = JSON.parse(localStorage.getItem("user"));
  let rolename = user?.roleName;






  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setValues,
    getValues,
    reset,
    formState: { errors },
  } = useForm();

  const {
    register: registerForm1,
    setValue: setValueForm1,
    getValues: getValuesForm1,
    handleSubmit: handleSubmitForm1,
    formState: { errors: errorsForm1 },
  } = useForm();
  const {
    register: registerForm2,
    setValue: setValueForm2,
    getValues: getValuesForm2,
    handleSubmit: handleSubmitForm2,
    formState: { errors: errorsForm2 },
  } = useForm();
  const {
    register: registerForm3,
    setValue: setValueForm3,
    getValues: getValuesForm3,
    handleSubmit: handleSubmitForm3,
    formState: { errors: errorsForm3 },
  } = useForm();


  const [modalOpen, setmodalOpen] = useState(false);
  const [type, settype] = useState(true);
  const [modalHead, setmodalHead] = useState(<></>);
  const [modalBody, setmodalBody] = useState(<></>);
  const [invoiceData, setinvoiceData] = useState([]);
  const dispatch = useDispatch();

  let showType = getAccessType("Financial button under Template");

  let assignfinacial = false;

  if (showType === "visible") {
    assignfinacial = true;
  }

  let circleWithPGList = useSelector((state) => {
    return state?.projectList?.getCircleWithPGData?.map((itm) => {
      return {
        label: itm.Circle,
        value: itm.Circle,
      };
    });
  });

  let bandList = useSelector((state) => {
    return (
      state?.projectList?.getCircleWithPGData?.flatMap((itm) => {
        return Object.keys(itm).includes("BAND")
          ? itm?.BAND?.split(",").map((its) => {
              return {
                id: its,
                name: its,
              };
            })
          : [];
      }) || []
    );
  });

  let dataOfOldProject = useSelector((state) => {
    let datew = state.adminData.getOneProjectTypeDyform;

    if (type && datew && datew.length > 0) {
      settype(false);

      let dtresult = datew[0]["result"];

      setinvoiceData(datew[0]["invoice"] ? datew[0]["invoice"] : []);

      dtresult["t_sengg"] &&
        dtresult["t_sengg"].map((iytm) => {

          if(iytm["fieldName"]=="BAND"){
            let bandlistt=datew[0]["BAND"]

            setValueForm1("BAND", bandlistt?.split("-")?.join(","));
          }
          else if(iytm["fieldName"]=="CELL ID"){
            let cellidlistt=datew[0]["CELL ID"]

            setValueForm1("CELL ID", cellidlistt?.split("-")?.join(","));
          }else{
            setValueForm1(iytm["fieldName"], datew[0][iytm["fieldName"]]);
          }
          console.log(
            iytm["fieldName"],
            datew[0][iytm["fieldName"]],
            "iytmiytmiytmiytm"
          );

        });

      dtresult["t_tracking"] &&
        dtresult["t_tracking"].map((iytm) => {
          setValueForm2(iytm["fieldName"], datew[0][iytm["fieldName"]]);

        });
      dtresult["t_issues"] &&
        dtresult["t_issues"].map((iytm) => {
          setValueForm3(iytm["fieldName"], datew[0][iytm["fieldName"]]);
        });
      return datew[0];
    }
  });

  let dataOfProject = useSelector((state) => {
    let dataOlder = state.adminData.getOneProjectTypeDyform
      ? state.adminData.getOneProjectTypeDyform.length > 0
        ? state.adminData.getOneProjectTypeDyform[0]["result"]
        : state.adminData.getOneProjectTypeDyform
      : state.adminData.getOneProjectTypeDyform;

    return dataOlder;
  });

  const handleSiteEnggSubmit = (data) => {
    let final_data = {};

    dataOfProject["t_sengg"].map((itew) => {

      let fieldNaming = labelToValue(itew.fieldName);
      
      if(fieldNaming=="BAND"){
          final_data["BAND"] = data["BAND"]?.split(",")?.join("-");
      }

      else if(fieldNaming=="CELL ID"){
        final_data["CELL ID"] = data["CELL ID"]?.split(",")?.join("-");
      }

      else{
        final_data[fieldNaming] = data[fieldNaming];
      }
    });

    let fdata = {
      name: "updateSiteEngg",
      data: final_data,
      from: {
        uid: uid,
      },
    };

    dispatch(
      projectListActions.globalProjectTypeDataPatch(
        Urls.projectList_globalSaver,
        projectuniqueId,
        fdata,
        () => {
          dispatch(projectListActions.getProjectTypeAll(projectuniqueId));
        }
      )
    );
  };

  const handleTrackingSubmit = (data) => {
    
    let final_data = {};

    dataOfProject["t_tracking"].map((itew) => {
      let fieldNaming = labelToValue(itew.fieldName);
      final_data[fieldNaming] = data[fieldNaming];
    });

    let fdata = {
      name: "updateSiteEngg",
      data: final_data,
      from: {
        uid: uid,
      },
    };

    dispatch(
      projectListActions.globalProjectTypeDataPatch(
        Urls.projectList_globalSaver,
        projectuniqueId,
        fdata,
        () => {dispatch(projectListActions.getProjectTypeAll(projectuniqueId))}
      )
    );
  };

  const handleIssuesSubmit = (data) => {

    let final_data = {};

    dataOfProject["t_issues"].map((itew) => {
      let fieldNaming = labelToValue(itew.fieldName);
      final_data[fieldNaming] = data[fieldNaming];
    });

    let fdata = {
      name: "updateSiteEngg",
      data: final_data,
      from: {
        uid: uid,
      },
    };

    dispatch(
      projectListActions.globalProjectTypeDataPatch(
        Urls.projectList_globalSaver,
        projectuniqueId,
        fdata,
        () => {dispatch(projectListActions.getProjectTypeAll(projectuniqueId))}
      )
    );
  };


  const funcaller = () => {
    reset({});
  };



  useEffect(() => {
    dispatch(projectListActions.getCircleWithPGData(projectuniqueId));
    reset({});
    settype(true);
    dispatch(AdminActions.getManageCompletionCriteria());
  }, [uid]);


  let dtype = {
    Decimal: "number",
    Text: "text",
    Dropdown: "select",
    Number: "number",
    Date: "datetime",
    "Auto Created": "sdisabled",
  };


  const filesUploadForm = [
    { label: "file", value: "", name: "file", required: true, type: "file" },
    { label: "Note", value: "", name: "note", required: true, type: "text" },
  ];
  return (
    <>
      <Modal
        children={modalBody}
        setIsOpen={setmodalOpen}
        isOpen={modalOpen}
        size={"smsh"}
        modalHead="Completion Criteria"
      />

      <div className="p-4">
        {mileStone.assignerResult ? (
          <div className="flex flex-row">
            <div className="w-full">
              <div className="w-auto flex text-[#13b497] font-extrabold pl-2 gap-2">
                <h1>Milestone Status <span className="text-[#f4d3a8]"> :</span></h1>
                {
                  <p
                    className={`px-3.5 rounded-xl text-center text-yellow-400 bg-slate-500 border-[0.01px] border-[#f4d3a8] whitespace-nowrap ${
                      uiStatusColor[mileStone?.mileStoneStatus]
                    }`}
                  >
                    {mileStone?.mileStoneStatus}
                  </p>
                }
              </div>
            </div>
            <div className="w-full">
              { (milestoneStatus != "Closed" || (rolename=="Admin" || rolename=="PMO")) ? <ConditionalButton
                showType={getAccessType("Task Completion Criteria")}
                classes="w-auto"
                name={"Completion Criteria"}
                onClick={() => {
                  if (assignedToCount != 0) {
                    setmodalBody(
                      <CompletitonCreiteriaForm
                        siteCompleteData={siteCompleteData}
                        customeruniqueId={customeruniqueId}
                        projectuniqueId={projectuniqueId}
                        setmodalFullOpen={setmodalFullOpen}
                        setmodalOpen={setmodalOpen}
                        mileStone={mileStone}
                        myTaskPage={myTaskPage}
                        filterView = {filterView}
                      />
                    );
                    setmodalOpen(true);
                  } else {
                    let msgdata = {
                      show: true,
                      icon: "error",
                      buttons: [],
                      type: 1,
                      text: "To close this task, you need to assign it first.",
                    };
                    dispatch(ALERTS(msgdata));
                  }
                }}
              ></ConditionalButton>:<Button name={"Completion Criteria"} onClick={()=>{
                
                let msgdata = {
                  show: true,
                  icon: "error",
                  buttons: [],
                  type: 1,
                  text: "Task is already Closed",
                };
                dispatch(ALERTS(msgdata));
              }} classes="w-18"></Button>
}
            </div>
          </div>
        ) : (
          <></>
        )}

        <CommonTableFormSiteParent
          funcaller={funcaller}
          defaultValue={"Site Engg"}
          tabslist={{
            "Site Engg": (
              <>
                <div className="flex justify-end">
                  <Button
                    classes="w-30"
                    name="Save Site Engg"
                    onClick={handleSubmitForm1(handleSiteEnggSubmit)}
                  />
                </div>
                <CommonForm
                  classes={"grid-cols-4 gap-1 mt-1"}
                  Form={
                    dataOfProject
                      ? dataOfProject["t_sengg"]
                        ? dataOfProject["t_sengg"].map((its) => {
                            let type = dtype[its.dataType];
                            let option = its.dropdownValue
                              ? its.dropdownValue.split(",").map((itm) => {
                                  return {
                                    value: itm,
                                    label: itm,
                                  };
                                })
                              : [];

                            if (its["fieldName"] === "CIRCLE") {
                              option = circleWithPGList;
                              type = "select";
                            }
                            if (its["fieldName"] === "BAND") {
                              option = bandList;
                              type = "muitiSelect";
                            }

                            if (its["fieldName"] === "CELL ID") {
                              type = "muitiSelect";
                              option = its.dropdownValue
                              ? its.dropdownValue.split(",").map((itm) => {
                                  return {
                                    id: itm,
                                    name: itm,
                                  };
                                })
                              : [];
                            }

                            if (its["fieldName"] === "PARENT PROJECT ID") {
                              type = "newSingleSelect45";
                              option = its.dropdownValue
                              ? its.dropdownValue.split(",").map((itm) => {
                                  return {
                                    label: itm,
                                    value: itm,
                                  };
                                })
                              : [];
                            }

                            return {
                              label: its.fieldName,
                              value: "",
                              required: its.required == "Yes" ? true : false,
                              option: option,
                              name: its.fieldName,
                              type: type,
                              props: {
                                maxSelectableDate: today,
                              },
                            };
                          })
                        : []
                      : []
                  }
                  errors={errorsForm1}
                  register={registerForm1}
                  setValue={setValueForm1}
                  getValues={getValuesForm1}
                />
              </>
            ),
            Tracking: (
              <>
                <div className="flex justify-end">
                  <Button
                    classes="w-30"
                    name="Save Tracking"
                    onClick={handleSubmitForm2(handleTrackingSubmit)}
                  />
                </div>
                <CommonForm
                  classes={"grid-cols-4 gap-1"}
                  Form={
                    dataOfProject
                      ? dataOfProject["t_tracking"]
                        ? dataOfProject["t_tracking"].map((its) => {
                            return {
                              label: its.fieldName,
                              value: "abc",
                              name: its.fieldName,
                              type: dtype[its.dataType],
                              option:its.dropdownValue
                                ? its.dropdownValue.split(",").map((itm) => {
                                    return {
                                      value: itm,
                                      label: itm,
                                    };
                                  })
                                : [],
                              required: its.required == "Yes" ? true : false,
                              props: {
                                maxSelectableDate: today,
                              },
                            };
                          })
                        : []
                      : []
                  }
                  // Form={filesUploadForm}
                  errors={errorsForm2}
                  register={registerForm2}
                  setValue={setValueForm2}
                  getValues={getValuesForm2}
                />
              </>
            ),
            Issues: (
              <>
                <div className="flex justify-end">
                  <Button
                    classes="w-30"
                    name="Save Issues"
                    onClick={handleSubmitForm3(handleIssuesSubmit)}
                  />
                </div>
                <CommonForm
                  classes={"grid-cols-4 gap-1"}
                  Form={
                    dataOfProject
                      ? dataOfProject["t_issues"]
                        ? dataOfProject["t_issues"].map((its) => {
                            return {
                              label: its.fieldName,
                              value: "abc",
                              name: its.fieldName,
                              type: dtype[its.dataType],
                              option:its.dropdownValue
                                ? its.dropdownValue.split(",").map((itm) => {
                                    return {
                                      value: itm,
                                      label: itm,
                                    };
                                  })
                                : [],
                              required: its.required == "Yes" ? true : false,
                              props: {
                                maxSelectableDate: today,
                              },
                            };
                          })
                        : []
                      : []
                  }
                  // Form={filesUploadForm}
                  errors={errorsForm3}
                  register={registerForm3}
                  setValue={setValueForm3}
                  getValues={getValuesForm3}
                />
              </>
            ),
            ...(assignfinacial
              ? {
                  Financials: (
                    <>
                      <div className="overflow-auto h-[80vh] m-12 mt-1">
                        {dataOfProject &&
                          Array.isArray(dataOfProject["t_sFinancials"]) &&
                          dataOfProject["t_sFinancials"] && (
                            <table
                              className="border-collapse border"
                              border="2"
                            >
                              <tr className="border border-black">
                                {dataOfProject["t_sFinancials"].map((its) => {
                                  return (
                                    <th className="px-2 w-auto mxax-w-full whitespace-nowrap border-[1.5px] border-black p-1 bg-[#24292d] text-white ">
                                      {its.fieldName}
                                    </th>
                                  );
                                })}
                              </tr>

                              {(() => {
                                let tamount = 0;

                                // Your map function
                                return (
                                  <>
                                    {invoiceData.map((itm, index) => {
                                      return (
                                        <tr
                                          key={index}
                                          className="text-[11px] h-2 pl-1 border-['#4ADE80'] text-center border-[1.5px] overflow-hidden text-white"
                                        >
                                          {dataOfProject["t_sFinancials"].map(
                                            (its, columnIndex) => {
                                              const value = itm[its.fieldName];
                                              if (
                                                typeof value !== "undefined"
                                              ) {
                                                if (its.fieldName == "Amount") {
                                                  tamount = tamount + value;
                                                  return (
                                                    <td
                                                      key={columnIndex}
                                                      className=" border-black border-[1.5px]"
                                                    >
                                                      {value}
                                                    </td>
                                                  );
                                                } else {
                                                  return (
                                                    <td
                                                      key={columnIndex}
                                                      className=" border-[1px] border-black "
                                                    >
                                                      {value}
                                                    </td>
                                                  );
                                                }
                                              } else {
                                                console.error(
                                                  `Missing data for field "${its.fieldName}"`
                                                );
                                                return (
                                                  <td key={columnIndex}>N/A</td>
                                                );
                                              }
                                            }
                                          )}
                                        </tr>
                                      );
                                    })}
                                    <>
                                      <tr className="text-[11px] h-2 pl-1 border-black text-center border-[1.5px] overflow-hidden text-slate-800">
                                        <td
                                          colSpan={
                                            dataOfProject["t_sFinancials"]
                                              .length
                                          }
                                        >
                                          <p className="float-right p-2 rounded-sm bg-yellow-300 font-extrabold">
                                            Total Amount = {tamount}
                                          </p>
                                        </td>
                                      </tr>
                                    </>
                                  </>
                                );
                              })()}
                              {}
                            </table>
                          )}
                      </div>
                    </>
                  ),
                }
              : {}),
          }}
        />
      </div>
    </>
  );
};

export default ManageMilestoneSite;
