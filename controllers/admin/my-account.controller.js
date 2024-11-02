const md5 = require("md5");
const Account = require("../../models/accounts.model");

// [GET] /admin/my-account
module.exports.index = async (req, res) => {
    res.render("admin/pages/my-account/index.pug", {
        pageTitle: "Thông tin cá nhân",
        // --> view (index.pug)
    });
};

// [GET] /admin/my-account/edit
module.exports.edit = async (req, res) => {
    res.render("admin/pages/my-account/edit.pug", {
        pageTitle: "Chỉnh sửa thông tin cá nhân",
        // --> view (edit.pug)
    });
};

// [PATCH] /admin/my-account/edit
module.exports.editPatch = async (req, res) => {
    const id = res.locals.user.id;

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