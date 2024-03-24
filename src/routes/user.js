const express = require('express');
const User = require('../models/user');
const router = new express.Router();

router.post('/users', async (req, res, next) => {
    const user = new User(req.body);

    try {
        const saveUser = await user.save();
        res.status(201).send(saveUser);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/users', async (req, res, next) => {
    try {
        const users = await User.find();
        res.send(users);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/users/:id', async (req, res, next) => {
    const userID = req.params.id;

    try {
        const user = await User.findById(userID);
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.patch('/users/:id', async (req, res, next) => {
    const userID = req.params.id;

    try {
        const user = await User.findByIdAndUpdate(userID, req.body, {
            new: true,
            runValidators: true,
        });
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.delete('/users/:id', async (req, res, next) => {
    const userID = req.params.id;

    try {
        const user = await User.findByIdAndDelete(userID);
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
