## 正则校验类

- 校验 整数 正则
```javascript
export const isInter = (val) => /^-?\d+$/.test(val)
```
- 校验 正数（不包含0）正则
```javascript
export const isPositiveNumber = (val) => /^(([1-9][0-9]*)(\.\d+)?|0\.\d+)$/.test(val)
```
- 校验 日期（yyyy-MM-dd HH:mm:ss 年月日分隔可用 - 或 / 或空格）正则
```javascript
export const isDate = (val) => /^((\d{2}(([02468][048])|([13579][26]))[\-\/\s+]?((((0?[13578])|(1[02]))[\-\/\s+]?((0?[1-9])|([1-2][0-9])|(3[01])))|(((0?[469])|(11))[\-\/\s+]?((0?[1-9])|([1-2][0-9])|(30)))|(0?2[\-\/\s]?((0?[1-9])|([1-2][0-9])))))|(\d{2}(([02468][1235679])|([13579][01345789]))[\-\/\s]?((((0?[13578])|(1[02]))[\-\/\s+]?((0?[1-9])|([1-2][0-9])|(3[01])))|(((0?[469])|(11))[\-\/\s+]?((0?[1-9])|([1-2][0-9])|(30)))|(0?2[\-\/\s]?((0?[1-9])|(1[0-9])|(2[0-8]))))))(\s((([0-1][0-9])|(2?[0-3]))\:([0-5]?[0-9])((\s)|(\:([0-5]?[0-9])))))?$/.test(val)
```
- 校验 时间范围（HH:mm-HH:mm）正则
```javascript
export const isTimeRange = (val) => /([0-1]?[0-9]|2[0-3]):([0-5][0-9])-([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/.test(val)
```
- 校验 手机号 正则
```javascript
export const isValidTel = (val) => /^1[3|4|5|6|7|8][0-9]{9}$/.test(val)
```
- 校验身份证号 正则
```javascript
export const validateIDCard = (val) => /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(val)
```
- 校验 邮箱 正则
```javascript
export const isEmail = (val) => /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(val)
```
- 校验 url 正则
```javascript
export const isUrl = (val) => /^http[s]?:\/\/.*/.test(val)
```

## js类型判断

- 获取js数据类型
```javascript
/**
*@param: val 校验的数据
*@param: type 校验的类型: 'String' | 'Number' | 'Boolean' | 'Function' | 'Null' | 'Undefined' | 'Object' |
*                         'Array' | 'Date' | 'RegExp' | 'Error' | 'Symbol' | 'Promise' | 'Set'
*@return: boolean
*/
export const getDataType = (val, type) => Object.prototype.toString.call(val).slice(8, -1) === type
```
- 是否为 微信浏览器
```javascript
export const isWeiXin = () => {
  const ua = navigator.userAgent.toLowerCase();
  return ua.match(/microMessenger/i) == 'micromessenger'
}
```
- 是否为 移动端
```javascript
export const isDeviceMobile = () => {
  const ua = navigator.userAgent.toLowerCase();
  return /android|webos|iphone|ipod|balckberry/i.test(ua)
}
```
- 是否为 QQ浏览器
```javascript
export const isQQBroswer = () => {
  const ua = navigator.userAgent.toLowerCase();
  return !!ua.match(/mqqbrowser|qzone|qqbrowser|qbwebviewtype/i)
}
```
- 是否为 爬虫
```javascript
export const isSpider = () => {
  const ua = navigator.userAgent.toLowerCase();
  return /adsbot|googlebot|bingbot|msnbot|yandexbot|baidubot|robot|careerbot|seznambot|bot|baiduspider|jikespider|symantecspider|scannerlwebcrawler|crawler|360spider|sosospider|sogou web sprider|sogou orion spider/.test(ua)
}
```
- 手机型号
```javascript
export const getMobileSysterm = () => {
    const u = navigator.userAgent;
    if (u.includes('Android') || u.includes('Linux')) {  //安卓手机
        return 'Android'
    } else if (u.includes('iPhone')) {//苹果手机
        return 'IOS'
    } else if (u.includes('iPad')) {//iPad
        return 'Ipad'
    } else if (u.includes('Windows Phone')) {//winphone手机
        return 'Winphone'
    } else {
        return 'unknow'
    }
}
```
- 是否为 PC端
```javascript
export const isPC = () => {
    const u = navigator.userAgent;
    const agents = ["Android", "iPhone","SymbianOS", "Windows Phone", "iPad", "iPod"];
    return agents.every(agent => !u.includes(agent))
}
```

## dom操作相关工具函数

