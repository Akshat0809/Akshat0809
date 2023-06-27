console.log("inside index.js of use-case");

const makeGetgetAllTestDealsUseCase = require('./get-delas-test-data');
const getAllTestDeals = makeGetgetAllTestDealsUseCase({

})

const makeGetDataFromTestDealsUseCase = require('./get-test-deals');
const getTestDealsData = makeGetDataFromTestDealsUseCase({

})

const makeGetcreateActivityTypeUseCase = require('./create-Activity-Type');
const createActivityType = makeGetcreateActivityTypeUseCase({

})

const makeGetcreateActivityUseCase = require('./create-activity');
const createActivity = makeGetcreateActivityUseCase({

})


const makeGetcheckActivityTypeUseCase = require('./get-activity-types');
const checkActivityType = makeGetcheckActivityTypeUseCase({
    createActivityType
})

const makeGetTestDataUseCase = require('./test-data');
const getTestData = makeGetTestDataUseCase({
    createActivity
})

const makeGetDataFromTestActivitiesUseCase = require('./get-test-activities');
const getTestActivitiesData = makeGetDataFromTestActivitiesUseCase({
    getTestData,
    checkActivityType
})

const makeGetDataFromSumitActivitiesUseCase = require('./get-sumit-activites');
const getSumitActivitiesData = makeGetDataFromSumitActivitiesUseCase({
    getTestActivitiesData,
    getTestDealsData,
    getAllTestDeals
})

module.exports = Object.freeze({
    getSumitActivitiesData,
    getTestActivitiesData,
    getTestData,
    createActivity,
    createActivityType,
    checkActivityType,
    getTestDealsData,
    getAllTestDeals
})