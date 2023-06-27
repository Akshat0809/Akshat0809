
// module.exports = function makeCreateUserUseCase({
//     usersDb,
// }){
//     return async function createUserUsecase(body) {
//         console.info(`Inside create user use case`);
//         try{
//            await usersDb.createUser(body);
//         }
//         catch(err){
//             console.log(err);
//             throw err;
//         }
//     }
// }


module.exports = function makeCreateUserUseCase({
    Joi,
    usersDb,
  }) {
    return async function createUserUsecase(database_name,{name,email,password,}){
      validateInput({name, email,password});
      console.log("hi,");
      const ans =  await usersDb.createUser(database_name,{name,email,password});
      console.log("in use case of user id",+(ans.insertId));
      return ans;
    };
  
    function validateInput({name, email, password}) {
      const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required(),
      });
  
      const {error} = schema.validate({name, email, password});
      if (error) {
        throw new Error(`${error.details[0].message}`);
      }
    }
  };
  
  // node_modules/cucumber/bin/cucumber-js ./use-cases/users/