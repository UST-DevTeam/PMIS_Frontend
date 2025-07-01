import Api from "../../utils/api"
import { Urls } from "../../utils/url"
import { ALERTS } from "../reducers/component-reducer"
import { GET_CURRENT_USER_CIRCLE_PROJECTID, GET_CURRENT_USER_COST_CENTER, GET_CURRENT_USER_MULTIPLE_PG, GET_CURRENT_USER_PG, GET_CURRENT_USER_PID, GET_CURRENT_USER_PT, GET_CURRENT_USER_CUSTOMER,GET_CURRENT_USER_BUSINESS_UNIT} from "../reducers/currentuser-reducer"


const CurrentuserActions = {

    getcurrentuserPG:(reset=true,args="",show=0) => async (dispatch, _) => {
        try {
            const res = await Api.get({ url:`${Urls.current_user_PG}${args!=""?"?"+args:""}`, show:show })
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_CURRENT_USER_PG({dataAll,reset}))
        } 
        catch (error) {
            console.log(error)
        }
    },
    getcurrentuserPT:(reset=true,args="") => async (dispatch, _) => {
        try {
            const res = await Api.get({ url:`${Urls.current_user_PT}${args!=""?"?"+args:""}`, reset })
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_CURRENT_USER_PT({dataAll,reset}))
        } catch (error) {
        }
    },
    getcurrentuserPID:(reset=true,args="",show = 1) => async (dispatch, _) => {
        try {
            const res = await Api.get({ url:`${Urls.current_user_PID}${args!=""?"?"+args:""}`, reset,show:show })
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_CURRENT_USER_PID({dataAll,reset}))
        } catch (error) {
        }
    },
    getcurrentuserCircleWithProjectId:(reset=true,args="",show = 1) => async (dispatch, _) => {
        try {
            const res = await Api.get({ url:`${Urls.current_user_circle_projectId}${args!=""?"?"+args:""}`, reset,show:show })
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_CURRENT_USER_CIRCLE_PROJECTID({dataAll,reset}))
        } catch (error) {
        }
    },
    getcurrentuserCostCenter:(reset=true,args="",show = 1,id=null) => async (dispatch, _) => {
        try {
            let urlName = `${Urls.current_user_cost_center}${args!=""?"?"+args:""}`
            if (id){
                urlName = `${Urls.current_user_cost_center}/${id}${args!=""?"?"+args:""}`
            }
            const res = await Api.get({ url:urlName, reset,show:show })
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_CURRENT_USER_COST_CENTER({dataAll,reset}))
        } catch (error) {
        }   
    },
    getcurrentusermultiplePG:(reset=true,args="",show=0) => async (dispatch, _) => {
        try {
            const res = await Api.get({ url:`${Urls.current_user_multiple_PG}${args!=""?"?"+args:""}`, show:show })
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_CURRENT_USER_MULTIPLE_PG({dataAll,reset}))
        } catch (error) {
        }
    },
    getcurrentuserBusinessUnit:(reset=true,args="",show=0) => async (dispatch, _) => {
        try {
            const res = await Api.get({ url:`${Urls.current_user_business_unit}${args!=""?"?"+args:""}`, show:show })
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_CURRENT_USER_BUSINESS_UNIT({dataAll,reset}))
        } catch (error) {
        }
    },
    getcurrentuserCustomer:(reset=true,args="",show=0) => async (dispatch, _) => {
        try {
            const res = await Api.get({ url:`${Urls.current_user_customer}${args!=""?"?"+args:""}`, show:show })
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_CURRENT_USER_CUSTOMER({dataAll,reset}))
        } catch (error) {
        }
    },

}
export default CurrentuserActions;