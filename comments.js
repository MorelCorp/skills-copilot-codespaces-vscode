// create web server
// 1. load modules
var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
// 2. create web server
var server = http.createServer(function(request,response){
    var parsedUrl = url.parse(request.url);
    var res = parsedUrl.pathname;
    var query = qs.parse(parsedUrl.query);
    if(res == '/'){
        fs.readFile('comment.html',function(error,data){
            response.writeHead(200,{'Content-Type':'text/html'});
            response.end(data);
        });
    } else if(res == '/comment'){
        var comment = query.comment;
        fs.appendFile('comment.txt',comment+'\n','utf8',function(error){
            response.writeHead(200,{'Content-Type':'text/html'});
            response.end('<h1>comment success</h1>');
        });
    } else if(res == '/list'){
        fs.readFile('comment.txt','utf8',function(error,data){
            response.writeHead(200,{'Content-Type':'text/html'});
            response.end(data);
        });
    } else {
        response.writeHead(404,{'Content-Type':'text/html'});
        response.end('<h1>404 Page Not Found</h1>');
    }
});
// 3. execute web server
server.listen(80,function(){
    console.log('Server is running...');
});
