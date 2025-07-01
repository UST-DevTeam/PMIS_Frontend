import React, { useEffect, useState } from "react";
import * as Unicons from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import CCDash from "../../../components/CCDash";
import { useNavigate, useParams } from "react-router-dom";
import ComponentActions from "../../../store/actions/component-actions";
import { getAccessType } from "../../../utils/commonFunnction";
import { ALERTS } from "../../../store/reducers/component-reducer";

const FormsCards = () => {
  const [type, settype] = useState(false);
  let dispatch = useDispatch();
  const { customeruniqueId } = useParams();
  let navigate = useNavigate();
  
  useEffect(() => {
    dispatch(ComponentActions.breadcrumb("Forms", "/forms", 0, true));
  }, []);
  return (
    <>
      <div className="absolute w-full top-12 mt-12 h-32 z-10 bg-[#3e454d] overflow-auto ">
      <CCDash
        showbtn={false}
        approveddata={[
          ["Invoice PVA", "bg-pcol", "/forms/InvoicePVA"],
          ["Delivery PVA", "bg-pcol", "/forms/PVADeliveryCustomer"],
          ["SOB", "bg-pcol", "/forms/SOB",],
          ["Gap Analysis", "bg-pcol", "/forms/GapAnalysis"],
          ["P&L", "bg-pcol", "/forms/P&L"],
          ["Liquidation Plan", "bg-pcol", "/forms/LiquidationPlan"],
          ["Accrual Revenue Trend", "bg-pcol", "/forms/AccrualRevenueTrend"],
          ['AOP-P&L',"bg-pcol","/forms/P&L"],
          ['AOP Tracking',"bg-pcol","/forms/AopTracking"],
          ['Airtel AOP Tracking',"bg-pcol","/forms/AopTrackingAirtel"],
          ['GP Tracking',"bg-pcol","/forms/gpTracking"],
          ['Forecast COGS Tracking',"bg-pcol","/forms/AopTrackingAirtel"]

        ].map((itm) => {
          return (
            
            <>
              {getAccessType(itm[0]) == "visible" || getAccessType(itm[0]) == "disabled" ? (
                <div
                className={`${itm[1]} bg-pcol text-white text-center text-[14px] md:text-[11px] xl:text-[14px] shadow-md hover:shadow-rxl w-full sm:w-11/12 md:w-5/6 lg:w-3/4 xl:w-11/12 flex h-12 cursor-pointer rounded-lg hover:scale-[102%] transition-all duration-500 font-oxygen font-bold hover:text-[16px] hover:text-[#444c54] hover:bg-pcolhover`}
                  onClick={() => {

                    if ( getAccessType(itm[0]) == "visible") {
                      dispatch(ComponentActions.globalUrlStore(itm[0],itm[2]));
                      navigate(itm[2]);
                      dispatch(ComponentActions.breadcrumb(itm[0], itm[2], 1, false));
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
      />
      </div>
    </>
  );
};

export default FormsCards;
