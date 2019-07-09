# HTTP基础知识

## __网络模型__

1. 应用层（HTTP、FTP协议层）
2. 传输层（TCP、UDP协议层）
3. 网络层（数据在节点之间传输创建逻辑链路）
4. 数据链路层（在通信实体间建立数据链路连接）
5. 物理层（定义物理设备如何传输数据）

## __HTTP发展历史__

1. **HTTP/0.9**:只有GET命令；没有HEADER等描述数据信息；服务器发送完毕即会关闭TCP连接。1个TCP中可以发送多个HTTP连接。
2. **HTTP/1.0**:增加了POST、PUT、DELETE等命令；增加status code状态码和header相关内容；增加多字符集支持，多部分发送，权限，缓存等内容。
3. **HTTP/1.1**：支持持久连接；增加了pipeline客户端可以并发请求，但服务端还是串行执行；增加host和一些其他命令，提高物理服务器使用率，同一个物理服务器可以启多个应用服务。
4.**HTTP2**：未来大势所趋。所有数据以二进制传输，同一个连接里发送多个请求无需按照顺序来，即可并行处理请求；头信息压缩以及推送等提高效率。

## __HTTP三次握手__

HTTP请求只能建立在TCP连接之上，而每次TCP的连接都需要进行三次握手，此步骤消耗较大。HTTP1.0支持了持久连接，即同一个TCP连接上可以发送多个HTTP请求，可以节省三次握手和四次挥手的消耗。

- 客户端向服务端发送\[SYN\]包，客户端发送的Seq=0
- 服务端接收到之后，向客户端发送\[SYN,ACK\]包，服务端发送的Seq=0，ACK=1（等于客户端的Seq+1）
- 客户端接收到之后，再向服务端发送\[ACK\]包，客户端发送的Seq=1（等于服务端的ACK），ACK=1（等于服务端的Seq+1）

## __URI,URL,URN__

URI: Uniform Resource Identifier 统一资源定位符：用来唯一标示互联网上的信息资源。包含URL和URN
- URL:Uniform Resource Locator 统一资源定位器：组成为：协议（http/ftp）://user:pass@host.com:80/path?query=string#hash
- URN:Uniform Resource Name 永久统一资源定位符：资源移动之后还可以被找到，但目前尚不成熟。

## __HTTP报文格式__

| |请求报文|响应报文
|:-|:-|:-|
|起始行|GET(请求方法) /test/hello.txt(URL) HTTP/1.0(协议及版本) |HTTP/1.0(协议及版本) 200(状态码)  ok(状态信息) |
|首部Header|Accept Accept-Language | Content-type Content-length|
|主体| |返回数据 |

- HTTP方法:用来定义对于资源的操作；常见有GET、POST、DELATE、PUT等，从定义上有各自的语义
- HTTP CODE：定义服务器对请求的处理结果；各个区间的CODE有各自的定义，可以根据CODE判断HTTP服务的结果

****



