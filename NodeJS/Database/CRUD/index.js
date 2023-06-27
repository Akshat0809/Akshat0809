const express=require("express");
const app=express();
const sql=require("mysql2");
const port=5000;

app.use(express.urlencoded({extended:false}));
app.set("view engine","ejs");

const connection=sql.createConnection({
    host:'localhost',
    database:'my_db',
    user:'Akshat08',
    password:'Binny08@'});

app.get("/",(req,res)=>{
    res.render("form");})

app.post("/formdata",(req,res)=>{

   
    let firstname=req.body.name;
    let roll_no=req.body.roll_no;
    let branch=req.body.branch;

    connection.query(`insert into student (name,roll_no,branch) 
    values ('${firstname}','${roll_no}','${branch}');`,
    (err,results,field)=>{
    console.log(results);
    });


    connection.query(`select * from student;`,function(err,rows){
        if(err)
        {
            res.flash(err);
        }
        else
        {
            res.render('show_data',{data:rows});
            console.log(req.params.id);
         }
        });
    })
         
app.get("/delete/:id",(req,res)=>{

    let ID=req.params.id;
    console.log(req.params.id);
    connection.query(
    `DELETE FROM student where id=${ID};`,
    function(err,result,field){
        console.log(err);})
        res.send("data Deleted");
})

app.get("/edit/:id",(req,res)=>{
    let ID=req.params.id;
    connection.query(
        `select * from student where id=${ID}`,
        (err,rows)=>{
             if(err){
                throw (err);
             }
             else{
                res.render('update',{data:rows});
             }
        })
    }
)

app.post('/update/:id',(req,res)=>{
    let name=req.body.name;
    let roll_no=req.body.roll_no;
    let branch=req.body.branch;
    let ID=req.params.id;
    console.log(ID);
    connection.query(
        `update student set name ='${name}',roll_no='${roll_no}',branch='${branch}' where id='${ID}'`,
        function (err){
            if(err)
            throw(err);
        }
    )

    connection.query(`select * from student;`,function(err,rows){
        if(err)
        {
            res.flash(err);
        }
        else
        {
            res.render('show_data',{data:rows});
            console.log(req.params.id);
         }
        });
})
app.listen(port,()=>{
        console.log(`http://localhost:${port}`);
})