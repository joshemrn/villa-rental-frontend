import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { bookingService } from '../services/api';
import { useAuthStore } from '../store/store';

export default function BookingsPage() {
  const { user } = useAuthStore();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = user?.role === 'owner' 
        ? await bookingService.getOwnerBookings()
        : await bookingService.getMyBookings();
      setBookings(response.data);
    } catch (err) {
      console.error('Failed to fetch bookings', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Bookings</h1>

      {loading ? (
        <div className="text-center py-12">Loading...</div>
      ) : bookings.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600">No bookings yet</p>
          <Link to="/properties" className="text-blue-600 hover:underline">
            Browse properties
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div key={booking._id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold">{booking.propertyId?.title}</h3>
                  <p className="text-gray-600">{booking.propertyId?.location?.address}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                  booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {booking.status}
                </span>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-600">Check-in</p>
                  <p className="font-semibold">{new Date(booking.checkInDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Check-out</p>
                  <p className="font-semibold">{new Date(booking.checkOutDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Price</p>
                  <p className="font-semibold text-blue-600">${booking.totalPrice}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Guests</p>
                  <p className="font-semibold">{booking.numberOfGuests}</p>
                </div>
              </div>

              <div className="flex space-x-3">
                {booking.status === 'pending' && (
                  <Link
                    to={`/payment/${booking._id}`}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Complete Payment
                  </Link>
                )}
                {booking.status === 'confirmed' && !booking.contractSigned && (
                  <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
                    Sign Contract
                  </button>
                )}
                <Link
                  to={`/contracts`}
                  className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                >
                  View Contract
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
