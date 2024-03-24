const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
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

userSchema.pre('save', async function () {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8);
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
