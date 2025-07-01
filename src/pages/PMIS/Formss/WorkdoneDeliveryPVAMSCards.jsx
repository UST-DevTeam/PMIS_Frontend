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
import { useSearchParams } from "react-router-dom";

const WorkdoneDeliveryPVAMSCards = () => {
  const [searchParams, _] = useSearchParams()
  // const [modalOpen, setmodalOpen] = useState(false)
  // const [modalBody, setmodalBody] = useState(<></>)
  const [type, settype] = useState(false);
  // const [modalHead, setmodalHead] = useState(<></>)
  let dispatch = useDispatch();

  let navigate = useNavigate();

  useEffect(() => {
    dispatch(ComponentActions.breadcrumb("Forms", "/forms", 0, true));
  }, []);

  const customerId = searchParams.get("customerId")
  let pvaCustomer = localStorage.getItem("pvaCustomer");
  return (
    <>
    <div className="absolute w-full top-12 mt-12 h-16 z-10 bg-[#3e454d] overflow-auto ">
     <CCDash
        showbtn={false}
        
        approveddata={[
          ["MS1-PVA", "bg-pcol", "/forms/PVADeliveryCustomer/MS-PVA/MS1-PVA/" + pvaCustomer,],
          ["MS2-PVA", "bg-pcol", "/forms/PVADeliveryCustomer/MS-PVA/MS2-PVA/"+pvaCustomer,],
          // ["Forecast Work Done", "bg-gradient-to-r from-purple-200 via-purple-300 to-purple-500", "/forms/workdoneForecast/ForeCastWorkDone"],
        ].map((itm) => {
          return (
            <>
              {1 == 1 || (getAccessType(itm[0]) == "visible" ||
                getAccessType(itm[0]) == "disabled") ? (
                <div
                className={`${itm[1]} bg-pcol text-white text-center text-[14px] md:text-[11px] xl:text-[14px] shadow-md hover:shadow-rxl w-full sm:w-11/12 md:w-5/6 lg:w-3/4 xl:w-11/12 flex h-12 cursor-pointer rounded-lg hover:scale-[102%] transition-all duration-500 font-oxygen font-bold hover:text-[16px] hover:text-[#444c54] hover:bg-pcolhover`}
                  onClick={() => {


                    console.log(getAccessType(itm[0]), "getAccessType(itm[0])")
                    if (1 == 1 || getAccessType(itm[0]) == "visible") {

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

      {/* <ProjectChart />
      <ClaimAndAdvanceChart /> */}
      {/* <MileStoneChart />
      <PoStatusChart />
      <PoTrackingWorkdoneChart />
      <AccrualRevenueTrendChart /> */}



      </div>
    </>
  );
};

export default WorkdoneDeliveryPVAMSCards;