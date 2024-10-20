const md5 = require("md5");
const Account = require("../../models/accounts.model");

const systemConfig = require("../../config/system");

// [GET] /admin/auth/login 
module.exports.login = async (req, res) => {
    res.render("admin/pages/auth/login", {
        pageTitle: "Trang đăng nhập"
    });
};

// [GET] /admin/auth/login 
module.exports.loginPost = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const user = await Account.findOne({
        email: req.body.email,
        deleted: false
    });
    
    if(!user){
        req.flash("error", "Email không tồn tại!");
        res.redirect("back");
        return;
    };

    if(md5(password) != user.password) {
        req.flash("error", "Mật khẩu không chính xác!");
        res.redirect("back");
        return;
    };

    if(user.status == "inactive"){
        req.flash("error", "Tài khoản bị khóa!");
        res.redirect("back");
        return;
    };

    res.cookie("token", user.token);
    res.redirect(`${systemConfig.prefixAdmin}/dashboard`);
};

// [GET] /admin/auth/login 
module.exports.logout = async (req, res) => {
    // Xóa token trong cookie
    res.clearCookie("token");
    res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
};