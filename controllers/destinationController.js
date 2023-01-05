const Destination = require('../models/destination');
const access = require('../utils/access');
var cloudinary = require('cloudinary').v2;

module.exports.destinationsPage = async function(req,res){
    Destination.find({}, function(err,destinations) {
        // if error then return error
        if (err) {
            return res.status(500).send({
                'success'   :false,
                'error'     : err,
            });
        }
        // return destinations content
        // return res.send(destinations)
        return res.render('frontend/destinations/index', {
            'destinations' : destinations
        }); 
    })
}

// create page
module.exports.createPage = async function(req,res) {
    // return res.send(access.statesAndCities)
    return res.render('frontend/destinations/create', {
        'statesList': access.statesAndCities,
        'categories': access.categories,
    }); 
}

// create page
module.exports.store = function(req,res) {
    const body = req.body
    return res.send(body)
    // console.log('body')
    cloudinary.uploader
    .upload(body.featured_image)
    .then(result=>{
        console.log(result)
        res.send(body)
    });
   
    // return res.render('frontend/destinations/create', {
    //     'statesList': access.statesAndCities,
    //     'categories': access.categories,
    // }); 
}