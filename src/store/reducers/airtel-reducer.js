import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  getAirtelMappedCircle: [],
  getAirtelCircleList:[],
  getAirtelRFAIOffered:[],
  getAirtelUserAllocatedProject:[],
  getAirtelMyRFAISurveyTask:[],
  getAirtelRFAISurveyApproverList:[],
  getAirtelCurrentUserCircleList:[],
  getAirtelOnePlanningData:[],
  getAirtelSurveyChecklist:[]
};

const airtelData = createSlice({
  name: "airtelData",
  initialState,
  reducers: {

    GET_AIRTEL_MAPPED_CIRCLE: (state, { payload }) => {
      if (payload.reset) {
        state.getAirtelMappedCircle = payload.dataAll;
      } else {
        state.getAirtelMappedCircle = [...state.getAirtelMappedCircle, ...payload.dataAll];
      }
    },

    GET_AIRTEL_CIRCLE_LIST: (state, { payload }) => {
      if (payload.reset) {
        state.getAirtelCircleList = payload.dataAll;
      } else {
        state.getAirtelCircleList = [...state.getAirtelCircleList, ...payload.dataAll];
      }
    },

    GET_AIRTEL_RFAI_OFFERED: (state, { payload }) => {
      if (payload.reset) {
        state.getAirtelRFAIOffered = payload.dataAll;
      } else {
        state.getAirtelRFAIOffered = [...state.getAirtelRFAIOffered, ...payload.dataAll];
      }
    },

    GET_AIRTEL_USER_ALLLOCATED_PROJECT: (state, { payload }) => {
      if (payload.reset) {
        state.getAirtelUserAllocatedProject = payload.dataAll;
      } else {
        state.getAirtelUserAllocatedProject = [...state.getAirtelUserAllocatedProject, ...payload.dataAll];
      }
    },

    GET_MY_RFAI_SURVEY_TASK: (state, { payload }) => {
      if (payload.reset) {
        state.getAirtelMyRFAISurveyTask = payload.dataAll;
      } else {
        state.getAirtelMyRFAISurveyTask = [...state.getAirtelMyRFAISurveyTask, ...payload.dataAll];
      }
    },

    GET_RFAI_SURVEY_APPROVER_LIST: (state, { payload }) => {
      if (payload.reset) {
        state.getAirtelRFAISurveyApproverList = payload.dataAll;
      } else {
        state.getAirtelRFAISurveyApproverList = [...state.getAirtelRFAISurveyApproverList, ...payload.dataAll];
      }
    },

    GET_CURRENTUSER_CIRCLE_LIST: (state, { payload }) => {
      if (payload.reset) {
        state.getAirtelCurrentUserCircleList = payload.dataAll;
      } else {
        state.getAirtelCurrentUserCircleList = [...state.getAirtelCurrentUserCircleList, ...payload.dataAll];
      }
    },

    GET_AIRTEL_ONE_PLANNINGDATA: (state, { payload }) => {
      if (payload.reset) {
        state.getAirtelOnePlanningData = payload.dataAll;
      } else {
        state.getAirtelOnePlanningData = [...state.getAirtelOnePlanningData, ...payload.dataAll];
      }
    },


    GET_AIRTEL_SURVEY_CHECKLIST: (state, { payload }) => {
      if (payload.reset) {
        state.getAirtelSurveyChecklist = payload.dataAll;
      } else {
        state.getAirtelSurveyChecklist = [...state.getAirtelSurveyChecklist, ...payload.dataAll];
      }
    },

    
  },
});

export const {
  GET_AIRTEL_MAPPED_CIRCLE,
  GET_AIRTEL_CIRCLE_LIST,
  GET_AIRTEL_RFAI_OFFERED,
  GET_AIRTEL_USER_ALLLOCATED_PROJECT,
  GET_MY_RFAI_SURVEY_TASK,
  GET_RFAI_SURVEY_APPROVER_LIST,
  GET_CURRENTUSER_CIRCLE_LIST,
  GET_AIRTEL_ONE_PLANNINGDATA,
  GET_AIRTEL_SURVEY_CHECKLIST
} = airtelData.actions;

export default airtelData.reducer;
