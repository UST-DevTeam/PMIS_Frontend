import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Unicons from "@iconscout/react-unicons";
import { useDispatch} from "react-redux";
import CCDash from "../../../components/CCDash";
import { useNavigate, useParams } from "react-router-dom";
import ComponentActions from "../../../store/actions/component-actions";
import { getAccessType } from "../../../utils/commonFunnction";
import { ALERTS } from "../../../store/reducers/component-reducer";

const ComplianceApproverCard = () => {

    const { mName } = useParams();

  const [type, settype] = useState(false);
  let dispatch = useDispatch();
  let navigate = useNavigate();

  useEffect(() => {
    dispatch(ComponentActions.breadcrumb("Home", "/home", 0, true));
  }, []);

  return (
    <>
      <div className="absolute w-full top-12 mt-12 h-16 z-10 bg-[#3e454d] overflow-auto">
      <CCDash
        showbtn={false}
        approveddata={[
            [
                "L1 Approver",
                "bg-pcol", 
            ],
            [
                "L2 Approver", 
                "bg-pcol",
            ],
        ].map((itm,index) => {
          return (
            <>
              {/* {(getAccessType(itm[0]) == "visible" || getAccessType(itm[0]) == "disabled") ? ( */}
              {(1==1) ? (
                <div
                  className={`${itm[1]} bg-pcol text-white text-[14px] shadow-md hover:shadow-rxl w-full sm:w-11/12 md:w-5/6 lg:w-3/4 xl:w-11/12 flex h-12 cursor-pointer rounded-lg hover:scale-[102%] transition-all duration-500 font-oxygen font-bold hover:text-[15px] hover:text-[#444c54] hover:bg-pcolhover`}
                  onClick={() => {                    
                      dispatch(ComponentActions.globalUrlStore(itm[0], `${"/home/complianceMilestoneCard"}/${mName}/${itm[0]}`));
                      navigate(`${"/home/complianceMilestoneCard"}/${index+1}/${mName}/${itm[0]}`);
                      dispatch(ComponentActions.breadcrumb(itm[0], itm[2], 1, false));
                  }}
                >
                  <div className="m-auto">{itm[0]}</div>
                </div>
              ) : (
                <></>
              )}
            </>
          );
        })}
        settype={settype}
      />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 m-2 mt-20 gap-2">
      </div>
    </>
  );
};
export default ComplianceApproverCard;
