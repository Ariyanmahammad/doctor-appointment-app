import React from "react";
import { FaHeartbeat, FaLaptopMedical, FaUserMd } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <section className="py-16 px-6 md:px-20 text-center bg-gradient-to-br from-blue-100 via-white to-green-100">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-blue-900">
          Welcome to Prescripto
        </h1>
        <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
          Your trusted digital healthcare partner — revolutionizing how
          prescriptions and appointments are managed with speed, security, and
          simplicity.
        </p>
      </section>

      {/* Our Story */}
      <section className="py-16 px-6 md:px-20 bg-white">
        <h2 className="text-3xl font-semibold mb-6 text-center text-blue-800">
          Our Story
        </h2>
        <p className="max-w-4xl mx-auto text-center text-gray-600 text-lg leading-relaxed">
          Born out of the need for faster and more accessible healthcare,{" "}
          <strong>Prescripto</strong> started as a small project aimed at
          connecting patients with doctors instantly. Today, we help thousands
          of users manage their prescriptions, book appointments, and access
          quality care — all from the comfort of their devices.
        </p>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-6 md:px-20 bg-gray-100">
        <h2 className="text-3xl font-semibold text-center text-blue-800 mb-10">
          Why Choose Prescripto?
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white p-6 cursor-pointer rounded-xl shadow-md hover:shadow-xl transition-all text-center">
            <FaLaptopMedical className="cursor-pointer text-4xl text-blue-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2 cursor-pointer">
              Digital Prescriptions
            </h3>
            <p className="text-gray-600">
              Get your prescriptions online with zero paperwork and full
              security.
            </p>
          </div>
          <div className="bg-white cursor-pointer p-6 rounded-xl shadow-md hover:shadow-xl transition-all text-center">
            <FaUserMd className="text-4xl text-green-500 mx-auto mb-4" />
            <h3 className="text-xl cursor-pointer font-semibold mb-2">
              Verified Doctors
            </h3>
            <p className="text-gray-600">
              Consult with certified doctors from top hospitals in minutes.
            </p>
          </div>
          <div className="bg-white cursor-pointer p-6 rounded-xl shadow-md hover:shadow-xl transition-all text-center">
            <FaHeartbeat className="text-4xl text-red-400 mx-auto mb-4" />
            <h3 className=" cursor-pointer text-xl font-semibold mb-2">
              24/7 Support
            </h3>
            <p className="text-gray-600">
              We’re here round-the-clock to help you with your health journey.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 md:px-20 bg-white text-gray-800">
        <h2 className="text-3xl font-semibold text-center text-blue-800 mb-6">
          Careers at Prescripto
        </h2>
        <p className="text-center max-w-3xl mx-auto mb-10 text-lg text-gray-600">
          We’re always looking for passionate minds to join our growing team. If
          you're driven by purpose and innovation in healthcare tech, let's
          build something amazing together.
        </p>
        <div className="text-center">
          <a
            href="mailto:careers@prescripto.com"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full font-medium hover:bg-blue-700 transition"
          >
            View Openings / Apply Now
          </a>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-16 px-6 md:px-20 bg-gradient-to-tr from-green-100 via-white to-blue-100 text-center">
        <h2 className="text-3xl font-bold mb-4 text-blue-900">
          Healthcare made simple.
        </h2>
        <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
          Join the thousands of users who trust Prescripto every day for
          managing their prescriptions and health records.
        </p>
        <button
          onClick={() => navigate("/login")}
          className="px-6 cursor-pointer py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition"
        >
          Get Started
        </button>
      </section>
    </div>
  );
};

export default About;
