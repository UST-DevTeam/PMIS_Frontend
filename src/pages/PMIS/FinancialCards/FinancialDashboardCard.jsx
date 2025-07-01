import React, { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import {backendassetUrl} from "../../../utils/url";
import { useNavigate, useParams } from "react-router-dom";
import CCDash from "../../../components/CCDash";
import ComponentActions from "../../../store/actions/component-actions";
import FinanceActions from "../../../store/actions/finance-actions";

const FinancialDashboardCard = () => {

  let dispatch = useDispatch();
  let navigate = useNavigate();

  let dbConfigList = useSelector((state) => {
    let interdata = state?.financeData?.getCustomers;
    return interdata?.map((itm) => {
      let updateditm = {
        ...itm,
      };
      return updateditm;
    });
  });

  const user = JSON.parse(localStorage.getItem("user"))

  useEffect(() => {
    dispatch(FinanceActions.getCustomers(user.uniqueId))
  }, []);

  return  (
      <CCDash
        approveddata={dbConfigList?.map((itm) => {
          return (
            <>
              <div
                className={`border-[1px] border-[#186757] bg-pcol ${itm[1]} shadow-md hover:shadow-rxl w-full sm:w-11/12 md:w-full lg:w-3/4 xl:w-full h-16 flex cursor-pointer rounded-lg hover:scale-105 transition-all duration-500 font-oxygen font-extrabold hover:text-lg hover:bg-pcolhover`}
                onClick={() => {
                  dispatch(ComponentActions.globalUrlStore(itm["customerName"], "/financial"));
                  navigate(`${"/financial"}/${itm["customerName"]}/${itm["customerId"]}`);
                }}
              >
                {itm["companyimg"] && itm["companyimg"] != "" && (
                  <>
                    <img
                     className="m-auto w-[50px] md:w-[40px] xl:w-[50px] rounded-md hover:border-b-slate-600 border-b-[2px] border-b-slate-700"
                      src={backendassetUrl + itm["companyimg"]}
                    />
                  </>
                )}
                <div className="m-auto md:text-sm md:text-center xl:text-base">{itm["customerName"]}</div>
              </div>
            </>
          );
        })}
      />
  );
};
export default FinancialDashboardCard;