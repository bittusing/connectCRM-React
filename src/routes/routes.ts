// import Overview from "../components/Dashboard/Overview";

import NotFound from "../Pages/NotFound/NotFound";
import Testing from "../Pages/NotFound/Testing";

const navRoutes = [
//   {
//     path: "overview",
//     component: Overview,
//   },
  {
    path: "leads",
    component: Testing,
  },
  {
    path: "other",
    component: NotFound,
  },
];

export default navRoutes;
