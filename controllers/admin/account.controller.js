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

// [GET] /admin/accounts/edit/:id
module.exports.edit = async (req, res) => {
    const find = {
        _id: req.params.id,
        deleted: false
    };

    try {
        const data = await Account.findOne(find);
        const roles = await Role.find({
            deleted: false
        });

        console.log(data);

        res.render("admin/pages/accounts/edit.pug", {
            pageTitle: "Chỉnh sửa tài khoản",
            // --> view (edit.pug)
            data: data,
            roles: roles
        })

    } catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/accounts`);
    };
};

// [PATCH] /admin/accounts/edit/:id
module.exports.editPatch = async (req, res) => {
    // console.log(req.body);
    const id = req.params.id;

    const emailExist = await Account.findOne({ //kiểm tra email tồn tại hay chưa
        _id: { $ne: id }, //tìm tất cả bản ghi ngoại trừ id này
        email: req.body.email,
        deleted: false //chưa bị xóa vẫn được tạo
    });

    if (emailExist) {
        req.flash("error", `Email ${req.body.email} đã tồn tại`);
    } else {
        if (req.body.password) { //nếu muốn cập nhật mật khẩu
            req.body.password = md5(req.body.password);
        } else { //nếu không thay đổi mật khẩu
            delete req.body.password;
        };

        await Account.updateOne({ _id: id }, req.body);
        req.flash("success", "Cập nhật tài khoản thành công!");
    };

    res.redirect("back");
};

