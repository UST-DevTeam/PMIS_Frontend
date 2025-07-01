import Api from "../../utils/api";
import { Urls } from "../../utils/url";
import {
  GET_MANAGE_CUSTOMER,
  GET_MANAGE_CIRCLE,
  GET_MANAGE_ZONE,
  GET_MANAGE_COST_CENTER,
  GET_MANAGE_PROJECT_GROUP,
  GET_CARD_PROJECT_TYPE,
  GET_MANAGE_PROJECT_TYPE,
  GET_PROJECT,
  GET_MANAGE_DEPARTMENT,
  GET_MANAGE_DESIGNATION,
  GET_MANAGE_PROFILE,
  GET_STATE,
  GET_CITIES,
  GET_PROJECT_ALLLOCATION,
  GET_VENDOR_PROJECT_ALLLOCATION,
  GET_MANAGE_COMPLETION_CRITERIA,
  GET_MANAGE_CLAIM_TYPE,
  GET_MANAGE_CLAIM_TYPE_UNIT_RATE,
  GET_MANAGE_CLAIM_TYPE_DESIGNATION,
  GET_MANAGE_EXPENSE_ADVANCE,
  GET_SUBPROJECT_MULTIDYNAMIC,
  GET_PROJECTTYPE_MULTIDYNAMIC,

  // Not in use
  GET_MANAGE_SUB_PROJECT,
  GET_ONE_MANAGE_PROJECT,
  GET_MANAGE_PROJECT_TYPE_DY_FORM,
  // GET_ASSET_REGISTRATION
  GET_VISHAL,
  GET_PO_PROJECTTYPE,
  GET_PO_SUB_PROJECTTYPE,
  GET_PO_PROJECTID,
  GET_INVOICE_SITEID,
  GET_INVOICE_SSID,
  GET_ONE_MANAGE_PROJECT_TYPE_DY_FORM,
  GET_COMPONENT_ALLOCATION,
  GET_OLD_COMPONENT_ALLOCATION,
  GET_ACCURAL_REVENUE_MASTER_PROJECT,
  GET_ACCURAL_REVENUE_MASTER_PROJECTID,
  GET_ACCURAL_REVENUE_MASTER_PROJECTTYPE,
  GET_ACCURAL_REVENUE_MASTER_SUBPROJECTTYPE,
  GET_CARD_CUSTOMER,

  ////// Filter expense Advance
  GET_MANAGE_ADVANCE_TYPE_FILTER,
  GET_MANAGE_EXPENSE_TYPE_FILTER,
  GET_MANAGE_APPROVAL_LOGS,
  GET_MANAGE_ADMIN_LOGS,
  GET_ACTIVITY_AND_OEM_COMPLIANCE,
  GET_SUB_PROJECT_TYPE_COMPLIANCE,
  GET_PROJECT_TYPE_COMPLIANCE,
  GET_ONE_COMPLIANCE_DY_FORM,
  ADD_COMPLIANCE,
  GET_COMPLIANCE_APPROVER,
  GET_CARD_COMPLIANCE_MILESTONE,
  GET_ONE_COMPLIANCE_L1_LIST,
  GET_COMPLIANCE_L1_APPROVER,
  GET_COMPLIANCE_L2_APPROVER,
  GET_ONE_COMPLIANCE_L2_LIST,
  GET_COMPLIANCE_DEGROW_TEMPLATE_DATA,
  GET_COMPLIANCE_DEGROW_TEMPLATE_DATA_USED_FIELDS,
  GET_PARTNER_WORK_DESCRIPTION,
  GET_PARTNER_ACTIVITY,
  GET_ADMIN_DELIVERY_PVA,
  GET_ADMIN_SUB_PROJECT_DELIVERY_PVA,
  GET_EXCHANGE_RATE,

} from "../reducers/admin-reducer";
import { ALERTS } from "../reducers/component-reducer";

