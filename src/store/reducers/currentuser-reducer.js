import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    
    getcurrentuserPG: [],
    getcurrentuserPT: [],
    getcurrentuserPID: [],
    getcurrentusercircleprojectid: [],
    getcurrentusercostcenter:[],
    getcurrentusermultiplePG: [],
    getcurrentuserCustomer: [],
    getcurrentuserBusinessUnit: [],
}



const currentuserData = createSlice({
    name:'currentuserData',
    initialState,
    reducers:{

        GET_CURRENT_USER_PG:(state,{payload}) => {
            if(payload.reset){
                state.getcurrentuserPG = payload.dataAll
            }else{
                state.getcurrentuserPG  = [...state.getcurrentuserPG,...payload.dataAll]
            }
        },

        GET_CURRENT_USER_PT:(state,{payload}) => {
            if(payload.reset){
                state.getcurrentuserPT = payload.dataAll
            }else{
                state.getcurrentuserPT  = [...state.getcurrentuserPT,...payload.dataAll]
            }
        },

        GET_CURRENT_USER_PID:(state,{payload}) => {
            if(payload.reset){
                state.getcurrentuserPID = payload.dataAll
            }else{
                state.getcurrentuserPID  = [...state.getcurrentuserPID,...payload.dataAll]
            }
        },

        GET_CURRENT_USER_CIRCLE_PROJECTID:(state,{payload}) => {
            if(payload.reset){
                state.getcurrentusercircleprojectid = payload.dataAll
            }else{
                state.getcurrentusercircleprojectid  = [...state.getcurrentusercircleprojectid,...payload.dataAll]
            }
        },

        GET_CURRENT_USER_COST_CENTER:(state,{payload}) => {
            if(payload.reset){
                state.getcurrentusercostcenter = payload.dataAll
            }else{
                state.getcurrentusercostcenter  = [...state.getcurrentusercostcenter,...payload.dataAll]
            }
        },

        GET_CURRENT_USER_MULTIPLE_PG:(state,{payload}) => {
            if(payload.reset){
                state.getcurrentusermultiplePG = payload.dataAll
            }else{
                state.getcurrentusermultiplePG  = [...state.getcurrentusermultiplePG,...payload.dataAll]
            }
        },
        GET_CURRENT_USER_BUSINESS_UNIT:(state,{payload}) => {
            if(payload.reset){
                state.getcurrentuserBusinessUnit = payload.dataAll
            }else{
                state.getcurrentuserBusinessUnit  = [...state.getcurrentuserBusinessUnit,...payload.dataAll]
            }
        },
        GET_CURRENT_USER_CUSTOMER:(state,{payload}) => {
            if(payload.reset){
                state.getcurrentuserCustomer = payload.dataAll
            }else{
                state.getcurrentuserCustomer  = [...state.getcurrentuserCustomer,...payload.dataAll]
            }
        },
    }

})


export const {GET_CURRENT_USER_PG, GET_CURRENT_USER_PT,GET_CURRENT_USER_PID,GET_CURRENT_USER_CIRCLE_PROJECTID,GET_CURRENT_USER_COST_CENTER,GET_CURRENT_USER_MULTIPLE_PG,GET_CURRENT_USER_CUSTOMER,GET_CURRENT_USER_BUSINESS_UNIT} = currentuserData.actions

export default currentuserData.reducer