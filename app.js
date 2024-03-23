require('dotenv').config();
const mongoose = require('mongoose');

main().catch((err) => console.log(err));

async function main() {
    await mongoose.connect(process.env.MONGO_URL);

    const User = mongoose.model('User', {
        name: String,
        age: Number,
    });

    const firstPerson = new User({
        name: 'Antoine',
        age: 20,
    });

    const secondPerson = new User({
        name: 'Justine',
        age: 30,
    });

    console.log(firstPerson, secondPerson);
    await firstPerson.save();
    await secondPerson.save();
}
