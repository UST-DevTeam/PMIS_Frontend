import Api from "../../utils/api"
import { Urls } from "../../utils/url"
import { ALERTS } from "../reducers/component-reducer"
import {
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
    GET_DA_FILL,
    GET_EXPENSE_EMP_NAME,
    GET_EXPENSE_EMP_CODE,
    GET_EXPENSE_DA_PROJECT_ID,
    GET_EXPENSE_DA_COST_CENTER,
    GET_EXPENSES_BY_EXPENSESNO_IN_POPUP,
    GET_DOWNLOAD_ATTACHMENT,
    GET_HR_ALL_EXPENSES,
    GET_HR_ALL_ADVANCE,
    GET_USER_LIMIT,
    GET_SETTLEMENT_AMOUNT
} from "../reducers/expenseAdvance-reducer"


const ExpenseAdvanceActions = {

    getClaimAndAdvance:(reset=true,args="") => async (dispatch, _) => {
        try {
            const res = await Api.get({ url:`${Urls.expAdv_claim_and_advance}${args!=""?"?"+args:""}`, reset })
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_CLAIM_AND_ADVANCE({dataAll,reset}))
        } catch (error) {
        }
    },
    getClaimAndAdvancebyNumber:(reset=true,args="" , cb=() => {}) => async (dispatch, _) => {
        try {
            const res = await Api.get({ url:`${Urls.expAdv_claim_and_advance}${args!=""?"?"+args:""}`, reset })
            
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            cb(dataAll)
        } catch (error) {
        }
    },

    getFillExpense:(reset=true,args="") => async (dispatch, _) => {
        try {
            const res = await Api.get({ url:`${Urls.expAdv_fill_expense}${args!=""?"?"+args:""}`, reset })
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_FILL_EXPENSE({dataAll,reset}))
        } catch (error) {
        }
    },
    postFillExpense: (reset, data, cb, uniqueId) => async (dispatch, _) => {
        try {
            const res = await Api.post({ data: data, url: uniqueId == null ? Urls.expAdv_fill_expense : Urls.expAdv_fill_expense + "/" + uniqueId , contentType:"multipart/form-data", reset} )
            if (res?.status !== 201 && res?.status !== 200) {
                let msgdata = {
                    show: true,
                    icon: "error",
                    buttons: [],
                    type: 1,
                    text: res?.data?.msg,
                };
                
                dispatch(ALERTS(msgdata));
            }else{
                cb()

            }
            
        } catch (error) {
            console.log(error,'errorerror')
            return;
        }
    },

    getFillAdvance:(reset=true,args="") => async (dispatch, _) => {
        try {
            const res = await Api.get({ url:`${Urls.expAdv_fill_advance}${args!=""?"?"+args:""}`, reset })
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_FILL_ADVANCE({dataAll,reset}))
        } catch (error) {
        }
    },
    postFillAdvance: (reset, data, cb, uniqueId) => async (dispatch, _) => {
        try {
            const res = await Api.post({ data: data, url: uniqueId == null ? Urls.expAdv_fill_advance : Urls.expAdv_fill_advance + "/" + uniqueId , contentType:"multipart/form-data", reset} )
            if (res?.status !== 201 && res?.status !== 200) {
                let msgdata = {
                    show: true,
                    icon: "error",
                    buttons: [],
                    type: 1,
                    text: res?.data?.msg,
                };
                dispatch(ALERTS(msgdata));
            }else{
                cb()

            }
            
        } catch (error) {
            return;
        }
    },

    getClaimTypeAdvance:(reset=true,args="") => async (dispatch, _) => {
        try {
            const res = await Api.get({ url:`${Urls.expAdv_claimType_advance}${args!=""?"?"+args:""}`, reset })
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_CLAIMTYPE_ADVANCE({dataAll,reset}))
        } catch (error) {
        }
    },

    getExpADvPrjectDetails:(reset=true,args="") => async (dispatch, _) => {
        try {
            const res = await Api.get({ url:`${Urls.expAdv_project_details}${args!=""?"?"+args:""}`, reset })
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_EXPADV_PROJECT_DETAILS({dataAll,reset}))
        } catch (error) {
        }
    },

    getExpADvSiteID:(reset=true,args="") => async (dispatch, _) => {
        try {
            const res = await Api.get({ url:`${Urls.expAdv_siteId}${args!=""?"?"+args:""}`, reset })
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_EXPADV_SITE_ID({dataAll,reset}))
        } catch (error) {
        }
    },

    getExpADvTaskName:(reset=true,args="") => async (dispatch, _) => {
        try {
            const res = await Api.get({ url:`${Urls.expAdv_taskName}${args!=""?"?"+args:""}`, reset })
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_EXPADV_TASK_NAME({dataAll,reset}))
        } catch (error) {
        }
    },

    getUnitRateClaimType:(reset=true,args="") => async (dispatch, _) => {
        try {
            const res = await Api.get({ url:`${Urls.expAdv_unitRate_claimType}${args!=""?"?"+args:""}`, reset })
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_UNIT_RATE_CLAIM_TYPE({dataAll,reset}))
        } catch (error) {
        }
    },

    getL1Data:(reset=true,args="", cb = () => {}) => async (dispatch, _) => {
        try {
            const res = await Api.get({ url:`${Urls.expAdv_L1Data}${args!=""?"?"+args:""}`, reset })
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_L1_DATA({dataAll,reset}))
            cb()
        } catch (error) {
        }
    },
    getL1AdvanceData:(reset=true,args="", cb = () => {}) => async (dispatch, _) => {
        try {
            const res = await Api.get({ url:`${Urls.expAdv_L1AdvanceData}${args!=""?"?"+args:""}`, reset })
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_L1_ADVANCE_DATA({dataAll,reset}))
            cb()
        } catch (error) {
        }
    },

    getL2Data:(reset=true,args="") => async (dispatch, _) => {
        try {
            const res = await Api.get({ url:`${Urls.expAdv_L2Data}${args!=""?"?"+args:""}`, reset })
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_L2_DATA({dataAll,reset}))
        } catch (error) {
        }
    },
    getL2AdvanceData:(reset=true,args="", cb = () => {}) => async (dispatch, _) => {
        try {
            const res = await Api.get({ url:`${Urls.expAdv_L2AdvanceData}${args!=""?"?"+args:""}`, reset })
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_L2_ADVANCE_DATA({dataAll,reset}))
            cb()
        } catch (error) {
        }
    },

    getL3Data:(reset=true,args="") => async (dispatch, _) => {
        try {
            const res = await Api.get({ url:`${Urls.expAdv_L3Data}${args!=""?"?"+args:""}`, reset })
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_L3_DATA({dataAll,reset}))
        } catch (error) {
        }
    },
    getL3AdvanceData:(reset=true,args="", cb = () => {}) => async (dispatch, _) => {
        try {
            const res = await Api.get({ url:`${Urls.expAdv_L3AdvanceData}${args!=""?"?"+args:""}`, reset })
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_L3_ADVANCE_DATA({dataAll,reset}))
            cb()
        } catch (error) {
        }
    },

    approvalStatus:(reset=true,args="") => async (dispatch, _) => {
        try {
            const res = await Api.get({ url:`${Urls.expAdv_Approval}${args!=""?"?"+args:""}`, reset })
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_APPROVAL_STATUS({dataAll,reset}))
        } catch (error) {
        }
    },

    postApprovalStatus: (reset, data, cb = () => {}, uniqueId) => async (dispatch, _) => {
        
        try { 
            const res = await Api.post({ url: Urls[uniqueId ? 'expAdv_Approval' : 'expAdv_Approval'] + `${uniqueId ? '/'+uniqueId : ''}` , data , reset} )
            if (res?.status !== 201 && res?.status !== 200) {
                let msgdata = {
                    show: true,
                    icon: "error",
                    buttons: [],
                    type: 1,
                    text: res?.data?.msg,
                };
                dispatch(ALERTS(msgdata));
            }else{
                cb()

            }
            
        } catch (error) {
            return;
        }
    },




    getSettlementAmount:(reset=true,args="") => async (dispatch, _) => {
        try {
            const res = await Api.get({ url:`${Urls.settlementAmount}${args!=""?"?"+args:""}`, reset })
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_SETTLEMENT_AMOUNT({dataAll,reset}))
        } catch (error) {
        }
    },

    // postSettlementAmount: (reset, data, cb, uniqueId) => async (dispatch, _) => {
    //     try {
    //         const res = await Api.post({ data: data, url: uniqueId == null ? Urls.settlementAmount : Urls.settlementAmount + "/" + uniqueId ,data, reset} )
    //         if (res?.status !== 201 && res?.status !== 200) {
    //             let msgdata = {
    //                 show: true,
    //                 icon: "error",
    //                 buttons: [],
    //                 type: 1,
    //                 text: res?.data?.msg,
    //             };
    //             dispatch(ALERTS(msgdata));
    //         }else{
    //             cb()

    //         }
            
    //     } catch (error) {
    //         return;
    //     }
    // },
    postSettlementAmount: (data, cb, uniqueId) => async (dispatch, _) => {
        try {
            const res = await Api.post({ data: data, url: uniqueId == null ? Urls.settlementAmount : Urls.settlementAmount + "/" + uniqueId })
            if (res?.status !== 201 && res?.status !== 200) {
                let msgdata = {
                    show: true,
                    icon: "error",
                    buttons: [],
                    type: 1,
                    text: res?.data?.msg,
                };
                dispatch(ALERTS(msgdata));
            }else{
                cb()

            }
            
        } catch (error) {
            return;
        }
    },

    

    postApprovalAllExpenseStatus: (reset, data, cb, uniqueId) => async (dispatch, _) => {
        try {
            const res = await Api.post({ data: data, url: uniqueId == null ? Urls.expAdv_all_expense_approve : Urls.expAdv_all_expense_approve + "/" + uniqueId, reset} )
            if (res?.status !== 201 && res?.status !== 200) {
                let msgdata = {
                    show: true,
                    icon: "error",
                    buttons: [],
                    type: 1,
                    text: res?.data?.msg,
                };
                dispatch(ALERTS(msgdata));
            }else{
                cb()

            }
            
        } catch (error) {
            return;
        }
    },

    getExpenseEMPName:(reset=true,args="") => async (dispatch, _) => {
        try {
            const res = await Api.get({ url:`${Urls.expAdv_expense_emp_name}${args!=""?"?"+args:""}`, reset })
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_EXPENSE_EMP_NAME({dataAll,reset}))
        } catch (error) {
        }
    },

    getExpenseEMPCode:(reset=true,args="") => async (dispatch, _) => {
        try {
            const res = await Api.get({ url:`${Urls.expAdv_expense_emp_code}${args!=""?"?"+args:""}`, reset })
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_EXPENSE_EMP_CODE({dataAll,reset}))
        } catch (error) {
        }
    },

    getDAFill:(uniqueId,reset=true,args="") => async (dispatch, _) => {
        try {
            if(uniqueId === 'undefined'){
                const res = await Api.get({ url:`${Urls.expAdv_DA_Fill}/${args!=""?"?"+args:""}`, reset })
                if (res?.status !== 200) return
                let dataAll = res?.data?.data
                dispatch(GET_DA_FILL({dataAll,reset}))
            }
            else{
                const res = await Api.get({ url:`${Urls.expAdv_DA_Fill}/${uniqueId}${args!=""?"?"+args:""}`, reset })
                if (res?.status !== 200) return
                let dataAll = res?.data?.data
                dispatch(GET_DA_FILL({dataAll,reset}))
            }
            
        } catch (error) {
        }
    },
    postDAFill: (reset, data, cb, uniqueId,) => async (dispatch, _) => {
        try {
            const res = await Api.post({ data: data, url: uniqueId == null ? Urls.expAdv_DA_Fill : Urls.expAdv_DA_Fill + "/" + uniqueId, reset} )
            if (res?.status !== 201 && res?.status !== 200) {
                let msgdata = {
                    show: true,
                    icon: "error",
                    buttons: [],
                    type: 1,
                    text: res?.data?.msg,
                };
                dispatch(ALERTS(msgdata));
            }else{
                cb()

            }
            
        } catch (error) {
            return;
        }
    },

    getExpenseDAProjectId:(reset=true,args="") => async (dispatch, _) => {
        try {
            const res = await Api.get({ url:`${Urls.expAdv_DA_project_Id}${args!=""?"?"+args:""}`, reset })
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_EXPENSE_DA_PROJECT_ID({dataAll,reset}))
        } catch (error) {
        }
    },

    getExpenseDACostCenter:(reset=true,args="") => async (dispatch, _) => {
        try {
            const res = await Api.get({ url:`${Urls.expAdv_DA_cost_center}${args!=""?"?"+args:""}`, reset })
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_EXPENSE_DA_COST_CENTER({dataAll,reset}))
        } catch (error) {
        }
    },

    getExpensesByExpenseNoInPopUp:(reset=true,args="" , cb = () => {}) => async (dispatch, _) => {
        try {
            const res = await Api.get({ url:`${Urls.expAdv_expenses_by_expensesNo_in_popup}${args!=""?"?"+args:""}`, reset })
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_EXPENSES_BY_EXPENSESNO_IN_POPUP({dataAll,reset}))
            cb()
        } catch (error) {
        }
    },

    DownloadExpenseAttachment:(reset=true,args="") => async (dispatch, _) => {
        try {
            const res = await Api.get({ url:`${Urls.expAdv_download_attachment}${args!=""?"?"+args:""}`, reset })
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_DOWNLOAD_ATTACHMENT({dataAll,reset}))
        } catch (error) {
        }
    },

    getHRAllExpenses:(reset=true,args="" , cb = () => {}) => async (dispatch, _) => {
        try {
            const res = await Api.get({ url:`${Urls.expAdv_hr_all_expenses}${args!=""?"?"+args:""}`, reset })
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_HR_ALL_EXPENSES({dataAll,reset}))
            cb()
        } catch (error) {
        }
    },
    getHRAllAdvance:(reset=true,args="" , cb = () => {}) => async (dispatch, _) => {
        try {
            const res = await Api.get({ url:`${Urls.expAdv_hr_all_advance}${args!=""?"?"+args:""}`, reset })
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_HR_ALL_ADVANCE({dataAll,reset}))
            cb()
        } catch (error) {
        }
    },
    getUserLimit:(id,reset=true,args="" , cb = () => {}) => async (dispatch, _) => {
        try {
            if (id!=null){
                const res = await Api.get({ url:`${Urls.expAdv_user_limit}/${id}${args!=""?"?"+args:""}`, reset })
                if (res?.status !== 200) return
                let dataAll = res?.data?.data
                dispatch(GET_USER_LIMIT({dataAll,reset}))
                cb()
            }
            
        } catch (error) {
        }
    },

}
export default ExpenseAdvanceActions;