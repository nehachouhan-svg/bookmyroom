import { useState, useEffect } from 'react';
import axios from 'axios';
import RoomCard from '../components/RoomCard';
import Loader from '../components/Loader';
import { FaSearch, FaSlidersH, FaTimes } from 'react-icons/fa';

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    type: '',
    minPrice: '',
    maxPrice: '',
    availability: '',
    search: '',
  });
  const [showFilters, setShowFilters] = useState(false);

  const roomTypes = ['Single', 'Double', 'Deluxe', 'AC', 'Non-AC'];

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async (filterParams = {}) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      Object.entries(filterParams).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
      const { data } = await axios.get(`/api/rooms?${params.toString()}`);
      setRooms(data);
    } catch (error) {
      console.error('Error fetching rooms:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = () => {
    const activeFilters = {};
    Object.entries(filters).forEach(([key, value]) => {
      if (value) activeFilters[key] = value;
    });
    fetchRooms(activeFilters);
  };

  const clearFilters = () => {
    setFilters({ type: '', minPrice: '', maxPrice: '', availability: '', search: '' });
    fetchRooms();
  };

  return (
    <div>
      <section className="bg-gradient-to-br from-primary-900 to-primary-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Rooms</h1>
            <p className="text-primary-100 text-lg max-w-2xl mx-auto">
              Choose from our selection of premium rooms designed for your ultimate comfort.
            </p>
          </div>

          <div className="mt-10 max-w-3xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search rooms by type, number, or description..."
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                onKeyDown={(e) => e.key === 'Enter' && handleFilter()}
                className="w-full px-6 py-4 pr-12 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:border-primary-300 text-lg"
              />
              <button
                onClick={handleFilter}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white hover:text-primary-200"
              >
                <FaSearch size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700"
          >
            <FaSlidersH /> {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>

          {showFilters && (
            <div className="mt-6 p-6 bg-white rounded-2xl shadow-lg animate-slide-up">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Room Type</label>
                  <select
                    value={filters.type}
                    onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:outline-none"
                  >
                    <option value="">All Types</option>
                    {roomTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Min Price</label>
                  <input
                    type="number"
                    value={filters.minPrice}
                    onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                    placeholder="$0"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Max Price</label>
                  <input
                    type="number"
                    value={filters.maxPrice}
                    onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                    placeholder="1000"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Availability</label>
                  <select
                    value={filters.availability}
                    onChange={(e) => setFilters({ ...filters, availability: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:outline-none"
                  >
                    <option value="">All</option>
                    <option value="true">Available</option>
                    <option value="false">Booked</option>
                  </select>
                </div>

                <div className="flex items-end gap-2">
                  <button
                    onClick={handleFilter}
                    className="flex-1 bg-primary-600 text-white px-4 py-2.5 rounded-xl font-semibold hover:bg-primary-700 transition-colors"
                  >
                    Apply
                  </button>
                  <button
                    onClick={clearFilters}
                    className="p-2.5 border border-gray-300 rounded-xl hover:bg-gray-100 transition-colors"
                    title="Clear filters"
                  >
                    <FaTimes className="text-gray-500" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <Loader />
          ) : rooms.length === 0 ? (
            <div className="text-center py-20">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">No Rooms Found</h3>
              <p className="text-gray-600">Try adjusting your filters to find available rooms.</p>
            </div>
          ) : (
            <>
              <p className="text-gray-600 mb-6">
                Showing {rooms.length} room{rooms.length !== 1 ? 's' : ''}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {rooms.map((room) => (
                  <RoomCard key={room._id} room={room} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default Rooms;
