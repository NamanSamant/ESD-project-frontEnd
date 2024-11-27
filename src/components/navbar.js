import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = ({ handleLogout }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search-organization/${searchQuery}`); // Navigate to search results page with query
    }
  };

  return (
    <nav className="bg-gray-50 border-b border-gray-200 px-16 py-4">
      <div className="flex justify-between items-center px-16 mx-2">
        <div className="flex space-x-16 text-lg justify-between font-medium text-gray-600">
          <NavLink
            to="/view-organizations"
            className={({ isActive }) =>
              `hover:text-gray-900 ${isActive ? "text-gray-900 border-b-2 border-gray-900" : ""
              }`
            }
          >
            Organizations
          </NavLink>
          <NavLink
            to="/create-organization"
            className={({ isActive }) =>
              `hover:text-gray-900 ${isActive ? "text-gray-900 border-b-2 border-gray-900" : ""
              }`
            }
          >
            Create New Organization
          </NavLink>
        </div>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search organization..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-gray-800"
          />
          <button
            onClick={handleSearch}
            className="px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-full hover:bg-gray-700"
          >
            Search
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-full hover:bg-gray-700"
          >
            Log out
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
