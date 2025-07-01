// import React, { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import * as Unicons from "@iconscout/react-unicons";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useParams } from "react-router-dom";
// import ProjectChart from "./ProjectChart";
// import ClaimAndAdvanceChart from "./ClaimAndAdvanceChart";
// import MileStoneChart from "./MileStoneChart";
// import PolarChart from "../../../components/FormElements/PolarChart";
// import PoStatusChart from "./PoStatusChart";
// import RadialBarChart from "../../../components/FormElements/RadialBarChart";
// import ColumnChart from "../../../components/Columnchart";
// import PoTrackingWorkdoneChart from "./PoTrackingWorkdoneChart";
// import AccrualRevenueTrendChart from "./AccrualRevenueTrendChart";
// import ActiveEmpwithCostCenter from "../HRGraph/ActiveEmpwithCostCenter";
// import NewJoiningMonthly from "../HRGraph/NewJoiningMonthly";
// import MonthlyActiveTrend from "../HRGraph/MonthlyActiveTrend";
// import MonthlyJoiningVsExit from "../HRGraph/MonthlyJoiningVsExit";
// import WeeklyActiveEmpList from "../HRGraph/WeeklyActiveEmpList";
// import MonthRevenueTrend from "../Formss/FinancialGraph/MonthRevenueTrend";
// import MonthlyRevenueCircle from "../Formss/FinancialGraph/MonthlyRevenueCircle";
// import TrendExpenseAdvance from "../ExpenseAdvanceGraph/TrendExpenseAdvance";
// import ExpenseApprovalStatus from "../ExpenseAdvanceGraph/ExpenseApprovalStatus";
// import AdvanceApprovalStatus from "../ExpenseAdvanceGraph/AdvanceApprovalStatus";
// import TrendPlanVSActualWorkdone from "../Formss/FinancialGraph/TrendPlanVSActualWorkdone";
// import CirclePlanVSActualWorkdone from "../Formss/FinancialGraph/CirclePlanVSActualWorddone";
// import VendorActiveInactive from "../VendorGraph/VendorActiveInactive";
// import MS1AndMS2CircleWise from "./MS1AndMS2CircleWise";
// import CumulativeTrendPlanVsActual from "../Formss/FinancialGraph/CumulativeTrendPlanVsActual";
// import CumulativeWorkdonePlanVsActual from "../Formss/FinancialGraph/CumulativeWorkdonePlanVsActual";





// const Dashboard1 = () => {

//     const { cname, customeruniqueId } = useParams();



//     return (

//         <div className="grid lg:grid-cols-1 m-2 gap-2">
//              <ActiveEmpwithCostCenter />
//             <NewJoiningMonthly />
//             <MonthlyActiveTrend />
//             <MonthlyJoiningVsExit />
//             <WeeklyActiveEmpList />
//             <MonthRevenueTrend />
//             <MonthlyRevenueCircle />
//             <CumulativeTrendPlanVsActual />
//             <TrendExpenseAdvance />
//             <ExpenseApprovalStatus />
//             <AdvanceApprovalStatus />
//             <TrendPlanVSActualWorkdone /> 
//             <CirclePlanVSActualWorkdone />
//             <CumulativeWorkdonePlanVsActual />
//             <MS1AndMS2CircleWise />
//             <VendorActiveInactive />
//             <ProjectChart customeruniqueId = {customeruniqueId} />
//             {/* <ClaimAndAdvanceChart customeruniqueId = {customeruniqueId} /> */}
//             <MileStoneChart customeruniqueId = {customeruniqueId} />
//             <PoStatusChart customeruniqueId = {customeruniqueId} />
//             <PoTrackingWorkdoneChart customeruniqueId = {customeruniqueId} />
//             <AccrualRevenueTrendChart customeruniqueId = {customeruniqueId} />
    
            
            
//         </div>

//     )


// }
   


// export default Dashboard1;