- 去除 html 标签
```javascript
export const removeHtmltag  = (val) => str.replace(/<[^>]+>/g, '')
```
- 获取 url 参数
```javascript
export const getQueryStr  = (name) => {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  const search = window.location.search.split('?')[1] || '';
  const r = search.match(reg) || [];
  return r[2];
}
```
- 动态引入js
```javascript
export const injectScript = (src) => {
    const s = document.createElement('script');
    s.type = 'text/javascript';
    s.async = true;
    s.src = src;
    const t = document.getElementsByTagName('script')[0];
    t.parentNode.insertBefore(s, t);
}
```
- 下载 url地址的内容
```javascript
export const download = (url) => {
    let isChrome = navigator.userAgent.toLowerCase().includes('chrome');
    let isSafari = navigator.userAgent.toLowerCase().includes('safari');
    if (isChrome || isSafari) {
        let link = document.createElement('a');
        link.href = url;
        if (link.download !== undefined) {
            let fileName = url.substring(url.lastIndexOf('/') + 1, url.length);
            link.download = fileName;
        }
        if (document.createEvent) {
            let e = document.createEvent('MouseEvents');
            e.initEvent('click', true, true);
            link.dispatchEvent(e);
            return true;
        }
    }
    if (url.indexOf('?') === -1) {
        url += '?download';
    }
    window.open(url, '_self');
    return true;
}
```
- 元素是否包含class
```javascript
export const hasClass = (el, className) => new RegExp('(^|\\s)' + className + '(\\s|$)').test(el.className)
```
- 元素添加class
```javascript
export const addClass = (el, className) => {
    if (hasClass(el, className)) {
        return
    }
    let newClass = el.className.split(' ')
    newClass.push(className)
    el.className = newClass.join(' ')
}
```
- 元素去除class
```javascript
export const removeClass  = (el, className) => {
    if (!hasClass(el, className)) {
        return
    }
    let reg = new RegExp('(^|\\s)' + className + '(\\s|$)', 'g')
    el.className = el.className.replace(reg, ' ')
}
```
- 获取滚动的坐标
```javascript
export const getScrollPosition = (el = window) => ({
    x: el.pageXOffset !== undefined ? el.pageXOffset : el.scrollLeft,
    y: el.pageYOffset !== undefined ? el.pageYOffset : el.scrollTop
});
```
- 滚动到顶部
```js
export const scrollToTop = () => {
    const c = document.documentElement.scrollTop || document.body.scrollTop;
    if (c > 0) {
        window.requestAnimationFrame(scrollToTop);
        window.scrollTo(0, c - c / 8);
    }
}
```
- 元素是否在可视区
```js
export const isElementInViewport = (el, partiallyVisible = false) => {
    const { top, left, bottom, right } = el.getBoundingClientRect();
    const { innerHeight, innerWidth } = window;
    return partiallyVisible
        ? ((top > 0 && top < innerHeight) || (bottom > 0 && bottom < innerHeight)) &&
        ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth))
        : top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth;
}
```
- 复制到粘贴板
```js
export const copyTextToClipboard = (value) => {
    let textArea = document.createElement("textarea");
    textArea.style.background = 'transparent';
    textArea.value = value;
    document.body.appendChild(textArea);
    textArea.select();
    try {
        // 此方法不支持异步，有兼容性bug，需要在用户真正的操作才返回true，直接调用方法返回为false
        let isSuccessful = document.execCommand('copy');
        return isSuccessful
    } catch (err) {
        console.log('Oops, unable to copy');
        return false
    }
    document.body.removeChild(textArea);
}
```
## 数字相关工具函数

