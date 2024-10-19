const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();

const controller = require("../../controllers/admin/account.controller");
const uploadCloud = require("../../middlewares/admin/upload.middleware");
const validate = require("../../validates/admin/account.validate");

router.get("/", controller.index);

router.get("/create", controller.create);

router.post(
    "/create", 
    upload.single('thumbnail'),
    uploadCloud.upload, 
    validate.creatPost,
    controller.createPost
);

module.exports = router;