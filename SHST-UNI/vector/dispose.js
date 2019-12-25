"use strict";
const md5 = require('@/utils/md5.js');
const eventBus = require('@/utils/eventBus.js');
module.exports = {
  ajax: ajax,
  toast: toast,
  extend: extend,
  onLunch: onLunch,
  checkUpdate: checkUpdate,
}

/**
 * 颜色方案
 */
module.exports.colorList = ["#EAA78C", "#F9CD82", "#9ADEAD", "#9CB6E9", "#E49D9B", "#97D7D7", "#ABA0CA", "#9F8BEC", "#ACA4D5", "#6495ED", "#7BCDA5", "#76B4EF"];

/**
 * 拓展对象
 * 浅拷贝与深拷贝
 */
function extend() {
  var aLength = arguments.length;
  var options = arguments[0];
  var target = {};
  var copy;
  var i = 1;
  if (typeof options === "boolean" && options === true) {
    //深拷贝 (仅递归处理对象)
    for (; i < aLength; i++) {
      if ((options = arguments[i]) != null) {
        if (typeof options !== 'object') {
          return options;
        }
        for (var name in options) {
          copy = options[name];
          if (target === copy) {
            continue;
          }
          target[name] = this.extend(true, options[name]);
        }
      }
    }
  } else {
    //浅拷贝
    target = options;
    if (aLength === i) {
      target = this;
      i--;
    } //如果是只有一个参数，拓展功能 如果两个以上参数，将后续对象加入到第一个对象
    for (; i < aLength; i++) {
      options = arguments[i];
      for (var name in options) {
        target[name] = options[name];
      }
    }
  }
  return target;
}

/**
 * startLoading
 */
function startLoading(option) {
  switch (option.load) {
    case 1:
      uni.showNavigationBarLoading();
      break;
    case 2:
      uni.showNavigationBarLoading();
      uni.setNavigationBarTitle({
        title: '加载中...'
      })
      break;
    case 3:
      uni.showLoading({
        title: '请求中',
        mask: true
      })
      break;
  }
}

/**
 * endLoading
 */
function endLoading(option) {
  switch (option.load) {
    case 1:
      uni.hideNavigationBarLoading();
      break;
    case 2:
      uni.hideNavigationBarLoading();
      uni.setNavigationBarTitle({
        title: '山科小站'
      })
      break;
    case 3:
      uni.hideLoading();
      break;
  }
}

/**
 * 小程序更新
 */
function checkUpdate() {
  if (!uni.getUpdateManager) return false;
  uni.getUpdateManager().onCheckForUpdate((res) => {
    console.log("Update:" + res.hasUpdate);
    if (res.hasUpdate) { //如果有新版本
      uni.getUpdateManager().onUpdateReady(() => { //当新版本下载完成
        uni.showModal({
          title: '更新提示',
          content: '新版本已经准备好，单击确定重启应用',
          success: (res) => {
            if (res.confirm) uni.getUpdateManager().applyUpdate(); //applyUpdate 应用新版本并重启
          }
        })
      })
      uni.getUpdateManager().onUpdateFailed(() => { //当新版本下载失败
        uni.showModal({
          title: '提示',
          content: '检查到有新版本，但下载失败，请检查网络设置',
          showCancel: false
        })
      })
    }
  })
}

/**
 * User显示Dot
 */
function userDot(notify, app = getApp()) {
  app.globalData.tips = notify;
  if (!uni.showTabBarRedDot) return false;
  uni.getStorage({
    key: 'point',
    complete: (res) => {
      if (res.data !== app.globalData.tips) {
        uni.showTabBarRedDot({
          index: 2
        })
      }
    }
  })
}

/**
 * SetCookie
 */
function setCookie(res, app = getApp()) {
  if (app.globalData.header.Cookie === "") {
    if (res && res.header && res.header['Set-Cookie']) {
      var cookies = res.header['Set-Cookie'].split(";")[0] + ";";
      console.log("SetCookie:" + cookies);
      app.globalData.header.Cookie = cookies;
      uni.setStorage({key: "cookies", data: app.globalData.header.Cookie});
    } else {
      console.log("Get Cookie From Cache");
      app.globalData.header.Cookie = uni.getStorageSync("cookies") || "";
    }
  }
}

/**
 * 弹窗提示
 */
function toast(e, time = 2000, icon = 'none') {
  uni.showToast({
    title: e,
    icon: icon,
    duration: time
  })
}

/**
 * XHR请求
 */
function ajax(requestInfo , app = getApp()) {
  var option = {
    load: 1,
    autoCookie: true,
    url: "",
    method: "GET",
    data: {},
    fun: () => {},
    success: () => {},
    fail: function() { this.completeLoad = () => { toast("服务器错误"); }},
    complete: () => {},
    completeLoad: () => {}
  };
  extend(option, requestInfo);
  startLoading(option);
  uni.request({
    url: option.url,
    data: option.data,
    method: option.method,
    header: app.globalData.header,
    success: (res) => {
      if(option.autoCookie) setCookie(res);
      try{
        option.fun(res);
        option.success(res);
      }catch(e){
        option.completeLoad = () => { toast("PARSE ERROR"); }
        console.warn(e);
      }
    },
    fail: (res) => {
      option.fail(res);
    },
    complete: function(res) {
      endLoading(option);
      try{ option.complete(res); }catch(e){ console.warn(e); }
      option.completeLoad(res);
    }
  })
}

/**
 * APP启动事件
 */
function onLunch() {
  var app = this;
  app.$scope.eventBus = eventBus.getEventBus;
  var defaultData = {
    data: {
      Message: "Yes",
      initData: { articalName: "山科小站全功能介绍", articalUrl: "https://mp.weixin.qq.com/s/5pGARwuOvEFby16pw5UvJw" }
    }
  };
  uni.login({
    success: res => {
      ajax({
        load: 1,
        url: app.globalData.url + 'funct/user/signalGetOpenid',
        method: 'POST',
        autoCookie: false,
        data: {
          "code": res.code
        },
        success: (data) => {
          setCookie(data, app);
          if (!data || !data.data || data.statusCode !== 200) data = defaultData;
          app.globalData.loginStatus = data.data.Message;
          app.globalData.initData = data.data.initData;
          if (data.data.Message === "Ex") app.globalData.userFlag = 1;
          else app.globalData.userFlag = 0;
          console.log("Status:" + (app.globalData.userFlag === 1 ? "User Login" : "New User"));
          if (data.data.openid) {
            userDot(data.data.notify, app);
            console.log("SetOpenid:" + data.data.openid);
            app.globalData.openid = data.data.openid;
            uni.setStorageSync('openid', data.data.openid);
          } else {
            console.log("Get Openid From Cache");
            app.globalData.openid = uni.getStorageSync("openid") || "";
          }
        },
        complete: (data) => {
          if (!data || !data.data || data.statusCode !== 200) data = defaultData;
          app.$scope.eventBus.commit('LoginEvent', data);
        }
      }, app)
    }
  })
}