- 随机数
```js
export const random = function(min, max) {
    if (arguments.length === 2) {
        return Math.floor(min + Math.random() * ((max + 1) - min))
    } else {
        return null;
    }
}
```
- 将数字翻译成中文数字
```js
export const numberToChinese = (num) => {
    let numZh = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十"];
    let unit = ["", "十", "百", "仟", "萬", "亿", "点", ""];
    let arrNum = ("" + num).replace(/(^0*)/g, "").split("."),
        k = 0,
        res = "";
    for (let i = arrNum[0].length - 1; i >= 0; i--) {
        switch (k) {
            case 0:
                res = unit[7] + res;
                break;
            case 4:
                if (!new RegExp("0{4}//d{" + (arrNum[0].length - i - 1) + "}$").test(arrNum[0]))
                    res = unit[4] + res;
                break;
            case 8:
                res = unit[5] + res;
                unit[7] = unit[5];
                k = 0;
                break;
        }
        if (k % 4 == 2 && arrNum[0].charAt(i + 2) != 0 && arrNum[0].charAt(i + 1) == 0)
            res = numZh[0] + res;
        if (arrNum[0].charAt(i) != 0)
            res = numZh[arrNum[0].charAt(i)] + unit[k % 4] + res;
        k++;
    }

    if (arrNum.length > 1) // 加上小数部分(如果有小数部分)
    {
        res += unit[6];
        for (let i = 0; i < arrNum[1].length; i++)
            res += numZh[arrNum[1].charAt(i)];
    }
    if (res == '一十')
        res = "十";
    if (res.match(/^一/) && res.length == 3)
        res = res.replace("一", "");
    return res;
}
```
- 将数字转换为大写金额
```js
export const changeToChinese = (Num) => {
    //判断如果传递进来的不是字符的话转换为字符
    if (typeof Num == "number") {
        Num = new String(Num);
    };
    Num = Num.replace(/,/g, "") //替换tomoney()中的“,”
    Num = Num.replace(/ /g, "") //替换tomoney()中的空格
    Num = Num.replace(/￥/g, "") //替换掉可能出现的￥字符
    if (isNaN(Num)) { //验证输入的字符是否为数字
        //alert("请检查小写金额是否正确");
        return "";
    };
    //字符处理完毕后开始转换，采用前后两部分分别转换
    var part = String(Num).split(".");
    var newchar = "";
    //小数点前进行转化
    for (var i = part[0].length - 1; i >= 0; i--) {
        if (part[0].length > 10) {
            return "";
            //若数量超过拾亿单位，提示
        }
        var tmpnewchar = ""
        var perchar = part[0].charAt(i);
        switch (perchar) {
            case "0":
                tmpnewchar = "零" + tmpnewchar;
                break;
            case "1":
                tmpnewchar = "壹" + tmpnewchar;
                break;
            case "2":
                tmpnewchar = "贰" + tmpnewchar;
                break;
            case "3":
                tmpnewchar = "叁" + tmpnewchar;
                break;
            case "4":
                tmpnewchar = "肆" + tmpnewchar;
                break;
            case "5":
                tmpnewchar = "伍" + tmpnewchar;
                break;
            case "6":
                tmpnewchar = "陆" + tmpnewchar;
                break;
            case "7":
                tmpnewchar = "柒" + tmpnewchar;
                break;
            case "8":
                tmpnewchar = "捌" + tmpnewchar;
                break;
            case "9":
                tmpnewchar = "玖" + tmpnewchar;
                break;
        }
        switch (part[0].length - i - 1) {
            case 0:
                tmpnewchar = tmpnewchar + "元";
                break;
            case 1:
                if (perchar != 0) tmpnewchar = tmpnewchar + "拾";
                break;
            case 2:
                if (perchar != 0) tmpnewchar = tmpnewchar + "佰";
                break;
            case 3:
                if (perchar != 0) tmpnewchar = tmpnewchar + "仟";
                break;
            case 4:
                tmpnewchar = tmpnewchar + "万";
                break;
            case 5:
                if (perchar != 0) tmpnewchar = tmpnewchar + "拾";
                break;
            case 6:
                if (perchar != 0) tmpnewchar = tmpnewchar + "佰";
                break;
            case 7:
                if (perchar != 0) tmpnewchar = tmpnewchar + "仟";
                break;
            case 8:
                tmpnewchar = tmpnewchar + "亿";
                break;
            case 9:
                tmpnewchar = tmpnewchar + "拾";
                break;
        }
        var newchar = tmpnewchar + newchar;
    }
    //小数点之后进行转化
    if (Num.indexOf(".") != -1) {
        if (part[1].length > 2) {
            // alert("小数点之后只能保留两位,系统将自动截断");
            part[1] = part[1].substr(0, 2)
        }
        for (i = 0; i < part[1].length; i++) {
            tmpnewchar = ""
            perchar = part[1].charAt(i)
            switch (perchar) {
                case "0":
                    tmpnewchar = "零" + tmpnewchar;
                    break;
                case "1":
                    tmpnewchar = "壹" + tmpnewchar;
                    break;
                case "2":
                    tmpnewchar = "贰" + tmpnewchar;
                    break;
                case "3":
                    tmpnewchar = "叁" + tmpnewchar;
                    break;
                case "4":
                    tmpnewchar = "肆" + tmpnewchar;
                    break;
                case "5":
                    tmpnewchar = "伍" + tmpnewchar;
                    break;
                case "6":
                    tmpnewchar = "陆" + tmpnewchar;
                    break;
                case "7":
                    tmpnewchar = "柒" + tmpnewchar;
                    break;
                case "8":
                    tmpnewchar = "捌" + tmpnewchar;
                    break;
                case "9":
                    tmpnewchar = "玖" + tmpnewchar;
                    break;
            }
            if (i == 0) tmpnewchar = tmpnewchar + "角";
            if (i == 1) tmpnewchar = tmpnewchar + "分";
            newchar = newchar + tmpnewchar;
        }
    }
    //替换所有无用汉字
    while (newchar.search("零零") != -1)
        newchar = newchar.replace("零零", "零");
    newchar = newchar.replace("零亿", "亿");
    newchar = newchar.replace("亿万", "亿");
    newchar = newchar.replace("零万", "万");
    newchar = newchar.replace("零元", "元");
    newchar = newchar.replace("零角", "");
    newchar = newchar.replace("零分", "");
    if (newchar.charAt(newchar.length - 1) == "元") {
        newchar = newchar + "整"
    }
    return newchar;
}
```
## 数组相关工具函数

