import React, { useEffect, useState } from "react";
import * as Unicons from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import CCDash from "../../../components/CCDash";
import { useNavigate } from "react-router-dom";
import ComponentActions from "../../../store/actions/component-actions";
import { GET_COMPLIANCE_APPROVER } from "../../../store/reducers/admin-reducer";

const SuperAdmin = () => {

  const [type, settype] = useState(false);
  let dispatch = useDispatch()
  let navigate = useNavigate();
  return (
    <>
    <div className="absolute w-full top-12 mt-12 h-16 sm:h-16 md:h-32 xl:h-1/2 z-10 bg-[#3e454d] overflow-auto">
      <CCDash
        showbtn={false}
        approveddata={[
          [
            "Manage Circle",
            "bg-pcol",
            "/hr/superAdmin/manageCircle",
            "border-b-[#fdf0d5]",
          ],
          [
            "Manage Zone",
            "bg-pcol",
            "/hr/superAdmin/manageZone",
            "border-b-[#fdf0d5]",
          ],
          [
            "Manage Cost Center",
            "bg-pcol",
            "/hr/superAdmin/manageCostCenter",
            "border-b-[#e2eafc]",
          ],
          [
            "Manage Project Group",
            "bg-pcol",
            "/hr/superAdmin/projectGroup",
            "border-b-[#e2eafc]",
          ],
          [
            "User Access Management",
            "bg-pcol",
            "/hr/superAdmin/UserAccessManagement",
            "border-b-[#d8e2dc]",
          ],
          [
            "User Project Allocation",
            "bg-pcol",
            "/hr/superAdmin/userProjectAllocation",
            "border-b-[#d8e2dc]",
          ],
          [
            "Partner Project Allocation",
            "bg-pcol",
            "/hr/superAdmin/partnerProjectAllocation",
            "border-b-[#b8e0d2]",
          ],
          [
            "Manage Department",
            "bg-pcol",
            "/hr/superAdmin/manageDepartment",
            "border-b-[#b8e0d2]",
          ],
          [
            "Manage Grade",
            "bg-[#0e8670]",
            "/hr/superAdmin/Grade",   
            "border-b-[#bfd7ea]",
          ],
          [
            "Manage Profiles",
            "bg-pcol",
            "/hr/superAdmin/manageProfile",
            "border-b-[#bfd7ea]",
          ],
          [
            "Completion Criteria",
            "bg-pcol",
            "/hr/superAdmin/completionCriteria",
          ],
          [
            "Claim Type",
            "bg-pcol",
            "/hr/superAdmin/claimType",
          ],
          [
            "Master Unit Rate",
            "bg-pcol",
            "/hr/superAdmin/MasterUnitRate",
            "border-b-[#b8e0d2]",
          ],
          [
            "Activity Logs",
            "bg-pcol",
            "/hr/superAdmin/ActivityLogs",
            "border-b-[#b8e0d2]",
          ],
          [
            "Forms & Checklist",
            "bg-pcol",
            "/hr/superAdmin/compliance",
            "border-b-[#b8e0d2]",
          ],
          [
            "Compliance L1 Approver",
            "bg-pcol",
            "/hr/superAdmin/complianceL1Approver",
            "border-b-[#b8e0d2]",
          ],
          [
            "Compliance L2 Approver",
            "bg-pcol",
            "/hr/superAdmin/complianceL2Approver",
            "border-b-[#b8e0d2]",
          ],
          [
            "Partner Work Description",
            "bg-pcol",
            "/hr/superAdmin/partnerWorkDescription",
            "border-b-[#b8e0d2]",
          ],
          [
            "Partner Acitivity",
            "bg-pcol",
            "/hr/superAdmin/partnerActivity",
            "border-b-[#b8e0d2]",
          ],
          [
            "Salary DB",
            "bg-pcol",
            "/hr/superAdmin/salaryDB",
            <Unicons.UilPagerduty size="32" color="" />,
            "border-b-[#b8e0d2]",
          ],
          [
            "Other Fixed Cost Types",
            "bg-pcol",
            "/hr/superAdmin/OtherFixedCostTypes",
            <Unicons.UilPagerduty size="32" color="" />,
            "border-b-[#b8e0d2]",
          ],
          [
            "Other Fixed Cost",
            "bg-pcol",
            "/hr/superAdmin/OtherFixedCost",
            <Unicons.UilPagerduty size="32" color="" />,
            "border-b-[#b8e0d2]",
          ],
          [
            "Vendor Cost",
            "bg-pcol",
            "/hr/superAdmin/vendorCost",
            <Unicons.UilPagerduty size="32" color="" />,
            "border-b-[#b8e0d2]",
          ],
          // [
          //   "GP Tracking",
          //   "bg-pcol",
          //   "/hr/superAdmin/gpTracking",
          //   <Unicons.UilPagerduty size="32" color="" />,
          //   "border-b-[#b8e0d2]",
          // ],
          [
            "Exchange Rate",
            "bg-pcol",
            "/hr/superAdmin/exchangeRate",
            <Unicons.UilPagerduty size="32" color="" />,
            "border-b-[#b8e0d2]",
          ],
          [
            "Sub Project Master Table",
            "bg-pcol",
            "/hr/superAdmin/subProjectMaster",
            <Unicons.UilPagerduty size="32" color="" />,
            "border-b-[#b8e0d2]",
          ],
        ].map((itm) => {
          return (
            <>
              <div
                  className={`${itm[1]} bg-pcol text-white text-[14px] md:text-[11px] xl:text-[14px] text-center shadow-md hover:shadow-rxl w-full sm:w-11/12 md:w-5/6 lg:w-3/4 xl:w-11/12 flex h-12 cursor-pointer rounded-lg hover:scale-[102%] transition-all duration-500 font-oxygen font-bold hover:text-[15px] hover:text-[#444c54] hover:bg-pcolhover`}
                onClick={() => {
                  if(itm[0]==="Compliance L1 Approver" || itm[0]==="Compliance L2 Approver" ){
                    dispatch(GET_COMPLIANCE_APPROVER({dataAll:[],reset:true}))
                  }
                  dispatch(ComponentActions.globalUrlStore(itm[0],itm[2]));
                  dispatch(ComponentActions.breadcrumb(itm[0], itm[2], 2, false));
                  navigate(itm[2]);
                }}
              >
                {/* {itm["companyimg"] && itm["companyimg"] != "" && (
                  <>
                    <img
                      className="m-auto w-24"
                      src={backendassetUrl + itm["companyimg"]}
                    />
                  </>
                )} */}
                  <div className="m-auto">
                    {itm[0]}
                  </div>
                </div>
            </>
          );
        })}
      />
      </div>
    </>
  );
};

export default SuperAdmin;
