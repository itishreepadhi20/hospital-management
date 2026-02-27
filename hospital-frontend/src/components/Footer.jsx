import React from "react";

const Footer = () => {
  return (
    <footer className="bg-blue-700 text-white mt-10">
      <div className="max-w-7xl mx-auto px-6 py-8 grid md:grid-cols-3 gap-8">
        
        {/* Hospital Info */}
        <div>
          <h2 className="text-lg font-semibold mb-3">
            Hospital Management
          </h2>
          <p className="text-sm text-gray-200">
            Providing quality healthcare services with advanced
            technology and experienced doctors.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-semibold mb-3">
            Quick Links
          </h2>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/" className="hover:text-gray-300 transition">
                Home
              </a>
            </li>
            <li>
              <a href="#patients" className="hover:text-gray-300 transition">
                Patients
              </a>
            </li>
            <li>
              <a href="#doctors" className="hover:text-gray-300 transition">
                Doctors
              </a>
            </li>
            <li>
              <a href="#appointments" className="hover:text-gray-300 transition">
                Appointments
              </a>
            </li>
            <li>
              <a href="#billing" className="hover:text-gray-300 transition">
                Billing
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h2 className="text-lg font-semibold mb-3">
            Contact Us
          </h2>
          <p className="text-sm text-gray-200">
            📍 Bhubaneswar, Odisha
          </p>
          <p className="text-sm text-gray-200">
            📞 +91 98765 43210
          </p>
          <p className="text-sm text-gray-200">
            ✉ hospital@email.com
          </p>
        </div>

      </div>

      {/* Bottom Section */}
      <div className="bg-blue-800 text-center py-3 text-sm">
        © {new Date().getFullYear()} Hospital Management. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;