console.log("data access index.js")
const makeUserDbMethods = require('./user')
const makeFolderDbMethods = require('./folder')

const mysql= require('mysql2');
let connection = mysql.createConnection({
    host:"localhost",
    user:"Akshat08",
    password:"Binny08@",
    database:"migration"
})

connection.connect((err)=>{
    if(err)
    {
        console.log('Error connecting to MySQL database: '+err)
    }
    else
    {
        console.log('Connected to MySQL database')
    }
});
connection = connection.promise();

const users = makeUserDbMethods({connection});
const folders = makeFolderDbMethods({connection});
const dbMethods = {
    users,
    folders,
}
module.exports = dbMethods;
