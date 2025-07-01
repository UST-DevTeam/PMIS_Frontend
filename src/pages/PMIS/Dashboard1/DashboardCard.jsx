import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Unicons from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import EditButton from "../../../components/EditButton";
// import ManageCustomerForm from "../../../PMIS/Admin/ManageCustomer/ManageCustomerForm";
import AdvancedTable from "../../../components/AdvancedTable";
import Modal from "../../../components/Modal";
import Button from "../../../components/Button";
import DeleteButton from "../../../components/DeleteButton";
import CstmButton from "../../../components/CstmButton";
// import ToggleButton from "../../../../components/ToggleButton";
import {
  getAccessType,
  objectToQueryString,
} from "../../../utils/commonFunnction";
import { ALERTS } from "../../../store/reducers/component-reducer";
import CommonActions from "../../../store/actions/common-actions";
import { Urls, backendassetUrl, baseUrl } from "../../../utils/url";
// import OperationManagementActions from "../../../../store/actions/admin-actions";
import AdminActions from "../../../store/actions/admin-actions";
import { useNavigate, useParams } from "react-router-dom";
import CCDash from "../../../components/CCDash";
import ConditionalButton from "../../../components/ConditionalButton";

import ComponentActions from "../../../store/actions/component-actions";
const DashboardCard = () => {
  const [modalOpen, setmodalOpen] = useState(false);
  const [modalBody, setmodalBody] = useState(<></>);
  const [type, settype] = useState(false);
  const [modalHead, setmodalHead] = useState(<></>);

  let dispatch = useDispatch();

  let navigate = useNavigate();

  const currentDate = new Date();
  const dt = currentDate
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    .replace(/\//g, "-");

  let dbConfigList = useSelector((state) => {
    let interdata = state?.adminData?.getCardCustomer;
    return interdata?.map((itm) => {
      let updateditm = {
        ...itm,


    
      };
      return updateditm;
    });
  });
  let dbConfigTotalCount = useSelector((state) => {
    let interdata = state?.adminData?.getManageCustomer;
    if (interdata?.length > 0) {
      return interdata[0]["overall_table_count"];
    } else {
      return 0;
    }
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

  useEffect(() => {
    dispatch(AdminActions.getCardCustomer());
    dispatch(ComponentActions.breadcrumb("Project Management", "/manageCustomer", 0, true));
  }, []);

  return  (
      <CCDash
        approveddata={dbConfigList?.map((itm) => {
          return (
            <>
              <div
                className={`border-[1px] border-[#186757] bg-pcol ${itm[1]} shadow-md hover:shadow-rxl w-full sm:w-11/12 md:w-full lg:w-3/4 xl:w-full h-16 flex cursor-pointer rounded-lg hover:scale-105 transition-all duration-500 font-oxygen font-extrabold hover:text-lg hover:bg-pcolhover`}
                onClick={() => {
                  dispatch(
                    ComponentActions.globalUrlStore(itm["customerName"], `${"/dashboard"}/${itm["customerName"]}/${itm["uniqueId"]}`)
                  );
                  navigate(`${"/dashboard"}/${itm["customerName"]}/${itm["uniqueId"]}`);
                }}
              >
                {itm["companyimg"] && itm["companyimg"] != "" && (
                  <>
                    <img
                     className="m-auto w-[50px] md:w-[40px] xl:w-[50px] rounded-md hover:border-b-slate-600 border-b-[2px] border-b-slate-700"
                      src={backendassetUrl + itm["companyimg"]}
                    />
                  </>
                )}
                <div className="m-auto md:text-sm md:text-center xl:text-base">{itm["customerName"]}</div>
              </div>
            </>
          );
        })}
      />
  );
};

export default DashboardCard;