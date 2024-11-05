// Tạo router private
const User = require("../../models/user.model");

module.exports.requireAuth = async (req, res, next) => {
    // console.log(req.cookies.token);
    if (!req.cookies.tokenUser) {
        res.redirect(`/user/login`);
    } else {
        const user = await User.findOne({
            tokenUser: req.cookies.tokenUser
        }).select("-password"); // kiểm tra token của user
        if (!user) {
            res.redirect(`/user/login`);
        } else {
            //Trả thông tin user ra giao diện (bất kỳ file pug(controller) nào cũng có)
            res.locals.user = user;
            next();
        };
    };
}