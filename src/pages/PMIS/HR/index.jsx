import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Unicons from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import CCDash from "../../../components/CCDash";
import { useNavigate } from "react-router-dom";

import ComponentActions from "../../../store/actions/component-actions";
import { getAccessType } from "../../../utils/commonFunnction";
import { ALERTS } from "../../../store/reducers/component-reducer";
import ProjectChart from "../Dashboard1/ProjectChart";
import ClaimAndAdvanceChart from "../Dashboard1/ClaimAndAdvanceChart";
import ActiveEmpwithCostCenter from "../HRGraph/ActiveEmpwithCostCenter";
import NewJoiningMonthly from "../HRGraph/NewJoiningMonthly";
import LineChartsss from "../../../components/LineChartsss";
import MonthlyActiveTrend from "../HRGraph/MonthlyActiveTrend";
import MonthlyJoiningVsExit from "../HRGraph/MonthlyJoiningVsExit";
import WeeklyActiveEmpList from "../HRGraph/WeeklyActiveEmpList";
import MonthRevenueTrend from "../Formss/FinancialGraph/MonthRevenueTrend";
import MonthlyRevenueCircle from "../Formss/FinancialGraph/MonthlyRevenueCircle";
import TrendExpenseAdvance from "../ExpenseAdvanceGraph/TrendExpenseAdvance";

