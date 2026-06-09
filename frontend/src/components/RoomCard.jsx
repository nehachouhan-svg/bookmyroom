import { Link } from 'react-router-dom';
import { FaBed, FaUsers, FaWifi, FaCheck, FaTimes } from 'react-icons/fa';

const RoomCard = ({ room }) => {
  const defaultImage = 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=500&h=300&fit=crop';

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
      <div className="relative overflow-hidden h-56">
        <img
          src={room.images?.[0] || defaultImage}
          alt={room.type}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1.5 rounded-full text-xs font-semibold text-white ${
            room.isAvailable ? 'bg-green-500' : 'bg-red-500'
          }`}>
            {room.isAvailable ? 'Available' : 'Booked'}
          </span>
        </div>
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
          <span className="text-primary-600 font-bold">{room.pricePerNight}</span>
          <span className="text-gray-500 text-xs">/night</span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-xl font-bold text-gray-800">{room.type} Room</h3>
          <span className="text-sm text-gray-500">#{room.roomNumber}</span>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {room.description}
        </p>

        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
          <span className="flex items-center gap-1">
            <FaBed className="text-primary-500" /> {room.type}
          </span>
          <span className="flex items-center gap-1">
            <FaUsers className="text-primary-500" /> Up to {room.capacity}
          </span>
          {room.amenities?.length > 0 && (
            <span className="flex items-center gap-1">
              <FaWifi className="text-primary-500" /> {room.amenities.length} amenities
            </span>
          )}
        </div>

        <Link
          to={`/rooms/{room._id}`}
          className="block w-full text-center bg-primary-600 text-white py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors duration-300"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default RoomCard;
