var express = require('express');
var auth = require('../auth');
//返回一个路由的实例
var router = express.Router();

//返回用户注册页面
router.get('/reg', auth.mostNotLogin, function (req, res, next) {
    res.render('user/reg', {title: '用户注册'});
})
//处理用户注册数据
router.post('/reg', auth.mostNotLogin, function (req, res, next) {
    var user = req.body;
    if (user.password != user.repassword) {
        req.flash('error', '俩次密码不一致');
        return res.redirect('back');
    }
    delete user.repassword;
    user.password = blogUtil.md5(user.password);
    user.avatar = "https://secure.gravatar.com/avatar/" + blogUtil.md5(user.email) + "?s=48";
    Model('User').create(user, function (error, doc) {
        if (error) {
            req.flash('error', '注册失败');
            res.redirect('back');
        } else {
            req.session.user =doc;
            req.flash('success','注册成功');
            res.redirect('/');
        }
    });
})
//返回登陆页面
router.get('/login', auth.mostNotLogin, function (req, res, next) {
    res.render('user/login', {title: '用户登陆'});
});
//处理登陆页面
router.post('/login', auth.mostNotLogin, function (req, res, next) {
    if (req.body) {
        console.log(req.body)
        var user = req.body;
        user.password = blogUtil.md5(user.password);
        Model('User').findOne(user,function(err,doc){
            if(!err){
                req.session.user = doc;
                req.flash('success','登陆成功');
                res.redirect('/');
            }else{
                req.flash('error','用户名或密码不正确');
                res.redirect('back')
            }
        })
    } else {
        req.flash('error', '填写信息不完整');
        res.redirect('back');
    }
})
//登陆退出
router.get('/logout',auth.mustLogin,function(req,res,next){
    req.session.user=null;
    res.redirect('/');
})
module.exports = router;