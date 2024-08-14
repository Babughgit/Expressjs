const http=require('http');
const url=require("url");
const fs=require("fs");

http.createServer(function(req,res)
{
    let q=url.parse(req.url,true);
    let filename="."+q.pathname;
    fs.readFile(filename,function(err,data)
{
    if(err)
    {
        res.writeHead(404,{"content-Type":'text/html'});
        res.end("404 not found");

    }
    res.writeHead(200,{'content-type':'text/html'});
    res.write(data);
    res.end();
})
}).listen(8080,function()
{
    console.log('server created');
})