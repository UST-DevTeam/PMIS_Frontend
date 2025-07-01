
import Button from "../../components/Button"
import Api from "../../utils/api"
import { Urls } from "../../utils/url"
import { ALERTS } from "../reducers/component-reducer"
import { GET_PROJECT_ALL_LIST, GET_PROJECT_TYPE_SUB, GET_USER_ALLLOCATED_PROJECT, GET_PROJECT_CIRCLE, SET_DYNAMIC_FORM, GET_MAPPED_DATA, GET_CIRCLE_WITH_PG_DATA, GET_USR_NOTIFICATION, GET_GLOBAL_COMPLAINCE_TYPE_DATA, GET_GLOBAL_COMPLAINCE_TYPE_APPROVER_DATA } from "../reducers/projectList-reducer"
import CommonActions from "./common-actions"
// import Notify from "./notify-actions"


const projectListActions = {

    postSubmit: (url, data, cb,reset) => async (dispatch, _) => {
        try {
            const res = await Api.post({ url: url, data: data, contentType: "multipart/form-data",reset })
            console.log(res, "res?.statusres?.status")

            const dtaa = res.data
            if (res?.status !== 201 && res?.status !== 200) {
                let msgdata = {
                    show: true,
                    icon: dtaa?.icon,
                    buttons: [

                    ],
                    type: 1,
                    text: dtaa.msg
                }
                dispatch(ALERTS(msgdata))
                cb()
            } else {
                cb()
            }
        } catch (error) {
            console.log(error, "amit errorerror 37")
        }
    },
    getIsonFormList: () => async (dispatch, _) => {
        try {
            const res = await Api.get({ url: Urls.isonForm })
            if (res?.status !== 200) return
            console.log(res.data, "res.data")
            const dataAll = res.data.data
            dispatch(GET_ISON_FORM(dataAll))
        } catch (error) {
            console.log(error, "amit errorerror 37")

            // dispatch(Notify.error('something went wrong! please try again after a while'))
        }
    },
    getProjectType: (uniqueId, reset = true, show = 1) => async (dispatch, _) => {
        try {
            const res = await Api.get({ url: `${Urls.admin_getProjectSubType}/${uniqueId}`, show: show })
            if (res?.status !== 200) return
            let dataAll = res?.data?.data[0]
            dispatch(GET_PROJECT_TYPE_SUB({ dataAll, reset }))
        } catch (error) {
            console.log(error, "amit errorerror 37")

            // dispatch(Notify.error('something went wrong! please try again after a while'))
        }
    },
    getMappedData: (uniqueId, reset = true, show = 1) => async (dispatch, _) => {
        try {
            const res = await Api.get({ url: `${Urls.admin_getMappedData}/${uniqueId}`, show: show })
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_MAPPED_DATA({ dataAll, reset }))
        } catch (error) {
            console.log(error, "amit errorerror 37")

            // dispatch(Notify.error('something went wrong! please try again after a while'))
        }
    },

    getCircleWithPGData: (uniqueId, reset = true, show = 1) => async (dispatch, _) => {
        try {
            const res = await Api.get({ url: `${Urls.admin_getCircleWithPG}/${uniqueId}`, show: show })
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_CIRCLE_WITH_PG_DATA({ dataAll, reset }))
        } catch (error) {
            console.log(error, "amit errorerror 37")
            // dispatch(Notify.error('something went wrong! please try again after a while'))
        }
    },

    getProjectTypeAll: (uniqueId, args = "", reset = true) => async (dispatch, _) => {
        try {
            const res = await Api.get({ url: `${Urls.projectList_siteEngineer}/${uniqueId}${args != "" ? "?" + args : ""}` })
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_PROJECT_ALL_LIST({ dataAll, reset }))
        } catch (error) {
            // console.log(error, "amit errorerror 37")

            // dispatch(Notify.error('something went wrong! please try again after a while'))
        }
    },


    postProjectTypeAll: (reset, data, cb, uniqueId) => async (dispatch, _) => {
        try {
            const res = await Api.post({ data: data, url: uniqueId == null ? Urls.projectList_siteEngineer : Urls.projectList_siteEngineer + "/" + uniqueId })
            if (res?.status !== 201 && res?.status !== 200) {
                let msgdata = {
                    show: true,
                    icon: "error",
                    buttons: [],
                    type: 1,
                    text: res?.data?.msg,
                };
                dispatch(ALERTS(msgdata));
            } else {
                cb()

            }

        } catch (error) {
            return;
        }
    },



    submitProjectTypeData: (urle, data, cb = () => { }, reset = true) => async (dispatch, _) => {
        try {
            const res = await Api.post({ url: urle, data: data })
            if (res?.status !== 200 && res?.status !== 201) {
                let msgdata = {
                    show: true,
                    icon: res?.data?.icon,
                    buttons: [],
                    type: 1,
                    text: res?.data?.msg,
                };
                dispatch(ALERTS(msgdata));
            }
            else {
                cb()
            }
        } catch (error) {
            console.log(error, "amit errorerror 37")
        }
    },

    globalProjectTypeDataPatch: (urle, projectuniqueId, data, cb = () => { }, reset = true) => async (dispatch, _) => {
        try {
            if (projectuniqueId != null) { data["projectuniqueId"] = projectuniqueId }
            const res = await Api.patch({ url: urle + "/" + projectuniqueId, data: data })
            if (res?.status !== 200 && res?.status !== 201) {
                let msgdata = {
                    show: true,
                    icon: res?.data?.icon,
                    buttons: [],
                    type: 1,
                    text: res?.data?.msg,
                };
                dispatch(ALERTS(msgdata));
            }
            else {
                cb()
            }

        } catch (error) {
            console.log(error, "amit errorerror 37")

            // dispatch(Notify.error('something went wrong! please try again after a while'))
        }
    },

    globalComplianceTypeDataPatch: (urle, data, cb = () => { }, reset = true) => async (dispatch, _) => {
        try {
            const res = await Api.patch({ url: urle, data: data })
            if (res?.status !== 200 && res?.status !== 201) {
                let msgdata = {
                    show: true,
                    icon: res?.data?.icon,
                    buttons: [],
                    type: 1,
                    text: res?.data?.msg,
                };
                dispatch(ALERTS(msgdata));
            }
            else {
                cb()
            }

        } catch (error) {
            console.log(error, "globalComplianceTypeApproverDataamit errorerror 37")
        }
    },

    globalComplianceTypeDataGet: (sietId, mileStoneId, args = "", reset = true, cb = () => { }) => async (dispatch, _) => {
        try {
            const res = await Api.get({ url: `${Urls.compliance_globalSaver}/${sietId}/${mileStoneId}${args != "" ? "?" + args : ""}` })
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            cb()
            dispatch(GET_GLOBAL_COMPLAINCE_TYPE_DATA({ dataAll, reset }))
            
        } catch (error) {
            // console.log(error, "amit errorerror 37")
        }
    },


    globalComplianceTypeApproverDataGet: (id, args = "", reset = true, cb = () => { }) => async (dispatch, _) => {
        try {
            const res = await Api.get({ url: `${Urls.compliance_globalSaver_Approver}/${id}${args != "" ? "?" + args : ""}` })
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            cb()
            dispatch(GET_GLOBAL_COMPLAINCE_TYPE_APPROVER_DATA({ dataAll, reset }))
            
        } catch (error) {
            console.log(error, "amit errorerror 37")
        }
    },

    globalComplianceTypeApproverDataPost: (id, data, cb = () => { }, reset = true) => async (dispatch, _) => {
        try {
            const res = await Api.post({ url: `${Urls.compliance_globalSaver_Approver}/${id}`, data: data })
            if (res?.status !== 200 && res?.status !== 201) {
                let msgdata = {
                    show: true,
                    icon: res?.data?.icon,
                    buttons: [],
                    type: 1,
                    text: res?.data?.msg,
                };
                dispatch(ALERTS(msgdata));
            }
            else {
                cb()
            }
        } catch (error) {
            console.log(error, "amit errorerror 37")
        }
    },

    globalComplianceTypeApproverDataPatch: (urle, id, data, cb = () => { }, reset = true) => async (dispatch, _) => {
        try {
            const res = await Api.patch({ url: urle + "/" + id, data: data })
            if (res?.status !== 200 && res?.status !== 201) {
                let msgdata = {
                    show: true,
                    icon: res?.data?.icon,
                    buttons: [],
                    type: 1,
                    text: res?.data?.msg,
                };
                dispatch(ALERTS(msgdata));
            }
            else {
                cb()
            }

        } catch (error) {
            console.log(error, "amit errorerror 37")
        }
    },


    getUserAllocatedProject: (reset = true, uid, args = "") => async (dispatch, _) => {
        try {
            console.log("cities", args)
            const res = await Api.get({ url: `${Urls.projectList_getproject_allocation}${uid}${args != "" ? "?" + args : ""}`, reset })
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_USER_ALLLOCATED_PROJECT({ dataAll, reset }))
        } catch (error) {
        }
    },

    getProjectCircle: (reset = true, args = "") => async (dispatch, _) => {
        try {
            const res = await Api.get({ url: `${Urls.project_circle}${args != "" ? "?" + args : ""}`, reset })
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_PROJECT_CIRCLE({ dataAll, reset }))
        } catch (error) {
        }
    },

    getnotification: (reset = true, args = "") => async (dispatch, _) => {
        try {
            const res = await Api.get({ url: `${Urls.user_notification}${args != "" ? "?" + args : ""}`, reset })
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_USR_NOTIFICATION({ dataAll, reset }))
        } catch (error) {
        }
    },

    partnerGroupMilestonePatch: (urle, data, cb = () => { }, reset = true) => async (dispatch, _) => {
        try {
            const res = await Api.patch({ url: urle, data: data })
            if (res?.status !== 200 && res?.status !== 201) {
                let msgdata = {
                    show: true,
                    icon: res?.data?.icon,
                    buttons: [],
                    type: 1,
                    text: res?.data?.msg,
                };
                dispatch(ALERTS(msgdata));
            }
            else {
                cb()
            }
        } catch (error) {
            console.log(error, "errorerror 37")
        }
    },

    partnerGroupMilestonePost: (urle, data, cb = () => { }, reset = true) => async (dispatch, _) => {
        try {
            const res = await Api.post({ url: urle, data: data })
            if (res?.status !== 200 && res?.status !== 201) {
                let msgdata = {
                    show: true,
                    icon: res?.data?.icon,
                    buttons: [],
                    type: 1,
                    text: res?.data?.msg,
                };
                dispatch(ALERTS(msgdata));
            }
            else {
                cb()
            }
        } catch (error) {
            console.log(error, "errorerror 37")
        }
    },

    


    setDynamicForm: (label, value, reseter) => async (dispatch, _) => {
        try {

            let dataAll = {
                label: label,
                value: value,
                reseter: reseter
            }

            dispatch(SET_DYNAMIC_FORM(dataAll))
        } catch (error) {
            console.log(error, "amit errorerror 37")

            // dispatch(Notify.error('something went wrong! please try again after a while'))
        }
    },



    resetTablesList: () => async (dispatch, _) => {
        dispatch(TABLES_LIST({}))
    }
}


export default projectListActions;