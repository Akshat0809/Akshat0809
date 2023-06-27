module.exports = function makeCreateFolderUseCase({
    foldersDb,
}){
    return async function updateFolderUsecase(data) {
        console.info(`Inside update folder use case`);
            await foldersDb.updateFolder(data);
    }
}