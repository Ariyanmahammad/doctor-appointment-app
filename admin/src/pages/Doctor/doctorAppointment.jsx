import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

const DoctorAppointment = () => {
  const {
    dToken,
    appointments,
    getAppointments,
    cancelAppointment,
    completeAppointment,
  } = useContext(DoctorContext);
  const { calculateAge } = useContext(AppContext);

  useEffect(() => {
    if (dToken) getAppointments();
  }, [dToken]);

  const handleComplete = async (id) => {
    await completeAppointment(id);
  };

  const handleCancel = async (id) => {
    await cancelAppointment(id);
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h2 className="text-3xl font-semibold text-center mb-6 text-indigo-700">
        All Appointments
      </h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {appointments.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md p-5 hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex items-center gap-4 mb-4">
              <img
                src={item?.userData?.image || assets.default_profile}
                alt="User"
                className="w-14 h-14 rounded-full object-cover"
              />
              <div>
                <h3 className="text-lg font-bold text-gray-800">
                  {item.userData.name || "Unknown"}
                </h3>
                <p className="text-sm text-gray-500">
                  Age: {calculateAge(item.userData.dob)}
                </p>
              </div>
            </div>

            <div className="text-sm text-gray-700 space-y-1">
              <p>
                <span className="font-semibold">Payment:</span>{" "}
                {item.payment ? "Online" : "Cash"}
              </p>
              <p>
                <span className="font-semibold">Date & Time:</span>{" "}
                {item.slotDate}, {item.slotTime}
              </p>
              <p>
                <span className="font-semibold">Fees:</span> ₹{item.amount}
              </p>
            </div>

            <div className="flex justify-end gap-3 mt-4">
              {item.isCompleted ? (
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded font-semibold text-sm">
                  ✅ Completed
                </span>
              ) : item.cancelled ? (
                <span className="bg-red-100 text-red-600 px-3 py-1 rounded font-semibold text-sm">
                  ❌ Cancelled
                </span>
              ) : (
                <>
                  <img
                    onClick={() => handleComplete(item._id)}
                    src="https://cdn-icons-png.flaticon.com/128/4436/4436481.png"
                    alt="Complete"
                    title="Mark as Completed"
                    className="w-5 h-5 cursor-pointer hover:scale-110 transition"
                  />
                  <img
                    onClick={() => handleCancel(item._id)}
                    src="https://cdn-icons-png.flaticon.com/128/399/399274.png"
                    alt="Cancel"
                    title="Cancel Appointment"
                    className="w-5 h-5 cursor-pointer hover:scale-110 transition"
                  />
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorAppointment;
