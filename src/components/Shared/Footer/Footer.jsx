// Footer.jsx
import React from "react";
import { Link } from "react-router";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaEnvelope,
  FaBullhorn,
  FaPaintBrush,
  FaUsers,
  FaQuestionCircle,
  FaHandsHelping,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white px-6 py-12 sm:px-8 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        {/* Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo + Newsletter */}
          <div>
            {/* Logo */}
            <h2 className="text-2xl font-extrabold text-[#B32346] mb-3">
              RED<span className="text-white">PULSE</span>
            </h2>
            <p className="text-sm text-gray-400 mb-4">
              A blood donation platform connecting donors with those in need.
            </p>

            <h3 className="text-lg font-semibold mb-3">
              Subscribe to our newsletter
            </h3>
            <form className="flex items-center gap-2">
              <input
                type="email"
                placeholder="Email address"
                className="w-full px-4 py-2 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#B32346]"
              />
              <button
                type="submit"
                className="bg-[#B32346] hover:bg-[#8f1d37] text-white px-4 py-2 rounded-md"
              >
                <FaEnvelope />
              </button>
            </form>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-center gap-2">
                <FaHandsHelping className="text-[#B32346]" />
                Blood Donation
              </li>
              <li className="flex items-center gap-2">
                <FaBullhorn className="text-[#B32346]" />
                Donation Campaigns
              </li>
              <li className="flex items-center gap-2">
                <FaPaintBrush className="text-[#B32346]" />
                Awareness Programs
              </li>
              <li className="flex items-center gap-2">
                <FaUsers className="text-[#B32346]" />
                Volunteer Support
              </li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li>Our Mission</li>
              <li>Why Donate Blood</li>
              <li>Our Team</li>
              <li>Careers</li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Help</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-center gap-2">
                <FaQuestionCircle className="text-[#B32346]" />
                FAQs
              </li>
              <li className="flex items-center gap-2">
                <FaEnvelope className="text-[#B32346]" />
                Contact Us
              </li>
            </ul>
          </div>
        </div>

        {/* CTA + Social */}
        <div className="mt-12 border-t border-gray-700 pt-8 flex flex-col lg:flex-row justify-between items-center gap-6">
          <div className="text-center lg:text-left">
            <p className="text-xl font-semibold mb-2">Ready to save a life?</p>
            <Link
              to="/donation-request"
              className="btn text-white bg-linear-to-br from-[#B32346] to-[#6A0B37]"
            >
              Donate Now
            </Link>
          </div>

          {/* Social Icons */}
          <div className="flex gap-5 text-xl">
            <a
              href="#"
              aria-label="Facebook"
              className="text-gray-400 hover:text-[#B32346] transition"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              aria-label="Twitter"
              className="text-gray-400 hover:text-[#B32346] transition"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="text-gray-400 hover:text-[#B32346] transition"
            >
              <FaInstagram />
            </a>
          </div>
        </div>

        {/* Legal */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <a href="#" className="hover:underline">
            Terms & Conditions
          </a>{" "}
          |{" "}
          <a href="#" className="hover:underline">
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
