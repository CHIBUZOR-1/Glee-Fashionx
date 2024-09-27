const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    role: {
        type: String,
        default: "GENERAL"
    },
    password: {
        type: String,
        required: true
    },
    verified: {
        type: Boolean,
        default: false
    },
    recentlyViewed: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'products',
        },
      ],
    verificationToken: {
        type: String
    }
}, {
    timestamps: true,
    minimize: false
})

const userModel = mongoose.model('users', userSchema);

module.exports = userModel;