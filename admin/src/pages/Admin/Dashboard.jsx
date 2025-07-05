import React, { useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { assets } from "../../assets/assets";

const Dashboard = () => {
  const { aToken, getDashData, dashData, cancelAppointment } =
    React.useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken]);

  return (
    dashData && (
      <div className="max-w-6xl mx-auto px-4 py-10 space-y-10">
        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-4 p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl shadow-sm border border-blue-200 hover:shadow-md transition">
            <img
              src="https://cdn-icons-png.flaticon.com/128/3304/3304567.png"
              alt="Doctors"
              className="w-14 h-14"
            />
            <div>
              <p className="text-3xl font-bold text-blue-700">
                {dashData.doctors}
              </p>
              <p className="text-gray-600 font-medium">Doctors</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl shadow-sm border border-green-200 hover:shadow-md transition">
            <img
              src="https://cdn-icons-png.flaticon.com/128/12424/12424727.png"
              alt="Appointments"
              className="w-14 h-14"
            />
            <div>
              <p className="text-3xl font-bold text-green-700">
                {dashData.appointments}
              </p>
              <p className="text-gray-600 font-medium">Appointments</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl shadow-sm border border-purple-200 hover:shadow-md transition">
            <img
              src="https://cdn-icons-png.flaticon.com/128/2869/2869812.png"
              alt="Patients"
              className="w-14 h-14"
            />
            <div>
              <p className="text-3xl font-bold text-purple-700">
                {dashData.patients}
              </p>
              <p className="text-gray-600 font-medium">Patients</p>
            </div>
          </div>
        </div>

        {/* Latest Bookings */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8">
          <div className="flex items-center gap-3 mb-6">
            <img
              src="https://cdn-icons-png.flaticon.com/128/839/839860.png"
              alt="List Icon"
              className="w-6 h-6"
            />
            <h2 className="text-2xl font-semibold text-gray-800">
              Latest Bookings
            </h2>
          </div>

          {dashData.latestAppointments?.length > 0 ? (
            <div className="space-y-4">
              {dashData.latestAppointments.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-4 bg-gray-50 rounded-xl border border-gray-200 hover:bg-gray-100 transition"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.docData.image}
                      alt={item.docData.name}
                      className="w-12 h-12 rounded-full object-cover border shadow-sm"
                    />
                    <div>
                      <p className="font-medium text-gray-800">
                        {item.docData.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {item.slotDate}
                      </p>
                    </div>
                  </div>

                  <div>
                    {item.cancelled ? (
                      <span className="bg-red-100 text-red-600 text-xs font-semibold px-3 py-1 rounded-full">
                        Cancelled
                      </span>
                    ) : (
                      <img
                        onClick={() => cancelAppointment(item._id)}
                        src="https://cdn-icons-png.flaticon.com/128/399/399274.png"
                        alt="Cancel"
                        className="w-5 cursor-pointer hover:scale-110 transition"
                        title="Cancel Appointment"
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm text-center">
              No recent bookings found.
            </p>
          )}
        </div>
      </div>
    )
  );
};

export default Dashboard;
