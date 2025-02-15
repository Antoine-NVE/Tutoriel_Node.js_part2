require('dotenv').config();
const mongoose = require('mongoose');

async function connectDB() {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('DB connectée');
}

module.exports = {
    connectDB,
};
