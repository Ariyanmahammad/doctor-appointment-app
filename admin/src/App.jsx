import React, { useContext } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AdminContext } from "./context/AdminContext";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Admin/Dashboard";
import AllAppointments from "./pages/Admin/AllAppointments";
import AddDoctors from "./pages/Admin/AddDoctor";
import DoctorsList from "./pages/Admin/DoctorsList";
import { DoctorContext } from "./context/DoctorContext";
import DoctorDashboard from "./pages/Doctor/doctorDashboard";
import DoctorProfile from "./pages/Doctor/doctorProfile";
import DoctorAppointment from "./pages/Doctor/doctorAppointment";

const App = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  return aToken || dToken ? (
    <div className="min-h-screen bg-gradient-to-br from-indigo-200 to-blue-300">
      {/* Navbar on top */}
      <Navbar />

      {/* Sidebar + Page content side by side */}
      <div className="flex">
        <Sidebar />

        {/* Right side: main content */}
        <main className="flex-1 p-6">
          <Routes>
            // Admin routes
            <Route path="/" element={<Dashboard />} />
            <Route path="/admin-dashboard" element={<Dashboard />} />
            <Route path="/all-appointments" element={<AllAppointments />} />
            <Route path="/add-doctor" element={<AddDoctors />} />
            <Route path="/doctor-list" element={<DoctorsList />} />
            // Doctor routes
            <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
            <Route path="/doctor-profile" element={<DoctorProfile />} />
            <Route
              path="/doctor-appointments"
              element={<DoctorAppointment />}
            />
          </Routes>
        </main>
      </div>

      <ToastContainer />
    </div>
  ) : (
    <>
      <Login />
      <ToastContainer />
    </>
  );
};

export default App;
