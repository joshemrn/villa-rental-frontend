import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaMapMarkerAlt } from 'react-icons/fa';

export default function HomePage() {
  const featuredProperties = [
    {
      id: 1,
      title: 'Luxury Paradise Villa',
      location: 'Orlando, FL',
      price: 250,
      rating: 4.9,
      reviews: 128,
      image: 'https://via.placeholder.com/300x200?text=Luxury+Villa'
    },
    {
      id: 2,
      title: 'Modern Family Estate',
      location: 'Orlando, FL',
      price: 180,
      rating: 4.8,
      reviews: 95,
      image: 'https://via.placeholder.com/300x200?text=Family+Estate'
    },
    {
      id: 3,
      title: 'Tropical Beach House',
      location: 'Orlando, FL',
      price: 220,
      rating: 4.7,
      reviews: 110,
      image: 'https://via.placeholder.com/300x200?text=Beach+House'
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Find Your Perfect Villa in Orlando</h1>
          <p className="text-xl mb-8">Experience luxury vacation rentals with world-class amenities</p>
          <Link
            to="/properties"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 inline-block"
          >
            Explore Properties
          </Link>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Search Villas</h2>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <input type="date" className="border rounded-lg px-4 py-2" placeholder="Check-in" />
              <input type="date" className="border rounded-lg px-4 py-2" placeholder="Check-out" />
              <input type="number" className="border rounded-lg px-4 py-2" placeholder="Guests" />
              <button className="bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold">
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Featured Properties</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProperties.map((property) => (
              <Link
                key={property.id}
                to={`/properties/${property.id}`}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <img src={property.image} alt={property.title} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{property.title}</h3>
                  <div className="flex items-center space-x-2 text-gray-600 mb-3">
                    <FaMapMarkerAlt className="text-sm" />
                    <span className="text-sm">{property.location}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-blue-600">${property.price}/night</span>
                    <div className="flex items-center space-x-1">
                      <FaStar className="text-yellow-400" />
                      <span className="font-semibold">{property.rating}</span>
                      <span className="text-gray-600 text-sm">({property.reviews})</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg text-center">
              <div className="text-4xl mb-4">🏠</div>
              <h3 className="text-xl font-semibold mb-2">Verified Properties</h3>
              <p className="text-gray-600">All our properties are verified and inspected regularly.</p>
            </div>
            <div className="bg-white p-6 rounded-lg text-center">
              <div className="text-4xl mb-4">💳</div>
              <h3 className="text-xl font-semibold mb-2">Secure Payments</h3>
              <p className="text-gray-600">Safe and secure payment processing with multiple options.</p>
            </div>
            <div className="bg-white p-6 rounded-lg text-center">
              <div className="text-4xl mb-4">📞</div>
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-600">Our dedicated support team is always ready to help.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
