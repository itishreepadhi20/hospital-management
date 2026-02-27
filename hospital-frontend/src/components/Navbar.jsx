import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-green-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        
        {/* Logo */}
        <h1 className="text-xl font-bold">
          Hospital Management
        </h1>

        {/* Navigation Links */}
        <ul className="hidden md:flex space-x-6 font-medium">
          <li>
            <a href="/" className="hover:text-gray-200 transition duration-300">
              Home
            </a>
          </li>
          <li>
            <a href="#dashboard" className="hover:text-gray-200 transition duration-300">
              Dashboard
            </a>
          </li>
          <li>
            <a href="#patients" className="hover:text-gray-200 transition duration-300">
              Patients
            </a>
          </li>
          <li>
            <a href="#doctors" className="hover:text-gray-200 transition duration-300">
              Doctors
            </a>
          </li>
          <li>
            <a href="#appointments" className="hover:text-gray-200 transition duration-300">
              Appointments
            </a>
          </li>
          <li>
            <a href="#billing" className="hover:text-gray-200 transition duration-300">
              Billing
            </a>
          </li>
        </ul>

        {/* Login Button */}
        <div>
          <a
            href="#login"
            className="bg-white text-black px-4 py-1 rounded-md font-semibold hover:bg-gray-200 transition duration-300"
          >
            Login
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;