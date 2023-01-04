// export a function which is publically available to route's file that should return something
module.exports.home = async function(req,res){
    return res.render('frontend/home'); 
}