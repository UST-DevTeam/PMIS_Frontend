import Api from "../../utils/api";
import { Urls } from "../../utils/url";
import { ALERTS } from "../reducers/component-reducer";
import { GET_AIRTEL_CIRCLE_LIST, GET_AIRTEL_MAPPED_CIRCLE,GET_AIRTEL_ONE_PLANNINGDATA,GET_AIRTEL_RFAI_OFFERED, GET_AIRTEL_SURVEY_CHECKLIST, GET_AIRTEL_USER_ALLLOCATED_PROJECT, GET_CURRENTUSER_CIRCLE_LIST, GET_MY_RFAI_SURVEY_TASK, GET_RFAI_SURVEY_APPROVER_LIST } from "../reducers/airtel-reducer";


const AirtelActions = {

    getAirtelMappedCircle:(reset = true, args = "") => async (dispatch, _) => {
        try {
            const res = await Api.get({url: `${Urls.airtelMappedCircle}${args != "" ? "?" + args : ""}`,reset});
            if (res?.status !== 200) return;
            let dataAll = res?.data?.data;
            dispatch(GET_AIRTEL_MAPPED_CIRCLE({ dataAll, reset }));
        } 
        catch (error) { 

        }
    },

    postAirtelMappedCircle: (reset, data, cb, uniqueId) => async (dispatch, _) => {
        try {
            const res = await Api.post({data:data,url:uniqueId == null ? Urls.airtelMappedCircle:Urls.airtelMappedCircle + "/" + uniqueId});
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
                cb();
            }
        } catch (error) {
            return;
        }
    },

    getAirtelCircleList:(reset = true, args = "") => async (dispatch, _) => {
        try {
            const res = await Api.get({url: `${Urls.airtelCircleList}${args != "" ? "?" + args : ""}`,reset});
            if (res?.status !== 200) return;
            let dataAll = res?.data?.data;
            dispatch(GET_AIRTEL_CIRCLE_LIST({ dataAll, reset }));
        } 
        catch (error) { 

        }
    },

    getAirtelRFAIOffered:(reset = true, args = "") => async (dispatch, _) => {
        try {
            const res = await Api.get({url: `${Urls.airtelRFAIOffered}${args != "" ? "?" + args : ""}`,reset});
            if (res?.status !== 200) return;
            let dataAll = res?.data?.data;
            dispatch(GET_AIRTEL_RFAI_OFFERED({ dataAll, reset }));
        } 
        catch (error) { 

        }
    },

    patchAirtelRFAIOffered: (urle, data, cb = () => { }, reset = true) => async (dispatch, _) => {
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
            console.log(error, "")

            // dispatch(Notify.error('something went wrong! please try again after a while'))
        }
    },

    getAirtelUserAllocatedProject: (reset = true, uid, args = "") => async (dispatch, _) => {
        try {
            const res = await Api.get({ url: `${Urls.airtelProjectAllocationlist}/${uid}${args != "" ? "?" + args : ""}`, reset })
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_AIRTEL_USER_ALLLOCATED_PROJECT({ dataAll, reset }))
        } catch (error) {
        }
    },

    getAirtelMyRFAISurveyTask:(reset = true, args = "") => async (dispatch, _) => {
        try {
            const res = await Api.get({url: `${Urls.airtelMyRFAISurveyTask}${args != "" ? "?" + args : ""}`,reset});
            if (res?.status !== 200) return;
            let dataAll = res?.data?.data;
            dispatch(GET_MY_RFAI_SURVEY_TASK({ dataAll, reset }));
        } 
        catch (error) { 

        }
    },

    getAirtelRFAISurveyApproverList:(reset = true, args = "") => async (dispatch, _) => {
        try {
            const res = await Api.get({url: `${Urls.airtelRFAISurveyApproverList}${args != "" ? "?" + args : ""}`,reset});
            if (res?.status !== 200) return;
            let dataAll = res?.data?.data;
            dispatch(GET_RFAI_SURVEY_APPROVER_LIST({ dataAll, reset }));
        } 
        catch (error) { 

        }
    },

    postAirtelRFAISurveyApproverList: (reset, data, cb, uniqueId) => async (dispatch, _) => {
        try {
            const res = await Api.post({data:data,url:uniqueId == null ? Urls.airtelRFAISurveyApproverList:Urls.airtelRFAISurveyApproverList + "/" + uniqueId});
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
                cb();
            }
        } catch (error) {
            return;
        }
    },

    getAirtelCurrentUserCircleList:(customerId,empId,reset = true, args = "") => async (dispatch, _) => {
        try {
            const res = await Api.get({url: `${Urls.airtelCurrentUserCircleList}/${customerId}/${empId}${args != "" ? "?" + args : ""}`,reset});
            if (res?.status !== 200) return;
            let dataAll = res?.data?.data;
            dispatch(GET_CURRENTUSER_CIRCLE_LIST({ dataAll, reset }));
        } 
        catch (error) { 

        }
    },

    getAirtelOnePlanningData:(id,reset = true, args = "") => async (dispatch, _) => {
        try {
            const res = await Api.get({url: `${Urls.airtelonePlanningData}/${id}${args != "" ? "?" + args : ""}`,reset});
            if (res?.status !== 200) return;
            let dataAll = res?.data?.data;
            console.log(dataAll,"dataAlldataAlldataAlldataAlldataAll")
            dispatch(GET_AIRTEL_ONE_PLANNINGDATA({ dataAll, reset }));
        } 
        catch (error) { 

        }
    },

    getAirtelSurveyChecklist:(reset = true, args = "") => async (dispatch, _) => {
        try {
            const res = await Api.get({url: `${Urls.airtelSurveyChecklist}${args != "" ? "?" + args : ""}`,reset});
            if (res?.status !== 200) return;
            let dataAll = res?.data?.data;
            dispatch(GET_AIRTEL_SURVEY_CHECKLIST({ dataAll, reset }));
        } 
        catch (error) { 

        }
    },

    postAirtelSurveyChecklist: (reset, data, cb, uniqueId) => async (dispatch, _) => {
        try {
            const res = await Api.post({data:data,url:uniqueId == null ? Urls.airtelSurveyChecklist:Urls.airtelSurveyChecklist + "/" + uniqueId});
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
                cb();
            }
        } catch (error) {
            return;
        }
    },

};

export default AirtelActions;