import Api from "../../utils/api"
import { Urls } from "../../utils/url"
import { ALERTS } from "../reducers/component-reducer"
import { 
    GET_PROJECT_TYPE,
    GET_VENDOR_COST_MILESTONE,
    GET_VENDOR_COST_MILESTONE_LIST,
    GET_VENDOR_COST_PROJECTGROUP_LIST,
    GET_VENDOR_COST_PROJECTTYPE_LIST,
    GET_VENDOR_COST_SUBPROJECT_LIST,
    GET_VENDOR_COST_VENDORS_LIST,
    GET_VENDOR_DETAILS,
    GET_VENDOR_PROJECT_LIST,
    GET_VENDOR_PROJECT_TRAKING,
    GET_VENDOR_SUBPROJECT,
    GET_VENDORACTIVITY_SUBPROJECT_LIST,
} from "../reducers/vendor-reducer"


const VendorActions = {
    getManageEmpDetails:(reset=true,uid="",args="") => async (dispatch, _) => {
        try {
            const res = await Api.get({ url:`${Urls.admin_empdetails}${uid!=""?"/"+uid:""}${args!=""?"?"+args:""}`})
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_EMPLOYEE_DETAILS({dataAll,reset}))
        } catch (error) {
        }
    },
    postManageEmpDetails: (reset, data, cb, uniqueId) => async (dispatch, _) => {
        try {
            const res = await Api.post({ data: data, url: uniqueId == null ? Urls.admin_empdetails : Urls.admin_empdetails + "/" + uniqueId , contentType:"multipart/form-data", reset })
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

    getManageVendorDetails:(reset=true,uid="",args="") => async (dispatch, _) => {
        try {
            console.log('dhdhdhd',args)
            const res = await Api.get({ url:`${Urls.vendor_details}${uid!=""?"/"+uid:""}${args!=""?"?"+args:""}`})
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_VENDOR_DETAILS({dataAll,reset}))
        } catch (error) {
        }
    },
    postManageVendorDetails: (reset, data, cb, uniqueId) => async (dispatch, _) => {
        try {
            const res = await Api.post({ data: data, url: uniqueId == null ? Urls.vendor_details : Urls.vendor_details + "/" + uniqueId , contentType:"multipart/form-data", reset })
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

    getVendorProjectList:(reset=true,uid="",args="") => async (dispatch, _) => {
        try {
            const res = await Api.get({ url:`${Urls.vendor_project_list}${args!=""?"?"+args:""}`, reset })
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_VENDOR_PROJECT_LIST({dataAll,reset}))
        } catch (error) {
        }
    },

    getProjectType:(reset=true,customerId="",args="") => async (dispatch, _) => {
        try {
            const res = await Api.get({ url:`${Urls.vendorProjects}/${customerId}${args!=""?"?"+args:""}`})
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_PROJECT_TYPE({dataAll,reset}))
        } catch (error) {
        }
    },


    



    getVendorProjectTracking:(reset=true,args="") => async (dispatch, _) => {
        try {
            const res = await Api.get({ url:`${Urls.vendor_project_tracking}${args!=""?"?"+args:""}`, reset })
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_VENDOR_PROJECT_TRAKING({dataAll,reset}))
        } catch (error) {
        }
    },
    getVendorSubProject:(reset=true,args="") => async (dispatch, _) => {
        try {
            const res = await Api.get({ url:`${Urls.filter_vendor_subProject}${args!=""?"?"+args:""}`, reset })
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_VENDOR_SUBPROJECT({dataAll,reset}))
        } catch (error) {
        }
    },
    getVendorCostMilestone:(reset=true,args="") => async (dispatch, _) => {
        try {
            const res = await Api.get({ url:`${Urls.get_vendorCostMilestone}${args!=""?"?"+args:""}`, reset })
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_VENDOR_COST_MILESTONE({dataAll,reset}))
        } catch (error) {
        }
    },
    postVendorCostMilestone: (reset, data, cb, uniqueId) => async (dispatch, _) => {
        try {
            const res = await Api.post({ data: data, url: uniqueId == null ? Urls.get_vendorCostMilestone : Urls.get_vendorCostMilestone + "/" + uniqueId })
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
    getVendorCostMilestoneList:(reset=true,args="") => async (dispatch, _) => {
        try {
            const res = await Api.get({ url:`${Urls.get_vendortCostMilestoeList}${args!=""?"?"+args:""}`, reset })
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_VENDOR_COST_MILESTONE_LIST({dataAll,reset}))
        } catch (error) {
        }
    },
    getVendorCostprojectGroupList:(reset=true,args="") => async (dispatch, _) => {
        try {
            const res = await Api.get({ url:`${Urls.get_vendortCostProjectGroupList}${args!=""?"?"+args:""}`, reset })
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_VENDOR_COST_PROJECTGROUP_LIST({dataAll,reset}))
        } catch (error) {
        }
    },
    getVendorCostSubprojectTypeList:(reset=true,args="") => async (dispatch, _) => {
        
        try {
            const res = await Api.get({ url:`${Urls.get_vendortCostSubProjectTypeList}${args!=""?"?"+args:""}`, reset })
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_VENDOR_COST_SUBPROJECT_LIST({dataAll,reset}))
        } catch (error) {
        }
    },
    getVendorCostprojectTypeList:(reset=true,args="") => async (dispatch, _) => {
        
        try {
            const res = await Api.get({ url:`${Urls.get_vendortCostSubProjectTypeList}${args!=""?"?"+args:""}`, reset })
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_VENDOR_COST_PROJECTTYPE_LIST({dataAll,reset}))
        } catch (error) {
        }
    },
    getVendorActivitySubProject:(reset=true,args="") => async (dispatch, _) => {
        
        try {
            const res = await Api.get({ url:`${Urls.filter_vendorActivity_subProject}${args!=""?"?"+args:""}`, reset })
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            
            dispatch(GET_VENDORACTIVITY_SUBPROJECT_LIST({dataAll,reset}))
        } catch (error) {
        }
    },
    getvendorCostVendorsList:(reset=true,args="") => async (dispatch, _) => {
        
        try {
            const res = await Api.get({ url:`${Urls.get_vendortCostVendorsList}${args!=""?"?"+args:""}`, reset })
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            
            dispatch(GET_VENDOR_COST_VENDORS_LIST({dataAll,reset}))
        } catch (error) {
        }
    },
}
export default VendorActions;