import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
const API_URL = "http://localhost:3000/api/services";

const Adminservice = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [form, setForm] = useState({ name: "", description: "" });
  const [editingId, setEditingId] = useState(null);

  // Fetch all services
  const fetchServices = async () => {
    const res = await axios.get(API_URL);
    setServices(res.data);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // Handle form input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add or update service
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await axios.put(`${API_URL}/${editingId}`, form);
    } else {
      await axios.post(API_URL, form);
    }
    setForm({ name: "", description: "" });
    setEditingId(null);
    fetchServices();
  };

  // Edit service
  const handleEdit = (service) => {
    setForm({ name: service.name, description: service.description });
    setEditingId(service._id);
  };

  // Delete service
  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchServices();
  };

  return (
    <div className="min-h-screen w-full bg-indigo-50 flex justify-center items-center p-6">
      <div className="max-w-5xl w-full p-8 bg-white rounded-xl shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-extrabold mb-8 text-center text-indigo-700">
            Manage Services
          </h2>
          <button
            onClick={() => navigate("/admin/dashboard")}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-2xl text-gray-700 font-semibold transition flex items-center gap-2"
          >
            <FaArrowLeft />
            Back
          </button>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:flex-row gap-6 items-center mb-10"
        >
          <input
            name="name"
            placeholder="Service Name"
            value={form.name}
            onChange={handleChange}
            required
            className="flex-1 border border-gray-300 rounded-md px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          />
          <input
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            required
            className="flex-2 border border-gray-300 rounded-md px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          />
          <button
            type="submit"
            className={`px-6 py-3 rounded-md text-white font-semibold shadow-md transition ${
              editingId
                ? "bg-yellow-500 hover:bg-yellow-600 shadow-yellow-400/50"
                : "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-400/50"
            }`}
          >
            {editingId ? "Update" : "Add"} Service
          </button>
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setForm({ name: "", description: "" });
              }}
              className="px-6 py-3 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold shadow-md transition"
            >
              Cancel
            </button>
          )}
        </form>

        <div className="overflow-x-auto rounded-md border border-gray-200 shadow-sm">
          <table className="min-w-full bg-white">
            <thead className="bg-indigo-100">
              <tr>
                <th className="py-3 px-6 text-left font-semibold text-indigo-700 border-b border-indigo-300">
                  Name
                </th>
                <th className="py-3 px-6 text-left font-semibold text-indigo-700 border-b border-indigo-300">
                  Description
                </th>
                <th className="py-3 px-6 text-left font-semibold text-indigo-700 border-b border-indigo-300">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {services.length === 0 ? (
                <tr>
                  <td
                    colSpan={3}
                    className="py-6 text-center text-gray-400 italic font-medium"
                  >
                    No services found.
                  </td>
                </tr>
              ) : (
                services.map((service) => (
                  <tr
                    key={service._id}
                    className="hover:bg-indigo-50 transition-colors"
                  >
                    <td className="py-4 px-6 border-b border-gray-100">
                      {service.name}
                    </td>
                    <td className="py-4 px-6 border-b border-gray-100">
                      {service.description}
                    </td>
                    <td className="py-4 px-6 border-b border-gray-100 space-x-3">
                      <button
                        onClick={() => handleEdit(service)}
                        className="px-4 py-1 bg-yellow-400 hover:bg-yellow-500 text-white rounded-md shadow-sm transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(service._id)}
                        className="px-4 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md shadow-sm transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Adminservice;
