import React from "react";
import Navbar from "./shared/Navbar";
import { FaLinkedin, FaTwitter, FaInstagram, FaEnvelope } from "react-icons/fa";
import VedantImage from "../assets/Vedant_Image.jpeg"
import Footer from "./Footer";

const About = () => {
  return (
    <div id="about" className="bg-gray-50 min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center flex-shrink-0">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">
          About <span className="text-[#F83002]">Job Portal</span>
        </h1>
        <p className="mt-4 text-gray-600 text-base sm:text-lg">
          Helping job seekers and recruiters connect efficiently and
          effectively.
        </p>
      </section>

      {/* Mission & Vision */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-2 gap-10 flex-shrink-0">
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            Our Mission
          </h2>
          <p className="text-gray-600">
            To empower individuals and companies by simplifying the job search
            and recruitment process with modern technology.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            Our Vision
          </h2>
          <p className="text-gray-600">
            To become the most trusted platform for connecting talent with
            opportunities across industries.
          </p>
        </div>
      </section>

      {/* Founder Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center flex-shrink-0">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Founder & Developer
        </h2>
        <div className="flex flex-col items-center gap-4">
          <img
            src={VedantImage}
            alt="Vedant Dagade"
            className="rounded-full w-50 h-50 object-cover"
          />
          <h3 className="text-2xl font-semibold text-gray-800">
            Vedant Dagade
          </h3>
          <p className="text-gray-600">Founder & Developer</p>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-[#F83002] text-white py-12 flex-shrink-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Join our platform today
          </h2>
          <p className="mb-6 text-sm sm:text-base">
            Find your dream job or hire the best talent with Job Portal.
          </p>
          <a
            href="/signup"
            className="bg-white text-[#F83002] font-bold px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Get Started
          </a>
        </div>
      </section>

      {/* Footer Section */}
      <Footer/>
    </div>
  );
};

export default About;
