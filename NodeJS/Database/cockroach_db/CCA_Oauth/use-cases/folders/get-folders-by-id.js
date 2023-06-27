// module.exports = function makeGetFolderByIdController({
//     foldersDb,
// }){
//     return async function getFolderByIdController(id) {
//     //    console.info(`Inside get folder by id use case`);
//        const ans = await foldersDb.getFolderById(id);
//        console.log("inside use case of folder get by id",ans);
//        return ans;
//     }
// }

module.exports = function makeFolderByIdUseCase({
    Joi,
    foldersDb,
  }) {
    return async function getFolderByIdUsecase(database_name,id){
      console.log('hi',typeof(id));
      // validateInput(id);
      console.log('hi');
    const ans = await foldersDb.getFolderById(database_name,id);
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