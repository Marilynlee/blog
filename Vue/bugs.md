# vue采坑记录

1. Q: vue路由只变化了参数，路由的没变的时候，页面不会重新加载？因为vue的keep-alive会保持组件的状态

A: 如果需要路由参数变化的时候，页面组件重新加载，则需要在watch组件路由的变化。 但使用浏览器回退时依然不会重新加载页面，这时就要配合hashchange事件
```vuejs
watch: {
    $route: function(to, from) {
      if (to.query.id !== from.query.id) {
        window.location.reload()
      }
    }
}
ts写法
@Watch('$route', { immediate: true })
public onPathChanged (to: any, from: any) {
  console.log(to, from)
}

window.addEventListener('hashchange', () => {
    if (window.location.hash.includes('detail')) {
      window.location.reload()
    }
})
```

2. Q: 在vue中使用vue-router后你去监听hashchange事件，路由的hash改变了，但是监听事件hashchange并没有触发。

 A: history的pushState（在当前页面创建并激活新的历史记录）和replaceState方法（修改当前的历史记录，但是会在全局的history中创建一个新的历史记录），pushState 和replaceState 更新url不会触发浏览器刷新，并且pushState方法不会触发浏览器的hashChange事件和popState事件。
 
vue-router中使用的是pushState方法来路由跳转的，所以hash变化却没有执行对应的hashchange事件。如需进行路由变化的操作可以使用vue-router的导航守卫函数：全局守卫router.beforeEach/afterEach，每个路由独享的守卫beforeEnter， 或者使用watch监听组件的路由变化
```vuejs
watch: {
    $route: function (to, from) {
      if (to.query.id !== from.query.id) {
        window.location.reload()
      }
    }
}
```
3. Q: 在vue中使用vant组件库，样式使用scoped，覆盖vant样式无效。

 A: vant样式的覆盖要写在全局中，在组件的scoped style样式中书写无效

