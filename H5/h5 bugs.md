# h5页面采坑记录

1. Q：video兼容各个手机浏览器, video标签自带按钮在IOS下播放会自动全屏，视频首图加载也会出问题
A: 给video添加以下属性，可以兼容绝大多数的手机浏览器。
```html
<video ref="videoEle" id="videoEle"
     controls
     controlsList='nofullscreen nodownload noremote footbar'
     preload="auto"
     raw-controls
     player="system"
     playsinline
     webkit-playsinline
     x5-playsinline
     x5-video-player-type="h5-page"
     x5-video-orientation="portraint"
     x5-video-player-fullscreen="true"
     style="object-fit:fill"
     width="videoWidth"
     height="videoHeight"
     src="videoUrl"
>
</video>
```

2. Q: 移动端元素使用rem单位，使用<code>transform:scale(1.2)</code>缩放时，在有的手机下计算出的宽高可能为奇数，导致放大过程中，元素边框的一小部分有裁剪的现象
A：调整元素的宽高，避免宽高取值为奇数

3. Q: vue路由只变化了参数，路由的没变的时候，页面不会重新加载？因为vue的keep-alive会保持组件的状态
A: 如果需要路由参数变化的时候，页面组件重新加载，则需要在watch组件路由的变化。 但使用浏览器回退时依然不会重新加载页面，这时就要配合hashchange事件
```vuejs
watch: {
    $route: function (to, from) {
      if (to.query.id !== from.query.id) {
        window.location.reload()
      }
    }
}

window.addEventListener('hashchange', () => {
    if (window.location.hash.includes('detail')) {
      window.location.reload()
    }
})
```
