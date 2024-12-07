import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "./Pages/NotFound/NotFound";
import navRoutes from "./routes/routes";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Overview from "./components/Dashboard/Overview";
import { PrivateRoute } from "./components/Utils/PrivateRoute";
import { ToastContainer } from "react-toastify";
import SignUp from "./components/Auth/SignUp";
import Signin from "./components/Auth/Signin";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Router>
        <Routes>
          {/* Define your routes here */}
          <Route
            path="/"
            // element={
            //     <Dashboard />
            // }
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
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
          <Route path="/login" element={<Signin />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<NotFound text={"Not found 404"} />} />
          {/* <Route path="/forgot-password" element={<ForgotPassword />} /> */}
          {/* <Route path="/reset-password" element={<ResetPassword />} />   */}
        </Routes>
      </Router>
    </>
  );
}
