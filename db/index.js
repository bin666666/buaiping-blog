/*var settings = require('../settings');
var mongoose = require('mongoose');
mongoose.connect(settings.dbUrl);
mongoose.model('User',new mongoose.Schema({
    username:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    avatar:{type:String,required:true},
}));
global.Model = function(type){
    return mongoose.model(type);
}*/
var settings = require('../settings');
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
 db=mongoose.connect(settings.dbUrl);
 db.connection.on("open", function () {
 console.log("数据库连接成功");
 });
 db.model('User', new mongoose.Schema({
 username:{type:String,required:true},
 email:{type:String,required:true},
 password:{type:String,required:true},
 avatar:{type:String,required:true},
 }));
db.model('Article',new mongoose.Schema({
    title:{type:String,required:true},
    content:{type:String,required:true},
    createAt:{type:Date,default:Date.now},
    img:{type:String},
    user:{type:ObjectId,ref:'User'}
}));
global.Model = function(type){
 return db.model(type);
 }
