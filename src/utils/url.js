// export const baseUrl = "https://devapi.mcpspmis.com"
// export const backendassetUrl = "https://devapi.mcpspmis.com/"

export const baseUrl = "https://api.mcpspmis.com"
export const backendassetUrl = "https://api.mcpspmis.com/"
// export const baseUrl="https://androidapi.mcpspmis.com"
// export const backendassetUrl="https://androidapi.mcpspmis.com/"
// export const baseUrl = "http://localhost:7980";
// export const backendassetUrl = "http://localhost:7980/";
// export const baseUrl = "http://192.168.1.59:7980";
// export const backendassetUrl = "http://192.168.1.59:7980/";

export const Urls = {
  login: "/login",
  sendMail: "/sendMail",
  logout: "/logout",
  admin_userList: "/admin/users",
  admin_roleList: "/admin/roles",
  user_notification: "/notification",
  exchangeRate: "/exchange",
  businessUnit: "/businessUnit",
  // new urlP
  admin_userAccess: "/admin/userAccess",
  admin_customer: "/admin/manageCustomer",
  card_customer: "/admin/cardCustomer",
  admin_projecttype: "/admin/manageProjectType",
  admin_getOneSiteEngg: "/getOneSiteEngg",
  admin_getOneCompliance: "/getOneCompliance",
  admin_getProjectTypeDyform: "/admin/getProjectTypeDyform",
  admin_sub_projecttype: "/admin/manageSubProjectType",
  admin_circle: "/admin/manageCircle",
  admin_partner_work_description: "/admin/partnerWorkDescription",
  admin_partner_activity: "/admin/partnerActivity",
  admin_zone: "/admin/manageZone",
  admin_cost_center: "/admin/manageCostCenter",
  admin_project_group: "/admin/manageProjectGroup",
  admin_card_projecttype: "/admin/cardProjectType",
  admin_project: "/admin/manageProject",
  admin_department: "/admin/manageDepartment",
  admin_designation: "/admin/manageDesignation",
  admin_empdetails: "/hr/manageEmployee",
  admin_all_empdetails: "/hr/allEmployee",
  admin_hr_manager_emp: "/hr/allHr",
  admin_profile: "/hr/manageProfile",
  admin_project_allocation: "/hr/projectAllocation",
  admin_uamView: "/uamView",
  admin_completion_criteria: "/admin/complectionCriteria",
  admin_delivery_PVA: "/admin/deliveryPva",
  admin_sub_project_delivery_PVA: "/admin/deliveryPva/subProject",
  upload_bulk_site: "/uploadBulkSite",
  upload_bulk_site_one_project: "/uploadSiteOneProject",
  get_Subproject_Dyanmic: "/subprojects",
  get_project_type_Dyanmic: "/projectsType",
  get_accural_revenue_master_project: "/project/accuralRevenueMaster",
  get_accural_revenue_master_project_projectId:
    "/project/accuralRevenueMaster/projects",
  get_accural_revenue_master_project_subProjectType:
    "/project/accuralRevenueMaster/subProjectType",
  get_accural_revenue_master_project_projectType:
    "/project/accuralRevenueMaster/projectType",
  admin_getProjectSubType: "/admin/getProjectSubType",
  admin_getMappedData: "/mappedData",
  admin_getCircleWithPG: "/circlewithPG",
  projectList_getproject_allocation: "/projectAllocationList/",
  projectList_financialData: "/financialData",
  projectList_issueData: "/issueData",
  projectList_trackingData: "/trackingData",
  projectList_siteEngineer: "/siteEngineer",
  projectList_milestone: "/milestone",
  projectList_globalSaver: "/globalSaver",
  projectList_partner_group_milestone: "/partner_group_milestone",
  projectList_changeTaskStatus: "/changeTaskStatus",
  projectList_closeMilestone: "/closeMilestone/",
  project_circle: "/project/circle",
  settlementAmount: "/Expenses/SettlementAmountEmp",
  setuppassword_stepOne: "/setupPassword",
  register: "/forgetPassword",

  State: "/state",
  Cities: "/city",
  admin_vishal: "/vishal",
  myHome_personal_info: "/myHome/getPersonalInfo",
  Hr_Expense_Advance: "/hr/expenseAdavance",

  MyHome: "/myHome/Cards",
  user_myTask: "/myHome/myTask",
  admin_assetRegistration: "/myHome/assetRegistration",
  common_file_uploadr: "/commonUploadFile",
  common_file_uploadr1: "/UploadFile",
  templateUploadFile: "/templateUploadFile",
  vendor_details: "/hr/vendor",
  vendor_project_allocation: "/vendorProjectAllocation",
  vendor_project_list: "/vendorSiteId",
  vendor_project_tracking: "/vendor/myTask",
  getZoneByCustomerId:"/gp/zone2",
  vendorProjects:"/vendor/ProjectType",
  filter_vendor_subProject: "/filter/vendor/subProject",
  get_vendorCostMilestone: "/vendor/milestone",
  get_vendortCostMilestoeList: "/vendor/milestoneList",
  get_vendortCostProjectGroupList: "/vendorCost/projectGroupList",
  get_vendortCostSubProjectTypeList: "/vendorCost/projectTypeList",
  get_vendortCostVendorsList: "/vendorCost/vendorsList",
  filter_vendorActivity_subProject: "filter/vendorActivity/projectType",
  common_update_site_milestone: "/commonUpdate",

  finance_poinvoice_based: "/finance/poInvoiceBased",
  finance_Invoice: "/finance/invoice",
  finance_poworkdone_based: "/finance/poWorkdoneBased",
  finance_poworkdone_itemCode: "/finance/commercial",
  finance_poworkdone_dashboard: "/finance/poTrackingWorkdone",
  finance_poaccrual_revenue: "/finance/accrualRevenue",

  projectEvent: "/projectEventLog",
  siteEventLog: "/siteEventLog",
  milestoneEvent: "/milestoneEventLog",
  admin_poProjectType: "/finance/projectType",
  admin_poSubProjectType: "/finance/subProject",
  admin_poProjectID: "/finance/poProjectID",
  admin_invoiceSiteId: "/finance/siteId",
  admin_invoiceSSID: "/finance/ssId",

  formss_earnValue_mgmt_financial: "/forms/earnValue",
  formss_EVM_delivery: "/forms/EVMActual",
  formss_accrualrevenue_trend: "/forms/accrualRevenueTrend",
  forms_profit_loss: "/forms/profilt&loss",
  forms_sob: "/forms/SOB",
  forms_sob_dynamic: "/forms/dynamicHeaderSOB",
  admin_claim_type: "/expenses/ClaimType",

  admin_claim_type: "/expenses/ClaimType",
  admin_claim_type_unit_rate: "/expenses/unitRate",
  admin_claim_type_designation: "/expenses/ClaimTypeDesignation",
  admin_expense_advance: "/expenses/claimTypeRole",
  expAdv_fill_expense: "/expenses/fillExpense",
  expAdv_fill_advance: "/expenses/fillAdvance",
  expAdv_claimType_advance: "/expenses/claimTypeAdvance",
  expAdv_project_details: "/expenses/projectDetails",
  expAdv_siteId: "/expenses/projectSite",
  expAdv_taskName: "/expenses/projectSiteTask",
  expAdv_unitRate_claimType: "/expenses/unitRateClaimType",
  expAdv_L1Data: "/approval/l1Approval",
  expAdv_L1AdvanceData: "/Advance/approval/l1Approval",
  expAdv_L2Data: "/approval/l2Approval",
  expAdv_L2AdvanceData: "/Advance/approval/l2Approval",
  expAdv_L3Data: "/approval/financeApprover",
  expAdv_L3AdvanceData: "/Advance/approval/l3Approval",
  expAdv_Approval: "/approval/status",
  expAdv_all_expense_approve: "/approval/statusBulk",
  expAdv_expense_emp_name: "/expenses/fillDAEmpName",
  expAdv_expense_emp_code: "/expenses/fillDAEmpData",
  expAdv_DA_Fill: "/expenses/fillDA",
  expAdv_DA_project_Id: "/expenses/DAFillProjectId",
  expAdv_DA_cost_center: "expenses/DAFillcostCenter",
  expAdv_expenses_by_expensesNo_in_popup: "/expenses/ExpenseNo",
  expAdv_claim_and_advance: "/expenses/claimAndAdvance",
  expAdv_download_attachment: "/expenses/DownloadAttachment",
  expAdv_hr_all_expenses: "/expenses/AllExpenses",
  expAdv_hr_all_advance: "/Advance/AllAdvance",
  expAdv_user_limit: "/expenses/userLimit",
  admin_claim_type_Expenses: "/expenses/expensesClaimType",
  admin_claim_type_Advances: "/expenses/AdvanceClaimType",
  /// GPTRACKING
  gpTracking_customer: "/gp/customer",
  gpTracking_projectGroup: "/gp/costCenter",
  gpTracking_costCenter: "/gp/costCenter",
  gpTracking_salaryDB: "/gp/salaryDB",
  gpTracking_OtherFixedCost: "/gp/OtherFixedCost",
  gpTracking_Zone: "/gp/zone",
  gpTracking_OtherCostTypes: "/gp/OtherCostTypes",
  gpTracking_Main: "/gpTracking",
  ///Activity Logs
  approval_Logs: "/Approval/Logs",
  admin_logs: "/admin/AdminLogs",

  // FILTER

  filter_project_circle: "/filter/project/circle",
  filter_project_projectId: "/filter/project/projectId",
  filter_project_projectGroup: "/filter/project/projectGroup",
  filter_project_projectType: "/filter/project/projectType",
  filter_project_projectManager: "/filter/project/projectManager",
  filter_site_subProject: "/filter/site/subProject",
  filter_myTask_subProject: "/filter/myTask/subProject",

  filter_financial_poManagement_customer:
    "/filter/financial/pomanagement/customer",
  filter_financial_poManagement_projectGroup:
    "/filter/financial/pomanagement/projectGroup",
  filter_financial_poManagement_projectId:
    "/filter/financial/pomanagement/projectId",

  filter_financial_RevenueManagement_customer:
    "/filter/financial/revenueManagement/customer",
  filter_financial_RevenueManagement_projectGroup:
    "/filter/financial/revenueManagement/projectGroup",

  filter_financial_poWorkDone_customer: "/filter/financial/poWorkDone/customer",
  autosuggestion_projectManager: "/autosuggestion/projectManger",

  filter_form_evmDelivery_projectType: "/filter/EVM-Delivery/projectType",
  filter_form_evmDelivery_projectId: "/filter/EVM-Delivery/projectId",
  filter_financial_workdone_projecttype: "/filter/work-done/projectType",

  //  GRAPH

  graph_project_status: "/graph/projectStatus",
  graph_zone_in_circle_revenue: "/graph/getZone",
  graph_milestone_status: "/graph/milestoneStatus",
  graph_po_status: "/graph/poStatus",
  graph_active_customer: "/graph/activeCustomer",
  graph_ms1_ms2_circleWise: "/graph/circlewiseMS1AndMs2",
  graph_organzation_level: "/graph/getorganationLevel",
  graph_all_project_type: "/graph/getAllprojectType",
  graph_po_tracing_workdone: "/graph/poTrackingWorkdone",
  graph_accrual_revenue_trend: "/graph/accrualRevenueTrend",
  graph_active_emp_with_CC: "/graph/activeEmpwithCC",
  airtel_active__Emp_vertical_name: "/graph/getAirtelDescription",
  graph_new_joining_monthly: "/graph/newjoiningMonthly",
  graph_monthly_joining_vs_exit: "/graph/monthlyjoiningVsExit",
  graph_monthly_joining_and_resignDate: "/graph/newjoiningandresign",
  graph_monthly_active_trend: "/graph/monthlyActiveTrend",
  graph_weekly_active_emp: "/graph/weeklyActiveEmployee",
  weekly_horizontal_name: "/graph/getorgLevel",
  graph_vendor_active_inactive: "/graph/partnerStatus",
  graph_revenuePlan_vc_actual: "/graph/revenuePlanVsActual",
  graph_revenuePlan_vc_actual_circle: "/graph/revenuePlanVsActualCircle",
  graph_trend_expense_advance: "/graph/trendExpenseAdvance",
  graph_expense_approval_status: "/graph/ExpenseApprovalStatus",
  graph_advance_approval_status: "/graph/advanceApprovalStatus",
  graph_trend_plan_vs_actual_workdone: "/graph/workdoneRevenueTrend",
  graph_Circle_plan_vs_actual_workdone: "/graph/workdoneRevenueCircle",
  graph_cumulative_trend_plan_vs_actual: "/graph/trendPlanVsActualCumulative",
  graph_cumulative_workdone_plan_vs_actual: "/graph/cumulativeWorkdone",
  graph_ms2_vs_wcc_pending_reason: "/graph/MS2VsWCCPendingReason",
  graph_soft_ms1_vs_ms2: "/graph/softMS1Reason",
  graph_phy_ms1_vs_ms2: "/graph/phyMS1Reason",
  graph_kpi_ms1_vs_ms2: "/graph/kpiMS1Reason",
  graph_P_and_L_forms: "/graph/profitloss",
  graph_P_and_L_Trends: "/graph/profitlossTrend",
  graph_Project_Type_Unbiled: "/graph/unbilled/projecttypewise",

  // currentuser
  current_user_PG: "/currentuser/ProjectGroup",
  current_user_PT: "/currentuser/ProjectType",
  current_user_PID: "/currentuser/ProjectId",
  current_user_circle_projectId: "/currentuser/Circle/projectId",
  current_user_cost_center: "/currentuser/CostCenter",
  current_user_customer:"/currentuser/customer",
  current_user_business_unit:"/currentuser/businessUnit",

  // super admin compiliance starts  -----

  projectTypeCompliance: "/admin/projectType",
  subProjectTypeCompliance: "/admin/projectSubType",
  activityAndOemCompliance: "/admin/projectSubTypeFieldName",
  addComplianceForm: "/admin/addComplianceForm",
  admin_getComplianceapprover: "/admin/addComplianceApprover",
  complainceMilestoneCard: "/admin/complainceMilestoneCard",
  admin_ComplianceL1List: "/admin/getOneComplianceL1List",
  admin_ComplianceL2List: "/admin/getOneComplianceL2List",
  compliance_globalSaver: '/compliance/globalSaver',
  compliance_globalSaver_Approver: '/compliance/globalSaver/Approved',
  complianceMilestoneL1Approver: "/admin/complianceMilestoneL1Approver",
  complianceMilestoneL2Approver: "/admin/complianceMilestoneL2Approver",
  approverAction: "/admin/approverAction",
  complianceLog: "/complianceLog",
  complianceDegrowTemplateData: "/admin/complianceDegrowTemplateData",


  // super admin compiliance  ends -----

  // Repository starts  -----

  admin_repositorySiteId: "/admin/repositorySiteId",
  user_myPolicy: "/myHome/myPolicy",
  aop: "/AOP",
  ForecastCOGS: "/ForecastCOGS",

  // Repository ends   ---------

  getCircle: "/currentuser/Circle/projectId",
  getCircleSubPorjectType: "admin/deliveryPva/masterSubProject",
  patchEvmActual: "/forms/EVMActual",
  getPvaData: "/forms/EVMActual"

};

export const WebSocketUrls = { siteAnalytics: "siteanalytics" };
