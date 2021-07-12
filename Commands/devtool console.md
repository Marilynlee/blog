- console.log()      输出日志
- console.info()     输出提示日志
- console.error()    输出错误日志
- console.warn()     输出警告日志
- console.clear()    清空控制台
- console支持的四种printf风格的占位符，如下表：

    |格式化符号|功能|
    |:-:|:-:|
    |%s|格式化为字符串|
    |%d或%i|格式化为数值|
    |%f|格式化为浮点数|
    |%o|转化为展开的DOM元素输出|
    |%O|转化为JS对象输出|
    |%c|字符串按照提供的样式输出|
```
console.error("Error: %s (%i)", "Server is not responding",500)  
console.log("%c菜鸟教程！","color: red; font-size: 20px");      //输出红色的、20px大小的字符串：菜鸟教程,欢迎您！
```
- console.dirxml()    入参dom节点，输出某个节点（node）所包含的html/xml代码
```
console.dirxml(document.body.firstElementChild) 
```
- console.assert()    assert方法接受两个参数，第一个参数是表达式，第二个参数是字符串。只有当第一个参数为false，才会输出第二个参数，否则不会有任何结果
```
console.assert(true === false, "判断条件不成立")
// Assertion failed: 判断条件不成立
```
- console.count()     统计代码被执行的次数
```
(function() {
  for (var i = 0; i < 5; i++) { 
    console.count('count'); 
  }
})();
```
- console.dir()       输出对象的详细信息
```
var obj= {a:{ num: "1"},b:{ num: "2"},c:{ num: "3" }};
console.dir(obj);
```
- console.table()     将复合类型的数据转为表格显示
```
var obj= {a:{ num: "1"},b:{ num: "2"},c:{ num: "3" }};
console.table(obj);
```
- console.time()和console.timeEnd()     计时开始和计时结束
```
console.time('计时器1');
for (var i = 0; i < 100; i++) {
  for (var j = 0; j < 100; j++) {}
}
console.timeEnd('计时器1');
```
- console.trace()     追踪函数的调用过程
```
function d(a) { 
  console.trace();
  return a;
}
function b(a) { 
  return c(a);
}
function c(a) { 
  return d(a);
}
var a = b('123');
```
- console.group()和console.groupEnd()   用于将显示的信息分组，可以把信息进行折叠和展开。
```
console.group('第一层');
  console.group('第二层');

    console.log('error');
    console.error('error');
    console.warn('error');

  console.groupEnd(); 
console.groupEnd();
```
- 其他
    |名称|作用|
    |:-:|:-:|
    |$|相当于document.querySelector|
    |$$|相当于document.querySelectorAll|
    |$_ |上一个表达式的值|
    |$0-$4|最近5个Elements面板选中的DOM元素|
    |dir|相当于console.dir|
    |keys|取对象的键名, 返回键名组成的数组|
    |values|取对象的值, 返回值组成的数组|
    |copy|将在控制台获取到的内容复制到剪贴板|





