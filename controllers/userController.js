const User = require('../models/user');
const PasswordReset = require("../models/passwordReset");
const ForgotPasswordMail = require('../mailers/ForgotPasswordMail');

// render the sign up page
module.exports.signup = function(req,res){
    if(req.isAuthenticated()){
       return res.redirect('/');
    }
    return res.render('auth/signup', { layout: 'layouts/auth' })
};

// render the sign in page                         
module.exports.signIn = function(req,res){
    if(req.isAuthenticated()){
        console.log(req.user)
        return res.redirect('/');
    }
    return res.render('auth/login', { layout: 'layouts/auth' })
};

// render the forgot password page                         
module.exports.forgot = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/');
    }
    return res.render('auth/forgot-password', { layout: 'layouts/auth' })
};

// render the forgot password page                         
module.exports.reset = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/');
    }
    return res.render('auth/reset-password',{
        layout  : 'layouts/auth',
        'token' : req.params.token
    })
};

// get sign-up data
module.exports.create = function(req, res){
    // check whether password and confirm password matches or not
    if(req.body.password != req.body.password_confirmation){
        return res.redirect('back');
    }
    // if passwords are same we will see if the email ids should be unique
    User.findOne({email: req.body.email}, function(err, user){
        if(err){console.log('error in finding user in signing up'); return}
    //when user is not found 
        if (!user){
            User.create(req.body, function(err, user){
              if(err){console.log('error in creating user  while  signing up'); return}

              return res.redirect('/signin');
            })
           
        } else {
            // user already exist so back
            return res.redirect('back');
        }
    })
}

// get sign-in data
module.exports.createSession = function(req, res){
    req.flash('success','Logged in Successfully')
    // assuming user is already signed in so we need to redirect
    return res.redirect('/');
}

module.exports.destroySession = function(req, res, next){
    // this function is automated by passport js
    req.logout(function(err){
        return next(err);
    });
    req.flash('success', 'You have logged out');
    return res.redirect('/signin')
}

//forgot password
module.exports.forgotPassword = async(req, res) => {
    const email = req.body.email;
    //validations
    if (!email) {
        req.flash('error','Email is required')
        return res.redirect('back');
    }
    //validations end
    const emailPasswordExists = await PasswordReset.findOne({
        email: email,
    });

    if(emailPasswordExists != null) {
        PasswordReset.findByIdAndDelete(emailPasswordExists.id, function(err) {
            if (err) {
                console.log("Error in deleting the password reset token from DB");
            }
        });
    }

    const user = await User.findByEmail(email);

    if (!user) {
        req.flash('error','User with this email does not exists')
        return res.redirect('back');
    }
    
    function generateString(length) {
        // declare all characters
        const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = ' ';
        const charactersLength = characters.length;
        for ( let i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    // here it is calling the method that we created in the model to generate token
    const token = generateString(100);

    //to save email and token in password reset collection
    const passwordreset = new PasswordReset({
        email: email,
        token: token
    });

    await passwordreset.save();

    const url = process.env.BASE_URL + '/reset-password/' + token
    const data = {
        'email': email,
        'url' : url,
        'subject' : 'Reset Password'
    }

    // send mail
    await ForgotPasswordMail.sendMail(data)
    .then(()=>{
        req.flash('success','Password reset link sent to your email account')
        return res.redirect('back');
    }).catch(()=>{
        req.flash('error','Error occurred, please try again after some time.')
        return res.redirect('back');
    })    
    

};

//reset password
module.exports.resetPassword = async(req, res) => {
    const token = req.body.token;
    const password = req.body.password;
    const password_confirmation = req.body.password_confirmation;

    // validations
    if (!password || !password_confirmation) {
        req.flash('error','Password and Confirm password field are required')
        return res.redirect('back');
    }

    const passwordreset = await PasswordReset.findOne({
        token: token,
    });

    //if token not available
    if (!passwordreset) {
        req.flash('error','Reset link expired please try again')
        return res.redirect('back');
    }

    if (password != password_confirmation) {
        req.flash('error','Password and Confirm password didn\'t matched')
        return res.redirect('back');
    }
    //validations end

    // check if token expired
    var currenttime = Date.now();

    //time difference
    var time = Math.floor(Math.abs(currenttime - passwordreset.createdAt) / 36e5);
    if (time > 2) {
        passwordreset.delete()
        req.flash('error','Reset link expired please try again')
        return res.redirect('back');
    }

    const user = await User.findOne({
        email: passwordreset.email
    });

    //update password and save
    user.password = password
    let save = await user.save();

    if (save) {
        passwordreset.delete()
    }

    req.flash('success','Reset link expired please generate another password reset link and try again')
    res.redirect('/signin');
};