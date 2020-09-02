# flex布局

1. flex布局，包括flex-container和flex-items,包括两个方向：main axis和cross axis，分别使用main size和cross size定义大小

2. .cont为容器元素，.item为容器内子元素，每个子元素的类名为.item-1、.item-2等.

```css
.cont{
 display: flex;              //指定容器为flex布局
 flex-direction: row;        //指定元素item主轴排列方式:row(item水平显示)|row-reverse|column(垂直显示)|column-reverse
 flex-wrap:nowrap;           //指定元素item多行排列方式:nowrap默认值|wrap多行显示|wrap-reverse多行倒序
 flex-flow:row nowrap;       //设置元素item排列，是flex-direction属性和flex-wrap属性的简写形式: <flex-direction> || <flex-wrap> 
 justify-content:flex-start; //设置item在主轴的对齐方式：flex-start默认值|flex-end|center|space-between,item间隔排列两边无间隔|space-around,item间隔包括两边相等
 height:200px;              //容器具有高度时，可设置align-items垂直排列方式
 align-items:stretch;       //设置item垂直方向的对齐方式：stretch拉伸item和容器高度一致|flex-start向上对齐,item高度不被拉伸|flex-end向下对齐|center|baseline基线对齐
 align-content:;            //设置多根主轴线的对齐方式： flex-start | flex-end | center | space-between | space-around | stretch;
}	

.cont{
 display:flex;
 flex-wrap:wrap;
 height:200px;
	//以上设置item多行显示
 align-content:space-between;
}
```

3. 对容器下的item元素可以根据需要进行排序，默认order为0，order值越小位置越靠前
```css
.item-1{
 order:1;  //此时本来排第一的item会排列在最后
}
.item-5{
 order:-1;   //此时本来排最后的item会排列在最前面
}
```
4. 对容器下的item元素可设置各自的占比
```css
.item{
 flex-grow: 0;     //设置各个item如何分配剩余的空间，即item放大比例，值越大宽度越大; 默认值0，表示存在剩余空间，item也不放大
 flex-shrink: 1;  //设置各个item当空间不足时如何缩小的比例,值越大宽度越小; 默认值1，item会随页面进行宽度缩放，而0不根据页面进行缩放
 flex-basis: auto;   //设置在分配多余空间之前，item占据的主轴空间; 默认值auto，可设置为跟width或height属性一样的值,如100px，则item将占据固定空间
}
```
以上3个属性可以简写为flex：0 1 auto；分别为flex-grow、flex-shrink、flex-basis

5. 如果想单独设置某个item的对齐方式，可以对某个item设置align-self属性
```css
.item-1{
 align-self: center;   // auto默认值|stretch拉伸item和容器高度一致|flex-start向上对齐，item高度不被拉伸|flex-end向下对齐|center居中|baseline基线对齐
}
```
