console.log("user controller index.js")

const useCases = require('../use-cases/index')
const makegetfilecontroller = require('./file');
const creategetfilecontroller = makegetfilecontroller({
    getModules: useCases.getModules
})

 

module.exports = Object.freeze({
    creategetfilecontroller,
})