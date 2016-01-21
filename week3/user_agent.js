/**
 * Created by dell-bo on 2016/1/19.
 */
var express = require('express');
var path = require('path');
var agentParse=require('user-agent-parser');
var app=express();
var visit={mobile:0,other:0};
app.use(function(req,res,next){
    req.agent=agentParse(req.headers['user-agent']);
    next();
})
app.get('/',function(req,res){
    if(req.agent.device.type == 'mobile'){
        visit.mobile=visit.mobile + 1;
    }else{
        visit.other=visit.other + 1
    }
    res.send(visit);
})
app.listen(8081);