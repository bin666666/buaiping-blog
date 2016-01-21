/**
 * Created by dell-bo on 2016/1/18.
 */
var express=require('express');
var path=require('path');
var app=express();
//判断用户是否访问此图片
app.use('/img',function(req,res,next){
    var referrer=req.headers.referer;
    if(!referrer){
        console.log(referrer)
             next();
    }else{
        var referHost = require('url').parse(referrer).hostname;
        if(referHost === req.host ||  whitelist.indexOf(referHost)!=-1){
            console.log(req.host);
            next();
        }else{
            console.log(444)
            res.sendFile(path.join(__dirname,'img','wrong.jpg'));
        }


    }
})
app.use(express.static(__dirname));
app.get('/',function(req,res){
    res.sendFile(path.join(__dirname,'img.html'));
})
app.listen(8080);
