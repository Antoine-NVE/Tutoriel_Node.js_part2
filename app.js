require('dotenv').config();
const { connectDB } = require('./src/services/mongoose');
const userRoutes = require('./src/routes/user');

const express = require('express');
const app = express();
const port = process.env.port || 3000;

connectDB().catch((err) => console.log(err));

app.use(express.json());
app.use(userRoutes);

app.listen(port, () => {
    console.log('Le serveur est lancé à http://localhost:' + port);
});
