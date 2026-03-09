import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { propertyService, bookingService } from '../services/api';
import { useAuthStore } from '../store/store';
import { FaStar, FaMapMarkerAlt, FaWifi, FaSwimmingPool, FaParking } from 'react-icons/fa';

export default function PropertyDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingData, setBookingData] = useState({
    checkInDate: '',
    checkOutDate: '',
    numberOfGuests: 1,
    specialRequests: ''
  });

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await propertyService.getById(id);
        setProperty(response.data);
      } catch (err) {
        toast.error('Failed to load property');
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id]);

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    try {
      const response = await bookingService.create({
        propertyId: id,
        ...bookingData
      });
      toast.success('Booking created! Proceeding to payment...');
      navigate(`/payment/${response.data._id}`);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Booking failed');
    }
  };

  if (loading) return <div className="text-center py-12">Loading...</div>;
  if (!property) return <div className="text-center py-12">Property not found</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Property Details */}
        <div className="lg:col-span-2">
          <img
            src={property.images?.[0] || 'https://via.placeholder.com/600x400'}
            alt={property.title}
            className="w-full h-96 object-cover rounded-lg mb-6"
          />
          <h1 className="text-3xl font-bold mb-4">{property.title}</h1>
          
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex items-center space-x-2">
              <FaStar className="text-yellow-400" />
              <span className="font-semibold">{property.rating}</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaMapMarkerAlt /> <span>{property.location?.address}</span>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <h2 className="text-2xl font-bold mb-4">About this property</h2>
            <p className="text-gray-700 mb-4">{property.description}</p>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="font-semibold">Bedrooms: {property.bedrooms}</p>
                <p className="font-semibold">Bathrooms: {property.bathrooms}</p>
              </div>
              <div>
                <p className="font-semibold">Max Guests: {property.maxGuests}</p>
              </div>
            </div>

            <h3 className="font-bold mb-3">Amenities</h3>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {property.amenities?.map((amenity, idx) => (
                <div key={idx} className="flex items-center space-x-2">
                  <FaWifi className="text-blue-600" />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>

            <h3 className="font-bold mb-3">Cancellation Policy</h3>
            <p className="text-gray-700">{property.cancellationPolicy}</p>
          </div>
        </div>

        {/* Booking Form */}
        <div className="lg:col-span-1">
          <div className="bg-white border rounded-lg p-6 sticky top-20">
            <div className="text-3xl font-bold text-blue-600 mb-6">${property.pricePerNight}/night</div>
            
            <form onSubmit={handleBooking} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Check-in Date</label>
                <input
                  type="date"
                  value={bookingData.checkInDate}
                  onChange={(e) => setBookingData({ ...bookingData, checkInDate: e.target.value })}
                  required
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Check-out Date</label>
                <input
                  type="date"
                  value={bookingData.checkOutDate}
                  onChange={(e) => setBookingData({ ...bookingData, checkOutDate: e.target.value })}
                  required
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Number of Guests</label>
                <input
                  type="number"
                  min="1"
                  max={property.maxGuests}
                  value={bookingData.numberOfGuests}
                  onChange={(e) => setBookingData({ ...bookingData, numberOfGuests: parseInt(e.target.value) })}
                  required
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Special Requests</label>
                <textarea
                  value={bookingData.specialRequests}
                  onChange={(e) => setBookingData({ ...bookingData, specialRequests: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2"
                  rows="3"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700"
              >
                {isAuthenticated ? 'Book Now' : 'Login to Book'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
