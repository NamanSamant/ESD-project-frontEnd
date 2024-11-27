import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/navbar";
import Login from "./pages/login";
import ViewOrganizations from "./pages/ViewOrganizations";
import CreateOrganization from "./pages/CreateOrganization";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Persist login state using local storage
  useEffect(() => {
    const token = localStorage.getItem("employeeToken");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  // Login handler
  const handleLogin = (token) => {
    localStorage.setItem("employeeToken", token); // Save token in local storage
    setIsLoggedIn(true); // Update state
  };

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("employeeToken"); // Clear token from local storage
    setIsLoggedIn(false); // Update state
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-100">
        {isLoggedIn && <Navbar handleLogout={handleLogout} />}
        <div className="container mx-auto flex-grow">
          <Routes>
            {/* Login Route */}
            <Route
              path="/"
              element={
                isLoggedIn ? (
                  <Navigate to="/view-organizations" replace />
                ) : (
                  <Login onLogin={handleLogin} />
                )
              }
            />
            {/* Protected Routes */}
            {isLoggedIn && (
              <>
                <Route path="/view-organizations" element={<ViewOrganizations />} />
                <Route path="/create-organization" element={<CreateOrganization />} />
              </>
            )}
            {/* Redirect all other routes to login if not logged in */}
            {!isLoggedIn && <Route path="*" element={<Navigate to="/" replace />} />}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
