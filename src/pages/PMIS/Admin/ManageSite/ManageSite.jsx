import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../../components/Button";
import {getAccessType,labelToValue} from "../../../../utils/commonFunnction";
import { ALERTS } from "../../../../store/reducers/component-reducer";
import AdminActions from "../../../../store/actions/admin-actions";
import { useParams } from "react-router-dom";
import CommonForm from "../../../../components/CommonForm";
import CommonTableFormSiteParent from "../../../../components/CommonTableFormSiteParent";
import moment from "moment";

const ManageSite = ({
  oldgetvalue,
  setGlobalData,
  projectuniqueId,
  setmodalFullOpen,
  setSiteId,
}) => {
  const { customeruniqueId } = useParams();
  const today = moment().format("YYYY-MM-DD");

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
  const {
    register: registerForm4,
    setValue: setValueForm4,
    getValues: getValuesForm4,
    handleSubmit: handleSubmitForm4,
    formState: { errors: errorsForm4 },
  } = useForm();


  const dispatch = useDispatch();

  let showType = getAccessType("Financial button under Template");

  let assignfinacial = false;

  if (showType === "visible") {
    assignfinacial = true;
  }

  let mappedDataList = useSelector((state) => {
    const data = state?.projectList?.getMappedData;
    return data && data.length > 0 ? data : [{ headerName: "" }];
  });

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

  let dataOfProject = useSelector((state) => {
    let dataOlder = state.adminData.getProjectTypeDyform[0];
    return dataOlder;
  });

  const handleSiteEnggSubmit = (data) => {

    let filData = [];
    filData = dataOfProject["t_sengg"].filter((itew) => itew["required"] == "Yes");
    let filDataCount = 0;
    let datamsg = "";
    filData.map((itew) => {
      if ( data[itew["fieldName"]] == undefined || data[itew["fieldName"]] == "") {
        filDataCount += 1;
        datamsg += itew["fieldName"] + ", ";
      }
      console.log(itew["fieldName"], "nathnathamarnath");
    });

    if (filDataCount != 0) {
      let msgdata = {
        show: true,
        icon: "error",
        buttons: [],
        type: 1,
        text: datamsg + " is required field.",
      };
      dispatch(ALERTS(msgdata));
      return;
    }

    setSiteId(data["Site Id"] ? data["Site Id"] : "Add");
    let final_data = {
      SubProjectId: dataOfProject["uniqueId"],
      new_u_id: dataOfProject["new_u_id"],
      projectuniqueId: projectuniqueId,
    };

    let dat = dataOfProject["t_sengg"];
    dat.map((itew) => {
      let fieldNaming = labelToValue(itew["fieldName"]);

      if(fieldNaming=="BAND"){
        final_data["BAND"] = data["BAND"]?.split(",")?.join("-");

      }
      else if(fieldNaming=="CELL ID"){
        final_data["CELL ID"] = data["CELL ID"]?.split(",")?.join("-");
      }

      else if(fieldNaming=="SECTOR"){
        final_data["SECTOR"] = data["SECTOR"]?.split(",")?.join("-");
      }
      else{
        final_data[fieldNaming] = data[fieldNaming];
      }
    });

    setGlobalData((prev) => {
      return {
        ...prev,
        siteEngineer: final_data,
      };
    });

    let msgdata = {
      show: true,
      icon: "success",
      buttons: [],
      type: 1,
      text: "Site Engg. Data Added Click on submit to close menu",
    };
    dispatch(ALERTS(msgdata));

  };

  const handleTrackingSubmit = (data) => {

    let final_data = {};
    dataOfProject["t_tracking"].map((itew) => {
      let fieldNaming = labelToValue(itew["fieldName"]);

      final_data[fieldNaming] = data[fieldNaming];
    });

    setGlobalData((prev) => {
      return {
        ...prev,
        t_tracking: final_data,
      };
    });

    let msgdata = {
      show: true,
      icon: "success",
      buttons: [],
      type: 1,
      text: "Tracking Data Added Click on submit to close menu",
    };
    dispatch(ALERTS(msgdata));
  };

  const handleIssuesSubmit = (data) => {

    let final_data = {};
    dataOfProject["t_issues"].map((itew) => {
      let fieldNaming = labelToValue(itew["fieldName"]);

      final_data[fieldNaming] = data[fieldNaming];
    });

    setGlobalData((prev) => {
      return {
        ...prev,
        t_issues: final_data,
      };
    });

    let msgdata = {
      show: true,
      icon: "success",
      buttons: [],
      type: 1,
      text: "Issues Data Added Click on submit to close menu",
    };
    dispatch(ALERTS(msgdata));
  };
  
  const bodyData = [];


  const funcaller = () => {
    reset({});
  };

  useEffect(() => {
    if (dataOfProject) {
      setValueForm1("project", dataOfProject.projectType);
      setValueForm1("subProject", dataOfProject.subProject);
    }
    reset({})
  }, [dataOfProject, reset]);

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
      <div className="p-4">
        <CommonTableFormSiteParent
          setmodalFullOpen={setmodalFullOpen}
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
                  classes={"grid-cols-4 gap-1"}
                  Form={
                    dataOfProject
                      ? dataOfProject["t_sengg"]
                        ? [
                            {
                              label: "Project Type",
                              value: "",
                              name: "project",
                              type: "sdisabled",
                              classes: "col-span-1",
                            },
                            {
                              label: "Sub Project",
                              value: "",
                              name: "subProject",
                              type: "sdisabled",
                              classes: "col-span-1",
                            },
                            ...dataOfProject["t_sengg"].map((its) => {
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
                              if (its["fieldName"] === "SECTOR") {
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
                                value: "Select",
                                required: its.required == "Yes" ? true : false,
                                option: option,
                                name: its.fieldName,
                                type: type,
                                props: {
                                  maxSelectableDate: today,
                                },
                              };
                            }),
                          ]
                        : []
                      : []
                  }
                  // Form={filesUploadForm}
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
                            let type = dtype[its.dataType];
                            // if (mappedDataList.some(field => field.headerName === its['fieldName'])) {
                            //       type = "sdisabled";
                            // }
                            let option = its.dropdownValue
                                ? its.dropdownValue.split(",").map((itm) => {
                                    return {
                                      value: itm,
                                      label: itm,
                                    };
                                  })
                                : [];
                            return {
                              label: its.fieldName,
                              value: "abc",
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
                              required: its.required == "Yes" ? true : false,
                              type: dtype[its.dataType],
                              option:its.dropdownValue
                                ? its.dropdownValue.split(",").map((itm) => {
                                    return {
                                      value: itm,
                                      label: itm,
                                    };
                                  })
                                : [],
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
                      <div className="overflow-auto h-[80vh]">
                        {dataOfProject &&
                          Array.isArray(dataOfProject["t_sFinancials"]) &&
                          dataOfProject["t_sFinancials"] && (
                            <table>
                              <thead>
                                <tr className="bg-black w-full overflow-x-auto flex ">
                                  {dataOfProject["t_sFinancials"].map((its) => {
                                    return (
                                      <th className="px-4 w-auto whitespace-nowrap border p-1 bg-[#24292d] text-white  ">
                                        {its.fieldName}
                                      </th>
                                    );
                                  })}
                                </tr>
                              </thead>
                              <tbody>
                                {Array.isArray(bodyData) &&
                                  bodyData?.map((itm, i) => (
                                    <tr key={i}>
                                      {Object.keys(itm)?.map((key, j) => {
                                        return <td>{itm[key]}</td>;
                                      })}
                                    </tr>
                                  ))}
                              </tbody>
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

export default ManageSite;
