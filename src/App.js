import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/navbar";
import Login from "./pages/login";
import ViewOrganizations from "./pages/ViewOrganizations";
import CreateOrganization from "./pages/CreateOrganization";
import SearchOrganization from "./pages/SearchOrganization";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

      // Fetch HR details for the selected organization
      const fetchHrDetails = async (organizationId) => {
        try {
            const token = localStorage.getItem("employeeToken");
            const response = await API.get(`/organizations/${organizationId}/hrs`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setHrDetails(response.data);
            setSelectedOrg(organizationId); // Show HR details for this organization
        } catch (error) {
            console.error("Failed to fetch HR details:", error);
        }
    };
  
  // Handle Delete Organization
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this organization?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("employeeToken");
      await API.delete(`/organizations/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrganizations(organizations.filter((org) => org.id !== id)); // Update state
    } catch (error) {
      console.error("Failed to delete organization:", error);
    }
  };

  // Handle Edit Organization
  const handleEdit = (organization) => {
    console.log("organization data is:", organization);
    setEditOrg(organization.id); // Set the current organization to be edited
    setFormData({ name: organization.name, address: organization.address }); // Prefill the form
    setIsEditing(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("employeeToken");
      await API.patch(
        `/organizations/${editOrg}`,
        { name: formData.name, address: formData.address },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setOrganizations(
        organizations.map((org) =>
          org.id === editOrg ? { ...org, ...formData } : org
        )
      );
      setEditOrg(null); // Exit edit mode
    } catch (error) {
      console.error("Failed to edit organization:", error);
    }
  };

  // Handle Edit HR
  const handleEditHr = (hr) => {
    console.log("Editing HR:", hr);
    setEditHr(hr.id);
    setHrFormData({
      first_name: hr.first_name,
      last_name: hr.last_name,
      email: hr.email,
      contact_number: hr.contact_number,
    });
    console.log("EditHr ID set to:", hr.id);
  };

  const handleEditHrSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Submitting for HR ID:", editHr);
      console.log("Submitting HR data:", hrFormData);
      const token = localStorage.getItem("employeeToken");
      const response = await API.patch(`/organizations/hr/${editHr}`, hrFormData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("API Response:", response.data);
      setHrDetails(
        hrDetails.map((hr) =>
          hr.id === editHr ? { ...hr, ...hrFormData } : hr
        )
      );
      setEditHr(null);
    } catch (error) {
      console.error("Failed to edit HR details:", error);
    }
  };

  // Handle Delete HR
  const handleDeleteHr = async (hrId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this HR?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("employeeToken");
      await API.delete(`/organizations/hrs/${hrId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const updatedHrDetails = hrDetails.filter((hr) => hr.id !== hrId);
      setHrDetails(updatedHrDetails);
      // If no HRs remain, close the modal
      if (updatedHrDetails.length === 0) {
        setSelectedOrg(null);
      }
    } catch (error) {
      console.error("Failed to delete HR:", error);
    }
  };

  const handleAddHr = async (e) => {
    e.preventDefault();
    if (!newHrFormData.first_name || !newHrFormData.last_name || !newHrFormData.email) {
      alert("Please fill in all fields.");
      return;
    }
    try {
      console.log("data:", newHrFormData);
      const token = localStorage.getItem("employeeToken");
      const response = await API.post(
        `/organizations/hr/${selectedOrg}`,
        newHrFormData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setHrDetails([...hrDetails, response.data]);
      setNewHrFormData({ first_name: "", last_name: "", email: "", contact_number: "" });
      setSelectedOrg(null);
      setShowAddHrForm(false);
    } catch (error) {
      console.error("Failed to add HR:", error);
    }
  };

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
            <Route
              path="/search-organization/:searchQuery"
              element={
                <SearchOrganization/>
              }
            />
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
