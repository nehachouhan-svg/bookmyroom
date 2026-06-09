import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import {
  FaHotel, FaUsers, FaBookOpen, FaDollarSign, FaBed, FaPlus, FaEdit, FaTrash, FaCheck, FaTimes, FaSignOutAlt,
  FaChartBar, FaHome, FaCalendarCheck, FaUserShield, FaSpinner, FaBan, FaCheckCircle, FaClock,
} from 'react-icons/fa';

const AdminDashboard = () => {
  const { admin, logoutAdmin } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showRoomModal, setShowRoomModal] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);
  const [roomForm, setRoomForm] = useState({
    roomNumber: '', type: 'Single', pricePerNight: '', capacity: '2', description: '', isAvailable: true,
   image: ''});

  const fetchData = async () => {
    setLoading(true);
    try {
      const config = { headers: { Authorization: `Bearer ${admin.token}` } };
      if (activeTab === 'dashboard') {
        const { data } = await axios.get('/api/admin/dashboard', config);
        setStats(data);
      } else if (activeTab === 'rooms') {
        const { data } = await axios.get('/api/rooms');
        setRooms(data);
      } else if (activeTab === 'bookings') {
        const { data } = await axios.get('/api/admin/bookings', config);
        setBookings(data);
      } else if (activeTab === 'users') {
        const { data } = await axios.get('/api/admin/users', config);
        setUsers(data);
      }
    } catch (error) {
      toast.error('Failed to load data');
      if (error.response?.status === 401) {
        logoutAdmin();
        navigate('/admin/login');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, [activeTab]);

  const handleRoomSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = { headers: { Authorization: `Bearer ${admin.token}` } };
      const payload = { ...roomForm, pricePerNight: Number(roomForm.pricePerNight), capacity: Number(roomForm.capacity) };
      if (editingRoom) {
        await axios.put(`/api/rooms/${editingRoom._id}`, payload, config);
        toast.success('Room updated successfully');
      } else {
        await axios.post('/api/rooms', payload, config);
        toast.success('Room created successfully');
      }
      setShowRoomModal(false);
      setEditingRoom(null);
      setRoomForm({ roomNumber: '', type: 'Single', pricePerNight: '', capacity: '2', description: '', isAvailable: true });
      fetchData();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save room');
    }
  };

  const handleDeleteRoom = async (id) => {
    if (!window.confirm('Delete this room permanently?')) return;
    try {
      const config = { headers: { Authorization: `Bearer ${admin.token}` } };
      await axios.delete(`/api/rooms/${id}`, config);
      toast.success('Room deleted');
      fetchData();
    } catch (error) {
      toast.error('Failed to delete room');
    }
  };

  const handleEditRoom = (room) => {
    setEditingRoom(room);
    setRoomForm({
      roomNumber: room.roomNumber, type: room.type, pricePerNight: room.pricePerNight,
      capacity: room.capacity, description: room.description, isAvailable: room.isAvailable,
    });
    setShowRoomModal(true);
  };

  const handleBookingStatus = async (id, status) => {
    try {
      const config = { headers: { Authorization: `Bearer ${admin.token}` } };
      await axios.put(`/api/admin/bookings/${id}`, { status }, config);
      toast.success(`Booking ${status.toLowerCase()}`);
      fetchData();
    } catch (error) {
      toast.error('Failed to update booking');
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm('Delete this user and all their bookings?')) return;
    try {
      const config = { headers: { Authorization: `Bearer ${admin.token}` } };
      await axios.delete(`/api/admin/users/${id}`, config);
      toast.success('User deleted');
      fetchData();
    } catch (error) {
      toast.error('Failed to delete user');
    }
  };

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: <FaChartBar /> },
    { id: 'rooms', label: 'Rooms', icon: <FaBed /> },
    { id: 'bookings', label: 'Bookings', icon: <FaBookOpen /> },
    { id: 'users', label: 'Users', icon: <FaUsers /> },
  ];

  const roomTypes = ['Single', 'Double', 'Deluxe', 'AC', 'Non-AC'];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-3">
              <FaUserShield className="text-primary-600 text-2xl" />
              <div>
                <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
                <p className="text-sm text-gray-500">Welcome, {admin?.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold text-sm">
                <FaHome /> Back to Site
              </Link>
              <button onClick={() => { logoutAdmin(); navigate('/'); }} className="flex items-center gap-2 text-red-600 hover:text-red-700 font-semibold">
                <FaSignOutAlt /> Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-3 font-medium text-sm border-b-2 transition-colors ${
                  activeTab === tab.id ? 'border-primary-600 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary-600"></div>
          </div>
        ) : activeTab === 'dashboard' && stats ? (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
              <div className="bg-white p-6 rounded-2xl shadow-lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center"><FaBed className="text-blue-600 text-xl" /></div>
                  <div><div className="text-2xl font-bold text-gray-800">{stats.totalRooms}</div><div className="text-gray-500 text-sm">Total Rooms</div></div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center"><FaCheck className="text-green-600 text-xl" /></div>
                  <div><div className="text-2xl font-bold text-gray-800">{stats.availableRooms}</div><div className="text-gray-500 text-sm">Available</div></div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center"><FaBookOpen className="text-purple-600 text-xl" /></div>
                  <div><div className="text-2xl font-bold text-gray-800">{stats.totalBookings}</div><div className="text-gray-500 text-sm">Total Bookings</div></div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center"><FaUsers className="text-yellow-600 text-xl" /></div>
                  <div><div className="text-2xl font-bold text-gray-800">{stats.totalUsers}</div><div className="text-gray-500 text-sm">Total Users</div></div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center"><FaDollarSign className="text-green-600 text-xl" /></div>
                  <div><div className="text-2xl font-bold text-gray-800">${stats.totalRevenue}</div><div className="text-gray-500 text-sm">Revenue</div></div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Recent Bookings</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b text-left text-gray-500">
                      <th className="pb-3 font-semibold">Guest</th>
                      <th className="pb-3 font-semibold">Room</th>
                      <th className="pb-3 font-semibold">Dates</th>
                      <th className="pb-3 font-semibold">Amount</th>
                      <th className="pb-3 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.recentBookings?.map((b) => (
                      <tr key={b._id} className="border-b last:border-0">
                        <td className="py-3">{b.user?.name}</td>
                        <td className="py-3">{b.room?.type} #{b.room?.roomNumber}</td>
                        <td className="py-3 text-gray-500">{new Date(b.checkInDate).toLocaleDateString()} - {new Date(b.checkOutDate).toLocaleDateString()}</td>
                        <td className="py-3 font-semibold">${b.totalPrice}</td>
                        <td className="py-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            b.status === 'Confirmed' ? 'bg-green-100 text-green-700' :
                            b.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                            b.status === 'Cancelled' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                          }`}>{b.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : activeTab === 'rooms' ? (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">Room Management</h2>
              <button
                onClick={() => { setEditingRoom(null); setRoomForm({ roomNumber: '', type: 'Single', pricePerNight: '', capacity: '2', description: '', isAvailable: true }); setShowRoomModal(true); }}
                className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2.5 rounded-xl font-semibold hover:bg-primary-700"
              >
                <FaPlus /> Add Room
              </button>
            </div>
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left px-6 py-3 font-semibold text-gray-600">Number</th>
                      <th className="text-left px-6 py-3 font-semibold text-gray-600">Type</th>
                      <th className="text-left px-6 py-3 font-semibold text-gray-600">Price/Night</th>
                      <th className="text-left px-6 py-3 font-semibold text-gray-600">Capacity</th>
                      <th className="text-left px-6 py-3 font-semibold text-gray-600">Status</th>
                      <th className="text-left px-6 py-3 font-semibold text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rooms.map((room) => (
                      <tr key={room._id} className="border-t hover:bg-gray-50">
                        <td className="px-6 py-4 font-semibold">#{room.roomNumber}</td>
                        <td className="px-6 py-4">{room.type}</td>
                        <td className="px-6 py-4">${room.pricePerNight}</td>
                        <td className="px-6 py-4">{room.capacity} guests</td>
                        <td className="px-6 py-4">
                          <span className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold w-fit ${room.isAvailable ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {room.isAvailable ? <FaCheck /> : <FaTimes />} {room.isAvailable ? 'Available' : 'Booked'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button onClick={() => handleEditRoom(room)} className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200"><FaEdit /></button>
                            <button onClick={() => handleDeleteRoom(room._id)} className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"><FaTrash /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : activeTab === 'bookings' ? (
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">All Bookings</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left px-6 py-3 font-semibold text-gray-600">Guest</th>
                    <th className="text-left px-6 py-3 font-semibold text-gray-600">Room</th>
                    <th className="text-left px-6 py-3 font-semibold text-gray-600">Check-in</th>
                    <th className="text-left px-6 py-3 font-semibold text-gray-600">Check-out</th>
                    <th className="text-left px-6 py-3 font-semibold text-gray-600">Amount</th>
                    <th className="text-left px-6 py-3 font-semibold text-gray-600">Status</th>
                    <th className="text-left px-6 py-3 font-semibold text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((b) => (
                    <tr key={b._id} className="border-t hover:bg-gray-50">
                      <td className="px-6 py-4">{b.user?.name}<br /><span className="text-gray-500 text-xs">{b.user?.email}</span></td>
                      <td className="px-6 py-4">{b.room?.type} #{b.room?.roomNumber}</td>
                      <td className="px-6 py-4">{new Date(b.checkInDate).toLocaleDateString()}</td>
                      <td className="px-6 py-4">{new Date(b.checkOutDate).toLocaleDateString()}</td>
                      <td className="px-6 py-4 font-semibold">${b.totalPrice}</td>
                      <td className="px-6 py-4">
                        <span className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold w-fit ${
                          b.status === 'Confirmed' ? 'bg-green-100 text-green-700' :
                          b.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                          b.status === 'Cancelled' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                        }`}>
                          {b.status === 'Pending' && <FaClock />}
                          {b.status === 'Confirmed' && <FaCheckCircle />}
                          {b.status === 'Cancelled' && <FaBan />}
                          {b.status === 'Completed' && <FaCheckCircle />}
                          {b.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-1">
                          {b.status === 'Pending' && (
                            <>
                              <button onClick={() => handleBookingStatus(b._id, 'Confirmed')} className="p-1.5 bg-green-100 text-green-600 rounded hover:bg-green-200" title="Confirm"><FaCheck /></button>
                              <button onClick={() => handleBookingStatus(b._id, 'Cancelled')} className="p-1.5 bg-red-100 text-red-600 rounded hover:bg-red-200" title="Cancel"><FaTimes /></button>
                            </>
                          )}
                          {b.status === 'Confirmed' && (
                            <button onClick={() => handleBookingStatus(b._id, 'Completed')} className="p-1.5 bg-blue-100 text-blue-600 rounded hover:bg-blue-200" title="Complete"><FaCheckCircle /></button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : activeTab === 'users' ? (
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">User Management</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left px-6 py-3 font-semibold text-gray-600">Name</th>
                    <th className="text-left px-6 py-3 font-semibold text-gray-600">Email</th>
                    <th className="text-left px-6 py-3 font-semibold text-gray-600">Phone</th>
                    <th className="text-left px-6 py-3 font-semibold text-gray-600">Joined</th>
                    <th className="text-left px-6 py-3 font-semibold text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u._id} className="border-t hover:bg-gray-50">
                      <td className="px-6 py-4 font-semibold">{u.name}</td>
                      <td className="px-6 py-4">{u.email}</td>
                      <td className="px-6 py-4">{u.phone}</td>
                      <td className="px-6 py-4 text-gray-500">{new Date(u.createdAt).toLocaleDateString()}</td>
                      <td className="px-6 py-4">
                        <button onClick={() => handleDeleteUser(u._id)} className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"><FaTrash /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : null}
      </div>

      {showRoomModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-8 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-gray-800 mb-6">
              {editingRoom ? 'Edit Room' : 'Add New Room'}
            </h3>
            <form onSubmit={handleRoomSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Room Number</label>
                  <input type="text" value={roomForm.roomNumber} onChange={(e) => setRoomForm({ ...roomForm, roomNumber: e.target.value })} required className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select value={roomForm.type} onChange={(e) => setRoomForm({ ...roomForm, type: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:outline-none">
                    {roomTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price per Night ($)</label>
                  <input type="number" value={roomForm.pricePerNight} onChange={(e) => setRoomForm({ ...roomForm, pricePerNight: e.target.value })} required min={0} className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Capacity</label>
                  <input type="number" value={roomForm.capacity} onChange={(e) => setRoomForm({ ...roomForm, capacity: e.target.value })} required min={1} className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea value={roomForm.description} onChange={(e) => setRoomForm({ ...roomForm, description: e.target.value })} required rows={3} className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:outline-none"></textarea>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="isAvailable" checked={roomForm.isAvailable} onChange={(e) => setRoomForm({ ...roomForm, isAvailable: e.target.checked })} className="w-4 h-4 text-primary-600 rounded" />
                <label htmlFor="isAvailable" className="text-sm text-gray-700">Available for booking</label>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" className="flex-1 bg-primary-600 text-white py-2.5 rounded-xl font-semibold hover:bg-primary-700">
                  {editingRoom ? 'Update Room' : 'Create Room'}
                </button>
                <button type="button" onClick={() => setShowRoomModal(false)} className="px-6 py-2.5 border border-gray-300 rounded-xl hover:bg-gray-50">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
