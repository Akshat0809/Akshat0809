// module.exports = function makeDefaultFolderUseCase({
//     usersDb
// }){
//     return async function defaultFoldersUseCase({id}) {
//         console.info(`Inside default folder user use case`);
//         const result = await usersDb.defaultFolders({id});
//         return result;
//     }
// }

const { func } = require("joi");

module.exports = function makeDefaultFolderUseCase({
    Joi,
    usersDb,
  }) {
    return async function defaultFolderUsecase({user_id},database_name){
      console.log("hello folders");
      // validateInput(user_id);
    console.log("default folder user id",user_id);
    const ans = await usersDb.defaultFolders(user_id,database_name);
    
    return ans;
    };
  
    function validateInput(id) {
      const schema = Joi.object({
        id: Joi.number().required().messages({
          'number.base' : '"id" must be a valid number',
        }),
      });
  
      const {error} = schema.validate(id);
      if (error) {
        throw new Error(`${error.details[0].message}`);
      }
    }
  };