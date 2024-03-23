require('dotenv').config();
const mongoose = require('mongoose');
const validator = require('validator');

main().catch((err) => console.log(err));

async function main() {
    await mongoose.connect(process.env.MONGO_URL);

    const User = mongoose.model('User', {
        email: {
            type: String,
            required: true,
            validate(v) {
                if (!validator.isEmail(v)) throw new Error('E-mail non valide');
            },
        },
        password: {
            type: String,
            required: true,
            validate(v) {
                if (!validator.isLength(v, { min: 4, max: 20 }))
                    throw new Error(
                        'Le mot de passe doit faire entre 4 et 20 caractères'
                    );
            },
        },
    });

    const firstPerson = new User({
        email: 'antoine@gmail.com',
        password: 'password',
    });

    const secondPerson = new User({
        email: 'test@gmail.com',
        password: 'test',
    });

    const firstSave = await firstPerson.save();
    const secondSave = await secondPerson.save();
    console.log(firstSave, secondSave);
}
