import React from "react";
import { Link } from "react-router-dom";
import {
  FiMap,
  FiSettings,
  FiGlobe,
  FiUsers,
  FiFileText,
  FiPieChart,
} from "react-icons/fi";

const AdminDashboard = () => {
  const stats = [
    {
      name: "Total Destinations",
      value: "24",
      change: "+4",
      changeType: "positive",
    },
    {
      name: "Active Services",
      value: "12",
      change: "+2",
      changeType: "positive",
    },
    {
      name: "Pending Updates",
      value: "3",
      change: "-1",
      changeType: "negative",
    },
    { name: "Admin Users", value: "5", change: "0", changeType: "neutral" },
  ];

  const cards = [
    {
      title: "Destinations",
      description: "Manage travel destinations",
      icon: <FiMap className="h-6 w-6 text-indigo-600" />,
      link: "/admin/destinations",
    },
    {
      title: "Services",
      description: "Update offered services",
      icon: <FiSettings className="h-6 w-6 text-green-600" />,
      link: "/admin/services",
    },
    {
      title: "Footer Content",
      description: "Edit footer links",
      icon: <FiFileText className="h-6 w-6 text-blue-600" />,
      link: "/admin/footer",
    },
    {
      title: "Navigation",
      description: "Manage navigation items",
      icon: <FiUsers className="h-6 w-6 text-yellow-600" />,
      link: "/admin/navigation",
    },
    {
      title: "About Page",
      description: "Update company info",
      icon: <FiGlobe className="h-6 w-6 text-purple-600" />,
      link: "/admin/about",
    },
    {
      title: "Analytics",
      description: "View statistics",
      icon: <FiPieChart className="h-6 w-6 text-red-600" />,
      link: "/admin/analytics",
    },
  ];

  return (
    <div className="min-h-screen backdrop-blur-lg bg-[#F3F4F6] px-6 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="backdrop-blur-lg bg-white/80 rounded-2xl p-5 shadow-md hover:shadow-lg transition"
          >
            <p className="text-sm font-medium text-gray-500">{stat.name}</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">
              {stat.value}
            </p>
            <span
              className={`text-sm font-semibold ${
                stat.changeType === "positive"
                  ? "text-green-600"
                  : stat.changeType === "negative"
                  ? "text-red-600"
                  : "text-gray-500"
              }`}
            >
              {stat.change}
            </span>
          </div>
        ))}
      </div>

      {/* Management Cards */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Content Management
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {cards.map((card) => (
          <div
            key={card.title}
            className="backdrop-blur-xl bg-white/80 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition transform p-6"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gray-100 rounded-xl">{card.icon}</div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  {card.title}
                </h3>
                <p className="text-sm text-gray-500">{card.description}</p>
              </div>
            </div>
            <Link
              to={card.link}
              className="mt-5 inline-block w-full text-center py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              Manage {card.title}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
