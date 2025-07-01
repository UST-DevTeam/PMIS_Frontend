import Api from "../../utils/api"
import { Urls } from "../../utils/url"
import { ALERTS } from "../reducers/component-reducer"
import {
    GET_EARNVALUE_MGMT_FINANCIAL,
    GET_EVM_DELIVERY,
    GET_PROFIT_LOSS,
    GET_ACCRUAL_REVENUE_TREND,
    GET_SOB,
    GET_SOB_DYNAMIIC,
    GET_CIRCLE,
    GET_CIRCLE_SUBPROJECT_TYPE,
    GET_PVA_DATA,
}
    from "../reducers/formss-reducer"


const FormssActions = {

    getEarnValueMgmtFinancial: (projectId, reset = true, args = "") => async (dispatch, _) => {
        try {
            const res = await Api.get({ url: `${Urls.formss_earnValue_mgmt_financial + '/' + projectId}${args != "" ? "?" + args : ""} `, reset })
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_EARNVALUE_MGMT_FINANCIAL({ dataAll, reset }))
        } catch (error) {
        }
    },
    postEarnValueMgmtFinancial: (data, cb) => async (dispatch, _) => {
        try {
            const res = await Api.post({ data: data, url: Urls.formss_earnValue_mgmt_financial })
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
                dispatch(GET_EARNVALUE_MGMT_FINANCIAL({ dataAll, reset: true }))

            }

        } catch (error) {
            return;
        }
    },
    putEarnValueMgmtFinancial: (data, cb) => async (dispatch, _) => {
        try {
            console.log("adfasfasfasasfadfsa", data);
            const res = await Api.put({ data: data, url: Urls.formss_earnValue_mgmt_financial })
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
                dispatch(GET_EARNVALUE_MGMT_FINANCIAL({ dataAll, reset: true }))
                let msgdata = {
                    show: true,
                    icon: "success",
                    buttons: [],
                    type: 1,
                    text: res?.data?.msg,
                };
                dispatch(ALERTS(msgdata));
                cb()
            }

        } catch (error) {
            return;
        }
    },

    getEVMDelivery: (projectId, reset = true, args = "") => async (dispatch, _) => {
        try {
            const res = await Api.get({ url: `${Urls.formss_EVM_delivery + '/' + projectId}${args != "" ? "?" + args : ""} `, reset })
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_EVM_DELIVERY({ dataAll, reset }))
        } catch (error) {
        }
    },
    postEVMDelivery: (data, cb, args = "") => async (dispatch, _) => {
        try {
            const res = await Api.post({ data: data, url: `${Urls.formss_EVM_delivery}${args != "" ? "?" + args : ""}` })
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
                dispatch(GET_EVM_DELIVERY({ dataAll, reset: true }))

            }
        } catch (error) {
            return;
        }
    },

    putEVMDelivery: (data, cb) => async (dispatch, _) => {
        try {
            console.log("adfasfasfasasfadfsa", data);
            const res = await Api.put({ data: data, url: Urls.formss_EVM_delivery })
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
                dispatch(GET_EVM_DELIVERY({ dataAll, reset: true }))
                let msgdata = {
                    show: true,
                    icon: "success",
                    buttons: [],
                    type: 1,
                    text: res?.data?.msg,
                };
                dispatch(ALERTS(msgdata));
                cb()
            }

        } catch (error) {
            return;
        }
    },

    getAccrualRevenueTrend: (reset = true, args = "") => async (dispatch, _) => {
        try {
            const res = await Api.get({ url: `${Urls.formss_accrualrevenue_trend}${args != "" ? "?" + args : ""} `, reset })
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_ACCRUAL_REVENUE_TREND({ dataAll, reset }))
        } catch (error) {
        }
    },

    postAccrualRevenueTrend: (data, cb) => async (dispatch, _) => {
        try {
            const res = await Api.post({ data: data, url: Urls.formss_accrualrevenue_trend })
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
                dispatch(GET_ACCRUAL_REVENUE_TREND({ dataAll, reset: true }))

            }

        } catch (error) {
            return;
        }
    },

    putAccrualRevenueTrend: (data, cb) => async (dispatch, _) => {
        try {
            const res = await Api.put({ data: data, url: Urls.formss_accrualrevenue_trend })
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
                dispatch(GET_ACCRUAL_REVENUE_TREND({ dataAll, reset: true }))
                let msgdata = {
                    show: true,
                    icon: "success",
                    buttons: [],
                    type: 1,
                    text: res?.data?.msg,
                };
                dispatch(ALERTS(msgdata));
                cb()
            }

        } catch (error) {
            return;
        }
    },


    getProfiltLoss: (reset = true, args = "") => async (dispatch, _) => {
        try {
            const res = await Api.get({ url: `${Urls.forms_profit_loss}${args != "" ? "?" + args : ""} `, reset })
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_PROFIT_LOSS({ dataAll, reset }))
        } catch (error) {
        }
    },
    postProfiltLossOnSearch: (data, cb) => async (dispatch, _) => {
        try {
            const res = await Api.post({ data: data, url: Urls.forms_profit_loss })
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
                dispatch(GET_PROFIT_LOSS({ dataAll, reset: true }));
                cb();
            }

        } catch (error) {
            return;
        }
    },
    putprofitandloss: (data, cb, uniqueId) => async (dispatch, _) => {
        try {
            const res = await Api.put({ data: data, url: uniqueId == null ? Urls.forms_profit_loss : Urls.forms_profit_loss + "/" + uniqueId })
            if (res?.status !== 201 && res?.status !== 200) {
                let msgdata = {
                    show: true,
                    icon: "error",
                    buttons: [],
                    type: 1,
                    text: res?.data?.msg,
                };
                dispatch(ALERTS(msgdata));
            }
            else {
                let dataAll = res?.data?.data
                dispatch(GET_PROFIT_LOSS({ dataAll, reset: true }));
            }
            cb()
        } catch (error) {
        }
    },

    getSobdataDynamic: (reset = true, args = "", cb = () => { }) => async (dispatch, _) => {
        try {
            const res = await Api.get({ url: `${Urls.forms_sob_dynamic}${args != "" ? "?" + args : ""}`, reset })
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_SOB_DYNAMIIC({ dataAll, reset }))
            cb()
        } catch (error) {
        }
    },
    getForecastCOGS: (reset = true, args = "", cb = () => { }) => async (dispatch, _) => {
        try {
            const res = await Api.get({ url: `${Urls.ForecastCOGS}${args != "" ? "?" + args : ""}`, reset })
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_SOB_DYNAMIIC({ dataAll, reset }))
            cb()
        } catch (error) {
        }
    },
    getSobdata: (reset = true, args = "", cb = () => { }) => async (dispatch, _) => {
        try {
            const res = await Api.get({ url: `${Urls.forms_sob}${args != "" ? "?" + args : ""}`, reset })
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_SOB({ dataAll, reset }))
            cb()
        } catch (error) {
        }
    },
    postFormsSob: (data, cb) => async (dispatch, _) => {
        try {
            const res = await Api.post({ data: data, url: Urls.forms_sob })
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
                dispatch(GET_SOB({ dataAll, reset: true }))

            }

        } catch (error) {
            return;
        }
    },
    putFormsSob: (data, cb) => async (dispatch, _) => {
        try {
            const res = await Api.put({ data: data, url: Urls.forms_sob })
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
                dispatch(GET_SOB({ dataAll, reset: true }))
                let msgdata = {
                    show: true,
                    icon: "success",
                    buttons: [],
                    type: 1,
                    text: res?.data?.msg,
                };
                dispatch(ALERTS(msgdata));
                cb()
            }

        } catch (error) {
            return;
        }
    },
    patchEvmActual: (data, cb) => async (dispatch, _) => {
        try {
            const res = await Api.patch({ data: data, url: Urls.patchEvmActual })
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
                // let dataAll = res?.data?.data
                // dispatch(GET_SOB({ dataAll, reset: true }))
                let msgdata = {
                    show: true,
                    icon: "success",
                    buttons: [],
                    type: 1,
                    text: res?.data?.msg,
                };
                dispatch(ALERTS(msgdata));
                cb()
            }

        } catch (error) {
            return;
        }
    },
    getCircle: (customerId="", reset = true, args = "", cb = () => { }) => async (dispatch, _) => {
        try {
            const res = await Api.get({ url: `${Urls.getCircle}/${customerId}${args != "" ? "?" + args : ""}`, reset })
            if (res?.status !== 200) return
            let dataAll = res?.data?.data

            dispatch(GET_CIRCLE({ dataAll, reset }))
            cb()
        } catch (error) {
        }
    },
    getCircleSubProjectType: (customerId="",reset = true, args = "", cb = () => { }) => async (dispatch, _) => {
        try {
            const res = await Api.get({ url: `${Urls.getCircleSubPorjectType}/${customerId}${args != "" ? "?" + args : ""}`, reset })
            if (res?.status !== 200) return
            let dataAll = res?.data?.data

            dispatch(GET_CIRCLE_SUBPROJECT_TYPE({ dataAll, reset }))
            cb()
        } catch (error) {
        }
    },
    getPvaData: (filters = {}, reset = true, args = "", cb = () => { }) => async (dispatch, _) => {
        try {
            const res = await Api.post({ url: `${Urls.getPvaData}${args != "" ? "?" + args : ""}`, data:filters })
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_PVA_DATA({ dataAll, reset }))
            cb()
        } catch (error) {
        }
    },
}
export default FormssActions;