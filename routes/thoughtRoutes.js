const express = require('express');
// Creating a router instance
const router = express.Router();
const { Thought } = require('../models');

// Route to get all thoughts
router.get('/thoughts', async (req, res) => {
    try {
        // Retrieve all thoughts from the database
        const thoughts = await Thought.find({});
        res.json(thoughts);
    } catch (err) {
        // Error handling if something goes wrong with the database query
        res.status(500).json(err);
    }
});

// Route to get a specific thought by ID
router.get('/thoughts/:id', async (req, res) => {
    try {
        // Find a thought by its ID
        const thought = await Thought.findById(req.params.id);
        if (!thought) {
            // Return a 404 status if no matching thought is found
            return res.status(404).json({ message: 'No matching thought was found.' });
        }
        res.json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Route to update a specific thought by ID
router.put('/thoughts/:id', async (req, res) => {
    try {
        // Find and update a thought by its ID with provided data
        const updatedThought = await Thought.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!updatedThought) {
            // If no thought found with the provided ID, return a 404 status
            res.status(404).json({ message: 'No thought found with this id.' });
            return;
        }
        res.json(updatedThought);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Route to create a new thought
router.post('/thoughts', async (req, res) => {
    try {
        // Create a new thought with the provided data and save it to the database
        const newThought = new Thought(req.body);
        const savedThought = await newThought.save();
        res.status(201).json(savedThought);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Route to delete a specific thought by ID
router.delete('/thoughts/:id', async (req, res) => {
    try {
        // Find and delete a thought by its ID
        const deletedThought = await Thought.findByIdAndDelete(req.params.id);
        if (!deletedThought) {
            // If no thought found with the provided ID, return a 404 status
            res.status(404).json({ message: 'No thought found with this id.' });
            return;
        }
        res.json({ message: 'Thought successfully removed.' });
    } catch (err) {
        res.status(400).json(err);
    }
});

// Route to get reactions by Thought ID
router.get('/thoughts/:thoughtId/reactions', async (req, res) => {
    try {
        // Find a specific thought by its ID
        const thought = await Thought.findById(req.params.thoughtId);
        if (!thought) {
            // If no thought found with the provided ID, return a 404 status
            res.status(404).json({ message: 'No thought found with this id.' });
            return;
        }

        // Return reactions associated with the thought ID
        res.json(thought.reactions);
    } catch (err) {
        res.status(500).json(err);
    }
});


// Route to add a reaction to a specific thought
router.post('/thoughts/:thoughtId/reactions', async (req, res) => {
    try {
        // Find a thought by its ID and push a new reaction into its reactions array
        const thought = await Thought.findByIdAndUpdate(
            req.params.thoughtId,
            { $push: { reactions: req.body } },
            { new: true, runValidators: true }
        );
        if (!thought) {
            // If no thought found with the provided ID, return a 404 status
            res.status(404).json({ message: 'No thought found with this id.' });
            return;
        }
        res.json(thought);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Route to remove a reaction from a specific thought
router.delete('/thoughts/:thoughtId/reactions/:reactionId', async (req, res) => {
    try {
        // Find a thought by its ID and pull a specific reaction from its reactions array
        const thought = await Thought.findByIdAndUpdate(
            req.params.thoughtId,
            { $pull: { reactions: { _id: req.params.reactionId } } },
            { new: true }
        );
        if (!thought) {
            // If no thought found with the provided ID, return a 404 status
            res.status(404).json({ message: 'No thought found with this id.' });
            return;
        }
        res.json(thought);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;
