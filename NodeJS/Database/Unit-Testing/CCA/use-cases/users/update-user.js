// module.exports = function makeCreateUserUseCase({
//     usersDb,
// }){
//     return async function updateUserUsecase(data) {
//         console.info(`Inside update user use case`);
//             await usersDb.updateUser(data);
//     }
// }

module.exports = function makeupdateUserUseCase({
    Joi,
    usersDb,
  }) {
    return async function updateUserUserUsecase(database_name,id){
      validateInput({id});
      console.log("inside use case");
     const result = await usersDb.updateUser(database_name,id);
     return result;
    };
  
    function validateInput({id}) {
      const schema = Joi.object({
        id: Joi.string().required(),
      });
  
      const {error} = schema.validate({id});
      if (error) {
        throw new Error(`${error.details[0].message}`);
      }
    }
  };