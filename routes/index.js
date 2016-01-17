var express = require('express');
var router = express.Router();

/* GET home page. */
/*router.get('/', function(req, res, next) {
  Model('Article').find({}).populate('user').exec(function(err,articles){
    res.render('index', {title: '主页',articles:articles});
  });
});*/
router.get('/', function(req, res, next) {
  res.redirect('/articles/list/1/2');
});

module.exports = router;
