import React, { useEffect, useRef, useState } from "react";
import * as Unicons from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../components/Button";
import AdminManagementActions from "../../../store/actions/adminManagement-actions";

import { Sidebar_content } from "../../../utils/sidebar_values";
const UserAccessManagementChild = ({
  showdata,
  setshowData,
  btnName,
  fromCall,
  listValue,
  name,
  child,
}) => {

  const data = useRef()
  const [showView, setShowView] = useState(false);

  const dispatch = useDispatch()
  let roleList = useSelector((state) => {
    // console.log(state, "state state");
    let interdata = state?.adminManagement?.roleList;
    return interdata;
  });

  let getOldComponentAllocation = useSelector((state) => {
    return state?.adminData?.getOldComponentAllocation;
  });

  

  let dataToView={
    "moduleName":btnName,
    "roleId":"",
    "typeVal":fromCall,
    "accessType":fromCall
  }
  return (
    <>
    <tr>
      <td className="min-w-[140px] max-w-[140px] border-black border-[1px] sticky left-0 bg-[#3e454d] pl-1 ">
      <Button
        name={btnName}
        classes="my-2 w-auto z-[10000px]"
        onClick={() => {
          setShowView((prev) => !prev);
        }}
      />
      </td>
      <td colSpan={roleList.length} className="min-w-[140px] max-w-[140px] border-black border-[1px] sticky">
      </td>
    </tr>

    <tr>
      <td className="pl-2 p-2 min-w-[140px] max-w-[140px] border-black border-[1px] sticky left-0 z-[100px] bg-[#3e454d] text-pcolhover">
      {showView ? <p className=" z-[10000px]">{btnName}</p> : <></>}

      </td>
      <td colSpan={roleList.length} className="min-w-[140px] max-w-[140px] border-black border-[1px] sticky">

      </td>
    </tr>

      {showView &&
        listValue.map((itew) => {
          return (
            <tr>
              <td className="min-w-[140px] p-2 pl-2 text-sm max-w-[140px] border-black border-[1px] sticky left-0 bg-[#3e454d] text-white">
                {itew[name]}
                {showdata}
              </td>
              {roleList.map((itm) => {
                // console.log(itm.value, "itmitmitmitm");

                let vale=getOldComponentAllocation.findIndex((prev) => {return prev.roleId == itm.value && prev.typeVal == fromCall})
                // console.log(vale,"valevalevalevale");

                // console.log(vale!=-1&&getOldComponentAllocation[vale]["data"],itew[name],"getOldComponentAllocation[vale]")
                return (
                  <td className="min-w-[140px] max-w-[140px] border-black border-[1px] text-center ">
                    {child == "checkbox" && (
                      <input
                        defaultChecked={vale!=-1?getOldComponentAllocation[vale]["data"].findIndex(prev=>prev.moduleName==itew[name] && prev.accessType==true)!=-1:false}
                        onChange={(e) => {
                          dataToView["moduleName"]=itew[name]
                          dataToView["roleId"]=itm.value
                          dataToView["accessType"]=e.target.checked
                          console.log(dataToView,"dataToViewdataToView")
                          // callToApi(dataToView)
                          
                          dispatch(AdminManagementActions.PatchDataAccess(dataToView,()=>{
                            e.target.checked=e.target.checked
                            
                              // dispatch(AdminActions.getOldComponentAllocationList());
                          }));
                          // alert(e.target.checked + itm.roleName + btnName);
                        }}
                        type={"checkbox"}
                      />
                    )}
                    {child == "select" && (<>

                    {/* {console.log(getOldComponentAllocation[vale]["data"],,getOldComponentAllocation[vale]["data"].findIndex(prev=>prev.moduleName==itew[name]),"getOldComponentAllocation[vale]")} */}
                      <select
                      className="bg-[#3e454d] text-white border-solid border-[#64676d] border-[1.5px] rounded-sm"
                        ref={data}
                        defaultValue={vale!=-1 && getOldComponentAllocation[vale]["data"].findIndex(prev=>prev.moduleName==itew[name])!=-1&&getOldComponentAllocation[vale]["data"][getOldComponentAllocation[vale]["data"].findIndex(prev=>prev.moduleName==itew[name])]["accessType"] || ""}
                        onChange={(e) => {

                          console.log(data.current,data.current,"datadatadata")
                          dataToView["moduleName"]=itew[name]
                          dataToView["roleId"]=itm.value
                          dataToView["accessType"]=e.target.value
                          // console.log(dataToView,"dataToViewdataToView")
                          dispatch(AdminManagementActions.PatchDataAccess(dataToView,()=>{
                            e.target.value=e.target.value
                            // dispatch(AdminActions.getOldComponentAllocationList());
                          }));
                          // alert(e.target.value + itm.roleName + btnName);
                        }}
                      >
                        <option value={""}></option>
                        {/* <option value={"R"}>R</option> */}
                        <option value={"W"}>W</option>
                        <option value={"H"}>H</option>
                      </select>
                    </>)}
                  </td>
                );
              })}
            </tr>
          );
        })}
    </>
  );
};

export default UserAccessManagementChild;
