import * as Unicons from "@iconscout/react-unicons";
import {
  UilAirplay,
  UilStore,
  UilFileShieldAlt,
  UilHome,
  UilUserSquare,
  UilCoins,
  UilDatabase,
  UilFileContract,
} from "@iconscout/react-unicons";


// newimport
import ManageCustomer from "../pages/PMIS/Admin/ManageCustomer/ManageCustomer";
import ManageVendor from "../pages/PMIS/ManageVendor/ManageVendor";
import ManageProjectType from "../pages/PMIS/Admin/ManageProjectType/ManageProjectType";
import ManageCircle from "../pages/PMIS/Admin/ManageCircle/ManageCircle";
import ManageZone from "../pages/PMIS/Admin/ManageZone/ManageZone";
import MyHome from "../pages/PMIS/MyHome/Home";
import EmpDetails from "../pages/PMIS/MyHome/EmpDetails";
import PersonalInfo from "../pages/PMIS/MyHome/PersonalInfo";
import EmpDetailsTable from "../pages/PMIS/MyHome/EmpDetailsTable";
import HRHomeView from "../pages/PMIS/HR";
import ManageSite from "../pages/PMIS/Admin/ManageSite/ManageSite";
// import Home from "../pages/PMIS/MyHome/Home"

import Claim from "../pages/PMIS/MyHome/Claim";
import Asset from "../pages/PMIS/MyHome/Asset";
import AssetRegistration from "../pages/PMIS/Admin/AssetRegistration/AssetRegistration";
import SuperAdmin from "../pages/PMIS/HR/SuperAdmin";
import ManageCostCenter from "../pages/PMIS/Admin/ManageCostCenter/ManageCostCenter";
import ManageProjectGroup from "../pages/PMIS/Admin/ManageProjectGroup/ManageProjectGroup";
// import Project from "../pages/PMIS/Admin/Project/Project";
import ManageSubProject from "../pages/PMIS/Admin/ManageSubProject/ManageSubProject";
import ManageUserProjectAllocation from "../pages/PMIS/Admin/ManageUserProjectAllocation/ManageUserProjectAllocation";
import VendorProjectAllocation from "../pages/PMIS/Admin/VendorProjectAllocation/VendorProjectAllocation";
import ManageProject from "../pages/PMIS/Admin/ManageProject/ManageProject";
import ManageDepartment from "../pages/PMIS/Admin/ManageDepartment/ManageDepartment";
import ManageDesignation from "../pages/PMIS/Admin/ManageDesignation/ManageDesignation";
import ManageProfile from "../pages/PMIS/Admin/ManageProfile(userrole)/ManageProfile";
import ManageProjectSiteId from "../pages/PMIS/Admin/ManageProjectSiteId/ManageProjectSiteId";
import ExpenseAndAdvance from "../pages/PMIS/MyHome/ExpAdvForClaim";
import ManageVendorForm from "../pages/PMIS/ManageVendor/ManageVendorForm";
import VendorCards from "../pages/PMIS/VendorCards/VendorCards";
import VendorProject from "../pages/PMIS/VendorCards/VendorProject";
import ManageUserProjectSiteId from "../pages/PMIS/Admin/ManageProjectSiteId/ManageUserProjectSiteId";
import ManageCompletionCriteria from "../pages/PMIS/Admin/ManageCompletionCriteria/ManageCompletionCriteria";
import ManageClaimType from "../pages/PMIS/Admin/ManageClaimType/ManageClaimType";
import FinancialCards from "../pages/PMIS/FinancialCards/FinancialCards";
import FormsCards from "../pages/PMIS/Formss/FormsCards";
// import WorkdoneForecastCards from "../pages/PMIS/Formss/WorkdoneForecastCards";
import InvoiceBased from "../pages/PMIS/FinancialCards/InvoiceBased/InvoiceBased";
import POWorkDoneBased from "../pages/PMIS/FinancialCards/POWorkDoneBased/POWorkDoneBased";
import POMgmtCards from "../pages/PMIS/FinancialCards/POMgmtCards";
import InvoiceMgmtt from "../pages/PMIS/FinancialCards/InvoiceMgmtt";
import Invoice from "../pages/PMIS/FinancialCards/InvoiceManagement/Invoice";
import AccrualRevenue from "../pages/PMIS/FinancialCards/AccrualRevenue/AccrualRevenue";
import UnbilledWaterfall from "../pages/PMIS/FinancialCards/UnbilledWaterfall/UnbilledWaterfall";
import WorkDone from "../pages/PMIS/FinancialCards/WorkdoneManagement/WorkDone";
import UnbilledCards from '../pages/PMIS/FinancialCards/UnbilledCards'
import EarnValueMgmtFinancial from '../pages/PMIS/Formss/EarnValueMgmtFinancial/EarnValueMgmtFinancial'
import ClaimTypeCards from "../pages/PMIS/HR/ClaimTypeCards";
import Manage from "../pages/PMIS/Admin/ManageClaimTypeDesignation/ManageClaimTypeDesignation";
import ManageClaimTypeUnitRate from "../pages/PMIS/Admin/ManageClaimTypeUnitRate/ManageClaimTypeUnitRate";
import ClaimAndAdvance from "../pages/PMIS/MyHome/ClaimAndAdvance/ClaimAndAdvance";
import ClaimAndAdvanceOnclick from "../pages/PMIS/MyHome/ClaimAndAdvance/ClaimAdvanceOnclick";
import HomeCards from "../pages/PMIS/MyHome/HomeCards";
import FillExpense from "../pages/PMIS/MyHome/ClaimAdvExpenseForm/FillExpense";
import FillAdvance from "../pages/PMIS/MyHome/ClaimAdvAdvanceForm/FillAdvance";
import L1Form from "../pages/PMIS/MyHome/L1Form/L1Form";
import ApproverCards from "../pages/PMIS/MyHome/ApproverCards";
import L2Form from "../pages/PMIS/MyHome/L2Form/L2Form";
import L3Form from "../pages/PMIS/MyHome/L3Form/L3Form";
import L1AdvanceForm from "../pages/PMIS/MyHome/L1Form/L1AdvanceForm";
import L2AdvanceForm from "../pages/PMIS/MyHome/L2Form/L2AdvanceForm";
import L3AdvanceForm from "../pages/PMIS/MyHome/L3Form/L3AdvanceForm";
import DAFormFill from "../pages/PMIS/MyHome/DAFormFill/DAFormFill";
import GapAnalysisCards from "../pages/PMIS/Formss/GapAnalysisCards";
import PL from "../pages/PMIS/Formss/P&L/PL";
import Dashboard1 from "../pages/PMIS/Dashboard1/Dashboard1";
import ExpAdvForClaim from "../pages/PMIS/MyHome/ExpAdvForClaim";
import ExpAdvForAdvance from "../pages/PMIS/MyHome/ExpAdvForAdvance";
import AccrualRevenueTrend from "../pages/PMIS/Formss/AccrualRevenueTrend/AccrualRevenueTrend";
import DashboardCard from "../pages/PMIS/Dashboard1/DashboardCard";
import MyTask from "../pages/PMIS/MyTask/MyTask";
import SOB from "../pages/PMIS/Formss/SOB/SOB";
import MonthRevenueTrend from "../pages/PMIS/Formss/FinancialGraph/MonthRevenueTrend";
import MonthlyRevenueCircle from "../pages/PMIS/Formss/FinancialGraph/MonthlyRevenueCircle";
import CumulativeTrendPlanVsActual from "../pages/PMIS/Formss/FinancialGraph/CumulativeTrendPlanVsActual";
import MS1AndMS2CircleWise from "../pages/PMIS/Dashboard1/MS1AndMS2CircleWise";
import Settlement from "../pages/PMIS/MyHome/SettlementForm/Settlement";
import ActivityLogs from "../pages/PMIS/HR/ActivityLogs/ActivityLogs";
import ApprovalLogs from "../pages/PMIS/HR/ActivityLogs/ApprovalLogs";
import AdminLogs from "../pages/PMIS/HR/ActivityLogs/AdminLogs";
import UserAccessManagement from "../pages/Admin/UserAccessManagement/UserAccessManagement";
import AccuralRevenueMaster from "../pages/PMIS/Admin/AccuralRevenueMaster/AccuralRevenueMaster";
import ManageCompliance from "../pages/PMIS/Admin/ManageCompliance/ManageCompliance";
import ManageComplianceL1 from "../pages/PMIS/Admin/ManageComplianceL1Approver/ManageComplianceL1";
import ManageComplianceL2 from "../pages/PMIS/Admin/ManageComplianceL2Approver/ManageComplianceL2";
import ParentApproverCards from "../pages/PMIS/MyHome/ParentApprovalCards";
import ComplianceMilestoneCard from "../pages/PMIS/MyHome/ComplianceMilestoneCard";
import ComplianceApproverCard from "../pages/PMIS/MyHome/ComplianceApproverCard";
import ComplianceL1ApproverTable from "../pages/PMIS/MyHome/ComplianceL1ApproverTable";
import ComplianceL2ApproverTable from "../pages/PMIS/MyHome/ComplianceL2ApproverTable";
import RepositoryCustomerCard from "../pages/PMIS/Repository/RepositoryCustomerCard";
import RepositoryProjectGroupSites from "../pages/PMIS/Repository/RepositoryProjectGroupSites";
import VendorWorkDescription from "../pages/PMIS/Admin/VendorWorkDescription/VendorWorkDescription";
import VendorActivity from "../pages/PMIS/Admin/VendorActivity/VendorActivity";
import ManagePolicy from "../pages/PMIS/MyHome/ManagePolicy";
import FinancialDashboardCard from "../pages/PMIS/FinancialCards/FinancialDashboardCard";
import AOPTracking from "../pages/PMIS/Formss/AOP/AOPTracking";
import ForcastCOGSTracking from "../pages/PMIS/Formss/ForcastCOGS/ForcastCOGSTracking";
import SalaryDB from "../pages/PMIS/gpTracking/salaryDB";
import OtherFixedCost from "../pages/PMIS/gpTracking/OtherFixedCost/OtherFixedCost";
import OtherFixedCostTypes from "../pages/PMIS/gpTracking/OtherFixedCostTypes/OtherFixedCostTypes";
import GPTracking from "../pages/PMIS/gpTracking/GpTrackingMain/gpTracking";
import VendorProjectTracking from "../pages/PMIS/VendorProjectTracking/VendorProjectTracking";
import VendorCost from "../pages/PMIS/gpTracking/VendorCost/VendorCost";

