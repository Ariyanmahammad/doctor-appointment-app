import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  return (
    <div className="flex flex-col items-center gap-4 my-20 text-gray-900 px-4">
      {/* Heading */}
      <h1 className="text-3xl md:text-4xl font-bold text-blue-700 text-center">Top Doctors to Book</h1>
      <p className="w-full md:w-1/2 text-center text-sm text-gray-600">
        Simply browse through our extensive list of trusted doctors.
      </p>

      {/* Doctor Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-7xl pt-8">
        {doctors.slice(0, 8).map((item, index) => (
          <div
            onClick={() => {
              navigate(`/appointment/${item._id}`);
              scrollTo(0, 0);
            }}
            key={index}
            className="border rounded-xl overflow-hidden cursor-pointer bg-white hover:shadow-xl transition-transform duration-300 hover:-translate-y-2"
          >
            <img
              className="w-full h-48 object-cover bg-blue-50"
              src={item.image}
              alt={item.name}
            />
            <div className="p-4 space-y-1">
              <div className="flex items-center gap-2 text-sm">
                <div
                  className={`w-2 h-2 rounded-full ${
                    item.available ? "bg-green-500" : "bg-red-500"
                  }`}
                />
                <p className={item.available ? "text-green-600" : "text-red-500"}>
                  {item.available ? "Available" : "Not Available"}
                </p>
              </div>
              <p className="font-semibold text-lg text-gray-800">{item.name}</p>
              <p className="text-sm text-blue-600">{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Button */}
      <button
        onClick={() => {
          navigate("/doctors");
          scrollTo(0, 0);
        }}
        className="px-6 py-2 mt-10 text-white bg-blue-600 hover:bg-blue-700 rounded-full shadow-lg font-medium transition duration-300"
      >
        View All Doctors
      </button>
    </div>
  );
};

export default TopDoctors;
