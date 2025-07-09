const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/social_analytics', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Mock data for profile metrics
const profileMetrics = {
  impressions: 23412,
  engagements: 11750,
  clicks: 157,
  audienceGrowth: {
    twitter: [10, 20, 30, 40, 35, 45, 50],
    facebook: [5, 15, 25, 35, 30, 40, 45],
    instagram: [8, 18, 28, 38, 33, 43, 48],
    linkedin: [12, 22, 32, 42, 37, 47, 52],
  },
  dates: ['2023-10-25', '2023-10-26', '2023-10-27', '2023-10-28', '2023-10-29', '2023-10-30', '2023-10-31'],
};

// Routes
app.get('/api/profile-metrics', (req, res) => {
  res.json(profileMetrics);
});

// GPT-based content suggestions (mock)
app.post('/api/gpt-suggestions', (req, res) => {
  const { prompt } = req.body;
  // Mock response
  res.json({
    suggestions: [
      `Suggested post based on prompt: "${prompt}" - Engage your audience with this content!`,
      `Another suggestion for: "${prompt}" - Try this creative angle.`,
    ],
  });
});

// Sentiment/emotion detection (mock)
app.post('/api/sentiment-analysis', (req, res) => {
  const { text } = req.body;
  // Mock response
  res.json({
    sentiment: 'positive',
    emotions: ['joy', 'trust'],
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
