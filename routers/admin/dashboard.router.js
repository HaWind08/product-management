const express = require("express");
const router = express.Router();

//import (require) Nhúng controller
const controller = require("../../controllers/admin/dashboard.controller");

// Đặt async trước hàm
router.get('/', controller.dashboard);

module.exports = router;