console.log("rest -services")
const express = require('express')
const controllers = require('./controllers/index')
const router = express.Router();

 
function products() { 
    router.get('/products',controllers.creategetfilecontroller)
} 

products();

module.exports = router;