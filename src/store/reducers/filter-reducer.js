import { createSlice } from "@reduxjs/toolkit";

const initialState = {

    getProjectCircle: [],
    getProjectProjectId: [],
    getProjectProjectGroup: [],
    getProjectProjectType: [],
    getProjectProjectManager: [],
    getSiteSubProject: [],
    getfinancialPoManagementCustomer: [],
    getfinancialPoManagementProjectGroup: [],
    getfinancialPoManagementProjectId: [],
    getfinancialRevenueManagementCustomer: [],
    getfinancialRevenueManagementProjectGroup: [],
    getfinancialPoWOrkDoneCustomer:[],
    getautosuggestionProjectManager:[],
    getMyTaskSubProject:[],
    getformevmdeliveryprojecttype:[],
    getformevmdeliveryprojectid:[],
    getfinancialworkdoneprojecttype:[],
}

const filterData = createSlice({
    name:'filterData',
    initialState,
    reducers:{


        GET_FILTER_PROJECT_CIRCLE:(state,{payload}) => {
            if(payload.reset){
                state.getProjectCircle = payload.dataAll
            }else{
                state.getProjectCircle  = [...state.getProjectCircle,...payload.dataAll]
            }
        },

        GET_FILTER_PROJECT_PROJECTID:(state,{payload}) => {
            if(payload.reset){
                state.getProjectProjectId = payload.dataAll
            }else{
                state.getProjectProjectId  = [...state.getProjectProjectId,...payload.dataAll]
            }
        },

        GET_FILTER_PROJECT_PROJECTGROUP:(state,{payload}) => {
            if(payload.reset){
                state.getProjectProjectGroup = payload.dataAll
            }else{
                state.getProjectProjectGroup  = [...state.getProjectProjectGroup,...payload.dataAll]
            }
        },

        GET_FILTER_PROJECT_PROJECTTYPE:(state,{payload}) => {
            if(payload.reset){
                state.getProjectProjectType = payload.dataAll
            }else{
                state.getProjectProjectType  = [...state.getProjectProjectType,...payload.dataAll]
            }
        },

        GET_FILTER_PROJECT_PROJECTMANAGER:(state,{payload}) => {
            if(payload.reset){
                state.getProjectProjectManager = payload.dataAll
            }else{
                state.getProjectProjectManager  = [...state.getProjectProjectManager,...payload.dataAll]
            }
        },

        GET_FILTER_SITE_SUBPROJECT:(state,{payload}) => {
            if(payload.reset){
                state.getSiteSubProject = payload.dataAll
            }else{
                state.getSiteSubProject  = [...state.getSiteSubProject,...payload.dataAll]
            }
        },

        GET_FILTER_MYTASK_SUBPROJECT:(state,{payload}) => {
            if(payload.reset){
                state.getMyTaskSubProject = payload.dataAll
            }else{
                state.getMyTaskSubProject  = [...state.getMyTaskSubProject,...payload.dataAll]
            }
        },

        GET_FILTER_FINANCIAL_POMANAGEMENT_CUSTOMER:(state,{payload}) => {
            if(payload.reset){
                state.getfinancialPoManagementCustomer = payload.dataAll
            }else{
                state.getfinancialPoManagementCustomer  = [...state.getfinancialPoManagementCustomer,...payload.dataAll]
            }
        },

        GET_FILTER_FINANCIAL_POMANAGEMENT_PEOJECTGROUP:(state,{payload}) => {
            if(payload.reset){
                state.getfinancialPoManagementProjectGroup = payload.dataAll
            }else{
                state.getfinancialPoManagementProjectGroup  = [...state.getfinancialPoManagementProjectGroup,...payload.dataAll]
            }
        },

        GET_FILTER_FINANCIAL_POMANAGEMENT_PEOJECTID:(state,{payload}) => {
            if(payload.reset){
                state.getfinancialPoManagementProjectId = payload.dataAll
            }else{
                state.getfinancialPoManagementProjectId  = [...state.getfinancialPoManagementProjectId,...payload.dataAll]
            }
        },

        GET_FILTER_FINANCIAL_REVENUEMANAGEMENT_CUSTOMER:(state,{payload}) => {
            if(payload.reset){
                state.getfinancialRevenueManagementCustomer = payload.dataAll
            }else{
                state.getfinancialRevenueManagementCustomer  = [...state.getfinancialRevenueManagementCustomer,...payload.dataAll]
            }
        },

        GET_FILTER_FINANCIAL_REVENUEMANAGEMENT_PROJECTGROUP:(state,{payload}) => {
            if(payload.reset){
                state.getfinancialRevenueManagementProjectGroup = payload.dataAll
            }else{
                state.getfinancialRevenueManagementProjectGroup  = [...state.getfinancialRevenueManagementProjectGroup,...payload.dataAll]
            }
        },

        GET_FILTER_FINANCIAL_POWORKDONE_CUSTOMER:(state,{payload}) => {
            if(payload.reset){
                state.getfinancialPoWOrkDoneCustomer = payload.dataAll
            }else{
                state.getfinancialPoWOrkDoneCustomer  = [...state.getfinancialPoWOrkDoneCustomer,...payload.dataAll]
            }
        },

        GET_AUTO_SUGGESTION_PROJECT_MANAGER:(state,{payload}) => {
            if(payload.reset){
                state.getautosuggestionProjectManager = payload.dataAll
            }else{
                state.getautosuggestionProjectManager  = [...state.getautosuggestionProjectManager,...payload.dataAll]
            }
        },
        GET_FORM_EVMDelivery_PROJECT_TYPE:(state,{payload}) => {
            if(payload.reset){
                state.getformevmdeliveryprojecttype = payload.dataAll
            }else{
                state.getformevmdeliveryprojecttype  = [...state.getformevmdeliveryprojecttype,...payload.dataAll]
            }
        },
        GET_FORM_EVMDelivery_PROJECT_ID:(state,{payload}) => {
            if(payload.reset){
                state.getformevmdeliveryprojectid = payload.dataAll
            }else{
                state.getformevmdeliveryprojectid  = [...state.getformevmdeliveryprojectid,...payload.dataAll]
            }
        },

        GET_FINANCIAL_WORKDONE_PROJECT_TYPE:(state,{payload}) => {
            if(payload.reset){
                state.getfinancialworkdoneprojecttype = payload.dataAll
            }else{
                state.getfinancialworkdoneprojecttype  = [...state.getfinancialworkdoneprojecttype,...payload.dataAll]
            }
        },


    }
})

