const axios = require('axios');

exports.createPayPalTransaction = async (req, res) => {
  const { item } = req.body;

  if (!item || !item.name || !item.price) {
    return res.status(400).json({ error: 'Missing item data' });
  }

  try {
    const auth = await axios({
      url: 'https://api-m.sandbox.paypal.com/v1/oauth2/token',
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Accept-Language': 'en_US',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      auth: {
        username: process.env.PAYPAL_CLIENT_ID,
        password: process.env.PAYPAL_SECRET
      },
      data: 'grant_type=client_credentials'
    });

    const order = await axios({
      url: 'https://api-m.sandbox.paypal.com/v2/checkout/orders',
      method: 'post',
      headers: {
        Authorization: `Bearer ${auth.data.access_token}`,
        'Content-Type': 'application/json'
      },
      data: {
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            currency_code: 'USD',
            value: item.price.toFixed(2)
          },
          description: item.name
        }],
        application_context: {
          return_url: `${process.env.FRONTEND_URL}/payment-success`,
          cancel_url: `${process.env.FRONTEND_URL}/payment-cancel`
        }
      }
    });

    res.json({ url: order.data.links.find(link => link.rel === 'approve').href });
  } catch (err) {
    console.error("PayPal Error:", err.message);
    res.status(500).json({ error: 'PayPal checkout failed' });
  }
};