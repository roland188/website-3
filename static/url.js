(function () {
	var r = window.location.search.substr(1).match(new RegExp("(^|&)code=([^&]*)(&|$)", "i"));
	var g = r ? unescape(r[2]) : null;
	g && sessionStorage.setItem("inviteCode", JSON.stringify(g.slice(0, 8)));
	var u = window.location.hostname;
	var a = u.split(".");
	var l = u == "localhost";
	l || (l = /((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}/g.test(u));

	function s() {
		var h;
		var p = a;
		var m = /Android|webOS|iPhone|ipad|iPod|BlackBerry|XiaoMi/i.test(navigator.userAgent);
		var z = p.length > 2 && p[0] == "m";
		if (p.length > 2) p = p.slice(p.length - 2);
		if (!m && z) {
			h = location.protocol + "//" + p.join(".");
		} else if (m && !z) {
			h = location.protocol + "//m." + p.join(".");
		};
		if (h) {
			var s = sessionStorage.getItem("inviteCode");
			if (s && s.length) h += "?code=" + JSON.parse(s);
			window.location.href = h;
		}
	};

	function t() {
		var c = [
			{
				"code": "svip",
				"skin": "betc88",
				"childCode": "svip",
				"locale": 'vi',
				"name": "xoc88 - best bet coming｜Thương hiệu Casino chuyên nghiệp số 1 Việt Nam｜chuyên trang tổng hợp cá độ bóng đá, xổ số lô đề, casino trực tuyến, game bài, bắn cá giải trí",
				"theme": "a053",
				"winOpenTime": "6000",
				"customerServiceStatus": 1,//0旧版本   1新版本
				"sortArr": [5, 1, 7, 2, 3, 8, 4, 6,],//1电子游艺 2体育赛事 3棋牌游戏 4彩票游戏 5视讯直播 6电竞赛事 7捕鱼机
				"maintainUrl": "https://www.ffyl0202.com/clientMaintain/getClientMaintain",
				"domains": [],
				"isMaskApp": 1,
				        
			},
			{
				"code": "ff10",
				"skin": "betc88",
				"childCode": "ff10",
				"locale": 'vi',
				"name": "xiaocao",
				"theme": "a053",
				"winOpenTime": "6000",
				"customerServiceStatus": 1,//0旧版本   1新版本
				"sortArr": [1, 2, 3, 4, 5, 6, 7],//1电子游艺 2体育赛事 3棋牌游戏 4彩票游戏 5视讯直播 6电竞赛事 7捕鱼机
				"maintainUrl": "https://www.ffyl0202.com/clientMaintain/getClientMaintain",
				"domains": [],
				"isMaskApp": 1,
			},
		];
		if (!l) {
			if (a.length > 2) a = a.slice(a.length - 2);
			u = a.join(".");
		}
		var o = c[0]; //正式
		for (var x in c) {
			var i = c[x];
			if (i.domains.indexOf(u) > -1) {
				o = i;
				break;
			}
		}
		// if (!g && o.invite.length) sessionStorage.setItem("inviteCode", JSON.stringify(o.invite));
		o.host = "https://tc20009.com/xxa"
		// o.host = "https://715337.com/xxa"
		localStorage.setItem("host", o.host);
		localStorage.setItem("domainName", o.domainName);
		localStorage.setItem("statistics", o.statistics);
		sessionStorage.setItem("theme", parseInt(o.theme.slice(1)));
		window.theme = o.theme;
		window.clientCode = o.code;
		window.locale = o.locale;
		window.projectImgUrl = o.skin;
		window.projectName = o.name;
		window.winOpenTime = o.winOpenTime;
		window.childCode = o.childCode;
		window.mergeAccount = o.mergeAccount;
		window.maintainUrl = o.maintainUrl;
		window.interval = 180000;
		document.title = o.name;
		window.sortArr = o.sortArr;
		window.customerServiceStatus = o.customerServiceStatus;


	};
	!l && s();
	t();
})();