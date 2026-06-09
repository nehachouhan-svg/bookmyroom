const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Admin = require('./models/Admin');
const Room = require('./models/Room');

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/bookmyroom');
    console.log('MongoDB connected for seeding...');

    await Admin.deleteMany();
    await Room.deleteMany();

    const admin = await Admin.create({
      name: 'Admin',
      email: 'admin@bookmyroom.com',
      password: 'admin123',
    });
    console.log(`Admin created: ${admin.email}`);

    const rooms = await Room.insertMany([
      {
        roomNumber: '101',
        type: 'Single',
        pricePerNight: 99,
        capacity: 1,
        description: 'Cozy single room with a comfortable twin bed, work desk, and city view. Perfect for solo travelers seeking comfort and convenience.',
        images: ['https://images.unsplash.com/photo-1598928506311-c55ez637a11a?w=500&h=300&fit=crop'],
        amenities: ['WiFi', 'TV', 'AC', 'Bathroom', 'Coffee'],
        isAvailable: true,
      },
      {
        roomNumber: '102',
        type: 'Single',
        pricePerNight: 109,
        capacity: 1,
        description: 'Premium single room with upgraded amenities, a larger bed, and a scenic cityscape view from the window.',
        images: ['https://images.unsplash.com/photo-1564078516393-cf0bd0da4e8c?w=500&h=300&fit=crop'],
        amenities: ['WiFi', 'TV', 'AC', 'Bathroom', 'Coffee', 'Mini Bar'],
        isAvailable: true,
      },
      {
        roomNumber: '201',
        type: 'Double',
        pricePerNight: 149,
        capacity: 2,
        description: 'Spacious double room with two comfortable twin beds, ideal for friends or colleagues traveling together.',
        images: ['https://images.unsplash.com/photo-1590490360182-c33d57733427?w=500&h=300&fit=crop'],
        amenities: ['WiFi', 'TV', 'AC', 'Bathroom', 'Coffee', 'Safe'],
        isAvailable: true,
      },
      {
        roomNumber: '202',
        type: 'Double',
        pricePerNight: 169,
        capacity: 2,
        description: 'Luxury double room featuring a king-size bed, premium bedding, and a separate sitting area for relaxation.',
        images: ['https://images.unsplash.com/photo-1578683010236-d716f9a3f8c5?w=500&h=300&fit=crop'],
        amenities: ['WiFi', 'TV', 'AC', 'Bathroom', 'Coffee', 'Mini Bar', 'Safe'],
        isAvailable: true,
      },
      {
        roomNumber: '301',
        type: 'Deluxe',
        pricePerNight: 249,
        capacity: 3,
        description: 'Our deluxe room offers a king bed, premium furnishings, a spacious bathroom with soaking tub, and panoramic views.',
        images: ['https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=500&h=300&fit=crop'],
        amenities: ['WiFi', 'TV', 'AC', 'Bathroom', 'Coffee', 'Mini Bar', 'Safe', 'Room Service'],
        isAvailable: true,
      },
      {
        roomNumber: '302',
        type: 'Deluxe',
        pricePerNight: 299,
        capacity: 3,
        description: 'Executive deluxe suite with separate living and dining areas, a private balcony, and exclusive lounge access.',
        images: ['https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=500&h=300&fit=crop'],
        amenities: ['WiFi', 'TV', 'AC', 'Bathroom', 'Coffee', 'Mini Bar', 'Safe', 'Room Service', 'Balcony'],
        isAvailable: true,
      },
      {
        roomNumber: '401',
        type: 'AC',
        pricePerNight: 189,
        capacity: 2,
        description: 'Fully air-conditioned room with climate control, premium cooling, and all modern comforts for a refreshing stay.',
        images: ['https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=500&h=300&fit=crop'],
        amenities: ['WiFi', 'TV', 'AC', 'Bathroom', 'Coffee', 'Mini Bar'],
        isAvailable: true,
      },
      {
        roomNumber: '402',
        type: 'AC',
        pricePerNight: 199,
        capacity: 2,
        description: 'Premium AC room with advanced air purification, smart temperature control, and luxurious interiors.',
        images: ['https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=500&h=300&fit=crop'],
        amenities: ['WiFi', 'TV', 'AC', 'Bathroom', 'Coffee', 'Mini Bar', 'Safe'],
        isAvailable: true,
      },
      {
        roomNumber: '501',
        type: 'Non-AC',
        pricePerNight: 59,
        capacity: 2,
        description: 'Budget-friendly non-AC room with natural ventilation, comfortable bedding, and essential amenities for a pleasant stay.',
        images: ['https://images.unsplash.com/photo-1522771739017-b0471f2f7c1a?w=500&h=300&fit=crop'],
        amenities: ['WiFi', 'TV', 'Bathroom', 'Coffee'],
        isAvailable: true,
      },
      {
        roomNumber: '502',
        type: 'Non-AC',
        pricePerNight: 69,
        capacity: 2,
        description: 'Value non-AC room offering great comfort at an affordable price. Features a fan, TV, and attached bathroom.',
        images: ['https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=500&h=300&fit=crop'],
        amenities: ['WiFi', 'TV', 'Bathroom', 'Coffee', 'Fan'],
        isAvailable: true,
      },
    ]);
    console.log(`${rooms.length} rooms seeded successfully`);
    console.log('\n--- Seed Complete ---');
    console.log('Admin login: admin@bookmyroom.com / admin123');

    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
};

seedData();
