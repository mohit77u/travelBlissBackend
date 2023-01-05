const express = require('express');
const router = express.Router();
const destinationApiController = require('../../controllers/api/destinationApiController')

router.get('/destinations', destinationApiController.getDestinations);

module.exports = router;