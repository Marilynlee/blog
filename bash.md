# cmd命令（git bash）

## 关闭进程

- robocopy  test  node_modules  /purge　　　node_modules目录嵌套层级太多导致无法删除时使用，新建空的test目录删除node_modules目录
- tasklist　　　查看电脑所有进程
- taskkill　　　结束进程，可以带4个参数  
　　-f　　　指定强制终止进程  
　　-t　　　终止指定的进程和由它启用的子进程  
　　-im　　　要终止的进程的映像名称  
　　-pid　　　要终止的进程的 PID

## 常用命令

- reset　　　清屏，把git bash命令窗口中的所有内容清空。
- exit　　　关闭bash终端
- cd ..　　　回退上一级目录

## 文件操作

- pwd　　　　打印显示我们当前所在的目录路径
- touch index.js　　　　新建文件,在当前目录下新建一个index.js文件
- rm xx.txt　　　　删除xx.txt文件
- mv a.html src　　　　移动a.html到src文件夹,保证文件和目标文件夹在同一目录.
- vi test.js　　　　编辑test.js文件，如果没有则会新建并进行编辑  
编辑有三种模式：1、命令行模式；2、末行模式；3、输入模式。
按 o  i  a 都可以进入输入模式；按 Esc 就可进入命令行模式也是系统默认模式；末行模式可以按ctrl+，它的主要功能是退出编辑器，也可以保存退出文档。
先按住shift键，命令行出现：Enter EX mode。Type “visual” to go to Normal mode. 输入以下命令
q!【强制退出不保存】 q【退出不保存】 wq【退出并保存后面也可以加个！】
- less test.js　　　按页查看文件
- cat test.js　　　查看文件全部内容，当文件很大时不方便

## 文件夹操作

- mkdir demo　　　　新建一个demo文件夹
- mkdir vue\ demo　　　　新建一个vue demo文件夹
- rm -r XX　　　　删除XX文件夹， -r递归删除，先删除文件夹里内容，再删除文件夹
- ls   　　　　list, 列出当前目录中的所有文件，-ll(两个ll)列出的内容更为详细
- dir  　　　　列出当前目录的文件列表
- tree 　　　　树形方式列出当前目录一级列表
- tree/f　　　　树形方式列出当前目录所有级别列表
- tree /f > tree.txt　　　　将目录结构输出到tree.txt文件
- start .　　　　打开当前目录，也可以用explorer代替start，如 explorer .
- start /d/Git　　　　打开d盘git目录
