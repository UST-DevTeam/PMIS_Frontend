import { configureStore } from "@reduxjs/toolkit";
import auth from "./reducers/auth-reducer"
import component from "./reducers/component-reducer"
import adminManagement from "./reducers/adminManagement-reducer"
import websocket from "./reducers/websocket-reducer"
import adminData from "./reducers/admin-reducer"
import projectList from "./reducers/projectList-reducer"
import myHomeData from "./reducers/myHome-reducer";
import hrReducer from "./reducers/hr-reduces"
import vendorData from "./reducers/vendor-reducer"
import financeData from "./reducers/finance-reducer"
import formssData from "./reducers/formss-reducer"
import expenseAdvanceData from "./reducers/expenseAdvance-reducer"
import eventlogsReducer from "./reducers/eventlogs-reducer";
import filterData from "./reducers/filter-reducer";
import GraphData from "./reducers/graph-reducer";
import currentuserData from "./reducers/currentuser-reducer";
import repository from "./reducers/repository-reducer";
import gpTrackingReducer from "./reducers/gpTracking-reducer"
import tableReducer from "./reducers/table-reducer"
import dropDownReducer from "./reducers/dropDown-reducer"
const store = configureStore({
    reducer: {
        dropDown:dropDownReducer,
        table:tableReducer, 
        auth,
        component,
        adminManagement,
        websocket,
        adminData,
        projectList,    
        myHomeData,
        hrReducer,
        vendorData,
        financeData,
        formssData,
        expenseAdvanceData,
        eventlogsReducer,
        filterData,
        GraphData,
        currentuserData,
        repository,
        gpTrackingReducer
    },
    devTools: true
})
export default store