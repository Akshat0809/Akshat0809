module.exports = function makeFolderExistUseCase({
    folderExists,
}){
    return async function createFolderUsecase({id,name}){
        console.log(id,name)
        try{
            const result = await folderExists({id,name});
            console.log(result);
            return result;
        }
        catch(e){
            console.log(e);
            throw e;
        }
    }
}