import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ActiveEmpwithCostCenter from "../HRGraph/ActiveEmpwithCostCenter";
import NewJoiningMonthly from "../HRGraph/NewJoiningMonthly";
import MonthlyActiveTrend from "../HRGraph/MonthlyActiveTrend";
import MonthlyJoiningVsExit from "../HRGraph/MonthlyJoiningVsExit";
import WeeklyActiveEmpList from "../HRGraph/WeeklyActiveEmpList";
import MonthRevenueTrend from "../Formss/FinancialGraph/MonthRevenueTrend";
import MonthlyRevenueCircle from "../Formss/FinancialGraph/MonthlyRevenueCircle";
import TrendExpenseAdvance from "../ExpenseAdvanceGraph/TrendExpenseAdvance";
import ExpenseApprovalStatus from "../ExpenseAdvanceGraph/ExpenseApprovalStatus";
import AdvanceApprovalStatus from "../ExpenseAdvanceGraph/AdvanceApprovalStatus";
import TrendPlanVSActualWorkdone from "../Formss/FinancialGraph/TrendPlanVSActualWorkdone";
import CirclePlanVSActualWorkdone from "../Formss/FinancialGraph/CirclePlanVSActualWorddone";
import VendorActiveInactive from "../VendorGraph/VendorActiveInactive";
import MS1AndMS2CircleWise from "./MS1AndMS2CircleWise";
import CumulativeTrendPlanVsActual from "../Formss/FinancialGraph/CumulativeTrendPlanVsActual";
import CumulativeWorkdonePlanVsActual from "../Formss/FinancialGraph/CumulativeWorkdonePlanVsActual";
import ProjectChart from "./ProjectChart";
import MileStoneChart from "./MileStoneChart";
import PoStatusChart from "./PoStatusChart";
import PoTrackingWorkdoneChart from "./PoTrackingWorkdoneChart";
import AccrualRevenueTrendChart from "./AccrualRevenueTrendChart";

const graphs = [
  ActiveEmpwithCostCenter,
  NewJoiningMonthly,
  MonthlyActiveTrend,
  MonthlyJoiningVsExit,
  WeeklyActiveEmpList,
  MonthRevenueTrend,
  MonthlyRevenueCircle,
  CumulativeTrendPlanVsActual,
  TrendExpenseAdvance, 
  ExpenseApprovalStatus,
  AdvanceApprovalStatus,
  TrendPlanVSActualWorkdone,
  CirclePlanVSActualWorkdone,
  CumulativeWorkdonePlanVsActual,
  MS1AndMS2CircleWise,
  VendorActiveInactive,
  ProjectChart,
  MileStoneChart,
  PoStatusChart,
  PoTrackingWorkdoneChart,
  AccrualRevenueTrendChart,
];

const Dashboard1 = () => {
  const { customeruniqueId } = useParams();
  const [viewMoreGraphs, setViewMoreGraphs] = useState(2); 

  const viewMore = () => {
    setViewMoreGraphs((prev) => prev + 2); 
  };

  return (
    <div className="grid lg:grid-cols-1 m-2 gap-2">
      {graphs.slice(0, viewMoreGraphs)?.map((AllGraphs, index) => (
        <AllGraphs key={index} customeruniqueId={customeruniqueId} />
      ))}
      {viewMoreGraphs < graphs.length && (
        <button
        className="flex w-full justify-center rounded-lg py-1.5 text-sm leading-6 text-white font-extrabold shadow-sm focus-visible:outline 
        focus-visible:outline-2 mr-4  focus-visible:outline-offset-2  buttonAnim border-[1.5px] border-[#0e8670] font-poppins transition
        duration-1000 ease-in-out hover:bg-[#ffab2d] hover:text-[#24252d] hover:font-black bg-[#13b497] hover:border-[#FF6347] hover:border-[0.5px]"
          onClick={viewMore} 
        >
          View More
        </button>
      )}
    </div>
  );
};

export default Dashboard1;


