import React from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Orlando Villas</h3>
            <p className="text-gray-400">Your premier vacation rental destination in Orlando, Florida.</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/properties" className="hover:text-white">Browse Properties</a></li>
              <li><a href="/about" className="hover:text-white">About Us</a></li>
              <li><a href="/contact" className="hover:text-white">Contact</a></li>
              <li><a href="/faq" className="hover:text-white">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">Help Center</a></li>
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white">Cancellation</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <FaPhone /> <span className="text-gray-400">(407) 555-1234</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaEnvelope /> <span className="text-gray-400">support@villarental.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaMapMarkerAlt /> <span className="text-gray-400">Orlando, FL 32801</span>
              </div>
            </div>
          </div>
        </div>
        <hr className="border-gray-800" />
        <div className="mt-8 text-center text-gray-400">
          <p>&copy; 2024 Orlando Villa Rental. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
