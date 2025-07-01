import Api from "../../utils/api"
import { Urls } from "../../utils/url"
import { ALERTS } from "../reducers/component-reducer"
import {
    GET_MY_HOME, GET_MY_TASK,
    GET_PERSONAL_INFO,
    GET_MY_POLICY,
} from "../reducers/myHome-reducer"


const MyHomeActions = {


    getMyHome:(reset=true,args="") => async (dispatch, _) => {
        try {
            const res = await Api.get({ url:`${Urls.MyHome}${args!=""?"?"+args:""}`, reset })
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_MY_HOME({dataAll,reset}))
        } catch (error) {
        }
    },
    postMyHome: (reset, data, cb, uniqueId) => async (dispatch, _) => {
        try {
            const res = await Api.post({ data: data, url: uniqueId == null ? Urls.MyHome : Urls.MyHome + "/" + uniqueId })
            if (res?.status !== 201 && res?.status !== 200) {
                let msgdata = {
                    show: true,
                    icon: "error",
                    buttons: [],
                    type: 1,
                    text: res?.data?.msg,
                };
                dispatch(ALERTS(msgdata));
            }else{
                cb()

            }
            
        } catch (error) {
            return;
        }
    },

    getPersonalInfo:(reset=true,args="") => async (dispatch, _) => {
        try {
            const res = await Api.get({ url:`${Urls.myHome_personal_info}${args!=""?"?"+args:""}`, reset })
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_PERSONAL_INFO({dataAll,reset}))
        } catch (error) {
        }
    },

    getMyTask:(reset=true,args="") => async (dispatch, _) => {
        try {
            const res = await Api.get({ url:`${Urls.user_myTask}${args!=""?"?"+args:""}`, reset })
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_MY_TASK({dataAll,reset}))
        } catch (error) {
        }
    },

    getMyPolicy:(reset=true,args="") => async (dispatch, _) => {
        try {
            const res = await Api.get({ url:`${Urls.user_myPolicy}${args!=""?"?"+args:""}`, reset })
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_MY_POLICY({dataAll,reset}))
        } catch (error) {
        }
    },




}
export default MyHomeActions;