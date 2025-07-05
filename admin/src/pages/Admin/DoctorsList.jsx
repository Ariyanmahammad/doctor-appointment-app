import React, { useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";

const DoctorsList = () => {
  const { doctors, aToken, getAllDoctors, changeAvailability } =
    React.useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">All Doctors</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.isArray(doctors) &&
          doctors.map((item, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-2xl overflow-hidden transition-transform hover:scale-[1.02]"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover"
              />

              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{item.speciality}</p>

                <div className="flex items-center gap-2">
                  <input
                    onClick={() => changeAvailability(item._id)}
                    type="checkbox"
                    checked={item.available}
                    readOnly
                    className="form-checkbox h-5 w-5 text-green-500"
                  />
                  <span
                    className={`text-sm font-medium ${
                      item.available ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    {item.available ? "Available" : "Unavailable"}
                  </span>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default DoctorsList;