import AOPTrackingAirtel from "../pages/PMIS/Formss/AOP/AOPAIRTEL";
import ExChangeRate from "../pages/PMIS/Admin/ExchangeRate/ExChangeRate";
import SubProjectMasterTable from "../pages/PMIS/Admin/SubProjectMasterTable/SubProjectMasterTable";
import DeliveryPVA from "../pages/PMIS/Formss/DeliveryPVA/DeliveryPVA";
import WorkdoneDeliveryPVAMSCards from "../pages/PMIS/Formss/WorkdoneDeliveryPVAMSCards";
import WorkdoneDeliveryPVACards from "../pages/PMIS/Formss/WorkdoneDeliveryPVACards";

let user = JSON.parse(localStorage.getItem("user"));
let permission = JSON.parse(localStorage.getItem("permission")) || {};
const pmpermission = permission?.pmpermission;

let smartComponent = <>Hello</>;

let abcd = [];
if (user) {
  // let cpv = getAccessType("Customer Page View");
  // let ptpv = getAccessType("Project Type Page View");
  // let ppv = getAccessType("Project Page View");
  // let spv = getAccessType("Site Page View");

  let cpv = "visible"
  let ptpv = "visible"
  let ppv = "visible"
  let spv = "visible"

  // console.log(cpv, "cpv", ptpv, "ptpv", ppv, "ppv", spv, "spv", "mergedAll");
  if (cpv != "invisible") {
    smartComponent = <ManageCustomer />;

    abcd = [
      {
        name: "Project Management",
        link: "/manageCustomer",
        // component: ["Field Resource", "QE", "Circle Support", "Project Manager", "Vendor"].indexOf(rolename)==-1?<ManageCustomer />:<ManageUserProjectSiteId />,
        component: <ManageCustomer />,
        subMenu: [],
        icon: <UilFileShieldAlt className="hover:text-heading cursor-pointer" />,
      },
    ];
  } else if (ptpv != "invisible") {
    abcd = [
      {
        name: "Project Management",
        link: "/projectManagement",
        subMenu: [],
        component: <ManageProjectType />,
        icon: <UilFileShieldAlt className="hover:text-heading cursor-pointer" />,
      },
    ];
    smartComponent = <ManageProjectType />;
  } else if (ppv != "invisible") {
    abcd = [
      {
        name: "Project Management",
        link: "/project",
        subMenu: [],
        component: <ManageProject />,
        icon: <UilFileShieldAlt className="hover:text-heading cursor-pointer" />,
      },
    ];
    smartComponent = <ManageProject />;
  } else if (spv != "invisible") {
    abcd = [
      {
        name: "Project Management",
        link: "/prjmgmt",
        component: <ManageUserProjectSiteId />,
        subMenu: [],
        icon: <UilFileShieldAlt className="hover:text-heading cursor-pointer" />,
      },
    ];
    smartComponent = <ManageProjectSiteId />;
  }
}



