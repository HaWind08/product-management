const md5 = require("md5");
const Account = require("../../models/accounts.model");

const systemConfig = require("../../config/system");

// [GET] /admin/auth/login 
module.exports.login = async (req, res) => {
    if (req.cookies.token) { //nếu có token rồi (chưa đăng xuất)
        res.redirect(`${systemConfig.prefixAdmin}/dashboard`);
    } else {
        res.render("admin/pages/auth/login.pug", {
            pageTitle: "Trang đăng nhập"
            // --> view (login.pug)
        });
    }
};

// [POST] /admin/auth/login 
module.exports.loginPost = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const user = await Account.findOne({
        email: email,
        deleted: false
    });
    console.log(user);

    if (!user) {
        req.flash("error", "Email không tồn tại!");
        res.redirect("back");
        return;
    };

    if (md5(password) != user.password) {
        req.flash("error", "Mật khẩu không chính xác!");
        res.redirect("back");
        return;
    };

    if (user.status == "inactive") {
        req.flash("error", "Tài khoản bị khóa!");
        res.redirect("back");
        return;
    };

    res.cookie("token", user.token); //lưu cookie (kiểm tra token người dùng/admin) 
    res.redirect(`${systemConfig.prefixAdmin}/dashboard`);
};

// [GET] /admin/auth/logout 
module.exports.logout = async (req, res) => {
    res.clearCookie("token"); // Xóa token trong cookie
    res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
};