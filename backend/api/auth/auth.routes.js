const express = require('express');
const router = express.Router();
const { register, login, logout } = require('./auth.controller');
const { requireAuth } = require('../../middlewares/requireAuth.middleware');

router.post('/register', register);
router.post('/login', login);
router.post('/logout', requireAuth, logout);

module.exports = router;
