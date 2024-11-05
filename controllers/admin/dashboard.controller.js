const ProductCategogy = require("../../models/product-category.model");

// [GET] /admin/dashboard
module.exports.dashboard = async (req, res) => {
    const statistic = {
        categoryProduct: {
            total: 0,
            active: 0,
            inactive: 0
        },
        product: {
            total: 0,
            active: 0,
            inactive: 0
        },
        account: {
            total: 0,
            active: 0,
            inactive: 0
        },
        user: {
            total: 0,
            active: 0,
            inactive: 0
        },
    };

    statistic.categoryProduct.total = await ProductCategogy.countDocuments({
        deleted: false
    });

    statistic.categoryProduct.active = await ProductCategogy.countDocuments({
        deleted: false,
        status: "active"
    });
    
    statistic.categoryProduct.inactive = await ProductCategogy.countDocuments({
        deleted: false,
        status: "inactive"
    });

    res.render("admin/pages/dashboard/index.pug", {
        pageTitle: "Trang tổng quan",
        statistic: statistic
    });
}