const homeRouter = require("./home.router");
const productRouter = require("./product.router");
const userRouter = require("./user.router");
const userMiddleware = require("../../middlewares/client/user.middleware");


module.exports = (app) => {
    app.use(userMiddleware.infoUser);

    app.use('/', homeRouter);
    
    app.use('/products', productRouter);

    app.use('/user', userRouter);

};