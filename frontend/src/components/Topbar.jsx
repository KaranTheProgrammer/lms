import React from "react";
import { useNavigate } from "react-router-dom";

const Topbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header className="bg-white shadow p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Dashboard</h1>
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <span>Welcome, {user.name || user.email}</span>
              <button
                onClick={handleSignOut}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Sign Out
              </button>
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            </>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Topbar;
