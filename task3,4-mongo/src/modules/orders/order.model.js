const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    orderedItems: [
        {
            product: {
                type: mongoose.Types.ObjectId,
                ref: 'Product'
            },
            orderedQty:{
                type: Number,
                require: true
            }
        }
    ],
    totalAmt: {
        type: Number
    },
    status: {
        type: String,
        enum: ['pending', 'completed'],
        default: 'pending'
    }
}, {
    timestamps: true,
    autoCreate: true,
    autoIndex: true
})

const OrderModel = mongoose.model('Order', OrderSchema);

module.exports = OrderModel