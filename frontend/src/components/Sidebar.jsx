import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-800 text-white h-screen p-4">
      <h2 className="text-xl font-bold mb-6">LMS</h2>
      <nav>
        <ul className="space-y-2">
          <li><Link to="/dashboard" className="block p-2 hover:bg-gray-700 rounded">Dashboard</Link></li>
          <li><Link to="/courses" className="block p-2 hover:bg-gray-700 rounded">Courses</Link></li>
          <li><Link to="/reports" className="block p-2 hover:bg-gray-700 rounded">Reports</Link></li>
          <li><Link to="/users" className="block p-2 hover:bg-gray-700 rounded">Users</Link></li>
          <li><Link to="/settings" className="block p-2 hover:bg-gray-700 rounded">Settings</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
