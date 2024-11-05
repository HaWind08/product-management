const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        user_id: String,
        card_id: String, //chưa đăng nhập
        userInfo: {
            fullName: String,
            phone: String,
            address: String
        },
        products: [
            {
                product_id: String,
                price: Number,
                quantity: Number,
                discountPercentage: Number
            }
        ],
        // status: initial, cancel, confirm
        deleted: {
            type: Boolean,
            default: false
        },
        deletedAt: Date
    },
    {
        timestamps: true
    }
);

const Order = mongoose.model('Order', orderSchema, "orders"); // orders: connection in database

module.exports = Order;