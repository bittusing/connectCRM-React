import CalendarBox from "../components/CalenderBox/CalenderBox";
import ProfileBox from "../components/ProfileBox";
import SettingBoxes from "../components/SettingBoxes";
import ApiIntegeration from "../Pages/ApiIntegeration/ApiIntegeration";
import EmployeeList from "../Pages/CallManage/EmployeeList";
import EmployeeReport from "../Pages/CallManage/EmployeeReport";
import AddLeads from "../Pages/Leads/AddLeads";
import AllLeads from "../Pages/Leads/AllLeads";
import FollowupLeads from "../Pages/Leads/FollowupLeads";
import ImportedLeads from "../Pages/Leads/ImportedLeads";
import ImportLeads from "../Pages/Leads/ImportLeads";
import LeadAction from "../Pages/Leads/LeadAction";
import OutsourcedLeads from "../Pages/Leads/OutsourcedLeads";
import ProductAndServiceDash from "../Pages/ProductAndServices/ProductAndServiceDash";
import CallReport from "../Pages/Reports/CallReport";
import ManageReports from "../Pages/Reports/ManageReports";
import Settings from "../Pages/Settings/Settings";

const navRoutes = [
  {
    path: "api-integeration",
    component: ApiIntegeration,
  },
  {
    path: "calendar",
    component: CalendarBox,
  },
  {
    path: "call-manage/employee",
    component: EmployeeList,
  },
  {
    path: "call-manage/employees-report",
    component: EmployeeReport,
  },
  {
    path: "/leads/add",
    component: AddLeads,
  },
  {
    path: "/leads/all",
    component: AllLeads,
  },
  {
    path: "/leads/followup",
    component: FollowupLeads,
  },
  {
    path: "/leads/imported-leads",
    component: ImportedLeads,
  },
  {
    path: "/leads/outsourced-leads",
    component: OutsourcedLeads,
  },
  {
    path: "/leads/:leadId",
    component: LeadAction,
  },
  {
    path: "/import",
    component: ImportLeads,
  },
  {
    path: "/reports/call",
    component: CallReport,
  },
  {
    path: "/reports/manage",
    component: ManageReports,
  },
  {
    path: "products-service",
    component: ProductAndServiceDash,
  },
  {
    path: "settings",
    component: Settings,
  },
  {
    path: "profile/settings",
    component: SettingBoxes,
  },
  {
    path: "profile",
    component: ProfileBox,
  },
];

export default navRoutes;
