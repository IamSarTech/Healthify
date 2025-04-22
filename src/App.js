import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import OurServices from "./components/OurServices"; 
import AboutUs from "./components/AboutUs";// Import OurServices.js
import InClinicAppointment from './components/InClinicAppointment';
import Signup from './components/Signup';
import DoctorDashboard from "./components/DoctorDashboard";
import Hospitals from "./components/Hospitals";
import PatientDashboard from "./components/PatientDashboard";
import AdminDashboard from "./components/AdminDashboard";
import DashboardSelection from "./components/DashboardSelection";
import AppointmentBooking from "./components/AppointmentBooking";
import Contact from "./components/Contact";
import PatientRecords from "./components/PatientRecords";
import { AuthProvider, useAuth } from "./components/AuthContext";

function App() {
  return (
    <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
        <Route path="/services" element={<OurServices />} />
        <Route path="/hospitals" element={<Hospitals />} />
        <Route path="/patient-dashboard" element={<PatientDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/dashboard-selection" element={<DashboardSelection />} />
        <Route path="/in-clinic-appointment" element={<InClinicAppointment />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/book-appointment" element={<AppointmentBooking />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/records" element={<PatientRecords />} />
      </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App;
