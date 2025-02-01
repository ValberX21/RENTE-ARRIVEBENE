const express = require("express");
const router = express.Router();
const leaseController = require("../controllers/leaseController");

router.post("/", leaseController.createLease);

module.exports = router;
