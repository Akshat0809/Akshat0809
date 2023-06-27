// module.exports = function makeCreateUserUseCase({
//     Joi,
//     usersDb,
//   }) {
//     return async function createUserUsecase(database_name,{name,email,password,}){
//       validateInput({name, email,password});
  
//       const ans =  await usersDb.createUser(database_name,{name,email,password});
      
//       return ans;
//     };
  
//     function validateInput({name, email, password}) {
//       const schema = Joi.object({
//         name: Joi.string().required(),
//         email: Joi.string().email().required(),
//         password: Joi.string().min(8).required(),
//       });
  
//       const {error} = schema.validate({name, email, password});
//       if (error) {
//         throw new Error(`${error.details[0].message}`);
//       }
//     }
//   };
  
// node_modules/cucumber/bin/cucumber-js ./use-cases/users/

module.exports = function makeCreateUserUseCase({
  Joi,
  usersDb,
}) {
  return async function createUserUsecase({name,password,email,access_token,refresh_token,expiry_date,databasename}){
    console.log("in use-case");
    // console.log("use case",{name,password,email,access_token,refresh_token,expiry_date,databasename});
    validateInput({name,password,email,access_token,refresh_token,expiry_date,databasename});
     

    const id = await findId({ email,databasename });
        console.log("controller id is", id);
        console.log(typeof(id));
        await defaultFolders({ id });

    const ans =  await usersDb.createUser({name,password,email,access_token,refresh_token,expiry_date,databasename});
    
    return ans;
  }; 

  function validateInput({name, email, password}) {
    const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
      access_token: Joi.string().required(),
      refresh_token: Joi.string().required(),
      expiry_date: Joi.string().required(),
      databasename: Joi.string().required()
    });

    const {error} = schema.validate({name, email, password});
    if (error) {
      throw new Error(`${error.details[0].message}`);
    }
  }
};