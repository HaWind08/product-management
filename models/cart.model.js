const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
    {
        user_id: String,
        products: [
            {
                product_id: String,
                quantity: Number
            }
        ]
    },
    {
        timestamps: true
    }
);

const Cart = mongoose.model('Cart', cartSchema, "carts"); // carts: connection in database

module.exports = Cart;