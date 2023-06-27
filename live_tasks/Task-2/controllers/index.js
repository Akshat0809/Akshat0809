console.log("user controller index.js")

const useCases = require('../use-cases/index')
const makegetfilecontroller = require('./file');
const creategetfilecontroller = makegetfilecontroller({
         getfiledata:useCases.getfiledata
})

 

module.exports = Object.freeze({
    creategetfilecontroller,
})