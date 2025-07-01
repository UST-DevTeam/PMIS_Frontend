import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Unicons from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import CCDash from "../../../components/CCDash";
import { useNavigate } from "react-router-dom";
import ComponentActions from "../../../store/actions/component-actions";
import ProjectChart from "../Dashboard1/ProjectChart";
import ClaimAndAdvanceChart from "../Dashboard1/ClaimAndAdvanceChart";

const ClaimTypeCards = () => {

  const [type, settype] = useState(false);

  let dispatch = useDispatch()

  let navigate = useNavigate();

  return (
    <>
     <div className="absolute w-full top-12 mt-12 h-16 z-10 bg-[#3e454d] overflow-auto ">
      <CCDash
        showbtn={false}
        approveddata={[
          [
            "Claim Type Category",
            "bg-pcol",
            "/hr/superAdmin/claimType/claimTypeCategories",
          ],
          [
            "ClaimType Grade",
            "bg-[#0e8670]",
            "/hr/superAdmin/claimType/claimTypeGrade",
          ],
          [
            "Unit Rate",
            "bg-pcol",
            "/hr/superAdmin/claimType/claimTypeUnitRate",
          ],
        ].map((itm) => {
          return (
            <>
              <div
                 className={`${itm[1]} bg-pcol text-white text-[14px] md:text-[12px] xl:text-[14px] text-center shadow-md hover:shadow-rxl w-full sm:w-11/12 md:w-5/6 lg:w-3/4 xl:w-11/12 flex h-12 cursor-pointer rounded-lg hover:scale-[102%] transition-all duration-500 font-oxygen font-bold hover:text-[15px] hover:text-[#444c54] hover:bg-pcolhover`}
                // className={`${itm[1]} shadow-md hover:shadow-2xl w-[98%] h-16 flex cursor-pointer rounded-lg hover:scale-[106%] transition-all duration-500 font-oxygen font-bold hover:text-lg border-[1px] border-b-[7px] ${itm[4]} relative`}
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
                      <div className="shining-text bg-black text-[13px] whitespace-nowrap font-extrabold bg-clip-text text-transparent ">
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
        label=""
      />
      </div>
      <div className="grid lg:grid-cols-2 m-2 mt-20 gap-2">

      {/* <ProjectChart />
      <ClaimAndAdvanceChart /> */}

      </div>
    </>
  );
};

export default ClaimTypeCards;
