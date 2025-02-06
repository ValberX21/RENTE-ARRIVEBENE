const express = require('express');
const router =  express.Router();
const { loginUser } = require('../controllers/authenticationController');
const  { validateUserRegister, validateUserLogin} =  require('../middleware/validateMiddleware');


router.post("/register", validateUserRegister);
router.post("/login", validateUserLogin, loginUser);
module.exports = router;