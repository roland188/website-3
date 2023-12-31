const config = {};

// 接口服务器
config.host = "https://m.tc20009.com/xxa";
// 页面服务器
config.codeUrl = "";
// 下载地址
config.dowUrl = "https://appdownload.010533.com/";
// 图片服务器
// #ifdef APP-PLUS
config.imgHost = "https://web.bets8888.life/file";
// #endif
// #ifdef H5
config.imgHost = process.env.NODE_ENV === 'development' ? "https://web.bets8888.life/file" : window.location.origin + '/file'
// #endif
// 彩金地址
config.jackpotUrl = "";
// 客服中心地址
config.customerServiceUrl = uni.getStorageSync("customerServiceUrl");

config.loginVersion = "v1.0.0";
config.reqId = 0;
config.appVer = "1.0.0";
config.protocolVer = "1.0";
config.clientIp = "8.8.8.8";
config.numVer = "1.0.0-70";
config.themePath = ""; // 暂时无视
config.maintianTime = ""; //维护时间
config.skin = "amxpj";
config.yiJiUrl = ''; // 易记域名

config.phoneModel = '' //手机型号
config.fingerprint = '' //设备唯一标识

config.getImgUrl = function (path) {	
	if (path !== "") {
		return this.imgHost + path;
	} else {
		return;
	}
};
config.PrefixInteger = function (num, length) {
	return (Array(length).join("0") + num * 1).slice(-length);
};


// 测试打包配置开始
config.appName = 'betcome'; //项目名称
config.clientCode = "ff10";
config.projectImgUrl = "xiaocao";
config.mainCustomer = 'http://bets8888.website/client/clientCode'; //获取维护客服
config.domainName = "https://baidu.com.cx";
config.inviteCode = ''; //邀请码
config.appUrlJson = ["https://new-app-test-url.s3.ap-east-1.amazonaws.com/url.json"];
config.childCode = "ff10";
config.mergeAccount = "";
config.interval = 180000; //维护间隔时间
config.sortArr = [5,1,3,4,2,6]; //以及菜单排序
config.customerServiceStatus = 0
config.maintainUrl = 'https://www.561219.com/clientMaintain/getClientMaintain'; //页面维护
// #ifdef APP-PLUS
config.theme = "a032";
// #endif
// #ifdef H5
let themeIndex = sessionStorage.getItem("theme");
config.theme = themeIndex ? 'a' + config.PrefixInteger(themeIndex, 3) : 'a023'; //BMW 对应主题值
// #endif
// 打包配置结束

let gtids = {ff10:'b7f5fc9ea916acc391a2f8f8c1738d4a', xcao:'d64b9552e16d0e5267cd4b0c2ea130fe'}
config.captchaId = function() {
	let id = gtids[this.childCode]
	return id;
};

// import store from '@/utils/store'
config.locale = uni.getStorageSync('lang') || 'vi'; //国际化  zh_CN中文健体   zh_HK中文繁体  en英文
config.themeImgUrl = function (f, fileType) {
	let M = fileType ? fileType : "png";
	if (config.theme) {
		return "/static/image/theme/" + config.theme + "/" + f + "." + M;
	} else {}
};
config.localImgUrl = function (f, fileType) {
	let M = fileType ? fileType : "png";
	return "/static/image/langIcon/" + f + "." + M;
};

config.getFileImgUrl = (f, fileType )=> {
	let M = fileType ? fileType : "png";
	return "/static/image/" + f + "." + M;
}

config.platformLogo = function (fileName, fileType) {
	let M = fileType ? fileType : "png";
	let imgName = "";
	// #ifdef APP-PLUS
	imgName = this.projectImgUrl;
	// #endif
	// #ifdef H5
	imgName = window.projectImgUrl;
	// #endif
	return "/static/image/platform/"+ imgName + "/" + fileName + '.' + M;
};
config.getThemeUrl = function (fileName, fileType) {
	let nameStr = fileName ? fileName : "";
	let themePath = config.theme;
	let urlType = fileType ? ".gif" : ".png";
	let file = nameStr + urlType;
	let lang = config.locale;
	let imgName = "";
	// #ifdef APP-PLUS
	imgName = this.projectImgUrl;
	// #endif
	// #ifdef H5
	imgName = window.projectImgUrl;
	// #endif
	return "/static/image/public/" + lang + '/' + file;
};
module.exports = config;