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
import AdminActions from "../../../store/actions/admin-actions";

const ComplianceMilestoneCard = () => {

  const [type, settype] = useState(false);
  let dispatch = useDispatch();
  let navigate = useNavigate();

    let dbConfigListCard = useSelector((state) => {
      let interdata = state?.adminData?.getCardComplainceMilestone;
      return interdata?.map((itm) => {
        let updateditm = {
          ...itm,
        };
        return updateditm;
      });
    });


  useEffect(() => {
    dispatch(ComponentActions.breadcrumb("Home", "/home", 0, true));
    dispatch(AdminActions.getCardComplianceMilestone());
  }, []);


  const hasCards = dbConfigListCard && dbConfigListCard.length > 0;

  return (
    <>
    <div className={`absolute w-full ${hasCards ? "top-12 mt-12" : ""} h-70 z-10 bg-[#3e454d] overflow-auto`}>
      <CCDash
        approveddata={dbConfigListCard?.map((itm) => {
          return (
            <>
              <div
                className="bg-pcol text-white text-[12px] shadow-md hover:shadow-rxl w-full sm:w-11/12 md:w-5/6 lg:w-3/4 xl:w-11/12 flex h-8 cursor-pointer rounded-lg hover:scale-[102%] transition-all duration-500 font-oxygen font-bold hover:text-[15px] hover:bg-pcolhover hover:text-[#4a525b]"
                onClick={() => {
                  dispatch(ComponentActions.globalUrlStore(itm["complianceMilestone"], `${"/home/complianceMilestoneCard"}/${itm["complianceMilestone"]}`));
                  navigate(`${"/home/complianceMilestoneCard"}/${itm["complianceMilestone"]}`);
                }}
              >
                <div className="m-auto">{itm["complianceMilestone"]}</div>
              </div>
            </>
          );
        })}
        settype={settype}
      />
      </div>
    </>
  );
};

export default ComplianceMilestoneCard;
