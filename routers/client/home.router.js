const express = require("express");
const router = express.Router();

//import (require)
const controller = require("../../controllers/client/home.controller");

// Đặt async trước hàm
router.get('/', controller.index);

module.exports = router;