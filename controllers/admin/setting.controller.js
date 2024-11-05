const SettingGeneral = require("../../models/setting-general.model");

// [GET] /admin/setting/general
module.exports.general = async (req, res) => {
    const settingGeneral = await SettingGeneral.findOne({}); // {}: lấy ra bản ghi đầu tiên

    res.render("admin/pages/settings/general.pug", {
        pageTitle: "Cài đặt chung",
        // --> view (general.pug)
        settingGeneral: settingGeneral
    });
};

// [PATCH] /admin/setting/general
module.exports.generalPatch = async (req, res) => {
    const settingGeneral = await SettingGeneral.findOne({});

    if (settingGeneral) {
        // Có rồi -cập nhật
        await SettingGeneral.updateOne(
            { _id: settingGeneral.id, },
            req.body
        )

    } else {
        // Chưa có - tạo mới
        const record = new SettingGeneral(req.body);
        await record.save();
    }

    res.redirect("back");
};