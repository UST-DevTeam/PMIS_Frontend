import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Unicons from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import CCDash from "../../../../components/CCDash";
import { useNavigate } from "react-router-dom";
import ComponentActions from "../../../../store/actions/component-actions";
// import ProjectChart from "../Dashboard1/ProjectChart";
// import ClaimAndAdvanceChart from "../Dashboard1/ClaimAndAdvanceChart";
// import VendorActiveInactive from "../VendorGraph/VendorActiveInactive";


const ActivityLogs = () => {
  // const [modalOpen, setmodalOpen] = useState(false)
  // const [modalBody, setmodalBody] = useState(<></>)
  const [type, settype] = useState(false);
  // const [modalHead, setmodalHead] = useState(<></>)

  let dispatch = useDispatch()

  let navigate = useNavigate();


  return (
    <>
    <div className="absolute w-full top-12 mt-12 h-16 sm:h-16 md:h-32 xl:h-48 z-10 bg-[#3e454d] overflow-auto">
      <CCDash
        showbtn={false}
        approveddata={[
        //   [
        //     "Manage Circle",
        //     "bg-pcol",
        //     "/hr/superAdmin/manageCircle",
        //     <Unicons.UilCheckCircle size="36" color="" />,
        //     "border-b-[#fdf0d5]",
        //   ],
          
          
          [
            "Approval Logs",
            "bg-pcol",
            "/hr/superAdmin/ActivityLogs/ApprovalLogs",
            <Unicons.UilPagerduty size="32" color="" />,
            "border-b-[#b8e0d2]",
          ],
          [
            "Admin Logs",
            "bg-pcol",
            "/hr/superAdmin/ActivityLogs/SuperAdminLogs",
            <Unicons.UilPagerduty size="32" color="" />,
            "border-b-[#b8e0d2]",
          ],
        ].map((itm) => {
          return (
            <>
              <div
                  className={`${itm[1]} bg-pcol text-white text-[14px] md:text-[11px] xl:text-[14px] text-center shadow-md hover:shadow-rxl w-full sm:w-11/12 md:w-5/6 lg:w-3/4 xl:w-11/12 flex h-12 cursor-pointer rounded-lg hover:scale-[102%] transition-all duration-500 font-oxygen font-bold hover:text-[15px] hover:text-[#444c54] hover:bg-pcolhover`}
                // className={`${itm[1]} shadow-md hover:shadow-2xl w-[96%] h-16 flex cursor-pointer rounded-lg hover:scale-[106%] transition-all duration-500 font-oxygen font-bold hover:text-lg border-[1px] border-b-[7px] ${itm[4]} relative`}
                onClick={() => {
                  dispatch(
                    ComponentActions.globalUrlStore(
                      itm[0],
                      itm[2]
                    )
                  );
                  dispatch(ComponentActions.breadcrumb(itm[0], itm[2], 2, false));
                  navigate(itm[2]);
                }}
              >
                {itm["companyimg"] && itm["companyimg"] != "" && (
                  <>
                    <img
                      className="m-auto w-24"
                      src={backendassetUrl + itm["companyimg"]}
                    />
                  </>
                )}
                  <div className="m-auto">
                    {itm[0]}
                  </div>
                {/* <div className="flex items-center justify-between w-full p-1">
                    <div className="flex flex-col items-start">
                      <div className="text-xl font-bold text-[#dd2d4a]">0</div>
                      <div className="shining-text bg-black text-[12px] whitespace-nowrap font-extrabold bg-clip-text text-transparent ">
                        {itm[0]}
                      </div>
                    </div>
                    <div className="rotating-icon">{itm[3]}</div>
                  </div>
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-stone-800 to-stone-900 opacity-30 pointer-events-none" /> */}
                </div>
            </>
          );
        })}
        settype={settype}
        label="Add / Modify Customer"
      />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 m-2 mt-20 sm:mt-20 md:mt-36 xl:mt-48 gap-2">
{/* 
      <ProjectChart />
      <VendorActiveInactive /> */}

      </div>
    </>
  );
};

export default ActivityLogs;
