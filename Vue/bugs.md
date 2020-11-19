# vue采坑记录

1. Q: vue路由只变化了参数，路由的没变的时候，页面不会重新加载？因为vue的keep-alive会保持组件的状态
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

2. Q: 在vue中使用vue-router后你去监听hashchange事件，路由的hash改变了，但是监听事件hashchange并没有触发，需要进行路由变化的操作可以使用vue-router的导航守卫函数：全局守卫router.beforeEach/afterEach，每个路由独享的守卫beforeEnter。
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


