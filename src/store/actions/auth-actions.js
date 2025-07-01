import Api from "../../utils/api"
import { Urls } from "../../utils/url"
import { SET_AUTHENTICATED, SET_PERMISSION, SET_TOKEN, SET_USER, USERS_PROFILE, SET_USER_ROLE,SET_USER_BUSINESS,ALL_COUNTRIES, } from "../reducers/auth-reducer"
import { ALERTS } from "../reducers/component-reducer"

const AuthActions = {

    signIn: (data, cb) => async (dispatch, _) => {
        try {
            const res = await Api.post({ url: Urls.login, data })
            if (res?.status == 400) {
                let msgdata = {
                    show: true,
                    icon: 'error',
                    text: res?.data?.msg,
                    type: 1
                }
                dispatch(ALERTS(msgdata))
                return
            }
            if (res?.status == 200) {
                const user = res.data.data
                localStorage.setItem('user', JSON.stringify(user))
                localStorage.setItem('token', user.idToken)
                localStorage.setItem('permission', JSON.stringify(user.permissions))
                localStorage.setItem('auth', true)
                dispatch(SET_TOKEN(user.idToken))
                dispatch(SET_PERMISSION(JSON.stringify(user.permissions)))
                dispatch(SET_USER(JSON.stringify(user)))
                dispatch(SET_AUTHENTICATED(true))
                cb()
            }
        } catch (error) {
            console.log(error, "shubham errorerror 69")
        }
    },
    register: (data, cb) => async (dispatch, _) => {
        try {
            const res = await Api.post({ data: data, url: Urls.register })
            let dtaa = res?.data
            let msgdata = {
                show: true,
                icon: dtaa.icon,
                buttons: [
                ],
                type: 1,
                text: dtaa.msg
            }
            dispatch(ALERTS(msgdata))
            if (res?.status !== 201 && res?.status !== 200) return
            cb()
        } catch (error) {
            console.log(error, "shubham errorerror 69")
        }
    },
    businessRegister: (data, cb) => async (dispatch, _) => {
        try {
            const res = await Api.post({ data: data, url: Urls.businessRegister })
            let dtaa = res?.data
            let msgdata = {
                show: true,
                icon: dtaa.icon,
                buttons: [
                ],
                type: 1,
                text: dtaa.msg
            }
            dispatch(ALERTS(msgdata))
            if (res?.status !== 201 && res?.status !== 200) return
            cb()
        } catch (error) {
            console.log(error, "shubham errorerror 69")

            // dispatch(Notify.error('something went wrong! please try again after a while'))
        }
    },

    postsetupRegistration: (reset, data, cb, uniqueId) => async (dispatch, _) => {
        try {
            console.log("AuthActions.signin", data)
            //const res = await Api.post({ data: data, url: uniqueId == null ? Urls.setupRegistration : Urls.setupRegistration + "/" + uniqueId,contentType:"multipart/form-data" })
            const res = await Api.post({ data: data, url: Urls.setupRegistration,contentType:"multipart/form-data" })
            console.log(res,'jsjjjsjh')
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
                console.log(res.data,'jdjhhjjdjd')
                dispatch(SET_USER_ROLE(res?.data.role))
                dispatch(SET_USER_BUSINESS(data))
                cb()
            }
            
        } catch (error) {
            console.log(error, "shubham errorerror 69")
            
            // dispatch(Notify.error('something went wrong! please try again after a while'))
            return;
        }
    },

    setuppassword: (data, cb, failcb) => async (dispatch, _) => {
        try {
            const res = await Api.post({ data: data, url: Urls.setuppassword_stepOne })
            let dtaa = res?.data
            let msgdata = {
                show: true,
                icon: 'success',
                buttons: [
                ],
                type: 1,
                text: dtaa.msg
            }
            dispatch(ALERTS(msgdata))
            if (res?.status !== 200) {
                failcb()
            } else {
                dispatch(SET_USER_ROLE(dtaa?.role))
                cb()
            }
        } catch (error) {
            console.log(error, "shubham errorerror 69")
        }
    },
    kycregiter: (data, cb, failcb) => async (dispatch, _) => {
        try {
            const res = await Api.post({ data: data, url: Urls.KycRegister })
            let dtaa = res?.data
            let msgdata = {
                show: true,
                icon: dtaa.icon,
                buttons: [

                ],
                type: 1,
                text: dtaa.msg
            }
            dispatch(ALERTS(msgdata))


            if (res?.status !== 200) {
                failcb()
            } else {
                dispatch(SET_USER_ROLE(dtaa?.role))
                cb()
            }
        } catch (error) {
            console.log(error, "shubham errorerror 69")
        }
    },
    profile: () => async (dispatch, _) => {
        try {
            const res = await Api.get({ url: Urls.profile })
            if (res?.status !== 200) return
            const dataAll = res?.data?.data[0]
            dispatch(USERS_PROFILE({ dataAll }))
        } catch (error) {
            console.log(error, "shubham errorerror 69")
        }
    },
    sendMail: (data, cb) => async (dispatch, _) => {
        try {
            const res = await Api.post({ data: data, url: Urls.sendMail })
            let dtaa = res?.data
            let msgdata = {
                show: true,
                icon: dtaa.icon,
                buttons: [

                ],
                type: 1,
                text: dtaa.msg
            }
            dispatch(ALERTS(msgdata))


            if (res?.status !== 200) {
                failcb()
            } else {
                cb()
            }
        } catch (error) {
            console.log(error, "shubham errorerror 69")
        }
    },
    postProfile: (data, cb, uniqueId) => async (dispatch, _) => {
        try {
            console.log("AuthActions.signin", uniqueId)
            const res = await Api.post({ data: data, url: uniqueId == null ? Urls.profile : Urls.profile })
            console.log(res, 'jsjjjsjh')
            dtaa=res?.data
            if (res?.status !== 201 && res?.status !== 200) return
            dispatch(SET_USER_ROLE(dtaa?.role))
            cb()
        } catch (error) {
            console.log(error, "shubham errorerror 69")
        }
    },
    postProfileDocuments: (data, cb, uniqueId) => async (dispatch, _) => {
        try {
            const res = await Api.put({ data: data, url: uniqueId == null ? Urls.profile : Urls.profile, contentType: "multipart/form-data" })
            if (res?.status !== 201 && res?.status !== 200) return
            cb()
        } catch (error) {
            console.log(error, "shubham errorerror 69")
        }
    },

    getcountries: () => async (dispatch, _) => {
        try {
            const res = await Api.get({ url: Urls.getCountries })
            console.log(res,'sjjdjdjhdhdh')
            if (res?.status !== 200) return
            const dataAll = res?.data?.data[0]
            dispatch(ALL_COUNTRIES({ dataAll }))
        } catch (error) {
            console.log(error, "shubham errorerror 69")
        }
    },

}


export default AuthActions; 