import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';

const OrganizationCard = ({
  organization,
  isEditing,
  formData,
  setFormData,
  handleEdit,
  handleDelete,
  handleEditSubmit,
  setEditOrg,
  fetchHrDetails // Prop to fetch HR details
}) => {
  return (
    <div
      key={organization.id}
      className="bg-white p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105 cursor-pointer"
      onClick={() => {
        if (!isEditing) {
          fetchHrDetails(organization.id); // Fetch HR details when the organization is clicked
        }
      }}
    >
      {isEditing ? (
        <form onSubmit={handleEditSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-2">Organization Name</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={formData.name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name: e.target.value,
                })
              }
              onClick={(e) => e.stopPropagation()}
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-2">Address</label>
            <textarea
              className="w-full p-2 border rounded"
              value={formData.address}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  address: e.target.value,
                })
              }
              onClick={(e) => e.stopPropagation()}
              required
            ></textarea>
          </div>
          <div className="flex justify-end space-x-2 mt-4">
            <button
              onClick={(e) => e.stopPropagation()}
              type="submit"
              className="border-2 border-solid border-gray-200 text-sm text-black px-4 py-2 rounded hover:bg-blue-500 hover:text-white hover:border-white"
            >
              Save
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setEditOrg(null); // Exit edit mode
              }}
              className="border-2 border-solid border-gray-200 text-sm text-black px-4 py-2 rounded hover:bg-red-500 hover:text-white hover:border-white"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <h2 className="text-xl font-semibold mb-4">{organization.name}</h2>
          <p className="text-gray-700">
            <strong>Address:</strong> {organization.address}
          </p>
          <div className="mt-4 flex justify-start space-x-4">
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent card click
                handleEdit(organization);
              }}
              className="border-solid border-2 border-gray-200 text-black px-4 py-2 text-sm rounded hover:bg-yellow-500 hover:text-white hover:border-white"
            >
              <FontAwesomeIcon icon={faPenToSquare} className="text-xl" />{' '}
              <span>Edit</span>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent card click
                handleDelete(organization.id);
              }}
              className="border-solid border-2 border-gray-200 text-black px-4 py-2 text-sm rounded hover:bg-red-500 hover:text-white hover:border-white"
            >
              <FontAwesomeIcon icon={faTrashCan} className="text-xl" />{' '}
              <span>Delete</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default OrganizationCard;
