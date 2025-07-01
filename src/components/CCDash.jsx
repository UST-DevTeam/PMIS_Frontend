import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { backendassetUrl } from "../utils/url";
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
import { getAccessType } from "../utils/commonFunnction";
import ConditionalButton from "./ConditionalButton";
import TrendPlanVSActualWorkdone from "../pages/PMIS/Formss/FinancialGraph/TrendPlanVSActualWorkdone";
import CirclePlanVSActualWorkdone from "../pages/PMIS/Formss/FinancialGraph/CirclePlanVSActualWorddone";
import MonthRevenueTrend from "../pages/PMIS/Formss/FinancialGraph/MonthRevenueTrend";
import MonthlyRevenueCircle from "../pages/PMIS/Formss/FinancialGraph/MonthlyRevenueCircle";
import CumulativeTrendPlanVsActual from "../pages/PMIS/Formss/FinancialGraph/CumulativeTrendPlanVsActual";
import MS1AndMS2CircleWise from "../pages/PMIS/Dashboard1/MS1AndMS2CircleWise";
import CumulativeWorkdonePlanVsActual from "../pages/PMIS/Formss/FinancialGraph/CumulativeWorkdonePlanVsActual";
import TotalActiveCustomer from "../pages/PMIS/Dashboard1/TotalActiveCustomer";
import MS2vsWCCPendingReason from "../pages/PMIS/Dashboard1/MS2vsWCCPendingReason";
import PHYMS1VsMS2 from "../pages/PMIS/Dashboard1/PHYMS1VsMS2";
import SoftMS1VsMS2 from "../pages/PMIS/Dashboard1/SoftMS1VsMS2";
import KPIMS1VsMS2 from "../pages/PMIS/Dashboard1/KPIMS1VsMS2";
  
