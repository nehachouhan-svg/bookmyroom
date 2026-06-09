import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaHotel, FaBars, FaTimes, FaUser, FaSignOutAlt, FaTachometerAlt, FaBookOpen, FaHome, FaInfoCircle, FaEnvelope } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, admin, logoutUser, logoutAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    if (admin) {
      logoutAdmin();
      navigate('/');
    } else {
      logoutUser();
      navigate('/');
    }
    setDropdownOpen(false);
  };

  const navLinks = [
    { title: 'Home', path: '/', icon: <FaHome /> },
    { title: 'Rooms', path: '/rooms', icon: <FaHotel /> },
    { title: 'About', path: '/about', icon: <FaInfoCircle /> },
    { title: 'Contact', path: '/contact', icon: <FaEnvelope /> },
  ];

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <FaHotel className="text-primary-600 text-2xl" />
              <span className="text-xl font-bold text-gray-800">
                Book<span className="text-primary-600">MyRoom</span>
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-gray-600 hover:text-primary-600 font-medium transition-colors flex items-center gap-1.5"
              >
                {link.icon} {link.title}
              </Link>
            ))}

            {admin ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-full hover:bg-primary-700 transition-colors"
                >
                  <FaUser /> {admin.name}
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl py-2">
                    <Link
                      to="/admin/dashboard"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      <FaTachometerAlt /> Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-gray-100 w-full"
                    >
                      <FaSignOutAlt /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : user ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-full hover:bg-primary-700 transition-colors"
                >
                  <FaUser /> {user.name}
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl py-2">
                    <Link
                      to="/dashboard"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      <FaTachometerAlt /> Dashboard
                    </Link>
                    <Link
                      to="/my-bookings"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      <FaBookOpen /> My Bookings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-gray-100 w-full"
                    >
                      <FaSignOutAlt /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-primary-600 font-medium transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-primary-600 text-white px-5 py-2 rounded-full hover:bg-primary-700 transition-colors font-medium"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700">
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-3 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 text-gray-600 hover:text-primary-600 font-medium py-2"
              >
                {link.icon} {link.title}
              </Link>
            ))}
            {user && (
              <>
                <Link
                  to="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 text-gray-600 hover:text-primary-600 font-medium py-2"
                >
                  <FaTachometerAlt /> Dashboard
                </Link>
                <Link
                  to="/my-bookings"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 text-gray-600 hover:text-primary-600 font-medium py-2"
                >
                  <FaBookOpen /> My Bookings
                </Link>
              </>
            )}
            <hr />
            {user || admin ? (
              <button
                onClick={() => { handleLogout(); setIsOpen(false); }}
                className="flex items-center gap-2 text-red-600 font-medium py-2 w-full"
              >
                <FaSignOutAlt /> Logout
              </button>
            ) : (
              <div className="flex gap-3 pt-2">
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 text-center border border-primary-600 text-primary-600 px-4 py-2 rounded-full font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 text-center bg-primary-600 text-white px-4 py-2 rounded-full font-medium"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;



