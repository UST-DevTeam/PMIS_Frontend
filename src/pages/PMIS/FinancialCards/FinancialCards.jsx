import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  UilChartBar,
  UilComparison,
  UilChartLine,
  UilAnalytics,
  UilChartPie,
  UilSignalAlt3,
  UilChartPieAlt,
  UilAnalysis,
  UilVerticalAlignBottom,
} from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import CCDash from "../../../components/CCDash";
import { useNavigate, useParams } from "react-router-dom";

import ComponentActions from "../../../store/actions/component-actions";
import { getAccessType } from "../../../utils/commonFunnction";
import { ALERTS } from "../../../store/reducers/component-reducer";
import ProjectChart from "../Dashboard1/ProjectChart";
import ClaimAndAdvanceChart from "../Dashboard1/ClaimAndAdvanceChart";
import TrendPlanVSActualWorkdone from "../Formss/FinancialGraph/TrendPlanVSActualWorkdone";
import CirclePlanVSActualWorkdone from "../Formss/FinancialGraph/CirclePlanVSActualWorddone";
import PoStatusChart from "../Dashboard1/PoStatusChart";
import PoTrackingWorkdoneChart from "../Dashboard1/PoTrackingWorkdoneChart";
import MonthRevenueTrend from "../Formss/FinancialGraph/MonthRevenueTrend";
import MonthlyRevenueCircle from "../Formss/FinancialGraph/MonthlyRevenueCircle";
import CumulativeTrendPlanVsActual from "../Formss/FinancialGraph/CumulativeTrendPlanVsActual";
import AccrualRevenueTrendChart from "../Dashboard1/AccrualRevenueTrendChart";
import ProfitAndLoss from "../Dashboard1/ProfitAndLoss";
import ProfitAndLossTrend from "../Dashboard1/ProfitAndLossTrend";
import ProjectTypeUnbilled from "../Dashboard1/ProjectTypeunbilled";

