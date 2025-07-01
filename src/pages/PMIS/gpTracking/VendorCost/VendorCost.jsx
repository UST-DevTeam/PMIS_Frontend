import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import AdvancedTable from "../../../../components/AdvancedTable";
import Modal from "../../../../components/Modal";
import Button from "../../../../components/Button";
import DeleteButton from "../../../../components/DeleteButton";
import CstmButton from "../../../../components/CstmButton";
import { objectToQueryString } from "../../../../utils/commonFunnction";
import FileUploader from "../../../../components/FIleUploader";
import { ALERTS } from "../../../../store/reducers/component-reducer";
import CommonActions from "../../../../store/actions/common-actions";
import { Urls } from "../../../../utils/url";
import AdminActions from "../../../../store/actions/admin-actions";
import EditButton from "../../../../components/EditButton";
import VendorActions from "../../../../store/actions/vendor-actions";
import gpTrackingActions from "../../../../store/actions/gpTrackingActions";
import VendorCostForm from "./VendorCostForm";

const VendorCost = () => {

  const [fileOpen, setFileOpen] = useState(false)
  const [modalOpen, setmodalOpen] = useState(false);
  const [modalBody, setmodalBody] = useState(<></>);
  const [modalHead, setmodalHead] = useState(<></>);
  const [strValFil, setstrVal] = useState(false);
  let dispatch = useDispatch();

  let dbConfigList = useSelector((state) => {
    let interdata = state?.vendorData?.getVendorCostMilestone || [];
    return interdata?.map((itm) => {
      let updateditm = {
        ...itm,
        edit: (
          <CstmButton
            className={"p-2"}
            child={
              <EditButton
                name={""}
                onClick={() => {
                  setmodalOpen(true);
                  setmodalHead("Edit Master Rate");
                  setmodalBody(
                    <>
                      <VendorCostForm
                        isOpen={modalOpen}
                        setIsOpen={setmodalOpen}
                        resetting={false}
                        formValue={itm}
                        filtervalue={strValFil}
                        id={itm}
                      />
                    </>
                  );
                }}
              ></EditButton>
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
                        classes="w-15 bg-rose-400"
                        onClick={() => {
                          dispatch(
                            CommonActions.deleteApiCaller(
                              `${Urls.admin_profile}/${itm.uniqueId}`,
                              () => {
                                dispatch(
                                  AdminActions.getAccuralRevenueMasterProject()
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
    let interdata = state?.vendorData?.getVendorCostMilestone || [];
    if (interdata.length > 0) {
      return interdata[0]["overall_table_count"];
    } else {
      return 0;
    }
  });

  let customerList = useSelector((state) => {
    return state?.gpTrackingReducer?.getCustomer.map((itm) => {
      return {
        label: itm?.customer,
        value: itm?.uniqueId,
      };
    });
  });

  let projectTypeList = useSelector((state) => {
    return state?.vendorData?.getVendorCostSubProjectTypeList.map((itm) => {
      return {
        label: itm.projectType,
        value: itm.uid,
      };
    });
  });

  let projectGroupList = useSelector((state) => {
    return state?.vendorData?.getVendorCostProjetGroupList.map((itm) => {
      return {
        label: itm.projectType,
        value: itm.uid,
      };
    });
  });

  let subProjectTypeList = useSelector((state) => {
    return state?.vendorData?.getVendorCostSubProjectTypeList.map((itm) => {
      return {
        label: itm.projectType,
        value: itm.uid,
      };
    });
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

  const onTableViewSubmit = (data) => {
    data["fileType"] = "vendorCost"
    // data['collection'] = "vendorCost"
    dispatch(CommonActions.fileSubmit(Urls.common_file_uploadr, data, () => {
      dispatch(AdminActions.getManageZone())
      setFileOpen(false)
    }))
  }

  let table = {
    columns: [
      {
        name: "Customer",
        value: "customer",
        style: "min-w-[100px] max-w-[200px] text-center sticky",
      },
      {
        name: "Project Group",
        value: "projectGroupName",
        style: "min-w-[140px] max-w-[200px] text-center sticky",
      },
      {
        name: "Project Type",
        value: "projectType",
        style: "min-w-[100px] max-w-[200px] text-center sticky",
      },

      {
        name: "Sub Project",
        value: "subProject",
        style: "min-w-[140px] max-w-[200px] text-center sticky",
      },

      {
        name: "Activity Name",
        value: "activityName",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Customer Item Code",
        value: "customerItemCode",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Vendor Item Code",
        value: "itemCode",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Item Code Description",
        value: "itemCodeDescription",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "GBPA",
        value: "GBPA",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Milestone",
        value: "milestone",
        style: "min-w-[170px] max-w-[250px] text-center",
      },
      {
        name: "Vendor Name",
        value: "vendorName",
        style: "min-w-[200px] max-w-[300px] text-center",
      },
      {
        name: "Vendor code",
        value: "vendorCode",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Rate",
        value: "rate",
        style: "min-w-[140px] max-w-[200px] text-center",
      },

      {
        name: "Edit",
        value: "edit",
        style: "min-w-[100px] max-w-[200px] text-center",
      },
      // {
      //     name: "Delete",
      //     value: "delete",
      //     style: "min-w-[100px] max-w-[200px] text-center"
      // }
    ],
    properties: {
      rpp: [10, 20, 50, 100],
    },
    filter: [
      {
        label: "Project Type",
        type: "select",
        name: "projectType",
        option: projectTypeList,
        props: {},
      },
      {
        label: "Project ID",
        type: "text",
        name: "projectId",
        props: {},
      },
    ],
  };

  const onSubmit = (data) => {
    delete data.rolename;
    delete data.sub;
    let shouldReset = data.reseter;
    delete data.reseter;
    console.log(data, "duuhjuhuhuhruiru");
    let strVal = objectToQueryString(data);
    setstrVal(strVal);
    dispatch(
      AdminActions.getAccuralRevenueMasterProject(
        true,
        objectToQueryString(data)
      )
    );
  };

  useEffect(() => {
    dispatch(gpTrackingActions.getGPCustomer());
    dispatch(VendorActions.getVendorCostMilestone());
    // dispatch(AdminActions.getAccuralRevenueMasterProject());
    // dispatch(AdminActions.getAccuralRevenueMasterProjectType());
    // dispatch(AdminActions.getAccuralRevenueMasterProjectID());
    // dispatch(AdminActions.getAccuralRevenueMasterSubProjectType())
    // dispatch(FilterActions.getfinancialWorkDoneProjectType(true,"",0));
  }, []);

  const onTableViewSubmit3 = (data) => {
    data["fileType"] = "UploadAccuralRevenueMaster";
    dispatch(
      CommonActions.fileSubmit(Urls.common_file_uploadr, data, () => {
        dispatch(AdminActions.getAccuralRevenueMasterProject());
        setFileOpen(false);
        resetting("");
      })
    );
  };
  return (
    <>
      <AdvancedTable
        headerButton={
          <div className="flex gap-1">
            <Button
              name={"Add New"}
              classes="w-auto"
              onClick={(e) => {
                setmodalOpen((prev) => !prev);
                setmodalHead("Add Master Rate");
                setmodalBody(
                  <VendorCostForm
                    isOpen={modalOpen}
                    setIsOpen={setmodalOpen}
                    resetting={true}
                    formValue={{}}
                  />
                );
              }}
            ></Button>
            <Button
              name={"Upload"}
              classes="w-auto"
              onClick={(e) => { setFileOpen((prev) => !prev); }}>
            </Button>
            <Button
              name={"Export"}
              classes="w-auto"
              onClick={() => {
                // dispatch(CommonActions.commondownload("/export/vendorCost","Export_VendorCost.xlsx"))
                dispatch(
                  CommonActions.commondownloadpost(
                    "/export/vendorCost",
                    "Export_VendorCost.xlsx",
                    "POST",
                    {}
                  )
                );
              }}
            ></Button>
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
        totalCount={dbConfigTotalCount}
        heading={"Total Count :-  "}
      />
      <Modal
        size={"sm"}
        modalHead={modalHead}
        children={modalBody}
        isOpen={modalOpen}
        setIsOpen={setmodalOpen}
      />
      <FileUploader
        isOpen={fileOpen}
        fileUploadUrl={""}
        onTableViewSubmit={onTableViewSubmit3}
        setIsOpen={setFileOpen}
        tempbtn={true}
        tempbtnlink={[
          "/template/AccuralRevenueMaster.xlsx",
          "AccuralRevenueMaster.xlsx",
        ]}
        head={"Upload File"}
      />
      <FileUploader isOpen={fileOpen} fileUploadUrl={""} onTableViewSubmit={onTableViewSubmit} setIsOpen={setFileOpen} tempbtn={true} tempbtnlink={["/template/VendorCost.xlsx", "Vendor Cost.xlsx"]} />
    </>
  );
};
export default VendorCost;