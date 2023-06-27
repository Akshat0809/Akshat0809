const express=require("express");
const app=express();
app.get('/',(req,res)=>{
    res.send("hello world");
    
});
app.get('/form',function(req,res){
    res.sendFile(__dirname+"/Task.html");
});
app.get('/form-submit',(req,res)=>{
    res.send(req.query);
});
app.listen(8000);