import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";

const HrModal = ({
    hrDetails,
    editHr,
    newHrFormData,
    setNewHrFormData,
    hrFormData,
    setHrFormData,
    setShowAddHrForm,
    handleAddHr,
    handleEditHr,
    handleDeleteHr,
    setEditHr,
    setSelectedOrg,
    showAddHrForm,
    handleEditHrSubmit,
}) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md z-50">
            <div className="bg-white w-full max-w-2xl p-6 rounded-lg shadow-lg relative">
                <button
                    onClick={() => {
                        setSelectedOrg(null);
                        setEditHr(null);
                        setShowAddHrForm(false);
                    }}
                    className="border-2 border-gray-200 text-black px-4 py-2 text-sm rounded-lg hover:bg-blue-500 hover:text-white hover:border-white flex items-center space-x-2 mb-6"
                >
                    <FontAwesomeIcon
                        icon={faArrowLeft}
                        className="text-lg"
                    />
                    <span className="text-sm font-medium">Back</span>
                </button>
                <div className="modal-content max-h-[80vh] overflow-y-auto">
                    {showAddHrForm ? (
                        // Add HR Form
                        <div className="space-y-4 p-4 border rounded-lg shadow-lg">
                            <h3 className="text-2xl font-bold mb-4 text-blue-700">Add New HR</h3>
                            <form onSubmit={handleAddHr} className="space-y-4">
                                <input
                                    type="text"
                                    value={newHrFormData.first_name}
                                    onChange={(e) =>
                                        setNewHrFormData({ ...newHrFormData, first_name: e.target.value })
                                    }
                                    className="w-full p-2 border rounded"
                                    placeholder="First Name"
                                />
                                <input
                                    type="text"
                                    value={newHrFormData.last_name}
                                    onChange={(e) =>
                                        setNewHrFormData({ ...newHrFormData, last_name: e.target.value })
                                    }
                                    className="w-full p-2 border rounded"
                                    placeholder="Last Name"
                                />
                                <input
                                    type="email"
                                    value={newHrFormData.email}
                                    onChange={(e) =>
                                        setNewHrFormData({ ...newHrFormData, email: e.target.value })
                                    }
                                    className="w-full p-2 border rounded"
                                    placeholder="Email"
                                />
                                <input
                                    type="text"
                                    value={newHrFormData.contact_number}
                                    onChange={(e) =>
                                        setNewHrFormData({ ...newHrFormData, contact_number: e.target.value })
                                    }
                                    className="w-full p-2 border rounded"
                                    placeholder="Contact Number"
                                />
                                <button
                                    type="submit"
                                    className="px-4 py-2 hover:bg-green-500 hover:text-white border-2 border-gray-200 rounded-lg"
                                >
                                    Add HR
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowAddHrForm(false)}
                                    className="ml-2 px-4 py-2 hover:bg-gray-300 border-2 border-gray-200 rounded-lg"
                                >
                                    Cancel
                                </button>
                            </form>
                        </div>
                    ) : (
                        // HR Details View
                        <>
                            {hrDetails.length ? (
                                hrDetails.map((hr) =>
                                    editHr === hr.id ? (
                                        <form
                                            onSubmit={handleEditHrSubmit}
                                            key={hr.id}
                                            className="space-y-4 p-4 border rounded-lg shadow-lg"
                                        >
                                            <input
                                                type="text"
                                                value={hrFormData.first_name}
                                                onChange={(e) =>
                                                    setHrFormData({ ...hrFormData, first_name: e.target.value })
                                                }
                                                className="w-full p-2 border rounded"
                                                placeholder="First Name"
                                            />
                                            <input
                                                type="text"
                                                value={hrFormData.last_name}
                                                onChange={(e) =>
                                                    setHrFormData({ ...hrFormData, last_name: e.target.value })
                                                }
                                                className="w-full p-2 border rounded"
                                                placeholder="Last Name"
                                            />
                                            <input
                                                type="email"
                                                value={hrFormData.email}
                                                onChange={(e) =>
                                                    setHrFormData({ ...hrFormData, email: e.target.value })
                                                }
                                                className="w-full p-2 border rounded"
                                                placeholder="Email"
                                            />
                                            <input
                                                type="text"
                                                value={hrFormData.contact_number}
                                                onChange={(e) =>
                                                    setHrFormData({ ...hrFormData, contact_number: e.target.value })
                                                }
                                                className="w-full p-2 border rounded"
                                                placeholder="Contact Number"
                                            />
                                            <button
                                                type="submit"
                                                className="px-4 py-2 hover:bg-blue-500 hover:text-white border-2 border-gray-200 rounded-lg"
                                            >
                                                Save
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setEditHr(null)}
                                                className="ml-2 px-4 py-2 hover:bg-red-500 hover:text-white border-2 border-gray-200 text-black rounded-lg"
                                            >
                                                Cancel
                                            </button>
                                        </form>
                                    ) : (
                                        <div key={hr.id} className="p-6 border rounded-lg mb-6 shadow-lg">
                                            <h3 className="text-2xl font-bold mb-4 text-blue-700">HR Details</h3>
                                            <p className="text-lg text-gray-800 mb-2">
                                                <strong>First Name:</strong> {hr.first_name}
                                            </p>
                                            <p className="text-lg text-gray-800 mb-2">
                                                <strong>Last Name:</strong> {hr.last_name}
                                            </p>
                                            <p className="text-lg text-gray-800 mb-2">
                                                <strong>Email:</strong> {hr.email}
                                            </p>
                                            <p className="text-lg text-gray-800 mb-4">
                                                <strong>Contact:</strong> {hr.contact_number}
                                            </p>
                                            <div className="flex space-x-4">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation(); // Prevent card click
                                                        handleEditHr(hr);
                                                    }}
                                                    className="border-2 border-gray-200 text-black px-3 py-1 text-sm rounded-lg hover:bg-yellow-500 hover:text-white hover:border-white"
                                                >
                                                    <FontAwesomeIcon icon={faPenToSquare} className="text-lg" /> Edit
                                                </button>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleDeleteHr(hr.id);
                                                    }}
                                                    className="border-2 border-gray-200 text-black px-3 py-1 text-sm rounded-lg hover:bg-red-500 hover:text-white hover:border-white"
                                                >
                                                    <FontAwesomeIcon icon={faTrashCan} className="text-lg" /> Delete
                                                </button>
                                            </div>
                                        </div>
                                    )
                                )
                            ) : (
                                <p className="text-center text-gray-500">No HRs available. Add one!</p>
                            )}
                            <button
                                onClick={() => setShowAddHrForm(true)}
                                className="mt-4 px-4 py-2 hover:bg-green-500 hover:text-white border-2 border-gray-200 rounded-lg"
                            >
                                Add HR
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HrModal;
