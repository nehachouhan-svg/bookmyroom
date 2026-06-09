import { Link } from 'react-router-dom';
import { FaHotel, FaAward, FaUsers, FaHeart, FaQuoteLeft, FaArrowRight } from 'react-icons/fa';

const About = () => {
  const stats = [
    { icon: <FaHotel />, value: '10+', label: 'Years Experience' },
    { icon: <FaAward />, value: '50+', label: 'Awards Won' },
    { icon: <FaUsers />, value: '2000+', label: 'Happy Guests' },
    { icon: <FaHeart />, value: '99%', label: 'Satisfaction' },
  ];

  const team = [
    { name: 'John Smith', role: 'CEO & Founder', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop' },
    { name: 'Sarah Johnson', role: 'General Manager', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop' },
    { name: 'Mike Wilson', role: 'Head Chef', img: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=200&h=200&fit=crop' },
    { name: 'Emily Davis', role: 'Guest Relations', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop' },
  ];

  return (
    <div>
      <section className="bg-gradient-to-br from-primary-900 to-primary-700 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">About BookMyRoom</h1>
          <p className="text-primary-100 text-lg max-w-3xl mx-auto">
            Discover the story behind the most trusted name in hotel accommodation.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&h=400&fit=crop"
                alt="Hotel Lobby"
                className="rounded-2xl shadow-xl"
              />
            </div>
            <div>
              <h2 className="text-sm text-primary-600 font-semibold uppercase tracking-wider">Our Story</h2>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-6">
                A Decade of Excellence in Hospitality
              </h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Founded in 2014, BookMyRoom started with a simple vision: to provide travelers with 
                exceptional accommodation experiences at affordable prices. What began as a small 
                boutique hotel has grown into one of the most recognized hotel chains in the country.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Today, we operate over 500 rooms across multiple properties, each designed to offer 
                the perfect blend of comfort, style, and functionality. Our commitment to quality 
                service and guest satisfaction remains at the heart of everything we do.
              </p>
              <Link
                to="/rooms"
                className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-700 transition-all"
              >
                Explore Rooms <FaArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all">
                <div className="text-primary-600 text-3xl mb-3 flex justify-center">{stat.icon}</div>
                <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-gray-600 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-sm text-primary-600 font-semibold uppercase tracking-wider">Our Team</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">Meet the People Behind the Magic</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {team.map((member, idx) => (
              <div key={idx} className="text-center group">
                <div className="w-40 h-40 mx-auto mb-4 rounded-full overflow-hidden border-4 border-primary-200 group-hover:border-primary-500 transition-all">
                  <img src={member.img} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <h4 className="text-lg font-bold text-gray-800">{member.name}</h4>
                <p className="text-gray-600 text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl">
            <FaQuoteLeft className="text-4xl text-primary-600 mb-4" />
            <p className="text-xl text-gray-700 italic leading-relaxed mb-6">
              "BookMyRoom transformed our vacation experience. The rooms were immaculate, 
              the staff was incredibly helpful, and the amenities exceeded our expectations. 
              We've found our go-to hotel for every trip!"
            </p>
            <div className="flex items-center gap-4">
              <img
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop"
                alt="Guest"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h5 className="font-semibold text-gray-800">Jennifer Adams</h5>
                <p className="text-gray-500 text-sm">Frequent Guest</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
