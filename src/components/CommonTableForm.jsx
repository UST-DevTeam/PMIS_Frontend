import Multiselect from "multiselect-react-dropdown";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import TextBox from "./FormElements/TextBox";
import FilePicker from "./FormElements/FilePicker";
import SelectDropDown from "./FormElements/SelectDropDown";
import TextArea from "./FormElements/TextArea";
import Multiselection from "./FormElements/Multiselection";
import DatePicking from "./FormElements/DatePicking";
import AutoSuggestion from "./FormElements/AutoSuggestion";
import Radio from "./FormElements/Radio";
import Disabled from "./FormElements/Disabled";
import CheckBox from "./FormElements/CheckBox";
import Table from "./Table";
import TableJson from "./TableJson";
import Button from "./Button";
import RoundedButton from "./RoundedButton";
import {
  UilPlusCircle,
  UilBars,
  UilPen,
  UilSave,
} from "@iconscout/react-unicons";
import CreateFormField from "./CreateFormField";
import { useDispatch, useSelector } from "react-redux";
import { ALERTS } from "../store/reducers/component-reducer";
import TableJsonDynamic from "./TableJsonDynamic";
import {
  SET_DYNAMIC_FORM,
  SET_DYNAMIC_FORM_INDEX,
  SET_DYNAMIC_FORM_INDEX_INNER,
} from "../store/reducers/projectList-reducer";
import FileUploader from "./FIleUploader";
import { Urls } from "../utils/url";
import CommonActions from "../store/actions/common-actions";
import AdminActions from "../store/actions/admin-actions";

let types = ["text", "password", "email", "hidden", "number"];

