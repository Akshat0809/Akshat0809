console.log("inside index.js of use-case");

const makeCreateCsvUseCase = require('./make-csv');
const createCsvFile = makeCreateCsvUseCase({

})

const makeGetDataFromTemplateUseCase = require('./get-order-data');
const getTemplateData = makeGetDataFromTemplateUseCase({
    createCsvFile
})

module.exports = Object.freeze({
    getTemplateData,
    createCsvFile
})