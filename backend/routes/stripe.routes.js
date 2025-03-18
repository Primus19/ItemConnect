const express = require('express');
const router = express.Router();
const stripeController = require('../payments/stripe.controller');

router.post('/create-checkout-session', stripeController.createCheckoutSession);

module.exports = router;