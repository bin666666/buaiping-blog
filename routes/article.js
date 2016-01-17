/**
 * Created by dell-bo on 2016/1/15.
 */
var express=require('express');
var router=express.Router();
router.get('/list', function (req, res) {
    res.render('article/list', {title: '列表'});
});
router.get('/add', function (req, res) {
    res.render('article/add', {title: '注册'});
});
router.post('/add', function (req, res) {
    res.render('article/detial', {title: '注册'});
});
router.get('/detail', function (req, res) {
    res.render('article/detial', {title: '注册'});
});
module.exports = router;
