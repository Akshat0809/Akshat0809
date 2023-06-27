const Joi=require('joi');
const dataAccess = require('../../data-access-cockroach_db');
const makeCreateUserUseCase = require('./create-user');
const makeShowUserUseCase = require('./show-user');
const makeDeleteUserUseCase=require('./delete-user');
const makeUpdateUserUseCase=require('./update-user');
const makeGetUserByIdController=require('./get-user-by-id');
const makeFindIdUserUseCase=require('./find-id');
const makeDefaultFolderUseCase=require('./default-folders');
const makeFindEmailUserUseCase=require('./Emailexist');
const makeValidateIdUserUseCase=require('./validateId');
const makeupdateUserAccesToken=require('./update-User-access-token');
const makegetAllRelatedUser = require('./get-All-Related-User');
// const { users } = require('..');

const getAllRelatedUser = makegetAllRelatedUser({
    getAllDbRelatedUser: dataAccess.users.getAllDbRelatedUser
})

const updateUserAccesToken = makeupdateUserAccesToken({
    updateDbUserAccesToken: dataAccess.users.updateDbUserAccesToken
})

const validateId=makeValidateIdUserUseCase({
    Joi,
    usersDb:dataAccess.users
});
const Emailexist = makeFindEmailUserUseCase({
    Joi,
    usersDb: dataAccess.users
});

const createUser = makeCreateUserUseCase({
    Joi,
    usersDb: dataAccess.users
});

const showUser = makeShowUserUseCase({
    Joi,
    usersDb: dataAccess.users
});

const deleteUser = makeDeleteUserUseCase({
    Joi,
    usersDb: dataAccess.users
});

const updateUser = makeUpdateUserUseCase({
    Joi,
    usersDb: dataAccess.users
});
const getUserById = makeGetUserByIdController({
    Joi,
    usersDb: dataAccess.users
});

const findId = makeFindIdUserUseCase({
    Joi,
    usersDb: dataAccess.users
});

const defaultFolders = makeDefaultFolderUseCase({
    Joi,
    usersDb: dataAccess.users
});

module.exports = Object.freeze({
    createUser,
    showUser,
    deleteUser,
    updateUser,
    getUserById,
    findId,
    defaultFolders,
    Emailexist,
    validateId,
    updateUserAccesToken,
    getAllRelatedUser,
});