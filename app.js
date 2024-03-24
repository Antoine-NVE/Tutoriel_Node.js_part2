require('dotenv').config();
const { connectDB } = require('./src/services/mongoose');
const User = require('./src/models/user');
const express = require('express');
const app = express();
const port = process.env.port || 3000;

connectDB().catch((err) => console.log(err));

app.use(express.json());

app.post('/users', async (req, res, next) => {
    const user = new User(req.body);

    try {
        const saveUser = await user.save();
        res.status(201).send(saveUser);
    } catch (error) {
        res.status(400).send(error);
    }
});

app.get('/users', async (req, res, next) => {
    try {
        const users = await User.find();
        res.send(users);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get('/users/:id', async (req, res, next) => {
    const userID = req.params.id;

    try {
        const user = await User.findById(userID);
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.listen(port, () => {
    console.log('Le serveur est lancé à http://localhost:' + port);
});
