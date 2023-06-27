console.log("inside index.js of use-case");
const dataAccess = require('../data-access/index')

const makeCreateCsvUseCase = require('./make-csv');
const createCsvFile = makeCreateCsvUseCase({

})

const makeGetDataFromTemplateUseCase = require('./get-order-data');
const getTemplateData = makeGetDataFromTemplateUseCase({
    createOrder:dataAccess.product.createOrder,
    checkOrderid:dataAccess.product.checkOrderid,
    createCsvFile
})

module.exports = Object.freeze({
    getTemplateData,
    createCsvFile
})