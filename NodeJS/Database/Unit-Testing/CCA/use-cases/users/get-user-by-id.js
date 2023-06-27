// module.exports = function makeGetUserByIdController({
//     usersDb,
// }){
//     return async function getUserByIdController(database_name,id) {
//         console.info(`Inside get user by id use case`,id);
//         const [ans] = await usersDb.getUserById(database_name,id);
//         return [ans];
//     }
// }

module.exports = function makeGetUserByIdController({
    Joi,
    usersDb,
  }) {
    return async function getUserByIdController(database_name,id){
      console.log("hi");
      validateInput({id});
      // console.log("hi");
      console.log("inside use case",id);
     const result = await usersDb.getUserById(database_name,id);
     return result;
    };
  
    function validateInput({id}) {
      const schema = Joi.object({
        id: Joi.number().required().messages({
          'number.base' : '"id" must be a valid id',
        }),
      });
  
      const {error} = schema.validate({id});
      if (error) {
        throw new Error(`${error.details[0].message}`);
      }
    }
  };