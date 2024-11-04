const Cart = require("../../models/cart.model");
const Product = require("../../models/product.model");

const productHelper = require("../../helpers/product");


// [GET] /cart/
module.exports.index = async (req, res) => {
    const cartId = req.cookies.cartId;
    const cart = await Cart.findOne({
        _id: cartId
    });
    // console.log(cart);

    if (cart.products.length > 0) {
        for (const item of cart.products) {
            const productId = item.product_id
            const productInfo = await Product.findOne({
                _id: productId,

            }).select("title thumbnail slug price discountPercentage");

            productInfo.priceNew = productHelper.priceNewProduct(productInfo);

            item.productInfo = productInfo;
            item.totalPrice = productInfo.priceNew * item.quantity;
            // console.log(productInfo);
        };
    };

    cart.totalPrice = cart.products.reduce((sum, item) => sum + item.totalPrice, 0);

    res.render("client/pages/cart/index.pug", {
        pageTitle: "Giỏ hàng",
        // --view (index.pug - cart)
        cartDetail: cart
    });
};

// [POST] /cart/add/:productId
module.exports.add = async (req, res) => {
    const productId = req.params.productId; //productId khớp với URL (:productId)
    const quantity = parseInt(req.body.quantity);
    const cartId = req.cookies.cartId;

    // console.log(productId);
    // console.log(quantity);
    // console.log(cartId);

    // nếu sản phẩm có trong giỏ hàng rồi thì chỉ tăng số lượng lên
    const cart = await Cart.findOne({
        _id: cartId
    });
    const existProductInCart = cart.products.find(item => item.product_id == productId);
    if (existProductInCart) {
        // Cập nhật lại
        const quantityNew = quantity + existProductInCart.quantity;
        await Cart.updateOne(
            { _id: cartId, "products.product_id": productId },
            { $set: { 'products.$.quantity': quantityNew } }
        )
    } else {
        const objectCart = {
            product_id: productId,
            quantity: quantity
        };

        await Cart.updateOne(
            { _id: cartId }, { $push: { products: objectCart } }
        );
    }

    req.flash("success", "Đã thêm sản phẩm vào giỏ hàng!");
    res.redirect("back");
};
