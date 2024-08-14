const express=require('express');
let app=express();
const port=9090;
app.listen(port,()=>
{
    console.log("server started");
})

app.use((req,res,next)=>
{
  console.log('this is the first middle ware');
  next();
})

app.use((req,res,next)=>
{
    res.send("hi ")
    console.log("this is the second middle ware");
})