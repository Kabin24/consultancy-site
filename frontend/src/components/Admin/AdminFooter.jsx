import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const API_URL = "http://localhost:3000/api/footers";

const AdminFooter = () => {
  const navigate = useNavigate();
  const [footers, setFooters] = useState([]);
  const [form, setForm] = useState({ text: "", link: "" });
  const [editingId, setEditingId] = useState(null);

  const fetchFooters = async () => {
    const res = await axios.get(API_URL);
    setFooters(res.data);
  };

  useEffect(() => {
    fetchFooters();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await axios.put(`${API_URL}/${editingId}`, form);
    } else {
      await axios.post(API_URL, form);
    }
    setForm({ text: "", link: "" });
    setEditingId(null);
    fetchFooters();
  };

  const handleEdit = (footer) => {
    setForm({ text: footer.text, link: footer.link });
    setEditingId(footer._id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchFooters();
  };

  return (
    <div className="min-h-screen w-full bg-indigo-50 flex justify-center items-center p-6">
      <div className="max-w-5xl w-full p-8 bg-white rounded-xl shadow-lg">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-extrabold mb-8 text-center text-indigo-700">
            Manage Footers
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
            name="text"
            placeholder="Footer Text"
            value={form.text}
            onChange={handleChange}
            required
            className="flex-1 border border-gray-300 rounded-md px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          />
          <input
            name="link"
            placeholder="Footer Link"
            value={form.link}
            onChange={handleChange}
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
            {editingId ? "Update" : "Add"} Footer
          </button>
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setForm({ text: "", link: "" });
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
                  Text
                </th>
                <th className="py-3 px-6 text-left font-semibold text-indigo-700 border-b border-indigo-300">
                  Link
                </th>
                <th className="py-3 px-6 text-left font-semibold text-indigo-700 border-b border-indigo-300">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {footers.length === 0 ? (
                <tr>
                  <td
                    colSpan={3}
                    className="py-6 text-center text-gray-400 italic font-medium"
                  >
                    No footers found.
                  </td>
                </tr>
              ) : (
                footers.map((footer) => (
                  <tr
                    key={footer._id}
                    className="hover:bg-indigo-50 transition-colors"
                  >
                    <td className="py-4 px-6 border-b border-gray-100">
                      {footer.text}
                    </td>
                    <td className="py-4 px-6 border-b border-gray-100">
                      {footer.link}
                    </td>
                    <td className="py-4 px-6 border-b border-gray-100 space-x-3">
                      <button
                        onClick={() => handleEdit(footer)}
                        className="px-4 py-1 bg-yellow-400 hover:bg-yellow-500 text-white rounded-md shadow-sm transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(footer._id)}
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

export default AdminFooter;
