// import Overview from "../components/Dashboard/Overview";

import ProductAndServicesPage from "../app/products-service/page";
import CalendarBox from "../components/CalenderBox/CalenderBox";
import ApiIntegeration from "../Pages/ApiIntegeration/ApiIntegeration";
import EmployeeList from "../Pages/CallManage/EmployeeList";
import EmployeeReport from "../Pages/CallManage/EmployeeReport";
import AddLeads from "../Pages/Leads/AddLeads";
import AllLeads from "../Pages/Leads/AllLeads";
import FollowupLeads from "../Pages/Leads/FollowupLeads";
import ImportLeads from "../Pages/Leads/ImportLeads";
import LeadAction from "../Pages/Leads/LeadAction";
import NotFound from "../Pages/NotFound/NotFound";
import Testing from "../Pages/NotFound/Testing";
import CallReport from "../Pages/Reports/CallReport";
import ManageReports from "../Pages/Reports/ManageReports";
import Settings from "../Pages/Settings/Settings";

const navRoutes = [
  //   {
  //     path: "overview",
  //     component: Overview,
  //   },
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
    component: ProductAndServicesPage,
  },
  {
    path: "settings",
    component: Settings,
  },
];

export default navRoutes;
