module.exports = function makeaddFolderUseCase({
    foldersDb,
  }) {
    return async function addFolderUsecase(folders){
        const folderData = folders;
        const folderNames = [];
        const id = folderData.user_id;

        for (let i = 0; i < folderData.folders.length; i++) {
            folderNames.push(folderData.folders[i].name.toLowerCase());
          }

          const folderproviderId = [];
          for (let i = 0; i < folderData.folders.length; i++) {
              folderproviderId.push(folderData.folders[i].id.toLowerCase());
            }
            const priority = 5;
            for(let i=0;i < folderNames.length;i++){
              const check = folderNames[i];
              const mainid = folderproviderId[i];
              console.log(check);
              const ans = await foldersDb.folderExists(id,check);
              console.log("ans",ans,i)
              if(ans == 0){
                const result = await foldersDb.updatelabel(mainid,check,id,i+5);
              }
              else{
                const result = await foldersDb.updateid(mainid,check,id);
              }
            }
          };
        };