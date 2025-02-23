const express = require("express");
const router =  express.Router();
const AddressController =  require("../controllers/addressController")
const protect = require("../middleware/authMiddleware"); 

router.get("/",AddressController.getAllAddress);
router.get("/:id", AddressController.getAddressById);
router.post("/", AddressController.createAddress);

router.put("/:id", AddressController.updateAddress);
router.delete("/:id", AddressController.deleteAddress);

module.exports = router;