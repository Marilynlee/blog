# HTTP知识

## HTTP基础

### __网络模型__

1. 应用层（HTTP、FTP协议层）
2. 传输层（TCP、UDP协议层）
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
|:-|:-|:-|
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
　　Pragma是旧产物，已经逐步抛弃，有些网站为了向下兼容还保留了这两个字段。如果一个报文中同时出现Pragma和Cache-Control时，以Pragma为准。同时出现Cache-Control和Expires时，以Cache-Control为准。即优先级从高到低是 **Pragma -> Cache-Control -> Expires**

### __缓存Cache-Control__

Cache-Control字段是http报文中的通用首部字段，既存在于请求报文中，也存在于响应报文中。部分字段值是共有的，但是具体的处理也会有差异。

1. 共有字段

|共有字段值 | 请求报文中的作用 | 响应报文中的作用 |
|:-|:-:|-:|
|no-cache|客户端提醒缓存服务器，在使用缓存前，不管缓存资源是否过期了，都必须进行校验|缓存服务器在缓存资源前，必须进行校验，判断是否有效|
|no-store|暗示请求报文中可能含有机密信息，不可缓存|暗示响应报文中可能含有机密信息，不可缓存|
|max-age=[秒]|如果缓存资源的缓存时间值小于指定的时间值，则客户端接收缓存资源（如果值为0，缓存服务器通常需要将请求转发给源服务器进行响应，不使用缓存）|在指定时间内，缓存服务器不再对资源的有效性进行确认，可以使用|
|no-transform|禁止代理改变实体主体的媒体类型（例如禁止代理压缩图片等）|与请求报文作用相同|
|cache-extension|新指令标记（token），如果缓存服务器不能理解，则忽略|与请求报文作用相同|

2. 请求报文私有字段值

|字段值|作用|
|:-|:-:|
|max-stale(=[秒])|提示缓存服务器，即使资源过期也接收；或者过期后的指定时间内，客户端也会接收|
|min-fresh=[秒]|提示缓存服务器，如果资源在指定时间内还没过期，则返回|
|only-if-cached|如果缓存服务器有缓存该资源，则返回，不需要确认有效性。否则返回504网关超时|

3. 响应报文私有字段值

|字段值|作用|
|:-|:-:|
|public|明确指明其他用户也可以使用缓存资源|
|private|缓存服务器只给指定的用户返回缓存资源，对于其他用户不返回缓存资源|
|must-revalidate|缓存资源未过期，则返回，否则代理要向源服务器再次验证即将返回的响应缓存是否有效，如果连接不到源服务器，则返回504网关超时|
|proxy-revalidate|所有缓存服务器在客户端请求返回响应之前，再次向源服务器验证缓存有效性|
|s-maxage=[秒]|缓存资源的缓存时间小于指定时间，则可以返回缓存资源，只适用于公共缓存服务器|

#### 可缓存性

- public：设置这个值，代表http请求返回的内容所经过的任何路径中（包括中间代理服务器以及发出请求的客户端浏览器），都可以对返回内容进行缓存操作。
- private：代表只有发起请求的浏览器才可以进行缓存
- no-cache：可以在本地进行缓存，但每次发请求时，都要向服务器进行验证，如果服务器允许，才能使用本地缓存。

#### 到期

- max-age=<seconds>：缓存时效时长，过期之后浏览器才会再次发送请求。
- s-maxage=<seconds>：浏览器基本用不到，仅在代理服务器中才会生效，会代替max-age，如果同时设置了max-age和s-maxage，以s-maxage为准
- max-stale=<seconds>：浏览器基本用不到，只有在发起端设置才启用。max-stale是发起请求方主动携带的头，当max-age过期，但max-stale没过期，可以继续使用缓存资源，不需要重新请求。

#### 重新验证

- must-revalidate，浏览器可能会用到，如果 max-age 过期，需要重新发送请求，获取这部分数据，再来验证数据是否真的过期，而不能直接使用本地缓存。
- proxy-revalidate，用在缓存服务器中，指定缓存服务器过期后，必须向源服务器重新请求，不能直接使用本地缓存。

#### 其他

- no-store，本地和代理服务器都不可以存储缓存，每次都要重新请求，拿到内容。
- no-transform，主要是用在 proxy 服务器，不允许进行格式转换。





_________
***[返回列表页](https://github.com/Marilynlee/blog)***
_________
