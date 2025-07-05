import React, { useEffect, useContext } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { assets } from "../../assets/assets";

const DoctorDashboard = () => {
  const { dashData, dToken, getDashData } = useContext(DoctorContext);

  useEffect(() => {
    if (dToken) {
      getDashData();
    }
  }, [dToken]);

  return (
    dashData && (
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="flex items-center p-5 bg-white rounded-xl shadow border border-gray-100">
            <img
              src="https://cdn-icons-png.flaticon.com/128/942/942810.png"
              alt="Appointments"
              className="w-12 h-12 mr-4"
            />
            <div>
              <p className="text-2xl font-bold text-blue-600">
                {dashData.appointments}
              </p>
              <p className="text-gray-500 text-sm">Total Appointments</p>
            </div>
          </div>

          <div className="flex items-center p-5 bg-white rounded-xl shadow border border-gray-100">
            <img
              src="https://cdn-icons-png.flaticon.com/128/3135/3135673.png"
              alt="Earnings"
              className="w-12 h-12 mr-4"
            />
            <div>
              <p className="text-2xl font-bold text-green-600">
                ₹{dashData.earnings}
              </p>
              <p className="text-gray-500 text-sm">Earnings</p>
            </div>
          </div>

          <div className="flex items-center p-5 bg-white rounded-xl shadow border border-gray-100">
            <img
              src="https://cdn-icons-png.flaticon.com/128/2869/2869812.png"
              alt="Patients"
              className="w-12 h-12 mr-4"
            />
            <div>
              <p className="text-2xl font-bold text-purple-600">
                {dashData.patients}
              </p>
              <p className="text-gray-500 text-sm">Unique Patients</p>
            </div>
          </div>
        </div>

        {/* Latest Appointments */}
        <div className="bg-white rounded-xl shadow border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-4">
            <img src="https://cdn-icons-png.flaticon.com/128/942/942810.png" alt="List Icon" className="w-6 h-6" />
            <h2 className="text-xl font-semibold text-gray-800">
              Latest Appointments
            </h2>
          </div>

          <div className="space-y-4">
            {dashData.latestAppointments?.length > 0 ? (
              dashData.latestAppointments.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-md border border-gray-200 hover:shadow-sm transition"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={item.userData.image}
                      alt={item.userData.name}
                      className="w-10 h-10 rounded-full object-cover border"
                    />
                    <div>
                      <p className="font-semibold text-gray-800">
                        {item.userData.name}
                      </p>
                      <p className="text-sm text-gray-500">{item.slotDate}</p>
                    </div>
                  </div>
                  <div>
                    {item.isCompleted ? (
                      <span className="text-green-500 text-xs font-medium">
                        Completed
                      </span>
                    ) : item.cancelled ? (
                      <span className="text-red-500 text-xs font-medium">
                        Cancelled
                      </span>
                    ) : (
                      <span className="text-gray-400 text-xs font-medium">
                        Upcoming
                      </span>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-400">
                No recent appointments found.
              </p>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorDashboard;
