console.log("user controller index.js")

const useCases = require('../use-cases/index')
const makegetfilecontroller = require('./file');
const creategetfilecontroller = makegetfilecontroller({
    getSumitActivitiesData: useCases.getSumitActivitiesData
})

 

module.exports = Object.freeze({
    creategetfilecontroller,
})