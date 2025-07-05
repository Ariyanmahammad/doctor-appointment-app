import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AdminContext } from "../context/AdminContext";
import { assets } from "../assets/assets";
import { DoctorContext } from "../context/DoctorContext";

const Sidebar = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  const HomeIcon = assets.home_icon;
  const AppointmentsIcon = assets.appointments_icon;
  const DoctorIcon = assets.doctor_icon;
  const PeopleIcon = assets.people_icon;

  return (
    <div className="w-64 h-screen bg-white shadow-xl border-r p-6 sticky top-0 flex flex-col">
      {aToken && (
        <ul className="space-y-4">
          <NavLink
            to="/admin-dashboard"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg text-lg font-medium transition-all duration-200 ${
                isActive
                  ? "bg-blue-100 text-blue-600"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            <HomeIcon className="text-2xl" />
            <p>Dashboard</p>
          </NavLink>

          <NavLink
            to="/all-appointments"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg text-lg font-medium transition-all duration-200 ${
                isActive
                  ? "bg-blue-100 text-blue-600"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            <AppointmentsIcon className="text-2xl" />
            <p>All Appointments</p>
          </NavLink>

          <NavLink
            to="/add-doctor"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg text-lg font-medium transition-all duration-200 ${
                isActive
                  ? "bg-blue-100 text-blue-600"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            <DoctorIcon className="text-2xl" />
            <p>Add Doctors</p>
          </NavLink>

          <NavLink
            to="/doctor-list"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg text-lg font-medium transition-all duration-200 ${
                isActive
                  ? "bg-blue-100 text-blue-600"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            <PeopleIcon className="text-2xl" />
            <p>Doctors List</p>
          </NavLink>
        </ul>
      )}
      {dToken && (
        <ul className="space-y-4">
          <NavLink
            to="/doctor-dashboard"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg text-lg font-medium transition-all duration-200 ${
                isActive
                  ? "bg-blue-100 text-blue-600"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            <HomeIcon className="text-2xl" />
            <p>Dashboard</p>
          </NavLink>

          <NavLink
            to="/doctor-appointments"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg text-lg font-medium transition-all duration-200 ${
                isActive
                  ? "bg-blue-100 text-blue-600"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            <AppointmentsIcon className="text-2xl" />
            <p>All Appointments</p>
          </NavLink>

          <NavLink
            to="/doctor-profile"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg text-lg font-medium transition-all duration-200 ${
                isActive
                  ? "bg-blue-100 text-blue-600"
                  : "text-gray-700 hover:bg-gray-100"
              }`
            }
          >
            <PeopleIcon className="text-2xl" />
            <p>Profile</p>
          </NavLink>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
