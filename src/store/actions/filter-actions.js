import Api from "../../utils/api"
import { Urls } from "../../utils/url"
import {
        GET_FILTER_PROJECT_PROJECTID,
        GET_FILTER_PROJECT_PROJECTGROUP,
        GET_FILTER_PROJECT_PROJECTTYPE,
        GET_FILTER_PROJECT_PROJECTMANAGER,
        GET_FILTER_PROJECT_CIRCLE,
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
 } from "../reducers/filter-reducer"


const FilterActions = {

    
    getProjectProjectId:(customeruniqueId,reset=true,args="") => async (dispatch, _) => {
        try {
            const res = await Api.get({ url:`${Urls.filter_project_projectId}/${customeruniqueId}${args!=""?"?"+args:""}`, reset })
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_FILTER_PROJECT_PROJECTID({dataAll,reset}))
        } catch (error) {
        }
    },

    getProjectProjectGroup:(customeruniqueId,reset=true,args="") => async (dispatch, _) => {
        try {
            const res = await Api.get({ url:`${Urls.filter_project_projectGroup}/${customeruniqueId}${args!=""?"?"+args:""}`, reset })
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_FILTER_PROJECT_PROJECTGROUP({dataAll,reset}))
        } catch (error) {
        }
    },

    getProjectProjectType:(customeruniqueId,reset=true,args="") => async (dispatch, _) => {
        try {
            const res = await Api.get({ url:`${Urls.filter_project_projectType}${args!=""?"?"+args:""}`, reset })
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_FILTER_PROJECT_PROJECTTYPE({dataAll,reset}))
        } catch (error) {
        }
    },

    getProjectProjectManager:(customeruniqueId,reset=true,args="") => async (dispatch, _) => {
        try {
            const res = await Api.get({ url:`${Urls.filter_project_projectManager}/${customeruniqueId}${args!=""?"?"+args:""}`, reset })
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_FILTER_PROJECT_PROJECTMANAGER({dataAll,reset}))
        } catch (error) {
        }
    },

    getProjectCircle:(customeruniqueId,reset=true,args="") => async (dispatch, _) => {
        try {
            const res = await Api.get({ url:`${Urls.filter_project_circle}/${customeruniqueId}${args!=""?"?"+args:""}`, reset })
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_FILTER_PROJECT_CIRCLE({dataAll,reset}))
        } catch (error) {
        }
    },

    getSiteSubProject:(projectuniqueId,reset=true,args="",show=1) => async (dispatch, _) => {
        try {
            const res = await Api.get({ url:`${Urls.filter_site_subProject}/${projectuniqueId}${args!=""?"?"+args:""}`, reset ,show:show})
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_FILTER_SITE_SUBPROJECT({dataAll,reset}))
        } catch (error){

        }
    },

    getMyTaskSubProject:(reset=true,args="",id) => async (dispatch, _) => {
        try {
            const res = await Api.get({ url:`${Urls.filter_myTask_subProject}/${id}${args!=""?"?"+args:""}`, reset })
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_FILTER_MYTASK_SUBPROJECT({dataAll,reset}))
        } catch (error){

        }
    },

    getfinancialPoManagementCustomer:(reset=true,args="") => async (dispatch, _) => {
        try {
            const res = await Api.get({ url:`${Urls.filter_financial_poManagement_customer}${args!=""?"?"+args:""}`, reset })
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_FILTER_FINANCIAL_POMANAGEMENT_CUSTOMER({dataAll,reset}))
        } catch (error){

        }
    },

    getfinancialPoManagementProjectGroup:(reset=true,args="") => async (dispatch, _) => {
        try {
            const res = await Api.get({ url:`${Urls.filter_financial_poManagement_projectGroup}${args!=""?"?"+args:""}`, reset })
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_FILTER_FINANCIAL_POMANAGEMENT_PEOJECTGROUP({dataAll,reset}))
        } catch (error){

        }
    },

    getfinancialPoManagementProjectId:(reset=true,args="") => async (dispatch, _) => {
        try {
            const res = await Api.get({ url:`${Urls.filter_financial_poManagement_projectId}${args!=""?"?"+args:""}`, reset })
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_FILTER_FINANCIAL_POMANAGEMENT_PEOJECTID({dataAll,reset}))
        } catch (error){

        }
    },

    getfinancialRevenueManagementCustomer:(reset=true,args="") => async (dispatch, _) => {
        try {
            const res = await Api.get({ url:`${Urls.filter_financial_RevenueManagement_customer}${args!=""?"?"+args:""}`, reset })
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_FILTER_FINANCIAL_REVENUEMANAGEMENT_CUSTOMER({dataAll,reset}))
        } catch (error){

        }
    },

    getfinancialRevenueManagementProjectGroup:(reset=true,args="") => async (dispatch, _) => {
        try {
            const res = await Api.get({ url:`${Urls.filter_financial_RevenueManagement_projectGroup}${args!=""?"?"+args:""}`, reset })
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_FILTER_FINANCIAL_REVENUEMANAGEMENT_PROJECTGROUP({dataAll,reset}))
        } catch (error){

        }
    },

    getfinancialPoWorkDoneCustomer:(reset=true,args="") => async (dispatch, _) => {
        try {
            const res = await Api.get({ url:`${Urls.filter_financial_poWorkDone_customer}${args!=""?"?"+args:""}`, reset })
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_FILTER_FINANCIAL_POWORKDONE_CUSTOMER({dataAll,reset}))
        } catch (error){

        }
    },

    getautosuggestionProjectManager:(reset=true,args="") => async (dispatch, _) => {
        try {
            const res = await Api.get({ url:`${Urls.autosuggestion_projectManager}${args!=""?"?"+args:""}`, reset })
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_AUTO_SUGGESTION_PROJECT_MANAGER({dataAll,reset}))
        } catch (error){

        }
    },

    getformEvmDeliveryProjectType:(reset=true,args="",show=1) => async (dispatch, _) => {
        try {
            const res = await Api.get({ url:`${Urls.filter_form_evmDelivery_projectType}${args!=""?"?"+args:""}`, reset ,show:show})
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_FORM_EVMDelivery_PROJECT_TYPE({dataAll,reset}))
        } catch (error){

        }
    },
    getformEvmDeliveryProjectId:(reset=true,args="",show=1) => async (dispatch, _) => {
        try {
            const res = await Api.get({ url:`${Urls.filter_form_evmDelivery_projectId}${args!=""?"?"+args:""}`, reset,show:show })
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_FORM_EVMDelivery_PROJECT_ID({dataAll,reset}))
        } catch (error){

        }
    },

    getfinancialWorkDoneProjectType:(reset=true,args="",show=1,customerId) => async (dispatch, _) => {
        try {
            const res = await Api.get({ url:`${Urls.filter_financial_workdone_projecttype}/${customerId}${args!=""?"?"+args:""}`, reset, show : show})
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_FINANCIAL_WORKDONE_PROJECT_TYPE({dataAll,reset}))
        } catch (error){

        }
    },

}
export default FilterActions;
