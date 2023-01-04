const express = require('express');
const router = express.Router();
const destinationController = require('../../controllers/destinationController')

router.get('/destinations', destinationController.getDestinations);

module.exports = router;