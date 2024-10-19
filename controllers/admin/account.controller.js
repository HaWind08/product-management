const md5 = require("md5");
const Account = require("../../models/accounts.model");

const systemConfig = require("../../config/system");

// [GET] /admin/accounts 
module.exports.index = async (req, res) => {
    let find = {
        deleted: false
    }

    const records = await Account.find(find).select("-password -token");

    res.render("admin/pages/accounts/index", {
        pageTitle: "Danh sách tài khoản",
        // --> view
        records: records,
    });
};

// [GET] /admin/accounts/create
module.exports.create = async (req, res) => {
    res.render("admin/pages/accounts/create.pug", {
        pageTitle: "Tạo mới tài khoản",
        // --> view
    });
};

// [POST] /admin/accounts/create
module.exports.createPost = async (req, res) => {
    const emailExist = await Account.findOne({
        email: req.body.email,
        deleted: false
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