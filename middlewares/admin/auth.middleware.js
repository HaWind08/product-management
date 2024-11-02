// Tạo router private
const Account = require("../../models/accounts.model");
const systemConfig = require("../../config/system");

module.exports.requireAuth = async (req, res, next) => {
    // console.log(req.cookies.token);
    if (!req.cookies.token) {
        res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
    } else {
        const user = await Account.findOne({ token: req.cookies.token }); // kiểm tra token của user
        if (!user) {
            res.redirect(`${systemConfig.prefixAdmin}/auth/login`);
        } else {
            next();
        };
    };
}