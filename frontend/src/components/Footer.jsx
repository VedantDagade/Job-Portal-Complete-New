import React from "react";
import { FaLinkedin, FaTwitter, FaInstagram, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Brand */}
          <div>
            <h1 className="text-2xl font-bold text-white">
              Job <span className="text-[#F83002]">Portal</span>
            </h1>
            <p className="mt-2 text-sm text-gray-400">
              Helping you find the right opportunities with ease and speed.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-lg font-semibold text-white mb-3">
              Quick Links
            </h2>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#home" className="hover:text-[#F83002]">
                  Home
                </a>
              </li>
              <li>
                <a href="#jobs" className="hover:text-[#F83002]">
                  Jobs
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-[#F83002]">
                  About
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-[#F83002]">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h2 className="text-lg font-semibold text-white mb-3">
              Connect With Me
            </h2>
            <div className="flex justify-center md:justify-start gap-5 text-xl">
              <a
                href="https://www.linkedin.com/in/vedantdagade21"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#0A66C2] transition-colors"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://twitter.com/vedant_dagade21"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#1DA1F2] transition-colors"
              >
                <FaTwitter />
              </a>
              <a
                href="https://instagram.com/vedant_dagade21"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#E1306C] transition-colors"
              >
                <FaInstagram />
              </a>
              <a
                href="mailto:vedantdagade21@gmail.com"
                className="hover:text-[#F83002] transition-colors"
              >
                <FaEnvelope />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Job Portal. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
