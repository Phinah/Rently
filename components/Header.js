"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { FaHome, FaBars, FaTimes } from "react-icons/fa";
import { BsPersonCircle } from "react-icons/bs";
import { useUser } from "@/contexts/UserContexts";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user,logout } = useUser();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.pageYOffset > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 text-gray-800 border-b border-gray-200 ${
        isScrolled ? "shadow-md border-black" : ""
      }`}
      style={{ backgroundColor: isScrolled ? "rgba(222, 224, 250)" : "white" }}
      aria-label="Primary Navigation"
    >
      <div className="container mx-auto px-6 py-3 md:px-8 flex justify-between items-center">
        {/* Logo Section */}
        <div className="h-10 md:h-12 flex items-center">
          <a href="/" className="flex items-center" aria-label="Rently247 Home">
            <Image
              src="/logo.png"
              alt="Rently247"
              width={120}
              height={40}
              objectFit="contain"
            />
          </a>
        </div>

        {/* Navigation Links */}
        <nav
          className={`md:flex space-x-4 items-center hidden`}
          aria-label="Main Navigation"
        >
          {["List Your Property", "About"].map((item) => (
            <a
              key={item}
              href={`/${item
                .toLowerCase()
                .replace(" ", "-")
                .replace(" ", "-")}`}
              className={`text-sm font-medium transition-colors duration-300 hover:text-gray-700`}
            >
              {item}
            </a>
          ))}
         {!user ? (
          <div>
          <a
             href="/login"
             className={`py-2 px-4 text-sm font-medium rounded-md transition-colors duration-300 bg-gray-800 text-white hover:bg-gray-900`}
           >
             Log in
           </a>
           <a
             href="/signup"
             className={`py-2 px-4 ml-2 text-sm font-medium rounded-md border transition-colors duration-300 border-gray-800 text-gray-800 hover:bg-gray-200 ${
               isScrolled ? "border-gray-900" : ""
             }`}
           >
             Sign up
           </a>
          </div>
         ): (
          <div className="flex justify-between items-center gap-10 cursor-pointer"> 
            <div className="flex justify-center items-center gap-2">
            <BsPersonCircle size={30} />
            <span>{user?.firstName} {user?.lastName}</span>
            </div>
           <div>
           <button
              onClick={logout}
              className="py-2 px-4 text-sm font-medium rounded-md transition-colors duration-300 bg-gray-800 text-white hover:bg-gray-900"
            >
              Logout
            </button>
           </div>
          </div>
         )}
        </nav>
        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-gray-700 hover:text-gray-900 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg border-b border-gray-200 py-4">
          <nav aria-label="Mobile Navigation">
            <ul className="flex flex-col space-y-4 items-center px-6">
              {["List Your Property", "About"].map((item) => (
                <li key={item}>
                  <a
                    href={`/${item
                      .toLowerCase()
                      .replace(" ", "-")
                      .replace(" ", "-")}`}
                    className={`text-sm font-medium transition-colors duration-300 hover:text-gray-700`}
                  >
                    {item}
                  </a>
                </li>
              ))}
              <li className="w-[80%]">
                <a
                  href="/login"
                  className={`block w-full px-4 py-3 text-center text-sm font-medium rounded-md transition-colors duration-300 bg-gray-800 text-white hover:bg-gray-900`}
                >
                  Log in
                </a>
              </li>
              <li className="w-[80%]">
                <a
                  href="/signup"
                  className={`block w-full px-4 py-3 text-center text-sm font-medium rounded-md border transition-colors duration-300 border-gray-800 text-gray-800 hover:bg-gray-200 ${
                    isScrolled ? "border-gray-900" : ""
                  }`}
                >
                  Sign up
                </a>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
