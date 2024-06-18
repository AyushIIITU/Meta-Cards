const express = require('express');
const { sendOTP, verifyOTP } = require('../controllers/otpController');

const router = express.Router();

router.get('/api/sendOTP', sendOTP);
router.get('/api/verifyOTP', verifyOTP);

module.exports = router;