import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import OrganizationCard from "../components/OrganizationCard";
import HrModal from "../components/HrModal"; // Assuming this component exists for HR details
import API from "../api/axios";

const SearchOrganizationPage = () => {
  const { searchQuery } = useParams(); // Extract the search query from the URL
  const [organization, setOrganization] = useState(null); // State to store the fetched organization
  const [error, setError] = useState(null); // Error message state
  const [editOrg, setEditOrg] = useState(null); // State for editing organization
  const [formData, setFormData] = useState({ name: "", address: "" }); // Form data for editing
  const [selectedOrg, setSelectedOrg] = useState(null); // Selected organization for HR details
  const [hrDetails, setHrDetails] = useState([]); // HR details for selected organization
  const [editHr, setEditHr] = useState(null); // State for editing HR
  const [hrFormData, setHrFormData] = useState({ first_name: "", last_name: "", email: "", contact_number: "" });
  const [newHrFormData, setNewHrFormData] = useState({ first_name: "", last_name: "", email: "", contact_number: "" });
  const [showAddHrForm, setShowAddHrForm] = useState(false);

  useEffect(() => {
    if (!searchQuery) {
      setError("No search query provided.");
      return;
    }

    const fetchOrganizationByName = async () => {
      try {
        const token = localStorage.getItem("employeeToken");
        const response = await API.get(`/organizations/search_organization?name=${searchQuery}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data) {
          setOrganization(response.data); // Set the organization data
          setError(null); // Clear error if organization found
        } else {
          setError("No organization found.");
        }
      } catch (error) {
        console.error("Failed to fetch organization:", error);
        setError("Error fetching organization.");
      }
    };

    fetchOrganizationByName();
  }, [searchQuery]);

  // Fetch HR details for the selected organization
  const fetchHrDetails = async (organizationId) => {
    try {
      const token = localStorage.getItem("employeeToken");
      const response = await API.get(`/organizations/${organizationId}/hrs`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setHrDetails(response.data); // Update HR details state
      setSelectedOrg(organizationId); // Set selected org for HR details view
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
      setOrganization(null); // Clear organization after delete
    } catch (error) {
      console.error("Failed to delete organization:", error);
    }
  };

  // Handle Edit Organization
  const handleEdit = (organization) => {
    setEditOrg(organization.id); // Set organization for editing
    setFormData({ name: organization.name, address: organization.address }); // Prefill the form with organization data
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
      setOrganization({ ...organization, ...formData }); // Update the organization data
      setEditOrg(null); // Exit edit mode
    } catch (error) {
      console.error("Failed to edit organization:", error);
    }
  };

  // Handle Edit HR
  const handleEditHr = (hr) => {
    setEditHr(hr.id); // Set HR to edit
    setHrFormData({
      first_name: hr.first_name,
      last_name: hr.last_name,
      email: hr.email,
      contact_number: hr.contact_number,
    });
  };

  const handleEditHrSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("employeeToken");
      const response = await API.patch(`/organizations/hr/${editHr}`, hrFormData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setHrDetails(
        hrDetails.map((hr) =>
          hr.id === editHr ? { ...hr, ...hrFormData } : hr
        )
      );
      setEditHr(null); // Exit HR edit mode
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
      if (updatedHrDetails.length === 0) setSelectedOrg(null); // Close HR view if no HRs remain
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

  return (
    <div className="flex justify-center items-start min-h-screen py-4">
      <div className="w-full max-w-screen-4xl">
          {selectedOrg ? (
            <HrModal
              hrDetails={hrDetails}
              editHr={editHr}
              newHrFormData={newHrFormData}
              setNewHrFormData={setNewHrFormData}
              hrFormData={hrFormData}
              setHrFormData={setHrFormData}
              setShowAddHrForm={setShowAddHrForm}
              handleAddHr={handleAddHr}
              handleEditHr={handleEditHr}
              handleDeleteHr={handleDeleteHr}
              setEditHr={setEditHr}
              setSelectedOrg={setSelectedOrg}
              showAddHrForm={showAddHrForm}
              handleEditHrSubmit={handleEditHrSubmit}
            />
          ) : (
            organization && (
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-8 mx-auto px-4 max-w-screen-xl">
            <OrganizationCard
              key={organization.id}
              organization={organization}
              isEditing={editOrg === organization.id}
              formData={formData}
              setFormData={setFormData}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              handleEditSubmit={handleEditSubmit}
              setEditOrg={setEditOrg}
              fetchHrDetails={fetchHrDetails}
            />
          </div>
           )
        )}
        </div>
    </div>
  );
};

export default SearchOrganizationPage;
