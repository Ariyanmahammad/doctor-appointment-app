import React from "react";
import { assets } from "../assets/assets";

const Header = () => {
  return (
    <section className="bg-blue-400 rounded-b-xl">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 md:px-10 lg:px-20 py-12 md:py-20 gap-10">
        {/* Left Side */}
        <div className="flex-1 space-y-6 text-white">
          <h1 className="text-3xl md:text-5xl font-bold leading-snug">
            Book Appointments <br className="hidden sm:block" />
            with Trusted Doctors
          </h1>

          <div className="flex items-center gap-4 text-amber-50 text-sm md:text-base">
            <img src={assets.group_profiles} alt="Profiles" className="w-10" />
            <p>
              Browse a trusted list of certified doctors and schedule
              appointments effortlessly.
            </p>
          </div>

          <a
            href="#speciality"
            className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-amber-50 px-6 py-2 rounded-full font-semibold transition transform hover:scale-105 duration-300"
          >
            Book an Appointment
            <img src={assets.arrow_icon} alt="Arrow" className="w-4" />
          </a>
        </div>

        {/* Right Side (Image) */}
        <div className="flex-1">
          <img
            src="https://images.unsplash.com/photo-1589279003513-467d320f47eb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZG9jdG9yJTIwY29uc3VsdGF0aW9ufGVufDB8fDB8fHww"
            alt="Hero doctor"
            className="w-full h-auto rounded-xl shadow-xl object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default Header;
