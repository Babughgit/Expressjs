const express=require('express');
const app=express();
const bodyParser=require("body-parser");
const port=9001;

app.listen(port,function()
{
    console.log("server Started",port);
})
app.use(bodyParser.urlencoded({extended:false}));
app.use('/',(req,res,next)=>{
    console.log("always run");
    next();
})

app.use('/add-product',(req,res,next)=>
{   
    console.log("in the middle ware");
    res.send(`<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form>`)
    
});
app.use('/product',(req,res,next)=>
{
    console.log(req.body);
    res.redirect("/");
});
app.use('/',(req,res,next)=>{
    console.log("this is last middleware");
    res.send('<h1>hello from express</h1>')
});