const Destination = require('../models/destination');

// get the destinations 
module.exports.getDestinations = async function(req,res) {
    Destination.find({}, function(err,destination) {
        // if error then return error
        if (err) {
            return res.status(500).send({
                'success'   :false,
                'error'     : err,
            });
        }
        // return destinations content
        return res.status(200).send({
            'success'       : true,
            'destinations'  : destination,
        }); 
    })
}