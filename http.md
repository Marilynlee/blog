# HTTP知识

## HTTP基础

### __网络模型__

1. 应用层（HTTP、FTP、DNS协议层）
2. 传输层（TCP、UDP、SCTP协议层）
3. 网络层（数据在节点之间传输创建逻辑链路）
4. 数据链路层（在通信实体间建立数据链路连接）
5. 物理层（定义物理设备如何传输数据）

### __HTTP发展历史__

1. **HTTP/0.9**:只有GET命令；没有HEADER等描述数据信息；服务器发送完毕即会关闭TCP连接。1个TCP中可以发送多个HTTP连接。
2. **HTTP/1.0**:增加了POST、PUT、DELETE等命令；增加status code状态码和header相关内容；增加多字符集支持，多部分发送，权限，缓存等内容。
3. **HTTP/1.1**：支持持久连接；增加了pipeline客户端可以并发请求，但服务端还是串行执行；增加host和一些其他命令，提高物理服务器使用率，同一个物理服务器可以启多个应用服务。
4.**HTTP2**：未来大势所趋。所有数据以二进制传输，同一个连接里发送多个请求无需按照顺序来，即可并行处理请求；头信息压缩以及推送等提高效率。

### __HTTP三次握手__

HTTP请求只能建立在TCP连接之上，而每次TCP的连接都需要进行三次握手，此步骤消耗较大。HTTP1.0支持了持久连接，即同一个TCP连接上可以发送多个HTTP请求，可以节省三次握手和四次挥手的消耗。

- 客户端向服务端发送[SYN]包，客户端发送的Seq=0
- 服务端接收到之后，向客户端发送[SYN,ACK]包，服务端发送的Seq=0，ACK=1（等于客户端的Seq+1）
- 客户端接收到之后，再向服务端发送[ACK]包，客户端发送的Seq=1（等于服务端的ACK），ACK=1（等于服务端的Seq+1）

### __URI,URL,URN__

1. URI: Uniform Resource Identifier 统一资源定位符：用来唯一标示互联网上的信息资源。包含URL和URN
    - URL:Uniform Resource Locator 统一资源定位器：组成为：协议(http/ftp)://user:pass@host.com:80/path?query=string#hash
    - URN:Uniform Resource Name 永久统一资源定位符：资源移动之后还可以被找到，但目前尚不成熟。

### __HTTP报文格式__

| |请求报文|响应报文|
|:---|:---|:---|
|起始行|GET(请求方法) /test/hello.txt(URL) HTTP/1.0(协议及版本) |HTTP/1.0(协议及版本) 200(状态码)  ok(状态信息) |
|首部Header|Accept Accept-Language | Content-type Content-length|
|主体| |返回数据 |

- HTTP方法:用来定义对于资源的操作；常见有GET、POST、DELATE、PUT等，从定义上有各自的语义
- HTTP CODE：定义服务器对请求的处理结果；各个区间的CODE有各自的定义，可以根据CODE判断HTTP服务的结果

****

## __跨域__

基于浏览器的同源策略，在浏览器端发起http请求时，如果url的**协议**、**域名**、**端口**三者中有一个不同，请求就会出现跨域。本质上http已经由浏览器发出并成功响应，但出于安全考虑浏览器忽略掉了跨域请求的响应结果并在控制台进行跨域报错  

### __跨域方法__

- 客户端：浏览器虽不允许跨域请求，但是允许`link`、`img`、`script`标签加载跨域的资源，jsonp的原理正是利用`script`标签的这个特性进行跨域，但只支持get请求。
- 服务端：服务端可以通过设置响应头的Access-Control-Allow-Origin属性进行跨域

```javascript
const http = require("http");
const url = require("url");
http.createServer((request, response) => {
    console.log("80 request come!", request);
    const query = url.parse(request.url,true).query;
    // 如果需要为多个地址设置跨域，可通过url的判断设置head允许跨域
    response.writeHead(200, {
            // 'Access-Control-Allow-Origin': '*'
             'Access-Control-Allow-Origin': 'http://localhost', //设置可跨域请求的地址
             'Access-Control-Allow-Headers':'X-Cors-Agent',   //设置可跨域请求的头
             'Access-Control-Allow-Methods':'put,DELETE',   //设置可跨域请求的方法
             'Access-Control-Max-Age':1000,  //设置请求跨域的时间，此时间段内无需进行预请求验证
        });
    // jsonp跨域实现
    response.end(`${query.callback}({"id":${query.id},"name":"lyn"})`);
}).listen(8088);

console.log("server is running on 8088 port.");

```

### __CORS预请求__

以下的请求方式跨域时是允许的，不需要进行预请求

