import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Unicons from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import EditButton from "../../../../components/EditButton";
import ManageCustomerForm from "../../../PMIS/Admin/ManageCustomer/ManageCustomerForm";
import AdvancedTable from "../../../../components/AdvancedTable";
import Modal from "../../../../components/Modal";
import Button from "../../../../components/Button";
import DeleteButton from "../../../../components/DeleteButton";
import CstmButton from "../../../../components/CstmButton";
import {getAccessType,objectToQueryString} from "../../../../utils/commonFunnction";
import { ALERTS } from "../../../../store/reducers/component-reducer";
import CommonActions from "../../../../store/actions/common-actions";
import { Urls, backendassetUrl} from "../../../../utils/url";
import AdminActions from "../../../../store/actions/admin-actions";
import { useNavigate, useParams } from "react-router-dom";
import CCDash from "../../../../components/CCDash";
import ConditionalButton from "../../../../components/ConditionalButton";
import ComponentActions from "../../../../store/actions/component-actions";
import ProjectChart from "../../Dashboard1/ProjectChart";
import TotalActiveCustomer from "../../Dashboard1/TotalActiveCustomer";

const ManageCustomer = () => {
  const [modalOpen, setmodalOpen] = useState(false);
  const [modalBody, setmodalBody] = useState(<></>);
  const [type, settype] = useState(false);
  const [modalHead, setmodalHead] = useState(<></>);

  let dispatch = useDispatch();

  let navigate = useNavigate();

  let showType1 = getAccessType("Total Active Projects(Graph)")
  let showType2 = getAccessType("Total Active Customers(Graph)")
  let graph1 = false
  let graph2 = false
  if (showType1 === "visible"){
    graph1 = true
  }
  if (showType2 === "visible"){
    graph2 = true
  }

  const currentDate = new Date();
  const dt = currentDate
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    .replace(/\//g, "-");

  let dbConfigList = useSelector((state) => {
    let interdata = state?.adminData?.getManageCustomer;
    return interdata?.map((itm) => {
      let updateditm = {
        ...itm,

        imgshow: (
          <div className="flex justify-center items-center">
            <img
              src={backendassetUrl + itm?.companyimg}
              className="w-24 h-14 content-center flex object-contain"
            />
          </div>
        ),
        shortName: <span className="text-pcol font-extrabold">{itm.shortName}</span>,
        edit: (
          <CstmButton
            className={"p-2"}
            child={
              <EditButton
                name={""}
                onClick={() => {
                  setmodalOpen(true);
                  dispatch(AdminActions.getManageCustomer());
                  setmodalHead("Edit Customer Details");
                  setmodalBody(
                    <>
                      <ManageCustomerForm
                        isOpen={modalOpen}
                        setIsOpen={setmodalOpen}
                        resetting={false}
                        formValue={itm}
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
                        classes='w-15 bg-rose-400'
                        onClick={() => {
                          dispatch(
                            CommonActions.deleteApiCaller(
                              `${Urls.admin_customer}/${itm.uniqueId}`,
                              () => {
                                dispatch(AdminActions.getManageCustomer());
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
    let interdata = state?.adminData?.getManageCustomer;
    if (interdata.length > 0) {
      return interdata[0]["overall_table_count"];
    } else {
      return 0;
    }
  });



  let dbConfiglist2 = useSelector((state) => {
    let interdata = state?.adminData?.getCardCustomer;
    return interdata
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

  let table = {
    columns: [
      {
        name: "Logo",
        value: "imgshow",
        style: "min-w-[120px] max-w-[200px] text-center",
      },
      {
        name: "Customer Name",
        value: "customerName",
        style: "min-w-[130px] max-w-[450px] text-center sticky left-[0px] z-10 bg-[#3e454d]",
      },
      {
        name: "Short Name",
        value: "shortName",
        style: "min-w-[110px] max-w-[200px] text-center",
      },
      {
        name: "Contact Person name",
        value: "personName",
        style: "min-w-[140px] max-w-[450px] text-center",
      },
      {
        name: "Email ID",
        value: "email",
        style: "min-w-[190px] max-w-[450px] text-center",
      },
      {
        name: "Mobile No.",
        value: "mobile",
        style: "min-w-[110px] max-w-[450px] text-center",
      },
      {
        name: "Address",
        value: "address",
        style: "min-w-[250px] max-w-[450px] text-center",
      },
      {
        name: "Index",
        value: "index",
        style: "min-w-[70px] max-w-[70px] text-center",
      },
      {
        name: "Status",
        value: "status",
        style: "min-w-[100px] max-w-[450px] text-center",
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
      }
    ],
    properties: {
      rpp: [10, 20, 50, 100],
    },
    filter: [],
  };
  const onSubmit = (data) => {
    let value = data.reseter;
    delete data.reseter;
    dispatch(AdminActions.getManageCustomer(value, objectToQueryString(data)));
  };

  useEffect(() => {
    dispatch(AdminActions.getManageCustomer());
    dispatch(AdminActions.getCardCustomer())
    dispatch(ComponentActions.breadcrumb("Project Management", "/manageCustomer", 0, true));
  }, []);

  const hasCards = dbConfiglist2 && dbConfiglist2.length > 0;

  return type ? (
    <>
      <div className="flex p-2">
        <ConditionalButton
          showType={getAccessType("Customer Page View")}
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
              classes="mr-1"
              onClick={(e) => {
                setmodalOpen((prev) => !prev);
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
              name={"Add Customer"}
            ></Button>
          </>
        }
        table={table}
        exportButton={["/export/manageCustomer","Export_Customer(" + dt + ").xlsx"]}
        filterAfter={onSubmit}
        tableName={"UserListTable"}
        handleSubmit={handleSubmit}
        data={dbConfigList}
        errors={errors}
        register={register}
        setValue={setValue}
        getValues={getValues}
        totalCount={dbConfigTotalCount}
        heading = {"Total Customers:-"}
      />

      <Modal
        size={"sm"}
        modalHead={modalHead}
        children={modalBody}
        isOpen={modalOpen}
        setIsOpen={setmodalOpen}
      />
    </>
  ) : (
    <>
       {/* <div className="absolute w-full top-12 mt-12 h-1/4 z-10 bg-[#3e454d] overflow-auto"> */}
       <div className={`absolute w-full ${hasCards ? "top-12 mt-12" : "top-0"} h-full  z-10 bg-[#3e454d] overflow-auto`}>
       {/* <CCDash
        approveddata={dbConfiglist2?.map((itm) => {
          return (
            <>
              <div
                className="bg-pcol text-white shadow-md hover:shadow-rxl w-full sm:w-11/12 md:w-5/6 lg:w-3/4 xl:w-full flex h-14 cursor-pointer rounded-lg hover:scale-[102%] transition-all duration-500 font-oxygen font-bold hover:text-lg hover:bg-pcolhover hover:text-[#4a525b]"
                onClick={() => {
                  dispatch(
                    ComponentActions.globalUrlStore(itm["customerName"], `${"/projectManagement"}/${itm["customerName"]}/${itm["uniqueId"]}`)
                  );
                  navigate(`${"/projectManagement"}/${itm["customerName"]}/${itm["uniqueId"]}`);
                }}
              >
                {itm["companyimg"] && itm["companyimg"] != "" && (
                  <>
                    <img
                      className="m-auto w-[40px] rounded-md hover:border-b-slate-600 border-b-[2px] border-b-slate-700"
                      src={backendassetUrl + itm["companyimg"]}
                    />
                  </>
                )}
                <div className="m-auto text-[16px] sm:text-[8px] md:text-[10px] xl:text-[16px]">{itm["customerName"]}</div>
              </div>
            </>
          );
        })}
        settype={settype}
        label="Add/Modify Customer"
      /> */}
      <CCDash
      

      
          approveddata={[...dbConfiglist2]?.sort((a,b) => +a.index - +b.index).map((itm) => {
            return (
              <>
                <div
                  className="bg-pcol text-white text-center shadow-md hover:shadow-rxl w-full sm:w-11/12 md:w-5/6 lg:w-3/4 xl:w-full flex h-14 cursor-pointer rounded-lg hover:scale-[102%] transition-all duration-500 font-oxygen font-bold hover:text-lg hover:bg-pcolhover hover:text-[#4a525b]"
                  onClick={() => {
                    dispatch(
                      ComponentActions.globalUrlStore(
                        itm["customerName"],
                        itm["index"],
                        `${"/projectManagement"}/${itm["customerName"]}/${
                          itm["uniqueId"]
                        }`
                      )
                    );
                    navigate(
                      `${"/projectManagement"}/${itm["customerName"]}/${
                        itm["uniqueId"]
                      }`
                    );
                  }}
                >
                  {itm["companyimg"] && itm["companyimg"] != "" && (
                    <>
                      <img
                        className="m-auto w-[40px] rounded-md hover:border-b-slate-600 border-b-[2px] border-b-slate-700"
                        src={backendassetUrl + itm["companyimg"]}
                      />
                    </>
                  )}
                  <div className="m-auto text-[16px] sm:text-[8px] md:text-[10px] xl:text-[16px]">
                    {itm["customerName"]}
                  </div>
                </div>
              </>
            );
          })}
          settype={settype}
          label="Add/Modify Customer"
        />

      </div>
      {/* <div className={`grid grid-cols-1 lg:grid-cols-2 m-2 ${hasCards ? "mt-36" : "mt-12"} gap-2`}>
      {graph1 && <ProjectChart />}
      {graph2 && <TotalActiveCustomer />}
      </div> */}
    </>
  );
};

export default ManageCustomer;
