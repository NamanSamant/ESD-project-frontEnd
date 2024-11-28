import { useState, useEffect } from "react";
import API from "../api/axios";

const useOrganizations = (searchQuery) => {
  const [organizations, setOrganizations] = useState([]);
  const [organization, setOrganization] = useState(null);
  const [error, setError] = useState(null);
  const [editOrg, setEditOrg] = useState(null);
  const [formData, setFormData] = useState({ name: "", address: "" });
  const [selectedOrg, setSelectedOrg] = useState(null);
  const [hrDetails, setHrDetails] = useState([]);
  const [editHr, setEditHr] = useState(null);
  const [hrFormData, setHrFormData] = useState({ first_name: "", last_name: "", email: "", contact_number: "" });
  const [newHrFormData, setNewHrFormData] = useState({ first_name: "", last_name: "", email: "", contact_number: "" });
  const [showAddHrForm, setShowAddHrForm] = useState(false);

  // Fetch all organizations or search for a specific one
  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const token = localStorage.getItem("employeeToken");
        if (searchQuery) {
          // Search for a specific organization
          const response = await API.get(`/organizations/search_organization?name=${searchQuery}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setOrganization(response.data || null);
          setError(null);
        } else {
          // Fetch all organizations
          const response = await API.get("/organizations", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setOrganizations(response.data || []);
        }
      } catch (error) {
        handleApiError(error, "Failed to fetch organizations.");
      }
    };

    fetchOrganizations();
  }, [searchQuery]);

  const fetchHrDetails = async (organizationId) => {
    try {
      const token = localStorage.getItem("employeeToken");
      const response = await API.get(`/organizations/${organizationId}/hrs`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setHrDetails(response.data);
      setSelectedOrg(organizationId);
    } catch (error) {
      handleApiError(error, "Failed to fetch HR details.");
    }
  };

  const handleDeleteOrganization = async (id) => {
    if (!window.confirm("Are you sure you want to delete this organization?")) return;

    try {
      const token = localStorage.getItem("employeeToken");
      await API.delete(`/organizations/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrganizations(organizations.filter((org) => org.id !== id));
      if (organization?.id === id) setOrganization(null);
    } catch (error) {
      handleApiError(error, "Failed to delete organization.");
    }
  };

  const handleEditOrganization = (organization) => {
    setEditOrg(organization.id);
    setFormData({ name: organization.name, address: organization.address });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("employeeToken");
      await API.patch(
        `/organizations/${editOrg}`,
        { name: formData.name, address: formData.address },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setOrganizations(organizations.map((org) => (org.id === editOrg ? { ...org, ...formData } : org)));
      if (organization?.id === editOrg) setOrganization({ ...organization, ...formData });
      setEditOrg(null);
    } catch (error) {
      handleApiError(error, "Failed to edit organization.");
    }
  };

  const handleEditHr = (hr) => {
    setEditHr(hr.id);
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
      await API.patch(`/organizations/hr/${editHr}`, hrFormData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setHrDetails(hrDetails.map((hr) => (hr.id === editHr ? { ...hr, ...hrFormData } : hr)));
      setEditHr(null);
    } catch (error) {
      handleApiError(error, "Failed to edit HR details.");
    }
  };

  const handleDeleteHr = async (hrId) => {
    if (!window.confirm("Are you sure you want to delete this HR?")) return;

    try {
      const token = localStorage.getItem("employeeToken");
      await API.delete(`/organizations/hrs/${hrId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const updatedHrDetails = hrDetails.filter((hr) => hr.id !== hrId);
      setHrDetails(updatedHrDetails);
      if (!updatedHrDetails.length) setSelectedOrg(null);
    } catch (error) {
      handleApiError(error, "Failed to delete HR.");
    }
  };

  const handleAddHr = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("employeeToken");
      const response = await API.post(`/organizations/hr/${selectedOrg}`, newHrFormData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setHrDetails([...hrDetails, response.data]);
      setNewHrFormData({ first_name: "", last_name: "", email: "", contact_number: "" });
      setSelectedOrg(null);
      setShowAddHrForm(false);
    } catch (error) {
      handleApiError(error, "Failed to add HR.");
    }
  };

  const handleApiError = (error, defaultMessage) => {
    const message = error.response?.data?.message || defaultMessage;
    console.error(message, error);
    setError(message);
  };

  return {
    organizations,
    organization,
    error,
    editOrg,
    setEditOrg,
    formData,
    setFormData,
    selectedOrg,
    setSelectedOrg,
    hrDetails,
    editHr,
    setEditHr,
    hrFormData,
    setHrFormData,
    newHrFormData,
    setNewHrFormData,
    showAddHrForm,
    setShowAddHrForm,
    fetchHrDetails,
    handleDeleteOrganization,
    handleEditOrganization,
    handleEditSubmit,
    handleEditHr,
    handleEditHrSubmit,
    handleDeleteHr,
    handleAddHr,
  };
};

export default useOrganizations;
