import { createSlice } from "@reduxjs/toolkit";



const initialState={
    "bussinessUnit":[],

}
const dropDownRecord=createSlice({
    name:'dropDown',
    initialState,
    reducers:{
        SET_BUSSINESS_UNIT:(state,{payload})=>{
            console.log("first======",payload)
            state.bussinessUnit=payload
        }
    }
})


export const {SET_BUSSINESS_UNIT}=dropDownRecord.actions
export default dropDownRecord.reducer