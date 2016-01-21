/**
 * Created by dell-bo on 2016/1/18.
 */
//Accept-Language:en,zh-CN;q=0.8,zh;q=0.6
arrs=['en','zh'];
str="en,zh-CN;q=2,zh;q=0.6";
var b=str.toLowerCase().split(',').map(function(item,index,arr){
    var parts = item.split(';');
    //var r=parts[1].split('=')[1]
    if(parts[1]!=undefined){
       var  ints=parseFloat(parts[1].split('=')[1]);
    }
    return {name:parts[0],q:ints||1};
    }).filter(function(item,index,arr){

       return arrs.indexOf(item.name) !=-1;
    }).sort(function(pre,after){//按Q进行排序，从高到低排序
          return  after.q-pre.q ;
   }).map(function(item){
    return item.name;//把数组的每个元素转成字符串
});
console.log(b)
