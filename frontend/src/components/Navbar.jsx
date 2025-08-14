import React, { useState, useEffect } from "react";
import { FaPhoneAlt, FaTelegramPlane, FaWhatsapp, FaChevronDown, FaBars, FaTimes } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import logo from "../assets/educationlogo.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [navItems, setNavItems] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchNavItems = async () => {
      try {
        const { data } = await axios.get("/api/navigation");
        // Filter only top-level items (where parent is null)
        const topLevelItems = data.filter(item => item.parent === null);
        setNavItems(topLevelItems);
      } catch (error) {
        console.error("Error fetching navigation items:", error);
      }
    };

    fetchNavItems();
  }, []);

  // Helper function to get child items for a parent
  const getChildItems = (parentId, allItems) => {
    return allItems.filter(item => item.parent === parentId);
  };

  const isActive = (url) => {
    return location.pathname === url ? "text-red-600" : "hover:text-red-600";
  };

  return (
    <div className="w-full font-medium text-sm">
      {/* Top Header */}
      <div className="hidden md:block bg-white text-[#444] border-b border-gray-100 w-full">
        <div className="max-w-screen-xl mx-auto px-4 py-2 flex flex-col md:flex-row justify-between items-center gap-2">
          <div className="flex flex-wrap gap-4 items-center justify-center md:justify-start">
            <span className="flex items-center gap-1">
              <FaPhoneAlt className="text-red-500 text-xs" />
              1800 102 0336
            </span>
            <span className="flex items-center gap-1">
              <FaTelegramPlane className="text-red-500 text-xs" />
              info@edwiseinternational.com
            </span>
            <span className="flex items-center gap-1">
              <FaWhatsapp className="text-green-500 text-xs" />
              8600611333
            </span>
          </div>
          <Link to="/contact" className="text-blue-800 hover:underline">
            Contact Us
          </Link>
        </div>
      </div>

      <nav className="bg-[#fff6f6] text-[#1a237e] shadow-sm w-full">
        <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Edwise Logo" className="h-16 w-auto" />
            <div className="text-xl font-bold">
              <span className="text-red-600">ed</span>
              <span className="text-blue-900">wise</span>
              <p className="text-[10px] text-gray-600 tracking-wide leading-3 font-normal">
                WORLD EDUCATION CONSULTANTS
              </p>
            </div>
          </Link>

          <ul className="hidden md:flex items-center gap-6 text-sm">
            {navItems.map((item) => {
              const children = getChildItems(item._id, navItems);
              const hasChildren = children.length > 0;
              
              return (
                <li key={item._id} className="group relative">
                  <Link
                    to={item.url}
                    className={`flex items-center gap-1 ${isActive(item.url)}`}
                  >
                    {item.title}
                    {hasChildren && <FaChevronDown className="text-[10px] ml-1" />}
                  </Link>
                  {hasChildren && (
                    <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 hidden group-hover:block">
                      {children.map((child) => (
                        <Link
                          key={child._id}
                          to={child.url}
                          className={`block px-4 py-2 text-sm ${isActive(child.url)}`}
                        >
                          {child.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>

          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-2xl text-blue-900"
            >
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>

          <Link
            to="/admin/login"
            className="hidden md:flex items-center gap-2 text-sm font-semibold bg-yellow-50 text-blue-900 px-4 py-2 rounded-full shadow-sm hover:bg-yellow-100 transition"
          >
            Admin Login
          </Link>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden px-4 pb-4">
            <ul className="flex flex-col gap-3 text-sm">
              {navItems.map((item) => {
                const children = getChildItems(item._id, navItems);
                const hasChildren = children.length > 0;
                
                return (
                  <li key={item._id} className="border-b border-gray-100 pb-2">
                    <Link
                      to={item.url}
                      className={`block py-2 ${isActive(item.url)}`}
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.title}
                    </Link>
                    {hasChildren && (
                      <div className="pl-4 mt-2 space-y-2">
                        {children.map((child) => (
                          <Link
                            key={child._id}
                            to={child.url}
                            className={`block py-1 ${isActive(child.url)}`}
                            onClick={() => setMenuOpen(false)}
                          >
                            {child.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </li>
                );
              })}
              <li>
                <Link
                  to="/admin/login"
                  className="block w-full text-center py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                  onClick={() => setMenuOpen(false)}
                >
                  Admin Login
                </Link>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;