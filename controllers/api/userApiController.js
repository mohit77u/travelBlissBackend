const User = require('../../models/user');

module.exports.signup = function(req,res){
    return res.status(200).send({
        'success': {
            'message': 'yes'
        }
    });
};

// get sign-up data
module.exports.create = function(req, res){
    // check whether password and confirm password matches or not
    console.log(req.body)
    if(req.body.password != req.body.passwordConfirmation){
        return res.status(500).send({
            'error': {
                'message': 'Passwords do not match'
            }
        });
    }
    // if passwords are same we will see if the email ids should be unique
    User.findOne({email: req.body.email}, function(err, user){
        if(err){console.log('error in finding user in signing up'); return}
    //when user is not found 
        if (!user) {
            User.create(req.body, function(err, user){
                if(err){
                    return res.send({
                        'error': {
                            'message': 'error in creating user  while  signing up'
                        }
                    });
                }
                    return res.status(200).send({
                    'success': {
                        'message': 'User created successfully'
                    }
                });
            })
           
        } else {
            // user already exist so back
            return res.status(500).send({
                'error': {
                    'message': 'User already exists with this email address'
                }
            });
        }
    })
}