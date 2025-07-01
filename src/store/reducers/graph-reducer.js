import { createSlice } from "@reduxjs/toolkit";

const initialState = {

    getGraphProjectStatus: [],
    getGraphZoneInCirlceRevenue: [],
    getGraphMilestoneStatus: [],
    getGraphPoStatus: [],
    getGraphTotalActiveCustomer: [],
    getGraphMS1AndMS2CircleWise: [],
    getGraphOrganizationLevel: [],
    getGraphAllProjectType: [],
    getGraphPoTrackingWorkdone: [],
    getGraphAccrualRevenueTrend:[],
    getmonthjoining:[],
    getAirtelActiveEmpVerticalName:[],
    getmonthJoiningandresign:[],
    getGraphNewJoiningMonthly:[],
    getGraphMonthlyJoiningVsExit:[],
    getGraphMonthlyActiveTrend:[],
    getGraphWeeklyActiveEmp:[],
    getWeeklyHorizontalName:[],
    getGraphVendorActiveInactive:[],
    getGraphRevenuePlanVSActual_Trend:[],
    getGraphRevenuePlanVSActual_Circle:[],
    getGraphTrendExpenseAdvance:[],
    getGraphExpenseApprovalStatus:[],
    getGraphAdvanceApprovalStatus:[],
    getGraphTrendPlanVSActualWorkdone:[],
    getGraphCirclePlanVSActualWorkdone:[],
    getGraphCumulativeTrendPlanVsActual:[],
    getGraphCumulativeWorkdonePlanVsActual:[],
    getGraphMS2vsWCCPendingReason:[],
    getGraphSoftMS1vsMS2:[],
    getGraphphyMS1vsMS2:[],
    getGraphkpiMS1vsMS2:[],
    getGraphPAndLForms:[],
    getGraphPAndLTrends:[],
    getProjectTypeUnbilledGraph:[],
} 
 
