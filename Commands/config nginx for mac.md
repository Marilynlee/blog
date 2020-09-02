# mac配置

## mac配置nginx绑定80端口

1. 安装Homebrew：[主页地址](https://brew.sh/index_zh-cn.html)
2. 安装nginx：`brew search nginx`   `brew install nginx`
3. 配置nginx的80端口：

```js
upstream 7001_server_pool {
    server 127.0.0.1:7001    weight=4    max_fails=2 fail_timeout=30s;
}

server {
    listen       80;
    server_name  7001.test.lyn.com 7001.m.lyn.com;
    location / {
        root   html;
        index  index.html index.htm;
        proxy_next_upstream http_502 http_504 error timeout invalid_header;
        proxy_pass http://7001_server_pool;
        proxy_set_header Host $host;
        proxy_set_header Port 80;
        proxy_set_header    X-Forwarded-For $remote_addr;
    }
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   html;
    }
}
```

**注意**: mac系统不允许用户进程使用1024以下端口，所以nginx默认绑定8080端口。即使nginx配置文件写了80端口也不会生效。

4. 修改管理员权限
`sudo chown root:wheel/usr/local/opt/nginx/bin/nginx`
`sudo chmod u+s/usr/local/opt/nginx/bin/nginx`

5. 加上launchctl控制
`sudo cp /usr/local/opt/nginx/*.plist /Library/LaunchDaemons`
`sudo launchctl load -w /Library/LaunchDaemons/homebrew.mxcl.nginx.plist`

6. 启动nginx
`sudo nginx` #启动
`sudo nginx -t` #测试配置文件是否有错
`sudo nginx -s reload` #重启nginx

`sudo brew services start nginx` #启动nginx
`sudo brew services stop nginx` #关闭nginx
`ps -ef|grep nginx` #查看nginx的进程
`lsof -i:80`  #查看80端口占用进程

7. 问题
如果出现nginx: [error] invalid PID number "" in "/usr/local/var/run/nginx/nginx.pid"，则需要
`sudo nginx -c /usr/local/etc/nginx/nginx.conf`
`sudo nginx -s reload`

## mac配置右键新建文件

1. 首先下载安装Easy New File。[下载地址](http://www.macbl.com/app/system/easy-new-file)
2. 打开“系统偏好设置”，点击“扩展”。
3. 在第三方扩展程序中勾选“Easy New File”，即可将其启用。
