import React from "react";
import useCreateOrganization from "../hooks/useCreateOrganization";

const CreateOrganization = () => {
  const {
    orgName,
    setOrgName,
    orgAddress,
    setOrgAddress,
    hrFirstName,
    setHrFirstName,
    hrLastName,
    setHrLastName,
    hrEmail,
    setHrEmail,
    hrContact,
    setHrContact,
    success,
    error,
    handleSubmit,
  } = useCreateOrganization();

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
              onChange={(e) => setOrgAddress(e.target.value)}
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
              onChange={(e) => setHrFirstName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm">Last Name</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={hrLastName}
              onChange={(e) => setHrLastName(e.target.value)}
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
              onChange={(e) => setHrContact(e.target.value)}
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
