import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaArrowLeft } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function NavManager() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({ title: "", url: "", order: 0 });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchNavItems();
  }, []);

  const fetchNavItems = async () => {
    const { data } = await axios.get("/api/navigation");
    setItems(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`/api/navigation/${editingId}`, formData);
      } else {
        await axios.post("/api/navigation", formData);
      }
      setFormData({ title: "", url: "#", order: 0 });
      setEditingId(null);
      fetchNavItems();
    } catch (error) {
      console.error("Error saving navigation item:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this item?")) {
      await axios.delete(`/api/navigation/${id}`);
      fetchNavItems();
    }
  };

  return (
    <div className="min-h-screen w-full bg-indigo-50 flex justify-center items-center p-6">
      <div className="max-w-5xl w-full p-8 bg-white rounded-xl shadow-lg">
        {/* Title & Back button */}
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-extrabold mb-8 text-center text-indigo-700">
            Manage Navigation
          </h2>
          <button
            onClick={() => navigate("/admin/dashboard")}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-2xl text-gray-700 font-semibold transition flex items-center gap-2"
          >
            <FaArrowLeft />
            Back
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:flex-row gap-6 items-center mb-10"
        >
          <input
            type="text"
            placeholder="Title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="flex-1 border border-gray-300 rounded-md px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            required
          />
          <input
            type="text"
            placeholder="URL"
            value={formData.url}
            onChange={(e) => setFormData({ ...formData, url: e.target.value })}
            className="flex-1 border border-gray-300 rounded-md px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          />
          <button
            type="submit"
            className={`px-6 py-3 rounded-md text-white font-semibold shadow-md transition ${
              editingId
                ? "bg-yellow-500 hover:bg-yellow-600 shadow-yellow-400/50"
                : "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-400/50"
            }`}
          >
            {editingId ? "Update" : "Add"} Item
          </button>
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setFormData({ title: "", url: "#", order: 0 });
                setEditingId(null);
              }}
              className="px-6 py-3 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold shadow-md transition"
            >
              Cancel
            </button>
          )}
        </form>

        {/* Table */}
        <div className="overflow-x-auto rounded-md border border-gray-200 shadow-sm">
          <table className="min-w-full bg-white">
            <thead className="bg-indigo-100">
              <tr>
                <th className="py-3 px-6 text-left font-semibold text-indigo-700 border-b border-indigo-300">
                  Title
                </th>
                <th className="py-3 px-6 text-left font-semibold text-indigo-700 border-b border-indigo-300">
                  URL
                </th>
                <th className="py-3 px-6 text-left font-semibold text-indigo-700 border-b border-indigo-300">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 ? (
                <tr>
                  <td
                    colSpan={3}
                    className="py-6 text-center text-gray-400 italic font-medium"
                  >
                    No navigation items found.
                  </td>
                </tr>
              ) : (
                items.map((item) => (
                  <tr
                    key={item._id}
                    className="hover:bg-indigo-50 transition-colors"
                  >
                    <td className="py-4 px-6 border-b border-gray-100">
                      {item.title}
                    </td>
                    <td className="py-4 px-6 border-b border-gray-100">
                      {item.url}
                    </td>
                    <td className="py-4 px-6 border-b border-gray-100 space-x-3">
                      <button
                        onClick={() => {
                          setFormData({
                            title: item.title,
                            url: item.url,
                            order: item.order,
                          });
                          setEditingId(item._id);
                        }}
                        className="px-4 py-1 bg-yellow-400 hover:bg-yellow-500 text-white rounded-md shadow-sm transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
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
}
