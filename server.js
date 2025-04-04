const express = require('express');
const admin = require('firebase-admin');
const app = express();
app.use(express.json());

// 🔐 Load Firebase service account key
const serviceAccount = require('./firebaseKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// ✅ Test route
app.get('/', (req, res) => {
  res.send('Firebase backend is running!');
});

// 🐾 Add new animal fundraiser
app.post('/add-animal', async (req, res) => {
  try {
    const data = req.body;
    const docRef = await db.collection('animals').add(data);
    res.status(201).json({ id: docRef.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🐕 Get all animal fundraisers
app.get('/animals', async (req, res) => {
  try {
    const snapshot = await db.collection('animals').get();
    const animals = [];
    snapshot.forEach(doc => {
      animals.push({ id: doc.id, ...doc.data() });
    });
    res.json(animals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
