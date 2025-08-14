import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";
import NotFound from "../pages/NotFound";

const ProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("adminToken");

      if (!token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      try {
        axios.defaults.headers.common["x-auth-token"] = token;
        await axios.get("http://localhost:3000/api/admin/verify");
        setIsAuthenticated(true);
      } catch (err) {
        console.error("Authentication error:", err);
        localStorage.removeItem("adminToken");
        delete axios.defaults.headers.common["x-auth-token"];
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <NotFound />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
