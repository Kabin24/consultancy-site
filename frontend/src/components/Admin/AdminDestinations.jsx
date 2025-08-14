import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiPlus, FiTrash2, FiSave, FiImage } from "react-icons/fi";
import { FaArrowLeft } from "react-icons/fa";

const API_URL = "http://localhost:3000";

const TopButtons = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center gap-4 py-4 bg-blue-50 shadow mb-8">
      <button
        className="px-4 py-2 bg-purple-600 text-white rounded-4xl font-semibold hover:bg-purple-700 transition"
        onClick={() => navigate("/admin/services")}
      >
        Services
      </button>
      <button
        className="px-4 py-2 bg-gray-700 text-white rounded-4xl  font-semibold hover:bg-gray-800 transition"
        onClick={() => navigate("/admin/footer")}
      >
        Footer
      </button>
    </div>
  );
};

const AdminDestinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch destinations from backend
  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const res = await fetch(`${API_URL}/api/destination`);
        const data = await res.json();
        setDestinations(data);
        console.log(data);
      } catch (err) {
        console.error("Failed to fetch destinations:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  // Handle title change
  const handleTitleChange = (index, value) => {
    const updated = [...destinations];
    updated[index].title = value;
    setDestinations(updated);
  };

  // Handle image upload
  const handleImageUpload = async (index, file) => {
    if (!file) return;
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch(`${API_URL}/api/upload-image`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      const updated = [...destinations];
      updated[index].image = data.imagePath;
      setDestinations(updated);
    } catch (err) {
      console.error("Image upload failed:", err);
    }
  };

  // Add new destination
  const addDestination = () => {
    setDestinations([
      ...destinations,
      { title: "", image: "/images/default.png" },
    ]);
  };

  // Delete a destination
  const deleteDestination = async (id) => {
    if (!id) {
      // New destination not saved yet
      setDestinations(destinations.filter((_, i) => i !== id));
      return;
    }

    try {
      await fetch(`${API_URL}/api/destination/${id}`, { method: "DELETE" });
      setDestinations(destinations.filter((dest) => dest._id !== id));
    } catch (err) {
      console.error("Failed to delete destination:", err);
    }
  };

  // Save all changes
  const saveChanges = async () => {
    try {
      await Promise.all(
        destinations.map((dest) =>
          fetch(`${API_URL}/api/destination`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dest),
          })
        )
      );
      alert("Destinations saved successfully!");
    } catch (err) {
      console.error("Failed to save destinations:", err);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64 text-xl font-semibold text-gray-600">
        Loading...
      </div>
    );

  return (
    <div className="p-8 max-w-5xl mx-auto bg-[#FFFFFF]">
      <div className="flex justify-between mb-6">
        <button
          onClick={() => navigate("/admin/dashboard")}
          className="flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-2xl text-gray-700 font-semibold transition"
        >
          <FaArrowLeft /> Back
        </button>
        <button
          onClick={addDestination}
          className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-full shadow-md hover:scale-105 hover:shadow-lg transition-all"
        >
          <FiPlus size={18} /> Add Destination
        </button>
      </div>

      <div className="space-y-8">
        {destinations.map((dest, index) => (
          <div
            key={dest._id || index}
            className="p-6 border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-shadow bg-white flex flex-col md:flex-row gap-6 items-center"
          >
            <div className="flex-shrink-0">
              <img
                src={`${API_URL}${
                  dest.image.startsWith("/") ? dest.image : "/" + dest.image
                }`}
                alt={dest.title || "Destination"}
                className="w-40 h-40 object-cover rounded-xl border border-gray-300 shadow-md"
              />
            </div>
            <div className="flex-1 w-full">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Title
              </label>
              <input
                type="text"
                value={dest.title}
                onChange={(e) => handleTitleChange(index, e.target.value)}
                className="border border-gray-300 p-2 w-full rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <label className="flex items-center gap-1 text-sm font-medium text-gray-600 mb-1">
                <FiImage /> Change Image
              </label>
              <input
                type="file"
                onChange={(e) => handleImageUpload(index, e.target.files[0])}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-all"
              />
            </div>
            <button
              onClick={() => deleteDestination(dest._id)}
              className="flex items-center gap-1 px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition"
              title="Delete Destination"
            >
              <FiTrash2 size={18} /> Delete
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-12">
        <button
          onClick={saveChanges}
          className="flex items-center gap-2 px-10 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full shadow-lg text-lg font-semibold hover:scale-105 hover:shadow-xl transition-all"
        >
          <FiSave size={20} /> Save Changes
        </button>
      </div>
    </div>
  );
};

export default AdminDestinations;