const CommonTableForm = ({
  setmodalOpen,
  classes,
  encType = false,
  Form,
  tabHead,
  errors,
  setValue,
  getValues,
  register,
  functioning,
  oldList,
  rowId,
  name,
  customeruniqueId,
  page
}) => {
  const [value, onChange] = useState(new Date());
  const [editing, setediting] = useState(false);
  const [edit, setedit] = useState(false);
  let newars = {
    childView: false,
  };


  let listing = useSelector((state) => {
    return state.projectList.dynamicForm[tabHead]
      ? state.projectList.dynamicForm[tabHead]
      : [];
  });

  Form.map((itm) => {
    newars[itm.name] = newars[itm.value];
  });

  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = useState(true);
  const [selectFile, setSelectFile] = useState(false);
  newars["index"] = 1;






  const onTableViewSubmit = (data) => {
    data["fileType"] = tabHead;
    dispatch(CommonActions.fileSubmit(Urls.templateUploadFile + "/" + `${rowId}`,data,() => {
          setSelectFile(false);
          setmodalOpen(false);
          if (page === "Compliance"){
            dispatch(AdminActions.getCompiliance());
          }
          else {
            dispatch(AdminActions.getManageProjectType(customeruniqueId));
          }
        }
      )
    );
  };


  return (
    <>
      <div className="sticky -top-[8px] z-[1000000]">
        <div className="w-full bg-[#2e3339] static ">
          <div className="w-full flex justify-end gap-1 bg-[#3e454d] sticky top-0 z-[1000000]">
           
              <Button
                name={"Bulk Upload"}
                icon={""}
                classes={"w-auto my-auto"}
                onClick={() => {
                  setSelectFile(true);
                }}
              />
            <Button
              name={"Export"}
              icon={""}
              classes={"w-auto  my-auto"}
              onClick={() => {
                const fileName = page === "Compliance" ? "Export_Forms_Checklist_" + name + ".xlsx" : "Export_Project_Type_" + name + ".xlsx";
                dispatch(
                  CommonActions.commondownload("/export/Template/" + `${tabHead}` + "/" + `${rowId}`,fileName)
                );
              }}
            />

            {editing ? (
              <RoundedButton
                name={"Add"}
                icon={<UilSave />}
                classes={"w-auto rounded-full bg-yellow-600 my-auto"}
                onClick={() => {
                  // setlisting(prev => {
                  //   prev.push("")
                  //   return prev
                  // })

                  let newdte = listing.map((item, index) => {
                    return { ...item, index: index + 1 };
                  });

                  if (listing.length > 0) {
                    functioning(newdte, setediting);
                    // (prev => !prev)
                  } else {
                    let msgdata = {
                      show: true,
                      icon: "error",
                      buttons: [],
                      type: 1,
                      text: "Please add at least one row in template",
                    };
                    dispatch(ALERTS(msgdata));
                  }

                  // setediting(prev => !prev)
                }}
              />
            ) : (
              <RoundedButton
                name={"Add"}
                icon={<UilPen />}
                classes={"w-auto rounded-full bg-yellow-600 my-auto"}
                onClick={() => {
                  console.log("dasdasdas");

                  setediting((prev) => !prev);
                }}
              />
            )}

            {editing ? (
              <RoundedButton
                name={"Add"}
                icon={<UilPlusCircle />}
                classes={"w-auto rounded-full bg-rose-600 my-auto"}
                onClick={() => {
                  console.log("dasdasdas");
                  setedit((prev) => !prev);
                  newars["index"] = listing.length + 1;
                  dispatch(
                    SET_DYNAMIC_FORM({
                      label: tabHead,
                      value: { ...newars },
                      reseter: false,
                    })
                  );
                }}
              />
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
      <div className="mt-2">
        {editing ? (
          <TableJsonDynamic
            editing={editing}
            tabHead={tabHead}
            functioning={functioning}
            listing={listing}
            headers={Form.map((its) => {
              return its.label;
            })}
            columns={listing.map((itm, indexes) => {
              return Form.map((its, innerIndex) => {
                console.log(
                  itm[its.name],
                  "indexes",
                  itm,
                  indexes,
                  "innerIndex",
                  innerIndex,
                  "dsadadaitsitsitsits"
                );

                let propscheck = {};

                if (its.type == "select") {
                  propscheck = {
                    onChange: (e) => {
                      console.log(
                        e.target.value,
                        tabHead,
                        listing,
                        its,
                        "e.target.valuee.target.value"
                      );

                      if (e.target.value == "Dropdown") {
                        newars["childView"] = true;
                      }
                      const indexToUpdate = listing.findIndex(
                        (ite) => ite.index === itm.index
                      );

                      console.log(
                        indexToUpdate,
                        newars,
                        {
                          label: tabHead,
                          valer: its.name,
                          indexToUpdate: indexToUpdate,
                          value: { ...newars },
                          fieldNameValue: e.target.value,
                          reseter: false,
                        },
                        "newarsnewarsnewarsnewarsnewars"
                      );
                      dispatch(
                        SET_DYNAMIC_FORM_INDEX({
                          label: tabHead,
                          valer: its.name,
                          indexToUpdate: indexToUpdate,
                          value: { ...newars },
                          fieldNameValue: e.target.value,
                          reseter: false,
                        })
                      );

                      setedit((prev) => !prev);
                      // dispatch(SET_DYNAMIC_FORM({ label: tabHead, value: { ...newars }, reseter: false }))

                      // setlisting((prev) => {
                      //   const indexToUpdate = prev.findIndex((ite) => ite.index === itm.index);
                      //   console.log(indexToUpdate, "indexToUpdate")
                      //   const oldDataon = prev[indexToUpdate];

                      //   console.log(oldDataon, "oldDataonoldDataon")

                      //   console.log(oldDataon[its.name], "oldDataonoldDataononew")

                      //   const updatedData = {
                      //     ...oldDataon,
                      //     [its.name]: e.target.value // Assuming e.target.value is the new field value
                      //   };

                      //   const updatedListing = [...prev];
                      //   updatedListing[indexToUpdate] = updatedData;
                      //   console.log(updatedListing, "updatedDataupdatedData")
                      //   return updatedListing

                      //   return prev
                      // })

                      console.log(
                        itm.index,
                        e.target.value,
                        "dsadasdasdasdasd"
                      );
                    },
                  };
                } else {
                  propscheck = {
                    onBlur: (e) => {
                      // setValue(name,e.target.value)
                      // setedit(prev => !prev)
                      // setlisting((prev) => {
                      //   const indexToUpdate = prev.findIndex((ite) => ite.index === itm.index);
                      //   const oldDataon = prev[indexToUpdate];
                      //   const updatedData = {
                      //     ...oldDataon,
                      //     [its.name]: e.target.value // Assuming e.target.value is the new field value
                      //   };

                      //   const updatedListing = [...prev];
                      //   updatedListing[indexToUpdate] = updatedData;
                      //   console.log(updatedListing, "updatedDataupdatedData")
                      //   return updatedListing

                      //   return prev
                      // })

                      console.log(
                        e.target.value,
                        tabHead,
                        listing,
                        its,
                        "e.target.valuee.target.value"
                      );

                      const indexToUpdate = listing.findIndex(
                        (ite) => ite.index === itm.index
                      );

                      console.log(
                        indexToUpdate,
                        "indexToUpdateindexToUpdateindexToUpdate"
                      );
                      dispatch(
                        SET_DYNAMIC_FORM_INDEX({
                          label: tabHead,
                          valer: its.name,
                          indexToUpdate: indexToUpdate,
                          value: { ...newars },
                          fieldNameValue: e.target.value,
                          reseter: false,
                        })
                      );

                      setedit((prev) => !prev);

                      console.log(
                        itm.index,
                        e.target.value,
                        "dsadasdasdasdasd"
                      );
                    },
                  };
                }

                // console.log("its", itm[its.name], "itm", "itm[its.name]itm[its.name]")

                // console.log(listing.filter((ityt) => {
                //   if (ityt.fieldName == itm["fieldName"]) {
                //     return {
                //       "label": ityt.fieldName,
                //       "value": ityt.fieldName
                //     }
                //   }
                // }), itm["fieldName"], "listinglistinglisting")

                console.log(
                  itm,
                  its.name,
                  listing,
                  "listinglistinglistinglisting"
                );
                return {
                  [its.label]: (
                    <CreateFormField
                      Form={Form}
                      listing={listing}
                      itm={{
                        ...its,
                        name: its.name + itm.index,
                        value: itm[its.name],
                        oldValue: itm[its.name],
                        option:
                          its.name == "Predecessor"
                            ? listing
                                .filter((ityt) => {
                                  if (ityt.fieldName != itm["fieldName"]) {
                                    return ityt;
                                  }
                                })
                                .map((ityt) => {
                                  return {
                                    label: ityt.fieldName,
                                    value: ityt.fieldName,
                                  };
                                })
                            : its.option,
                        closeOnChangedValue: false,
                        props: propscheck,
                        inneroption:
                          listing.length > 0
                            ? listing
                                .filter((ityt) => {
                                  if (
                                    ityt["fieldName"] != "" &&
                                    ityt["fieldName"] != undefined
                                  ) {
                                    return ityt;
                                  }
                                })
                                .map((ityt) => {
                                  return {
                                    id: ityt.fieldName,
                                    name: ityt.fieldName,
                                  };
                                })
                            : [],

                        inneronSelect: (e) => {
                          let finalselection = e.map((itm) => {
                            return itm.id;
                          });

                          const indexToUpdate = listing.findIndex(
                            (ite) => ite.index === itm.index
                          );

                          // console.log(indexToUpdate,{ label: tabHead, valer: its.name, indexToUpdate: indexToUpdate, value: { ...newars }, fieldNameValue: e.target.value, reseter: false }, "431indexToUpdateindexToUpdateindexToUpdate")
                          dispatch(
                            SET_DYNAMIC_FORM_INDEX_INNER({
                              label: tabHead,
                              valer: its.name,
                              indexToUpdate: indexToUpdate,
                              value: {
                                dropdownValue: finalselection.join(","),
                              },
                            })
                          );

                          setedit((prev) => !prev);
                          // setValue(itm.name, finalselection.join())

                          // const indexToUpdate = listing.findIndex((ite) => ite.index === itm.index);
                          // console.log(finalselection,e, "onselection")
                          // console.log(indexToUpdate, "indexToUpdateindexToUpdateindexToUpdate")
                          // dispatch(SET_DYNAMIC_FORM_INDEX({ label: tabHead, valer: its.name, indexToUpdate: indexToUpdate, value: { ...newars }, fieldNameValue: finalselection.join(), reseter: false }))

                          // setedit(prev => !prev)
                        },
                        inneronRemove: (e) => {
                          let finalselection = e.map((itm) => {
                            return itm.id;
                          });
                          // setValue(itm.name, finalselection.join())
                          // console.log(e, "onselection")
                          console.log(finalselection, "onRemove");
                          const indexToUpdate = listing.findIndex(
                            (ite) => ite.index === itm.index
                          );

                          // console.log(indexToUpdate,{ label: tabHead, valer: its.name, indexToUpdate: indexToUpdate, value: { ...newars }, fieldNameValue: e.target.value, reseter: false }, "431indexToUpdateindexToUpdateindexToUpdate")
                          dispatch(
                            SET_DYNAMIC_FORM_INDEX_INNER({
                              label: tabHead,
                              valer: its.name,
                              indexToUpdate: indexToUpdate,
                              value: {
                                dropdownValue: finalselection.join(","),
                              },
                            })
                          );

                          setedit((prev) => !prev);

                          // const indexToUpdate = listing.findIndex((ite) => ite.index === itm.index);

                          // console.log(indexToUpdate, "indexToUpdateindexToUpdateindexToUpdate")
                          // dispatch(SET_DYNAMIC_FORM_INDEX({ label: tabHead, valer: its.name, indexToUpdate: indexToUpdate, value: { ...newars }, fieldNameValue: finalselection.join(), reseter: false }))

                          // setedit(prev => !prev)
                        },

                        onSelect: (e) => {
                          let finalselection = e.map((itm) => {
                            return itm.id;
                          });
                          // setValue(itm.name, finalselection.join())

                          const indexToUpdate = listing.findIndex(
                            (ite) => ite.index === itm.index
                          );
                          dispatch(
                            SET_DYNAMIC_FORM_INDEX({
                              label: tabHead,
                              valer: its.name,
                              indexToUpdate: indexToUpdate,
                              value: { ...newars },
                              fieldNameValue: finalselection.join(),
                              reseter: false,
                            })
                          );
                        },
                        onRemove: (e) => {
                          let finalselection = e.map((itm) => {
                            return itm.id;
                          });
                          // setValue(itm.name, finalselection.join())
                          // console.log(e, "onselection")
                          console.log(finalselection, "onRemove");

                          const indexToUpdate = listing.findIndex(
                            (ite) => ite.index === itm.index
                          );

                          console.log(
                            indexToUpdate,
                            "indexToUpdateindexToUpdateindexToUpdate"
                          );
                          dispatch(
                            SET_DYNAMIC_FORM_INDEX({
                              label: tabHead,
                              valer: its.name,
                              indexToUpdate: indexToUpdate,
                              value: { ...newars },
                              fieldNameValue: finalselection.join(),
                              reseter: false,
                            })
                          );

                          // setedit(prev => !prev)
                        },
                        innervalue: itm["dropdownValue"],
                        innerprops: {
                          onBlur: (e) => {
                            console.log(
                              e.target.value,
                              tabHead,
                              listing,
                              its,
                              "e.target.valuee.target.value"
                            );

                            const indexToUpdate = listing.findIndex(
                              (ite) => ite.index === itm.index
                            );

                            console.log(
                              indexToUpdate,
                              {
                                label: tabHead,
                                valer: its.name,
                                indexToUpdate: indexToUpdate,
                                value: { ...newars },
                                fieldNameValue: e.target.value,
                                reseter: false,
                              },
                              "431indexToUpdateindexToUpdateindexToUpdate"
                            );
                            dispatch(
                              SET_DYNAMIC_FORM_INDEX_INNER({
                                label: tabHead,
                                valer: its.name,
                                indexToUpdate: indexToUpdate,
                                value: { dropdownValue: e.target.value },
                              })
                            );

                            setedit((prev) => !prev);

                            console.log(
                              itm.index,
                              e.target.value,
                              "dsadasdasdasdasd"
                            );
                          },
                        },
                      }}
                      index={indexes}
                      errors={errors}
                      register={register}
                      setValue={setValue}
                      getValues={getValues}
                    />
                  ),
                };
              }).reduce((acc, obj) => {
                return { ...acc, ...obj };
              }, {});
            })}
          />
        ) : (
          <>
            <TableJson
              headers={Form.map((its) => {
                return its.label;
              })}
              columns={listing.map((itm, indexes) => {
                let newObj = {};

                console.log(itm, "itmitmitm");
                Form.forEach((its, innerIndex) => {
                  // console.log(its, itm, "its,itmits,itmits,itmits,itm");
                  newObj[its.label] = `${itm[its.name]} ${
                    (itm["dataType"] == "Auto Created" ||
                      itm["dataType"] == "Dropdown") &&
                    its.name == "dataType"
                      ? " ( " + itm["dropdownValue"] + " ) "
                      : ""
                  }`;
                });
                // Return the newly created object
                return newObj;
              })}
            />
          </>
        )}
      </div>
      

      <FileUploader
        isOpen={selectFile}
        setIsOpen={setSelectFile}
        fileUploadUrl={Urls.templateUploadFile}
        onTableViewSubmit={onTableViewSubmit}
        tempbtn={true}
        label={"Template"}
        tempbtnlink={[`${"/template"}/${tabHead}`, "Tempalte.xlsx"]}
      />
    </>
  );
};

export default CommonTableForm;
