const express = require('express');
const mysql = require('mysql2');

const app = express();
app.use(express.urlencoded({extended:false}));
app.set('view engine','ejs');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'Akshat08',
  password: 'Binny08@',
  database: 'task'
});

connection.connect((error) => {
  if (error) {
    console.error('Failed to connect to MySQL server:', error);
  } else {
    console.log('Connected to MySQL server');
  }
});

app.post('/insert-folders', (req, res) => {
   const user_id=1;
  const sql = "INSERT INTO folders (name,id) VALUES ('inbox',1),('sent',1),('archived',1),('outbox',1),('trash',1)";

  connection.query(sql, (error, result) => {
    if (error) {
      console.error('Failed to insert folders:', error);
      res.status(500).send('Failed to insert folders');
    } else {
      console.log('Inserted folders:', result);
      res.send('Inserted folders');
    }
  });
});

app.get('/folders', (req, res) => {
    connection.query(`select * from folders`,(err,rows)=>{
        if(err)
        throw(err);
        else{
            res.render('folders', { folders:rows });
            console.log(req.params.id);
        }
      });
    
  });

  app.get("/delete/:folder_id",(req,res)=>{
    let id=req.params.folder_id;
     connection.query(
        `delete from folders where folder_id=${id};`,
        (err,result,field)=>{
            console.log(err);
        })
        res.send("Data Deleted");
  })

  app.get("/edit/:folder_id",(req,res)=>{
    let id=req.params.folder_id;
    connection.query(
        `select * from folders where folder_id=${id};`,
        (err,rows)=>{
            if(err)
            throw(err);
            else{
                res.render('update',{folders:rows});
            }
        }
    )
  })

  app.post('/update/:folder_id',(req,res)=>{
    let folder_name=req.body.f_name;
    let id=req.params.folder_id;
    console.log(folder_name);
    let i=0;

    connection.query(`select * from folders`,(err,rows)=>{
        if(err){
        throw(err); 
         }
        else{
            for(i=0;i<rows.length;i++){
            if(rows[i].name==folder_name){
                res.status(200).send("Name already Exist"); 
                console.log(rows.length);  
                return;                  
        }} 
            console.log(i);
            console.log("Name not exist now we can add");

    const sql=`update folders set name ='${folder_name}' where folder_id=${id}`
    connection.query(sql, 
        (err, result) =>{
            if (err) {
                console.log(err);
                res.send('Error creating folder');
              } else {
                res.redirect('/folders');
              } 
        })
        return; 
        }});
  })

  app.get('/add_folder',(req,res)=>{
    res.render('new_form');
    
  });

  app.post('/add_folder', (req, res) => {
    const folderName = req.body.new_name;
    console.log(folderName); 
    let i=0;
    connection.query(`select * from folders`,(err,rows)=>{
        if(err){
        throw(err); 
         }
        else{
            for(i=0;i<rows.length;i++){
            if(rows[i].name==folderName){
                res.status(200).send("Name already Exist"); 
                console.log(rows.length);  
                return;                  
        }} 
            console.log(i);
            console.log("Name not exist now we can add");
            const user_id=1;
    const sql=`insert into folders (name,id) values ('${folderName}','${user_id}');`

    connection.query(sql, 
    (err, result) =>{
        if (err) {
            console.log(err);
            res.send('Error creating folder');
          } else {
            res.redirect('/folders');
          } 
    })
        return; 
        }});
  })

  app.get("/",(req,res)=>{
    res.render("user_form");
  })

  app.post('/user_details',(req,res)=>{
    let Username=req.body.username;
    let Password=req.body.password;
    let address=req.body.address;
    // console.log(Username);
    // console.log(Password);
    console.log(address);
    const sql=`insert into user (username,password,email_address)
    values ('${Username}','${Password}','${address}')`

    connection.query(sql, (error, result) => {
        if (error) {
          console.error('Failed to insert details:', error);
          res.status(500).send('Failed to insert folders');
        } else {
          console.log('Details Inserted:', result);
          res.send('Detials Inserted');
        }
      });
  })

  app.get('/all_user', (req, res) => {
    connection.query(`select * from user`,(err,rows)=>{
        if(err)
        throw(err);
        else{
            res.render('user', { user:rows });
        }
      });
    
  });
  app.listen(5400, () => {
    console.log('Server started on port 5500');
  });
  