import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CCDash from "../../../components/CCDash";
import { useNavigate, useParams } from "react-router-dom";
import ComponentActions from "../../../store/actions/component-actions";
import { getAccessType } from "../../../utils/commonFunnction";
import { ALERTS } from "../../../store/reducers/component-reducer";

import PoStatusChart from "../Dashboard1/PoStatusChart";
import PoTrackingWorkdoneChart from "../Dashboard1/PoTrackingWorkdoneChart";

const POMgmtCards = () => {

  const [type, settype] = useState(false);
  let dispatch = useDispatch();
  const { customer,customerId } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    dispatch(ComponentActions.breadcrumb("Financial", "/financial", 0, true));
  }, []);

  let showType1 = getAccessType("PO Status(Graph)")
  let showType2 = getAccessType("PO Item Code Work Done(Graph)")

  let graph1 = false
  let graph2 = false

  if (showType1 === "visible"){
    graph1 = true
  }
  if (showType2 === "visible"){
    graph2 = true
  }


  return (
    <>
     <div className="absolute w-full top-12 mt-12 h-16 z-10 bg-[#3e454d] overflow-auto ">
     <CCDash
        showbtn={false}
        approveddata={[
          ["PO Status-Invoice", "bg-pcol", `/financial/${customer}/${customerId}/poManagement/poStatusInvoice`,],
          ["PO Tracking-Workdone", "bg-pcol", `/financial/${customer}/${customerId}/poManagement/poTrackingWorkdone`],
        ].map((itm) => {
          return (
            <>
              {(getAccessType(itm[0]) == "visible" ||
                getAccessType(itm[0]) == "disabled") ? (
                <div
                  className={`${itm[1]} bg-pcol text-white text-center text-[14px] md:text-[11px] xl:text-[14px] shadow-md hover:shadow-rxl w-full sm:w-11/12 md:w-5/6 lg:w-3/4 xl:w-11/12 flex h-12 cursor-pointer rounded-lg hover:scale-[102%] transition-all duration-500 font-oxygen font-bold hover:text-[15px] hover:text-[#444c54] hover:bg-pcolhover`}
                  onClick={() => {
                    if ( getAccessType(itm[0]) == "visible") {
                      dispatch(
                        ComponentActions.globalUrlStore(
                          itm[0],
                          itm[2]
                        )
                      );
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
     <div className="grid lg:grid-cols-2 m-2 mt-20 gap-2">
      {graph1 && <PoStatusChart  />}
      {graph2 && <PoTrackingWorkdoneChart />}
      </div>
    </>
  );
};

export default POMgmtCards;
