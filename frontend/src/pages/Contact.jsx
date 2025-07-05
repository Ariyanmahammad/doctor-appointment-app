import React from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="bg-gray-50 min-h-screen text-gray-800">
      {/* Header Section */}
      <section className="bg-gradient-to-r from-blue-100 via-white to-green-100 py-16 px-6 md:px-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
          Get in Touch
        </h1>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          We'd love to hear from you! Whether you have a question, feedback, or
          a partnership proposal — our team is ready to help.
        </p>
      </section>

      {/* Contact Content */}
      <section className="py-16 px-6 md:px-20 grid md:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-6 text-blue-800">
            Send Us a Message
          </h2>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <textarea
              rows="5"
              placeholder="Your Message"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            ></textarea>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col justify-center">
          <h2 className="text-2xl font-semibold mb-6 text-blue-800">
            Contact Information
          </h2>
          <div className="space-y-6 text-lg">
            <div className="flex items-center gap-4">
              <FaPhoneAlt className="text-blue-600" />
              <span>+91 98765 43210</span>
            </div>
            <div className="flex items-center gap-4">
              <FaEnvelope className="text-blue-600" />
              <span>support@prescripto.com</span>
            </div>
            <div className="flex items-center gap-4">
              <FaMapMarkerAlt className="text-blue-600" />
              <span>Kolkata, West Bengal, India</span>
            </div>
          </div>
        </div>
      </section>

      {/* Optional Map Placeholder */}
      <section className="px-6 md:px-20 pb-20">
        <div className="w-full h-64 bg-gray-300 rounded-xl flex items-center justify-center text-gray-600 text-lg italic">
          [Google Maps Location Placeholder]
        </div>
      </section>
    </div>
  );
};

export default Contact;
