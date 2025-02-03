const express = require('express');
const router =  express.Router();
const { loginUser } = require('../controllers/authenticationController');

router.post('/login',loginUser);

router.get('/protected', (req, res) => {
    res.status(200).json({ message: "Access granted", user: req.user  });
});

module.exports = router;