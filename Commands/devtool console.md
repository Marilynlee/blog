- console.log      输出日志
- console.info     输出提示日志
- console.error    输出错误日志
- console.warn     输出警告日志
- console支持的四种printf风格的占位符，如下表：

    |格式化符号|功能|
    |:-:|:-:|
    |%s|格式化为字符串|
    |%d或%i|格式化为数值|
    |%f|格式化为浮点数|
    |%o|转化为展开的DOM元素输出|
    |%O|转化为JS对象输出|
    |%c|字符串按照提供的样式输出|
- console.dirxml    入参dom节点，输出某个节点（node）所包含的html/xml代码
- console.assert    对输入的表达式进行断言，只有表达式为false时，才输出相应的信息到控制台
- console.count     统计代码被执行的次数
- console.dir       输出对象的详细信息
- console.table     以表格的形式输出信息
- console.time和console.timeEnd     计时开始和计时结束
- console.group和console.groupEnd   输出一组信息的开头和输出结束一组输出信息
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





