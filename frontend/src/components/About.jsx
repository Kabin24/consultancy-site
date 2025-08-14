import React, { useState, useEffect } from "react";
import { FaUserTie, FaUserGraduate } from "react-icons/fa";

const API_URL = "http://localhost:3000";

const Aboutus = () => {
  const [aboutContent, setAboutContent] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/about?timestamp=${Date.now()}`
        );

        const data = await response.json();
        console.log("Fetched data:", data);
        setAboutContent(data);
      } catch (error) {
        console.error("Failed to fetch about content:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAbout();
  }, []);
  if (loading) return <div className="p-4 text-center">Loading...</div>;
  return (
    <section className="flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-12 bg-[#fff9f9]">
      <div className="w-full md:w-auto mb-10 md:mb-0 flex justify-center">
        <div className="max-w-[400px]">
          <img
            src="https://kiec.edu.np/wp-content/themes/yootheme/cache/91/kiec-brand-logo-91c37f0d.webp"
            className="w-full h-auto object-contain"
          />
        </div>
      </div>

      <div className="md:w-1/2">
        <h4 className="text-[#181516] font-semibold mb-2 underline decoration-[#E7000B]">
          About us
        </h4>
        <h2 className="text-3xl md:text-4xl font-bold text-[#E7000B] leading-tight mb-4">
          We always provide the best <br />
          <span className="text-[#193CB8]">features to Clients</span>
        </h2>
        <p className="text-gray-700 text-[16px] leading-relaxed tracking-wide text-justify mb-8">
          {aboutContent?.content}
        </p>

        <div className="flex flex-wrap gap-6 md:gap-10">
          <div className="flex items-center gap-3">
            <FaUserTie className="text-[#E7000B] text-3xl" />
            <p className="font-semibold text-black">
              Expert team <br />
              members
            </p>
          </div>

          <div className="flex items-center gap-3">
            <FaUserGraduate className="text-[#E7000B] text-3xl" />
            <p className="font-semibold text-black">
              Student <br />
              Opportunities
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Aboutus;
