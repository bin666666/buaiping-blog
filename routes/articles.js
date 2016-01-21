var express = require('express');
var auth = require('../auth');
var markdown = require('markdown').markdown;
//返回一个路由的实例
var router = express.Router();
var path = require('path');
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../public/upload/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now()+path.extname(file.originalname))
    }
})
var upload = multer({ storage: storage })
//添加文章
router.get('/add',auth.mustLogin, function (req, res, next) {
    res.render('article/add', {title: '发表文章'});
});
//处理添加文章的数据
router.post('/add', auth.mustLogin,upload.single('img'),function (req, res, next) {
    var article = req.body;
    if(req.file){
        article.img=path.join('/upload',req.file.filename);
    }
    var user = req.session.user;
    article.user=user._id;
    Model('Article').create(article,function(err,doc){
        if(err){
            req.flash('error','发表文章失败');
            res.redirect('back');
        }else{
            req.flash('success','发表文章成功');
            res.redirect('/');
        }
    })
});
module.exports = router;