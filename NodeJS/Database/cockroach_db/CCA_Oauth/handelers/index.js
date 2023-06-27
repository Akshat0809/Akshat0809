console.log("In index of handlers...");

const CronJob = require('cron').CronJob;
const {Kafka} = require('kafkajs');
const { OAuth2Client } = require("google-auth-library");
const {users} = require('../use-cases/index');
const {folders} = require('../use-cases/index')


// const makecreateDefaultFolderHandler = require('./kafka')
// const createDefaultFoldersHandlers = makecreateDefaultFolderHandler({
//     Kafka,
//     // createDefaultFolders:user.createDefaultFolders
// });

// createDefaultFoldersHandlers();



const makegetAccesToken = require('./getAccessToken')
const getAccesToken = makegetAccesToken({
    OAuth2Client,
    CronJob,
    Kafka,
    updateUserAccesToken: users.updateUserAccesToken
})

// getAccesToken();

const makefoldersupdate = require('./fetchlabels')
const fetchlabels = makefoldersupdate({
    Kafka,
    addFolder: folders.addFolder
})

// fetchlabels();

const makefetchmails = require('./fetchmails')
const fetchmail = makefetchmails({
    Kafka,
})

makefetchmails();

module.exports = Object.freeze({
    // createDefaultFoldersHandlers,
    makegetAccesToken,
    fetchlabels,
    makefetchmails,
})