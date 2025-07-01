import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    milestoneeventList: [],
    projecteventList:[],
    siteeventList:[],
    getComplianceLog:[],
}

const eventManagement = createSlice({
    name: "eventManagement",
    initialState,
    reducers: {
        
        MILESTONEEVENTLIST: (state, { payload }) => {
            if(payload.reset){
                state.milestoneeventList = payload.dataAll
            }else{
                state.milestoneeventList = [...state.milestoneeventList, ...payload.milestoneeventList];
            }
        },
        PROJECTEVENTLIST: (state, { payload }) => {
            if(payload.reset){
                state.projecteventList = payload.dataAll
            }else{
                state.projecteventList = [...state.projecteventList, ...payload.projecteventList];
            }
        },
        SITEEVENTLIST: (state, { payload }) => {
            if(payload.reset){
                state.siteeventList = payload.dataAll
            }else{
                state.siteeventList = [...state.siteeventList, ...payload.siteeventList];
            }
        },
        COMPLIANCELOGLIST: (state, { payload }) => {
            if(payload.reset){
                state.getComplianceLog = payload.dataAll
            }else{
                state.getComplianceLog = [...state.getComplianceLog, ...payload.getComplianceLog];
            }
        },

        RESET_STATE: (state) => {
            state.milestoneeventList = [];
           
        }
    }
})

export const { MILESTONEEVENTLIST,RESET_STATE,SITEEVENTLIST,PROJECTEVENTLIST,COMPLIANCELOGLIST } = eventManagement.actions
export default eventManagement.reducer
