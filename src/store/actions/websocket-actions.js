import { BULK_DATA_FROM_SOCKET, DATA_FROM_SOCKET, SETUP_SOCKET } from "../reducers/websocket-reducer";


const WebsocketActions = {
    setup_socket: (data) => async (dispatch, _) => {
        try {
            // console.log("SETUP_SOCKET","state")
            dispatch(SETUP_SOCKET(data))
        } catch (error) {
            console.log(error, "amit errorerror 37")
            // dispatch(Notify.error('something went wrong! please try again after a while'))
        }
    },
    send_to_socket: (label,msg,roomName=true) => async (dispatch, state) => {
        try {
            console.log("SETUP_SOCKET",label,msg,state()?.auth?.user?.id,"state")


            if(state().websocket.socket_setup.connected){
                if(roomName){
                    state().websocket.socket_setup.emit(label,{ room_name: "room_name_"+state()?.auth?.user?.id, message: msg })
                }else{
                    state().websocket.socket_setup.emit(label,{ message: msg })
                }
            }
        } catch (error) {
            console.log(error, "amit errorerror 37")
            // dispatch(Notify.error('something went wrong! please try again after a while'))
        }
    },
    data_from_socket: (data) => async (dispatch, _) => {
        try {
            console.log("data_from_socket","data",data,data?.que?.Code+"_"+data?.que?.id,{"data":data?.data,"columns":data?.columns})
            dispatch(DATA_FROM_SOCKET({"name":data?.que?.Code+"_"+data?.que?.id,"value":{"data":data?.data,"columns":data?.columns}}))
        } catch (error) {
            console.log(error, "amit errorerror 37")
            // dispatch(Notify.error('something went wrong! please try again after a while'))
        }
    },

    data_from_socket_msg: (topic,data) => async (dispatch, _) => {
        try {


            dispatch(BULK_DATA_FROM_SOCKET({"name":topic,"value":data}))
        } catch (error) {
            console.log(error, "amit errorerror 37")
            // dispatch(Notify.error('something went wrong! please try again after a while'))
        }
    },
    
}


export default WebsocketActions;