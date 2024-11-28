import { useState } from "react";
import API from "../api/axios";

const useCreateOrganization = () => {
  const [orgName, setOrgName] = useState("");
  const [orgAddress, setOrgAddress] = useState("");
  const [hrFirstName, setHrFirstName] = useState("");
  const [hrLastName, setHrLastName] = useState("");
  const [hrEmail, setHrEmail] = useState("");
  const [hrContact, setHrContact] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

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
      resetForm(); // Reset the form after success
    } catch (err) {
      if (err.response) {
        if (err.response.status === 409) {
          setError("Organization already exists. Please try a different name.");
        } else {
          setError("HR entry already exists.");
        }
      } else {
        setError("Failed to create organization. Please check your network and try again.");
      }
      setSuccess("");
    }
  };

  const resetForm = () => {
    setOrgName("");
    setOrgAddress("");
    setHrFirstName("");
    setHrLastName("");
    setHrEmail("");
    setHrContact("");
  };

  return {
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
  };
};

export default useCreateOrganization;
