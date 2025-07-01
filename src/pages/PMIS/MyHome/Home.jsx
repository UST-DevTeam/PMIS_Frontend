import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Unicons from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import EditButton from "../../../components/EditButton";
import ManageCustomerForm from "../../PMIS/Admin/ManageCustomer/ManageCustomerForm";
import AdvancedTable from "../../../components/AdvancedTable";
import Modal from "../../../components/Modal";
import Button from "../../../components/Button";
import DeleteButton from "../../../components/DeleteButton";
import CstmButton from "../../../components/CstmButton";
import ToggleButton from "../../../components/ToggleButton";
import { objectToQueryString } from "../../../utils/commonFunnction";
import { ALERTS } from "../../../store/reducers/component-reducer";
import CommonActions from "../../../store/actions/common-actions";
import { Urls, backendassetUrl, baseUrl } from "../../../utils/url";
import OperationManagementActions from "../../../store/actions/admin-actions";
import MyHomeActions from "../../../store/actions/myHome-actions";
import ComponentActions from "../../../store/actions/component-actions";

import { useNavigate, useParams } from "react-router-dom";
import CCDash from "../../../components/CCDash";

const MyHome = () => {
  const [modalOpen, setmodalOpen] = useState(false);
  const [modalBody, setmodalBody] = useState(<></>);
  const [type, settype] = useState(false);
  const [modalHead, setmodalHead] = useState(<></>);

  let dispatch = useDispatch();

  let navigate = useNavigate();

  let dbConfigList = useSelector((state) => {
    console.log(state, "state statejjjj");
    let interdata = state?.myHomeData?.getMyHome;
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
        edit: (
          <CstmButton
            className={"p-2"}
            child={
              <EditButton
                name={""}
                onClick={() => {
                  setmodalOpen(true);
                  dispatch(MyHomeActions.getMyHome());
                  setmodalHead("Edit Customer Details");
                  setmodalBody(
                    <>
                      <ManageCustomerForm
                        isOpen={modalOpen}
                        setIsOpen={setmodalOpen}
                        resetting={false}
                        formValue={itm}
                      />
                      {/* <div className='mx-3'><Button name={"Submit"} classes={""} onClick={(handleSubmit(onTableViewSubmit))} /></div> */}
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
                        classes='w-15 bg-rose-400'
                        onClick={() => {
                          dispatch(
                            CommonActions.deleteApiCaller(
                              `${Urls.MyHome}/${itm.uniqueId}`,
                              () => {
                                dispatch(MyHomeActionsActions.getMyHome());
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

        view: (
          <CstmButton
            className={"p-5"}
            child={
              <Button
                name={""}
                onClick={() => {
                  setmodalOpen(true);
                  setmodalHead("Show PDF");
                  setmodalBody(
                    <>
                      {/* <div className='mx-3'><Button name={"Submit"} classes={""} onClick={(handleSubmit(onTableViewSubmit))} /></div> */}
                    </>
                  );
                }}
              ></Button>
            }
          />
        ),
      };
      return updateditm;
    });
  });
  let dbConfigTotalCount = useSelector((state) => {
    let interdata = state?.myHomeData?.getMyHome;
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
        name: "Logo",
        value: "imgshow",
        style: "min-w-[140px] max-w-[200px] text-center sticky left-0 bg-white",
      },
      {
        name: "Customer Name",
        value: "customerName",
        style: "min-w-[250px] max-w-[450px] text-center sticky left-0 bg-white",
      },
      {
        name: "Short Name",
        value: "shortName",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Contact Person name",
        value: "personName",
        style: "min-w-[250px] max-w-[450px] text-center",
      },
      {
        name: "Email ID",
        value: "email",
        style: "min-w-[250px] max-w-[450px] text-center",
      },
      {
        name: "Mobile No.",
        value: "mobile",
        style: "min-w-[250px] max-w-[450px] text-center",
      },
      {
        name: "Address",
        value: "address",
        style: "min-w-[250px] max-w-[450px] text-center",
      },
      {
        name: "Status",
        value: "status",
        style: "min-w-[250px] max-w-[450px] text-center",
      },
      {
        name: "Edit",
        value: "edit",
        style: "min-w-[100px] max-w-[100px] text-center",
      },
      {
        name: "Delete",
        value: "delete",
        style: "min-w-[100px] max-w-[100px] text-center",
      },
      {
        name: "View",
        value: "view",
        style: "min-w-[100px] max-w-[100px] text-center",
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
    dispatch(MyHomeActions.getMyHome(value, objectToQueryString(data)));
  };

  const navigateToRoute = (uniqueId) => {
    if (uniqueId === 101) {
      navigate("/personalInfo");
    } else if (uniqueId === 102) {
      navigate("/claim&Reimbursement");
    } else if (uniqueId === 103) {
      navigate("/assets");
    } else if (uniqueId === 104) {
      navigate("/approvals");
    } else if (uniqueId === 105) {
      navigate("/approvals");
    }
  };

  useEffect(() => {
    dispatch(MyHomeActions.getMyHome());

    dispatch(ComponentActions.breadcrumb("Home", "/home", 0, true));
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
                setmodalHead("Add Customer");
                setmodalBody(
                  <ManageCustomerForm
                    isOpen={modalOpen}
                    setIsOpen={setmodalOpen}
                    resetting={true}
                    formValue={{}}
                  />
                );
              }}
              name={"Add New"}
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
      {/* <CCDash approveddata={
                dbConfigList?.map((itm => {
                    return <>
                        <div
                            className='bg-pink-100 shadow-md hover:shadow-rxl w-[98%] flex h-24 cursor-pointer rounded-lg hover:scale-[102%] transition-all duration-500 font-oxygen font-bold  hover:text-lg  '
                            onClick={() => {
                                navigate(`${"/projectType"}/${itm["uniqueId"]}`)
                            }}>
                            {itm["companyimg"] && itm["companyimg"] != "" && <><img className='m-auto w-24' src={backendassetUrl + itm["companyimg"]} /></>}
                            <div className='m-auto '>{itm["customerName"]}</div>
                        </div>
                    </>
                }))
            } settype={settype} nextNavigate={"/projectType"} name={"customerName"} img={"companyimg"} data={dbConfigList} url="/list/manageCustomer" label='Add / Modify Customer' /> */}

      <CCDash
        showbtn={false}
        approveddata={dbConfigList?.map((itm) => {
          return (
            <>
              <div
                className="bg-gradient-to-r from-indigo-500/50 to-green-500/50 shadow-md hover:shadow-rxl w-[98%] flex h-24 cursor-pointer rounded-lg hover:scale-[102%] transition-all duration-500 font-oxygen font-bold  hover:text-lg  "
                onClick={() => {

                  dispatch(
                    ComponentActions.globalUrlStore(
                      itm["name"],
                      itm.uniqueId
                    )
                  );
                  dispatch(
                    ComponentActions.breadcrumb(itm["name"], itm.uniqueId, 1, false)
                  );
                  navigateToRoute(itm.uniqueId);
                }}
              >
                {/* {itm["companyimg"] && itm["companyimg"] != "" && <><img className='m-auto w-24' src={backendassetUrl + itm["companyimg"]} /></>} */}
                <div className="m-auto">{itm["name"]}</div>
              </div>
            </>
          );
        })}
      />
    </>
  );
};

export default MyHome;
