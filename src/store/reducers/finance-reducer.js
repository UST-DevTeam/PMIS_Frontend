import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    getPOInvoicedBased:[],
    getPOWorkDoneBased:[],
    getInvoice:[],
    getPOWorkDoneItemCode:[],
    getPOWorkDoneDashboard:[],
    getPOAccrualRevenue:[],
    getCustomers: [],
}

const FinanceReducer = createSlice({
    name:'financeReducer',
    initialState,
    reducers:{

        GET_POINVOICED_BASED:(state,{payload}) => {
            if(payload.reset){
                state.getPOInvoicedBased = payload.dataAll
            }else{
                state.getPOInvoicedBased  = [...state.getPOInvoicedBased,...payload.dataAll]
            }
        },

        GET_POWORKDONE_DASHBOARD:(state,{payload}) => {
            if(payload.reset){
                state.getPOWorkDoneDashboard = payload.dataAll
            }else{
                state.getPOWorkDoneDashboard  = [...state.getPOWorkDoneDashboard,...payload.dataAll]
            }
        },

        GET_POWORKDONE_BASED:(state,{payload}) => {
            if(payload.reset){
                state.getPOWorkDoneBased = payload.dataAll
            }else{
                state.getPOWorkDoneBased  = [...state.getPOWorkDoneBased,...payload.dataAll]
            }
        },
        GET_POWORKDONE_ITEMCODE:(state,{payload}) => {
            if(payload.reset){
                state.getPOWorkDoneItemCode = payload.dataAll
            }else{
                state.getPOWorkDoneItemCode  = [...state.getPOWorkDoneItemCode,...payload.dataAll]
            }
        },

        GET_INVOICE:(state,{payload}) => {
            if(payload.reset){
                state.getInvoice = payload.dataAll
            }else{
                state.getInvoice  = [...state.getInvoice,...payload.dataAll]
            }
        },
        
        GET_POACCRUAL_REVENUE:(state,{payload}) => {
            if(payload.reset){
                state.getPOAccrualRevenue = payload.dataAll
            }else{
                state.getPOAccrualRevenue  = [...state.getPOAccrualRevenue,...payload.dataAll]
            }
        },
        GET_CUSTOMERS: (state, { payload }) => {
            state.getCustomers = payload
        },
    }
})

export const {GET_INVOICE,GET_POWORKDONE_DASHBOARD,GET_POINVOICED_BASED,GET_POWORKDONE_BASED,GET_POWORKDONE_ITEMCODE,GET_POACCRUAL_REVENUE,GET_CUSTOMERS} = FinanceReducer.actions
export default FinanceReducer.reducer