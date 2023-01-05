const express = require('express');
const router = express.Router();
const destinationController = require('../controllers/destinationController')

router.get('/destinations', destinationController.destinationsPage);
router.get('/destinations/create', destinationController.createPage);
router.post('/destinations/store', destinationController.store);

module.exports = router;