const HRHomeView = () => {
  // const [modalOpen, setmodalOpen] = useState(false)
  // const [modalBody, setmodalBody] = useState(<></>)
  const [type, settype] = useState(false);
  // const [modalHead, setmodalHead] = useState(<></>)
  let dispatch = useDispatch();
  let navigate = useNavigate();

  let showType1 = getAccessType("Monthly New Joining(Graph)")
  let showType2 = getAccessType("Monthly Active Trend(Graph)")
  let showType3 = getAccessType("Monthly Joining Vs Exit(Graph)")
  let showType4 = getAccessType("Weekly Active Employee(Graph)")
  let showType5 = getAccessType("Airtel Active Employee(Graph)")
  let showType6 = getAccessType("Trend Exp Advance(Graph)")


  let graph1 = false
  let graph2 = false
  let graph3 = false
  let graph4 = false
  let graph5 = false
  let graph6 = false


  if (showType1 === "visible"){
    graph1 = true
  }
  if (showType2 === "visible"){
    graph2 = true
  }
  if (showType3 === "visible"){
    graph3 = true
  }
  if (showType4 === "visible"){
    graph4 = true
  }
  if (showType5 === "visible"){
    graph5 = true
  }
  if (showType6 === "visible"){
    graph6 = true
  }








  useEffect(() => {
    dispatch(ComponentActions.breadcrumb("HR", "/hr", 0, true));
  }, []);
  return (
    <>
       <div className="absolute w-full top-12 mt-12 h-20 z-10 bg-[#3e454d] overflow-auto">
        <CCDash
          showbtn={false}
          approveddata={[
            [
              "Manage Employee",
              "bg-pcol",
              "/hr/empDetailsTable",
              <Unicons.UilUserCircle size="30" color="" />,
            ],
            ["Asset Management", "bg-pcol", "/hr/assetManagement",<Unicons.UilMoneyWithdrawal size="30" color="" />,],
            ["Manage Policy",
              "bg-pcol",
              "",
            ],
            [
              "Expense & Advance",
              "bg-pcol",
              "/hr/Claim", "/hr/Advance",
            ],
            ["Attendance", "bg-pcol", "/hr/attendance",  <Unicons.UilCheckCircle size="30" color="" />,],
            [
              "Super Admin",
              "bg-pcol",
              "/hr/superAdmin",
              <Unicons.UilFileAlt size="30" color="" />,
            ],
          ].map((itm) => {
            return (
              <>
                {getAccessType(itm[0]) == "visible" ||
                  getAccessType(itm[0]) == "disabled" ? (
                  <div
                  className={`${itm[1]} bg-pcol text-white text-center text-[14px] md:text-[12px] xl:text-[14px] shadow-md hover:shadow-rxl w-full sm:w-11/12 md:w-5/6 lg:w-3/4 xl:w-11/12 flex h-12 cursor-pointer rounded-lg hover:scale-[102%] transition-all duration-500 font-oxygen font-bold hover:text-[15px] hover:text-[#444c54] hover:bg-pcolhover`}
                    onClick={() => {
                      if (getAccessType(itm[0]) == "visible") {
                        dispatch(
                          ComponentActions.globalUrlStore(
                            itm[0],
                            itm[2]
                          )
                        );
                        navigate(itm[2]);
                        dispatch(
                          ComponentActions.breadcrumb(itm[0], itm[2], 1, false)
                        );
                      } else {
                        let msgdata = {
                          show: true,
                          icon: "error",
                          buttons: [],
                          type: 1,
                          text: "This option is disabled",
                        };
                        dispatch(ALERTS(msgdata));
                      }
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
                  </div>
                ) : (
                  <></>
                )}
              </>
            );
          })}
          settype={settype}
          label="Add / Modify Customer"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 m-2 mt-20 gap-2">
      {graph1 && <NewJoiningMonthly />}
      {graph2 && <MonthlyActiveTrend />}
      {graph3 && <MonthlyJoiningVsExit />}
      {graph4 && <WeeklyActiveEmpList />}
      {graph5 && <ActiveEmpwithCostCenter />}
      {graph6 && <TrendExpenseAdvance />}
      </div>
    </>
  );
};

export default HRHomeView;










// import React, { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import * as Unicons from "@iconscout/react-unicons";
// import { useDispatch, useSelector } from "react-redux";
// import CCDash from "../../../components/CCDash";
// import { useNavigate } from "react-router-dom";

// import ComponentActions from "../../../store/actions/component-actions";
// import { getAccessType } from "../../../utils/commonFunnction";
// import { ALERTS } from "../../../store/reducers/component-reducer";
// const HRHomeView = () => {
//   // const [modalOpen, setmodalOpen] = useState(false)
//   // const [modalBody, setmodalBody] = useState(<></>)
//   const [type, settype] = useState(false);
//   // const [modalHead, setmodalHead] = useState(<></>)
//   let dispatch = useDispatch();

//   let navigate = useNavigate();

//   useEffect(() => {
//     dispatch(ComponentActions.breadcrumb("HR", "/hr", 0, true));
//   }, []);
//   return (
//     <>
//       <CCDash
//         showbtn={false}
//         approveddata={[
//           [
//             "Manage Employee",
//             "bg-gradient-to-r from-[#427d9d] to-[#9bbec8]",
//             "/hr/empDetailsTable",
//           ],
//           ["Asset Management", "bg-gradient-to-r from-lime-300 to-teal-400", "/hr/assetManagement"],
//           ["Manage Policy", "bg-gradient-to-r from-violet-500 to-purple-500", "/hr/managePolicy"],
//           [
//             "Expense & Advance",
//             "bg-gradient-to-r from-blue-200 to-cyan-200",
//             "/hr/Claim", "/hr/Advance",
//           ],
//           ["Attendance", "bg-gradient-to-r from-teal-200 to-teal-500", "/hr/attendance"],
//           [
//             "Super Admin",
//             "bg-gradient-to-r from-pink-400 to-red-400",
//             "/hr/superAdmin",
//           ],
//         ].map((itm) => {
//           return (
//             <>
//               {getAccessType(itm[0]) == "visible" ||
//                 getAccessType(itm[0]) == "disabled" ? (
//                 <div
//                   className={`${itm[1]} shadow-md hover:shadow-rxl w-[98%] flex h-24 cursor-pointer rounded-lg hover:scale-[102%] transition-all duration-500 font-oxygen font-bold  hover:text-lg  `}
//                   onClick={() => {


//                     console.log(getAccessType(itm[0]), "getAccessType(itm[0])")
//                     if (getAccessType(itm[0]) == "visible") {

//                       dispatch(
//                         ComponentActions.globalUrlStore(
//                           itm[0],
//                           itm[2]
//                         )
//                       );
//                       navigate(itm[2]);
//                       dispatch(
//                         ComponentActions.breadcrumb(itm[0], itm[2], 1, false)
//                       );
//                     } else {
//                       let msgdata = {
//                         show: true,
//                         icon: "error",
//                         buttons: [],
//                         type: 1,
//                         text: "This option is disabled",
//                       };
//                       dispatch(ALERTS(msgdata));
//                     }
//                   }}
//                 >
//                   {itm["companyimg"] && itm["companyimg"] != "" && (
//                     <>
//                       <img
//                         className="m-auto w-24"
//                         src={backendassetUrl + itm["companyimg"]}
//                       />
//                     </>
//                   )}
//                   <div className="m-auto bg-gradient-to-r from-stone-800 to-stone-900 bg-clip-text text-transparent">
//                     {itm[0]}
//                   </div>
//                 </div>
//               ) : (
//                 <></>
//               )}
//             </>
//           );
//         })}
//         settype={settype}
//         label="Add / Modify Customer"
//       />
//     </>
//   );
// };

// export default HRHomeView;
