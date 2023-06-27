console.log("user controller index.js")
const Joi = require('joi');
const useCases = require('../../use-cases');

const makeshowUserController = require('./get-all-users');
const makeCreateUserController = require('./create-users');
const makeDeleteUserController = require('./delete-users');
const makeUpdateUserController = require('./update-user');
const makeGetUserByIdController = require('./get-user-by-id');

const createShowUserController = makeshowUserController({
    Joi,
    showUser: useCases.users.showUser,
});

const createCreateuserController = makeCreateUserController({
    Joi,
    createUser: useCases.users.createUser,
    defaultFolders: useCases.users.defaultFolders,
    findId: useCases.users.findId,
    Emailexist: useCases.users.Emailexist
});

const createDeleteuserController = makeDeleteUserController({
    Joi,
    deleteUser: useCases.users.deleteUser,
    validateId: useCases.users.validateId
});


const createUpdateuserController = makeUpdateUserController({
    Joi,
    updateUser: useCases.users.updateUser,
});


const createGetuserByIdController = makeGetUserByIdController({
    Joi,
    getUserById: useCases.users.getUserById,
});


module.exports = Object.freeze({
    createCreateuserController,
    createShowUserController,
    createDeleteuserController,
    createUpdateuserController,
    createGetuserByIdController,
});