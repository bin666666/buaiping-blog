/**
 * Created by dell-bo on 2016/1/20.
 */
exports.mustLogin = function(req,res,next){
    if(req.session.user){
        next();
    }else{
        console.log(req.session.user)
        req.flash('error','你尚未登录,请登录');
        res.redirect('/users/login');
    }
}
exports.mostNotLogin=function(req,res,next){
    if(req.session.user){
        req.flash('error','您已经登陆');
        res.redirect('/')
    }else{
        next();
    }
}