import Api from "../../utils/api"
import { Urls } from "../../utils/url"
import { ALERTS } from "../reducers/component-reducer"
import { 
    GET_EMPLOYEE_DETAILS,
    GET_HR_ALL_EMPLOYEE,
    GET_HR_MANAGER_EMP,
} from "../reducers/hr-reduces"


const HrActions = {

    getComonentDataList: () => async (dispatch, _) => {
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

    getHRAllEmployee:(reset=true,uid="",args="") => async (dispatch, _) => {
        try {
            const res = await Api.get({ url:`${Urls.admin_all_empdetails}${uid!=""?"/"+uid:""}${args!=""?"?"+args:""}`})
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_HR_ALL_EMPLOYEE({dataAll,reset}))
        } catch (error) {
        }
    },

    getHRManagerInEmployee:(reset=true,uid="",args="") => async (dispatch, _) => {
        try {
            const res = await Api.get({ url:`${Urls.admin_hr_manager_emp}${uid!=""?"/"+uid:""}${args!=""?"?"+args:""}`})
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_HR_MANAGER_EMP({dataAll,reset}))
        } catch (error) {
        }
    },

    getExpenseAndAdvance:(reset=true,uid="",args="") => async (dispatch, _) => {
        try {
            const res = await Api.get({ url:`${Urls.Hr_Expense_Advance}${uid!=""?"/"+uid:""}${args!=""?"?"+args:""}`, reset })
            if (res?.status !== 200) return
            let dataAll = res?.data?.data
            dispatch(GET_EMPLOYEE_DETAILS({dataAll,reset}))
        } catch (error) {
        }
    },
}
export default HrActions;