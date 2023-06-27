module.exports = function makeCreateUserController({
  Joi,
  createUser,
  defaultFolders,
  findId,
  Emailexist,
  producer
}) {
  return async function createUserController(req, res) {
    try {
      const database_name  = req.headers['database_name'];
      validInput({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
      
      const email = req.body.email;
      // console.log("hi taya");
      const ans = await Emailexist({ email });
      console.log(email,'in controller');
      if (ans !== 0) {
        res.status(201).json({
          status: "Exist",
          messege: "Email Already Exist",
        });
      } else {
        console.log("now we are creating");
        const userDetails = await createUser(database_name,{
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
        });
        // const id = await findId({ email: req.body.email });
        // console.log("controller id is", id);
        // console.log(typeof(id));
        // await defaultFolders({ id });
      // await producer.connect()
      // await producer.send({
      //   topic: 'test-topic',
      //   messages: [{ value: `${id}` },],
      // })
        res.status(201).json({
          status: "Success",
          messege: "User Succesfully Created",
        });
        return userDetails;
      }
    } catch (err) {
      res.status(500).json({
        status: "Error",
        messege: "Error: " + err,
      });
    }
  };
  function validInput({ name, email, password }) {
    const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
    });
    const { error } = schema.validate({ name, email, password });
    if (error) {
      console.log(error);
      throw error;
    }
  }
};
