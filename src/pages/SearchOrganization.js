import React from "react";
import { useParams } from "react-router-dom";
import OrganizationCard from "../components/OrganizationCard";
import HrModal from "../components/HrModal";
import useOrganization from "../hooks/useOrganization";

const SearchOrganizationPage = () => {
  const { searchQuery } = useParams();
  const {
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
  } = useOrganization(searchQuery);

  return (
    <div className="flex justify-center items-start min-h-screen py-4">
      <div className="w-full max-w-screen-4xl">
        {/* Show HR Modal if an organization is selected */}
        {selectedOrg ? (
          <HrModal
            hrDetails={hrDetails}
            editHr={editHr}
            newHrFormData={newHrFormData}
            setNewHrFormData={setNewHrFormData}
            hrFormData={hrFormData}
            setHrFormData={setHrFormData}
            showAddHrForm={showAddHrForm}
            setShowAddHrForm={setShowAddHrForm}
            handleAddHr={handleAddHr}
            handleEditHr={handleEditHr}
            handleEditHrSubmit={handleEditHrSubmit}
            handleDeleteHr={handleDeleteHr}
            setEditHr={setEditHr}
            setSelectedOrg={setSelectedOrg}
          />
        ) : (
          // Show organization details
          organization && (
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-8 mx-auto px-4 max-w-screen-xl">
              <OrganizationCard
                key={organization.id}
                organization={organization}
                isEditing={editOrg === organization.id}
                formData={formData}
                setFormData={setFormData}
                handleEdit={() => handleEditOrganization(organization)}
                handleDelete={() => handleDeleteOrganization(organization.id)}
                handleEditSubmit={handleEditSubmit}
                setEditOrg={setEditOrg}
                fetchHrDetails={fetchHrDetails}
              />
            </div>
          )
        )}
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default SearchOrganizationPage;
