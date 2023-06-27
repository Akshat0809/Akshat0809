module.exports = function makeDeleteFolderUseCase({
    foldersDb,
}){
    return async function deleteFolderUsecase(body) {
        console.info(`Inside delete folder use case`);
        await foldersDb.deleteFolder(body);
    }
}