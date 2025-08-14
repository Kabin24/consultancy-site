import React from "react";
import {
  FaMapMarkerAlt,
  FaRoute,
  FaUniversity,
  FaPassport,
} from "react-icons/fa";

export default function Whyedu() {
  return (
    <div className="bg-[#E7000B] text-white py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
        {/* Left Text */}
        <div className="md:w-1/2 space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold text-[#39f0e3]">
            Why to choose <span className="lowercase">edwise</span>
            <span className="text-[#39f0e3]">o</span>
          </h2>
          <p className="text-gray-200 text-base leading-relaxed">
            Like you, a remarkable number of international students from across
            the world, from diverse backgrounds, have achieved their education
            and career goals in Australia successfully through us. Our ethical,
            accurate & friendly guidance in the last 15 years has been the
            recipe. Now, it's your turn. Tell us your dreams, we will get you
            there.
          </p>
        </div>

        {/* Right Icons */}
        <div className="md:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-8 text-center">
          <div className="flex flex-col items-center">
            <div className="bg-[#39f0e3] text-[#160153] rounded-full p-4 text-3xl">
              <FaMapMarkerAlt />
            </div>
            <p className="mt-4 font-bold">Located in 15 Countries</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="bg-[#39f0e3] text-[#160153] rounded-full p-4 text-3xl">
              <FaRoute />
            </div>
            <p className="mt-4 font-bold">End to End Services</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="bg-[#39f0e3] text-[#160153] rounded-full p-4 text-3xl">
              <FaUniversity />
            </div>
            <p className="mt-4 font-bold">750+ Partner Institutions</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="bg-[#39f0e3] text-[#160153] rounded-full p-4 text-3xl">
              <FaPassport />
            </div>
            <p className="mt-4 font-bold">High Visa Success Rate</p>
          </div>
        </div>
      </div>
    </div>
  );
}
