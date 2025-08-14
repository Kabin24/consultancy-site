import React, { useEffect, useState } from "react";
import {
  FaBookOpen,
  FaUniversity,
  FaUserTie,
  FaGraduationCap,
  FaMoneyBillWave,
  FaArrowRight,
} from "react-icons/fa";
import axios from "axios";

const iconMap = {
  "Test Preparation": <FaBookOpen className="text-[#E7000B] text-3xl" />,
  "Admission Guidance": <FaUniversity className="text-[#E7000B] text-3xl" />,
  "Career Counseling": <FaUserTie className="text-[#E7000B] text-3xl" />,
  "Popular Courses": <FaGraduationCap className="text-[#E7000B] text-3xl" />,
  "Finance & Scholarships": (
    <FaMoneyBillWave className="text-[#E7000B] text-3xl" />
  ),
};

const API_URL = "http://localhost:3000/api/services";

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const res = await axios.get(API_URL);
        setServices(res.data);
        setError(null);
      } catch (error) {
        console.log("Failed to fetch services:", error);
        setServices([]);
        setError("Failed to load services.");
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  if (loading) {
    return (
      <section className="px-6 md:px-20 py-20 bg-gradient-to-b from-[#FFF9F9] to-white text-center">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-12 w-64 bg-gray-200 rounded-full mb-6"></div>
            <div className="h-4 w-80 bg-gray-200 rounded-full mb-16"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white p-6 rounded-xl shadow-sm h-40">
                  <div className="flex gap-4">
                    <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
                    <div className="flex-1 space-y-3">
                      <div className="h-5 w-3/4 bg-gray-200 rounded"></div>
                      <div className="h-4 bg-gray-200 rounded"></div>
                      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="px-6 md:px-20 py-20 bg-gradient-to-b from-[#FFF9F9] to-white text-center">
        <div className="max-w-6xl mx-auto bg-white p-8 rounded-xl shadow-sm">
          <p className="text-lg font-semibold text-red-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-[#193CB8] text-white rounded-lg hover:bg-[#152E8F] transition-colors"
          >
            Retry
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="px-6 md:px-20 py-20 bg-gradient-to-b from-[#FFF9F9] to-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#193CB8] mb-4 tracking-tight">
            Our Comprehensive Services
          </h1>
          <div className="relative inline-block">
            <p className="text-gray-700 text-lg max-w-3xl mx-auto">
              Tailored services to guide your educational journey and global
              goals.
            </p>
            <div className="absolute bottom-0 left-0 w-full h-2 bg-[#E7000B] opacity-20 -z-0"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <div className="bg-white p-8 rounded-xl shadow-sm">
                <p className="text-gray-500 italic text-lg">
                  No services available at the moment. Please check back later.
                </p>
              </div>
            </div>
          ) : (
            services.map((service, index) => (
              <div
                key={service._id || index}
                className="group relative bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100 hover:border-[#E7000B]/20"
              >
                <div className="p-6">
                  <div className="flex items-start gap-5">
                    <div className="p-3 bg-[#E7000B]/10 rounded-lg">
                      {iconMap[service.name] || (
                        <FaBookOpen className="text-[#E7000B] text-3xl" />
                      )}
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-[#E7000B] transition-colors">
                        {service.name}
                      </h2>
                      <p className="text-gray-600 text-sm leading-relaxed mb-4">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="px-6 pb-4">
                  <button
                    className="flex items-center gap-2 text-[#193CB8] font-medium text-sm group-hover:text-[#E7000B] transition-colors"
                    aria-label={`Learn more about ${service.name}`}
                  >
                    <span>Discover more</span>
                    <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#193CB8] to-[#E7000B] opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            ))
          )}
        </div>

        {services.length > 0 && (
          <div className="text-center mt-16">
            <button className="px-8 py-3 bg-gradient-to-r from-[#193CB8] to-[#E7000B] text-white font-medium rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105">
              Explore All Services
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Services;
