console.log("data access index.js")
const makeUserDbMethods = require('./user')
const makeFolderDbMethods = require('./folder')

// const mysql= require('mysql2');
// let connection = mysql.createConnection({
//     host:"localhost",
//     user:"Akshat08",
//     password:"Binny08@",
//     database:"my_db"
// })

const { Client } =require('pg');
const connection = new Client({
    host: 'localhost',
    user: 'akshatj',
    password: 'akshatj',
    database: 'emailclient',
    port:26257,
    ssl:{
      rejectUnauthorized:false,
    }
  });

connection.connect((err)=>{
    if(err)
    {
        console.log('Error connecting to cockroach database: '+err)
    }
    else
    {
        console.log('Connected to cockroach database')
    }
});
// connection = connection.promise();

const users = makeUserDbMethods({connection});
const folders = makeFolderDbMethods({connection});
const dbMethods = {
    users,
    folders,
}
module.exports = dbMethods;
