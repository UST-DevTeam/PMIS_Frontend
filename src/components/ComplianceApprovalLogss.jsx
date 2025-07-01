import React, { useState } from "react";
import AdvancedTable from "./AdvancedTable";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import eventManagementActions from "../store/actions/eventLogs-actions";
import { objectToQueryString } from "../utils/commonFunnction";

const ComplianceApprovalLog = ({ type, unqeId }) => {
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


  let dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(eventManagementActions.getComplianceLog(true,unqeId))
  // }, []);



  let dbConfigList = useSelector((state) => {
    let interdata = state?.eventlogsReducer?.getComplianceLog || [];
    return interdata?.map((itm) => {
      let updateditm = {
        ...itm,
      };
      return updateditm;
    });
  });


  const onSubmit = (data) => {
    let shouldReset = data.reseter;
    delete data.reseter;
    let strVal = objectToQueryString(data);
    dispatch(eventManagementActions.urlType(true, unqeId, strVal));
  };

  let dbConfigTotalCount = useSelector((state) => {
    let interdata = state?.eventlogsReducer?.getComplianceLog || [];
    if (interdata.length > 0 && interdata[0]["overall_table_count"] !== undefined) {
      return interdata[0]["overall_table_count"];
    } else {
      return 0;
    }
  });

  let siteIdLogsTable = {
    columns: [
      {
        name: "Site Id",
        value: "siteIdName",
        style: "min-w-[70px] max-w-[100px] text-center p-1",
      },
      {
        name: "Milestone",
        value: "milestoneName",
        style: "min-w-[70px] max-w-[100px] text-center",
      },
      {
        name: "User",
        value: "userName",
        style: "min-w-[100px] max-w-[200px] text-center",
      },
      {
        name: "Date & Time",
        value: "currentTime",
        style: "min-w-[120px] max-w-[70px] text-center",
      },
      {
        name: "Event",
        value: "event",
        style: "min-w-[300px] max-w-[500px] text-center",
      },
    ],
    filter: [],
  };




  return (
    <AdvancedTable
      headerButton={<></>}
      exportButton={[`/export/${type}EventLog/${unqeId}`, `Export_${type}_Event_log.xlsx`,]}
      table={siteIdLogsTable}
      filterAfter={onSubmit}
      tableName={""}
      handleSubmit={handleSubmit}
      data={dbConfigList}
      errors={errors}
      register={register}
      setValue={setValue}
      getValues={getValues}
      totalCount={dbConfigTotalCount}
      heading={"Total Count :-  "}
    />
  );
};

export default ComplianceApprovalLog;