export const {  GET_FILTER_PROJECT_CIRCLE, 
                GET_FILTER_PROJECT_PROJECTID,
                GET_FILTER_PROJECT_PROJECTGROUP,
                GET_FILTER_PROJECT_PROJECTTYPE,
                GET_FILTER_PROJECT_PROJECTMANAGER,
                GET_FILTER_SITE_SUBPROJECT,
                GET_FILTER_FINANCIAL_POMANAGEMENT_CUSTOMER,
                GET_FILTER_FINANCIAL_POMANAGEMENT_PEOJECTGROUP,
                GET_FILTER_FINANCIAL_POMANAGEMENT_PEOJECTID,
                GET_FILTER_FINANCIAL_REVENUEMANAGEMENT_CUSTOMER,
                GET_FILTER_FINANCIAL_REVENUEMANAGEMENT_PROJECTGROUP,
                GET_FILTER_FINANCIAL_POWORKDONE_CUSTOMER,
                GET_AUTO_SUGGESTION_PROJECT_MANAGER,
                GET_FILTER_MYTASK_SUBPROJECT,
                GET_FORM_EVMDelivery_PROJECT_TYPE,
                GET_FORM_EVMDelivery_PROJECT_ID,
                GET_FINANCIAL_WORKDONE_PROJECT_TYPE
            } = filterData.actions
    
export default filterData.reducer