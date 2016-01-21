/**
 * Created by dell-bo on 2016/1/17.
 */
global.blogUtil = {
    md5: function (str) {
        return require('crypto').createHash('md5').update(str).digest('hex');
    }
}