const FinancialCards = () => {

  const [type, settype] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  let dispatch = useDispatch();
  const { customer, customerId } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    dispatch(ComponentActions.breadcrumb("Financial", "/financial", 0, true));
  }, []);

  let showType1 = getAccessType("Trend- Revenue Plan Vs Actual(Graph)")
  let showType2 = getAccessType("Circle- Revenue Plan VS Actual(Graph)")
  let showType3 = getAccessType("Revenue Plan VS Actual Cumulative(Graph)")
  let showType4 = getAccessType("PO Item Code Work Done(Graph)")
  let showType5 = getAccessType("Accrual Revenue Trend(Graph)")
  let showType6 = getAccessType("P&L(Graph)")
  let showType7 = getAccessType("P&L Trend(Graph)")

  let graph1 = false
  let graph2 = false
  let graph3 = false
  let graph4 = false
  let graph5 = false
  let graph6 = false
  let graph7 = false

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
  if (showType7 === "visible"){
    graph7 = true
  }

  const cardData = [
    ...(graph1 ? [{
      icon: <UilChartBar className="text-[#13b497] w-28 h-28" />,
      title: "Trend - Revenue Plan VS Actual",
      component: <MonthRevenueTrend />,
    }] : []),
    ...(graph2 ?[{
      icon: <UilComparison className="text-[#13b497] w-28 h-28" />,
      title: "Circle - Revenue Plan VS Actual",
      component: <MonthlyRevenueCircle />, 
    }] : []),
    ...(graph3 ?[{
      icon: <UilChartLine className="text-[#13b497] w-28 h-28" />,
      // icon: <img src="/revanueCumulative.png" alt="Profit & Loss Trend icon Not Found" className="w-full h-full object-cover"/>,
      title: "Revenue - Plan VS Actual Trend Cumulative",
      component:  <CumulativeTrendPlanVsActual />,
    }] : []),
    ...(graph4 ?[{ 
      icon: <UilVerticalAlignBottom className="text-[#13b497] w-28 h-28" />,
      title: "PO Item Code Workdone",
      component:  <PoTrackingWorkdoneChart customerId = {customerId} />,
    }] : []),
    ...(graph5 ?[{
      icon: <UilAnalysis className="text-[#13b497] w-28 h-28" />,
      title: "Accrual Revenue Trend",
      component: <AccrualRevenueTrendChart customerId = {customerId} />,
    }] : []),
    ...(graph6 ?[{
      icon: <UilChartPie className="text-[#13b497] w-28 h-28" />,
      // icon: <img src="/PL.png" alt="Profit & Loss Trend icon Not Found" className="w-full h-full object-cover"/>,
      title: "Profit & Loss",
      component: < ProfitAndLoss  customerId = {customerId} />,
    }] : []),
    ...(graph7 ?[{
      icon: <UilChartPie className="text-[#13b497] w-28 h-28" />,
      title: "Profit & Loss Trend",
      component: <ProfitAndLossTrend customerId = {customerId} />,
    }] : []),
    ...(graph7 ?[{
      icon: <UilChartBar className="text-[#13b497] w-28 h-28" />,
      title: "Unbilled",
      component: <ProjectTypeUnbilled customerId = {customerId} />,
    }] : []),
  ];
  
  const handleCardClick = (index) => {
    setSelectedCard(index);
  };

  const handleBackToCards = () => {
    setSelectedCard(null);
  };

  return (
    <>
    <div className="absolute w-full top-12 mt-12 h-16 z-10 bg-[#3e454d] overflow-auto ">
     <CCDash
        showbtn={false}
        approveddata={[
          ["PO Management", "bg-pcol", `/financial/${customer}/${customerId}/poManagement`],
          ["Revenue Management", "bg-pcol", `/financial/${customer}/${customerId}/invoiceMgmt`],
          ["Workdone", "bg-pcol",`/financial/${customer}/${customerId}/poWorkDone`],
          ["Unbilled", "bg-pcol", "/financial/unbilled"],
  
        ].map((itm) => {
          return (
            <>
              {(getAccessType(itm[0]) == "visible" ||
                getAccessType(itm[0]) == "disabled") ? (
                <div
                  className={`${itm[1]} bg-pcol text-white text-center text-[13px] md:text-[11px] xl:text-[13px] shadow-md hover:shadow-rxl w-full sm:w-11/12 md:w-5/6 lg:w-3/4 xl:w-11/12 flex h-12 cursor-pointer rounded-lg hover:scale-[102%] transition-all duration-500 font-oxygen font-bold hover:text-[15px] hover:text-[#444c54] hover:bg-pcolhover`}
                  onClick={() => {

                    if (getAccessType(itm[0]) == "visible") {
                      dispatch(ComponentActions.globalUrlStore(itm[0],itm[2]));
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
                  {/* <div className="m-auto bg-gradient-to-r from-stone-800 to-stone-900 bg-clip-text text-transparent">
                    {itm[0]}
                  </div> */}
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
     {/* <div className="grid lg:grid-cols-1 m-2 mt-20 gap-2">
      </div> */}
      <div className="w-full p-2 mt-16">
                {selectedCard !== null ? (
              <div className="w-full flex flex-col items-center">
                <button
                  onClick={handleBackToCards}  
                  className="w-[60px] mb-1 mr-auto rounded-md text-sm leading-6 text-white font-extrabold shadow-sm focus-visible:outline 
                focus-visible:outline-2 focus-visible:outline-offset-2 buttonAnim border-[1.4px] border-[#0e8670] font-poppins transition
                duration-1000 ease-in-out hover:bg-[#ffab2d] hover:text-white bg-[#13b497] hover:border-[#b99039] hover:border-[1.5px]"
                >
                  <span className="text-2xl">⬅</span>
                </button>
                <div className="w-full">{cardData[selectedCard]?.component}</div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 w-full gap-2">
                {cardData?.map((card, index) => (
                  <a
                    key={index}
                    onClick={() => handleCardClick(index)}
                    className="bg-transparent border-2 border-[#13b497] shadow-lg p-4 rounded-lg text-center h-[204px] flex flex-col justify-between cursor-pointer"
                  >
                    <h3 className="text-[#f4d3a8] font-bold text-base mb-4">{card.title}</h3>
                    <div className="w-full flex justify-center items-center">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28">
                        {card.icon} 
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>
    </>
  );
};

export default FinancialCards;
