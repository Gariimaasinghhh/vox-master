const { Schema, model, Types } = require('../connection');

const orderSchema = new Schema({
    user: { type: Types.ObjectId, ref: 'user' },
    items: Array,
    paymentDetails: Object,
    intentId: {type : String, unique: true},
    status: { type: String, default: 'placed' },
    mode: { type: String, default: 'online' },
    createdAt: Date

})

module.exports = model('ordersdata', orderSchema)