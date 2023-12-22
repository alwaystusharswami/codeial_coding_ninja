module.exports.signup=function(req,res){
    return res.render('user_sign_up',{
        title:"Codieal | Sign Up"
    })
}
module.exports.signin=function(req,res){
    return res.render('user_sign_in',{
        title:"Codieal | Sign in"
    })
}