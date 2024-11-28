import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

const useLogin = (onLogin) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("/employees/login", { email, password });
      const token = response.data; // JWT token is returned
      onLogin(token); // Call the App's login handler
      navigate("/view-organizations"); // Redirect to the view organizations page
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    error,
    handleLogin,
  };
};

export default useLogin;
