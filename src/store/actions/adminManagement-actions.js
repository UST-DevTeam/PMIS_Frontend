
import Button from "../../components/Button"
import Api from "../../utils/api"
import { Urls } from "../../utils/url"
import { AGREEMENT_LIST, ROLE_LIST, USERS_LIST } from "../reducers/adminManagement-reducer"
import CommonActions from "./common-actions"
import { ALERTS } from "../reducers/component-reducer"
// import Notify from "./notify-actions"


const AdminManagementActions = {
    getUsersList: (reset=true,args="") => async (dispatch, _) => {
        try {
            console.log("AuthActions.signin")
            const res = await Api.get({ url: `${Urls.admin_userList}${args!=""?"?"+args:""}`})
            if (res?.status !== 200) return
            const dataAll = res.data.data
            dispatch(USERS_LIST({dataAll,reset}))
        } catch (error) {
            console.log(error, "amit errorerror 37")
        }
    },
    getDeckList: (reset=true,args="") => async (dispatch, _) => {
        try {
            console.log("AuthActions.signin")
            const res = await Api.get({ url: `${Urls.admin_userList}${args!=""?"?"+args:""}`})
            if (res?.status !== 200) return
            const dataAll = res.data.data
            dispatch(USERS_LIST({dataAll,reset}))
        } catch (error) {
            console.log(error, "amit errorerror 37")

            // dispatch(Notify.error('something went wrong! please try again after a while'))
        }
    },
    getRoleList: (reset=true,args="") => async (dispatch, _) => {
        try {
            console.log("AuthActions.signin")
            const res = await Api.get({ url: `${Urls.admin_roleList}${args!=""?"?"+args:""}`})
            if (res?.status !== 200) return
            console.log(res.data, "res.data")
            const dataAll = res.data.data
            dispatch(ROLE_LIST({dataAll,reset}))
        } catch (error) {
            console.log(error, "amit errorerror 37")

            // dispatch(Notify.error('something went wrong! please try again after a while'))
        }
    },
    postUser: (reset, data, cb, uniqueId) => async (dispatch, _) => {
        try {
            console.log("AuthActions.signin", uniqueId)
            // if(reset){
            //     dispatch(GENERATED_SQL_QUERY({}))
            // }
            const res = await Api.post({ data: data, url: uniqueId == null ? Urls.admin_userList : Urls.admin_userList + "/" + uniqueId })
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
            console.log(error, "amit errorerror 37")
        }
    },
    

    
    PatchDataAccess: (data, cb) => async (dispatch, _) => {
        try {
            const res = await Api.patch({ data: data, url: Urls.admin_uamView })
            if (res?.status !== 201 && res?.status !== 200) {
                cb()
            }
            //     let msgdata = {
            //         show: true,
            //         icon: "error",
            //         buttons: [],
            //         type: 1,
            //         text: res?.data?.msg,
            //     };
            //     dispatch(ALERTS(msgdata));
            // }else{
            //     cb()

            // }
        } catch (error) {
            console.log(error, "amit errorerror 37")
        }
    },
    
    postPitchDeck: (reset, data, cb, uniqueId) => async (dispatch, _) => {
        try {
            console.log("AuthActions.signin", uniqueId)
            // if(reset){
            //     dispatch(GENERATED_SQL_QUERY({}))
            // }
            const res = await Api.post({ data: data, url: uniqueId == null ? Urls.admin_userList : Urls.admin_userList + "/" + uniqueId })
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
            console.log(error, "amit errorerror 37")

            // dispatch(Notify.error('something went wrong! please try again after a while'))
        }
    },

    

    postAgreement: (reset, data, cb, uniqueId) => async (dispatch, _) => {
        try {
            console.log("AuthActions.signin", uniqueId)
            let res
            if(uniqueId==null){
                res = await Api.post({ data: data, url: Urls.agreementl })
            }else{
                res = await Api.put({ data: data, url: Urls.agreementl + "/" + uniqueId })
            }
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
            console.log(error, "amit errorerror 37")
        }
    },

    postRole: (reset, data, cb, uniqueId) => async (dispatch, _) => {
        try {
            console.log("AuthActions.signin", uniqueId)
            let res
            if(uniqueId==null){
                res = await Api.post({ data: data, url: Urls.admin_roleList })
            }else{
                res = await Api.put({ data: data, url: Urls.admin_roleList + "/" + uniqueId })
            }
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
            console.log(error, "amit errorerror 37")
        }
    }
}


export default AdminManagementActions;