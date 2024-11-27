import React, { useState } from "react";
import API from "../api/axios";

const CreateOrganization = () => {
  const [orgName, setOrgName] = useState("");
  const [orgAddress, setorgAddress] = useState("");
  const [hrFirstName, sethrFirstName] = useState("");
  const [hrLastName, sethrLastName] = useState("");
  const [hrEmail, setHrEmail] = useState("");
  const [hrContact, sethrContact] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState(""); // For displaying errors

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("employeeToken");

    // Validate contact number
    const contactNumberRegex = /^\d{10}$/; // Matches exactly 10 digits
    if (!contactNumberRegex.test(hrContact)) {
      setError("Contact number must be exactly 10 digits.");
      return;
    }

    try {
      const requestBody = {
        name: orgName,
        address: orgAddress,
        first_name: hrFirstName,
        last_name: hrLastName,
        email: hrEmail,
        contact_number: hrContact,
      };
      await API.post("/organizations", requestBody, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccess("Organization and HR successfully created!");
      setError(""); // Clear errors
    } catch (err) {
      if (err.response) {
        if (err.response.status === 409) {
          setError("Organization already exists. Please try a different name.");
        } else
        {
          setError("HR entry already exists.");
        }
      } else {
        setError("Failed to create organization. Please check your network and try again.");
      }
      setSuccess("");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen my-4">
      <div className="bg-white p-8 shadow-lg rounded-lg max-w-2xl w-full mx-4">
        <h3 className="text-xl font-bold mb-6">Organization Details</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Organization Name */}
          <div>
            <label className="block mb-2 text-sm">Organization Name</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
              required
            />
          </div>
          {/* Organization Address */}
          <div>
            <label className="block mb-2 text-sm">Organization Address</label>
            <textarea
              className="w-full p-2 border rounded"
              value={orgAddress}
              onChange={(e) => setorgAddress(e.target.value)}
              required
            ></textarea>
          </div>
          {/* HR Details */}
          <h3 className="text-xl font-bold mb-6">HR Details</h3>
          <div>
            <label className="block mb-2 text-sm">First Name</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={hrFirstName}
              onChange={(e) => sethrFirstName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm">Last Name</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={hrLastName}
              onChange={(e) => sethrLastName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm">Email</label>
            <input
              type="email"
              className="w-full p-2 border rounded"
              value={hrEmail}
              onChange={(e) => setHrEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm">Contact Number</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={hrContact}
              onChange={(e) => sethrContact(e.target.value)}
              required
            />
          </div>
          <button className="hover:bg-blue-500 hover:border-white hover:text-white bg-white border-2 border-gray-200 text-black px-4 py-2 rounded w-full">
            Add
          </button>
          {error && <p className="text-red-500 mt-4">{error}</p>}
          {success && <p className="text-green-500 mt-4">{success}</p>}
        </form>
      </div>
    </div>
  );
};

export default CreateOrganization;
