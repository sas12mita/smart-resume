import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminDashboardContent from "../pages/admin/AdminDashboardContent";
import AdminTemplateCreate from "../pages/admin/resumeTemplate/AdminTemplateCreate";
import AdminTemplateList from "../pages/admin/resumeTemplate/AdminTemplateList";
import AdminTemplateEdit from "../pages/admin/resumeTemplate/AdminTemplateEdit"
import AdminLogin from "../pages/admin/AdminLogin";
import ResumeCreate from "../pages/user/resume/ResumeCreate"


import UserDashboard from "../pages/user/UserDashboard";
import DashboardContent from "../pages/user/DashboardContent";
import Login from "../pages/user/Login";
import Register from "../pages/user/Register";
import TemplateSelect from "../pages/user/resume/TemplateSelect";
import Setting from "../pages/user/setting/Setting";
import CoverLetter from "../pages/user/coverletter/CoverLetter";


function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/user/dashboard" element={<UserDashboard />}>
        <Route index element={<DashboardContent />} />   {/* 👈 DEFAULT */}
        <Route path="resume/template-select" element={<TemplateSelect />} />


        <Route path="setting" element={<Setting />} />
        <Route path="coverletter" element={<CoverLetter />} />
      </Route>
      <Route
        path="/user/resume/create/:templateTitle"
        element={<ResumeCreate />}
      />
      <Route path="user/login" element={<Login />} />
      <Route path="user/register" element={<Register />} />

      <Route path="/admin/dashboard" element={<AdminDashboard />}>
        {/* Nested routes inside AdminDashboard */}
        <Route index element={<AdminDashboardContent />} />       {/* default */}
        <Route path="templates/list" element={<AdminTemplateList />} />
        <Route path="templates/create" element={<AdminTemplateCreate />} />
        <Route path="templates/edit/:id" element={<AdminTemplateEdit />} />
      </Route>
      <Route path="/admin/login" element={<AdminLogin />} />
    </Routes>
  );
}

export default AppRoutes;
