// module.exports = function makeDeleteFolderUseCase({
//     foldersDb,
// }){
//     return async function deleteFolderUsecase(body) {
//         console.info(`Inside delete folder use case`);
//         await foldersDb.deleteFolder(body);
//     }
// }


module.exports = function makeDeleteFolderUseCase({
    Joi,
    foldersDb,
  }) {
    return async function deleteFolderUsecase(database_name,id){
      validateInput(id);
  
    const ans = await foldersDb.deleteFolder(database_name,id);
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