const express = require('express');
require('dotenv').config(); // Load environment variables from .env file
const app = express();

// Middleware function to validate API key
const validateApiKey = (req, res, next) => {
  const providedApiKey = req.query.apiKey; // assuming API key is provided as a query parameter
  const apiKey = process.env.API_KEY; // Retrieve API key from environment variable
  if (!providedApiKey || providedApiKey !== apiKey) {
    return res.status(401).send('Unauthorized. Invalid API key.');
  }
  next(); // Proceed to the next middleware/route handler
};

app.get('/delay/:time', validateApiKey, (req, res) => {
  const delayTime = parseInt(req.params.time);
  if (isNaN(delayTime) || delayTime < 0 || delayTime > 60) {
    return res.status(400).send('Invalid delay time. Please provide a value between 0 and 60.');
  }

  setTimeout(() => {
    res.send(`Delayed response for ${delayTime} seconds.`);
  }, delayTime * 1000);
});

const PORT = process.env.PORT || 3000; // Use port from environment variable or default to 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
