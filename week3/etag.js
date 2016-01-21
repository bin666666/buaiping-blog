/**
 * Created by dell-bo on 2016/1/19.
 */
var fs=require('fs');
var http = require('http');
function getHash(str){
    var crypto = require('crypto');
    var sha=crypto.createHash('sha1');
    return sha.update(str).digest('hex');
}
function send(filename,req,res){
    var lastEtag = req.headers['if-none-match'];
    var content=fs.readFileSync(filename);
    if(lastEtag == getHash(content)){
        res.statusCode=304;
        res.end();
    }else{
        res.writeHead(200,{'Etag':getHash(content)})
        fs.createReadStream(filename).pipe(res);
    }

}
http.createServer(function(req,res){
    if(req.url != '/favicon.ico'){
        var filename=req.url.slice(1);
        send(filename,req,res);
    }
}).listen(8083);

