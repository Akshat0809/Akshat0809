// console.log("controllers index.js")
const userControllers = require('./users');
const folderControllers = require('./folders');
const authAction = require('./Oauth');

module.exports = Object.freeze({
    userControllers,
    folderControllers,
    authAction
});