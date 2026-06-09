const express = require('express');
const router = express.Router();
const {
  loginAdmin,
  registerAdmin,
  getDashboardStats,
  getUsers,
  deleteUser,
} = require('../controllers/adminController');
const { adminProtect } = require('../middlewares/authMiddleware');
const {
  getAllBookings,
  updateBookingStatus,
} = require('../controllers/bookingController');

router.post('/login', loginAdmin);
router.post('/register', registerAdmin);
router.get('/dashboard', adminProtect, getDashboardStats);
router.get('/users', adminProtect, getUsers);
router.delete('/users/:id', adminProtect, deleteUser);
router.get('/bookings', adminProtect, getAllBookings);
router.put('/bookings/:id', adminProtect, updateBookingStatus);

module.exports = router;
