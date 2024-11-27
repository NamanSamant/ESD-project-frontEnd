import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = ({ handleLogout }) => {
  return (
    <nav className="bg-gray-50 border-b border-gray-200 px-6 py-4">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <a href="" className="rounded-xl text-3xl font-bold text-gray-800 flex items-center">
          ERP
        </a>

        {/* Navigation Links */}
        <div className="flex space-x-6 text-lg font-medium text-gray-600">
          <NavLink
            to="/view-organizations"
            className={({ isActive }) =>
              `hover:text-gray-900 ${
                isActive ? "text-gray-900 border-b-2 border-gray-900" : ""
              }`
            }
          >
            Organizations
          </NavLink>
          <NavLink
            to="/create-organization"
            className={({ isActive }) =>
              `hover:text-gray-900 ${
                isActive ? "text-gray-900 border-b-2 border-gray-900" : ""
              }`
            }
          >
            Create New Organization
          </NavLink>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-full hover:bg-gray-700"
        >
          Log out
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
