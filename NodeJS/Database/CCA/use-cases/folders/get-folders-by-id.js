module.exports = function makeGetFolderByIdController({
    foldersDb,
}){
    return async function getFolderByIdController(id) {
    //    console.info(`Inside get folder by id use case`);
       const ans = await foldersDb.getFolderById(id);
       console.log("inside use case of folder get by id",ans);
       return ans;
    }
}