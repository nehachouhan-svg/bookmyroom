import { Link } from 'react-router-dom';
import { FaHotel, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <FaHotel className="text-primary-400 text-2xl" />
              <span className="text-xl font-bold">
                Book<span className="text-primary-400">MyRoom</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Experience luxury and comfort at BookMyRoom. We provide the best accommodation experience with world-class amenities and exceptional service.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors"><FaFacebook size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors"><FaTwitter size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors"><FaInstagram size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors"><FaLinkedin size={20} /></a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-400 hover:text-primary-400 transition-colors text-sm">Home</Link></li>
              <li><Link to="/rooms" className="text-gray-400 hover:text-primary-400 transition-colors text-sm">Rooms</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-primary-400 transition-colors text-sm">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-primary-400 transition-colors text-sm">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Room Types</h3>
            <ul className="space-y-3">
              <li className="text-gray-400 text-sm">Single Room</li>
              <li className="text-gray-400 text-sm">Double Room</li>
              <li className="text-gray-400 text-sm">Deluxe Room</li>
              <li className="text-gray-400 text-sm">AC Room</li>
              <li className="text-gray-400 text-sm">Non-AC Room</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <FaMapMarkerAlt className="text-primary-400" /> 123 Hotel Street, New York, NY
              </li>
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <FaPhone className="text-primary-400" /> +1 (555) 123-4567
              </li>
              <li className="flex items-center gap-2 text-gray-400 text-sm">
                <FaEnvelope className="text-primary-400" /> info@bookmyroom.com
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} BookMyRoom. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