- 允许的方法：`GET`、`POST`和`HEAD`三种方法，其它的方法如`PUT`、`DELETE`等需要预请求进行验证
- 允许的Content-Type：`text/plain`、`multipart/form-data`、`application/x-www-form-urlencoded`三种数据类型
- 请求头限制，自定义请求头不被允许，可在[这里](https://fetch.spec.whatwg.org/#cors-safelisted-request-header)查看具体的信息！

## __http的缓存__

　　http缓存指的是: 当客户端向服务器请求资源时，会先抵达浏览器缓存，如果浏览器有“要请求资源”的副本，就可以直接从浏览器缓存中提取而不是从原始服务器中提取这个资源。  
　　常见的http缓存只能缓存get请求响应的资源，且是从第二次请求开始的。第一次请求资源时，服务器返回资源，并在respone header头中回传资源的缓存参数；第二次请求时，浏览器判断这些请求参数，命中强缓存就直接200，否则就把请求参数加到request header头中传给服务器，看是否命中协商缓存，命中则返回304，否则服务器会返回新的资源。  
　　在http中，控制缓存开关的字段有两个：**Pragma** 和 **Cache-Control**，Pragma有两个字段Pragma和Expires。Pragma的值为no-cache时，表示禁用缓存，Expires的值是一个GMT时间，表示该缓存的有效时间。  
　　Pragma是旧产物，已经逐步抛弃，如果一个报文中同时出现Pragma和Cache-Control时，优先级从高到低是 **Pragma -> Cache-Control -> Expires**

### __Cache-Control__

#### 可缓存性

- public：设置这个值，代表http请求返回的内容所经过的任何路径中（包括中间代理服务器以及发出请求的客户端浏览器），都可以对返回内容进行缓存操作。
- private：代表只有发起请求的浏览器才可以进行缓存
- no-cache：可以在本地进行缓存，但每次发请求时，都要向服务器进行验证，如果服务器允许，才能使用本地缓存。

#### 到期

- max-age=<seconds>：缓存时效时长，过期之后浏览器才会再次发送请求。
- s-maxage=<seconds>：浏览器基本用不到，仅在代理服务器中才会生效，会代替max-age，如果同时设置了max-age和s-maxage，以s-maxage为准
- max-stale=<seconds>：浏览器基本用不到，只有在发起端设置才启用。max-stale是发起请求方主动携带的头，当max-age过期，但max-stale没过期，可以继续使用缓存资源，不需要重新请求。

#### 重新验证

- must-revalidate：浏览器可能会用到，如果max-age过期，需要重新发送请求，去原服务端验证数据是否真的过期，而不能直接使用本地缓存。
- proxy-revalidate：用在缓存服务器中，指定缓存服务器过期后，必须向源服务器重新请求，不能直接使用本地缓存。

#### 其他

- no-store：本地和代理服务器都不可以存储缓存，每次都要重新请求原服务器获取数据。
- no-transform：主要是用在代理服务器，不允许进行格式转换或者压缩等操作。

各个字段详解，[点击这里](https://github.com/Marilynlee/blog/blob/master/cacheControl.md)

### __资源验证__

#### 验证头

- Last-Modified：上次修改时间，配合If-Modified-Since或If-Unmodified-Since使用，通常浏览器使用前者。服务器对比上次修改时间以验证资源是否需要更新。
- Etag：数据签名，资源内容会对应有一个唯一的签名，如果资源数据更改，签名也会变。配合If-Match或者If-None-Match使用，其值就是服务端返回的Etag值，对比资源的签名判断是否使用缓存

#### 验证头的使用

　　服务器设置Last-Modifed和Etag的值，浏览器第2次请求，会在请求头中携带If-Modified-since( Last-Modifed值) 和 If-None-Match(Etag值)。服务器不返回实际的内容，只需要告诉浏览器直接读取缓存即可,达到通过在服务器端进行验证的作用。  
　　如何判断服务端通过验证,数据从缓存读取的呢?通过服务器设置HTTP Code 304:Not Modified 表示资源没有修改，直接读缓存，浏览器就会忽略服务端返回的内容。在Chrome控制台勾上Disable cache，刷新页面，request headers请求中就会去掉和缓存相关的头了，如：If-Modified-Since。

## __cookie和session__

[详情见这里](https://github.com/Marilynlee/blog/edit/master/cookie&session.md)

## __http的持久化Connection__

在HTTP/1.0时代，每次HTTP请求都要进行一次TCP三次握手和四次挥手。随着互联网发展，Web网页交互变得复杂，一个HTML页面时，在发送HTTP请求时，也会请求该HTML页面里包含的其他资源，比如图片等静态文件。因此，每次的请求都会造成无谓的TCP连接建立和断开，增加网络通信量的开销。  
HTTP/1.1和一部分的HTTP/1.0想出了持久连接的办法，即只要任意一端没有明确提出断开连接，则保持TCP连接状态。HTTP持久连接允许在事务处理结束之后将TCP连接保持在打开状态，以便为未来的HTTP请求重用现存的连接。在事务处理结束之后仍然保持在打开状态的TCP连接被称为持久连接。持久连接特点：  
优点：重用已对目标服务器打开的空闲持久连接，可以避开缓慢的连接建立阶段，更快速地进行数据的传输。  
缺点：管理不当可能会积累出大量的空闲连接，耗费本地客户端以及远程服务器上的资源。

HTTP持久连接实现手段：通过设置http的header的Connection属性可以复用TCP连接，一般connection可以设置为keep-alive和close：  

- Connection: keep-alive：开启HTTP持久连接，HTTP/1.1默认值。表示复用TCP连接。
- Connection: close：关闭HTTP持久连接，HTTP/1.0默认值,每次请求后关闭TCP连接。

注：chrome、firefox浏览器可以并发6个http连接，Opera、safari浏览器可以并发4个http连接，ieHTTP/1.0并发数2个HTTP/1.1改进为4个。










_________
***[返回列表页](https://github.com/Marilynlee/blog)***
_________

