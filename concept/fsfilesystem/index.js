let http=require("http");
let fs=require("fs");

http.createServer(function(req,res)
{
    fs.appendFile("new.txt",'hii file created\n',function(err,data)
{
    if(err) throw err;
    console.log("file created successfully");

    res.end();
})

}).listen(9000,function()
{
    console.log("server started");
});