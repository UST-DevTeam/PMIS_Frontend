import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Unicons from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import CCDash from "../../../components/CCDash";
import { useNavigate } from "react-router-dom";
import ComponentActions from "../../../store/actions/component-actions";
import ProjectChart from "../Dashboard1/ProjectChart";
import ClaimAndAdvanceChart from "../Dashboard1/ClaimAndAdvanceChart";
import { getAccessType } from "../../../utils/commonFunnction";
import { ALERTS } from "../../../store/reducers/component-reducer";
import VendorActiveInactive from "../VendorGraph/VendorActiveInactive";
import CumulativeWorkdonePlanVsActual from "../Formss/FinancialGraph/CumulativeWorkdonePlanVsActual";
import MS2vsWCCPendingReason from "../Dashboard1/MS2vsWCCPendingReason";
import KPIMS1VsMS2 from "../Dashboard1/KPIMS1VsMS2";
import SoftMS1VsMS2 from "../Dashboard1/SoftMS1VsMS2";
import PHYMS1VsMS2 from "../Dashboard1/PHYMS1VsMS2";
import ProfitAndLoss from "../Dashboard1/ProfitAndLoss";
import ProfitAndLossTrend from "../Dashboard1/ProfitAndLossTrend";

const VendorCards = () => {
  // const [modalOpen, setmodalOpen] = useState(false)
  // const [modalBody, setmodalBody] = useState(<></>)
  const [type, settype] = useState(false);
  // const [modalHead, setmodalHead] = useState(<></>)
  // let dispatch = useDispatch()

  let navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ComponentActions.breadcrumb("Vendor", "/vendor", 0, true));
  }, []);

  let showType1 = getAccessType("Total Partners(Graph)")

  let graph1 = false

  if (showType1 === "visible"){
    graph1 = true
  }




  return (
    <>
      <div className="absolute w-full top-12 mt-12 h-16 z-10 bg-[#3e454d] overflow-auto ">
        <CCDash
          showbtn={false}
          approveddata={[
            [
              "Partner On-Board",
              "bg-pcol",
              "/vendor/managePartner",
            ],
            [
              "Project Tracking",
              "bg-pcol",
              "/vendor/projectTracking",
            ],
            
            // [
            //   "Vendor Cost",
            //   "bg-pcol",
            //   "/vendor/vendorCost",
            // ],
            ["Commercial",
              "bg-pcol",
              "/vendor/commercial",
            ],

          ].map((itm) => {
            return (
              <>
                {getAccessType(itm[0]) == "visible" ||
                  getAccessType(itm[0]) == "disabled" ? (
                  <div
                  className={`${itm[1]} bg-pcol text-white text-[14px] md:text-[11px] xl:text-[14px] text-center shadow-md hover:shadow-rxl w-full sm:w-11/12 md:w-5/6 lg:w-3/4 xl:w-11/12 flex h-12 cursor-pointer rounded-lg hover:scale-[102%] transition-all duration-500 font-oxygen font-bold hover:text-[15px] hover:text-[#444c54] hover:bg-pcolhover`}
                    onClick={() => {
                      console.log(getAccessType(itm[0]), "getAccessType(itm[0])")
                      if (getAccessType(itm[0]) == "visible") {
                        dispatch(
                          ComponentActions.globalUrlStore(itm[0], itm[2])

                        );
                        navigate(itm[2])
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
          label="Add / Modify "
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-1 m-2 mt-20 gap-2">
        {graph1 && <VendorActiveInactive />}
      </div>
    </>
  );
};

export default VendorCards;
