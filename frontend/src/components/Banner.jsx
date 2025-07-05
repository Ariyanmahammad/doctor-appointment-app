import React from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const Banner = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col md:flex-row items-center justify-between bg-gradient-to-r from-blue-100 to-blue-300 rounded-2xl px-6 md:px-12 py-10 md:py-20 shadow-md max-w-7xl mx-auto mt-16">
      
      {/* Left Side */}
      <div className="flex flex-col gap-6 md:w-1/2 text-center md:text-left">
        <h1 className="text-3xl md:text-5xl font-bold text-blue-900 leading-tight">
          Book Appointment
          <br />
          With 100+ Trusted Doctors
        </h1>
        <p className="text-gray-700 text-sm md:text-base">
          Get quality healthcare without hassle. Join today to connect with verified and experienced medical professionals across multiple specialities.
        </p>
        <button
          onClick={() => {
            navigate("/login");
            window.scrollTo(0, 0);
          }}
          className="bg-blue-700 hover:bg-blue-800 text-white py-3 px-6 rounded-full font-semibold w-fit mx-auto md:mx-0 transition-all duration-300 shadow-lg"
        >
          Create Account
        </button>
      </div>

      {/* Right Side */}
      <div className="mt-10 md:mt-0 md:w-1/2 flex justify-center">
        <img
          className="w-80 h-auto object-contain rounded-xl drop-shadow-xl"
          src={assets.doc_img}
          alt="doctor"
        />
      </div>
    </div>
  );
};

export default Banner;
