const mongoose = require("mongoose");

const settingGeneralSchema = new mongoose.Schema(
    {
        websiteName: String,
        logo: String,
        email: String,
        address: String,
        copyright: String,
        // facebook: String,
        // zalo: String,
    },
    {
        timestamps: true
    }
);

const SettingGeneral = mongoose.model('SettingGeneral', settingGeneralSchema, "settings-general"); // settings-general: connection in database

module.exports = SettingGeneral;