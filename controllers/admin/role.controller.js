const Role = require("../../models/roles.model");
const systemConfig = require("../../config/system");

// [GET] /admin/roles
module.exports.index = async (req, res) => {
    let find = {
        deleted: false
    };

    const records = await Role.find(find);

    res.render("admin/pages/roles/index.pug", {
        pageTitle: "Nhóm quyền",
        // --> view (index.pug)
        records: records,
    });
};

// [GET] /admin/roles/create
module.exports.create = async (req, res) => {
    res.render("admin/pages/roles/create.pug", {
        pageTitle: "Tạo nhóm quyền",
        // --> view 
    });
};

// [POST] /admin/roles/create
module.exports.createPost = async (req, res) => {
    // console.log(req.body);

    const record = new Role(req.body); // tao moi 1 nhom quyen
    await record.save();

    res.redirect(`${systemConfig.prefixAdmin}/roles`);
};
