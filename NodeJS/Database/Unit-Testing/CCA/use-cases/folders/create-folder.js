// module.exports = function makeCreateFolderUseCase({
//     foldersDb,
// }){
//     return async function createFolderUsecase(body) {
//         console.info(`Inside create folder use case`);
//         try{
//             await foldersDb.createFolder(body);
//         }
//         catch(err){
//             console.log(err);
//             throw err;
//         }
//     }
// }

const { default: rerun_formatter } = require("cucumber/lib/formatter/rerun_formatter");

module.exports = function makeCreateFolderUseCase({
    Joi,
    foldersDb,
  }) {
    return async function createFolderUsecase(database_name,{name,id}){
      validateInput({name,id});
  
      const result =  await foldersDb.createFolder(database_name,{name,id});
      return result;
    };
  
    function validateInput({name,id}) {
      const schema = Joi.object({
        id: Joi.number().required().messages({
            'number.base' : '"id" must be a valid id',
          }),
        name: Joi.string().required(),
      });
  
      const {error} = schema.validate({name,id});
      if (error) {
        throw new Error(`${error.details[0].message}`);
      }
    }
  };