import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    getClaimAndAdvance:[],
    getExpADvPrjectDetails:[],
    getExpADvSiteID:[],
    getExpADvTaskName:[],
    getFillExpense:[],
    getFillAdvance:[],
    getClaimTypeAdvance:[],
    getUnitRateClaimType:[],
    getL1Data:[],
    getL1AdvanceData:[],
    getL2Data:[],
    getL2AdvanceData:[],
    getL3Data:[],
    getL3AdvanceData:[],
    approvalStatus:[],
    getExpenseEMPCode:[],
    getExpenseEMPName:[],
    getDAFill:[],
    getExpenseDAProjectId:[],
    getExpensesByExpenseNoInPopUp:[],
    DownloadExpenseAttachment:[],
    getHRAllExpenses:[],
    getHRAllAdvance:[],
    getUserLimit:[],
    getSettlementAmount:[],
   
}

const ExpenseAdvanceReducer = createSlice({
    name:'ExpenseAdvanceReducer',
    initialState,
    reducers:{
       CLEAR_GET_CLAIM_AND_ADVANCE :(state,{payload}) => {
            // if(payload.reset){
                state.getL2Data =[]
            // }else{
            //     state.getClaimAndAdvance  = [...state.getClaimAndAdvance,...payload.dataAll]
            // }
        },
        GET_CLAIM_AND_ADVANCE:(state,{payload}) => {
            if(payload.reset){
                state.getClaimAndAdvance = payload.dataAll
            }else{
                state.getClaimAndAdvance  = [...state.getClaimAndAdvance,...payload.dataAll]
            }
        },
        GET_SETTLEMENT_AMOUNT:(state,{payload}) => {
            if(payload.reset){
                state.getSettlementAmount = payload.dataAll
            }else{
                state.getSettlementAmount  = [...state.getSettlementAmount,...payload.dataAll]
            }
        },

        GET_FILL_EXPENSE:(state,{payload}) => {
            if(payload.reset){
                state.getFillExpense = payload.dataAll
            }else{
                state.getFillExpense  = [...state.getFillExpense,...payload.dataAll]
            }
        },

        GET_FILL_ADVANCE:(state,{payload}) => {
            if(payload.reset){
                state.getFillAdvance = payload.dataAll
            }else{
                state.getFillAdvance  = [...state.getFillAdvance,...payload.dataAll]
            }
        },

        GET_CLAIMTYPE_ADVANCE:(state,{payload}) => {
            if(payload.reset){
                state.getClaimTypeAdvance = payload.dataAll
            }else{
                state.getClaimTypeAdvance  = [...state.getClaimTypeAdvance,...payload.dataAll]
            }
        },

        GET_EXPADV_PROJECT_DETAILS:(state,{payload}) => {
            if(payload.reset){
                state.getExpADvPrjectDetails = payload.dataAll
            }else{
                state.getExpADvPrjectDetails = [...state.getExpADvPrjectDetails,...payload.dataAll]
            }
        },

        GET_EXPADV_SITE_ID:(state,{payload}) => {
            if(payload.reset){
                state.getExpADvSiteID = payload.dataAll
            }else{
                state.getExpADvSiteID  = [...state.getExpADvSiteID,...payload.dataAll]
            }
        },

        GET_EXPADV_TASK_NAME:(state,{payload}) => {
            if(payload.reset){
                state.getExpADvTaskName = payload.dataAll
            }else{
                state.getExpADvTaskName  = [...state.getExpADvTaskName,...payload.dataAll]
            }
        },

        GET_UNIT_RATE_CLAIM_TYPE:(state,{payload}) => {
            if(payload.reset){
                state.getUnitRateClaimType = payload.dataAll
            }else{
                state.getUnitRateClaimType  = [...state.getUnitRateClaimType,...payload.dataAll]
            }
        },

        GET_L1_DATA:(state,{payload}) => {
            if(payload.reset){
                state.getL1Data = payload.dataAll
            }else{
                state.getL1Data  = [...state.getL1Data,...payload.dataAll]
            }
        },
        GET_L1_ADVANCE_DATA:(state,{payload}) => {
            if(payload.reset){
                state.getL1AdvanceData = payload.dataAll
            }else{
                state.getL1AdvanceData  = [...state.getL1AdvanceData,...payload.dataAll]
            }
        },

        GET_L2_DATA:(state,{payload}) => {
            if(payload.reset){
                state.getL2Data = payload.dataAll
            }else{
                state.getL2Data  = [...state.getL2Data,...payload.dataAll]
            }
        },
        GET_L2_ADVANCE_DATA:(state,{payload}) => {
            if(payload.reset){
                state.getL2AdvanceData = payload.dataAll
            }else{
                state.getL2AdvanceData  = [...state.getL2AdvanceData,...payload.dataAll]
            }
        },

        GET_L3_DATA:(state,{payload}) => {
            if(payload.reset){
                state.getL3Data = payload.dataAll
            }else{
                state.getL3Data  = [...state.getL3Data,...payload.dataAll]
            }
        },
        GET_L3_ADVANCE_DATA:(state,{payload}) => {
            if(payload.reset){
                state.getL3AdvanceData = payload.dataAll
            }else{
                state.getL3AdvanceData  = [...state.getL3AdvanceData,...payload.dataAll]
            }
        },

        GET_APPROVAL_STATUS:(state,{payload}) => {
            if(payload.reset){
                state.approvalStatus = payload.dataAll
            }else{
                state.approvalStatus  = [...state.approvalStatus,...payload.dataAll]
            }
        },

        GET_EXPENSE_EMP_NAME:(state,{payload}) => {
            if(payload.reset){
                state.getExpenseEMPName = payload.dataAll
            }else{
                state.getExpenseEMPName  = [...state.getExpenseEMPName,...payload.dataAll]
            }
        },

        GET_EXPENSE_EMP_CODE:(state,{payload}) => {
            if(payload.reset){
                state.getExpenseEMPCode = payload.dataAll
            }else{
                state.getExpenseEMPCode  = [...state.getExpenseEMPCode,...payload.dataAll]
            }
        },

        GET_DA_FILL:(state,{payload}) => {
            if(payload.reset){
                state.getDAFill = payload.dataAll
            }else{
                state.getDAFill  = [...state.getDAFill,...payload.dataAll]
            }
        },

        GET_EXPENSE_DA_PROJECT_ID:(state,{payload}) => {
            if(payload.reset){
                state.getExpenseDAProjectId = payload.dataAll
            }else{
                state.getExpenseDAProjectId  = [...state.getExpenseDAProjectId,...payload.dataAll]
            }
        },

        GET_EXPENSE_DA_COST_CENTER:(state,{payload}) => {
            if(payload.reset){
                state.getExpenseDACostCenter = payload.dataAll
            }else{
                state.getExpenseDACostCenter  = [...state.getExpenseDACostCenter,...payload.dataAll]
            }
        },
        
        GET_EXPENSES_BY_EXPENSESNO_IN_POPUP:(state,{payload}) => {
            if(payload.reset){
                state.getExpensesByExpenseNoInPopUp = payload.dataAll
            }else{
                state.getExpensesByExpenseNoInPopUp  = [...state.getExpensesByExpenseNoInPopUp,...payload.dataAll]
            }
        },

        GET_DOWNLOAD_ATTACHMENT:(state,{payload}) => {
            if(payload.reset){
                state.DownloadExpenseAttachment = payload.dataAll
            }else{
                state.DownloadExpenseAttachment  = [...state.DownloadExpenseAttachment,...payload.dataAll]
            }
        },

        GET_HR_ALL_EXPENSES:(state,{payload}) => {
            if(payload.reset){
                state.getHRAllExpenses = payload.dataAll
            }else{
                state.getHRAllExpenses  = [...state.getHRAllExpenses,...payload.dataAll]
            }
        },
        GET_HR_ALL_ADVANCE:(state,{payload}) => {
            if(payload.reset){
                state.getHRAllAdvance = payload.dataAll
            }else{
                state.getHRAllAdvance  = [...state.getHRAllAdvance,...payload.dataAll]
            }
        },
        GET_USER_LIMIT:(state,{payload}) => {
            if(payload.reset){
                state.getUserLimit = payload.dataAll
            }else{
                state.getUserLimit  = [...state.getUserLimit,...payload.dataAll]
            }
        },

        
    }
})

