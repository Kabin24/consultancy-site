import React from "react";
import { FaArrowRight } from "react-icons/fa";

export default function LandingPage() {
  return (
    <div className="min-w-screen bg-[#fff9f9] flex items-center justify-center px-6 py-10">
      <div className="max-w-6xl w-full bg-[#FFF9F9] rounded-2xl md:p-16 p-6 flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="md:w-1/2 space-y-6 text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-snug">
            <span className="text-red-600 font-extrabold">Empowering</span>
            <br />
            <span className="text-blue-800">
              Students for Global Education Success
            </span>
          </h1>

          <p className="text-gray-500 text-base md:text-lg">
            Ready to take your education abroad? Our expert consultants are here
            to guide you through every step.
          </p>

          <button className="bg-red-800 text-white px-6 py-3 rounded-full font-medium hover:bg-red-700 transition flex items-center justify-center gap-2 mx-auto md:mx-0">
            Meet a Consultant
            <FaArrowRight />
          </button>
        </div>

        <div className="md:w-1/2 relative flex justify-center items-center h-[500px] w-full">
          <div className="absolute top-0 right-0 w-48 sm:w-56 md:w-64 h-56 sm:h-64 rounded-2xl overflow-hidden shadow-lg">
            <img
              src="https://icccedu.b-cdn.net/wp-content/uploads/2022/09/Nepalese-students-2.webp"
              className="w-full h-full object-cover"
              alt="Students"
            />
          </div>

          <div className="absolute top-28 left-0 w-44 sm:w-52 md:w-60 h-56 sm:h-64 rounded-2xl overflow-hidden shadow-lg">
            <img
              src="https://t4.ftcdn.net/jpg/05/25/50/67/240_F_525506740_fmR5uWnmtIDi2MLmLFQ0X6drPS2k7gf8.jpg"
              className="w-full h-full object-cover"
              alt="Students 2"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
