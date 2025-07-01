import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    getCustomer:[],
    getProjectGroup:[],
    getCostCenter:[],
    getZone:[],
    getSalaryDB:[],
    getOtherFixedCost:[],
    getOtherFixedCostTypes:[],
    getGPTrackingMain:[],
    getZoneByCustomerId:[]
    
   
}

const gpTrackingReducer = createSlice({
    name:'gpTrackingReducer',
    initialState,
    reducers:{
       
        GET_CUSTOMER:(state,{payload}) => {
            if(payload.reset){
                state.getCustomer = payload.dataAll
            }else{
                state.getCustomer  = [...state.getCustomer,...payload.dataAll]
            }
        },
        GET_GPPROJECTGROUP:(state,{payload}) => {
            if(payload.reset){
                state.getProjectGroup = payload.dataAll
            }else{
                state.getProjectGroup  = [...state.getProjectGroup,...payload.dataAll]
            }
        },
        GET_GPCOSTCENTER:(state,{payload}) => {
            if(payload.reset){
                state.getCostCenter = payload.dataAll
            }else{
                state.getCostCenter  = [...state.getCostCenter,...payload.dataAll]
            }
        },
        GET_GPOTHERFIXEDCOSTTYPES:(state,{payload}) => {
            if(payload.reset){
                state.getOtherFixedCostTypes = payload.dataAll
            }else{
                state.getOtherFixedCostTypes  = [...state.getOtherFixedCostTypes,...payload.dataAll]
            }
        },
        GET_GPZONE:(state,{payload}) => {
            if(payload.reset){
                state.getZone = payload.dataAll
            }else{
                state.getZone  = [...state.getZone,...payload.dataAll]
            }
        },
        GET_SALARYDB:(state,{payload}) => {
            if(payload.reset){
                state.getSalaryDB = payload.dataAll
            }else{
                state.getSalaryDB  = [...state.getSalaryDB,...payload.dataAll]
            }
        },
        GET_OTHERFIXEDCOST:(state,{payload}) => {
            if(payload.reset){
                state.getOtherFixedCost = payload.dataAll
            }else{
                state.getOtherFixedCost  = [...state.getOtherFixedCost,...payload.dataAll]
            }
        },
        GET_GPTRACKINGMAIN:(state,{payload}) => {
            if(payload.reset){
                state.getGPTrackingMain = payload.dataAll
            }else{
                state.getGPTrackingMain  = [...state.getGPTrackingMain,...payload.dataAll]
            }
        },

        GET_ZONE_BY_CUSTOMER_ID:(state,{payload}) => {
            if(payload.reset){
                state.getZoneByCustomerId = payload.dataAll
            }else{
                state.getZoneByCustomerId  = [...state.getZoneByCustomerId,...payload.dataAll]
            }
        },
        

        
    }
})

export const {
    GET_CUSTOMER,
    GET_GPPROJECTGROUP,
    GET_SALARYDB,
    GET_OTHERFIXEDCOST,
    GET_GPCOSTCENTER,
    GET_GPZONE,
    GET_GPOTHERFIXEDCOSTTYPES,
    GET_GPTRACKINGMAIN,
    GET_ZONE_BY_CUSTOMER_ID
    
} = gpTrackingReducer.actions
export default gpTrackingReducer.reducer