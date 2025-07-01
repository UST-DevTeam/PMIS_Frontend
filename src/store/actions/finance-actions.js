import Api from "../../utils/api"
import { Urls } from "../../utils/url"
import { ALERTS } from "../reducers/component-reducer"
import {GET_INVOICE, GET_POINVOICED_BASED, GET_POWORKDONE_DASHBOARD, GET_POWORKDONE_BASED, GET_POWORKDONE_ITEMCODE, GET_POACCRUAL_REVENUE, GET_CUSTOMERS } from "../reducers/finance-reducer"


const FinanceActions = {

    getPOInvoicedBased:(reset=true,args="",customerId) => async (dispatch, _) => {
        try {
            const res = await Api.get({ url:`${Urls.finance_poinvoice_based}/${customerId}${args!=""?"?"+args:""}`, reset })
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_POINVOICED_BASED({dataAll,reset}))
        } catch (error) {
        }
    },
    postPOInvoicedBased: (reset, data, cb, uniqueId) => async (dispatch, _) => {
        try {
            const res = await Api.post({ data: data, url: uniqueId == null ? Urls.finance_poinvoice_based : Urls.finance_poinvoice_based + "/" + uniqueId })
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

    getPOWorkDoneDashboard:(reset=true,value,args="",customerId) => async (dispatch, _) => {
        try {
            const res = await Api.get({ url:`${Urls.finance_poworkdone_dashboard}/${customerId}${args!=""?"?"+args:""}`, value })
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_POWORKDONE_DASHBOARD({dataAll,reset}))
        } catch (error) {
        }
    },

    getPOWorkDoneBased:(reset=true,value,args="",customerId) => async (dispatch, _) => {
        try {
            const res = await Api.get({ url:`${Urls.finance_poworkdone_based}/${customerId}${args!=""?"?"+args:""}`, value })
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_POWORKDONE_BASED({dataAll,reset}))
        } catch (error) {
        }
    },
    postPOWorkDoneBased: (reset, data, cb, uniqueId) => async (dispatch, _) => {
        try {
            const res = await Api.post({ data: data, url: uniqueId == null ? Urls.finance_poworkdone_based : Urls.finance_poworkdone_based + "/" + uniqueId })
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

    putPOWorkDoneBased: (reset, data, cb,args="") => async (dispatch, _) => {
        try {
            const res = await Api.put({ data: data, url:`${Urls.finance_poworkdone_based}${args!=""?"?"+args:""}` })
            if (res?.status !== 201 && res?.status !== 200) {
                let msgdata = {
                    show: true,
                    icon: "error",
                    buttons: [],
                    type: 1,
                    text: res?.data?.msg,
                };
                dispatch(ALERTS(msgdata));
                cb()
            }else{
                let dataAll = res?.data?.data
                dispatch(GET_POWORKDONE_BASED({ dataAll, reset}))
            }
            
        } catch (error) {
            return;
        }
    },

    getInvoice:(reset=true,args="",customerId) => async (dispatch, _) => {
        try {
            const res = await Api.get({ url:`${Urls.finance_Invoice}/${customerId}${args!=""?"?"+args:""}`, reset })
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_INVOICE({dataAll,reset}))
        } catch (error) {
        }
    },
    postInvoice: (reset, data, cb, uniqueId) => async (dispatch, _) => {
        try {
            const res = await Api.post({ data: data, url: uniqueId == null ? Urls.finance_Invoice : Urls.finance_Invoice + "/" + uniqueId })
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

    getPOWorkDoneItemCode:(reset=true,args="",show=0) => async (dispatch, _) => {
        try {
            const res = await Api.get({ url:`${Urls.finance_poworkdone_itemCode}${args!=""?"?"+args:""}`,show:show })
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_POWORKDONE_ITEMCODE({dataAll,reset}))
        } catch (error) {
        }
    },
    getPOAccrualRevenue:(reset=true,args="",cb=()=>{}) => async (dispatch, _) => {
        try {
            const res = await Api.get({ url:`${Urls.finance_poaccrual_revenue}${args!=""?"?"+args:""}`, reset })
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_POACCRUAL_REVENUE({dataAll,reset}))
            cb()
        } catch (error) {
        }
    },
    postPOAccrualRevenue: (data, cb) => async (dispatch, _) => {
        try {
            const res = await Api.post({ data: data, url: Urls.finance_poaccrual_revenue })
            if (res?.status !== 201 && res?.status !== 200) {
                let msgdata = {
                    show: true,
                    icon: "error",
                    buttons: [],
                    type: 1,
                    text: res?.data?.msg,
                };
                dispatch(ALERTS(msgdata));
                cb()
            } else {
                let dataAll = res?.data?.data
                dispatch(GET_POACCRUAL_REVENUE({ dataAll, reset:true }))

            }

        } catch (error) {
            return;
        }
    },
    getCustomers: (employeeID) => async (dispatch, _) => {
        try {
            const res = await Api.get({ url: `${Urls.admin_customer}?empId=${employeeID}` })
            const { data = [] } = res.data
            dispatch(GET_CUSTOMERS(data))
        } catch (error) {
            let msgdata = {
                show: true,
                icon: "error",
                buttons: [],
                type: 1,
                text: error.response?.data?.msg,
            };
            dispatch(ALERTS(msgdata));
        }
    },

    

}
export default FinanceActions;