const AdminActions = {
  getManageCustomer:
    (reset = true, args = "") =>
      async (dispatch, _) => {
        try {
          const res = await Api.get({
            url: `${Urls.admin_customer}${args != "" ? "?" + args : ""}`,
            reset,
          });
          if (res?.status !== 200) return;
          let dataAll = res?.data?.data;
          dispatch(GET_MANAGE_CUSTOMER({ dataAll, reset }));
        } catch (error) { }
      },

  getCardCustomer:
    (reset = true, args = "") =>
      async (dispatch, _) => {
        try {
          const res = await Api.get({
            url: `${Urls.card_customer}${args != "" ? "?" + args : ""}`,
            reset,
          });
          if (res?.status !== 200) return;
          let dataAll = res?.data?.data;
          dispatch(GET_CARD_CUSTOMER({ dataAll, reset }));
        } catch (error) { }
      },

  getSubProjectMultiDynamic:
    (reset = true, customeruniqueId, args = "") =>
      async (dispatch, _) => {
        try {
          const url = `${Urls.get_Subproject_Dyanmic}/${customeruniqueId}${args !== "" ? "?" + args : ""
            }`;
          const res = await Api.get({ url, reset });
          if (res?.status !== 200) return;
          let dataAll = res?.data?.data;
          dispatch(GET_SUBPROJECT_MULTIDYNAMIC({ dataAll, reset }));
        } catch (error) {
          console.error("Error fetching sub projects:", error);
        }
      },

  getProjectTypeMultiDynamic:
    (reset = true, customeruniqueId, projecttypeuniqueId = null) =>
      async (dispatch, _) => {
        try {
          // const url = `${Urls.get_project_type_Dyanmic}/${customeruniqueId}/${projecttypeuniqueId}`;
          let url;
          if (projecttypeuniqueId) {
            url = `${Urls.get_project_type_Dyanmic}/${customeruniqueId}/${projecttypeuniqueId}`;
          } else {
            url = `${Urls.get_project_type_Dyanmic}/${customeruniqueId}`;
          }
          const res = await Api.get({ url, reset });
          if (res?.status !== 200) return;
          let dataAll = res?.data?.data;
          dispatch(GET_PROJECTTYPE_MULTIDYNAMIC({ dataAll, reset }));
        } catch (error) { }
      },
  postManageCustomer: (reset, data, cb, uniqueId) => async (dispatch, _) => {
    try {
      const res = await Api.post({
        data: data,
        url:
          uniqueId == null
            ? Urls.admin_customer
            : Urls.admin_customer + "/" + uniqueId,
        contentType: "multipart/form-data",
        reset,
      });
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

  getOneManageProjectType:
    (customeruniqueId, reset = true, args = "") =>
      async (dispatch, _) => {
        try {
          const res = await Api.get({
            url: `${Urls.admin_projecttype}/${customeruniqueId}${args != "" ? "?" + args : ""
              }`,
            reset,
          });
          if (res?.status !== 200) return;
          let dataAll = res?.data?.data;
          dispatch(GET_ONE_MANAGE_PROJECT({ dataAll, reset }));
        } catch (error) { }
      },

  getProjectTypeDyform:
    (customeruniqueId, reset = true, args = "") =>
      async (dispatch, _) => {
        try {
          const res = await Api.get({
            url: `${Urls.admin_getProjectTypeDyform}/${customeruniqueId}${args != "" ? "?" + args : ""
              }`,
            reset,
          });
          if (res?.status !== 200) return;
          let dataAll = res?.data?.data;
          dispatch(GET_MANAGE_PROJECT_TYPE_DY_FORM({ dataAll, reset }));
        } catch (error) { }
      },

  getOneProjectTypeDyform:
    (customeruniqueId, reset = true, args = "") =>
      async (dispatch, _) => {
        try {
          const res = await Api.get({
            url: `${Urls.admin_getOneSiteEngg}/${customeruniqueId}${args != "" ? "?" + args : ""
              }`,
            reset,
          });
          if (res?.status !== 200) return;
          let dataAll = res?.data?.data;
          dispatch(GET_ONE_MANAGE_PROJECT_TYPE_DY_FORM({ dataAll, reset }));
        } catch (error) { }
      },

  getComponentAllocationList:
    (reset = true, args = "") =>
      async (dispatch, _) => {
        try {
          const res = await Api.get({
            url: `${Urls.admin_userAccess}${args != "" ? "?" + args : ""}`,
          });
          if (res?.status !== 200) return;
          let dataAll = res?.data?.data;
          dispatch(GET_COMPONENT_ALLOCATION({ dataAll, reset }));
        } catch (error) { }
      },

  getOldComponentAllocationList:
    (reset = true, args = "") =>
      async (dispatch, _) => {
        try {
          const res = await Api.get({
            url: `${Urls.admin_uamView}${args != "" ? "?" + args : ""}`,
          });
          if (res?.status !== 200) return;
          let dataAll = res?.data?.data;
          dispatch(GET_OLD_COMPONENT_ALLOCATION({ dataAll, reset }));
        } catch (error) { }
      },
  
  getPartnerWorkDescription:
    (reset = true, args = "", show = 1) =>
      async (dispatch, _) => {
        try {
          const res = await Api.get({
            url: `${Urls.admin_partner_work_description}${args != "" ? "?" + args : ""}`,
            show: show,
          });
          if (res?.status !== 200) return;
          let dataAll = res?.data?.data;
          dispatch(GET_PARTNER_WORK_DESCRIPTION({ dataAll, reset }));
        } catch (error) { }
      },
  
  postPartnerWorkDescription: (reset, data, cb, uniqueId) => async (dispatch, _) => {
    try {
      const res = await Api.post({
        data: data,
        url:
          uniqueId == null
            ? Urls.admin_partner_work_description
            : Urls.admin_partner_work_description + "/" + uniqueId,
      });
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
    } 
    catch (error) {
      return;
    }
  },

  getExchnageRate:
    (reset = true, args = "", show = 1) =>
      async (dispatch, _) => {
        try {
          const res = await Api.get({
            url: `${Urls.exchangeRate}${args != "" ? "?" + args : ""}`,
            show: show,
          });
          if (res?.status !== 200) return;
          let dataAll = res?.data?.data;
          dispatch(GET_EXCHANGE_RATE({ dataAll, reset }));
        } catch (error) { }
      },
  
  postExchnageRate: (reset, data, cb, uniqueId) => async (dispatch, _) => {
    try {
      const res = await Api.post({
        data: data,
        url:
          uniqueId == null
            ? Urls.exchangeRate
            : Urls.exchangeRate + "/" + uniqueId,
      });
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
    } 
    catch (error) {
      return;
    }
  },

  getPartnerActivity:
    (reset = true, args = "", show = 1) =>
      async (dispatch, _) => {
        try {
          const res = await Api.get({
            url: `${Urls.admin_partner_activity}${args != "" ? "?" + args : ""}`,
            show: show,
          });
          if (res?.status !== 200) return;
          let dataAll = res?.data?.data;
          dispatch(GET_PARTNER_ACTIVITY({ dataAll, reset }));
        } catch (error) { }
      },
  
  postPartnerActivity: (reset, data, cb, uniqueId) => async (dispatch, _) => {
    try {
      const res = await Api.post({
        data: data,
        url:
          uniqueId == null
            ? Urls.admin_partner_activity
            : Urls.admin_partner_activity + "/" + uniqueId,
      });
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
    } 
    catch (error) {
      return;
    }
  },

  getManageCircle:
    (reset = true, args = "", show = 1) =>
      async (dispatch, _) => {
        try {
          const res = await Api.get({
            url: `${Urls.admin_circle}${args != "" ? "?" + args : ""}`,
            show: show,
          });
          if (res?.status !== 200) return;
          let dataAll = res?.data?.data;
          dispatch(GET_MANAGE_CIRCLE({ dataAll, reset }));
        } catch (error) { }
      },

  postManageCircle: (reset, data, cb, uniqueId) => async (dispatch, _) => {
    try {
      const res = await Api.post({
        data: data,
        url:
          uniqueId == null
            ? Urls.admin_circle
            : Urls.admin_circle + "/" + uniqueId,
      });
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

  getManageZone:
    (reset = true, args = "") =>
      async (dispatch, _) => {
        try {
          const res = await Api.get({
            url: `${Urls.admin_zone}${args != "" ? "?" + args : ""}`,
          });
          if (res?.status !== 200) return;
          let dataAll = res?.data?.data;
          dispatch(GET_MANAGE_ZONE({ dataAll, reset }));
        } catch (error) { }
      },

  postManageZone: (reset, data, cb, uniqueId) => async (dispatch, _) => {
    try {
      const res = await Api.post({
        data: data,
        url:
          uniqueId == null ? Urls.admin_zone : Urls.admin_zone + "/" + uniqueId,
      });
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

  patchManageProjectType:
    (reset, uniqueId, data, cb) => async (dispatch, _) => {
      try {
        const res = await Api.patch({
          data: data,
          url: Urls.admin_projecttype + "/" + uniqueId,
          reset,
        });
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

  patchComplinaceSnapImageSubmition: (data, cb, siteId = "", milestoneId = "") => async (dispatch, _) => {
    try {
      const res = await Api.patch({
        data: data,
        url: Urls.compliance_globalSaver + (siteId && milestoneId ? `/${siteId}/${milestoneId}` : "") + "?forFile=true",
        contentType: "multipart/form-data",
      });
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

  patchComplinaceApproverSnapImageSubmition:
    (data, id, cb) => async (dispatch, _) => {
      try {
        const res = await Api.patch({
          data: data,
          url:
            Urls.compliance_globalSaver_Approver + "/" + id + "?forFile=true",
          contentType: "multipart/form-data",
        });
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

  setComplianceSnapImage: (sIndex, index, imageUrl) => (dispatch, store) => { },

  getManageCostCenter:
    (reset = true, args = "",id=null) =>
      async (dispatch, _) => {
        try {
          let urlName = `${Urls.admin_cost_center}${args != "" ? "?" + args : ""}`
          if (id){
            urlName = `${Urls.admin_cost_center}/${id}${args != "" ? "?" + args : ""}`
          }
          const res = await Api.get({url: urlName});
          if (res?.status !== 200) return;
          let dataAll = res?.data?.data;
          dispatch(GET_MANAGE_COST_CENTER({ dataAll, reset }));
        } catch (error) { 
          
        }
      },

  postManageCostCenter: (reset, data, cb, uniqueId) => async (dispatch, _) => {
    try {
      const res = await Api.post({
        data: data,
        url:
          uniqueId == null
            ? Urls.admin_cost_center
            : Urls.admin_cost_center + "/" + uniqueId,
      });
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

  // getManageProjectGroup:(reset=true,args="",customeruniqueId) => async (dispatch, _) => {
  //     try {
  //         const res = await Api.get({ url:`${Urls.admin_project_group}${args!=""?"?"+args:""}`})
  //         if (res?.status !== 200) return
  //         let dataAll = res?.data?.data
  //         dispatch(GET_MANAGE_PROJECT_GROUP({dataAll,reset}))
  //     } catch (error) {
  //     }
  // },

  getManageProjectGroup:
    (reset = true, args = "", customerUniqueId) =>
      async (dispatch, _) => {
        try {
          let url;
          if (customerUniqueId) {
            url = `${Urls.admin_project_group}/${customerUniqueId}`;
          } else {
            url = `${Urls.admin_project_group}${args !== "" ? "?" + args : ""}`;
          }
          const res = await Api.get({ url });
          if (res?.status !== 200) return;
          const dataAll = res?.data?.data;
          dispatch(GET_MANAGE_PROJECT_GROUP({ dataAll, reset }));
        } catch (error) { }
      },

  postManageProjectGroup:
    (reset, data, cb, uniqueId) => async (dispatch, _) => {
      try {
        const res = await Api.post({
          data: data,
          url:
            uniqueId == null
              ? Urls.admin_project_group
              : Urls.admin_project_group + "/" + uniqueId,
        });
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

  getCardProjectType:
    (customeruniqueId, projecttypeuniqueId, reset = true, args = "") =>
      async (dispatch, _) => {
        try {
          let url;
          if (customeruniqueId && projecttypeuniqueId) {
            url = `${Urls.admin_card_projecttype
              }/${customeruniqueId}/${projecttypeuniqueId}${args !== "" ? "?" + args : ""
              }`;
          } else {
            url = `${Urls.admin_card_projecttype}/${customeruniqueId}${args !== "" ? "?" + args : ""
              }`;
          }
          const res = await Api.get({ url, reset });
          if (res?.status !== 200) return;
          const dataAll = res?.data?.data;
          dispatch(GET_CARD_PROJECT_TYPE({ dataAll, reset }));
        } catch (error) {
          console.log("Vishal");
        }
      },

  getManageProjectType:
    (customeruniqueId, reset = true, args = "") =>
      async (dispatch, _) => {
        try {
          const res = await Api.get({
            url: `${Urls.admin_projecttype}/${customeruniqueId}${args != "" ? "?" + args : ""
              }`,
            reset,
          });
          if (res?.status !== 200) return;
          let dataAll = res?.data?.data;
          dispatch(GET_MANAGE_PROJECT_TYPE({ dataAll, reset }));
        } catch (error) { }
      },
  postManageProjectType:
    (reset, customeruniqueId, data, cb, uniqueId) => async (dispatch, _) => {
      try {
        const res = await Api.post({
          data: data,
          url:
            uniqueId == null
              ? Urls.admin_projecttype + "/" + customeruniqueId
              : Urls.admin_projecttype +
              "/" +
              customeruniqueId +
              "/" +
              uniqueId,
          contentType: "multipart/form-data",
          reset,
        });
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

  getProject:
    (customeruniqueId, reset = true, args = "") =>
      async (dispatch, _) => {
        try {
          const res = await Api.get(
            {
              url: `${Urls.admin_project}/${customeruniqueId}${args != "" ? "?" + args : ""
                }`,
            },
            reset
          );
          if (res?.status !== 200) return;
          let dataAll = res?.data?.data;
          dispatch(GET_PROJECT({ dataAll, reset }));
        } catch (error) { }
      },

  postProject:
    (reset, customeruniqueId, data, cb, uniqueId) => async (dispatch, _) => {
      try {
        const res = await Api.post({
          data: data,
          url:
            uniqueId == null
              ? Urls.admin_project + "/" + customeruniqueId
              : Urls.admin_project + "/" + customeruniqueId + "/" + uniqueId,
          reset,
        });
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

  getManageDepartment:
    (reset = true, args = "",id=null) =>
      async (dispatch, _) => {
        try {
          let urlName = `${Urls.admin_department}${args != "" ? "?" + args : ""}`
          if (id){
            urlName = `${Urls.admin_department}/${id}${args != "" ? "?" + args : ""}`
          }
          const res = await Api.get({
            url: urlName,
            reset,
          });
          if (res?.status !== 200) return;
          let dataAll = res?.data?.data;
          dispatch(GET_MANAGE_DEPARTMENT({ dataAll, reset }));
        } catch (error) { }
      },

  postManageDepartment: (reset, data, cb, uniqueId) => async (dispatch, _) => {
    try {
      const res = await Api.post({
        data: data,
        url:
          uniqueId == null
            ? Urls.admin_department
            : Urls.admin_department + "/" + uniqueId,
      });
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

  getManageDesignation:
    (reset = true, args = "",id=null) =>
      async (dispatch, _) => {
        try {
          let urlName = `${Urls.admin_designation}${args != "" ? "?" + args : ""}`
          if (id){
            urlName = `${Urls.admin_designation}/${id}${args != "" ? "?" + args : ""}`
          }
          const res = await Api.get({url:urlName,reset});
          if (res?.status !== 200) return;
          let dataAll = res?.data?.data;
          dispatch(GET_MANAGE_DESIGNATION({ dataAll, reset }));
        } catch (error) { }
      },

  postManageDesignation: (reset, data, cb, uniqueId) => async (dispatch, _) => {
    try {
      const res = await Api.post({
        data: data,
        url:
          uniqueId == null
            ? Urls.admin_designation
            : Urls.admin_designation + "/" + uniqueId,
      });
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

  getManageProfile:
    (reset = true, args = "",show=1) =>
      async (dispatch, _) => {
        try {
          const res = await Api.get({
            url: `${Urls.admin_profile}${args != "" ? "?" + args : ""}`,
            reset, show:show
          });
          if (res?.status !== 200) return;
          let dataAll = res?.data?.data;
          dispatch(GET_MANAGE_PROFILE({ dataAll, reset }));
        } catch (error) { }
      },
  getAccuralRevenueMasterProject:
    (reset = true, args = "") =>
      async (dispatch, _) => {
        try {
          const res = await Api.get({
            url: `${Urls.get_accural_revenue_master_project}${args != "" ? "?" + args : ""
              }`,
            reset,
          });
          if (res?.status !== 200) return;
          let dataAll = res?.data?.data;
          dispatch(GET_ACCURAL_REVENUE_MASTER_PROJECT({ dataAll, reset }));
        } catch (error) { }
      },
  getAccuralRevenueMasterProjectID:
    (reset = true, args = "",id) =>
      async (dispatch, _) => {
        try {
          const res = await Api.get({
            url: `${Urls.get_accural_revenue_master_project_projectId}/${id}${args != "" ? "?" + args : ""
              }`,
            reset,
          });
          if (res?.status !== 200) return;
          let dataAll = res?.data?.data;
          dispatch(GET_ACCURAL_REVENUE_MASTER_PROJECTID({ dataAll, reset }));
        } catch (error) { }
      },
  getAccuralRevenueMasterProjectType:
    (reset = true, args = "",id) =>
      async (dispatch, _) => {
        try {
          const res = await Api.get({
            url: `${Urls.get_accural_revenue_master_project_projectType}/${id}${args != "" ? "?" + args : ""
              }`,
            reset,
          });
          if (res?.status !== 200) return;
          let dataAll = res?.data?.data;
          dispatch(GET_ACCURAL_REVENUE_MASTER_PROJECTTYPE({ dataAll, reset }));
        } catch (error) { }
      },
  getAccuralRevenueMasterSubProjectType:
    (reset = true, args = "",id) =>
      async (dispatch, _) => {
        try {
          const res = await Api.get({url: `${Urls.get_accural_revenue_master_project_subProjectType}/${id}${args != "" ? "?" + args : ""}`,reset});
          if (res?.status !== 200) return;
          let dataAll = res?.data?.data;
          dispatch(GET_ACCURAL_REVENUE_MASTER_SUBPROJECTTYPE({ dataAll,reset}));
        } catch (error) { }
      },
  postAccuralRevenueMasterProject:
    (data, cb, uniqueId) => async (dispatch, _) => {
      try {
        const res = await Api.post({
          data: data,
          url:
            uniqueId == null
              ? Urls.get_accural_revenue_master_project
              : Urls.get_accural_revenue_master_project + "/" + uniqueId,
        });
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

  postManageProfile: (data, cb, uniqueId) => async (dispatch, _) => {
    try {
      const res = await Api.post({
        data: data,
        url:
          uniqueId == null
            ? Urls.admin_profile
            : Urls.admin_profile + "/" + uniqueId,
      });
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

  getManageCompletionCriteria:
    (reset = true, args = "") =>
      async (dispatch, _) => {
        try {
          const res = await Api.get({
            url: `${Urls.admin_completion_criteria}${args != "" ? "?" + args : ""
              }`,
            reset,
          });
          if (res?.status !== 200) return;
          let dataAll = res?.data?.data;
          dispatch(GET_MANAGE_COMPLETION_CRITERIA({ dataAll, reset }));
        } catch (error) { }
      },
  getapprovalLogs:
    (reset = true, args = "", cb = () => { }) =>
      async (dispatch, _) => {
        try {
          const res = await Api.get({
            url: `${Urls.approval_Logs}${args != "" ? "?" + args : ""}`,
            reset,
          });
          if (res?.status !== 200) return;
          let dataAll = res?.data?.data;
          dispatch(GET_MANAGE_APPROVAL_LOGS({ dataAll, reset }));
          cb();
        } catch (error) { }
      },
  getadminLogs:
    (reset = true, args = "") =>
      async (dispatch, _) => {
        try {
          const res = await Api.get({
            url: `${Urls.admin_logs}${args != "" ? "?" + args : ""}`,
            reset,
          });
          if (res?.status !== 200) return;
          let dataAll = res?.data?.data;
          dispatch(GET_MANAGE_ADMIN_LOGS({ dataAll, reset }));
        } catch (error) { }
      },
  postManageCompletionCriteria: (data, cb, uniqueId) => async (dispatch, _) => {
    try {
      const res = await Api.post({
        data: data,
        url:
          uniqueId == null
            ? Urls.admin_completion_criteria
            : Urls.admin_completion_criteria + "/" + uniqueId,
      });
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

  getManageClaimType:
    (reset = true, args = "") =>
      async (dispatch, _) => {
        try {
          const res = await Api.get({
            url: `${Urls.admin_claim_type}${args != "" ? "?" + args : ""}`,
            reset,
          });
          if (res?.status !== 200) return;
          let dataAll = res?.data?.data;
          dispatch(GET_MANAGE_CLAIM_TYPE({ dataAll, reset }));
        } catch (error) { }
      },
  postManageClaimType: (data, cb, uniqueId) => async (dispatch, _) => {
    try {
      const res = await Api.post({
        data: data,
        url:
          uniqueId == null
            ? Urls.admin_claim_type
            : Urls.admin_claim_type + "/" + uniqueId,
      });
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

  getManageClaimTypeUnitRate:
    (reset = true, args = "") =>
      async (dispatch, _) => {
        try {
          const res = await Api.get({
            url: `${Urls.admin_claim_type_unit_rate}${args != "" ? "?" + args : ""
              }`,
            reset,
          });
          if (res?.status !== 200) return;
          let dataAll = res?.data?.data;
          dispatch(GET_MANAGE_CLAIM_TYPE_UNIT_RATE({ dataAll, reset }));
        } catch (error) { }
      },
  postManageClaimTypeUnitRate: (data, cb, uniqueId) => async (dispatch, _) => {
    try {
      const res = await Api.post({
        data: data,
        url:
          uniqueId == null
            ? Urls.admin_claim_type_unit_rate
            : Urls.admin_claim_type_unit_rate + "/" + uniqueId,
      });
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

  getManageClaimTypeDesignation:
    (reset = true, args = "") =>
      async (dispatch, _) => {
        try {
          const res = await Api.get({
            url: `${Urls.admin_claim_type_designation}${args != "" ? "?" + args : ""
              }`,
            reset,
          });
          if (res?.status !== 200) return;
          let dataAll = res?.data?.data;
          dispatch(GET_MANAGE_CLAIM_TYPE_DESIGNATION({ dataAll, reset }));
        } catch (error) { }
      },
  postManageClaimTypeDesignation:
    (data, cb, uniqueId) => async (dispatch, _) => {
      try {
        const res = await Api.post({
          data: data,
          url:
            uniqueId == null
              ? Urls.admin_claim_type_designation
              : Urls.admin_claim_type_designation + "/" + uniqueId,
        });
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

  getManageExpenseTypeFilter:
    (reset = true, args = "", cb = () => { }) =>
      async (dispatch, _) => {
        try {
          const res = await Api.get({
            url: `${Urls.admin_claim_type_Expenses}${args != "" ? "?" + args : ""
              }`,
            reset,
          });
          if (res?.status !== 200) return;
          let dataAll = res?.data?.data;
          dispatch(GET_MANAGE_EXPENSE_TYPE_FILTER({ dataAll, reset }));
          cb();
        } catch (error) { }
      },
  getManageAdvanceTypeFilter:
    (reset = true, args = "", cb = () => { }) =>
      async (dispatch, _) => {
        try {
          const res = await Api.get({
            url: `${Urls.admin_claim_type_Advances}${args != "" ? "?" + args : ""
              }`,
            reset,
          });
          if (res?.status !== 200) return;
          let dataAll = res?.data?.data;
          dispatch(GET_MANAGE_ADVANCE_TYPE_FILTER({ dataAll, reset }));
          cb();
        } catch (error) { }
      },

  getManageExpenseAdvance:
    (reset = true, args = "", cb = () => { }) =>
      async (dispatch, _) => {
        try {
          const res = await Api.get({
            url: `${Urls.admin_expense_advance}${args != "" ? "?" + args : ""}`,
            reset,
          });
          if (res?.status !== 200) return;
          let dataAll = res?.data?.data;
          dispatch(GET_MANAGE_EXPENSE_ADVANCE({ dataAll, reset }));
          cb();
        } catch (error) { }
      },

  postManageExpenseAdvance: (data, cb, uniqueId) => async (dispatch, _) => {
    try {
      const res = await Api.post({
        data: data,
        url:
          uniqueId == null
            ? Urls.admin_expense_advance
            : Urls.admin_expense_advance + "/" + uniqueId,
      });
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

  getState:
    (reset = true, args = "") =>
      async (dispatch, _) => {
        try {
          const res = await Api.get({
            url: `${Urls.State}${args != "" ? "?" + args : ""}`,
            reset,
          });
          if (res?.status !== 200) return;
          let dataAll = res?.data?.data;
          dispatch(GET_STATE({ dataAll, reset }));
        } catch (error) { }
      },

  getCities:
    (reset = true, args = "") =>
      async (dispatch, _) => {
        try {
          const res = await Api.get({
            url: `${Urls.Cities}${args != "" ? "?" + args : ""}`,
            reset,
          });
          if (res?.status !== 200) return;
          let dataAll = res?.data?.data;
          dispatch(GET_CITIES({ dataAll, reset }));
        } catch (error) { }
      },

  getProjectAllocation:
    (reset = true, args = "") =>
      async (dispatch, _) => {
        try {
          console.log("cities", args);
          const res = await Api.get({
            url: `${Urls.admin_project_allocation}${args != "" ? "?" + args : ""
              }`,
            reset,
          });
          if (res?.status !== 200) return;
          let dataAll = res?.data?.data;
          dispatch(GET_PROJECT_ALLLOCATION({ dataAll, reset }));
        } catch (error) { }
      },

  postProjectAllocation: (data, cb, uniqueId) => async (dispatch, _) => {
    try {
      const res = await Api.post({
        data: data,
        url:
          uniqueId == null
            ? Urls.admin_project_allocation
            : Urls.admin_project_allocation + "/" + uniqueId,
      });
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

  getVishal:
    (reset = true, args = "") =>
      async (dispatch, _) => {
        try {
          console.log("cities", args);
          const res = await Api.get({
            url: `${Urls.admin_vishal}${args != "" ? "?" + args : ""}`,
            reset,
          });
          if (res?.status !== 200) return;
          let dataAll = res?.data?.data;
          dispatch(GET_VISHAL({ dataAll, reset }));
        } catch (error) { }
      },

  getPOProjectType:
    (reset = true, args = "") =>
      async (dispatch, _) => {
        try {
          const res = await Api.get({
            url: `${Urls.admin_poProjectType}${args != "" ? "?" + args : ""}`,
          });
          if (res?.status !== 200) return;
          let dataAll = res?.data?.data;
          dispatch(GET_PO_PROJECTTYPE({ dataAll, reset }));
        } catch (error) { }
      },

  getPOSubProjectType:
    (reset = true, args = "") =>
      async (dispatch, _) => {
        try {
          const res = await Api.get({
            url: `${Urls.admin_poSubProjectType}${args != "" ? "?" + args : ""}`,
          });
          if (res?.status !== 200) return;
          let dataAll = res?.data?.data;
          dispatch(GET_PO_SUB_PROJECTTYPE({ dataAll, reset }));
        } catch (error) { }
      },

  getPOProjectID:
    (reset = true, args = "") =>
      async (dispatch, _) => {
        try {
          const res = await Api.get({
            url: `${Urls.admin_poProjectID}${args != "" ? "?" + args : ""}`,
          });
          if (res?.status !== 200) return;
          let dataAll = res?.data?.data;
          dispatch(GET_PO_PROJECTID({ dataAll, reset }));
        } catch (error) { }
      },

  getInvoiceSiteId:
    (reset = true, args = "") =>
      async (dispatch, _) => {
        try {
          const res = await Api.get({
            url: `${Urls.admin_invoiceSiteId}${args != "" ? "?" + args : ""}`,
          });
          if (res?.status !== 200) return;
          let dataAll = res?.data?.data;
          dispatch(GET_INVOICE_SITEID({ dataAll, reset }));
        } catch (error) { }
      },

  getInvoiceSSID:
    (reset = true, args = "") =>
      async (dispatch, _) => {
        try {
          const res = await Api.get({
            url: `${Urls.admin_invoiceSSID}${args != "" ? "?" + args : ""}`,
          });
          if (res?.status !== 200) return;
          let dataAll = res?.data?.data;
          dispatch(GET_INVOICE_SSID({ dataAll, reset }));
        } catch (error) { }
      },

  getVendorProjectAllocation:
    (reset = true, args = "") =>
      async (dispatch, _) => {
        try {
          console.log("cities", args);
          const res = await Api.get({
            url: `${Urls.vendor_project_allocation}${args != "" ? "?" + args : ""
              }`,
            reset,
          });
          if (res?.status !== 200) return;
          let dataAll = res?.data?.data;
          dispatch(GET_VENDOR_PROJECT_ALLLOCATION({ dataAll, reset }));
        } catch (error) { }
      },

  postVendorProjectAllocation: (data, cb, uniqueId) => async (dispatch, _) => {
    try {
      const res = await Api.post({
        data: data,
        url:
          uniqueId == null
            ? Urls.vendor_project_allocation
            : Urls.vendor_project_allocation + "/" + uniqueId,
      });
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

  getManageSubProjectType:
    (projecttypeuniqueId, reset = true, args = "") =>
      async (dispatch, _) => {
        try {
          const res = await Api.get({
            url: `${Urls.admin_sub_projecttype}/${projecttypeuniqueId}${args != "" ? "?" + args : ""
              }`,
            reset,
          });
          if (res?.status !== 200) return;
          let dataAll = res?.data?.data;
          dispatch(GET_MANAGE_SUB_PROJECT({ dataAll, reset }));
        } catch (error) { }
      },

  postManageSubProjectType:
    (reset, projecttypeuniqueId, data, cb, uniqueId) => async (dispatch, _) => {
      try {
        const res = await Api.post({
          data: data,
          url:
            uniqueId == null
              ? Urls.admin_sub_projecttype + "/" + projecttypeuniqueId
              : Urls.admin_sub_projecttype +
              "/" +
              projecttypeuniqueId +
              "/" +
              customeruniqueId,
          contentType: "multipart/form-data",
          reset,
        });
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

  getAssetRegistration:
    (reset = true, args = "") =>
      async (dispatch, _) => {
        try {
          const res = await Api.get({
            url: `${Urls.admin_assetRegistration}${args != "" ? "?" + args : ""}`,
          });
          if (res?.status !== 200) return;
          let dataAll = res?.data?.data;
          dispatch(GET_ASSET_REGISTRATION({ dataAll, reset }));
        } catch (error) { }
      },
  postAssetRegistration: (reset, data, cb, uniqueId) => async (dispatch, _) => {
    try {
      const res = await Api.post({
        data: data,
        url:
          uniqueId == null
            ? Urls.admin_assetRegistration
            : Urls.admin_assetRegistration + "/" + uniqueId,
      });
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

  // super admin compiliance starts  -----

  getProjectTypeCompiliance:
    (reset = true, args = "") =>
      async (dispatch, _) => {
        try {
          const res = await Api.get({
            url: `${Urls.projectTypeCompliance}${args ? "?" + args : ""}`,
          });
          if (res?.status !== 200) return;
          let dataAll = res?.data?.data;
          dispatch(GET_PROJECT_TYPE_COMPLIANCE({ dataAll, reset }));
        } catch (error) { }
      },

  getSubProjectTypeCompiliance:
    (reset = true, args = "", cid = "", subType = "") =>
      async (dispatch, _) => {
        try {
          const res = await Api.get({
            url: `${Urls.subProjectTypeCompliance}/${cid}/${subType}${args ? "?" + args : ""
              }`,
          });
          if (res?.status !== 200) return;
          let dataAll = res?.data?.data;
          dispatch(GET_SUB_PROJECT_TYPE_COMPLIANCE({ dataAll, reset }));
        } catch (error) { }
      },

  getActivityAndOemCompiliance:
    (reset = true, args = "", show = 1) =>
      async (dispatch, _) => {
        try {
          const res = await Api.get({
            url: `${Urls.activityAndOemCompliance}${args ? "?" + args : ""}`,
            show: show,
          });
          if (res?.status !== 200) return;
          let dataAll = res?.data?.data;
          dispatch(GET_ACTIVITY_AND_OEM_COMPLIANCE({ dataAll, reset }));
        } catch (error) { }
      },
  getCompiliance:
    (reset = true, args = "") =>
      async (dispatch, _) => {
        try {
          const res = await Api.get({
            url: `${Urls.addComplianceForm}${args ? "?" + args : ""}`,
          });
          if (res?.status !== 200) return;
          let dataAll = res?.data?.data;
          dispatch(ADD_COMPLIANCE({ dataAll, reset }));
        } catch (error) { }
      },
  postCompiliance: (reset, data, cb, uniqueId) => async (dispatch, _) => {
    try {
      const res = await Api.post({
        data: data,
        url:
          uniqueId == null
            ? Urls.addComplianceForm
            : Urls.addComplianceForm + "/" + uniqueId,
      });
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

  patchCompiliance: (reset, uniqueId, data, cb) => async (dispatch, _) => {
    try {
      const res = await Api.patch({
        data: data,
        url: Urls.addComplianceForm + "/" + uniqueId,
        reset,
      });
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

  getOneComplianceDyform:
    (id, mstName, reset = true, args = "", show = 1) =>
      async (dispatch, _) => {
        try {
          const res = await Api.get({
            url: `${Urls.admin_getOneCompliance}/${id}/${mstName}${args != "" ? "?" + args : ""
              }`,
            reset,
            show: show,
          });
          if (res?.status !== 200) return;
          let dataAll = res?.data?.data;
          dispatch(GET_ONE_COMPLIANCE_DY_FORM({ dataAll, reset }));
        } catch (error) { }
      },

  getComplianceApprover:
    (reset = true, args = "") =>
      async (dispatch, _) => {
        try {
          const res = await Api.get({
            url: `${Urls.admin_getComplianceapprover}${args != "" ? "?" + args : ""
              }`,
            reset,
          });
          if (res?.status !== 200) return;
          let dataAll = res?.data?.data;
          dispatch(GET_COMPLIANCE_APPROVER({ dataAll, reset }));
        } catch (error) { }
      },
  postComplianceApprover:
    (reset, data, cb, uniqueId) => async (dispatch, _) => {
      try {
        const res = await Api.post({
          data: data,
          url:
            uniqueId == null
              ? Urls.admin_getComplianceapprover
              : Urls.admin_getComplianceapprover + "/" + uniqueId,
        });
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

  getCardComplianceMilestone:
    (reset = true, args = "") =>
      async (dispatch, _) => {
        try {
          const res = await Api.get({
            url: `${Urls.complainceMilestoneCard}${args != "" ? "?" + args : ""}`,
            reset,
          });
          if (res?.status !== 200) return;
          const dataAll = res?.data?.data;
          dispatch(GET_CARD_COMPLIANCE_MILESTONE({ dataAll, reset }));
        } catch (error) {
          console.log("Vishal");
        }
      },

  getOneComplianceL1List:
    (id, mstName, reset = true, args = "") =>
      async (dispatch, _) => {
        try {
          const res = await Api.get({
            url: `${Urls.admin_ComplianceL1List}/${id}/${mstName}${args != "" ? "?" + args : ""
              }`,
            reset,
          });
          if (res?.status !== 200) return;
          let dataAll = res?.data?.data;
          dispatch(GET_ONE_COMPLIANCE_L1_LIST({ dataAll, reset }));
        } catch (error) { }
      },

  getOneComplianceL2List:
    (id, mstName, reset = true, args = "") =>
      async (dispatch, _) => {
        try {
          const res = await Api.get({
            url: `${Urls.admin_ComplianceL2List}/${id}/${mstName}${args != "" ? "?" + args : ""
              }`,
            reset,
          });
          if (res?.status !== 200) return;
          let dataAll = res?.data?.data;
          dispatch(GET_ONE_COMPLIANCE_L2_LIST({ dataAll, reset }));
        } catch (error) { }
      },
  getComplianceMilestoneL1Approver:
    (mileStoneName, reset = true, args = "") =>
      async (dispatch, _) => {
        try {
          const res = await Api.get({
            url: `${Urls.complianceMilestoneL1Approver}/${mileStoneName[1]}/${mileStoneName[2]
              }${args != "" ? "?" + args : ""}`,
            reset,
          });
          if (res?.status !== 200) return;
          let dataAll = res?.data?.data;
          dispatch(GET_COMPLIANCE_L1_APPROVER({ dataAll, reset }));
        } catch (error) { }
      },

  getComplianceMilestoneL2Approver:
    (mileStoneName, reset = true, args = "") =>
      async (dispatch, _) => {
        try {
          const res = await Api.get({
            url: `${Urls.complianceMilestoneL2Approver}/${mileStoneName[1]}/${mileStoneName[2]
              }${args != "" ? "?" + args : ""}`,
            reset,
          });
          if (res?.status !== 200) return;
          let dataAll = res?.data?.data;
          dispatch(GET_COMPLIANCE_L2_APPROVER({ dataAll, reset }));
        } catch (error) { }
      },

  approverActionPatch: (uniqueId, data, cb, reset) => async (dispatch, _) => {
    try {
      const res = await Api.patch({
        data: data,
        url: Urls.approverAction + "/" + uniqueId,
        reset,
      });
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

  approverActionPost: (uniqueId, data, cb, reset) => async (dispatch, _) => {
    try {
      const res = await Api.post({
        data: data,
        url: Urls.approverAction + "/" + uniqueId,
        reset,
      });
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

  getComplianceDegrowTemplateData:
    (projectName, subProjectName, reset = true, args = "") =>
      async (dispatch, _) => {
        try {
          const res = await Api.get({
            url: `${Urls.complianceDegrowTemplateData
              }/${projectName}/${subProjectName}${args != "" ? "?" + args : ""}`,
            reset,
          });
          if (res?.status !== 200) return;
          let dataAll = res?.data?.data;
          dispatch(
            GET_COMPLIANCE_DEGROW_TEMPLATE_DATA({
              dataAll,
              reset,
              updateOriginal: true,
            })
          );
        } catch (error) { }
      },

  updateFields: (value, tabName) => (dispatch, getStore) => {
    try {
      value = Math.abs(value);

      console.log("tabName_value", value, tabName)
      console.log(`store_data`, getStore().adminData.getComplianceDegrowTemplateData)

      if (value > 5) {
        let msgdata = {
          show: true,
          icon: "error",
          buttons: [],
          type: 1,
          text: "Please put the value b/w 2 to 5",
        };
        dispatch(ALERTS(msgdata));
        return;
      }

      const degrowFields = JSON.parse(
        JSON.stringify(
          getStore().adminData.getComplianceDegrowTemplateData?.originalFields?.[0] || {}
        )
      );

      const usedFields = JSON.parse(
        JSON.stringify(
          getStore().adminData.getComplianceDegrowTemplateData?.usedfields?.[0] || {}
        )
      );





      if (!degrowFields || !Object.keys(degrowFields).length) return
      const formFields = degrowFields[tabName];
      const actualFields = formFields?.slice(1);


      if (value < 2) {
        dispatch(
          GET_COMPLIANCE_DEGROW_TEMPLATE_DATA_USED_FIELDS({ tabName, dataAll: [formFields[0], ...actualFields] })
        );
        return
      }

      const extraFields = [];
      for (let i = 2; i < value + 1; i++) {
        extraFields.push(
          ...actualFields?.map((itm) => ({
            ...itm,
            fieldName: itm.fieldName + " " + i,
          }))
        );
      }

      console.log("usedFields[tabName]", usedFields[tabName])

      usedFields[tabName] = [formFields[0], ...actualFields, ...extraFields];

      console.log("usedFields___tabName__", usedFields[tabName])

      dispatch(
        GET_COMPLIANCE_DEGROW_TEMPLATE_DATA({
          dataAll: [usedFields],
          reset: true,
          updateOriginal: false,
        })
      );
    } catch (error) {
      console.log(error.message)
    }
  },
  getDeliveryPVA:
    (reset = true, args = "") =>
      async (dispatch, _) => {
        try {
          const res = await Api.get({
            url: `${Urls.admin_delivery_PVA}${args != "" ? "?" + args : ""}`,
            reset,
          });
          if (res?.status !== 200) return;
          const dataAll = res?.data?.data;
          dispatch(GET_ADMIN_DELIVERY_PVA({ dataAll, reset }));
        } catch (error) {
          console.log("12345");
        }
      },
    postDeliveryPVA:
    (data, cb, uniqueId) => async (dispatch, _) => {
      try {
        const res = await Api.post({
          data: data,
          url:
            uniqueId == null
              ? Urls.admin_delivery_PVA
              : Urls.admin_delivery_PVA + "/" + uniqueId,
        });
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

  getSubProjectDeliveryPVA:
    (reset = true, args = "",id) =>
      async (dispatch, _) => {
        try {
          const res = await Api.get({
            url: `${Urls.admin_sub_project_delivery_PVA}/${id}${args != "" ? "?" + args : ""}`,
            reset,
          });
          if (res?.status !== 200) return;
          const dataAll = res?.data?.data;
          dispatch(GET_ADMIN_SUB_PROJECT_DELIVERY_PVA({ dataAll, reset }));
        } catch (error) {
          console.log("12345");
        }
      },

  // super admin compiliance  ends -----
};
export default AdminActions;
