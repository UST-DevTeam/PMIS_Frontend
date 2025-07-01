import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    getCustomers: [],
    getProjectGroups: [],
    getProjectIds: [],
    getSitesIds: []
}

const repository = createSlice({
    name: "repository",
    initialState,
    reducers: {
        GET_CUSTOMERS: (state, { payload }) => {
            state.getCustomers = payload
        },
        GET_PROJECT_GROUPS: (state, { payload }) => {
            state.getProjectGroups = payload
        },
        GET_PROJECT_IDS: (state, { payload }) => {
            state.getProjectIds = payload
        },
        GET_SITES_IDS: (state, { payload }) => {
            console.log(payload,"_______payload_________")
            state.getSitesIds = payload
        },
        RESET: (state, _) => {
            state.getCustomers = []
            state.getProjectGroups = []
            state.getProjectIds = []
            state.getSitesIds = []
        }
    }
})

export default repository.reducer
export const { GET_CUSTOMERS, GET_PROJECT_GROUPS, GET_PROJECT_IDS,GET_SITES_IDS,RESET } = repository.actions