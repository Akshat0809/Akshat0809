// module.exports = function makeFindIdUserUseCase({
//     usersDb,
// }){
//     return async function findId({email}){
//         console.info("Inside find id use case");
//         const id = await usersDb.findId({email});
//         return id;
//     }
// }


module.exports = function makefindIdUseCase({
    Joi,
    usersDb,
  }) {
    return async function findIdUserUsecase(email){
      console.log("is use-case",email);
      validateInput({email});
  
     const result = await usersDb.findId(email);
     console.log("in use case",result);
     return result;
    };
  
    function validateInput({email}) {
      const schema = Joi.object({
        email: Joi.string().email().required(),
      });
  
      const {error} = schema.validate({email});
      if (error) {
        throw new Error(`${error.details[0].message}`);
      }
    }
  };