import React from "react";
import { specialityData } from "../assets/assets";
import { Link } from "react-router-dom";

const SpecialityMenu = () => {
  return (
    <section id="speciality" className="py-16 px-4 bg-gray-50 text-gray-700">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-blue-700">Find by Speciality</h2>
        <p className="text-sm mt-2 max-w-xl mx-auto text-gray-500">
          Browse through our expert specialities and find the right doctor for your needs.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
        {specialityData.map((item, index) => (
          <Link
            key={index}
            to={`/doctors/${item.speciality}`}
            onClick={() => scrollTo(0, 0)}
            className="flex flex-col items-center bg-white rounded-xl shadow-md p-4 transition transform hover:-translate-y-2 hover:shadow-xl text-center"
          >
            <img
              src={item.image}
              alt={item.speciality}
              className="w-20 h-20 object-contain mb-3 rounded-full border p-2 bg-gray-100"
            />
            <p className="text-sm font-medium text-gray-700">
              {item.speciality}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default SpecialityMenu;
