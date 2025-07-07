const express = require('express');
const admin = require('firebase-admin');

const app = express();
app.use(express.json());

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

app.post('/send', async (req, res) => {
  const { tokens, title, body } = req.body;

  try {
    const response = await admin.messaging().sendMulticast({
      tokens,
      notification: { title, body },
    });

    res.json({ success: true, response });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = app;
