// Import required modules
const express = require('express');
const mongoose = require('mongoose');

// Import route handlers for users and thoughts
const userRoutes = require('./routes/userRoutes');
const thoughtRoutes = require('./routes/thoughtRoutes');

// Create an Express application
const app = express();
const PORT = process.env.PORT || 3000; // Define the port number

app.use(express.json()); // Parse JSON data
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data

// Set up middleware for parsing JSON and URL-encoded data
app.use('/api', thoughtRoutes); // Use thought routes for '/api/thoughts' endpoints
app.use('/api', userRoutes); // Use user routes for '/api/users' endpoints

// Connect to MongoDB database
mongoose.connect('mongodb://127.0.0.1:27017/socialNetworkDB');
mongoose.set('debug', true); // Enable debugging for MongoDB queries

// Start the server and listen on the defined port
app.listen(PORT, () => console.log(`Connected on localhost:${PORT}`));
