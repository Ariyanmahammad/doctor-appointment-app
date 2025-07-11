import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Home from "./pages/Home";
import Appointment from "./pages/Appointment";
import MyAppointments from "./pages/MyAppointments";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Doctors from "./pages/Doctors";
import Login from "./pages/Login";
import MyProfile from "./pages/MyProfile";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
const App = () => {
  return (
    <div className="mx-4 sm:mx-[10%]">
      <ToastContainer />

      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctors/:speciality" element={<Doctors />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/appointment/:docId" element={<Appointment />} />
        <Route path="/my-appointments" element={<MyAppointments />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/my-profile" element={<MyProfile />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
