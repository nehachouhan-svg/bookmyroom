import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import RoomCard from '../components/RoomCard';
import Loader from '../components/Loader';
import { FaHotel, FaStar, FaShieldAlt, FaHeadset, FaArrowRight, FaBed, FaUtensils, FaDumbbell, FaSwimmer, FaWifi, FaCar } from 'react-icons/fa';

const Home = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const { data } = await axios.get('/api/rooms');
        setRooms(data.slice(0, 3));
      } catch (error) {
        console.error('Error fetching rooms:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, []);

  const amenities = [
    { icon: <FaSwimmer className="text-3xl" />, title: 'Swimming Pool', desc: 'Outdoor heated pool' },
    { icon: <FaDumbbell className="text-3xl" />, title: 'Fitness Center', desc: 'Modern gym equipment' },
    { icon: <FaUtensils className="text-3xl" />, title: 'Restaurant', desc: 'Fine dining experience' },
    { icon: <FaWifi className="text-3xl" />, title: 'Free WiFi', desc: 'High-speed internet' },
    { icon: <FaCar className="text-3xl" />, title: 'Free Parking', desc: 'Secure parking lot' },
    { icon: <FaHeadset className="text-3xl" />, title: '24/7 Service', desc: 'Round the clock support' },
  ];

  return (
    <div>
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 min-h-[90vh] flex items-center">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
                Experience Luxury & <span className="text-yellow-400">Comfort</span> Like Never Before
              </h1>
              <p className="text-gray-200 text-lg mb-8 leading-relaxed">
                Welcome to BookMyRoom — where world-class hospitality meets modern elegance. 
                Book your perfect stay with us and create unforgettable memories.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/rooms"
                  className="bg-yellow-500 text-gray-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-yellow-400 transition-all transform hover:scale-105 flex items-center gap-2"
                >
                  Book Now <FaArrowRight />
                </Link>
                <Link
                  to="/about"
                  className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-all"
                >
                  Learn More
                </Link>
              </div>
              <div className="flex items-center gap-8 mt-10">
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400">500+</div>
                  <div className="text-gray-300 text-sm">Rooms</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400">2000+</div>
                  <div className="text-gray-300 text-sm">Happy Guests</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400">4.8</div>
                  <div className="text-gray-300 text-sm">Rating</div>
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <img
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=500&fit=crop"
                alt="Hotel"
                className="rounded-2xl shadow-2xl animate-fade-in"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-sm text-primary-600 font-semibold uppercase tracking-wider">Why Choose Us</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">Excellence in Every Detail</h3>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              We pride ourselves on delivering exceptional service and creating an unforgettable experience for every guest.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all text-center group">
              <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:bg-primary-600 transition-colors">
                <FaHotel className="text-2xl text-primary-600 group-hover:text-white transition-colors" />
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-2">Premium Rooms</h4>
              <p className="text-gray-600">Luxuriously appointed rooms with modern amenities and breathtaking views.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all text-center group">
              <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:bg-primary-600 transition-colors">
                <FaStar className="text-2xl text-primary-600 group-hover:text-white transition-colors" />
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-2">5-Star Service</h4>
              <p className="text-gray-600">Our dedicated staff ensures your every need is met with a smile.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all text-center group">
              <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:bg-primary-600 transition-colors">
                <FaShieldAlt className="text-2xl text-primary-600 group-hover:text-white transition-colors" />
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-2">Secure Booking</h4>
              <p className="text-gray-600">Safe and encrypted booking process with instant confirmation.</p>
            </div>
          </div>
        </div>
      </section>

      {loading ? (
        <Loader />
      ) : rooms.length > 0 && (
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="text-sm text-primary-600 font-semibold uppercase tracking-wider">Our Rooms</h2>
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">Featured Rooms</h3>
              </div>
              <Link to="/rooms" className="hidden sm:flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700">
                View All <FaArrowRight />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {rooms.map((room) => (
                <RoomCard key={room._id} room={room} />
              ))}
            </div>
            <div className="text-center mt-8 sm:hidden">
              <Link to="/rooms" className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700">
                View All Rooms <FaArrowRight />
              </Link>
            </div>
          </div>
        </section>
      )}

      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-sm text-yellow-400 font-semibold uppercase tracking-wider">Amenities</h2>
            <h3 className="text-3xl md:text-4xl font-bold mt-2">Everything You Need</h3>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
              Enjoy access to our world-class facilities designed for your comfort and convenience.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {amenities.map((item, idx) => (
              <div key={idx} className="bg-gray-800 p-6 rounded-2xl text-center hover:bg-gray-700 transition-all group">
                <div className="text-yellow-400 group-hover:scale-110 transition-transform mb-3">
                  {item.icon}
                </div>
                <h4 className="font-semibold text-sm">{item.title}</h4>
                <p className="text-gray-400 text-xs mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready for an Unforgettable Experience?
          </h2>
          <p className="text-primary-100 text-lg mb-8">
            Book your room now and enjoy exclusive discounts on your first stay!
          </p>
          <Link
            to="/rooms"
            className="inline-block bg-yellow-500 text-gray-900 px-10 py-4 rounded-xl font-bold text-lg hover:bg-yellow-400 transition-all transform hover:scale-105"
          >
            Book Your Stay Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
