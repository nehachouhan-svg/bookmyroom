import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { FaCalendarCheck, FaUser, FaBed, FaDollarSign, FaCheckCircle, FaArrowLeft } from 'react-icons/fa';

const Booking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);

  const { room, checkIn, checkOut, guests } = location.state || {};

  if (!room || !checkIn || !checkOut) {
    navigate('/rooms');
    return null;
  }

  const nights = Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24));
  const totalPrice = nights * room.pricePerNight;

  const handleConfirmBooking = async () => {
    setLoading(true);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(
        '/api/bookings',
        {
          roomId: room._id,
          checkInDate: checkIn,
          checkOutDate: checkOut,
          guests,
        },
        config
      );
      setBookingDetails(data);
      setConfirmed(true);
      toast.success('Booking confirmed successfully!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Booking failed');
    } finally {
      setLoading(false);
    }
  };

  if (confirmed && bookingDetails) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
        <div className="max-w-lg mx-auto px-4 text-center">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <FaCheckCircle className="text-6xl text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Booking Confirmed!</h2>
            <p className="text-gray-600 mb-6">Your room has been booked successfully.</p>

            <div className="bg-gray-50 rounded-xl p-6 text-left space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Booking ID:</span>
                <span className="font-semibold">{bookingDetails._id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Room:</span>
                <span className="font-semibold">{room.type} (#{room.roomNumber})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Check-in:</span>
                <span className="font-semibold">{new Date(checkIn).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Check-out:</span>
                <span className="font-semibold">{new Date(checkOut).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Nights:</span>
                <span className="font-semibold">{nights}</span>
              </div>
              <div className="flex justify-between text-lg font-bold">
                <span className="text-gray-800">Total:</span>
                <span className="text-primary-600">${totalPrice}</span>
              </div>
            </div>

            <button
              onClick={() => navigate('/my-bookings')}
              className="w-full bg-primary-600 text-white py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors mb-3"
            >
              View My Bookings
            </button>
            <button
              onClick={() => navigate('/rooms')}
              className="w-full text-primary-600 py-2 font-semibold hover:text-primary-700"
            >
              Book Another Room
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate(`/rooms/${room._id}`)}
          className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold mb-6"
        >
          <FaArrowLeft /> Back to Room Details
        </button>

        <div className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Confirm Your Booking</h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FaUser className="text-primary-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Guest Information</h3>
                    <p className="text-gray-600">{user?.name}</p>
                    <p className="text-gray-500 text-sm">{user?.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FaBed className="text-primary-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Room Details</h3>
                    <p className="text-gray-600">{room.type} Room - #{room.roomNumber}</p>
                    <p className="text-gray-500 text-sm">Capacity: {room.capacity} guests</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FaCalendarCheck className="text-primary-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Stay Details</h3>
                    <p className="text-gray-600">
                      Check-in: {new Date(checkIn).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                    <p className="text-gray-600">
                      Check-out: {new Date(checkOut).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                    <p className="text-gray-500 text-sm">Guests: {guests} | Nights: {nights}</p>
                  </div>
                </div>
              </div>

              <button
                onClick={handleConfirmBooking}
                disabled={loading}
                className="w-full mt-8 bg-primary-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-primary-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white"></div>
                ) : (
                  <>
                    <FaCheckCircle /> Confirm Booking
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-24">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Price Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Room Type</span>
                  <span className="font-semibold">{room.type}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Nights</span>
                  <span className="font-semibold">{nights}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Price per Night</span>
                  <span className="font-semibold">${room.pricePerNight}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Guests</span>
                  <span className="font-semibold">{guests}</span>
                </div>
                <hr />
                <div className="flex justify-between text-xl font-bold">
                  <span className="text-gray-800">Total</span>
                  <span className="text-primary-600">${totalPrice}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
