import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from '../components/Loader';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { FaBed, FaUsers, FaWifi, FaCheck, FaTimes, FaArrowLeft, FaCalendarCheck, FaSnowflake, FaTv, FaCoffee, FaBath } from 'react-icons/fa';

const RoomDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const { data } = await axios.get(`/api/rooms/${id}`);
        setRoom(data);
      } catch (error) {
        toast.error('Failed to load room details');
        navigate('/rooms');
      } finally {
        setLoading(false);
      }
    };
    fetchRoom();
  }, [id]);

  const handleBooking = () => {
    if (!user) {
      toast.error('Please login to book a room');
      navigate('/login');
      return;
    }
    if (!checkIn || !checkOut) {
      toast.error('Please select check-in and check-out dates');
      return;
    }
    navigate('/booking', { state: { room, checkIn, checkOut, guests } });
  };

  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const getMinCheckOut = () => {
    if (!checkIn) return getMinDate();
    const nextDay = new Date(checkIn);
    nextDay.setDate(nextDay.getDate() + 1);
    return nextDay.toISOString().split('T')[0];
  };

  const amenityIcons = {
    'WiFi': <FaWifi />,
    'AC': <FaSnowflake />,
    'TV': <FaTv />,
    'Coffee': <FaCoffee />,
    'Bathroom': <FaBath />,
  };

  if (loading) return <Loader />;
  if (!room) return null;

  const defaultImage = 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&h=500&fit=crop';

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to="/rooms" className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold mb-6">
          <FaArrowLeft /> Back to Rooms
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl overflow-hidden shadow-xl">
              <img
                src={room.images?.[0] || defaultImage}
                alt={room.type}
                className="w-full h-[400px] object-cover"
              />
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-800">{room.type} Room</h1>
                    <p className="text-gray-500 mt-1">Room #{room.roomNumber}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-primary-600">${room.pricePerNight}</div>
                    <div className="text-gray-500 text-sm">per night</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${
                    room.isAvailable ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {room.isAvailable ? <FaCheck /> : <FaTimes />}
                    {room.isAvailable ? 'Available' : 'Currently Booked'}
                  </span>
                  <span className="flex items-center gap-1.5 text-gray-600">
                    <FaBed /> {room.type}
                  </span>
                  <span className="flex items-center gap-1.5 text-gray-600">
                    <FaUsers /> Up to {room.capacity} guests
                  </span>
                </div>

                <div className="border-t pt-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">Description</h2>
                  <p className="text-gray-600 leading-relaxed">{room.description}</p>
                </div>

                {room.amenities?.length > 0 && (
                  <div className="border-t pt-6 mt-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Amenities</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {room.amenities.map((amenity, idx) => (
                        <div key={idx} className="flex items-center gap-2 bg-gray-50 px-4 py-3 rounded-xl">
                          <span className="text-primary-600">
                            {amenityIcons[amenity] || <FaCheck />}
                          </span>
                          <span className="text-gray-700">{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-24">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Book This Room</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Check-in Date</label>
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    min={getMinDate()}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Check-out Date</label>
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    min={getMinCheckOut()}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Guests</label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:outline-none"
                  >
                    {[...Array(room.capacity)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>{i + 1} Guest{i > 0 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>

                {checkIn && checkOut && (
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Nights:</span>
                      <span className="font-semibold">
                        {Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24))}
                      </span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Price/Night:</span>
                      <span className="font-semibold">${room.pricePerNight}</span>
                    </div>
                    <hr className="my-2" />
                    <div className="flex justify-between text-lg">
                      <span className="font-bold">Total:</span>
                      <span className="font-bold text-primary-600">
                        ${Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)) * room.pricePerNight}
                      </span>
                    </div>
                  </div>
                )}

                <button
                  onClick={handleBooking}
                  disabled={!room.isAvailable}
                  className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-lg transition-all ${
                    room.isAvailable
                      ? 'bg-primary-600 text-white hover:bg-primary-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <FaCalendarCheck /> {room.isAvailable ? 'Book Now' : 'Not Available'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
