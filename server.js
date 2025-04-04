const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Home route — used to test if backend is working
app.get("/", (req, res) => {
  res.send("Server is running");
});

// Donation route — handles POST from Wix
app.post("/donate", (req, res) => {
  const { name, amount } = req.body;
  console.log("Received donation:", name, amount);
  res.json({ message: "Donation saved successfully" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
