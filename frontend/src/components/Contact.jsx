import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import {
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  FaEnvelope,
  FaGithub,
} from "react-icons/fa";
import { toast } from "sonner";
import VedantImage from "../assets/Vedant_Image.jpeg"; // Add your image in assets folder
import Footer from "./Footer";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Integrate email service (EmailJS) here if needed
    toast.success("Message sent successfully!");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Profile Hero Section */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <img
          src={VedantImage}
          alt="Vedant Dagade"
          className="mx-auto rounded-full w-40 h-40 object-cover border-4 border-[#F83002]"
        />
        <h1 className="text-3xl font-bold mt-4">Vedant Dagade</h1>
        <p className="text-gray-600 mt-1">Founder & Developer | Pune, India</p>
        <p className="text-gray-600 mt-1">
          📞 +91 9970419171 | ✉️ vedantdagade21@gmail.com
        </p>
      </section>

      {/* Social & Professional Links */}
      <section className="flex justify-center gap-6 mt-4 text-3xl">
        <a
          href="https://www.linkedin.com/in/vedantdagade21"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-700 hover:text-[#0A66C2] transition-colors"
        >
          <FaLinkedin />
        </a>
        <a
          href="https://github.com/vedantdagade"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-700 hover:text-gray-900 transition-colors"
        >
          <FaGithub />
        </a>
        <a
          href="https://twitter.com/vedant_dagade21"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-700 hover:text-[#1DA1F2] transition-colors"
        >
          <FaTwitter />
        </a>
        <a
          href="https://instagram.com/vedant_dagade21"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-700 hover:text-[#E1306C] transition-colors"
        >
          <FaInstagram />
        </a>
        <a
          href="https://mail.google.com/mail/?view=cm&fs=1&to=vedantdagade21@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-700 hover:text-[#F83002] transition-colors"
        >
          <FaEnvelope />
        </a>
      </section>

      {/* Skills / Tech Stack */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Skills & Tech Stack
        </h2>
        <div className="flex flex-wrap justify-center gap-3">
          <span className="bg-[#F83002] text-white px-3 py-1 rounded-full text-sm">
            ReactJS
          </span>
          <span className="bg-gray-800 text-white px-3 py-1 rounded-full text-sm">
            NodeJS
          </span>
          <span className="bg-blue-700 text-white px-3 py-1 rounded-full text-sm">
            Redux Toolkit
          </span>
          <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm">
            MongoDB
          </span>
          <span className="bg-purple-700 text-white px-3 py-1 rounded-full text-sm">
            Firebase
          </span>
        </div>
      </section>

      {/* Contact Form */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-shrink-0">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">
          Send Me a Message
        </h2>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-md space-y-4"
        >
          <div>
            <label className="block font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#F83002]"
              required
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#F83002]"
              required
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700">Subject</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Subject"
              className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#F83002]"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              rows="5"
              className="mt-1 w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#F83002]"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-[#F83002] text-white font-bold px-6 py-2 rounded-lg hover:bg-[#c12a01] transition-colors w-full"
          >
            Send Message
          </button>
        </form>
      </section>

      {/* Footer */}
      <Footer/>
    </div>
  );
};

export default Contact;
