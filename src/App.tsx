import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "./Pages/NotFound/NotFound";
import navRoutes from "./routes/routes";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Overview from "./components/Dashboard/Overview";
import LoginPageUI from "./app/login/page";
import SignUpPage from "./app/signup/page";
import "./App.css";
import { PrivateRoute } from "./components/Utils/PrivateRoute";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Define your routes here */}
        <Route
          path="/"
          element={
              <Dashboard />
          }
          // element={
          //   <PrivateRoute>
          //     <Dashboard />
          //   </PrivateRoute>
          // }
        >
          <Route index element={<Overview />} />;
          {navRoutes?.map((route, item) => {
            const routProps = {
              path: route.path,
              Component: route.component,
            };
            return <Route key={route.path + item} {...routProps} />;
          })}
        </Route>
        <Route path="/login" element={<LoginPageUI />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="*" element={<NotFound text={"Not found 404"} />} />
         {/* <Route path="/forgot-password" element={<ForgotPassword />} /> */}
          {/* <Route path="/reset-password" element={<ResetPassword />} />   */}
      </Routes>
    </Router>
  );
}
