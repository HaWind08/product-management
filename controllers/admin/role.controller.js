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

// [GET] /admin/roles/edit/:id
module.exports.edit = async (req, res) => {
    // console.log(req.params);

    try { //check neu dien id lung tung
        const id = req.params.id;

        let find = {
            _id: id,
            deleted: false
        };

        const data = await Role.findOne(find);

        res.render("admin/pages/roles/edit", {
            pageTitle: "Sửa nhóm quyền",
            // --> view (edit.pug) 
            data: data
        });
    } catch (error) {
        res.redirect(`${systemConfig.prefixAdmin}/roles`);
    }
};

// [PATCH] /admin/roles/edit/:id
module.exports.editPatch = async (req, res) => {
    try {
        const id = req.params.id;
        await Role.updateOne({ _id: id }, req.body); // {bản ghi có id, data mới}

        req.flash("success", "Cập nhật nhóm quyền thành công!");
    } catch (error) {
        req.flash("error", "Cập nhật nhóm quyền thất bại!");
    };
    res.redirect("back");
};

// [GET] /admin/roles/permissions
module.exports.permissions = async (req, res) => {
    let find = {
        deleted: false
    };

    const records = await Role.find(find);

    res.render("admin/pages/roles/permissions", {
        pageTitle: "Phân quyền",
        // --> view (permissions.pug)
        records: records
    });
};

// [PATCH] /admin/roles/permissions
module.exports.permissionsPatch = async (req, res) => {
    // req.body : tất cả dữ liệu gửi qua form
    // console.log(req.body); 
    // console.log(req.body.permissions); 

    // chuyển JSON thành mảng
    const permissions = JSON.parse(req.body.permissions);

    for (const item of permissions) {
        const id = item.id;
        const permissions = item.permissions;
        await Role.updateOne({ _id: id }, { permissions: permissions });
    }

    // console.log(permissions);

    req.flash("success", "Cập nhật phân quyền thành công")
    res.redirect("back");
};
