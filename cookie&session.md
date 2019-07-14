# __session和cookie__

由于http的无状态性，每一次请求是互不关联的，无法记录前一次会话信息。为了使某个域名下的所有网页能够共享某些数据，session和cookie出现了。  
会话（Session）跟踪是Web程序中常用的技术，用来跟踪用户的整个会话。常用的会话跟踪技术是Cookie与Session。**Cookie通过在客户端记录信息确定用户身份，Session通过在服务器端记录信息确定用户身份**。

## cookie

cookie是一种客户端的状态管理机制，Cookie实际上是一小段的文本信息。当客户端请求服务器，如果服务器需要记录该用户状态，服务器会将少量的数据以set-cookie消息头的方式，使用response向客户端浏览器颁发一个Cookie。客户端浏览器会把Cookie保存起来。当浏览器再请求该网站时，浏览器把请求的网址连同该Cookie一同提交给服务器。服务器检查该Cookie，以此来辨认用户状态。服务器还可以根据需要修改Cookie的内容。  
1. Cookie功能需要浏览器的支持。如浏览器不支持Cookie（如大部分手机中的浏览器）或把Cookie禁用，Cookie功能就会失效。
2. Cookie具有不可跨域名性  
不同域名之间cookie是不可以相互访问和操作的，以确保用户的隐私的安全。但可以通过设置Cookie的domain参数，使同一个一级域名下的二级域名交互使用Cookie。  
domain参数必须以点(".")开始。另外，name相同但domain不同的两个Cookie是两个不同的Cookie。如果想要两个域名完全不同的网站共有Cookie，可以生成两个Cookie，domain属性分别为两个域名，输出到客户端。
```javascript
Cookie cookie = new Cookie("time","20080808"); // 新建Cookie
cookie.setDomain(".helloweenvsfei.com");           // 设置域名
cookie.setPath("/");                              // 设置路径
cookie.setMaxAge(Integer.MAX_VALUE);               // 设置有效期为永久有效
response.addCookie(cookie);                       // 输出到客户端
```
3. Cookie的路径  
domain属性决定运行访问Cookie的域名，而path属性决定允许访问Cookie的路径（ContextPath），如果只允许/sessionWeb/下的程序使用Cookie，可以这么写:
```javascript
Cookie cookie = new Cookie("time","20080808");     // 新建Cookie
cookie.setPath("/session/");                          // 设置路径
response.addCookie(cookie);                           // 输出到客户端
```
name相同但path不同的两个Cookie也是两个不同的Cookie，页面只能获取它属于的Path的Cookie。
4.  Cookie的有效期  
Cookie的maxAge决定着Cookie的有效期，单位为秒。maxAge默认值为–1。 
- 如果maxAge属性为正数，则表示该Cookie会在maxAge秒之后自动失效。浏览器会将maxAge为正数的Cookie持久化，即写到对应的Cookie文件中。无论客户关闭了浏览器还是电脑，只要在maxAge秒之前，登录网站时该Cookie仍然有效
- 如果maxAge为负数，则表示该Cookie仅在本浏览器窗口以及本窗口打开的子窗口内有效，关闭窗口后该 Cookie即失效。maxAge为负数的Cookie为临时性Cookie，不会被持久化写到Cookie文件中。Cookie信息是保存在浏 览器内存中，因此关闭浏览器该Cookie就消失了
- 如果maxAge为0，则表示删除该Cookie。Cookie机制没有提供删除Cookie的方法，因此通过设置该Cookie即时失效实现删除Cookie的效果。失效的Cookie会被浏览器从Cookie文件或者内存中删除。
```javascript
const http = require("http");
const fs=require('fs');
http.createServer((request, response) => {
    console.log("8011 request come!",request.url);
    if(request.url==="/"){
        const html=fs.readFileSync('./index.html','utf-8');
        response.writeHead(200, {
            'Content-Type':'text/html',
            // max-age和expires效果一样，一个是设置过期时间段，一个是设置过期时间点，如果cookie的某个值设置了HttpOnly那么这个值不能被javascript拿到
            'Set-Cookie':['name=lyn;HttpOnlymax-age=2;path=/','id=1006;max-age=20']
        });
        response.end(html);
    }

}).listen(8011);
```
5. Cookie的修改、删除  
Cookie并不提供修改、删除操作。如要修改某个Cookie，只需新建一个同名的Cookie（除value、maxAge之外的所有属性，如name、path、domain等，都要与原Cookie完全一样。否则浏览器将视为两个不同的Cookie不予覆盖，导致修改、删除失败），添加到response中覆盖原来的Cookie。
6. Cookie的安全属性  
HTTP协议不仅是无状态的，而且是不安全的。使用HTTP协议的数据不经过任何加密就直接在网络上传播，有被截获的可能。如果不希望Cookie在HTTP等非安全协议中传输，可以设置Cookie的secure属性为 true。浏览器只会在HTTPS和SSL等安全协议中传输此类Cookie。  
secure属性并不能对Cookie内容加密，不能保证绝对的安全性。如需要高安全性，需要在程序中对Cookie内容加密、解密，以防泄密。
7. Cookie的属性

