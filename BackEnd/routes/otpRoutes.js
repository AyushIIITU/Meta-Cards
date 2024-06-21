const express = require('express');
const { sendOTP, verifyOTP,verifyFirstTimeOTP } = require('../controllers/otpController');
const { route } = require('./userRoutes');

const router = express.Router();

router.get('/api/sendOTP', sendOTP);
router.post('/api/register',verifyFirstTimeOTP);
router.get('/api/verifyOTP', verifyOTP);

module.exports = router;