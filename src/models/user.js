const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
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
    authTokens: [
        {
            authToken: {
                type: String,
                required: true,
            },
        },
    ],
});

userSchema.methods.toJSON = function () {
    const user = this.toObject();

    delete user.password;
    delete user.authTokens;

    return user;
};

userSchema.methods.generateAuthTokenAndSaveUser = async function () {
    const authToken = jwt.sign({ _id: this._id.toString() }, 'foo');
    this.authTokens.push({ authToken });
    await this.save();
    return authToken;
};

userSchema.statics.findUser = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error('Erreur, impossible de se connecter');
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error('Erreur, impossible de se connecter');
    user.password = password;
    return user;
};

userSchema.pre('save', async function () {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8);
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
