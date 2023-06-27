console.log("data access index.js")
const makeProductDbMethods = require('./orderdb')

const mysql= require('mysql2');
let connection = mysql.createConnection({
    host:"localhost",
    user:"Akshat08",
    password:"Binny08@",
    database:"orders"
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

const product = makeProductDbMethods ({connection});

const dbMethods = {
product
}

module.exports = dbMethods;
