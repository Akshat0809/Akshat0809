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
    // validateInput({name,password,email,access_token,refresh_token,expiry_date,databasename});
     
    // const anse = await Emailexist({ email });
    //   console.log(email,'in use case');
    //   console.log(anse,"in use case");
    //   if (anse !== 0) {
    //     res.status(201).json({
    //       status: "Exist",
    //       messege: "Email Already Exist",
    //     });
    //   }  
    console.log("in use-case2");
    console.log("name is",name,"email is",email,"access token is",access_token,"refresh token is",refresh_token,"type of refresh",typeof(refresh_token));
    console.log("expiry date is",expiry_date);
    const ans =  await usersDb.createUser({name,password,email,access_token,refresh_token,expiry_date,databasename});
    // const res = await usersDb.defaultFolders(name);
    // console.log(res);
    // return res;
    
    // await runProducer(ans[0].userid)
    
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