export const {
    GET_CLAIM_AND_ADVANCE,
    GET_FILL_EXPENSE,
    GET_FILL_ADVANCE,
    GET_CLAIMTYPE_ADVANCE,
    GET_EXPADV_PROJECT_DETAILS,
    GET_EXPADV_SITE_ID,
    GET_EXPADV_TASK_NAME,
    GET_UNIT_RATE_CLAIM_TYPE,
    GET_L1_DATA,
    GET_L1_ADVANCE_DATA,
    GET_L2_DATA,
    GET_L2_ADVANCE_DATA,
    GET_L3_DATA,
    GET_L3_ADVANCE_DATA,
    GET_APPROVAL_STATUS,
    GET_EXPENSE_EMP_NAME,
    GET_EXPENSE_EMP_CODE,
    GET_DA_FILL,
    GET_EXPENSE_DA_PROJECT_ID,
    GET_EXPENSE_DA_COST_CENTER,
    GET_EXPENSES_BY_EXPENSESNO_IN_POPUP,
    GET_DOWNLOAD_ATTACHMENT,
    GET_HR_ALL_EXPENSES,
    GET_HR_ALL_ADVANCE,
    CLEAR_GET_CLAIM_AND_ADVANCE,
    GET_USER_LIMIT,
    GET_SETTLEMENT_AMOUNT
} = ExpenseAdvanceReducer.actions
export default ExpenseAdvanceReducer.reducer