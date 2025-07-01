import { RESET_STATE } from "../reducers/auth-reducer";
import {
  LOADERS,
  POP_MENU,
  BREADCRUMB,
  GLOBAL_VALUE,
} from "../reducers/component-reducer";
// import Notify from "./notify-actions"

const ComponentActions = {
  popmenu: (data, tkn) => async (dispatch, _) => {
    // console.log("datadatadatauuu", data, tkn);
    try {
      dispatch(POP_MENU({ data, tkn }));
    } catch (error) {
      console.log(error, "amit errorerror 390");
      // dispatch(Notify.error('something went wrong! please try again after a while'))
    }
  },
  breadcrumb: (data, link, index, tkn) => async (dispatch, _) => {
   
    try {
      dispatch(BREADCRUMB({ data, link, index, tkn }));
    } catch (error) {
      console.log(error, "amit errorerror 37");
      // dispatch(Notify.error('something went wrong! please try again after a while'))
    }
  },

  globalUrlStore: (name, value) => async (dispatch, _) => {
    try {
      dispatch(GLOBAL_VALUE({ name, value }));
    } catch (error) {
      console.log(error, "amit errorerror 37");
    }
  },
  alerts: (data) => async (dispatch, _) => {
    try {
      // dispatch(ALERTS(data))
      //     {
      //         show: true,
      //         title: 'Example',
      //         text: 'Hello World',
      //     }
    } catch (error) {
      console.log(error, "amit errorerror 37");
      // dispatch(Notify.error('something went wrong! please try again after a while'))
    }
  },
  loaders: (data) => async (dispatch, _) => {
    try {
      dispatch(LOADERS(data));
    } catch (error) {
      console.log(error, "amit errorerror 37");
      // dispatch(Notify.error('something went wrong! please try again after a while'))
    }
  },
  resetComponent: () => async (dispatch, _) => {
    dispatch(RESET_STATE({}));
  },
};

export default ComponentActions;
