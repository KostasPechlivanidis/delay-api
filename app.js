const express = require('express');
const app = express();

// Define your API key
const apiKey = 'your-api-key';

// Middleware function to validate API key
const validateApiKey = (req, res, next) => {
  const providedApiKey = req.query.apiKey; // assuming API key is provided as a query parameter
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

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
