const express=require('express');
const app=express()
const multer =require("multer");
const path=require('path')
const fs=require('fs')
const mime=require('mime')
app.set('view engine','ejs')

const data=multer.diskStorage({
    destination:(req,file,cb)=>{
    cb(null,'uploads')
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+ path.extname(file.originalname))
    }
})

const upload=multer({storage:data})

app.get('/',(req,res)=>{
       res.render('uploadFile')
})

const filepath=path.join(__dirname,'uploads')
const uploaddedFiles=fs.readdirSync(filepath)

app.post('/uploads',upload.single('image'),(req,res)=>{
    console.log("andr hu me");
    res.render('view_download',{uploaddedFiles})

})
app.get('/view/:id',(req,res)=>{
    let file=path.join(__dirname,'uploads',req.params.id);
    let filename=path.basename(file);
    let mimetype=mime.getType(file);
    res.setHeader('Content-disposition','inline; filename='+filename);
    res.setHeader('Content-type',mimetype);
    let filestream=fs.createReadStream(file);
    filestream.pipe(res)
});

app.get('/download/:id',(req,res)=>{
    let file=path.join(__dirname,'uploads',req.params.id);
    let filename=path.basename(file);
    let mimetype=mime.getType(file);
    res.setHeader('Content-disposition','attachment; filename='+filename);
    res.setHeader('Content-type',mimetype);
    let filestream=fs.createReadStream(file);
    filestream.pipe(res)
})
app.listen(4000,()=>{
    console.log('running on port 4000');
})
