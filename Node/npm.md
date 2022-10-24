# 工程化记录

1. Q：给npm包打补丁
A: 某个使用的npm已经不维护，但是有bug，无法提issue或者联系作者更改，可自行在本地打补丁:
- a. 安装patch-package到devDependencies: =<code>npm i patch-package --dev</code>=
- b. 更改npm包代码
- c. 生产补丁，执行<code>npx patch-package xxx(包名)</code>
- d. 通过npm scripts进行自动化，每次构建之前进行打补丁工作，修改就能同步给组内其他小伙伴
```json
"scripts": {
        "postinstall": "patch-package"
    },
```
