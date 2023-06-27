console.log("inside index.js of use-case");

const makeGetUpdateTemplate = require('./update-Template');
const updateTemplate = makeGetUpdateTemplate({

})

const makeGetDataFromSumitUseCase = require('./sumit-data');
const sumitData  = makeGetDataFromSumitUseCase({

})

const makeGetDataFromTestUseCase = require('./test-data');
const testData = makeGetDataFromTestUseCase({

})

const makeGetTemplateBody = require('./template-body');
const templateBody  = makeGetTemplateBody({
    testData,
    sumitData,
    updateTemplate
})

const makeGetDataFromTemplateUseCase = require('./get-template-data');
const getTemplateData = makeGetDataFromTemplateUseCase({
    templateBody,
    updateTemplate
})

module.exports = Object.freeze({
    getTemplateData,
    templateBody,
    testData,
    sumitData,
    updateTemplate
})