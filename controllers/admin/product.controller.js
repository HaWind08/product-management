// Nhúng model
const Product = require("../../models/product.model");
const ProductCategory = require("../../models/product-category.model");
const Account = require("../../models/accounts.model");

const createTreeHelper = require("../../helpers/createTree");
const systemConfig = require("../../config/system");

const filterStatuHelper = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination");

// [GET] /admin/products
module.exports.index = async (req, res) => {
    // Bộ lọc tìm kiếm
    const filterStatus = filterStatuHelper(req.query);

    // query
    let find = {
        deleted: false
    };
    // thêm key vào object find
    if (req.query.status) {
        find.status = req.query.status;
    };

    // search
    const objectSearch = searchHelper(req.query);
    if (objectSearch.regex) {
        find.title = objectSearch.regex;
    }
    // End search

    // Pagination
    const countProducts = await Product.countDocuments(find);

    let objectPagination = paginationHelper(
        {
            limitItems: 4,
            currentPage: 1
        },
        req.query,
        countProducts
    )
    // End Pagination

    // Sort
    let sort = {};

    if (req.query.sortKey && req.query.sortValue) {
        sort[req.query.sortKey] = req.query.sortValue;
    } else {
        sort.position = "desc";
    }
    // End Sort

    const products = await Product.find(find)
        .sort(sort)
        .limit(objectPagination.limitItems)
        .skip(objectPagination.skip);

    for (const product of products) {
        // lấy ra thông tin người tạo
        const user = await Account.findOne({
            _id: product.createdBy.account_id
        });

        if (user) {
            product.accountFullName = user.fullName; //add key accountFullName
        };

        // lấy ra thông tin người cập nhật gần nhất
        // console.log(product.updatedBy[product.updatedBy.length-1]);
        const updatedBy = product.updatedBy.slice(-1)[0];
        if(updatedBy) {
            const userUpdated = await Account.findOne({
                _id: updatedBy.account_id
            });

            updatedBy.accountFullName = userUpdated.fullName; //thêm key accountFullName cho object updatedBy
        };
    };

    res.render("admin/pages/products/index.pug", {
        pageTitle: "Danh sách sản phẩm",
        //--> view (index.pug)
        products: products,
        filterStatus: filterStatus,
        keyword: objectSearch.keyword,
        pagination: objectPagination
    });
};

// [PATCH] /admin/products/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
    const status = req.params.status;
    const id = req.params.id;

    // logs lịch sử sửa sản phẩm
    const updatedBy = {
        account_id: res.locals.user.id,
        updatedAt: new Date()
    };

    // update product status (in DATABASE)
    await Product.updateOne(
        { _id: id },
        { status: status, $push: { updatedBy: updatedBy } }
    );

    // Thông báo
    req.flash("success", "Cập nhật trạng thái thành công!");
    res.redirect("back");
};

// [PATCH] /admin/products/change-multi
module.exports.changeMulti = async (req, res) => {
    const type = req.body.type;
    const ids = req.body.ids.split(", "); // split convert String to Array

    // logs lịch sử sửa sản phẩm
    const updatedBy = {
        account_id: res.locals.user.id,
        updatedAt: new Date()
    };

    switch (type) {
        case "active":
            await Product.updateMany({ _id: { $in: ids } }, { status: "active", $push: { updatedBy: updatedBy } });
            // Thông báo
            req.flash("success", `Cập nhật trạng thái thành công ${ids.length} sản phẩm!`);
            break;
        case "inactive":
            await Product.updateMany({ _id: { $in: ids } }, { status: "inactive", $push: { updatedBy: updatedBy } });
            // Thông báo
            req.flash("success", `Cập nhật trạng thái thành công ${ids.length} sản phẩm!`);
            break;
        case "delete-all":
            await Product.updateMany(
                { _id: { $in: ids } },
                {
                    deleted: true,
                    // deletedAt: new Date()
                    deletedBy: {
                        account_id: res.locals.user.id,
                        deletedAt: new Date()
                    }
                }
            );
            // Thông báo
            req.flash("success", `Đã xóa thành công ${ids.length} sản phẩm!`);
            break;
        case "change-position":
            for (const item of ids) {
                let [id, position] = item.split("-");
                position = parseInt(position);
                console.log(id);
                console.log(position);
                await Product.updateOne(
                    { _id: id },
                    { position: position, $push: { updatedBy: updatedBy } }
                )
            };
            // Thông báo
            req.flash("success", `Đã đổi vị trí thành công ${ids.length} sản phẩm!`);
            break;
        default:
            break;
    }

    res.redirect("back");
};

