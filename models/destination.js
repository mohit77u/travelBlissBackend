const mongoose = require('mongoose');
const destinationScheme = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        required: false,
    },
    state: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: false,
        default: null,
    },
    category: {
        type: String,
        required: true,
    },
    featured_image: {
        type: String,
        required: true,
    },
    images: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: false,
    },
    popular: {
        type: String,
        required: true,
        default: 'no'
    },

}, {timestamp: true})

const Destinations = mongoose.model('destinations', destinationScheme);
module.exports = Destinations;