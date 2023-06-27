// module.exports = function makeDeleteUserUseCase({
//     usersDb,
// }){
//     return async function deleteUserUsecase(id) {
//         console.info(`Inside delete user use case`);
//         await usersDb.deleteUser(id);
//         return true;
//     }
// }


module.exports = function makeDeleteUserUseCase({
    Joi,
    usersDb,
  }) {
    return async function deleteUserUsecase(database_name,id){
      validateInput(id);
    
    const ans = await usersDb.deleteUser(database_name,id);
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