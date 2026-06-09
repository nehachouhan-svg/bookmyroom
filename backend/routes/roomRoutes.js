const express = require('express');
const router = express.Router();
const {
  getRooms,
  getRoomById,
  createRoom,
  updateRoom,
  deleteRoom,
} = require('../controllers/roomController');
const { adminProtect } = require('../middlewares/authMiddleware');

router.get('/', getRooms);
router.get('/:id', getRoomById);
router.post('/', adminProtect, createRoom);
router.put('/:id', adminProtect, updateRoom);
router.delete('/:id', adminProtect, deleteRoom);

module.exports = router;
