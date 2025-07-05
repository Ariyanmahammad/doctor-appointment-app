import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <footer className="bg-[#0A0F2C] text-white pt-12 pb-6 px-6 md:px-20">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row justify-between gap-10 max-w-7xl mx-auto">
        {/* Logo & Description */}
        <div className="md:w-1/3">
          <img src={assets.logo} alt="Logo" className="w-36 mb-4" />
          <p className="text-sm text-gray-400 leading-relaxed">
            Prescripto is your trusted platform to book appointments with verified doctors across various specialities. Your health is our priority.
          </p>
        </div>

        {/* Company Links */}
        <div className="md:w-1/4">
          <h3 className="text-lg font-semibold mb-4">Company</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="cursor-pointer hover:text-white transition duration-300">
              Home
            </li>
            <li className="cursor-pointer hover:text-white transition duration-300">
              About Us
            </li>
            <li className="cursor-pointer hover:text-white transition duration-300">
              Contact Us
            </li>
            <li className="cursor-pointer hover:text-white transition duration-300">
              Privacy Policy
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="md:w-1/4">
          <h3 className="text-lg font-semibold mb-4">Get in Touch</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>
              <strong>Phone:</strong> +91 98765 43210
            </li>
            <li>
              <strong>Email:</strong> support@prescripto.com
            </li>
            <li>
              <strong>Address:</strong> Kolkata, West Bengal, India
            </li>
          </ul>
        </div>
      </div>

      {/* Divider & Bottom */}
      <div className="border-t border-gray-700 mt-12 pt-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Prescripto. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
