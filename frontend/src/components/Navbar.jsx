import React, { useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { token, setToken, userData } = React.useContext(AppContext);
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => setShowMenu(!showMenu);
  const logout = () => {
    setToken(false);
    localStorage.removeItem("token");
  };

  return (
    <nav className="bg-[#0A0F2C] shadow-md w-full sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img
            src={assets.logo}
            alt="Prescripto Logo"
            className="w-[160px] object-contain"
          />
        </div>

        {/* Nav Links */}
        <ul className="hidden md:flex items-center space-x-8 font-medium text-white text-sm">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-blue-300" : "hover:text-blue-400"
            }
          >
            HOME
          </NavLink>
          <NavLink
            to="/doctors"
            className={({ isActive }) =>
              isActive ? "text-blue-300" : "hover:text-blue-400"
            }
          >
            ALL DOCTORS
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "text-blue-300" : "hover:text-blue-400"
            }
          >
            ABOUT
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? "text-blue-300" : "hover:text-blue-400"
            }
          >
            CONTACT
          </NavLink>
        </ul>

        {/* Auth Section */}
        <div className="relative">
          {token && userData ? (
            <div className="flex items-center gap-2 cursor-pointer group relative">
              <img
                src={
                  userData.image ||
                  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                }
                alt="Profile"
                className="w-10 h-10 rounded-full border border-white object-cover"
              />
              <img src={assets.dropdown_icon} alt="Dropdown" className="w-4" />
              {/* Dropdown */}
              <div className="absolute right-0 mt-14 bg-white text-sm shadow-lg rounded-md py-2 w-48 hidden group-hover:block z-20">
                <p
                  onClick={() => navigate("/my-profile")}
                  className="block px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700"
                >
                  My Profile
                </p>
                <p
                  onClick={() => navigate("/my-appointments")}
                  className="block px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700"
                >
                  My Appointments
                </p>
                <p
                  onClick={logout}
                  className="block px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-600"
                >
                  Logout
                </p>
              </div>
            </div>
          ) : (
            <button
              onClick={() =>
                navigate("/login", { state: { showSignup: true } })
              }
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full font-medium transition"
            >
              Create Account
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
