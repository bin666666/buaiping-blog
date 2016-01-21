/**
 * Created by dell-bo on 2016/1/19.
 */
var http   = require('http');
var fs     = require('fs');
var crypto = require('crypto');
function getHash(str){
    var hash = crypto.createHash('sha1');
    return hash.update(str).digest('hex');
}
function send(filname,req,res){
    fs.readFile(filname,function(err,data){
        var expires = new Date(Date.now() + 1000*10);
        res.setHeader('Expires',expires.toUTCString());
        res.setHeader('Cache-Control','max-age=10');
        res.end(data);
    })
}
http.createServer(function(req,res){
    if(req.url != 'favicon.ico'){
        var filename=req.url.slice(1);
        send(filename,req,res);
    }
}).listen(8083);