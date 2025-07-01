
import Button from "../../components/Button"
import Api from "../../utils/api"
import { Urls } from "../../utils/url"
import { COMPLIANCELOGLIST, MILESTONEEVENTLIST,PROJECTEVENTLIST,SITEEVENTLIST } from "../reducers/eventlogs-reducer"
import  CommonActions from "./common-actions"
import swal from "sweetalert"
import { ALERTS } from "../reducers/component-reducer"
const eventManagementActions = {

    getmilestoneeventList: (reset=true,uniqueId,args="") => async (dispatch, _) => {
        try {
            const res = await Api.get({ url: `${Urls.milestoneEvent}/${uniqueId}${args !== "" ? "?" + args : ""}`})
            if (res?.status !== 200) return
            const dataAll = res.data.data
            dispatch(MILESTONEEVENTLIST({dataAll,reset}))
        } catch (error) {
            console.log(error, "amit errorerror 37")
        }
    },

    getprojecteventList: (reset=true,uniqueId,args="") => async (dispatch, _) => {
        try {
            const res = await Api.get({ url: `${Urls.projectEvent}/${uniqueId}${args !== "" ? "?" + args : ""}`})
            if (res?.status !== 200) return
            const dataAll = res.data.data
            dispatch(PROJECTEVENTLIST({dataAll,reset}))
        } catch (error) {
            console.log(error, "amit errorerror 37")
        }
    },
    
    getsiteeventList: (reset=true,uniqueId,args="") => async (dispatch, _) => {
        try {
            console.log("AuthActions.signin")
            const res = await Api.get({ url: `${Urls.siteEventLog}/${uniqueId}${args !== "" ? "?" + args : ""}`})
            if (res?.status !== 200) return
            const dataAll = res.data.data
            dispatch(SITEEVENTLIST({dataAll,reset}))
        } catch (error) {
            console.log(error, "amit errorerror 37")
        }
    },
    
    getComplianceLog: (reset=true,uniqueId,args="") => async (dispatch, _) => {
        try {
            const res = await Api.get({ url: `${Urls.complianceLog}/${uniqueId}${args !== "" ? "?" + args : ""}`})
            if (res?.status !== 200) return
            const dataAll = res.data.data
            dispatch(COMPLIANCELOGLIST({dataAll,reset}))
        } catch (error) {
            console.log(error, "amit errorerror 37")
        }
    },
}


export default eventManagementActions;