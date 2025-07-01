import { parse } from "date-fns";
import Api from "../../utils/api";
import { Urls } from "../../utils/url";
import { GET_CUSTOMERS, GET_PROJECT_GROUPS, GET_PROJECT_IDS, GET_SITES_IDS } from "../reducers/repository-reducer";

const RepositoryActions = {
    getCustomers: (employeeID) => async (dispatch, _) => {
        try {
            const res = await Api.get({ url: `${Urls.admin_customer}?empId=${employeeID}` })
            const { data = [] } = res.data
            dispatch(GET_CUSTOMERS(data))
        } catch (error) {
            let msgdata = {
                show: true,
                icon: "error",
                buttons: [],
                type: 1,
                text: error.response?.data?.msg,
            };
            dispatch(ALERTS(msgdata));
        }
    },

    getProjectGroups: (customerID) => async (dispatch, _) => {
        try {
            const res = await Api.get({ url: `${Urls.current_user_PG}?customer=${customerID}` })
            const { data = [] } = res.data
            dispatch(GET_PROJECT_GROUPS(data))
        } catch (error) {
            let msgdata = {
                show: true,
                icon: "error",
                buttons: [],
                type: 1,
                text: error.response?.data?.msg,
            };
            dispatch(ALERTS(msgdata));
        }
    },

    getProjectIds: (projectGroupID) => async (dispatch, _) => {
        try {
            const res = await Api.get({ url: `${Urls.current_user_PID}?projectGroup=${projectGroupID}` })
            const { data = [] } = res.data
            dispatch(GET_PROJECT_IDS(data))
        } catch (error) {
            let msgdata = {
                show: true,
                icon: "error",
                buttons: [],
                type: 1,
                text: error.response?.data?.msg,
            };
            dispatch(ALERTS(msgdata));
        }
    },

    getSiteIds: (projectID) => async (dispatch, _) => {
        try {
            const res = await Api.get({ url: `${Urls.admin_repositorySiteId}/${projectID}` })
            const { data = [] } = res.data
            dispatch(GET_SITES_IDS(data))
        } catch (error) {
            let msgdata = {
                show: true,
                icon: "error",
                buttons: [],
                type: 1,
                text: error.response?.data?.msg,
            };
            dispatch(ALERTS(msgdata));
        }
    },


}


export default RepositoryActions