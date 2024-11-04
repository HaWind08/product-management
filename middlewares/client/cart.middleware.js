const Cart = require("../../models/cart.model");

// Thêm giỏ hàng không cần đăng nhập
module.exports.cartId = async (req, res, next) => {
    // console.log(req.cookies.cartId);

    if (!req.cookies.cartId) {
        // Tạo giỏ hàng
        const cart = new Cart();
        await cart.save();
        console.log(cart);

        const expiresCookies = 365 * 24 * 60 * 60 * 1000;
        res.cookie("cartId", cart.id, { expires: new Date(Date.now() + expiresCookies) });
    } else {
        // Lấy ra thôi
        const cart = await Cart.findOne({
            _id: req.cookies.cartId
        });

        cart.totalQuantity = cart.products.reduce((sum, item) => sum + item.quantity, 0);
        res.locals.miniCart = cart;
    };

    next();
};