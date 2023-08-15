var fs = require('fs');
var http = require("http");
 
var server = http.createServer();
 
server.on("request", function (request, response) {
    // 获取请求URL
    var url = request.url;
    // 如果是下载文件的URL，则判断进行处理
    if (url === '/download/hello.txt') {
        // 提取文件名hello.txt
        var name = url.substring(url.lastIndexOf('/'));
        // 创建可读流，读取当前项目目录下的hello.txt文件
        var rs = fs.createReadStream(__dirname + "/" + name);
        // 设置响应请求头，200表示成功的状态码，headers表示设置的请求头
        response.writeHead(200, {
            'Content-Type': 'application/force-download',
            'Content-Disposition': 'attachment; filename=' + name
        });
        // 将可读流传给响应对象response
        rs.pipe(response);
    }
});

server.listen(8888, function () {
    console.log("服务器启动成功，可以通过 http://127.0.0.1:8888 来进行访问");
});