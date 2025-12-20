// Footer.jsx
import React from "react";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white px-6 py-10 sm:px-8 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold mb-4">
            Subscribe to our newsletter
          </h3>
          <form className="flex items-center gap-2">
            <input
              type="email"
              placeholder="Email address"
              className="w-full px-4 py-2 rounded-md bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <button
              type="submit"
              className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-md"
            >
              →
            </button>
          </form>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Services</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>Email Marketing</li>
            <li>Campaigns</li>
            <li>Branding</li>
            <li>Offline</li>
          </ul>
        </div>

        {/* About */}
        <div>
          <h3 className="text-lg font-semibold mb-4">About</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>Our Story</li>
            <li>Benefits</li>
            <li>Team</li>
            <li>Careers</li>
          </ul>
        </div>

        {/* Help */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Help</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>FAQs</li>
            <li>Contact Us</li>
          </ul>
        </div>
      </div>

      {/* CTA and Social */}
      <div className="mt-10 border-t border-gray-700 pt-8 flex flex-col lg:flex-row justify-between items-center gap-6">
        <div className="text-center lg:text-left">
          <p className="text-xl font-semibold mb-2">Ready to get started?</p>
          <Link
            to="/donation-request"
            className="btn text-[#B32346] bg-[#6A0B37]/20 dark:text-white dark:bg-linear-to-br from-[#B32346]/70 to-[#6A0B37]/70"
          >
            Donate Now
          </Link>
        </div>

        <div className="flex gap-4">
          <a
            href="#"
            aria-label="Facebook"
            className="text-gray-400 hover:text-white"
          >
            FB
          </a>
          <a
            href="#"
            aria-label="Twitter"
            className="text-gray-400 hover:text-white"
          >
            TW
          </a>
          <a
            href="#"
            aria-label="Instagram"
            className="text-gray-400 hover:text-white"
          >
            IG
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
    </footer>
  );
};

export default Footer;
