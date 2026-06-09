const Room = require('../models/Room');

const getRooms = async (req, res) => {
  try {
    const { type, minPrice, maxPrice, availability, search } = req.query;
    let query = {};

    if (type) query.type = type;
    if (availability !== undefined) query.isAvailable = availability === 'true';
    if (minPrice || maxPrice) {
      query.pricePerNight = {};
      if (minPrice) query.pricePerNight.$gte = Number(minPrice);
      if (maxPrice) query.pricePerNight.$lte = Number(maxPrice);
    }
    if (search) {
      query.$or = [
        { type: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { roomNumber: { $regex: search, $options: 'i' } },
      ];
    }

    const rooms = await Room.find(query).sort({ createdAt: -1 });
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getRoomById = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (room) {
      res.json(room);
    } else {
      res.status(404).json({ message: 'Room not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createRoom = async (req, res) => {
  try {
    const { roomNumber, type, pricePerNight, capacity, description, images, amenities } = req.body;
    const roomExists = await Room.findOne({ roomNumber });
    if (roomExists) {
      return res.status(400).json({ message: 'Room number already exists' });
    }

    const room = await Room.create({
      roomNumber,
      type,
      pricePerNight,
      capacity,
      description,
      images: images || [],
      amenities: amenities || [],
    });

    if (room) {
      res.status(201).json(room);
    } else {
      res.status(400).json({ message: 'Invalid room data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (room) {
      room.roomNumber = req.body.roomNumber || room.roomNumber;
      room.type = req.body.type || room.type;
      room.pricePerNight = req.body.pricePerNight || room.pricePerNight;
      room.capacity = req.body.capacity || room.capacity;
      room.description = req.body.description || room.description;
      room.images = req.body.images || room.images;
      room.amenities = req.body.amenities || room.amenities;
      room.isAvailable =
        req.body.isAvailable !== undefined ? req.body.isAvailable : room.isAvailable;

      const updatedRoom = await room.save();
      res.json(updatedRoom);
    } else {
      res.status(404).json({ message: 'Room not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (room) {
      await room.deleteOne();
      res.json({ message: 'Room removed' });
    } else {
      res.status(404).json({ message: 'Room not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getRooms, getRoomById, createRoom, updateRoom, deleteRoom };
