const express = require('express');
const router = express.Router();
const paypalController = require('../payments/paypal.controller');

router.post('/create-paypal-transaction', paypalController.createPayPalTransaction);

module.exports = router;