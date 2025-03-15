const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// Create a payment session
exports.createCheckoutSession = async (req, res) => {
  const { item } = req.body;

  if (!item || !item.name || !item.price) {
    return res.status(400).json({ error: 'Missing item data' });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: item.name,
            },
            unit_amount: item.price * 100,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: process.env.FRONTEND_URL + "/payment-success",
      cancel_url: process.env.FRONTEND_URL + "/payment-cancel",
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error('Stripe Error:', error.message);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
};