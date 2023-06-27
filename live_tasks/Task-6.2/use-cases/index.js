console.log("inside index.js of use-case");
const xlsx = require('xlsx');

const makeGetUpdateTemplate = require('./update-Template');
const updateTemplate = makeGetUpdateTemplate({

})

const makeCreateTemplateUseCase = require('./create-template');
const createTemplate = makeCreateTemplateUseCase({

})

const makeGetTestBody = require('./get-test-body');
const getTestBody = makeGetTestBody({
    createTemplate
})


const makeGetBody = require('./get-body');
const getBodySumit = makeGetBody({

})

const makeGetName = require('./get-name');
const getName = makeGetName({

})

const makeGetBodySalesmate2 = require('./get-data2-body');
const getTemplateBody = makeGetBodySalesmate2({
    updateTemplate,
    createTemplate
})

const makeGetDataFromSalesmate2UseCase = require('./get-data2');
const getFileData2 = makeGetDataFromSalesmate2UseCase({

})

const makeGetDataFromSalesmate1UseCase = require('./get-data1');
const getfiledata1 = makeGetDataFromSalesmate1UseCase({
    getFileData2,
    getTemplateBody,
    getName,
    getBodySumit,
    updateTemplate,
    getTestBody,
    createTemplate
})





module.exports = Object.freeze({
    getFileData2,
    getfiledata1,
    getTemplateBody,
    updateTemplate,
    createTemplate,
    getName,
    getBodySumit,
    getTestBody
})