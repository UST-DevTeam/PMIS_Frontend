import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    authenticated: Boolean(JSON.parse(localStorage.getItem('authenticated'))),
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null,
    permission: localStorage.getItem('permission') || null,
    profile:{},
    agreementText:{}
}
const auth = createSlice({
    name: "auth",
    initialState,
    reducers: {
        SET_USER: (state, { payload }) => {
            state.user = payload
        },
        SET_TOKEN: (state, { payload }) => {
            state.token = payload
        },
        SET_USER_ROLE: (state, { payload }) => {
            state.userRole = payload
        },
        SET_AUTHENTICATED: (state, { payload }) => {
            state.authenticated = payload
        },
        SET_PERMISSION: (state, { payload }) => {
            state.permission = payload
        },
        USERS_PROFILE:(state, { payload }) => {
            state.profile = payload.dataAll
        },
        SET_USER_BUSINESS:(state, { payload }) => {
            state.business = payload.dataAll
        },
        ALL_COUNTRIES:(state, { payload }) => {
            state.countries = payload.dataAll
        },
        
        RESET_STATE: (state) => {
            state.authenticated = false;
            state.user = null;
            state.token = null;
            state.permission = null;
        }
    }
})

export const { SET_USER, SET_TOKEN, SET_AUTHENTICATED,SET_PERMISSION,SET_USER_ROLE,USERS_PROFILE, RESET_STATE,SET_USER_BUSINESS,ALL_COUNTRIES } = auth.actions
export default auth.reducer
