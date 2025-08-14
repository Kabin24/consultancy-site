import React, { useEffect, useState } from "react";
import { FaTwitter, FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import logo from "../assets/educationlogo.png";
import axios from "axios";

const API_URL = "http://localhost:3000/api/footers";

const Footer = () => {
  const [footerLinks, setFooterLinks] = useState([]);

  useEffect(() => {
    const fetchFooters = async () => {
      try {
        const res = await axios.get(API_URL);
        setFooterLinks(res.data);
      } catch (err) {
        console.log(err);
        setFooterLinks([]);
      }
    };
    fetchFooters();
  }, []);

  return (
    <footer className="bg-[#fdfbf9] text-gray-800 pt-12 pb-6 px-6 md:px-20">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <img src={logo} alt="Edwise Logo" className="h-28" />
          </div>
          <h3 className="font-semibold mb-2">Follow us on</h3>
          <div className="flex space-x-4 text-red-600 text-xl">
            <FaTwitter />
            <FaFacebookF />
            <FaInstagram />
            <FaYoutube />
          </div>

          <div className="mt-6">
            <h4 className="font-semibold mb-2 text-[#193CB8]">
              Join our newsletter
            </h4>
            <p className="text-sm mb-2">
              We'll send you updates once per week. No spam
            </p>
            <div className="flex flex-col space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="p-2 border rounded-2xl focus:outline-none"
              />
              <button className="bg-red-600 text-white py-2 rounded-2xl hover:bg-red-700">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-bold mb-3 text-red-600">Important Links</h4>
          <ul className="space-y-1 text-sm cursor-pointer">
            {footerLinks.length > 0 ? (
              footerLinks.map(({ _id, text, link }) => (
                <li key={_id}>
                  {link ? (
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {text}
                    </a>
                  ) : (
                    text
                  )}
                </li>
              ))
            ) : (
              <li>Loading links...</li>
            )}
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-3 text-red-600">Study Destinations</h4>
          <ul className="space-y-1 text-sm"></ul>
        </div>

        <div>
          <h4 className="font-bold mb-3 text-red-600">Useful Links</h4>
          <ul className="space-y-1 text-sm"></ul>
        </div>

        <div>
          <h4 className="font-bold mb-3 text-red-600">Student Services</h4>
          <ul className="space-y-1 text-sm"></ul>
        </div>
      </div>

      <div className="mt-10 border-t pt-6 text-center text-sm text-black">
        <p>Copyright © 2025. Edwise International</p>
        <div className="flex justify-center gap-4 mt-2">
          <a href="#" className="hover:underline">
            Site Map
          </a>
          <a href="#" className="hover:underline">
            Privacy Policy
          </a>
          <a href="#" className="hover:underline">
            Terms & Conditions
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
