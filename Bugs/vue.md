# vue采坑记录

### 1. Q: vue路由只变化了参数，路由的没变的时候，页面不会重新加载？因为vue的keep-alive会保持组件的状态

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

### 2. Q: 在vue中使用vue-router后你去监听hashchange事件，路由的hash改变了，但是监听事件hashchange并没有触发。

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
### 3. Q: 在vue中使用vant组件库，样式使用scoped，覆盖vant样式无效。

 A: vant样式的覆盖要写在全局中，在组件的scoped style样式中书写无效，因为scoped会在样式前加上一个hash码。如果一定要在组件中写，可以使用 >>> 、 /deep/样式穿透
 
### 4. Q: "webpack": "^3.6.0" "vue-router": "^3.0.1"中在npm run dev的时候，vue-router按需加载component: () => import() 报错Unexpected token

A: 因为未配置babel所以无法识别import的动态加载，需要babel的插件运行安装`npm install babel-plugin-syntax-dynamic-import --save-dev`
在.babelrc文件plugins中增加此项的配置
```json
{
    "presets": [
      ["env", {
        "modules": false,
        "targets": {
          "browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
        }
      }],
      "stage-2"
    ],
    "plugins": ["transform-vue-jsx", "transform-runtime", "syntax-dynamic-import"],
    "env": {
      "test": {
        "presets": ["env", "stage-2"],
        "plugins": ["transform-vue-jsx", "transform-es2015-modules-commonjs", "dynamic-import-node"]
      }
    }
  }
```
再次运行还是报错Error: No PostCSS Config found in...，在项目根目录新建postcss.config.js文件，并对postcss进行配置：
```json
module.exports = { 
  plugins: { 
    'autoprefixer': {browsers: 'last 5 version'} 
  } 
}
```
再次运行正常，项目为什么上传到 Git后，再clone运行就得单独写一个 postcss.config.js 的文件并配置一下？
postcss配置在webpack.config.js，postcss.config.js是针对webpack3.0做的特殊处理
