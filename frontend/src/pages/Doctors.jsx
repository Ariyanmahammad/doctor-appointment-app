import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Doctors = () => {
  const { speciality } = useParams();
  const navigate = useNavigate();

  const { doctors } = useContext(AppContext);
  const [filteredDoctors, setFilteredDoctors] = useState([]);

  const allSpecialities = [
    "General physician",
    "Gynecologist",
    "Dermatologist",
    "Pediatrician",
    "Neurologist",
    "Gastroenterologist",
  ];

  useEffect(() => {
    if (speciality) {
      const filtered = doctors.filter((doc) => doc.speciality === speciality);
      setFilteredDoctors(filtered);
    } else {
      setFilteredDoctors(doctors);
    }
  }, [speciality, doctors]);

  return (
    <div className="px-4 md:px-20 py-10 text-gray-900">
      <h1 className="text-3xl font-semibold mb-6">Browse Doctors</h1>
      <p className="text-gray-600 mb-10">
        Choose a speciality to find trusted doctors in your area.
      </p>

      <div className="flex flex-col md:flex-row gap-10">
        {/* -------- Left side: Speciality list -------- */}
        <div className="md:w-1/4 flex flex-col gap-3">
          <h2 className="text-lg font-semibold mb-2">Specialities</h2>
          {allSpecialities.map((spec, index) => (
            <button
              key={index}
              onClick={() =>
                speciality === spec
                  ? navigate("/doctors")
                  : navigate(`/doctors/${spec}`)
              }
              className={`border px-4 py-2 rounded-lg text-left transition duration-300 hover:bg-blue-50 ${
                speciality === spec ? "bg-blue-100 text-blue-700 font-medium" : ""
              }`}
            >
              {spec}
            </button>
          ))}
        </div>

        {/* -------- Right side: Doctors grid -------- */}
        <div className="md:w-3/4 grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-6">
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((item, index) => (
              <div
                key={index}
                onClick={() => navigate(`/appointment/${item._id}`)}
                className="border border-blue-100 rounded-2xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-transform duration-300 bg-white shadow hover:shadow-lg"
              >
                <img
                  className="w-full h-48 object-cover bg-blue-50"
                  src={item.image}
                  alt={item.name}
                />
                <div className="p-4">
                  <div className="flex items-center gap-2 text-sm mb-1">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        item.available ? "bg-green-500" : "bg-red-500"
                      }`}
                    ></span>
                    <span
                      className={`${
                        item.available ? "text-green-600" : "text-red-500"
                      }`}
                    >
                      {item.available ? "Available" : "Not Available"}
                    </span>
                  </div>
                  <p className="font-semibold text-lg">{item.name}</p>
                  <p className="text-sm text-gray-500">{item.speciality}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No doctors found for this speciality.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
