import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import UserDashboard from "../pages/user/UserDashboard";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminLogin from "../pages/admin/AdminLogin";
import DashboardContent from "../pages/user/DashboardContent";
import TemplateSelect from "../pages/user/resume/TemplateSelect";
import Setting from "../pages/user/setting/Setting";
import CoverLetter from "../pages/user/coverletter/CoverLetter";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/user/dashboard" element={<UserDashboard />}>
        <Route index element={<DashboardContent />} />   {/* 👈 DEFAULT */}
        <Route path="resume/template" element={<TemplateSelect />} />
        <Route path="setting" element={<Setting/>} />
        <Route path="coverletter" element={<CoverLetter/>} />
      </Route>
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/login" element={<AdminLogin />} />
    </Routes>
  );
}

export default AppRoutes;
