// Nhúng model
const Product = require("../../models/product.model");

const productsHelper = require("../../helpers/product");

// [GET] /products 
module.exports.index = async (req, res) => {
    // get data
    const products = await Product.find({
        status: "active",
        deleted: false
    }).sort({ position: "desc" });

    const newProduct = productsHelper.priceNewProducts(products);
    // console.log(products);

    res.render("client/pages/products/index.pug", {
        pageTitle: "Danh sach san pham",
        // render product
        products: newProduct
    });
}

// [GET] /products/:slug
module.exports.detail = async (req, res) => {
    try {
        const find = {
            deleted: false,
            slug: req.params.slug,
            status: "active"
        }

        const product = await Product.findOne(find);

        res.render("client/pages/products/detail", {
            pageTitle: product.title,
            product: product
        })
    } catch (error) {
        res.redirect("/products");
    };
}