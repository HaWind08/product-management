const Product = require("../../models/product.model");

const productsHelper = require("../../helpers/product");


// [GET] /
module.exports.index = async (req, res) => {
    // Featured Product
    const productsFeatured = await Product.find({
        featured: "1",
        deleted: false,
        status: "active"
    }).limit(6);
    // console.log(productsFeatured);
    const newProductsFeatured = productsHelper.priceNewProducts(productsFeatured);

    // New Product
    const productsNew = await Product.find({
        deleted: false,
        status: "active"
    }).sort({ position: "desc" }).limit(6);

    const newProductsNew = productsHelper.priceNewProducts(productsNew);

    res.render("client/pages/home/index.pug", {
        pageTitle: "Trang chủ",
        // --> view (index.pug - home)
        productsFeatured: newProductsFeatured,
        productsNew: newProductsNew
    });
};