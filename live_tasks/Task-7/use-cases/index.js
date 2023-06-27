console.log("inside index.js of use-case");

const makeCreateCustomFieldUseCase = require('./create-custom-field');
const createCustomField = makeCreateCustomFieldUseCase({

})

const makefindTypeDataUseCase = require('./find-type');
const findType = makefindTypeDataUseCase({

})

const makeGetDataModules2DataUseCase = require('./get-modules-data2');
const getModulesData2 = makeGetDataModules2DataUseCase({

})

const makeGetDataModulesDataUseCase = require('./get-modules-data');
const getModulesData = makeGetDataModulesDataUseCase({

})

const makeGetDataModulesUseCase = require('./get-modules-id');
const getModules = makeGetDataModulesUseCase({
    getModulesData,
    getModulesData2,
    findType,
    createCustomField
})

module.exports = Object.freeze({
    getModules,
    getModulesData,
    getModulesData2,
    findType,
    createCustomField
})