import Api from "../../utils/api"
import { Urls } from "../../utils/url"
import { ALERTS } from "../reducers/component-reducer"
import { GET_CUSTOMER,GET_GPPROJECTGROUP,GET_SALARYDB,GET_OTHERFIXEDCOST, GET_GPCOSTCENTER, GET_GPOTHERFIXEDCOSTTYPES, GET_GPTRACKINGMAIN, GET_ZONE_BY_CUSTOMER_ID } from "../reducers/gpTracking-reducer"


const gpTrackingActions = {

    getGPCustomer:(reset=true,args="") => async (dispatch, _) => {
        try {
            const res = await Api.get({ url:`${Urls.gpTracking_customer}${args!=""?"?"+args:""}`, reset })
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_CUSTOMER({dataAll,reset}))
        } catch (error) {
        }
    },
    getGPCostCenter:(id="",reset=true,args="") => async (dispatch, _) => {
    
        try {
            if (id !== ""){
                const res = await Api.get({ url:`${Urls.gpTracking_costCenter}/${id}${args!=""?"?"+args:""}`, reset })
                if (res?.status !== 200) return
                let dataAll = res?.data?.data
                dispatch(GET_GPCOSTCENTER({dataAll,reset}))
            }
            else{
                const res = await Api.get({ url:`${Urls.gpTracking_costCenter}${args!=""?"?"+args:""}`, reset })
                if (res?.status !== 200) return
                let dataAll = res?.data?.data
                dispatch(GET_GPCOSTCENTER({dataAll,reset}))
            }
            
        } catch (error) {
        }
    },
    getGPZone:(id="",reset=true,args="") => async (dispatch, _) => {
        try {
            if (id !== ""){
                const res = await Api.get({ url:`${Urls.gpTracking_Zone}/${id}${args!=""?"?"+args:""}`, reset })
                if (res?.status !== 200) return
                let dataAll = res?.data?.data
                dispatch(GET_GPZONE({dataAll,reset}))
            }
            else{
                const res = await Api.get({ url:`${Urls.gpTracking_Zone}${args!=""?"?"+args:""}`, reset })
                if (res?.status !== 200) return
                let dataAll = res?.data?.data
                dispatch(GET_GPZONE({dataAll,reset}))
            }
            
        } catch (error) {
        }
    },
    getGPOtherFixedCostTypes:(id="",reset=true,args="") => async (dispatch, _) => {
        try {
            if (id !== ""){
                const res = await Api.get({ url:`${Urls.gpTracking_OtherCostTypes}/${id}${args!=""?"?"+args:""}`, reset })
                if (res?.status !== 200) return
                let dataAll = res?.data?.data
                dispatch(GET_GPOTHERFIXEDCOSTTYPES({dataAll,reset}))
            }
            else{
                const res = await Api.get({ url:`${Urls.gpTracking_OtherCostTypes}${args!=""?"?"+args:""}`, reset })
                if (res?.status !== 200) return
                let dataAll = res?.data?.data
                dispatch(GET_GPOTHERFIXEDCOSTTYPES({dataAll,reset}))
            }
            
        } catch (error) {
        }
    },
    getGPSalaryDB:(reset=true,args="") => async (dispatch, _) => {
        try {
            if (args != ""){
                // const argss = Object.keys(args).map((key) => {
                //   return `${encodeURIComponent(key)}=${encodeURIComponent(args[key])}`;
                // }).join("&");
                const argss = JSON.stringify(args);
                const url = `${Urls.gpTracking_salaryDB}${argss !== "" ? "?" + argss : ""}`;
                const res = await Api.get({ url, reset: true });
                if (res?.status !== 200) return
                let dataAll = res?.data?.data
                dispatch(GET_SALARYDB({dataAll,reset}))
            }
            else{
                const res = await Api.get({ url:`${Urls.gpTracking_salaryDB}${args!=""?"?"+args:""}`, reset })
                if (res?.status !== 200) return
                let dataAll = res?.data?.data
                dispatch(GET_SALARYDB({dataAll,reset}))
            }
            
            
        } catch (error) {
        }
    },
    getOtherFixedCost:(reset=true,args="") => async (dispatch, _) => {
        try {
            
            const res = await Api.get({ url:`${Urls.gpTracking_OtherFixedCost}${args!=""?"?"+args:""}`, reset })
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_OTHERFIXEDCOST({dataAll,reset}))
        } catch (error) {
        }
    },
    getGPTrackingMain:(reset=true,args="") => async (dispatch, _) => {
        try {
            
            const res = await Api.get({ url:`${Urls.gpTracking_Main}${args!=""?"?"+args:""}`, reset })
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_GPTRACKINGMAIN({dataAll,reset}))
        } catch (error) {
        }
    },
    postGPSalaryDB: (reset, data, cb, uniqueId) => async (dispatch, _) => {
        try {
            const res = await Api.post({ data: data, url: uniqueId == null ? Urls.gpTracking_salaryDB : Urls.gpTracking_salaryDB + "/" + uniqueId } )
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
    postOtherFixedCostTypes: (reset, data, cb, uniqueId=null) => async (dispatch, _) => {
        try {
            
            const res = await Api.post({ data: data, url: uniqueId == null ? Urls.gpTracking_OtherCostTypes : Urls.gpTracking_OtherCostTypes + "/" + uniqueId} )
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
    postGPOtherFixedCost: (reset, data, cb, uniqueId) => async (dispatch, _) => {
        try {
            const res = await Api.post({ data: data, url: uniqueId == null ? Urls.gpTracking_OtherFixedCost : Urls.gpTracking_OtherFixedCost + "/" + uniqueId} )
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
            console.log(error,'errorerror')
            return;
        }
    },

    getZoneByCustomerId: (id = "", reset = true, args = "") => async (dispatch, _) => {

        try {
            if (id !== "") {
                const res = await Api.get({ url: `${Urls.getZoneByCustomerId}/${id}${args != "" ? "?" + args : ""}`, reset })
                if (res?.status !== 200) return
                let dataAll = res?.data?.data
                dispatch(GET_ZONE_BY_CUSTOMER_ID({ dataAll, reset }))
            }
            else {
                const res = await Api.get({ url: `${Urls.gpTracking_costCenter}${args != "" ? "?" + args : ""}`, reset })
                if (res?.status !== 200) return
                let dataAll = res?.data?.data
                dispatch(GET_GPCOSTCENTER({ dataAll, reset }))
            }

        } catch (error) {
        }
    },
    

    

}
export default gpTrackingActions;