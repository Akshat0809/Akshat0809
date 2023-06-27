const express = require('express');
const mysql = require('mysql2');
const app = express();
app.use(express.urlencoded({extended:false}));
app.set('view engine','ejs');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'Akshat08',
  password: 'Binny08@',
  database: 'Migration2'
});

connection.connect((error) => {
  if (error) {
    console.error('Failed to connect to MySQL server:', error);
  } else {
    console.log('Connected to MySQL server');
  }});

function fold(id){
//    const user_id=1;
console.log(id);

const Folders = [{ name: 'Inbox', id},{ name: 'Sent', id },{ name: 'Archived', id},{ name: 'Outbox', id },{ name: 'Trash', id}]; 

const folderValues = Folders.map((folder) => [folder.name, folder.id]); 

connection.query(`INSERT INTO folders (name,id) VALUES ?`, [folderValues],(err,rows)=> {
    if (err) {
      console.error('Failed to insert folders:', err)
    } else {
      console.log('Inserted folders:', rows);
    }});
}

app.get('/folders/:id', (req, res) => {
    connection.query(`select * from folders`,(err,rows)=>{
        if(err)
        throw(err);
        else{
            res.render('folders', { folders:rows });
            console.log(req.params.id);
        }});});

    app.get("/delete/:folder_id",(req,res)=>{
    let id=req.params.folder_id;
     connection.query(
        `delete from folders where folder_id=${id};`,
        (err,result,field)=>{
            console.log(err);
        })
        res.redirect("/folders");
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
            }})})

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
                res.status(400).send("Name already Exist"); 
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
              }})
        return; 
        }}
        );
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
                res.status(400).send("Name already Exist"); 
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
        }});})
app.get("/",(req,res)=>{
    res.render("user_form");
  })

    app.post('/user_details',(req,res)=>{
    let Username=req.body.username;
    let Password=req.body.password;
    let address=req.body.address;
    const regex_pattern =/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (regex_pattern.test(address)) {
        res.send('You are succesfully registered<br/>');
        // res.redirect('/');
        // return;
    }
    else {
        res.send('The email address is not valid<br/>');
        return;
    }

    let i=0;
    connection.query(`select * from user`,(err,rows)=>{
        if(err){
        throw(err); 
         }
        else{
            for(i=0;i<rows.length;i++){
            if(rows[i].email_address==address){
                res.status(200).send("This Email already Exist"); 
                console.log(rows.length);  
                return;                  
        }} 
            console.log(i);
            console.log("This email address not exist now we can add");
    const sql=`insert into user (username,password,email_address)
    values ('${Username}','${Password}','${address}')`
    connection.query(sql, (error, result) => {
        if (error) {
          console.error('Failed to insert details:', error);
          res.status(500).send('Failed to insert folders');
        } else {
          console.log('Details Inserted:', result);
        //   res.send('Detials Inserted');
        fold(result.insertId);
        res.redirect('/all_user');
        // prompt("Details Inserted");
        }
      });
        return; 
        }});})

  app.get('/all_user', (req, res) => {
    connection.query(`select * from user`,(err,rows)=>{
        if(err)
        throw(err);
        else{
            res.render('user', { user:rows });
        }});});

  app.get("/delete_user/:id",(req,res)=>{
    let id=req.params.id;
     connection.query(
        `delete from user where id=${id};`,
        (err,result,field)=>{
            console.log(err);
        })
        // res.send("Data Deleted");
        res.redirect('/all_user');
        return;
    })
 
  app.get('/edit_user/:id',(req,res)=>{
    let id=req.params.id;
    connection.query(
        `select * from user where id=${id};`,
        (err,rows)=>{
            if(err)
            throw(err);
            else{
                res.render('update_user',{user:rows});
            }})})

app.post('/update_user/:id',(req,res)=>{
    let Newname=req.body.n_name;
    let Newaddress=req.body.e_name
    console.log(Newname);
    console.log(Newaddress);
    let id=req.params.id;
    let i=0;
    connection.query(`select * from user`,(err,rows)=>{
        if(err){
        throw(err); 
         }
        else{
            for(i=0;i<rows.length;i++){
            if(rows[i].username==Newname){
                res.status(200).send("This already Exist"); 
                console.log(rows.length);  
                return;                  
        }} 
            console.log(i);
            console.log("Username and email address not exist now we can add");
  const sql=`update user set username ='${Newname}' where id=${id}`
    connection.query(sql, 
        (err, result) =>{
            if (err) {
                console.log(err);
                res.send('Error creating folder');
              } else {
                res.redirect('/all_user');
              } })
        return;  
        }});})
   
app.listen(5400, () => {
  console.log('Server started on port 5400');
});

// curl -X POST http://localhost:5500/insert-folders



