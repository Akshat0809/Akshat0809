console.log("user controller index.js")

const useCases = require('../use-cases/index')
const makegetfilecontroller = require('./file');
const creategetfilecontroller = makegetfilecontroller({
        getfiledata1: useCases.getfiledata1
})

 

module.exports = Object.freeze({
    creategetfilecontroller,
})