const express = require('express');
const User = require('../models/user');
const authentification = require('../middlewares/authentification');
const router = new express.Router();

router.post('/users', async (req, res, next) => {
    const user = new User(req.body);

    try {
        const authToken = await user.generateAuthTokenAndSaveUser();
        res.status(201).send({ user, authToken });
    } catch (error) {
        res.status(400).send(error);
    }
});

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findUser(req.body.email, req.body.password);
        const authToken = await user.generateAuthTokenAndSaveUser();
        res.send({ user, authToken });
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/users', authentification, async (req, res, next) => {
    try {
        const users = await User.find();
        res.send(users);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.get('/users/me', authentification, async (req, res, next) => {
    res.send(req.user);
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
    const updatedInfo = Object.keys(req.body);
    const userID = req.params.id;

    try {
        const user = await User.findById(userID);
        updatedInfo.forEach((update) => (user[update] = req.body[update]));
        await user.save();

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
