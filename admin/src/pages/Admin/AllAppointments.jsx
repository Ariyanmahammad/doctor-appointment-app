import React, { useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";

const AllAppointments = () => {
  const { aToken, appointments, getAllAppointments, cancelAppointment } =
    React.useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-blue-700 mb-6">
        All Appointments
      </h2>

      <div className="overflow-x-auto rounded-lg shadow border border-gray-200">
        {/* Table Header */}
        <div className="grid grid-cols-6 gap-4 px-6 py-4 bg-gray-100 text-gray-800 font-semibold text-sm">
          <p>#</p>
          <p>Patient</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Status</p>
        </div>

        {/* Table Rows */}
        {appointments.map((item, index) => {
          const userImage = item.userData?.image || "/default-user.png";
          const userName = item.userData?.name || "Unknown";

          const docImage = item.docData?.image || "/default-doc.png";
          const docName = item.docData?.name || "Unknown";

          return (
            <div
              key={index}
              className="grid grid-cols-6 gap-4 items-center px-6 py-4 border-b border-gray-100 text-sm text-gray-700"
            >
              {/* Index */}
              <p>{index + 1}</p>

              {/* Patient */}
              <div className="flex items-center gap-2">
                <img
                  src={userImage}
                  alt={userName}
                  className="w-8 h-8 rounded-full object-cover border"
                />
                <p className="truncate">{userName}</p>
              </div>

              {/* Date & Time */}
              <p className="whitespace-nowrap">
                {item.slotDate} at {item.slotTime}
              </p>

              {/* Doctor */}
              <div className="flex items-center gap-2">
                <img
                  src={docImage}
                  alt={docName}
                  className="w-8 h-8 rounded-full object-cover border"
                />
                <p className="truncate">{docName}</p>
              </div>

              {/* Fees */}
              <p className="text-green-600 font-semibold">₹{item.amount}</p>

              {/* Status / Action */}
              <div className="flex items-center">
                {item.cancelled ? (
                  <p className="text-red-500 font-medium">Cancelled</p>
                ) : (
                  <img
                    onClick={() => cancelAppointment(item._id)}
                    src="https://cdn-icons-png.flaticon.com/128/399/399274.png"
                    alt="Cancel Icon"
                    className="w-5 h-5 cursor-pointer hover:opacity-80"
                    title="Cancel Appointment"
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllAppointments;
