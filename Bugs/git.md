# 记录git遇到的一些问题

1 初始化一个空的仓库，直接从master切了一个分支出来开发，然后分支提交推送后，发现master分支变成了非保护分支，刚才切的分支变成了保护分支

solution: 从master分支切分支前，一定要先初始化一个文件，一般可以先建一个README文件，然后在切分支即可避免

2 git邮箱设置错误，导致`git push`提交的时候报错`failed to push some refs to git@xxx.com`

solution: 首先回退已经commit的版本，然后重新设置邮箱和用户名，再次commit然后push
- `git config --global --list`     查看自己的配置信息
- `git reset --soft <版本号>`     回退版本
- `git config user.name "XXX"`     绑定用户名
- `git config user.email "XXX"`     绑定邮箱
- `git commit ---> git push`     重新提交推送
      
    
_________
***[返回列表页](https://github.com/Marilynlee/blog)***
_________

