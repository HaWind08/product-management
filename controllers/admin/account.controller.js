const md5 = require("md5");
const Account = require("../../models/accounts.model");
const Role = require("../../models/roles.model");
const systemConfig = require("../../config/system");

// [GET] /admin/accounts 
module.exports.index = async (req, res) => {
    let find = {
        deleted: false
    };
    const records = await Account.find(find).select("-password -token");
    for (const record of records) { //hiển thị role theo tên
        const role = await Role.findOne({
            _id: record.role_id,
            deleted: false
        });
        record.role = role; // add key "role"
    };

    res.render("admin/pages/accounts/index", {
        pageTitle: "Danh sách tài khoản",
        // --> view (index.pug)
        records: records,
    });
};

// [GET] /admin/accounts/create
module.exports.create = async (req, res) => {
    const roles = await Role.find({
        deleted: false,
    });

    res.render("admin/pages/accounts/create.pug", {
        pageTitle: "Tạo mới tài khoản",
        // --> view (create.pug)
        roles: roles
    });
};

// [POST] /admin/accounts/create
module.exports.createPost = async (req, res) => {
    const emailExist = await Account.findOne({ //kiểm tra email tồn tại hay chưa
        email: req.body.email,
        deleted: false //chưa bị xóa vẫn được tạo
    });

    if (emailExist) {
        req.flash("error", `Email ${req.body.email} đã tồn tại`);
        res.redirect("back");
    } else {
        req.body.password = md5(req.body.password);

        const record = new Account(req.body);
        await record.save();

        res.redirect(`${systemConfig.prefixAdmin}/accounts`);
    };

};