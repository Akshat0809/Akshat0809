module.exports = function makeCreateFolderUseCase({
    foldersDb,
}){
    return async function createFolderUsecase(body) {
        console.info(`Inside create folder use case`);
        try{
            await foldersDb.createFolder(body);
        }
        catch(err){
            console.log(err);
            throw err;
        }
    }
}