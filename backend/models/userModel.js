const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verifyToken: {
        type: String
    }

})

// SIGNUP
userSchema.statics.signup = async function (email, password) {

    if (!email || !password) {
        throw Error('All fields are mandatory')
    }

    if (!validator.isEmail(email)) {
        throw Error('Email is not valid')
    }

    if (password.length < 8) {
        throw Error('Password must be at least 8 characters')
    }

    const exists = await this.findOne({ email })
    if (exists) {
        throw Error('Email already exists!')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ email, password: hash })
    return user
}

// LOGIN (❗verify yahi hoga)
userSchema.statics.login = async function (email, password) {

    const user = await this.findOne({ email })
    if (!user) throw Error('Incorrect Email!')

    if (!user.isVerified) {
        throw Error('Please verify your email before login')
    }

    const match = await bcrypt.compare(password, user.password)
    if (!match) throw Error('Incorrect Password!')

    return user
}

module.exports = mongoose.model('User', userSchema)