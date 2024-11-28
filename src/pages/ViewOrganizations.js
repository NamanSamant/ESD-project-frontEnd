import React, { useState } from "react";
import HrModal from "../components/HrModal";
import OrganizationCard from "../components/OrganizationCard";
import useOrganizations from "../hooks/useOrganization"; // Import the custom hook

const ViewOrganizations = () => {
    const [searchQuery, setSearchQuery] = useState(""); // If you need to implement search
    const {
        organizations,
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
    } = useOrganizations(searchQuery); // Use the hook here

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
                                handleEdit={handleEditOrganization}
                                handleDelete={handleDeleteOrganization}
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
