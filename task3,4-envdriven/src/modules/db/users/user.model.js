const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        min: 1,
        require: true
    },
    email: {
        type: String,
        unique: true,
        require: true
    },
    password: {
        type: String
    },
    role: {
        type: String,
        enum: ['admin', 'customer'],
        default: 'customer'
    },
    cart: [{
        product: {
            type: mongoose.Types.ObjectId,
            ref: "Product"
        },
        price: Number,
        orderedQty: {
            type: Number,
            required: true
        }
    }]
}, {
    timestamps: true,
    autoCreate: true,
    autoIndex: true
})

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel