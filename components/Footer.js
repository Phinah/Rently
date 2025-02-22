"use client";

import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-primary text-white py-12">
      <div className="container mx-auto px-6 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start">
          {/* Logo and Social Links */}
          <div className="mb-8 md:mb-0 text-center md:text-left">
            <h1 className="text-2xl font-bold text-blue-300 mb-4">RENTLY247</h1>
            <div className="flex justify-center md:justify-start space-x-5 text-white">
              <a href="#" aria-label="Facebook" className="hover:text-blue-300">
                <FaFacebook size={20} />
              </a>
              <a href="#" aria-label="Twitter" className="hover:text-blue-300">
                <FaTwitter size={20} />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="hover:text-blue-300"
              >
                <FaInstagram size={20} />
              </a>
              <a href="#" aria-label="YouTube" className="hover:text-blue-300">
                <FaYoutube size={20} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-12 text-center md:text-left">
            <div>
              <h3 className="text-blue-300 font-semibold mb-3">COMPANY</h3>
              <ul className="space-y-3">
                <li>
                  <a href="/about" className="hover:text-blue-300">
                    About
                  </a>
                </li>
                <li>
                  <a href="/newsletter" className="hover:text-blue-300">
                    Newsletter
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-blue-300 font-semibold mb-3">SUPPORT</h3>
              <ul className="space-y-3">
                <li>
                  <a href="/contact" className="hover:text-blue-300">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="/faq" className="hover:text-blue-300">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-blue-300 font-semibold mb-3">LEASING</h3>
              <ul className="space-y-3">
                <li>
                  <a href="/list-your-property" className="hover:text-blue-300">
                    List your property
                  </a>
                </li>
                <li>
                  <a href="/lease-responsibly" className="hover:text-blue-300">
                    Lease responsibly
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 text-center text-sm text-gray-400">
          <p>© 2024 Rently247. All rights reserved</p>
          <div className="flex justify-center space-x-5 mt-3">
            <a href="/privacy-policy" className="hover:text-blue-300">
              Privacy policy
            </a>
            <span>|</span>
            <a href="/terms-conditions" className="hover:text-blue-300">
              Terms and Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