const GraphData = createSlice({
    name:'GraphData',
    initialState,
    reducers:{


        GET_GRAPH_PROJECT_STATUS:(state,{payload}) => {
            if(payload.reset){
                state.getGraphProjectStatus = payload.dataAll
            }else{
                state.getGraphProjectStatus  = [...state.getGraphProjectStatus,...payload.dataAll]
            }
        },

        GET_GRAPH_ZONE_IN_CIRCLE_REVENUE:(state,{payload}) => {
            if(payload.reset){
                state.getGraphZoneInCirlceRevenue = payload.dataAll
            }else{
                state.getGraphZoneInCirlceRevenue  = [...state.getGraphZoneInCirlceRevenue,...payload.dataAll]
            }
        },

        GET_GRAPH_MILESTONE_STATUS:(state,{payload}) => {
            if(payload.reset){
                state.getGraphMilestoneStatus = payload.dataAll
            }else{
                state.getGraphMilestoneStatus  = [...state.getGraphMilestoneStatus,...payload.dataAll]
            }
        },

        GET_GRAPH_PO_STATUS:(state,{payload}) => {
            if(payload.reset){
                state.getGraphPoStatus = payload.dataAll
            }else{
                state.getGraphPoStatus  = [...state.getGraphPoStatus,...payload.dataAll]
            }
        },
        GET_TOTAL_ACTIVE_CUSTOMER:(state,{payload}) => {
            if(payload.reset){
                state.getGraphTotalActiveCustomer = payload.dataAll
            }else{
                state.getGraphTotalActiveCustomer  = [...state.getGraphTotalActiveCustomer,...payload.dataAll]
            }
        },

        GET_GRAPH_MS1_AND_MS2_CIRCLEWISE:(state,{payload}) => {
            if(payload.reset){
                state.getGraphMS1AndMS2CircleWise = payload.dataAll
            }else{
                state.getGraphMS1AndMS2CircleWise  = [...state.getGraphMS1AndMS2CircleWise,...payload.dataAll]
            }
        },

        GET_GRAPH_ORG_LEVEL:(state,{payload}) => {
            if(payload.reset){
                state.getGraphOrganizationLevel = payload.dataAll
            }else{
                state.getGraphOrganizationLevel  = [...state.getGraphOrganizationLevel,...payload.dataAll]
            }
        },

        GET_GRAPH_ALL_PROJECT_TYPE:(state,{payload}) => {
            if(payload.reset){
                state.getGraphAllProjectType = payload.dataAll
            }else{
                state.getGraphAllProjectType  = [...state.getGraphAllProjectType,...payload.dataAll]
            }
        },

        GET_GRAPH_PO_Tracking_WorkDone:(state,{payload}) => {
            if(payload.reset){
                state.getGraphPoTrackingWorkdone = payload.dataAll
            }else{
                state.getGraphPoTrackingWorkdone  = [...state.getGraphPoTrackingWorkdone,...payload.dataAll]
            }
        },

        GET_GRAPH_ACCRUAL_REVENUE_TREND:(state,{payload}) => {
            if(payload.reset){
                state.getGraphAccrualRevenueTrend = payload.dataAll
            }else{
                state.getGraphAccrualRevenueTrend  = [...state.getGraphAccrualRevenueTrend,...payload.dataAll]
            }
        },
        GET_MONTHLY_JOINING:(state,{payload}) => {
            if(payload.reset){
                state.getmonthjoining = payload.dataAll
            }else{
                state.getmonthjoining  = [...state.getmonthjoining,...payload.dataAll]
            }
        },
        GET_MONTHLY_JOINING_AND_RESIGN_DATE:(state,{payload}) => {
            if(payload.reset){
                state.getmonthJoiningandresign = payload.dataAll
            }else{
                state.getmonthJoiningandresign  = [...state.getmonthJoiningandresign,...payload.dataAll]
            }
        },

        GET_GRAPH_ActiveEmp_With_CC:(state,{payload}) => {
            if(payload.reset){
                state.getGraphActiveEmpWithCC = payload.dataAll
            }else{
                state.getGraphActiveEmpWithCC  = [...state.getGraphActiveEmpWithCC,...payload.dataAll]
            }
        },

        GET_AIRTEL_ACTIVE_EMP_VERTICAL_NAME:(state,{payload}) => {
            if(payload.reset){
                state.getAirtelActiveEmpVerticalName = payload.dataAll
            }else{
                state.getAirtelActiveEmpVerticalName  = [...state.getAirtelActiveEmpVerticalName,...payload.dataAll]
            }
        },

        GET_GRAPH_NEW_JOINING_MONTHLY:(state,{payload}) => {
            if(payload.reset){
                state.getGraphNewJoiningMonthly = payload.dataAll
            }else{
                state.getGraphNewJoiningMonthly  = [...state.getGraphNewJoiningMonthly,...payload.dataAll]
            }
        },

        GET_GRAPH_MONTHLY_JOINING_VS_EXIT:(state,{payload}) => {
            if(payload.reset){
                state.getGraphMonthlyJoiningVsExit = payload.dataAll
            }else{
                state.getGraphMonthlyJoiningVsExit  = [...state.getGraphMonthlyJoiningVsExit,...payload.dataAll]
            }
        },

        GET_GRAPH_MONTHLY_ACTIVE_TREND:(state,{payload}) => {
            if(payload.reset){
                state.getGraphMonthlyActiveTrend = payload.dataAll
            }else{
                state.getGraphMonthlyActiveTrend  = [...state.getGraphMonthlyActiveTrend,...payload.dataAll]
            }
        },

        GET_GRAPH_WEEKLY_ACTIVE_EMP:(state,{payload}) => {
            if(payload.reset){
                state.getGraphWeeklyActiveEmp = payload.dataAll
            }else{
                state.getGraphWeeklyActiveEmp  = [...state.getGraphWeeklyActiveEmp,...payload.dataAll]
            }
        },

        GET_WEEKLY_HORIZONTAL_NAME:(state,{payload}) => {
            if(payload.reset){
                state.getWeeklyHorizontalName = payload.dataAll
            }else{
                state.getWeeklyHorizontalName  = [...state.getWeeklyHorizontalName,...payload.dataAll]
            }
        },

        GET_GRAPH_VENDOR_ACTIVE_INACTIVE:(state,{payload}) => {
            if(payload.reset){
                state.getGraphVendorActiveInactive = payload.dataAll
            }else{
                state.getGraphVendorActiveInactive  = [...state.getGraphVendorActiveInactive,...payload.dataAll]
            }
        },

        GET_GRAPH_REVENUE_PLAN_VS_ACTUAL:(state,{payload}) => {
            if(payload.reset){
                state.getGraphRevenuePlanVSActual_Trend = payload.dataAll
            }else{
                state.getGraphRevenuePlanVSActual_Trend  = [...state.getGraphRevenuePlanVSActual_Trend,...payload.dataAll]
            }
        },

        GET_GRAPH_REVENUE_PLAN_VS_ACTUAL_Circle:(state,{payload}) => {
            if(payload.reset){
                state.getGraphRevenuePlanVSActual_Circle = payload.dataAll
            }else{
                state.getGraphRevenuePlanVSActual_Circle  = [...state.getGraphRevenuePlanVSActual_Circle,...payload.dataAll]
            }
        },

        GET_GRAPH_TREND_EXPENSE_ADVANCE:(state,{payload}) => {
            if(payload.reset){
                state.getGraphTrendExpenseAdvance = payload.dataAll
            }else{
                state.getGraphTrendExpenseAdvance  = [...state.getGraphTrendExpenseAdvance,...payload.dataAll]
            }
        },

        GET_GRAPH_EXPENSE_APPROVAL_STATUS:(state,{payload}) => {
            if(payload.reset){
                state.getGraphExpenseApprovalStatus = payload.dataAll
            }else{
                state.getGraphExpenseApprovalStatus  = [...state.getGraphExpenseApprovalStatus,...payload.dataAll]
            }
        },

        GET_GRAPH_ADVANCE_APPROVAL_STATUS:(state,{payload}) => {
            if(payload.reset){
                state.getGraphAdvanceApprovalStatus = payload.dataAll
            }else{
                state.getGraphAdvanceApprovalStatus  = [...state.getGraphAdvanceApprovalStatus,...payload.dataAll]
            }
        },
        
        GET_GRAPH_TREND_PLAN_VS_ACTUAL_WORKDONE:(state,{payload}) => {
            if(payload.reset){
                state.getGraphTrendPlanVSActualWorkdone = payload.dataAll
            }else{
                state.getGraphTrendPlanVSActualWorkdone  = [...state.getGraphTrendPlanVSActualWorkdone,...payload.dataAll]
            }
        },
        
        GET_GRAPH_Circle_PLAN_VS_ACTUAL_WORKDONE:(state,{payload}) => {
            if(payload.reset){
                state.getGraphCirclePlanVSActualWorkdone = payload.dataAll
            }else{
                state.getGraphCirclePlanVSActualWorkdone  = [...state.getGraphCirclePlanVSActualWorkdone,...payload.dataAll]
            }
        },

        GET_GRAPH_CUMULATIVE_TREND_PLAN_VS_ACTUAL:(state,{payload}) => {
            if(payload.reset){
                state.getGraphCumulativeTrendPlanVsActual = payload.dataAll
            }else{
                state.getGraphCumulativeTrendPlanVsActual  = [...state.getGraphCumulativeTrendPlanVsActual,...payload.dataAll]
            }
        },

        GET_GRAPH_CUMULATIVE_WORKDONE_PLAN_VS_ACTUAL:(state,{payload}) => {
            if(payload.reset){
                state.getGraphCumulativeWorkdonePlanVsActual = payload.dataAll
            }else{
                state.getGraphCumulativeWorkdonePlanVsActual  = [...state.getGraphCumulativeWorkdonePlanVsActual,...payload.dataAll]
            }
        },
        GET_GRAPH_MS2_VS_WCC_PENDING_REASON:(state,{payload}) => {
            if(payload.reset){
                state.getGraphMS2vsWCCPendingReason = payload.dataAll
            }else{
                state.getGraphMS2vsWCCPendingReason  = [...state.getGraphMS2vsWCCPendingReason,...payload.dataAll]
            }
        },

        GET_GRAPH_SOFT_MS1_VS_MS2:(state,{payload}) => {
            if(payload.reset){
                state.getGraphSoftMS1vsMS2 = payload.dataAll
            }else{
                state.getGraphSoftMS1vsMS2  = [...state.getGraphSoftMS1vsMS2,...payload.dataAll]
            }
        },

        GET_GRAPH_PHY_MS1_VS_MS2:(state,{payload}) => {
            if(payload.reset){
                state.getGraphphyMS1vsMS2 = payload.dataAll
            }else{
                state.getGraphphyMS1vsMS2  = [...state.getGraphphyMS1vsMS2,...payload.dataAll]
            }
        },

        GET_GRAPH_KPI_MS1_VS_MS2:(state,{payload}) => {
            if(payload.reset){
                state.getGraphkpiMS1vsMS2 = payload.dataAll
            }else{
                state.getGraphkpiMS1vsMS2  = [...state.getGraphkpiMS1vsMS2,...payload.dataAll]
            }
        },
        
        GET_GRAPH_P_AND_L_FORMS:(state,{payload}) => {
            if(payload.reset){
                state.getGraphPAndLForms = payload.dataAll
            }else{
                state.getGraphPAndLForms  = [...state.getGraphPAndLForms,...payload.dataAll]
            }
        },
        GET_GRAPH_P_AND_L_TRENDS:(state,{payload}) => {
            if(payload.reset){
                state.getGraphPAndLTrends = payload.dataAll
            }else{
                state.getGraphPAndLTrends  = [...state.getGraphPAndLTrends,...payload.dataAll]
            }
        },

        GET_GRAPH_PROJECT_TYPE_UNBILLED:(state,{payload}) => {
            if(payload.reset){
                state.getProjectTypeUnbilledGraph = payload.dataAll
            }else{
                state.getProjectTypeUnbilledGraph  = [...state.getProjectTypeUnbilledGraph,...payload.dataAll]
            }
        },

    }
})

