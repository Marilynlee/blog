# 解锁神器map标签
html的<code>map</code>和<code>area</code>标签可以给<code>img</code>标签的图片进行标记热点区域，之前的需求中产品要求，根据图片中不同的物品跳转不同的页面，被无知的我一口回绝说做不到。真是惭愧！
来，直接上demo示例
```html
<img src="https://www.w3school.com.cn/i/eg_planets.jpg" border="0" usemap="#planetmap" alt="Planets" />
<map name="planetmap" id="planetmap">
  <area shape="circle" coords="180,139,14" href ="https://www.w3school.com.cn/example/html/venus.html" alt="Venus" />
  <area shape="circle" coords="129,161,10" href ="https://www.w3school.com.cn/example/html/mercur.html" alt="Mercury" />
  <area shape="rect" coords="0,0,110,260" href ="https://www.w3school.com.cn/example/html/sun.html" alt="Sun" />
</map>
```
图片和热点区域元素的关联是通过图片的<code>usemap</code>属性，其值对应<code>map</code>的<code>id</code>或者<code>name</code>值（chrome只支持name属性）。使用tab键索引高亮可以看到图片的热区范围，<code>area</code>的href属性即和<code>a</code>相同，链接至不同的页面或者位置。

<code>area</code>有以下几个属性：
* shape： 表示热区的形状，支持：矩形rect，圆形circle以及多边形poly
* coords： 表示热区的形状的坐标。rect支持4个数值，2个坐标和宽高值；圆形circle支持3个数值，2个圆心坐标和圆的半径值；poly每两个数值组合表示一个坐标点，依次连线形成的区域就是最终的热点区域
* href： 直接跳转地址或锚点等。也支持target属性和rel属性。也就是说<area>可以看成是半个<a>元素
* alt： 同<img>元素的alt，表示热点区域图片的描述信息

***
 **注意： 如果图片被改变了宽高，那么热区的坐标值需要相应的调整，因为这个位置始终是根据图片实际的尺寸取值的！**