const CCDash = ({
  oppshowbtn = false,
  opplabel = "",
  showbtn = true,
  onpassclick = () => {},
  label = "",
  settype,
  approveddata,
  alignment = "horizontal",
  className,
}) => {
  const navigate = useNavigate();
  const [selectedCard, setSelectedCard] = useState(null);


  let showType1 = getAccessType("Circle Plan VS Actual Work Done(Graph)")
  let showType2 = getAccessType("Cumulative Plan Vs Actual Work Done(Graph)")
  let showType3 = getAccessType("Trend Plan VS Actual Work Done(Graph)")
  let showType4 = getAccessType("MS1-MS2 Report(Graph)")
  let showType5 = getAccessType("RFAI VS MS1 Reason(Graph)")
  // let showType6 = getAccessType("MS1 VS MS2 Reason(Graph)")
  let showType7 = getAccessType("MS2 Vs WCC Pending Reason(Graph)")
  let showType8 = getAccessType("Pendency Bucket- MS2 Aging(Graph)")
  let showType9 = getAccessType("SOB(Graph)")
  let showType10 = getAccessType("Soft MS1 Vs MS2(Graph)")
  let showType11 = getAccessType("Phy MS1 Vs MS2(Graph)")
  let showType12 = getAccessType("KPI MS1 Vs MS2(Graph)")


  let graph1 = false
  let graph2 = false
  let graph3 = false
  let graph4 = false
  let graph5 = false
  let graph6 = false
  let graph7 = false
  let graph8 = false
  let graph9 = false
  let graph10 = false
  let graph11 = false
  let graph12 = false

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
  // if (showType6 === "visible"){
  //   graph6 = true
  // }
  if (showType7 === "visible"){
    graph7 = true
  }
  if (showType8 === "visible"){
    graph8 = true
  }
  if (showType9 === "visible"){
    graph9 = true
  }
  if (showType10 === "visible"){
    graph10 = true
  }
  if (showType11 === "visible"){
    graph11 = true
  }
  if (showType12 === "visible"){
    graph12 = true
  }



  const cardData = [
    ...(graph1 ? [{
      icon: <UilChartBar className="text-[#13b497] w-28 h-28" />,
      title: "Circle - Plan VS Actual Work Done",
      component: <CirclePlanVSActualWorkdone />,
    }] : []),
    ...(graph2 ?[{
      icon: <UilComparison className="text-[#13b497] w-28 h-28" />,
      title: "Cumulative - Plan VS Actual Work Done",
      component: <CumulativeWorkdonePlanVsActual />, 
    }] : []),
    ...(graph3 ?[{
      icon: <UilChartLine className="text-[#13b497] w-28 h-28" />,
      title: "Trend - Plan VS Actual Work Done",
      component: <TrendPlanVSActualWorkdone />,
    }] : []),
    ...(graph4 ?[{
      icon: <UilChartPie className="text-[#13b497] w-28 h-28" />,
      title: "MS1 / MS2 Report",
      component: <MS1AndMS2CircleWise />,
    }] : []),
    ...(graph5 ?[{
      icon: <UilChartPie className="text-[#13b497] w-28 h-28" />,
      title: "RFAI VS MS1 Reason",
    //   component: <TotalActiveCustomer />,
    }] : []),
    // ...(graph6 ?[{
    //   icon: <UilChartPieAlt className="text-[#13b497] w-28 h-28" />,
    //   title: "MS1 VS MS2 Reason",
    // //   component: <TotalActiveCustomer />,
    // }] : []),
    ...(graph7 ?[{
      icon: <UilAnalytics className="text-[#13b497] w-28 h-28" />,
      title: "MS2 Vs WCC Pending Reason",
      component: <MS2vsWCCPendingReason />,
    }] : []),
    ...(graph8 ?[{
      icon: <UilSignalAlt3 className="text-[#13b497] w-28 h-28" />,
      title: "Pendency Bucket- MS2 Aging",
    //   component: <TotalActiveCustomer />,
    }] : []),
    ...(graph9 ?[{
      icon: <UilAnalysis className="text-[#13b497] w-28 h-28" />,
      title: "SOB",
    //   component: <TotalActiveCustomer />,
    }] : []),
    ...(graph10 ?[{
      icon: <UilChartBar className="text-[#13b497] w-28 h-28" />,
      title: "Soft MS1 Vs MS2",
      component: <SoftMS1VsMS2 />,
    }] : []),
    ...(graph11 ?[{
      icon: <UilAnalytics className="text-[#13b497] w-28 h-28" />,
      title: "Phy MS1 Vs MS2",
      component: <PHYMS1VsMS2 />,
    }] : []),
    ...(graph12 ?[{
      icon: <UilSignalAlt3 className="text-[#13b497] w-28 h-28" />,
      title: "KPI MS1 Vs MS2",
      component: <KPIMS1VsMS2 />,
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
      <div className="flex">
        {showbtn && (
          <div className="flex p-2">
            <ConditionalButton
              showType={getAccessType(label)}
              classes="w-auto h-10 bg-yellow-600 border-[0.5px] border-yellow-800 text-[#3e454d]"
              onClick={() => {
                settype(true);
              }}
              name={label}
            />
          </div>
        )}
         {selectedCard !== null && (
            <div className="flex p-2">
            <button
                onClick={handleBackToCards}
                // className="w-auto h-10 bg-[#13b497] border-[1.5px] border-[#0f7f65] text-white font-bold hover:bg-pcolhover rounded-md px-4"
                className="w-[60px] rounded-md text-sm leading-6 text-white font-extrabold shadow-sm focus-visible:outline 
                focus-visible:outline-2 mr-4  focus-visible:outline-offset-2 buttonAnim border-[1.3px] border-[#0e8670] font-poppins transition
                duration-1000 ease-in-out hover:bg-[#ca8a04] hover:text-white bg-[#13b497] hover:border-[#b99039] hover:border-[1.3px]"
            >
             <span className="text-2xl">⬅</span>
            </button>
            </div>
        )}
        {oppshowbtn && (
          <div className="flex mr-2 ml-auto">
            <ConditionalButton
              showType={getAccessType(opplabel)}
              classes="w-auto h-12 bg-orange-400 text-[18px] border-[0.5px] border-orange-500 custom-classs"
              onClick={onpassclick}
              name={opplabel}
            />
          </div>
        )}
      </div>
      {/* <div className='p-2 grid-cols-2 sm:grid-cols-4 md:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-6 grid col-span-12 rounded-md gap-3' >
            {approveddata}
        </div> */}

      <div className="">
        <div
          className={`${
            alignment === "vertical"
              ? `p-2 flex gap-1 min-w-[140px] flex-1 overflow-y-scroll overflow-x-hidden sm:h-[74vh] md:h-[75vh] lg:h-[75vh] xl:h-[74vh]`
              : 'p-2 grid-cols-2 sm:grid-cols-4 md:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-6 grid col-span-12 rounded-md gap-3'
          }`}
        >
          {alignment === "vertical" ? (
            <div className="flex flex-col gap-3 min-w-[160px] overflow-y-scroll overflow-x-hidden sm:h-[60vh] md:h-[70vh] lg:h-[75vh] xl:h-[75vh]">
              {approveddata}
            </div>
          ) : (
            approveddata
          )}

          <div className="w-full">
            {selectedCard !== null ? (
              <div className="w-full flex flex-col items-center">
                {/* <button
                  onClick={handleBackToCards}
                  className="mb-1 w-16 h-auto bg-[transparent] border-[1.5px] border-[#13b497] text-white font-semibold hover:bg-pcolhover rounded-xl"
                >
                  Back
                </button> */}
                <div className="w-full">
                  {cardData[selectedCard]?.component}
                </div>
              </div>
            ) : (
              alignment === "vertical" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5 w-full gap-2">
                  {cardData?.map((card, index) => (
                    <a
                      key={index}
                      onClick={() => handleCardClick(index)}
                      className="bg-transparent border-[1.5px] border-[#13b497] shadow-lg p-4 rounded-lg text-center h-[240px] flex flex-col justify-between cursor-pointer"
                    >
                      <h3 className="text-[#f4d3a8] font-bold text-[14px] mb-4"> 
                        {card.title}
                      </h3>
                      <div className="w-full flex justify-center items-center">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28">
                          {card.icon}
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              )
            )}
          </div>
        </div>
      </div>


      {/* <div className={`p-2 w-1/6 grid-cols-1 sm:grid-cols-3 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 col-span-12 rounded-md gap-2 flex flex-wrap justify-center items-start ${className}`}>
            {approveddata}
        </div> */}
    </>
  );
};

export default CCDash;
