import React, { useState } from "react";
import AdvancedTable from "./AdvancedTable";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import eventManagementActions from "../store/actions/eventLogs-actions";
import { objectToQueryString } from "../utils/commonFunnction";

const EventLog = ({type,unqeId,urlType}) => {
    const {
        register,
        reset,
        handleSubmit,
        watch,
        setValue,
        setValues,
        getValues,
        formState: { errors },
      } = useForm();
      useEffect(() => {
        // dispatch(eventManagementActions.getprojecteventList(true,unqeId))
        // dispatch(OperationManagementActions.getRoleList())
      }, []);
      let dispatch=useDispatch()

      let dbConfigList = useSelector((state) => {
        let interdata = []
        if(type=="site"){
            interdata = state?.eventlogsReducer?.siteeventList || [];
        }else if(type=="milestone"){
            interdata = state?.eventlogsReducer?.milestoneeventList || [];
        }else if(type=="project"){
            interdata = state?.eventlogsReducer?.projecteventList || [];
        }
        return interdata?.map((itm) => {
          let updateditm = {
            ...itm,
          }
          return updateditm
        });
      })

      const onSubmit = (data) => {
        let shouldReset = data.reseter;
        delete data.reseter;
        let strVal = objectToQueryString(data);
        dispatch(eventManagementActions.urlType(true,unqeId,strVal));
      };

    let dbConfigTotalCount = useSelector((state) => {

        let interdata = []
        if(type=="site"){
            interdata = state?.eventlogsReducer?.siteeventList || [];
        }else if(type=="milestone"){
            interdata = state?.eventlogsReducer?.milestoneeventList || [];
        }else if(type=="project"){
            interdata = state?.eventlogsReducer?.projecteventList || [];
        }
        if (interdata.length > 0 && interdata[0]["overall_table_count"] !== undefined) {
          return interdata[0]["overall_table_count"];
        } else {
            return 0;
        }
    })

    let siteIdLogsTable = {
        columns: [
          {
            name: "Site Id",
            value: "siteName",
            style: "min-w-[70px] max-w-[100px] text-center p-1",
          },
          {
            name: "Milestone",
            value: "milestoneName",
            style: "min-w-[70px] max-w-[100px] text-center",
          },
          {
            name: "User Email",
            value: "empemail",
            style: "min-w-[100px] max-w-[200px] text-center",
          },
          {
            name: "Date & Time",
            value: "UpdatedAt",
            style: "min-w-[70px] max-w-[70px] text-center",
          },
          
          {
            name: "Event",
            value: "updatedData",
            style: "min-w-[300px] max-w-[500px] text-center",
          },
        ],
        filter: [
          
        ],
      };
    
  // if (type=="milestone"){
  //     siteIdLogsTable?.columns.push({
  //     name: "Milestone",
  //     value: "mileStoneName",
  //     style: "min-w-[50px] max-w-[200px] text-center",
  //   })
  // }
  
  if (type === "project") {
    siteIdLogsTable?.columns.unshift({
      name: "Project Id",
      value: "projectName",
      style: "min-w-[50px] max-w-[200px] text-center p-1",
    });
  }


  return (
    <AdvancedTable
      headerButton={<></>}
      exportButton={[`/export/${type}EventLog/${unqeId}`,`Export_${type}_Event_log.xlsx`]}
      table={siteIdLogsTable}
      filterAfter={onSubmit}
      tableName={"Milestone Event Logs"}
      handleSubmit={handleSubmit}
      data={dbConfigList}
      errors={errors}
      register={register}
      setValue={setValue}
      getValues={getValues}
      totalCount={dbConfigTotalCount}
      heading = {"Total Count :-  "}
    />
  );
};

export default EventLog;
