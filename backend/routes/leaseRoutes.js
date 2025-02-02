const express = require("express");
const router = express.Router();
const leaseController = require("../controllers/leaseController");

router.post("/", leaseController.createLease);
router.get("/", leaseController.getAllLeases);
router.get("/:id", leaseController.getLeaseById);
router.put("/:id", leaseController.updateLease);
router.delete("/:id", leaseController.deleteLease);

module.exports = router;
