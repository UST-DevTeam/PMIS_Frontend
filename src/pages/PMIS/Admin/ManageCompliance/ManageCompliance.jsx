import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Unicons from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import AdvancedTable from "../../../../components/AdvancedTable";
import Modal from "../../../../components/Modal";
import Button from "../../../../components/Button";
import DeleteButton from "../../../../components/DeleteButton";
import CstmButton from "../../../../components/CstmButton";
import {objectToQueryString,} from "../../../../utils/commonFunnction";
import { ALERTS } from "../../../../store/reducers/component-reducer";
import CommonActions from "../../../../store/actions/common-actions";
import { Urls, backendassetUrl, baseUrl } from "../../../../utils/url";
import AdminActions from "../../../../store/actions/admin-actions";
import { useNavigate, useParams } from "react-router-dom";
import CommonTableForm from "../../../../components/CommonTableForm";
import CommonTableFormSiteParent from "../../../../components/CommonTableFormSiteParent";
import { SET_DYNAMIC_FORM } from "../../../../store/reducers/projectList-reducer";
import ManageComplianceForm from "./ManageComplianceForm";
import { GET_MANAGE_CUSTOMER } from "../../../../store/reducers/admin-reducer";

const   ManageCompliance = () => {

  const { cname, customeruniqueId } = useParams();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setValues,
    getValues,
    formState: { errors },
  } = useForm();

  const [modalOpen, setmodalOpen] = useState(false);

  const [type, settype] = useState(false);
  const [modalHead, setmodalHead] = useState(<></>);
  const [modalSize, setmodalSize] = useState("full");
  const [uniqueness, setUniqueness] = useState("");
  const [listing, setlisting] = useState([]);

  let dispatch = useDispatch();




  let conditionmultiForm = [
    {
      label: "Field Name",
      name: "fieldName",
      value: "",
      type: "text",
      props: "",
      required: false,
      placeholder: "",
    },
    {
      label: "Mandatory(Y/N)",
      name: "required",
      value: "Select",
      type: "select",
      option: [
        {
          label: "Yes",
          value: "Yes",
        },
        {
          label: "No",
          value: "No",
        },
      ],
      props: "",
      required: false,
      placeholder: "",
    },
    {
      label: "Input Type",
      name: "dataType",
      value: "Select",
      innerSmart: true,
      type: "select",
      option: [
        {
          label: "Text",
          value: "Text",
        },
        {
          label: "Number",
          value: "Number",
        },
        {
          label: "Decimal",
          value: "Decimal",
        },
        {
          label: "Date",
          value: "Date",
        },
        {
          label: "Dropdown",
          value: "Dropdown",
          extended: {
            typer: "add",
            type: "text",
            option: [],
          },
        },
      ],
      props: "",
      required: false,
      placeholder: "",
    },
    {
      label: "Status",
      name: "Status",
      value: "Select",
      type: "select",
      option: [
        {
          label: "Active",
          value: "Active",
        },
        {
          label: "Inactive",
          value: "Inactive",
        },
      ],
      props: "",
      required: false,
      placeholder: "",
    },
  ];





  const handleAddActivity = (res, sediting, targ, itm) => {
    // console.log(res, "sediting", sediting, targ,itm,"uniqueness", "handleAddActivity");
    let newdata = {
      [targ]: res,
    };

    dispatch(
      AdminActions.patchCompiliance(true, itm.uniqueId, newdata, () => {
        sediting((prev) => !prev);
        dispatch(AdminActions.getCompiliance());
      })
    );
  };

  const [modalBody, setmodalBody] = useState(<></>);

  let dbConfigList = useSelector((state) => {
    let interdata = state?.adminData?.getCompiliance;
    return interdata?.map((itm) => {
      let updateditm = {
        ...itm,

        checkList: (
          <CstmButton
            className={"p-2"}
            child={
              <Button
                classes="w-10"
                name={""}
                icon={<Unicons.UilFileCheck />}
                onClick={() => {
                  setUniqueness((prev) => itm.uniqueId);
                  setmodalOpen(true);
                  setmodalSize("full");
                  setmodalHead("Compliance Form");
                  dispatch(SET_DYNAMIC_FORM({ label: "Template", value: itm["Template"] ? itm["Template"] : [], reseter: true }));
                  dispatch(
                    SET_DYNAMIC_FORM({
                      label: "Planning Details",
                      value: itm["planDetails"] ? itm["planDetails"] : [],
                      reseter: true,
                    })
                  );
                  dispatch(
                    SET_DYNAMIC_FORM({
                      label: "Site Details",
                      value: itm["siteDetails"] ? itm["siteDetails"] : [],
                      reseter: true,
                    })
                  );
                  dispatch(
                    SET_DYNAMIC_FORM({
                      label: "Checklist",
                      value: itm["ranChecklist"] ? itm["ranChecklist"] : [],
                      reseter: true,
                    })
                  );
                  dispatch(
                    SET_DYNAMIC_FORM({
                      label: "Snap",
                      value: itm["snap"] ? itm["snap"] : [],
                      reseter: true,
                    })
                  );
                  dispatch(
                    SET_DYNAMIC_FORM({
                      label: "Acceptance Log",
                      value: itm["acceptanceLog"] ? itm["acceptanceLog"] : [],
                      reseter: true,
                    })
                  );
                  setmodalBody(
                    <>
                      <div className="flex flex-col justify-between p-2">
                        <div class="overflow-scroll">
                        </div>
                      </div>
                      <CommonTableFormSiteParent
                        funcaller={() => { }}
                        defaultValue={"Template"}
                        tabslist={{
                          "Template": (
                            <CommonTableForm
                              setmodalOpen={setmodalOpen}
                              tabHead={"Template"}
                              customeruniqueId={customeruniqueId}
                              classes={"grid-cols-2 gap-1"}
                              Form={conditionmultiForm}
                              errors={errors}
                              register={register}
                              setValue={setValue}
                              getValues={getValues}
                              functioning={(res, changeState) =>
                                handleAddActivity(
                                  res,
                                  changeState,
                                  "Template",
                                  itm
                                )
                              }
                              oldList={[]}
                              listing={listing}
                              setlisting={setlisting}
                              rowId={itm["uniqueId"]}
                              name={"Tempalte"}
                              page={"Compliance"}

                            />
                          ),
                          "Planning Details": (
                            <CommonTableForm
                              setmodalOpen={setmodalOpen}
                              tabHead={"Planning Details"}
                              customeruniqueId={customeruniqueId}
                              classes={"grid-cols-2 gap-1"}
                              Form={conditionmultiForm}
                              errors={errors}
                              register={register}
                              setValue={setValue}
                              getValues={getValues}
                              functioning={(res, changeState) =>
                                handleAddActivity(
                                  res,
                                  changeState,
                                  "planDetails",
                                  itm
                                )
                              }
                              oldList={[]}
                              listing={listing}
                              setlisting={setlisting}
                              rowId={itm["uniqueId"]}
                              name={"Tempalte"}
                              page={"Compliance"}

                            />
                          ),
                          "Site Details": (
                            <CommonTableForm
                              setmodalOpen={setmodalOpen}
                              tabHead={"Site Details"}
                              customeruniqueId={customeruniqueId}
                              classes={"grid-cols-2 gap-1"}
                              Form={conditionmultiForm}
                              errors={errors}
                              register={register}
                              setValue={setValue}
                              getValues={getValues}
                              functioning={(res, changeState) =>
                                handleAddActivity(
                                  res,
                                  changeState,
                                  "siteDetails",
                                  itm
                                )
                              }
                              oldList={[]}
                              listing={listing}
                              setlisting={setlisting}
                              rowId={itm["uniqueId"]}
                              name={"Tempalte"}
                              page={"Compliance"}
                            />
                          ),
                          "Checklist": (
                            <CommonTableForm
                              setmodalOpen={setmodalOpen}
                              tabHead={"Checklist"}
                              customeruniqueId={customeruniqueId}
                              classes={"grid-cols-2 gap-1"}
                              Form={conditionmultiForm}
                              errors={errors}
                              register={register}
                              setValue={setValue}
                              getValues={getValues}
                              functioning={(res, changeState) =>
                                handleAddActivity(
                                  res,
                                  changeState,
                                  "ranChecklist",
                                  itm
                                )
                              }
                              oldList={[]}
                              listing={listing}
                              setlisting={setlisting}
                              rowId={itm["uniqueId"]}
                              name={"Tempalte"}
                              page={"Compliance"}
                            />
                          ),
                          Snap: (
                            <CommonTableForm
                              setmodalOpen={setmodalOpen}
                              tabHead={"Snap"}
                              customeruniqueId={customeruniqueId}
                              classes={"grid-cols-2 gap-1"}
                              Form={conditionmultiForm}
                              errors={errors}
                              register={register}
                              setValue={setValue}
                              getValues={getValues}
                              functioning={(res, changeState) =>
                                handleAddActivity(
                                  res,
                                  changeState,
                                  "snap",
                                  itm
                                )
                              }
                              oldList={[]}
                              listing={listing}
                              setlisting={setlisting}
                              rowId={itm["uniqueId"]}
                              name={"Tempalte"}
                              page={"Compliance"}
                            />
                          ),
                          "Acceptance Log": (
                            <CommonTableForm
                              setmodalOpen={setmodalOpen}
                              tabHead={"Acceptance Log"}
                              customeruniqueId={customeruniqueId}
                              classes={"grid-cols-2 gap-1"}
                              Form={conditionmultiForm}
                              errors={errors}
                              register={register}
                              setValue={setValue}
                              getValues={getValues}
                              functioning={(res, changeState) =>
                                handleAddActivity(
                                  res,
                                  changeState,
                                  "acceptanceLog",
                                  itm
                                )
                              }
                              oldList={[]}
                              listing={listing}
                              setlisting={setlisting}
                              rowId={itm["uniqueId"]}
                              name={"Tempalte"}
                              page={"Compliance"}
                            />
                          ),
                        }}
                      />
                    </>
                  );
                }}
              ></Button>
            }
          />
        ),
        // template: (
        //   <CstmButton
        //     className={"p-2"}
        //     child={
        //       <Button
        //         classes="w-10"
        //         name={""}
        //         icon={<Unicons.UilAirplay />}
        //         onClick={() => {
        //           setmodalOpen(true);
        //           setmodalSize("full");
        //           setmodalHead("Template");

        //           dispatch(SET_DYNAMIC_FORM({ label: "Template", value: itm["Template"] ? itm["Template"] : [], reseter: true }));
        //           setmodalBody(
        //             <>
        //               <CommonTableForm
        //                 setmodalOpen={setmodalOpen}
        //                 tabHead={"Template"}
        //                 customeruniqueId={customeruniqueId}
        //                 classes={"grid-cols-2 gap-1"}
        //                 Form={conditionmultiForm}
        //                 errors={errors}
        //                 register={register}
        //                 setValue={setValue}
        //                 getValues={getValues}
        //                 functioning={(res, changeState) =>
        //                   handleAddActivity(res, changeState, "Template", itm)
        //                 }
        //                 oldList={[]}
        //                 listing={listing}
        //                 setlisting={setlisting}
        //                 rowId={itm["uniqueId"]}
        //                 name={"Tempalte"}
        //               />
        //             </>
        //           );
        //         }}
        //       ></Button>
        //     }
        //   />
        // ),
        
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
                              `${Urls.addComplianceForm}/${itm.uniqueId}`,
                              () => {
                                dispatch(AdminActions.getCompiliance());
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
    let interdata = state?.adminData?.getCompiliance;
    if (interdata.length > 0) {
      return interdata[0]["overall_table_count"];
    } else {
      return 0;
    }
  });

  let table = {
    columns: [
      {
        name: "Customer",
        value: "customerName",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Project Type",
        value: "projectType",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Sub Project",
        value: "subProjectName",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Activity",
        value: "activity",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "OEM",
        value: "oem",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Milestone",
        value: "complianceMilestone",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Checklist",
        value: "checkList",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      // {
      //   name: "Template",
      //   value: "template",
      //   style: "min-w-[140px] max-w-[200px] text-center",
      // },
      {
        name: "Delete",
        value: "delete",
        style: "min-w-[100px] max-w-[200px] text-center",
      },
    ],
    properties: {
      rpp: [10, 20, 50, 100],
    },
    filter: [],
  };

  const onSubmit = (data) => {
    let value = data.reseter;
    delete data.reseter;
    dispatch(AdminActions.getCompiliance(value, objectToQueryString(data)));
  };


  useEffect(() => {
    dispatch(AdminActions.getCompiliance());
  }, []);




  return  (
    <>
      <AdvancedTable
        headerButton={
          <>
            <Button
              onClick={(e) => {
                setmodalOpen((prev) => !prev);
                setmodalHead("New Compliance");
                setmodalSize("sm");
                dispatch(GET_MANAGE_CUSTOMER({dataAll:[],reset:true}))
                setmodalBody(
                  <ManageComplianceForm
                    customeruniqueId={customeruniqueId}
                    isOpen={modalOpen}
                    setIsOpen={setmodalOpen}
                    resetting={true}
                    formValue={{}}
                  />
                );
              }}
              name={"Add Compliance"}
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
        heading = {'Total Count :- '}
        actions={["Delete"]}
      />

      <Modal
        size={modalSize}
        modalHead={modalHead}
        children={modalBody}
        isOpen={modalOpen}
        setIsOpen={setmodalOpen}
      />
    </>
  ) 
};

export default ManageCompliance;
