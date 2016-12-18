//是否微信内置浏览器
function isWeixin() {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
    } else {
        return false;
    }
}

//获取操作系统名称
function getOS() {
    //定义结果变量
    var name = 'Other';
    var version = '';
    //获取userAgent
    var ua = navigator.userAgent;
    //移动平台iOS探测
    var reg = /like Mac OS X|Android|Windows Phone|Symbian/ig;
    var regResult = reg.exec(ua);
    if(!regResult){
        reg = /Mac OS X|Windows NT|Linux/ig;
        regResult = reg.exec(ua);
    }
    if(!regResult){
        //返回UNKNOWN
        return name;
    }else{
        //操作系统检测
        switch(regResult[0]){
            case 'like Mac OS X':
                name = 'iPhone';
                reg = /(iPhone|iPod|iPad).*?OS\s*(\d*[\_|\.\d]*)/ig;
                break;
            case 'Android':
                name = 'Android';
                reg = /(Android)\s*(\d*[\.\d]*)/ig;
                break;
            case 'Windows Phone':
                name = 'Windows Phone';
                reg = /(Windows Phone)\s*[OS]*\s*(\d*[\.\d]*)/ig;
                break;
            case 'Symbian':
                name = 'Symbian';
                reg = /(Symbian)\s*[OS]*\/*\s*(\d[\.\d]*)/ig;
                break;
            case 'Mac OS X':
                name = 'OS X';
                reg = /(Mac OS X)\s*(\d*[\_|\.\d]*)/ig;
                break;
            case 'Windows NT':
                name = 'Windows NT';
                reg = /(Windows NT)\s*(\d*[\_|\.\d]*)/ig;
                break;
            case 'Linux':
                name = 'Linux';
                reg = /(Linux)\s*(i*\d*)/ig;
                break
        }
        //获取版本号
        regResult = reg.exec(ua);
        if(regResult && regResult.length >= 3){
            version = regResult[2].replace(/\_+/ig, '.');
            reg = /^\d+\.*\d*/ig;
            regResult = reg.exec(version);
            if(regResult){
                version = regResult[0];
            }
        }
    };

    //返回操作系统名称+版本号
    //return [name, version].join(' ');
    return name.toLocaleLowerCase();
};
/*获取url指定参数值*/
function getUrlParameter(name){
    var url = location.search.substr(1);
    var value,arr1=[],arr2=[];

    if(url){
        arr1 = url.split("&");
        for(var i=0;i<arr1.length;i++){
            arr2=arr1[i].split("=");
            if(arr2[0]==name){
                value = arr2[1];
                if(value=="null" || value=="undefined"){
                    value = null;
                }
            }
        }
    }
    return value;
}

//判断单个图片是否加载完成
function loadImage(url, callback) {
    var img = new Image();
    img.src = url;
    if(img.complete) {
        callback(img.width,img.height);
        return;
    }
    img.onload = function () {
        callback(img.width,img.height);
    };
}

/*公共ajax加载事件*/
function g_loading(){

    if($('.g_loading').length<1){
        $("body").append("<div class='g_loading'></div>")
    }
}

function remove_loading(){
    $('.g_loading').remove();
    $('.g_alert').remove();
}

function g_alert(msg){
    var t;
    clearTimeout(t);
    if($('.g_alert').length<1){
        $("body").append('<div class="g_alert">'+msg+'</div>');
        var msg_w=$(".g_alert").width();
        var msg_h=$(".g_alert").height();
        $(".g_alert").css({"margin-left":-msg_w/2,"margin-top":-msg_h/2});
        t=setTimeout("$('.g_alert').remove()",2000);
    }
}

/*根据hostname判断环境*/
var publicApiHost,subDirectory;

if(location.hostname=="static.mashanglc.com"){
    publicApiHost = "http://api.mashanglc.com";
}else if(location.hostname=="127.0.0.1" || location.hostname=="localhost"){
    publicApiHost = "http://api.sit.licai66.com";
}else{
    subDirectory = location.hostname.split(".")[1];
    publicApiHost = "http://api."+subDirectory+".licai66.com";
}