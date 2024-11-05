const homeRouter = require("./home.router");
const productRouter = require("./product.router");
const userRouter = require("./user.router");
const searchRouter = require("./search.router");
const cartRouter = require("./cart.router");
const checkoutRouter = require("./checkout.router");

const userMiddleware = require("../../middlewares/client/user.middleware"); //router private
const categoryMiddleware = require("../../middlewares/client/category.middleware");
const cartMiddleware = require("../../middlewares/client/cart.middleware");


module.exports = (app) => {
    app.use(userMiddleware.infoUser);
    app.use(categoryMiddleware.category);
    app.use(cartMiddleware.cartId);

    app.use('/', homeRouter);

    app.use('/products', productRouter);

    app.use('/user', userRouter);

    app.use("/search", searchRouter);

    app.use("/cart", cartRouter);

    app.use("/checkout", checkoutRouter);

};