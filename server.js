const express = require('express');
const mongoose = require('mongoose');

const userRoutes = require('./routes/userRoutes');
const thoughtRoutes = require('./routes/thoughtRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

app.use('/api', thoughtRoutes); 
app.use('/api', userRoutes);

mongoose.connect('mongodb://127.0.0.1:27017/socialNetworkDB');
mongoose.set('debug', true); 

app.listen(PORT, () => console.log(`Connected on localhost:${PORT}`));
