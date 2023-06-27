// module.exports = function makeCreateFolderUseCase({
//     foldersDb,
// }){
//     return async function updateFolderUsecase(data) {
//         console.info(`Inside update folder use case`);
//             await foldersDb.updateFolder(data);
//     }
// }

module.exports = function makeupdateFolderUseCase({
    Joi,
    foldersDb,
  }) {
    return async function updateFolderUsecase(database_name,id){
      validateInput(id);
  
    const ans = await foldersDb.updateFolder(database_name,id);
    console.log(ans);
    return ans;
    };
  
    function validateInput(id) {
      const schema = Joi.object({
        id: Joi.number().required().messages({
          'number.base' : '"id" must be a valid id',
        }),
      });
  
      const {error} = schema.validate(id);
      if (error) {
        throw new Error(`${error.details[0].message}`);
      }
    }
  };