import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    socket_setup: null,
    data_from_socket:{}
}

const component = createSlice({
    name: "websocket",
    initialState,
    reducers: {
        SETUP_SOCKET: (state, { payload }) => {

            // console.log("socket_setup", payload, "payload")
            state.socket_setup = payload
        },
        DATA_FROM_SOCKET: (state, { payload }) => {

            // console.log("socket_setup", payload, "payload")
            // state.data_from_socket = payload
            state.data_from_socket = {
                ...state.data_from_socket,
                [payload.name]:payload.value
            }
        },
        BULK_DATA_FROM_SOCKET: (state, { payload }) => {

            console.log("socket_setupsocket_setupsocket_setup", state.data_from_socket[payload.name], "payload")
            // state.data_from_socket = payload
            state.data_from_socket = {
                ...state.data_from_socket,
                [payload.name]:state.data_from_socket[payload.name]?[...state.data_from_socket[payload.name],payload.value]:[payload.value]
            }
        },
        RESET_STATE: (state) => {
            state.alerts = {};
            state.powerBiReportConf = {};
        }
    }
})

export const { SETUP_SOCKET,DATA_FROM_SOCKET,BULK_DATA_FROM_SOCKET } = component.actions
export default component.reducer
