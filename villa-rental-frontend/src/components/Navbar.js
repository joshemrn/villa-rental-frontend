import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaUser, FaSignOutAlt, FaList, FaClipboard } from 'react-icons/fa';
import { useAuthStore } from '../store/store';

export default function Navbar() {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-2">
              <FaHome className="text-2xl text-blue-600" />
              <span className="text-xl font-bold text-gray-900">Orlando Villas</span>
            </Link>
          </div>

          {/* Center Menu */}
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
            <Link to="/properties" className="text-gray-700 hover:text-blue-600">Browse</Link>
            {isAuthenticated && user?.role === 'owner' && (
              <Link to="/list-property" className="text-gray-700 hover:text-blue-600">List Property</Link>
            )}
            {isAuthenticated && user?.role === 'admin' && (
              <Link to="/admin" className="text-gray-700 hover:text-blue-600">Admin</Link>
            )}
          </div>

          {/* Right Menu */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link to="/bookings" className="text-gray-700 hover:text-blue-600 flex items-center space-x-1">
                  <FaList /> <span>Bookings</span>
                </Link>
                <Link to="/invoices" className="text-gray-700 hover:text-blue-600 flex items-center space-x-1">
                  <FaClipboard /> <span>Invoices</span>
                </Link>
                <div className="relative group">
                  <button className="flex items-center space-x-2 text-gray-700 hover:text-blue-600">
                    <FaUser />
                    <span>{user?.firstName}</span>
                  </button>
                  <div className="hidden group-hover:block absolute right-0 w-48 bg-white rounded-lg shadow-lg">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      <FaSignOutAlt className="inline mr-2" /> Logout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-blue-600 font-semibold"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
