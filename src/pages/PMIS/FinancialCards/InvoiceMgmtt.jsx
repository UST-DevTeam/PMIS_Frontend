import React, { useEffect, useState } from "react";
import { useDispatch} from "react-redux";
import CCDash from "../../../components/CCDash";
import { useNavigate, useParams } from "react-router-dom";
import ComponentActions from "../../../store/actions/component-actions";
import { getAccessType } from "../../../utils/commonFunnction";
import { ALERTS } from "../../../store/reducers/component-reducer";
import MonthRevenueTrend from "../Formss/FinancialGraph/MonthRevenueTrend";
import MonthlyRevenueCircle from "../Formss/FinancialGraph/MonthlyRevenueCircle";
import CumulativeTrendPlanVsActual from "../Formss/FinancialGraph/CumulativeTrendPlanVsActual";

const InvoiceMgmt = () => {
  const [type, settype] = useState(false);
  let dispatch = useDispatch();
  const { customer, customerId } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    dispatch(ComponentActions.breadcrumb("Financial", "/financial", 0, true));
  }, []);

  let showType1 = getAccessType("Trend- Revenue Plan Vs Actual(Graph)")
  let showType2 = getAccessType("Circle- Revenue Plan VS Actual(Graph)")
  let showType3 = getAccessType("Revenue Plan VS Actual Cumulative(Graph)")

  let graph1 = false
  let graph2 = false
  let graph3 = false

  if (showType1 === "visible"){
    graph1 = true
  }
  if (showType2 === "visible"){
    graph2 = true
  }
  if (showType3 === "visible"){
    graph3 = true
  }



  return (
    <>
      <div className="absolute w-full top-12 mt-12 h-16 z-10 bg-[#3e454d] overflow-auto ">
      <CCDash
        showbtn={false}
        approveddata={[
          ["Revenue Invoiced", "bg-pcol", `/financial/${customer}/${customerId}/invoiceMgmt/revenueInvoiced`],
          ["Accrual Revenue", "bg-pcol", `/financial/${customer}/${customerId}/invoiceMgmt/accrualRevenue`],
        ].map((itm) => {
          return (
            <>
              {(getAccessType(itm[0]) == "visible" ||
                getAccessType(itm[0]) == "disabled") ? (
                <div
                  // className={`${itm[1]} shadow-md hover:shadow-rxl w-[98%] flex h-24 cursor-pointer rounded-lg hover:scale-[102%] transition-all duration-500 font-oxygen font-bold  hover:text-lg  `}
                  className={`${itm[1]} bg-pcol text-white text-center text-[14px] md:text-[10px] xl:text-[14px] shadow-md hover:shadow-rxl w-full sm:w-11/12 md:w-5/6 lg:w-3/4 xl:w-11/12 flex h-12 cursor-pointer rounded-lg hover:scale-[102%] transition-all duration-500 font-oxygen font-bold hover:text-[15px] hover:text-[#444c54] hover:bg-pcolhover`}
                  onClick={() => {


                    console.log(getAccessType(itm[0]), "getAccessType(itm[0])")
                    if ( getAccessType(itm[0]) == "visible") {

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
      <div className="grid lg:grid-cols-1 m-2 mt-20 gap-2">
        {graph1 && <MonthRevenueTrend />}
        {graph2 && <MonthlyRevenueCircle />}
        {graph3 && <CumulativeTrendPlanVsActual />}
      </div>
    </>
  );
};

export default InvoiceMgmt;
