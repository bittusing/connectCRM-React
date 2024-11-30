import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "./Pages/NotFound/NotFound";
import navRoutes from "./routes/routes";
import Dashboard from "./Pages/Dashboard/Dashboard";
import './App.css'
import Overview from "./components/Dashboard/Overview";

// function Dashboard() {
//   return (
//     <div className="p-4 text-center">
//       <h1 className="text-2xl font-bold">Welcome to Connect CRM Dashboard</h1>
//     </div>
//   );
// }

function Login() {
  return (
    <div className="p-4 text-center">
      <h1 className="text-2xl font-bold">Login to Connect CRM</h1>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Define your routes here */}
          <Route path="/" element={<Dashboard />}>
           <Route index element={<Overview/>} />;
            {navRoutes?.map((route, item) => {
              const routProps = {
                path: route.path,
                Component: route.component,
              };
              return <Route key={route.path + item} {...routProps} />;
             
            })}
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound text={"not found 404"} />} />
          {/* <Route path="/logout" element={<Logout />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} /> */}
      </Routes>
    </Router>
  );
}
