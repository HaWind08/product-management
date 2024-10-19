const moongoose = require("mongoose");

const forgotPasswordSchema = new moongoose.Schema(
    {
        email: String,
        otp: String,
        expireAt: {
            type: Date,
            expires: 300
        }
    },
    {
        timestamps: true,
    }
);

const ForgotPassword = moongoose.model("ForgotPassword", forgotPasswordSchema, "forgot-password");

module.exports = ForgotPassword;