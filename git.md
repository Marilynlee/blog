# git

1. git创建一个本地分支并推送到远端

- git checkout master　　　　切换到master主分支上
- git branch -b daily/12.0.0　　　　创建daily/12.0.0分支，并切换到该本地分支
- git status         　　　　修改文件后，查看状态
- git diff           　　　　查看具体的修改内容
- git add .          　　　　 添加所有修改到缓存区
- git commit -n -m "fixed bug"　　　　提交修改
- git push origin daily/12.0.0:daily/12.0.0　　　　新建的本地分支push到远程，远程分支与本地分支可以同名，也可以不同名（本地分支：远程分支）
- git branch --set-upstream-to=origin/daily/12.0.0 daily/12.0.0　　　　关联本地12.0.0分支到远程12.0.0分支

## git bash 支持tree命令方法

- cd到git安装目录,如 `cd /d/Program\ Files/Git`
- 输入命令：`echo "# Set alias for tree command" >> ./etc/bash.bashrc`
- 输入命令：`echo "alias tree='winpty tree.com'" >> ./etc/bash.bashrc`
- 输入命令：`source ./etc/bash.bashrc`

## git撤销提交

1. 本地add但未commit：

    - git reset HEAD  　　  　　恢复所有文件的add
    - git reset HEAD [filename]  　　  　　只恢复某个文件的add，保留工作区的修改
    - git checkout -- [filename]  　　  　　只恢复某个文件的add，不保留本地工作区的修改

2. 本地commit后，但未推送至远端：  

    - git reset –soft 版本号  　　  　　仅撤销commit操作，但未撤销git add，此时本地改动的代码仍然保留。比如git reset –soft HEAD^，HEAD^表示上一个版本，也可以写成HEAD~1,如果是进行了两次commit，都想撤销，可以写HEAD^2）
    - git reset –hard 版本号 　　  　　撤销commit，并且撤销add操作，同时会删除本地工作空间改动的代码。
    - git reset –mixed 版本号 　　  　　mixed为默认参数，也就是说git reset后面什么参数都不跟，使用这个。撤销commit，并且撤销add，不删除本地工作空间改动的代码。
    - git commit – amend 　　  　　仅修改一下提交的注释信息。此命令会进入一个vim编辑器，修改完注释信息保存即可。
3. git commit后，且push到远程：

    - git log 　　  　　查看提交历史
    - git reset –hard 版本号 　　  　　恢复提交至某个版本
    - git push origin <分支名> –force 　　  　　为了覆盖掉远程代码，需要用–force参数，否则会提示本地版本落后于远程版本，推不上去。
