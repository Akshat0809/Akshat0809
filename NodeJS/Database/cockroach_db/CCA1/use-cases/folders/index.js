const Joi=require('joi');
const dataAccess = require('../../data-access-cockroach_db');
const makeCreateFolderUseCase = require('./create-folder');
const makeDeleteFolderUseCase=require('./delete-folder');
const makeUpdateFolderUseCase=require('./update-folder');
const makeGetFolderByIdUseCase=require('./get-folders-by-id');
const makeFolderExistUseCase = require('./folder-exists');

const folderExists = makeFolderExistUseCase({
    folderExists: dataAccess.folders.folderExists
})
const createFolder = makeCreateFolderUseCase({
    foldersDb: dataAccess.folders
});
const deleteFolder = makeDeleteFolderUseCase({
    foldersDb: dataAccess.folders
});
const updateFolder = makeUpdateFolderUseCase({
    foldersDb: dataAccess.folders
});
const getFolderById = makeGetFolderByIdUseCase({
    foldersDb: dataAccess.folders
});
module.exports = Object.freeze({
    getFolderById,
    createFolder,
    deleteFolder,
    updateFolder,
    folderExists
});