|属性名|描述|
|:-|:-|
|String name|该Cookie的名称。Cookie一旦创建，名称便不可更改|
|Object value|该Cookie的值。如果值为Unicode字符，需要为字符编码。如果值为二进制数据，则需要使用BASE64编码|
|int maxAge|该Cookie失效的时间，单位秒。如果为正数，则该Cookie在maxAge秒之后失效。如果为负数，该Cookie为临时Cookie，关闭浏览器即失效，浏览器也不会以任何形式保存该Cookie。如果为0，表示删除该Cookie。默认为–1|
|boolean secure|该Cookie是否仅被使用安全协议传输。安全协议。安全协议有HTTPS，SSL等，在网络上传输数据之前先将数据加密。默认为false|
|String path|该Cookie的使用路径。如果设置为“/sessionWeb/”，则只有contextPath为“/sessionWeb”的程序可以访问该Cookie。如果设置为“/”，则本域名下contextPath都可以访问该Cookie。注意最后一个字符必须为“/”|
|String domain|可以访问该Cookie的域名。如果设置为“.google.com”，则所有以“google.com”结尾的域名都可以访问该Cookie。注意第一个字符必须为“.”|
|String comment|该Cookie的用处说明。浏览器显示Cookie信息的时候显示该说明|
|int version|该Cookie使用的版本号。0表示遵循Netscape的Cookie规范，1表示遵循W3C的RFC 2109规范|

## session

session是一种服务器端的状态管理技术，是基于cookie的技术。当浏览器访问服务器时，服务器会创建一个session对象（该对象有一个唯一的id号，称之为sessionId）服务器在默认的情况下，会将sessionId以cookie的方式，发送给浏览器，浏览器会将sessionId保存到内存中。当浏览器再次访问服务器时，会将sessionId发送给服务器，服务器依据sessionId就可以找到之间创建的session对象。
1.  Session的生命周期  
Session在用户第一次访问服务器的时候自动创建，Session生成后，只要用户继续访问，服务器就会更新Session的最后访问时间，并维护该Session。用户每访问服务器一次，无论是否读写Session，服务器都认为该用户的Session“活跃（active）”了一次。
为了获得更高的存取速度，服务器一般把Session放在内存里。每个用户都会有一个独立的Session。如果Session内容过于复杂，当大量客户访问服务器时可能会导致内存溢出。因此，Session里的信息应该尽量精简。
2. Session的有效期  
由于会有越来越多的用户访问服务器，因此Session也会越来越多。为防止内存溢出，服务器会把长时间内没有活跃的Session从内存删除。这个时间就是Session的超时时间。如果超过了超时时间没访问过服务器，Session就自动失效了。Session的超时时间为maxInactiveInterval属性，由服务端设置。
3. Session对浏览器的要求  
虽然Session保存在服务器，对客户端透明，但它的正常运行仍然需客户端浏览器的支持。因为Session 需要使用Cookie作为识别标志来识别是否为同一用户。该Cookie为服务器自动生成的，它的maxAge属性一般为–1，表示仅当前浏览器内有效，并且各浏览器窗口间不共享，关闭浏览器就会失效。  
4. URL重写  
如果客户端浏览器将Cookie功能禁用，URL地址重写是对客户端不支持Cookie的解决方案。URL地址重写的原理是将该用户Session的id信息重写 到URL地址中。服务器能够解析重写后的URL获取Session的id。这样即使客户端不支持Cookie，也可以使用Session来记录用户状态。如` <ahref="index.jsp;jsessionid=0CCD096E7F8D97B0BE608AFDC3E1931E?c=1&wd=Java">Homepage</a>`即在文件名的后面，在URL参数的前面添加了字符串“;jsessionid=XXX”。  
5. session的方法

|方法名|描述|
|:-|:-|
|void setAttribute(String attribute, Object value)|设置Session属性。value参数可以为任何Java Object。通常为Java Bean。value信息不宜过大|
|String getAttribute(String attribute)|返回Session属性|
|Enumeration getAttributeNames()|返回Session中存在的属性名|
|void removeAttribute(String attribute)|移除Session属性|
|String getId()|返回Session的ID。该ID由服务器自动创建，不会重复|
|long getCreationTime()|返回Session的创建日期。返回类型为long，常被转化为Date类型，例如：Date createTime = new Date(session.get CreationTime())|
|long getLastAccessedTime()|返回Session的最后活跃时间。返回类型为long|
|int getMaxInactiveInterval()|返回Session的超时时间。单位为秒。超过该时间没有访问，服务器认为该Session失效|
|void setMaxInactiveInterval(int second)||设置Session的超时时间。单位为秒|
|boolean isNew()|返回该Session是否是新创建的|
|void invalidate()|使该Session失效|
