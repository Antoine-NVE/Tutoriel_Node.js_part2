require('dotenv').config();
const { connectDB } = require('./src/services/mongoose');
const User = require('./src/models/user');
const express = require('express');
const app = express();
const port = process.env.port || 3000;

connectDB().catch((err) => console.log(err));

app.use(express.json());

app.post('/todos', async (req, res, next) => {
    const user = new User(req.body);
    const saveUser = await user.save();
    res.send(saveUser);
});

app.listen(port, () => {
    console.log('Le serveur est lancé à http://localhost:' + port);
});
