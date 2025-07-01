import { createSlice } from "@reduxjs/toolkit";

// Define the shape of your state


// Define the initial state
const initialState = {

  tableContent:""
};

const initialStateWithContent=initialState
delete initialStateWithContent.content

// Create the slice
const tableRecords = createSlice({
  name: "tableRecords", // Updated name for clarity
  initialState,
  reducers: {
    
    SET_TABLE:(state,{payload})=>{
      state.tableContent=payload
    },

    CLEAR_RECORDS: () => initialStateWithContent, // Reset to initial state
  },
});

// Export actions and reducer
export const {  CLEAR_RECORDS,SET_TABLE} = tableRecords.actions;
export default tableRecords.reducer;
