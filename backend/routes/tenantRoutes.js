const express = require("express");
const router = express.Router();
const TenantController = require("../controllers/TenantController");

router.post("/", TenantController.createTenant);

module.exports = router;