- 数组元素随机打乱
```js
export const shuffle = (arr) => {
    var result = [],
        random;
    while (arr.length > 0) {
        random = Math.floor(Math.random() * arr.length);
        result.push(arr[random])
        arr.splice(random, 1)
    }
    return result;
}
```
- 两个数组取并集
```js
export const union = (a, b) => [...new Set(a.concat(b))]
```

- 两个数组取交集
```js
export const intersect = (a, b) => {
    let res = [];
    a.forEach(item => b.includes(item) ? res.push(item) : null)
    return res;
}
```
- 数组取最大值
```js
export const max = (arr) => {
    return Math.max.apply(null, arr);
}
```
- 数组取最小值
```js
export const max = (arr) => {
    return Math.min.apply(null, arr);
}
```
- 数组求和
```js
export const sum = (arr) => {
    return arr.reduce((pre, cur) => {
        return pre + cur
    }, 0)
}
```
- 数组求平均值
```js
export const average  = (arr) => {
    return arr.reduce((pre, cur) => {
        return pre + cur
    }, 0) / arr.length
}
```
## 字符串相关工具函数

- 字符串去除空格： type: 1-所有空格 2-前后空格 3-前空格 4-后空格
```js
export const trim = (str, type) => {
    type = type || 1
    switch (type) {
        case 1:
            return str.replace(/\s+/g, "");
        case 2:
            return str.replace(/(^\s*)|(\s*$)/g, "");
        case 3:
            return str.replace(/(^\s*)/g, "");
        case 4:
            return str.replace(/(\s*$)/g, "");
        default:
            return str;
    }
}
```
- 字符串大小写转换： type: 1:首字母大写 2：首字母小写 3：大小写转换 4：全部大写 5：全部小写
```js
export const changeCase = (str, type) => {
    type = type || 4
    switch (type) {
        case 1:
            return str.replace(/\b\w+\b/g, function (word) {
                return word.substring(0, 1).toUpperCase() + word.substring(1).toLowerCase();

            });
        case 2:
            return str.replace(/\b\w+\b/g, function (word) {
                return word.substring(0, 1).toLowerCase() + word.substring(1).toUpperCase();
            });
        case 3:
            return str.split('').map(function (word) {
                if (/[a-z]/.test(word)) {
                    return word.toUpperCase();
                } else {
                    return word.toLowerCase()
                }
            }).join('')
        case 4:
            return str.toUpperCase();
        case 5:
            return str.toLowerCase();
        default:
            return str;
    }
}
```
- 检测密码强度
```js
export const checkPwd = (str) => {
    var Lv = 0;
    if (str.length < 6) {
        return Lv
    }
    if (/[0-9]/.test(str)) {
        Lv++
    }
    if (/[a-z]/.test(str)) {
        Lv++
    }
    if (/[A-Z]/.test(str)) {
        Lv++
    }
    if (/[\.|-|_]/.test(str)) {
        Lv++
    }
    return Lv;
}
```
- 判断两个对象键值是否相同
```js
export const isObjectEqual = (a, b) => {
    let aProps = Object.keys(a);
    let bProps = Object.keys(b);
    if (aProps.length !== bProps.length) {
        return false;
    }
    return aProps.every(prop => bProps.includes(prop) && a[prop] === b[prop])
}
```
- 16进制颜色转RGBRGBA字符串
```js
export const colorToRGB = (val, opa) => {
    let pattern = /^(#?)[a-fA-F0-9]{6}$/; //16进制颜色值校验规则
    let isOpa = typeof opa == 'number'; //判断是否有设置不透明度

    if (!pattern.test(val)) { //如果值不符合规则返回空字符
        return '';
    }
    let v = val.replace(/#/, ''); //如果有#号先去除#号
    let rgbArr = [];
    let rgbStr = '';
    for (let i = 0; i < 3; i++) {
        let item = v.substring(i * 2, i * 2 + 2);
        let num = parseInt(item, 16);
        rgbArr.push(num);
    }
    rgbStr = rgbArr.join();
    rgbStr = 'rgb' + (isOpa ? 'a' : '') + '(' + rgbStr + (isOpa ? ',' + opa : '') + ')';
    return rgbStr;
}
```
