const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    sender: String,
    date: Date,
    items: Object,
    total: Number
});


const orderModel = mongoose.model("orders", orderSchema);


module.exports = orderModel;