export const { 
    GET_GRAPH_PROJECT_STATUS,
    GET_GRAPH_ZONE_IN_CIRCLE_REVENUE,
    GET_GRAPH_MILESTONE_STATUS,
    GET_GRAPH_PO_STATUS,
    GET_GRAPH_MS1_AND_MS2_CIRCLEWISE,
    GET_GRAPH_ORG_LEVEL,
    GET_TOTAL_ACTIVE_CUSTOMER,
    GET_GRAPH_ALL_PROJECT_TYPE,
    GET_GRAPH_PO_Tracking_WorkDone,
    GET_GRAPH_ACCRUAL_REVENUE_TREND,
    GET_MONTHLY_JOINING,
    GET_MONTHLY_JOINING_AND_RESIGN_DATE,
    GET_GRAPH_ActiveEmp_With_CC,
    GET_AIRTEL_ACTIVE_EMP_VERTICAL_NAME,
    GET_GRAPH_NEW_JOINING_MONTHLY,
    GET_GRAPH_MONTHLY_JOINING_VS_EXIT,
    GET_GRAPH_MONTHLY_ACTIVE_TREND,
    GET_GRAPH_WEEKLY_ACTIVE_EMP,
    GET_WEEKLY_HORIZONTAL_NAME,
    GET_GRAPH_VENDOR_ACTIVE_INACTIVE,
    GET_GRAPH_REVENUE_PLAN_VS_ACTUAL,
    GET_GRAPH_REVENUE_PLAN_VS_ACTUAL_Circle,
    GET_GRAPH_TREND_EXPENSE_ADVANCE,
    GET_GRAPH_EXPENSE_APPROVAL_STATUS,
    GET_GRAPH_ADVANCE_APPROVAL_STATUS,
    GET_GRAPH_TREND_PLAN_VS_ACTUAL_WORKDONE,
    GET_GRAPH_Circle_PLAN_VS_ACTUAL_WORKDONE,
    GET_GRAPH_CUMULATIVE_TREND_PLAN_VS_ACTUAL,
    GET_GRAPH_CUMULATIVE_WORKDONE_PLAN_VS_ACTUAL,
    GET_GRAPH_MS2_VS_WCC_PENDING_REASON,
    GET_GRAPH_SOFT_MS1_VS_MS2,
    GET_GRAPH_PHY_MS1_VS_MS2,
    GET_GRAPH_KPI_MS1_VS_MS2,
    GET_GRAPH_P_AND_L_FORMS,
    GET_GRAPH_P_AND_L_TRENDS,
    GET_GRAPH_PROJECT_TYPE_UNBILLED
} = GraphData.actions
    
export default GraphData.reducer    