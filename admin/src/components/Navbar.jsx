import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { AdminContext } from "../context/AdminContext";
import { useNavigate } from "react-router-dom";
import { DoctorContext } from "../context/DoctorContext";

const Navbar = () => {
  const AdminLogo = assets.admin_logo;
  const { aToken, setAToken } = useContext(AdminContext);
  const { dToken, setDToken } = useContext(DoctorContext);

  const navigate = useNavigate();

  const logout = () => {
    navigate("/");
    if (aToken) {
      setAToken(null);
      localStorage.removeItem("aToken");
    }
    if (dToken) {
      setDToken(null);
      localStorage.removeItem("dToken");
    }
  };

  return (
    <nav className="w-full flex items-center justify-between px-6 py-4 bg-white shadow-md sticky top-0 z-50">
      {/* Left: Logo & Role */}
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold text-blue-700 tracking-wide">
          Prescripto
        </h1>

        <AdminLogo className="text-4xl text-blue-600" />
        <p className="text-xl font-semibold text-gray-700">
          {aToken ? "Admin" : "Doctor"}
        </p>
      </div>

      {/* Right: Logout Button */}
      <button
        onClick={logout}
        className="bg-red-500 hover:bg-red-600 cursor-pointer text-white font-medium px-4 py-2 rounded-lg transition duration-200 shadow"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
