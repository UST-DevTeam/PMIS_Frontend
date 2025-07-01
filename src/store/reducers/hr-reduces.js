import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    getManageEmpDetails:[],
    getHRAllEmployee:[],
    getHRManagerInEmployee:[],
}

const hrReducer = createSlice({
    name:'hrReducer',
    initialState,
    reducers:{

        GET_EMPLOYEE_DETAILS:(state,{payload}) => {
            if(payload.reset){
                state.getManageEmpDetails = payload.dataAll
            }else{
                state.getManageEmpDetails  = [...state.getManageEmpDetails,...payload.dataAll]
            }
        },

        GET_HR_ALL_EMPLOYEE:(state,{payload}) => {
            if(payload.reset){
                state.getHRAllEmployee = payload.dataAll
            }else{
                state.getHRAllEmployee  = [...state.getHRAllEmployee,...payload.dataAll]
            }
        },

        GET_HR_MANAGER_EMP:(state,{payload}) => {
            if(payload.reset){
                state.getHRManagerInEmployee = payload.dataAll
            }else{
                state.getHRManagerInEmployee  = [...state.getHRManagerInEmployee,...payload.dataAll]
            }
        },
    }
})

export const {GET_EMPLOYEE_DETAILS,GET_HR_ALL_EMPLOYEE,GET_HR_MANAGER_EMP,} = hrReducer.actions
export default hrReducer.reducer