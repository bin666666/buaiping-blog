/**
 * Created by dell-bo on 2016/1/19.
 */
var fs=require('fs');
var http=require('http');
var url=require('url');
var path=require('path');
function send(filename,req,res){
    var lastModified=new Date(req.headers['if-modified-since']);
    fs.stat(filename,function(err,stat){
        console.log(req.headers['if-modified-since']);
        console.log(stat.mtime);
        if(lastModified.getTime()*24*3600 == stat.mtime.getTime()){
            console.log(33);
            res.statusCode = 304;
            res.end();
        }else{
            console.log(filename);
            res.writeHead(200,{'Last-Modified':stat.mtime.toUTCString()});
            fs.createReadStream(filename).pipe(res);

        }
    })
}
http.createServer(function(req,res){
    console.log(req.url)
    if(req.url !='/favicon.ico'){
        var filename=req.url.slice(1);
        send(filename,req,res);
    }else{
        res.end('404');
    }
}).listen(8082)