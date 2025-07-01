import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    getEarnValueMgmtFinancial: [],
    getEVMDelivery: [],
    getProfitloss: [],
    getAccrualRevenueTrend: [],
    getSobdata: [],
    getSobdataDynamic: [],
    getForecastCOGS: [],
    getCircle: [],
    getCircleSubProjectType: [],
    getPvaData: []
}

const FormssReducer = createSlice({
    name: 'formssReducer',
    initialState,
    reducers: {

        GET_EARNVALUE_MGMT_FINANCIAL: (state, { payload }) => {
            if (payload.reset) {
                state.getEarnValueMgmtFinancial = payload.dataAll
            } else {
                state.getEarnValueMgmtFinancial = [...state.getEarnValueMgmtFinancial, ...payload.dataAll]
            }
        },

        GET_EVM_DELIVERY: (state, { payload }) => {
            if (payload.reset) {
                state.getEVMDelivery = payload.dataAll
            } else {
                state.getEVMDelivery = [...state.getEVMDelivery, ...payload.dataAll]
            }
        },

        GET_PROFIT_LOSS: (state, { payload }) => {
            if (payload.reset) {
                state.getProfitloss = payload.dataAll
            } else {
                state.getProfitloss = [...state.getProfitloss, ...payload.dataAll]
            }
        },

        GET_ACCRUAL_REVENUE_TREND: (state, { payload }) => {
            if (payload.reset) {
                state.getAccrualRevenueTrend = payload.dataAll
            } else {
                state.getAccrualRevenueTrend = [...state.getAccrualRevenueTrend, ...payload.dataAll]
            }
        },

        GET_SOB_DYNAMIIC: (state, { payload }) => {
            if (payload.reset) {
                state.getSobdataDynamic = payload.dataAll
            } else {
                state.getSobdataDynamic = [...state.getSobdataDynamic, ...payload.dataAll]
            }
        },

        GET_SOB: (state, { payload }) => {
            if (payload.reset) {
                state.getSobdata = payload.dataAll
            } else {
                state.getSobdata = [...state.getSobdata, ...payload.dataAll]
            }
        },
        GET_FORCAST_COGS: (state, { payload }) => {
            if (payload.reset) {
                state.getForecastCOGS = payload.dataAll
            } else {
                state.getForecastCOGS = [...state.getForecastCOGS, ...payload.dataAll]
            }
        },

        GET_CIRCLE: (state, { payload }) => {
            if (payload.reset) {
                state.getCircle = payload.dataAll
            } else {
                state.getCircle = [...state.getCircle, ...payload.dataAll]
            }
        },

        GET_CIRCLE_SUBPROJECT_TYPE: (state, { payload }) => {
            if (payload.reset) {
                state.getCircleSubProjectType = payload.dataAll
            } else {
                state.getCircleSubProjectType = [...state.getCircleSubProjectType, ...payload.dataAll]
            }
        },

        GET_PVA_DATA: (state, { payload }) => {
            if (payload.reset) {
                state.getPvaData = payload.dataAll
            } else {
                state.getPvaData = [...state.getPvaData, ...payload.dataAll]
            }
        }

    }
})

export const {
    GET_FORCAST_COGS,
    GET_EARNVALUE_MGMT_FINANCIAL,
    GET_EVM_DELIVERY,
    GET_PROFIT_LOSS,
    GET_CIRCLE,
    GET_PVA_DATA,
    GET_CIRCLE_SUBPROJECT_TYPE,
    GET_ACCRUAL_REVENUE_TREND,
    GET_SOB,
    GET_SOB_DYNAMIIC,
} = FormssReducer.actions
export default FormssReducer.reducer