// [DELTE] /admin/products/delete/:id
module.exports.deleteItem = async (req, res) => {
    const id = req.params.id;
    // await Product.deleteOne({ _id: id });
    await Product.updateOne(
        { _id: id },
        {
            deleted: true,
            // deletedAt: new Date()
            deletedBy: {
                account_id: res.locals.user.id,
                deletedAt: new Date()
            }
        }
    );

    // Thông báo
    req.flash("success", `Đã xóa thành công sản phẩm!`);
    res.redirect("back");
};

// [GET] /admin/products/create
module.exports.create = async (req, res) => {
    let find = {
        deleted: false,
    };

    const category = await ProductCategory.find(find);

    const newCategory = createTreeHelper.tree(category);

    res.render("admin/pages/products/create.pug", {
        pageTitle: "Thêm mới sản phẩm",
        // in ra giao diện --> view 
        category: newCategory
    });
};

// [POST] /admin/products/create
module.exports.createPost = async (req, res) => {
    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);

    if (req.body.position == "") {
        const countProducts = await Product.countDocuments();
        req.body.position = countProducts + 1
    } else {
        req.body.position = parseInt(req.body.position);
    };

    // logs lịch sử thay đổi sản phẩm
    req.body.createdBy = { //add key vào bảng product
        account_id: res.locals.user.id
    };

    const product = new Product(req.body);
    await product.save();

    res.redirect(`${systemConfig.prefixAdmin}/products`);
};

// [GET] /admin/products/edit/:id
module.exports.edit = async (req, res) => {
    try {
        const find = {
            deleted: false,
            _id: req.params.id
        };

        const product = await Product.findOne(find);

        const category = await ProductCategory.find({ deleted: false });
        const newCategory = createTreeHelper.tree(category);

        res.render("admin/pages/products/edit.pug", {
            pageTitle: "Chỉnh sửa sản phẩm",
            // in ra giao diện --> view
            product: product,
            category: newCategory
        });
    } catch (error) {
        req.flash("error", "Không tìm thấy sản phẩm!")
        res.redirect(`${systemConfig.prefixAdmin}/products`);
    }
};

// [PATCH] /admin/products/edit/:id
module.exports.editPatch = async (req, res) => {
    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);
    req.body.position = parseInt(req.body.position);

    if (req.file) {
        req.body.thumbnail = `/uploads/${req.file.filename}`;
    }

    try {
        // logs lịch sử sửa sản phẩm
        const updatedBy = {
            account_id: res.locals.user.id,
            updatedAt: new Date()
        };

        await Product.updateOne(
            { _id: req.params.id },
            { ...req.body, $push: { updatedBy: updatedBy } } //object gửi lên
        );
        req.flash("success", "Cập nhật thành công!");
    } catch (error) {
        req.flash("error", "Cập nhật thất bại!");
    }

    res.redirect("back");
};

// [GET] /admin/products/detail/:id
module.exports.detail = async (req, res) => {
    try {
        const find = {
            deleted: false,
            _id: req.params.id
        };

        const product = await Product.findOne(find);

        res.render("admin/pages/products/detail.pug", {
            pageTitle: product.title,
            // in ra giao diện --> view
            product: product
        });
    } catch (error) {
        req.flash("error", "Không tìm thấy sản phẩm!")
        res.redirect(`${systemConfig.prefixAdmin}/products`);
    }
};