const express = require("express");
const router = express.Router();

const controller = require("../../controllers/client/product.controller");

// Đặt async trước hàm
router.get('/', controller.index);

router.get('/:slug', controller.detail);

module.exports = router;