const express = require('express');
const mongoose = require('mongoose');
const mentorRouter = require('./routers/mentorRouter');
const studentRouter = require('./routers/studentRouter');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose
  .connect(process.env.DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
  });

// Middleware
app.use(express.json());

// Routes
app.use('/mentors', mentorRouter);
app.use('/students', studentRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
