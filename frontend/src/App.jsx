import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import axios from "axios";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AdminLogin from "./pages/AdminLogin";
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Aboutus from "./components/About";
import Destination from "./components/Destination";
import Services from "./components/Services";
import LandingPage from "./components/Homepage";
import AdminDestinations from "./components/Admin/AdminDestinations";
import AdminFooter from "./components/Admin/AdminFooter";
import Adminservice from "./components/Admin/Adminservice";
import NavManager from "./components/Admin/NavigationManager";
import NotFound from "./pages/NotFound";

axios.defaults.baseURL = "http://localhost:3000";

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      config.headers["x-auth-token"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

function HomePageAll() {
  return (
    <>
      <Navbar />
      <LandingPage />
      <Aboutus />
      <Services />
      <Destination />
      <Footer />
    </>
  );
}

function App() {
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      axios.defaults.headers.common["x-auth-token"] = token;
    }
  }, []);

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePageAll />} />
            <Route path="/destination" element={<Destination />} />

            {/* Admin Auth Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* Protected Admin Routes */}
            <Route element={<ProtectedRoute />}>
              <Route element={<AdminLayout />}>
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route
                  path="/admin/destinations"
                  element={<AdminDestinations />}
                />
                <Route path="/admin/services" element={<Adminservice />} />
                <Route path="/admin/footer" element={<AdminFooter />} />
                <Route path="/admin/navigation" element={<NavManager />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
