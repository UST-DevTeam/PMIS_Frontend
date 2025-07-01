import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import AdvancedTable from "../../../../components/AdvancedTable";
import {getAccessType,objectToQueryString,} from "../../../../utils/commonFunnction";
import CommonActions from "../../../../store/actions/common-actions";
import FinanceActions from "../../../../store/actions/finance-actions";
import FilterActions from "../../../../store/actions/filter-actions";
import ConditionalButton from "../../../../components/ConditionalButton";
import moment from "moment";
import { useParams } from "react-router-dom";
import { GET_POWORKDONE_BASED } from "../../../../store/reducers/finance-reducer";

const WorkDone = () => {

  const [strValFil, setstrVal] = useState(false);
  const endDate = moment().format("Y");
  let dispatch = useDispatch();
  const {customerId} = useParams()

  let showType = getAccessType("Actions(Workdone)");
  let shouldIncludeEditColumn = false;
  if (showType === "visible") {
    shouldIncludeEditColumn = true;
  }

  let dbConfigList = useSelector((state) => {
    let interdata = state?.financeData?.getPOWorkDoneBased || [];
    return interdata?.map((itm) => {
      let updateditm = {
        ...itm,
      };
      return updateditm;
    });
  });

  let dbConfigTotalCount = useSelector((state) => {
    let interdata = state?.financeData?.getPOWorkDoneBased || [];
    if (interdata.length > 0) {
      return interdata[0]["overall_table_count"];
    } else {
      return 0;
    }
  });

  let projectTypeList = useSelector((state) => {
    return state?.filterData?.getfinancialworkdoneprojecttype.map((itm) => {
      return {
        label: itm.projectType,
        value: itm.uid,
      };
    });
  });

  let listYear = [];
  for (let ywq = 2021; ywq <= +endDate; ywq++) {
    listYear.push(ywq);
  }


  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setValues,
    getValues,
    formState: { errors },
  } = useForm();

  let table = {
    columns: [
      {
        name: "Customer",
        value: "customer",
        style: "min-w-[120px] max-w-[200px] text-center sticky left-0 bg-[#3e454d] z-10",
      },
      {
        name: "Project Group",
        value: "projectGroup",
        style: "min-w-[140px] max-w-[200px] text-center sticky left-[120px] bg-[#3e454d] z-10",
      },
      {
        name: "Project Type",
        value: "projectType",
        style: "min-w-[100px] max-w-[200px] text-center p-2",
      },
      {
        name: "Project ID",
        value: "projectId",
        style: "min-w-[160px] max-w-[200px] text-center  bg-[#3e454d] z-10",
      },
      {
        name: "Sub Project",
        value: "subProject",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "SSID",
        value: "systemId",
        style: "min-w-[120px] max-w-[200px] text-center bg-[#3e454d] z-10",
      },
      {
        name: "Site ID",
        value: "Site Id",
        style: "min-w-[140px] max-w-[200px] text-center bg-[#3e454d] z-10",
      },
      {
        name: "BAND",
        value: "BAND",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Activity",
        value: "ACTIVITY",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "MS1 Completion Date",
        value: "MS1",
        style: "min-w-[160px] max-w-[200px] text-center",
      },
      {
        name: "MS2 Completion Date",
        value: "MS2",
        style: "min-w-[160px] max-w-[200px] text-center",
      },
      {
        name: "Billing Status",
        value: "siteBillingStatus",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Invoice Date",
        value: "invoiceDate",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Unbilled MS1 Done",
        value: "amount1",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Unbilled MS2 Done",
        value: "amount2",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Total Unbilled",
        value: "final_amount",
        style: "min-w-[100px] max-w-[200px] text-center",
      },
      {
        name: "Item Code 1",
        value: "itemCode01",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Item Code 2",
        value: "itemCode02",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Item Code 3",
        value: "itemCode03",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Item Code 4",
        value: "itemCode04",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Item Code 5",
        value: "itemCode05",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Item Code 6",
        value: "itemCode06",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
      {
        name: "Item Code 7",
        value: "itemCode07",
        style: "min-w-[140px] max-w-[200px] text-center",
      },
    ],
    properties: {
      rpp: [10, 20, 50, 100],
    },
    filter: [
      {
        label: "Project Type",
        type: "select",
        name: "projectType",
        option: projectTypeList,
        props: {},
      },
      {
        label: "Site ID",
        type: "text",
        name: "siteId",
        props: {},
      },
      {
        label: "Billing Status",
        type: "select",
        name: "siteBillingStatus",
        option: [
          { label: "Billed", value: "Billed" },
          { label: "Unbilled", value: "Unbilled" },
        ],
        props: {},
      },
    ],
  };

  const onSubmit = (data) => {
    let shouldReset = data.reseter;
    delete data.reseter;
    let strVal = objectToQueryString(data);
    setstrVal(strVal);
    dispatch(FinanceActions.getPOWorkDoneBased(true, "", strVal,customerId));
  };

  useEffect(() => {
    dispatch(GET_POWORKDONE_BASED({dataAll:[],reset:true}))
    dispatch(FinanceActions.getPOWorkDoneBased(true,"","",customerId));
    dispatch(FilterActions.getfinancialWorkDoneProjectType(true,"",0,customerId));
  }, [dispatch]);

  return (
    <>
      <AdvancedTable
        headerButton={
          <>
            <ConditionalButton
              showType={getAccessType("Export(Workdone)")}
              name={"Export"}
              classes="w-auto mr-1"
              onClick={() => {
                dispatch(CommonActions.commondownload(`/export/poWorkDone/${customerId}` + "?" + strValFil,"Export_PO_WorkDone.xlsx"))
              }}
            ></ConditionalButton>
          </>
        }
        table={table}
        filterAfter={onSubmit}
        tableName={"UserListTable"}
        handleSubmit={handleSubmit}
        data={dbConfigList}
        errors={errors}
        register={register}
        setValue={setValue}
        getValues={getValues}
        totalCount={dbConfigTotalCount}
        heading={"Total Count:- "}
      />
    </>
  );
};

export default WorkDone;
