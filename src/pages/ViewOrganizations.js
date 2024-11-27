import React, { useEffect, useState } from "react";
import API from "../api/axios";
import HrModal from "../components/HrModal";
import OrganizationCard from "../components/OrganizationCard";

const ViewOrganizations = () => {
    const [organizations, setOrganizations] = useState([]);
    const [editOrg, setEditOrg] = useState(null); // State for editing organization
    const [formData, setFormData] = useState({ name: "", address: "" }); // Form data for editing
    const [selectedOrg, setSelectedOrg] = useState(null); // Selected organization for HR details
    const [hrDetails, setHrDetails] = useState([]); // HR details for selected organization
    const [editHr, setEditHr] = useState(null); // State for editing HR
    const [hrFormData, setHrFormData] = useState({ first_name: "", last_name: "", email: "", contact_number: "" });
    const [newHrFormData, setNewHrFormData] = useState({ first_name: "", last_name: "", email: "", contact_number: "" });
    const [showAddHrForm, setShowAddHrForm] = useState(false);


    useEffect(() => {
        const fetchOrganizations = async () => {
            try {
                const token = localStorage.getItem("employeeToken");
                const response = await API.get("/organizations", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setOrganizations(response.data);
            } catch (error) {
                console.error("Failed to fetch organizations:", error);
            }
        };

        fetchOrganizations();
    }, []);

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

    return (
        <div className="flex justify-center items-start min-h-screen py-4">
            <div className="w-full max-w-screen-4xl">
                {selectedOrg ? (
                    // HR Details View
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
                    // Organization List View
                    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-8 mx-auto px-4 max-w-screen-xl">
                        {organizations.map((org) => (
                            <OrganizationCard
                                key={org.id}
                                organization={org}
                                isEditing={editOrg === org.id}
                                formData={formData}
                                setFormData={setFormData}
                                handleEdit={handleEdit}
                                handleDelete={handleDelete}
                                handleEditSubmit={handleEditSubmit}
                                setEditOrg={setEditOrg}
                                fetchHrDetails={fetchHrDetails}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ViewOrganizations;