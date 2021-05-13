# nginx 部署web项目

1. 本地安装nginx
2. 项目build一下，生成dist目录，根据自己项目生成相应的静态资源
3. 修改nginx的配置
```text
server {
        listen       9000;  #配置监听端口
        server_name  localhost; #配置域名

        location / {
            root  web/app;  #配置资源根路径
			      try_files $uri $uri/ @router;
            index  index.html index.htm;
        }
		
		    location @router {#配置资源路径
            rewrite ^.*$/index.html last;
        }
		
		    location /ws/{#配置接口代理
            proxy_connect_timeout 60;
            proxy_read_timeout 60;
            proxy_send_timeout  60;
            proxy_pass https://xxx.com/;
       }

        #error_page  404              /404.html;

        # redirect server error pages to the static page /50x.html
        #
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
      
    }

```
4. 启动/停止nginx
nginx 目前是还不支持在 Windows 下以服务的形式运行的, 所以以下命令要在nginx安装目录下执行
```text
查看Nginx的版本号：nginx -v

启动Nginx：start nginx

快速停止或关闭Nginx：nginx -s stop

正常停止或关闭Nginx：nginx -s quit
注：stop是快速停止nginx，可能并不保存相关信息；quit是完整有序的停止nginx，并保存相关信息。

重新打开日志文件：nginx.exe -s reopen

配置文件修改重装载命令：nginx -s reload

载入指定配置文件start nginx.exe -c conf/default.conf

bash: nginx: command not found   你再linux命令行环境下运行了windows命令，使用./nginx xxx

查看进程命令：tasklist

杀死进程命令：tskill  进程名 （比如杀死nginx进程：tskill  nginx）
```
5. 浏览器访问localhost:9000即可
