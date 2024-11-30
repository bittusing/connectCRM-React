import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function NotFound() {
  return (
    <div className="p-4 text-center">
      <h1 className="text-2xl font-bold text-red-500">404 - Page Not Found</h1>
    </div>
  );
}

function Dashboard() {
  return (
    <div className="p-4 text-center">
      <h1 className="text-2xl font-bold">Welcome to Connect CRM Dashboard</h1>
    </div>
  );
}

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
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
