import React, { useEffect, useState } from "react";

const API_URL = "http://localhost:3000";

const Destination = () => {
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/api/destination`)
      .then((res) => res.json())
      .then((data) => setDestinations(data));
  }, []);

  return (
    <div className="px-25 py-20 min-h-screen bg-[#FFF9F9] ">
      <h1 className="text-3xl font-extrabold mb-10 text-center text-[#193CB8] ">
        Destinations For Abroad Study
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {destinations.map((dest, idx) => (
          <div
            key={idx}
            className="rounded-2xl overflow-hidden bg-white shadow-xl hover:shadow-2xl transition-shadow duration-300 flex flex-col"
          >
            <div className="flex-1">
              <img
                src={`${API_URL}${dest.image}`}
                alt={dest.title}
                className="w-full h-64 object-cover"
              />
            </div>
            <div className="p-4 flex justify-center items-center">
              <h2 className="text-xl font-bold text-[#193CB8] text-center">
                {dest.title}
              </h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Destination;
