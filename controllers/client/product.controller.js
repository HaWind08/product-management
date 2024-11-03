// Nhúng model
const Product = require("../../models/product.model");
const ProductCategory = require("../../models/product-category.model");

const productsHelper = require("../../helpers/product");
const productsCategoryHelper = require("../../helpers/product-category");

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
        pageTitle: "Danh sách sản phẩm",
        // --> view (index.pug - products)
        products: newProduct
    });
};

// [GET] /products/detail/:slugProduct
module.exports.detail = async (req, res) => {
    try {
        const find = {
            deleted: false,
            slug: req.params.slugProduct,
            status: "active"
        };

        const product = await Product.findOne(find);

        // Display info permissions
        if (product.product_category_id) {
            const category = await ProductCategory.findOne({
                _id: product.product_category_id,
                status: "active",
                deleted: false
            });

            product.category = category;
        };
        product.priceNew = productsHelper.priceNewProduct(product);

        res.render("client/pages/products/detail", {
            pageTitle: product.title,
            product: product
        })
    } catch (error) {
        res.redirect("/products");
    };
};

// [GET] /products/:slugCategory 
module.exports.category = async (req, res) => {
    // console.log(req.params.slugCategory); //slugCategory: biến đặt bên router

    const category = await ProductCategory.findOne({
        slug: req.params.slugCategory,
        status: "active",
        deleted: false
    });

    const listSubCategory = await productsCategoryHelper.getSubCategory(category.id);
    const listSubCategoryId = listSubCategory.map(item => item.id);

    // console.log(category.id);
    const products = await Product.find({
        product_category_id: { $in: [category.id, ...listSubCategoryId] },
        deleted: false
    }).sort({ position: "desc" });
    // console.log(products);

    const newProduct = productsHelper.priceNewProducts(products);

    res.render("client/pages/products/index.pug", {
        pageTitle: category.title,
        // --> view (index.pug - products)
        products: newProduct
    });
};

