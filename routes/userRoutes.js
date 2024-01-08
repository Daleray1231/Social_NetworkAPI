const router = require('express').Router();
const mongoose = require('mongoose');
const { User } = require('../models');

// Get all users
router.get('/users', async (req, res) => {
  try {
    const userData = await User.find({});
    res.json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get a specific user by ID
router.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).json({ message: 'No user was found matching this id!' });
      return;
    }
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a new user
router.post('/users', async (req, res) => {
  if (!req.body.username || !req.body.email) {
    res.status(400).json({ message: 'Please provide both username and email.' });
    return;
  }
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update a user's information
router.put('/users/:id', async (req, res) => {
  if (req.body.username === '' || req.body.email === '') {
    res.status(400).json({ message: 'Username and email cannot be left empty.' });
    return;
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedUser) {
      res.status(404).json({ message: 'No user found matching this id!' });
      return;
    }
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Delete a user
router.delete('/users/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      res.status(404).json({ message: 'No user was found with this id!' });
      return;
    }
    res.json({ message: 'User has been successfully deleted.' });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Endpoint to get a user's friends list by user ID
router.get('/users/:userId/friends', async (req, res) => {
  const userId = req.params.userId;

  try {
    // Find the user by ID
    const user = await User.findById(userId);
    
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    // Fetch the friends' details based on the IDs in the user's friends array
    const friends = await User.find({ _id: { $in: user.friends } });
    
    res.json({ friends: friends });
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Add a friend for a specific user
router.post('/users/:userId/friends/:friendId', async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.userId) || !mongoose.Types.ObjectId.isValid(req.params.friendId)) {
    res.status(400).json({ message: 'Invalid userId or friendId provided.' });
    return;
  }

  if (req.params.userId === req.params.friendId) {
    res.status(400).json({ message: 'You cannot add yourself as a friend.' });
    return;
  }

  try {
    const friendExists = await User.exists({ _id: req.params.friendId });
    if (!friendExists) {
      res.status(404).json({ message: 'Friend to add was not found.' });
      return;
    }

    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    );
    if (!user) {
      res.status(404).json({ message: 'No user was found with this userId!' });
      return;
    }
    res.json(user);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Remove a friend from a user's friend list
router.delete('/users/:userId/friends/:friendId', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $pull: { friends: req.params.friendId } },
      { new: true }
    );
    if (!user) {
      res.status(404).json({ message: 'No user found matching this userId!' });
      return;
    }
    res.json(user);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
