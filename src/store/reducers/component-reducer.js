import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  popmenu: "",
  alerts: {},
  breadcrumb: [],
  globalValue: JSON.parse(localStorage.getItem("GLOBAL_VALUE")) || [],
  loader: false,
  table_pagination: "",
  setfileblob: null,
};

const component = createSlice({
  name: "component",
  initialState,
  reducers: {
    POP_MENU: (state, { payload }) => {
      if (payload.tkn) {
        state.popmenu = state.popmenu != payload.data ? payload.data : "";
      } else {
        state.popmenu = "";
      }
    },

    GLOBAL_VALUE: (state, { payload }) => {
      let alreadyPayloading = [...state.globalValue];

      let alreadyPayload = alreadyPayloading.findIndex(
        (item) => item.name == payload.name
      );
      let data = [];
      if (alreadyPayload != -1) {
        data = [...state.globalValue];
        data[alreadyPayload] = payload;
      } else {
        data = [...state.globalValue, payload];
      }
      localStorage.setItem("GLOBAL_VALUE", JSON.stringify(data));
      state.globalValue = data;
    },
    BREADCRUMB: (state, { payload }) => {
      // console.log("__payload___", payload)
      if (payload.tkn) {
        let lendata = [...state.breadcrumb].length;
        state.breadcrumb = [
          { name: payload.data, index: lendata, link: payload.link },
        ];
      } else {
        if (payload.data != "") {
          let lendata = [...state.breadcrumb].length;
          state.breadcrumb = [
            ...state.breadcrumb,
            { name: payload.data, index: lendata, link: payload.link },
          ];
        } else {
          let lendata = [...state.breadcrumb].length;
          state.breadcrumb = [...state.breadcrumb.splice(0, payload.index + 1)];
        }
      }
    },

    // splice(0,payload.index)

    TABLE_PAGINATON: (state, { payload }) => {
      state.table_pagination = payload;
    },
    
    // ALERTS: (state, { payload }) => {
    //   const data = JSON.parse(JSON.stringify(payload));
    //   if (!data?.icon) {
    //     data.icon = "error";
    //   }
    //   if (!data?.text) {
    //     data.text = "Internal Server Error";
    //   }
    //   state.alerts = data;
    // },

    ALERTS: (state, { payload }) => {
      state.alerts = payload;
    },

    LOADERS: (state, { payload }) => {
      state.loader = payload;
    },
    SET_FILE_BLOB: (state, { payload }) => {
      state.setfileblob = payload;
    },

    RESET_STATE: (state) => {
      state.alerts = {};
      state.powerBiReportConf = {};
    },
  },
});

export const {
  POP_MENU,
  BREADCRUMB,
  ALERTS,
  TABLE_PAGINATON,
  LOADERS,
  SET_FILE_BLOB,
  GLOBAL_VALUE,
  RESET_STATE,
} = component.actions;
export default component.reducer;
