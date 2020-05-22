
import CryptoJS from "crypto-js";

const key = CryptoJS.enc.Utf8.parse("1234567890000000"); //16位
const iv = CryptoJS.enc.Utf8.parse("1234567890000000");

const asyncWrap = fn =>
  function asyncUtilWrap(req, res, next, ...args) {
    const fnReturn = fn(req, res, next, ...args)
    return Promise.resolve(fnReturn).catch(next)
  }

const deepCopy = obj => JSON.parse(JSON.stringify(obj));

const encrypt = word => {
  let encrypted = "";
  if (typeof word == "string") {
    const srcs = CryptoJS.enc.Utf8.parse(word);
    encrypted = CryptoJS.AES.encrypt(srcs, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
  } else if (typeof word == "object") {
    //对象格式的转成json字符串
    const data = JSON.stringify(word);
    const srcs = CryptoJS.enc.Utf8.parse(data);
    encrypted = CryptoJS.AES.encrypt(srcs, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
  }
  return encrypted.ciphertext.toString();
}

const decrypt = word => {
  const encryptedHexStr = CryptoJS.enc.Hex.parse(word);
  const srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
  const decrypt = CryptoJS.AES.decrypt(srcs, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  return decryptedStr.toString();
}

const validateEmail = email => {
  let reg = /^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/;
  return reg.test(email);
}

const debounce = (fun, delay) => {
  return function (args) {
    let that = this
    let _args = args
    clearTimeout(fun.id)
    fun.id = setTimeout(function () {
      fun.call(that, _args)
    }, delay)
  }
}

const throttle = (fun, delay) => {
  let last, deferTimer
  return function (args) {
    let that = this
    let _args = arguments
    let now = +new Date()
    if (last && now < last + delay) {
      clearTimeout(deferTimer)
      deferTimer = setTimeout(function () {
        last = now
        fun.apply(that, _args)
      }, delay)
    } else {
      last = now
      fun.apply(that, _args)
    }
  }
}

const timeTransfor = dateTimeStamp => {
  let result;
  let minute = 1000 * 60;
  let hour = minute * 60;
  let day = hour * 24;
  let halfamonth = day * 15;
  let month = day * 30;
  let now = new Date().getTime();
  let diffValue = now - dateTimeStamp;
  if (diffValue < 0) { return; }
  let monthC = diffValue / month;
  let weekC = diffValue / (7 * day);
  let dayC = diffValue / day;
  let hourC = diffValue / hour;
  let minC = diffValue / minute;
  if (monthC >= 1) {
    result = "" + parseInt(monthC) + "月前";
  }
  else if (weekC >= 1) {
    result = "" + parseInt(weekC) + "周前";
  }
  else if (dayC >= 1) {
    result = "" + parseInt(dayC) + "天前";
  }
  else if (hourC >= 1) {
    result = "" + parseInt(hourC) + "小时前";
  }
  else if (minC >= 1) {
    result = "" + parseInt(minC) + "分钟前";
  } else {
    result = "刚刚";
  }
  return result;
}

const openInNewTab = (href, blank) => {
  const a = document.createElement('a');
  a.setAttribute('href', href);
  if(blank){
    a.setAttribute('target', '_blank');
  }
  a.click();
}

const getInitState = ({key,state}) => {

  if(typeof(window) === 'undefined' || !window.__INITIAL_DATA__) return state;

  if(key === 'userInfo' ){
    const { userInfo } = JSON.parse(decrypt(JSON.parse(document.getElementById('ssrTextInitData').value).initialData));
    return userInfo
  }

  return __INITIAL_DATA__[key];
}

export {
  asyncWrap,
  deepCopy,
  encrypt,
  decrypt,
  validateEmail,
  debounce,
  throttle,
  timeTransfor,
  openInNewTab,
  getInitState
}