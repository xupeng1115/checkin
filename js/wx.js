function wxCallback(wxShare){
    var _jsHost = "http://api.mashanglc.com";
    var _weixinJsUrl = _jsHost+'/api/weixinJs';
    var _url = location.href.split('#')[0];
    $.ajax({
        url: _weixinJsUrl,
        data: {location: encodeURIComponent(_url)},
        async: false,
        dataType: 'json',
        success: function (data) {
            var _appId = data.data.appId;
            var _nonceStr = data.data.nonceStr;
            var _signature = data.data.signature;
            var _timestamp = data.data.timestamp;
            wx.config({
                debug: false,
                appId: _appId,
                timestamp: _timestamp,
                nonceStr: _nonceStr,
                signature: _signature,
                jsApiList: [
                    'checkJsApi',
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage',
                    'onMenuShareQQ',
                    'onMenuShareWeibo'
                ]
            });
        }
    });

    wx.ready(function () {

        //分享到朋友圈
        wx.onMenuShareTimeline({
            title: wxShare.circleTitle, // 分享标题
            link: wxShare.shareUrl, // 分享链接
            imgUrl: wxShare.icon, // 分享图标
            success: function (res) {
            },
            cancel: function (res) {
            },
            fail: function (res) {
                alert(JSON.stringify(res));
            }
        });
        //分享给朋友
        wx.onMenuShareAppMessage({
            title: wxShare.title, // 分享标题
            desc: wxShare.description, // 分享描述
            link: wxShare.shareUrl, // 分享链接
            imgUrl: wxShare.icon, // 分享图标
            type: '', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {
                // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });

        //分享到QQ
        wx.onMenuShareQQ({
            title: wxShare.title, // 分享标题
            desc: wxShare.description, // 分享描述
            link: wxShare.shareUrl, // 分享链接
            imgUrl: wxShare.icon, // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数s
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });

        //分享到腾讯微博
        wx.onMenuShareWeibo({
            title: wxShare.title, // 分享标题
            desc: wxShare.description, // 分享描述
            link: wxShare.shareUrl, // 分享链接
            imgUrl: wxShare.icon, // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });
    }); 
}