let rolename = user?.roleName;

export const Sidebar_content = {
  temp: [],
  GlobalUrl: [
    {
      name: "Not Found",
      link: "*",
      subMenu: [
        {
          name: "dasdaas",
          link: "*",
          component: <h4 className="text-xl">Coming Soon</h4>,
          subMenu: [],
        },
      ],
    },
    {
      name: "",
      link: "/dashboard/:cname/:customeruniqueId",
      subMenu: [],
      component: <Dashboard1 />,
    },
    {
      name: "",
      link: "/projectManagement/:cname/:customeruniqueId",
      subMenu: [],
      component: <ManageProjectType />,
    },
    {
      name: "",
      link: "/projectManagement/:cname/:customeruniqueId",
      subMenu: [],
      component: <ManageProjectType />,
    },
    {
      name: "",
      link: "/ManageSite/:customeruniqueId",
      subMenu: [],
      component: <ManageSite />,
    },
    {
      name: "",
      link: "/projectManagement/:cname/:customeruniqueId/:projecttypeuniqueId",
      subMenu: [],
      component: <ManageProjectType />,
    },
    {
      name: "",
      link: "/subProject/:projecttypeuniqueId",
      subMenu: [],
      component: <ManageSubProject />,
    },
    {
      name: "",
      link: "/projectManagement_1/:cname/:ptname/:customeruniqueId/:projecttypeuniqueId",
      subMenu: [],
      component: <ManageProject />,
    },
    {
      name: "",
      link: "/projectManagement_1/:cname/:ptname/:customeruniqueId",
      subMenu: [],
      component: <ManageProject />,
    },
    {
      name: "",
      link: "/projectManagement_2/:cname/:ptype/:customeruniqueId/:proId/:projectuniqueId",
      subMenu: [],
      component: <ManageProjectSiteId />,
    },
    {
      name: "",
      link: "/hr/superAdmin/userProjectAllocation",
      subMenu: [],
      component: <ManageUserProjectAllocation />,
    },
    {
      name: "",
      link: "/hr/superAdmin/manageProfile",
      subMenu: [],
      component: <ManageProfile />,
    },
    {
      name: "",
      link: "/hr/superAdmin/subProjectMaster",
      subMenu: [],
      component: <SubProjectMasterTable />,
    },
    {
      name: "",
      link: "/empdetails/:empuid",
      subMenu: [],
      component: <EmpDetails />,
    },

    {
      name: "",
      link: "/empdetails",
      subMenu: [],
      component: <EmpDetails />,
    },
    {
      name: "",
      link: "/home/personalInfo",
      subMenu: [],
      component: <PersonalInfo />,
    },
    {
      name: "",
      link: "/home/myTask",
      subMenu: [],
      component: <MyTask />,
    },
    {
      name: "",
      link: "/home/myPolicy",
      subMenu: [],
      component: <ManagePolicy />,
    },
    {
      name: "",
      link: "/hr/empdetailstable",
      subMenu: [],
      component: <EmpDetailsTable />,
    },
    {
      name: "",
      link: "/hr/Claim",
      subMenu: [],
      component: <ExpAdvForClaim />,
    },
    {
      name: "",
      link: "/hr/Advance",
      subMenu: [],
      component: <ExpAdvForAdvance />,
    },
    {
      name: "",
      link: "/vendorForm/:empuid",
      subMenu: [],
      component: <ManageVendorForm />,
    },
    {
      name: "",
      link: "/vendorForm",
      subMenu: [],
      component: <ManageVendorForm />,
    },
    {
      name: "",
      link: "/home/parentApproverCards",
      subMenu: [],
      component: <ParentApproverCards />,
    },
    {
      name: "",
      link: "/home/parentApproverCards/approverCards",
      subMenu: [],
      component: <ApproverCards />,
    },
    {
      name: "",
      link: "/home/parentApproverCards/complianceMilestoneCard",
      subMenu: [],
      component: <ComplianceMilestoneCard />,
    },
    {
      name: "",
      link: "/home/complianceMilestoneCard/:mName",
      subMenu: [],
      component: <ComplianceApproverCard />,
    },
    {
      name: "",
      link: "/home/parentApproverCards/compliance/:mName/L1 Approver",
      subMenu: [],
      component: <ComplianceL1ApproverTable />,
    },
    {
      name: "",
      link: "/home/parentApproverCards/compliance/:mName/L2 Approver",
      subMenu: [],
      component: <ComplianceL2ApproverTable />,
    },
    {
      name: "",
      link: "/home/claimAndAdvance",
      subMenu: [],
      component: <ClaimAndAdvance />,
    },
    {
      name: "",
      link: "/home/claimAndAdvance/claimAndAdvanceOnclick/:id",
      subMenu: [],
      component: <ClaimAndAdvanceOnclick />,
    },
    {
      name: "",
      link: "/home/claimAndAdvance/Expense",
      subMenu: [],
      component: <FillExpense />,
    },
    {
      name: "",
      link: "/home/claimAndAdvance/Advance",
      subMenu: [],
      component: <FillAdvance />,
    },
    {
      name: "",
      link: "/home/claimAndAdvance/DAFormFill",
      subMenu: [],
      component: <DAFormFill />,
    },
    {
      name: "",
      link: "/home/approverCards/L1Approver",
      subMenu: [],
      component: <L1Form />,
    },
    {
      name: "",
      link: "/home/approverCards/L1Advance",
      subMenu: [],
      component: <L1AdvanceForm />,
    },
    {
      name: "",
      link: "/home/approverCards/L2Approver",
      subMenu: [],
      component: <L2Form />,
    },
    {
      name: "",
      link: "/home/approverCards/L2Advance",
      subMenu: [],
      component: <L2AdvanceForm />,
    },
    {
      name: "",
      link: "/home/approverCards/financeApprover",
      subMenu: [],
      component: <L3Form />,
    },
    {
      name: "",
      link: "/home/approverCards/L3Advance",
      subMenu: [],
      component: <L3AdvanceForm />,
    },
    {
      name: "",
      link: "/hr/assetManagement",
      subMenu: [],
      component: <Asset />,
    },
    {
      name: "",
      link: "/hr/superAdmin",
      subMenu: [],
      component: <SuperAdmin />,
    },
    {
      name: "Manage Circle",
      link: "/hr/superAdmin/manageCircle",
      subMenu: [],
      component: <ManageCircle />,
      icon: <Unicons.UilChannel size="16" className="hover:text-heading cursor-pointer" />,
    },
    {
      name: "Exchange Rate",
      link: "/hr/superAdmin/exchangeRate",
      subMenu: [],
      component: <ExChangeRate />,
      icon: <Unicons.UilChannel size="16" className="hover:text-heading cursor-pointer" />,
    },
    {
      name: "Manage Zone",
      link: "/hr/superAdmin/manageZone",
      subMenu: [],
      component: <ManageZone />,
      icon: <Unicons.UilChannel size="16" className="hover:text-heading cursor-pointer" />,
    },
    {
      name: "Manage Cost Center",
      link: "/hr/superAdmin/manageCostCenter",
      subMenu: [],
      component: <ManageCostCenter />,
      icon: <Unicons.UilChannel size="16" />,
    },
    {
      name: "Partner Work Description",
      link: "/hr/superAdmin/partnerWorkDescription",
      subMenu: [],
      component: <VendorWorkDescription />,
      icon: <Unicons.UilChannel size="16" />,
    },
    {
      name: "Partner Acitivity",
      link: "/hr/superAdmin/partnerActivity",
      subMenu: [],
      component: <VendorActivity />,
      icon: <Unicons.UilChannel size="16" />,
    },
    {
      name: "",
      link: "/hr/superAdmin/projectGroup",
      subMenu: [],
      component: <ManageProjectGroup />,
    },

    {
      name: "",
      link: "/hr/superAdmin/UserAccessManagement",
      subMenu: [],
      component: <UserAccessManagement />,
    },
    {
      name: "",
      link: "/hr/superAdmin/partnerProjectAllocation",
      subMenu: [],
      component: <VendorProjectAllocation />,
    },
    {
      name: "",
      link: "/hr/superAdmin/manageDepartment",
      subMenu: [],
      component: <ManageDepartment />,
    },
    {
      name: "",
      link: "/hr/superAdmin/Grade",
      subMenu: [],
      component: <ManageDesignation />,
    },
    {
      name: "Asset Registration",
      link: "/assetRegistration",
      subMenu: [],
      component: <AssetRegistration />,
      icon: <Unicons.UilChannel size="16" className="hover:text-heading cursor-pointer" />,
    },

    {
      name: "",
      link: "/vendor/managePartner",
      component: <ManageVendor />,
      icon: <UilStore className="hover:text-heading cursor-pointer" />,
      subMenu: [],
    },
    {
      name: "",
      link: "/vendor/projectTracking",
      // component: <VendorProject />,
      component: <VendorProjectTracking />,
      icon: <UilStore className="hover:text-heading cursor-pointer" />,
      subMenu: [],
    },
    {
      name: "",
      link: "/vendor/commercial",
      component: <p className="text-white text-center"> Commercial data is comming soon</p>,
      icon: <UilStore className="hover:text-heading cursor-pointer" />,
      subMenu: [],
    },
    {
      name: "",
      link: "/hr/superAdmin/completionCriteria",
      component: <ManageCompletionCriteria />,
      icon: <UilStore className="hover:text-heading cursor-pointer" />,
      subMenu: [],
    },
    {
      name: "",
      link: "/hr/superAdmin/claimType",
      component: <ClaimTypeCards />,
      icon: <UilStore className="hover:text-heading cursor-pointer" />,
      subMenu: [],
    },
    {
      name: "",
      link: "/hr/superAdmin/claimType/claimTypeCategories",
      component: <ManageClaimType />,
      icon: <UilStore className="hover:text-heading cursor-pointer" />,
      subMenu: [],
    },
    {
      name: "",
      link: "/hr/superAdmin/claimType/claimTypeGrade",
      component: <Manage />,
      icon: <UilStore className="hover:text-heading cursor-pointer" />,
      subMenu: [],
    },
    {
      name: "",
      link: "/hr/superAdmin/claimType/claimTypeUnitRate",
      component: <ManageClaimTypeUnitRate />,
      icon: <UilStore className="hover:text-heading cursor-pointer" />,
      subMenu: [],
    },
    {
      name: "",
      link: "financial/:customer/:customerId",
      component: <FinancialCards />,
      icon: <UilStore className="hover:text-heading cursor-pointer" />,
      subMenu: [],
    },
    {
      name: "",
      link: "/financial/:customer/:customerId/poManagement",
      component: <POMgmtCards />,
      icon: <UilStore className="hover:text-heading cursor-pointer" />,
      subMenu: [],
    },
    {
      name: "",
      link: "/financial/:customer/:customerId/poManagement/poStatusInvoice",
      component: <InvoiceBased />,
      icon: <UilStore className="hover:text-heading cursor-pointer" />,
      subMenu: [],
    },
    {
      name: "",
      link: "/financial/:customer/:customerId/invoiceMgmt/revenueInvoiced",
      component: <Invoice />,
      icon: <UilStore className="hover:text-heading cursor-pointer" />,
      subMenu: [],
    },
    {
      name: "",
      link: "/financial/:customer/:customerId/poManagement/poTrackingWorkdone",
      component: <POWorkDoneBased />,
      icon: <UilStore className="hover:text-heading cursor-pointer" />,
      subMenu: [],
    },
    {
      name: "",
      link: "/financial/:customer/:customerId/invoiceMgmt",
      component: <InvoiceMgmtt />,
      icon: <UilStore className="hover:text-heading cursor-pointer" />,
      subMenu: [],
    },
    {
      name: "",
      link: "/financial/:customer/:customerId/poWorkDone",
      component: <WorkDone />,
      icon: <UilStore className="hover:text-heading cursor-pointer" />,
      subMenu: [],
    },
    {
      name: "",
      link: "/financial/:customer/:customerId/invoiceMgmt/accrualRevenue",
      component: <AccrualRevenue />,
      icon: <UilStore className="hover:text-heading cursor-pointer" />,
      subMenu: [],
    },
    {
      name: "",
      link: "/financial/Unbilled",
      component: <UnbilledCards />,
      icon: <UilStore className="hover:text-heading cursor-pointer" />,
      subMenu: [],
    },
    {
      name: "",
      link: "/financial/Unbilled/unbilledWaterfall",
      component: <UnbilledWaterfall />,
      icon: <UilStore className="hover:text-heading cursor-pointer" />,
      subMenu: [],
    },
    // {
    //   name: "",
    //   link: "/forms/EVMDelivery",
    //   component: <WorkdoneForecastCards />,
    //   icon: <UilStore className="hover:text-heading cursor-pointer" />,
    //   subMenu: [],
    // },
    {
      name: "",
      link: "/forms/gapAnalysis",
      component: <GapAnalysisCards />,
      icon: <UilStore className="hover:text-heading cursor-pointer" />,
      subMenu: [],
    },
    {
      name: "",
      link: "/forms/gapAnalysis/ETPPendingReason",
      icon: <UilStore className="hover:text-heading cursor-pointer" />,
      subMenu: [],
    },
    {
      name: "",
      link: "/forms/gapAnalysis/MS2VSWCCPendingReason",
      icon: <UilStore className="hover:text-heading cursor-pointer" />,
      subMenu: [],
    },
    {
      name: "",
      link: "/forms/InvoicePVA",
      component: <EarnValueMgmtFinancial />,
      icon: <UilStore className="hover:text-heading cursor-pointer" />,
      subMenu: [],
    },
    {
      name: "",
      link: "/forms/PVADeliveryCustomer",
      component: <WorkdoneDeliveryPVACards />,
      icon: <UilStore className="hover:text-heading cursor-pointer" />,
      subMenu: [],
    },
    {
      name: "",
      link: "/forms/PVADeliveryCustomer/MS-PVA",
      component: <WorkdoneDeliveryPVAMSCards />,
      icon: <UilStore className="hover:text-heading cursor-pointer" />,
      subMenu: [],
    },
    {
      name: "",
      link: "/forms/PVADeliveryCustomer/MS-PVA/:MSType/:customerId",
      component: <DeliveryPVA />,
      icon: <UilStore className="hover:text-heading cursor-pointer" />,
      subMenu: [],
    },
    {
      name: "",
      link: "/forms/P&L",
      component: <PL />,
      icon: <UilStore className="hover:text-heading cursor-pointer" />,
      subMenu: [],
    },
    {
      name: "",
      link: "/forms/AopTracking",
      component: <AOPTracking />,
      icon: <UilStore className="hover:text-heading cursor-pointer" />,
      subMenu: [],
    },
    {
      name: "",
      link: "/forms/forcastCOGSTracking",
      component: <ForcastCOGSTracking />,
      icon: <UilStore className="hover:text-heading cursor-pointer" />,
      subMenu: [],
    },
    {
      name: "",
      link: "/forms/AopTrackingAirtel",
      component: <AOPTrackingAirtel />,
      icon: <UilStore className="hover:text-heading cursor-pointer" />,
      subMenu: [],
    },
    {
      name: "",
      link: "/forms/AccrualRevenueTrend",
      component: <AccrualRevenueTrend />,
      icon: <UilStore className="hover:text-heading cursor-pointer" />,
      subMenu: [],
    },
    {
      name: "",
      link: "/forms/gpTracking",
      component: <GPTracking />,
      icon: <UilStore className="hover:text-heading cursor-pointer" />,
      subMenu: [],
    },
    {
      name: "",
      link: "/forms/SOB",
      component: <SOB />,
      icon: <UilStore className="hover:text-heading cursor-pointer" />,
      subMenu: [],
    },
    {
      name: "",
      link: "/hr/superAdmin/MasterUnitRate",
      component: <AccuralRevenueMaster />,
      icon: <UilFileContract className="hover:text-heading cursor-pointer" />,
      subMenu: [],
    },
    {
      name: "",
      link: "/hr/superAdmin/ActivityLogs",
      component: <ActivityLogs />,
      icon: <UilFileContract className="hover:text-heading cursor-pointer" />,
      subMenu: [],
    },
    {
      name: "",
      link: "/hr/superAdmin/ActivityLogs/ApprovalLogs",
      component: <ApprovalLogs />,
      icon: <UilFileContract className="hover:text-heading cursor-pointer" />,
      subMenu: [],
    },
    {
      name: "",
      link: "/hr/superAdmin/ActivityLogs/SuperAdminLogs",
      component: <AdminLogs />,
      icon: <UilFileContract className="hover:text-heading cursor-pointer" />,
      subMenu: [],
    },
    {
      name: "",
      link: "/hr/superAdmin/compliance",
      component: <ManageCompliance />,
      icon: <UilFileContract className="hover:text-heading cursor-pointer" />,
      subMenu: [],
    },
    {
      name: "",
      link: "/hr/superAdmin/complianceL1Approver",
      component: <ManageComplianceL1 />,
      icon: <UilFileContract className="hover:text-heading cursor-pointer" />,
      subMenu: [],
    },
    {
      name: "",
      link: "/hr/superAdmin/complianceL2Approver",
      component: <ManageComplianceL2 />,
      icon: <UilFileContract className="hover:text-heading cursor-pointer" />,
      subMenu: [],
    },
    {
      name: "",
      link: "/hr/superAdmin/salaryDB",
      component: <SalaryDB/>,
      icon: <UilFileContract className="hover:text-heading cursor-pointer" />,
      subMenu: [],
    },
    {
      name: "",
      link: "/hr/superAdmin/OtherFixedCostTypes",
      component: <OtherFixedCostTypes/>,
      icon: <UilFileContract className="hover:text-heading cursor-pointer" />,
      subMenu: [],
    },
    {
      name: "",
      link: "/hr/superAdmin/OtherFixedCost",
      component: <OtherFixedCost/>,
      icon: <UilFileContract className="hover:text-heading cursor-pointer" />,
      subMenu: [],
    },
    {
      name: "",
      link: "/hr/superAdmin/vendorCost",
      component: < VendorCost/>,
      icon: <UilFileContract className="hover:text-heading cursor-pointer" />,
      subMenu: [],
    },
    // {
    //   name: "",
    //   link: "/hr/superAdmin/gpTracking",
    //   component: <GPTracking/>,
    //   icon: <UilFileContract className="hover:text-heading cursor-pointer" />,
    //   subMenu: [],
    // },
    {
      name: "",
      link: "/home/approverCards/SettlementAmount",
      component: <Settlement />,
      icon: <UilFileContract className="hover:text-heading cursor-pointer" />,
      subMenu: [],
    },
    {
      name: "",
      link: "/repository/:customer/:projectGroup/:projectId/:id",
      component: <RepositoryProjectGroupSites />,
      icon: <UilFileContract className="hover:text-heading cursor-pointer" />,
      subMenu: [],
    },


  ],

  all_routes: [
    {
      name: "My Dashboard",
      link: "/mydash-board",
      component: <DashboardCard />,
      icon: <UilAirplay className="hover:text-heading cursor-pointer" />,
      subMenu: [],
    },
    {
      name: "My Home",
      link: "/",
      component: <HomeCards />,
      icon: <UilHome className="hover:text-heading cursor-pointer" />,
      subMenu: [],
    },
    {
      name: "Project Management",
      link: "/manageCustomer",
      // component: ["Field Resource", "QE", "Circle Support", "Project Manager", "Vendor"].indexOf(rolename)==-1?<ManageCustomer />:<ManageUserProjectSiteId />,
      component: <ManageCustomer />,
      subMenu: [],
      icon: <UilFileShieldAlt className="hover:text-heading cursor-pointer" />,
    },
    {
      name: "Human Resource",
      link: "/hr",
      subMenu: [],
      component: <HRHomeView />,
      icon: <UilUserSquare className="hover:text-heading cursor-pointer" />,
    },
    {
      name: "Partner Management",
      link: "/vendor",
      component: <VendorCards />,
      icon: <UilStore className="hover:text-heading cursor-pointer" />,
      subMenu: [],
    },
    {
      name: "Financial",
      link: "/financial",
      component: <FinancialDashboardCard />,
      icon: <UilCoins className="hover:text-heading cursor-pointer" />,
      subMenu: [],
    },
    {
      name: "Repository",
      link: "/repository",
      component: <RepositoryCustomerCard />,
      icon: <UilDatabase className="hover:text-heading cursor-pointer" />,
      subMenu: [],
    },

    {
      name: "Forms",
      link: "/forms",
      component: <FormsCards />,
      icon: <UilFileContract className="hover:text-heading cursor-pointer" />,
      subMenu: [],
    },

    {
      name: "Super Admin",
      link: "/admin",
      subMenu: [],
      icon: <Unicons.UilReact />,
    },
  ],




};



