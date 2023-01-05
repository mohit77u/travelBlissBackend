const express = require('express');
const router = express.Router();
const userApiController = require('../../controllers/api/userApiController')

router.post('/signup', userApiController.create);

module.exports = router;