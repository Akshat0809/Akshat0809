// module.exports = function makeFolderExistUseCase({
//     folderExists,
// }){
//     return async function createFolderUsecase({id,name}){
//         console.log(id,name)
//         try{
//             const result = await folderExists({id,name});
//             console.log(result);
//             return result;
//         }
//         catch(e){
//             console.log(e);
//             throw e;
//         }
//     }
// }

const { default: rerun_formatter } = require("cucumber/lib/formatter/rerun_formatter");

module.exports = function makeFolderExistUseCase({
    Joi,
    foldersDb,
  }) {
    return async function createFolderUsecase({name,id}){
      validateInput({name,id});
  
      const result =  await foldersDb.folderExists({
        name,id
      });
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