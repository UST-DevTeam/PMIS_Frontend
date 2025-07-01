import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Unicons from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../../components/Modal";
import AdminManagementActions from "../../../store/actions/adminManagement-actions";
import { Sidebar_content } from "../../../utils/sidebar_values";
import UserAccessManagementChild from "./UserAccessManagementChild";
import AdminActions from "../../../store/actions/admin-actions";
const UserAccessManagement = () => {
  const [modalOpen, setmodalOpen] = useState(false);
  const [modalBody, setmodalBody] = useState(<></>);
  const [modalHead, setmodalHead] = useState(<></>);
  const [showData, setshowData] = useState("");
  let dispatch = useDispatch();
  let roleList = useSelector((state) => {
    let interdata = state?.adminManagement?.roleList;
    return interdata;
  });

  let getComponentAllocation = useSelector((state) => {
    return state?.adminData?.getComponentAllocation;
  });

  

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setValues,
    getValues,
    formState: { errors },
  } = useForm();


  
  useEffect(() => {
    dispatch(AdminManagementActions.getRoleList());
    dispatch(AdminActions.getOldComponentAllocationList());
    dispatch(AdminActions.getComponentAllocationList());
  }, []);
  return (
    <>
      <div className=" w-[68vw] flex mx-1">
        <div className="pt-2 px-2">
          <table className="relative" border={2}>
            <tr className="sticky top-0 z-[10]">
              <th className="min-w-[300px] max-w-[300px] border-black border-[1.5px]  bg-primaryLine text-white  sticky left-0">
                Module Name
                {/* {showData} */}
              </th>
              {roleList.map((itm) => {
                return (
                  <th className="min-w-[200px] max-w-[230px] border-black border-[1.5px] bg-primaryLine text-white whitespace-nowrap">
                    {itm.label}
                  </th>
                );
              })}
            </tr>

            {
              <UserAccessManagementChild
                showData={showData}
                setshowData={setshowData}
                name={"name"}
                fromCall={"permission"}
                child={"checkbox"}
                btnName={"Module Access"}
                listValue={Sidebar_content["all_routes"]}
              />
            }

            {
              <UserAccessManagementChild
                showData={showData}
                setshowData={setshowData}
                fromCall={"pmpermission"}
                name={"componentType"}
                child={"select"}
                btnName={"My Home"}
                listValue={getComponentAllocation.filter(prev=>prev.parent=="MyHome")}
              />
            }

            {
              <UserAccessManagementChild
                showData={showData}
                setshowData={setshowData}
                fromCall={"pmpermission"}
                name={"componentType"}
                child={"select"}
                btnName={"Project Management"}
                listValue={getComponentAllocation.filter(prev=>prev.parent=="ProjectManagement")}
              />
            }

            {
              <UserAccessManagementChild
                showData={showData}
                setshowData={setshowData}
                fromCall={"pmpermission"}
                name={"componentType"}
                child={"select"}
                btnName={"Human Resource"}
                listValue={getComponentAllocation.filter(prev=>prev.parent=="HRView")}
              />
            }

            {
              <UserAccessManagementChild
                showData={showData}
                setshowData={setshowData}
                fromCall={"pmpermission"}
                name={"componentType"}
                child={"select"}
                btnName={"Partner Mangment"}
                listValue={getComponentAllocation.filter(prev=>prev.parent=="PartnerView")}
              />
            }
            {
              <UserAccessManagementChild
                showData={showData}
                setshowData={setshowData}
                fromCall={"pmpermission"}
                name={"componentType"}
                child={"select"}
                btnName={"Financial"}
                listValue={getComponentAllocation.filter(prev=>prev.parent=="FinancialView")}
              />
            }
            {
              <UserAccessManagementChild
                showData={showData}
                setshowData={setshowData}
                fromCall={"pmpermission"}
                name={"componentType"}
                child={"select"}
                btnName={"Forms"}
                listValue={getComponentAllocation.filter(prev=>prev.parent=="FormsView")}
              />
            }
          </table>
        </div>
      </div>

      <Modal
        size={"sm"}
        modalHead={modalHead}
        children={modalBody}
        isOpen={modalOpen}
        setIsOpen={setmodalOpen}
      />

      {/* <CommonForm/> */}
    </>
  );
};

export default UserAccessManagement;
